(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  // 数据常量
  var ITEMS  = ['篮球', '足球', '羽毛球', '乒乓球', '其他'];
  var COUNTS = [12, 8, 10, 6, 4];
  var COLORS = ['#1565c0', '#e64a19', '#2e7d32', '#6a1b9a', '#f57f17'];
  var W  = 0.6;            // 柱宽
  var XS = [1, 2, 3, 4, 5]; // 各柱 x 中心坐标

  // 闭包高度变量（setup 中重置，防止场景切换残留）
  var curH = [0, 0, 0, 0, 0];

  // 画坐标轴辅助标签
  function drawAxisLabels() {
    var i;
    S.addText('s2-chart-title', 3, 13.5, '全班同学最喜欢的体育项目统计图', { size: 14, color: INK, anchorX: 'middle' });
    S.addText('s2-yunit', -0.7, 13.2, '（人）', { size: 11, color: INK, anchorX: 'right' });
    for (i = 0; i < ITEMS.length; i++) {
      S.addText('s2-xlabel' + i, XS[i], -0.7, ITEMS[i], { size: 12, color: INK, anchorX: 'middle' });
    }
    var yticks = [2, 4, 6, 8, 10, 12];
    for (i = 0; i < yticks.length; i++) {
      S.addText('s2-ytick' + i, -0.7, yticks[i], '' + yticks[i], { size: 11, color: INK, anchorX: 'right' });
    }
  }

  // 为第 idx 根柱画生长动画（anim=true）或直接终态（anim=false）
  // 返回 Promise
  function growBar(idx, anim) {
    var target = COUNTS[idx];
    if (!anim) {
      // 快放：直接赋终态高度
      curH[idx] = target;
      S.addBar('s2-bar' + idx, XS[idx], W,
        function () { return curH[idx]; },
        { color: COLORS[idx] }
      );
      S.addText('s2-label' + idx, XS[idx], target + 0.35, '' + target,
        { size: 13, color: COLORS[idx], anchorX: 'middle' }
      );
      return Promise.resolve();
    }
    // 动画：先注册柱（高度从闭包读取），再用 S.animate 补间驱动闭包
    curH[idx] = 0;
    S.addBar('s2-bar' + idx, XS[idx], W,
      function () { return curH[idx]; },
      { color: COLORS[idx] }
    );
    return S.animate({
      from: 0,
      to: target,
      duration: 650,
      easing: 'easeOutCubic',
      onUpdate: function (v) { curH[idx] = v; },
    }).then(function () {
      curH[idx] = target;
      S.addText('s2-label' + idx, XS[idx], target + 0.35, '' + target,
        { size: 13, color: COLORS[idx], anchorX: 'middle' }
      );
    });
  }

  // 逐根顺序生长（形成"一根接一根"效果）
  function growAllBars(anim) {
    var p = Promise.resolve();
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      (function (idx) {
        p = p.then(function () { return growBar(idx, anim); });
      })(i);
    }
    return p;
  }

  // 画所有柱的静态终态（用于步骤3/4需要先有完整图再叠加高亮）
  function drawStaticBars() {
    var i;
    for (i = 0; i < ITEMS.length; i++) {
      curH[i] = COUNTS[i];
      (function (idx) {
        S.addBar('s2-bar' + idx, XS[idx], W, COUNTS[idx], { color: COLORS[idx] });
        S.addText('s2-label' + idx, XS[idx], COUNTS[idx] + 0.35, '' + COUNTS[idx],
          { size: 13, color: COLORS[idx], anchorX: 'middle' }
        );
      })(i);
    }
  }

  var scene = {
    id: 's2',
    title: '二、认识条形统计图',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      curH = [0, 0, 0, 0, 0]; // 闭包重置，防残留
    },
    steps: [
      {
        narration: '统计表很好，但还不够直观。我们来认识一种更直观的图形——<b>条形统计图</b>。先搭好坐标轴：横轴表示体育项目的类别，纵轴表示频数（人数）。注意纵轴刻度均匀，从 0 开始。',
        enter: function () {
          drawAxisLabels();
          P.renderCard('<b>条形统计图</b>：<br>用长方形条的<b>高度</b>表示各类别的数量大小。<br>横轴→类别，纵轴→频数');
        },
      },
      {
        narration: '现在，我们逐根画出条形。每根条形的高度等于该项目的频数。注意看——条形从零开始生长，最终高度就是对应的频数！篮球 12 人，足球 8 人，羽毛球 10 人……',
        enter: function (anim) {
          drawAxisLabels();
          return growAllBars(anim);
        },
      },
      {
        narration: '条形图画好了！从图中我们可以直观看出：<b>篮球</b>的条形最高（12人），<b>其他</b>的条形最矮（4人）。高度的差距一目了然，这正是条形图的优势——便于<b>比较各类别的多少</b>！',
        enter: function (anim) {
          drawAxisLabels();
          drawStaticBars();
          // 高亮最高柱（篮球）
          S.addPolygon('s2-hl', [
            [XS[0] - W / 2 - 0.08, 0],
            [XS[0] + W / 2 + 0.08, 0],
            [XS[0] + W / 2 + 0.08, COUNTS[0]],
            [XS[0] - W / 2 - 0.08, COUNTS[0]],
          ], { color: '#fff59d', opacity: 0.45, borderWidth: 2, borderColor: '#f9a825' });
          S.addText('s2-max-tip', XS[0], COUNTS[0] + 1.4, '最多！', { size: 13, color: WARM, anchorX: 'middle' });
          P.renderCard('篮球最高（12人）← 最受欢迎<br>其他最低（4人）← 最少<br>条形<b>高低</b>直接反映<b>多少</b>！');
          return Promise.resolve();
        },
      },
      {
        narration: '再来对比一下统计表和条形图：统计表精确给出每个数据，条形图用高度直观展示大小关系。两者互为补充——统计表让你知道"多少"，条形图让你看出"谁多谁少"。',
        enter: function () {
          P.renderTable({
            head: ['体育项目', '频数（人）', '高低关系'],
            rows: [
              ['篮球',   '12', '最高 ↑'],
              ['足球',   '8',  '中'],
              ['羽毛球', '10', '次高'],
              ['乒乓球', '6',  '次低'],
              ['其他',   '4',  '最低 ↓'],
            ],
          });
          S.addText('s2-compare',  3, 12.5, '条形高度 = 频数（人数）', { size: 15, color: BLUE, anchorX: 'middle' });
          S.addText('s2-compare2', 3, 11.0, '高 → 多，低 → 少',        { size: 14, color: WARM, anchorX: 'middle' });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
