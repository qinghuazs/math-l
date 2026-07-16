(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';

  var scene = {
    id: 's6',
    title: '六、本课小结',
    board: { axis: false, keepAspect: false },
    bbox: [-1, 12, 11, -1],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '本节课我们系统学习了三种统计图！来做最终总结：<b>条形图</b>用柱子高度比较各类别数量；<b>扇形图</b>用扇形面积展示各部分占总体的比例，核心公式是圆心角 = 百分比 × 360°；<b>折线图</b>用折线起伏反映数据随时间的变化趋势。三种图各有所长，选对图才能准确表达数据！',
        enter: function () {
          S.addText('s6-head', 5, 11.2, '三种统计图总结', { size: 16, color: BLUE, anchorX: 'middle' });
          // 三个图示意框
          // 条形图示意
          var barH = [4, 7, 5, 3];
          var barX = [1.2, 1.7, 2.2, 2.7];
          var barColors = [BLUE, WARM, GREEN, PURPLE];
          var bw = 0.35;
          var i;
          for (i = 0; i < barH.length; i++) {
            S.addPolygon('s6-bar' + i, [
              [barX[i] - bw / 2, 5.5],
              [barX[i] + bw / 2, 5.5],
              [barX[i] + bw / 2, 5.5 + barH[i] * 0.5],
              [barX[i] - bw / 2, 5.5 + barH[i] * 0.5],
            ], { color: barColors[i], opacity: 0.7 });
          }
          S.addText('s6-bar-lbl', 2.0, 4.8, '条形图', { size: 12, color: BLUE, anchorX: 'middle' });
          S.addText('s6-bar-tip', 2.0, 4.2, '比多少', { size: 11, color: INK, anchorX: 'middle' });

          // 扇形图示意（简单3块）
          var pieX = 5.5, pieY = 8, pieR = 1.3;
          var pieAngles = [144, 108, 108];
          var pieColors = [WARM, BLUE, GREEN];
          var pa = 90;
          for (i = 0; i < pieAngles.length; i++) {
            S.addSector('s6-pie' + i, [pieX, pieY], pieR,
              pa, pa + pieAngles[i], { color: pieColors[i], fillOpacity: 0.72 });
            pa += pieAngles[i];
          }
          S.addText('s6-pie-lbl', pieX, 6.2, '扇形图', { size: 12, color: WARM, anchorX: 'middle' });
          S.addText('s6-pie-tip', pieX, 5.6, '看占比', { size: 11, color: INK, anchorX: 'middle' });

          // 折线图示意
          var lineX = [8.5, 9.0, 9.5, 10.0, 10.5];
          var lineY = [7.5, 8.8, 8.0, 9.2, 8.5];
          var linePts = [];
          for (i = 0; i < lineX.length; i++) {
            linePts.push([lineX[i], lineY[i]]);
            S.dropPoint('s6-lpt' + i, lineX[i], lineY[i], { color: WARM, size: 3, name: '' });
          }
          S.addPolyline('s6-polyline', linePts, { color: BLUE, width: 2.5 });
          S.addText('s6-line-lbl', 9.5, 6.2, '折线图', { size: 12, color: GREEN, anchorX: 'middle' });
          S.addText('s6-line-tip', 9.5, 5.6, '看趋势', { size: 11, color: INK, anchorX: 'middle' });

          P.renderTable({
            head: ['统计图', '核心用途', '关键公式/特征'],
            rows: [
              ['条形图', '比较数量多少', '柱高=频数'],
              ['扇形图', '展示比例构成', '$圆心角=百分比\\times360°$'],
              ['折线图', '表示变化趋势', '折线起伏=趋势变化'],
            ],
          });
        },
      },
      {
        narration: '课后作业：（1）某班50名学生最喜欢的科目调查：数学20人、语文15人、英语10人、其他5人。请计算各科的百分比和圆心角，并画出扇形统计图。（2）记录本周每天你的学习时间（小时），制作折线统计图，并描述变化趋势。（3）思考：如果要同时比较各年级人数多少和各年级人数占全校的比例，应该用哪几种图？',
        enter: function () {
          S.addText('s6-hw', 5, 11.0, '课后作业', { size: 16, color: WARM, anchorX: 'middle' });
          P.renderCard(
            '<b>作业（3题）</b>：<br><br>' +
            '① 某班50人科目调查：<br>' +
            '数学20、语文15、英语10、其他5<br>' +
            '→ 算百分比+圆心角，画扇形图<br><br>' +
            '② 记录本周每天学习时间<br>' +
            '→ 画折线图，描述变化趋势<br><br>' +
            '③ 思考：比较人数多少+占比<br>' +
            '→ 应选哪几种统计图？'
          );
          // 作业提示表（第1题）
          S.addText('s6-hw-title', 5, 9.5, '第①题参考框架：', { size: 13, color: BLUE, anchorX: 'middle' });
          S.addText('s6-hw-f', 5, 8.5,
            '$圆心角 = \\dfrac{人数}{总人数} \\times 360°$',
            { size: 14, color: WARM, anchorX: 'middle' });
          S.addText('s6-hw-eg', 5, 7.0,
            '数学：$\\dfrac{20}{50} \\times 360° = 144°$',
            { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('s6-hw-eg2', 5, 5.5,
            '语文：$\\dfrac{15}{50} \\times 360° = 108°$',
            { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('s6-key', 5, 4.0,
            '记住：百分比×360° = 圆心角',
            { size: 13, color: INK, anchorX: 'middle' });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
