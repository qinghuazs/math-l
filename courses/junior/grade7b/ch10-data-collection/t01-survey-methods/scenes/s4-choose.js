(function (CW) {
  'use strict';
  // s4 两种调查方式的选择（对比表 + 课堂辨析）
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var INK    = '#455a64';

  // 辨析题数据：[题目描述, 答案, 理由]
  var CASES = [
    ['① 调查全班同学的视力', '全面调查', '人数少，要求准确，可逐一检查'],
    ['② 检测一批炮弹的杀伤半径', '抽样调查', '具破坏性，无法全部检测'],
    ['③ 了解某市居民对公共交通的满意度', '抽样调查', '总体很大，抽样节省成本'],
    ['④ 统计参加运动会的学生名单', '全面调查', '需要精确名单，不允许遗漏'],
    ['⑤ 检测一批牛奶是否合格', '抽样调查', '具破坏性（检测后不可再销售）'],
  ];

  // 当前展示到第几题（setup 时重置）
  var shownCount;

  var scene = {
    id: 's4',
    title: '四、如何选择调查方式',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; shownCount = 0; },
    steps: [
      {
        narration: '我们来对比一下两种调查方式的核心差异。看这张表格，重点记住"准确性"与"成本"这两个维度的区别。',
        enter: function (anim) {
          // 标题
          S.actor('s4-title', 0, 6.5, '两种调查方式对比', { color: BLUE, size: 22, bold: true });

          P.renderTable({
            head: ['维度', '全面调查（普查）', '抽样调查'],
            rows: [
              ['准确性', '高（覆盖全体）', '有误差（受样本影响）'],
              ['成本/时间', '高、耗时', '低、省时'],
              ['适用对象', '对象少、无破坏性', '对象多或有破坏性'],
              ['典型例子', '人口普查、全班体检', '灯泡寿命、收视率调查'],
            ],
          });

          // 画板上的对比图示（两个色块）
          S.addPolygon('s4-left-bg', [
            [-9.5, 4.5], [-0.3, 4.5], [-0.3, 0.5], [-9.5, 0.5],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s4-left-lbl', -4.9, 3.9, '全面调查', { color: BLUE, size: 19, bold: true });
          S.actor('s4-left-t1', -4.9, 3.0, '每个个体都调查', { color: BLUE, size: 15 });
          S.actor('s4-left-t2', -4.9, 2.2, '结果准确 / 成本高', { color: BLUE, size: 15 });

          S.addPolygon('s4-right-bg', [
            [0.3, 4.5], [9.5, 4.5], [9.5, 0.5], [0.3, 0.5],
          ], { color: PURPLE, opacity: 0.08, borderWidth: 2, strokeColor: PURPLE });
          S.actor('s4-right-lbl', 4.9, 3.9, '抽样调查', { color: PURPLE, size: 19, bold: true });
          S.actor('s4-right-t1', 4.9, 3.0, '抽取部分个体调查', { color: PURPLE, size: 15 });
          S.actor('s4-right-t2', 4.9, 2.2, '有误差 / 成本低', { color: PURPLE, size: 15 });

          S.actor('s4-vs', 0, 2.5, 'VS', { color: ORANGE, size: 20, bold: true });
        },
      },
      {
        narration: '选择调查方式的<b>关键问题</b>：① 对象数量多不多？② 要求精确吗？③ 调查有没有破坏性？——三个问题回答清楚，选哪种方式就清楚了。',
        enter: function (anim) {
          // 决策树示意（用文字+线条）
          S.actor('s4-key', 0, 0.0, '【选择调查方式的三个关键问题】', {
            color: ORANGE, size: 16, bold: true,
          });
          S.actor('s4-q1', 0, -1.0, '① 调查对象数量多不多？', { color: INK, size: 15 });
          S.actor('s4-q2', 0, -2.0, '② 对结果精确度要求高不高？', { color: INK, size: 15 });
          S.actor('s4-q3', 0, -3.0, '③ 调查过程有没有破坏性？', { color: INK, size: 15 });

          S.addSegment('s4-div', [-9, -3.7], [9, -3.7], { color: '#cfd8dc', width: 1, dash: 2 });

          S.actor('s4-ans-census', -4.5, -5.0,
            '→ 少 + 要求精确 + 无破坏 = 全面调查',
            { color: BLUE, size: 14 });
          S.actor('s4-ans-sample', 4.5, -6.2,
            '→ 多 / 有破坏 / 成本受限 = 抽样调查',
            { color: PURPLE, size: 14 });

          P.renderCard('选择关键：对象多不多？要求准确吗？有破坏性吗？<br>综合判断，选最合适的调查方式。', 'cool');
        },
      },
      {
        narration: '课堂辨析：下面 5 道题，判断应该用全面调查还是抽样调查，并说说理由。',
        enter: function (anim) {
          // 展示所有题目（不显示答案）
          S.actor('s4-ex-title', 0, 6.5, '课堂辨析——选哪种调查方式？', { color: ORANGE, size: 19, bold: true });
          shownCount = CASES.length;
          var i, c, y;
          for (i = 0; i < CASES.length; i++) {
            c = CASES[i];
            y = 4.5 - i * 2.0;
            S.actor('s4-case' + i, 0, y, c[0], { color: INK, size: 15 });
            // 占位（答案暂时隐去，用空行撑高度）
            S.actor('s4-ans' + i, 0, y - 0.8, '?', { color: '#cfd8dc', size: 14 });
          }
          P.renderCard('请先自己判断每道题应用哪种调查方式，再听讲解。');
        },
      },
      {
        narration: '答案揭晓：①全班视力→全面；②炮弹→抽样（破坏性）；③居民满意度→抽样（对象多）；④运动会名单→全面（需精确名单）；⑤牛奶检测→抽样（破坏性）。',
        enter: function (anim) {
          var COLORS = [BLUE, ORANGE, ORANGE, BLUE, ORANGE];
          var i, c, y;
          for (i = 0; i < CASES.length; i++) {
            c = CASES[i];
            y = 4.5 - i * 2.0;
            // 覆盖"?"为真实答案
            S.actor('s4-ans' + i, 0, y - 0.8,
              c[1] + '（' + c[2] + '）',
              { color: COLORS[i], size: 13 });
          }
          P.renderCard('<b>答案</b>：①全面 ②抽样 ③抽样 ④全面 ⑤抽样<br><b>规律</b>：有破坏性或总体极大 → 必须抽样。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
