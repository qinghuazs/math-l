(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var BLUE  = '#1565c0';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 直线 l 的 y 坐标
  var LY = -2.5;
  // 外点 P 的坐标
  var PX = 0, PY = 3.0;

  // 候选直线：过 P(0,3) 以角度 theta 确定另一点
  // 直线方程：y - PY = tan(theta) * (x - PX)
  // 与 l (y=LY) 的交点 x_inter:
  //   LY - PY = tan(theta) * (x - PX)
  //   x_inter = PX + (LY - PY) / tan(theta)   (theta != 0, PI)
  // 当 theta -> 0 或 PI，tan(theta)->0，x_inter->∞（平行于 l）
  function interX(theta) {
    var t = Math.tan(theta);
    if (Math.abs(t) < 1e-8) return 1e6; // 几乎平行
    return PX + (LY - PY) / t;
  }

  // 候选线上与 P 距离 dist 的另一点（方向角 theta）
  function candidateEnd(theta, dist) {
    return [PX + dist * Math.cos(theta), PY + dist * Math.sin(theta)];
  }

  var scene = {
    id: 's3',
    title: '三、平行公理',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '现在我们来探究一个重要问题：过直线外一点，能画几条直线与已知直线平行？先画出直线 l，再在 l 外取一点 P。',
        enter: function () {
          // 直线 l（水平线）
          S.addSegment('line-l', [-9, LY], [9, LY], { color: BLUE, width: 4, dash: 0 });
          S.actor('lbl-l', 9.3, LY, 'l', { color: BLUE, size: 20, bold: true });

          // 点 P
          S.dropPoint('pt-P', PX, PY, { color: RED, name: 'P', size: 4.5, animate: false, labelOffset: [8, 8] });
          S.actor('lbl-P-hint', 0, 5.5, 'P 是直线 l 外的一点', { color: RED, size: 16 });

          P.renderCard(
            '已知：直线 $l$，点 $P$ 在 $l$ 外。<br>' +
            '问题：过点 $P$，能作几条直线与 $l$ 平行？'
          );
        },
      },
      {
        narration: '我们过 P 作一条候选直线，然后让它绕 P 旋转。注意观察：它与 l 的交点会怎样移动？当候选线与 l 平行时，交点会跑到哪里？',
        enter: function (anim) {
          S.remove('lbl-P-hint');

          var board = S.getBoard();

          // 初始角度：-0.7 rad（有明显交点的位置）
          var angle = -0.7;
          // 目标角度：0（水平，即平行于 l）
          var targetAngle = 0;

          // 候选线：两个动态端点（相对于 P，向两侧各延伸 10 单位）
          var cEx = PX + 10 * Math.cos(angle);
          var cEy = PY + 10 * Math.sin(angle);
          var cFx = PX - 10 * Math.cos(angle);
          var cFy = PY - 10 * Math.sin(angle);

          var ptCE = board.create('point',
            [function () { return cEx; }, function () { return cEy; }],
            { visible: false, fixed: true, withLabel: false });
          var ptCF = board.create('point',
            [function () { return cFx; }, function () { return cFy; }],
            { visible: false, fixed: true, withLabel: false });

          var cand = board.create('segment', [ptCE, ptCF], {
            strokeColor: GRAY, strokeWidth: 3, dash: 0, highlight: false, fixed: true,
          });

          // 交点：在 l 上动态显示
          var ix = interX(angle);
          var clampIx = Math.max(-9.5, Math.min(9.5, ix));
          var ptIx = PX, ptIy = LY; // 初始占位

          var ptI = board.create('point',
            [function () { return ptIx; }, function () { return ptIy; }],
            {
              name: '', size: 5,
              strokeColor: RED, fillColor: RED,
              fixed: true, highlight: false, withLabel: false,
            });

          // 初始化交点位置
          ix = interX(angle);
          clampIx = Math.max(-9.5, Math.min(9.5, ix));
          ptIx = clampIx;
          ptIy = LY;
          board.update();

          P.renderCard(
            '过 $P$ 作一条候选直线，让它绕 $P$ 旋转……<br>' +
            '观察：与 $l$ 的交点如何移动？'
          );

          if (!anim) {
            // 快放：直接设到平行位置
            angle = targetAngle;
            cEx = PX + 10; cEy = PY;
            cFx = PX - 10; cFy = PY;
            ptIx = 9.5; ptIy = LY; // 交点飞出
            board.update();
            // 候选线变绿
            cand.setAttribute({ strokeColor: GREEN, strokeWidth: 4 });
            board.update();
            // 隐藏交点（平行时无交点）
            ptI.setAttribute({ visible: false });
            board.update();
            S.actor('lbl-parallel', 0, 5.0, '与 l 平行！有且只有一条。', { color: GREEN, size: 18, bold: true });
            return Promise.resolve();
          }

          // 动画：角度从 -0.7 → 0（旋转到平行）
          return S.animate({
            from: -0.7, to: 0, duration: 2200,
            easing: 'easeInOutQuart',
            onUpdate: function (theta) {
              angle = theta;
              cEx = PX + 10 * Math.cos(theta);
              cEy = PY + 10 * Math.sin(theta);
              cFx = PX - 10 * Math.cos(theta);
              cFy = PY - 10 * Math.sin(theta);

              var xi = interX(theta);
              if (Math.abs(xi) > 9.5) {
                // 交点飞出视野
                ptIx = (xi > 0 ? 9.8 : -9.8);
              } else {
                ptIx = xi;
              }
              ptIy = LY;
              board.update();
            },
          }).then(function () {
            // 候选线变绿（平行了）
            cand.setAttribute({ strokeColor: GREEN, strokeWidth: 4 });
            ptI.setAttribute({ visible: false });
            board.update();
            return delay(300);
          }).then(function () {
            S.actor('lbl-parallel', 0, 5.0, '与 l 平行！', { color: GREEN, size: 22, bold: true });
            return delay(400);
          });
        },
      },
      {
        narration: '继续旋转，能不能再找到第二条与 l 平行的直线？旋转过头，又与 l 相交。说明这样的直线有且只有一条。这就是平行公理。',
        enter: function (anim) {
          var board = S.getBoard();

          // 显示最终平行线（绿色，已在上步画好）
          // 再画一条尝试旋转过头的线（虚线，橙色）
          var angle2 = 0.55; // 过了头，又会与 l 相交

          var t2Ex = PX + 10 * Math.cos(angle2);
          var t2Ey = PY + 10 * Math.sin(angle2);
          var t2Fx = PX - 10 * Math.cos(angle2);
          var t2Fy = PY - 10 * Math.sin(angle2);

          var ORANGE = '#e65100';

          if (!anim) {
            S.addSegment('cand2', [PX - 10 * Math.cos(angle2), PY - 10 * Math.sin(angle2)],
              [PX + 10 * Math.cos(angle2), PY + 10 * Math.sin(angle2)],
              { color: ORANGE, width: 2, dash: 2 });
            var xi2 = interX(angle2);
            xi2 = Math.max(-9.5, Math.min(9.5, xi2));
            S.dropPoint('inter2', xi2, LY, { color: ORANGE, name: '相交', size: 4, animate: false, labelOffset: [6, 8] });
            P.renderCard(
              '<b>平行公理</b><br>' +
              '经过直线外一点，<b>有且只有一条</b>直线与这条直线平行。'
            );
            return Promise.resolve();
          }

          var c2Ex = PX, c2Ey = PY;
          var c2Fx = PX, c2Fy = PY;

          var ptC2E = board.create('point',
            [function () { return c2Ex; }, function () { return c2Ey; }],
            { visible: false, fixed: true, withLabel: false });
          var ptC2F = board.create('point',
            [function () { return c2Fx; }, function () { return c2Fy; }],
            { visible: false, fixed: true, withLabel: false });
          var cand2seg = board.create('segment', [ptC2E, ptC2F], {
            strokeColor: ORANGE, strokeWidth: 2, dash: 2, highlight: false, fixed: true,
          });

          var ix2 = PX; var iy2 = LY;
          var ptI2 = board.create('point',
            [function () { return ix2; }, function () { return iy2; }],
            { name: '相交', size: 4, strokeColor: ORANGE, fillColor: ORANGE,
              fixed: true, highlight: false,
              label: { offset: [6, 8], fontSize: 14, strokeColor: ORANGE } });

          return S.animate({
            from: 0, to: angle2, duration: 1400, easing: 'easeInOutQuart',
            onUpdate: function (theta) {
              c2Ex = PX + 10 * Math.cos(theta);
              c2Ey = PY + 10 * Math.sin(theta);
              c2Fx = PX - 10 * Math.cos(theta);
              c2Fy = PY - 10 * Math.sin(theta);
              var xi = interX(theta);
              if (Math.abs(xi) > 9.5) {
                ix2 = xi > 0 ? 9.8 : -9.8;
              } else {
                ix2 = xi;
              }
              iy2 = LY;
              board.update();
            },
          }).then(function () {
            return delay(200);
          }).then(function () {
            P.renderCard(
              '<b>平行公理</b><br>' +
              '经过直线外一点，<b>有且只有一条</b>直线与这条直线平行。<br><br>' +
              '向哪个方向旋转，候选线最终都会与 $l$ 相交——只有水平时才与 $l$ 平行。'
            );
          });
        },
      },
      {
        narration: '平行公理：经过直线外一点，有且只有一条直线与这条直线平行。"有且只有"——"有"说明平行线存在，"只有"说明平行线唯一。这是平面几何的基本事实，不需要证明。',
        enter: function () {
          P.renderCard(
            '<b>平行公理（基本事实）</b><br>' +
            '经过直线外一点，有且只有一条直线与这条直线平行。<br><br>' +
            '说明：<br>' +
            '· "有"——平行线<b>存在</b>（至少一条）<br>' +
            '· "只有"——平行线<b>唯一</b>（至多一条）<br>' +
            '· 这是公理，是平面几何的基本出发点，无需证明。',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
