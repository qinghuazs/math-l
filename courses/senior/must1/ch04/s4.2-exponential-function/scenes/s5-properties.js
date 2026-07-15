(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a';
  var F2 = function (x) { return Math.pow(2, x); };
  var FH = function (x) { return Math.pow(0.5, x); };
  var BBOX = [-4.5, 9.5, 4.5, -2];

  function base() {
    S.plotCurve('s5-c2', F2, { color: WARM });
    S.plotCurve('s5-ch', FH, { color: COOL });
    S.addText('s5-l2', 1.7, 5.4, 'a &gt; 1', { color: WARM, size: 18 });
    S.addText('s5-lh', -3.9, 5.4, '0 &lt; a &lt; 1', { color: COOL, size: 18 });
  }

  var scene = {
    id: 's5',
    title: '五、指数函数的性质',
    bbox: BBOX,
    setup: function (stage, panel) { S = stage; P = panel; base(); },
    steps: [
      {
        narration: '<b>定义域</b>：$x$ 从左到右每个值都取得到，定义域为 $\\mathbb{R}$；<b>值域</b>：图像始终在 $x$ 轴<b>上方</b>，值域为 $(0,+\\infty)$。',
        enter: function (anim) {
          S.shadeRect('s5-range', -4.5, 0, 4.5, 9.5, { color: '#43a047', opacity: 0.05 });
          return anim ? S.sweep({ duration: 1500 }) : null;
        },
      },
      {
        narration: '无论底数取多少，$x=0$ 时 $y=a^0=1$——图像都过<b>定点</b> $(0,1)$。',
        enter: function (anim) {
          return Promise.resolve(
            S.dropPoint('s5-fix', 0, 1, { color: PURPLE, name: '(0, 1)', size: 4.5, animate: anim })
          ).then(function () { return anim ? S.pulse('s5-fix', 3) : null; });
        },
      },
      {
        narration: '<b>单调性</b>：看动点。$a\\gt 1$ 时从左到右一路<b>上升</b>——增函数；$0\\lt a\\lt 1$ 时一路<b>下降</b>——减函数。',
        enter: function (anim) {
          if (!anim) return null;
          var m1 = S.movingPoint('s5-m1', F2, { from: -3.8, color: WARM });
          return m1.run(2.9, 2300).then(function () {
            S.remove('s5-m1');
            var m2 = S.movingPoint('s5-m2', FH, { from: -2.9, color: COOL });
            return m2.run(3.8, 2300);
          }).then(function () { S.remove('s5-m2'); });
        },
      },
      {
        narration: '往远处看：曲线无限<b>贴近</b> $x$ 轴却永不相交，另一端无限上升——所以<b>没有最大值也没有最小值</b>。',
        enter: function (anim) {
          if (!anim) return null;
          var m = S.movingPoint('s5-m3', F2, { from: 0, color: WARM });
          return Promise.all([
            m.run(-11, 2000),
            S.flyTo([-13, 3.5, 3, -0.8], { duration: 2000 }),
          ]).then(function () {
            return new Promise(function (r) { setTimeout(r, 500); });
          }).then(function () {
            S.remove('s5-m3');
            return S.flyTo(BBOX, { duration: 1100 });
          });
        },
      },
      {
        narration: '<b>奇偶性</b>：沿 $y$ 轴翻折不重合（非偶），绕原点旋转 $180^\\circ$ 也不重合（非奇）——<b>非奇非偶</b>函数。',
        enter: function (anim) {
          if (!anim) {
            return null;
          }
          return S.mirrorFold('s5-g1', F2, { color: '#9e9e9e', duration: 1100 }).then(function () {
            S.plotCurve('s5-g2', function (x) { return -Math.pow(2, -x); }, { color: '#9e9e9e', width: 2.5, dash: 2, opacity: 0.6 });
            S.addText('s5-x1', -3.3, 2.6, '✗ 不重合', { color: '#b71c1c', size: 17 });
            S.addText('s5-x2', 2.1, -1.3, '✗ 不重合', { color: '#b71c1c', size: 17 });
            return new Promise(function (r) { setTimeout(r, 900); });
          });
        },
      },
      {
        narration: '汇总：指数函数 $y=a^x$（$a>0$ 且 $a\\neq 1$）的图像和性质如下表。',
        enter: function () {
          S.remove('s5-g1'); S.remove('s5-g2'); S.remove('s5-x1'); S.remove('s5-x2');
          P.renderTable({
            head: ['', '$0\\lt a\\lt 1$', '$a\\gt 1$'],
            rows: [
              ['定义域', '$\\mathbb{R}$', '$\\mathbb{R}$'],
              ['值域', '$(0,+\\infty)$', '$(0,+\\infty)$'],
              ['定点', '$(0,1)$', '$(0,1)$'],
              ['单调性', '减函数', '增函数'],
              ['奇偶性', '非奇非偶', '非奇非偶'],
              ['最值', '无', '无'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
