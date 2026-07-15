(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // Step 1：估算方法小结
      {
        narration: '好，我们来总结今天学习的内容。估算平方根的核心方法是夹逼法，分三步走：第一步，找到被开方数相邻的两个完全平方数，得到整数范围；第二步，在整数范围内逐个试小数，把区间收窄到十分位、百分位；第三步，按题目精度要求，读出近似值。牢记这个流程，任何平方根都能估算！',
        enter: function (anim) {
          // 方法流程图（文字描述，箭头连接）
          S.addText('s5-t',  -0.5,  7.0, '估算方法总结', { color: TEAL, size: 24, anchorX: 'middle' });

          // 三步骤框
          S.addPolygon('s5-box1',
            [[-8.5, 5.4], [2.5, 5.4], [2.5, 4.2], [-8.5, 4.2]],
            { color: COOL, opacity: 0.12, borderColor: COOL, borderWidth: 2 }
          );
          S.addText('s5-step1', -8.0, 5.0,
            '① 找相邻完全平方数：$n^2 \\lt a \\lt (n+1)^2 \\Rightarrow n \\lt \\sqrt{a} \\lt n+1$',
            { color: COOL, size: 15 });

          S.addPolygon('s5-box2',
            [[-8.5, 3.6], [2.5, 3.6], [2.5, 2.4], [-8.5, 2.4]],
            { color: TEAL, opacity: 0.12, borderColor: TEAL, borderWidth: 2 }
          );
          S.addText('s5-step2', -8.0, 3.2,
            '② 试十分位：$m.1^2 \\lt a \\lt m.2^2 \\Rightarrow$ 收窄到 $[m.1,\\ m.2]$',
            { color: TEAL, size: 15 });

          S.addPolygon('s5-box3',
            [[-8.5, 1.8], [2.5, 1.8], [2.5, 0.6], [-8.5, 0.6]],
            { color: WARM, opacity: 0.12, borderColor: WARM, borderWidth: 2 }
          );
          S.addText('s5-step3', -8.0, 1.4,
            '③ 按精度取近似值，写出结论',
            { color: WARM, size: 15 });

          // 箭头
          S.addText('s5-arr1', -3.5, 3.95, '↓', { color: INK, size: 20 });
          S.addText('s5-arr2', -3.5, 2.2,  '↓', { color: INK, size: 20 });

          // 关键提示
          S.addText('s5-key1', -8.5, -0.4, '关键词：', { color: INK, size: 17 });
          S.addText('s5-key2', -8.5, -1.5,
            '夹逼 · 收窄 · 完全平方数 · 精确到 n 位',
            { color: WARM, size: 16 });

          // 常用值备忘
          S.addText('s5-mem',  3.5, 5.0, '记忆口诀：', { color: TEAL, size: 16 });
          S.addText('s5-mem1', 3.5, 3.8, '$\\sqrt{2} \\approx 1.414$', { color: COOL, size: 18 });
          S.addText('s5-mem2', 3.5, 2.7, '$\\sqrt{3} \\approx 1.732$', { color: COOL, size: 18 });
          S.addText('s5-mem3', 3.5, 1.6, '$\\sqrt{5} \\approx 2.236$', { color: COOL, size: 18 });

          P.renderCard(
            '<b>估算平方根——夹逼法三步</b><br>' +
            '① 找完全平方数：$n^2 \\lt a \\lt (n+1)^2 \\Rightarrow n \\lt \\sqrt{a} \\lt n+1$<br>' +
            '② 逐位试算：收窄区间（十分位 → 百分位 → ……）<br>' +
            '③ 按精度读出近似值<br>' +
            '<br>' +
            '记住：$\\sqrt{2}\\approx1.414$，$\\sqrt{3}\\approx1.732$，$\\sqrt{5}\\approx2.236$',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：作业卡
      {
        narration: '最后布置今天的课后练习。请同学们用夹逼法，确定下列各数所在的两个相邻整数范围，并精确到十分位：第一题，√7；第二题，√15；第三题，√30；第四题，√80。课后思考：你能用夹逼法估算 √200 精确到百分位吗？下节课我们验证。',
        enter: function (anim) {
          // 作业题
          S.addText('s5-hw-t', -0.5, 7.0, '课后练习', { color: WARM, size: 24, anchorX: 'middle' });

          // 题目列表
          S.addText('s5-hw1', -8.5, 5.5, '1.  用夹逼法确定 $\\sqrt{7}$ 所在的整数范围（精确到十分位）', { color: INK, size: 16 });
          S.addText('s5-hw2', -8.5, 4.2, '2.  用夹逼法确定 $\\sqrt{15}$ 所在的整数范围（精确到十分位）', { color: INK, size: 16 });
          S.addText('s5-hw3', -8.5, 2.9, '3.  用夹逼法确定 $\\sqrt{30}$ 所在的整数范围（精确到十分位）', { color: INK, size: 16 });
          S.addText('s5-hw4', -8.5, 1.6, '4.  用夹逼法确定 $\\sqrt{80}$ 所在的整数范围（精确到十分位）', { color: INK, size: 16 });

          // 参考答案（折叠提示）
          S.addText('s5-ref-t', -8.5, 0.1, '参考答案（整数范围）：', { color: TEAL, size: 15 });
          S.addText('s5-ref1', -8.5, -0.9,
            '$2 \\lt \\sqrt{7} \\lt 3$；$3 \\lt \\sqrt{15} \\lt 4$；$5 \\lt \\sqrt{30} \\lt 6$；$8 \\lt \\sqrt{80} \\lt 9$',
            { color: TEAL, size: 14 });

          // 思考题
          S.addText('s5-think', -8.5, -2.2,
            '思考题：用夹逼法把 $\\sqrt{200}$ 精确到百分位（精确到 0.01）',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>课后练习</b><br>' +
            '用夹逼法确定整数范围（精确到十分位）：<br>' +
            '① $\\sqrt{7}$&emsp;② $\\sqrt{15}$&emsp;③ $\\sqrt{30}$&emsp;④ $\\sqrt{80}$<br>' +
            '<br>' +
            '<b>思考题</b>：$\\sqrt{200}$ 精确到百分位是多少？'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
