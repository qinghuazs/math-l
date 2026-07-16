(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32';

  // 数据常量
  var ITEMS = ['篮球', '足球', '羽毛球', '乒乓球', '其他'];
  var COUNTS = [12, 8, 10, 6, 4];
  var TOTAL = 40;

  // 频率分数字符串（KaTeX）
  var RATES = [
    '$\\dfrac{12}{40}=0.30$',
    '$\\dfrac{8}{40}=0.20$',
    '$\\dfrac{10}{40}=0.25$',
    '$\\dfrac{6}{40}=0.15$',
    '$\\dfrac{4}{40}=0.10$',
  ];

  // 原始数据（40个项目的随机序列，模拟真实调查记录）
  var RAW = [
    '篮球', '足球', '羽毛球', '篮球', '乒乓球', '篮球', '其他', '羽毛球', '足球', '篮球',
    '羽毛球', '篮球', '乒乓球', '足球', '篮球', '羽毛球', '篮球', '其他', '足球', '篮球',
    '乒乓球', '羽毛球', '篮球', '足球', '羽毛球', '篮球', '其他', '乒乓球', '足球', '羽毛球',
    '篮球', '足球', '乒乓球', '羽毛球', '篮球', '其他', '足球', '羽毛球', '篮球', '乒乓球',
  ];

  var scene = {
    id: 's1',
    title: '一、从数据到统计表',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，假设我们调查了全班 40 名同学最喜欢的体育项目，得到下面这些原始记录——看起来很杂乱，对吧？这就是<b>原始数据</b>。我们需要把它整理好，才能看出规律。',
        enter: function () {
          S.addText('s1-title', 3, 13.5, '原始调查数据（40名同学）', { size: 16, color: INK, anchorX: 'middle' });
          var cols = 10;
          var i, r, c;
          for (i = 0; i < RAW.length; i++) {
            r = Math.floor(i / cols);
            c = i % cols;
            S.addText('s1-raw' + i,
              -0.5 + c * 0.78,
              11.8 - r * 1.9,
              RAW[i],
              { size: 11, color: (i % 7 === 0 ? WARM : INK), anchorX: 'left' }
            );
          }
          P.renderCard('原始数据：杂乱无章，难以直接看出规律。<br>我们需要<b>整理数据</b>——用划记法计数！');
        },
      },
      {
        narration: '我们用<b>划记法</b>来整理数据：对每个项目，每出现一次就划一笔，每五笔为一组（"正"字）。这样计数既不重复也不遗漏。数一数：篮球 12 次、足球 8 次、羽毛球 10 次、乒乓球 6 次、其他 4 次，合计 40 次。',
        enter: function () {
          S.addText('s1-tally-title', 3, 13.5, '划记法整理', { size: 16, color: BLUE, anchorX: 'middle' });
          var tallyData = [
            { item: '篮球',  tally: '正正丨丨', n: 12 },
            { item: '足球',  tally: '正丨丨丨', n: 8  },
            { item: '羽毛球', tally: '正正',     n: 10 },
            { item: '乒乓球', tally: '正丨',     n: 6  },
            { item: '其他',  tally: '丨丨丨丨', n: 4  },
          ];
          var yStart = 11.5;
          var yStep = 2.1;
          S.addText('s1-hd0', 0.2, yStart + 0.9, '项目',   { size: 14, color: BLUE, anchorX: 'left' });
          S.addText('s1-hd1', 2.2, yStart + 0.9, '划记',   { size: 14, color: BLUE, anchorX: 'left' });
          S.addText('s1-hd2', 5.0, yStart + 0.9, '频数',   { size: 14, color: BLUE, anchorX: 'left' });
          var i;
          for (i = 0; i < tallyData.length; i++) {
            var d = tallyData[i];
            var y = yStart - i * yStep;
            S.addText('s1-it' + i, 0.2, y, d.item,    { size: 13, color: INK,   anchorX: 'left' });
            S.addText('s1-tl' + i, 2.2, y, d.tally,   { size: 13, color: WARM,  anchorX: 'left' });
            S.addText('s1-cn' + i, 5.0, y, '' + d.n,  { size: 14, color: GREEN, anchorX: 'left' });
          }
          P.renderCard('<b>频数</b>：某类别数据出现的次数，叫该类别的<b>频数</b>。<br>合计：$12+8+10+6+4=40$');
        },
      },
      {
        narration: '有了频数，我们还可以计算每个项目的<b>频率</b>：频率 = 频数 ÷ 总数。例如，篮球的频率 = 12 ÷ 40 = 0.30，即 30%。把这些信息整理成表格，就是<b>统计表</b>！统计表让数据一目了然。',
        enter: function () {
          P.renderTable({
            head: ['体育项目', '频数（人）', '频率'],
            rows: [
              ['篮球',   '12', RATES[0]],
              ['足球',   '8',  RATES[1]],
              ['羽毛球', '10', RATES[2]],
              ['乒乓球', '6',  RATES[3]],
              ['其他',   '4',  RATES[4]],
              ['<b>合计</b>', '<b>40</b>', '<b>1</b>'],
            ],
          });
          S.addText('s1-formula', 3, 12.5, '频率 = 频数 ÷ 总数', { size: 15, color: BLUE,  anchorX: 'middle' });
          S.addText('s1-eg',      3, 11.0, '例：篮球频率 = $\\dfrac{12}{40}$ = 0.30', { size: 14, color: WARM,  anchorX: 'middle' });
          S.addText('s1-note',    3, 9.5,  '所有频率之和 = 1',        { size: 14, color: GREEN, anchorX: 'middle' });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
