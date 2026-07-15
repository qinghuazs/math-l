// s3-proof.js  证明过程（5步）★核心推理链
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var CYAN   = '#00838f';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // ====== 推理链布局常量 ======
  // 5个节点，纵向排列，上下依次点亮
  // 画板 bbox: [-10, 7.5, 10, -7.5]，节点从 y=6.2 开始向下
  var NODE_X   = 0;      // 节点中心 x
  var NODE_W   = 8.5;    // 节点半宽
  var NODE_H   = 0.85;   // 节点半高
  var NODE_Y   = [5.8, 3.5, 1.2, -1.1, -3.5]; // 5个节点中心 y
  var ARR_LEN  = 0.55;   // 箭头从节点底到下一节点顶的留空

  // 节点配色
  var NODE_COLORS = [BLUE, ORANGE, CYAN, RED, GREEN];
  var NODE_FILLS  = ['#e3f2fd', '#fff3e0', '#e0f7fa', '#fce4ec', '#e8f5e9'];

  // 已显示节点数（闭包变量，setup 重置）
  var shownNodes;

  function drawNode(idx, content, subtext) {
    var id  = 'node' + idx;
    var cy  = NODE_Y[idx];
    var col = NODE_COLORS[idx];
    var fil = NODE_FILLS[idx];

    S.addPolygon(id + '-bg', [
      [NODE_X - NODE_W, cy + NODE_H],
      [NODE_X + NODE_W, cy + NODE_H],
      [NODE_X + NODE_W, cy - NODE_H],
      [NODE_X - NODE_W, cy - NODE_H]
    ], { fillColor: fil, fillOpacity: 1, strokeColor: col, strokeWidth: 2 });

    S.addText(id + '-t', NODE_X, cy + (subtext ? 0.22 : 0),
      content, { size: 15, color: col, anchorX: 'middle' });

    if (subtext) {
      S.addText(id + '-s', NODE_X, cy - 0.52,
        subtext, { size: 13, color: INK, anchorX: 'middle' });
    }
  }

  function drawArrow(fromIdx) {
    var id    = 'arr' + fromIdx;
    var y1    = NODE_Y[fromIdx] - NODE_H - ARR_LEN;
    var y2    = NODE_Y[fromIdx + 1] + NODE_H + ARR_LEN;
    var ymid  = (y1 + y2) / 2;

    S.addSegment(id + '-line', [NODE_X, y1], [NODE_X, y2 + 0.35],
      { color: INK, width: 2, dash: 0 });
    // 箭头三角形（朝下）
    S.addPolygon(id + '-head', [
      [NODE_X - 0.35, y2 + 0.35],
      [NODE_X + 0.35, y2 + 0.35],
      [NODE_X, y2]
    ], { fillColor: INK, fillOpacity: 1, strokeColor: INK, strokeWidth: 1 });
  }

  // 闪烁矛盾节点（红色节点闪烁3次）
  function flashContradiction() {
    var bg = S.get('node3-bg');
    if (!bg) return Promise.resolve();
    var count = 0;
    function oneFlash() {
      return S.animate({
        from: 0, to: 1, duration: 260, easing: 'linear',
        onUpdate: function () { S.getBoard().update(); }
      }).then(function () {
        count++;
        if (count < 3) return oneFlash();
      });
    }
    return oneFlash();
  }

  var scene = {
    id: 's3',
    title: '三、证明过程（推理链）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      shownNodes = 0;
    },
    steps: [
      {
        // 步骤1：假设——写成最简分数
        narration: '正式开始证明！第一步：假设 $\\sqrt{2}$ 是有理数。那么它可以写成分数形式。我们把它写成最简分数：$\\sqrt{2} = \\dfrac{p}{q}$，其中 $p$、$q$ 是正整数，并且 $p$、$q$ 互质——也就是说，它们的最大公因数是 1，这个分数已经是最简形式，不能再约分了。这个"互质"条件非常关键，后面的矛盾就从这里产生！',
        enter: function (anim) {
          shownNodes = 0;
          // 画第一个节点
          drawNode(0,
            '假设 $\\sqrt{2} = \\dfrac{p}{q}$',
            '$p, q$ 互质的正整数（最简分数）'
          );
          shownNodes = 1;

          P.renderCard(
            '<b>证明第①步：假设</b><br><br>' +
            '假设 $\\sqrt{2}$ 是有理数，<br>' +
            '则 $\\sqrt{2} = \\dfrac{p}{q}$<br><br>' +
            '$p, q$ 为正整数，且 $p, q$ <b>互质</b><br>' +
            '<span style="color:#90a4ae">（最大公因数为 1，不可再约分）</span>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：两边平方 → p² 是偶数 → p 是偶数
        narration: '第二步：对 $\\sqrt{2} = \\dfrac{p}{q}$ 两边平方，得到 $2 = \\dfrac{p^2}{q^2}$，整理得 $p^2 = 2q^2$。这说明 $p^2$ 是 2 的倍数，也就是 $p^2$ 是偶数。现在有一个重要的推理：如果 $p^2$ 是偶数，那么 $p$ 一定是偶数。为什么？因为奇数的平方是奇数——比如 $3^2=9$，$5^2=25$——所以如果 $p$ 是奇数，$p^2$ 也是奇数，与已知矛盾。所以 $p$ 只能是偶数！',
        enter: function (anim) {
          // 画箭头0→1 和 节点1
          drawArrow(0);
          drawNode(1,
            '$p^2 = 2q^2$ ⟹ $p^2$ 是偶数 ⟹ $p$ 是偶数',
            '（奇数的平方是奇数，所以 $p$ 不可能是奇数）'
          );
          shownNodes = 2;

          P.renderCard(
            '<b>证明第②步：两边平方</b><br><br>' +
            '$\\sqrt{2} = \\dfrac{p}{q}$ 两边平方：<br>' +
            '$2 = \\dfrac{p^2}{q^2}$ ⟹ $p^2 = 2q^2$<br><br>' +
            '$p^2$ 是偶数 ⟹ $p$ 是偶数<br>' +
            '<span style="color:#90a4ae">（奇数的平方是奇数，故 $p$ 必为偶数）</span>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：设 p=2m → q² 是偶数 → q 是偶数
        narration: '第三步：既然 $p$ 是偶数，我们设 $p = 2m$（$m$ 是正整数）。把 $p = 2m$ 代入 $p^2 = 2q^2$，得到 $(2m)^2 = 2q^2$，即 $4m^2 = 2q^2$，化简得 $q^2 = 2m^2$。这说明 $q^2$ 也是偶数！同理，$q^2$ 是偶数意味着 $q$ 也是偶数。所以，通过两步推理，我们得到了 $p$ 是偶数，$q$ 也是偶数！',
        enter: function (anim) {
          // 画箭头1→2 和 节点2
          drawArrow(1);
          drawNode(2,
            '设 $p=2m$：$q^2 = 2m^2$ ⟹ $q^2$ 是偶数 ⟹ $q$ 是偶数',
            '（代入 $p=2m$ 到 $p^2=2q^2$，得 $4m^2=2q^2$，即 $q^2=2m^2$）'
          );
          shownNodes = 3;

          P.renderCard(
            '<b>证明第③步：代入 $p=2m$</b><br><br>' +
            '$p=2m$ 代入 $p^2=2q^2$：<br>' +
            '$(2m)^2 = 2q^2$<br>' +
            '$4m^2 = 2q^2$<br>' +
            '$q^2 = 2m^2$<br><br>' +
            '$q^2$ 是偶数 ⟹ <b>$q$ 也是偶数</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤4：矛盾！p、q 都是偶数，但互质（红色闪烁强调）
        narration: '第四步，也是最关键的一步——我们发现了<b>矛盾</b>！$p$ 是偶数，$q$ 也是偶数，那么 $p$ 和 $q$ 都有公因数 2，也就是说 $p$、$q$ 不互质！但是——我们在一开始就假设了 $p$、$q$ 互质！这就产生了明显的矛盾：同一个式子里，$p$、$q$ 既互质又不互质，这是不可能的！请注意这个矛盾节点，它是整个证明的核心。',
        enter: function (anim) {
          // 画箭头2→3 和 节点3（矛盾节点，红色）
          drawArrow(2);
          drawNode(3,
            '$p, q$ 都是偶数 ⟹ 公因数为 2 ⟹ 与"互质"矛盾！',
            '（假设说互质，推理说有公因数 2，两者不能同时成立）'
          );
          shownNodes = 4;

          // 矛盾节点加粗边框（重绘一次）
          S.addPolygon('contra-border', [
            [NODE_X - NODE_W - 0.2, NODE_Y[3] + NODE_H + 0.2],
            [NODE_X + NODE_W + 0.2, NODE_Y[3] + NODE_H + 0.2],
            [NODE_X + NODE_W + 0.2, NODE_Y[3] - NODE_H - 0.2],
            [NODE_X - NODE_W - 0.2, NODE_Y[3] - NODE_H - 0.2]
          ], { fillColor: 'none', fillOpacity: 0, strokeColor: RED, strokeWidth: 4 });

          P.renderCard(
            '<b style="color:#c62828">矛盾！</b><br><br>' +
            '推理得：$p$ 是偶数，$q$ 是偶数<br>' +
            '⟹ $p, q$ 有公因数 <b>2</b><br><br>' +
            '但假设说：$p, q$ <b>互质</b>（无公因数）<br><br>' +
            '<span style="color:#c62828;font-size:1.1em"><b>矛盾！假设不成立！</b></span>'
          );

          if (!anim) { return; }
          return delay(200).then(function () {
            return flashContradiction();
          });
        },
      },
      {
        // 步骤5：结论——√2 不是有理数 ∎
        narration: '第五步：由矛盾得出结论。既然在"$\\sqrt{2}$ 是有理数"的假设下推出了矛盾，说明这个假设是<b>错误的</b>。因此，$\\sqrt{2}$ 不是有理数，而是无理数。这个结论由反证法严格证明，证毕！（用 ∎ 符号表示证明完成，这是数学惯例。）同学们，这个证明的每一步都是严密的逻辑推理，没有任何跳步，这就是数学的美妙之处！',
        enter: function (anim) {
          // 画箭头3→4 和 节点4（绿色结论）
          drawArrow(3);
          drawNode(4,
            '假设错误 ⟹ $\\sqrt{2}$ 不是有理数 ∎',
            '（反证法证毕：原结论成立）'
          );
          shownNodes = 5;

          // 在最下方加一个总结背景
          S.addPolygon('final-glow', [
            [NODE_X - NODE_W, NODE_Y[4] + NODE_H + 0.15],
            [NODE_X + NODE_W, NODE_Y[4] + NODE_H + 0.15],
            [NODE_X + NODE_W, NODE_Y[4] - NODE_H - 0.15],
            [NODE_X - NODE_W, NODE_Y[4] - NODE_H - 0.15]
          ], { fillColor: 'none', fillOpacity: 0, strokeColor: GREEN, strokeWidth: 4 });

          P.renderCard(
            '<b style="color:#2e7d32">证明完毕 ∎</b><br><br>' +
            '假设 $\\sqrt{2}$ 是有理数 → 推出矛盾<br>' +
            '⟹ 假设错误<br>' +
            '⟹ <b>$\\sqrt{2}$ 不是有理数，是无理数</b><br><br>' +
            '<span style="color:#6a1b9a">这就是数学的严谨之美！</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
