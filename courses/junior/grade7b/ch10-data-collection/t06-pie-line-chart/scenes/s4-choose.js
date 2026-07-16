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

  // 三种情境数据
  var SITUATIONS = [
    { ctx: '各年级参加运动会人数（人数比较）', answer: '条形图', color: BLUE, reason: '比较各年级人数的<b>多少</b>' },
    { ctx: '家庭月支出构成（食品/房租/交通/娱乐）', answer: '扇形图', color: WARM, reason: '展示各项支出占总支出的<b>比例</b>' },
    { ctx: '某股票连续30天的收盘价', answer: '折线图', color: GREEN, reason: '反映股价随时间的<b>变化趋势</b>' },
  ];

  var scene = {
    id: 's4',
    title: '四、三种统计图的选择',
    board: { axis: false, keepAspect: false },
    bbox: [-1, 12, 11, -1],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '我们已经学了三种统计图：条形图、扇形图、折线图。它们各有所长，用错了会误导读者！核心区别是：条形图用来<b>比多少</b>，扇形图用来<b>看占比</b>，折线图用来<b>看趋势</b>。先看对比表！',
        enter: function () {
          P.renderTable({
            head: ['统计图', '主要作用', '适合情境'],
            rows: [
              ['条形图', '比较各类别数量大小', '各班人数、各科成绩比较'],
              ['扇形图', '表示各部分占总体的比例', '支出构成、时间分配'],
              ['折线图', '表示数据随时间的变化趋势', '气温变化、销售额月报'],
            ],
          });
          S.addText('s4-tip', 5, 10.5, '关键词：比多少 → 条形；看占比 → 扇形；看趋势 → 折线', { size: 13, color: WARM, anchorX: 'middle' });
        },
      },
      {
        narration: '来做选择题！给三个情境，判断用哪种统计图最合适。情境一：各年级参加运动会的人数——要比较各年级人数多少，选<b>条形图</b>！情境二：家庭月支出构成——要看各项占总支出的比例，选<b>扇形图</b>！情境三：某股票连续30天收盘价——要看价格变化趋势，选<b>折线图</b>！',
        enter: function () {
          var i;
          for (i = 0; i < SITUATIONS.length; i++) {
            var sit = SITUATIONS[i];
            var y = 10 - i * 3.5;
            S.addText('s4-ctx' + i, 0.2, y, '情境' + (i + 1) + '：' + sit.ctx, { size: 13, color: INK });
            S.addText('s4-ans' + i, 0.2, y - 1.2,
              '→ 选 ' + sit.answer + '：' + sit.reason,
              { size: 13, color: sit.color });
          }
          P.renderCard(
            '<b>选图口诀</b>：<br>' +
            '· 比多少 → 条形图<br>' +
            '· 看占比 → 扇形图<br>' +
            '· 看趋势 → 折线图<br><br>' +
            '<b>关键</b>：先分析"要表达什么"'
          );
        },
      },
      {
        narration: '再来一道综合判断：某校图书馆今年购书情况——文学类120册、科技类80册、历史类60册、其他40册。如果要展示<b>各类图书比例</b>，选扇形图；如果要<b>比较各类册数多少</b>，选条形图；如果要表示<b>月购书量变化</b>，选折线图。同一份数据，目的不同，图表不同！',
        enter: function () {
          S.addText('s4-q', 5, 10.8, '同一数据，目的不同→图表不同', { size: 14, color: WARM, anchorX: 'middle' });
          P.renderTable({
            head: ['分析目的', '选用图表', '理由'],
            rows: [
              ['各类图书的比例构成', '扇形图', '看占比'],
              ['各类图书册数多少', '条形图', '比多少'],
              ['月购书量的变化趋势', '折线图', '看趋势'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
