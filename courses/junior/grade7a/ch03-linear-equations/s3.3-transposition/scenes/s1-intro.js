// s1-intro.js  一、分书问题（3步）
// 环节一：情境导入——把一批书分给 x 名学生
// 第一种：每人 3 本，多出 20 本；第二种：每人 4 本，缺 25 本
// 两种分法都是在算同一批书的总数
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、分书问题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示情境题目
      {
        narration: '同学们好！今天我们来解决一个有趣的实际问题。把一批书分给若干名学生：第一种分法——每人 3 本，多出 20 本；第二种分法——每人 4 本，少了 25 本。请问这批书一共有多少本？学生有多少名？',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.5, '分书问题', { color: TEAL, size: 26, bold: true });
          S.actor('s1-ctx', 0, 5.0, '把一批书分给若干名学生：', { color: INK, size: 18 });
          return anim ? delay(400).then(function () {
            S.actor('s1-m1', -3, 3.0, '第一种分法：', { color: WARM, size: 18, bold: true });
            S.actor('s1-m1d', 3, 3.0, '每人 3 本，多出 20 本', { color: WARM, size: 18 });
            return delay(600);
          }).then(function () {
            S.actor('s1-m2', -3, 1.2, '第二种分法：', { color: COOL, size: 18, bold: true });
            S.actor('s1-m2d', 3, 1.2, '每人 4 本，少了 25 本', { color: COOL, size: 18 });
            return delay(400);
          }) : (function () {
            S.actor('s1-m1', -3, 3.0, '第一种分法：', { color: WARM, size: 18, bold: true });
            S.actor('s1-m1d', 3, 3.0, '每人 3 本，多出 20 本', { color: WARM, size: 18 });
            S.actor('s1-m2', -3, 1.2, '第二种分法：', { color: COOL, size: 18, bold: true });
            S.actor('s1-m2d', 3, 1.2, '每人 4 本，少了 25 本', { color: COOL, size: 18 });
            return Promise.resolve();
          })();
        },
      },
      // Step 2：揭示两种分法都在算同一批书的总数
      {
        narration: '思考一下：这两种分法，分别在计算什么？——对！它们都是在计算这批书的总数！虽然算法不同，但最终结果是同一个数量：这批书的总数。',
        enter: function (anim) {
          S.actor('s1-q', 0, -0.8, '两种分法各自在算什么？', { color: INK, size: 17 });
          return anim ? delay(500).then(function () {
            S.actor('s1-ans', 0, -2.8, '它们都是在算这批书的总数！', { color: TEAL, size: 20, bold: true });
            return delay(400);
          }) : (function () {
            S.actor('s1-ans', 0, -2.8, '它们都是在算这批书的总数！', { color: TEAL, size: 20, bold: true });
            return Promise.resolve();
          })();
        },
      },
      // Step 3：用连线强调"同一批书"，引出列方程的思路
      {
        narration: '既然两种分法算的是同一批书的总数，那两个结果必须相等！这就是我们列方程的出发点：找到同一个数量的两种表达，让它们相等，就是方程。接下来我们就来列这个方程。',
        enter: function (anim) {
          S.addSegment('s1-line-l', [-8.5, 3.0], [-8.5, 1.2], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s1-line-r', [-8.5, 2.1], [-6.5, 2.1], { color: TEAL, width: 3, dash: 2 });
          S.actor('s1-equal-hint', -4.5, 2.1, '= 同一批书总数', { color: TEAL, size: 18, bold: true });
          P.renderCard(
            '<b>列方程的灵魂：找"同一个量"</b><br>' +
            '两种分法算的是<b>同一批书的总数</b>，<br>' +
            '两种表达必须相等——这就是方程的来源！'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
