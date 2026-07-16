(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  // 直方图数据：6组，组距=5，频数
  var COUNTS = [2, 7, 13, 16, 9, 3];
  var GROUP_PLAIN = ['145~150', '150~155', '155~160', '160~165', '165~170', '170~175'];
  var COLORS = ['#90caf9', '#42a5f5', '#1e88e5', '#1565c0', '#0d47a1', '#1a237e'];

  // 直方图关键参数：
  // 横轴：身高（145~175），纵轴：频数（0~18）
  // 画板 bbox: [-2, 19, 10, -1]（带坐标轴）
  // 组距 = 5，对应画板 x 宽度 W = 5
  // 各柱中心 cx：147.5, 152.5, 157.5, 162.5, 167.5, 172.5
  // 相邻柱 cx 间隔 = W = 5，实现无间隙紧邻
  var W = 5;
  var CXS = [147.5, 152.5, 157.5, 162.5, 167.5, 172.5];

  // 闭包高度变量（setup 中重置，防止场景切换残留）
  var curH = [0, 0, 0, 0, 0, 0];

  function drawAxisLabels() {
    var i;
    // 纵轴标签
    S.addText('s3-yunit', 141, 18.5, '频数（人）', { size: 11, color: INK, anchorX: 'left' });
    // 横轴标签（各组左端点）
    var xTicks = [145, 150, 155, 160, 165, 170, 175];
    for (i = 0; i < xTicks.length; i++) {
      S.addText('s3-xtick' + i, xTicks[i], -0.8, '' + xTicks[i], { size: 10, color: INK, anchorX: 'middle' });
    }
    // 纵轴刻度
    var yTicks = [2, 4, 6, 8, 10, 12, 14, 16];
    for (i = 0; i < yTicks.length; i++) {
      S.addText('s3-ytick' + i, 141.5, yTicks[i], '' + yTicks[i], { size: 10, color: INK, anchorX: 'right' });
    }
    // 图标题
    S.addText('s3-chart-title', 158, 18.0, '50名同学身高频数分布直方图', { size: 13, color: INK, anchorX: 'middle' });
    // 横轴标题
    S.addText('s3-xunit', 158, -1.5, '身高 (cm)', { size: 12, color: INK, anchorX: 'middle' });
  }

  // 画单根柱（动画或终态）
  function growBar(idx, anim) {
    var target = COUNTS[idx];
    if (!anim) {
      curH[idx] = target;
      S.addBar('s3-bar' + idx, CXS[idx], W,
        function () { return curH[idx]; },
        { color: COLORS[idx] }
      );
      S.addText('s3-label' + idx, CXS[idx], target + 0.5, '' + target,
        { size: 12, color: COLORS[idx], anchorX: 'middle' }
      );
      return Promise.resolve();
    }
    curH[idx] = 0;
    S.addBar('s3-bar' + idx, CXS[idx], W,
      function () { return curH[idx]; },
      { color: COLORS[idx] }
    );
    return S.animate({
      from: 0,
      to: target,
      duration: 550,
      easing: 'easeOutCubic',
      onUpdate: function (v) { curH[idx] = v; },
    }).then(function () {
      curH[idx] = target;
      S.addText('s3-label' + idx, CXS[idx], target + 0.5, '' + target,
        { size: 12, color: COLORS[idx], anchorX: 'middle' }
      );
    });
  }

  // 逐柱顺序生长
  function growAllBars(anim) {
    var p = Promise.resolve();
    var i;
    for (i = 0; i < COUNTS.length; i++) {
      (function (idx) {
        p = p.then(function () { return growBar(idx, anim); });
      })(i);
    }
    return p;
  }

  // 画所有柱的静态终态
  function drawStaticBars() {
    var i;
    for (i = 0; i < COUNTS.length; i++) {
      curH[i] = COUNTS[i];
      (function (idx) {
        S.addBar('s3-bar' + idx, CXS[idx], W, COUNTS[idx], { color: COLORS[idx] });
        S.addText('s3-label' + idx, CXS[idx], COUNTS[idx] + 0.5, '' + COUNTS[idx],
          { size: 12, color: COLORS[idx], anchorX: 'middle' }
        );
      })(i);
    }
  }

  var scene = {
    id: 's3',
    title: '三、频数分布直方图',
    bbox: [140, 19, 178, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      curH = [0, 0, 0, 0, 0, 0]; // 闭包重置，防残留
    },
    steps: [
      {
        narration: '有了频数分布表，我们可以画出<b>频数分布直方图</b>。先建立坐标系：横轴表示身高区间（145 到 175 cm），纵轴表示频数（人数）。注意纵轴从 0 开始，刻度均匀。直方图与条形图外形相似，但有本质区别——等会揭晓！',
        enter: function () {
          drawAxisLabels();
          P.renderCard('<b>频数分布直方图</b>步骤：<br>①建坐标轴（横轴=身高区间，纵轴=频数）<br>②纵轴从 0 开始，刻度均匀');
        },
      },
      {
        narration: '现在逐组画出矩形条！每个矩形的<b>宽度等于组距（5 cm）</b>，高度等于该组的频数。关键：<b>各柱紧挨在一起，没有空隙</b>！这与条形图不同——直方图的相邻柱共享边，因为身高是连续数据，区间连续紧接。看柱子一根一根生长……',
        enter: function (anim) {
          drawAxisLabels();
          return growAllBars(anim);
        },
      },
      {
        narration: '直方图完成了！从图中可以直观看出：160~165 cm 的柱最高（16人），这组人数最多；145~150 cm 和 170~175 cm 的柱最矮，两端人数很少；整体呈现"中间高、两端低"的山峰形状——这正是描述<b>数据分布形态</b>的价值所在！',
        enter: function (anim) {
          drawAxisLabels();
          drawStaticBars();
          // 高亮最高柱（160~165组，idx=3）
          S.addPolygon('s3-hl', [
            [CXS[3] - W / 2 - 0.3, 0],
            [CXS[3] + W / 2 + 0.3, 0],
            [CXS[3] + W / 2 + 0.3, COUNTS[3]],
            [CXS[3] - W / 2 - 0.3, COUNTS[3]],
          ], { color: '#fff59d', opacity: 0.40, borderWidth: 2, borderColor: '#f9a825' });
          S.addText('s3-max-tip', CXS[3], COUNTS[3] + 1.5, '最多！', { size: 12, color: WARM, anchorX: 'middle' });
          P.renderCard('直方图显示：<br>160~165 cm 人数最多（16人）<br>数据分布呈<b>中间高、两端低</b>的山峰形态');
        },
      },
      {
        narration: '最后，我们来比较<b>直方图与条形图的区别</b>。条形图：横轴是类别（离散数据），各柱<b>有间隙</b>，比较各类别多少；直方图：横轴是连续数量区间，各柱<b>紧邻无间隙</b>，展示连续数据的分布形态。记住：<b>有无间隙</b>是最显著的外观区别！',
        enter: function (anim) {
          drawAxisLabels();
          drawStaticBars();
          // 对比说明文字
          S.addText('s3-diff-title', 158, 17.0, '直方图 vs 条形图', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('s3-diff1', 142, 15.5, '直方图：', { size: 13, color: BLUE, anchorX: 'left' });
          S.addText('s3-diff1a', 142, 14.5, '• 横轴=连续区间', { size: 12, color: BLUE, anchorX: 'left' });
          S.addText('s3-diff1b', 142, 13.5, '• 各柱紧邻，无间隙', { size: 12, color: BLUE, anchorX: 'left' });
          S.addText('s3-diff1c', 142, 12.5, '• 展示分布形态', { size: 12, color: BLUE, anchorX: 'left' });
          S.addText('s3-diff2', 162, 15.5, '条形图：', { size: 13, color: WARM, anchorX: 'left' });
          S.addText('s3-diff2a', 162, 14.5, '• 横轴=类别（离散）', { size: 12, color: WARM, anchorX: 'left' });
          S.addText('s3-diff2b', 162, 13.5, '• 各柱有间隙', { size: 12, color: WARM, anchorX: 'left' });
          S.addText('s3-diff2c', 162, 12.5, '• 比较类别多少', { size: 12, color: WARM, anchorX: 'left' });
          P.renderCard('<b>直方图</b>：连续数据，柱紧邻无间隙，看<b>分布形态</b><br><b>条形图</b>：离散类别，柱间有间隙，看<b>多少比较</b>');
        },
      },
    ],
    expectSteps: 4,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
