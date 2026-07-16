// s1-three-var.js  三元一次方程组引入（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、三元一次方程组引入',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：从二元到三元，问题情境
        narration: '同学们，我们已经学会了解二元一次方程组——含有两个未知数。那么，如果一个问题中出现了<b>三个未知数</b>，我们该怎么办呢？先来看一个例子：某次数学竞赛中，甲、乙、丙三人的得分满足：甲乙丙之和为 6 分，甲减去乙再加上丙得 2 分，甲加乙减丙等于 0 分。设甲得 $x$ 分、乙得 $y$ 分、丙得 $z$ 分，就得到了一个含三个未知数的方程组！',
        enter: function (anim) {
          // 背景卡
          S.addPolygon('intro-bg',
            [[-12.5, 8.5], [12.5, 8.5], [12.5, -8.5], [-12.5, -8.5]],
            { fillColor: '#e8eaf6', fillOpacity: 0.4, strokeColor: BLUE, strokeWidth: 2 });

          // 问题描述
          S.addText('intro-t1', -12, 7.5, '问题情境', { size: 18, color: BLUE });
          S.addText('intro-t2', -12, 6.2,
            '甲、乙、丙三人竞赛得分满足：',
            { size: 16, color: INK });
          S.addText('intro-t3', -12, 4.8,
            '① 甲 + 乙 + 丙 = 6',
            { size: 16, color: PURPLE });
          S.addText('intro-t4', -12, 3.4,
            '② 甲 - 乙 + 丙 = 2',
            { size: 16, color: ORANGE });
          S.addText('intro-t5', -12, 2.0,
            '③ 甲 + 乙 - 丙 = 0',
            { size: 16, color: GREEN });

          // 设元
          S.addText('intro-t6', -12, 0.4,
            '设甲得 $x$ 分，乙得 $y$ 分，丙得 $z$ 分',
            { size: 15, color: INK });

          // 方程组
          S.addText('intro-eq', -2, 0.4,
            '$\\begin{cases}x+y+z=6\\\\x-y+z=2\\\\x+y-z=0\\end{cases}$',
            { size: 20, color: RED });

          P.renderCard(
            '<b>从二元到三元</b><br><br>' +
            '三个未知数 $x, y, z$<br>' +
            '三个方程——构成<b>三元一次方程组</b>'
          );

          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：定义三元一次方程组
        narration: '<b>三元一次方程组</b>：含有三个未知数，且每个方程都是一次方程（未知数指数为 1）的方程组。解它的基本思想是什么？——还是我们熟悉的<b>消元</b>！把三个未知数一步步消去，化简问题。',
        enter: function (anim) {
          S.remove('intro-bg');
          S.remove('intro-t1'); S.remove('intro-t2'); S.remove('intro-t3');
          S.remove('intro-t4'); S.remove('intro-t5'); S.remove('intro-t6');
          S.remove('intro-eq');

          // 定义框
          S.addPolygon('def-bg',
            [[-12.5, 8.5], [12.5, 8.5], [12.5, 3.5], [-12.5, 3.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('def-title', 0, 7.8,
            '三元一次方程组',
            { size: 22, color: BLUE, anchorX: 'middle' });
          S.addText('def-t1', -12, 6.5,
            '定义：含有<b>三个未知数</b>，且每个方程都是<b>一次方程</b>的方程组',
            { size: 16, color: INK });
          S.addText('def-t2', -12, 5.2,
            '例：$\\begin{cases}x+y+z=6 & ①\\\\x-y+z=2 & ②\\\\x+y-z=0 & ③\\end{cases}$',
            { size: 18, color: PURPLE });

          // 解法思想
          S.addPolygon('idea-bg',
            [[-12.5, 3.0], [12.5, 3.0], [12.5, -1.0], [-12.5, -1.0]],
            { fillColor: '#f3e5f5', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('idea-title', 0, 2.3,
            '基本思想：消元',
            { size: 20, color: PURPLE, anchorX: 'middle' });
          S.addText('idea-t1', 0, 1.0,
            '三个未知数 → 两个未知数 → 一个未知数 → 求解',
            { size: 16, color: INK, anchorX: 'middle' });
          S.addText('idea-t2', 0, -0.4,
            '（和二元一次方程组的思路完全一样！）',
            { size: 15, color: GRAY, anchorX: 'middle' });

          P.renderCard(
            '<b>三元一次方程组</b><br><br>' +
            '解法核心：<b>消元思想</b><br>' +
            '三个未知数 → 逐步消去 → 一元'
          );

          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：降元链示意图
        narration: '我们把这个过程叫作<b>降元</b>——每一轮消元，未知数个数减少一个，最终变成一元方程求解。这个链条是：三元→二元→一元。看这张示意图，三元方程组经过两次消元，变成二元方程组，再经过一次消元，变成一元方程，就解出来了！',
        enter: function (anim) {
          S.remove('def-bg'); S.remove('def-title'); S.remove('def-t1'); S.remove('def-t2');
          S.remove('idea-bg'); S.remove('idea-title'); S.remove('idea-t1'); S.remove('idea-t2');

          // 降元链示意图
          S.addText('chain-title', 0, 7.5, '降元链：消元的路径', { size: 20, color: BLUE, anchorX: 'middle' });

          // 三元方程组框
          S.addPolygon('box3', [[-11, 5.5], [-4, 5.5], [-4, 2.5], [-11, 2.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 3 });
          S.addText('box3-t', -7.5, 4.5, '三元方程组', { size: 18, color: BLUE, anchorX: 'middle' });
          S.addText('box3-t2', -7.5, 3.2, '（3个未知数）', { size: 15, color: GRAY, anchorX: 'middle' });

          // 箭头1
          S.addSegment('arr1-line', [-3.5, 4.0], [0.5, 4.0], { color: ORANGE, width: 3, dash: 0 });
          S.addText('arr1-tip', 0.8, 3.8, '▶', { size: 16, color: ORANGE });
          S.addText('arr1-lbl', -1.5, 4.6, '消去一个未知数', { size: 13, color: ORANGE, anchorX: 'middle' });

          // 二元方程组框
          S.addPolygon('box2', [[1, 5.5], [8, 5.5], [8, 2.5], [1, 2.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 3 });
          S.addText('box2-t', 4.5, 4.5, '二元方程组', { size: 18, color: GREEN, anchorX: 'middle' });
          S.addText('box2-t2', 4.5, 3.2, '（2个未知数）', { size: 15, color: GRAY, anchorX: 'middle' });

          // 箭头2
          S.addSegment('arr2-line', [8.5, 4.0], [12, 4.0], { color: RED, width: 3, dash: 0 });
          S.addText('arr2-tip', 12.2, 3.8, '▶', { size: 16, color: RED });
          S.addText('arr2-lbl', 10.2, 4.6, '再次消元', { size: 13, color: RED, anchorX: 'middle' });

          // 一元方程框（下移显示）
          S.addSegment('arr3-line', [4.5, 2.0], [4.5, -0.5], { color: PURPLE, width: 3, dash: 0 });
          S.addText('arr3-tip', 4.1, -0.7, '▼', { size: 16, color: PURPLE });
          S.addText('arr3-lbl', 5.0, 0.7, '再次消元', { size: 13, color: PURPLE });

          S.addPolygon('box1', [[-3, -1], [12.5, -1], [12.5, -4], [-3, -4]],
            { fillColor: '#fff8e1', fillOpacity: 0.9, strokeColor: GOLD, strokeWidth: 3 });
          S.addText('box1-t', 4.5, -1.8, '一元方程  →  直接解出！', { size: 18, color: GOLD, anchorX: 'middle' });
          S.addText('box1-t2', 4.5, -3.0, '（1个未知数）', { size: 15, color: GRAY, anchorX: 'middle' });

          // 回代
          S.addText('back-t', -0.5, -5.5, '← 回代 ← 回代 ←  得到所有未知数的值', { size: 15, color: PURPLE });

          P.renderCard(
            '<b>降元链</b><br><br>' +
            '三元 → 二元 → 一元<br>' +
            '↓<br>' +
            '解出一个 → 回代 → 全部求出<br><br>' +
            '每次消去一个未知数，方程变简单！'
          );

          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
