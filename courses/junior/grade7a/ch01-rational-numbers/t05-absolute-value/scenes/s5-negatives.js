// s5-negatives.js  环节五：两负数比大小（4步）
// 数学验算：-3 与 -5：|-3|=3, |-5|=5, 3<5，绝对值大的(-5)反而更小，所以 -5 < -3
// -3/4 与 -4/5 通分：-3/4=-15/20，-4/5=-16/20，|-15/20|=15/20 < |-16/20|=16/20
// 绝对值较大的 -4/5 反而更小，所以 -3/4 > -4/5
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';
  var GREEN = '#2e7d32';
  var RED  = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var AXIS_Y = 0.2;

  var scene = {
    id: 's5',
    title: '五、两负数比大小',
    bbox: [-6, 4.5, 6, -3.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：气温情境（双温度计对比图）
      {
        narration: '来看个生活情境。某地周一最低气温是零下3摄氏度，周二最低气温是零下5摄氏度。请问哪天更冷？——周二更冷，因为零下5度比零下3度还低！那么，负3和负5，哪个数更小呢？就是负5，因为周二更冷。',
        enter: function (anim) {
          // 题目
          S.actor('s5-sit-title', 0, 4.0, '气温情境', { color: TEAL, size: 18, bold: true });
          S.actor('s5-sit-q', 0, 3.2,
            '周一最低气温 $-3$℃，周二最低气温 $-5$℃',
            { color: INK, size: 16 });
          S.actor('s5-sit-q2', 0, 2.5, '哪天更冷？对应的温度数哪个更小？', { color: INK, size: 15 });

          // 双温度计（矩形模拟）
          // 温度计外框：左侧周一(-3)，右侧周二(-5)
          // 用 addSegment 画矩形外框，addPolygon 填充液柱

          // 左侧温度计（周一 -3℃）
          // 外框：x从-4.5到-2.5, y从-2.5到1.8
          S.addSegment('s5-th1-left',  [-4.5, -2.5], [-4.5, 1.8], { color: INK, width: 2 });
          S.addSegment('s5-th1-right', [-2.5, -2.5], [-2.5, 1.8], { color: INK, width: 2 });
          S.addSegment('s5-th1-top',   [-4.5, 1.8],  [-2.5, 1.8], { color: INK, width: 2 });
          S.addSegment('s5-th1-bot',   [-4.5, -2.5], [-2.5, -2.5], { color: INK, width: 2 });

          // 液柱填充：0℃ 对应 y=0，刻度间距0.5单位/℃
          // -3℃ → 液柱从-2.5到 0 - 3*0.5 = -1.5
          S.addPolygon('s5-th1-fill',
            [[-4.5, -2.5], [-2.5, -2.5], [-2.5, -1.5], [-4.5, -1.5]],
            { color: COOL, opacity: 0.7, borderWidth: 0 });
          S.addText('s5-th1-val', -3.7, -0.9, '-3℃', { color: COOL, size: 16 });
          S.addText('s5-th1-day', -3.7, 2.15, '周一', { color: INK, size: 15 });

          // 0℃ 刻度线
          S.addSegment('s5-th1-zero', [-4.5, 0], [-2.5, 0], { color: GRAY, width: 1, dash: 2 });
          S.addText('s5-th1-zlab', -2.3, 0, '0℃', { color: GRAY, size: 12 });

          // 右侧温度计（周二 -5℃）
          S.addSegment('s5-th2-left',  [2.5, -2.5], [2.5, 1.8],  { color: INK, width: 2 });
          S.addSegment('s5-th2-right', [4.5, -2.5], [4.5, 1.8],  { color: INK, width: 2 });
          S.addSegment('s5-th2-top',   [2.5, 1.8],  [4.5, 1.8],  { color: INK, width: 2 });
          S.addSegment('s5-th2-bot',   [2.5, -2.5], [4.5, -2.5], { color: INK, width: 2 });

          // -5℃ → 液柱从-2.5到 0 - 5*0.5 = -2.5（满液柱到底部）
          S.addPolygon('s5-th2-fill',
            [[2.5, -2.5], [4.5, -2.5], [4.5, -2.5], [2.5, -2.5]],
            { color: RED, opacity: 0.7, borderWidth: 0 });
          // 实际 -5 对应 y = 0 - 5*0.5 = -2.5，即液柱几乎到底
          S.addPolygon('s5-th2-fill2',
            [[2.5, -2.5], [4.5, -2.5], [4.5, -2.5], [2.5, -2.5]],
            { color: COOL, opacity: 0.85, borderWidth: 0 });
          // 修正：画满列从底部到-5℃高度（-5*0.5+0 = -2.5 超出，钳到-2.5~-2.5，视觉上满液）
          // 改为画到 -2.4（几乎满）
          S.addPolygon('s5-th2-liq',
            [[2.5, -2.5], [4.5, -2.5], [4.5, -2.3], [2.5, -2.3]],
            { color: COOL, opacity: 0.9, borderWidth: 0 });
          S.addText('s5-th2-val', 3.0, -1.6, '-5℃', { color: COOL, size: 16 });
          S.addText('s5-th2-day', 3.0, 2.15, '周二', { color: INK, size: 15 });
          S.addSegment('s5-th2-zero', [2.5, 0], [4.5, 0], { color: GRAY, width: 1, dash: 2 });
          S.addText('s5-th2-zlab', 4.7, 0, '0℃', { color: GRAY, size: 12 });

          P.renderCard(
            '<b>气温情境</b><br>' +
            '周一 $-3$℃，周二 $-5$℃——周二更冷！<br>' +
            '液柱更低 = 温度更低 = 数更小<br>' +
            '所以 $-5 \\lt -3$'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 2：数轴验证（-5 在 -3 左边）
      {
        narration: '用数轴来验证：在数轴上找到负5和负3的位置，负5在负3的左边——数轴上左边的数更小，所以负5小于负3，也就是说负3大于负5。',
        enter: function (anim) {
          // 清除温度计
          S.remove('s5-sit-title'); S.remove('s5-sit-q'); S.remove('s5-sit-q2');
          S.remove('s5-th1-left'); S.remove('s5-th1-right'); S.remove('s5-th1-top'); S.remove('s5-th1-bot');
          S.remove('s5-th1-fill'); S.remove('s5-th1-val'); S.remove('s5-th1-day');
          S.remove('s5-th1-zero'); S.remove('s5-th1-zlab');
          S.remove('s5-th2-left'); S.remove('s5-th2-right'); S.remove('s5-th2-top'); S.remove('s5-th2-bot');
          S.remove('s5-th2-fill'); S.remove('s5-th2-fill2'); S.remove('s5-th2-liq');
          S.remove('s5-th2-val'); S.remove('s5-th2-day'); S.remove('s5-th2-zero'); S.remove('s5-th2-zlab');

          // 数轴
          S.addSegment('s5-axis', [-5.2, AXIS_Y], [5.2, AXIS_Y], { color: INK, width: 3 });
          S.addSegment('s5-arr-r1', [5.0, AXIS_Y + 0.15], [5.2, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s5-arr-r2', [5.0, AXIS_Y - 0.15], [5.2, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s5-arr-l1', [-5.0, AXIS_Y + 0.15], [-5.2, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s5-arr-l2', [-5.0, AXIS_Y - 0.15], [-5.2, AXIS_Y], { color: INK, width: 2 });
          for (var n = -5; n <= 4; n++) {
            S.addSegment('s5-tick-' + (n + 5), [n, AXIS_Y - 0.15], [n, AXIS_Y + 0.15], { color: INK, width: 2 });
            if (n !== 0) {
              S.addText('s5-tlab-' + (n + 5), n - 0.1, AXIS_Y - 0.45, '' + n, { color: INK, size: 13 });
            }
          }
          S.addText('s5-zero', -0.08, AXIS_Y - 0.45, '0', { color: INK, size: 13 });

          // 标注 -3 和 -5
          S.dropPoint('s5-pt-n3', -3, AXIS_Y, { color: WARM, size: 5 });
          S.dropPoint('s5-pt-n5', -5, AXIS_Y, { color: COOL, size: 5 });
          S.addText('s5-lab-n3', -3.15, AXIS_Y + 0.5, '$-3$', { color: WARM, size: 16 });
          S.addText('s5-lab-n5', -5.15, AXIS_Y + 0.5, '$-5$', { color: COOL, size: 16 });

          // 箭头指向（-5 在左）
          S.addSegment('s5-arrow', [-4.6, AXIS_Y + 0.9], [-5.0, AXIS_Y + 0.5], { color: COOL, width: 2 });
          S.addText('s5-note-left', -4.5, AXIS_Y + 1.1, '$-5$ 在左边，更小', { color: COOL, size: 15 });

          // 结论
          S.actor('s5-concl', 0, -1.8,
            '$-5 \\lt -3$，即 $-3 \\gt -5$',
            { color: WARM, size: 19, bold: true });

          P.renderCard(
            '<b>数轴验证</b><br>' +
            '$-5$ 在 $-3$ 左边 $\\Rightarrow -5 \\lt -3$<br>' +
            '即 $-3 \\gt -5$（虽然 $3 \\lt 5$，<b>方向反了！</b>）'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 3：绝对值视角 + "反而"规则（renderCard warm 强调）
      {
        narration: '现在用绝对值来看：|-3|=3，|-5|=5，3小于5，也就是绝对值大的是5，对应数是-5，但-5反而比-3小！归纳规则：两个负数比大小，绝对值大的那个数反而小。这个"反而"二字特别重要——负数区间和正数区间的规律方向相反！',
        enter: function (anim) {
          S.remove('s5-axis'); S.remove('s5-arr-r1'); S.remove('s5-arr-r2');
          S.remove('s5-arr-l1'); S.remove('s5-arr-l2');
          for (var n = -5; n <= 4; n++) {
            S.remove('s5-tick-' + (n + 5));
            S.remove('s5-tlab-' + (n + 5));
          }
          S.remove('s5-zero');
          S.remove('s5-pt-n3'); S.remove('s5-pt-n5');
          S.remove('s5-lab-n3'); S.remove('s5-lab-n5');
          S.remove('s5-arrow'); S.remove('s5-note-left'); S.remove('s5-concl');

          S.actor('s5-abs-title', 0, 4.0, '绝对值视角', { color: TEAL, size: 18, bold: true });
          S.actor('s5-abs-row1', 0, 3.1,
            '$|-3| = 3$，$|-5| = 5$',
            { color: INK, size: 18 });
          S.actor('s5-abs-row2', 0, 2.2,
            '$3 \\lt 5$（绝对值：$|-3| \\lt |-5|$）',
            { color: COOL, size: 17 });
          S.actor('s5-abs-row3', 0, 1.2,
            '绝对值大的（$-5$）<b>反而</b>更小',
            { color: WARM, size: 18 });

          S.addSegment('s5-rule-line', [-5, 0.55], [5, 0.55], { color: GRAY, width: 1, dash: 2 });

          S.actor('s5-rule', 0, -0.1,
            '<b>两个负数比大小：</b>',
            { color: RED, size: 17 });
          S.actor('s5-rule2', 0, -0.9,
            '<b>绝对值大的那个数反而小</b>',
            { color: RED, size: 19 });
          S.actor('s5-rule3', 0, -1.8,
            '（方向与正数区间<b>相反</b>）',
            { color: INK, size: 15 });

          P.renderCard(
            '<b>两负数比大小口诀：</b><br>' +
            '<b>绝对值大的，反而小！</b><br>' +
            '$|-5|=5 \\gt |-3|=3$，所以 $-5 \\lt -3$',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 4：例题 -3/4 与 -4/5 通分推演
      {
        narration: '来做道例题！比较负四分之三和负五分之四的大小。方法：求绝对值后通分比较。|-3/4|=3/4=15/20，|-4/5|=4/5=16/20。15/20 小于 16/20，说明 |-3/4| 小于 |-4/5|。根据"两负数绝对值大的反而小"，绝对值较小的 -3/4 反而更大，所以负四分之三大于负五分之四！',
        enter: function (anim) {
          S.remove('s5-abs-title'); S.remove('s5-abs-row1'); S.remove('s5-abs-row2'); S.remove('s5-abs-row3');
          S.remove('s5-rule-line'); S.remove('s5-rule'); S.remove('s5-rule2'); S.remove('s5-rule3');

          S.actor('s5-ex-title', 0, 4.0, '例题', { color: TEAL, size: 18, bold: true });
          S.actor('s5-ex-q', 0, 3.2,
            '比较 $-\\dfrac{3}{4}$ 与 $-\\dfrac{4}{5}$ 的大小',
            { color: INK, size: 17 });
          S.actor('s5-ex-s1', 0, 2.2,
            '$\\left|-\\dfrac{3}{4}\\right| = \\dfrac{3}{4} = \\dfrac{15}{20}$',
            { color: COOL, size: 17 });
          S.actor('s5-ex-s2', 0, 1.3,
            '$\\left|-\\dfrac{4}{5}\\right| = \\dfrac{4}{5} = \\dfrac{16}{20}$',
            { color: WARM, size: 17 });
          S.actor('s5-ex-s3', 0, 0.3,
            '$\\dfrac{15}{20} \\lt \\dfrac{16}{20}$，即 $\\left|-\\dfrac{3}{4}\\right| \\lt \\left|-\\dfrac{4}{5}\\right|$',
            { color: INK, size: 16 });

          S.addSegment('s5-ex-line', [-5, -0.3], [5, -0.3], { color: GRAY, width: 1, dash: 2 });

          S.actor('s5-ex-concl', 0, -1.0,
            '绝对值小的 $-\\dfrac{3}{4}$ <b>反而</b>大',
            { color: WARM, size: 17 });
          S.actor('s5-ex-ans', 0, -1.9,
            '$-\\dfrac{3}{4} \\gt -\\dfrac{4}{5}$',
            { color: RED, size: 22, bold: true });

          P.renderCard(
            '<b>解：</b>通分后比绝对值<br>' +
            '$\\left|-\\dfrac{3}{4}\\right|=\\dfrac{15}{20} \\lt \\dfrac{16}{20}=\\left|-\\dfrac{4}{5}\\right|$<br>' +
            '绝对值小的反而大：$-\\dfrac{3}{4} \\gt -\\dfrac{4}{5}$',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
