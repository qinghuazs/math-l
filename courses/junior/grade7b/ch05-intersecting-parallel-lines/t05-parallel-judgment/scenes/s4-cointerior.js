// s4-cointerior.js  同旁内角（U形）+ 三类角对比表（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 布局同s1
  var ptAx = -1.5, ptAy = 2;
  var ptBx = -0.2, ptBy = -2;
  var bSlope = 0.12;

  var cdx = ptBx - ptAx; var cdy = ptBy - ptAy;
  var cLen = Math.sqrt(cdx * cdx + cdy * cdy);
  var cux = cdx / cLen; var cuy = cdy / cLen;

  var c1 = [ptAx - cux * 14, ptAy - cuy * 14];
  var c2 = [ptBx + cux * 14, ptBy + cuy * 14];
  var a1 = [-9, ptAy]; var a2 = [8, ptAy];
  var b1 = [-9, ptBy + bSlope * (-9 - ptBx)];
  var b2 = [8,  ptBy + bSlope * (8  - ptBx)];
  var bLen = Math.sqrt(1 + bSlope * bSlope);
  var bux = 1 / bLen; var buy = bSlope / bLen;

  function angleP(x, y, dx, dy, r) { return [x + dx * r, y + dy * r]; }

  function buildBase() {
    S.addSegment('line-a', a1, a2, { color: GRAY, width: 2, dash: 0 });
    S.addText('lbl-a', 8.2, ptAy + 0.2, 'a', { size: 18, color: INK });
    S.addSegment('line-b', b1, b2, { color: GRAY, width: 2, dash: 0 });
    S.addText('lbl-b', 8.2, ptBy + 0.2, 'b', { size: 18, color: INK });
    S.addSegment('line-c', c1, c2, { color: GRAY, width: 2, dash: 0 });
    S.addText('lbl-c', c2[0] + 0.3, c2[1] - 0.3, 'c', { size: 18, color: INK });
    S.dropPoint('pt-A', ptAx, ptAy, { color: INK, name: 'A', size: 2.5, animate: false, labelOffset: [-18, 8] });
    S.dropPoint('pt-B', ptBx, ptBy, { color: INK, name: 'B', size: 2.5, animate: false, labelOffset: [-18, -16] });
  }

  function buildAllAnglesGray() {
    var r = 0.75; var rBig = 1.2;
    S.addAngle('ang1g', angleP(ptAx, ptAy, -1, 0, r * 2), [ptAx, ptAy],
      angleP(ptAx, ptAy, -cux, -cuy, r * 2),
      { radius: r, color: GRAY, label: '∠1', opacity: 0.08, labelSize: 13, labelColor: INK });
    S.addAngle('ang2g', angleP(ptAx, ptAy, -cux, -cuy, r * 2), [ptAx, ptAy],
      angleP(ptAx, ptAy, 1, 0, r * 2),
      { radius: rBig, color: GRAY, label: '∠2', opacity: 0.08, labelSize: 13, labelColor: INK });
    S.addAngle('ang3g', angleP(ptAx, ptAy, 1, 0, r * 2), [ptAx, ptAy],
      angleP(ptAx, ptAy, cux, cuy, r * 2),
      { radius: r, color: GRAY, label: '∠3', opacity: 0.08, labelSize: 13, labelColor: INK });
    S.addAngle('ang4g', angleP(ptAx, ptAy, cux, cuy, r * 2), [ptAx, ptAy],
      angleP(ptAx, ptAy, -1, 0, r * 2),
      { radius: rBig, color: GRAY, label: '∠4', opacity: 0.08, labelSize: 13, labelColor: INK });
    S.addAngle('ang5g', angleP(ptBx, ptBy, -bux, -buy, r * 2), [ptBx, ptBy],
      angleP(ptBx, ptBy, -cux, -cuy, r * 2),
      { radius: r, color: GRAY, label: '∠5', opacity: 0.08, labelSize: 13, labelColor: INK });
    S.addAngle('ang6g', angleP(ptBx, ptBy, -cux, -cuy, r * 2), [ptBx, ptBy],
      angleP(ptBx, ptBy, bux, buy, r * 2),
      { radius: rBig, color: GRAY, label: '∠6', opacity: 0.08, labelSize: 13, labelColor: INK });
    S.addAngle('ang7g', angleP(ptBx, ptBy, bux, buy, r * 2), [ptBx, ptBy],
      angleP(ptBx, ptBy, cux, cuy, r * 2),
      { radius: r, color: GRAY, label: '∠7', opacity: 0.08, labelSize: 13, labelColor: INK });
    S.addAngle('ang8g', angleP(ptBx, ptBy, cux, cuy, r * 2), [ptBx, ptBy],
      angleP(ptBx, ptBy, -bux, -buy, r * 2),
      { radius: rBig, color: GRAY, label: '∠8', opacity: 0.08, labelSize: 13, labelColor: INK });
  }

  var scene = {
    id: 's4',
    title: '四、同旁内角（U形）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：高亮∠4和∠5（同旁内角）
        narration: '第三类：同旁内角。"同旁"指在截线的同一侧，"内"指在两条直线的内部区域。来看 ∠4 和 ∠5——∠4 在 A 处的左下角（在 a、b 之间，截线左侧），∠5 在 B 处的左上角（也在 a、b 之间，截线左侧）。两者在截线的同一侧，这就是同旁内角。',
        enter: function (anim) {
          buildBase();
          buildAllAnglesGray();

          var rBig = 1.2; var r = 0.75;
          // 高亮∠4（A处左下，在两直线之间，截线左侧）
          S.addAngle('ang4h', angleP(ptAx, ptAy, cux, cuy, r * 2), [ptAx, ptAy],
            angleP(ptAx, ptAy, -1, 0, r * 2),
            { radius: rBig, color: GREEN, label: '∠4', opacity: 0.40, labelSize: 15 });
          // 高亮∠5（B处左上，在两直线之间，截线左侧）
          S.addAngle('ang5h', angleP(ptBx, ptBy, -bux, -buy, r * 2), [ptBx, ptBy],
            angleP(ptBx, ptBy, -cux, -cuy, r * 2),
            { radius: r, color: GREEN, label: '∠5', opacity: 0.40, labelSize: 15 });

          P.renderCard(
            '<b>同旁内角</b>：两个角都在两直线<b>内部</b>，且在截线<b>同侧</b><br>' +
            '如 ∠4（A 处左下）与 ∠5（B 处左上）<br>' +
            '——两角在截线同一侧，"并排"排列'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：描出"U"字形轮廓
        narration: '同旁内角的特征可以用"U 形"来记忆——把两条被截线的相关部分和截线中间那段连起来，会看到一个 U 形的开口。∠4 和 ∠5 就在这个 U 形的两个角处。同旁内角也叫"同侧内角"，注意和内错角的区别：内错角是 Z 形（两侧），同旁内角是 U 形（同侧）。',
        enter: function (anim) {
          // U形三笔：a左段，截线中段，b左段
          // U的左竖：a从A向左
          S.addSegment('u-left', [ptAx, ptAy], [ptAx - 3, ptAy], { color: GREEN, width: 3.5, dash: 0 });
          // U的右竖：b从B向左（同侧）
          S.addSegment('u-right', [ptBx, ptBy], [ptBx - 3, ptBy + bSlope * (-3)], { color: GREEN, width: 3.5, dash: 0 });
          // U的底弧（截线A到B中段）
          S.addSegment('u-bot', [ptAx, ptAy], [ptBx, ptBy], { color: GREEN, width: 3.5, dash: 0 });

          P.renderCard(
            '同旁内角——<b>U 形</b>（同侧内角）<br>' +
            '∠4 与 ∠5 是一对同旁内角（绿色高亮）<br>' +
            '还有：∠3 与 ∠6<br>' +
            '三线八角中共有 <b>2 对同旁内角</b>。'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：三类角对比小表
        narration: '我们来做一个总结对比：同位角、内错角、同旁内角三种关系，分别对应 F、Z、U 三种形状，对数分别是 4 对、2 对、2 对。三线八角就是这些位置关系的全集。记住这三种分类，后面判定平行就有了依据！',
        enter: function (anim) {
          P.renderCard(
            '<b>三类角对比</b><br>' +
            '<table style="width:100%;border-collapse:collapse;font-size:15px">' +
            '<tr style="background:#e3f2fd"><th style="padding:6px;border:1px solid #ccc">类型</th><th style="padding:6px;border:1px solid #ccc">位置特征</th><th style="padding:6px;border:1px solid #ccc">字形</th><th style="padding:6px;border:1px solid #ccc">对数</th><th style="padding:6px;border:1px solid #ccc">例子</th></tr>' +
            '<tr><td style="padding:6px;border:1px solid #ccc;color:#7b1fa2"><b>同位角</b></td><td style="padding:6px;border:1px solid #ccc">截线同侧、位置相同</td><td style="padding:6px;border:1px solid #ccc">F形</td><td style="padding:6px;border:1px solid #ccc">4对</td><td style="padding:6px;border:1px solid #ccc">∠1与∠5</td></tr>' +
            '<tr><td style="padding:6px;border:1px solid #ccc;color:#e65100"><b>内错角</b></td><td style="padding:6px;border:1px solid #ccc">两线内部、截线两侧</td><td style="padding:6px;border:1px solid #ccc">Z形</td><td style="padding:6px;border:1px solid #ccc">2对</td><td style="padding:6px;border:1px solid #ccc">∠3与∠5</td></tr>' +
            '<tr><td style="padding:6px;border:1px solid #ccc;color:#2e7d32"><b>同旁内角</b></td><td style="padding:6px;border:1px solid #ccc">两线内部、截线同侧</td><td style="padding:6px;border:1px solid #ccc">U形</td><td style="padding:6px;border:1px solid #ccc">2对</td><td style="padding:6px;border:1px solid #ccc">∠4与∠5</td></tr>' +
            '</table>'
          );
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
