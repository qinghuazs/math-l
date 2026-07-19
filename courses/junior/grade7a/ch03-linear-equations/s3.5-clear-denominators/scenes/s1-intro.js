// s1-intro.js  环节一：三千年前的方程（3步）
// 数学验算：啊哈问题 x + x/7 = 8，两边乘7：7x + x = 56 → 8x = 56 → x = 7
// 验证：7 + 7/7 = 7 + 1 = 8 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、三千年前的方程',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们，今天我们从一道三千年前的数学题开始。约公元前 1650 年，古埃及书吏阿姆斯在一卷纸草书上记录了 84 道数学题，其中有一类题用埃及语"啊哈（aha）"称呼未知量——就是我们今天说的"某个数"。让我们来看看这道传说中的啊哈问题。',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.5, '阿姆斯纸草书·啊哈问题', { color: ORANGE, size: 22, bold: true });
          S.actor('s1-year', 0, 5.2, '约公元前 1650 年  |  古埃及', { color: INK, size: 16 });
          S.actor('s1-deco1', -7, 2.5, '𓂀', { color: ORANGE, size: 40 });
          S.actor('s1-deco2', 7, 2.5, '𓂀', { color: ORANGE, size: 40 });
          S.actor('s1-prob', 0, 1.5,
            '某个数，加上它的七分之一，等于 8。',
            { color: INK, size: 20 });
          S.actor('s1-q', 0, 0.0,
            '这个数是多少？',
            { color: WARM, size: 22, bold: true });
          P.renderCard(
            '<b>啊哈问题（Aha Problem）</b><br>' +
            '古埃及人用"啊哈"表示未知量，<br>' +
            '把含未知量的问题称为"啊哈问题"。<br>' +
            '这是人类历史上最早的方程雏形之一！'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '用现代符号，设这个数为 x，"某个数加上它的七分之一等于8"就是这个方程。古埃及人当年是怎么解这道题的？他们用"试凑加比例"——先猜 x 等于 7，算一算：7 加 7 除以 7 等于 7 加 1 等于 8，恰好等于 8！太巧了，这次猜对了。但要是结果不是 8 怎么办？他们还得用比例法再折算一次……非常麻烦。',
        enter: function (anim) {
          S.actor('s1-eq', 0, 5.8,
            '$x + \\dfrac{x}{7} = 8$',
            { color: COOL, size: 30, bold: true });
          S.actor('s1-trial-title', -4.5, 3.5, '古埃及试凑法：', { color: ORANGE, size: 18, bold: true });
          S.actor('s1-trial1', -4.5, 2.2, '猜 $x=7$，验算：', { color: INK, size: 17 });
          S.actor('s1-trial2', -4.5, 0.9,
            '$7 + \\dfrac{7}{7} = 7 + 1 = 8$ ✓',
            { color: TEAL, size: 17 });
          S.actor('s1-trial3', -4.5, -0.4, '（刚好猜对，否则还要', { color: INK, size: 15 });
          S.actor('s1-trial4', -4.5, -1.5, '用比例法折算……很繁琐）', { color: INK, size: 15 });
          P.renderCard(
            '<b>古埃及解法：试凑 + 比例</b><br>' +
            '先假设一个方便的数，计算结果，<br>' +
            '再用比例折算到真正答案。<br>' +
            '过程繁琐，今天我们有更好的工具！'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
      {
        narration: '看，今天我们用去分母法：两边同乘以 7，左边 7 乘 x 得 7x，7 乘 x 除以 7 约掉分母得 x，右边 7 乘 8 得 56。于是 8x 等于 56，x 等于 7，三步搞定！三千年前的难题，今天一步化解分母——这就是去分母的力量！',
        enter: function (anim) {
          S.remove('s1-trial-title'); S.remove('s1-trial1'); S.remove('s1-trial2');
          S.remove('s1-trial3'); S.remove('s1-trial4');
          S.actor('s1-modern-title', 3.5, 3.5, '现代去分母法：', { color: COOL, size: 18, bold: true });
          var steps = [
            ['s1-m1', 3.5, 2.2, '两边同乘 $7$：'],
            ['s1-m2', 3.5, 0.9, '$7x + x = 56$'],
            ['s1-m3', 3.5, -0.3, '$8x = 56$'],
            ['s1-m4', 3.5, -1.6, '$x = 7$'],
          ];
          var colors = [INK, INK, COOL, WARM];
          var sizes = [17, 17, 19, 22];
          var bolds = [false, false, false, true];
          var p = Promise.resolve();
          steps.forEach(function (it, i) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: colors[i], size: sizes[i], bold: bolds[i] });
              return anim ? delay(350) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>去分母——三千年难题三步解！</b><br>' +
              '两边同乘最小公倍数 $7$，分母消失，<br>' +
              '方程变成整式方程，直接解出 $x=7$。<br>' +
              '<b>这就是本节核心技能：去分母！</b>',
              'warm'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
