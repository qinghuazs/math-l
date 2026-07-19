// s2-lcm.js  环节二：同乘最小公倍数（3步）
// 数学验算：
//   x/2 + 1 = 3，两边乘2：x + 2 = 6 → x = 4；验证：4/2+1=3 ✓
//   x/2 + x/3 = 5，LCM(2,3)=6，两边乘6：3x+2x=30 → 5x=30 → x=6；验证：6/2+6/3=3+2=5 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、同乘最小公倍数',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '分母是方程里的"拦路虎"——只要把它消掉，方程就变成我们已经会解的整式方程。消分母的武器，就是我们在 3.1 节学过的等式性质 2：等式两边同时乘同一个不为零的数，等式依然成立。现在看这个方程：x 除以 2 加 1 等于 3，分母是 2，两边同乘 2，分母就消了！',
        enter: function (anim) {
          S.actor('s2-eq', 0, 6.0,
            '$\\dfrac{x}{2} + 1 = 3$',
            { color: COOL, size: 30, bold: true });
          S.actor('s2-basis', 0, 4.3,
            '等式性质 2：两边同乘同一个不为零的数，等式成立',
            { color: TEAL, size: 16 });
          S.actor('s2-arrow', 0, 3.0, '两边同乘 $2$↓', { color: WARM, size: 18, bold: true });
          P.renderCard(
            '<b>去分母的依据：等式性质 2</b><br>' +
            '等式两边同时乘同一个不为零的数，<br>' +
            '所得结果仍是等式。<br>' +
            '分母是 $2$，乘 $2$ 即可消掉它！'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '两边各项都乘以 2：左边，2 乘以 x 除以 2，分母被约掉，得 x；2 乘以 1，得 2；右边，2 乘以 3，得 6。注意！那个"1"——它不含分母，但它也必须乘 2，一项都不能漏！得到 x 加 2 等于 6，x 等于 4。',
        enter: function (anim) {
          S.remove('s2-arrow');
          var lines = [
            ['s2-step1', 0, 2.2, '$2 \\cdot \\dfrac{x}{2} + 2 \\cdot 1 = 2 \\cdot 3$', INK, 22],
            ['s2-step2', 0, 0.5, '$x + 2 = 6$', COOL, 26],
            ['s2-step3', 0, -1.2, '$x = 4$', WARM, 30],
          ];
          var p = Promise.resolve();
          lines.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5], bold: it[5] >= 26 });
              return anim ? delay(500) : Promise.resolve();
            });
          });
          return p.then(function () {
            S.actor('s2-warn', -6, -3.0, '⚠ 不含分母的 1 也要乘 2！', { color: WARM, size: 17, bold: true });
            P.renderCard(
              '<b>每一项都要乘！</b><br>' +
              '$2 \\cdot \\dfrac{x}{2} + 2 \\cdot 1 = 2 \\cdot 3$<br>' +
              '$\\Rightarrow x + 2 = 6 \\Rightarrow x = 4$<br>' +
              '验算：$\\dfrac{4}{2}+1=2+1=3$ ✓'
            );
          });
        },
      },
      {
        narration: '如果方程含有两个不同的分母怎么办？比如 x 除以 2 加 x 除以 3 等于 5，分母有 2 和 3，要同时消掉它们，就要找 2 和 3 的最小公倍数——LCM 等于 6。两边同乘 6：6 乘 x 除以 2 得 3x，6 乘 x 除以 3 得 2x，右边 6 乘 5 得 30，所以 3x 加 2x 等于 30，5x 等于 30，x 等于 6。下面这个表格可以帮我们快速找 LCM。',
        enter: function (anim) {
          S.remove('s2-eq'); S.remove('s2-basis'); S.remove('s2-step1');
          S.remove('s2-step2'); S.remove('s2-step3'); S.remove('s2-warn');
          S.actor('s2-eq2', 0, 6.5,
            '$\\dfrac{x}{2} + \\dfrac{x}{3} = 5$　（$\\text{LCM}=6$）',
            { color: COOL, size: 24, bold: true });
          var steps2 = [
            ['s2-t1', 0, 4.8, '$6 \\cdot \\dfrac{x}{2} + 6 \\cdot \\dfrac{x}{3} = 6 \\cdot 5$', INK, 20],
            ['s2-t2', 0, 3.2, '$3x + 2x = 30$', COOL, 22],
            ['s2-t3', 0, 1.8, '$5x = 30 \\Rightarrow x = 6$', WARM, 22],
          ];
          var p = Promise.resolve();
          steps2.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5], bold: it[5] >= 22 });
              return anim ? delay(450) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderTable({
              head: ['分母组合', '最小公倍数 LCM'],
              rows: [
                ['2 和 3', '6'],
                ['4 和 6', '12'],
                ['3 和 5', '15'],
                ['2 和 6', '6'],
              ],
            });
            P.renderCard(
              '<b>去分母 = 两边同乘 LCM</b><br>' +
              '等式性质 2 的直接应用：<br>' +
              '各分母的最小公倍数是乘数，<br>' +
              '每一项——含分母的、不含分母的——都要乘！',
              'teal'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
