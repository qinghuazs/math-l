// s1-intro.js  环节一：宇宙里的大数（3步）
// 数学验算：光速 300000000（9位数字）；太阳半径 696000（6位）；陆地面积 9600000（7位）；2^27=134217728（9位）
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、宇宙里的大数',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：三组大数卡
      {
        narration: '今天我们从三组真实数据开始。光的速度是 3亿米每秒——你能数清楚这里有几个零吗？太阳半径 696000 千米，中国陆地面积 9600000 平方千米。把这三串数字抄在本子上，感受一下——是不是已经在数零了？',
        enter: function (anim) {
          S.actor('s1-title', 0, 7.0, '宇宙里的大数', { color: COOL, size: 22, bold: true });
          S.actor('s1-label1', -7, 4.8, '光的速度', { color: INK, size: 17 });
          S.actor('s1-val1',    2, 4.8, '<b>300000000</b> 米/秒', { color: WARM, size: 19 });
          S.actor('s1-label2', -7, 2.6, '太阳半径', { color: INK, size: 17 });
          S.actor('s1-val2',    2, 2.6, '<b>696000</b> 千米', { color: WARM, size: 19 });
          S.actor('s1-label3', -7, 0.4, '中国陆地面积', { color: INK, size: 17 });
          S.actor('s1-val3',    2, 0.4, '<b>9600000</b> 平方千米', { color: WARM, size: 19 });

          P.renderCard(
            '<b>真实数据</b><br>' +
            '光速：300000000 米/秒<br>' +
            '太阳半径：696000 千米<br>' +
            '陆地面积：9600000 平方千米<br>' +
            '试试把这三行数字抄下来，感受一下！'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：书写痛点
      {
        narration: '写这三行数字，你遇到什么麻烦？数零数到眼花！容易多写一个少写一个——300000000 里头有几个零？数一数……是8个。696000 里面有几个？3个。而且一眼根本看不出是几位数、大概是多少量级。这就是大数书写的痛点！',
        enter: function (anim) {
          S.actor('s1-pain-title', 0, -1.8, '书写痛点', { color: WARM, size: 20, bold: true });
          S.actor('s1-pain1', -7, -3.2, '① 数零数到眼花', { color: INK, size: 16 });
          S.actor('s1-pain2', -7, -4.4, '② 多写/少写一个零', { color: INK, size: 16 });
          S.actor('s1-pain3', -7, -5.6, '③ 一眼看不出数量级', { color: INK, size: 16 });

          P.renderCard(
            '<b>书写痛点</b><br>' +
            '300000000 里有几个零？数清楚了吗？<br>' +
            '①&nbsp;数零数到眼花<br>' +
            '②&nbsp;多写/少写一个零<br>' +
            '③&nbsp;一眼看不出数量级<br>' +
            '我们需要一种更聪明的记法！',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：兑现上一课悬念
      {
        narration: '还记得上节课我们算出的 2的27次方等于134217728 吗？当时我说"这串数字有没有更聪明的记法"——这节课我们就来回答这个问题！学完今天的内容，134217728 可以简洁地写成 1.3乘以10的8次方，又快又清晰。科学记数法，闪亮登场！',
        enter: function (anim) {
          S.remove('s1-pain-title');
          S.remove('s1-pain1');
          S.remove('s1-pain2');
          S.remove('s1-pain3');

          S.actor('s1-susp-title', 0, -1.8, '兑现上节课悬念', { color: TEAL, size: 20, bold: true });
          S.actor('s1-susp1', 0, -3.3, '$2^{27} = 134217728$', { color: INK, size: 18 });
          S.actor('s1-susp2', 0, -4.8, '学完今天 $\\Rightarrow$ 写成 $1.3 \\times 10^{8}$', { color: WARM, size: 18, bold: true });

          P.renderCard(
            '<b>悬念兑现！</b><br>' +
            '上节课：$2^{27} = 134217728$<br>' +
            '今天学完：$134217728 \\approx 1.3 \\times 10^{8}$<br>' +
            '科学记数法 = 压缩大数的智慧！',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
