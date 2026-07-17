// s3-notation.js  环节三：科学记数法（3步）
// 数学验算：
//   光速 300000000 → 整数位9位 → n=8 → a=3 → 3×10^8
//   太阳半径 696000 → 整数位6位 → n=5 → a=6.96 → 6.96×10^5
//   陆地面积 9600000 → 整数位7位 → n=6 → a=9.6 → 9.6×10^6
//   追问：96×10^5，a=96不在[1,10)，不是标准科学记数法
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、科学记数法',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：定义 + 1~10 卡尺
      {
        narration: '科学记数法的定义：把一个大于10的数写成 a 乘以 10 的 n 次方的形式，其中 a 满足 1 小于等于 a 小于 10，n 是正整数。最关键的是 a 的范围——我用一把"1~10卡尺"来记：a 必须落在 1 到 10 这个区间内，包含 1 但不包含 10 本身，也就是左闭右开 [1, 10)。',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.0, '科学记数法', { color: COOL, size: 22, bold: true });

          // 定义框
          S.actor('s3-def1', 0, 5.5,
            '定义：大于10的数写成 $a \\times 10^n$ 的形式',
            { color: INK, size: 17 }
          );
          S.actor('s3-def2', 0, 4.2,
            '其中 $1 \\leq a \\lt 10$，$n$ 是正整数',
            { color: WARM, size: 18, bold: true }
          );

          // 卡尺：数轴段 [1,10) 高亮
          // 用简单的线段和文字模拟卡尺
          S.addSegment('s3-ruler-line', [-6, 2.2], [6, 2.2], { color: COOL, width: 4, dash: 0 });
          // 刻度 1 和 10
          S.addSegment('s3-tick-1',  [-6, 1.9], [-6, 2.5], { color: INK, width: 3, dash: 0 });
          S.addSegment('s3-tick-10', [6, 1.9],  [6, 2.5],  { color: INK, width: 3, dash: 0 });
          S.addText('s3-lab-1',  -6.1, 1.4, '1',  { color: INK, size: 16 });
          S.addText('s3-lab-10',  5.8, 1.4, '10', { color: INK, size: 16 });

          // 高亮区间 [1,10)
          S.addSegment('s3-ruler-hi', [-6, 2.2], [5.8, 2.2], { color: WARM, width: 6, dash: 0 });
          // 左端闭合（实心点）
          S.dropPoint('s3-pt-left',  -6, 2.2, { color: WARM, size: 5 });
          // 右端开（空心——用小圆标识，addText 代替）
          S.addText('s3-open-right', 5.4, 2.05, '○', { color: WARM, size: 18 });

          S.actor('s3-ruler-note', 0, 0.6,
            '$a$ 必须落在卡尺 $[1, 10)$ 内（含1不含10）',
            { color: TEAL, size: 16 }
          );

          P.renderCard(
            '<b>科学记数法</b>：$a \\times 10^n$<br>' +
            '条件：$1 \\leq a \\lt 10$，$n$ 为正整数<br>' +
            '<b>卡尺</b>：$a$ 落在 $[1, 10)$ 左闭右开区间<br>' +
            '10 本身不在卡尺内！'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：n 的求法（以光速为例）
      {
        narration: '怎么确定 n？以光速 300000000 为例。第一步：数一下整数位数——从左往右，3、0、0……一共9位数字，整数位数是9。第二步：n 等于整数位数减1，9减1等于8，所以 n=8。第三步：把小数点移到第一个有效数字后面，3后面，a=3。结果：3乘以10的8次方！',
        enter: function (anim) {
          // 清理上一步卡尺元素，保留标题
          S.remove('s3-def1');
          S.remove('s3-def2');
          S.remove('s3-ruler-line');
          S.remove('s3-tick-1');
          S.remove('s3-tick-10');
          S.remove('s3-lab-1');
          S.remove('s3-lab-10');
          S.remove('s3-ruler-hi');
          S.remove('s3-pt-left');
          S.remove('s3-open-right');
          S.remove('s3-ruler-note');

          S.actor('s3-n-rule', 0, 5.8,
            '$n$ = 整数位数 $- 1$',
            { color: TEAL, size: 20, bold: true }
          );

          // 光速逐步分析
          S.actor('s3-ex1-orig', -3, 4.0, '光速：300000000', { color: INK, size: 18 });
          S.actor('s3-ex1-step1', -3, 2.7,
            '整数位数 = <b>9</b> 位',
            { color: INK, size: 17 }
          );
          S.actor('s3-ex1-step2', -3, 1.5,
            '$n = 9 - 1 = \\boldsymbol{8}$',
            { color: COOL, size: 17 }
          );
          S.actor('s3-ex1-step3', -3, 0.3,
            '$a = 3$（小数点移到首位后）',
            { color: INK, size: 17 }
          );

          S.addSegment('s3-ex1-line', [-8, -0.5], [8, -0.5], { color: INK, width: 1, dash: 2 });

          S.actor('s3-ex1-result', 0, -1.6,
            '$300000000 = 3 \\times 10^{8}$',
            { color: WARM, size: 24, bold: true }
          );

          // 太阳半径补充
          S.actor('s3-ex2-orig', -3, -3.2, '太阳半径：696000', { color: INK, size: 17 });
          S.actor('s3-ex2-step', -3, -4.4,
            '整数位6位，$n=5$，$a=6.96$',
            { color: INK, size: 16 }
          );
          S.actor('s3-ex2-result', 3, -4.4,
            '$6.96 \\times 10^{5}$',
            { color: COOL, size: 17, bold: true }
          );

          P.renderCard(
            '<b>n 的求法</b>：$n$ = 整数位数 $- 1$<br>' +
            '光速：300000000<br>' +
            '整数位数 9 位 → $n = 8$，$a = 3$<br>' +
            '结果：$3 \\times 10^{8}$'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：陆地面积练习 + 追问 96×10^5 为什么不行
      {
        narration: '现在轮到你了！陆地面积 9600000，整数位数是7位，n等于7减1等于6，a等于9.6，结果是 9.6乘以10的6次方。有同学问：能不能写成 96乘以10的5次方呢？答案是不行！因为 96 不在卡尺 [1,10) 范围内，不符合 a 的条件，不是标准科学记数法。',
        enter: function (anim) {
          S.remove('s3-n-rule');
          S.remove('s3-ex1-orig');
          S.remove('s3-ex1-step1');
          S.remove('s3-ex1-step2');
          S.remove('s3-ex1-step3');
          S.remove('s3-ex1-line');
          S.remove('s3-ex1-result');
          S.remove('s3-ex2-orig');
          S.remove('s3-ex2-step');
          S.remove('s3-ex2-result');

          S.actor('s3-prac-title', 0, 6.2, '练习：陆地面积 9600000', { color: COOL, size: 19, bold: true });
          S.actor('s3-prac-step1', -5, 4.5, '整数位数 = 7 位', { color: INK, size: 17 });
          S.actor('s3-prac-step2', -5, 3.2, '$n = 7 - 1 = 6$', { color: COOL, size: 17 });
          S.actor('s3-prac-step3', -5, 2.0, '$a = 9.6$', { color: INK, size: 17 });
          S.actor('s3-prac-result', 3, 3.2,
            '$9.6 \\times 10^{6}$',
            { color: WARM, size: 24, bold: true }
          );

          S.addSegment('s3-prac-line', [-8, 0.8], [8, 0.8], { color: INK, width: 1, dash: 2 });

          // 追问：96×10^5 为什么不行
          S.actor('s3-wrong-q', 0, -0.3,
            '追问：$96 \\times 10^{5}$ 可以吗？',
            { color: INK, size: 18 }
          );
          S.actor('s3-wrong-ans', 0, -1.8,
            '<b>不行！</b> $96$ 不在 $[1, 10)$ 卡尺内',
            { color: RED, size: 18 }
          );
          S.actor('s3-wrong-fix', 0, -3.2,
            '正确：$96 \\times 10^{5} = 9.6 \\times 10^{6}$',
            { color: GREEN, size: 17 }
          );

          P.renderCard(
            '<b>练习</b>：$9600000 = 9.6 \\times 10^{6}$<br>' +
            '整数位7位，$n=6$，$a=9.6$<br>' +
            '<b>追问</b>：$96 \\times 10^{5}$ 为什么不行？<br>' +
            '$96 \\notin [1, 10)$，不符合 $a$ 的条件！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
