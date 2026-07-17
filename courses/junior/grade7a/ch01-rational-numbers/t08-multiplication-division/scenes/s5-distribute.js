// s5-distribute.js  环节五：分配律（3步）
// 数学验算：
//   例6 方法一：-1/2+2/3 = -3/6+4/6 = 1/6；1/6×(-12) = -2 ✓
//   例6 方法二：(-1/2)×(-12)+（2/3)×(-12) = 6+(-8) = -2 ✓
//   练习 方法一：1/4-1/3 = 3/12-4/12 = -1/12；(-1/12)×24 = -2 ✓
//   练习 方法二：(1/4)×24+(-1/3)×24 = 6+(-8) = -2 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var RED = '#c62828', GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、分配律',
    bbox: [-10, 7, 10, -7],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // ── 步1：分配律 + 箭头动画（雨露均沾）──
      {
        narration: '乘法交换律和结合律在有理数中仍然成立，我们重点学分配律：(a+b)×c = a×c + b×c，俗称"雨露均沾"——括号外的因数，要分别乘到括号内的每一项。每项都要乘，一个都不能漏！',
        enter: function (anim) {
          S.actor('s5-title', 0, 6.0, '分配律', { color: COOL, size: 22, bold: true });
          S.actor('s5-formula', 0, 4.8,
            '$(a+b)\\times c = a\\times c + b\\times c$',
            { color: INK, size: 22, bold: true });

          // 箭头动画示意：括号外 c 分别射向 a、b
          // 用线段模拟两条箭头
          S.addSegment('s5-arr-left', [-1.5, 3.8], [-5, 3.0],
            { color: WARM, width: 3, dash: 0 });
          S.addSegment('s5-arr-right', [-1.5, 3.8], [2, 3.0],
            { color: WARM, width: 3, dash: 0 });
          S.addText('s5-arr-lend', -5.3, 2.8, '▼', { color: WARM, size: 16 });
          S.addText('s5-arr-rend', 1.8, 2.8, '▼', { color: WARM, size: 16 });

          S.actor('s5-c-label', -1.8, 4.0, '因数 $c$', { color: WARM, size: 15 });
          S.actor('s5-a-label', -5.5, 2.5, '项 $a$', { color: TEAL, size: 15 });
          S.actor('s5-b-label', 2.3, 2.5, '项 $b$', { color: TEAL, size: 15 });

          S.actor('s5-tip', 0, 1.8,
            '"雨露均沾"：括号外因数分别乘括号内<b>每一项</b>',
            { color: ORANGE, size: 16 });
          S.actor('s5-warn', 0, 0.9,
            '<b>警告：</b>漏乘任何一项都是错误！',
            { color: RED, size: 15 });

          P.renderCard(
            '<b>分配律</b><br>' +
            '$(a+b)\\times c=ac+bc$<br>' +
            '"雨露均沾"：括号外因数乘<b>每一项</b><br>' +
            '注意：一项都不能漏！'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步2：例6 两法对照 ──
      {
        narration: '例6：(-1/2+2/3)×(-12)，用两种方法算。方法一：先算括号，-1/2+2/3=-3/6+4/6=1/6，再算1/6×(-12)=-2。方法二：先用分配律，(-1/2)×(-12)=6，(2/3)×(-12)=-8，6+(-8)=-2。两种方法结果一致，互相验证！什么时候分配律更快？——括号外的数和括号内某项能约分时，先分配算得快。',
        enter: function (anim) {
          S.remove('s5-title'); S.remove('s5-formula');
          S.remove('s5-arr-left'); S.remove('s5-arr-right');
          S.remove('s5-arr-lend'); S.remove('s5-arr-rend');
          S.remove('s5-c-label'); S.remove('s5-a-label'); S.remove('s5-b-label');
          S.remove('s5-tip'); S.remove('s5-warn');

          S.actor('s5-ex6-title', 0, 6.3, '例题6：两法对照', { color: COOL, size: 19, bold: true });
          S.actor('s5-ex6-q', 0, 5.3,
            '$\\left(-\\dfrac{1}{2}+\\dfrac{2}{3}\\right)\\times(-12)$',
            { color: INK, size: 20 });

          // 方法一（左列）
          S.actor('s5-m1-title', -5, 4.2, '<b>方法一</b>（先算括号）', { color: TEAL, size: 15 });
          S.actor('s5-m1-s1', -5, 3.3,
            '$-\\dfrac{1}{2}+\\dfrac{2}{3}=\\dfrac{-3+4}{6}=\\dfrac{1}{6}$',
            { color: COOL, size: 14 });
          S.actor('s5-m1-s2', -5, 2.2,
            '$\\dfrac{1}{6}\\times(-12)$',
            { color: COOL, size: 14 });
          S.actor('s5-m1-ans', -5, 1.2,
            '$= \\boldsymbol{-2}$', { color: RED, size: 20, bold: true });

          // 竖线分隔
          S.addSegment('s5-mid', [0, 4.5], [0, 0.5], { color: GRAY, width: 1.5, dash: 2 });

          // 方法二（右列）
          S.actor('s5-m2-title', 5, 4.2, '<b>方法二</b>（分配律）', { color: TEAL, size: 15 });
          S.actor('s5-m2-s1', 5, 3.3,
            '$=\\left(-\\dfrac{1}{2}\\right)\\times(-12)+\\dfrac{2}{3}\\times(-12)$',
            { color: COOL, size: 12 });
          S.actor('s5-m2-s2', 5, 2.2,
            '$= 6+(-8)$', { color: COOL, size: 16 });
          S.actor('s5-m2-ans', 5, 1.2,
            '$= \\boldsymbol{-2}$', { color: RED, size: 20, bold: true });

          S.actor('s5-check', 0, 0.0,
            '两种方法结果一致 ✓', { color: GREEN, size: 16 });
          S.actor('s5-hint', 0, -0.9,
            '能约分时先分配更快！', { color: ORANGE, size: 14 });

          P.renderCard(
            '<b>例6</b>：$\\left(-\\dfrac{1}{2}+\\dfrac{2}{3}\\right)\\times(-12)$<br>' +
            '法一：括号内先加 $\\to\\dfrac{1}{6}\\times(-12)=-2$<br>' +
            '法二：分配律 $\\to6+(-8)=-2$<br>' +
            '两法结果一致 ✓'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步3：学生练习揭晓 ──
      {
        narration: '练习：(1/4-1/3)×24，选方法。括号外24能与1/4、1/3约分，用分配律更快！1/4×24=6，(-1/3)×24=-8，6+(-8)=-2。也可以先算括号：1/4-1/3=3/12-4/12=-1/12，再-1/12×24=-2，结果一致！',
        enter: function (anim) {
          S.remove('s5-ex6-title'); S.remove('s5-ex6-q');
          S.remove('s5-m1-title'); S.remove('s5-m1-s1'); S.remove('s5-m1-s2'); S.remove('s5-m1-ans');
          S.remove('s5-mid');
          S.remove('s5-m2-title'); S.remove('s5-m2-s1'); S.remove('s5-m2-s2'); S.remove('s5-m2-ans');
          S.remove('s5-check'); S.remove('s5-hint');

          S.actor('s5-pra-title', 0, 6.3, '学生练习', { color: TEAL, size: 19, bold: true });
          S.actor('s5-pra-q', 0, 5.3,
            '$\\left(\\dfrac{1}{4}-\\dfrac{1}{3}\\right)\\times 24=?$',
            { color: INK, size: 20 });

          S.actor('s5-pra-tip', 0, 4.3,
            '提示：能约分，用<b>分配律</b>更快！',
            { color: ORANGE, size: 15 });

          // 方法二（推荐）
          S.actor('s5-pra-m2-title', -4, 3.2,
            '<b>推荐：分配律</b>', { color: TEAL, size: 15 });
          S.actor('s5-pra-m2-s1', -4, 2.3,
            '$=\\dfrac{1}{4}\\times24+\\left(-\\dfrac{1}{3}\\right)\\times24$',
            { color: COOL, size: 15 });
          S.actor('s5-pra-m2-s2', -4, 1.3,
            '$= 6+(-8)$', { color: COOL, size: 17 });
          S.actor('s5-pra-ans', -4, 0.2,
            '$= \\boldsymbol{-2}$', { color: RED, size: 22, bold: true });

          S.addSegment('s5-pra-mid', [0, 3.5], [0, -0.5], { color: GRAY, width: 1.5, dash: 2 });

          // 方法一（验证）
          S.actor('s5-pra-m1-title', 4, 3.2,
            '<b>验证：先算括号</b>', { color: TEAL, size: 15 });
          S.actor('s5-pra-m1-s1', 4, 2.3,
            '$\\dfrac{1}{4}-\\dfrac{1}{3}=\\dfrac{3-4}{12}=-\\dfrac{1}{12}$',
            { color: COOL, size: 14 });
          S.actor('s5-pra-m1-s2', 4, 1.3,
            '$-\\dfrac{1}{12}\\times24$', { color: COOL, size: 17 });
          S.actor('s5-pra-m1-ans', 4, 0.2,
            '$= \\boldsymbol{-2}$', { color: RED, size: 22, bold: true });

          S.actor('s5-pra-check', 0, -0.8,
            '两法均得 $-2$，互相验证 ✓', { color: GREEN, size: 16 });

          P.renderCard(
            '<b>练习</b>：$\\left(\\dfrac{1}{4}-\\dfrac{1}{3}\\right)\\times24$<br>' +
            '分配律：$\\dfrac{1}{4}\\times24+\\left(-\\dfrac{1}{3}\\right)\\times24=6+(-8)=\\boldsymbol{-2}$<br>' +
            '验证（先括号）：$-\\dfrac{1}{12}\\times24=\\boldsymbol{-2}$ ✓'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
