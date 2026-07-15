// s5-exit.js  出口题与小结（4步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var CYAN   = '#00838f';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // ====== 出口题图形 ======
  // 直线 a (y=2.5)，直线 b (y=-2.5)，截线 c
  // ∠1 在上交点P的左下方（同旁内角上方那个角，c右下×a左方）= 65°
  // ∠2 在下交点Q的左上方（同旁内角下方那个角，b右方×c上方）= 115°
  var aY = 2.5, bY = -2.5;
  var pX = -2.0;
  var cAngle = Math.PI * 0.37; // 约67°
  var ccos = Math.cos(cAngle);
  var csin = Math.sin(cAngle);

  function ptQ() {
    var dy = bY - aY;
    var dx = dy / Math.tan(cAngle);
    return [pX + dx, bY];
  }

  function buildBase() {
    S.addSegment('a-line', [-9, aY], [9, aY], { color: BLUE, width: 3, dash: 0 });
    S.addText('a-lbl', 8.5, aY + 0.4, 'a', { size: 18, color: BLUE });
    S.addSegment('b-line', [-9, bY], [9, bY], { color: GREEN, width: 3, dash: 0 });
    S.addText('b-lbl', 8.5, bY + 0.4, 'b', { size: 18, color: GREEN });
    var q = ptQ();
    S.addSegment('c-line',
      [pX + ccos * 7, aY + csin * 7],
      [q[0] - ccos * 4, bY - csin * 4],
      { color: RED, width: 3, dash: 0 });
    S.addText('c-lbl', pX + ccos * 7 + 0.3, aY + csin * 7 + 0.3, 'c', { size: 18, color: RED });
    S.addText('P-lbl', pX - 0.8, aY - 0.7, 'P', { size: 15, color: INK });
    S.addText('Q-lbl', q[0] - 0.8, bY + 0.5, 'Q', { size: 15, color: INK });
  }

  // ∠1 在P处：a左方 × c下方（同旁内角在两线之间，截线左侧）
  // 左下角：c下方 × a左方
  function buildAng1(color, showDeg) {
    S.addAngle('ang1',
      [pX + ccos * 2, aY + csin * 2],   // c上方向（从P往c上）
      [pX, aY],
      [pX - 2, aY],                        // a左方向
      { radius: 1.0, color: color,
        label: showDeg ? '65\\(^\\circ\\)' : '\\(\\angle 1\\)',
        opacity: 0.14, labelSize: 14 });
  }

  // ∠2 在Q处：b右方 × c上方（同旁内角在两线之间，截线左侧——左上角）
  function buildAng2(color, showDeg) {
    var q = ptQ();
    S.addAngle('ang2',
      [q[0] - 2, bY],                     // b左方向
      [q[0], bY],
      [q[0] + ccos * 2, bY + csin * 2],  // c上方向（从Q往c上）
      { radius: 1.6, color: color,
        label: showDeg ? '115\\(^\\circ\\)' : '\\(\\angle 2\\)',
        opacity: 0.12, labelSize: 14 });
  }

  // 内错角（与∠1 对应，在Q处）：c下方 × b右方（右下角）
  function buildAng1inner(color, showDeg) {
    var q = ptQ();
    S.addAngle('ang-inner',
      [q[0] + 2, bY],                      // b右方向
      [q[0], bY],
      [q[0] - ccos * 2, bY - csin * 2],   // c下方向
      { radius: 1.0, color: color,
        label: showDeg ? '65\\(^\\circ\\)' : '内错角',
        opacity: 0.14, labelSize: 13 });
  }

  var scene = {
    id: 's5',
    title: '五、出口题与小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：出口题题目
        narration: '最后，我们用一道单元出口题来检验大家的学习成果。请看题目：直线 $a$、$b$ 被直线 $c$ 所截，∠1 和 ∠2 是同旁内角，已知 $\\angle 1 = 65^\\circ$，$\\angle 2 = 115^\\circ$。第一问：$a$ 与 $b$ 平行吗？第二问：若平行，与 $\\angle 1$ 对应的内错角是多少度？请先思考！',
        enter: function (anim) {
          buildBase();
          buildAng1(ORANGE, false);
          buildAng2(PURPLE, false);

          // 题目条件
          S.addText('cond-t1', -7, 6.2,
            '∠1 = 65°（同旁内角）',
            { size: 15, color: ORANGE });
          S.addText('cond-t2', -7, 5.2,
            '∠2 = 115°',
            { size: 15, color: PURPLE });

          P.renderCard(
            '<b>单元出口题</b><br><br>' +
            '∠1 和 ∠2 是<b>同旁内角</b><br>' +
            '$\\angle 1 = 65^\\circ$，$\\angle 2 = 115^\\circ$<br><br>' +
            '① $a \\parallel b$ 吗？<br>' +
            '② 若 $a \\parallel b$，与 $\\angle 1$ 对应的<br>' +
            '&nbsp;&nbsp;&nbsp;内错角是多少度？'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：第一问解答 + 动画：角度显示，验算
        narration: '来看第一问。∠1 和 ∠2 是同旁内角，$65^\\circ + 115^\\circ = 180^\\circ$！同旁内角互补，根据"同旁内角互补，两直线平行"的判定，可以得出 $a \\parallel b$！看，两个角的度数标注出来了，加起来正好等于 180 度。',
        enter: function (anim) {
          // 重绘角，显示度数
          S.remove('ang1'); S.remove('ang2');
          buildAng1(ORANGE, true);
          buildAng2(PURPLE, true);

          if (!anim) {
            // 验算卡
            S.addPolygon('calc-bg',
              [[-9, -3.5], [9, -3.5], [9, -7.2], [-9, -7.2]],
              { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
            S.addText('calc-t1', 0, -4.3,
              '∠1 + ∠2 = 65° + 115° = 180°',
              { size: 17, color: INK, anchorX: 'middle' });
            S.addText('calc-t2', 0, -5.5,
              '同旁内角互补 ⟹ a ∥ b （判定）',
              { size: 16, color: GREEN, anchorX: 'middle' });
            S.addText('par-ok', -7, 4.2, 'a ∥ b ✓', { size: 19, color: CYAN });
            P.renderCard(
              '<b>第一问解答</b><br><br>' +
              '$\\angle 1 + \\angle 2 = 65^\\circ + 115^\\circ = 180^\\circ$<br>' +
              '∠1 与 ∠2 是同旁内角且互补<br>' +
              '根据"同旁内角互补，两直线平行"<br>' +
              '<b>∴ $a \\parallel b$</b>'
            );
            return;
          }

          return S.animate({
            from: 0, to: 1, duration: 800, easing: 'easeInOutQuart',
            onUpdate: function (v) { S.getBoard().update(); },
          }).then(function () {
            S.addText('par-ok', -7, 4.2, 'a ∥ b ✓', { size: 19, color: CYAN });
            S.addPolygon('calc-bg',
              [[-9, -3.5], [9, -3.5], [9, -7.2], [-9, -7.2]],
              { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
            S.addText('calc-t1', 0, -4.3,
              '∠1 + ∠2 = 65° + 115° = 180°',
              { size: 17, color: INK, anchorX: 'middle' });
            S.addText('calc-t2', 0, -5.5,
              '同旁内角互补 ⟹ a ∥ b （判定）',
              { size: 16, color: GREEN, anchorX: 'middle' });
            P.renderCard(
              '<b>第一问解答</b><br><br>' +
              '$\\angle 1 + \\angle 2 = 65^\\circ + 115^\\circ = 180^\\circ$<br>' +
              '∠1 与 ∠2 是同旁内角且互补<br>' +
              '根据"同旁内角互补，两直线平行"<br>' +
              '<b>∴ $a \\parallel b$</b>'
            );
          });
        },
      },
      {
        // 步骤3：第二问解答 + 内错角高亮
        narration: '第一问已经证明 $a \\parallel b$。现在看第二问：与 $\\angle 1$ 对应的内错角是多少度？内错角在两平行线之间，截线另一侧，与 $\\angle 1$ 大小相等——由性质"两直线平行，内错角相等"，所以内错角等于 $\\angle 1 = 65^\\circ$！',
        enter: function (anim) {
          buildAng1inner(CYAN, true);

          if (!anim) {
            S.addPolygon('q2-bg',
              [[-9, -3.5], [9, -3.5], [9, -7.2], [-9, -7.2]],
              { fillColor: '#e0f7fa', fillOpacity: 0.9, strokeColor: CYAN, strokeWidth: 2 });
            S.addText('q2-t1', 0, -4.3,
              'a ∥ b ⟹ 内错角相等（性质）',
              { size: 16, color: CYAN, anchorX: 'middle' });
            S.addText('q2-t2', 0, -5.5,
              '与 ∠1 对应的内错角 = 65°',
              { size: 17, color: INK, anchorX: 'middle' });
            P.renderCard(
              '<b>第二问解答</b><br><br>' +
              '$a \\parallel b$（已证）<br>' +
              '根据"两直线平行，内错角相等"<br>' +
              '<b>∴ 内错角 = $\\angle 1 = 65^\\circ$</b>'
            );
            return;
          }

          return S.animate({
            from: 0, to: 1, duration: 600, easing: 'easeInOutQuart',
            onUpdate: function (v) { S.getBoard().update(); },
          }).then(function () {
            S.addPolygon('q2-bg',
              [[-9, -3.5], [9, -3.5], [9, -7.2], [-9, -7.2]],
              { fillColor: '#e0f7fa', fillOpacity: 0.9, strokeColor: CYAN, strokeWidth: 2 });
            S.addText('q2-t1', 0, -4.3,
              'a ∥ b ⟹ 内错角相等（性质）',
              { size: 16, color: CYAN, anchorX: 'middle' });
            S.addText('q2-t2', 0, -5.5,
              '与 ∠1 对应的内错角 = 65°',
              { size: 17, color: INK, anchorX: 'middle' });
            P.renderCard(
              '<b>第二问解答</b><br><br>' +
              '$a \\parallel b$（已证）<br>' +
              '根据"两直线平行，内错角相等"<br>' +
              '<b>∴ 内错角 = $\\angle 1 = 65^\\circ$</b>'
            );
          });
        },
      },
      {
        // 步骤4：易错卡 + 单元小结
        narration: '出口题完美解决！在结束之前，我们来看一张易错提醒卡——很多同学在考试中会把判定和性质搞混。记住：判定是"用角推线"，性质是"用线推角"，方向不能反！最后，这节课的三句话核心口诀送给大家，请大声读一遍！',
        enter: function (anim) {
          // 清除图形
          S.remove('a-line'); S.remove('a-lbl');
          S.remove('b-line'); S.remove('b-lbl');
          S.remove('c-line'); S.remove('c-lbl');
          S.remove('P-lbl'); S.remove('Q-lbl');
          S.remove('ang1'); S.remove('ang2'); S.remove('ang-inner');
          S.remove('cond-t1'); S.remove('cond-t2');
          S.remove('par-ok');
          S.remove('calc-bg'); S.remove('calc-t1'); S.remove('calc-t2');
          S.remove('q2-bg'); S.remove('q2-t1'); S.remove('q2-t2');

          // 易错卡
          S.addPolygon('err-bg',
            [[-9.5, 7.3], [9.5, 7.3], [9.5, 3.5], [-9.5, 3.5]],
            { fillColor: '#ffebee', fillOpacity: 0.95, strokeColor: RED, strokeWidth: 3 });
          S.addText('err-title', 0, 6.7, '⚠ 易错提醒', { size: 18, color: RED, anchorX: 'middle' });
          S.addText('err-t1', 0, 5.7,
            '✗ 错误：已知 a∥b，∴ a∥b（判定）——混淆了！',
            { size: 14, color: RED, anchorX: 'middle' });
          S.addText('err-t2', 0, 4.6,
            '✓ 正确：已知 a∥b，用性质推角；已知角，用判定推线',
            { size: 14, color: GREEN, anchorX: 'middle' });

          // 小结口诀
          S.addPolygon('sum-bg',
            [[-9.5, 3.0], [9.5, 3.0], [9.5, -7.3], [-9.5, -7.3]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('sum-title', 0, 2.3, '本节课核心口诀', { size: 18, color: GREEN, anchorX: 'middle' });
          S.addText('sum-1', 0, 1.0,
            '1. 要证线平行 → 用判定（从角到线）',
            { size: 16, color: CYAN, anchorX: 'middle' });
          S.addText('sum-2', 0, -0.5,
            '2. 已知线平行求角 → 用性质（从线到角）',
            { size: 16, color: PURPLE, anchorX: 'middle' });
          S.addText('sum-3', 0, -2.0,
            '3. 综合题：先判定（找桥梁），再性质（推结论）',
            { size: 15, color: ORANGE, anchorX: 'middle' });
          S.addText('sum-4', 0, -3.5,
            '每步书写：∵ 条件 → 根据定理 → ∴ 结论',
            { size: 15, color: INK, anchorX: 'middle' });

          // 加油横幅
          S.addPolygon('end-bg',
            [[-9.5, -4.5], [9.5, -4.5], [9.5, -7.3], [-9.5, -7.3]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 2 });
          S.addText('end-t', 0, -5.8,
            '同学们掌握了这节课，平行线综合题不再难！',
            { size: 16, color: GOLD, anchorX: 'middle' });

          P.renderCard(
            '<b>易错提醒</b><br>' +
            '已知 $a \\parallel b$ → 必须用<b>性质</b>，不能反用判定！<br><br>' +
            '<b>本节小结</b><br>' +
            '① 证线平行 → 判定<br>' +
            '② 求角 → 性质<br>' +
            '③ 综合题"两步走"：判定+性质<br>' +
            '④ 规范书写：∵…根据…∴…'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
