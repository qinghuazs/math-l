(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '来总结今天学到的有序数对三个要点：第一是<b>有序性</b>——两个数的顺序不能颠倒；第二是<b>记法</b>——用小括号包裹、逗号分隔；第三是<b>约定</b>——使用前必须说清楚两个数各代表什么。',
        enter: function (anim) {
          S.addText('s5-title', 0, 6.8, '课堂小结：有序数对', { color: INK, size: 24, anchorX: 'middle' });
          P.renderTable({
            head: ['要点', '说明', '例子'],
            rows: [
              ['有序性', '两数顺序不能颠倒', '$(3,5) \\neq (5,3)$'],
              ['记法', '小括号 + 逗号', '$(a, b)$'],
              ['约定', '使用前须约定各数含义', '排在前，号在后'],
            ]
          });
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '有序数对帮助我们用两个数确定平面上的位置。但在现实中，我们需要一个统一的"坐标系"，让大家不需要每次都另行约定就能读懂位置。下节课，我们将学习<b>平面直角坐标系</b>——数学家是如何用两根数轴来建立通用坐标系的！',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s5-next-t', 0, 5.5, '下节课预告', { color: COOL, size: 22, anchorX: 'middle' });
          S.addText('s5-next1', -7.5, 3.8, '有序数对 $(a, b)$ 已经很好了，', { color: INK, size: 17 });
          S.addText('s5-next2', -7.5, 2.8, '但每次都要"约定"太麻烦。', { color: INK, size: 17 });
          S.addText('s5-next3', -7.5, 1.5, '数学家建立了平面直角坐标系，', { color: WARM, size: 18 });
          S.addText('s5-next4', -7.5, 0.5, '用两根互相垂直的数轴给出统一约定！', { color: WARM, size: 18 });
          S.addText('s5-question', 0, -1.0,
            '思考：$(5, 3)$ 在坐标系中位于哪里？',
            { color: AMBER, size: 15, anchorX: 'middle' });
          P.renderCard(
            '<b>本节课小结</b><br>' +
            '① 有序数对 $(a,b)$ 用两个有顺序的数确定位置<br>' +
            '② $(a,b)$ 和 $(b,a)$ 通常不同（有序性）<br>' +
            '③ 使用有序数对前须约定各数含义<br>' +
            '<b>下节课</b>：平面直角坐标系的建立',
            'cool', 'flipInX'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
