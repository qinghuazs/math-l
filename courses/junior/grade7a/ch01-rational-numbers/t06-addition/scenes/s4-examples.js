// s4-examples.js  四、例题精讲（3步）
// 数学验算：
//   例1：(-3)+(-9)：同号取负，3+9=12，结果-12 ✓
//   例2：(-4.7)+3.9：异号，|-4.7|=4.7>|3.9|=3.9，取负，4.7-3.9=0.8，结果-0.8 ✓
//   例3：(1/2)+(-2/3)：异号，通分 |1/2|=3/6, |-2/3|=4/6，4/6>3/6取负，4/6-3/6=1/6，结果-1/6 ✓
//   验证净胜球：(+3)+(-2)：异号，|+3|>|-2|，取正，3-2=1，结果+1 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、例题精讲',
    bbox: [-11, 9, 11, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：整数例 (-3)+(-9)=-12
      {
        narration: '第一道例题：计算(-3)+(-9)。严格按两步走格式演示。第一步看符号：两个都是负数，同号！第二步定结果：取负号，绝对值相加3+9=12。所以(-3)+(-9)=-12。',
        enter: function (anim) {
          S.actor('s4-ex1-t', 0, 7.5, '<b>例1</b>　计算 $(-3)+(-9)$', { color: INK, size: 20 });
          S.actor('s4-ex1-s1', -3, 5.5, '<b>第一步</b>：看符号', { color: COOL, size: 17 });
          S.actor('s4-ex1-s1v', 4, 5.5, '两个都是<b>负数</b>，<b>同号</b>！', { color: COOL, size: 16 });
          S.actor('s4-ex1-s2', -3, 3.8, '<b>第二步</b>：定结果', { color: WARM, size: 17 });
          S.actor('s4-ex1-s2a', 4, 3.8, '取<b>负</b>号（相同符号）', { color: WARM, size: 16 });
          S.actor('s4-ex1-s2b', 4, 2.6, '$|{-3}|+|{-9}|=3+9=12$', { color: WARM, size: 16 });
          S.addSegment('s4-ex1-line', [-8, 1.4], [8, 1.4], { color: INK, width: 2, dash: 0 });
          S.actor('s4-ex1-res', 0, 0.2, '$(-3)+(-9) = \\mathbf{-12}$', { color: GREEN, size: 24 });
          P.renderCard(
            '<b>例1：$(-3)+(-9)$</b><br>' +
            '第一步：<b>同号</b>（都是负数）<br>' +
            '第二步：取负，$3+9=12$<br>' +
            '结果：$(-3)+(-9) = \\mathbf{-12}$',
            'cool'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 2：小数例 (-4.7)+3.9=-0.8
      {
        narration: '第二道：计算(-4.7)+3.9。第一步看符号：一负一正，异号！第二步定结果：比较绝对值，|-4.7|=4.7大于|3.9|=3.9，所以取负号；绝对值相减4.7-3.9=0.8。结果(-4.7)+3.9=-0.8。',
        enter: function (anim) {
          S.remove('s4-ex1-t'); S.remove('s4-ex1-s1'); S.remove('s4-ex1-s1v');
          S.remove('s4-ex1-s2'); S.remove('s4-ex1-s2a'); S.remove('s4-ex1-s2b');
          S.remove('s4-ex1-line'); S.remove('s4-ex1-res');
          S.actor('s4-ex2-t', 0, 7.5, '<b>例2</b>　计算 $(-4.7)+3.9$', { color: INK, size: 20 });
          S.actor('s4-ex2-s1', -3, 5.5, '<b>第一步</b>：看符号', { color: COOL, size: 17 });
          S.actor('s4-ex2-s1v', 4, 5.5, '一负一正，<b>异号</b>！', { color: COOL, size: 16 });
          S.actor('s4-ex2-s2', -3, 3.8, '<b>第二步</b>：定结果', { color: WARM, size: 17 });
          S.actor('s4-ex2-s2a', 4, 3.8, '比绝对值：$|-4.7|=4.7 \\gt |3.9|=3.9$', { color: WARM, size: 15 });
          S.actor('s4-ex2-s2b', 4, 2.6, '取<b>负</b>号（4.7 对应的加数是负数）', { color: WARM, size: 15 });
          S.actor('s4-ex2-s2c', 4, 1.4, '$4.7 - 3.9 = 0.8$', { color: WARM, size: 16 });
          S.addSegment('s4-ex2-line', [-8, 0.4], [8, 0.4], { color: INK, width: 2, dash: 0 });
          S.actor('s4-ex2-res', 0, -0.8, '$(-4.7)+3.9 = \\mathbf{-0.8}$', { color: GREEN, size: 24 });
          P.renderCard(
            '<b>例2：$(-4.7)+3.9$</b><br>' +
            '第一步：<b>异号</b><br>' +
            '第二步：$|-4.7| \\gt |3.9|$，取负，$4.7-3.9=0.8$<br>' +
            '结果：$(-4.7)+3.9 = \\mathbf{-0.8}$',
            'warm'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 3：分数例 + 回头验证净胜球
      {
        narration: '第三道分数例题：1/2加上(-2/3)。异号，先通分比绝对值：|1/2|=3/6，|-2/3|=4/6，4/6更大，取负号。绝对值相减：4/6-3/6=1/6。结果是-1/6。最后回头验证净胜球：(+3)+(-2)=+1，和我们一开始凭常识的答案完全一致！',
        enter: function (anim) {
          S.remove('s4-ex2-t'); S.remove('s4-ex2-s1'); S.remove('s4-ex2-s1v');
          S.remove('s4-ex2-s2'); S.remove('s4-ex2-s2a'); S.remove('s4-ex2-s2b');
          S.remove('s4-ex2-s2c'); S.remove('s4-ex2-line'); S.remove('s4-ex2-res');
          S.actor('s4-ex3-t', 0, 7.8, '<b>例3</b>　计算 $\\dfrac{1}{2}+\\left(-\\dfrac{2}{3}\\right)$', { color: INK, size: 19 });
          S.actor('s4-ex3-s1', -3, 6.2, '<b>第一步</b>：异号', { color: COOL, size: 16 });
          S.actor('s4-ex3-s2', -3, 5.0, '<b>第二步</b>：通分比绝对值', { color: WARM, size: 16 });
          S.actor('s4-ex3-cmp', 4, 5.0,
            '$\\left|\\dfrac{1}{2}\\right|=\\dfrac{3}{6},\\ \\left|-\\dfrac{2}{3}\\right|=\\dfrac{4}{6}$',
            { color: WARM, size: 16 });
          S.actor('s4-ex3-cmp2', 4, 3.5,
            '$\\dfrac{4}{6} \\gt \\dfrac{3}{6}$，取<b>负</b>号',
            { color: WARM, size: 16 });
          S.actor('s4-ex3-calc', 4, 2.2,
            '$\\dfrac{4}{6}-\\dfrac{3}{6}=\\dfrac{1}{6}$',
            { color: WARM, size: 16 });
          S.addSegment('s4-ex3-line', [-8, 1.2], [8, 1.2], { color: INK, width: 2, dash: 0 });
          S.actor('s4-ex3-res', 0, 0.0,
            '$\\dfrac{1}{2}+\\left(-\\dfrac{2}{3}\\right)=\\mathbf{-\\dfrac{1}{6}}$',
            { color: GREEN, size: 22 });
          S.addSegment('s4-div', [-8, -1.2], [8, -1.2], { color: INK, width: 1.5, dash: 2 });
          S.actor('s4-verify-t', 0, -2.0, '<b>回头验证净胜球</b>', { color: TEAL, size: 16 });
          S.actor('s4-verify', 0, -3.2,
            '$(+3)+(-2)$：异号，$|+3| \\gt |-2|$，取正，$3-2=1$',
            { color: TEAL, size: 15 });
          S.actor('s4-verify-res', 0, -4.5, '$(+3)+(-2) = \\mathbf{+1}$，净胜1球 ✓', { color: GREEN, size: 18 });
          P.renderCard(
            '<b>例3：$\\dfrac{1}{2}+\\left(-\\dfrac{2}{3}\\right) = -\\dfrac{1}{6}$</b><br>' +
            '通分：$\\dfrac{3}{6}$ vs $\\dfrac{4}{6}$，取负，$\\dfrac{4}{6}-\\dfrac{3}{6}=\\dfrac{1}{6}$<br>' +
            '<b>验证净胜球</b>：$(+3)+(-2)=+1$，与常识一致！',
            'teal',
            'tada'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
