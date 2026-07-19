// s1-intro.js  环节一：螺钉配螺母（3步）
// 数学验算：22人总数固定；1螺钉配2螺母 → B数量=2×A数量；可视化配对关系
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GRAY = '#90a4ae', ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、螺钉配螺母',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：情境导入 + 1:2 配套关系可视化
      {
        narration: '今天我们开始用一元一次方程解决实际问题。先看第一类——配套问题。工厂里生产螺钉和螺母，1个螺钉要配2个螺母才能装配使用。我在画板上画出来：左边暖色方块表示一颗螺钉，右边两个冷色方块表示需要配套的两颗螺母，中间连线表示配对关系。',
        enter: function (anim) {
          // 标题
          S.actor('s1-title', 0, 7.0, '一、螺钉配螺母——配套问题', { color: TEAL, size: 20, bold: true });

          // 螺钉图示（暖色方块）
          S.actor('s1-bolt', -5.5, 3.5, '螺钉', { color: WARM, size: 22, bold: true, css: 'background:#fbe9e7;border:3px solid #e64a19;border-radius:8px;padding:6px 18px;' });
          S.actor('s1-bolt-sub', -5.5, 2.2, '1 个', { color: WARM, size: 16 });

          // 螺母图示（冷色方块，两个）
          S.actor('s1-nut1', 3.0, 4.5, '螺母', { color: COOL, size: 22, bold: true, css: 'background:#e3f2fd;border:3px solid #1565c0;border-radius:8px;padding:6px 18px;' });
          S.actor('s1-nut2', 3.0, 2.5, '螺母', { color: COOL, size: 22, bold: true, css: 'background:#e3f2fd;border:3px solid #1565c0;border-radius:8px;padding:6px 18px;' });

          // 连线
          S.addSegment('s1-line1', [-3.6, 3.5], [1.8, 4.5], { color: GRAY, width: 2, dash: 2 });
          S.addSegment('s1-line2', [-3.6, 3.3], [1.8, 2.6], { color: GRAY, width: 2, dash: 2 });

          // 配比标注
          S.actor('s1-ratio', -1.0, 0.5, '配套比例：$1 : 2$', { color: ORANGE, size: 18, bold: true });

          P.renderCard(
            '<b>配套问题情境</b><br>' +
            '工厂生产螺钉和螺母，每个螺钉需要配 <b>2</b> 个螺母才能装配使用。<br>' +
            '配套关系：螺母个数 = <b>2</b> × 螺钉个数'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：22人分工示意
      {
        narration: '题目告诉我们：某工厂有工人22名，每人每天能生产螺钉1200个，或者生产螺母2000个——同一个工人，只能选其中一种任务。22名工人要分成两组：一组专门生产螺钉，另一组专门生产螺母。现在的问题是：怎么分才能使每天生产的螺钉和螺母恰好配套，一个都不浪费？',
        enter: function (anim) {
          // 清除前步装饰，重新绘制工人分组图
          S.remove('s1-title');
          S.remove('s1-bolt'); S.remove('s1-bolt-sub');
          S.remove('s1-nut1'); S.remove('s1-nut2');
          S.remove('s1-line1'); S.remove('s1-line2');
          S.remove('s1-ratio');

          S.actor('s1-title2', 0, 7.0, '22名工人分成两组', { color: TEAL, size: 20, bold: true });

          // 左侧：螺钉组（暖色）
          S.actor('s1-grp-a-title', -5.5, 5.5, '螺钉组', { color: WARM, size: 18, bold: true });
          S.actor('s1-grp-a-rate', -5.5, 4.2, '每人每天：1200个', { color: WARM, size: 15 });
          S.actor('s1-grp-a-x', -5.5, 2.8, '$x$ 人', { color: WARM, size: 26, bold: true });
          S.actor('s1-grp-a-prod', -5.5, 1.4, '产量：$1200x$ 个', { color: WARM, size: 16 });

          // 中间虚线
          S.addSegment('s1-divide', [0, 6.5], [0, 0], { color: GRAY, width: 2, dash: 3 });
          S.actor('s1-total', 0, -1.2, '共 22 人', { color: INK, size: 16 });

          // 右侧：螺母组（冷色）
          S.actor('s1-grp-b-title', 5.5, 5.5, '螺母组', { color: COOL, size: 18, bold: true });
          S.actor('s1-grp-b-rate', 5.5, 4.2, '每人每天：2000个', { color: COOL, size: 15 });
          S.actor('s1-grp-b-x', 5.5, 2.8, '$(22-x)$ 人', { color: COOL, size: 22, bold: true });
          S.actor('s1-grp-b-prod', 5.5, 1.4, '产量：$2000(22-x)$ 个', { color: COOL, size: 16 });

          P.renderCard(
            '<b>题目信息</b><br>' +
            '工人总数：<b>22名</b><br>' +
            '螺钉产量：每人每天 <b>1200</b> 个<br>' +
            '螺母产量：每人每天 <b>2000</b> 个<br>' +
            '要求：每天产量<b>恰好配套</b>，一个都不浪费'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 3：等量关系卡片——什么叫"恰好配套"
      {
        narration: '什么叫"恰好配套"？就是螺母的总数量恰好等于螺钉总数量的2倍——一对一对地全部配完，没有剩余。这就是我们的等量关系！螺母总数等于2乘以螺钉总数。记住：方向不能搞反——是螺母数量等于2倍螺钉数量，而不是螺钉数量等于2倍螺母数量。',
        enter: function (anim) {
          // 等量关系醒目标注
          S.actor('s1-eq-label', 0, -3.0, '等量关系：', { color: TEAL, size: 18, bold: true });
          S.actor('s1-eq-core', 0, -4.8,
            '螺母总数 $= 2 \\times$ 螺钉总数',
            { color: ORANGE, size: 20, bold: true });
          S.actor('s1-eq-expand', 0, -6.2,
            '$2000(22-x) = 2 \\times 1200x$',
            { color: WARM, size: 18, bold: true });

          P.renderCard(
            '<b>等量关系（核心！）</b><br>' +
            '恰好配套 = 螺母全部用完，螺钉也全部用完<br>' +
            '等量关系：<b>螺母总数 = 2 × 螺钉总数</b><br>' +
            '$2000(22-x) = 2 \\times 1200x$<br>' +
            '<small>注意：方向不能搞反，B数量 = 配套比 × A数量</small>',
            'warm'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
