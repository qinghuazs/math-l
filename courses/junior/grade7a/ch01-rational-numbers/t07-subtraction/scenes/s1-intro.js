// s1-intro.js  一、温差怎么算（3步）
// 数学验算：最高气温 4℃，最低气温 -3℃，温差 = 4-(-3) = 4+3 = 7℃
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、温差怎么算',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：天气预报卡 + 温度计
      {
        narration: '同学们，先看这道生活题。北京某天天气预报：最高气温 4℃，最低气温零下 3℃。问：这一天的温差是多少？也就是最高气温比最低气温高几度？我先画一支温度计来帮我们看清楚两个温度的位置。',
        enter: function (anim) {
          // 天气预报标题卡
          S.actor('s1-title', 0, 7.0, '天气预报', { color: COOL, size: 22, bold: true });
          S.actor('s1-date',  0, 5.8, '北京  某日', { color: INK, size: 16 });

          // 最高最低温度
          S.actor('s1-hi-lbl', -4, 4.2, '最高气温', { color: WARM, size: 17 });
          S.actor('s1-hi-val', -4, 2.9, '4 ℃', { color: WARM, size: 26, bold: true });
          S.actor('s1-lo-lbl',  4, 4.2, '最低气温', { color: COOL, size: 17 });
          S.actor('s1-lo-val',  4, 2.9, '−3 ℃', { color: COOL, size: 26, bold: true });

          // 温度计主干（竖线，x=0，y从-5到2）
          S.addSegment('s1-thermo-body', [0, -5.2], [0, 2.8],
            { color: INK, width: 8, dash: 0 });

          // 刻度线：-5 ~ 5，每格1单位，温度计1数值=0.5画面单位（y范围 -5..5 对应画面 -5..2.5）
          // 映射：温度 t → 画面 y = t * 0.5 + (球心 -5 位移)
          // 让 -3 和 4 在可见区域：取 t from -5 to 7，球心 y=-5.2
          // 画面 y = -5.2 + (t - (-5)) * 0.5 = -5.2 + (t+5)*0.5
          // t=-3 → y=-5.2+1 = -4.2；t=4 → y=-5.2+4.5=-0.7
          // 调整：让 t=0 在 y=1.8，每格 0.55 画面单位
          // y(t) = 1.8 + t*0.55
          // t=-3 → y=1.8-1.65=0.15；t=4 → y=1.8+2.2=4.0  → 高温在上 OK

          // 刻度 t = -5 到 6
          for (var t = -5; t <= 6; t++) {
            var ty = 1.8 + t * 0.55;
            if (ty > 7.5 || ty < -7.5) continue;
            var tickLen = (t % 5 === 0) ? 0.45 : 0.28;
            S.addSegment('s1-tick-' + (t < 0 ? 'n' + (-t) : t),
              [-tickLen, ty], [tickLen, ty],
              { color: INK, width: (t % 5 === 0 ? 2 : 1), dash: 0 });
            if (t % 5 === 0 || t === -3 || t === 4) {
              S.addText('s1-tlab-' + (t < 0 ? 'n' + (-t) : t),
                0.55, ty - 0.15, '' + t,
                { color: (t === 4 ? WARM : (t === -3 ? COOL : GRAY)), size: 13 });
            }
          }

          // 红色液柱（从球心到 4℃）
          var yLo = 1.8 + (-3) * 0.55;
          var yHi = 1.8 + 4 * 0.55;
          S.addSegment('s1-mercury', [0, -5.2], [0, yHi],
            { color: WARM, width: 6, dash: 0 });

          // 最高温 4℃ 标注线
          S.addSegment('s1-hi-line', [-0.5, yHi], [0.5, yHi],
            { color: WARM, width: 3, dash: 0 });
          S.addText('s1-hi-mark', -1.8, yHi - 0.12, '4℃', { color: WARM, size: 16, bold: true });

          // 最低温 -3℃ 标注线
          S.addSegment('s1-lo-line', [-0.5, yLo], [0.5, yLo],
            { color: COOL, width: 3, dash: 0 });
          S.addText('s1-lo-mark', -2.2, yLo - 0.12, '-3℃', { color: COOL, size: 16, bold: true });

          P.renderCard(
            '<b>北京某日天气预报</b><br>' +
            '最高气温：<b style="color:#e64a19">4℃</b>　' +
            '最低气温：<b style="color:#1565c0">−3℃</b><br>' +
            '问：温差是多少？（最高 − 最低）'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：放大算式，点出"减负数"头一次见
      {
        narration: '列出算式：温差等于最高气温减最低气温，就是 4 减 (-3)，等于问号。注意——被减数是 4，减数是 -3，这是负数！小学我们只减过正数，减一个负数，这还是头一次遇到！今天的主角就是它。',
        enter: function (anim) {
          S.remove('s1-title');
          S.remove('s1-date');
          S.remove('s1-hi-lbl');
          S.remove('s1-hi-val');
          S.remove('s1-lo-lbl');
          S.remove('s1-lo-val');

          // 放大算式居中
          S.actor('s1-formula-lbl', 0, 6.5, '温差 = 最高气温 − 最低气温', { color: INK, size: 16 });
          S.actor('s1-formula', 0, 4.5, '$4 - (-3) = $ 【？】', { color: WARM, size: 30, bold: true });

          // 指出"减数是负数"
          S.actor('s1-note1', 0, 2.5, '被减数：$4$（正数）', { color: TEAL, size: 17 });
          S.actor('s1-note2', 0, 1.2, '减数：$-3$（<b>负数！头一次！</b>）', { color: WARM, size: 17 });
          S.actor('s1-note3', 0, -0.2, '小学只减过正数，今天是新情况。', { color: INK, size: 15 });

          P.renderCard(
            '列式：$4 - (-3) = $ ？<br>' +
            '减数是 $-3$——<b>减一个负数</b>，课堂头一次！<br>' +
            '这道题的答案是什么？'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：猜测收集
      {
        narration: '先不急着计算，让我收集大家的猜测。可能有同学猜 1，因为 4 减 3 等于 1；可能有同学猜 7，因为生活常识告诉我们气温差是 7 度。我先把猜测写下来，暂时不评对错。今天我们就来用数学方法"坐实"这道题的答案！',
        enter: function (anim) {
          S.remove('s1-formula-lbl');
          S.remove('s1-formula');
          S.remove('s1-note1');
          S.remove('s1-note2');
          S.remove('s1-note3');

          S.actor('s1-guess-title', 0, 6.8, '同学们猜一猜：$4 - (-3) = $ ？', { color: COOL, size: 19, bold: true });
          S.actor('s1-guess-sep', 0, 5.6, '收集猜测 ↓', { color: GRAY, size: 14 });

          S.actor('s1-guess1', -3.5, 4.0, '猜 1', { color: WARM, size: 20, bold: true });
          S.actor('s1-guess1-why', -3.5, 2.9, '4 − 3 = 1', { color: GRAY, size: 15 });
          S.actor('s1-guess1-src', -3.5, 1.9, '（直接"去掉负号"）', { color: GRAY, size: 13 });

          S.actor('s1-guess2',  3.5, 4.0, '猜 7', { color: TEAL, size: 20, bold: true });
          S.actor('s1-guess2-why',  3.5, 2.9, '生活常识：温差 7 度', { color: GRAY, size: 15 });
          S.actor('s1-guess2-src',  3.5, 1.9, '（直觉对了！但为什么？）', { color: GRAY, size: 13 });

          S.actor('s1-question', 0, 0.3, '哪个猜对了？接下来用数学验证！', { color: COOL, size: 16 });

          P.renderCard(
            '<b>两种猜测</b><br>' +
            '猜 <b>1</b>：直接把 $-3$ 当 $3$ 来减，$4-3=1$。<br>' +
            '猜 <b>7</b>：生活直觉，温差确实是 $7$ 度。<br>' +
            '暂不评对错——下一环节数学验证！'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
