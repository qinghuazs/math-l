// s5-method.js  环节五：建模三步曲（3步）
// 数学验算：无计算，方法论总结
// 建模框架：①设（清单位）→②列（等量关系）→③解（+检验+作答）
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100', PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、建模三步曲',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：三个方框依次出现
      {
        narration: '两道例题都学完了。现在我们把解题过程提炼成一个通用框架——建模三步曲。第一步：设——设 x 表示什么，单位必须写清楚！第二步：列——从题目中找等量关系，列出方程。第三步：解——解方程，做两层检验，规范作答。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.2, '建模三步曲（通用框架）', { color: TEAL, size: 20, bold: true });

          // 三个大方框（顺序出现）
          var drawBox1 = function () {
            S.addPolygon('s5-box1-bg', [[-9.5, 4.0], [-2.5, 4.0], [-2.5, -0.5], [-9.5, -0.5]],
              { color: WARM, opacity: 0.12, borderWidth: 0 });
            S.addSegment('s5-box1-t', [-9.5, 4.0], [-2.5, 4.0], { color: WARM, width: 3, dash: 0 });
            S.addSegment('s5-box1-b', [-9.5, -0.5], [-2.5, -0.5], { color: WARM, width: 3, dash: 0 });
            S.addSegment('s5-box1-l', [-9.5, -0.5], [-9.5, 4.0], { color: WARM, width: 3, dash: 0 });
            S.addSegment('s5-box1-r', [-2.5, -0.5], [-2.5, 4.0], { color: WARM, width: 3, dash: 0 });
            S.actor('s5-step1-num', -6.0, 3.2, '① 设', { color: WARM, size: 22, bold: true });
            S.actor('s5-step1-txt', -6.0, 1.6, '设 $x$ 表示什么', { color: WARM, size: 16 });
            S.actor('s5-step1-key', -6.0, 0.2, '（<b>单位！</b>）', { color: WARM, size: 15 });
          };

          var drawBox2 = function () {
            S.addPolygon('s5-box2-bg', [[-1.5, 4.0], [2.5, 4.0], [2.5, -0.5], [-1.5, -0.5]],
              { color: COOL, opacity: 0.12, borderWidth: 0 });
            S.addSegment('s5-box2-t', [-1.5, 4.0], [2.5, 4.0], { color: COOL, width: 3, dash: 0 });
            S.addSegment('s5-box2-b', [-1.5, -0.5], [2.5, -0.5], { color: COOL, width: 3, dash: 0 });
            S.addSegment('s5-box2-l', [-1.5, -0.5], [-1.5, 4.0], { color: COOL, width: 3, dash: 0 });
            S.addSegment('s5-box2-r', [2.5, -0.5], [2.5, 4.0], { color: COOL, width: 3, dash: 0 });
            S.actor('s5-step2-num', 0.5, 3.2, '② 列', { color: COOL, size: 22, bold: true });
            S.actor('s5-step2-txt', 0.5, 1.6, '找等量关系', { color: COOL, size: 16 });
            S.actor('s5-step2-key', 0.5, 0.2, '列方程', { color: COOL, size: 15 });
          };

          var drawBox3 = function () {
            S.addPolygon('s5-box3-bg', [[3.5, 4.0], [9.5, 4.0], [9.5, -0.5], [3.5, -0.5]],
              { color: PURPLE, opacity: 0.12, borderWidth: 0 });
            S.addSegment('s5-box3-t', [3.5, 4.0], [9.5, 4.0], { color: PURPLE, width: 3, dash: 0 });
            S.addSegment('s5-box3-b', [3.5, -0.5], [9.5, -0.5], { color: PURPLE, width: 3, dash: 0 });
            S.addSegment('s5-box3-l', [3.5, -0.5], [3.5, 4.0], { color: PURPLE, width: 3, dash: 0 });
            S.addSegment('s5-box3-r', [9.5, -0.5], [9.5, 4.0], { color: PURPLE, width: 3, dash: 0 });
            S.actor('s5-step3-num', 6.5, 3.2, '③ 解', { color: PURPLE, size: 22, bold: true });
            S.actor('s5-step3-txt', 6.5, 1.6, '解方程', { color: PURPLE, size: 16 });
            S.actor('s5-step3-key', 6.5, 0.2, '检验 + 作答', { color: PURPLE, size: 15 });
          };

          if (!anim) {
            drawBox1(); drawBox2(); drawBox3();
            P.renderCard(
              '<b>建模三步曲</b><br>' +
              '① <b>设</b>——设 $x$ 表示什么（单位！）<br>' +
              '② <b>列</b>——找等量关系，列方程<br>' +
              '③ <b>解</b>——解方程 + 两层检验 + 规范作答'
            );
            return Promise.resolve();
          }

          drawBox1();
          return delay(600).then(function () {
            drawBox2();
            return delay(600);
          }).then(function () {
            drawBox3();
            P.renderCard(
              '<b>建模三步曲</b><br>' +
              '① <b>设</b>——设 $x$ 表示什么（单位！）<br>' +
              '② <b>列</b>——找等量关系，列方程<br>' +
              '③ <b>解</b>——解方程 + 两层检验 + 规范作答'
            );
            return delay(300);
          });
        },
      },

      // Step 2：两类问题填入框架对比表
      {
        narration: '我们把两类问题分别套进三步框架，看看各自在哪一步有什么特点。设元：配套问题设"生产A零件的人数x"，工程问题设"最初安排x人"。列方程：配套问题找"B数量等于配套比乘以A数量"，工程问题找"各阶段工作量之和等于1"。解方程：配套问题检验人数范围，工程问题检验正整数。',
        enter: function (anim) {
          P.renderTable({
            head: ['步骤', '配套问题', '工程问题'],
            rows: [
              ['①设', '设 $x$ 人生产A零件', '设最初安排 $x$ 人'],
              ['②列（等量关系）', 'B数量 = 配套比 × A数量', '各阶段工作量之和 = 1'],
              ['③解', '解方程 + 检验人数范围', '解方程 + 检验正整数']
            ]
          });

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：口诀卡片（tada动效）
      {
        narration: '最后记住这两句口诀！"配套找倍数"——配套问题的等量关系是倍数关系，B数量等于若干倍的A数量；"工程凑满1"——工程问题各阶段工作量加起来要等于1。这两句话是区分两类题型的关键锚点。记住了吗？',
        enter: function (anim) {
          S.actor('s5-slogan-label', 0, -2.0, '建模口诀：', { color: TEAL, size: 18, bold: true });
          S.actor('s5-slogan1', 0, -3.6,
            '一设（清单位）、二找（等量关系）、三解（别忘检验）！',
            { color: ORANGE, size: 16, bold: true });
          S.actor('s5-slogan2', 0, -5.4,
            '配套找倍数，工程凑满 1。',
            { color: WARM, size: 20, bold: true, css: 'background:#fbe9e7;border:2px solid #e64a19;border-radius:8px;padding:6px 16px;' });

          P.renderCard(
            '<b>建模口诀（务必记住！）</b><br>' +
            '一设（清单位）、二找（等量关系）、三解（别忘检验）！<br>' +
            '<b>配套找倍数，工程凑满1。</b>',
            'warm', 'tada'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
