// s4-division.js  环节四：倒数与除法（4步）
// 数学验算：
//   倒数验证：2×(1/2)=1 ✓；(-3/4)×(-4/3)=12/12=1 ✓；(-1)×(-1)=1 ✓
//   例4：(-36)÷9：异号得负，36÷9=4，结果-4 ✓
//   例5：(-12/25)÷(-3/5)=(-12/25)×(-5/3)
//         同号得正，(12×5)/(25×3)=60/75=4/5 ✓
//   对照表验证：-3/4 的相反数=3/4（相加得0 ✓）；倒数=-4/3（相乘得1 ✓）
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var RED = '#c62828', GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、倒数与除法',
    bbox: [-10, 7, 10, -7],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // ── 步1：倒数定义 + 配对连线动画 ──
      {
        narration: '还记得环节二里的钩子吗？(-1/2)×(-2)=1，这两个数的积等于1。像这样，乘积等于1的两个数，就叫互为倒数！2和1/2互为倒数，-3/4和-4/3互为倒数（注意：倒数同号！），-1的倒数是-1，因为(-1)×(-1)=1。0没有倒数，因为没有任何数乘以0等于1。',
        enter: function (anim) {
          S.actor('s4-title', 0, 6.0, '倒数的定义', { color: COOL, size: 21, bold: true });
          S.actor('s4-def', 0, 4.9,
            '乘积等于 $1$ 的两个数，互为<b>倒数</b>',
            { color: INK, size: 18 });

          // 配对展示（左右列 + 连线）
          // 左列：数
          S.actor('s4-pair1-l', -5, 3.5, '$2$', { color: COOL, size: 20 });
          S.actor('s4-pair2-l', -5, 2.2, '$-\\dfrac{3}{4}$', { color: COOL, size: 20 });
          S.actor('s4-pair3-l', -5, 0.9, '$-1$', { color: COOL, size: 20 });
          S.actor('s4-pair4-l', -5, -0.4, '$0$', { color: GRAY, size: 20 });

          // 中间符号
          S.actor('s4-arr1', 0, 3.5, '$\\leftrightarrow$', { color: WARM, size: 22 });
          S.actor('s4-arr2', 0, 2.2, '$\\leftrightarrow$', { color: WARM, size: 22 });
          S.actor('s4-arr3', 0, 0.9, '$\\leftrightarrow$', { color: WARM, size: 22 });
          S.actor('s4-arr4', 0, -0.4, '$\\times$', { color: RED, size: 22 });

          // 右列：倒数
          S.actor('s4-pair1-r', 5, 3.5, '$\\dfrac{1}{2}$', { color: GREEN, size: 20 });
          S.actor('s4-pair2-r', 5, 2.2, '$-\\dfrac{4}{3}$', { color: GREEN, size: 20 });
          S.actor('s4-pair3-r', 5, 0.9, '$-1$', { color: GREEN, size: 20 });
          S.actor('s4-pair4-r', 5, -0.4, '没有倒数', { color: GRAY, size: 16 });

          // 验证标注
          S.actor('s4-verify1', 0, -1.6,
            '（$2\\times\\dfrac{1}{2}=1$，$\\left(-\\dfrac{3}{4}\\right)\\times\\left(-\\dfrac{4}{3}\\right)=1$，$(-1)\\times(-1)=1$）',
            { color: TEAL, size: 13 });
          S.actor('s4-note-zero', 0, -2.6,
            '<b>注意：</b>倒数与原数<b>同号</b>；$0$ 没有倒数',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>倒数定义</b>：乘积 $= 1$ 的两数互为倒数<br>' +
            '$2\\leftrightarrow\\dfrac{1}{2}$，' +
            '$-\\dfrac{3}{4}\\leftrightarrow-\\dfrac{4}{3}$，' +
            '$-1\\leftrightarrow-1$<br>' +
            '$0$ 没有倒数；倒数与原数<b>同号</b>'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步2：相反数 vs 倒数对照表 ──
      {
        narration: '倒数和相反数都是"配对"概念，但运算不同！相反数：相加得0；倒数：相乘得1。看这张对照表，彻底分清这两种配对。注意-3/4的相反数是3/4（正数），而倒数是-4/3（负数，同号！）',
        enter: function (anim) {
          // 清场步1元素
          S.remove('s4-title'); S.remove('s4-def');
          S.remove('s4-pair1-l'); S.remove('s4-pair2-l'); S.remove('s4-pair3-l'); S.remove('s4-pair4-l');
          S.remove('s4-arr1'); S.remove('s4-arr2'); S.remove('s4-arr3'); S.remove('s4-arr4');
          S.remove('s4-pair1-r'); S.remove('s4-pair2-r'); S.remove('s4-pair3-r'); S.remove('s4-pair4-r');
          S.remove('s4-verify1'); S.remove('s4-note-zero');

          S.actor('s4-cmp-title', 0, 6.0, '相反数 vs 倒数：别混了！', { color: COOL, size: 20, bold: true });
          S.actor('s4-cmp-sub1', -5, 5.0,
            '相反数：相加 $= 0$', { color: WARM, size: 16, bold: true });
          S.actor('s4-cmp-sub2', 5, 5.0,
            '倒数：相乘 $= 1$', { color: GREEN, size: 16, bold: true });

          P.renderTable({
            head: ['数', '相反数（相加得0）', '倒数（相乘得1）'],
            rows: [
              ['-3/4', '+3/4', '-4/3'],
              ['5', '-5', '1/5'],
              ['-1', '+1', '-1']
            ]
          });

          P.renderCard(
            '<b>易混辨析</b><br>' +
            '相反数：相加 $=0$（变号）<br>' +
            '倒数：相乘 $=1$（翻转，同号）<br>' +
            '$-\\dfrac{3}{4}$ 的倒数是 $-\\dfrac{4}{3}$，不是 $\\dfrac{3}{4}$！'
          );
          return anim ? delay(300) : Promise.resolve();
        }
      },

      // ── 步3：除法法则（类比减法变加法）──
      {
        narration: '有了倒数，就能讲除法法则了。记得有理数减法：减去一个数等于加上这个数的相反数。这是化归思想！现在除法也一样：除以一个不为0的数，等于乘以这个数的倒数。同样的化归思想，第二次亮相！0不能作除数——因为0没有倒数。',
        enter: function (anim) {
          S.remove('s4-cmp-title'); S.remove('s4-cmp-sub1'); S.remove('s4-cmp-sub2');

          S.actor('s4-div-title', 0, 6.0, '除法法则', { color: COOL, size: 21, bold: true });

          // 类比展示
          S.actor('s4-ana1', -4, 4.8,
            '减法：$a-b=a+(-b)$', { color: TEAL, size: 16 });
          S.actor('s4-ana-arrow', 0, 4.8,
            '化归思想', { color: GRAY, size: 14 });
          S.actor('s4-ana2', 4, 4.8,
            '除法：$a\\div b=a\\times\\dfrac{1}{b}$', { color: TEAL, size: 16 });

          S.addSegment('s4-div-sep', [-7, 3.9], [7, 3.9], { color: GRAY, width: 1.5, dash: 2 });

          S.actor('s4-div-rule', 0, 3.1,
            '除以非零数 $b$ $=$ 乘以 $b$ 的倒数',
            { color: INK, size: 18 });
          S.actor('s4-div-formula', 0, 2.1,
            '$a\\div b=a\\times\\dfrac{1}{b}\\quad(b\\neq0)$',
            { color: COOL, size: 20, bold: true });
          S.actor('s4-div-sign', 0, 1.0,
            '同样可直接判断：同号商正，异号商负',
            { color: INK, size: 16 });
          S.actor('s4-div-zero', 0, 0.0,
            '<b>$0$ 不能作除数！</b>（但 $0\\div$ 非零数 $=0$，没问题）',
            { color: RED, size: 16 });

          P.renderCard(
            '<b>除法法则</b><br>' +
            '$a\\div b=a\\times\\dfrac{1}{b}$（$b\\neq0$）<br>' +
            '类比减法变加法的化归思想<br>' +
            '$0$ <b>不能</b>作除数；$0\\div$ 非零数 $=0$'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步4：例4、例5 转乘法推演 ──
      {
        narration: '两道例题。例4：(-36)÷9，异号得负，36÷9=4，结果-4，直接判断。例5：(-12/25)÷(-3/5)，转化为乘法——乘以-3/5的倒数-5/3，同号得正，(12×5)/(25×3)=60/75=4/5，结果4/5。',
        enter: function (anim) {
          S.remove('s4-div-title'); S.remove('s4-ana1'); S.remove('s4-ana-arrow'); S.remove('s4-ana2');
          S.remove('s4-div-sep'); S.remove('s4-div-rule'); S.remove('s4-div-formula');
          S.remove('s4-div-sign'); S.remove('s4-div-zero');

          S.actor('s4-ex4-title', -5, 6.0, '例题4', { color: COOL, size: 18, bold: true });
          S.actor('s4-ex4-q', -5, 4.9,
            '$(-36)\\div 9=?$', { color: INK, size: 20 });
          S.actor('s4-ex4-s1', -5, 3.8,
            '异号 → 负；$36\\div9=4$', { color: COOL, size: 15 });
          S.actor('s4-ex4-ans', -5, 2.7,
            '$(-36)\\div9=\\boldsymbol{-4}$', { color: RED, size: 20, bold: true });

          S.addSegment('s4-mid', [0, 6.5], [0, 1.5], { color: GRAY, width: 1.5, dash: 2 });

          S.actor('s4-ex5-title', 5, 6.0, '例题5', { color: COOL, size: 18, bold: true });
          S.actor('s4-ex5-q', 5, 4.9,
            '$\\left(-\\dfrac{12}{25}\\right)\\div\\left(-\\dfrac{3}{5}\\right)$',
            { color: INK, size: 18 });
          S.actor('s4-ex5-s1', 5, 3.6,
            '$=\\left(-\\dfrac{12}{25}\\right)\\times\\left(-\\dfrac{5}{3}\\right)$',
            { color: ORANGE, size: 16 });
          S.actor('s4-ex5-s2', 5, 2.5,
            '同号 → 正；$\\dfrac{12\\times5}{25\\times3}=\\dfrac{60}{75}=\\dfrac{4}{5}$',
            { color: COOL, size: 14 });
          S.actor('s4-ex5-ans', 5, 1.2,
            '结果：$\\boldsymbol{\\dfrac{4}{5}}$', { color: GREEN, size: 20, bold: true });

          S.addSegment('s4-ex-sep', [-7, 1.0], [7, 1.0], { color: GRAY, width: 1.5, dash: 2 });
          S.actor('s4-ex-note', 0, 0.1,
            '课堂练习：$0\\div(-7)=?$（答：$0$）；为什么 $5\\div0$ 无意义？',
            { color: TEAL, size: 14 });
          S.actor('s4-ex-note2', 0, -0.8,
            '（没有任何数乘 $0$ 得 $5$，故 $5\\div0$ 无意义）',
            { color: GRAY, size: 13 });

          P.renderCard(
            '<b>例4</b>：$(-36)\\div9=\\boldsymbol{-4}$（直接判断）<br>' +
            '<b>例5</b>：$\\left(-\\dfrac{12}{25}\\right)\\div\\left(-\\dfrac{3}{5}\\right)' +
            '=\\left(-\\dfrac{12}{25}\\right)\\times\\left(-\\dfrac{5}{3}\\right)=\\boldsymbol{\\dfrac{4}{5}}$<br>' +
            '$0\\div(-7)=0$；$5\\div0$ 无意义（$0$ 不能作除数）'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
