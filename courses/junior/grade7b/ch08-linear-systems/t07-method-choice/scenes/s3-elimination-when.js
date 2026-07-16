// s3-elimination-when.js  什么时候用加减法（3步）
// 例题：{ 3x+5y=21, 3x-y=3 }
// 验算：①-② → 6y=18 → y=3；代回②: 3x-3=3 → 3x=6 → x=2
// 代入验证：3*2+5*3=6+15=21 ✓；3*2-3=6-3=3 ✓
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
    id: 's3',
    title: '三、什么时候选加减法',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：信号识别——同一未知数系数相同/相反/成倍数
        narration: '上一环节我们学了代入法的信号，现在来看加减法的出场信号。加减法的核心是"让某个未知数的系数变成相同或相反，然后相减或相加就能消去"。所以加减法的信号是：某个未知数在两个方程里的系数相同、相反，或者一个是另一个的整数倍。遇到这种情况，加减法比代入法更直接！',
        enter: function (anim) {
          // 标题
          S.addPolygon('bg-signal',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, 5.2], [-9.5, 5.2]],
            { fillColor: '#e8f5e9', fillOpacity: 0.85, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('signal-title', 0, 7.0, '加减法的"出场信号"', { size: 20, color: GREEN, anchorX: 'middle' });
          S.addText('signal-text', 0, 5.7,
            '某个未知数系数相同、相反或成整数倍——相加/减即可消去！',
            { size: 15, color: GREEN, anchorX: 'middle' });

          // 三种子情形
          S.addPolygon('bg-c1',
            [[-9.5, 4.8], [-3.5, 4.8], [-3.5, 1.2], [-9.5, 1.2]],
            { fillColor: '#e3f2fd', fillOpacity: 0.8, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('c1-title', -6.5, 4.4, '情形①：系数相反', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('c1-eq1', -6.5, 3.3, '$3x + 5y = 21$', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('c1-eq2', -6.5, 2.2, '$3x - y = 3$', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('c1-hint', -6.5, 1.5, 'x 系数同为 3，相减消 x', { size: 13, color: BLUE, anchorX: 'middle' });

          S.addPolygon('bg-c2',
            [[-3.2, 4.8], [3.2, 4.8], [3.2, 1.2], [-3.2, 1.2]],
            { fillColor: '#e8f5e9', fillOpacity: 0.8, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('c2-title', 0, 4.4, '情形②：系数相反', { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('c2-eq1', 0, 3.3, '$2x + 3y = 8$', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('c2-eq2', 0, 2.2, '$2x - 3y = 0$', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('c2-hint', 0, 1.5, 'y 系数 +3/-3 相反，相加消 y', { size: 13, color: GREEN, anchorX: 'middle' });

          S.addPolygon('bg-c3',
            [[3.5, 4.8], [9.5, 4.8], [9.5, 1.2], [3.5, 1.2]],
            { fillColor: '#f3e5f5', fillOpacity: 0.8, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('c3-title', 6.5, 4.4, '情形③：系数成倍数', { size: 14, color: PURPLE, anchorX: 'middle' });
          S.addText('c3-eq1', 6.5, 3.3, '$4x + y = 10$', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('c3-eq2', 6.5, 2.2, '$2x + y = 6$', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('c3-hint', 6.5, 1.5, '4x 是 2x 的 2 倍，乘 2 再减', { size: 13, color: PURPLE, anchorX: 'middle' });

          // 判断练习
          S.addPolygon('bg-think',
            [[-9.5, 0.7], [9.5, 0.7], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.8, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('think-title', 0, 0.2, '三种情形，加减法都比代入法更快！', { size: 16, color: ORANGE, anchorX: 'middle' });
          S.addText('think-sub', 0, -1.0,
            '看到系数"成对"就想加减法；看到系数孤零零的 1 就想代入法。',
            { size: 14, color: INK, anchorX: 'middle' });

          P.renderCard(
            '<b>加减法出场信号</b><br><br>' +
            '某未知数在两方程中的系数满足：<br>' +
            '① 完全<b>相同</b>（相减消去）<br>' +
            '② 互为<b>相反数</b>（相加消去）<br>' +
            '③ 成<b>整数倍</b>（乘倍数后相加/减）<br><br>' +
            '遇到这三种信号，优先选加减法！'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：例题求解 { 3x+5y=21, 3x-y=3 }
        narration: '我们来用含信号的方程组示范完整的加减法步骤。看这道题：第①式 $3x + 5y = 21$，第②式 $3x - y = 3$。观察 x 的系数——两个方程 x 系数都是 3，完全相同！所以用①减去②，x 就被消去了！',
        enter: function (anim) {
          // 清除信号区图形
          S.remove('bg-signal'); S.remove('signal-title'); S.remove('signal-text');
          S.remove('bg-c1'); S.remove('c1-title'); S.remove('c1-eq1'); S.remove('c1-eq2'); S.remove('c1-hint');
          S.remove('bg-c2'); S.remove('c2-title'); S.remove('c2-eq1'); S.remove('c2-eq2'); S.remove('c2-hint');
          S.remove('bg-c3'); S.remove('c3-title'); S.remove('c3-eq1'); S.remove('c3-eq2'); S.remove('c3-hint');
          S.remove('bg-think'); S.remove('think-title'); S.remove('think-sub');

          // 例题标题
          S.addPolygon('bg-eg',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.6, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('eg-title', 0, 7.0, '用加减法解方程组', { size: 18, color: GREEN, anchorX: 'middle' });

          // 方程组
          S.addText('eq-1', -3.5, 5.7, '①  $3x + 5y = 21$', { size: 18, color: BLUE });
          S.addText('eq-2', -3.5, 4.3, '②  $3x - y = 3$', { size: 18, color: INK });
          S.addPolygon('brace',
            [[-4.0, 6.2], [-4.0, 3.8], [-3.7, 3.8], [-3.7, 6.2]],
            { fillColor: INK, fillOpacity: 1, strokeColor: INK, strokeWidth: 1 });

          // 信号标注
          S.addText('signal-mark', 5.5, 5.7,
            '← x 系数同为 3',
            { size: 14, color: ORANGE });
          S.addText('signal-mark2', 5.5, 4.3,
            '← x 系数同为 3',
            { size: 14, color: ORANGE });

          // 解题步骤
          S.addText('step-label', -8.5, 2.8, '解：', { size: 16, color: INK });
          S.addText('step1', -3.5, 2.8,
            '①－②：$(3x + 5y) - (3x - y) = 21 - 3$',
            { size: 16, color: INK });
          S.addText('step2', -3.5, 1.5,
            '$6y = 18$',
            { size: 18, color: GREEN });
          S.addText('step3', -3.5, 0.2,
            '$y = 3$',
            { size: 20, color: GREEN });
          S.addText('step4', -3.5, -1.1,
            '将 $y = 3$ 代入②：$3x - 3 = 3$',
            { size: 16, color: INK });
          S.addText('step5', -3.5, -2.4,
            '$3x = 6 \\Rightarrow x = 2$',
            { size: 18, color: GREEN });
          S.addText('step6', -3.5, -3.7,
            '所以 $x = 2$，$y = 3$',
            { size: 18, color: GREEN });

          P.renderCard(
            '<b>例题：加减法</b><br><br>' +
            '$\\begin{cases} 3x + 5y = 21 & \\cdots\\text{①} \\\\ 3x - y = 3 & \\cdots\\text{②} \\end{cases}$<br><br>' +
            'x 系数同为 3 → 优先加减法<br>' +
            '①－②：$6y = 18 \\Rightarrow y = 3$<br>' +
            '代入②：$3x - 3 = 3 \\Rightarrow x = 2$'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：检验 + 决策要点卡
        narration: '验证一下！把 $x = 2, y = 3$ 代回①式：$3 \\times 2 + 5 \\times 3 = 6 + 15 = 21$，正确！代回②式：$3 \\times 2 - 3 = 6 - 3 = 3$，也完全正确！加减法决策要点：看到某个未知数在两方程中系数相同、相反或成整数倍，就果断用加减法，往往两三步就消掉了！',
        enter: function (anim) {
          // 检验结果
          S.addPolygon('bg-check',
            [[-9.5, -4.5], [9.5, -4.5], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('check-t1', 0, -5.0,
            '检验①：$3 \\times 2 + 5 \\times 3 = 6 + 15 = 21$ ✓',
            { size: 16, color: INK, anchorX: 'middle' });
          S.addText('check-t2', 0, -6.2,
            '检验②：$3 \\times 2 - 3 = 6 - 3 = 3$ ✓',
            { size: 16, color: INK, anchorX: 'middle' });

          // 决策要点卡
          S.addPolygon('bg-key',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, 5.5], [-9.5, 5.5]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: ORANGE, strokeWidth: 3 });
          S.addText('key-title', 0, 7.0, '加减法决策要点', { size: 20, color: ORANGE, anchorX: 'middle' });
          S.addText('key-text', 0, 5.8,
            '见系数相同/相反/成倍数 → 果断加减法！',
            { size: 16, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>检验</b>（代回原方程组）<br>' +
            '代入①：$3 \\times 2 + 5 \\times 3 = 6 + 15 = 21$ ✓<br>' +
            '代入②：$3 \\times 2 - 3 = 6 - 3 = 3$ ✓<br><br>' +
            '<b>加减法决策要点</b><br>' +
            '看到系数<b>相同/相反/成整数倍</b><br>' +
            '→ 直接加减（或乘倍数再加减）<br>' +
            '→ 消元步骤少，计算干净！',
            'card-key2',
            'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
