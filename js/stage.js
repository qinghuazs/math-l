(function (CW) {
  'use strict';
  var DEFAULT_BBOX = [-4.5, 9, 4.5, -1.5];

  // CW.createStage(containerId) -> stage
  // 重置策略（设计 D2）：reset() = freeBoard + initBoard，彻底无残留。
  function createStage(containerId) {
    var board = null;
    var reg = new Map(); // id -> JXG 对象（或对象数组）
    var tweens = []; // 活跃动画句柄，reset 时统一取消

    function initBoard(bbox) {
      board = JXG.JSXGraph.initBoard(containerId, {
        boundingbox: bbox || DEFAULT_BBOX,
        axis: true,
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
    initBoard(DEFAULT_BBOX);

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
      reset: function (bbox) {
        tweens.forEach(function (t) { t.cancel(); }); // 必须在 freeBoard 前：防 onUpdate 摸到已销毁对象
        tweens.length = 0;
        JXG.JSXGraph.freeBoard(board);
        reg.clear();
        initBoard(bbox || DEFAULT_BBOX);
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
      dropPoint: function (id, x, y, o) {
        o = o || {};
        var target = o.size == null ? 3.5 : o.size;
        var p = board.create('point', [x, y], {
          name: o.name || '', size: target,
          strokeColor: o.color || '#d32f2f', fillColor: o.color || '#d32f2f',
          fixed: true, highlight: false,
          label: { offset: o.labelOffset || [8, 10], fontSize: 14, strokeColor: '#455a64' },
        });
        put(id, p);
        board.update();
        if (!o.animate) return Promise.resolve(p);
        return new Promise(function (res) {
          runTween({
            from: target * 3, to: target, duration: 320, easing: 'easeOut',
            onUpdate: function (v) { p.setAttribute({ size: v }); },
            onDone: function () { res(p); },
          });
        });
      },
      addSegment: function (id, p1, p2, o) {
        o = o || {};
        return put(id, board.create('segment', [p1, p2], {
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
      // str 可为字符串或函数（动态文本）
      addText: function (id, x, y, str, o) {
        o = o || {};
        return put(id, board.create('text', [x, y, str], {
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
            from: 0, to: 1, duration: o.duration || 1200,
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
            from: 1, to: -1, duration: o.duration || 1500,
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
      slider: function (id, o) {
        var s = board.create('slider',
          [[o.x1, o.y1], [o.x2, o.y2], [o.min, o.start, o.max]], {
            name: o.name || 'a', snapWidth: 0.05,
            fillColor: '#455a64', strokeColor: '#455a64',
            baseline: { strokeColor: '#90a4ae' }, highline: { strokeColor: '#6a1b9a' },
            label: { fontSize: 16, strokeColor: '#37474f' },
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
            from: sliderObj.Value(), to: target, duration: duration || 1500,
            onUpdate: function (v) { sliderObj.setValue(v); board.update(); },
            onDone: res,
          });
        });
      },
      // 点尺寸脉冲 n 次（默认 3）
      pulse: function (id, times) {
        var el = reg.get(id);
        if (!el) return Promise.resolve();
        var n = times || 3, i = 0;
        var base = el.getAttribute('size') || 3.5;
        return new Promise(function (res) {
          (function once() {
            runTween({
              from: base, to: base * 2.1, duration: 200, easing: 'easeOut',
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
    };
    return stage;
  }
  CW.createStage = createStage;
})(window.CW = window.CW || {});
