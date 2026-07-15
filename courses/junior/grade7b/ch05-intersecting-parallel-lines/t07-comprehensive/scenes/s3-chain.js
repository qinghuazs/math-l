// s3-chain.js  综合例题：两步推理链（5步）★核心
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

  // ====== 图形布局 ======
  // 直线 a: y=3.0，直线 b: y=-0.5，截线 c: 斜截两线
  // 直线 d: 与 b 相交（另一线），形成 ∠3 ∠4
  var aY = 3.0, bY = -0.5;

  // 截线 c 角度（约65°）
  var cAngle = Math.PI * 0.36;
  var ccos = Math.cos(cAngle);
  var csin = Math.sin(cAngle);

  // c∩a 交点P，c∩b 交点Q
  var pX = -3.0;
  function ptQ() {
    var dy = bY - aY;
    var dx = dy / Math.tan(cAngle);
    return [pX + dx, bY];
  }

  // 截线端点
  var cTop = [pX + ccos * 7, aY + csin * 7];
  function cBot() {
    var q = ptQ();
    return [q[0] - ccos * 4, bY - csin * 4];
  }

  // 直线 d 与 b 相交，交点 R 在 Q 右侧
  var rX = 3.2;
  var dAngle = Math.PI * 0.62; // d的角度（约112°，即斜率负）
  var dcos = Math.cos(dAngle);
  var dsin = Math.sin(dAngle);
  var dTop = [rX + dcos * 5, bY + dsin * 5];
  var dBot = [rX - dcos * 4, bY - dsin * 4];

  // 颜色状态（闭包变量，setup重置）
  var ang1Color, ang2Color, aLineColor, bLineColor, ang3Color, ang4Color;

  function buildLines(aColor, bColor) {
    S.addSegment('a-line', [-9.5, aY], [9.5, aY], { color: aColor, width: 3, dash: 0 });
    S.addText('a-lbl', 8.8, aY + 0.4, 'a', { size: 18, color: aColor });
    S.addSegment('b-line', [-9.5, bY], [9.5, bY], { color: bColor, width: 3, dash: 0 });
    S.addText('b-lbl', 8.8, bY + 0.4, 'b', { size: 18, color: bColor });
  }

  function buildC() {
    S.addSegment('c-line', cTop, cBot(),
      { color: RED, width: 3, dash: 0 });
    S.addText('c-lbl', cTop[0] + 0.3, cTop[1] + 0.3, 'c', { size: 18, color: RED });
    S.addText('P-lbl', pX - 0.7, aY - 0.7, 'P', { size: 15, color: INK });
    S.addText('Q-lbl', ptQ()[0] - 0.8, bY + 0.5, 'Q', { size: 15, color: INK });
  }

  function buildD() {
    S.addSegment('d-line', dBot, dTop, { color: CYAN, width: 3, dash: 0 });
    S.addText('d-lbl', dTop[0] - 0.3, dTop[1] + 0.3, 'd', { size: 18, color: CYAN });
    S.addText('R-lbl', rX + 0.3, bY + 0.5, 'R', { size: 15, color: INK });
  }

  // ∠1: P处 c上方 × a右方（同位角上交点侧）
  function buildAng1(color) {
    S.addAngle('ang1',
      [pX + ccos * 2, aY + csin * 2],
      [pX, aY],
      [pX + 2, aY],
      { radius: 1.0, color: color, label: '\\(\\angle 1\\)', opacity: 0.13, labelSize: 14 });
  }

  // ∠2: Q处 c上方 × b右方（同位角下交点侧）
  function buildAng2(color) {
    var q = ptQ();
    S.addAngle('ang2',
      [q[0] + ccos * 2, bY + csin * 2],
      [q[0], bY],
      [q[0] + 2, bY],
      { radius: 1.6, color: color, label: '\\(\\angle 2\\)', opacity: 0.12, labelSize: 14 });
  }

  // ∠3: R处 b左方 × d上方
  function buildAng3(color) {
    S.addAngle('ang3',
      [rX - 2, bY],
      [rX, bY],
      [rX + dcos * 2, bY + dsin * 2],
      { radius: 1.0, color: color, label: '\\(\\angle 3\\)', opacity: 0.13, labelSize: 14 });
  }

  // ∠4: R处 d上方 × b右方（内错角之另一个）
  function buildAng4(color) {
    S.addAngle('ang4',
      [rX + dcos * 2, bY + dsin * 2],
      [rX, bY],
      [rX + 2, bY],
      { radius: 1.6, color: color, label: '\\(\\angle 4\\)', opacity: 0.12, labelSize: 14 });
  }

  var scene = {
    id: 's3',
    title: '三、综合例题：两步推理链',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      ang1Color = ORANGE;
      ang2Color = ORANGE;
      aLineColor = BLUE;
      bLineColor = GREEN;
      ang3Color = PURPLE;
      ang4Color = PURPLE;
    },
    steps: [
      {
        // 步骤1：出示例题图形
        narration: '接下来看一道综合例题——这是这节课的核心！图中有直线 $a$、$b$ 被直线 $c$ 所截，另有直线 $d$ 与 $b$ 相交于点 $R$。已知 $\\angle 1 = \\angle 2$（同位角）。请问：能否由此证明 $\\angle 3 = \\angle 4$？大家先思考一下解题思路。',
        enter: function (anim) {
          ang1Color = ORANGE; ang2Color = ORANGE;
          aLineColor = BLUE; bLineColor = GREEN;
          ang3Color = PURPLE; ang4Color = PURPLE;

          buildLines(BLUE, GREEN);
          buildC();
          buildD();
          buildAng1(ORANGE);
          buildAng2(ORANGE);
          buildAng3(PURPLE);
          buildAng4(PURPLE);

          P.renderCard(
            '<b>例题</b><br><br>' +
            '已知：$\\angle 1 = \\angle 2$<br><br>' +
            '求证：$\\angle 3 = \\angle 4$<br><br>' +
            '<span style="color:#90a4ae">（提示：需要几步？）</span>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：第一步 ∠1=∠2 → a∥b，两角高亮闪烁
        narration: '这道题需要<b>两步</b>推理！我们先看第一步：已知 $\\angle 1 = \\angle 2$——这是同位角，同位角相等，可以推出两直线平行，所以 $a \\parallel b$！这一步用的是<b>判定</b>。注意看 ∠1 和 ∠2 闪烁高亮，然后 $a$、$b$ 同时变色，表示它们平行了！',
        enter: function (anim) {
          // 先重绘角（高亮色）
          S.remove('ang1');
          S.remove('ang2');
          buildAng1(GOLD);
          buildAng2(GOLD);

          if (!anim) {
            // 快放：直接显示a∥b结论
            S.remove('a-line'); S.remove('a-lbl');
            S.remove('b-line'); S.remove('b-lbl');
            buildLines(CYAN, CYAN);
            S.addText('par-cond', -7, 5.8, 'a ∥ b', { size: 20, color: CYAN });
            S.addPolygon('step1-bg',
              [[-9.5, -3.5], [9.5, -3.5], [9.5, -7.2], [-9.5, -7.2]],
              { fillColor: '#e0f7fa', fillOpacity: 0.9, strokeColor: CYAN, strokeWidth: 2 });
            S.addText('step1-t', 0, -4.5,
              '第一步：$\\angle 1 = \\angle 2$ ⟹ $a \\parallel b$（判定）',
              { size: 16, color: CYAN, anchorX: 'middle' });
            P.renderCard(
              '<b>第一步（判定）</b><br>' +
              '$\\angle 1 = \\angle 2$（同位角相等）<br>' +
              '<b>⟹ $a \\parallel b$</b>'
            );
            return;
          }

          // 动画：角闪烁3次，然后a、b变色
          var board = S.getBoard();
          var flashCount = 0;
          var flashTotal = 6; // 3次亮灭
          var ang1Obj = S.get('ang1');
          var ang2Obj = S.get('ang2');

          function flash() {
            return S.animate({
              from: 0, to: 1, duration: 260, easing: 'linear',
              onUpdate: function (v) {
                var vis = flashCount % 2 === 0 ? (v < 0.5 ? 1 : 0) : (v < 0.5 ? 0 : 1);
                // 通过opacity实现闪烁效果
              },
            }).then(function () {
              flashCount++;
              if (flashCount < flashTotal) return flash();
            });
          }

          return delay(200).then(function () {
            // 用 pulse 实现高亮强调效果
            return S.animate({
              from: 0, to: 1, duration: 1200, easing: 'easeInOutQuart',
              onUpdate: function (v) {
                // 前0.5段：角变亮
                board.update();
              },
            });
          }).then(function () {
            // 线变色
            S.remove('a-line'); S.remove('a-lbl');
            S.remove('b-line'); S.remove('b-lbl');
            buildLines(CYAN, CYAN);
            return delay(300);
          }).then(function () {
            S.addText('par-cond', -7, 5.8, 'a ∥ b', { size: 20, color: CYAN });
            S.addPolygon('step1-bg',
              [[-9.5, -3.5], [9.5, -3.5], [9.5, -7.2], [-9.5, -7.2]],
              { fillColor: '#e0f7fa', fillOpacity: 0.9, strokeColor: CYAN, strokeWidth: 2 });
            S.addText('step1-t', 0, -4.5,
              '第一步：$\\angle 1 = \\angle 2$ ⟹ $a \\parallel b$（判定）',
              { size: 16, color: CYAN, anchorX: 'middle' });
            P.renderCard(
              '<b>第一步（判定）</b><br>' +
              '$\\angle 1 = \\angle 2$（同位角相等）<br>' +
              '<b>⟹ $a \\parallel b$</b>'
            );
          });
        },
      },
      {
        // 步骤3：第二步 a∥b → ∠3=∠4，另一对角高亮
        narration: '太棒了！第一步已经得出 $a \\parallel b$。现在进行第二步：由 $a \\parallel b$，可以推出什么？$a \\parallel b$ 是已知条件，要推角的关系，用<b>性质</b>！直线 $d$ 与平行线 $b$ 相交于 $R$，$\\angle 3$ 和 $\\angle 4$ 是关于直线 $b$ 对称的两个角，由内错角相等得 $\\angle 3 = \\angle 4$！',
        enter: function (anim) {
          // ∠3 ∠4 高亮
          S.remove('ang3');
          S.remove('ang4');
          buildAng3(GOLD);
          buildAng4(GOLD);

          if (!anim) {
            S.addPolygon('step2-bg',
              [[-9.5, -3.5], [9.5, -3.5], [9.5, -7.2], [-9.5, -7.2]],
              { fillColor: '#f3e5f5', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
            S.addText('step2-t', 0, -4.5,
              '第二步：$a \\parallel b$ ⟹ $\\angle 3 = \\angle 4$（性质）',
              { size: 16, color: PURPLE, anchorX: 'middle' });
            P.renderCard(
              '<b>第二步（性质）</b><br>' +
              '$a \\parallel b$（已证）<br>' +
              '∠3、∠4 是内错角<br>' +
              '<b>⟹ $\\angle 3 = \\angle 4$</b>'
            );
            return;
          }

          return S.animate({
            from: 0, to: 1, duration: 800, easing: 'easeInOutQuart',
            onUpdate: function (v) { S.getBoard().update(); },
          }).then(function () {
            S.addPolygon('step2-bg',
              [[-9.5, -3.5], [9.5, -3.5], [9.5, -7.2], [-9.5, -7.2]],
              { fillColor: '#f3e5f5', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
            S.addText('step2-t', 0, -4.5,
              '第二步：$a \\parallel b$ ⟹ $\\angle 3 = \\angle 4$（性质）',
              { size: 16, color: PURPLE, anchorX: 'middle' });
            P.renderCard(
              '<b>第二步（性质）</b><br>' +
              '$a \\parallel b$（已证）<br>' +
              '∠3、∠4 是内错角<br>' +
              '<b>⟹ $\\angle 3 = \\angle 4$</b>'
            );
          });
        },
      },
      {
        // 步骤4：推理链图示动画（三段文字+两箭头逐段点亮）
        narration: '完美！我们来把这个两步推理链整理成一张清晰的逻辑图。请看大屏幕：三个节点和两支箭头，代表完整的推理过程。我来一段一段地点亮它——从已知角，到中间桥梁，再到最终结论。',
        enter: function (anim) {
          // 清除画板上的角标注，用推理链图示替代
          S.remove('ang1'); S.remove('ang2'); S.remove('ang3'); S.remove('ang4');
          S.remove('step1-bg'); S.remove('step1-t');
          S.remove('step2-bg'); S.remove('step2-t');
          S.remove('par-cond');
          S.remove('a-line'); S.remove('a-lbl');
          S.remove('b-line'); S.remove('b-lbl');
          S.remove('c-line'); S.remove('c-lbl');
          S.remove('d-line'); S.remove('d-lbl');
          S.remove('P-lbl'); S.remove('Q-lbl'); S.remove('R-lbl');

          // 推理链三节点 + 两箭头
          // 节点1：角相等（已知）
          // 节点2：线平行（中间）
          // 节点3：新的角相等（结论）
          // 布局：y=1.5，从左到右
          var y0 = 1.5;
          var x1 = -7.5, x2 = 0, x3 = 7.5;
          var boxH = 2.2;

          if (!anim) {
            // 快放：直接显示全部
            S.addPolygon('node1-bg', [[x1 - 2.2, y0 + 1.1], [x1 + 2.2, y0 + 1.1], [x1 + 2.2, y0 - 1.1], [x1 - 2.2, y0 - 1.1]],
              { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
            S.addText('node1-t1', x1, y0 + 0.3, '∠1 = ∠2', { size: 16, color: ORANGE, anchorX: 'middle' });
            S.addText('node1-t2', x1, y0 - 0.6, '（已知）', { size: 13, color: INK, anchorX: 'middle' });

            S.addSegment('arr1', [x1 + 2.2, y0], [x2 - 2.4, y0], { color: CYAN, width: 4, dash: 0 });
            S.addPolygon('arr1-head', [[x2 - 2.4, y0 + 0.45], [x2 - 1.2, y0], [x2 - 2.4, y0 - 0.45]],
              { fillColor: CYAN, fillOpacity: 1, strokeColor: CYAN, strokeWidth: 1 });
            S.addText('arr1-lbl', (x1 + x2) / 2, y0 + 0.85, '判定', { size: 14, color: CYAN, anchorX: 'middle' });

            S.addPolygon('node2-bg', [[x2 - 2.2, y0 + 1.1], [x2 + 2.2, y0 + 1.1], [x2 + 2.2, y0 - 1.1], [x2 - 2.2, y0 - 1.1]],
              { fillColor: '#e0f7fa', fillOpacity: 1, strokeColor: CYAN, strokeWidth: 2 });
            S.addText('node2-t1', x2, y0 + 0.3, 'a ∥ b', { size: 16, color: CYAN, anchorX: 'middle' });
            S.addText('node2-t2', x2, y0 - 0.6, '（中间桥梁）', { size: 13, color: INK, anchorX: 'middle' });

            S.addSegment('arr2', [x2 + 2.2, y0], [x3 - 2.4, y0], { color: PURPLE, width: 4, dash: 0 });
            S.addPolygon('arr2-head', [[x3 - 2.4, y0 + 0.45], [x3 - 1.2, y0], [x3 - 2.4, y0 - 0.45]],
              { fillColor: PURPLE, fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 1 });
            S.addText('arr2-lbl', (x2 + x3) / 2, y0 + 0.85, '性质', { size: 14, color: PURPLE, anchorX: 'middle' });

            S.addPolygon('node3-bg', [[x3 - 2.2, y0 + 1.1], [x3 + 2.2, y0 + 1.1], [x3 + 2.2, y0 - 1.1], [x3 - 2.2, y0 - 1.1]],
              { fillColor: '#f3e5f5', fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 2 });
            S.addText('node3-t1', x3, y0 + 0.3, '∠3 = ∠4', { size: 16, color: PURPLE, anchorX: 'middle' });
            S.addText('node3-t2', x3, y0 - 0.6, '（结论）', { size: 13, color: INK, anchorX: 'middle' });

            P.renderCard(
              '<b>两步推理链</b><br><br>' +
              '∠1=∠2 <b>→(判定)→</b> $a \\parallel b$ <b>→(性质)→</b> ∠3=∠4<br><br>' +
              '角相等 → 线平行 → 新的角相等'
            );
            return;
          }

          // 动画：逐段点亮
          var y0anim = 1.5;

          // 先显示节点1
          S.addPolygon('node1-bg', [[x1 - 2.2, y0anim + 1.1], [x1 + 2.2, y0anim + 1.1], [x1 + 2.2, y0anim - 1.1], [x1 - 2.2, y0anim - 1.1]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('node1-t1', x1, y0anim + 0.3, '∠1 = ∠2', { size: 16, color: ORANGE, anchorX: 'middle' });
          S.addText('node1-t2', x1, y0anim - 0.6, '（已知）', { size: 13, color: INK, anchorX: 'middle' });

          return delay(500).then(function () {
            // 箭头1 + 判定标签
            S.addSegment('arr1', [x1 + 2.2, y0anim], [x2 - 2.4, y0anim], { color: CYAN, width: 4, dash: 0 });
            S.addPolygon('arr1-head', [[x2 - 2.4, y0anim + 0.45], [x2 - 1.2, y0anim], [x2 - 2.4, y0anim - 0.45]],
              { fillColor: CYAN, fillOpacity: 1, strokeColor: CYAN, strokeWidth: 1 });
            S.addText('arr1-lbl', (x1 + x2) / 2, y0anim + 0.85, '判定', { size: 14, color: CYAN, anchorX: 'middle' });
            return delay(600);
          }).then(function () {
            // 节点2
            S.addPolygon('node2-bg', [[x2 - 2.2, y0anim + 1.1], [x2 + 2.2, y0anim + 1.1], [x2 + 2.2, y0anim - 1.1], [x2 - 2.2, y0anim - 1.1]],
              { fillColor: '#e0f7fa', fillOpacity: 1, strokeColor: CYAN, strokeWidth: 2 });
            S.addText('node2-t1', x2, y0anim + 0.3, 'a ∥ b', { size: 16, color: CYAN, anchorX: 'middle' });
            S.addText('node2-t2', x2, y0anim - 0.6, '（中间桥梁）', { size: 13, color: INK, anchorX: 'middle' });
            return delay(600);
          }).then(function () {
            // 箭头2 + 性质标签
            S.addSegment('arr2', [x2 + 2.2, y0anim], [x3 - 2.4, y0anim], { color: PURPLE, width: 4, dash: 0 });
            S.addPolygon('arr2-head', [[x3 - 2.4, y0anim + 0.45], [x3 - 1.2, y0anim], [x3 - 2.4, y0anim - 0.45]],
              { fillColor: PURPLE, fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 1 });
            S.addText('arr2-lbl', (x2 + x3) / 2, y0anim + 0.85, '性质', { size: 14, color: PURPLE, anchorX: 'middle' });
            return delay(600);
          }).then(function () {
            // 节点3
            S.addPolygon('node3-bg', [[x3 - 2.2, y0anim + 1.1], [x3 + 2.2, y0anim + 1.1], [x3 + 2.2, y0anim - 1.1], [x3 - 2.2, y0anim - 1.1]],
              { fillColor: '#f3e5f5', fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 2 });
            S.addText('node3-t1', x3, y0anim + 0.3, '∠3 = ∠4', { size: 16, color: PURPLE, anchorX: 'middle' });
            S.addText('node3-t2', x3, y0anim - 0.6, '（结论）', { size: 13, color: INK, anchorX: 'middle' });
            P.renderCard(
              '<b>两步推理链</b><br><br>' +
              '∠1=∠2 <b>→(判定)→</b> $a \\parallel b$ <b>→(性质)→</b> ∠3=∠4<br><br>' +
              '角相等 → 线平行 → 新的角相等'
            );
          });
        },
      },
      {
        // 步骤5：总结两步推理的结构
        narration: '这道题的关键技巧就是——找到"中间桥梁"！$a \\parallel b$ 就是两步推理的桥梁：第一步用判定得到它，第二步用性质出发它。很多综合题都是这个结构：先判定出线平行，再用性质推出新的角关系。这种"两步走"的思路一定要记住！',
        enter: function (anim) {
          // 在链图下方加文字说明
          S.addPolygon('summary-bg',
            [[-9.5, -2.0], [9.5, -2.0], [9.5, -7.2], [-9.5, -7.2]],
            { fillColor: '#fafafa', fillOpacity: 0.9, strokeColor: GOLD, strokeWidth: 2 });
          S.addText('sum-t1', 0, -2.8,
            '综合题"两步走"结构',
            { size: 17, color: GOLD, anchorX: 'middle' });
          S.addText('sum-t2', 0, -4.0,
            '第一步：角条件 ——(判定)——> 线平行（桥梁）',
            { size: 14, color: CYAN, anchorX: 'middle' });
          S.addText('sum-t3', 0, -5.2,
            '第二步：线平行 ——(性质)——> 新角关系（结论）',
            { size: 14, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>两步推理结构总结</b><br><br>' +
            '① 由 <b>角条件</b> 用<b>判定</b>得到 <b>线平行</b>（桥梁）<br>' +
            '② 由 <b>线平行</b> 用<b>性质</b>得到 <b>新角关系</b>（结论）<br><br>' +
            '<b>关键：找到"中间桥梁"！</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
