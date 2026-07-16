(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';
  var AMBER  = '#f57f17';
  var TEAL   = '#00695c';

  var scene = {
    id: 's5',
    title: '五、小结：做聪明的读图人',
    board: { axis: false },
    bbox: [-1, 14, 11, -2],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '今天我们当了一回<b>数据侦探</b>，一共揭穿了三种统计图的常见误导手法！来做个总结——读统计图有四个关键要点，缺一不可。记住这四点，任何"误导性"统计图都难逃你的法眼！',
        enter: function () {
          S.addText('s5-title', 5, 13.0, '读图"四看"——聪明读图人的秘籍', { size: 18, color: BLUE, anchorX: 'middle' });

          // 四条要点，逐行排列
          var items = [
            { num: '①', key: '看纵轴起点',   detail: '是否从0开始？截断纵轴会夸大差距！', color: WARM },
            { num: '②', key: '看刻度间距',   detail: '是否均匀？拉伸/压缩会改变折线趋势！', color: PURPLE },
            { num: '③', key: '看柱子宽度',   detail: '是否等宽？不等宽会制造面积错觉！', color: GREEN },
            { num: '④', key: '看整体比例',   detail: '图形是否立体？透视会造成视觉扭曲！', color: TEAL },
          ];
          var i;
          for (i = 0; i < items.length; i++) {
            var item = items[i];
            var baseY = 10.5 - i * 2.8;
            S.addText('s5-num' + i,    0.2, baseY,       item.num,          { size: 20, color: item.color });
            S.addText('s5-key' + i,    1.0, baseY,       item.key,          { size: 16, color: item.color });
            S.addText('s5-detail' + i, 1.0, baseY - 0.9, item.detail,       { size: 13, color: INK });
          }

          // 底部格言
          S.addText('s5-motto', 5, -0.5,
            '"数据不会骗人，但呈现方式会。"',
            { size: 14, color: AMBER, anchorX: 'middle' }
          );

          P.renderCard(
            '<b>三大误导手法回顾</b><br>' +
            '① <b style="color:#e64a19">纵轴截断</b>：起点非零夸大差距<br>' +
            '② <b style="color:#6a1b9a">形状变形</b>：不等宽/立体扭曲面积<br>' +
            '③ <b style="color:#2e7d32">刻度缩放</b>：拉伸/压缩改变趋势感'
          );
        },
      },
      {
        narration: '好，我们来做一个辨析练习！下面有三张统计图，哪张有问题，问题在哪里？给大家30秒思考——看！图1：纵轴从80开始，差距看起来很大，但实际差距可能很小！图2：柱子宽度不等，视觉面积失真！图3：折线纵轴被拉伸，趋势看起来比实际陡峭。现在你一定能辨别出来了！',
        enter: function () {
          S.addText('s5-quiz-title', 5, 13, '辨析练习：找出有问题的图', { size: 17, color: BLUE, anchorX: 'middle' });

          // 示意图1：纵轴截断的条形图
          S.addText('s5-q1-title', 1.5, 11.5, '图1', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('s5-q1-ystart', -0.5, 0.3, '80', { size: 11, color: WARM });
          S.addPolygon('s5-q1-b1', [[0.8, 0], [1.3, 0], [1.3, 4.0], [0.8, 4.0]], { color: BLUE, opacity: 0.75 });
          S.addPolygon('s5-q1-b2', [[1.7, 0], [2.2, 0], [2.2, 8.0], [1.7, 8.0]], { color: WARM, opacity: 0.75 });
          S.addText('s5-q1-lbl1', 1.05, 4.1, '85', { size: 11, color: BLUE,  anchorX: 'middle' });
          S.addText('s5-q1-lbl2', 1.95, 8.1, '90', { size: 11, color: WARM, anchorX: 'middle' });
          S.addText('s5-q1-ans', 1.5, -0.8, '? 纵轴从80开始！', { size: 11, color: WARM, anchorX: 'middle' });

          // 示意图2：不等宽柱
          S.addText('s5-q2-title', 5.5, 11.5, '图2', { size: 14, color: INK, anchorX: 'middle' });
          S.addPolygon('s5-q2-b1', [[3.8, 0], [4.1, 0], [4.1, 6.0], [3.8, 6.0]], { color: BLUE, opacity: 0.75 });
          S.addPolygon('s5-q2-b2', [[4.6, 0], [5.6, 0], [5.6, 6.0], [4.6, 6.0]], { color: WARM, opacity: 0.75 });
          S.addText('s5-q2-lbl1', 3.95, 6.1, '60', { size: 11, color: BLUE,  anchorX: 'middle' });
          S.addText('s5-q2-lbl2', 5.1, 6.1,  '60', { size: 11, color: WARM,  anchorX: 'middle' });
          S.addText('s5-q2-ans', 5.0, -0.8, '? 柱子宽度不等！', { size: 11, color: WARM, anchorX: 'middle' });

          // 示意图3：折线纵轴拉伸
          S.addText('s5-q3-title', 8.5, 11.5, '图3', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('s5-q3-ystart', 7.0, 0.3, '99', { size: 11, color: WARM });
          S.addPolyline('s5-q3-line', [
            [7.5, 0.5], [8.0, 2.0], [8.5, 5.5], [9.0, 9.0], [9.5, 11.0],
          ], { color: PURPLE, width: 2.5 });
          S.addText('s5-q3-ans', 8.5, -0.8, '? 纵轴99~101，被拉伸！', { size: 11, color: WARM, anchorX: 'middle' });

          // 大结论
          S.addText('s5-all-ans', 5, -1.6, '三张图都有问题！你全部找出来了吗？', { size: 13, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>辨析练习答案</b><br>' +
            '图1：✗ 纵轴从80开始，差距被夸大<br>' +
            '图2：✗ 柱子宽度不等，面积失真<br>' +
            '图3：✗ 纵轴范围仅99~101，趋势陡峭'
          );
        },
      },
      {
        narration: '最后，老师布置一个生活中的数学活动！课后请你去找一找：报纸、网络新闻、广告中有没有"有问题"的统计图？把它截图或拍下来，标出哪里有问题，带来课堂分享！<b>数据不会骗人，但呈现方式会</b>——你已经有了辨别的眼力，做聪明的数据读者，从今天开始！',
        enter: function () {
          S.addText('s5-end-title', 5, 12.5, '做聪明的数据读者', { size: 22, color: BLUE, anchorX: 'middle' });
          S.addText('s5-end-sub',   5, 11.2, '统计图辨析活动', { size: 16, color: INK, anchorX: 'middle' });

          // 课后活动卡
          S.addText('s5-act-label', 5, 9.8, '课后活动：', { size: 15, color: AMBER, anchorX: 'middle' });
          S.addText('s5-act1', 0.5, 8.7, '① 在生活中寻找统计图（报纸/网络/广告）', { size: 13, color: INK });
          S.addText('s5-act2', 0.5, 7.8, '② 判断是否存在误导手法', { size: 13, color: INK });
          S.addText('s5-act3', 0.5, 6.9, '③ 标出问题所在并说明理由', { size: 13, color: INK });
          S.addText('s5-act4', 0.5, 6.0, '④ 下节课分享你的发现！', { size: 13, color: GREEN });

          // 格言区
          S.addText('s5-motto1', 5, 4.3, '"数据不会骗人，', { size: 16, color: AMBER, anchorX: 'middle' });
          S.addText('s5-motto2', 5, 3.3, '   但呈现方式会。"', { size: 16, color: AMBER, anchorX: 'middle' });
          S.addText('s5-motto3', 5, 2.0, '——学会读图，比读数字更重要！', { size: 14, color: PURPLE, anchorX: 'middle' });

          // 本课知识总结表
          P.renderTable({
            head: ['误导手法', '典型特征', '辨别方法'],
            rows: [
              ['纵轴截断', '纵轴起点非零', '看纵轴起始值'],
              ['不等宽柱', '柱子宽度不同', '核查柱子宽度'],
              ['立体变形', '三维透视效果', '找正视平面图'],
              ['刻度拉伸', '折线异常陡峭', '看纵轴完整范围'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
