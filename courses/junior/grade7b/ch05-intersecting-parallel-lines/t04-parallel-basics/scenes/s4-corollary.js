(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 三条线的 y 坐标
  var YA = 4.0, YB = 0.5, YC = -3.0;

  var scene = {
    id: 's4',
    title: '四、平行公理的推论',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '平行公理还有一个重要的推论。我们先来画三条直线 a、b、c，依次让它们出现。',
        enter: function (anim) {
          var p = Promise.resolve();

          p = p.then(function () {
            S.addSegment('line-a', [-8.5, YA], [8.5, YA], { color: BLUE, width: 4, dash: 0 });
            S.actor('lbl-aa', 9.0, YA, 'a', { color: BLUE, size: 20, bold: true });
            return anim ? delay(400) : null;
          });

          p = p.then(function () {
            S.addSegment('line-b', [-8.5, YB], [8.5, YB], { color: PURPLE, width: 4, dash: 0 });
            S.actor('lbl-bb', 9.0, YB, 'b', { color: PURPLE, size: 20, bold: true });
            return anim ? delay(400) : null;
          });

          p = p.then(function () {
            S.addSegment('line-c', [-8.5, YC], [8.5, YC], { color: GREEN, width: 4, dash: 0 });
            S.actor('lbl-cc', 9.0, YC, 'c', { color: GREEN, size: 20, bold: true });
            return anim ? delay(300) : null;
          });

          p = p.then(function () {
            P.renderCard(
              '三条直线 $a$、$b$、$c$：<br>' +
              '已知 $a \\parallel b$，$b \\parallel c$，<br>' +
              '那么 $a$ 与 $c$ 的关系是什么？'
            );
            return null;
          });

          return p;
        },
      },
      {
        narration: '已知 a 平行于 b，b 平行于 c——我们把这两个条件标注出来。注意 b 是中间那条线，同时与 a 和 c 平行。根据平行公理，我们来推导 a 与 c 的关系。',
        enter: function (anim) {
          // 标注 a ∥ b 和 b ∥ c 的平行记号（用小斜线表示）
          // a ∥ b：在线段中间附近画双斜线记号
          var markA1 = function () {
            S.addSegment('mark-ab1', [-0.3, YA + 0.4], [0.3, YA - 0.4], { color: BLUE, width: 3, dash: 0 });
            S.addSegment('mark-ab2', [-0.7, YA + 0.4], [-0.1, YA - 0.4], { color: BLUE, width: 3, dash: 0 });
          };
          var markB1 = function () {
            S.addSegment('mark-ba1', [-0.3, YB + 0.4], [0.3, YB - 0.4], { color: PURPLE, width: 3, dash: 0 });
            S.addSegment('mark-ba2', [-0.7, YB + 0.4], [-0.1, YB - 0.4], { color: PURPLE, width: 3, dash: 0 });
          };
          var markB2 = function () {
            S.addSegment('mark-bc1', [0.3, YB + 0.4], [0.9, YB - 0.4], { color: PURPLE, width: 3, dash: 0 });
            S.addSegment('mark-bc2', [-0.1, YB + 0.4], [0.5, YB - 0.4], { color: PURPLE, width: 3, dash: 0 });
          };
          var markC1 = function () {
            S.addSegment('mark-cb1', [0.3, YC + 0.4], [0.9, YC - 0.4], { color: GREEN, width: 3, dash: 0 });
            S.addSegment('mark-cb2', [-0.1, YC + 0.4], [0.5, YC - 0.4], { color: GREEN, width: 3, dash: 0 });
          };

          var p = Promise.resolve();

          p = p.then(function () {
            markA1(); markB1();
            S.actor('cond-ab', -3.5, (YA + YB) / 2, 'a ∥ b', { color: BLUE, size: 22, bold: true });
            return anim ? delay(500) : null;
          });

          p = p.then(function () {
            markB2(); markC1();
            S.actor('cond-bc', 3.5, (YB + YC) / 2, 'b ∥ c', { color: PURPLE, size: 22, bold: true });
            return anim ? delay(500) : null;
          });

          p = p.then(function () {
            P.renderCard(
              '已知：$a \\parallel b$，$b \\parallel c$<br><br>' +
              '推导：$a$ 与 $c$ 是否平行？<br>' +
              '提示：用平行公理逐步推理。'
            );
            return null;
          });

          return p;
        },
      },
      {
        narration: '推论：如果 a 平行于 b，b 平行于 c，那么 a 平行于 c。用数学语言说就是"平行于同一条直线的两条直线互相平行"。我们来看一下证明思路：反证法。',
        enter: function (anim) {
          // 显示推论结论 a ∥ c
          var p = Promise.resolve();

          p = p.then(function () {
            // 在 a 和 c 之间画双箭头连线暗示关系
            S.addSegment('arrow-ac', [-5.5, YA], [-5.5, YC], { color: RED, width: 3, dash: 2 });
            S.actor('concl-ac', -7.2, (YA + YC) / 2, 'a ∥ c', { color: RED, size: 24, bold: true });
            return anim ? delay(500) : null;
          });

          p = p.then(function () {
            P.renderCard(
              '<b>推论</b>：平行于同一条直线的两条直线互相平行。<br>' +
              '即：若 $a \\parallel b$，$b \\parallel c$，则 $a \\parallel c$。<br><br>' +
              '<b>反证思路</b>（理解用）：<br>' +
              '假设 $a$ 与 $c$ 相交于点 $Q$，则过 $Q$ 有两条直线（$a$ 和 $c$）都平行于 $b$，' +
              '这与平行公理（有且只有一条）矛盾。故 $a \\parallel c$。',
              'cool'
            );
            return null;
          });

          return p;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
