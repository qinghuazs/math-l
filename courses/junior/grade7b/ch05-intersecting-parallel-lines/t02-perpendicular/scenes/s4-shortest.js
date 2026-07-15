(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GRAY = '#90a4ae', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 动点 Q 的 x 坐标（闭包变量，由 animate 驱动）
  var qx = -7;
  // 直线 l 的 y 坐标
  var LY = -3;
  // 外点 P 的坐标
  var PX = 0, PY = 3;
  // 垂足（PA ⊥ l 时 A 的 x 坐标 = PX）
  var FOOT_X = PX;

  // 计算 PQ 长度
  function pqLen() {
    var dx = PX - qx;
    var dy = PY - LY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  var scene = {
    id: 's4',
    title: '四、垂线段最短',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      qx = -7;
    },
    steps: [
      {
        narration: '直线 l 外有一点 P。从 P 向直线 l 引多条线段——PA 是垂线段（PA ⊥ l），PB、PC 是普通斜线段。哪一条最短？',
        enter: function (anim) {
          qx = -7;
          // 直线 l（水平）
          S.addSegment('s4-l', [-9, LY], [9, LY], { color: INK, width: 3, dash: 0 });
          S.addText('s4-labl', 8.6, LY + 0.5, 'l', { color: INK, size: 18 });

          // 外点 P
          S.dropPoint('s4-P', PX, PY, { name: '', color: WARM, size: 5, animate: anim });
          S.addText('s4-labP', PX + 0.3, PY + 0.5, 'P', { color: WARM, size: 16 });

          // 垂线段 PA（FOOT_X = 0，垂足A在(0,-3)）
          S.addSegment('s4-PA', [PX, PY], [FOOT_X, LY], { color: WARM, width: 4, dash: 0 });
          S.dropPoint('s4-A', FOOT_X, LY, { name: '', color: WARM, size: 4, animate: false });
          S.addText('s4-labA', FOOT_X + 0.3, LY - 0.6, 'A', { color: WARM, size: 16 });
          // 直角标记
          S.addAngle('s4-rt-pa',
            [FOOT_X, LY + 1.2],
            [FOOT_X, LY],
            [FOOT_X + 1.2, LY],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.3 }
          );

          // 斜线段 PB
          S.addSegment('s4-PB', [PX, PY], [-4, LY], { color: GRAY, width: 2, dash: 2 });
          S.dropPoint('s4-B', -4, LY, { name: '', color: GRAY, size: 3, animate: false });
          S.addText('s4-labB', -4.3, LY - 0.6, 'B', { color: GRAY, size: 15 });

          // 斜线段 PC
          S.addSegment('s4-PC', [PX, PY], [5, LY], { color: GRAY, width: 2, dash: 2 });
          S.dropPoint('s4-C', 5, LY, { name: '', color: GRAY, size: 3, animate: false });
          S.addText('s4-labC', 5.2, LY - 0.6, 'C', { color: GRAY, size: 15 });

          // 显示各线段长度标注（PA=6，PB≈7.2，PC≈7.8）
          S.addText('s4-len-PA', 0.8, 0.1, 'PA = 6', { color: WARM, size: 15 });
          S.addText('s4-len-PB', -2.8, 0.3, 'PB ≈ 7.2', { color: GRAY, size: 14 });
          S.addText('s4-len-PC', 3.2, 0.3, 'PC ≈ 7.8', { color: GRAY, size: 14 });

          P.renderCard('$PA\\perp l$，PB、PC 是斜线段。凭直觉猜一猜：哪条最短？');
          return anim ? delay(500) : Promise.resolve();
        },
      },
      {
        narration: '现在让一个动点 Q 沿着直线 l 从左向右滑动，线段 PQ 的一个端点跟着 Q 走。注意实时显示的 PQ 长度——它会先变短、再变长。最短的那一刻，Q 在哪里？',
        enter: function (anim) {
          qx = -7;
          // 动点 Q（坐标用闭包函数驱动）
          S.dropPoint('s4-Q', function () { return qx; }, LY, { name: '', color: COOL, size: 5 });
          S.addText('s4-labQ', function () { return qx + 0.3; }, LY - 0.7, 'Q', { color: COOL, size: 16 });

          // PQ 线段（端点用函数跟随）
          S.addSegment('s4-PQ',
            [PX, PY],
            [function () { return qx; }, LY],
            { color: COOL, width: 3, dash: 1 }
          );

          // 动态显示 PQ 长度
          S.addText('s4-pqlen', -6, 5.5, function () {
            var dx = PX - qx;
            var dy = PY - LY;
            var len = Math.sqrt(dx * dx + dy * dy);
            return 'PQ = ' + len.toFixed(2);
          }, { color: COOL, size: 20 });

          P.renderCard('Q 沿直线 l 滑动，PQ 长度实时变化——注意什么时候 PQ 最短……');

          if (!anim) {
            qx = FOOT_X;
            S.getBoard().update();
            return Promise.resolve();
          }
          // 动画：Q 从左(-7)滑到右(7)，再回到垂足(0)
          return S.animate({
            from: -7, to: 7, duration: 2800, easing: 'easeInOutQuart',
            onUpdate: function (v) { qx = v; S.getBoard().update(); },
          }).then(function () {
            return S.animate({
              from: 7, to: FOOT_X, duration: 1400, easing: 'easeInOutQuart',
              onUpdate: function (v) { qx = v; S.getBoard().update(); },
            });
          });
        },
      },
      {
        narration: 'Q 停在了 A 的位置！PQ 缩短为 PA 的时候，长度最小——那正好是垂足位置。垂线段 PA 比其他所有斜线段都短！',
        enter: function (anim) {
          qx = FOOT_X;
          S.getBoard().update();

          // 在垂足处强调直角方块
          S.addAngle('s4-rt-min',
            [FOOT_X, LY + 1.5],
            [FOOT_X, LY],
            [FOOT_X + 1.5, LY],
            { radius: 1.5, color: WARM, ortho: true, opacity: 0.4 }
          );

          // 高亮 Q 此时与 A 重合
          S.dropPoint('s4-Q', function () { return qx; }, LY, { name: '', color: WARM, size: 7 });

          // 最短标注
          S.addText('s4-min-label', 1.2, 1.0, '⬅ 最短！', { color: WARM, size: 17 });

          P.renderCard('<b>垂线段最短</b><br>从直线外一点向直线引的所有线段中，<b>垂线段最短</b><br>$PA\\leq PQ$（Q 为 l 上任意点）', 'warm');

          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '结论已经很清晰了：从直线外一点向直线引线段，垂线段最短！这就是"垂线段最短"这一重要定理的直观证明。',
        enter: function (anim) {
          S.actor('s4-conclusion', 0, -5.5, '垂线段最短', { color: WARM, size: 28, bold: true,
            css: 'background:#fbe9e7;border:2px solid #e64a19;border-radius:10px;padding:6px 20px;' });

          P.renderCard('定理：从直线外一点到直线上各点所连线段中，<b>垂线段最短</b><br>垂线段的长度就是点到直线的距离', 'warm');

          return anim ? delay(350) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
