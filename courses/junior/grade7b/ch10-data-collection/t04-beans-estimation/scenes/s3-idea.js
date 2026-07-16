(function (CW) {
  'use strict';
  var S, P;
  var COOL   = '#1565c0';
  var WARM   = '#e64a19';
  var INK    = '#37474f';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';

  // 场景3：用样本估计总体的思想（3步）
  // 展示"部分反映整体"的数学思想，用大圆/小圆示意总体与样本

  var scene = {
    id: 's3',
    title: '三、用样本估计总体的思想',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '标记重捕法背后有一个深刻的数学思想：<b>用样本估计总体</b>。我们不可能调查全部豆子，但可以通过<b>有代表性的一部分</b>来推断整体！',
        enter: function () {
          // 大圆 = 总体（所有豆子）
          S.addCircle('s3-total', -2.0, 0, 5.5,
            { color: COOL, width: 3, fill: COOL, fillOpacity: 0.06 });
          S.addText('s3-tlabel', -5.5, 5.8, '总体（全部豆子，数量未知）', { size: 17, color: COOL });

          // 小圆 = 样本（第一次 50 粒）
          S.addCircle('s3-sample1', 4.5, 2.0, 2.2,
            { color: WARM, width: 3, fill: WARM, fillOpacity: 0.12 });
          S.addText('s3-slabel1', 3.0, 4.8, '第一次样本', { size: 15, color: WARM });
          S.addText('s3-sval1',   3.5, 4.1, '$N=50$ 粒（做标记）', { size: 15, color: WARM });

          // 小圆 = 第二次样本
          S.addCircle('s3-sample2', 4.5, -2.5, 2.2,
            { color: PURPLE, width: 3, fill: PURPLE, fillOpacity: 0.12 });
          S.addText('s3-slabel2', 2.9, 0.2, '第二次样本', { size: 15, color: PURPLE });
          S.addText('s3-sval2',   3.0, -0.5, '$M=40$ 粒，含 $m=8$ 标记', { size: 15, color: PURPLE });
        },
      },
      {
        narration: '这种方法成立，有<b>两个核心前提</b>：①抽样必须<b>随机</b>（每粒豆子被抽中的机会相同）；②样本容量要<b>足够大</b>（样本越大，估计越准确）。',
        enter: function () {
          P.clearExtras();
          P.renderTable({
            head: ['前提条件', '说明', '违反后果'],
            rows: [
              ['抽样随机', '每粒被抽中概率相同', '估计偏差大'],
              ['充分摇匀', '标记豆均匀分布', '样本不代表总体'],
              ['样本足够大', '$M$ 和 $m$ 不能太小', '误差过大'],
              ['标记不脱落', '标记不影响被选中概率', '少计标记豆'],
            ],
          });
        },
      },
      {
        narration: '核心比例关系：标记豆在<b>总体</b>中占的比例，近似等于标记豆在<b>第二次样本</b>中占的比例。这就是"<b>样本比例 ≈ 总体比例</b>"的思想！',
        enter: function () {
          P.clearExtras();
          P.renderCard(
            '<b>核心公式</b><br>' +
            '$$\\frac{m}{N} \\approx \\frac{k}{n} \\quad \\Rightarrow \\quad N \\approx \\frac{mn}{k}$$' +
            '<small>$m$：第一次标记数 &nbsp;|&nbsp; $n$：第二次取样数 &nbsp;|&nbsp; $k$：第二次中的标记数</small>',
            'cool'
          );
          // 箭头式文字说明（用 actor 替代真箭头）
          S.addText('s3-arrow', -5.0, -3.5,
            '样本中标记比例 $\\approx$ 总体中标记比例', { size: 18, color: GREEN });
          S.addText('s3-sub', -5.5, -5.0,
            '即：$\\dfrac{8}{40} \\approx \\dfrac{50}{N}$，解得 $N \\approx 250$',
            { size: 17, color: WARM });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
