(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', INK = '#455a64';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var HOURS = [9.7, 10.6, 12.0, 13.4, 14.3, 14.7, 14.4, 13.4, 12.1, 10.7, 9.8, 9.4];
  // 折线数据点：x=月份(1~12)，y=白昼时长
  var PTS = HOURS.map(function (h, i) { return [i + 1, h]; });
  var drawnCount = 0; // 已描点数（闭包，setup 重置）

  function axisFrame() {
    // 手绘坐标框架标注（带轴画板已有轴，这里补月份/时长参考）
    S.addText('s3-yl', 0.2, 15.3, '白昼/小时', { size: 14, color: INK });
    S.addText('s3-xl', 12.6, 0.4, '月份', { size: 14, color: INK });
    // y 参考虚线 12h（春秋分基准）
    S.addSegment('s3-ref12', [0, 12], [12.5, 12], { color: '#b0bec5', width: 1.5, dash: 2 });
    S.addText('s3-ref12l', 12.6, 12, '12h', { size: 12, color: '#90a4ae' });
  }

  // 描到第 n 个点并连线
  function drawUpTo(n) {
    var i;
    for (i = 0; i < n; i++) {
      S.dropPoint('s3-pt' + i, PTS[i][0], PTS[i][1], { color: WARM, size: 3 });
    }
    if (n >= 2) {
      S.addPolyline('s3-line', PTS.slice(0, n), { color: WARM, width: 2.5 });
    }
  }

  function growLine(anim) {
    if (!anim) { drawnCount = PTS.length; drawUpTo(PTS.length); return Promise.resolve(); }
    var p = Promise.resolve();
    var k;
    for (k = 1; k <= PTS.length; k++) {
      (function (n) {
        p = p.then(function () { drawnCount = n; drawUpTo(n); return delay(180); });
      })(k);
    }
    return p;
  }

  var scene = {
    id: 's3',
    title: '三、用折线统计图描述',
    bbox: [-1.5, 16.5, 14, -2.5],
    board: {},
    setup: function (stage, panel) { S = stage; P = panel; drawnCount = 0; },
    steps: [
      {
        narration: '第三步<b>描述数据</b>。我们建立坐标系：<b>横轴表示月份</b>（1~12月），<b>纵轴表示白昼时长</b>（小时）。先把坐标框架画好。',
        enter: function () {
          axisFrame();
          P.renderCard('横轴：月份（1~12）<br>纵轴：白昼时长（小时）<br>每个月的数据对应一个<b>点</b>。');
        },
      },
      {
        narration: '现在把 12 个月的数据<b>逐个描点</b>——每个月一个点，高度就是那个月的白昼时长。看着点一个一个落下……',
        enter: function (anim) {
          axisFrame();
          return growLine(anim);
        },
      },
      {
        narration: '把相邻的点<b>用线段顺次连接</b>，就得到了<b>折线统计图</b>。看！这条折线<b>先上升到最高、再下降到最低</b>，像一座平缓的山峰——白昼时长的变化趋势一目了然。',
        enter: function () {
          axisFrame();
          drawUpTo(PTS.length);
          // 标出最高点(6月)、最低点(12月)
          S.addText('s3-max', 6, 15.5, '6月最高 14.7h', { size: 14, color: WARM });
          S.addText('s3-min', 11.5, 8.3, '12月最低 9.4h', { size: 14, color: COOL });
          P.renderCard('折线统计图<b>用线的起伏表示数量的增减变化</b>，最适合刻画"随时间变化"的数据。', 'warm');
        },
      },
      {
        narration: '这正是折线统计图的<b>独特优势</b>：条形图便于比较各类别的多少，而折线图能清楚地反映<b>数据随时间连续变化的趋势</b>——升、降、快、慢，尽收眼底。',
        enter: function () {
          axisFrame();
          drawUpTo(PTS.length);
          P.renderCard('三种统计图各有所长：<br>条形图 → 比多少<br>扇形图 → 看占比<br><b>折线图 → 看变化趋势</b>', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
