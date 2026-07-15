// s6-example.js  例题：∠1=65°，∠2=65° 为内错角，判断两直线关系（2步）
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

  // 例题布局：清晰的三线八角图
  // 截线 t 从左上到右下，直线 m（上，y=2），直线 n（下，y=-2）
  // t 斜率适中，约 tan(-65°) 方向
  // 令 t 从(-3,5.5)到(3,-5.5)，与 m（y=2）交于 A，与 n（y=-2）交于 B

  // t: 直线过(-3,5.5)和(3,-5.5)，斜率=-11/6
  // y=2 时: 2=5.5 + (-11/6)*(x+3) => -3.5 = (-11/6)*(x+3) => x+3 = 3.5*6/11 ≈ 1.909 => x ≈ -1.09
  // y=-2 时: -2=5.5+(-11/6)*(x+3) => -7.5 = (-11/6)*(x+3) => x+3 = 7.5*6/11 ≈ 4.09 => x ≈ 1.09
  var ptAx = -1.09, ptAy = 2;
  var ptBx = 1.09, ptBy = -2;

  var tdx = ptBx - ptAx; var tdy = ptBy - ptAy;
  var tLen = Math.sqrt(tdx * tdx + tdy * tdy);
  var tux = tdx / tLen; var tuy = tdy / tLen;

  var t1 = [ptAx - tux * 10, ptAy - tuy * 10];
  var t2 = [ptBx + tux * 10, ptBy + tuy * 10];
  var m1 = [-8, ptAy]; var m2 = [8, ptAy];
  var n1 = [-8, ptBy]; var n2 = [8, ptBy];

  // ∠1（A处右下角，m右 × t下）= 65°  (内错角上角)
  // ∠2（B处左上角，t上 × n左）= 65°  (内错角下角)
  // 这是内错角，满足内错角相等=>两直线平行

  function angleP(x, y, dx, dy, r) { return [x + dx * r, y + dy * r]; }

  var scene = {
    id: 's6',
    title: '六、例题：判定平行',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：画图，标注条件
        narration: '来看例题：已知直线 $m$、$n$ 被直线 $t$ 所截，在 $A$ 处形成的角 ∠1 = 65°，在 $B$ 处形成的角 ∠2 = 65°，且 ∠1 与 ∠2 是内错角。问：直线 $m$ 与 $n$ 的位置关系如何？先把图画出来，把已知条件标注上去。',
        enter: function (anim) {
          // 三条线
          S.addSegment('line-m', m1, m2, { color: BLUE, width: 3, dash: 0 });
          S.addText('lbl-m', 8.3, ptAy + 0.3, 'm', { size: 18, color: BLUE });
          S.addSegment('line-n', n1, n2, { color: GREEN, width: 3, dash: 0 });
          S.addText('lbl-n', 8.3, ptBy + 0.3, 'n', { size: 18, color: GREEN });
          S.addSegment('line-t', t1, t2, { color: INK, width: 2.5, dash: 0 });
          S.addText('lbl-t', t2[0] + 0.3, t2[1] - 0.3, 't', { size: 18, color: INK });

          // 交点
          S.dropPoint('pt-A', ptAx, ptAy, { color: INK, name: 'A', size: 2.5, animate: false, labelOffset: [-18, 8] });
          S.dropPoint('pt-B', ptBx, ptBy, { color: INK, name: 'B', size: 2.5, animate: false, labelOffset: [8, 8] });

          // ∠1（A处右下，内错角）：m右方向(1,0) × t下方向(tux,tuy)
          S.addAngle('ang1-ex',
            [ptAx + 2, ptAy],
            [ptAx, ptAy],
            [ptAx + tux * 2, ptAy + tuy * 2],
            { radius: 0.85, color: ORANGE, label: '∠1', opacity: 0.40, labelSize: 14 });

          // ∠2（B处左上，内错角）：t上方向(-tux,-tuy) × n左方向(-1,0)
          S.addAngle('ang2-ex',
            [ptBx - tux * 2, ptBy - tuy * 2],
            [ptBx, ptBy],
            [ptBx - 2, ptBy],
            { radius: 0.85, color: ORANGE, label: '∠2', opacity: 0.40, labelSize: 14 });

          // 度数标注
          S.addText('deg1-ex', ptAx + 1.5, ptAy - 1.0, '65°', { size: 14, color: ORANGE });
          S.addText('deg2-ex', ptBx - 2.5, ptBy + 0.6, '65°', { size: 14, color: ORANGE });

          P.renderCard(
            '<b>例题</b><br>' +
            '已知：∠1 = 65°，∠2 = 65°，∠1 与 ∠2 是内错角<br>' +
            '求：直线 $m$ 与 $n$ 的位置关系<br><br>' +
            '（先看清：∠1 在 A 处，∠2 在 B 处，两角在截线 t 两侧且都在 m、n 之间）'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：推理格式卡 "因为...根据...所以..."
        narration: '解题步骤：第一步，确认 ∠1 与 ∠2 是内错角（Z 形）；第二步，指出数量关系 ∠1 = ∠2 = 65°；第三步，根据判定方法得出结论。注意推理格式要规范：因为…（根据…）所以…。这是数学证明的基本格式，大家一定要熟悉。',
        enter: function (anim) {
          // 在图上加平行标记
          S.addSegment('par-m1', [ptAx + 2.5, ptAy], [ptAx + 3.1, ptAy + 0.35], { color: BLUE, width: 2.5, dash: 0 });
          S.addSegment('par-m2', [ptAx + 2.8, ptAy], [ptAx + 3.4, ptAy + 0.35], { color: BLUE, width: 2.5, dash: 0 });
          S.addSegment('par-n1', [ptBx + 2.5, ptBy], [ptBx + 3.1, ptBy + 0.35], { color: BLUE, width: 2.5, dash: 0 });
          S.addSegment('par-n2', [ptBx + 2.8, ptBy], [ptBx + 3.4, ptBy + 0.35], { color: BLUE, width: 2.5, dash: 0 });
          S.addText('par-label-ex', ptBx + 1, ptBy - 1.5, 'm ∥ n', { size: 19, color: BLUE });

          P.renderCard(
            '<b>解题过程（推理格式）</b><br><br>' +
            '因为 ∠1 = ∠2 = 65°，<br>' +
            '且 ∠1 与 ∠2 是内错角，<br>' +
            '根据<b>内错角相等，两直线平行</b>，<br>' +
            '所以 $m \\parallel n$。<br><br>' +
            '<i>格式要点：因为（条件）→ 根据（依据）→ 所以（结论）</i>',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
