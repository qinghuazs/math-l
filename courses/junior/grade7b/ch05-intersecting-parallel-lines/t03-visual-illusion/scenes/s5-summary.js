(function (CW) {
  'use strict';
  // 场景五：归纳总结
  var S, P;
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var PURPLE = '#6a1b9a';
  var GREEN = '#388e3c';
  var INK = '#455a64';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、归纳：观察-猜想-验证',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '三个实验做完了，我们来归纳一下。数学研究的标准流程分三步：第一步，观察——发现图形的规律和特征；第二步，猜想——根据观察提出假设；第三步，验证——通过测量、计算或推理确认猜想是否正确。',
        enter: function (anim) {
          // 绘制三步流程图：观察 → 猜想 → 验证
          S.actor('s5-a1', -6.5, 1.8, '① 观察', { color: WARM, size: 22, bold: true });
          S.actor('s5-ar1', -3.8, 1.8, '→', { color: INK, size: 26, bold: true });
          S.actor('s5-a2', -1.5, 1.8, '② 猜想', { color: COOL, size: 22, bold: true });
          S.actor('s5-ar2', 1.2, 1.8, '→', { color: INK, size: 26, bold: true });
          S.actor('s5-a3', 3.5, 1.8, '③ 验证', { color: GREEN, size: 22, bold: true });
          // 验证方法
          S.actor('s5-v1', -2.0, -0.5, '测量', { color: GREEN, size: 17 });
          S.actor('s5-v2', 0.5, -0.5, '计算', { color: GREEN, size: 17 });
          S.actor('s5-v3', 3.0, -0.5, '推理', { color: GREEN, size: 17 });
          S.actor('s5-vl', 0.5, -0.1, '/', { color: INK, size: 17 });
          S.actor('s5-vl2', 2.2, -0.1, '/', { color: INK, size: 17 });
          P.renderCard('数学研究三步走：<br>① <b>观察</b>：发现图形特征与规律<br>② <b>猜想</b>：根据观察提出假设<br>③ <b>验证</b>：用测量、计算或推理确认');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '今天的三个错觉告诉我们：观察是起点，但不是终点。观察可以帮助我们发现问题、提出猜想，但只凭观察下的结论往往靠不住！你的眼睛可能在骗你！',
        enter: function (anim) {
          S.actor('s5-warn', 0, 4.5, '观察 ≠ 结论', { color: WARM, size: 28, bold: true });
          P.renderCard('<b>三个错觉的共同教训</b><br>线段：箭头让长度看起来不同 → 实际等长<br>平行线：斜线让平行线看起来歪 → 实际平行<br>圆：背景让圆看起来大小不同 → 实际等大<br><br><b>观察可以提出猜想，但不能代替验证！</b>', 'warm');
          if (!anim) return null;
          var o = S.get('s5-warn');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 14, to: 28, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '本章最重要的两句话，请同学们牢牢记住——第一句：图形看起来怎样，不等于它实际上怎样。第七句：几何结论要有依据，不能只凭观察。这两句话是我们整个相交线与平行线单元的学习基石！',
        enter: function (anim) {
          S.actor('s5-q1', 0, 2.8, '"图形看起来怎样，不等于它实际上怎样。"', { color: PURPLE, size: 17, bold: true });
          S.actor('s5-q2', 0, 0.8, '"几何结论要有依据，不能只凭观察。"', { color: COOL, size: 17, bold: true });
          P.renderCard('<b>本课两句核心话语</b>', 'cool');
          P.renderCard('第 1 句：<b>图形看起来怎样，不等于它实际上怎样。</b>', 'warm');
          P.renderCard('第 7 句：<b>几何结论要有依据，不能只凭观察。</b>', 'cool');
          if (!anim) return null;
          return delay(400);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
