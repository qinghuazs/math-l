// s2-method.js  反证法思想（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、反证法思想',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：生活类比——教室点名
        narration: '先用一个生活中的例子来感受反证法的思路。老师点名，小明没有答到。老师的推理是这样的：如果小明在教室，他就会答到；但他没有答到——这就产生了矛盾！所以"小明在教室"这个假设是错的，因此小明不在教室。注意这里的推理结构：先假设一件事成立，然后推出矛盾，最后否定假设。这就是反证法！',
        enter: function (anim) {
          // 场景：教室点名卡
          S.addPolygon('room-bg',
            [[-9.5, 6.8], [9.5, 6.8], [9.5, 0.5], [-9.5, 0.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 2 });
          S.addText('room-title', 0, 6.1,
            '生活类比：老师点名',
            { size: 19, color: GOLD, anchorX: 'middle' });

          S.addText('assume', -8.5, 5.0,
            '假设：小明在教室',
            { size: 16, color: BLUE });
          S.addText('derive', -8.5, 3.8,
            '推论：他应该答到',
            { size: 16, color: BLUE });
          S.addText('fact', -8.5, 2.6,
            '事实：他没有答到',
            { size: 16, color: RED });
          S.addText('contra', -8.5, 1.4,
            '矛盾！⟹ 假设错误 ⟹ 小明不在教室',
            { size: 15, color: RED });

          // 反证法标签
          S.addPolygon('rc-bg',
            [[-9.5, 0.0], [9.5, 0.0], [9.5, -2.5], [-9.5, -2.5]],
            { fillColor: '#fce4ec', fillOpacity: 0.9, strokeColor: RED, strokeWidth: 2 });
          S.addText('rc-t', 0, -0.8,
            '这就是反证法的核心：',
            { size: 16, color: RED, anchorX: 'middle' });
          S.addText('rc-t2', 0, -2.0,
            '假设反面 → 推出矛盾 → 原结论成立',
            { size: 15, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>生活中的反证法</b><br><br>' +
            '假设：小明在教室<br>' +
            '推出：他应该答到<br>' +
            '事实：他没答到<br>' +
            '<b>矛盾！⟹ 小明不在教室</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：反证法三步卡
        narration: '反证法分三步，我们把它制作成一张清晰的"三步卡"。第一步：<b>假设</b>——把我们要证明的结论"A 成立"反过来，先假设"A 不成立"。第二步：<b>推理</b>——在这个假设下，一步一步地严格推理，看会得到什么。第三步：<b>结论</b>——如果推出了明显的矛盾，就说明假设是错的，从而原来的结论 A 成立。记住这三步：假设反面、推出矛盾、肯定原结论！',
        enter: function (anim) {
          // 清除旧内容
          S.remove('room-bg'); S.remove('room-title');
          S.remove('assume'); S.remove('derive'); S.remove('fact'); S.remove('contra');
          S.remove('rc-bg'); S.remove('rc-t'); S.remove('rc-t2');

          // 三步卡布局（纵向）
          // 步骤1
          S.addPolygon('s1-bg',
            [[-9.5, 6.8], [9.5, 6.8], [9.5, 4.3], [-9.5, 4.3]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('s1-num', -8.5, 5.9, '第①步', { size: 16, color: BLUE });
          S.addText('s1-name', -5.5, 5.9, '假设反面', { size: 16, color: BLUE });
          S.addText('s1-desc', -8.5, 4.9,
            '设"结论 A 不成立"（假设与原结论相反）',
            { size: 14, color: INK });

          // 箭头1
          S.addText('arr1', 0, 3.9, '↓', { size: 22, color: INK, anchorX: 'middle' });

          // 步骤2
          S.addPolygon('s2-bg',
            [[-9.5, 3.5], [9.5, 3.5], [9.5, 1.0], [-9.5, 1.0]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('s2-num', -8.5, 2.6, '第②步', { size: 16, color: ORANGE });
          S.addText('s2-name', -5.5, 2.6, '严格推理', { size: 16, color: ORANGE });
          S.addText('s2-desc', -8.5, 1.6,
            '由假设出发，按数学规则一步步推导',
            { size: 14, color: INK });

          // 箭头2
          S.addText('arr2', 0, 0.6, '↓', { size: 22, color: INK, anchorX: 'middle' });

          // 步骤3
          S.addPolygon('s3-bg',
            [[-9.5, 0.2], [9.5, 0.2], [9.5, -2.8], [-9.5, -2.8]],
            { fillColor: '#fce4ec', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('s3-num', -8.5, -0.7, '第③步', { size: 16, color: RED });
          S.addText('s3-name', -5.5, -0.7, '发现矛盾', { size: 16, color: RED });
          S.addText('s3-desc1', -8.5, -1.7,
            '推出明显矛盾 ⟹ 假设错误',
            { size: 14, color: RED });
          S.addText('s3-desc2', -8.5, -2.6,
            '⟹ 原结论 A 成立 ✓',
            { size: 14, color: GREEN });

          P.renderCard(
            '<b>反证法三步</b><br><br>' +
            '① <b>假设反面</b>：设结论不成立<br>' +
            '② <b>严格推理</b>：按规则推导<br>' +
            '③ <b>发现矛盾</b>：假设错 ⟹ 原结论成立<br><br>' +
            '<span style="color:#c62828">核心：用矛盾击碎假设！</span>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：应用到 √2 证明的框架
        narration: '好，我们把反证法的三步框架套到今天的问题上。第一步：假设 $\\sqrt{2}$ 是有理数，那么它可以写成最简分数 $\\dfrac{p}{q}$，其中 $p$、$q$ 是互质的正整数——所谓"互质"就是 $p$、$q$ 没有公因数（最大公因数为 1）。第二步：对这个等式进行数学推理。第三步：推出 $p$、$q$ 都是偶数，与"互质"产生矛盾！下面，让我们正式进入证明过程。',
        enter: function (anim) {
          // 清除
          S.remove('s1-bg'); S.remove('s1-num'); S.remove('s1-name'); S.remove('s1-desc');
          S.remove('arr1');
          S.remove('s2-bg'); S.remove('s2-num'); S.remove('s2-name'); S.remove('s2-desc');
          S.remove('arr2');
          S.remove('s3-bg'); S.remove('s3-num'); S.remove('s3-name');
          S.remove('s3-desc1'); S.remove('s3-desc2');

          // 套用框架到 √2
          S.addPolygon('frame-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, -6.5], [-9.5, -6.5]],
            { fillColor: '#f3e5f5', fillOpacity: 0.5, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('frame-title', 0, 6.5,
            '套用反证法 → $\\sqrt{2}$ 不是有理数',
            { size: 18, color: PURPLE, anchorX: 'middle' });

          S.addText('ap1', -8.5, 5.2,
            '① 假设：$\\sqrt{2}$ 是有理数',
            { size: 16, color: BLUE });
          S.addText('ap1b', -8.5, 4.0,
            '即 $\\sqrt{2} = \\dfrac{p}{q}$（$p,q$ 互质的正整数）',
            { size: 15, color: BLUE });

          S.addText('ap2', -8.5, 2.5,
            '② 推理：两边平方、奇偶分析……',
            { size: 16, color: ORANGE });

          S.addText('ap3', -8.5, 1.0,
            '③ 结论：$p,q$ 都是偶数（有公因数 2）',
            { size: 16, color: RED });
          S.addText('ap3b', -8.5, -0.2,
            '与"$p,q$ 互质"矛盾！',
            { size: 16, color: RED });
          S.addText('ap3c', -8.5, -1.5,
            '⟹ 假设错误 ⟹ $\\sqrt{2}$ 不是有理数 ∎',
            { size: 15, color: GREEN });

          P.renderCard(
            '<b>反证法应用于 $\\sqrt{2}$</b><br><br>' +
            '① 假设 $\\sqrt{2} = \\dfrac{p}{q}$（$p,q$ 互质）<br>' +
            '② 推理……（下一环节详细展开）<br>' +
            '③ 推出 $p,q$ 都是偶数<br>' +
            '<b>矛盾！⟹ $\\sqrt{2}$ 不是有理数 ∎</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
