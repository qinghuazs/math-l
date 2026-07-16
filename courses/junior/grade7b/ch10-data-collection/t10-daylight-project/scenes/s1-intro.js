(function (CW) {
  'use strict';
  // 场景模板：S=stage P=panel；含舞台动画的步 enter(anim) 必须 return 其 Promise。
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', INK = '#455a64', GOLD = '#f9a825';
  var CSS_SUN = 'background:#fff8e1;border:2px solid #f9a825;border-radius:10px;padding:6px 16px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、项目引入：白昼有多长',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们，你有没有发现——<b>夏天天黑得很晚，冬天天黑得很早</b>？一年之中，白昼（从日出到日落）的时间长短一直在变化。这节课我们就用一整年的数据，来探究白昼时长变化的规律。',
        enter: function (anim) {
          S.actor('s1-title', 0, 5.5, '一年中白昼时长怎样变化？', { color: INK, size: 22, bold: true });
          // 太阳 + 夏/冬对比示意
          S.addCircle('s1-sun', 0, 0, 1.3, { color: GOLD, fill: GOLD, fillOpacity: 0.85, width: 2 });
          S.actor('s1-summer', -5, -1.5, '夏天：白昼长 ☀', { color: WARM, size: 18, bold: true, css: CSS_SUN });
          S.actor('s1-winter', 5, -1.5, '冬天：白昼短 ❄', { color: COOL, size: 18, bold: true, css: 'background:#e3f2fd;border:2px solid #1565c0;border-radius:10px;padding:6px 16px;' });
          return anim ? delay(300) : null;
        },
      },
      {
        narration: '这是一个<b>综合与实践</b>活动。我们要完整地经历统计的四个环节：<b>收集数据 → 整理数据 → 描述数据 → 分析数据</b>，最后发现白昼时长背后的规律。',
        enter: function () {
          P.renderCard('本课研究主线：<br>① <b>收集</b>：查阅整年各月白昼时长<br>② <b>整理</b>：制成统计表<br>③ <b>描述</b>：画折线统计图<br>④ <b>分析</b>：发现变化规律', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
