// s2-history.js  对应教学设计"环节二：数不够用了——数系扩充小史"
// 无特殊计算，数据取自教学设计表格。
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
    id: 's2',
    title: '二、数不够用了',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：小学认识的数盘点（actor 文本卡）
      {
        narration: '在小学，我们认识的数都有哪些？零，还有各种正数：自然数 1、2、3……，正分数像二分之一、四分之三，正小数像 0.5、8848.86。这些数有一个共同特点——全部大于零或者等于零。没有一个"比零还小"的！',
        enter: function (anim) {
          S.actor('s2-title', 0, 7, '小学认识的数', { color: COOL, size: 22, bold: true });
          S.actor('s2-n1', -5, 5, '自然数：$0, 1, 2, 3, \\ldots$',      { color: INK,  size: 17 });
          S.actor('s2-n2',  5, 5, '正分数：$\\dfrac{1}{2},\\ \\dfrac{3}{4},\\ \\ldots$', { color: INK, size: 17 });
          S.actor('s2-n3', -5, 3, '正小数：$0.5,\\ 2.5,\\ 8848.86,\\ \\ldots$', { color: INK, size: 17 });
          S.actor('s2-n4',  5, 3, '共同特点：全部 $\\geq 0$！',          { color: TEAL, size: 17, bold: true });
          S.actor('s2-q',   0, 1, '问题：怎么表示"比 $0$ 还小"的量？',    { color: WARM, size: 18, bold: true });

          P.renderCard(
            '<b>小学数的家族</b><br>' +
            '自然数、正分数、正小数——全都 $\\geq 0$<br>' +
            '没有一个数能表示"零下""亏损""低于海平面"……'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 2：三组相反意义的量（renderTable）
      {
        narration: '生活里，这样"方向相反"的量到处都是。看黑板这张表——温度有零上、零下；海拔有高于海平面、低于海平面；收支有收入、支出。每一行两个量，方向完全相反。但小学学的数，只能写一边，另一边没法写！',
        enter: function (anim) {
          // 清掉上一步元素
          S.remove('s2-title');
          S.remove('s2-n1');
          S.remove('s2-n2');
          S.remove('s2-n3');
          S.remove('s2-n4');
          S.remove('s2-q');

          P.renderTable({
            head: ['情境', '一个方向', '相反方向'],
            rows: [
              ['温度',   '零上 $3$℃',       '零下 $3$℃'],
              ['海拔',   '高于海平面 $8848.86$ 米',  '低于海平面 $155$ 米'],
              ['收支',   '收入 $500$ 元',             '支出 $200$ 元']
            ]
          });

          P.renderCard(
            '<b>三组相反意义的量</b><br>' +
            '每行两个量，方向完全相反。<br>' +
            '小学的数只能写"正方向"那边——另一边无法表示！'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 3：数学家的做法：加"+""-"号
      {
        narration: '数学家面对"数不够用"的困境，用了一个非常简洁的方法：给数前面加一个符号！约定一个方向为正，用"+"号标记；另一个方向用"−"号标记。带"−"号的数，就叫负数！这样，相反的两个量就都能写出来了。',
        enter: function (anim) {
          S.actor('s2-math-title', 0, 7, '数学家的方案', { color: TEAL, size: 21, bold: true });
          S.actor('s2-rule1', 0, 5.2, '规定一个方向为正：加 $+$ 号', { color: WARM, size: 17 });
          S.actor('s2-rule2', 0, 3.8, '另一个方向为负：加 $-$ 号',   { color: COOL, size: 17 });
          S.actor('s2-ex1', -5, 2.2, '零上 $3$℃ → $+3$℃', { color: WARM, size: 15 });
          S.actor('s2-ex2',  5, 2.2, '零下 $3$℃ → $-3$℃', { color: COOL, size: 15 });
          S.actor('s2-ex3', -5, 0.8, '高于海面 $8848.86$ 米 → $+8848.86$ 米', { color: WARM, size: 14 });
          S.actor('s2-ex4',  5, 0.8, '低于海面 $155$ 米 → $-155$ 米',   { color: COOL, size: 14 });
          S.actor('s2-def',  0, -1,  '带"$-$"号的数，就叫<b>负数</b>！', { color: COOL, size: 20, bold: true });

          P.renderCard(
            '<b>数学家的做法</b><br>' +
            '给数前加 $+$ 或 $-$ 符号，区分相反方向<br>' +
            '带 $-$ 号的数叫<b>负数</b>；这就是引入负数的历史动机！',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
