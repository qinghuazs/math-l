// s5-judgments.js  平行线的三种判定方法（5步）★核心
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 判定1 动画布局：
  //   直线 a（固定）: 水平线 y=2
  //   截线 c（固定）: 过(-1.5,2)和(-0.2,-2)方向的直线
  //   直线 b（可绕交点B旋转）: 初始微斜（非平行），旋转到平行位置
  //
  // 判定1核心：∠1（A处，同位角上角）= ∠5（B处，下角）=> a∥b
  //
  // 坐标设置
  var ptAx = -1.5, ptAy = 2;    // c∩a
  var ptBx = -0.2, ptBy = -2;   // c∩b（旋转中心）

  var cdx = ptBx - ptAx; var cdy = ptBy - ptAy;
  var cLen = Math.sqrt(cdx * cdx + cdy * cdy);
  var cux = cdx / cLen; var cuy = cdy / cLen;

  // c 延伸
  var c1 = [ptAx - cux * 14, ptAy - cuy * 14];
  var c2 = [ptBx + cux * 14, ptBy + cuy * 14];

  // a 固定水平
  var a1 = [-9, ptAy]; var a2 = [8, ptAy];

  // ∠1 在 A 处的角度（a 与 c 在 A 处形成的左上角）
  // a 方向向左: (-1,0), c 从A向上: (-cux,-cuy)
  // ∠1 = 从(-1,0)到(-cux,-cuy)的角（逆时针）
  // 用 Math.atan2 计算
  var ang1Rad = (function () {
    // 向量 a 左方向(-1,0) 角度 = PI
    // 向量 c 上方向(-cux,-cuy) 角度 = atan2(-cuy,-cux)
    var ang_a = Math.PI;
    var ang_c = Math.atan2(-cuy, -cux);
    // ∠1 = 从c到a顺时针（劣角）
    var d = ang_a - ang_c;
    while (d < 0) d += 2 * Math.PI;
    while (d > Math.PI) d = 2 * Math.PI - d;
    return d;
  })();

  // b的方向角（相对于水平轴）
  // 初始：b微斜，角度比a低10°（使∠5≠∠1，约10°的差距）
  var bAngle0 = -10 * Math.PI / 180;   // 初始：b向右下斜 10°
  var bAngleFinal = 0;                  // 终态：b水平（与a平行）

  // b绕ptB旋转，方向角theta
  // b的端点：从ptB出发，角度theta延伸到两侧
  var bTheta = bAngle0; // 闭包变量

  function bEndR(theta) { return [ptBx + 9 * Math.cos(theta), ptBy + 9 * Math.sin(theta)]; }
  function bEndL(theta) { return [ptBx - 9 * Math.cos(theta), ptBy - 9 * Math.sin(theta)]; }

  // ∠5 是 B 处的"左上"角（c上方向 × b左方向）
  // c上方向: (-cux,-cuy), b左方向: (-cos(theta),-sin(theta))
  // ∠5 的度数 = 从b左方 到 c上方 的劣角
  function ang5Deg(theta) {
    var ang_b = Math.atan2(-Math.sin(theta), -Math.cos(theta)); // b左方角度
    var ang_c = Math.atan2(-cuy, -cux);                          // c上方角度
    var d = ang_c - ang_b;
    while (d < 0) d += 2 * Math.PI;
    while (d > Math.PI) d = 2 * Math.PI - d;
    return Math.round(d * 180 / Math.PI);
  }

  // ∠1 度数（固定）
  var ang1Deg = Math.round(ang1Rad * 180 / Math.PI);

  function buildABase() {
    S.addSegment('line-a', a1, a2, { color: BLUE, width: 3, dash: 0 });
    S.addText('lbl-a', 8.3, ptAy + 0.3, 'a', { size: 18, color: BLUE });
    S.addSegment('line-c', c1, c2, { color: INK, width: 2.5, dash: 0 });
    S.addText('lbl-c', c2[0] + 0.3, c2[1] - 0.3, 'c', { size: 18, color: INK });
    S.dropPoint('pt-A', ptAx, ptAy, { color: INK, name: 'A', size: 2.5, animate: false, labelOffset: [-18, 8] });
  }

  var scene = {
    id: 's5',
    title: '五、平行线的判定方法',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      bTheta = bAngle0; // 重置闭包变量
    },
    steps: [
      {
        // 步骤1：判定1——动画：旋转b使∠5=∠1（同位角相等）
        narration: '现在来学最重要的内容——平行线的判定。判定1：同位角相等，两直线平行。请看这个动画：直线 $a$ 和截线 $c$ 固定，$a$ 与 $c$ 在 $A$ 处形成的同位角 ∠1 等于某个度数。现在让直线 $b$ 绕交点 $B$ 慢慢旋转，同时观察 $b$ 与 $c$ 在 $B$ 处形成的同位角 ∠5——当 ∠5 的度数等于 ∠1 时，$b$ 与 $a$ 就变成了平行线！',
        enter: function (anim) {
          bTheta = bAngle0;
          buildABase();

          var board = S.getBoard();

          // b 的动态端点
          var ex = bEndR(bTheta)[0], ey = bEndR(bTheta)[1];
          var fx = bEndL(bTheta)[0], fy = bEndL(bTheta)[1];

          var ptBE = board.create('point',
            [function () { return ex; }, function () { return ey; }],
            { visible: false, fixed: true, withLabel: false });
          var ptBF = board.create('point',
            [function () { return fx; }, function () { return fy; }],
            { visible: false, fixed: true, withLabel: false });
          var segB = board.create('segment', [ptBE, ptBF], {
            strokeColor: ORANGE, strokeWidth: 3, dash: 0, highlight: false, fixed: true,
          });
          S.addText('lbl-b', 8.3, ptBy + 0.3, 'b', { size: 18, color: ORANGE });
          S.dropPoint('pt-B', ptBx, ptBy, { color: INK, name: 'B', size: 2.5, animate: false, labelOffset: [-18, -16] });

          // ∠1 固定高亮（A处，r=0.75）
          var r = 0.75;
          S.addAngle('ang1-fixed',
            [ptAx - 1, ptAy],
            [ptAx, ptAy],
            [ptAx - cux * 2, ptAy - cuy * 2],
            { radius: r, color: PURPLE, label: '∠1', opacity: 0.35, labelSize: 14 });

          // ∠5 动态（B处，跟随bTheta）
          // p1=b左方，vtx=B，p2=c上方
          var bLx = function () { return ptBx - 2 * Math.cos(bTheta); };
          var bLy = function () { return ptBy - 2 * Math.sin(bTheta); };
          var cUpx = ptBx - cux * 2; var cUpy = ptBy - cuy * 2;
          S.addAngle('ang5-dyn',
            [bLx, bLy],
            [ptBx, ptBy],
            [cUpx, cUpy],
            { radius: r, color: ORANGE, label: '∠5', opacity: 0.35, labelSize: 14 });

          // 度数文本
          S.addText('deg1-txt', ptAx - 3, ptAy + 1.5,
            '∠1 = ' + ang1Deg + '°',
            { size: 15, color: PURPLE });
          S.addText('deg5-txt', ptBx + 0.8, ptBy + 1.5,
            function () { return '∠5 = ' + ang5Deg(bTheta) + '°'; },
            { size: 15, color: ORANGE });

          if (!anim) {
            // 快放：直接到终态
            bTheta = bAngleFinal;
            ex = bEndR(bTheta)[0]; ey = bEndR(bTheta)[1];
            fx = bEndL(bTheta)[0]; fy = bEndL(bTheta)[1];
            board.update();
            // b变蓝+平行标记
            segB.setAttribute({ strokeColor: BLUE, strokeWidth: 4 });
            board.update();
            S.addSegment('par-mark1', [ptAx + 1, ptAy], [ptAx + 1.6, ptAy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            S.addSegment('par-mark2', [ptAx + 1.3, ptAy], [ptAx + 1.9, ptAy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            S.addSegment('par-mark3', [ptBx + 1, ptBy], [ptBx + 1.6, ptBy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            S.addSegment('par-mark4', [ptBx + 1.3, ptBy], [ptBx + 1.9, ptBy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            S.addText('par-label', ptBx + 1, ptBy - 1.5, 'a ∥ b', { size: 20, color: BLUE });
            P.renderCard(
              '<b>判定1：同位角相等，两直线平行</b><br>' +
              '当 ∠1 = ∠5 = ' + ang1Deg + '° 时，$a \\parallel b$<br>' +
              '（∠1 与 ∠5 是同位角）'
            );
            return;
          }

          // 动画：bTheta 从 bAngle0 到 0（旋转到平行）
          P.renderCard('观察：当 ∠5 的度数逐渐增大，趋向等于 ∠1 时……');
          return S.animate({
            from: bAngle0, to: bAngleFinal, duration: 2400, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              bTheta = v;
              ex = bEndR(v)[0]; ey = bEndR(v)[1];
              fx = bEndL(v)[0]; fy = bEndL(v)[1];
              board.update();
            },
          }).then(function () {
            // b变蓝（平行了）
            segB.setAttribute({ strokeColor: BLUE, strokeWidth: 4 });
            board.update();
            return delay(200);
          }).then(function () {
            // 加平行标记
            S.addSegment('par-mark1', [ptAx + 1, ptAy], [ptAx + 1.6, ptAy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            S.addSegment('par-mark2', [ptAx + 1.3, ptAy], [ptAx + 1.9, ptAy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            S.addSegment('par-mark3', [ptBx + 1, ptBy], [ptBx + 1.6, ptBy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            S.addSegment('par-mark4', [ptBx + 1.3, ptBy], [ptBx + 1.9, ptBy + 0.3], { color: BLUE, width: 2.5, dash: 0 });
            board.update();
            return delay(200);
          }).then(function () {
            S.addText('par-label', ptBx + 1, ptBy - 1.5, 'a ∥ b', { size: 20, color: BLUE });
            P.renderCard(
              '<b>判定1：同位角相等，两直线平行</b><br>' +
              '当 ∠1 = ∠5 = ' + ang1Deg + '° 时，$a \\parallel b$<br>' +
              '（∠1 与 ∠5 是同位角）'
            );
          });
        },
      },
      {
        // 步骤2：判定1 规范表述卡
        narration: '判定1 的完整表述：同位角相等，两直线平行。注意写推理时格式要规范：先写"因为"点明角的数量关系，再写"（同位角相等，两直线平行）"给出依据，最后写"所以"得出结论。',
        enter: function (anim) {
          P.renderCard(
            '<b>判定1（正式表述）</b><br>' +
            '若 ∠1 = ∠5（同位角），则 $a \\parallel b$<br><br>' +
            '推理格式：<br>' +
            '因为 ∠1 = ∠5<br>' +
            '（同位角相等，两直线平行）<br>' +
            '所以 $a \\parallel b$',
            'cool'
          );
          if (anim) { return delay(200); }
        },
      },
      {
        // 步骤3：判定2——内错角相等（图+卡）
        narration: '判定2：内错角相等，两直线平行。这和判定1 是平行的逻辑——∠3 与 ∠5 是内错角，如果 ∠3 = ∠5，同样可以得出 $a$ 与 $b$ 平行。内错角是 Z 形，记住这个形状就能快速判断。',
        enter: function (anim) {
          // 在之前图上叠加：高亮∠3和∠5（内错角）
          var r = 0.75; var rBig = 1.2;
          // 先移除之前的角5
          S.remove('ang5-dyn');
          // 画内错角 ∠3（A处右下）
          S.addAngle('ang3-j2',
            [ptAx + 2, ptAy],
            [ptAx, ptAy],
            [ptAx + cux * 2, ptAy + cuy * 2],
            { radius: r, color: ORANGE, label: '∠3', opacity: 0.40, labelSize: 14 });
          // 画∠5（B处左上）
          S.addAngle('ang5-j2',
            [ptBx - 2, ptBy],
            [ptBx, ptBy],
            [ptBx - cux * 2, ptBy - cuy * 2],
            { radius: r, color: ORANGE, label: '∠5', opacity: 0.40, labelSize: 14 });

          P.renderCard(
            '<b>判定2：内错角相等，两直线平行</b><br>' +
            '若 ∠3 = ∠5（内错角），则 $a \\parallel b$<br><br>' +
            '推理格式：<br>' +
            '因为 ∠3 = ∠5<br>' +
            '（内错角相等，两直线平行）<br>' +
            '所以 $a \\parallel b$',
            'warm'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤4：判定3——同旁内角互补（图+度数演算）
        narration: '判定3：同旁内角互补，两直线平行。∠4 与 ∠5 是同旁内角，如果两角之和等于 180°，就说明 a 与 b 平行。这里注意——不是"相等"而是"互补"，这和前两个判定不同，一定要记清楚！',
        enter: function (anim) {
          // 移除内错角高亮
          S.remove('ang3-j2'); S.remove('ang5-j2');
          var r = 0.75; var rBig = 1.2;

          // 画同旁内角 ∠4（A处左下）
          S.addAngle('ang4-j3',
            [ptAx + cux * 2, ptAy + cuy * 2],
            [ptAx, ptAy],
            [ptAx - 2, ptAy],
            { radius: rBig, color: GREEN, label: '∠4', opacity: 0.40, labelSize: 14 });
          // 画∠5（B处左上）
          S.addAngle('ang5-j3',
            [ptBx - 2, ptBy],
            [ptBx, ptBy],
            [ptBx - cux * 2, ptBy - cuy * 2],
            { radius: r, color: GREEN, label: '∠5', opacity: 0.40, labelSize: 14 });

          // 度数演算：设∠5=115°，∠4=65°，65+115=180
          S.addText('j3-calc1', -8.5, -5, '设 ∠5 = 115°，∠4 = 65°', { size: 14, color: INK });
          S.addText('j3-calc2', -8.5, -6, '∠4 + ∠5 = 65° + 115° = 180°', { size: 14, color: GREEN });

          P.renderCard(
            '<b>判定3：同旁内角互补，两直线平行</b><br>' +
            '若 ∠4 + ∠5 = 180°（同旁内角），则 $a \\parallel b$<br><br>' +
            '注意：同旁内角是<b>互补</b>（和=180°）<br>' +
            '而不是相等！'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤5：口诀卡（三个判定汇总）
        narration: '三个判定方法学完了。我们来记一个口诀：同位角相等、内错角相等、同旁内角互补——满足这三个条件之一，两直线就平行。注意：这三个判定是充分条件，满足角的条件就能推出线平行；而反过来，知道线平行也能推出角的条件，那是平行线的性质，我们后面会学。',
        enter: function (anim) {
          P.renderCard(
            '<b>平行线判定口诀</b><br>' +
            '<div style="font-size:17px;line-height:2">' +
            '① <b style="color:#7b1fa2">同位角相等</b> ⟹ 两直线平行<br>' +
            '② <b style="color:#e65100">内错角相等</b> ⟹ 两直线平行<br>' +
            '③ <b style="color:#2e7d32">同旁内角互补</b> ⟹ 两直线平行<br>' +
            '</div>' +
            '<br><b>使用步骤</b>：先认清角的类型 → 再判断数量关系 → 最后写结论',
            'cool'
          );
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
