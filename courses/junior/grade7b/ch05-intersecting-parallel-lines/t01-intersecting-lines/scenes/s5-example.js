(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', GREEN = '#2e7d32';
  var CSS_ANS = 'background:#e8f5e9;border:2px solid #2e7d32;border-radius:8px;padding:4px 12px;';
  var CSS_Q = 'background:#fff3e0;border:2px solid #e64a19;border-radius:8px;padding:4px 12px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 固定角度：∠2=48°，则 theta=48°（OD 与 OA 夹角）
  var THETA_DEG = 48;
  var THETA = THETA_DEG * Math.PI / 180;

  function buildFig() {
    // 直线 CD 水平
    S.addSegment('s5-cd', [-7, 0], [7, 0], { color: INK, width: 3, dash: 0 });
    // 直线 AB 方向：从 O 出发，OA 与 OD 夹角为 48°
    S.addSegment('s5-ab',
      [7 * Math.cos(THETA), 7 * Math.sin(THETA)],
      [-7 * Math.cos(THETA), -7 * Math.sin(THETA)],
      { color: INK, width: 3, dash: 0 });
    // 标注字母
    S.addText('s5-lbl-o', 0.2, -0.6, 'O', { size: 15, color: INK });
    S.addText('s5-lbl-a', 7 * Math.cos(THETA) + 0.4, 7 * Math.sin(THETA) + 0.3, 'A', { size: 15, color: INK });
    S.addText('s5-lbl-b', -7 * Math.cos(THETA) - 0.6, -7 * Math.sin(THETA) - 0.4, 'B', { size: 15, color: INK });
    S.addText('s5-lbl-c', -7.5, 0.3, 'C', { size: 15, color: INK });
    S.addText('s5-lbl-d', 7.2, 0.3, 'D', { size: 15, color: INK });
  }

  var scene = {
    id: 's5',
    title: '五、例题：已知一角求其余三角',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '来做一道例题。题目是：两条直线相交，其中一个角（∠2）为 <b>48°</b>，求其余三个角的度数。先把图画出来，把已知的 48° 标上去，再来分析。',
        enter: function (anim) {
          buildFig();
          // 标注 ∠2 = 48°（∠AOD）
          S.addAngle('s5-a2',
            [3 * Math.cos(THETA), 3 * Math.sin(THETA)],
            [0, 0],
            [3, 0],
            { radius: 1.2, color: COOL, label: '∠2', opacity: 0.3 });
          S.actor('s5-deg2', 3.5, 1.2, '48°', { color: COOL, size: 16, bold: true, css: CSS_Q });
          P.renderCard('<b>例题：</b>两直线相交，∠2 = 48°，求 ∠1、∠3、∠4 各是多少度。');
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '先用邻补角关系求 ∠1。∠1 和 ∠2 互为邻补角，所以 ∠1 + ∠2 = 180°，即 ∠1 = 180° − 48° = <b>132°</b>。再用对顶角关系求 ∠3：∠3 和 ∠1 是对顶角，所以 ∠3 = ∠1 = <b>132°</b>。最后用对顶角求 ∠4：∠4 和 ∠2 是对顶角，所以 ∠4 = ∠2 = <b>48°</b>。',
        enter: function (anim) {
          // 标注所有四个角
          // ∠1：∠COA（180°-48°=132°方向）
          S.addAngle('s5-a1',
            [-3, 0],
            [0, 0],
            [3 * Math.cos(THETA), 3 * Math.sin(THETA)],
            { radius: 1.6, color: WARM, label: '∠1', opacity: 0.25 });
          // ∠3：∠DOB
          S.addAngle('s5-a3',
            [3, 0],
            [0, 0],
            [-3 * Math.cos(THETA), -3 * Math.sin(THETA)],
            { radius: 1.6, color: PURPLE, label: '∠3', opacity: 0.25 });
          // ∠4：∠BOC
          S.addAngle('s5-a4',
            [-3 * Math.cos(THETA), -3 * Math.sin(THETA)],
            [0, 0],
            [-3, 0],
            { radius: 1.1, color: '#2e7d32', label: '∠4', opacity: 0.25 });

          var p = Promise.resolve();
          if (anim) {
            // 逐个浮现度数
            p = p.then(function () {
              S.actor('s5-deg1', -4, 2.5, '132°', { color: WARM, size: 16, bold: true, css: CSS_ANS });
              return delay(500);
            }).then(function () {
              S.actor('s5-deg3', 4, -2.5, '132°', { color: PURPLE, size: 16, bold: true, css: CSS_ANS });
              return delay(500);
            }).then(function () {
              S.actor('s5-deg4', -4, -1.5, '48°', { color: GREEN, size: 16, bold: true, css: CSS_ANS });
              return delay(300);
            });
          } else {
            S.actor('s5-deg1', -4, 2.5, '132°', { color: WARM, size: 16, bold: true, css: CSS_ANS });
            S.actor('s5-deg3', 4, -2.5, '132°', { color: PURPLE, size: 16, bold: true, css: CSS_ANS });
            S.actor('s5-deg4', -4, -1.5, '48°', { color: GREEN, size: 16, bold: true, css: CSS_ANS });
          }
          return p.then(function () {
            P.renderCard('<b>解题过程：</b><br>∠1 与 ∠2 互为邻补角：$\\angle 1 = 180^\\circ - 48^\\circ = 132^\\circ$<br>∠3 与 ∠1 互为对顶角：$\\angle 3 = \\angle 1 = 132^\\circ$<br>∠4 与 ∠2 互为对顶角：$\\angle 4 = \\angle 2 = 48^\\circ$', 'cool');
          });
        },
      },
      {
        narration: '总结一下解题思路：四个角只需要知道一个，其余三个都可以求出来——对顶角相等可以直接得到，邻补角用 180° 减去即可。这就是两个定理联合使用的典型方式。',
        enter: function () {
          P.renderTable({
            head: ['角', '度数', '依据'],
            rows: [
              ['∠2', '48°（已知）', '题目给定'],
              ['∠1', '132°', '邻补角：180° − 48°'],
              ['∠3', '132°', '对顶角 = ∠1'],
              ['∠4', '48°', '对顶角 = ∠2'],
            ],
          });
          P.renderCard('知道一个角，其余三个角可全部求出：<br>① 利用邻补角互补（和为 180°）<br>② 利用对顶角相等', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
