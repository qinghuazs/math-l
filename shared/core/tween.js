(function (CW) {
  'use strict';
  var easings = {
    linear: function (t) { return t; },
    easeInOut: function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    easeOut: function (t) { return 1 - Math.pow(1 - t, 3); },
    // 回弹族（easeOutBack/easeOutElastic）中途会越过 1 再回落——补出的值会短暂
    // 越过 to（如尺寸略过头再收回），调用方需容忍瞬时越界；结束帧仍精确等于 to。
    easeOutBack: function (t) {
      var c1 = 1.70158, c3 = c1 + 1, u = t - 1;
      return 1 + c3 * u * u * u + c1 * u * u;
    },
    easeOutElastic: function (t) {
      if (t === 0) return 0;
      if (t === 1) return 1;
      return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
    },
    easeOutBounce: function (t) {
      var n1 = 7.5625, d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) { t -= 1.5 / d1; return n1 * t * t + 0.75; }
      if (t < 2.5 / d1) { t -= 2.25 / d1; return n1 * t * t + 0.9375; }
      t -= 2.625 / d1;
      return n1 * t * t + 0.984375;
    },
    easeInOutQuart: function (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    },
    easeOutExpo: function (t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },
  };
  // CW.tween({from,to,duration,easing,onUpdate(v,p),onDone}) -> {cancel()}
  // 结束帧保证 v===to、p===1（不受缓动浮点误差影响）。
  // 契约：onUpdate 自身不得抛异常，否则动画链中断且 onDone 永不触发。
  function tween(opts) {
    var from = opts.from, to = opts.to;
    var duration = opts.duration == null ? 600 : opts.duration;
    var ease = easings[opts.easing || 'easeInOut'] || easings.easeInOut;
    var rafId = null, cancelled = false;
    var t0 = performance.now();
    function frame(now) {
      if (cancelled) return;
      var p = duration <= 0 ? 1 : Math.min((now - t0) / duration, 1);
      var v = p >= 1 ? to : from + (to - from) * ease(p);
      opts.onUpdate(v, p);
      if (p < 1) rafId = requestAnimationFrame(frame);
      else if (opts.onDone) opts.onDone();
    }
    rafId = requestAnimationFrame(frame);
    return { cancel: function () { cancelled = true; if (rafId) cancelAnimationFrame(rafId); } };
  }
  tween.easings = easings;
  CW.tween = tween;
})(window.CW = window.CW || {});
