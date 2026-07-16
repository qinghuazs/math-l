// s5-summary.js  小结与活动（2步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、小结与活动',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：问卷设计要点小结
        narration: '好，我们来做一个全课总结。今天学习了调查问卷设计与数据收集，核心知识可以用一张思维导图来概括。数据收集有四种方式：问卷调查、实验观测、查阅资料和网络查询。其中问卷调查由五部分构成：标题、调查说明、基本信息、调查问题和感谢语。问题有三种类型：单选题、多选题和填空题。设计时要遵循四大原则：问题明确、选项互斥、选项完整、避免诱导。收集数据后用划记法统计频数，整理成统计表。这就是今天的完整学习路线！同学们，记住这个框架，遇到设计问卷的任务就能系统地思考了。',
        enter: function (anim) {
          // 思维导图式小结
          // 中心标题
          S.addPolygon('center-bg',
            [[-3.5, 1.2], [3.5, 1.2], [3.5, -0.5], [-3.5, -0.5]],
            { fillColor: GOLD, fillOpacity: 0.9, strokeColor: GOLD, strokeWidth: 0 });
          S.addText('center', 0, 0.5, '本课知识框架', { size: 17, color: '#fff', anchorX: 'middle' });

          // 上方：数据收集方式
          S.addPolygon('n1-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 5.5], [-9.5, 5.5]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('n1-t', 0, 6.8, '① 数据收集方式', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('n1-d', 0, 6.0, '问卷调查 / 实验观测 / 查阅资料 / 网络查询',
            { size: 14, color: INK, anchorX: 'middle' });

          // 左上：问卷结构
          S.addPolygon('n2-bg',
            [[-9.5, 5.0], [-0.3, 5.0], [-0.3, 2.5], [-9.5, 2.5]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('n2-t', -4.9, 4.6, '② 问卷结构', { size: 15, color: GREEN, anchorX: 'middle' });
          S.addText('n2-d', -9.0, 3.9, '标题 → 说明 → 基本信息', { size: 13, color: INK });
          S.addText('n2-d2', -9.0, 3.1, '→ 调查问题 → 感谢语', { size: 13, color: INK });

          // 右上：问题类型
          S.addPolygon('n3-bg',
            [[0.3, 5.0], [9.5, 5.0], [9.5, 2.5], [0.3, 2.5]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('n3-t', 4.9, 4.6, '③ 问题类型', { size: 15, color: ORANGE, anchorX: 'middle' });
          S.addText('n3-d', 0.7, 3.9, '单选题 / 多选题 / 填空题', { size: 13, color: INK });
          S.addText('n3-d2', 0.7, 3.1, '优先选择和多选，谨慎用填空', { size: 13, color: INK });

          // 连线（中心到上方）
          S.addPolygon('conn-up',
            [[-0.1, 5.5], [0.1, 5.5], [0.1, 1.2], [-0.1, 1.2]],
            { fillColor: GOLD, fillOpacity: 0.6, strokeColor: GOLD, strokeWidth: 0 });

          // 左下：设计原则
          S.addPolygon('n4-bg',
            [[-9.5, -1.0], [-0.3, -1.0], [-0.3, -4.5], [-9.5, -4.5]],
            { fillColor: '#fce4ec', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('n4-t', -4.9, -1.4, '④ 设计原则 ★', { size: 15, color: RED, anchorX: 'middle' });
          S.addText('n4-d1', -9.0, -2.1, '问题明确：无模糊词', { size: 13, color: INK });
          S.addText('n4-d2', -9.0, -2.8, '选项互斥：区间不重叠', { size: 13, color: INK });
          S.addText('n4-d3', -9.0, -3.5, '选项完整：覆盖全部情况', { size: 13, color: INK });
          S.addText('n4-d4', -9.0, -4.2, '避免诱导：保持中立', { size: 13, color: INK });

          // 右下：数据整理
          S.addPolygon('n5-bg',
            [[0.3, -1.0], [9.5, -1.0], [9.5, -4.5], [0.3, -4.5]],
            { fillColor: '#f3e5f5', fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('n5-t', 4.9, -1.4, '⑤ 数据整理', { size: 15, color: PURPLE, anchorX: 'middle' });
          S.addText('n5-d1', 0.7, -2.1, '划记法（唱票）→ 频数', { size: 13, color: INK });
          S.addText('n5-d2', 0.7, -2.8, '"正"字5笔 = 5个数据', { size: 13, color: INK });
          S.addText('n5-d3', 0.7, -3.5, '→ 频数统计表', { size: 13, color: INK });
          S.addText('n5-d4', 0.7, -4.2, '→ 统计图（条形/扇形）', { size: 13, color: INK });

          // 连线（中心到下方）
          S.addPolygon('conn-dn',
            [[-0.1, -0.5], [0.1, -0.5], [0.1, -1.0], [-0.1, -1.0]],
            { fillColor: GOLD, fillOpacity: 0.6, strokeColor: GOLD, strokeWidth: 0 });

          // 底部口诀
          S.addPolygon('slogan-bg',
            [[-9.5, -5.0], [9.5, -5.0], [9.5, -7.2], [-9.5, -7.2]],
            { fillColor: '#37474f', fillOpacity: 0.9, strokeColor: '#37474f', strokeWidth: 0 });
          S.addText('slogan', 0, -5.7, '设计口诀：明确·互斥·完整·中立',
            { size: 17, color: '#ffffff', anchorX: 'middle' });
          S.addText('slogan2', 0, -6.6, '好问题 → 好数据 → 好结论',
            { size: 15, color: '#ffcc02', anchorX: 'middle' });

          P.clearExtras();
          P.renderCard(
            '<b>本课知识框架</b><br><br>' +
            '① 4种数据收集方式<br>' +
            '② 问卷5部分结构<br>' +
            '③ 3种题型（单/多/填）<br>' +
            '④ 4大设计原则 ★<br>' +
            '⑤ 划记法整理→统计表<br><br>' +
            '<b>口诀：明确·互斥·完整·中立</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：班级调查活动建议卡
        narration: '最后，我们来进行一次班级调查活动！围绕"班级学生课外阅读情况"，按小组合作完成一份调查问卷。活动分七步进行：第一步，明确调查目的——你们想了解什么？第二步，确定调查对象——是全班同学，还是全年级？第三步，设计问卷——运用今天学的四大原则，写出有质量的问题。第四步，组间互评——交换问卷，看对方有没有违反原则的问题，提出修改建议。第五步，修改问卷——根据评价意见完善问卷。第六步，收集数据——发给被调查者填写，回收问卷。第七步，检查整理——用划记法统计，检查是否有无效答卷（比如漏填、乱填）。这七步完成，你们就完成了一次完整的统计调查！加油！',
        enter: function (anim) {
          // 清除上一步
          ['center-bg','center','n1-bg','n1-t','n1-d',
           'n2-bg','n2-t','n2-d','n2-d2','n3-bg','n3-t','n3-d','n3-d2',
           'conn-up','n4-bg','n4-t','n4-d1','n4-d2','n4-d3','n4-d4',
           'n5-bg','n5-t','n5-d1','n5-d2','n5-d3','n5-d4','conn-dn',
           'slogan-bg','slogan','slogan2'].forEach(function(id){ S.remove(id); });

          // 活动标题
          S.addPolygon('act-title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 5.8], [-9.5, 5.8]],
            { fillColor: TEAL, fillOpacity: 0.9, strokeColor: TEAL, strokeWidth: 0 });
          S.addText('act-title', 0, 6.7, '课堂活动：班级课外阅读情况调查',
            { size: 18, color: '#ffffff', anchorX: 'middle' });

          // 主题提示
          S.addPolygon('theme-bg',
            [[-9.5, 5.3], [9.5, 5.3], [9.5, 4.2], [-9.5, 4.2]],
            { fillColor: '#e0f7fa', fillOpacity: 1, strokeColor: TEAL, strokeWidth: 2 });
          S.addText('theme', 0, 4.9, '调查主题：班级同学的课外阅读情况',
            { size: 15, color: TEAL, anchorX: 'middle' });

          // 七步流程（两列）
          var steps7 = [
            { n: '第①步', txt: '明确调查目的', detail: '你们想了解什么问题？' },
            { n: '第②步', txt: '确定调查对象', detail: '全班/全年级/部分同学' },
            { n: '第③步', txt: '设计问卷', detail: '运用四大原则写问题' },
            { n: '第④步', txt: '组间互评', detail: '找出违反原则的问题' },
            { n: '第⑤步', txt: '修改问卷', detail: '根据评价完善问卷' },
            { n: '第⑥步', txt: '收集数据', detail: '发卷、回收' },
            { n: '第⑦步', txt: '检查整理', detail: '划记统计，剔除无效' },
          ];

          var colors7 = [BLUE, GREEN, ORANGE, RED, PURPLE, TEAL, '#827717'];
          steps7.forEach(function (st, i) {
            var col = i < 4 ? 0 : 1;
            var row = i < 4 ? i : i - 4;
            var x = col === 0 ? -9.5 : 0.3;
            var xEnd = col === 0 ? -0.3 : 9.5;
            var yTop = 3.7 - row * 1.1;
            var yBot = yTop - 0.9;
            S.addPolygon('st' + i + '-bg',
              [[x, yTop], [xEnd, yTop], [xEnd, yBot], [x, yBot]],
              { fillColor: '#fafafa', fillOpacity: 1, strokeColor: colors7[i], strokeWidth: 1.5 });
            S.addText('st' + i + '-n', x + 0.3, yTop - 0.2, st.n,
              { size: 13, color: colors7[i] });
            S.addText('st' + i + '-t', x + 2.5, yTop - 0.2, st.txt,
              { size: 14, color: INK });
          });

          // 可选问题参考
          S.addPolygon('ref-bg',
            [[-9.5, -3.8], [9.5, -3.8], [9.5, -6.0], [-9.5, -6.0]],
            { fillColor: '#fff8e1', fillOpacity: 1, strokeColor: GOLD, strokeWidth: 2 });
          S.addText('ref-t', 0, -4.2, '问卷可包含的问题（参考）：',
            { size: 14, color: '#827717', anchorX: 'middle' });
          S.addText('ref-1', -9.0, -4.8, '• 每周阅读时间  • 主要阅读类型  • 阅读方式', { size: 13, color: INK });
          S.addText('ref-2', -9.0, -5.5, '• 是否有固定计划  • 最希望的阅读支持', { size: 13, color: INK });

          // 评价标准提示
          S.addPolygon('eval-bg',
            [[-9.5, -6.4], [9.5, -6.4], [9.5, -7.3], [-9.5, -7.3]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('eval', 0, -6.9,
            '评价标准：目的明确 · 表述清楚 · 选项合理 · 无诱导 · 便于整理',
            { size: 13, color: BLUE, anchorX: 'middle' });

          P.clearExtras();
          P.renderCard(
            '<b>活动建议卡</b><br><br>' +
            '小组合作，7步完成调查：<br>' +
            '①明确目的 ②确定对象<br>' +
            '③设计问卷 ④互评修改<br>' +
            '⑤修改完善 ⑥收集数据<br>' +
            '⑦划记整理<br><br>' +
            '<span style="color:#00695c">好问题产生好数据！加油！</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
