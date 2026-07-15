// s2-method.js  核心判断方法：快问快答（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 共用图形：两直线被截，8角简图
  // a: y=2.5  b: y=-2.5  c: 斜截线
  var aY = 2.5, bY = -2.5;
  var pX = -1.5;   // c∩a 交点 x
  var cAngle = Math.PI * 0.38; // 截线角度（约70°）

  function cDx() { return Math.cos(cAngle) * 8; }
  function cDy() { return Math.sin(cAngle) * 8; }
  function ptQ() {
    var dy = bY - aY;
    var dx = dy / Math.tan(cAngle);
    return [pX + dx, bY];
  }

  function buildBase(showParallel) {
    S.addSegment('a-line', [-9, aY], [9, aY], { color: BLUE, width: 3, dash: 0 });
    S.addText('a-lbl', 8.5, aY + 0.35, 'a', { size: 18, color: BLUE });
    S.addSegment('b-line', [-9, bY], [9, bY], { color: GREEN, width: 3, dash: 0 });
    S.addText('b-lbl', 8.5, bY + 0.35, 'b', { size: 18, color: GREEN });
    // 截线
    S.addSegment('c-line',
      [pX + cDx(), aY + cDy()],
      [ptQ()[0] - cDx() * 0.3, bY - cDy() * 0.3],
      { color: RED, width: 3, dash: 0 });
    S.addText('c-lbl', pX + cDx() + 0.3, aY + cDy() + 0.3, 'c', { size: 18, color: RED });
    // 交点标注
    S.addText('P-lbl', pX - 0.7, aY - 0.6, 'P', { size: 15, color: INK });
    S.addText('Q-lbl', ptQ()[0] - 0.7, bY - 0.6, 'Q', { size: 15, color: INK });
    if (showParallel) {
      S.addText('par-lbl', -7.5, 5.5, 'a ∥ b', { size: 18, color: INK });
    }
  }

  // P处角：∠1 右上，∠2 右下（各一个典型角）
  function buildAnglesQ1() {
    var r = 0.85;
    var rBig = 1.3;
    // ∠1 在P处，c上方×a右方（右上角）
    S.addAngle('ang1-mark',
      [pX + 2, aY],
      [pX, aY],
      [pX + Math.cos(cAngle) * 2, aY + Math.sin(cAngle) * 2],
      { radius: r, color: ORANGE, label: '\\(\\angle 1\\)', opacity: 0.13, labelSize: 14 });
  }

  function buildAnglesQ2() {
    var q = ptQ();
    // ∠2 在Q处，同位角
    S.addAngle('ang2-mark',
      [q[0] + 2, bY],
      [q[0], bY],
      [q[0] + Math.cos(cAngle) * 2, bY + Math.sin(cAngle) * 2],
      { radius: 0.85, color: ORANGE, label: '\\(\\angle 2\\)', opacity: 0.13, labelSize: 14 });
  }

  // ∠3 在Q处，内错角（左下）
  function buildAnglesQ3() {
    var q = ptQ();
    S.addAngle('ang3-mark',
      [q[0] + Math.cos(cAngle) * 2, bY + Math.sin(cAngle) * 2],
      [q[0], bY],
      [q[0] - 2, bY],
      { radius: 1.2, color: PURPLE, label: '\\(\\angle 3\\)', opacity: 0.13, labelSize: 14 });
  }

  var q1Answered = false;
  var q2Answered = false;

  var scene = {
    id: 's2',
    title: '二、核心判断方法：快问快答',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      q1Answered = false;
      q2Answered = false;
    },
    steps: [
      {
        // 步骤1：情景一 - 要证线平行，问用什么
        narration: '现在我们来做两道快问快答，练习一下到底该用判定还是性质。第一题：图中，已知截线 $c$ 与直线 $a$、$b$ 相交，已测得 $\\angle 1 = \\angle 2$（同位角相等）。问：你能由此得出什么结论？思考一秒钟，然后看答案。',
        enter: function (anim) {
          buildBase(false);
          buildAnglesQ1();
          buildAnglesQ2();
          P.renderCard(
            '<b>快问快答①</b><br><br>' +
            '已知：$\\angle 1 = \\angle 2$（同位角）<br><br>' +
            '问：能得出什么结论？<br>' +
            '<span style="color:#90a4ae">（先想一想……）</span>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：揭示答案一 + 情景二
        narration: '答案是：$a \\parallel b$！角相等是已知条件，线平行是结论——这是用判定！同位角相等，两直线平行。现在看第二题：若已知 $a \\parallel b$，截线 $c$ 与它们相交，已知 $\\angle 1 = 70^\\circ$，求 $\\angle 3$（内错角）。此时该用判定还是性质？',
        enter: function (anim) {
          // 揭示答案
          S.addPolygon('ans1-bg',
            [[-9, -3.8], [9, -3.8], [9, -7.2], [-9, -7.2]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('ans1-t1', 0, -4.5,
            '答案①：$a \\parallel b$',
            { size: 18, color: GREEN, anchorX: 'middle' });
          S.addText('ans1-t2', 0, -5.7,
            '角的关系（已知）→ 用 判定 → 线平行（结论）',
            { size: 14, color: INK, anchorX: 'middle' });

          // 第二题：加 ∠3 标注，加平行条件
          buildAnglesQ3();
          S.addText('par-cond', -7.5, 5.5, 'a ∥ b', { size: 18, color: INK });
          S.addText('ang1-deg', pX + 2.8, aY + 1.4, '70°', { size: 15, color: ORANGE });

          P.renderCard(
            '<b>答案①</b>：$\\angle 1 = \\angle 2$ <b>⟹</b> $a \\parallel b$（用判定）<br><br>' +
            '<b>快问快答②</b>：已知 $a \\parallel b$，$\\angle 1 = 70^\\circ$，<br>' +
            '求 $\\angle 3$（内错角）——用判定还是性质？'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：揭示答案二
        narration: '答案是：用性质！已知线平行，要推角的关系，这正是性质的用武之地。两直线平行，内错角相等，所以 $\\angle 3 = \\angle 1 = 70^\\circ$。请再次感受这两个方向：判定是"角→线"，性质是"线→角"。',
        enter: function (anim) {
          S.addPolygon('ans2-bg',
            [[-9, -3.8], [9, -3.8], [9, -7.2], [-9, -7.2]],
            { fillColor: '#ede7f6', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('ans2-t1', 0, -4.5,
            '答案②：$\\angle 3 = 70^\\circ$',
            { size: 18, color: PURPLE, anchorX: 'middle' });
          S.addText('ans2-t2', 0, -5.7,
            '线平行（已知）→ 用 性质 → 角的关系（结论）',
            { size: 14, color: INK, anchorX: 'middle' });
          S.addText('ang3-deg', ptQ()[0] - 3.0, bY - 1.5, '70°', { size: 15, color: PURPLE });

          P.renderCard(
            '<b>答案②</b>：$a \\parallel b$ <b>⟹</b> $\\angle 3 = 70^\\circ$（用性质）<br><br>' +
            '<b>总结</b>：<br>' +
            '角相等 / 互补 <b>⟹</b> 线平行 &nbsp;（判定）<br>' +
            '线平行 <b>⟹</b> 角相等 / 互补 &nbsp;（性质）'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
