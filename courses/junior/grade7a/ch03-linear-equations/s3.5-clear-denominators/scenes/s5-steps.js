// s5-steps.js  环节五：五步总流程（3步）
// 数学验算：
//   练习A：(2x-1)/3 = x-1，LCM=3，两边乘3：2x-1=3(x-1)=3x-3
//          移项：2x-3x=-3+1 → -x=-2 → x=2
//          验算：左=(4-1)/3=1，右=2-1=1 ✓
//   练习B：(2x+1)/4 - (x-1)/3 = 1，LCM=12
//          两边乘12：3(2x+1)-4(x-1)=12
//          展开：6x+3-4x+4=12 → 2x+7=12 → 2x=5 → x=5/2
//          验算：左=(5+1)/4-(5/2-1)/3=(6/4)-(3/2/3)=3/2-1/2=1 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100', GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、五步总流程',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '现在把本章学过的所有技能组合起来，看看解一元一次方程的五步总流程。从第一步到第五步，顺序不能颠倒；但步骤可以跳过——如果方程不含分数，直接从第二步开始；如果方程没有括号，跳过第二步。今天我们补上了第一步去分母，五步总流程终于完整了！',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.2, '解一元一次方程——五步总流程', { color: COOL, size: 21, bold: true });
          var steps = [
            { id: 's5-b1', y: 5.4, label: '① 去分母', color: ORANGE, note: '本节新技能！' },
            { id: 's5-b2', y: 3.8, label: '② 去括号', color: COOL, note: '（3.4节）' },
            { id: 's5-b3', y: 2.2, label: '③ 移  项', color: COOL, note: '（3.3节）' },
            { id: 's5-b4', y: 0.6, label: '④ 合并同类项', color: COOL, note: '（3.2节）' },
            { id: 's5-b5', y: -1.0, label: '⑤ 系数化为 1', color: COOL, note: '（3.1节）' },
          ];
          var p = Promise.resolve();
          steps.forEach(function (it) {
            p = p.then(function () {
              S.actor(it.id, -1.5, it.y, it.label, { color: it.color, size: 22, bold: true });
              S.actor(it.id + '-note', 5.5, it.y, it.note,
                { color: it.note === '本节新技能！' ? WARM : TEAL, size: 16 });
              if (it.y > -1.0) {
                S.addSegment(it.id + '-arr',
                  [0, it.y - 0.6], [0, it.y - 1.0],
                  { color: INK, width: 2, dash: 0 });
              }
              return anim ? delay(400) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>五步总流程</b><br>' +
              '<b style="color:#e65100">①去分母</b>（本节新技能）<br>' +
              '→ ②去括号 → ③移项 → ④合并同类项 → ⑤系数化为 1<br>' +
              '顺序不变，步骤可跳，做完必检验！'
            );
          });
        },
      },
      {
        narration: '有一点要强调：步骤的顺序是固定的，但可以跳过。比如方程没有分母，就从第二步开始；没有括号就跳过第二步；没有需要移项的就跳过第三步。但你不能先合并再移项，也不能先系数化1再移项——顺序乱了，会导致错误。有分母先去分母，其余照旧！',
        enter: function (anim) {
          S.remove('s5-b1-arr'); S.remove('s5-b2-arr'); S.remove('s5-b3-arr'); S.remove('s5-b4-arr');
          S.actor('s5-rule1', 0, -2.8,
            '顺序固定，步骤可跳',
            { color: TEAL, size: 20, bold: true });
          S.actor('s5-rule2', 0, -4.2,
            '有分母先去分母，其余照旧！',
            { color: WARM, size: 22, bold: true });
          P.renderCard(
            '<b>使用规则</b><br>' +
            '步骤可以跳过，但顺序不能颠倒！<br>' +
            '• 无分数 → 跳过①<br>' +
            '• 无括号 → 跳过②<br>' +
            '<b>有分母先去分母，其余照旧！</b>',
            'cool'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '来两道练习题巩固一下。练习 A：2x 减 1 的差除以 3 等于 x 减 1。LCM 等于 3，两边乘 3：2x 减 1 等于 3 乘 x 减 1，展开为 3x 减 3，移项合并：负 x 等于负 2，x 等于 2，验算正确。练习 B：2x 加 1 的和除以 4 减 x 减 1 的差除以 3 等于 1，LCM 等于 12，两边乘 12，展开合并，得 x 等于二分之五，验算也正确！',
        enter: function (anim) {
          S.remove('s5-rule1'); S.remove('s5-rule2');
          S.actor('s5-pra-title', 0, 7.2, '课堂练习', { color: ORANGE, size: 20, bold: true });
          S.actor('s5-pa-title', -5, 6.0, '练习 A：', { color: COOL, size: 18, bold: true });
          S.actor('s5-pa-eq', -5, 4.8,
            '$\\dfrac{2x-1}{3} = x-1$',
            { color: INK, size: 20 });
          var stepsA = [
            ['s5-pa1', -5, 3.4, '乘 $3$：$2x-1=3(x-1)$', INK, 16],
            ['s5-pa2', -5, 2.2, '$2x-1=3x-3$', INK, 16],
            ['s5-pa3', -5, 1.0, '$-x=-2$', COOL, 17],
            ['s5-pa4', -5, -0.2, '$x=2$ ✓', GREEN, 20],
          ];
          S.actor('s5-pb-title', 5, 6.0, '练习 B：', { color: COOL, size: 18, bold: true });
          S.actor('s5-pb-eq', 5, 4.8,
            '$\\dfrac{2x+1}{4} - \\dfrac{x-1}{3} = 1$',
            { color: INK, size: 18 });
          var stepsB = [
            ['s5-pb1', 5, 3.4, '乘 $12$：$3(2x+1)-4(x-1)=12$', INK, 14],
            ['s5-pb2', 5, 2.2, '$6x+3-4x+4=12$', INK, 15],
            ['s5-pb3', 5, 1.0, '$2x+7=12 \\Rightarrow 2x=5$', COOL, 15],
            ['s5-pb4', 5, -0.2, '$x=\\dfrac{5}{2}$ ✓', GREEN, 20],
          ];
          var p = Promise.resolve();
          stepsA.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5] });
              return anim ? delay(300) : Promise.resolve();
            });
          });
          stepsB.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5] });
              return anim ? delay(300) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>练习答案</b><br>' +
              'A：$x=2$（验算：左 $=1$，右 $=1$ ✓）<br>' +
              'B：$x=\\dfrac{5}{2}$（验算：左 $=1$，右 $=1$ ✓）<br>' +
              '有分母先去分母，其余照旧！',
              'teal'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
