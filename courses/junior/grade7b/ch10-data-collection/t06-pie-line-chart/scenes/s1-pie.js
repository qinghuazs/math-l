(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';
  var AMBER  = '#f57f17';
  var TEAL   = '#00695c';

  // 数据常量：某班40名学生上学方式
  var ITEMS   = ['步行', '骑车', '公交', '家长接送'];
  var COUNTS  = [8, 12, 16, 4];
  var TOTAL   = 40;
  var PERCENTS = [20, 30, 40, 10]; // 百分比
  var ANGLES  = [72, 108, 144, 36]; // 圆心角（度）
  var COLORS  = [BLUE, GREEN, WARM, PURPLE];

  // 扇形图圆心与半径（keepAspect 画板用单位坐标）
  var CX = 0, CY = 0, R = 4;

  // 标签偏移方向（各扇形中心角方向）
  // 起始角从 90°（正上方）开始逆时针排列
  var startAngles = []; // 各扇形起始角（度）
  var midAngles   = []; // 各扇形中间角（用于标签定位）

  function computeAngles() {
    var a = 90; // 从正上方（90°）开始
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      startAngles[i] = a;
      midAngles[i] = a + ANGLES[i] / 2;
      a += ANGLES[i];
    }
  }

  // 闭包：各扇形当前终止角（动画驱动）
  var curEnd = [0, 0, 0, 0];

  // 画单个扇形（逐块出现）
  function drawSector(idx, anim) {
    var a0 = startAngles[idx];
    var targetA1 = startAngles[idx] + ANGLES[idx];
    if (!anim) {
      S.addSector('s1-sec' + idx, [CX, CY], R, a0, targetA1, { color: COLORS[idx], fillOpacity: 0.78 });
      return Promise.resolve();
    }
    curEnd[idx] = a0;
    // 用 animate 驱动扇形终止角从 a0 增长到 targetA1
    return S.animate({
      from: a0,
      to: targetA1,
      duration: 600,
      easing: 'easeOutCubic',
      onUpdate: function (v) {
        curEnd[idx] = v;
        S.addSector('s1-sec' + idx, [CX, CY], R, a0, v, { color: COLORS[idx], fillOpacity: 0.78 });
      },
    }).then(function () {
      S.addSector('s1-sec' + idx, [CX, CY], R, a0, targetA1, { color: COLORS[idx], fillOpacity: 0.78 });
    });
  }

  // 画标签（扇形中间角方向 R+1.1 处）
  function drawLabel(idx) {
    var mid = midAngles[idx] * Math.PI / 180;
    var lx = CX + (R + 1.3) * Math.cos(mid);
    var ly = CY + (R + 1.3) * Math.sin(mid);
    S.addText('s1-lbl' + idx, lx, ly,
      ITEMS[idx] + '\n' + PERCENTS[idx] + '%',
      { size: 13, color: COLORS[idx], anchorX: 'middle' }
    );
  }

  // 逐块画所有扇形
  function growAllSectors(anim) {
    var p = Promise.resolve();
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      (function (idx) {
        p = p.then(function () { return drawSector(idx, anim); });
      })(i);
    }
    return p;
  }

  // 画所有标签
  function drawAllLabels() {
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      drawLabel(i);
    }
  }

  // 画圆心角示意卡
  function drawAngleCard() {
    P.renderCard(
      '<b>圆心角计算</b>：<br>' +
      '$圆心角 = 百分比 \\times 360°$<br>' +
      '步行 20%：$20\\% \\times 360° = 72°$<br>' +
      '骑车 30%：$30\\% \\times 360° = 108°$<br>' +
      '公交 40%：$40\\% \\times 360° = 144°$<br>' +
      '家长接送 10%：$10\\% \\times 360° = 36°$'
    );
  }

  var scene = {
    id: 's1',
    title: '一、扇形统计图：部分与整体',
    board: { axis: false, keepAspect: true },
    bbox: [-7, 7, 7, -7],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      curEnd = [0, 0, 0, 0];
      computeAngles();
    },
    steps: [
      {
        narration: '同学们，我们已经学会了条形统计图。今天来认识另外两种统计图——<b>扇形统计图</b>和<b>折线统计图</b>。先看扇形图！某班40名同学上学方式调查结果：步行8人、骑车12人、公交16人、家长接送4人。整个圆代表全部40人，每个扇形代表一种方式，扇形的大小反映该方式所占的比例。',
        enter: function () {
          // 画整圆轮廓
          S.addCircle('s1-outline', CX, CY, R, { color: INK, width: 2, fillOpacity: 0 });
          S.addText('s1-title', CX, 5.5, '某班同学上学方式扇形统计图', { size: 14, color: INK, anchorX: 'middle' });
          P.renderTable({
            head: ['上学方式', '人数（人）'],
            rows: [
              ['步行',   '8'],
              ['骑车',   '12'],
              ['公交',   '16'],
              ['家长接送', '4'],
              ['合计',   '40'],
            ],
          });
        },
      },
      {
        narration: '现在我们逐块画出各扇形！注意看——每块扇形从圆心出发，像切蛋糕一样一块一块出现。扇形越大，说明该方式所占比例越高。公交（蓝色）最大，家长接送（紫色）最小。',
        enter: function (anim) {
          S.addText('s1-title', CX, 5.5, '某班同学上学方式扇形统计图', { size: 14, color: INK, anchorX: 'middle' });
          return growAllSectors(anim).then(function () {
            drawAllLabels();
          });
        },
      },
      {
        narration: '扇形图画好了！从图中可以直观看出：<b>公交</b>扇形最大（占40%），<b>家长接送</b>扇形最小（占10%）。扇形统计图最大的优势在于——一眼看出各部分<b>占整体的比例</b>，非常适合表示结构与构成！',
        enter: function (anim) {
          S.addText('s1-title', CX, 5.5, '某班同学上学方式扇形统计图', { size: 14, color: INK, anchorX: 'middle' });
          var i;
          for (i = 0; i < ITEMS.length; i++) {
            S.addSector('s1-sec' + i, [CX, CY], R, startAngles[i], startAngles[i] + ANGLES[i], { color: COLORS[i], fillOpacity: 0.78 });
          }
          drawAllLabels();
          drawAngleCard();
        },
      },
      {
        narration: '圆心角怎么算？公式很简单：$圆心角 = 百分比 \\times 360°$。公交占40%，圆心角就是 $40\\% \\times 360° = 144°$。整个圆是360°代表100%，每1%对应3.6°。扇形图的圆心角大小，就是该类别占总体的比例！',
        enter: function (anim) {
          S.addText('s1-title', CX, 5.5, '某班同学上学方式扇形统计图', { size: 14, color: INK, anchorX: 'middle' });
          var i;
          for (i = 0; i < ITEMS.length; i++) {
            S.addSector('s1-sec' + i, [CX, CY], R, startAngles[i], startAngles[i] + ANGLES[i], { color: COLORS[i], fillOpacity: 0.78 });
          }
          drawAllLabels();
          // 高亮公交扇形并标注角度
          var a0 = startAngles[2] * Math.PI / 180;
          var a1 = (startAngles[2] + ANGLES[2]) * Math.PI / 180;
          S.addText('s1-angle-tip', CX + 0.6 * R * Math.cos((startAngles[2] + ANGLES[2] / 2) * Math.PI / 180),
            CY + 0.6 * R * Math.sin((startAngles[2] + ANGLES[2] / 2) * Math.PI / 180),
            '$144°$', { size: 16, color: '#fff', anchorX: 'middle' });
          drawAngleCard();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
