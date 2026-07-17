// s3-operations.js  三、运算关卡（4步）
// 数学验算：
// ① -20+3+5-7 = (-20-7)+(3+5) = -27+8 = -19
// ② (-2)^3×(-3)+|-6|÷(-2) = -8×(-3)+6÷(-2) = 24+(-3) = 21
// ③ -3^2+[1-(-2)^3]÷(-3) = -9+[1-(-8)]÷(-3) = -9+9÷(-3) = -9+(-3) = -12
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
    id: 's3',
    title: '三、运算关卡',
    bbox: [-11, 8, 11, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：金字塔 + 加减混合 -20+3+5-7=-19
        narration: '运算关卡开始！先看混合运算顺序金字塔：顶层乘方，中层乘除，底层加减——站得高的先做，括号最优先。题4：计算 -20+3+5-7。策略：用加法交换律和结合律，把负数聚在一起，正数聚在一起。-20-7=-27，3+5=8，-27+8=-19。',
        enter: function (anim) {
          // 金字塔
          S.actor('s3-pyr-title', 0, 7.2, '混合运算顺序金字塔', { color: INK, size: 18, bold: true });
          // 顶层：乘方
          S.addPolygon('s3-pyr-top', [[-2.5, 5.5], [2.5, 5.5], [0, 7.0]],
            { color: RED, opacity: 0.15, borderWidth: 0 });
          S.addSegment('s3-pyr-top-l', [-2.5, 5.5], [0, 7.0], { color: RED, width: 2, dash: 0 });
          S.addSegment('s3-pyr-top-r', [2.5, 5.5], [0, 7.0], { color: RED, width: 2, dash: 0 });
          S.addSegment('s3-pyr-top-b', [-2.5, 5.5], [2.5, 5.5], { color: RED, width: 2, dash: 0 });
          S.actor('s3-pyr-top-lab', 0, 6.3, '乘方（最先）', { color: RED, size: 14, bold: true });
          // 中层：乘除
          S.addPolygon('s3-pyr-mid', [[-4.5, 3.5], [4.5, 3.5], [2.5, 5.5], [-2.5, 5.5]],
            { color: WARM, opacity: 0.12, borderWidth: 0 });
          S.addSegment('s3-pyr-mid-l', [-4.5, 3.5], [-2.5, 5.5], { color: WARM, width: 2, dash: 0 });
          S.addSegment('s3-pyr-mid-r', [4.5, 3.5], [2.5, 5.5], { color: WARM, width: 2, dash: 0 });
          S.addSegment('s3-pyr-mid-b', [-4.5, 3.5], [4.5, 3.5], { color: WARM, width: 2, dash: 0 });
          S.actor('s3-pyr-mid-lab', 0, 4.5, '乘除（其次）', { color: WARM, size: 14, bold: true });
          // 底层：加减
          S.addPolygon('s3-pyr-bot', [[-7, 1.5], [7, 1.5], [4.5, 3.5], [-4.5, 3.5]],
            { color: COOL, opacity: 0.10, borderWidth: 0 });
          S.addSegment('s3-pyr-bot-l', [-7, 1.5], [-4.5, 3.5], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s3-pyr-bot-r', [7, 1.5], [4.5, 3.5], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s3-pyr-bot-b', [-7, 1.5], [7, 1.5], { color: COOL, width: 2, dash: 0 });
          S.actor('s3-pyr-bot-lab', 0, 2.5, '加减（最后）', { color: COOL, size: 14, bold: true });

          // 计算题4
          S.addSegment('s3-sep1', [-10, 1.0], [10, 1.0], { color: GRAY, width: 1, dash: 2 });
          S.actor('s3-q4-title', 0, 0.2, '题4（加减混合）', { color: INK, size: 15, bold: true });
          S.actor('s3-q4-q', 0, -0.8, '$-20+3+5-7$', { color: INK, size: 20 });
          // 步骤
          S.actor('s3-q4-s1', -3, -2.2, '$= (-20-7)+(3+5)$', { color: COOL, size: 17 });
          S.actor('s3-q4-s2', 5, -3.3, '同号集中', { color: GRAY, size: 13 });
          S.actor('s3-q4-s3', -2, -3.8, '$= -27+8$', { color: WARM, size: 17 });
          S.actor('s3-q4-s4', -2, -5.2, '$= -19$', { color: RED, size: 22, bold: true });

          P.renderCard(
            '<b>金字塔口诀</b>：站得高先算！乘方 > 乘除 > 加减；括号最优先。<br>' +
            '<b>题4</b>：$-20+3+5-7$<br>' +
            '$= (-20-7)+(3+5) = -27+8 = $<b>$-19$</b><br>' +
            '技巧：同号集中相加，正负分开再合并'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤2：含乘方 (-2)^3×(-3)+|-6|÷(-2)=21
        narration: '题5：含乘方的混合运算，计算 (-2)^3×(-3)+|-6|÷(-2)。按金字塔规则：第一步先算乘方，(-2)^3=-8；第二步化简绝对值，|-6|=6；第三步做乘除，-8×(-3)=24，6÷(-2)=-3；第四步做加法，24+(-3)=21。注意乘方和绝对值都要最先处理！',
        enter: function (anim) {
          // 清除上一步元素
          S.remove('s3-pyr-title'); S.remove('s3-pyr-top'); S.remove('s3-pyr-top-l');
          S.remove('s3-pyr-top-r'); S.remove('s3-pyr-top-b'); S.remove('s3-pyr-top-lab');
          S.remove('s3-pyr-mid'); S.remove('s3-pyr-mid-l'); S.remove('s3-pyr-mid-r');
          S.remove('s3-pyr-mid-b'); S.remove('s3-pyr-mid-lab');
          S.remove('s3-pyr-bot'); S.remove('s3-pyr-bot-l'); S.remove('s3-pyr-bot-r');
          S.remove('s3-pyr-bot-b'); S.remove('s3-pyr-bot-lab');
          S.remove('s3-sep1');
          S.remove('s3-q4-title'); S.remove('s3-q4-q');
          S.remove('s3-q4-s1'); S.remove('s3-q4-s2'); S.remove('s3-q4-s3'); S.remove('s3-q4-s4');

          S.actor('s3-q5-title', 0, 7.2, '题5：含乘方的混合运算', { color: INK, size: 18, bold: true });
          S.actor('s3-q5-q', 0, 6.0,
            '$(-2)^{3} \\times (-3) + |-6| \\div (-2)$',
            { color: INK, size: 19 });

          // 步骤1：乘方
          S.actor('s3-q5-lbl1', -7, 4.5, '第①步\n先乘方\n化绝对值', { color: RED, size: 13 });
          S.actor('s3-q5-s1', 2, 4.5,
            '$(-2)^{3} = -8,\\quad |-6| = 6$',
            { color: RED, size: 17 });

          // 步骤2：代入后
          S.actor('s3-q5-lbl2', -7, 3.0, '第②步\n乘除', { color: WARM, size: 13 });
          S.actor('s3-q5-s2', 1, 3.0,
            '$= (-8) \\times (-3) + 6 \\div (-2)$',
            { color: WARM, size: 17 });

          // 步骤3：乘除
          S.actor('s3-q5-lbl3', -7, 1.5, '第③步\n分别算', { color: WARM, size: 13 });
          S.actor('s3-q5-s3', 1, 1.5, '$= 24 + (-3)$', { color: WARM, size: 17 });

          // 步骤4：加法
          S.actor('s3-q5-lbl4', -7, 0.0, '第④步\n加法', { color: COOL, size: 13 });
          S.actor('s3-q5-s4', 1, 0.0, '$= 21$', { color: RED, size: 24, bold: true });

          // 易错点提示
          S.addSegment('s3-q5-sep', [-10, -1.2], [10, -1.2], { color: GRAY, width: 1, dash: 2 });
          S.actor('s3-q5-warn1', 0, -2.2, '⚠ 易错点：乘方和绝对值都要最先处理！', { color: ORANGE, size: 14 });
          S.actor('s3-q5-warn2', 0, -3.4, '绝对值符号内的表达式先化简，再参与外部运算', { color: ORANGE, size: 13 });

          P.renderCard(
            '<b>题5</b>：$(-2)^{3} \\times (-3) + |-6| \\div (-2)$<br>' +
            '①先：$(-2)^{3}=-8$，$|-6|=6$<br>' +
            '②代：$(-8) \\times (-3) + 6 \\div (-2)$<br>' +
            '③乘除：$24 + (-3)$<br>' +
            '④加减：$= $<b>$21$</b>'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤3：-3^2+[1-(-2)^3]÷(-3)=-12（两处标红易错）
        narration: '题6：最综合的一题，-3^2+[1-(-2)^3]÷(-3)。两处易错要标红：第一处，-3^2 负号不在括号内，乘方只作用于 3，结果是 -9，不是 9！第二处，中括号内先算 (-2)^3=-8，再算 1-(-8)=9。全部流程：-9+9÷(-3)=-9+(-3)=-12。',
        enter: function (anim) {
          // 清上一步
          S.remove('s3-q5-title'); S.remove('s3-q5-q');
          S.remove('s3-q5-lbl1'); S.remove('s3-q5-s1');
          S.remove('s3-q5-lbl2'); S.remove('s3-q5-s2');
          S.remove('s3-q5-lbl3'); S.remove('s3-q5-s3');
          S.remove('s3-q5-lbl4'); S.remove('s3-q5-s4');
          S.remove('s3-q5-sep'); S.remove('s3-q5-warn1'); S.remove('s3-q5-warn2');

          S.actor('s3-q6-title', 0, 7.2, '题6：综合最难一题', { color: INK, size: 18, bold: true });
          S.actor('s3-q6-q', 0, 6.0,
            '$-3^{2} + [1-(-2)^{3}] \\div (-3)$',
            { color: INK, size: 19 });

          // 易错1：-3^2 标红
          S.actor('s3-q6-warn1', -5, 4.5, '易错①：', { color: RED, size: 15, bold: true });
          S.actor('s3-q6-w1a', 2, 4.5, '$-3^{2} = -(3 \\times 3) = $<b>$-9$</b>', { color: RED, size: 17 });
          S.actor('s3-q6-w1b', 0, 3.4, '负号在括号<b>外</b>，乘方只作用于 3！', { color: RED, size: 14 });

          // 易错2：中括号内 (-2)^3 标红
          S.actor('s3-q6-warn2', -5, 2.2, '易错②：', { color: WARM, size: 15, bold: true });
          S.actor('s3-q6-w2a', 2, 2.2, '$(-2)^{3} = -8$', { color: WARM, size: 17 });
          S.actor('s3-q6-w2b', 0, 1.2, '括号内先算乘方，再做减法', { color: WARM, size: 14 });

          // 完整推演
          S.addSegment('s3-q6-sep', [-10, 0.3], [10, 0.3], { color: GRAY, width: 1, dash: 2 });
          S.actor('s3-q6-s1', -1, -0.6, '$= -9 + [1 - (-8)] \\div (-3)$', { color: COOL, size: 16 });
          S.actor('s3-q6-s2', -1, -1.8, '$= -9 + [1 + 8] \\div (-3)$', { color: COOL, size: 16 });
          S.actor('s3-q6-s3', -1, -3.0, '$= -9 + 9 \\div (-3)$', { color: COOL, size: 16 });
          S.actor('s3-q6-s4', -1, -4.2, '$= -9 + (-3)$', { color: WARM, size: 17 });
          S.actor('s3-q6-ans', -1, -5.6, '$= -12$', { color: RED, size: 24, bold: true });

          P.renderCard(
            '<b>题6</b>：$-3^{2} + [1-(-2)^{3}] \\div (-3)$<br>' +
            '<span style="color:' + RED + '">①</span> $-3^{2} = -9$（不是 $+9$，负号在外！）<br>' +
            '<span style="color:' + WARM + '">②</span> 括号内 $(-2)^{3}=-8$ 先算<br>' +
            '$= -9 + 9 \\div (-3) = -9 + (-3) = $<b>$-12$</b>'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤4：三题回顾表
        narration: '三道运算题全部完成！用一张表格做关卡小结：题4加减混合答案-19、题5含乘方答案21、题6综合嵌套答案-12。核心要点：乘方最先，绝对值先化简，括号层层剥开，最后加减。牢记金字塔口诀：站得高先算！',
        enter: function (anim) {
          // 清上一步
          S.remove('s3-q6-title'); S.remove('s3-q6-q');
          S.remove('s3-q6-warn1'); S.remove('s3-q6-w1a'); S.remove('s3-q6-w1b');
          S.remove('s3-q6-warn2'); S.remove('s3-q6-w2a'); S.remove('s3-q6-w2b');
          S.remove('s3-q6-sep');
          S.remove('s3-q6-s1'); S.remove('s3-q6-s2'); S.remove('s3-q6-s3');
          S.remove('s3-q6-s4'); S.remove('s3-q6-ans');

          P.renderTable({
            head: ['题号', '题目', '关键步骤', '答案'],
            rows: [
              ['题4', '$-20+3+5-7$', '同号集中：$(-20-7)+(3+5)$', '$-19$'],
              ['题5', '$(-2)^{3}\\times(-3)+|-6|\\div(-2)$', '先乘方：$(-8)\\times(-3)+6\\div(-2)$', '$21$'],
              ['题6', '$-3^{2}+[1-(-2)^{3}]\\div(-3)$', '两处易错：$-3^2=-9$；括号内先乘方', '$-12$'],
            ],
          });
          P.renderCard(
            '<b>运算关卡小结</b><br>' +
            '乘方 > 乘除 > 加减；括号最优先<br>' +
            '$-3^2$ 的底数是 $3$，结果为 $-9$<br>' +
            '绝对值先化简，括号层层由内到外'
          );
          return anim ? delay(300) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
