// s2-substitution-when.js  什么时候用代入法（3步）
// 例题：{ y=3x-1, 5x+2y=20 }
// 验算：5x + 2(3x-1) = 20 → 5x+6x-2=20 → 11x=22 → x=2, y=3*2-1=5
// 代入验证：5*2+2*5=10+10=20 ✓，y=3*2-1=5 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var CYAN   = '#00838f';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、什么时候选代入法',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：信号识别——系数为1或-1时优先代入法
        narration: '好，现在我们来讨论：什么情况下应该优先选代入法？代入法的第一步是"变形"——用一个未知数的表达式表示另一个。如果某个未知数的系数是 1 或 -1，变形就非常简洁，不会出现分数，所以这时代入法最顺手。请看识别信号。',
        enter: function (anim) {
          // 标题
          S.addPolygon('bg-signal',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, 4.5], [-9.5, 4.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.85, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('signal-title', 0, 7.0, '代入法的"出场信号"', { size: 20, color: BLUE, anchorX: 'middle' });
          S.addText('signal-text', 0, 5.5,
            '某个未知数的系数为 1 或 -1 ——变形不产生分数，直接代！',
            { size: 15, color: BLUE, anchorX: 'middle' });

          // 示例对比：含信号 vs 不含信号
          S.addPolygon('bg-yes',
            [[-9.5, 4.0], [-0.5, 4.0], [-0.5, -0.5], [-9.5, -0.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.85, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('yes-title', -5, 3.5, '含信号（适合代入法）', { size: 15, color: GREEN, anchorX: 'middle' });
          S.addText('yes-1', -5, 2.3, '$y = 3x - 1$', { size: 17, color: BLUE, anchorX: 'middle' });
          S.addText('yes-2', -5, 1.0, '$5x + 2y = 20$', { size: 17, color: INK, anchorX: 'middle' });
          S.addText('yes-hint', -5, -0.1,
            '→ y 的系数是 1，直接代！',
            { size: 14, color: GREEN, anchorX: 'middle' });

          S.addPolygon('bg-no',
            [[0.5, 4.0], [9.5, 4.0], [9.5, -0.5], [0.5, -0.5]],
            { fillColor: '#ffebee', fillOpacity: 0.85, strokeColor: RED, strokeWidth: 2 });
          S.addText('no-title', 5, 3.5, '无信号（慎用代入法）', { size: 15, color: RED, anchorX: 'middle' });
          S.addText('no-1', 5, 2.3, '$4x + 3y = 18$', { size: 17, color: INK, anchorX: 'middle' });
          S.addText('no-2', 5, 1.0, '$4x - y = 2$', { size: 17, color: INK, anchorX: 'middle' });
          S.addText('no-hint', 5, -0.1,
            '→ 变形会出现分数，麻烦！',
            { size: 14, color: RED, anchorX: 'middle' });

          // 判断练习区
          S.addPolygon('bg-more',
            [[-9.5, -1.0], [9.5, -1.0], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.8, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('more-title', 0, -1.5, '快判断：下面哪些方程组含"代入法信号"？', { size: 15, color: ORANGE, anchorX: 'middle' });
          S.addText('more-a', -5, -2.7, '(A) $x = 2y + 1$', { size: 16, color: INK, anchorX: 'middle' });
          S.addText('more-a2', -5, -3.7, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$3x - y = 9$', { size: 16, color: INK, anchorX: 'middle' });
          S.addText('more-b', 5, -2.7, '(B) $2x + 3y = 8$', { size: 16, color: INK, anchorX: 'middle' });
          S.addText('more-b2', 5, -3.7, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$2x - 5y = 0$', { size: 16, color: INK, anchorX: 'middle' });
          S.addText('more-c', 0, -5.2, '(C) $3x + 2y = 7$  /  $5x - 3y = 4$（同行显示）', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('more-think', 0, -6.5, '先想一想……', { size: 16, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>代入法出场信号</b><br><br>' +
            '某个未知数系数为 <b>1 或 -1</b>——<br>' +
            '变形直接得 $x = \\ldots$ 或 $y = \\ldots$，<br>' +
            '不产生分数，代入顺畅！<br><br>' +
            '<b>快判断</b>：(A)(B)(C) 中哪个有信号？'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：例题求解 { y=3x-1, 5x+2y=20 }
        narration: '答案揭晓：(A) 含信号——第一个方程就是 $x = 2y + 1$，x 系数为 1，直接代入。(B) 两个方程 x 系数都是 2，相减更顺，适合加减法。(C) 没有系数为 1 的，用加减法（乘倍数消元）。好，现在我们用 (A) 同类的题来示范代入法完整步骤。看这个方程组：第①式 $y = 3x - 1$，第②式 $5x + 2y = 20$。y 的系数正好是 1，完美的代入法信号！',
        enter: function (anim) {
          // 清除信号识别区图形
          S.remove('bg-signal'); S.remove('signal-title'); S.remove('signal-text');
          S.remove('bg-yes'); S.remove('yes-title'); S.remove('yes-1'); S.remove('yes-2'); S.remove('yes-hint');
          S.remove('bg-no'); S.remove('no-title'); S.remove('no-1'); S.remove('no-2'); S.remove('no-hint');
          S.remove('bg-more'); S.remove('more-title');
          S.remove('more-a'); S.remove('more-a2'); S.remove('more-b'); S.remove('more-b2');
          S.remove('more-c'); S.remove('more-think');

          // 揭示判断
          S.addPolygon('bg-ans',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, 5.5], [-9.5, 5.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('ans-text', 0, 6.5,
            '(A) 含信号 ✓    (B) 无信号 ✗    (C) 无信号 ✗',
            { size: 15, color: INK, anchorX: 'middle' });

          // 例题标题
          S.addPolygon('bg-eg',
            [[-9.5, 5.0], [9.5, 5.0], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.7, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('eg-title', 0, 4.5, '用代入法解方程组', { size: 18, color: BLUE, anchorX: 'middle' });

          // 方程组
          S.addText('eq-1', -3, 3.2, '①  $y = 3x - 1$', { size: 18, color: BLUE });
          S.addText('eq-2', -3, 2.0, '②  $5x + 2y = 20$', { size: 18, color: INK });
          S.addPolygon('brace',
            [[-3.5, 3.7], [-3.5, 1.5], [-3.2, 1.5], [-3.2, 3.7]],
            { fillColor: INK, fillOpacity: 1, strokeColor: INK, strokeWidth: 1 });

          // 信号标注
          S.addText('signal-mark', 5, 3.2,
            '← y 系数为 1，是信号！',
            { size: 14, color: ORANGE });

          // 步骤展示
          S.addText('step1-lbl', -7, 0.5, '解：', { size: 16, color: INK });
          S.addText('step1', -3, 0.5,
            '将①代入②：$5x + 2(3x - 1) = 20$',
            { size: 16, color: INK });
          S.addText('step2', -3, -0.8,
            '$5x + 6x - 2 = 20$',
            { size: 16, color: INK });
          S.addText('step3', -3, -2.1,
            '$11x = 22$',
            { size: 16, color: GREEN });
          S.addText('step4', -3, -3.4,
            '$x = 2$',
            { size: 18, color: GREEN });
          S.addText('step5', -3, -4.7,
            '代回①：$y = 3 \\times 2 - 1 = 5$',
            { size: 16, color: INK });
          S.addText('step6', -3, -5.8,
            '所以 $x = 2$，$y = 5$',
            { size: 17, color: GREEN });

          P.renderCard(
            '<b>例题：代入法</b><br><br>' +
            '$\\begin{cases} y = 3x - 1 & \\cdots\\text{①} \\\\ 5x + 2y = 20 & \\cdots\\text{②} \\end{cases}$<br><br>' +
            '①式 $y$ 系数为 1 → 优先代入法<br>' +
            '将①代入②：$5x + 2(3x-1) = 20$<br>' +
            '$11x = 22 \\Rightarrow x = 2$<br>' +
            '回代：$y = 3 \\times 2 - 1 = 5$'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：检验 + 决策要点卡
        narration: '我们来验证一下答案：把 $x = 2, y = 5$ 代回②式，$5 \\times 2 + 2 \\times 5 = 10 + 10 = 20$，完全正确！代入①式，$y = 3 \\times 2 - 1 = 5$，也对！方程组的解是 $x = 2, y = 5$。请记住这节课的代入法决策要点：只要看到某个未知数系数为 1 或 -1，就果断选代入法，变形又快又不出分数！',
        enter: function (anim) {
          // 验证区
          S.addPolygon('bg-check',
            [[-9.5, -6.5], [9.5, -6.5], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('check-title', 0, -6.2,
            '验证略（见面板）',
            { size: 13, color: GREEN, anchorX: 'middle' });

          // 决策要点卡（画板）
          S.addPolygon('bg-key',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, 5.0], [-9.5, 5.0]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: ORANGE, strokeWidth: 3 });
          S.addText('key-title', 0, 7.0, '代入法决策要点', { size: 20, color: ORANGE, anchorX: 'middle' });
          S.addText('key-1', 0, 5.8,
            '见到系数 1 或 -1 → 果断选代入法！',
            { size: 16, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>检验</b>（代回原方程组）<br>' +
            '代入①：$y = 3 \\times 2 - 1 = 5$ ✓<br>' +
            '代入②：$5 \\times 2 + 2 \\times 5 = 10 + 10 = 20$ ✓<br><br>' +
            '<b>代入法决策要点</b><br>' +
            '看到某个未知数系数为 <b>1 或 -1</b><br>' +
            '→ 直接变形，代入另一方程<br>' +
            '→ 不产生分数，步骤简洁！',
            'card-key',
            'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
