(function (CW) {
  'use strict';
  var easings = {
    linear: function (t) { return t; },
    easeInOut: function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    easeOut: function (t) { return 1 - Math.pow(1 - t, 3); },
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
