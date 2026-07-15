(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', ORANGE = '#f57c00';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 截线角度（弧度），初始值
  var cAngle = Math.PI / 3; // 截线与水平线夹角

  // 平行线 a（y=2.5），b（y=-2.5），截线绕与 a 的交点旋转
  var aY = 2.5;
  var bY = -2.5;

  // 截线与 a 的交点 P 固定在 (-1, aY)
  var pX = -1;

  // 截线方向函数（单位向量 * 9）
  function cDirX() { return Math.cos(cAngle) * 9; }
  function cDirY() { return Math.sin(cAngle) * 9; }

  // P 点
  var ptP = [pX, aY];

  // 截线上方端点（跟随 cAngle）
  function ptCTop() { return [pX + cDirX(), aY + cDirY()]; }
  // 截线与 b 的交点 Q（截线延伸到 y=bY）
  function ptQ() {
    var t = (bY - aY) / Math.sin(cAngle) * Math.cos(cAngle);
    var dy = bY - aY;
    var dx = dy / Math.tan(cAngle);
    return [pX + dx, bY];
  }
  // 截线下方端点（从 Q 延伸）
  function ptCBot() {
    var q = ptQ();
    return [q[0] - cDirX() * 0.3, bY - cDirY() * 0.3];
  }

  function buildBase() {
    // 直线 a
    S.addSegment('s2-a', [-9, aY], [9, aY], { color: COOL, width: 3, dash: 0 });
    S.addText('s2-lbl-a', 8.5, aY + 0.4, 'a', { size: 18, color: COOL });
    // 平行箭头 a
    S.addSegment('s2-arr-a1', [-1.5, aY + 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s2-arr-a2', [-1.5, aY - 0.5], [-1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s2-arr-a3', [0.5, aY + 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s2-arr-a4', [0.5, aY - 0.5], [1, aY], { color: COOL, width: 2, dash: 0 });
    // 直线 b
    S.addSegment('s2-b', [-9, bY], [9, bY], { color: GREEN, width: 3, dash: 0 });
    S.addText('s2-lbl-b', 8.5, bY + 0.4, 'b', { size: 18, color: GREEN });
    // 平行箭头 b
    S.addSegment('s2-arr-b1', [-1.5, bY + 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s2-arr-b2', [-1.5, bY - 0.5], [-1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s2-arr-b3', [0.5, bY + 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s2-arr-b4', [0.5, bY - 0.5], [1, bY], { color: GREEN, width: 2, dash: 0 });
    // 标注平行条件
    S.addText('s2-cond', -8.5, 5.5, 'a ∥ b', { size: 18, color: INK });
  }

  function buildTransversal() {
    // 截线 c（动态，随 cAngle 变化）
    S.addSegment('s2-c',
      function () { return [pX + cDirX(), aY + cDirY()]; },
      function () {
        var q = ptQ();
        return [q[0] - Math.cos(cAngle) * 3, bY - Math.sin(cAngle) * 3];
      },
      { color: WARM, width: 3, dash: 0 });
    S.addText('s2-lbl-c',
      function () { return pX + cDirX() + 0.3; },
      function () { return aY + cDirY() + 0.3; },
      'c', { size: 18, color: WARM });
    // 交点标注
    S.addText('s2-lbl-p', pX - 0.7, aY - 0.6, 'P', { size: 16, color: INK });
    S.addText('s2-lbl-q',
      function () { return ptQ()[0] - 0.7; },
      function () { return bY - 0.6; },
      'Q', { size: 16, color: INK });
  }

  // 同位角：P 处上方角（截线与 a 的右上角）和 Q 处上方角（截线与 b 的右上角）
  function buildCorrespondingAngles() {
    // ∠1 在 P 处：从 a 右方向 → P → c 上方方向
    S.addAngle('s2-ang1',
      [pX + 3, aY],   // a 右方向上一点
      [pX, aY],        // 顶点 P
      function () { return [pX + Math.cos(cAngle) * 3, aY + Math.sin(cAngle) * 3]; },
      { radius: 1.0, color: WARM, label: '∠1', opacity: 0.15 });

    // ∠2 在 Q 处：从 b 右方向 → Q → c 上方方向（Q 点坐标动态）
    S.addAngle('s2-ang2',
      function () { return [ptQ()[0] + 3, bY]; },           // b 右方向
      function () { return [ptQ()[0], bY]; },               // 顶点 Q
      function () { return [ptQ()[0] + Math.cos(cAngle) * 3, bY + Math.sin(cAngle) * 3]; },
      { radius: 1.0, color: ORANGE, label: '∠2', opacity: 0.15 });
  }

  function buildDegreTexts() {
    S.addText('s2-deg1',
      pX + 2.0,
      aY + 1.2,
      function () {
        var deg = Math.round(cAngle * 180 / Math.PI);
        if (deg > 180) deg = deg - 180;
        if (deg < 0) deg = deg + 180;
        return '∠1 = ' + deg + '°';
      },
      { size: 15, color: WARM });

    S.addText('s2-deg2',
      function () { return ptQ()[0] + 2.0; },
      bY + 1.2,
      function () {
        var deg = Math.round(cAngle * 180 / Math.PI);
        if (deg > 180) deg = deg - 180;
        if (deg < 0) deg = deg + 180;
        return '∠2 = ' + deg + '°';
      },
      { size: 15, color: ORANGE });
  }

  var scene = {
    id: 's2',
    title: '二、性质1：同位角相等',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      cAngle = Math.PI / 3;
    },
    steps: [
      {
        narration: '首先研究<b>同位角</b>。已知 $a \\parallel b$，截线 $c$ 分别与它们交于 $P$、$Q$ 两点。∠1 是截线 $c$ 与直线 $a$ 在 $P$ 点右上方的角，∠2 是截线 $c$ 与直线 $b$ 在 $Q$ 点右上方的角——它们处于相同的位置，所以叫<b>同位角</b>。现在大家猜一猜：∠1 和 ∠2 有什么关系？',
        enter: function (anim) {
          cAngle = Math.PI / 3;
          buildBase();
          if (!anim) {
            buildTransversal();
            buildCorrespondingAngles();
            return;
          }
          return delay(400).then(function () {
            buildTransversal();
            return delay(500);
          }).then(function () {
            buildCorrespondingAngles();
          });
        },
      },
      {
        narration: '我们用度量的方式来验证。根据当前截线的角度，∠1 和 ∠2 的度数实时显示出来——你会发现，它们<b>完全相同</b>！这不是巧合——让我们转动截线来进一步观察。',
        enter: function (anim) {
          buildDegreTexts();
          P.renderCard('度量结果：∠1 = ∠2（当前角度）<br>这是巧合吗？让截线转起来看看……');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '注意观察！截线 $c$ 绕 $P$ 点转动，∠1 和 ∠2 的度数<b>实时同步变化</b>——无论截线转到什么位置，两个角始终相等！这正是平行线的第一条性质：<b>两直线平行，同位角相等</b>。',
        enter: function (anim) {
          if (!anim) {
            cAngle = 5 * Math.PI / 12;
            S.getBoard().update();
            P.renderCard(
              '<b>性质1</b><br>' +
              '两直线平行，同位角相等<br><br>' +
              '符号表达：$a \\parallel b \\Rightarrow \\angle 1 = \\angle 2$'
            );
            return;
          }
          return S.animate({
            from: Math.PI / 3,
            to: 5 * Math.PI / 12,
            duration: 2000,
            easing: 'easeInOutQuart',
            onUpdate: function (v) { cAngle = v; S.getBoard().update(); },
          }).then(function () {
            P.renderCard(
              '<b>性质1</b><br>' +
              '两直线平行，同位角相等<br><br>' +
              '符号表达：$a \\parallel b \\Rightarrow \\angle 1 = \\angle 2$'
            );
          });
        },
      },
      {
        narration: '再转一次，让大家更直观地感受这个规律。从 75° 到 50°，∠1 和 ∠2 始终保持相等。这就是性质1的威力：<b>只要两直线平行，同位角必然相等</b>，这是平行的必然结论，没有例外。',
        enter: function (anim) {
          if (!anim) {
            cAngle = Math.PI * 5 / 18;
            S.getBoard().update();
            return;
          }
          return S.animate({
            from: 5 * Math.PI / 12,
            to: Math.PI * 5 / 18,
            duration: 1800,
            easing: 'easeInOutQuart',
            onUpdate: function (v) { cAngle = v; S.getBoard().update(); },
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
