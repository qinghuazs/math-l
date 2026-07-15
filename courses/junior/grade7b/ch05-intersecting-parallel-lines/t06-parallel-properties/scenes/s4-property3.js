(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var TEAL = '#00695c', ORANGE = '#f57c00';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

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
    S.addSegment('s4-a', [-9, aY], [9, aY], { color: COOL, width: 3, dash: 0 });
    S.addText('s4-lbl-a', 8.5, aY + 0.4, 'a', { size: 18, color: COOL });
    S.addSegment('s4-arr-a1', [-1.5, aY + 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s4-arr-a2', [-1.5, aY - 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s4-arr-a3', [0.5, aY + 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s4-arr-a4', [0.5, aY - 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s4-b', [-9, bY], [9, bY], { color: GREEN, width: 3, dash: 0 });
    S.addText('s4-lbl-b', 8.5, bY + 0.4, 'b', { size: 18, color: GREEN });
    S.addSegment('s4-arr-b1', [-1.5, bY + 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s4-arr-b2', [-1.5, bY - 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s4-arr-b3', [0.5, bY + 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s4-arr-b4', [0.5, bY - 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });

    var qx = ptQ()[0];
    S.addSegment('s4-c',
      [pX + cDirX() * 6, aY + cDirY() * 6],
      [qx - cDirX() * 3, bY - cDirY() * 3],
      { color: WARM, width: 3, dash: 0 });
    S.addText('s4-lbl-c', pX + cDirX() * 6 + 0.3, aY + cDirY() * 6 + 0.2, 'c', { size: 18, color: WARM });
    S.addText('s4-lbl-p', pX - 0.7, aY - 0.6, 'P', { size: 16, color: INK });
    S.addText('s4-lbl-q', qx - 0.7, bY - 0.6, 'Q', { size: 16, color: INK });
    S.addText('s4-cond', -8.5, 6.0, 'a ∥ b', { size: 18, color: INK });
  }

  var scene = {
    id: 's4',
    title: '四、性质3：同旁内角互补',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      cAngle = Math.PI / 3;
    },
    steps: [
      {
        narration: '第三类角叫<b>同旁内角</b>：位于两平行线之间（"内"），在截线同一侧（"同旁"）的一对角。在图中，∠2 是 $P$ 处截线下方与直线 $a$ 右侧的角，∠4 是 $Q$ 处截线上方与直线 $b$ 右侧的角——它们都在截线右侧，都在两平行线之间，所以叫同旁内角。',
        enter: function (anim) {
          cAngle = Math.PI / 3;
          buildBase();
          var qx = ptQ()[0];
          var deg = Math.round(cAngle * 180 / Math.PI);  // 60°

          // ∠2 在 P 处：a 右方向 → P → c 下方向（截线下侧与 a 右侧，即同旁内角 P 处）
          S.addAngle('s4-ang2',
            [pX + 3, aY],       // a 右方向
            [pX, aY],           // 顶点 P
            [pX + cDirX() * (-3), aY + cDirY() * (-3)],  // c 下方向（指向 b 方向）
            { radius: 1.0, color: TEAL, label: '∠2', opacity: 0.15 });

          // ∠4 在 Q 处：b 右方向 → Q → c 上方向（截线上侧与 b 右侧，即同旁内角 Q 处）
          S.addAngle('s4-ang4',
            [qx + cDirX() * 3, bY + cDirY() * 3],   // c 上方向（指向 P 方向）
            [qx, bY],                                  // 顶点 Q
            [qx - 3, bY],                              // b 左方向（注意：同旁内角在截线同侧）
            { radius: 1.6, color: ORANGE, label: '∠4', opacity: 0.12 });
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '看度数：当截线与水平线成 60° 角时，∠2 = 120°，∠4 = 60°，两者之和正好是 180°！这正是同旁内角的规律。但这不是偶然——无论截线怎么转，∠2 + ∠4 始终等于 180°。让我们通过显示实时求和来验证。',
        enter: function (anim) {
          var qx = ptQ()[0];
          var deg = Math.round(cAngle * 180 / Math.PI);  // 60
          var ang2deg = 180 - deg;  // 120
          S.addText('s4-deg2', pX + 1.0, aY - 1.5, '∠2 = ' + ang2deg + '°', { size: 15, color: TEAL });
          S.addText('s4-deg4', qx + 2.0, bY + 1.5, '∠4 = ' + deg + '°', { size: 15, color: ORANGE });
          S.addText('s4-sum', -8.5, -5.5,
            '∠2 + ∠4 = ' + ang2deg + '° + ' + deg + '° = 180°',
            { size: 16, color: INK });
          P.renderCard(
            '同旁内角之和：<br>' +
            '∠2 + ∠4 = ' + ang2deg + '° + ' + deg + '° = <b>180°</b><br><br>' +
            '和为 180°，说明两角<b>互补</b>！'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '推导也很简洁：由性质1，$a \\parallel b$ 推出 $\\angle 1 = \\angle 3$（同位角）；∠1 与 ∠2 是 $P$ 处的邻补角，所以 $\\angle 1 + \\angle 2 = 180°$；把 ∠1 换成 ∠3，就得到 $\\angle 3 + \\angle 2 = 180°$，即 ∠2 与 ∠3 互补。<b>性质3：两直线平行，同旁内角互补</b>。',
        enter: function (anim) {
          P.renderCard(
            '<b>推导链：</b><br>' +
            '① $a \\parallel b \\Rightarrow \\angle 1 = \\angle 3$（同位角相等）<br>' +
            '② $\\angle 1 + \\angle 2 = 180°$（邻补角）<br>' +
            '③ 因此 $\\angle 2 + \\angle 3 = 180°$<br><br>' +
            '<b>性质3：两直线平行，同旁内角互补</b><br>' +
            '$a \\parallel b \\Rightarrow \\angle 2 + \\angle 4 = 180^\\circ$'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
