(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32';

  // 画条形图六步法文字
  var STEPS_LIST = [
    '① 画横轴和纵轴，标上箭头',
    '② 横轴标出各类别名称',
    '③ 纵轴确定单位长度，刻度均匀',
    '④ 画出等宽条形，柱间留等宽间隔',
    '⑤ 每根柱顶标注对应的数据',
    '⑥ 写上统计图标题和数据来源',
  ];

  // 易错点
  var CAUTIONS = [
    '纵轴刻度不均匀 → 数据被歪曲',
    '各条形宽度不等 → 视觉混乱',
    '纵轴从非零截断 → 夸大差异',
    '缺少标题/单位/类别 → 图表不完整',
  ];

  var scene = {
    id: 's4',
    title: '四、画条形图的步骤',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '下面我们来学习<b>画条形统计图的规范步骤</b>。共六步，一步都不能少！先看前三步：画轴、标类别、定刻度——这三步是"搭框架"，后三步是"填内容"。',
        enter: function () {
          S.addText('s4-title', 3, 13.5, '画条形统计图——六步法', { size: 15, color: BLUE, anchorX: 'middle' });
          var i;
          for (i = 0; i < STEPS_LIST.length; i++) {
            S.addText('s4-step' + i, 0.2, 11.5 - i * 1.9, STEPS_LIST[i], {
              size: 14,
              color: i < 3 ? BLUE : GREEN,
              anchorX: 'left',
            });
          }
          // 分组分隔线
          S.addSegment('s4-divider', [0, 5.8], [6.5, 5.8], { color: '#b0bec5', width: 1, dash: 2 });
          S.addText('s4-g1', 5.5, 10.7, '搭框架', { size: 12, color: BLUE, anchorX: 'right' });
          S.addText('s4-g2', 5.5, 4.2,  '填内容', { size: 12, color: GREEN, anchorX: 'right' });
          P.renderCard('画条形图<b>六步法</b>：<br>① 画轴 → ② 标类别 → ③ 定刻度<br>④ 画柱 → ⑤ 标数据 → ⑥ 写标题');
        },
      },
      {
        narration: '特别强调几个<b>易错点</b>！第一，纵轴刻度必须均匀——不能一段密一段疏，否则会歪曲数据的比较。第二，条形宽度必须相同，间隔也要相等。第三，纵轴必须从 0 开始，不能截断。',
        enter: function () {
          S.addText('s4-warn-title', 3, 13.5, '易错提醒（4条）', { size: 16, color: WARM, anchorX: 'middle' });
          var i;
          for (i = 0; i < CAUTIONS.length; i++) {
            S.addText('s4-caut' + i, 0.2, 11.5 - i * 2.4, '✗  ' + CAUTIONS[i], {
              size: 13, color: WARM, anchorX: 'left',
            });
          }
          P.renderCard('<b>易错点</b>：<br>✗ 刻度不均匀<br>✗ 柱宽不等<br>✗ 纵轴截断<br>✗ 缺标题/单位');
        },
      },
      {
        narration: '来做一道练习：调查全班最喜欢的科目（语文10、数学15、英语8、科学7）。纵轴最高应该定到多少？——应该定到 16 或更高，确保 15（最大值）的柱子能完整画出。下面是完整的作图方案。',
        enter: function () {
          P.renderTable({
            head: ['步骤', '本题操作'],
            rows: [
              ['① 画轴',  '横轴→科目名，纵轴→人数'],
              ['② 标类别', '语文、数学、英语、科学'],
              ['③ 定刻度', '最大值15 → 纵轴定到16，步长2'],
              ['④ 画柱',  '4根柱，等宽(如0.6格)，等间距'],
              ['⑤ 标数据', '柱顶依次写：10、15、8、7'],
              ['⑥ 写标题', '"全班同学最喜欢的科目统计图"'],
            ],
          });
          S.addText('s4-tip', 3, 12.8, '纵轴上限 ≥ 最大频数 × 1.1', { size: 13, color: BLUE, anchorX: 'middle' });
          S.addText('s4-tip2', 3, 11.5, '本题：最大值15 → 上限取16', { size: 13, color: GREEN, anchorX: 'middle' });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
