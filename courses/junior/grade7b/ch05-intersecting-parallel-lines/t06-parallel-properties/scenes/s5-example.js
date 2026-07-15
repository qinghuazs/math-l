(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var PURPLE = '#6a1b9a', ORANGE = '#f57c00';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 固定图形参数
  var aY = 2.5;
  var bY = -2.5;
  var pX = -2;
  var cAngle = Math.PI / 3;  // 60°（截线斜率固定）

  function cDirX() { return Math.cos(cAngle); }
  function cDirY() { return Math.sin(cAngle); }

  function ptQ() {
    var dy = bY - aY;
    var dx = dy / Math.tan(cAngle);
    return [pX + dx, bY];
  }

  function buildBase() {
    // 平行线 a
    S.addSegment('s5-a', [-9, aY], [9, aY], { color: COOL, width: 3, dash: 0 });
    S.addText('s5-lbl-a', 8.5, aY + 0.4, 'a', { size: 18, color: COOL });
    S.addSegment('s5-arr-a1', [-1.5, aY + 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s5-arr-a2', [-1.5, aY - 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s5-arr-a3', [0.5, aY + 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s5-arr-a4', [0.5, aY - 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    // 平行线 b
    S.addSegment('s5-b', [-9, bY], [9, bY], { color: GREEN, width: 3, dash: 0 });
    S.addText('s5-lbl-b', 8.5, bY + 0.4, 'b', { size: 18, color: GREEN });
    S.addSegment('s5-arr-b1', [-1.5, bY + 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s5-arr-b2', [-1.5, bY - 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s5-arr-b3', [0.5, bY + 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s5-arr-b4', [0.5, bY - 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });
    // 截线 c（固定 60°）
    var qx = ptQ()[0];
    S.addSegment('s5-c',
      [pX + cDirX() * 6, aY + cDirY() * 6],
      [qx - cDirX() * 3, bY - cDirY() * 3],
      { color: WARM, width: 3, dash: 0 });
    S.addText('s5-lbl-c', pX + cDirX() * 6 + 0.2, aY + cDirY() * 6 + 0.2, 'c', { size: 18, color: WARM });
    // 交点标注
    S.addText('s5-lbl-p', pX - 0.7, aY - 0.6, 'P', { size: 16, color: INK });
    S.addText('s5-lbl-q', qx - 0.7, bY - 0.6, 'Q', { size: 16, color: INK });
    // 已知条件
    S.addText('s5-cond', -8.5, 6.5, 'a ∥ b', { size: 18, color: INK });
  }

  var scene = {
    id: 's5',
    title: '五、例题与推理格式',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '下面来做一道例题，同时学习规范的推理格式。<b>已知</b>：$a \\parallel b$，截线 $c$ 与 $a$ 交于 $P$，与 $b$ 交于 $Q$。$P$ 处的 ∠1（同位角位置）= 70°。<b>求</b>：$Q$ 处对应的同位角 ∠2 的度数，以及与 ∠2 相邻的同旁内角 ∠3 的度数。',
        enter: function (anim) {
          buildBase();
          var qx = ptQ()[0];
          // ∠1 在 P 处（右上方同位角）
          S.addAngle('s5-ang1',
            [pX + 3, aY],
            [pX, aY],
            [pX + cDirX() * 3, aY + cDirY() * 3],
            { radius: 1.0, color: WARM, label: '∠1', opacity: 0.15 });
          // 标注 70°
          S.addText('s5-deg1', pX + 2.0, aY + 1.5, '70°', { size: 16, color: WARM });
          // ∠2 在 Q 处（右上方同位角，用问号先显示）
          S.addAngle('s5-ang2',
            [qx + 3, bY],
            [qx, bY],
            [qx + cDirX() * 3, bY + cDirY() * 3],
            { radius: 1.0, color: ORANGE, label: '∠2', opacity: 0.15 });
          S.addText('s5-deg2-q', qx + 2.0, bY + 1.5, '?°', { size: 16, color: ORANGE });
          // ∠3 在 Q 处（同旁内角，截线上方与 b 右侧）
          S.addAngle('s5-ang3',
            [qx + cDirX() * 3, bY + cDirY() * 3],   // c 上方向
            [qx, bY],
            [qx - 3, bY],                              // b 左方向
            { radius: 1.6, color: PURPLE, label: '∠3', opacity: 0.12 });
          S.addText('s5-deg3-q', qx - 3.5, bY + 1.5, '?°', { size: 16, color: PURPLE });
          P.renderCard(
            '<b>已知：</b>$a \\parallel b$，∠1 = 70°<br><br>' +
            '<b>求：</b>∠2 = ？&nbsp;&nbsp;&nbsp;∠3 = ？'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '先求 ∠2。∠1 和 ∠2 是同位角——它们在截线与两平行线的交点处，位于相同的位置（都在截线右上方）。由性质1，$a \\parallel b$ 推出同位角相等，所以 ∠2 = ∠1 = 70°。图中我们把"?"换成 70°。',
        enter: function (anim) {
          var qx = ptQ()[0];
          // 移除问号，显示答案
          S.remove('s5-deg2-q');
          S.addText('s5-deg2', qx + 2.0, bY + 1.5, '70°', { size: 16, color: ORANGE });
          P.renderCard(
            '<b>求 ∠2：</b><br>' +
            '因为 $a \\parallel b$，<br>' +
            '所以 $\\angle 2 = \\angle 1 = 70^\\circ$<br>' +
            '（两直线平行，同位角相等）'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '再求 ∠3。∠2 和 ∠3 是 $Q$ 点处的邻补角（因为它们共边，另一边是直线 $b$ 延伸的一条直线，两角和为平角 180°），所以 ∠3 = 180° - ∠2 = 180° - 70° = 110°。也可以用性质3直接推导：∠1 与 ∠3 是同旁内角，$a \\parallel b$ 推出 ∠1 + ∠3 = 180°，所以 ∠3 = 110°。',
        enter: function (anim) {
          var qx = ptQ()[0];
          S.remove('s5-deg3-q');
          S.addText('s5-deg3', qx - 3.5, bY + 1.5, '110°', { size: 16, color: PURPLE });
          P.renderCard(
            '<b>求 ∠3：（规范推理格式）</b><br><br>' +
            '因为 $a \\parallel b$，<br>' +
            '所以 $\\angle 1 + \\angle 3 = 180^\\circ$<br>' +
            '（两直线平行，同旁内角互补）<br><br>' +
            '因为 $\\angle 1 = 70^\\circ$，<br>' +
            '所以 $\\angle 3 = 180^\\circ - 70^\\circ = 110^\\circ$<br><br>' +
            '<b>答：∠2 = 70°，∠3 = 110°</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
