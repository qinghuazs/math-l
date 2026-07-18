// s6-summary.js  六、易错与小结（3步）
// 易错点1：x²+x²=2x²（不是 2x⁴）——合并只加系数，指数绝对不动
// 易错点2：2x 与 3x² 不是同类项，不能合并（指数1≠2）
// 易错点3：-ab+3ab=2ab（系数-1+3=2，不是3，负号归系数）
// 验算：x=3 时 x²+x²=9+9=18=2×9=2x²；若误写 2x⁴=162 显然错
// 悬念：下节课《去括号》——3x-(2x+1) 怎么处理？
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：陷阱一——指数相加；陷阱二——非同类项强行合并
      {
        narration: '最后一环节，我们来集中消灭最常见的两个错误陷阱。陷阱一：x² 加 x²，有同学会写成 2x 的四次方——大错特错！合并同类项只加系数，系数 1 加 1 等于 2，字母和指数照抄，结果是 2x²，不是 2x 的四次方。用 x 等于 3 验算：x² 加 x² 等于 9 加 9 等于 18；2x² 等于 2 乘以 9 等于 18，正确；如果写成 2x 的四次方等于 162，完全不同，那是乘法，不是加法！陷阱二：2x 加 3x²，有人写成 5x 的三次方，这完全错误——字母 x 的指数 1 和 2 不同，2x 和 3x² 不是同类项，根本不能合并，正确结果按降幂排列应写成 3x² 加 2x，已是最简形式。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.0, '六、易错与小结', { color: COOL, size: 22, bold: true });

          S.actor('s6-trap1-t', 0, 5.8, '陷阱一：指数相加（最常见错误！）', { color: RED, size: 19, bold: true });
          S.actor('s6-trap1-wrong', -4, 4.5,
            '✗　$x^2 + x^2 = 2x^4$',
            { color: RED, size: 20 });
          S.actor('s6-trap1-right', 4, 4.5,
            '✓　$x^2 + x^2 = 2x^2$',
            { color: GREEN, size: 20 });
          S.actor('s6-trap1-why', 0, 3.4,
            '合并只加系数（$1+1=2$），指数 2 绝对不动！',
            { color: WARM, size: 16 });

          S.addSegment('s6-div1', [-8, 2.5], [8, 2.5], { color: GRAY, width: 1, dash: 2 });

          S.actor('s6-trap2-t', 0, 1.8, '陷阱二：非同类项强行合并', { color: RED, size: 19, bold: true });
          S.actor('s6-trap2-wrong', -4, 0.7,
            '✗　$2x + 3x^2 = 5x^3$',
            { color: RED, size: 20 });
          S.actor('s6-trap2-right', 4, 0.7,
            '✓　$3x^2 + 2x$（最简形式）',
            { color: GREEN, size: 18 });
          S.actor('s6-trap2-why', 0, -0.4,
            '$2x$ 指数为 1，$3x^2$ 指数为 2，不是同类项！',
            { color: WARM, size: 16 });

          P.renderTable({
            head: ['错误写法', '错误原因', '正确结果'],
            rows: [
              ['$x^2+x^2=2x^4$', '把指数也相加了', '$2x^2$'],
              ['$2x+3x^2=5x^3$', '非同类项强行合并，指数相加', '$3x^2+2x$'],
              ['$-ab+3ab=3ab$', '忽略系数 $-1$，应计算 $-1+3=2$', '$2ab$'],
            ],
          });

          return anim ? delay(400) : null;
        },
      },

      // Step 2：知识树回顾
      {
        narration: '好，我们来做本节课的知识树回顾。第一层：同类项定义——两同两无关。两同是字母种类相同加各字母指数分别相同；两无关是与系数无关、与字母书写顺序无关；特例是所有常数项互为同类项。第二层：合并法则——找、合、抄三步；依据是分配律逆用；结果按降幂排列。第三层：应用策略——先化简再代入，既减少运算量又降低出错率。',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-trap1-t'); S.remove('s6-trap1-wrong'); S.remove('s6-trap1-right'); S.remove('s6-trap1-why');
          S.remove('s6-div1');
          S.remove('s6-trap2-t'); S.remove('s6-trap2-wrong'); S.remove('s6-trap2-right'); S.remove('s6-trap2-why');

          S.actor('s6-tree-t', 0, 7.0, '知识结构总结', { color: COOL, size: 22, bold: true });

          S.actor('s6-tree-root', 0, 5.8, '合并同类项', { color: WARM, size: 20, bold: true });

          S.actor('s6-branch1', -7, 4.3, '① 同类项定义', { color: COOL, size: 17, bold: true });
          S.actor('s6-b1a', -7, 3.3, '两同：字母相同+指数分别相同', { color: INK, size: 14 });
          S.actor('s6-b1b', -7, 2.5, '两无关：与系数/顺序无关', { color: INK, size: 14 });
          S.actor('s6-b1c', -7, 1.7, '特例：常数项互为同类项', { color: TEAL, size: 13 });

          S.actor('s6-branch2', 0, 4.3, '② 合并法则', { color: WARM, size: 17, bold: true });
          S.actor('s6-b2a', 0, 3.3, '找—合—抄（三步法）', { color: INK, size: 14 });
          S.actor('s6-b2b', 0, 2.5, '依据：分配律逆用', { color: INK, size: 14 });
          S.actor('s6-b2c', 0, 1.7, '结果：降幂排列', { color: TEAL, size: 13 });

          S.actor('s6-branch3', 7, 4.3, '③ 应用策略', { color: GREEN, size: 17, bold: true });
          S.actor('s6-b3a', 7, 3.3, '先化简，再代入', { color: INK, size: 14 });
          S.actor('s6-b3b', 7, 2.5, '减少运算量', { color: INK, size: 14 });
          S.actor('s6-b3c', 7, 1.7, '降低出错率', { color: TEAL, size: 13 });

          P.renderCard(
            '<b>知识树</b>：合并同类项<br>' +
            '① 两同两无关（定义）<br>' +
            '② 找—合—抄，降幂排列（法则）<br>' +
            '③ 先化简，再代入（应用）',
            'teal',
            'bounceIn'
          );

          return anim ? delay(400) : null;
        },
      },

      // Step 3：悬念——有括号怎么办？
      {
        narration: '最后留一个悬念。我们今天学会了合并同类项。如果多项式里有括号，比如 3x 减括号 2x 加 1，括号里的项还能直接合并吗？如果直接把 3x 和 2x 合并，忽略括号，答案就会出错。括号怎么处理，等下节课《去括号》来解决！',
        enter: function (anim) {
          S.remove('s6-tree-t'); S.remove('s6-tree-root');
          S.remove('s6-branch1'); S.remove('s6-b1a'); S.remove('s6-b1b'); S.remove('s6-b1c');
          S.remove('s6-branch2'); S.remove('s6-b2a'); S.remove('s6-b2b'); S.remove('s6-b2c');
          S.remove('s6-branch3'); S.remove('s6-b3a'); S.remove('s6-b3b'); S.remove('s6-b3c');

          S.actor('s6-sus-t', 0, 6.5, '下节课的悬念……', { color: WARM, size: 22, bold: true });

          S.actor('s6-sus-expr', 0, 4.8,
            '$3x - (2x + 1) = ?$',
            { color: COOL, size: 28, bold: true });

          S.actor('s6-sus-wrong', -3, 3.0,
            '直接合并 $3x$ 与 $2x$？',
            { color: RED, size: 18 });
          S.actor('s6-sus-wrongres', -3, 2.0,
            '✗ 忽略括号会出错！',
            { color: RED, size: 17 });

          S.actor('s6-sus-ask', 0, 0.5,
            '括号里的项怎么处理？',
            { color: TEAL, size: 19, bold: true });
          S.actor('s6-sus-next', 0, -0.8,
            '下节课《去括号》见！',
            { color: COOL, size: 20, bold: true });

          S.actor('s6-summary', 0, -2.8,
            '本节核心：找—合—抄，先化简再代入！',
            { color: WARM, size: 17, bold: true });

          P.renderCard(
            '<b>悬念：有括号怎么办？</b><br>' +
            '$3x - (2x+1) = ?$<br>' +
            '能直接把 $3x$ 和 $2x$ 合并吗？<br>' +
            '<b>下节课《去括号》解答！</b>',
            'warm',
            'headShake'
          );

          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
