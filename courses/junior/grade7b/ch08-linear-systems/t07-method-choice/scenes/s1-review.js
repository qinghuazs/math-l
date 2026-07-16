// s1-review.js  两种方法回顾（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var CYAN   = '#00838f';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、两种消元方法回顾',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：对比表格——代入法五步 vs 加减法五步
        narration: '同学们好！从这节课开始，我们已经掌握了解二元一次方程组的两种消元方法——代入法和加减法。今天这节课，我们不是再学新方法，而是要弄清楚：同一道题，到底该选哪种方法来做更简便？先来一起回顾这两种方法的基本步骤。',
        enter: function (anim) {
          P.renderTable({
            head: ['', '代入法', '加减法'],
            rows: [
              ['第①步', '选一个方程', '观察两方程'],
              ['第②步', '用一个未知数表示另一个', '选一个未知数的系数'],
              ['第③步', '代入另一方程（消元）', '倍乘使系数相同或相反'],
              ['第④步', '解一元方程，求出一个未知数', '两方程相加或相减（消元）'],
              ['第⑤步', '回代求另一个未知数，检验', '求出一个未知数，回代检验'],
            ]
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：左右两栏——分别展示方法特征
        narration: '看完表格，我们再来感受一下两种方法各自的"动作感"。代入法的核心动作是：先把一个方程变形，用一个未知数表示另一个，再把这个表达式代进去——叫做"代入"。加减法的核心动作是：不需要变形，直接让两个方程的同一个未知数"正负相消"——叫做"相加减消去"。两种方法都是在做同一件事，请看——',
        enter: function (anim) {
          // 左栏：代入法
          S.addPolygon('bg-sub',
            [[-9.8, 7.5], [-0.3, 7.5], [-0.3, -7.5], [-9.8, -7.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.7, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('sub-title', -5, 7.0, '代入法', { size: 20, color: BLUE, anchorX: 'middle' });
          S.addText('sub-1', -5, 5.8, '① 选取含未知数的方程', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('sub-2', -5, 4.5, '② 变形：用 y 表示 x', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('sub-3', -5, 3.2, '③ 代入另一方程', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('sub-4', -5, 1.9, '（消去 y，得只含 x 的方程）', { size: 13, color: BLUE, anchorX: 'middle' });
          S.addText('sub-5', -5, 0.6, '④ 解一元方程', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('sub-6', -5, -0.7, '⑤ 回代 + 检验', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('sub-key', -5, -2.5, '关键词：代 入', { size: 16, color: BLUE, anchorX: 'middle' });

          // 右栏：加减法
          S.addPolygon('bg-elim',
            [[0.3, 7.5], [9.8, 7.5], [9.8, -7.5], [0.3, -7.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.7, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('elim-title', 5, 7.0, '加减法', { size: 20, color: GREEN, anchorX: 'middle' });
          S.addText('elim-1', 5, 5.8, '① 选一个要消去的未知数', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('elim-2', 5, 4.5, '② 看系数是否相同/相反', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('elim-3', 5, 3.2, '③ 若需要，乘以适当倍数', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('elim-4', 5, 1.9, '④ 两方程相加或相减', { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('elim-5', 5, 0.6, '（消去目标未知数）', { size: 13, color: GREEN, anchorX: 'middle' });
          S.addText('elim-6', 5, -0.7, '⑤ 解方程 + 回代 + 检验', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('elim-key', 5, -2.5, '关键词：加减消去', { size: 16, color: GREEN, anchorX: 'middle' });

          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：共同本质——消元（二元→一元）
        narration: '不管用哪种方法，有没有发现它们在做同一件事？两种方法的共同本质就是——消元！把二元一次方程组里的一个未知数消掉，让它变成一元一次方程，再去求解。所以这两种方法只是路径不同，目的地完全相同。今天我们要学的，就是如何根据方程组的"长相"，选择走哪条路更顺！',
        enter: function (anim) {
          // 清空左右栏细节，突出共同本质
          S.remove('bg-sub'); S.remove('sub-title');
          S.remove('sub-1'); S.remove('sub-2'); S.remove('sub-3');
          S.remove('sub-4'); S.remove('sub-5'); S.remove('sub-6'); S.remove('sub-key');
          S.remove('bg-elim'); S.remove('elim-title');
          S.remove('elim-1'); S.remove('elim-2'); S.remove('elim-3');
          S.remove('elim-4'); S.remove('elim-5'); S.remove('elim-6'); S.remove('elim-key');

          // 核心本质卡
          S.addPolygon('bg-essence',
            [[-9, 6], [9, 6], [9, 1.5], [-9, 1.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: ORANGE, strokeWidth: 3 });
          S.addText('essence-title', 0, 5.4, '两种方法的共同本质', { size: 20, color: ORANGE, anchorX: 'middle' });
          S.addText('essence-core', 0, 3.5,
            '消元：二元一次方程组  →  一元一次方程  →  求解',
            { size: 16, color: INK, anchorX: 'middle' });

          // 流程图式展示
          S.addPolygon('bg-flow',
            [[-9, 1.0], [9, 1.0], [9, -4.5], [-9, -4.5]],
            { fillColor: '#f3e5f5', fillOpacity: 0.8, strokeColor: PURPLE, strokeWidth: 2 });

          // 左路径（代入法）
          S.addText('path1-title', -5.5, 0.5, '代入法路径', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('path1-step', -5.5, -0.7, '变形 → 代入 → 消元', { size: 14, color: BLUE, anchorX: 'middle' });

          // 中间箭头
          S.addPolygon('arr-left-head',
            [[-0.8, -1.5], [0, -1.8], [-0.8, -2.1]],
            { fillColor: PURPLE, fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 1 });
          S.addSegment('arr-left', [-5.5, -1.9], [-0.8, -1.9], { color: PURPLE, width: 2 });

          // 终点（一元方程）
          S.addPolygon('bg-goal',
            [[-0.5, -0.8], [9, -0.8], [9, -2.9], [-0.5, -2.9]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('goal-text', 4.3, -1.9, '一元一次方程 → 求解 ✓', { size: 15, color: GREEN, anchorX: 'middle' });

          // 右路径（加减法）
          S.addText('path2-title', -5.5, -3.5, '加减法路径', { size: 16, color: GREEN, anchorX: 'middle' });
          S.addText('path2-step', -5.5, -4.2, '倍乘 → 相加减 → 消元', { size: 14, color: GREEN, anchorX: 'middle' });

          // 右侧箭头
          S.addPolygon('arr-right-head',
            [[-0.8, -3.3], [0, -3.6], [-0.8, -3.9]],
            { fillColor: PURPLE, fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 1 });
          S.addSegment('arr-right', [-5.5, -3.6], [-0.8, -3.6], { color: PURPLE, width: 2 });

          // 今天目标
          S.addPolygon('bg-today',
            [[-9, -5.0], [9, -5.0], [9, -7.5], [-9, -7.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.9, strokeColor: CYAN, strokeWidth: 2 });
          S.addText('today-text', 0, -6.0,
            '今天目标：根据方程组特征，选更顺的那条路！',
            { size: 16, color: CYAN, anchorX: 'middle' });

          P.renderCard(
            '<b>两种消元方法的共同本质</b><br><br>' +
            '无论代入法还是加减法，<br>' +
            '都是在<b>消去一个未知数</b>，<br>' +
            '把<b>二元</b>方程组变成<b>一元</b>方程来解！<br><br>' +
            '<b>今天的问题</b>：遇到一道方程组，<br>' +
            '怎么判断用哪种方法更简便？'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
