// s4-prop-trans.js  命题与平移复习（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 例题5：命题辨析——画两个独立的60°角（不是对顶角）
  function drawTwoAngles60() {
    // 左边：独立∠α=60°（顶点在(-6,0)）
    var v1x = -6, v1y = 0;
    S.addSegment('pt-r1a', [v1x, v1y], [v1x + 3, v1y], { color: BLUE, width: 2.5, dash: 0 });
    S.addSegment('pt-r1b', [v1x, v1y],
      [v1x + 3 * Math.cos(Math.PI / 3), v1y + 3 * Math.sin(Math.PI / 3)],
      { color: BLUE, width: 2.5, dash: 0 });
    S.addAngle('pt-a1',
      [v1x + 2, v1y],
      [v1x, v1y],
      [v1x + 2 * Math.cos(Math.PI / 3), v1y + 2 * Math.sin(Math.PI / 3)],
      { radius: 0.8, color: BLUE, label: '∠α=60°', opacity: 0.12 });
    S.addText('pt-lv1', v1x - 0.4, v1y - 0.6, 'O₁', { size: 14, color: INK });

    // 右边：独立∠β=60°（顶点在(2,0)，方向不同，非对顶角关系）
    var v2x = 2, v2y = 0;
    S.addSegment('pt-r2a', [v2x, v2y], [v2x + 3, v2y], { color: ORANGE, width: 2.5, dash: 0 });
    S.addSegment('pt-r2b', [v2x, v2y],
      [v2x + 3 * Math.cos(Math.PI / 3), v2y + 3 * Math.sin(Math.PI / 3)],
      { color: ORANGE, width: 2.5, dash: 0 });
    S.addAngle('pt-a2',
      [v2x + 2, v2y],
      [v2x, v2y],
      [v2x + 2 * Math.cos(Math.PI / 3), v2y + 2 * Math.sin(Math.PI / 3)],
      { radius: 0.8, color: ORANGE, label: '∠β=60°', opacity: 0.12 });
    S.addText('pt-lv2', v2x - 0.4, v2y - 0.6, 'O₂', { size: 14, color: INK });

    // 两顶点独立，用虚线标注"不相交"
    S.addSegment('pt-sep', [-2.2, 4.5], [-2.2, -2.5], { color: '#b0bec5', width: 1.5, dash: 4 });
    S.addText('pt-eq', -0.5, 5.8, '∠α = ∠β = 60°', { size: 16, color: PURPLE });
    S.addText('pt-but', -1.5, 4.5, '但顶点不同，互不相交', { size: 14, color: RED });
    S.addText('pt-notv', -1.0, 3.2, '⇒ 不是对顶角！', { size: 15, color: RED });
  }

  // 例题6：平移作图——△ABC向右4格，向上2格
  function drawTranslation() {
    var dx = 3.5, dy = 1.5; // 实际坐标偏移（格子比例适配画板）

    // 原三角形ABC
    var A1 = [-7.5, -1.5], B1 = [-4.5, -1.5], C1 = [-6.5, 1.5];
    S.addPolygon('pt-tri1', [A1, B1, C1],
      { fillColor: BLUE, opacity: 0.15, borderWidth: 2.5, strokeColor: BLUE });
    S.addText('pt-lA1', A1[0] - 0.5, A1[1] - 0.5, 'A', { size: 14, color: BLUE });
    S.addText('pt-lB1', B1[0] + 0.1, B1[1] - 0.5, 'B', { size: 14, color: BLUE });
    S.addText('pt-lC1', C1[0] - 0.5, C1[1] + 0.3, 'C', { size: 14, color: BLUE });

    // 平移后三角形A'B'C'
    var A2 = [A1[0] + dx, A1[1] + dy];
    var B2 = [B1[0] + dx, B1[1] + dy];
    var C2 = [C1[0] + dx, C1[1] + dy];
    S.addPolygon('pt-tri2', [A2, B2, C2],
      { fillColor: ORANGE, opacity: 0.15, borderWidth: 2.5, strokeColor: ORANGE });
    S.addText('pt-lA2', A2[0] - 0.5, A2[1] - 0.5, "A'", { size: 14, color: ORANGE });
    S.addText('pt-lB2', B2[0] + 0.1, B2[1] - 0.5, "B'", { size: 14, color: ORANGE });
    S.addText('pt-lC2', C2[0] - 0.5, C2[1] + 0.3, "C'", { size: 14, color: ORANGE });

    // 对应点连线（虚线箭头方向）
    S.addSegment('pt-arr1', A1, A2, { color: RED, width: 1.5, dash: 2 });
    S.addSegment('pt-arr2', B1, B2, { color: RED, width: 1.5, dash: 2 });
    S.addSegment('pt-arr3', C1, C2, { color: RED, width: 1.5, dash: 2 });

    // 方向说明
    S.addText('pt-dir', -1.5, -5.5, '平移：向右 3.5 格，向上 1.5 格', { size: 14, color: INK });
    S.addText('pt-same', -1.5, -6.5, '三点移动方向相同，距离相同', { size: 13, color: GREEN });
  }

  var scene = {
    id: 's4',
    title: '四、命题与平移复习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：例题5——命题辨析（假命题+反例）
        narration: '第四块内容——命题与平移。先来看例题5：判断命题"如果两个角相等，那么这两个角是对顶角"，这是真命题还是假命题？——是假命题！看图：左边画一个 $60^\\circ$ 角，右边再画一个 $60^\\circ$ 角，两个角相等，但它们顶点不同、不相交，根本不构成对顶角关系。只要能举出一个反例，就能证明一个命题是假命题。',
        enter: function (anim) {
          drawTwoAngles60();
          P.renderCard(
            '<b>例题5：命题辨析</b><br>' +
            '命题：相等的角是对顶角<br>' +
            '→ <b style="color:#c62828">假命题</b><br>' +
            '<br>' +
            '<b>反例</b>：两个分开画的 $60^\\circ$ 角，<br>' +
            '相等，但不是对顶角（顶点不同）<br>' +
            '<br>' +
            '<b>对顶角必须满足</b>：<br>' +
            '① 两直线相交形成<br>' +
            '② 两边互为反向延长线<br>' +
            '③ 共顶点'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：例题6——平移作图
        narration: '例题6：将三角形 $ABC$ 向右平移若干格、向上平移若干格。作图要点有三条：第一，三个顶点必须沿<b>相同方向</b>移动相同距离；第二，对应边平行且相等；第三，形状和大小完全不变，只有位置变化。看图中实线三角形平移到虚线三角形，三条虚线箭头方向一致、长度相同，这才是正确的平移作图！',
        enter: function (anim) {
          drawTranslation();
          P.renderCard(
            '<b>例题6：平移作图三要素</b><br>' +
            '<ol style="margin:6px 0 0 16px;line-height:2">' +
            '<li>三顶点沿<b>相同方向</b>移动</li>' +
            '<li>每个顶点移动<b>相同距离</b></li>' +
            '<li>对应边平行且相等，形状大小不变</li>' +
            '</ol>' +
            '<br>' +
            '⚠ 易错点6：各顶点移动方向或距离不一致'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：易错点5/6 总结卡
        narration: '来归纳命题与平移的两个易错点。易错点5：凭图形外观得出结论——图形只是示意图，不能只靠"看起来"下结论，必须有已知条件和定理作为依据。这也是几何学习的基本态度：观察→猜想→验证→推理。易错点6：平移时各顶点移动不一致——平移必须让每个点都沿完全相同的方向移动完全相同的距离！',
        enter: function (anim) {
          P.renderCard(
            '<b>易错点5：凭外观得结论</b><br>' +
            '图形只是示意，结论必须依据<b>已知条件</b>和<b>定理</b>。<br>' +
            '几何推理链：观察 → 猜想 → 验证 → 推理<br>' +
            '<br>' +
            '<b>易错点6：平移中各点移动不一致</b><br>' +
            '平移 = 所有点沿<b>同一方向</b>移动<b>相同距离</b>。<br>' +
            '对应点连线必须<b>平行且相等</b>。',
            'warm'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
