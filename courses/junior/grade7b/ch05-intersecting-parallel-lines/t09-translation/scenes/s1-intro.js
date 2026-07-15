// s1-intro.js  情境导入（2步）
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var BLUE = '#1565c0';
  var GREEN = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 绘制电梯示意图：矩形箱体 + 上下箭头
  function drawElevator() {
    // 电梯轿厢
    S.addPolygon('elev-body',
      [[-8.5, 4.5], [-5.5, 4.5], [-5.5, 1.5], [-8.5, 1.5]],
      { fillColor: '#bbdefb', fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 2 });
    S.addText('elev-lbl', -7, 3.1, '电梯', { size: 15, color: BLUE, anchorX: 'middle' });
    // 上箭头
    S.addSegment('elev-arr-up', [-7, 4.5], [-7, 6.0], { color: BLUE, width: 3, dash: 0 });
    S.addPolygon('elev-head-up',
      [[-7.4, 5.8], [-7, 6.6], [-6.6, 5.8]],
      { fillColor: BLUE, fillOpacity: 1, strokeColor: BLUE, strokeWidth: 1 });
  }

  // 绘制推拉门示意图：两块矩形面板 + 水平箭头
  function drawSlidingDoor() {
    // 门框
    S.addSegment('door-frame-top', [-2.8, 5.2], [2.8, 5.2], { color: INK, width: 2, dash: 0 });
    S.addSegment('door-frame-bot', [-2.8, 1.8], [2.8, 1.8], { color: INK, width: 2, dash: 0 });
    S.addSegment('door-frame-l',   [-2.8, 1.8], [-2.8, 5.2], { color: INK, width: 2, dash: 0 });
    S.addSegment('door-frame-r',   [2.8, 1.8],  [2.8, 5.2],  { color: INK, width: 2, dash: 0 });
    // 左门扇
    S.addPolygon('door-left',
      [[-2.7, 5.1], [-0.2, 5.1], [-0.2, 1.9], [-2.7, 1.9]],
      { fillColor: '#c8e6c9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
    // 右门扇
    S.addPolygon('door-right',
      [[0.2, 5.1], [2.7, 5.1], [2.7, 1.9], [0.2, 1.9]],
      { fillColor: '#c8e6c9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
    S.addText('door-lbl', 0, 3.6, '推拉门', { size: 15, color: GREEN, anchorX: 'middle' });
    // 左右箭头
    S.addSegment('door-arr-l', [-1.8, 3.5], [-3.6, 3.5], { color: GREEN, width: 3, dash: 0 });
    S.addPolygon('door-head-l',
      [[-3.4, 3.9], [-4.2, 3.5], [-3.4, 3.1]],
      { fillColor: GREEN, fillOpacity: 1, strokeColor: GREEN, strokeWidth: 1 });
    S.addSegment('door-arr-r', [1.8, 3.5], [3.6, 3.5], { color: GREEN, width: 3, dash: 0 });
    S.addPolygon('door-head-r',
      [[3.4, 3.1], [4.2, 3.5], [3.4, 3.9]],
      { fillColor: GREEN, fillOpacity: 1, strokeColor: GREEN, strokeWidth: 1 });
  }

  // 绘制传送带示意图：两个滚轮 + 传送带 + 物品
  function drawConveyor() {
    // 传送带（两条平行线）
    S.addSegment('conv-top',    [5.0, 2.8], [9.5, 2.8], { color: ORANGE, width: 3, dash: 0 });
    S.addSegment('conv-bot',    [5.0, 2.0], [9.5, 2.0], { color: ORANGE, width: 3, dash: 0 });
    // 左滚轮
    S.addCircle('conv-roll-l',  5.3, 2.4, 0.4, { color: ORANGE, width: 3 });
    // 右滚轮
    S.addCircle('conv-roll-r',  9.2, 2.4, 0.4, { color: ORANGE, width: 3 });
    // 货物（小矩形）
    S.addPolygon('conv-box',
      [[6.5, 2.8], [7.5, 2.8], [7.5, 3.6], [6.5, 3.6]],
      { fillColor: '#ffe0b2', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
    S.addText('conv-lbl', 7.3, 1.3, '传送带', { size: 15, color: ORANGE, anchorX: 'middle' });
    // 箭头
    S.addSegment('conv-arr', [8.0, 3.2], [9.0, 3.2], { color: ORANGE, width: 3, dash: 0 });
    S.addPolygon('conv-arr-head',
      [[8.8, 3.5], [9.5, 3.2], [8.8, 2.9]],
      { fillColor: ORANGE, fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 1 });
  }

  var scene = {
    id: 's1',
    title: '一、情境导入',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：展示生活中的平移现象
        narration: '同学们，今天我们来学习一种新的图形变换——平移。先看几个生活中的场景：电梯上下运动、推拉门左右滑开、传送带上物品的移动。大家仔细观察，这三种运动有什么共同的特点？',
        enter: function (anim) {
          drawElevator();
          drawSlidingDoor();
          drawConveyor();
          // 标题
          S.addText('scene-title', 0, -1.5, '观察：生活中的"移动"现象', { size: 18, color: INK, anchorX: 'middle' });
          P.renderCard(
            '<b>情境导入</b><br><br>' +
            '观察以下生活场景：<br>' +
            '① 电梯上下运动<br>' +
            '② 推拉门左右滑动<br>' +
            '③ 传送带运送物品<br><br>' +
            '<span style="color:#90a4ae">思考：这些运动有何共同点？</span>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：引出共同特点，引入平移概念
        narration: '大家发现了吗？电梯沿竖直方向上下移动，推拉门沿水平方向左右滑动，传送带上的货物沿斜向移动。它们的共同点是：整个物体（图形）的每个点都沿着<b>同一个方向</b>移动了<b>相同的距离</b>，形状和大小完全不变！这种变换就是今天要学的——<b>平移</b>！',
        enter: function (anim) {
          // 在三个图形下方画出共同点标注
          S.addPolygon('highlight-bg',
            [[-9.5, -2.0], [9.5, -2.0], [9.5, -7.0], [-9.5, -7.0]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: '#f9a825', strokeWidth: 2 });
          S.addText('common-title', 0, -2.7, '共同点：', { size: 17, color: '#f9a825', anchorX: 'middle' });
          S.addText('common-1', 0, -3.7, '① 每个点都沿<同一方向>移动', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('common-2', 0, -4.7, '② 每个点移动的<距离相同>', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('common-3', 0, -5.7, '③ 形状和大小<完全不变>', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('intro-def', 0, -6.6, '这种变换——就叫做  平移！', { size: 17, color: BLUE, anchorX: 'middle' });
          P.renderCard(
            '<b>共同点归纳</b><br><br>' +
            '① 各点沿<b>同一方向</b>移动<br>' +
            '② 各点移动<b>距离相同</b><br>' +
            '③ 形状大小<b>不改变</b><br><br>' +
            '这种图形变换 → <b>平移</b>',
            null, 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
