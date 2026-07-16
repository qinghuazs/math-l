(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-1, 15, 11, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '好，我们来总结本节课的核心内容。<b>频数分布的完整流程</b>：第一步，计算极差（最大值−最小值）；第二步，确定组数和组距（组数 ≈ 极差÷组距，一般取 5~12 组）；第三步，写出各组区间（左闭右开，无重叠无遗漏）；第四步，划记统计各组频数，填写频数分布表；第五步，根据频数分布表绘制直方图。',
        enter: function () {
          S.addText('s5-title', 5, 14.2, '本节课小结', { size: 18, color: BLUE, anchorX: 'middle' });
          // 流程步骤
          var steps = [
            '① 计算极差 = 最大值 − 最小值',
            '② 确定组数和组距（约 5~12 组）',
            '③ 写出各组区间（左闭右开）',
            '④ 划记统计 → 填写频数分布表',
            '⑤ 绘制频数分布直方图',
          ];
          var colors = [WARM, WARM, BLUE, GREEN, PURPLE];
          var i;
          for (i = 0; i < steps.length; i++) {
            S.addText('s5-step' + i, 0.5, 12.5 - i * 2.0, steps[i], { size: 14, color: colors[i], anchorX: 'left' });
          }
          // 直方图特点提示框
          S.addText('s5-hist-title', 5, 2.5, '直方图关键特征', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('s5-hist1', 5, 1.2, '柱宽 = 组距  ·  各柱紧邻无间隙  ·  横轴=连续区间', { size: 13, color: PURPLE, anchorX: 'middle' });
          P.renderCard('<b>分组步骤</b>（五步法）：<br>极差→组距→区间→划记→直方图<br><b>左闭右开</b>约定，各区间不重叠、不遗漏');
        },
      },
      {
        narration: '最后，记住频数分布直方图的三大特点，以及它与条形图的区别。课后作业：对给定的一组数据（如全班 40 人的数学成绩），完成：①计算极差；②确定组距（建议取 10 分一组）；③画出频数分布表；④画出频数分布直方图；⑤描述数据的分布特征。同学们，今天的内容掌握了吗？',
        enter: function () {
          S.addText('s5-title2', 5, 14.2, '对比总结与课后作业', { size: 17, color: BLUE, anchorX: 'middle' });
          // 对比表
          P.renderTable({
            head: ['', '频数分布直方图', '条形统计图'],
            rows: [
              ['数据类型', '连续数据', '离散类别'],
              ['横轴含义', '数量区间', '类别名称'],
              ['柱间关系', '<b>紧邻，无间隙</b>', '有间隙'],
              ['主要用途', '看分布形态', '比较多少'],
            ],
          });
          // 作业卡内容放在画板
          S.addText('s5-hw-title', 5, 8.0, '课后作业', { size: 15, color: WARM, anchorX: 'middle' });
          S.addText('s5-hw1', 0.5, 6.8, '数据：40人的数学成绩（55~98分）', { size: 13, color: INK, anchorX: 'left' });
          S.addText('s5-hw2', 0.5, 5.5, '① 算极差  ② 定组距（取10）  ③ 分组', { size: 13, color: BLUE, anchorX: 'left' });
          S.addText('s5-hw3', 0.5, 4.2, '④ 填频数分布表  ⑤ 画直方图', { size: 13, color: BLUE, anchorX: 'left' });
          S.addText('s5-hw4', 0.5, 2.9, '⑥ 描述数据分布特征', { size: 13, color: GREEN, anchorX: 'left' });
        },
      },
    ],
    expectSteps: 2,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
