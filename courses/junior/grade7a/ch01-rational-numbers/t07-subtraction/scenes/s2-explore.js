// s2-explore.js  二、两条路殊途同归（3步）
// 数学验算：
//   逆运算：因 7+(-3)=4，所以 4-(-3)=7 ✓
//   对照式：4+3=7，与 4-(-3)=7 结果相同；-3 的相反数是 3 ✓
//   数轴：从 4 出发，减(-3) 向右走 3 格到 7；加 3 也向右走 3 格到 7 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数（s3数轴步骤用）
  // bbox: [-2, 5, 9, -4]，数轴在 y=0，范围 0~8
  var AY = 0;
  var UNIT = 1.2; // 1数值=1.2画面单位
  function tx(n) { return n * UNIT; }

  var scene = {
    id: 's2',
    title: '二、两条路殊途同归',
    bbox: [-2, 5, 9, -4],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：逆运算验证
      {
        narration: '第一条路：逆运算法。减法和加法是互逆运算。如果 4-(-3) 等于某个数，那么这个数加上 (-3) 应该等于 4。我们来试试 7：7+(-3)=4，完全正确！所以反过来，4-(-3)=7，不是1！逆运算告诉我们：答案是 7。',
        enter: function (anim) {
          S.actor('s2-path1-title', 3.5, 4.5, '路径一：逆运算验证', { color: COOL, size: 18, bold: true });

          S.actor('s2-logic1', 3.5, 3.1,
            '减法与加法互为逆运算', { color: INK, size: 15 });
          S.actor('s2-logic2', 3.5, 2.1,
            '若 $4 - (-3) = \\square$', { color: INK, size: 16 });
          S.actor('s2-logic3', 3.5, 1.1,
            '则 $\\square + (-3) = 4$', { color: INK, size: 16 });

          S.actor('s2-sep', 3.5, 0.2, '─────────', { color: GRAY, size: 14 });

          S.actor('s2-verify1', 3.5, -0.7,
            '$\\because \\ 7 + (-3) = 4$', { color: TEAL, size: 17 });
          S.actor('s2-verify2', 3.5, -1.8,
            '$\\therefore \\ 4 - (-3) = 7$', { color: WARM, size: 19, bold: true });

          S.actor('s2-concl', 3.5, -2.9,
            '答案是 <b style="color:#e64a19">7</b>，不是 1！', { color: INK, size: 15 });

          P.renderCard(
            '<b>路径一：逆运算验证</b><br>' +
            '$\\because \\ 7 + (-3) = 4$<br>' +
            '$\\therefore \\ 4 - (-3) = 7$<br>' +
            '逆运算法证明：答案是 <b>7</b>。'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：对照式并排，红框圈出相反数关系
      {
        narration: '第二条路：与已知算式对照。我们知道 4+3=7，这是简单加法。把它和 4-(-3)=7 并排一看：两式结果都是 7，而 -3 和 +3 恰好互为相反数！这提示我们：减去一个数，等于加上这个数的相反数。',
        enter: function (anim) {
          S.remove('s2-path1-title');
          S.remove('s2-logic1');
          S.remove('s2-logic2');
          S.remove('s2-logic3');
          S.remove('s2-sep');
          S.remove('s2-verify1');
          S.remove('s2-verify2');
          S.remove('s2-concl');

          S.actor('s2-path2-title', 3.5, 4.5, '路径二：与加法对照', { color: COOL, size: 18, bold: true });

          // 第一式
          S.actor('s2-eq1-pre', 3.5, 3.0, '$4 - (-3) = 7$', { color: INK, size: 20 });
          S.actor('s2-eq1-lbl', 3.5, 2.1, '减去 $-3$', { color: WARM, size: 14 });

          // 分隔线
          S.addSegment('s2-divline', [0.5, 1.5], [6.5, 1.5], { color: GRAY, width: 1.5, dash: 2 });

          // 第二式
          S.actor('s2-eq2-pre', 3.5, 0.8, '$4 + 3 = 7$', { color: INK, size: 20 });
          S.actor('s2-eq2-lbl', 3.5, -0.1, '加上 $+3$', { color: TEAL, size: 14 });

          // 相反数说明
          S.actor('s2-opp-lbl', 3.5, -1.3,
            '$-3$ 与 $+3$ 互为<b>相反数</b>', { color: RED, size: 16 });
          S.actor('s2-opp-concl', 3.5, -2.4,
            '两式结果相同：都等于 $7$', { color: TEAL, size: 15 });
          S.actor('s2-opp-hint', 3.5, -3.3,
            '减去一个数 = 加上它的相反数', { color: WARM, size: 15, bold: true });

          P.renderCard(
            '<b>路径二：对照已知式</b><br>' +
            '$4 - (-3) = 7$　（减去 $-3$）<br>' +
            '$4 + \\phantom{(-}3\\phantom{)} = 7$　（加上 $+3$）<br>' +
            '$-3$ 与 $+3$ 互为相反数，结果完全一致！'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：数轴动画验证，两支箭头重合
      {
        narration: '第三条路：数轴验证，最直观。在数轴上从 4 出发。第一种走法：减去 (-3)，就是往右走 3 格，到达 7。第二种走法：加上 3，也是往右走 3 格，到达 7。两支箭头完全重合！三条路都指向同一个答案：4-(-3)=7。',
        enter: function (anim) {
          S.remove('s2-path2-title');
          S.remove('s2-eq1-pre');
          S.remove('s2-eq1-lbl');
          S.remove('s2-divline');
          S.remove('s2-eq2-pre');
          S.remove('s2-eq2-lbl');
          S.remove('s2-opp-lbl');
          S.remove('s2-opp-concl');
          S.remove('s2-opp-hint');

          // 数轴主线
          S.addSegment('s2-axis', [tx(-0.3), AY], [tx(8.2), AY],
            { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s2-arr1', [tx(8.0), AY + 0.12], [tx(8.2), AY],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s2-arr2', [tx(8.0), AY - 0.12], [tx(8.2), AY],
            { color: INK, width: 2, dash: 0 });

          // 刻度 0~8
          for (var n = 0; n <= 8; n++) {
            S.addSegment('s2-tick-' + n, [tx(n), AY - 0.18], [tx(n), AY + 0.18],
              { color: INK, width: (n === 4 || n === 7 ? 3 : 1.5), dash: 0 });
            S.addText('s2-tlab-' + n, tx(n) - 0.1, AY - 0.45, '' + n,
              { color: (n === 4 ? WARM : (n === 7 ? TEAL : INK)), size: 14 });
          }

          // 起始点 4
          S.dropPoint('s2-pt4', tx(4), AY, { color: WARM, size: 4 });
          S.addText('s2-pt4-lbl', tx(4) - 0.1, AY + 0.4, '出发', { color: WARM, size: 13 });

          if (!anim) {
            // 快放：直接画两支箭头
            S.addSegment('s2-arrow-sub', [tx(4), AY + 0.6], [tx(7), AY + 0.6],
              { color: WARM, width: 3, dash: 0 });
            S.addText('s2-arrow-sub-lbl', tx(5.3), AY + 0.95,
              '减$(-3)$：向右 3 格', { color: WARM, size: 13 });

            S.addSegment('s2-arrow-add', [tx(4), AY + 1.3], [tx(7), AY + 1.3],
              { color: TEAL, width: 3, dash: 2 });
            S.addText('s2-arrow-add-lbl', tx(5.3), AY + 1.7,
              '加 $3$：向右 3 格', { color: TEAL, size: 13 });

            S.dropPoint('s2-pt7', tx(7), AY, { color: GREEN, size: 5 });
            S.addText('s2-pt7-lbl', tx(7) - 0.1, AY - 0.75, '7', { color: GREEN, size: 16, bold: true });

            P.renderCard(
              '<b>数轴验证</b><br>' +
              '从 $4$ 出发：减 $(-3)$ 向右 $3$ 格 → $7$<br>' +
              '从 $4$ 出发：加 $3$ 向右 $3$ 格 → $7$<br>' +
              '两支箭头<b>完全重合</b>！$4 - (-3) = 7$ ✓',
              'cool'
            );
            return Promise.resolve();
          }

          // 动画路径1：减(-3)箭头
          return delay(600).then(function () {
            S.addSegment('s2-arrow-sub', [tx(4), AY + 0.6], [tx(7), AY + 0.6],
              { color: WARM, width: 3, dash: 0 });
            S.addText('s2-arrow-sub-lbl', tx(5.3), AY + 0.95,
              '减$(-3)$：向右 3 格', { color: WARM, size: 13 });
            // 箭头头
            S.addSegment('s2-arr-sub-h1', [tx(6.8), AY + 0.75], [tx(7), AY + 0.6],
              { color: WARM, width: 2, dash: 0 });
            S.addSegment('s2-arr-sub-h2', [tx(6.8), AY + 0.45], [tx(7), AY + 0.6],
              { color: WARM, width: 2, dash: 0 });
            return delay(700);
          }).then(function () {
            // 动画路径2：加3箭头
            S.addSegment('s2-arrow-add', [tx(4), AY + 1.3], [tx(7), AY + 1.3],
              { color: TEAL, width: 3, dash: 2 });
            S.addText('s2-arrow-add-lbl', tx(5.3), AY + 1.7,
              '加 $3$：向右 3 格', { color: TEAL, size: 13 });
            S.addSegment('s2-arr-add-h1', [tx(6.8), AY + 1.45], [tx(7), AY + 1.3],
              { color: TEAL, width: 2, dash: 0 });
            S.addSegment('s2-arr-add-h2', [tx(6.8), AY + 1.15], [tx(7), AY + 1.3],
              { color: TEAL, width: 2, dash: 0 });
            return delay(600);
          }).then(function () {
            return S.dropPoint('s2-pt7', tx(7), AY, { color: GREEN, size: 5, animate: true });
          }).then(function () {
            S.addText('s2-pt7-lbl', tx(7) - 0.1, AY - 0.75, '7', { color: GREEN, size: 16, bold: true });
            return S.pulse('s2-pt7', 3);
          }).then(function () {
            P.renderCard(
              '<b>数轴验证：两支箭头完全重合！</b><br>' +
              '从 $4$ 出发：减 $(-3)$ 向右 $3$ 格 → $7$<br>' +
              '从 $4$ 出发：加 $3$ 向右 $3$ 格 → $7$<br>' +
              '三条路同一答案：$4 - (-3) = 7$ ✓',
              'cool'
            );
            return delay(300);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
