// s4-task.js  设计任务与评价（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var TEAL   = '#00695c';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画方格纸背景（浅蓝色格子），范围 x: xl~xr, y: yb~yt，格子大小 gs
  function drawGrid(xl, xr, yb, yt, gs, gcolor) {
    var x, y, idx;
    idx = 0;
    for (x = xl; x <= xr; x += gs) {
      S.addSegment('grid-v-' + idx, [x, yb], [x, yt],
        { color: gcolor || '#b3e5fc', width: 1, dash: 0 });
      idx++;
    }
    for (y = yb; y <= yt; y += gs) {
      S.addSegment('grid-h-' + idx, [xl, y], [xr, y],
        { color: gcolor || '#b3e5fc', width: 1, dash: 0 });
      idx++;
    }
  }

  // 简单三角形（基本图形示例）顶点：以 (ax, ay) 为左下角，宽 w 高 h
  function triPts(ax, ay, w, h) {
    return [
      [ax,         ay],
      [ax + w,     ay],
      [ax + w / 2, ay + h],
    ];
  }

  var scene = {
    id: 's4',
    title: '四、设计任务与评价',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：出示设计任务卡
        narration: '现在轮到你们大显身手了！下面是这节课的设计任务——在方格纸上，选一个你喜欢的简单图形作为基本图形，然后沿一个方向连续平移，设计出一条美丽的花边！记住四个要点：方向一致、距离一致、排列有规律、标出基本图形和对应点！',
        enter: function (anim) {
          S.addText('title', 0, 6.5, '花边设计任务', { size: 22, color: BLUE, anchorX: 'middle' });

          // 任务卡背景
          S.addPolygon('card-bg',
            [[-9.5, 5.5], [9.5, 5.5], [9.5, 1.2], [-9.5, 1.2]],
            { fillColor: '#fff3e0', strokeColor: ORANGE, strokeWidth: 3, fillOpacity: 0.95 });
          S.addText('card-title', 0, 5.0, '★ 设计任务卡',
            { size: 18, color: ORANGE, anchorX: 'middle' });
          S.addText('card-t1', -9.0, 4.1,
            '在方格纸上，选择一个简单基本图形，沿水平方向或竖直方向连续平移，',
            { size: 13, color: INK, anchorX: 'left' });
          S.addText('card-t2', -9.0, 3.3,
            '设计一条花边图案。',
            { size: 13, color: INK, anchorX: 'left' });

          S.addText('req-title', -9.0, 2.5, '要求：', { size: 14, color: ORANGE, anchorX: 'left' });
          S.addText('req-1', -8.5, 1.9, '① 平移方向一致（只选一个方向）',
            { size: 13, color: INK, anchorX: 'left' });

          // 演示区：方格纸 + 示例三角形花边
          drawGrid(-9.5, 9.5, -6.8, 0.8, 1.0, '#e3f2fd');

          // 示例：一排三角形
          var i;
          for (i = 0; i < 6; i++) {
            S.addPolygon('demo-tri-' + i, triPts(-8.5 + i * 3.0, -3.2, 2.4, 1.8),
              { fillColor: '#ffe082', strokeColor: GOLD, strokeWidth: 2, fillOpacity: 0.9 });
          }
          S.addText('demo-lbl', 0, -5.2, '（示例：三角形花边）',
            { size: 13, color: GOLD, anchorX: 'middle' });

          P.renderCard(
            '<b>设计任务</b><br><br>' +
            '在方格纸上设计一条花边<br><br>' +
            '要求：<br>' +
            '① 选一个基本图形<br>' +
            '② 沿水平或竖直方向平移<br>' +
            '③ 方向距离一致<br>' +
            '④ 标出基本图形和对应点'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：补充要求细节 + 强调数学标注
        narration: '设计的时候，请特别注意——平移距离要一致，每个图形之间的间隔要相同；而且，一定要在图案中标出一个基本图形，并且找到一对对应点，用线段连起来，注明 A 和 A\' ——这才是完整的数学表达！单纯画得好看还不够，数学的表达才是重点。',
        enter: function (anim) {
          // 清除任务卡中的要求，补充完整4条
          S.remove('req-title'); S.remove('req-1');

          S.addText('req-title2', -9.0, 2.5, '要求（全）：',
            { size: 14, color: ORANGE, anchorX: 'left' });
          S.addText('req-a', -8.5, 1.9, '① 平移方向一致',
            { size: 13, color: INK, anchorX: 'left' });
          S.addText('req-b', -8.5, 1.3, '② 平移距离一致',
            { size: 13, color: INK, anchorX: 'left' });
          S.addText('req-c', 0.5, 1.9, '③ 图案排列有规律',
            { size: 13, color: TEAL, anchorX: 'left' });
          S.addText('req-d', 0.5, 1.3, "④ 标出基本图形及对应点 A → A'",
            { size: 13, color: PURPLE, anchorX: 'left' });

          // 在示例上，标出第0个三角形为基本图形
          S.addPolygon('base-hi',
            [[-9.0, -1.2], [-6.0, -1.2], [-6.0, -5.5], [-9.0, -5.5]],
            { fillColor: '#e8f5e9', strokeColor: GREEN, strokeWidth: 3, fillOpacity: 0.6 });
          S.addText('base-hi-lbl', -7.5, -0.8, '基本图形',
            { size: 12, color: GREEN, anchorX: 'middle' });

          // 对应点连线示例：三角形左下角 A→A'
          S.dropPoint('ex-A', -8.5, -3.2, { color: '#c62828', name: 'A', size: 3.5 });
          S.dropPoint('ex-A2', -5.5, -3.2, { color: '#c62828', name: "A'", size: 3.5 });
          S.addSegment('ex-corr', [-8.5, -3.2], [-5.5, -3.2],
            { color: '#c62828', width: 2.5, dash: 0 });
          S.addText('ex-A-lbl', -8.5, -3.7, 'A', { size: 12, color: '#c62828', anchorX: 'middle' });
          S.addText('ex-A2-lbl', -5.5, -3.7, "A'", { size: 12, color: '#c62828', anchorX: 'middle' });

          P.renderCard(
            '<b>数学表达要求</b><br><br>' +
            '必须在图案中：<br>' +
            '• 框出<b>基本图形</b>（一个单元）<br>' +
            "• 标出 <b>A</b> 和 <b>A'</b> 两个对应点<br>" +
            "• 连线 <b>AA'</b>（即平移向量）<br><br>" +
            '这才是完整的数学描述！'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：展示评价标准表
        narration: '最后，我们来看一下评价标准。这张表格有四个维度：数学正确性、图案规律性、视觉效果、数学表达。做到这四点，你的花边作品就是一件有数学含金量的艺术品！希望同学们大胆发挥，设计出最有创意的花边图案！',
        enter: function (anim) {
          // 清除前面所有内容
          var i;
          for (i = 0; i < 6; i++) { S.remove('demo-tri-' + i); }
          S.remove('demo-lbl');
          S.remove('card-bg'); S.remove('card-title');
          S.remove('card-t1'); S.remove('card-t2');
          S.remove('req-title2');
          S.remove('req-a'); S.remove('req-b'); S.remove('req-c'); S.remove('req-d');
          S.remove('base-hi'); S.remove('base-hi-lbl');
          S.remove('ex-A'); S.remove('ex-A2'); S.remove('ex-corr');
          S.remove('ex-A-lbl'); S.remove('ex-A2-lbl');
          // 清除格子
          var j;
          for (j = 0; j < 50; j++) {
            S.remove('grid-v-' + j);
            S.remove('grid-h-' + j);
          }

          S.addText('eval-title', 0, 6.5, '花边设计评价标准', { size: 22, color: BLUE, anchorX: 'middle' });

          P.renderTable({
            head: ['评价维度', '评价要求', '你的表现'],
            rows: [
              ['数学正确性', '符合平移的方向和距离要求', '☐'],
              ['图案规律性', '重复排列清楚、有序', '☐'],
              ['视觉效果',   '图案美观、完整', '☐'],
              ['数学表达',   '能说明基本图形和平移过程，标出对应点', '☐'],
            ]
          });

          // 底部鼓励语
          S.addPolygon('enc-bg',
            [[-9.5, -5.0], [9.5, -5.0], [9.5, -7.2], [-9.5, -7.2]],
            { fillColor: '#f3e5f5', strokeColor: '#6a1b9a', strokeWidth: 2, fillOpacity: 0.9 });
          S.addText('enc-t1', 0, -5.6,
            '利用平移设计图案，数学与艺术相融合！',
            { size: 16, color: PURPLE, anchorX: 'middle' });
          S.addText('enc-t2', 0, -6.4,
            '平移的三个不变：形状不变 · 大小不变 · 方向不变',
            { size: 15, color: TEAL, anchorX: 'middle' });
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
