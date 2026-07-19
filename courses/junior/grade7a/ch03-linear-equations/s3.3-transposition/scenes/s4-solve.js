// s4-solve.js  四、解出分书问题（3步）
// 环节四：完整展示分书问题解题过程与检验
// 数学验算：3x+20=4x-25 → 3x-4x=-25-20 → -x=-45 → x=45
// 检验：左边=3×45+20=135+20=155；右边=4×45-25=180-25=155；155=155 ✓
// 作答：共 45 名学生，这批书共 155 本
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、解出分书问题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：完整解题过程（逐行出现）
      {
        narration: '好，我们把分书问题完整地解一遍。原方程：3x+20=4x-25。移项：把 +20 移到右边变 -20，把 +4x 移到左边变 -4x，得 3x 减 4x 等于负25减20。合并同类项：-x 等于 -45。两边除以 -1：注意系数是 -1 不是 1，所以得到 x 等于 45。',
        enter: function (anim) {
          S.actor('s4-r0', 0, 7.0, '解：$3x+20=4x-25$', { color: INK, size: 22, bold: true });
          if (!anim) {
            S.actor('s4-r1', 0, 5.2, '$3x-4x=-25-20$', { color: TEAL, size: 22 });
            S.actor('s4-r1-hint', 7.0, 5.2, '（移项）', { color: WARM, size: 15 });
            S.actor('s4-r2', 0, 3.4, '$-x=-45$', { color: TEAL, size: 22 });
            S.actor('s4-r2-hint', 7.0, 3.4, '（合并同类项）', { color: COOL, size: 14 });
            S.actor('s4-r3', 0, 1.6, '$x=45$', { color: GREEN, size: 28, bold: true });
            S.actor('s4-r3-hint', 7.0, 1.6, '（两边除以 $-1$）', { color: COOL, size: 14 });
            return Promise.resolve();
          }
          return delay(500).then(function () {
            S.actor('s4-r1', 0, 5.2, '$3x-4x=-25-20$', { color: TEAL, size: 22 });
            S.actor('s4-r1-hint', 7.0, 5.2, '（移项）', { color: WARM, size: 15 });
            return delay(600);
          }).then(function () {
            S.actor('s4-r2', 0, 3.4, '$-x=-45$', { color: TEAL, size: 22 });
            S.actor('s4-r2-hint', 7.0, 3.4, '（合并同类项）', { color: COOL, size: 14 });
            return delay(600);
          }).then(function () {
            S.actor('s4-r3', 0, 1.6, '$x=45$', { color: GREEN, size: 28, bold: true });
            S.actor('s4-r3-hint', 7.0, 1.6, '（两边除以 $-1$）', { color: COOL, size: 14 });
            P.renderCard(
              '<b>注意！</b> 系数是 $-1$，不是 $1$：<br>' +
              '$-x=-45$ 两边除以 $-1$，得 $x=45$<br>' +
              '（若误除以 $1$，会得 $x=-45$——错！）'
            );
            return delay(300);
          });
        },
      },
      // Step 2：检验过程（规范书写）
      {
        narration: '解方程必须检验！把 x=45 代入原方程——注意是代入原方程，不是移项后的式子。左边等于 3 乘以 45 加 20，等于 135 加 20，等于 155。右边等于 4 乘以 45 减 25，等于 180 减 25，也等于 155。左边等于右边，所以 x=45 是原方程的解。',
        enter: function (anim) {
          S.remove('s4-r1'); S.remove('s4-r1-hint');
          S.remove('s4-r2'); S.remove('s4-r2-hint');
          S.remove('s4-r3'); S.remove('s4-r3-hint');
          S.remove('s4-r0');
          S.actor('s4-chk-title', 0, 7.0, '检验：把 $x=45$ 代入原方程', { color: TEAL, size: 20, bold: true });
          if (!anim) {
            S.actor('s4-chk-l', 0, 5.2, '左边 $=3\\times45+20=135+20=155$', { color: WARM, size: 19 });
            S.actor('s4-chk-r', 0, 3.4, '右边 $=4\\times45-25=180-25=155$', { color: COOL, size: 19 });
            S.actor('s4-chk-eq', 0, 1.6, '左边 $=$ 右边，所以 $x=45$ 是原方程的解 ✓', { color: GREEN, size: 17, bold: true });
            return Promise.resolve();
          }
          return delay(400).then(function () {
            S.actor('s4-chk-l', 0, 5.2, '左边 $=3\\times45+20=135+20=155$', { color: WARM, size: 19 });
            return delay(600);
          }).then(function () {
            S.actor('s4-chk-r', 0, 3.4, '右边 $=4\\times45-25=180-25=155$', { color: COOL, size: 19 });
            return delay(600);
          }).then(function () {
            S.actor('s4-chk-eq', 0, 1.6, '左边 $=$ 右边，所以 $x=45$ 是原方程的解 ✓', { color: GREEN, size: 17, bold: true });
            P.renderCard(
              '<b>检验规范</b>：代入<b>原方程</b>（不是移项后的方程）<br>' +
              '左边 $= 3\\times45+20=155$<br>' +
              '右边 $= 4\\times45-25=155$<br>' +
              '左边 $=$ 右边 ✓，$x=45$ 是原方程的解',
              'teal'
            );
            return delay(300);
          });
        },
      },
      // Step 3：作答与总结
      {
        narration: '最后写出答案：共有 45 名学生，这批书共 155 本。还要验证解的实际意义——45 是正整数，符合实际情况，合理！解题全步骤：移项、合并同类项、系数化为 1、检验，一步都不能少。',
        enter: function (anim) {
          S.remove('s4-chk-title'); S.remove('s4-chk-l'); S.remove('s4-chk-r'); S.remove('s4-chk-eq');
          S.actor('s4-ans', 0, 6.0, '答：共有 $45$ 名学生，这批书共 $155$ 本。', { color: GREEN, size: 20, bold: true });
          P.renderCard(
            '<b>解方程完整步骤</b><br>' +
            '① 移项（含 $x$ 移左，常数移右）<br>' +
            '② 合并同类项<br>' +
            '③ 系数化为 1（两边除以系数，注意负号！）<br>' +
            '④ 检验（代入原方程，写结论语句）'
          );
          P.renderTable({
            head: ['步骤', '本题结果'],
            rows: [
              ['移项', '$3x-4x=-25-20$'],
              ['合并', '$-x=-45$'],
              ['系数化为1', '$x=45$'],
              ['检验', '两边均为 $155$ ✓'],
            ],
          });
          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
