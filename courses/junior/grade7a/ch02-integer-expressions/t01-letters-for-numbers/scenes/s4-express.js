// s4-express.js  环节四：四、列式表示数量关系（3步）
// 数学验算：
//   步骤1：a的2倍 = 2×a = 2a；与b的差 = 2a-b；取a=3,b=1验算：2×3-1=5 ✓
//   步骤2：m个苹果÷5人 = m/5；÷n人 = m/n；取m=20,n=4验算：20/4=5 ✓
//   步骤3：偶数=2n，n=0→0,n=1→2,n=-1→-2 ✓；奇数=2n+1，n=0→1,n=-1→-1 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、列式表示数量关系',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：倍数与差 2a-b
      {
        narration: '学会了书写规范，现在我们来用含字母的式子表示数量关系。第一题：a的2倍与b的差是多少？分解来看：a的2倍，就是2乘以a，省略乘号写成2a；再减去b，得到2a减b。所以答案是2a-b。再来一题：比a大5的数，就是a+5。同桌互相出一题，练习一下。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.2, '列式表示数量关系', { color: COOL, size: 21, bold: true });

          // 例题1
          S.actor('s4-q1', 0, 5.6,
            '例题：$a$ 的 2 倍与 $b$ 的差是多少？',
            { color: INK, size: 18 });

          // 推导过程
          S.actor('s4-d1-step1', -5.0, 3.8, '$2 \\times a$',  { color: INK, size: 20 });
          S.actor('s4-d1-arr1',  -1.8, 3.8, '省乘号',         { color: GRAY, size: 14 });
          S.actor('s4-d1-step2',  0.8, 3.8, '$2a$',           { color: ORANGE, size: 20 });
          S.actor('s4-d1-arr2',   3.2, 3.8, '减去 $b$',       { color: GRAY, size: 14 });
          S.actor('s4-d1-ans',    6.5, 3.8, '$2a-b$',         { color: WARM, size: 22, bold: true });

          // 追加例子
          S.actor('s4-ex2-q',   -4.0, 2.0, '比 $a$ 大 5 的数：', { color: INK, size: 17 });
          S.actor('s4-ex2-ans',  4.0, 2.0, '$a+5$',              { color: GREEN, size: 20, bold: true });

          P.renderCard(
            '<b>列式：倍数与差</b><br>' +
            '$a$ 的 2 倍 $\\rightarrow 2 \\times a \\rightarrow 2a$<br>' +
            '与 $b$ 的差 $\\rightarrow 2a - b$<br>' +
            '比 $a$ 大 5 的数 $\\rightarrow a+5$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：平均分 m/5 → m/n
      {
        narration: '第二题：m个苹果平均分给5个人，每人得几个？平均分就是除法，m除以5，除法要改写成分数——分子是m，分母是5，写成m/5，读作"5分之m"，也就是m除以5。再追问：如果分给n个人呢？同理，m除以n，写成m/n，读作"n分之m"。n可以是任意正整数，这个式子就覆盖了所有人数的情况！',
        enter: function (anim) {
          // 清上一步
          S.remove('s4-title'); S.remove('s4-q1');
          S.remove('s4-d1-step1'); S.remove('s4-d1-arr1'); S.remove('s4-d1-step2');
          S.remove('s4-d1-arr2'); S.remove('s4-d1-ans');
          S.remove('s4-ex2-q'); S.remove('s4-ex2-ans');

          S.actor('s4-title2', 0, 7.2, '平均分——除法改分数', { color: COOL, size: 21, bold: true });

          // 例题2
          S.actor('s4-q2', 0, 5.6,
            '$m$ 个苹果平均分给 5 人，每人得几个？',
            { color: INK, size: 18 });

          S.actor('s4-d2-op',    -4.5, 4.0, '$m \\div 5$',         { color: INK, size: 20 });
          S.actor('s4-d2-arrow',  0.0, 4.0, '除法改分数',           { color: GRAY, size: 14 });
          S.actor('s4-d2-ans',    5.0, 4.0, '$\\dfrac{m}{5}$',     { color: TEAL, size: 24, bold: true });

          // 追问
          S.actor('s4-d2-follow', 0, 2.3,
            '分给 $n$ 人呢？',
            { color: ORANGE, size: 17 });
          S.actor('s4-d2-follow-op',  -3.5, 1.0, '$m \\div n$', { color: INK, size: 20 });
          S.actor('s4-d2-follow-arr',  0.5, 1.0, '→',           { color: GRAY, size: 18 });
          S.actor('s4-d2-follow-ans',  3.5, 1.0, '$\\dfrac{m}{n}$', { color: TEAL, size: 24, bold: true });

          P.renderCard(
            '<b>列式：平均分</b><br>' +
            '$m$ 个苹果 $\\div$ 5 人 $\\rightarrow \\dfrac{m}{5}$<br>' +
            '分给 $n$ 人 $\\rightarrow \\dfrac{m}{n}$<br>' +
            '除法必须改写为分数形式！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：偶数2n，奇数2n+1（n为整数）
      {
        narration: '最后一个情境，偶数和奇数的表示。偶数有：…-4,-2,0,2,4,6,…它们都能被2整除——用2n表示（n为整数）。注意：n=0时2n=0，零也是偶数！n=-1时2n=-2，负偶数也包含进来了！奇数有：…-3,-1,1,3,5,…每个奇数都比某个偶数多1——用2n+1表示（n为整数）。n取负整数时，2n+1同样覆盖负奇数，n没有"只能取正整数"的限制！',
        enter: function (anim) {
          // 清上一步
          S.remove('s4-title2'); S.remove('s4-q2');
          S.remove('s4-d2-op'); S.remove('s4-d2-arrow'); S.remove('s4-d2-ans');
          S.remove('s4-d2-follow'); S.remove('s4-d2-follow-op');
          S.remove('s4-d2-follow-arr'); S.remove('s4-d2-follow-ans');

          S.actor('s4-title3', 0, 7.2, '偶数与奇数', { color: COOL, size: 21, bold: true });

          // 偶数
          S.actor('s4-even-head', -4.0, 5.8, '偶数（蓝色）', { color: COOL, size: 17, bold: true });
          S.actor('s4-even-list', -4.0, 4.6,
            '$\\cdots,-4,-2,0,2,4,6,\\cdots$',
            { color: COOL, size: 17 });
          S.actor('s4-even-form', -4.0, 3.4,
            '偶数 $= 2n$（$n$ 为整数）',
            { color: COOL, size: 19, bold: true });

          // 偶数特殊代入验证
          S.actor('s4-even-v1', -4.0, 2.2,
            '$n=0$：$2 \\times 0=0$（0 是偶数！）',
            { color: COOL, size: 15 });
          S.actor('s4-even-v2', -4.0, 1.3,
            '$n=-1$：$2 \\times (-1)=-2$（负偶数）',
            { color: COOL, size: 15 });

          // 分隔线
          S.addSegment('s4-vsep', [1.5, 6.4], [1.5, 0.4], { color: GRAY, width: 1, dash: 2 });

          // 奇数
          S.actor('s4-odd-head', 5.5, 5.8, '奇数（橙色）', { color: ORANGE, size: 17, bold: true });
          S.actor('s4-odd-list', 5.5, 4.6,
            '$\\cdots,-3,-1,1,3,5,\\cdots$',
            { color: ORANGE, size: 17 });
          S.actor('s4-odd-form', 5.5, 3.4,
            '奇数 $= 2n+1$（$n$ 为整数）',
            { color: ORANGE, size: 19, bold: true });

          // 奇数特殊代入验证
          S.actor('s4-odd-v1', 5.5, 2.2,
            '$n=0$：$2 \\times 0+1=1$',
            { color: ORANGE, size: 15 });
          S.actor('s4-odd-v2', 5.5, 1.3,
            '$n=-1$：$2 \\times (-1)+1=-1$（负奇数）',
            { color: ORANGE, size: 15 });

          // 强调框
          S.actor('s4-warn', 0, -0.5,
            '重点：$n$ 没有"只能取正整数"的限制！',
            { color: WARM, size: 17, bold: true });

          // 结论
          S.actor('s4-concl', 0, -2.0,
            '用字母，无穷多个数一式概括！',
            { color: TEAL, size: 19, bold: true });

          P.renderCard(
            '<b>偶数与奇数</b><br>' +
            '偶数 $= 2n$（$n$ 为整数）：含 $0$、负偶数<br>' +
            '奇数 $= 2n+1$（$n$ 为整数）：含负奇数<br>' +
            '<b>$n$ 可取 0 和负整数！</b>',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
