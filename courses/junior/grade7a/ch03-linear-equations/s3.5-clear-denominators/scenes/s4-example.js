// s4-example.js  环节四：例题精讲（4步）
// 数学验算：(x+1)/2 - 1 = (2-x)/3，LCM=6
//   步骤①去分母：3(x+1) - 6 = 2(2-x)
//   步骤②去括号：3x+3-6 = 4-2x → 3x-3 = 4-2x
//   步骤③移项：3x+2x = 4+3
//   步骤④合并：5x = 7
//   步骤⑤系数化1：x = 7/5
//   检验：左=(7/5+1)/2-1 = (12/5)/2-1 = 6/5-1 = 1/5
//        右=(2-7/5)/3 = (3/5)/3 = 1/5 ✓ 左=右
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、例题精讲',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在我们用五步法完整解一道含分数的一元一次方程。方程是：x 加 1 的和除以 2，减去 1，等于 2 减 x 的差除以 3。左边含分母 2，右边含分母 3，两个不同的分母——LCM 等于 6。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.0, '例题：用五步法完整求解', { color: ORANGE, size: 20, bold: true });
          S.actor('s4-eq', 0, 5.4,
            '$\\dfrac{x+1}{2} - 1 = \\dfrac{2-x}{3}$',
            { color: COOL, size: 30, bold: true });
          S.actor('s4-lcm', 0, 3.6,
            '分母：$2$ 和 $3$，最小公倍数 $\\text{LCM} = 6$',
            { color: TEAL, size: 19 });
          S.actor('s4-hint', 0, 2.2,
            '两大坑提醒：不漏乘 · 要括号',
            { color: WARM, size: 17 });
          P.renderCard(
            '<b>例题</b><br>' +
            '$\\dfrac{x+1}{2} - 1 = \\dfrac{2-x}{3}$<br>' +
            '分母 $2$、$3$，$\\text{LCM}=6$。<br>' +
            '五步法：①去分母 ②去括号 ③移项 ④合并 ⑤系数化 1'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '第一步，去分母。两边各项同乘 6：左边，6 乘 x 加 1 除以 2，分母 2 约掉剩 3，分子要加括号，得 3 乘 x 加 1；6 乘负 1 得负 6；右边，6 乘 2 减 x 除以 3，分母 3 约掉剩 2，分子加括号，得 2 乘 2 减 x。第二步，去括号展开：3x 加 3 减 6 等于 4 减 2x，合并常数得 3x 减 3 等于 4 减 2x。',
        enter: function (anim) {
          S.remove('s4-hint');
          var lines = [
            ['s4-s1-label', -9, 1.0, '①去分母（× 6）：', ORANGE, 17],
            ['s4-s1a', 0, -0.2,
              '$6 \\cdot \\dfrac{x+1}{2} - 6 \\cdot 1 = 6 \\cdot \\dfrac{2-x}{3}$',
              INK, 19],
            ['s4-s1b', 0, -1.8,
              '$3(x+1) - 6 = 2(2-x)$',
              COOL, 22],
            ['s4-s2-label', -9, -3.2, '②去括号：', ORANGE, 17],
            ['s4-s2a', 0, -4.4,
              '$3x+3-6 = 4-2x$',
              INK, 21],
            ['s4-s2b', 0, -5.8,
              '$3x-3 = 4-2x$',
              COOL, 22],
          ];
          var p = Promise.resolve();
          lines.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5] });
              return anim ? delay(500) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>①去分母　②去括号</b><br>' +
              '两边同乘 $6$：$3(x+1)-6=2(2-x)$<br>' +
              '展开括号：$3x+3-6=4-2x$<br>' +
              '$\\Rightarrow 3x-3=4-2x$'
            );
          });
        },
      },
      {
        narration: '第三步，移项：含 x 的项移到左边，常数项移到右边，各自变号——3x 加 2x 等于 4 加 3。第四步，合并同类项：5x 等于 7。第五步，系数化为 1：两边除以 5，x 等于 7 除以 5，写成分数就是五分之七。结果出来了！',
        enter: function (anim) {
          S.remove('s4-s1-label'); S.remove('s4-s1a'); S.remove('s4-s1b');
          S.remove('s4-s2-label'); S.remove('s4-s2a');
          var lines2 = [
            ['s4-s2b-keep', 0, 6.5, '由②：$3x-3 = 4-2x$', INK, 19],
            ['s4-s3-label', -9, 5.0, '③移项：', ORANGE, 17],
            ['s4-s3', 0, 3.8, '$3x+2x = 4+3$', INK, 22],
            ['s4-s4-label', -9, 2.4, '④合并同类项：', ORANGE, 17],
            ['s4-s4', 0, 1.2, '$5x = 7$', COOL, 26],
            ['s4-s5-label', -9, -0.2, '⑤系数化为 1：', ORANGE, 17],
            ['s4-s5', 0, -1.6,
              '$x = \\dfrac{7}{5}$',
              WARM, 34],
          ];
          var p = Promise.resolve();
          lines2.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5], bold: it[5] >= 26 });
              return anim ? delay(500) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>③移项　④合并　⑤系数化 1</b><br>' +
              '移项：$3x+2x=4+3$<br>' +
              '合并：$5x=7$<br>' +
              '系数化 $1$：$x=\\dfrac{7}{5}$',
              'cool'
            );
          });
        },
      },
      {
        narration: '最后一步是检验——解完方程一定要检验，而且必须代入最原始的含分母方程！把 x 等于五分之七分别代入左边和右边：左边等于五分之七加 1 的和除以 2 减 1，五分之七加 1 等于五分之十二，五分之十二除以 2 等于五分之六，再减 1 等于五分之一；右边等于 2 减五分之七的差除以 3，2 减五分之七等于五分之三，五分之三除以 3 等于五分之一。左边等于右边，都等于五分之一，所以 x 等于五分之七是原方程的解！',
        enter: function (anim) {
          S.remove('s4-s2b-keep'); S.remove('s4-s3-label'); S.remove('s4-s3');
          S.remove('s4-s4-label'); S.remove('s4-s4'); S.remove('s4-s5-label');
          S.remove('s4-s5');
          S.actor('s4-check-title', 0, 7.0, '检验（代入原方程！）', { color: ORANGE, size: 20, bold: true });
          S.actor('s4-xval', 0, 5.8,
            '$x = \\dfrac{7}{5}$',
            { color: WARM, size: 24, bold: true });
          var checks = [
            ['s4-clabel', -5, 4.4, '左边：', TEAL, 17],
            ['s4-c1', -5, 3.1,
              '$= \\dfrac{\\dfrac{7}{5}+1}{2} - 1$',
              INK, 18],
            ['s4-c2', -5, 1.6,
              '$= \\dfrac{\\dfrac{12}{5}}{2} - 1$',
              INK, 18],
            ['s4-c3', -5, 0.2,
              '$= \\dfrac{6}{5} - 1 = \\dfrac{1}{5}$',
              TEAL, 20],
            ['s4-rlabel', 5, 4.4, '右边：', TEAL, 17],
            ['s4-r1', 5, 3.1,
              '$= \\dfrac{2-\\dfrac{7}{5}}{3}$',
              INK, 18],
            ['s4-r2', 5, 1.6,
              '$= \\dfrac{\\dfrac{3}{5}}{3}$',
              INK, 18],
            ['s4-r3', 5, 0.2,
              '$= \\dfrac{1}{5}$',
              TEAL, 20],
          ];
          var p = Promise.resolve();
          checks.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5] });
              return anim ? delay(400) : Promise.resolve();
            });
          });
          return p.then(function () {
            S.actor('s4-equal', 0, -1.5,
              '左边 = 右边 = $\\dfrac{1}{5}$ ✓',
              { color: GREEN, size: 24, bold: true });
            P.renderCard(
              '<b>检验结论</b><br>' +
              '左边 $= \\dfrac{1}{5}$，右边 $= \\dfrac{1}{5}$，左 $=$ 右 ✓<br>' +
              '所以 $x=\\dfrac{7}{5}$ 是原方程的解。<br>' +
              '检验必须代入<b>原始含分母方程</b>！',
              'teal',
              'tada'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
