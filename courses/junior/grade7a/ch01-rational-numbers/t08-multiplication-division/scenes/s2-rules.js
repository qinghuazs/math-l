// s2-rules.js  环节二：乘法法则与例题（3步）
// 数学验算：
//   例1：(-3)×9：异号得负，3×9=27 → -27 ✓
//   例2：(-1/2)×(-2)：同号得正，(1/2)×2=1 → +1 ✓；-1/2 与 -2 是倒数关系（积=1）
//   练习：(-7)×(-4)=28（同号得正，7×4=28）✓
//   练习：(2/3)×(-3/4)=-(2/3×3/4)=-(6/12)=-1/2 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var RED = '#c62828', GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、乘法法则与例题',
    bbox: [-10, 7, 10, -7],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // ── 步1：法则板书 + 两步走 ──
      {
        narration: '根据蜗牛四种情形，我们归纳出有理数乘法法则：两数相乘，同号得正，异号得负，并把绝对值相乘；任何数与0相乘得0。计算时分两步：第一步定符号，第二步乘绝对值。',
        enter: function (anim) {
          S.actor('s2-title', 0, 6.0, '有理数乘法法则', { color: COOL, size: 22, bold: true });
          S.actor('s2-rule1', 0, 4.5,
            '两数相乘，<b>同号得正，异号得负</b>，绝对值相乘',
            { color: INK, size: 17 });
          S.actor('s2-rule2', 0, 3.2,
            '任何数与 $0$ 相乘，都得 $0$',
            { color: INK, size: 17 });

          S.addSegment('s2-sep', [-7, 2.3], [7, 2.3], { color: GRAY, width: 1.5, dash: 2 });

          S.actor('s2-step-title', 0, 1.5, '计算步骤', { color: TEAL, size: 17, bold: true });
          S.actor('s2-step1', -4, 0.5,
            '<b>第一步</b>：定符号', { color: WARM, size: 16 });
          S.actor('s2-step1b', -4, -0.3,
            '同号 → 正；异号 → 负', { color: WARM, size: 15 });
          S.actor('s2-step2', 4, 0.5,
            '<b>第二步</b>：乘绝对值', { color: COOL, size: 16 });
          S.actor('s2-step2b', 4, -0.3,
            '两数绝对值之积', { color: COOL, size: 15 });

          P.renderCard(
            '<b>乘法法则</b><br>' +
            '两数相乘：<b>同号得正，异号得负，绝对值相乘</b><br>' +
            '任何数 $\\times\\ 0 = 0$<br>' +
            '步骤：①定符号 → ②乘绝对值'
          );
          return anim ? delay(300) : Promise.resolve();
        }
      },

      // ── 步2：例1 (-3)×9=-27 ──
      {
        narration: '例1：(-3)×9。第一步，定符号：-3是负数，9是正数，异号，结果为负。第二步，算绝对值：3×9=27。所以(-3)×9=-27。',
        enter: function (anim) {
          S.remove('s2-title'); S.remove('s2-rule1'); S.remove('s2-rule2');
          S.remove('s2-sep'); S.remove('s2-step-title');
          S.remove('s2-step1'); S.remove('s2-step1b'); S.remove('s2-step2'); S.remove('s2-step2b');

          S.actor('s2-ex1-title', 0, 5.8, '例题1', { color: COOL, size: 19, bold: true });
          S.actor('s2-ex1-q', 0, 4.5,
            '$(-3)\\times 9 = ?$',
            { color: INK, size: 22 });
          S.actor('s2-ex1-s1', -4, 2.8,
            '第一步：定符号', { color: WARM, size: 16 });
          S.actor('s2-ex1-s1b', -4, 1.9,
            '$-3$ 负，$9$ 正 → <b>异号 → 负</b>', { color: WARM, size: 15 });
          S.actor('s2-ex1-s2', 4, 2.8,
            '第二步：乘绝对值', { color: COOL, size: 16 });
          S.actor('s2-ex1-s2b', 4, 1.9,
            '$3\\times 9=27$', { color: COOL, size: 15 });
          S.actor('s2-ex1-ans', 0, 0.5,
            '$(-3)\\times 9 = \\boldsymbol{-27}$',
            { color: RED, size: 24, bold: true });

          P.renderCard(
            '<b>例1</b>：$(-3)\\times 9$<br>' +
            '① 定符号：$-3$ 负，$9$ 正，异号 → <b>负</b><br>' +
            '② 乘绝对值：$3\\times 9=27$<br>' +
            '结果：$(-3)\\times 9 = \\boldsymbol{-27}$'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步3：例2 (-1/2)×(-2)=+1 + 学生练习揭晓 ──
      {
        narration: '例2：(-1/2)×(-2)。同号得正，(1/2)×2=1，结果是+1。老师追问：这两个数相乘等于1，它们有什么特殊关系？——先记住这个感觉，下一个环节揭晓！然后请同学做两道练习：(-7)×(-4)=？和(2/3)×(-3/4)=？',
        enter: function (anim) {
          S.remove('s2-ex1-title'); S.remove('s2-ex1-q');
          S.remove('s2-ex1-s1'); S.remove('s2-ex1-s1b');
          S.remove('s2-ex1-s2'); S.remove('s2-ex1-s2b');
          S.remove('s2-ex1-ans');

          S.actor('s2-ex2-title', 0, 6.0, '例题2', { color: COOL, size: 19, bold: true });
          S.actor('s2-ex2-q', 0, 4.8,
            '$\\left(-\\dfrac{1}{2}\\right)\\times(-2) = ?$',
            { color: INK, size: 21 });
          S.actor('s2-ex2-s1', -4, 3.3,
            '同号（都是负）→ <b>正</b>', { color: GREEN, size: 16 });
          S.actor('s2-ex2-s2', 4, 3.3,
            '$\\dfrac{1}{2}\\times 2 = 1$', { color: COOL, size: 16 });
          S.actor('s2-ex2-ans', 0, 2.0,
            '$\\left(-\\dfrac{1}{2}\\right)\\times(-2) = \\boldsymbol{+1}$',
            { color: GREEN, size: 22, bold: true });
          S.actor('s2-ex2-hook', 0, 0.8,
            '追问：这两个数乘积=1，有什么特殊关系？下一环节揭晓！',
            { color: ORANGE, size: 14 });

          S.addSegment('s2-sep2', [-7, 0.0], [7, 0.0], { color: GRAY, width: 1.5, dash: 2 });

          S.actor('s2-pra-title', 0, -0.7, '学生练习', { color: TEAL, size: 16, bold: true });
          S.actor('s2-pra1-q', -4, -1.7,
            '$(-7)\\times(-4) = ?$', { color: INK, size: 17 });
          S.actor('s2-pra1-a', -4, -2.7,
            '同号得正，$7\\times4=28$，结果 <b>28</b>', { color: GREEN, size: 14 });
          S.actor('s2-pra2-q', 4, -1.7,
            '$\\dfrac{2}{3}\\times\\left(-\\dfrac{3}{4}\\right)=?$', { color: INK, size: 17 });
          S.actor('s2-pra2-a', 4, -2.7,
            '异号得负，$\\dfrac{2}{3}\\times\\dfrac{3}{4}=\\dfrac{1}{2}$，结果 $-\\dfrac{1}{2}$',
            { color: WARM, size: 14 });

          P.renderCard(
            '<b>例2</b>：$\\left(-\\dfrac{1}{2}\\right)\\times(-2)=\\boldsymbol{+1}$<br>' +
            '同号得正，绝对值 $\\dfrac{1}{2}\\times2=1$。<br>' +
            '<b>练习答案：</b><br>' +
            '$(-7)\\times(-4)=\\boldsymbol{28}$；' +
            '$\\dfrac{2}{3}\\times\\left(-\\dfrac{3}{4}\\right)=\\boldsymbol{-\\dfrac{1}{2}}$'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
