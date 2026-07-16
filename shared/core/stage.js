(function (CW) {
  'use strict';
  var DEFAULT_BBOX = [-4.5, 9, 4.5, -1.5];

  // CW.createStage(containerId) -> stage
  // 重置策略（设计 D2）：reset() = freeBoard + initBoard，彻底无残留。
  function createStage(containerId) {
    var board = null;
    var reg = new Map(); // id -> JXG 对象（或对象数组）
    var tweens = []; // 活跃动画句柄，reset 时统一取消

    // opts（可选，由场景的 board 字段传入）：{axis:false 关坐标轴, keepAspect:true 等比（画圆必开）, grid:true 网格（平移作图）}
    function initBoard(bbox, opts) {
      opts = opts || {};
      board = JXG.JSXGraph.initBoard(containerId, {
        boundingbox: bbox || DEFAULT_BBOX,
        axis: opts.axis !== false,
        grid: !!opts.grid,
        keepaspectratio: !!opts.keepAspect,
        showNavigation: false,
        showCopyright: false,
        pan: { enabled: false },
        zoom: { enabled: false },
        keyboard: { enabled: false }, // 键盘留给导演
        defaultAxes: {
          x: { ticks: { label: { fontSize: 13 }, insertTicks: true } },
          y: { ticks: { label: { fontSize: 13 }, insertTicks: true } },
        },
      });
    }
    initBoard(DEFAULT_BBOX, {});

    // 所有舞台动画统一经此登记，reset 时可整体取消；完成后自回收句柄
    function runTween(opts) {
      var h;
      var origDone = opts.onDone;
      h = CW.tween({
        from: opts.from, to: opts.to, duration: opts.duration, easing: opts.easing,
        onUpdate: opts.onUpdate,
        onDone: function () {
          var idx = tweens.indexOf(h);
          if (idx !== -1) tweens.splice(idx, 1);
          if (origDone) origDone();
        },
      });
      tweens.push(h);
      return h;
    }

    // 画板文本 KaTeX 支持：静态字符串中的 $...$ 片段转为 KaTeX HTML（函数文本不转换，保持每帧轻量）
    function tex(str) {
      if (typeof str !== 'string' || str.indexOf('$') === -1 || typeof katex === 'undefined') return str;
      return str.replace(/\$([^$]+)\$/g, function (m, expr) {
        try { return katex.renderToString(expr, { throwOnError: false }); } catch (e) { return expr; }
      });
    }

    // 兼容"整点函数"坐标写法：function(){return [x,y];} 自动拆为 JSXGraph 认可的 [fnX, fnY]
    function pt(p) {
      if (typeof p === 'function') {
        return [function () { return p()[0]; }, function () { return p()[1]; }];
      }
      return p;
    }

    // 隐形构造点（射线/角的几何锚点，不显示；随所属 id 一并注册清理）
    function ghost(coords) {
      return board.create('point', pt(coords), { visible: false, fixed: true, withLabel: false });
    }

    // 幂等登记：同 id 再次绘制先删旧对象——场景可放心用固定 id 重建状态
    function put(id, obj) {
      if (reg.has(id)) {
        var old = reg.get(id);
        (Array.isArray(old) ? old : [old]).forEach(function (x) {
          try { board.removeObject(x); } catch (e) { /* 已随 board 销毁 */ }
        });
      }
      reg.set(id, obj);
      return obj;
    }

    var stage = {
      getBoard: function () { return board; },
      get: function (id) { return reg.get(id); },
      reset: function (bbox, opts) {
        tweens.forEach(function (t) { t.cancel(); }); // 必须在 freeBoard 前：防 onUpdate 摸到已销毁对象
        tweens.length = 0;
        JXG.JSXGraph.freeBoard(board);
        reg.clear();
        initBoard(bbox || DEFAULT_BBOX, opts);
      },
      remove: function (id) {
        var o = reg.get(id);
        if (!o) return;
        (Array.isArray(o) ? o : [o]).forEach(function (x) {
          try { board.removeObject(x); } catch (e) { /* 已随场景清理 */ }
        });
        reg.delete(id);
        board.update();
      },
      // 曲线。o: {color,width,dash,opacity,domain:[a,b],animate,duration}
      // animate=true 返回生长动画 Promise；否则同步画完返回 resolved Promise
      plotCurve: function (id, fn, o) {
        o = o || {};
        var bb = board.getBoundingBox();
        var dom = o.domain || [bb[0], bb[2]];
        var head = o.animate ? dom[0] : dom[1];
        var curve = board.create('functiongraph', [fn, dom[0], function () { return head; }], {
          strokeColor: o.color || '#37474f',
          strokeWidth: o.width == null ? 3.5 : o.width,
          dash: o.dash || 0,
          strokeOpacity: o.opacity == null ? 1 : o.opacity,
          highlight: false, fixed: true,
        });
        put(id, curve);
        board.update();
        if (!o.animate) return Promise.resolve(curve);
        return new Promise(function (res) {
          runTween({
            from: dom[0], to: dom[1], duration: o.duration || 1100,
            onUpdate: function (v) { head = v; board.update(); },
            onDone: function () { res(curve); },
          });
        });
      },
      // 点。o: {color,name,size,animate,labelOffset}
      // name 含 $..$ 数学式时改用独立 addText 渲染（JSXGraph 原生 point label 不经 tex，$ 会字面显示）
      dropPoint: function (id, x, y, o) {
        o = o || {};
        var target = o.size == null ? 3.5 : o.size;
        var hasTexName = typeof o.name === 'string' && o.name.indexOf('$') !== -1;
        var p = board.create('point', [x, y], {
          name: hasTexName ? '' : (o.name || ''), size: target,
          strokeColor: o.color || '#d32f2f', fillColor: o.color || '#d32f2f',
          fixed: true, highlight: false,
          label: { offset: o.labelOffset || [8, 10], fontSize: 14, strokeColor: '#455a64' },
        });
        if (hasTexName) {
          var off = o.labelOffset || [8, 10];
          var lt = board.create('text',
            [x + (off[0] >= 0 ? 0.35 : -0.35), y + (off[1] < 0 ? -0.55 : 0.5), tex(o.name)], {
              fontSize: 14, strokeColor: o.color || '#455a64',
              anchorX: off[0] >= 0 ? 'left' : 'right', fixed: true, highlight: false,
            });
          put(id, [p, lt]);
        } else {
          put(id, p);
        }
        board.update();
        if (!o.animate) return Promise.resolve(p);
        return new Promise(function (res) {
          runTween({
            from: target * 3, to: target, duration: 420, easing: 'easeOutBack',
            onUpdate: function (v) { p.setAttribute({ size: v }); },
            onDone: function () { res(p); },
          });
        });
      },
      addSegment: function (id, p1, p2, o) {
        o = o || {};
        return put(id, board.create('segment', [pt(p1), pt(p2)], {
          strokeColor: o.color || '#90a4ae', strokeWidth: o.width || 2,
          dash: o.dash == null ? 2 : o.dash, highlight: false, fixed: true,
        }));
      },
      addVLine: function (id, x, o) {
        o = o || {};
        return put(id, board.create('line', [[x, 0], [x, 1]], {
          strokeColor: o.color || '#90a4ae', strokeWidth: o.width || 2,
          dash: o.dash == null ? 2 : o.dash, highlight: false, fixed: true,
        }));
      },
      addHLine: function (id, y, o) {
        o = o || {};
        return put(id, board.create('line', [[0, y], [1, y]], {
          strokeColor: o.color || '#90a4ae', strokeWidth: o.width || 2,
          dash: o.dash == null ? 2 : o.dash, highlight: false, fixed: true,
        }));
      },
      // str 可为字符串或函数（动态文本）；两者均支持 $..$ KaTeX 数学式（无 $ 的动态文本零开销）
      addText: function (id, x, y, str, o) {
        o = o || {};
        var content = typeof str === 'function' ? function () { return tex(str()); } : tex(str);
        return put(id, board.create('text', [x, y, content], {
          fontSize: o.size || 16, strokeColor: o.color || '#37474f',
          anchorX: o.anchorX || 'left', fixed: true, highlight: false,
        }));
      },
      // 着色矩形（值域/区间高亮）。挂到 reg，remove(id) 可清除。
      shadeRect: function (id, x1, y1, x2, y2, o) {
        o = o || {};
        var poly = board.create('polygon', [[x1, y1], [x2, y1], [x2, y2], [x1, y2]], {
          fillColor: o.color || '#1565c0', fillOpacity: o.opacity == null ? 0.08 : o.opacity,
          highlight: false, fixed: true,
          borders: { strokeWidth: 0, highlight: false },
          vertices: { visible: false, fixed: true },
        });
        board.update();
        return put(id, poly);
      },
      // 视窗缓动飞行
      flyTo: function (bbox, o) {
        o = o || {};
        var from = board.getBoundingBox();
        return new Promise(function (res) {
          runTween({
            from: 0, to: 1, duration: o.duration || 1200, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              var bb = from.map(function (a, i) { return a + (bbox[i] - a) * v; });
              board.setBoundingBox(bb, false);
            },
            onDone: res,
          });
        });
      },
      // 沿 Y 轴翻折动画：绘制 y=baseFn(s*x)，s 从 1 到 -1（视觉=绕 Y 轴翻转）
      // 定义域取调用时视窗快照，翻折期间勿并发 flyTo。
      mirrorFold: function (id, baseFn, o) {
        o = o || {};
        var s = 1;
        var bb = board.getBoundingBox();
        var c = board.create('functiongraph',
          [function (x) { return baseFn(s * x); }, bb[0], bb[2]], {
            strokeColor: o.color || '#d32f2f', strokeWidth: o.width || 3,
            strokeOpacity: o.opacity == null ? 0.55 : o.opacity,
            dash: 2, highlight: false, fixed: true,
          });
        put(id, c);
        return new Promise(function (res) {
          runTween({
            from: 1, to: -1, duration: o.duration || 1500, easing: 'easeInOutQuart',
            onUpdate: function (v) { s = v; board.update(); },
            onDone: function () { res(c); },
          });
        });
      },
      // 沿曲线运动的点：mp = movingPoint(...); await mp.run(to, duration)
      // 注意：run 须顺序 await（续跑语义），并发调用会竞争闭包 cx。
      movingPoint: function (id, fn, o) {
        o = o || {};
        var cx = o.from == null ? 0 : o.from;
        var p = board.create('point', [function () { return cx; }, function () { return fn(cx); }], {
          size: o.size || 4.5, name: '',
          strokeColor: o.color || '#6a1b9a', fillColor: o.color || '#6a1b9a',
          fixed: true, highlight: false,
        });
        put(id, p);
        board.update();
        return {
          obj: p,
          run: function (to, duration) {
            return new Promise(function (res) {
              runTween({
                from: cx, to: to, duration: duration || 2400,
                onUpdate: function (v) { cx = v; board.update(); },
                onDone: res,
              });
            });
          },
        };
      },
      // 底数滑块。o: {x1,y1,x2,y2,min,start,max,name,onChange}
      // withLabel:false 禁止 JSXGraph 自动在手柄旁生成 "name = value" label，
      // 避免与场景层通过 addText 手动创建的动态读数叠放产生双重影。
      slider: function (id, o) {
        var s = board.create('slider',
          [[o.x1, o.y1], [o.x2, o.y2], [o.min, o.start, o.max]], {
            name: o.name || 'a', snapWidth: 0.05,
            withLabel: false,
            fillColor: '#455a64', strokeColor: '#455a64',
            baseline: { strokeColor: '#90a4ae' }, highline: { strokeColor: '#6a1b9a' },
          });
        if (o.onChange) s.on('drag', function () { o.onChange(s.Value()); });
        put(id, s);
        board.update();
        return s;
      },
      // 程序驱动滑块动画（配合依赖它的 functiongraph 自动重绘）
      animateSlider: function (sliderObj, target, duration) {
        return new Promise(function (res) {
          runTween({
            from: sliderObj.Value(), to: target, duration: duration || 1500, easing: 'easeInOutQuart',
            onUpdate: function (v) { sliderObj.setValue(v); board.update(); },
            onDone: res,
          });
        });
      },
      // 点尺寸脉冲 n 次（默认 3）
      pulse: function (id, times) {
        var el = reg.get(id);
        if (!el) return Promise.resolve();
        if (Array.isArray(el)) el = el[0]; // 数组注册（如带 $..$ 名的 dropPoint）取主对象脉冲
        var n = times || 3, i = 0;
        var base = el.getAttribute('size') || 3.5;
        return new Promise(function (res) {
          (function once() {
            runTween({
              from: base, to: base * 2.1, duration: 200, easing: 'easeOutBack',
              onUpdate: function (v) { el.setAttribute({ size: v }); },
              onDone: function () {
                runTween({
                  from: base * 2.1, to: base, duration: 200,
                  onUpdate: function (v) { el.setAttribute({ size: v }); },
                  onDone: function () { (++i < n) ? once() : res(); },
                });
              },
            });
          })();
        });
      },
      // 沿 X 轴扫描光带（演示定义域），扫完自动消失
      sweep: function (o) {
        o = o || {};
        var bb = board.getBoundingBox();
        var from = o.from == null ? bb[0] : o.from;
        var to = o.to == null ? bb[2] : o.to;
        var x = from;
        var l = board.create('line', [[function () { return x; }, 0], [function () { return x; }, 1]], {
          strokeColor: o.color || '#f9a825', strokeWidth: 3, strokeOpacity: 0.85,
          highlight: false, fixed: true,
        });
        return new Promise(function (res) {
          runTween({
            from: from, to: to, duration: o.duration || 1700,
            onUpdate: function (v) { x = v; board.update(); },
            onDone: function () { board.removeObject(l); board.update(); res(); },
          });
        });
      },
      // 圆（文氏图等）。cx/cy/r 可为数或函数（动态圆）。o:{color,width,fill,fillOpacity,dash}
      addCircle: function (id, cx, cy, r, o) {
        o = o || {};
        var c = board.create('circle', [[cx, cy], r], {
          strokeColor: o.color || '#37474f', strokeWidth: o.width == null ? 3 : o.width,
          fillColor: o.fill || 'none', fillOpacity: o.fillOpacity == null ? 0 : o.fillOpacity,
          dash: o.dash || 0, fixed: true, highlight: false,
        });
        put(id, c);
        board.update();
        return c;
      },
      // 可自由移动的文本元素（文氏图中的人名/数字卡）。返回 {obj, moveTo(x,y,ms)->Promise}
      // 注意：moveTo 须顺序 await，并发调用会竞争闭包坐标。
      actor: function (id, x, y, str, o) {
        o = o || {};
        var px = x, py = y;
        var t = board.create('text',
          [function () { return px; }, function () { return py; }, tex(str)], {
            fontSize: o.size || 17, strokeColor: o.color || '#37474f',
            cssStyle: (o.bold ? 'font-weight:700;' : '') + (o.css || ''),
            anchorX: 'middle', anchorY: 'middle',
            fixed: true, highlight: false,
          });
        put(id, t);
        board.update();
        return {
          obj: t,
          moveTo: function (nx, ny, duration) {
            var sx = px, sy = py;
            return new Promise(function (res) {
              runTween({
                from: 0, to: 1, duration: duration == null ? 900 : duration, easing: 'easeInOutQuart',
                onUpdate: function (v) { px = sx + (nx - sx) * v; py = sy + (ny - sy) * v; board.update(); },
                onDone: res,
              });
            });
          },
        };
      },
      // 角标注（弧+可选标签），三点式 p1-顶点-p2 逆时针；坐标可为函数（跟随动态图形）。
      // o:{radius,color,label,fill,opacity,ortho:true 直角显方形标记,reflex:true 允许优角}
      // 默认自愈为劣角（≤180°）：按创建时刻位置检测，方向传反自动交换 p1/p2。
      addAngle: function (id, p1, vtx, p2, o) {
        o = o || {};
        if (!o.reflex) {
          var cv = function (c) { return typeof c === 'function' ? c() : c; };
          var sweep = Math.atan2(cv(p2[1]) - cv(vtx[1]), cv(p2[0]) - cv(vtx[0]))
                    - Math.atan2(cv(p1[1]) - cv(vtx[1]), cv(p1[0]) - cv(vtx[0]));
          while (sweep < 0) sweep += 2 * Math.PI;
          if (sweep > Math.PI) { var swp = p1; p1 = p2; p2 = swp; }
        }
        var ga = ghost(p1), gv = ghost(vtx), gb = ghost(p2);
        var a = board.create('angle', [ga, gv, gb], {
          radius: o.radius == null ? 1 : o.radius,
          strokeColor: o.color || '#e64a19', strokeWidth: 2,
          fillColor: o.fill || o.color || '#e64a19',
          fillOpacity: o.opacity == null ? 0.18 : o.opacity,
          orthoType: o.ortho ? 'square' : 'none',
          withLabel: o.label != null, name: o.label || '',
          label: { fontSize: o.labelSize || 16, strokeColor: o.labelColor || o.color || '#e64a19' },
          fixed: true, highlight: false,
        });
        put(id, [a, ga, gv, gb]);
        board.update();
        return a;
      },
      // 射线：从 from 出发经 through 无限延伸。o:{color,width,dash}
      addRay: function (id, from, through, o) {
        o = o || {};
        var g1 = ghost(from), g2 = ghost(through);
        var r = board.create('line', [g1, g2], {
          straightFirst: false, straightLast: true,
          strokeColor: o.color || '#37474f', strokeWidth: o.width == null ? 3 : o.width,
          dash: o.dash || 0, highlight: false, fixed: true,
        });
        put(id, [r, g1, g2]);
        board.update();
        return r;
      },
      // 圆弧：圆心 center、起点 from（定半径）、逆时针扫到 to 方向。坐标可为函数。
      // o:{color,width,dash}。典型用法：√2 在数轴上的落点（对角线长为半径画弧交数轴）。
      addArc: function (id, center, from, to, o) {
        o = o || {};
        var gc = ghost(center), gf = ghost(from), gt = ghost(to);
        var a = board.create('arc', [gc, gf, gt], {
          strokeColor: o.color || '#e64a19', strokeWidth: o.width == null ? 3 : o.width,
          dash: o.dash || 0, highlight: false, fixed: true,
        });
        put(id, [a, gc, gf, gt]);
        board.update();
        return a;
      },
      // 通用多边形（支点三角/箭头/卡片底等示意图形）。pts: [[x,y],...]（坐标可为函数）
      // o 同时接受直觉别名：color/fillColor、opacity/fillOpacity、borderColor/strokeColor、borderWidth/strokeWidth
      addPolygon: function (id, pts, o) {
        o = o || {};
        var fill = o.color || o.fillColor || '#546e7a';
        var fop = o.opacity != null ? o.opacity : (o.fillOpacity != null ? o.fillOpacity : 1);
        var bw = o.borderWidth != null ? o.borderWidth : (o.strokeWidth != null ? o.strokeWidth : 0);
        var poly = board.create('polygon', pts.map(pt), {
          fillColor: fill, fillOpacity: fop,
          highlight: false, fixed: true,
          borders: { strokeWidth: bw, strokeColor: o.borderColor || o.strokeColor || fill, highlight: false },
          vertices: { visible: false, fixed: true },
        });
        board.update();
        return put(id, poly);
      },
      // 条形/直方图矩形柱。底边中心 (cx, 0)、宽 w、高 h（h 可为函数做生长动画）。
      // o:{color,fillOpacity,label,labelColor}。柱从 x 轴向上长，配合带轴画板。
      addBar: function (id, cx, w, h, o) {
        o = o || {};
        var hf = typeof h === 'function' ? h : function () { return h; };
        var bar = board.create('polygon', [
          [function () { return cx - w / 2; }, 0],
          [function () { return cx + w / 2; }, 0],
          [function () { return cx + w / 2; }, function () { return hf(); }],
          [function () { return cx - w / 2; }, function () { return hf(); }],
        ], {
          fillColor: o.color || '#1565c0', fillOpacity: o.fillOpacity == null ? 0.75 : o.fillOpacity,
          highlight: false, fixed: true,
          borders: { strokeWidth: 1.5, strokeColor: o.color || '#1565c0', highlight: false },
          vertices: { visible: false, fixed: true },
        });
        board.update();
        return put(id, bar);
      },
      // 扇形图扇区。圆心 center、半径 r、起始角 a0、终止角 a1（度，逆时针）。
      // o:{color,fillOpacity,borderColor}。用 3 点式 sector：圆心-起点-终点。
      addSector: function (id, center, r, a0, a1, o) {
        o = o || {};
        var cx = center[0], cy = center[1], d2r = Math.PI / 180;
        var gc = ghost([cx, cy]);
        var gs = ghost([cx + r * Math.cos(a0 * d2r), cy + r * Math.sin(a0 * d2r)]);
        var ge = ghost([cx + r * Math.cos(a1 * d2r), cy + r * Math.sin(a1 * d2r)]);
        var sec = board.create('sector', [gc, gs, ge], {
          fillColor: o.color || '#1565c0', fillOpacity: o.fillOpacity == null ? 0.7 : o.fillOpacity,
          strokeColor: o.borderColor || '#fff', strokeWidth: o.borderWidth == null ? 2 : o.borderWidth,
          highlight: false, fixed: true,
        });
        put(id, [sec, gc, gs, ge]);
        board.update();
        return sec;
      },
      // 折线图（多点顺次连线）。pts: [[x,y],...]（坐标可为数或函数）。o:{color,width,dash}
      addPolyline: function (id, pts, o) {
        o = o || {};
        var segs = [];
        var i;
        for (i = 0; i < pts.length - 1; i++) {
          segs.push(board.create('segment', [pt(pts[i]), pt(pts[i + 1])], {
            strokeColor: o.color || '#e64a19', strokeWidth: o.width == null ? 2.5 : o.width,
            dash: o.dash || 0, highlight: false, fixed: true,
          }));
        }
        board.update();
        return put(id, segs);
      },
      // 通用补间：场景自定义动画的正规出口（纳入 reset 统一取消体系，勿在场景直用 CW.tween）
      animate: function (opts) {
        return new Promise(function (res) {
          runTween({
            from: opts.from, to: opts.to, duration: opts.duration, easing: opts.easing,
            onUpdate: opts.onUpdate,
            onDone: res,
          });
        });
      },
    };
    return stage;
  }
  CW.createStage = createStage;
})(window.CW = window.CW || {});
