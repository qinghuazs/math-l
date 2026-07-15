(function (CW) {
  'use strict';
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、引入：眼见一定为实吗？',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，我们每天用眼睛观察世界——那么，眼睛看到的，一定就是真实的吗？今天我们来做三个小实验，挑战一下你的眼睛！',
        enter: function (anim) {
          S.actor('s1-q', 0, 2.0, '眼见一定为实吗？', { color: WARM, size: 32, bold: true });
          S.actor('s1-eye1', -5, -1.2, '👁', { color: INK, size: 40 });
          S.actor('s1-eye2', 5, -1.2, '👁', { color: INK, size: 40 });
          P.renderCard('你的眼睛是最可靠的测量工具吗？<br>今天用三个<b>视觉错觉</b>实验来检验一下！');
          if (!anim) return null;
          var o1 = S.get('s1-q');
          function setSize(v) { if (o1) o1.setAttribute({ fontSize: v }); }
          return S.animate({ from: 16, to: 32, duration: 600, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '我们今天要挑战的三个错觉：第一，线段的长短；第二，直线的平行与否；第三，圆的大小。每次你凭直觉先判断，然后我们一起用数学来验证！',
        enter: function (anim) {
          S.actor('s1-t1', -6.5, 3.5, '实验一', { color: WARM, size: 20, bold: true });
          S.actor('s1-d1', -6.5, 2.5, '线段长短错觉', { color: INK, size: 18 });
          S.actor('s1-t2', -6.5, 1.0, '实验二', { color: COOL, size: 20, bold: true });
          S.actor('s1-d2', -6.5, 0, '平行线倾斜错觉', { color: INK, size: 18 });
          S.actor('s1-t3', -6.5, -1.5, '实验三', { color: '#6a1b9a', size: 20, bold: true });
          S.actor('s1-d3', -6.5, -2.5, '圆圈大小错觉', { color: INK, size: 18 });
          P.renderCard('三个实验，三次挑战！<br>先用<b>直觉</b>猜，再用<b>测量与推理</b>验证——<br>哪个才是数学的正确做法？');
          if (!anim) return null;
          return delay(200);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
