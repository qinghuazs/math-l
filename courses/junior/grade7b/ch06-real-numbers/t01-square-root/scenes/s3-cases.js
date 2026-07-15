(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', INK = '#455a64', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var FQ = function (x) { return x * x; };

  // 水平线 y 值（用闭包驱动动画）
  var hY = 9;

  // 绘制基础抛物线（不动画，用于快速重建）
  function drawBase() {
    S.plotCurve('s3-parab', FQ, { color: COOL, domain: [-5.5, 5.5] });
    S.addText('s3-lbl-curve', 3.2, 22, '$y = x^2$', { color: COOL, size: 17 });
  }

  // 用动态函数坐标绘制水平线（JSXGraph line 通过函数读 hY）
  function drawHLine(label) {
    // addHLine 使用固定值，改用 addSegment 配合函数坐标实现动态水平线
    S.addSegment('s3-hline',
      [function () { return -5.8; }, function () { return hY; }],
      [function () { return 5.8; }, function () { return hY; }],
      { color: WARM, width: 2, dash: 2 }
    );
    S.addText('s3-hline-lbl', 3.9,
      function () { return hY + 0.8; },
      function () { return label || ('$y = ' + hY + '$'); },
      { color: WARM, size: 16 }
    );
  }

  var scene = {
    id: 's3',
    title: '三、正数、零、负数的平方根',
    bbox: [-6, 30, 6, -6],
    setup: function (stage, panel) {
      S = stage; P = panel;
      hY = 9;
    },
    steps: [
      {
        narration: '现在用动画来研究三种情况。首先，水平线 $y = 9$：它与抛物线 $y = x^2$ 有<b>两个交点</b>，横坐标分别是 $3$ 和 $-3$。所以正数 $9$ 有两个平方根：$3$ 和 $-3$，互为相反数，记作 $\\pm 3$。',
        enter: function (anim) {
          hY = 9;
          drawBase();
          drawHLine('$y = 9$');
          var pa = S.dropPoint('s3-pt-pos', 3, 9, { color: WARM, name: '', animate: anim });
          var pb = S.dropPoint('s3-pt-neg', -3, 9, { color: WARM, name: '', animate: anim });
          return Promise.all([pa, pb]).then(function () {
            S.addText('s3-lbl-pos', 3.1, 7.5, '$x = 3$', { color: WARM, size: 15 });
            S.addText('s3-lbl-neg', -4.2, 7.5, '$x = -3$', { color: WARM, size: 15 });
            P.renderCard(
              '<b>正数（以 9 为例）</b><br>' +
              '$y=9$ 与 $y=x^2$ 有 <b>2 个交点</b><br>' +
              '$x = 3$ 或 $x = -3$（互为相反数）<br>' +
              '∴ 正数 $9$ 的平方根是 $\\pm 3$<br>' +
              '<b>结论：正数有两个平方根，互为相反数</b>'
            );
            if (anim) { return delay(200); }
          });
        },
      },
      {
        narration: '水平线从 $y = 9$ 向下移动到 $y = 0$，两个交点越来越靠近，最终<b>合为一点</b>：坐标原点 $(0, 0)$。所以 $0$ 只有一个平方根，就是 $0$ 本身。',
        enter: function (anim) {
          hY = 9;
          drawBase();
          drawHLine();
          S.dropPoint('s3-pt-pos', 3, 9, { color: WARM, name: '' });
          S.dropPoint('s3-pt-neg', -3, 9, { color: WARM, name: '' });
          S.addText('s3-lbl-pos', 3.1, 7.5, '$x = 3$', { color: WARM, size: 15 });
          S.addText('s3-lbl-neg', -4.2, 7.5, '$x = -3$', { color: WARM, size: 15 });

          if (!anim) {
            hY = 0;
            S.getBoard().update();
            // 重建交点在 (0,0)
            S.dropPoint('s3-pt-pos', 0, 0, { color: GREEN, name: '' });
            S.remove('s3-pt-neg');
            S.remove('s3-lbl-pos');
            S.remove('s3-lbl-neg');
            S.addText('s3-lbl-zero', 0.2, -1.2, '$x = 0$', { color: GREEN, size: 15 });
            P.renderCard(
              '<b>零</b><br>' +
              '$y=0$ 与 $y=x^2$ 有 <b>1 个交点</b>（原点）<br>' +
              '$x = 0$<br>' +
              '<b>结论：0 只有一个平方根，就是 0</b>'
            );
            return;
          }

          return S.animate({
            from: 9, to: 0, duration: 1600, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              hY = v;
              // 动态更新两个交点的位置（用 remove+redrop 代替）
              var xv = Math.sqrt(Math.max(0, v));
              S.dropPoint('s3-pt-pos', xv, v, { color: WARM, name: '' });
              S.dropPoint('s3-pt-neg', -xv, v, { color: WARM, name: '' });
              S.getBoard().update();
            },
          }).then(function () {
            hY = 0;
            S.dropPoint('s3-pt-pos', 0, 0, { color: GREEN, name: '' });
            S.remove('s3-pt-neg');
            S.remove('s3-lbl-pos');
            S.remove('s3-lbl-neg');
            S.addText('s3-lbl-zero', 0.2, -1.2, '$x = 0$', { color: GREEN, size: 15 });
            P.renderCard(
              '<b>零</b><br>' +
              '$y=0$ 与 $y=x^2$ 有 <b>1 个交点</b>（原点）<br>' +
              '$x = 0$<br>' +
              '<b>结论：0 只有一个平方根，就是 0</b>'
            );
          });
        },
      },
      {
        narration: '继续将水平线移到 $y = -4$（即 $y$ 轴以下）。此时水平线在抛物线的<b>下方</b>，与抛物线<b>没有交点</b>——因为任何实数的平方都不可能是负数！所以负数在实数范围内<b>没有平方根</b>。',
        enter: function (anim) {
          hY = 0;
          drawBase();
          drawHLine();
          S.dropPoint('s3-pt-zero', 0, 0, { color: GREEN, name: '' });
          S.addText('s3-lbl-zero', 0.2, -1.2, '$x = 0$', { color: GREEN, size: 15 });

          if (!anim) {
            hY = -4;
            S.remove('s3-pt-zero');
            S.remove('s3-lbl-zero');
            S.getBoard().update();
            S.addText('s3-no-inter', 0, -4.2, '无交点！', { color: WARM, size: 18, anchorX: 'middle' });
            P.renderCard(
              '<b>负数（以 $-4$ 为例）</b><br>' +
              '$y=-4$ 在抛物线下方，<b>无交点</b><br>' +
              '任何实数的平方 $\\geq 0$，不可能等于负数<br>' +
              '<b>结论：负数在实数范围内没有平方根</b>'
            );
            return;
          }

          return S.animate({
            from: 0, to: -4, duration: 1200, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              hY = v;
              S.getBoard().update();
            },
          }).then(function () {
            hY = -4;
            S.remove('s3-pt-zero');
            S.remove('s3-lbl-zero');
            S.addText('s3-no-inter', 0, -4.2, '无交点！', { color: WARM, size: 18, anchorX: 'middle' });
            P.renderCard(
              '<b>负数（以 $-4$ 为例）</b><br>' +
              '$y=-4$ 在抛物线下方，<b>无交点</b><br>' +
              '任何实数的平方 $\\geq 0$，不可能等于负数<br>' +
              '<b>结论：负数在实数范围内没有平方根</b>'
            );
          });
        },
      },
      {
        narration: '三种情况总结：正数有两个平方根（互为相反数）；零的平方根是零（只有一个）；负数在实数范围内没有平方根。这是平方根最基本的性质，必须牢记。',
        enter: function (anim) {
          hY = -4;
          drawBase();
          drawHLine();
          S.addText('s3-no-inter', 0, -4.2, '无交点！', { color: WARM, size: 18, anchorX: 'middle' });
          P.renderTable({
            head: ['数的类型', '平方根个数', '例子'],
            rows: [
              ['正数 $a \\gt 0$', '2 个（互为相反数）', '$9$ 的平方根：$\\pm 3$'],
              ['零 $a = 0$', '1 个（就是 0）', '$0$ 的平方根：$0$'],
              ['负数 $a \\lt 0$', '0 个（无平方根）', '$-4$ 无平方根']
            ]
          });
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
