// s2-structure.js  问卷的组成（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、问卷的组成',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：问卷结构概述
        narration: '一份好的调查问卷不是随意堆砌问题，它有固定的结构。完整的问卷通常包含五个部分：第一部分是"标题"，说明调查的主题；第二部分是"调查说明"，告诉被调查者调查目的、填写要求和保密承诺；第三部分是"基本信息"，收集被调查者的年龄、性别、班级等背景信息；第四部分是"调查问题"，这是问卷的核心，包含所有问题和选项；第五部分是"感谢语"，感谢被调查者的配合。记住这五部分，我们就能搭建问卷的基本框架！',
        enter: function (anim) {
          // 纵向五部分示意
          var parts = [
            { id: 'p1', y1: 7.2, y2: 5.8, color: '#1565c0', fill: '#e3f2fd', label: '① 标题', desc: '说明调查主题，简洁醒目' },
            { id: 'p2', y1: 5.3, y2: 3.8, color: '#2e7d32', fill: '#e8f5e9', label: '② 调查说明', desc: '目的、填写方式、保密承诺' },
            { id: 'p3', y1: 3.3, y2: 1.8, color: '#e65100', fill: '#fff3e0', label: '③ 基本信息', desc: '年龄、性别、班级等背景' },
            { id: 'p4', y1: 1.3, y2: -1.7, color: '#c62828', fill: '#fce4ec', label: '④ 调查问题', desc: '问题与选项（问卷核心）' },
            { id: 'p5', y1: -2.2, y2: -3.5, color: '#6a1b9a', fill: '#f3e5f5', label: '⑤ 感谢语', desc: '感谢被调查者的配合' },
          ];
          parts.forEach(function (p) {
            S.addPolygon(p.id + '-bg',
              [[-9.5, p.y1], [9.5, p.y1], [9.5, p.y2], [-9.5, p.y2]],
              { fillColor: p.fill, fillOpacity: 1, strokeColor: p.color, strokeWidth: 2 });
            S.addText(p.id + '-label', -9.0, (p.y1 + p.y2) / 2 + 0.3, p.label,
              { size: 16, color: p.color });
            S.addText(p.id + '-desc', -3.5, (p.y1 + p.y2) / 2 + 0.3, p.desc,
              { size: 14, color: INK });
          });

          P.renderCard(
            '<b>问卷的五部分结构</b><br><br>' +
            '① 标题<br>② 调查说明<br>③ 基本信息<br>' +
            '④ 调查问题（核心）<br>⑤ 感谢语'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：画板画一张"问卷"示意
        narration: '让我们在画板上模拟一张真实问卷的样子。你看，最上方是标题——"班级课外阅读情况调查问卷"，下面是调查说明，再往下是基本信息栏：姓名、班级、性别。然后是核心的问题区，每道题都有清晰的选项。最后是感谢语。注意问卷整体看起来很整洁，每个部分之间有清晰的分隔，这样被调查者才容易理解和填写。设计问卷时，排版整洁和结构清晰同样重要！',
        enter: function (anim) {
          // 清除上一步
          var parts = ['p1', 'p2', 'p3', 'p4', 'p5'];
          parts.forEach(function (p) {
            S.remove(p + '-bg'); S.remove(p + '-label'); S.remove(p + '-desc');
          });

          // 纸张背景
          S.addPolygon('paper',
            [[-7.5, 7.0], [7.5, 7.0], [7.5, -7.0], [-7.5, -7.0]],
            { fillColor: '#fffde7', fillOpacity: 1, strokeColor: '#bdbdbd', strokeWidth: 3 });

          // 标题栏
          S.addPolygon('q-title-bg',
            [[-7.5, 7.0], [7.5, 7.0], [7.5, 5.8], [-7.5, 5.8]],
            { fillColor: '#1565c0', fillOpacity: 0.9, strokeColor: '#1565c0', strokeWidth: 0 });
          S.addText('q-title', 0, 6.6, '班级课外阅读情况调查问卷',
            { size: 16, color: '#ffffff', anchorX: 'middle' });

          // 说明栏
          S.addText('q-note', -7.0, 5.4,
            '说明：本次调查用于了解同学的课外阅读情况，结果仅供学习研究，请如实填写。',
            { size: 12, color: '#546e7a' });

          // 分割线
          S.addPolygon('line1',
            [[-7.4, 5.0], [7.4, 5.0], [7.4, 4.85], [-7.4, 4.85]],
            { fillColor: '#bdbdbd', fillOpacity: 1, strokeColor: '#bdbdbd', strokeWidth: 0 });

          // 基本信息
          S.addText('q-info-label', -7.0, 4.6, '基本信息：', { size: 13, color: ORANGE });
          S.addText('q-name', -7.0, 3.9, '姓名：__________', { size: 13, color: INK });
          S.addText('q-class', -1.5, 3.9, '班级：__________', { size: 13, color: INK });
          S.addText('q-gender', 4.0, 3.9, '性别：□男  □女', { size: 13, color: INK });

          // 分割线
          S.addPolygon('line2',
            [[-7.4, 3.5], [7.4, 3.5], [7.4, 3.35], [-7.4, 3.35]],
            { fillColor: '#bdbdbd', fillOpacity: 1, strokeColor: '#bdbdbd', strokeWidth: 0 });

          // 问题区
          S.addText('q-area-label', -7.0, 3.1, '调查问题：', { size: 13, color: RED });
          S.addText('q1', -7.0, 2.4, '1. 你平均每周课外阅读时间约为多少？', { size: 13, color: INK });
          S.addText('q1-a', -7.0, 1.7, '  A. 不足1小时   B. 1～3小时   C. 3小时以上', { size: 12, color: '#546e7a' });
          S.addText('q2', -7.0, 1.0, '2. 你最喜欢的阅读类型是？（可多选）', { size: 13, color: INK });
          S.addText('q2-a', -7.0, 0.3, '  □科普  □文学  □历史  □漫画  □其他', { size: 12, color: '#546e7a' });
          S.addText('q3', -7.0, -0.4, '3. 你通常用什么方式阅读？', { size: 13, color: INK });
          S.addText('q3-a', -7.0, -1.1, '  A. 纸质书   B. 电子书   C. 两者都有', { size: 12, color: '#546e7a' });

          // 分割线
          S.addPolygon('line3',
            [[-7.4, -1.6], [7.4, -1.6], [7.4, -1.75], [-7.4, -1.75]],
            { fillColor: '#bdbdbd', fillOpacity: 1, strokeColor: '#bdbdbd', strokeWidth: 0 });

          // 感谢语
          S.addText('q-thanks', 0, -2.2,
            '感谢您的参与，您的回答对我们非常宝贵！',
            { size: 13, color: '#6a1b9a', anchorX: 'middle' });

          // 标注箭头（右侧）
          S.addText('label-title', 8.2, 6.4, '← 标题', { size: 13, color: '#1565c0' });
          S.addText('label-note', 8.2, 5.2, '← 说明', { size: 13, color: '#2e7d32' });
          S.addText('label-info', 8.2, 3.9, '← 基本信息', { size: 13, color: ORANGE });
          S.addText('label-q', 8.2, 1.7, '← 问题', { size: 13, color: RED });
          S.addText('label-thx', 8.2, -2.2, '← 感谢语', { size: 13, color: PURPLE });

          P.clearExtras();
          P.renderCard(
            '<b>问卷示意图</b><br><br>' +
            '注意问卷的布局：<br>' +
            '• 各部分分隔清晰<br>' +
            '• 填写空间充足<br>' +
            '• 选项格式一致<br><br>' +
            '<span style="color:#c62828">整洁的版面让人更愿意填写！</span>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：问题类型——单选/多选/填空
        narration: '调查问卷中的问题主要有三种类型。第一种是"单选题"——被调查者从几个选项中只能选一个，比如"你今天吃早饭了吗？A.是 B.否"，适合非此即彼的问题。第二种是"多选题"——可以选多个选项，比如"你喜欢哪些体育项目？□篮球 □足球 □乒乓球 □游泳"，适合爱好、需求等多元的情况。第三种是"填空题"——让被调查者用文字或数字填写，比如"你每天睡眠时间是几小时？___小时"，适合收集精确数值或自由意见，但填空题不易统计，要谨慎使用。设计问题时，要根据内容选对题型！',
        enter: function (anim) {
          // 清除问卷示意
          var ids = ['paper','q-title-bg','q-title','q-note','line1','q-info-label',
            'q-name','q-class','q-gender','line2','q-area-label','q1','q1-a',
            'q2','q2-a','q3','q3-a','line3','q-thanks',
            'label-title','label-note','label-info','label-q','label-thx'];
          ids.forEach(function (id) { S.remove(id); });

          // 三种题型
          // 单选题
          S.addPolygon('t1-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 4.2], [-9.5, 4.2]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('t1-type', -9.0, 6.7, '单选题', { size: 18, color: BLUE });
          S.addText('t1-tag', 1.5, 6.7, '只能选一个选项', { size: 14, color: BLUE });
          S.addText('t1-eg-label', -9.0, 5.8, '示例：', { size: 13, color: INK });
          S.addText('t1-eg', -9.0, 5.1, '你今天吃早饭了吗？  A. 是  B. 否',
            { size: 13, color: '#546e7a' });
          S.addText('t1-use', -9.0, 4.5, '适用：非此即彼、互斥选择',
            { size: 12, color: GREEN });

          // 多选题
          S.addPolygon('t2-bg',
            [[-9.5, 3.7], [9.5, 3.7], [9.5, 0.7], [-9.5, 0.7]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('t2-type', -9.0, 3.2, '多选题', { size: 18, color: ORANGE });
          S.addText('t2-tag', 1.5, 3.2, '可以选多个选项', { size: 14, color: ORANGE });
          S.addText('t2-eg-label', -9.0, 2.3, '示例：', { size: 13, color: INK });
          S.addText('t2-eg', -9.0, 1.6, '你喜欢哪些体育项目？（可多选）',
            { size: 13, color: '#546e7a' });
          S.addText('t2-eg2', -9.0, 1.0, '□篮球 □足球 □乒乓球 □游泳 □其他',
            { size: 13, color: '#546e7a' });
          S.addText('t2-use', -9.0, 0.4, '适用：爱好、需求等多元选择',
            { size: 12, color: GREEN });

          // 填空题
          S.addPolygon('t3-bg',
            [[-9.5, 0.2], [9.5, 0.2], [9.5, -2.8], [-9.5, -2.8]],
            { fillColor: '#fce4ec', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('t3-type', -9.0, -0.3, '填空题', { size: 18, color: RED });
          S.addText('t3-tag', 1.5, -0.3, '自由填写数字或文字', { size: 14, color: RED });
          S.addText('t3-eg-label', -9.0, -1.2, '示例：', { size: 13, color: INK });
          S.addText('t3-eg', -9.0, -1.9, '你每天睡眠时间是___小时？',
            { size: 13, color: '#546e7a' });
          S.addText('t3-use', -9.0, -2.5, '注意：填空题不易统计，要谨慎使用！',
            { size: 12, color: RED });

          // 总结
          S.addPolygon('sum-bg',
            [[-9.5, -3.3], [9.5, -3.3], [9.5, -5.5], [-9.5, -5.5]],
            { fillColor: '#f3e5f5', fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('sum-text', 0, -4.0, '设计建议：优先使用单选题和多选题，',
            { size: 14, color: PURPLE, anchorX: 'middle' });
          S.addText('sum-text2', 0, -4.9, '填空题只在必要时使用，且选项要易于统计。',
            { size: 14, color: PURPLE, anchorX: 'middle' });

          P.clearExtras();
          P.renderCard(
            '<b>问题的三种类型</b><br><br>' +
            '① <b>单选题</b>：只选一个，互斥选择<br>' +
            '② <b>多选题</b>：可选多个，标注"可多选"<br>' +
            '③ <b>填空题</b>：自由填写，不易统计<br><br>' +
            '<span style="color:#c62828">优先选择和多选，谨慎用填空！</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
