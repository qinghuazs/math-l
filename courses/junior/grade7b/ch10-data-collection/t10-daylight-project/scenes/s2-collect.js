(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', INK = '#455a64', GOLD = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 北半球某地全年各月白昼时长（近似小时，夏至6月最长、冬至12月最短，先升后降）
  var MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  var HOURS  = [9.7, 10.6, 12.0, 13.4, 14.3, 14.7, 14.4, 13.4, 12.1, 10.7, 9.8, 9.4];

  var scene = {
    id: 's2',
    title: '二、收集与整理数据',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '第一步<b>收集数据</b>。白昼时长可以通过查阅天文年历、气象网站或日出日落表得到——这属于"<b>查阅资料</b>"的收集方式。我们查得某地全年 12 个月的白昼时长（单位：小时）。',
        enter: function () {
          P.renderCard('数据来源：查阅当地<b>日出日落表</b>（每月中旬为代表）。<br>这是一种间接收集数据的方式，不需要自己实测。');
        },
      },
      {
        narration: '第二步<b>整理数据</b>。把收集到的数据整理成一张<b>统计表</b>，让原本零散的数字变得清晰有序。请看这张全年白昼时长统计表。',
        enter: function (anim) {
          P.renderTable({
            head: ['月份', '白昼时长 / 小时'],
            rows: MONTHS.map(function (m, i) { return [m, '' + HOURS[i]]; }),
          });
          return anim ? delay(200) : null;
        },
      },
      {
        narration: '观察这张表，你能<b>直接看出规律</b>吗？数字虽然整齐，但变化趋势并不直观——从 1 月到 6 月好像在变大，6 月以后又变小。要把这种"变化趋势"看得一清二楚，最好的办法是<b>画成折线统计图</b>。',
        enter: function () {
          S.actor('s2-hint', 0, 0, '数字看不出趋势？—— 下一步画折线图！', { color: WARM, size: 20, bold: true });
          P.renderCard('统计表精确记录每个数据，但<b>变化趋势</b>要靠<b>折线图</b>才看得清楚。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
