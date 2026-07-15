// s1-question.js  问题提出（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var GOLD   = '#f9a825';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、问题提出',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：√2 的小数展开，引发疑问
        narration: '同学们，我们已经知道 $\\sqrt{2}$ 是一个无理数，它的小数展开是 $1.41421356\\ldots$，小数位无限不循环。但是，你有没有想过——这个结论是怎么来的？我们怎么知道它"永远不循环"？毕竟，我们不可能把所有小数位都验证一遍！今天这节课，我们就要从数学上严格地证明：$\\sqrt{2}$ 不是有理数。',
        enter: function (anim) {
          // 画板：显示数轴和 √2 的位置
          S.addHLine('axis', 0, { color: INK, width: 2, dash: 0 });
          // 刻度点
          S.dropPoint('pt0', 0, 0, { name: '0', color: INK, size: 3 });
          S.dropPoint('pt1', 3, 0, { name: '1', color: INK, size: 3 });
          S.dropPoint('pt2', 6, 0, { name: '2', color: INK, size: 3 });
          // √2 落点（约 1.414，对应轴上约 4.24 位置）
          S.dropPoint('sqrt2-pt', 4.24, 0, { name: '', color: RED, size: 4.5 });
          // √2 标注
          S.addText('sqrt2-lbl', 3.8, 0.7, '$\\sqrt{2}$', { size: 20, color: RED });
          S.addText('sqrt2-val', 2.0, -1.2,
            '$\\sqrt{2} = 1.41421356\\ldots$',
            { size: 17, color: BLUE });
          // 问号
          S.addText('q-mark', -8, 3.5,
            '它真的永远不循环吗？',
            { size: 18, color: ORANGE });

          P.renderCard(
            '<b>问题</b><br><br>' +
            '$\\sqrt{2} = 1.41421356\\ldots$<br><br>' +
            '小数位<b>无限不循环</b>——<br>' +
            '但我们怎么<b>证明</b>这一点？'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2："不是分数"——这么大的断言需要证明
        narration: '有理数的特征是什么？可以写成两个整数之比，也就是分数的形式。所以"$\\sqrt{2}$ 不是有理数"，等价于"$\\sqrt{2}$ 不能写成 $\\dfrac{p}{q}$ 的形式"，其中 $p$、$q$ 是整数，$q\\neq 0$。这是一个非常强的断言——我们要证明不存在这样的 $p$、$q$，不管你选哪两个整数，都不行！直接验证是不可能的，因为整数有无穷多个。我们需要一个全新的思路。',
        enter: function (anim) {
          // 添加分数示意
          S.remove('q-mark');
          S.addText('rat-def', -8.5, 5.5,
            '有理数 $= \\dfrac{p}{q}$（整数之比）',
            { size: 17, color: GREEN });
          S.addText('claim', -8.5, 3.2,
            '断言：不存在整数 $p, q$',
            { size: 17, color: ORANGE });
          S.addText('claim2', -8.5, 1.8,
            '使得 $\\sqrt{2} = \\dfrac{p}{q}$',
            { size: 17, color: ORANGE });

          // 无穷多分数示意
          S.addText('inf-hint', -8.5, -0.5,
            '分数有无穷多个，无法逐一验证！',
            { size: 15, color: GRAY });
          S.addText('need', -8.5, -2.0,
            '⟹ 需要新的证明思路',
            { size: 17, color: RED });

          P.renderCard(
            '<b>"不是有理数"意味着什么？</b><br><br>' +
            '不存在整数 $p, q$（$q\\neq 0$）使得<br>' +
            '$\\sqrt{2} = \\dfrac{p}{q}$<br><br>' +
            '整数无穷多，<b>无法逐一验证</b><br>' +
            '⟹ 需要新的证明方法！'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：预告反证法——"证明不存在"的利器
        narration: '数学家们发明了一种巧妙的方法——<b>反证法</b>。不去直接证明"$\\sqrt{2}$ 不是有理数"，而是先反过来假设"$\\sqrt{2}$ 是有理数"，然后一步步推理，看看会发生什么。如果最终推出了矛盾——某件明显不可能的事情——那就说明我们的假设是错的，从而原来的结论成立。这就像侦探排除嫌疑人：如果某人"在教室"这个假设导致矛盾，那他一定不在教室！下一环节，我们详细学习反证法的思想。',
        enter: function (anim) {
          S.remove('rat-def');
          S.remove('claim');
          S.remove('claim2');
          S.remove('inf-hint');
          S.remove('need');

          // 反证法预告框
          S.addPolygon('hint-bg',
            [[-9.5, 6.5], [9.5, 6.5], [9.5, -1.5], [-9.5, -1.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.95, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('hint-t1', 0, 5.7,
            '新思路：反证法',
            { size: 20, color: GREEN, anchorX: 'middle' });
          S.addText('hint-t2', 0, 4.2,
            '先假设 $\\sqrt{2}$ 是有理数',
            { size: 17, color: BLUE, anchorX: 'middle' });
          S.addText('hint-arr', 0, 2.9,
            '↓ 推理',
            { size: 17, color: INK, anchorX: 'middle' });
          S.addText('hint-t3', 0, 1.6,
            '得出矛盾 ⟹ 假设错误 ⟹ 原结论成立',
            { size: 15, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>解题思路：反证法</b><br><br>' +
            '① 假设 $\\sqrt{2}$ <b>是</b>有理数<br>' +
            '② 推理推理……<br>' +
            '③ 发现<b>矛盾</b><br>' +
            '④ 假设错误 ⟹ $\\sqrt{2}$ <b>不是</b>有理数 ✓'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
