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
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-8, 7, 8, -7],
    board: { grid: false },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：坐标方法应用三步法
        narration: '好，我们来做今天的课堂小结。坐标方法解决实际问题，分三步走：第一步，建立坐标系——选合适原点（让尽量多的关键点坐标简单），确定方向和单位；第二步，定坐标——根据实际位置，读出各点的坐标 $(x,y)$；第三步，用坐标计算——水平距离 $|x_1-x_2|$，竖直距离 $|y_1-y_2|$；根据坐标变化描述路线方向。这三步是坐标方法的核心流程，以后遇到位置类应用题，都按这个流程来！',
        enter: function (anim) {
          // 标题
          S.addText('sum-title', 0, 6.2, '坐标方法应用三步法', { size: 18, color: BLUE, anchorX: 'middle' });

          // 三步流程框（用 addPolygon 画背景色框，注意 ASCII 减号）
          S.addPolygon('box1', [[-7.5, 4.8], [-2.5, 4.8], [-2.5, 2.8], [-7.5, 2.8]],
            { fillColor: '#ffebee', fillOpacity: 0.8, strokeColor: RED, strokeWidth: 2 });
          S.addPolygon('box2', [[-2.0, 4.8], [2.0, 4.8], [2.0, 2.8], [-2.0, 2.8]],
            { fillColor: '#e3f2fd', fillOpacity: 0.8, strokeColor: BLUE, strokeWidth: 2 });
          S.addPolygon('box3', [[2.5, 4.8], [7.5, 4.8], [7.5, 2.8], [2.5, 2.8]],
            { fillColor: '#e8f5e9', fillOpacity: 0.8, strokeColor: GREEN, strokeWidth: 2 });

          S.addText('b1-title', -7.2, 4.3, '① 建立坐标系', { size: 15, color: RED });
          S.addText('b1-sub',   -7.2, 3.5, '选原点·定单位', { size: 13, color: INK });

          S.addText('arr1', -2.3, 3.8, '→', { size: 20, color: ORANGE });

          S.addText('b2-title', -1.8, 4.3, '② 定坐标', { size: 15, color: BLUE });
          S.addText('b2-sub',   -1.8, 3.5, '读出各点 $(x,y)$', { size: 13, color: INK });

          S.addText('arr2',  2.2, 3.8, '→', { size: 20, color: ORANGE });

          S.addText('b3-title', 2.8, 4.3, '③ 用坐标计算', { size: 15, color: GREEN });
          S.addText('b3-sub',   2.8, 3.5, '距离·路线·关系', { size: 13, color: INK });

          // 核心公式
          S.addText('f-title', -7.5, 2.0, '核心公式：', { size: 14, color: PURPLE });
          S.addText('f1', -7.5, 1.2, '水平距离：$y$ 相同时 $|AB|=|x_2-x_1|$', { size: 13, color: ORANGE });
          S.addText('f2', -7.5, 0.4, '竖直距离：$x$ 相同时 $|AB|=|y_2-y_1|$', { size: 13, color: ORANGE });

          // 方向口诀
          S.addText('mnemonic-title', -7.5, -0.5, '方向口诀：', { size: 14, color: TEAL });
          S.addText('mnemonic1', -7.5, -1.3, '$x$ 正对应东，$x$ 负对应西；$y$ 正对应北，$y$ 负对应南', { size: 13, color: TEAL });
          S.addText('mnemonic2', -7.5, -2.1, '$x$ 变化对应东西方向；$y$ 变化对应南北方向', { size: 13, color: INK });

          // 建系原则
          S.addText('principle', 0, -3.2,
            '建系原则：让关键点坐标尽量简单（选对称中心或主要地点为原点）',
            { size: 12, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>坐标方法·三步法</b><br><br>' +
            '① 建系（选原点+单位）<br>' +
            '② 定坐标（读出各点位置）<br>' +
            '③ 用坐标算（距离/路线）<br><br>' +
            '水平：$|AB|=|x_2-x_1|$<br>' +
            '竖直：$|AB|=|y_2-y_1|$<br><br>' +
            '<b>$x$ 管东西，$y$ 管南北</b>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：作业卡
        narration: '最后留三道作业题，帮助大家巩固今天所学。第一题：已知 $A(-3,0)$，$B(2,0)$，求 $|AB|$。提示：$y$ 坐标都是0，在 $x$ 轴上，用水平距离公式。第二题：小红从 $O(0,0)$ 出发，向东走3格，再向北走4格，到达终点 $D$，求 $D$ 的坐标。第三题：社区中学校在 $S(1,2)$，图书馆在 $L(1,-3)$，请计算从学校到图书馆的距离，并描述路线方向。课后认真完成，下节课分享！',
        enter: function (anim) {
          // 清除上一步
          S.remove('sum-title');
          S.remove('box1'); S.remove('box2'); S.remove('box3');
          S.remove('b1-title'); S.remove('b1-sub');
          S.remove('b2-title'); S.remove('b2-sub');
          S.remove('b3-title'); S.remove('b3-sub');
          S.remove('arr1'); S.remove('arr2');
          S.remove('f-title'); S.remove('f1'); S.remove('f2');
          S.remove('mnemonic-title'); S.remove('mnemonic1'); S.remove('mnemonic2');
          S.remove('principle');

          // 作业卡标题
          S.addText('hw-title', 0, 6.0, '课后作业', { size: 20, color: PURPLE, anchorX: 'middle' });

          // 题目1
          S.addText('hw1-no',   -7.5, 4.8, '第1题', { size: 15, color: RED });
          S.addText('hw1-q',    -7.5, 4.0, '已知 $A(-3,0)$，$B(2,0)$，求 $|AB|$。', { size: 13, color: INK });
          S.addText('hw1-hint', -7.5, 3.2, '提示：两点都在 $x$ 轴上，用水平距离公式', { size: 12, color: ORANGE });

          // 题目2
          S.addText('hw2-no',   -7.5, 2.2, '第2题', { size: 15, color: BLUE });
          S.addText('hw2-q',    -7.5, 1.4,
            '从 $O(0,0)$ 向东走3格，再向北走4格，到达 $D$，', { size: 13, color: INK });
          S.addText('hw2-q2',   -7.5, 0.6,
            '求 $D$ 的坐标。（拓展：$|OD|=5$ 格吗？）', { size: 13, color: INK });
          S.addText('hw2-hint', -7.5, -0.2, '提示：东对应 $x$ 加，北对应 $y$ 加', { size: 12, color: ORANGE });

          // 题目3
          S.addText('hw3-no',   -7.5, -1.2, '第3题', { size: 15, color: GREEN });
          S.addText('hw3-q',    -7.5, -2.0,
            '学校 $S(1,2)$，图书馆 $L(1,-3)$，', { size: 13, color: INK });
          S.addText('hw3-q2',   -7.5, -2.8,
            '计算 $|SL|$，并描述路线方向。', { size: 13, color: INK });
          S.addText('hw3-hint', -7.5, -3.6, '提示：$x$ 相同，用竖直距离公式', { size: 12, color: ORANGE });

          // 结语
          S.addText('ending', 0, -5.2,
            '课后认真完成，下节课分享！加油！',
            { size: 14, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>课后作业（3题）</b><br><br>' +
            '<b>①</b> $A(-3,0)$，$B(2,0)$，$|AB|=?$<br><br>' +
            '<b>②</b> 从 $O(0,0)$ 东走3、北走4<br>' +
            '终点 $D$ 坐标是？<br><br>' +
            '<b>③</b> $S(1,2)$，$L(1,-3)$<br>' +
            '$|SL|=?$ 方向如何？'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
