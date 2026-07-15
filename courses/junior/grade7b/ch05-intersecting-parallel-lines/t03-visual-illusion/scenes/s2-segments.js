(function (CW) {
  'use strict';
  // 场景二：线段长短错觉（缪勒-莱尔错觉）
  // 上方线段：两端向内箭头（><）——看起来更短
  // 下方线段：两端向外箭头（<>）——看起来更长
  // 实际上两条线段等长（均为 8 个单位）
  var S, P;
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var INK = '#455a64';
  var GRAY = '#90a4ae';

  // 线段长度（半长）：每条线段从 -L 到 L（共 2L 宽）
  var L = 4;
  // 上线段 y 坐标
  var YU = 2.5;
  // 下线段 y 坐标
  var YD = -1.5;
  // 箭头斜线长度
  var AL = 1.4;
  // 箭头角度（斜线与主线的夹角，约 35 度）
  var AX = AL * Math.cos(35 * Math.PI / 180);
  var AY = AL * Math.sin(35 * Math.PI / 180);

  // 绘制主线段（上/下）
  function drawMainLines() {
    // 上线段（向内箭头，暖色）
    S.addSegment('s2-upper', [-L, YU], [L, YU], { color: WARM, width: 3, dash: 0 });
    // 下线段（向外箭头，冷色）
    S.addSegment('s2-lower', [-L, YD], [L, YD], { color: COOL, width: 3, dash: 0 });
  }

  // 绘制向内箭头（><）：两端箭头指向线段内侧
  // 左端：左侧点出发，向右上和右下各画一条斜线
  // 右端：右侧点出发，向左上和左下各画一条斜线
  function drawInwardArrows() {
    // 左端：向内（右方向）
    S.addSegment('s2-ul1', [-L, YU], [-L + AX, YU + AY], { color: WARM, width: 2, dash: 0 });
    S.addSegment('s2-ul2', [-L, YU], [-L + AX, YU - AY], { color: WARM, width: 2, dash: 0 });
    // 右端：向内（左方向）
    S.addSegment('s2-ur1', [L, YU], [L - AX, YU + AY], { color: WARM, width: 2, dash: 0 });
    S.addSegment('s2-ur2', [L, YU], [L - AX, YU - AY], { color: WARM, width: 2, dash: 0 });
  }

  // 绘制向外箭头（<>）：两端箭头指向线段外侧
  // 左端：左侧点出发，向左上和左下各画一条斜线
  // 右端：右侧点出发，向右上和右下各画一条斜线
  function drawOutwardArrows() {
    // 左端：向外（左方向）
    S.addSegment('s2-dl1', [-L, YD], [-L - AX, YD + AY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s2-dl2', [-L, YD], [-L - AX, YD - AY], { color: COOL, width: 2, dash: 0 });
    // 右端：向外（右方向）
    S.addSegment('s2-dr1', [L, YD], [L + AX, YD + AY], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s2-dr2', [L, YD], [L + AX, YD - AY], { color: COOL, width: 2, dash: 0 });
  }

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 绘制两端端点对齐的竖虚线（揭示等长）
  function drawAlignLines(anim) {
    S.addSegment('s2-vl', [-L, YU + 0.6], [-L, YD - 0.6], { color: GRAY, width: 2, dash: 2 });
    S.addSegment('s2-vr', [L, YU + 0.6], [L, YD - 0.6], { color: GRAY, width: 2, dash: 2 });
    S.actor('s2-eq', 0, -4.0, '两端对齐 = 等长！', { color: '#388e3c', size: 22, bold: true });
    if (!anim) return Promise.resolve();
    return delay(400);
  }

  var scene = {
    id: 's2',
    title: '二、实验一：线段长短错觉（缪勒-莱尔）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '实验一，缪勒-莱尔错觉！看黑板上两条线段——上面这条两端箭头向内，下面这条两端箭头向外。你觉得，哪一条更长？',
        enter: function (anim) {
          drawMainLines();
          drawInwardArrows();
          drawOutwardArrows();
          S.actor('s2-la', -9, YU, '上', { color: WARM, size: 20, bold: true });
          S.actor('s2-lb', -9, YD, '下', { color: COOL, size: 20, bold: true });
          P.renderCard('上面的线段两端是<b>向内箭头</b>（>&lt;）<br>下面的线段两端是<b>向外箭头</b>（&lt;>）<br><br>请先凭<b>直觉</b>判断：哪条线段更长？');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '大多数人会觉得——下面那条带向外箭头的线段更长！事实上，两条线段一样长！不信？我们来验证！',
        enter: function (anim) {
          P.renderCard('大多数人的直觉：<b>下面那条更长</b>！<br><br>实际上……让我们用数学来揭秘！', 'warm');
          if (!anim) return null;
          return delay(200);
        },
      },
      {
        narration: '揭示！我们从两条线段的左右两端，各画一条竖直虚线——两端完全对齐！两条线段的左端在同一条竖线上，右端也在同一条竖线上，说明它们一样长！',
        enter: function (anim) {
          // 移除箭头，只保留主线段，再画对齐竖线
          S.remove('s2-ul1'); S.remove('s2-ul2');
          S.remove('s2-ur1'); S.remove('s2-ur2');
          S.remove('s2-dl1'); S.remove('s2-dl2');
          S.remove('s2-dr1'); S.remove('s2-dr2');
          P.renderCard('两端对齐 = 两线段<b>等长</b>！<br><br>线段长度均为 $8$ 个单位。<br>箭头方向让大脑误以为长度不同——这就是<b>视觉错觉</b>！', 'cool');
          return drawAlignLines(anim);
        },
      },
      {
        narration: '结论：视觉受箭头方向干扰，产生长度不同的错觉。但测量验证——两条线段实际等长！这告诉我们：图形看起来怎样，不等于它实际上怎样。',
        enter: function () {
          P.renderCard('<b>实验一结论</b><br>两线段实际等长，均为 $8$ 个单位。<br>箭头方向影响视觉判断，产生错觉。', 'warm');
          P.renderCard('第一句话：<b>图形看起来怎样，不等于它实际上怎样。</b>', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
