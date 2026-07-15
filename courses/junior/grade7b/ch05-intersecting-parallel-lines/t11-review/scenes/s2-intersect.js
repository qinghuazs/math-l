// s2-intersect.js  相交线复习（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 固定两直线相交的经典图（用于例题1）
  // 直线AB水平，直线CD倾斜35°
  // 交点O在(-2, 0)
  var OX = -2, OY = 0;
  var THETA = 35 * Math.PI / 180; // CD与水平的夹角

  function drawCrossLines() {
    // 直线AB（水平）
    S.addSegment('i-ab', [-9, OY], [4, OY], { color: BLUE, width: 2.5, dash: 0 });
    S.addText('i-la', -9.3, OY + 0.3, 'A', { size: 15, color: BLUE });
    S.addText('i-lb', 4.2, OY + 0.3, 'B', { size: 15, color: BLUE });
    // 直线CD（倾斜35°）
    var len = 7;
    S.addSegment('i-cd',
      [OX - len * Math.cos(THETA), OY - len * Math.sin(THETA)],
      [OX + len * Math.cos(THETA), OY + len * Math.sin(THETA)],
      { color: RED, width: 2.5, dash: 0 });
    S.addText('i-lc', OX - len * Math.cos(THETA) - 0.5, OY - len * Math.sin(THETA) - 0.3, 'C', { size: 15, color: RED });
    S.addText('i-ld', OX + len * Math.cos(THETA) + 0.2, OY + len * Math.sin(THETA) + 0.3, 'D', { size: 15, color: RED });
    // 交点O
    S.dropPoint('i-O', OX, OY, { color: INK, name: 'O', size: 2.5, animate: false, labelOffset: [6, -18] });
  }

  function drawFourAngles() {
    // ∠1：A侧→O→D侧（右上，35°）
    S.addAngle('i-ang1',
      [OX - 2, OY],
      [OX, OY],
      [OX + 2 * Math.cos(THETA), OY + 2 * Math.sin(THETA)],
      { radius: 1.0, color: ORANGE, label: '∠1=35°', opacity: 0.12 });
    // ∠2：D侧→O→B侧（右下，145°）
    S.addAngle('i-ang2',
      [OX + 2 * Math.cos(THETA), OY + 2 * Math.sin(THETA)],
      [OX, OY],
      [OX + 2, OY],
      { radius: 1.6, color: BLUE, label: '∠2', opacity: 0.12 });
    // ∠3：B侧→O→C侧（左下，35°，对顶∠1）
    S.addAngle('i-ang3',
      [OX + 2, OY],
      [OX, OY],
      [OX - 2 * Math.cos(THETA), OY - 2 * Math.sin(THETA)],
      { radius: 1.0, color: ORANGE, label: '∠3=35°', opacity: 0.12 });
    // ∠4：C侧→O→A侧（左上，145°，对顶∠2）
    S.addAngle('i-ang4',
      [OX - 2 * Math.cos(THETA), OY - 2 * Math.sin(THETA)],
      [OX, OY],
      [OX - 2, OY],
      { radius: 1.6, color: PURPLE, label: '∠4', opacity: 0.12 });
  }

  var scene = {
    id: 's2',
    title: '二、相交线复习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：核心结论回放（三个结论）
        narration: '现在来复习相交线部分的三个核心结论。第一，对顶角相等——两直线相交形成的"对面"角度数相同；第二，邻补角互补——相邻两角之和等于180°；第三，垂线段最短——从直线外一点到这条直线，垂线段的长度最短，它就是这点到直线的距离。这三个结论要熟练到"见到图就能说出来"的程度。',
        enter: function (anim) {
          P.renderTable({
            head: ['结论', '数量关系', '条件'],
            rows: [
              ['对顶角相等', '∠1 = ∠3，∠2 = ∠4', '两直线相交，互为对顶角'],
              ['邻补角互补', '∠1 + ∠2 = 180°', '两直线相交，相邻共边'],
              ['垂线段最短', '$PA \\leq PB$（$PA \\perp l$）', '点在直线外，PA⊥l'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：例题1——35°求其余三角
        narration: '来看例题1：两条直线相交，一个角是 $35^\\circ$，求其余三个角。请看图形——直线 $AB$ 与直线 $CD$ 相交于点 $O$，已知 $\\angle 1 = 35^\\circ$。解题思路：$\\angle 3$ 与 $\\angle 1$ 是对顶角，所以 $\\angle 3 = 35^\\circ$；$\\angle 2$ 与 $\\angle 1$ 是邻补角，所以 $\\angle 2 = 180^\\circ - 35^\\circ = 145^\\circ$；$\\angle 4$ 与 $\\angle 2$ 对顶，$\\angle 4 = 145^\\circ$。',
        enter: function (anim) {
          drawCrossLines();
          if (!anim) {
            drawFourAngles();
            // 演算过程文字
            S.addText('i-calc1', 4.5, 6.5, '已知：∠1 = 35°', { size: 15, color: INK });
            S.addText('i-calc2', 4.5, 5.3, '∠3 = ∠1 = 35°（对顶角）', { size: 14, color: ORANGE });
            S.addText('i-calc3', 4.5, 4.1, '∠2 = 180° - 35° = 145°', { size: 14, color: BLUE });
            S.addText('i-calc4', 4.5, 2.9, '（邻补角互补）', { size: 14, color: BLUE });
            S.addText('i-calc5', 4.5, 1.7, '∠4 = ∠2 = 145°（对顶角）', { size: 14, color: PURPLE });
            P.renderCard(
              '<b>例题1解答</b><br>' +
              '∠1 = 35°（已知）<br>' +
              '∠3 = 35°（对顶角相等）<br>' +
              '∠2 = 180° - 35° = <b>145°</b>（邻补角互补）<br>' +
              '∠4 = 145°（对顶角相等）'
            );
            return;
          }
          return delay(400).then(function () {
            drawFourAngles();
            return delay(300);
          }).then(function () {
            S.addText('i-calc1', 4.5, 6.5, '已知：∠1 = 35°', { size: 15, color: INK });
            return delay(400);
          }).then(function () {
            S.addText('i-calc2', 4.5, 5.3, '∠3 = ∠1 = 35°（对顶角）', { size: 14, color: ORANGE });
            return delay(400);
          }).then(function () {
            S.addText('i-calc3', 4.5, 4.1, '∠2 = 180° - 35° = 145°', { size: 14, color: BLUE });
            S.addText('i-calc4', 4.5, 2.9, '（邻补角互补）', { size: 14, color: BLUE });
            return delay(400);
          }).then(function () {
            S.addText('i-calc5', 4.5, 1.7, '∠4 = ∠2 = 145°（对顶角）', { size: 14, color: PURPLE });
            P.renderCard(
              '<b>例题1解答</b><br>' +
              '∠1 = 35°（已知）<br>' +
              '∠3 = 35°（对顶角相等）<br>' +
              '∠2 = 180° - 35° = <b>145°</b>（邻补角互补）<br>' +
              '∠4 = 145°（对顶角相等）'
            );
          });
        },
      },
      {
        // 步骤3：例题2——垂线段最短PA≤PB
        narration: '例题2：点 $P$ 在直线 $l$ 外，$PA \\perp l$，点 $B$ 在直线 $l$ 上，则 $PA \\leq PB$。请看图形——$P$ 到直线 $l$ 作垂线，垂足是 $A$；$B$ 是 $l$ 上任意一点。"垂线段最短"告诉我们，$PA$ 就是 $P$ 到直线 $l$ 的距离。无论 $B$ 在哪里，$PB$ 都不会比 $PA$ 更短。这个结论在证明题中经常用到！',
        enter: function (anim) {
          // 清除上一步的相交线图
          // 画新图：垂线段
          var lY = -3.0;  // 直线l的y坐标
          var Px = -3.0, Py = 3.5;  // 点P
          var Ax = Px, Ay = lY;     // 垂足A（x与P相同）
          var Bx = 2.5, By = lY;    // B在直线l上

          // 直线l
          S.addSegment('v-l', [-9, lY], [8, lY], { color: BLUE, width: 2.5, dash: 0 });
          S.addText('v-ll', 8.2, lY + 0.3, 'l', { size: 16, color: BLUE });
          // 点P
          S.dropPoint('v-P', Px, Py, { color: RED, name: 'P', size: 3, animate: false, labelOffset: [-18, 6] });
          // PA（垂线段，实线）
          S.addSegment('v-pa', [Px, Py], [Ax, Ay], { color: RED, width: 3, dash: 0 });
          // 直角标记
          S.addAngle('v-rt',
            [Ax - 0.5, Ay], [Ax, Ay], [Ax, Ay + 0.5],
            { radius: 0.5, color: RED, opacity: 0.10, ortho: true });
          // 垂足A
          S.dropPoint('v-A', Ax, Ay, { color: RED, name: 'A', size: 2.5, animate: false, labelOffset: [-18, -18] });
          // PB（斜线，虚线）
          S.addSegment('v-pb', [Px, Py], [Bx, By], { color: GREEN, width: 2.5, dash: 2 });
          // 点B
          S.dropPoint('v-B', Bx, By, { color: GREEN, name: 'B', size: 2.5, animate: false, labelOffset: [6, -18] });
          // 标注PA、PB
          S.addText('v-pa-lbl', Px - 1.8, (Py + Ay) / 2, 'PA（距离）', { size: 14, color: RED });
          S.addText('v-pb-lbl', (Px + Bx) / 2 + 0.3, (Py + By) / 2 + 0.5, 'PB', { size: 14, color: GREEN });
          // 结论
          S.addText('v-concl', -2, -5.5, 'PA ⊥ l，故 PA ≤ PB', { size: 16, color: RED });
          S.addText('v-concl2', -2.5, -6.5, '（垂线段最短）', { size: 14, color: INK });

          P.renderCard(
            '<b>例题2：垂线段最短</b><br>' +
            '$PA \\perp l$，$B$ 为 $l$ 上任意一点<br>' +
            '∴ $PA \\leq PB$<br>' +
            '<br>' +
            '<b>PA</b> 就是点 $P$ 到直线 $l$ 的<b>距离</b><br>' +
            '⚠ 易错：到直线的距离 = 垂线段长度，不是任意连线！'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
