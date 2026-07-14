(function (CW) {
  'use strict';
  var DEFAULT_BBOX = [-4.5, 9, 4.5, -1.5];

  // CW.createStage(containerId) -> stage
  // 重置策略（设计 D2）：reset() = freeBoard + initBoard，彻底无残留。
  function createStage(containerId) {
    var board = null;
    var reg = new Map(); // id -> JXG 对象（或对象数组）

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
          CW.tween({
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
          CW.tween({
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
    };
    return stage;
  }
  CW.createStage = createStage;
})(window.CW = window.CW || {});
