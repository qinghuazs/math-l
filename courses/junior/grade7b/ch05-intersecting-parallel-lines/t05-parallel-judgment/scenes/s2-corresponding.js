// s2-corresponding.js  同位角（F形）（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 布局同 s1（固定坐标，复制过来保持一致）
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
    // A处全部灰色角弧
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
    // B处全部灰色角弧
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
    id: 's2',
    title: '二、同位角（F形）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：三线八角底图，全部角淡化，高亮∠1和∠5
        narration: '第一类：同位角。所谓"同位"，就是两个角在截线两侧的位置完全相同。我们来看 ∠1 和 ∠5——∠1 在 A 处（截线与直线 a 的交点）的左上角，∠5 在 B 处（截线与直线 b 的交点）的左上角，位置完全一样。这对角就是同位角。',
        enter: function (anim) {
          buildBase();
          buildAllAnglesGray();

          var r = 0.75;
          // 高亮∠1（A处左上）
          S.addAngle('ang1h', angleP(ptAx, ptAy, -1, 0, r * 2), [ptAx, ptAy],
            angleP(ptAx, ptAy, -cux, -cuy, r * 2),
            { radius: r, color: PURPLE, label: '∠1', opacity: 0.35, labelSize: 15 });
          // 高亮∠5（B处左上）
          S.addAngle('ang5h', angleP(ptBx, ptBy, -bux, -buy, r * 2), [ptBx, ptBy],
            angleP(ptBx, ptBy, -cux, -cuy, r * 2),
            { radius: r, color: PURPLE, label: '∠5', opacity: 0.35, labelSize: 15 });

          P.renderCard(
            '<b>同位角</b>：位置相同，如 ∠1 与 ∠5<br>' +
            '（都在截线与被截线交点的<b>同侧同方位</b>）'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：描出"F"字形轮廓
        narration: '同位角的特征可以用"F 形"来记忆——把截线和两条被截线的相关部分连起来，会看到一个字母"F"的形状。∠1 和 ∠5 就在 F 的两个"拐角"处，位置完全对应。这就是为什么同位角也叫"F 形角"。',
        enter: function (anim) {
          // F形：三条线段描轮廓
          // F的竖边：截线从B到A处偏上一段
          var fTop = [ptAx - cux * 1.5, ptAy - cuy * 1.5]; // c在A上方
          var fBot = [ptBx + cux * 0.5, ptBy + cuy * 0.5]; // c在B下方一点
          S.addSegment('f-vert', fTop, fBot, { color: PURPLE, width: 3.5, dash: 0 });
          // F的上横：a向右
          S.addSegment('f-top', [ptAx, ptAy], [ptAx + 3, ptAy], { color: PURPLE, width: 3.5, dash: 0 });
          // F的中横：从B沿b向右
          S.addSegment('f-mid', [ptBx, ptBy], [ptBx + 3, ptBy + bSlope * 3], { color: PURPLE, width: 3.5, dash: 0 });

          P.renderCard(
            '同位角——<b>F 形</b><br>' +
            '∠1 与 ∠5 是一对同位角（紫色高亮）<br>' +
            '还有：∠2 与 ∠6，∠3 与 ∠7，∠4 与 ∠8<br>' +
            '三线八角中共有 <b>4 对同位角</b>。'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：定义卡
        narration: '总结：两条直线被第三条直线所截，在截线同侧、处于相同位置的两个角叫做同位角。同位角不一定相等——只有当两直线平行时，同位角才相等。这正是我们今天要学的判定方法！',
        enter: function (anim) {
          P.renderCard(
            '<b>同位角定义</b><br>' +
            '两条直线被第三条直线所截，在截线<b>同侧</b>、处于<b>相同位置</b>的两个角叫做同位角。<br><br>' +
            '记忆：<b>F 形</b><br>' +
            '三线八角中共有 <b>4 对</b>同位角：<br>' +
            '∠1与∠5，∠2与∠6，∠3与∠7，∠4与∠8',
            'cool'
          );
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
