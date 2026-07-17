// s6-exit.js  六、出口测试与收官（3步）
// 数学验算：
// ① |-5|+(-3)=5+(-3)=2 ✓
// ② (-1)^2026=1（偶次），(-1)^2025=-1（奇次），1-(-1)=1+1=2 ✓
// ③ -0.5=-3/6，-1/3=-2/6，-3/6<-2/6，即 -0.5<-1/3 ✓
// ④ 0.1×2^10=0.1×1024=102.4毫米 ✓
// ⑤ 96000000=9.6×10^7 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、出口测试与收官',
    bbox: [-11, 8, 11, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：五题小卷逐题出示
        narration: '最后环节——出口测试！五道题，4分钟，独立完成，不讨论。测试覆盖本章所有核心考点：绝对值计算、乘方符号规律、负数比大小、乘方的实际应用、科学记数法。开始！题①：|-5|+(-3)=【？】；题②：(-1)^2026-(-1)^2025=【？】；题③：-0.5 与 -1/3 比大小；题④：纸厚0.1毫米，对折10次厚多少毫米；题⑤：96000000用科学记数法表示。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.4, '出口测试·五题小卷（限时4分钟）', { color: INK, size: 17, bold: true });
          S.actor('s6-inst', 0, 6.5, '独立完成，不讨论，做完举手', { color: GRAY, size: 13 });

          // 五题
          S.actor('s6-q1', -4, 5.4, '① $|-5|+(-3) =$', { color: COOL, size: 16 });
          S.actor('s6-q1-blank', 4.5, 5.4, '【？】', { color: GRAY, size: 16 });

          S.actor('s6-q2', -4, 4.0,
            '② $(-1)^{2026} - (-1)^{2025} =$',
            { color: COOL, size: 16 });
          S.actor('s6-q2-blank', 6.5, 4.0, '【？】', { color: GRAY, size: 16 });

          S.actor('s6-q3', -4, 2.6, '③ 比较大小：$-0.5$', { color: COOL, size: 16 });
          S.actor('s6-q3-mid', 2.5, 2.6, '【？】', { color: GRAY, size: 16 });
          S.actor('s6-q3-r', 5.5, 2.6, '$-\\dfrac{1}{3}$', { color: COOL, size: 16 });

          S.actor('s6-q4', -4, 1.0,
            '④ 纸厚 $0.1$ 毫米，对折 $10$ 次后厚多少毫米？',
            { color: COOL, size: 15 });
          S.actor('s6-q4-blank', 6, 0.0, '（用乘方表示并计算）', { color: GRAY, size: 12 });

          S.actor('s6-q5', -4, -1.0, '⑤ $96000000 =$', { color: COOL, size: 16 });
          S.actor('s6-q5-blank', 4, -1.0, '【？】', { color: GRAY, size: 16 });

          // 计分板（五格空白）
          S.addSegment('s6-sep-score', [-10, -2.2], [10, -2.2], { color: GRAY, width: 1, dash: 2 });
          S.actor('s6-score-label', -8, -3.2, '计分板（每题20分）：', { color: INK, size: 13 });
          var scoreX = [-5, -2.5, 0, 2.5, 5];
          for (var i = 0; i < 5; i++) {
            S.addSegment('s6-sc-t' + i, [scoreX[i] - 1.0, -3.0], [scoreX[i] + 1.0, -3.0],
              { color: GRAY, width: 2, dash: 0 });
            S.addSegment('s6-sc-b' + i, [scoreX[i] - 1.0, -4.2], [scoreX[i] + 1.0, -4.2],
              { color: GRAY, width: 2, dash: 0 });
            S.addSegment('s6-sc-l' + i, [scoreX[i] - 1.0, -3.0], [scoreX[i] - 1.0, -4.2],
              { color: GRAY, width: 2, dash: 0 });
            S.addSegment('s6-sc-r' + i, [scoreX[i] + 1.0, -3.0], [scoreX[i] + 1.0, -4.2],
              { color: GRAY, width: 2, dash: 0 });
            S.actor('s6-sc-n' + i, scoreX[i], -3.6, '' + (i + 1), { color: GRAY, size: 14 });
          }
          S.actor('s6-timer', 0, -6.0, '4分钟倒计时开始……', { color: WARM, size: 15 });

          P.renderCard(
            '<b>出口测试（限时4分钟）</b><br>' +
            '①$|-5|+(-3)$  ②$(-1)^{2026}-(-1)^{2025}$<br>' +
            '③$-0.5$ 与 $-\\dfrac{1}{3}$ 比大小<br>' +
            '④纸厚 $0.1$ 毫米对折10次  ⑤$96000000$ 科学记数法<br>' +
            '每题20分，独立作答，满分100分！'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤2：逐题揭晓
        narration: '停笔，对答案！题①：|-5|=5，5+(-3)=2，答案2。题②：(-1)^2026=1（2026是偶数），(-1)^2025=-1（2025是奇数），1-(-1)=1+1=2，答案2。题③：-0.5=-3/6，-1/3=-2/6，-3/6<-2/6，所以-0.5<-1/3。题④：每次对折厚度加倍，对折10次=0.1×2^10=0.1×1024=102.4毫米。题⑤：96000000=9.6×10^7。在计分板上标出自己得了几格！',
        enter: function (anim) {
          // 清上一步题目和计分板
          S.remove('s6-title'); S.remove('s6-inst');
          S.remove('s6-q1'); S.remove('s6-q1-blank');
          S.remove('s6-q2'); S.remove('s6-q2-blank');
          S.remove('s6-q3'); S.remove('s6-q3-mid'); S.remove('s6-q3-r');
          S.remove('s6-q4'); S.remove('s6-q4-blank');
          S.remove('s6-q5'); S.remove('s6-q5-blank');
          S.remove('s6-sep-score'); S.remove('s6-score-label');
          S.remove('s6-timer');
          for (var i = 0; i < 5; i++) {
            S.remove('s6-sc-t' + i); S.remove('s6-sc-b' + i);
            S.remove('s6-sc-l' + i); S.remove('s6-sc-r' + i);
            S.remove('s6-sc-n' + i);
          }

          S.actor('s6-ans-title', 0, 7.4, '对答案！', { color: RED, size: 20, bold: true });

          // 五题答案
          S.actor('s6-a1-q', -6, 6.2, '①', { color: INK, size: 15 });
          S.actor('s6-a1-process', -2, 6.2, '$|-5|+(-3)=5+(-3)$', { color: COOL, size: 15 });
          S.actor('s6-a1-ans', 6, 6.2, '$=2$', { color: GREEN, size: 16, bold: true });

          S.actor('s6-a2-q', -6, 5.0, '②', { color: INK, size: 15 });
          S.actor('s6-a2-process', -1, 5.0,
            '$(-1)^{2026}=1,\\ (-1)^{2025}=-1$',
            { color: COOL, size: 14 });
          S.actor('s6-a2-ans', 6, 5.0, '$1-(-1)=2$', { color: GREEN, size: 15, bold: true });

          S.actor('s6-a3-q', -6, 3.8, '③', { color: INK, size: 15 });
          S.actor('s6-a3-process', -1, 3.8,
            '$-0.5=-\\dfrac{3}{6},\\ -\\dfrac{1}{3}=-\\dfrac{2}{6}$',
            { color: COOL, size: 14 });
          S.actor('s6-a3-ans', 6, 3.8,
            '$-0.5 \\lt -\\dfrac{1}{3}$',
            { color: GREEN, size: 15, bold: true });

          S.actor('s6-a4-q', -6, 2.4, '④', { color: INK, size: 15 });
          S.actor('s6-a4-process', -1, 2.4,
            '$0.1 \\times 2^{10} = 0.1 \\times 1024$',
            { color: COOL, size: 14 });
          S.actor('s6-a4-ans', 6, 2.4, '$=102.4$ 毫米', { color: GREEN, size: 15, bold: true });

          S.actor('s6-a5-q', -6, 1.0, '⑤', { color: INK, size: 15 });
          S.actor('s6-a5-process', -2, 1.0, '$96000000$', { color: COOL, size: 15 });
          S.actor('s6-a5-ans', 5, 1.0, '$= 9.6 \\times 10^{7}$', { color: GREEN, size: 16, bold: true });

          // 计分
          S.addSegment('s6-sc-sep', [-10, -0.3], [10, -0.3], { color: GRAY, width: 1, dash: 2 });
          S.actor('s6-sc2-label', -8, -1.3, '计分板（各打 ✓）：', { color: INK, size: 13 });
          var sx = [-5, -2.5, 0, 2.5, 5];
          for (var j = 0; j < 5; j++) {
            S.addSegment('s6-sc2-t' + j, [sx[j] - 1.0, -1.1], [sx[j] + 1.0, -1.1],
              { color: GREEN, width: 2, dash: 0 });
            S.addSegment('s6-sc2-b' + j, [sx[j] - 1.0, -2.3], [sx[j] + 1.0, -2.3],
              { color: GREEN, width: 2, dash: 0 });
            S.addSegment('s6-sc2-l' + j, [sx[j] - 1.0, -1.1], [sx[j] - 1.0, -2.3],
              { color: GREEN, width: 2, dash: 0 });
            S.addSegment('s6-sc2-r' + j, [sx[j] + 1.0, -1.1], [sx[j] + 1.0, -2.3],
              { color: GREEN, width: 2, dash: 0 });
            S.actor('s6-sc2-n' + j, sx[j], -1.7, '第' + (j + 1) + '题', { color: GREEN, size: 12 });
          }
          S.actor('s6-score-hint', 0, -3.3, '4-5题达标；5题为优秀！', { color: TEAL, size: 14 });

          P.renderTable({
            head: ['题号', '标准答案', '考查知识点'],
            rows: [
              ['①', '$2$', '绝对值计算 + 加法'],
              ['②', '$2$', '乘方奇偶规律（$(-1)^n$）'],
              ['③', '$-0.5 \\lt -\\dfrac{1}{3}$', '负数大小比较（通分）'],
              ['④', '$102.4$ 毫米', '乘方的实际应用'],
              ['⑤', '$9.6 \\times 10^{7}$', '科学记数法'],
            ],
          });
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤3：收官寄语 + 下一章预告
        narration: '恭喜大家完成第一章《有理数》全部复习！这一章我们让"数"能正能负，会加减乘除乘方，能大能小，还能写成科学记数法。这是从小学数学迈入中学数学的关键一步——数能正能负了，运算才能双向进行。下一章，字母要登场代替数了——一个字母可以代表所有数，数学的表达能力要再上一个台阶。第二章，整式的加减，我们见！',
        enter: function (anim) {
          // 清上一步元素
          S.remove('s6-ans-title');
          S.remove('s6-a1-q'); S.remove('s6-a1-process'); S.remove('s6-a1-ans');
          S.remove('s6-a2-q'); S.remove('s6-a2-process'); S.remove('s6-a2-ans');
          S.remove('s6-a3-q'); S.remove('s6-a3-process'); S.remove('s6-a3-ans');
          S.remove('s6-a4-q'); S.remove('s6-a4-process'); S.remove('s6-a4-ans');
          S.remove('s6-a5-q'); S.remove('s6-a5-process'); S.remove('s6-a5-ans');
          S.remove('s6-sc-sep'); S.remove('s6-sc2-label'); S.remove('s6-score-hint');
          for (var j = 0; j < 5; j++) {
            S.remove('s6-sc2-t' + j); S.remove('s6-sc2-b' + j);
            S.remove('s6-sc2-l' + j); S.remove('s6-sc2-r' + j);
            S.remove('s6-sc2-n' + j);
          }

          // 收官标题
          S.actor('s6-fin-title', 0, 7.2, '第一章《有理数》收官！', { color: TEAL, size: 22, bold: true });

          // 三大成就
          S.actor('s6-ach-1', 0, 5.8,
            '数能正能负——负数的世界打开了！',
            { color: COOL, size: 16 });
          S.actor('s6-ach-2', 0, 4.6,
            '运算双向进行——加减乘除乘方全通了！',
            { color: WARM, size: 16 });
          S.actor('s6-ach-3', 0, 3.4,
            '科学记数法——能表达宇宙尺度的数了！',
            { color: GREEN, size: 16 });

          // 分割线
          S.addSegment('s6-fin-sep', [-10, 2.4], [10, 2.4], { color: TEAL, width: 2, dash: 2 });

          // 下一章预告
          S.actor('s6-next-title', 0, 1.6, '下一章预告：', { color: INK, size: 15, bold: true });
          S.actor('s6-next-content', 0, 0.4,
            '字母登场，代替数！一个字母代表所有数……',
            { color: ORANGE, size: 16 });
          S.actor('s6-next-name', 0, -0.8,
            '第二章《整式的加减》',
            { color: ORANGE, size: 18, bold: true });
          S.actor('s6-next-hook', 0, -2.2,
            '"数能正能负了，下一章字母登场代表数"',
            { color: GRAY, size: 14 });

          // 收官寄语
          S.actor('s6-bye', 0, -4.5,
            '第二章见！',
            { color: TEAL, size: 24, bold: true });

          P.renderCard(
            '<b>第一章《有理数》全章收官！</b><br>' +
            '从小学的"只有正数"，到中学的"正负都有"——这是数学思维的一次飞跃。<br>' +
            '下一章：字母登场代替数，数学的表达力再上一个台阶。<br>' +
            '<b>第二章《整式的加减》，我们见！</b>',
            'teal',
            'tada'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
