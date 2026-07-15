// s3-design.js  花边设计演示（5步）★核心
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
  var RED    = '#c62828';
  var PINK   = '#ad1457';
  var CYAN   = '#00838f';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // ===== 基本图形：小鱼（3个多边形拼成） =====
  // 小鱼 = 鱼身（椭圆近似用多边形）+ 鱼尾（三角形）+ 鱼眼（小菱形）
  // 锚点 (ax, ay) 为鱼身左侧中心点

  // 鱼身：8边形近似椭圆，宽 bw 高 bh
  function fishBodyPts(ax, ay, bw, bh) {
    var hw = bw / 2;
    var hh = bh / 2;
    var cx = ax + hw;
    var cy = ay;
    return [
      [cx - hw,       cy],
      [cx - hw * 0.7, cy + hh * 0.85],
      [cx,            cy + hh],
      [cx + hw * 0.7, cy + hh * 0.7],
      [cx + hw,       cy],
      [cx + hw * 0.7, cy - hh * 0.7],
      [cx,            cy - hh],
      [cx - hw * 0.7, cy - hh * 0.85],
    ];
  }

  // 鱼尾：三角形，附着于鱼身左侧
  function fishTailPts(ax, ay, bh) {
    var hh = bh / 2;
    return [
      [ax,           ay],
      [ax - bh * 0.8, ay + hh * 1.1],
      [ax - bh * 0.8, ay - hh * 1.1],
    ];
  }

  // 鱼眼：小菱形（近鱼头处）
  function fishEyePts(ax, ay, bw, bh) {
    var eyeR = bh * 0.18;
    var cx = ax + bw * 0.7;
    var cy = ay + bh * 0.15;
    return [
      [cx,        cy + eyeR],
      [cx + eyeR, cy],
      [cx,        cy - eyeR],
      [cx - eyeR, cy],
    ];
  }

  // 闭包变量（setup重置）
  var fishActors;   // actor数组，用于水平花边行1
  var row2Actors;   // 第二行花边

  // 绘制第 idx 条鱼（静态），锚点 ax, ay
  function drawFish(idx, ax, ay, bodyColor, tailColor) {
    var bw = 2.6, bh = 1.4;
    S.addPolygon('fish-body-' + idx, fishBodyPts(ax, ay, bw, bh),
      { fillColor: bodyColor || '#80deea', strokeColor: TEAL, strokeWidth: 2, fillOpacity: 0.9 });
    S.addPolygon('fish-tail-' + idx, fishTailPts(ax, ay, bh),
      { fillColor: tailColor || '#4dd0e1', strokeColor: TEAL, strokeWidth: 2, fillOpacity: 0.9 });
    S.addPolygon('fish-eye-' + idx, fishEyePts(ax, ay, bw, bh),
      { fillColor: '#ffffff', strokeColor: TEAL, strokeWidth: 1.5, fillOpacity: 1 });
  }

  // 清除第 idx 条鱼
  function removeFish(idx) {
    S.remove('fish-body-' + idx);
    S.remove('fish-tail-' + idx);
    S.remove('fish-eye-' + idx);
  }

  // 用 actor 绘制可以移动的鱼（三部分文字近似 + 位移）
  // 注意：actor 只支持文本移动，这里我们用 S.animate 配合闭包坐标重绘来实现位移效果
  // 实际上对于多边形平移，我们用重绘动画：删旧画新，用 animate 驱动 ax 变化

  var scene = {
    id: 's3',
    title: '三、花边设计演示',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true, grid: true },
    expectSteps: 5,
    setup: function (stage, panel) {
      S = stage; P = panel;
      fishActors = [];
      row2Actors = [];
    },
    steps: [
      {
        // 步骤1：出示基本图形——小鱼组合
        narration: '下面进入今天的核心环节——花边设计演示！我们用"小鱼"作为基本图形。小鱼是由鱼身、鱼尾、鱼眼三个部分拼成的组合图形。请大家先看清楚这条小鱼的形状，记住它——因为它接下来要变成一整条花边！',
        enter: function (anim) {
          S.addText('title', 0, 6.5, '花边设计演示：以小鱼为基本图形', { size: 18, color: TEAL, anchorX: 'middle' });

          // 只画第0条鱼，居中展示，大一些
          var ax = -1.3, ay = 2.0;
          var bw = 2.6, bh = 1.4;
          S.addPolygon('demo-body', fishBodyPts(ax, ay, bw, bh),
            { fillColor: '#80deea', strokeColor: TEAL, strokeWidth: 3, fillOpacity: 0.95 });
          S.addPolygon('demo-tail', fishTailPts(ax, ay, bh),
            { fillColor: '#4dd0e1', strokeColor: TEAL, strokeWidth: 3, fillOpacity: 0.95 });
          S.addPolygon('demo-eye', fishEyePts(ax, ay, bw, bh),
            { fillColor: '#ffffff', strokeColor: TEAL, strokeWidth: 2, fillOpacity: 1 });

          // 标注各部分
          S.addText('lbl-body', ax + bw * 0.5, ay + bh / 2 + 0.6,
            '鱼身（椭圆形）', { size: 13, color: TEAL, anchorX: 'middle' });
          S.addText('lbl-tail', ax - bh * 0.8 - 0.5, ay + 0.3,
            '鱼尾（三角形）', { size: 13, color: TEAL, anchorX: 'middle' });
          S.addText('lbl-eye', ax + bw * 0.7 + 0.8, ay + bh * 0.15 + 0.4,
            '鱼眼（菱形）', { size: 13, color: CYAN, anchorX: 'middle' });

          // 括号标注"基本图形"
          S.addPolygon('base-frame',
            [[ax - 1.5, ay - 1.5], [ax + bw + 0.5, ay - 1.5],
             [ax + bw + 0.5, ay + 1.5], [ax - 1.5, ay + 1.5]],
            { fillColor: 'none', strokeColor: ORANGE, strokeWidth: 2.5,
              fillOpacity: 0, borderWidth: 0 });
          // 用 addPolygon 边框替代
          S.addText('base-title', ax + bw/2, ay - 2.0,
            '★ 基本图形（小鱼组合）', { size: 15, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>基本图形：小鱼</b><br><br>' +
            '由三个部分拼成：<br>' +
            '• 鱼身（椭圆形多边形）<br>' +
            '• 鱼尾（三角形）<br>' +
            '• 鱼眼（菱形）<br><br>' +
            '平移时三部分<b>整体移动</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：清理演示区，动画展示第1条鱼"生成"在左侧
        narration: '现在我们正式开始生成花边！首先，把基本图形——小鱼——放在最左边，这是我们的出发点。接下来它要向右一步一步地平移，每次移动 3.5 格，复制出新的小鱼！',
        enter: function (anim) {
          // 清除演示说明
          S.remove('demo-body'); S.remove('demo-tail'); S.remove('demo-eye');
          S.remove('lbl-body'); S.remove('lbl-tail'); S.remove('lbl-eye');
          S.remove('base-frame'); S.remove('base-title');

          // 在左侧画出第0条鱼（花边行基准，y=-1.0）
          var ax0 = -8.5, ay = -1.0;
          drawFish(0, ax0, ay, '#80deea', '#4dd0e1');

          // 高亮边框
          S.addPolygon('highlight-0',
            [[ax0 - 0.4, ay - 1.2], [ax0 + 3.2, ay - 1.2],
             [ax0 + 3.2, ay + 1.2], [ax0 - 0.4, ay + 1.2]],
            { fillColor: '#fff9c4', strokeColor: GOLD, strokeWidth: 3, fillOpacity: 0.3 });

          S.addText('fish-lbl-0', ax0 + 1.0, ay - 1.8,
            '基本图形（出发点）', { size: 13, color: GOLD, anchorX: 'middle' });

          P.renderCard(
            '<b>步骤 1：放置基本图形</b><br><br>' +
            '将小鱼放在最左侧<br>' +
            '这是花边的起点<br><br>' +
            '准备向右平移…'
          );
          if (anim) { return delay(500); }
        },
      },
      {
        // 步骤3：动画平移复制，逐个生成副本（核心动画）
        narration: '开始平移！——第一次右移 3.5 格，复制出第 ② 条小鱼；再右移 3.5 格，出现第 ③ 条；再移一次，第 ④ 条；再移，第 ⑤ 条！就这样，一条漂亮的鱼形花边生成了！注意，每条鱼的形状完全一样，只是位置不同。',
        enter: function (anim) {
          S.remove('highlight-0');
          S.remove('fish-lbl-0');

          var ay    = -1.0;
          var ax0   = -8.5;
          var stepX = 3.5;

          if (!anim) {
            // 快放：直接画出全部5条鱼
            var i;
            for (i = 1; i < 5; i++) {
              drawFish(i, ax0 + i * stepX, ay, '#80deea', '#4dd0e1');
            }
            // 标注平移向量
            S.addSegment('vec1', [ax0 + 2.6, ay + 1.5], [ax0 + stepX, ay + 1.5],
              { color: PURPLE, width: 2.5, dash: 0 });
            S.addPolygon('vec1-head',
              [[ax0 + stepX, ay + 1.8], [ax0 + stepX + 0.5, ay + 1.5], [ax0 + stepX, ay + 1.2]],
              { fillColor: PURPLE, strokeColor: PURPLE, strokeWidth: 1 });
            S.addText('vec1-lbl', ax0 + stepX / 2 + 1.3, ay + 2.1,
              '每次右移 3.5 格', { size: 13, color: PURPLE, anchorX: 'middle' });
            P.renderCard(
              '<b>花边第一行生成！</b><br><br>' +
              '共 5 条小鱼<br>' +
              '平移方向：→ 向右<br>' +
              '平移距离：每次 3.5 格<br><br>' +
              '形状·大小·方向<b>完全不变</b>'
            );
            return;
          }

          // 动画：用 animate 驱动，每条鱼从左侧滑入（ax 从 ax0 开始滑到目标位置）
          // 实际上是依次画出（有位置间隔感）配合简单延迟
          var drawOne = function (i) {
            // 用 animate 让鱼从上一个鱼的位置滑到当前位置
            var targetX = ax0 + i * stepX;
            var startX  = ax0 + (i - 1) * stepX;
            var curX    = startX;

            // 先在起始位置画出（透明度低）
            drawFish(i, curX, ay, '#b2ebf2', '#80deea');

            return S.animate({
              from: 0, to: 1, duration: 650, easing: 'easeInOutQuart',
              onUpdate: function (v) {
                curX = startX + (targetX - startX) * v;
                removeFish(i);
                drawFish(i, curX, ay,
                  v < 0.5 ? '#b2ebf2' : '#80deea',
                  v < 0.5 ? '#80deea' : '#4dd0e1');
              },
            });
          };

          return drawOne(1).then(function () {
            return delay(150);
          }).then(function () {
            return drawOne(2);
          }).then(function () {
            return delay(150);
          }).then(function () {
            return drawOne(3);
          }).then(function () {
            return delay(150);
          }).then(function () {
            return drawOne(4);
          }).then(function () {
            // 画平移标注
            S.addSegment('vec1', [ax0 + 2.6, ay + 1.5], [ax0 + stepX, ay + 1.5],
              { color: PURPLE, width: 2.5, dash: 0 });
            S.addPolygon('vec1-head',
              [[ax0 + stepX, ay + 1.8], [ax0 + stepX + 0.5, ay + 1.5], [ax0 + stepX, ay + 1.2]],
              { fillColor: PURPLE, strokeColor: PURPLE, strokeWidth: 1 });
            S.addText('vec1-lbl', ax0 + stepX / 2 + 1.3, ay + 2.1,
              '每次右移 3.5 格', { size: 13, color: PURPLE, anchorX: 'middle' });
            P.renderCard(
              '<b>花边第一行生成！</b><br><br>' +
              '共 5 条小鱼<br>' +
              '平移方向：→ 向右<br>' +
              '平移距离：每次 3.5 格<br><br>' +
              '形状·大小·方向<b>完全不变</b>'
            );
          });
        },
      },
      {
        // 步骤4：把整行花边向下平移，生成第二行（演示竖直方向平移）
        narration: '更漂亮的来了！我们还可以把整条花边向下再平移一次，生成第二行！方向换成竖直向下，距离是 3 格。注意第二行稍微错开了半个鱼身的距离，这样左右交错更有美感——这叫做"错位花边"！',
        enter: function (anim) {
          var ay    = -1.0;
          var ay2   = -1.0 - 3.0;   // 向下平移3格
          var ax0   = -8.5;
          var stepX = 3.5;
          var offset= stepX / 2;    // 错位半格

          if (!anim) {
            var i;
            for (i = 0; i < 5; i++) {
              drawFish(10 + i, ax0 + i * stepX + offset, ay2, '#f48fb1', '#f06292');
            }
            // 竖直平移箭头
            S.addSegment('vec-v', [ax0 + 1.3, ay - 1.3], [ax0 + 1.3, ay2 + 1.3],
              { color: GREEN, width: 2.5, dash: 0 });
            S.addPolygon('vec-v-head',
              [[ax0 + 0.95, ay2 + 1.3], [ax0 + 1.3, ay2 + 0.7], [ax0 + 1.65, ay2 + 1.3]],
              { fillColor: GREEN, strokeColor: GREEN, strokeWidth: 1 });
            S.addText('vec-v-lbl', ax0 + 2.8, (ay + ay2) / 2,
              '向下 3 格', { size: 13, color: GREEN, anchorX: 'left' });
            P.renderCard(
              '<b>第二行花边</b><br><br>' +
              '将整行花边向下平移 3 格<br>' +
              '并错位半格，增加美感<br><br>' +
              '平移方向：↓ 向下<br>' +
              '平移距离：3 格'
            );
            return;
          }

          // 动画：整行花边向下滑动
          var curY = ay;
          var i;
          // 先在 ay 位置画出5条粉色鱼（将要平移的行）
          for (i = 0; i < 5; i++) {
            drawFish(10 + i, ax0 + i * stepX + offset, curY, '#f48fb1', '#f06292');
          }

          return S.animate({
            from: 0, to: 1, duration: 1000, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              curY = ay + (ay2 - ay) * v;
              var j;
              for (j = 0; j < 5; j++) {
                removeFish(10 + j);
                drawFish(10 + j, ax0 + j * stepX + offset, curY, '#f48fb1', '#f06292');
              }
            },
          }).then(function () {
            // 竖直平移箭头
            S.addSegment('vec-v', [ax0 + 1.3, ay - 1.3], [ax0 + 1.3, ay2 + 1.3],
              { color: GREEN, width: 2.5, dash: 0 });
            S.addPolygon('vec-v-head',
              [[ax0 + 0.95, ay2 + 1.3], [ax0 + 1.3, ay2 + 0.7], [ax0 + 1.65, ay2 + 1.3]],
              { fillColor: GREEN, strokeColor: GREEN, strokeWidth: 1 });
            S.addText('vec-v-lbl', ax0 + 2.8, (ay + ay2) / 2,
              '向下 3 格', { size: 13, color: GREEN, anchorX: 'left' });
            P.renderCard(
              '<b>第二行花边</b><br><br>' +
              '将整行花边向下平移 3 格<br>' +
              '并错位半格，增加美感<br><br>' +
              '平移方向：↓ 向下<br>' +
              '平移距离：3 格'
            );
          });
        },
      },
      {
        // 步骤5：标注基本图形及其对应点连线，总结
        narration: '最后，我们来做一件数学上必须要做的事：标出"基本图形"和它的"对应点连线"。选第 ① 条鱼的鱼尾顶点 A，在第 ② 条鱼对应的位置标 A\'，连线 AA\' 就是我们的平移向量！注意 AA\' 的方向是向右，长度等于平移距离。这就完整地用数学语言描述了这个花边图案！',
        enter: function (anim) {
          var ay  = -1.0;
          var ay2 = -4.0;
          var ax0 = -8.5;

          // 标注第0条鱼的鱼尾顶点（锚点 ax0, ay → 尾尖在 ax0-1.12, ay）
          var ax = ax0;
          var bw = 2.6, bh = 1.4;
          var aTailX = ax - bh * 0.8;  // 鱼尾左尖
          var aTailY = ay;

          // 第1条鱼对应点
          var bTailX = ax + 3.5 - bh * 0.8;
          var bTailY = ay;

          S.dropPoint('pt-A', aTailX, aTailY, { color: RED, name: 'A', size: 4 });
          S.dropPoint('pt-A2', bTailX, bTailY, { color: RED, name: "A'", size: 4 });

          // 连线 AA'
          S.addSegment('corr-line', [aTailX, aTailY], [bTailX, bTailY],
            { color: RED, width: 3, dash: 0 });

          // 标注 A 和 A'
          S.addText('lbl-A', aTailX - 0.3, aTailY + 0.5, 'A',
            { size: 15, color: RED, anchorX: 'middle' });
          S.addText('lbl-A2', bTailX + 0.3, bTailY + 0.5, "A'",
            { size: 15, color: RED, anchorX: 'middle' });
          S.addText('lbl-corr', (aTailX + bTailX) / 2, aTailY + 1.0,
            '对应点连线（平移向量）', { size: 12, color: RED, anchorX: 'middle' });

          // 总结框
          S.addPolygon('sum-bg',
            [[-9.8, -5.2], [9.8, -5.2], [9.8, -7.2], [-9.8, -7.2]],
            { fillColor: '#e8f5e9', strokeColor: GREEN, strokeWidth: 2, fillOpacity: 0.95 });
          S.addText('sum-t1', 0, -5.7,
            '花边设计要点：① 确定基本图形  ② 确定平移方向和距离  ③ 标出对应点',
            { size: 13, color: TEAL, anchorX: 'middle' });
          S.addText('sum-t2', 0, -6.5,
            '平移的性质：对应点连线平行且相等，方向一致',
            { size: 13, color: GREEN, anchorX: 'middle' });

          P.renderCard(
            '<b>标注对应点与平移向量</b><br><br>' +
            '• A 是基本图形上的一点<br>' +
            "• A' 是它平移后的对应点<br>" +
            "• AA' 即平移向量<br><br>" +
            '<b>必须标注才算数学表达完整！</b>'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
