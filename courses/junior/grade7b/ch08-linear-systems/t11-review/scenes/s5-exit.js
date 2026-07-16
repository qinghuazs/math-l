// s5-exit.js  出口综合与收官（3步）
// 出口题验算：{x+y=5, 2x-y=1} → 相加 3x=6 → x=2, y=3；检验 2+3=5 ✓、4-3=1 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var GOLD   = '#f9a825';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、出口综合与收官',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '出口小综合，三连快答！第一题：x+2y=4 是二元一次方程吗？——是！第二题：解方程组 x+y=5 与 2x-y=1——y 系数互为相反数，直接相加：3x=6，x=2，y=3。第三题：方程组的解在图像上是什么？——两条直线的交点！',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.0, '出口三连', { color: BLUE, size: 22, bold: true });
          S.actor('s5-q1', 0, 5.4, '① $x+2y=4$ 是二元一次方程吗？ → ✓ 是', { color: INK, size: 16 });
          S.actor('s5-q2', 0, 3.8, '② 解 $x+y=5$，$2x-y=1$ → 相加 $3x=6$，$x=2$，$y=3$', { color: ORANGE, size: 16 });
          S.actor('s5-q3', 0, 2.2, '③ 方程组的解 = 两直线的【？】→ 交点！', { color: GREEN, size: 16 });
          P.renderCard('检验②：$2+3=5$ ✓　$2 \\times 2-3=1$ ✓。三连全对，本章过关！');
          return anim ? delay(400) : null;
        },
      },
      {
        narration: '回望整章的学习路线：我们从"一个方程解不了两个未知数"的困境出发，发明了方程组；用代入和加减两大消元法，把二元化一元、把未知化已知；再把方法用于鸡兔同笼、配套生产这些真实问题；最后还看到了三元方程组和两千年前《九章算术》的智慧。这条路线的灵魂，就是两个字——<b>消元</b>。',
        enter: function () {
          // 清掉步1 出口题，避免与地图叠加
          S.remove('s5-title'); S.remove('s5-q1'); S.remove('s5-q2'); S.remove('s5-q3');
          S.actor('s5-map', 0, 6.2, '本章学习地图', { color: PURPLE, size: 20, bold: true });
          S.actor('s5-m1', -6.5, 4.2, '二元方程\n（无数解）', { color: BLUE, size: 14, bold: true, css: 'background:#e3f2fd;border-radius:8px;padding:6px 12px;' });
          S.actor('s5-m2', -2.2, 4.2, '方程组\n（唯一解）', { color: TEAL, size: 14, bold: true, css: 'background:#e0f2f1;border-radius:8px;padding:6px 12px;' });
          S.actor('s5-m3', 2.2, 4.2, '消元两法\n代入·加减', { color: ORANGE, size: 14, bold: true, css: 'background:#fff3e0;border-radius:8px;padding:6px 12px;' });
          S.actor('s5-m4', 6.5, 4.2, '实际应用\n建模七步', { color: GREEN, size: 14, bold: true, css: 'background:#e8f5e9;border-radius:8px;padding:6px 12px;' });
          S.actor('s5-core', 0, 1.5, '灵魂：消元 —— 化未知为已知', { color: RED, size: 22, bold: true });
          P.renderCard('<b>知识主线</b>：二元方程 → 方程组 → 消元求解 → 实际建模 → 三元拓展。');
        },
      },
      {
        narration: '同学们，到这里，《二元一次方程组》整章圆满结束——这也是我们七年级下册数学动态课件的最后一课！从相交线与平行线的几何世界，到实数的数系扩张，到坐标系的数形结合，到统计的数据眼光，再到方程组的消元智慧——七下的数学之旅全部走完。愿你们带着这些思想方法，继续在数学的世界里探索前行！',
        enter: function () {
          // 清掉步2 地图，收官帧只留金框
          S.remove('s5-map'); S.remove('s5-m1'); S.remove('s5-m2'); S.remove('s5-m3');
          S.remove('s5-m4'); S.remove('s5-core');
          S.actor('s5-end', 0, 3.5, '七年级下册 · 全部课程完结', { color: GOLD, size: 28, bold: true,
            css: 'background:#fffde7;border:3px solid #f9a825;border-radius:12px;padding:10px 26px;' });
          P.renderCard('<b>本章灵魂</b>：消元——降维打击，化未知为已知。<br><b>七下五章</b>：几何 · 实数 · 坐标 · 统计 · 方程组，全部完成！', 'warm', 'tada');
          P.renderCard('课后综合实践：用方程组设计一道你自己的"鸡兔同笼"，考考同桌。', 'cool');
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
