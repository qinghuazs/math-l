// s6-summary.js  环节六：易错辨析与小结（3步）
// 数学验算（易错例）：
//   易错一：-(a-b) 正确结果=-a+b（而非-a-b），b 项变号  ✓
//   易错二：(3x²+2x-1)-(x²-3x+4) = 3x²+2x-1-x²+3x-4 = 2x²+5x-5  ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var RED  = '#c62828';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：易错一（减号去括号漏变号）和 易错二（求差漏打括号）
      {
        narration: '易错辨析时间！先看两个经典错误。易错一：减号去括号漏变号——有同学写 负括号a减b，去括号得 负a减b，注意 b 前面的符号没变，这是错的！正确做法是括号内每一项都变号：应该是 负a加b。易错二：求差时漏打括号——有同学写 括号3x²加2x减1，直接减 x²减3x加4，只给第一项 x² 变了号，后面 负3x 和 正4 没变号，这也错了！正确做法：被减式必须整体打括号，减号在外面，括号里每一项都变号。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.3, '易错辨析', { color: RED, size: 22, bold: true });
          // 分割线
          S.addSegment('s6-div1', [-10, 3.5], [10, 3.5], { color: GRAY, width: 1, dash: 2 });
          // 易错一
          S.actor('s6-e1-title', 0, 6.0, '易错一：减号去括号漏变号', { color: RED, size: 19, bold: true });
          S.actor('s6-e1-wrong', -3.5, 4.8,
            '【错】$-(a - b) = -a - b$',
            { color: RED, size: 18 });
          S.actor('s6-e1-right', 3.5, 4.8,
            '【对】$-(a - b) = -a + b$',
            { color: GREEN, size: 18 });
          // 易错二
          S.actor('s6-e2-title', 0, 2.8, '易错二：求差时漏打括号', { color: RED, size: 19, bold: true });
          S.actor('s6-e2-wrong', 0, 1.7,
            '【错】$(3x^{2}+2x-1) - x^{2} - 3x + 4$',
            { color: RED, size: 17 });
          S.actor('s6-e2-note', 0, 0.7,
            '（只有第一项 $x^{2}$ 变号，后面没变）',
            { color: RED, size: 15 });
          S.actor('s6-e2-right', 0, -0.5,
            '【对】$(3x^{2}+2x-1) - (x^{2} - 3x + 4)$',
            { color: GREEN, size: 17 });
          S.actor('s6-e2-expand', 0, -1.7,
            '$= 2x^{2} + 5x - 5$',
            { color: GREEN, size: 18, bold: true });
          P.renderCard(
            '<b>易错辨析</b><br>' +
            '易错一：$-(a-b) = -a + b$（$b$ 也要变号！）<br>' +
            '易错二：求差被减式<b>必须打括号</b><br>' +
            '$(3x^{2}+2x-1) - (x^{2}-3x+4) = 2x^{2}+5x-5$'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 2：步骤总结表格
      {
        narration: '来看步骤总结表格。整式加减一共三行要记住：第一步去括号——减号括号内各项全变号；第二步合并同类项——系数相加减，字母指数不动；化简求值——先化简，再代入，不能先代入硬算。三行背熟，这节课的核心就掌握了！',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-div1');
          S.remove('s6-e1-title'); S.remove('s6-e1-wrong'); S.remove('s6-e1-right');
          S.remove('s6-e2-title'); S.remove('s6-e2-wrong'); S.remove('s6-e2-note');
          S.remove('s6-e2-right'); S.remove('s6-e2-expand');
          S.actor('s6-table-title', 0, 7.0, '本课步骤总结', { color: TEAL, size: 22, bold: true });
          P.renderTable({
            head: ['步骤', '操作', '注意事项'],
            rows: [
              ['第一步', '去括号', '减号括号内各项全变号'],
              ['第二步', '合并同类项', '系数相加减，字母不变'],
              ['化简求值', '先化简再代入', '化简后式子最简再代入'],
            ]
          });
          P.renderCard(
            '<b>整式加减三步法</b><br>' +
            '① 去括号（减号各项全变号）<br>' +
            '② 合并同类项（字母指数不变）<br>' +
            '③ 化简求值：先化简，再代入！',
            'cool'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：全课小结 + 悬念（下节单元复习）
      {
        narration: '整式的加减，今天全部收入囊中！核心口诀记四句：求差不打括号必出错——被减式永远先加括号；减号进括号每项都变号——一项都不能漏；化简求值不走捷径——先化简，再代入；整式加减的本质只有一件事——合并同类项，字母和指数一律不动。同学们，下节课是第二章单元复习，整章的关键考点将逐一亮相，敢来挑战吗？',
        enter: function (anim) {
          S.actor('s6-slogan1', 0, 5.5,
            '求差不打括号，必出错！',
            { color: RED, size: 19, bold: true });
          S.actor('s6-slogan2', 0, 4.2,
            '减号进括号，每项都变号！',
            { color: WARM, size: 19, bold: true });
          S.actor('s6-slogan3', 0, 2.9,
            '化简求值不走捷径——先化简，再代入！',
            { color: COOL, size: 18, bold: true });
          S.actor('s6-slogan4', 0, 1.6,
            '整式加减的本质：合并同类项！',
            { color: TEAL, size: 18, bold: true });
          S.actor('s6-next', 0, 0.0,
            '——下节：单元复习，整章考点逐一亮相，敢来挑战吗？',
            { color: GRAY, size: 16 });
          P.renderCard(
            '<b>整式加减已收入囊中！</b><br>' +
            '求差不打括号，必出错！<br>' +
            '减号进括号，每项都变号！<br>' +
            '化简求值：先化简，再代入！<br>' +
            '本质：合并同类项。<br>' +
            '下节单元复习，整章关键考点逐一亮相——敢来挑战吗？',
            'warm',
            'headShake'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
