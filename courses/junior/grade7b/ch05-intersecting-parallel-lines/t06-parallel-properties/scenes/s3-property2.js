(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var PURPLE = '#6a1b9a', ORANGE = '#f57c00';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 截线角度（固定，演示用）
  var cAngle = Math.PI / 3;  // 60°

  var aY = 2.5;
  var bY = -2.5;
  var pX = -1;

  function cDirX() { return Math.cos(cAngle); }
  function cDirY() { return Math.sin(cAngle); }

  function ptQ() {
    var dy = bY - aY;
    var dx = dy / Math.tan(cAngle);
    return [pX + dx, bY];
  }

  function buildBase() {
    S.addSegment('s3-a', [-9, aY], [9, aY], { color: COOL, width: 3, dash: 0 });
    S.addText('s3-lbl-a', 8.5, aY + 0.4, 'a', { size: 18, color: COOL });
    S.addSegment('s3-arr-a1', [-1.5, aY + 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s3-arr-a2', [-1.5, aY - 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s3-arr-a3', [0.5, aY + 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s3-arr-a4', [0.5, aY - 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s3-b', [-9, bY], [9, bY], { color: GREEN, width: 3, dash: 0 });
    S.addText('s3-lbl-b', 8.5, bY + 0.4, 'b', { size: 18, color: GREEN });
    S.addSegment('s3-arr-b1', [-1.5, bY + 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s3-arr-b2', [-1.5, bY - 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s3-arr-b3', [0.5, bY + 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s3-arr-b4', [0.5, bY - 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });

    // 截线 c（固定角度，不动）
    var qx = ptQ()[0];
    S.addSegment('s3-c',
      [pX + cDirX() * 6, aY + cDirY() * 6],
      [qx - cDirX() * 3, bY - cDirY() * 3],
      { color: WARM, width: 3, dash: 0 });
    S.addText('s3-lbl-c', pX + cDirX() * 6 + 0.3, aY + cDirY() * 6 + 0.2, 'c', { size: 18, color: WARM });
    S.addText('s3-lbl-p', pX - 0.7, aY - 0.6, 'P', { size: 16, color: INK });
    S.addText('s3-lbl-q', qx - 0.7, bY - 0.6, 'Q', { size: 16, color: INK });
    S.addText('s3-cond', -8.5, 6.0, 'a ∥ b', { size: 18, color: INK });
  }

  var scene = {
    id: 's3',
    title: '三、性质2：内错角相等',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      cAngle = Math.PI / 3;
    },
    steps: [
      {
        narration: '现在研究第二类角——<b>内错角</b>。所谓内错角，就是位于两平行线之间（"内"），又在截线两侧（"错"）的一对角。在图中，∠2 是 $P$ 处截线下方与直线 $a$ 左侧的角，∠3 是 $Q$ 处截线上方与直线 $b$ 右侧的角，它们就是一对内错角。',
        enter: function (anim) {
          cAngle = Math.PI / 3;
          buildBase();
          var qx = ptQ()[0];
          // ∠2 在 P 处：a 左方向 → P → c 下方方向（内错角，P 处截线下侧与 a 左侧）
          S.addAngle('s3-ang2',
            [pX - 3, aY],       // a 左方向
            [pX, aY],           // 顶点 P
            [pX + cDirX() * (-3), aY + cDirY() * (-3)],  // c 下方向
            { radius: 1.0, color: WARM, label: '∠2', opacity: 0.15 });
          // ∠3 在 Q 处：c 上方向 → Q → b 右方向（内错角，Q 处截线上侧与 b 右侧）
          S.addAngle('s3-ang3',
            [qx + cDirX() * 3, bY + cDirY() * 3],   // c 上方向
            [qx, bY],                                  // 顶点 Q
            [qx + 3, bY],                              // b 右方向
            { radius: 1.0, color: PURPLE, label: '∠3', opacity: 0.15 });
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '我们来看度数。当前截线与水平线成 60° 角，∠2 = 60°，∠3 = 60°，完全相等！这是性质2的体现。但光看一个角度不够，我们来看推导——用已有性质来证明它。',
        enter: function (anim) {
          var qx = ptQ()[0];
          var deg = Math.round(cAngle * 180 / Math.PI);
          S.addText('s3-deg2', pX - 3.5, aY - 1.2, '∠2 = ' + deg + '°', { size: 15, color: WARM });
          S.addText('s3-deg3', qx + 1.0, bY + 1.5, '∠3 = ' + deg + '°', { size: 15, color: PURPLE });
          P.renderCard('度量：∠2 = ∠3 = ' + deg + '°<br><br>这是偶然吗？让我们从性质1来推导！');
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '推导过程如下：首先，∠1 是 $P$ 处的同位角对应 ∠3——由性质1，$a \\parallel b$ 推出 $\\angle 1 = \\angle 3$（同位角相等）。然后，∠1 和 ∠2 是对顶角——由对顶角相等，$\\angle 1 = \\angle 2$。两式合并，得到 $\\angle 2 = \\angle 3$。这就是<b>性质2：两直线平行，内错角相等</b>！',
        enter: function (anim) {
          // 补画 ∠1 以显示推导链
          S.addAngle('s3-ang1',
            [pX + 3, aY],
            [pX, aY],
            [pX + cDirX() * 3, aY + cDirY() * 3],
            { radius: 1.6, color: ORANGE, label: '∠1', opacity: 0.12 });
          P.renderCard(
            '<b>推导链：</b><br>' +
            '① $a \\parallel b$，所以 $\\angle 1 = \\angle 3$（同位角相等）<br>' +
            '② $\\angle 1 = \\angle 2$（对顶角相等）<br>' +
            '③ 因此 $\\angle 2 = \\angle 3$<br><br>' +
            '<b>性质2：两直线平行，内错角相等</b><br>' +
            '$a \\parallel b \\Rightarrow \\angle 2 = \\angle 3$'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
