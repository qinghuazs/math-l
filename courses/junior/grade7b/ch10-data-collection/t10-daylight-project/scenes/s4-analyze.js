(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', INK = '#455a64';

  var HOURS = [9.7, 10.6, 12.0, 13.4, 14.3, 14.7, 14.4, 13.4, 12.1, 10.7, 9.8, 9.4];
  var PTS = HOURS.map(function (h, i) { return [i + 1, h]; });

  function chart() {
    S.addText('s4-yl', 0.2, 15.3, '白昼/小时', { size: 13, color: INK });
    S.addText('s4-xl', 12.6, 0.4, '月份', { size: 13, color: INK });
    S.addSegment('s4-ref12', [0, 12], [12.5, 12], { color: '#b0bec5', width: 1.5, dash: 2 });
    var i;
    for (i = 0; i < PTS.length; i++) {
      S.dropPoint('s4-pt' + i, PTS[i][0], PTS[i][1], { color: WARM, size: 3 });
    }
    S.addPolyline('s4-line', PTS, { color: WARM, width: 2.5 });
  }

  var scene = {
    id: 's4',
    title: '四、分析规律',
    bbox: [-1.5, 16.5, 14, -2.5],
    board: {},
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '第四步<b>分析数据</b>。从折线图上，我们能读出哪些规律？先找<b>极值</b>：白昼最长出现在 <b>6 月</b>（约 14.7 小时，这一天前后是<b>夏至</b>）；白昼最短出现在 <b>12 月</b>（约 9.4 小时，前后是<b>冬至</b>）。',
        enter: function () {
          chart();
          S.dropPoint('s4-hi', 6, 14.7, { color: WARM, size: 6, name: '最长', labelOffset: [8, 10] });
          S.dropPoint('s4-lo', 12, 9.4, { color: COOL, size: 6, name: '最短', labelOffset: [-40, 10] });
          P.renderCard('最长：<b>6 月</b> 约 14.7h（夏至前后）<br>最短：<b>12 月</b> 约 9.4h（冬至前后）', 'warm');
        },
      },
      {
        narration: '再看<b>变化趋势</b>：从 1 月到 6 月，白昼<b>逐渐变长</b>（折线上升）；从 6 月到 12 月，白昼<b>逐渐变短</b>（折线下降）。而在 3 月和 9 月前后，白昼约为 <b>12 小时</b>，昼夜几乎等长——这正是<b>春分</b>和<b>秋分</b>。',
        enter: function () {
          chart();
          S.addText('s4-up', 3, 6.5, '↗ 上半年变长', { size: 15, color: GREEN });
          S.addText('s4-down', 9.2, 6.5, '↘ 下半年变短', { size: 15, color: COOL });
          S.dropPoint('s4-sp', 3, 12.0, { color: GREEN, size: 5 });
          S.dropPoint('s4-au', 9, 12.1, { color: GREEN, size: 5 });
          P.renderCard('1→6 月上升，6→12 月下降；<br>3 月、9 月约 12h（春分、秋分，昼夜等长）。', 'cool');
        },
      },
      {
        narration: '这个规律的背后是<b>地理原因</b>：地球在绕太阳公转时，地轴是倾斜的，太阳<b>直射点</b>在南北回归线之间往返移动。夏至太阳直射北半球最北，我们这里白昼最长；冬至直射最南，白昼最短。<b>数学的折线图，帮我们把这个自然规律看得清清楚楚</b>。',
        enter: function () {
          chart();
          P.renderCard('规律成因：地球公转 + 地轴倾斜 → 太阳直射点南北移动 → 白昼时长周期变化。<br><b>数据分析让隐藏的自然规律"现形"！</b>', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
