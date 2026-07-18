// s2-meaning.js  环节二：二、字母的威力（3步）
// 数学验算：
//   加法交换律 a+b=b+a：取a=2,b=3 → 2+3=5=3+2 ✓；a=-4,b=9 → -4+9=5=9+(-4) ✓
//   行程：v=60,t=3 → s=60×3=180 ✓；v=80,t=3 → s=240 ✓
//   华氏摄氏：F=32 → C=5/9×(32-32)=0 ✓；F=212 → C=5/9×180=100 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、字母的威力',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：运算律一般化
      {
        narration: '字母不只能表示青蛙只数，它能让数学规律变得普遍。同学们学过加法交换律，我先写三个具体等式：2加3等于3加2，5加7等于7加5，负4加9等于9加负4。这三个等式背后是同一个规律！用字母来表达：a加b等于b加a。这一个式子，同时概括了无穷多个具体等式——a和b可以是任意数：正数、负数、零、分数，全部包含！',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.2, '运算律的一般化', { color: COOL, size: 21, bold: true });

          // 三个具体等式
          S.actor('s2-ex1', 0, 5.5, '$2+3=3+2$', { color: INK, size: 18 });
          S.actor('s2-ex2', 0, 4.2, '$5+7=7+5$', { color: INK, size: 18 });
          S.actor('s2-ex3', 0, 2.9, '$(-4)+9=9+(-4)$', { color: INK, size: 18 });

          S.actor('s2-arrow', 0, 1.6, '↓ 字母替换', { color: GRAY, size: 16 });

          // 字母式
          S.actor('s2-law1', -3.5, 0.2,
            '$a+b=b+a$',
            { color: TEAL, size: 24, bold: true });
          S.actor('s2-law1-name', 3.5, 0.2, '（加法交换律）', { color: TEAL, size: 16 });

          S.actor('s2-law2', -3.5, -1.4,
            '$ab=ba$',
            { color: TEAL, size: 24, bold: true });
          S.actor('s2-law2-name', 3.5, -1.4, '（乘法交换律）', { color: TEAL, size: 16 });

          S.actor('s2-note', 0, -3.2,
            '$a$、$b$ 可以是任意数：正数、负数、零、分数',
            { color: WARM, size: 16 });

          P.renderCard(
            '<b>运算律一般化</b><br>' +
            '$a+b=b+a$（加法交换律）<br>' +
            '$ab=ba$（乘法交换律）<br>' +
            '$a$、$b$ 代表任意数——一个式子概括无穷多个具体等式！'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 2：行程公式 s=vt
      {
        narration: '再来看行程问题。速度60千米每时走了2小时，路程是120千米；速度80千米每时走了3小时，路程是240千米。你发现规律了吗？路程 = 速度 × 时间。用字母写出来：s=vt！代入一下验算：速度60、时间3，s等于60乘3等于180千米。这一个公式，把所有速度和时间的组合全部覆盖了！',
        enter: function (anim) {
          // 清除上一步
          S.remove('s2-title'); S.remove('s2-ex1'); S.remove('s2-ex2'); S.remove('s2-ex3');
          S.remove('s2-arrow'); S.remove('s2-law1'); S.remove('s2-law1-name');
          S.remove('s2-law2'); S.remove('s2-law2-name'); S.remove('s2-note');

          S.actor('s2-title2', 0, 7.2, '行程公式', { color: COOL, size: 21, bold: true });

          // 表头
          S.actor('s2-th0', -5.5, 5.8, '速度 $v$（千米/时）', { color: INK, size: 15, bold: true });
          S.actor('s2-th1',  0.5, 5.8, '时间 $t$（小时）',   { color: INK, size: 15, bold: true });
          S.actor('s2-th2',  5.8, 5.8, '路程 $s$（千米）',   { color: INK, size: 15, bold: true });

          S.addSegment('s2-thl', [-9.5, 6.3], [9.5, 6.3], { color: INK, width: 2, dash: 0 });
          S.addSegment('s2-thl2', [-9.5, 5.2], [9.5, 5.2], { color: INK, width: 1, dash: 0 });

          // 数据行
          S.actor('s2-td10', -5.5, 4.3, '60', { color: INK, size: 17 });
          S.actor('s2-td11',  0.5, 4.3, '2',  { color: INK, size: 17 });
          S.actor('s2-td12',  5.8, 4.3, '120', { color: INK, size: 17 });

          S.actor('s2-td20', -5.5, 3.1, '80', { color: INK, size: 17 });
          S.actor('s2-td21',  0.5, 3.1, '3',  { color: INK, size: 17 });
          S.actor('s2-td22',  5.8, 3.1, '240', { color: INK, size: 17 });

          S.addSegment('s2-tbl', [-9.5, 2.5], [9.5, 2.5], { color: INK, width: 2, dash: 0 });

          // 公式
          S.actor('s2-formula', 0, 1.0,
            '$s = vt$',
            { color: TEAL, size: 30, bold: true });

          // 代入演示
          S.actor('s2-subst', 0, -0.7,
            '代入验算：$v=60$，$t=3$ 时，$s=60 \\times 3=180$ 千米',
            { color: ORANGE, size: 16 });

          P.renderCard(
            '<b>行程公式 $s=vt$</b><br>' +
            '路程 = 速度 × 时间<br>' +
            '代入 $v=60$，$t=3$：$s=180$ 千米<br>' +
            '一个公式覆盖所有速度与时间的组合！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：华氏摄氏换算 C=5/9*(F-32)
      {
        narration: '还有一个例子，华氏度和摄氏度的换算公式：C等于九分之五乘以括号F减32。代入一下——华氏32度，C等于九分之五乘以0等于0摄氏度，这正是冰点！华氏212度，C等于九分之五乘以180等于100摄氏度，沸点！一个公式，把全世界所有温度的换算都包含了。这就是字母的威力：一个式子，概括无穷！',
        enter: function (anim) {
          // 清除上一步
          S.remove('s2-title2');
          S.remove('s2-th0'); S.remove('s2-th1'); S.remove('s2-th2');
          S.remove('s2-thl'); S.remove('s2-thl2'); S.remove('s2-tbl');
          S.remove('s2-td10'); S.remove('s2-td11'); S.remove('s2-td12');
          S.remove('s2-td20'); S.remove('s2-td21'); S.remove('s2-td22');
          S.remove('s2-formula'); S.remove('s2-subst');

          S.actor('s2-title3', 0, 7.2, '华氏摄氏换算', { color: COOL, size: 21, bold: true });

          S.actor('s2-cf-formula', 0, 5.5,
            '$C = \\dfrac{5}{9}(F-32)$',
            { color: TEAL, size: 28, bold: true });

          // 代入示例
          S.actor('s2-cf1-label', -4.5, 3.2, '代入 $F=32$：', { color: INK, size: 17 });
          S.actor('s2-cf1-calc',   3.0, 3.2,
            '$C = \\dfrac{5}{9} \\times 0 = 0$',
            { color: COOL, size: 17 });
          S.actor('s2-cf1-note',   7.5, 3.2, '冰点', { color: COOL, size: 15 });

          S.actor('s2-cf2-label', -4.5, 1.6, '代入 $F=212$：', { color: INK, size: 17 });
          S.actor('s2-cf2-calc',   3.0, 1.6,
            '$C = \\dfrac{5}{9} \\times 180 = 100$',
            { color: WARM, size: 17 });
          S.actor('s2-cf2-note',   8.5, 1.6, '沸点', { color: WARM, size: 15 });

          S.actor('s2-concl', 0, -0.5,
            '字母可以代表任意数——正数、负数、零、分数',
            { color: INK, size: 16 });

          S.actor('s2-concl2', 0, -2.0,
            '一个式子，概括无穷！',
            { color: WARM, size: 22, bold: true });

          P.renderCard(
            '<b>字母的威力</b><br>' +
            '$F=32$ 时 $C=0$（冰点）；$F=212$ 时 $C=100$（沸点）<br>' +
            '字母 $F$、$C$ 可以是任意数，<br>' +
            '一个公式把全部温度换算都包含了！',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
