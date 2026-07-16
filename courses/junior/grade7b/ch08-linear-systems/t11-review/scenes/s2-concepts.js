// s2-concepts.js  概念与解法复习（4步）
// 数学验算：{2x+3y=7, 3x-y=5}：②×3 得 9x-3y=15，与①相加 11x=22 → x=2；回代② 6-y=5 → y=1
// 检验：2×2+3×1=7 ✓；3×2-1=5 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、概念与解法复习',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '先做概念快判。下面四个"方程组"，哪些是二元一次方程组？第一组含 xy 乘积项——不是（乘积使次数变二次）；第二组含 x²——不是；第三组三个未知数两个方程——不是二元；第四组两个未知数、每项次数都是 1——正是！',
        enter: function () {
          S.actor('s2-title', 0, 7.0, '概念快判：谁是二元一次方程组？', { color: BLUE, size: 20, bold: true });
          S.actor('s2-q1', -5, 4.8, 'A. $xy=2$, $x+y=3$', { color: INK, size: 16 });
          S.actor('s2-q2', 5, 4.8, 'B. $x^2+y=4$, $x-y=1$', { color: INK, size: 16 });
          S.actor('s2-q3', -5, 2.8, 'C. $x+y+z=6$, $x-y=1$', { color: INK, size: 16 });
          S.actor('s2-q4', 5, 2.8, 'D. $2x+3y=7$, $3x-y=5$', { color: INK, size: 16 });
          P.renderCard('判断标准：<b>两个</b>未知数 + 含未知数的项次数都是 <b>1</b> + 组合起来。');
        },
      },
      {
        narration: '揭晓：A 有 xy 乘积项，次数为 2，不是；B 有 x²，不是；C 出现三个未知数，不是二元；只有 D 完全符合。判断口诀：看未知数个数、看次数、看是否整式。',
        enter: function () {
          S.actor('s2-a1', -5, 4.0, '✗ 乘积项二次', { color: RED, size: 14 });
          S.actor('s2-a2', 5, 4.0, '✗ 含 $x^2$', { color: RED, size: 14 });
          S.actor('s2-a3', -5, 2.0, '✗ 三个未知数', { color: RED, size: 14 });
          S.actor('s2-a4', 5, 2.0, '✓ 二元一次方程组', { color: GREEN, size: 15, bold: true });
          P.renderCard('答案：只有 <b>D</b>。口诀：<b>两元、一次、整式</b>。', 'warm');
        },
      },
      {
        narration: '再来一道解法综合题：解方程组 2x+3y=7 与 3x-y=5。先做方法选择——第二个方程 y 的系数是 -1，两条路都好走：可以变形 y=3x-5 代入，也可以 ②×3 后与①相加消 y。我们用加减法：②×3 得 9x-3y=15，与①相加，3y 与 -3y 抵消：11x=22，x=2。',
        enter: function (anim) {
          S.actor('s2-eq', 0, 6.5, '$2x+3y=7$ ①　$3x-y=5$ ②', { color: INK, size: 19, bold: true });
          S.actor('s2-d1', 0, 4.8, '②×3：$9x-3y=15$ ③', { color: ORANGE, size: 17 });
          S.addSegment('s2-line', [-4, 4.1], [4, 4.1], { color: INK, width: 2, dash: 0 });
          S.actor('s2-d2', 0, 3.3, '①+③：$11x=22 \\Rightarrow x=2$', { color: RED, size: 18, bold: true });
          S.actor('s2-d3', 0, 1.9, '回代②：$6-y=5 \\Rightarrow y=1$', { color: BLUE, size: 17 });
          P.renderCard('加减消元：$y$ 系数化为 $\\pm 3$ 相加即消。$x=2$，$y=1$。');
          return anim ? delay(400) : null;
        },
      },
      {
        narration: '检验：2×2+3×1=7 对，3×2-1=5 也对。方法选择的口诀再背一遍：见系数 1 想代入，见同倍数想加减，都不明显先乘再加减。',
        enter: function () {
          S.remove('s2-d1'); S.remove('s2-line'); S.remove('s2-d2'); S.remove('s2-d3');
          S.actor('s2-check', 0, 5.0, '检验：$2 \\times 2 + 3 = 7$ ✓　$3 \\times 2 - 1 = 5$ ✓', { color: GREEN, size: 17 });
          S.actor('s2-ans', 0, 3.0, '解：$x=2$，$y=1$', { color: RED, size: 22, bold: true });
          P.renderCard('<b>方法选择口诀</b>：见系数 1 想代入，见同倍数想加减，都不明显先乘再加减。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
