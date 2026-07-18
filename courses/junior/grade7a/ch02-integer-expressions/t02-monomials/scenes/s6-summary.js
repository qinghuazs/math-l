// s6-summary.js  环节六：易错与小结（3步）
// 数学验算：
// Step1 三大易错：
//   -5x²y³ 系数=-5（不是5），次数=2+3=5 ✓
//   πr² 系数=π（π是常数），次数=2（不是3）✓
//   abc 次数=1+1+1=3（不是1）✓
// Step2 知识树：系数/次数两分支结构正确
// Step3 悬念：3x + (-2y) = 3x - 2y，两个单项式用加减连接，下节课学多项式
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var GREEN = '#2e7d32';
  var RED   = '#c62828';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：三大易错集中复盘
      {
        narration: '最后一个环节，我们集中复盘三大易错！第一个：负5x的平方y的三次方，系数是多少？有人说是5——错！负号属于系数，系数是 负5。第二个：πr的平方，系数是什么？有人说是1，π是字母，次数是3——全错！π是确定的常数，不是字母，系数是π，次数只看字母 r，指数是2，次数是2。第三个：abc，次数是多少？有人说是1——错！三个字母各贡献指数1，次数是 1加1加1等于3！',
        enter: function (anim) {
          P.renderTable({
            head: ['题目', '常见错误', '正确结论'],
            rows: [
              [
                '$-5x^2y^3$ 的系数',
                '系数是 $5$（丢失负号）',
                '系数是 $-5$，负号属于系数'
              ],
              [
                '$\\pi r^2$ 的系数与次数',
                '系数是 $1$，次数 $=3$',
                '系数是 $\\pi$（常数），次数 $=2$'
              ],
              [
                '$abc$ 的次数',
                '次数是 $1$',
                '次数是 $3$（$1+1+1$，三字母各贡献 $1$）'
              ],
            ]
          });

          // 警示标题
          S.actor('s6-warn-title', 0, 7.0,
            '三大易错——再过一遍！',
            { color: RED, size: 20, bold: true });

          P.renderCard(
            '<b>三大易错</b><br>' +
            '① $-5x^2y^3$ 系数 $= -5$（负号不丢！）<br>' +
            '② $\\pi r^2$ 系数 $= \\pi$，次数 $= 2$（$\\pi$ 是常数）<br>' +
            '③ $abc$ 次数 $= 3$（每字母各贡献 $1$）',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 2：知识树小结（画板线段树 + 面板三条结论卡）
      {
        narration: '现在来梳理一下本节课的知识结构，画一棵知识树。单项式是总根，分出两条主支：系数和次数。系数那一支：数字因数含符号；负a 系数等于负1；π 是系数；分数也可做系数。次数那一支：所有字母指数之和；abc 次数3；系数里的乘方不计入次数；单独一个数次数是0。两条主支独立，互不干扰！',
        enter: function (anim) {
          // 清掉警示标题
          S.remove('s6-warn-title');

          // 知识树（线段）
          // 根节点
          S.actor('s6-root', 0, 7.2, '单项式', { color: COOL, size: 22, bold: true });
          // 主干
          S.addSegment('s6-trunk', [0, 6.7], [0, 5.8],
            { color: INK, width: 2, dash: 0 });
          // 两条分支
          S.addSegment('s6-br-left',  [0, 5.8], [-5, 4.8],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s6-br-right', [0, 5.8], [ 5, 4.8],
            { color: INK, width: 2, dash: 0 });
          // 节点标签
          S.actor('s6-node-coef', -5, 4.5, '系数', { color: WARM,  size: 20, bold: true });
          S.actor('s6-node-deg',   5, 4.5, '次数', { color: GREEN, size: 20, bold: true });

          // 系数子条目
          S.addSegment('s6-c1-line', [-5, 4.2], [-5, 3.3], { color: WARM, width: 1.5, dash: 1 });
          S.actor('s6-c1', -5, 3.1, '数字因数（含符号）',   { color: INK, size: 13 });
          S.addSegment('s6-c2-line', [-5, 2.8], [-5, 2.0], { color: WARM, width: 1.5, dash: 1 });
          S.actor('s6-c2', -5, 1.8, '$-a$ 系数 $-1$',        { color: INK, size: 13 });
          S.addSegment('s6-c3-line', [-5, 1.5], [-5, 0.7], { color: WARM, width: 1.5, dash: 1 });
          S.actor('s6-c3', -5, 0.5, '$\\pi$、$\\sqrt{2}$ 归系数', { color: INK, size: 13 });
          S.addSegment('s6-c4-line', [-5, 0.2], [-5, -0.6], { color: WARM, width: 1.5, dash: 1 });
          S.actor('s6-c4', -5, -0.8, '分数、小数均可',      { color: INK, size: 13 });

          // 次数子条目
          S.addSegment('s6-d1-line', [5, 4.2], [5, 3.3], { color: GREEN, width: 1.5, dash: 1 });
          S.actor('s6-d1', 5, 3.1, '字母指数之和',          { color: INK, size: 13 });
          S.addSegment('s6-d2-line', [5, 2.8], [5, 2.0], { color: GREEN, width: 1.5, dash: 1 });
          S.actor('s6-d2', 5, 1.8, '$abc$ 次数 $3$',          { color: INK, size: 13 });
          S.addSegment('s6-d3-line', [5, 1.5], [5, 0.7], { color: GREEN, width: 1.5, dash: 1 });
          S.actor('s6-d3', 5, 0.5, '系数乘方不计入',        { color: INK, size: 13 });
          S.addSegment('s6-d4-line', [5, 0.2], [5, -0.6], { color: GREEN, width: 1.5, dash: 1 });
          S.actor('s6-d4', 5, -0.8, '单独数次数 $= 0$',       { color: INK, size: 13 });

          P.renderCard(
            '<b>知识树</b><br>' +
            '单项式 → <span style="color:#e64a19">系数</span>（数字因数，含符号）<br>' +
            '&emsp;&emsp;&emsp;→ <span style="color:#2e7d32">次数</span>（字母指数之和）<br>' +
            '<b>两者独立，互不影响。</b>',
            'cool'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 3：悬念铺垫——引出多项式
      {
        narration: '最后，留一个悬念！看画板——3x 和 负2y 是两个单项式。现在把它们用加号连起来，变成 3x 加 负2y，也就是 3x 减 2y。问题来了：这个新式子，还叫单项式吗？当然不是，它含有减法！那它叫什么名字呢？把几个单项式用加减连起来，就得到了一种新的代数式。下节课我们就来认识它——多项式！',
        enter: function (anim) {
          // 清掉知识树的所有元素
          S.remove('s6-root'); S.remove('s6-trunk');
          S.remove('s6-br-left'); S.remove('s6-br-right');
          S.remove('s6-node-coef'); S.remove('s6-node-deg');
          S.remove('s6-c1-line'); S.remove('s6-c1');
          S.remove('s6-c2-line'); S.remove('s6-c2');
          S.remove('s6-c3-line'); S.remove('s6-c3');
          S.remove('s6-c4-line'); S.remove('s6-c4');
          S.remove('s6-d1-line'); S.remove('s6-d1');
          S.remove('s6-d2-line'); S.remove('s6-d2');
          S.remove('s6-d3-line'); S.remove('s6-d3');
          S.remove('s6-d4-line'); S.remove('s6-d4');

          // 两个单项式 actor
          S.actor('s6-mono1', -3.5, 4.0, '$3x$',  { color: WARM,  size: 30 });
          S.actor('s6-mono2',  3.5, 4.0, '$-2y$', { color: COOL,  size: 30 });

          // 加号连接
          S.actor('s6-plus', 0, 4.0, '$+$', { color: INK, size: 28 });

          // 结果式子
          S.actor('s6-result', 0, 2.0,
            '$3x + (-2y) = 3x - 2y$',
            { color: TEAL, size: 24 });

          // 问号
          S.actor('s6-qmark', 0, 0.2,
            '这还叫单项式吗？',
            { color: RED, size: 22 });

          // 悬念卡（tada）
          P.renderCard(
            '<b>悬念</b><br>' +
            '把几个单项式用加减连起来……<br>' +
            '得到了一种新的代数式！<br>' +
            '<b>下节课我们来认识它的名字！</b>',
            'warm',
            'tada'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
