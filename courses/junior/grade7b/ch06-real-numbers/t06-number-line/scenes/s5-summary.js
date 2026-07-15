(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b', GRAY = '#90a4ae';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-9, 7, 9, -3],
    board: { axis: false, keepAspect: false },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // Step 1：小结表
      {
        narration: '好，我们来总结这节课的两大核心知识点。第一：实数与数轴的关系。每一个实数对应数轴上唯一的点；数轴上每一个点对应唯一的实数——这叫实数与数轴的一一对应。第二：实数大小比较。有三种方法：数轴法——右大左小；估值法——化为近似数直接比；平方法——正数时平方比大小，被开方数大则平方根大。',
        enter: function (anim) {
          // 标题
          S.addText('s5-title', -8.5, 6.5, '本节课总结', { color: TEAL, size: 22 });

          // 知识点一：实数与数轴
          S.addText('s5-k1-title', -8.5, 5.6, '【一】实数与数轴', { color: COOL, size: 18 });
          S.addText('s5-k1-1', -8.5, 4.9,
            '每一个实数对应数轴上唯一一个点', { color: INK, size: 15 });
          S.addText('s5-k1-2', -8.5, 4.2,
            '数轴上每一个点对应唯一一个实数', { color: INK, size: 15 });
          S.addText('s5-k1-3', -8.5, 3.5,
            '$\\Rightarrow$ 实数与数轴上的点 一一对应', { color: TEAL, size: 16 });

          // 知识点二：大小比较
          S.addText('s5-k2-title', -8.5, 2.6, '【二】实数大小比较方法', { color: WARM, size: 18 });
          S.addText('s5-k2-1', -8.5, 1.9,
            '① 数轴法：右边的数 $\\gt$ 左边的数', { color: INK, size: 15 });
          S.addText('s5-k2-2', -8.5, 1.2,
            '② 估值法：化为近似小数后直接比较', { color: INK, size: 15 });
          S.addText('s5-k2-3', -8.5, 0.5,
            '③ 平方法（正数）：大的平方根 $\\gt$ 小的平方根', { color: INK, size: 15 });

          // 特别提醒
          S.addText('s5-warn', -8.5, -0.4,
            '⚠ 负数比较：绝对值越大，这个数越小！', { color: WARM, size: 15 });

          P.renderTable({
            head: ['知识点', '核心结论'],
            rows: [
              ['实数与数轴', '实数与数轴点一一对应'],
              ['数轴法',     '右大左小'],
              ['估值法',     '化近似数比较'],
              ['平方法',     '正数时大数开根更大'],
              ['负数比较',   '绝对值越大，数本身越小'],
            ],
          });

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 2：作业卡
      {
        narration: '最后，来看一下今天的作业。共四道题，都是比较大小。做题时要注意：第一，先判断是正数还是负数；第二，选择合适的方法——数轴法、估值法或平方法；第三，负数比较时不要搞反方向。加油，下节课见！',
        enter: function (anim) {
          // 作业卡标题
          S.addText('s5-hw-title', -8.5, 6.5, '课后作业', { color: PURPLE, size: 22 });
          S.addText('s5-hw-sub', -8.5, 5.8, '比较下列各组实数的大小：', { color: INK, size: 16 });

          var hwList = [
            '① $\\sqrt{5}$ 与 $\\sqrt{6}$',
            '② $\\sqrt{3}$ 与 $1.7$',
            '③ $-\\sqrt{5}$ 与 $-2$',
            '④ $\\sqrt{7}$ 与 $2.6$',
          ];
          for (var i = 0; i < hwList.length; i++) {
            S.addText('s5-hw-' + i, -8.5, 5.0 - i * 0.85, hwList[i], { color: INK, size: 16 });
          }

          // 方法提示
          S.addText('s5-tip-title', 1.0, 6.5, '解题思路提示：', { color: TEAL, size: 17 });
          S.addText('s5-tip1', 1.0, 5.8,
            '正数：可用平方法或估值法', { color: TEAL, size: 15 });
          S.addText('s5-tip2', 1.0, 5.1,
            '负数：先比绝对值，结果取反', { color: WARM, size: 15 });
          S.addText('s5-tip3', 1.0, 4.4,
            '同根式：被开方数大则平方根大', { color: COOL, size: 15 });

          // 答案（供老师参考）
          S.addText('s5-ans-title', 1.0, 3.4, '参考答案：', { color: GRAY, size: 14 });
          var ansList = [
            '① $\\sqrt{5} \\lt \\sqrt{6}$',
            '② $\\sqrt{3} \\lt 1.7$（$1.7^2=2.89\\gt3$？注：$1.7^2=2.89\\lt3$，故 $\\sqrt{3}\\gt1.7$）',
            '③ $-\\sqrt{5} \\lt -2$（$\\sqrt{5}\\gt2$）',
            '④ $\\sqrt{7} \\lt 2.6$（$2.6^2=6.76\\lt7$？$2.6^2=6.76\\lt7$，故 $\\sqrt{7}\\gt2.6$）',
          ];

          // 简洁版答案
          S.addText('s5-ans1', 1.0, 2.8,
            '① $\\sqrt{5} \\lt \\sqrt{6}$', { color: GRAY, size: 14 });
          S.addText('s5-ans2', 1.0, 2.2,
            '② $\\sqrt{3} \\gt 1.7$（$1.7^2=2.89 \\lt 3$）', { color: GRAY, size: 14 });
          S.addText('s5-ans3', 1.0, 1.6,
            '③ $-\\sqrt{5} \\lt -2$（$\\sqrt{5}\\gt 2$）', { color: GRAY, size: 14 });
          S.addText('s5-ans4', 1.0, 1.0,
            '④ $\\sqrt{7} \\gt 2.6$（$2.6^2=6.76 \\lt 7$）', { color: GRAY, size: 14 });

          P.renderCard(
            '<b>课后作业</b><br>' +
            '比较大小：<br>' +
            '① $\\sqrt{5}$ 与 $\\sqrt{6}$&emsp;&emsp;' +
            '② $\\sqrt{3}$ 与 $1.7$<br>' +
            '③ $-\\sqrt{5}$ 与 $-2$&emsp;&emsp;' +
            '④ $\\sqrt{7}$ 与 $2.6$<br>' +
            '<span style="color:#00796b">提示：正数用平方法；负数先比绝对值再取反。</span>',
            'teal'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
