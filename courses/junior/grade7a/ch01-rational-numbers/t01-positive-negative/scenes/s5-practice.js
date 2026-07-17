// s5-practice.js  对应教学设计"环节五：基础练习——用正负数表示相反意义的量"
// 数据已验算：
//   向东3米 → +3米；向西2米 → -2米
//   收入500元 → +500元；支出200元 → -200元
//   增长6.2% → +6.2%；下降1.5% → -1.5%
//   换向：规定向西为正 → 向东3米记 -3米
//   体重：重了2.5kg → +2.5kg；轻了1.5kg → -1.5kg
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、用正负数表示相反意义的量',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：六行表格练习（先出问题版，再renderTable补全答案）
      {
        narration: '来做一组填表练习。六行描述，每行先看"描述"，想一想应该记什么正负数——我们先规定：向东为正、收入为正、增长为正。现在看答案：向东3米记+3米，向西2米记-2米；收入500元记+500元，支出200元记-200元；增长6.2%记+6.2%，下降1.5%记-1.5%。',
        enter: function (anim) {
          P.renderTable({
            head: ['描述', '规定正方向', '记作'],
            rows: [
              ['向东行驶 $3$ 米',  '向东为正', '$+3$ 米（或 $3$ 米）'],
              ['向西行驶 $2$ 米',  '向东为正', '$-2$ 米'],
              ['收入 $500$ 元',    '收入为正', '$+500$ 元（或 $500$ 元）'],
              ['支出 $200$ 元',    '收入为正', '$-200$ 元'],
              ['增长 $6.2\\%$',   '增长为正', '$+6.2\\%$（或 $6.2\\%$）'],
              ['下降 $1.5\\%$',   '增长为正', '$-1.5\\%$']
            ]
          });

          P.renderCard(
            '<b>步骤</b>：① 先规定正方向；② 同向用 $+$，反向用 $-$<br>' +
            '$+$ 号可省，$-$ 号不可省！'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 2：换方向追问
      {
        narration: '好，追问一个关键问题：刚才我们规定向东为正，向东3米记+3米。如果换一个人，他规定向西为正，那向东3米应该记什么？答案是 -3米！——同一件事，约定不同，记法不同。这就告诉我们：正负号不是天然固定的，取决于事先的约定；但两个相反方向的量，符号一定相反。',
        enter: function (anim) {
          S.actor('s5-q-title', 0, 7, '换方向追问', { color: WARM, size: 20, bold: true });
          S.actor('s5-q1', 0, 5.5,
            '原约定：向东为正',
            { color: INK, size: 17 });
          S.actor('s5-q1-ans', 0, 4.5,
            '→ 向东 $3$ 米记 $+3$ 米',
            { color: GREEN, size: 17 });
          S.actor('s5-vs', 0, 3.5, '换一个人，规定<b>向西为正</b>：', { color: WARM, size: 17, bold: true });
          S.actor('s5-q2-ans', 0, 2.5,
            '→ 向东 $3$ 米记 $-3$ 米！',
            { color: COOL, size: 20, bold: true });
          S.actor('s5-concl1', 0, 1,
            '结论①：正负号取决于<b>事先约定</b>',
            { color: TEAL, size: 16 });
          S.actor('s5-concl2', 0, 0,
            '结论②：两个相反量，符号<b>一定相反</b>',
            { color: TEAL, size: 16 });

          P.renderCard(
            '<b>约定不同，记法不同</b><br>' +
            '同一件事（向东 $3$ 米）：<br>' +
            '向东为正 → $+3$ 米；向西为正 → $-3$ 米<br>' +
            '先约定方向，再写正负号——顺序不能颠倒！',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 3：体重题
      {
        narration: '再做一道板演题：某运动员体重比标准体重重了2.5千克，另一运动员比标准体重轻了1.5千克。规定重于标准体重为正，用正负数分别表示两人体重与标准的差。——重了2.5千克记 +2.5千克；轻了1.5千克记 -1.5千克。注意：-1.5的减号不能省！',
        enter: function (anim) {
          S.remove('s5-q-title');
          S.remove('s5-q1');
          S.remove('s5-q1-ans');
          S.remove('s5-vs');
          S.remove('s5-q2-ans');
          S.remove('s5-concl1');
          S.remove('s5-concl2');

          S.actor('s5-body-title', 0, 7, '体重题（板演）', { color: TEAL, size: 20, bold: true });
          S.actor('s5-body-q', 0, 5.5,
            '规定：重于标准体重为正',
            { color: INK, size: 16 });
          S.actor('s5-body-a1', -3, 4,
            '运动员甲：重了 $2.5$ 千克',
            { color: INK, size: 16 });
          S.actor('s5-body-a1-ans', 4, 4,
            '→ $+2.5$ 千克',
            { color: WARM, size: 18, bold: true });
          S.actor('s5-body-a2', -3, 2.5,
            '运动员乙：轻了 $1.5$ 千克',
            { color: INK, size: 16 });
          S.actor('s5-body-a2-ans', 4, 2.5,
            '→ $-1.5$ 千克',
            { color: COOL, size: 18, bold: true });
          S.actor('s5-body-warn', 0, 1,
            '⚠ $-1.5$ 的减号<b>不能省</b>！',
            { color: RED, size: 16, bold: true });

          P.renderCard(
            '<b>体重练习</b><br>' +
            '规定重于标准为正<br>' +
            '重了 $2.5$ 千克：$+2.5$ 千克<br>' +
            '轻了 $1.5$ 千克：$-1.5$ 千克（$-$ 号不可省！）',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
