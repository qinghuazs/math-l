(function (CW) {
  'use strict';
  // CW.createDirector({scenes, stage, panel, win?, onUpdate?, onFullscreen?})
  // 光标 (s,k)：s 环节索引，k 步索引（进入环节即执行步 0）。
  // 前进：steps[k].enter(true)；后退/跳转：reset -> setup -> 快放 enter(false)（设计 D2）。
  function createDirector(cfg) {
    var scenes = cfg.scenes, stage = cfg.stage, panel = cfg.panel;
    var win = cfg.win || window;
    var s = 0, k = 0, busy = false;
    var expectedHash = '';

    function writeHash() {
      expectedHash = '#' + (s + 1) + '/' + (k + 1);
      if (win.location.hash !== expectedHash) win.location.hash = expectedHash;
    }
    function notify() { if (cfg.onUpdate) cfg.onUpdate({ s: s, k: k }); }

    function parseHash(h) {
      var m = /^#(\d+)\/(\d+)$/.exec(h || '');
      if (!m) return null;
      var si = +m[1] - 1;
      if (si < 0 || si >= scenes.length) return null;
      var ki = Math.min(Math.max(+m[2] - 1, 0), scenes[si].steps.length - 1);
      return { s: si, k: ki };
    }

    // 重置 + 快放到 (ts,tk)；animateLast=true 时最后一步带动画
    function replay(ts, tk, animateLast) {
      busy = true;
      var sc = scenes[ts];
      stage.reset(sc.bbox, sc.board);
      panel.setScene(sc.title);
      panel.clearExtras();
      panel.setControls(null);
      if (sc.setup) sc.setup(stage, panel);
      var p = Promise.resolve();
      var i;
      for (i = 0; i <= tk; i++) {
        (function (idx) {
          var step = sc.steps[idx];
          var anim = animateLast && idx === tk;
          p = p.then(function () {
            panel.setNarration(step.narration);
            return step.enter(anim);
          });
        })(i);
      }
      return p.then(function () {
        s = ts; k = tk; busy = false;
        writeHash(); notify();
      }, function (err) {
        busy = false; // 课堂保命：快放失败也不锁死键盘
        if (win.console) win.console.error('[director] replay failed', err);
      });
    }

    function next() {
      if (busy) return Promise.resolve();
      var sc = scenes[s];
      if (k + 1 < sc.steps.length) {
        busy = true;
        var target = k + 1;
        var step = sc.steps[target];
        return Promise.resolve().then(function () {
          panel.setNarration(step.narration);
          return step.enter(true);
        }).then(function () {
          k = target; busy = false; writeHash(); notify();
        }, function (err) {
          busy = false; // 课堂保命：失败必释放；k 未提交，光标停在上一完好步
          if (win.console) win.console.error('[director] step enter failed', err);
        });
      }
      if (s + 1 < scenes.length) return replay(s + 1, 0, true);
      return Promise.resolve();
    }

    function prev() {
      if (busy) return Promise.resolve();
      if (k > 0) return replay(s, k - 1, false);
      if (s > 0) return replay(s - 1, scenes[s - 1].steps.length - 1, false);
      return Promise.resolve();
    }

    function jump(ts, tk) {
      if (busy) return Promise.resolve();
      return replay(ts, tk == null ? 0 : tk, false);
    }

    function onKey(e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key) {
        case ' ': case 'ArrowRight': case 'PageDown':
          e.preventDefault(); next(); break;
        case 'ArrowLeft': case 'PageUp':
          e.preventDefault(); prev(); break;
        case 'Home':
          e.preventDefault(); jump(s, 0); break;
        case 'f': case 'F':
          if (cfg.onFullscreen) cfg.onFullscreen(); break;
        default:
          if (/^[1-9]$/.test(e.key)) {
            var n = +e.key - 1;
            if (n < scenes.length) jump(n, 0);
          }
      }
    }

    function start() {
      var h = parseHash(win.location.hash);
      var t = h || { s: 0, k: 0 };
      win.addEventListener('keydown', onKey);
      win.addEventListener('hashchange', function () {
        if (win.location.hash === expectedHash) return; // 自己写的，忽略
        if (busy) return; // 进行中的 replay 不被外部改 hash 打断
        var hh = parseHash(win.location.hash);
        if (hh) replay(hh.s, hh.k, false);
      });
      return replay(t.s, t.k, false);
    }

    return {
      start: start, next: next, prev: prev, jump: jump,
      getState: function () { return { s: s, k: k }; },
      parseHash: parseHash,
    };
  }
  CW.createDirector = createDirector;
})(window.CW = window.CW || {});
