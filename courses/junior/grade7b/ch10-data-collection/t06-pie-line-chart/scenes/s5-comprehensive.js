(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';

  // 综合题数据：某班40名学生兴趣爱好扇形图（总数取40，各项人数均为整数）
  var ITEMS    = ['阅读', '运动', '音乐', '绘画', '其他'];
  var PERCENTS = [30, 25, 20, 15, 10];  // 百分比
  var ANGLES   = [108, 90, 72, 54, 36]; // 圆心角
  var COLORS   = [BLUE, WARM, GREEN, PURPLE, '#795548'];
  var TOTAL    = 40;

  // 扇形圆心
  var CX = 0, CY = 0, R = 3.5;
  var startAngles = [];

  function computeStarts() {
    var a = 90;
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      startAngles[i] = a;
      a += ANGLES[i];
    }
  }

  // 画完整扇形图
  function drawPieChart(offx, offy) {
    var ox = offx || 0, oy = offy || 0;
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      S.addSector('s5-sec' + i, [CX + ox, CY + oy], R,
        startAngles[i], startAngles[i] + ANGLES[i],
        { color: COLORS[i], fillOpacity: 0.75 });
      var mid = (startAngles[i] + ANGLES[i] / 2) * Math.PI / 180;
      var lx = (CX + ox) + (R + 1.2) * Math.cos(mid);
      var ly = (CY + oy) + (R + 1.2) * Math.sin(mid);
      S.addText('s5-lbl' + i, lx, ly,
        ITEMS[i] + ' ' + PERCENTS[i] + '%',
        { size: 12, color: COLORS[i], anchorX: 'middle' });
    }
    S.addText('s5-title', CX + ox, CY + oy + 5.2,
      '某班40名学生兴趣爱好扇形图',
      { size: 13, color: INK, anchorX: 'middle' });
  }

  var scene = {
    id: 's5',
    title: '五、综合读图练习',
    board: { axis: false, keepAspect: true },
    bbox: [-9, 8, 9, -8],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      computeStarts();
    },
    steps: [
      {
        narration: '综合练习时间！下面是某班40名学生兴趣爱好的扇形统计图。请仔细观察扇形的大小，回答问题：（1）哪种兴趣爱好的同学最多？最少？（2）喜欢阅读的同学有多少人？（3）喜欢运动和音乐的同学共有多少人？',
        enter: function () {
          drawPieChart(-2, 0);
          P.renderCard(
            '<b>读图练习题</b>：<br>' +
            '（共40名学生）<br><br>' +
            '① 哪种最多？哪种最少？<br>' +
            '② 喜欢阅读的有多少人？<br>' +
            '③ 运动+音乐共多少人？'
          );
        },
      },
      {
        narration: '来看答案！（1）阅读扇形最大（30%）→最多；其他扇形最小（10%）→最少。（2）喜欢阅读的人数 = 总数×百分比 = $40 \\times 30\\% = 12$ 人。（3）运动 $40 \\times 25\\% = 10$ 人，音乐 $40 \\times 20\\% = 8$ 人，两项合计 $10 + 8 = 18$ 人。记住：人数 = 总数 × 百分比。',
        enter: function () {
          drawPieChart(-4.5, 0);
          // 右侧解答
          S.addText('s5-ans0', 1.5, 6.0, '解题过程：', { size: 14, color: INK });
          S.addText('s5-ans1', 1.5, 4.5,
            '① 最多：阅读（30%）',
            { size: 13, color: BLUE });
          S.addText('s5-ans2', 1.5, 3.0,
            '   最少：其他（10%）',
            { size: 13, color: BLUE });
          S.addText('s5-ans3', 1.5, 1.5,
            '② 阅读：$40 \\times 30\\% = 12$ 人',
            { size: 13, color: WARM });
          S.addText('s5-ans4', 1.5, 0.0,
            '③ 运动：$40 \\times 25\\% = 10$ 人',
            { size: 13, color: GREEN });
          S.addText('s5-ans5', 1.5, -1.5,
            '   音乐：$40 \\times 20\\% = 8$ 人',
            { size: 13, color: GREEN });
          S.addText('s5-ans6', 1.5, -3.0,
            '   合计：$10 + 8 = 18$ 人',
            { size: 13, color: GREEN });
          S.addText('s5-note', 1.5, -5.0,
            '注：人数 = 总数 × 百分比',
            { size: 12, color: PURPLE });
          P.renderTable({
            head: ['兴趣', '百分比', '人数'],
            rows: [
              ['阅读', '30%', '12人'],
              ['运动', '25%', '10人'],
              ['音乐', '20%', '8人'],
              ['绘画', '15%', '6人'],
              ['其他', '10%', '4人'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
