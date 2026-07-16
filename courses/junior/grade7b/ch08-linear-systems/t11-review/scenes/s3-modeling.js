// s3-modeling.js  应用建模复习（3步）
// 数学验算：x+y=2, 100x+60y=180 → 100x+60(2-x)=180 → 40x=60 → x=1.5, y=0.5
// 检验：1.5+0.5=2 ✓；100×1.5+60×0.5=150+30=180 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、应用建模复习',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '应用综合题：甲乙两地相距 180 千米，一辆车从甲到乙，先走高速再走普通公路，高速时速 100 千米、普通路时速 60 千米，全程共用 2 小时。问高速和普通路各走了多久？请先自己找出两个等量关系。',
        enter: function () {
          S.actor('s3-title', 0, 7.0, '行程综合：高速 + 普通路', { color: BLUE, size: 20, bold: true });
          S.addPolygon('s3-road-hw', [
            [-8, 4.6], [0.5, 4.6], [0.5, 4.0], [-8, 4.0],
          ], { color: ORANGE, opacity: 0.55 });
          S.addPolygon('s3-road-nm', [
            [0.5, 4.6], [8, 4.6], [8, 4.0], [0.5, 4.0],
          ], { color: GREEN, opacity: 0.45 });
          S.actor('s3-lbl1', -3.75, 5.3, '高速 100 km/h（$x$ 小时）', { color: ORANGE, size: 15 });
          S.actor('s3-lbl2', 4.25, 5.3, '普通 60 km/h（$y$ 小时）', { color: GREEN, size: 15 });
          S.actor('s3-total', 0, 2.8, '全程 180 km，共 2 小时', { color: INK, size: 17, bold: true });
          P.renderCard('两个等量关系：<br>① 时间：$x + y = 2$<br>② 路程：$100x + 60y = 180$');
        },
      },
      {
        narration: '设高速走 x 小时、普通路走 y 小时。时间关系 x+y=2，路程关系 100x+60y=180。用代入法：y=2-x 代入②：100x+120-60x=180，40x=60，x=1.5，于是 y=0.5。',
        enter: function (anim) {
          S.remove('s3-road-hw'); S.remove('s3-road-nm'); S.remove('s3-lbl1');
          S.remove('s3-lbl2'); S.remove('s3-total');
          S.actor('s3-d1', 0, 6.2, '$x+y=2$ ①　$100x+60y=180$ ②', { color: INK, size: 18, bold: true });
          S.actor('s3-d2', 0, 4.6, '①变形：$y=2-x$，代入②', { color: BLUE, size: 16 });
          S.actor('s3-d3', 0, 3.2, '$100x + 60(2-x) = 180 \\Rightarrow 40x = 60$', { color: ORANGE, size: 17 });
          S.actor('s3-d4', 0, 1.8, '$x = 1.5$（小时），$y = 0.5$（小时）', { color: RED, size: 19, bold: true });
          P.renderCard('代入消元：$40x=60 \\Rightarrow x=1.5$，$y=0.5$。');
          return anim ? delay(400) : null;
        },
      },
      {
        narration: '检验兼合理性判断：时间 1.5+0.5=2 小时对；路程 150+30=180 千米对；两个时间都是正数、符合实际。答：高速走了 1.5 小时，普通公路走了 0.5 小时。应用题三查：查方程、查计算、查合理。',
        enter: function () {
          S.remove('s3-d1'); S.remove('s3-d2'); S.remove('s3-d3'); S.remove('s3-d4');
          S.actor('s3-check', 0, 5.2, '检验：$1.5+0.5=2$ ✓　$150+30=180$ ✓　均为正 ✓', { color: GREEN, size: 16 });
          S.actor('s3-ans', 0, 3.2, '答：高速 1.5 小时，普通路 0.5 小时', { color: RED, size: 20, bold: true });
          P.renderCard('<b>应用题三查</b>：查方程（等量关系对吗）、查计算（解对吗）、查合理（符合实际吗）。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
