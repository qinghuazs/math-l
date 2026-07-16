// s1-sources.js  数据从哪来（2步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var TEAL   = '#00695c';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、数据从哪来',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：收集数据的四种方式
        narration: '同学们好！在统计学中，一切分析的起点都是数据。那么，数据从哪里来呢？收集数据的方式有很多种。第一种是"问卷调查"——通过设计问题让被调查者填写回答；第二种是"实验观测"——通过亲自做实验来获取数据，比如测量不同材料的导热性；第三种是"查阅资料"——从图书、报告、年鉴等文献中获取已有数据；第四种是"网络查询"——从互联网上的可靠数据库中获取数据。这四种方式各有适用场景，我们要根据调查目的灵活选用。',
        enter: function (anim) {
          // 标题
          S.addPolygon('title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 5.8], [-9.5, 5.8]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('title', 0, 6.7, '数据从哪里来？', { size: 20, color: GREEN, anchorX: 'middle' });

          // 四种方式：2×2 布局
          // 左上：问卷调查
          S.addPolygon('m1-bg',
            [[-9.5, 5.2], [-0.5, 5.2], [-0.5, 2.2], [-9.5, 2.2]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('m1-icon', -8.5, 4.6, '📋', { size: 20, color: BLUE });
          S.addText('m1-name', -6.5, 4.6, '问卷调查', { size: 17, color: BLUE });
          S.addText('m1-desc', -9.0, 3.5, '设计问题，请被调查者', { size: 13, color: INK });
          S.addText('m1-desc2', -9.0, 2.7, '填写或选择答案', { size: 13, color: INK });

          // 右上：实验观测
          S.addPolygon('m2-bg',
            [[0.5, 5.2], [9.5, 5.2], [9.5, 2.2], [0.5, 2.2]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('m2-icon', 1.5, 4.6, '🔬', { size: 20, color: ORANGE });
          S.addText('m2-name', 3.5, 4.6, '实验观测', { size: 17, color: ORANGE });
          S.addText('m2-desc', 1.0, 3.5, '通过亲自实验获取', { size: 13, color: INK });
          S.addText('m2-desc2', 1.0, 2.7, '第一手数据', { size: 13, color: INK });

          // 左下：查阅资料
          S.addPolygon('m3-bg',
            [[-9.5, 1.7], [-0.5, 1.7], [-0.5, -1.3], [-9.5, -1.3]],
            { fillColor: '#f3e5f5', fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('m3-icon', -8.5, 1.1, '📚', { size: 20, color: PURPLE });
          S.addText('m3-name', -6.5, 1.1, '查阅资料', { size: 17, color: PURPLE });
          S.addText('m3-desc', -9.0, 0.0, '从图书、报告、年鉴', { size: 13, color: INK });
          S.addText('m3-desc2', -9.0, -0.8, '等文献获取数据', { size: 13, color: INK });

          // 右下：网络查询
          S.addPolygon('m4-bg',
            [[0.5, 1.7], [9.5, 1.7], [9.5, -1.3], [0.5, -1.3]],
            { fillColor: '#e0f7fa', fillOpacity: 1, strokeColor: TEAL, strokeWidth: 2 });
          S.addText('m4-icon', 1.5, 1.1, '🌐', { size: 20, color: TEAL });
          S.addText('m4-name', 3.5, 1.1, '网络查询', { size: 17, color: TEAL });
          S.addText('m4-desc', 1.0, 0.0, '从可靠数据库、', { size: 13, color: INK });
          S.addText('m4-desc2', 1.0, -0.8, '统计网站获取数据', { size: 13, color: INK });

          P.renderCard(
            '<b>收集数据的方式</b><br><br>' +
            '① <b>问卷调查</b>：设计问题，请人填写<br>' +
            '② <b>实验观测</b>：亲自实验，记录数据<br>' +
            '③ <b>查阅资料</b>：图书、报告、年鉴<br>' +
            '④ <b>网络查询</b>：可靠数据库、统计网站<br><br>' +
            '<span style="color:#2e7d32">根据调查目的，灵活选用！</span>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：本课聚焦"问卷调查"，说明适用场景
        narration: '在这四种方式中，今天我们重点学习"问卷调查"。问卷调查特别适合收集大量人的意见、态度、习惯等信息。比如：了解全班同学最喜欢的课外运动，调查社区居民对新公园的满意度，研究学生的课外阅读情况——这些都非常适合用问卷。问卷的优点是：可以同时收集很多人的信息，便于分类统计，也容易保护被调查者的隐私。当然，问卷设计得好不好，直接影响数据的质量，这就是我们今天的核心任务！',
        enter: function (anim) {
          // 淡出其他三种方式，突出问卷调查
          S.remove('m2-bg'); S.remove('m2-icon'); S.remove('m2-name'); S.remove('m2-desc'); S.remove('m2-desc2');
          S.remove('m3-bg'); S.remove('m3-icon'); S.remove('m3-name'); S.remove('m3-desc'); S.remove('m3-desc2');
          S.remove('m4-bg'); S.remove('m4-icon'); S.remove('m4-name'); S.remove('m4-desc'); S.remove('m4-desc2');

          // 问卷调查放大到中间
          S.remove('m1-bg'); S.remove('m1-icon'); S.remove('m1-name'); S.remove('m1-desc'); S.remove('m1-desc2');
          S.addPolygon('focus-bg',
            [[-9.5, 5.2], [9.5, 5.2], [9.5, 2.8], [-9.5, 2.8]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 3 });
          S.addText('focus-title', 0, 4.7, '本课聚焦：问卷调查', { size: 20, color: BLUE, anchorX: 'middle' });
          S.addText('focus-sub', 0, 3.4, '—— 收集大量人的意见、态度、习惯', { size: 15, color: BLUE, anchorX: 'middle' });

          // 适用场景
          S.addPolygon('sc-bg',
            [[-9.5, 2.3], [9.5, 2.3], [9.5, -2.5], [-9.5, -2.5]],
            { fillColor: '#f9fbe7', fillOpacity: 1, strokeColor: '#9e9d24', strokeWidth: 2 });
          S.addText('sc-title', 0, 1.7, '适合用问卷调查的情境', { size: 16, color: '#827717', anchorX: 'middle' });
          S.addText('sc1', -9.0, 0.7, '• 全班最喜欢的课外运动是什么？', { size: 14, color: INK });
          S.addText('sc2', -9.0, -0.2, '• 社区居民对新公园的满意度如何？', { size: 14, color: INK });
          S.addText('sc3', -9.0, -1.1, '• 学生课外阅读情况调查', { size: 14, color: INK });
          S.addText('sc4', -9.0, -2.0, '• 同学对食堂饭菜的意见', { size: 14, color: INK });

          // 优点
          S.addPolygon('pro-bg',
            [[-9.5, -3.0], [9.5, -3.0], [9.5, -6.5], [-9.5, -6.5]],
            { fillColor: '#fce4ec', fillOpacity: 1, strokeColor: '#c2185b', strokeWidth: 2 });
          S.addText('pro-title', 0, -3.6, '问卷调查的优点', { size: 16, color: '#c2185b', anchorX: 'middle' });
          S.addText('pro1', -9.0, -4.5, '✓ 同时收集大量信息，效率高', { size: 14, color: INK });
          S.addText('pro2', -9.0, -5.4, '✓ 便于分类统计，可量化分析', { size: 14, color: INK });
          S.addText('pro3', -9.0, -6.2, '✓ 保护被调查者隐私', { size: 14, color: INK });

          P.clearExtras();
          P.renderCard(
            '<b>问卷调查的优点</b><br><br>' +
            '✓ 同时收集大量信息<br>' +
            '✓ 便于分类统计<br>' +
            '✓ 可保护隐私<br><br>' +
            '<b>关键：问卷设计好坏决定数据质量！</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
