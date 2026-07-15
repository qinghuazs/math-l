// s5-summary.js  小结（2步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-6, 6, 6, -6],
    board: { grid: false },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：用坐标表示位置的方法小结
        narration: '好，我们来做今天的课堂小结。用坐标描述位置，分三步走：<b>第一步，建立坐标系</b>——选好原点，确定两轴方向和单位长度；<b>第二步，读/描坐标</b>——根据点的位置读出坐标，或根据坐标找到点的位置；<b>第三步，分析图形</b>——通过顶点坐标，判断图形的形状、大小和位置关系。记住几个关键结论：同 $x$ 坐标→竖直；同 $y$ 坐标→水平；相邻边同 $x$ 或同 $y$ 且成直角→直角图形。',
        enter: function (anim) {
          // 标题
          S.addText('sum-title', 0, 5.1, '本节课总结', { size: 18, color: BLUE, anchorX: 'middle' });

          // 三步流程
          S.addText('step1-title', -5.5, 3.8, '第一步：建立坐标系', { size: 15, color: RED });
          S.addText('step1-1', -5.2, 3.0, '• 选原点（关键点落在轴上/原点为佳）', { size: 13, color: INK });
          S.addText('step1-2', -5.2, 2.3, '• 确定两轴方向和单位长度', { size: 13, color: INK });

          S.addText('step2-title', -5.5, 1.4, '第二步：读/描坐标', { size: 15, color: ORANGE });
          S.addText('step2-1', -5.2, 0.6, '• 图形→坐标：读出每个顶点 $(x,y)$', { size: 13, color: INK });
          S.addText('step2-2', -5.2,-0.1, '• 坐标→图形：描点连线，还原图形', { size: 13, color: INK });

          S.addText('step3-title', -5.5,-1.0, '第三步：分析图形', { size: 15, color: GREEN });
          S.addText('step3-1', -5.2,-1.8, '• 同 $x$ 坐标 → 竖直线段', { size: 13, color: INK });
          S.addText('step3-2', -5.2,-2.5, '• 同 $y$ 坐标 → 水平线段', { size: 13, color: INK });
          S.addText('step3-3', -5.2,-3.2, '• 水平⊥竖直 → 可判断直角/面积等', { size: 13, color: INK });

          // 关键提醒
          S.addText('remind', 0, -4.5,
            '坐标 = 相对量，须先约定坐标系！',
            { size: 13, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>用坐标表示位置·三步法</b><br><br>' +
            '① 建立坐标系（选原点+单位）<br>' +
            '② 读/描坐标<br>' +
            '③ 分析图形（位置关系）<br><br>' +
            '同 $x$ → 竖直；同 $y$ → 水平<br>' +
            '<b>坐标依赖坐标系，须先约定！</b>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：引出下节"坐标与平移"
        narration: '今天我们学习了如何用坐标表示图形和地点的位置，这是平面直角坐标系最核心的应用。那么，如果一个图形发生了<b>平移</b>，比如向右平移3格、向上平移2格，它的各顶点坐标会怎么变化呢？有没有规律？这正是我们下一节课要探讨的内容——<b>坐标与平移</b>！带着这个问题，大家课后可以先思考一下：平移前后坐标的差值有什么特点？下节课见！',
        enter: function (anim) {
          // 清除上一步内容
          S.remove('sum-title');
          S.remove('step1-title'); S.remove('step1-1'); S.remove('step1-2');
          S.remove('step2-title'); S.remove('step2-1'); S.remove('step2-2');
          S.remove('step3-title'); S.remove('step3-1'); S.remove('step3-2'); S.remove('step3-3');
          S.remove('remind');

          // 下节预告
          S.addText('next-title', 0, 4.5, '下节课预告', { size: 18, color: PURPLE, anchorX: 'middle' });
          S.addText('next-q', 0, 3.2, '平移后，顶点坐标怎么变？', { size: 16, color: BLUE, anchorX: 'middle' });

          // 示例：三角形平移示意
          // 原三角形
          S.addPolygon('tri-orig',
            [[-4, 1], [-1, 1], [-4, -2]],
            { fillColor: '#bbdefb', fillOpacity: 0.5, strokeColor: BLUE, strokeWidth: 2 });
          S.dropPoint('orig-A', -4, 1, { color: BLUE, name: "A'", size: 3.5, labelOffset: [-18, 6] });
          S.dropPoint('orig-B', -1, 1, { color: BLUE, name: "B'", size: 3.5, labelOffset: [6, 6] });
          S.dropPoint('orig-C', -4, -2, { color: BLUE, name: "C'", size: 3.5, labelOffset: [-18, -16] });

          // 平移后三角形（右3，上2）
          S.addPolygon('tri-new',
            [[-1, 3], [2, 3], [-1, 0]],
            { fillColor: '#c8e6c9', fillOpacity: 0.5, strokeColor: GREEN, strokeWidth: 2 });
          S.dropPoint('new-A', -1, 3, { color: GREEN, name: "A''", size: 3.5, labelOffset: [-18, 6] });
          S.dropPoint('new-B', 2, 3,  { color: GREEN, name: "B''", size: 3.5, labelOffset: [6, 6] });
          S.dropPoint('new-C', -1, 0, { color: GREEN, name: "C''", size: 3.5, labelOffset: [-18, -16] });

          // 平移箭头
          S.addSegment('arr1', [-4, 1], [-1, 3], { color: ORANGE, width: 2, dash: 4 });
          S.addSegment('arr2', [-1, 1], [2, 3],  { color: ORANGE, width: 2, dash: 4 });
          S.addSegment('arr3', [-4, -2], [-1, 0], { color: ORANGE, width: 2, dash: 4 });

          S.addText('arrow-note', -0.5, 2.0, '向右3、向上2', { size: 13, color: ORANGE });

          S.addText('next-think', 0, -4.5,
            '思考：坐标变化有什么规律？',
            { size: 14, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>下节预告：坐标与平移</b><br><br>' +
            '图形平移后，各顶点坐标<br>有什么变化规律？<br><br>' +
            '向右平移 $a$ → $x$ 坐标 $+a$<br>' +
            '向上平移 $b$ → $y$ 坐标 $+b$<br><br>' +
            '下节课揭秘！',
            null, 'bounceIn'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
