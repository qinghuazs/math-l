// s3-alternate.js  内错角（Z形）（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';

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
    id: 's3',
    title: '三、内错角（Z形）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：高亮∠3和∠5（内错角）
        narration: '第二类：内错角。"内"指的是两条直线的内部区域（即 a 和 b 之间），"错"指的是在截线的两侧错开。我们来看 ∠3 和 ∠5——∠3 在 A 处的右下角（在 a、b 之间），∠5 在 B 处的左上角（也在 a、b 之间），两者在截线的两侧。这就是内错角。',
        enter: function (anim) {
          buildBase();
          buildAllAnglesGray();

          var r = 0.75;
          // 高亮∠3（A处右下，在两直线之间）
          S.addAngle('ang3h', angleP(ptAx, ptAy, 1, 0, r * 2), [ptAx, ptAy],
            angleP(ptAx, ptAy, cux, cuy, r * 2),
            { radius: r, color: ORANGE, label: '∠3', opacity: 0.40, labelSize: 15 });
          // 高亮∠5（B处左上，在两直线之间）
          S.addAngle('ang5h', angleP(ptBx, ptBy, -bux, -buy, r * 2), [ptBx, ptBy],
            angleP(ptBx, ptBy, -cux, -cuy, r * 2),
            { radius: r, color: ORANGE, label: '∠5', opacity: 0.40, labelSize: 15 });

          P.renderCard(
            '<b>内错角</b>：两个角都在两直线<b>内部</b>，且在截线<b>两侧</b><br>' +
            '如 ∠3（A 处右下）与 ∠5（B 处左上）<br>' +
            '——两角"交错"排列在截线左右'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：描出"Z"字形轮廓
        narration: '内错角的特征可以用"Z 形"来记忆——把两段截线方向和两个角拼起来，会看到一个斜 Z 的形状。∠3 和 ∠5 就在这个 Z 形的两个角处。也有人用"N 形"来记忆，道理相同——关键是两角在两直线内部、截线两侧。',
        enter: function (anim) {
          // Z形三笔：a→右一小段，斜线A到B，b←左一小段
          // Z的上横：a从A向右延伸
          S.addSegment('z-top', [ptAx, ptAy], [ptAx + 3.5, ptAy], { color: ORANGE, width: 3.5, dash: 0 });
          // Z的斜线：A到B（截线中段）
          S.addSegment('z-diag', [ptAx, ptAy], [ptBx, ptBy], { color: ORANGE, width: 3.5, dash: 0 });
          // Z的下横：b从B向左延伸
          S.addSegment('z-bot', [ptBx, ptBy], [ptBx - 3.5, ptBy + bSlope * (-3.5)], { color: ORANGE, width: 3.5, dash: 0 });

          P.renderCard(
            '内错角——<b>Z 形</b>（或 N 形）<br>' +
            '∠3 与 ∠5 是一对内错角（橙色高亮）<br>' +
            '还有：∠4 与 ∠6<br>' +
            '三线八角中共有 <b>2 对内错角</b>。'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：定义卡
        narration: '总结：两条直线被第三条直线所截，在两直线之间且在截线两侧的两个角叫做内错角。内错角也不一定相等，等到两直线平行时才相等。这是第二个判定方法的依据！',
        enter: function (anim) {
          P.renderCard(
            '<b>内错角定义</b><br>' +
            '两条直线被第三条直线所截，在两直线<b>内部</b>且在截线<b>两侧</b>的两个角叫做内错角。<br><br>' +
            '记忆：<b>Z 形</b>（或 N 形）<br>' +
            '三线八角中共有 <b>2 对</b>内错角：<br>' +
            '∠3 与 ∠5，∠4 与 ∠6',
            'warm'
          );
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
