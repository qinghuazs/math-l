(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';
  var INK = '#455a64', AMBER = '#f57f17';

  // y = x^3
  var FC = function (x) { return x * x * x; };

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 绘制水平参考线 y=k 和交点，标注坐标
  function drawHLine(hid, pid, lid, k, xVal, color, anim) {
    // 水平线 y = k
    S.addHLine(hid, k, { color: color, width: 2, dash: 4 });
    // 交点
    var prom = S.dropPoint(pid, xVal, k, {
      color: color, size: 4,
      name: '(' + xVal + ', ' + k + ')',
      labelOffset: [10, 8],
      animate: anim
    });
    // 标注
    S.addText(lid, xVal + 0.15, k + 1.5,
      '$(' + xVal + ',\\ ' + k + ')$', { color: color, size: 14 });
    return prom;
  }

  var scene = {
    id: 's2',
    title: '二、立方根定义与唯一性',
    // bbox: [左, 上, 右, 下]
    bbox: [-4, 30, 4, -30],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：画 y=x³ 曲线（生长动画）
        narration: '我们用图像来理解立方根。请看坐标系——先来画函数 $y = x^3$ 的图像。观察它的形状：过原点，向右上方延伸（正数的立方是正数），向左下方延伸（负数的立方是负数）。',
        enter: function (anim) {
          P.clearExtras();
          return S.plotCurve('s2-cubic', FC, {
            color: INK,
            width: 3,
            domain: [-3.1, 3.1],
            animate: anim,
            duration: 1400
          }).then(function () {
            S.addText('s2-flabel', 2.0, 24,
              '$y = x^3$', { color: INK, size: 16 });
          });
        },
      },
      {
        // 步骤2：水平线 y=27，交点 (3,27)，讲立方根定义
        narration: '现在作水平线 $y = 27$，它与 $y = x^3$ 的图像<b>恰好有一个交点</b> $(3,\\ 27)$。这说明满足 $x^3 = 27$ 的数只有 $3$，即 $27$ 的立方根是 $3$，记作 $\\sqrt[3]{27} = 3$。',
        enter: function (anim) {
          S.plotCurve('s2-cubic', FC, {
            color: INK, width: 3, domain: [-3.1, 3.1]
          });
          S.addText('s2-flabel', 2.0, 24, '$y = x^3$', { color: INK, size: 16 });
          return drawHLine('s2-h1', 's2-p1', 's2-l1', 27, 3, WARM, anim)
            .then(function () {
              P.clearExtras();
              P.renderCard(
                '<b>立方根定义</b><br>' +
                '若 $x^3 = a$，则 $x$ 叫作 $a$ 的<b>立方根</b>（三次方根）<br>' +
                '$a$ 的立方根记作 $\\sqrt[3]{a}$<br>' +
                '例：$\\sqrt[3]{27} = 3$（因为 $3^3 = 27$）',
                'cool', 'fadeInUp'
              );
            });
        },
      },
      {
        // 步骤3：水平线下移到 y=-8，交点 (-2,-8)，强调"任何数都有唯一立方根"
        narration: '把水平线往下移到 $y = -8$，与 $y = x^3$ 仍然<b>恰好有一个交点</b> $(-2,\\ -8)$。因此 $-8$ 的立方根是 $-2$，即 $\\sqrt[3]{-8} = -2$。不管水平线在哪里，与 $y = x^3$ 始终只有一个交点——这说明<b>任何实数都有且只有一个立方根</b>！',
        enter: function (anim) {
          S.plotCurve('s2-cubic', FC, {
            color: INK, width: 3, domain: [-3.1, 3.1]
          });
          S.addText('s2-flabel', 2.0, 24, '$y = x^3$', { color: INK, size: 16 });
          // 保留 y=27 的线（浅色）
          S.addHLine('s2-h1', 27, { color: WARM, width: 1.5, dash: 4 });
          S.dropPoint('s2-p1', 3, 27, { color: WARM, size: 3.5, name: '' });
          S.addText('s2-l1', 2.05, 25, '$\\sqrt[3]{27}=3$', { color: WARM, size: 13 });

          // 新画 y=-8 的线（动画下移效果：直接画终态）
          var p;
          if (anim) {
            // 先在 y=0 处画线，再动画到 y=-8
            var yVal = 0;
            var hline = S.addHLine('s2-h2', 0, { color: COOL, width: 2, dash: 4 });
            p = S.animate({
              from: 0, to: -8, duration: 900, easing: 'easeInOutQuart',
              onUpdate: function (v) {
                yVal = v;
                // 重绘水平线位置（直接删旧建新）
                S.remove('s2-h2');
                S.addHLine('s2-h2', v, { color: COOL, width: 2, dash: 4 });
              }
            }).then(function () {
              return drawHLine('s2-h2', 's2-p2', 's2-l2', -8, -2, COOL, true);
            });
          } else {
            p = drawHLine('s2-h2', 's2-p2', 's2-l2', -8, -2, COOL, false);
          }
          return p.then(function () {
            P.clearExtras();
            P.renderCard(
              '<b>立方根的唯一性</b><br>' +
              '$y = x^3$ 与任意水平线只有<b>一个</b>交点<br>' +
              '⟹ 每个实数都有且仅有<b>一个</b>立方根<br>' +
              '$\\sqrt[3]{27} = 3$，$\\sqrt[3]{-8} = -2$，$\\sqrt[3]{0} = 0$',
              'cool', 'flipInX'
            );
          });
        },
      },
      {
        // 步骤4：对照卡：平方根有0/1/2个交点 vs 立方根始终1个
        narration: '回忆平方根：$y = x^2$ 的图像是抛物线，水平线 $y = k$ 与它可能有两个交点（$k \\gt 0$）、一个交点（$k = 0$）、或没有交点（$k \\lt 0$）——负数没有平方根！但立方根完全不同：$y = x^3$ 与任意水平线<b>始终恰好一个交点</b>，所以正数、$0$、负数都有唯一立方根。',
        enter: function (anim) {
          S.plotCurve('s2-cubic', FC, {
            color: INK, width: 3, domain: [-3.1, 3.1]
          });
          S.addText('s2-flabel', 2.0, 24, '$y = x^3$', { color: INK, size: 16 });
          S.addHLine('s2-h1', 27, { color: WARM, width: 1.5, dash: 4 });
          S.dropPoint('s2-p1', 3, 27, { color: WARM, size: 3.5, name: '' });
          S.addText('s2-l1', 2.05, 25, '$\\sqrt[3]{27}=3$', { color: WARM, size: 13 });
          S.addHLine('s2-h2', -8, { color: COOL, width: 2, dash: 4 });
          S.dropPoint('s2-p2', -2, -8, { color: COOL, size: 4, name: '' });
          S.addText('s2-l2', -3.8, -6.5, '$\\sqrt[3]{-8}=-2$', { color: COOL, size: 13 });
          // 原点
          S.dropPoint('s2-p0', 0, 0, { color: GREEN, size: 4, name: '' });
          S.addText('s2-l0', 0.15, 1.8, '$\\sqrt[3]{0}=0$', { color: GREEN, size: 13 });

          P.clearExtras();
          P.renderTable({
            head: ['', '$y=x^2$（平方根）', '$y=x^3$（立方根）'],
            rows: [
              ['$k \\gt 0$', '两个交点（两个平方根）', '一个交点（唯一立方根）'],
              ['$k = 0$', '一个交点（$\\sqrt{0}=0$）', '一个交点（$\\sqrt[3]{0}=0$）'],
              ['$k \\lt 0$', '无交点（<b>无</b>平方根）', '一个交点（<b>有</b>立方根）'],
            ]
          });
          if (anim) { return delay(300); }
        },
      },
    ],
    expectSteps: 4,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
