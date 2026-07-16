// s4-compare.js  同题双解对比（4步）★核心环节
// 例题：{ 2x+y=7, 3x-2y=0 }
// 代入法：由①得 y=7-2x，代入②: 3x-2(7-2x)=0 → 3x-14+4x=0 → 7x=14 → x=2, y=7-4=3
// 加减法：①×2: 4x+2y=14，②: 3x-2y=0，两式相加: 7x=14 → x=2，代入①: 4+y=7 → y=3
// 验证：代入①: 2*2+3=4+3=7 ✓；代入②: 3*2-2*3=6-6=0 ✓
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
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、同题双解：殊途同归',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：出示题目，左右分屏布局
        narration: '现在到了今天最精彩的环节——我们用同一道题，分别用代入法和加减法来解，最后对比两条路各自的步骤和难易程度。题目是：第①式 $2x + y = 7$，第②式 $3x - 2y = 0$。先观察一下：这道题有代入法的信号吗？有加减法的信号吗？先想一想再往下看！',
        enter: function (anim) {
          // 分割线
          S.addSegment('divider', [0, 7.5], [0, -7.5], { color: GOLD, width: 3, dash: 2 });

          // 左侧：代入法区域
          S.addPolygon('bg-left',
            [[-9.8, 7.5], [-0.2, 7.5], [-0.2, -7.5], [-9.8, -7.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.5, strokeColor: BLUE, strokeWidth: 1 });
          S.addText('left-title', -5, 7.0, '代入法', { size: 20, color: BLUE, anchorX: 'middle' });

          // 右侧：加减法区域
          S.addPolygon('bg-right',
            [[0.2, 7.5], [9.8, 7.5], [9.8, -7.5], [0.2, -7.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.5, strokeColor: GREEN, strokeWidth: 1 });
          S.addText('right-title', 5, 7.0, '加减法', { size: 20, color: GREEN, anchorX: 'middle' });

          // 题目居中展示（左右各显示）
          S.addText('eq-lbl-l', -5, 5.9, '题目：', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('eq1-l', -7, 4.8, '①  $2x + y = 7$', { size: 16, color: INK });
          S.addText('eq2-l', -7, 3.5, '②  $3x - 2y = 0$', { size: 16, color: INK });
          S.addPolygon('brace-l',
            [[-7.5, 5.3], [-7.5, 3.0], [-7.2, 3.0], [-7.2, 5.3]],
            { fillColor: INK, fillOpacity: 1, strokeColor: INK, strokeWidth: 1 });

          S.addText('eq-lbl-r', 5, 5.9, '题目：', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('eq1-r', 1.5, 4.8, '①  $2x + y = 7$', { size: 16, color: INK });
          S.addText('eq2-r', 1.5, 3.5, '②  $3x - 2y = 0$', { size: 16, color: INK });
          S.addPolygon('brace-r',
            [[1.0, 5.3], [1.0, 3.0], [1.3, 3.0], [1.3, 5.3]],
            { fillColor: INK, fillOpacity: 1, strokeColor: INK, strokeWidth: 1 });

          // 提问：哪种信号？
          S.addText('think-l', -5, 2.3,
            '① 中 y 的系数为 1',
            { size: 15, color: BLUE, anchorX: 'middle' });
          S.addText('think-l2', -5, 1.3,
            '→ 代入法信号！',
            { size: 15, color: ORANGE, anchorX: 'middle' });

          S.addText('think-r', 5, 2.3,
            '② y 系数是 -2，①×2 后 y 系数 2',
            { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('think-r2', 5, 1.3,
            '→ 乘倍数后相加消 y！',
            { size: 15, color: ORANGE, anchorX: 'middle' });

          // 提问区
          S.addPolygon('bg-ask',
            [[-9.5, 0.5], [9.5, 0.5], [9.5, -1.5], [-9.5, -1.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.9, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('ask-text', 0, -0.4,
            '两种方法都可以用！下面我们分两路同时来解，看谁更顺……',
            { size: 15, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>同题双解挑战</b><br><br>' +
            '$\\begin{cases} 2x + y = 7 & \\cdots\\text{①} \\\\ 3x - 2y = 0 & \\cdots\\text{②} \\end{cases}$<br><br>' +
            '代入法信号：① 中 $y$ 系数为 1<br>' +
            '加减法信号：$①\\times 2$ 后 $y$ 系数与②相反<br><br>' +
            '两种方法都能用——我们来比比！'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：左侧展示代入法完整步骤
        narration: '先看左边，代入法的步骤。第①式 $y$ 的系数是 1，变形非常方便：由①得 $y = 7 - 2x$，这是第一步变形。把它代入②：$3x - 2(7 - 2x) = 0$，展开得 $3x - 14 + 4x = 0$，即 $7x = 14$，所以 $x = 2$。再把 $x = 2$ 代回去：$y = 7 - 2 \\times 2 = 3$。代入法到这里就完成了。',
        enter: function (anim) {
          // 左侧代入法步骤
          S.addText('sub-step1', -9, 2.5, '由① $y = 7 - 2x$', { size: 15, color: BLUE });
          S.addText('sub-step2', -9, 1.3, '代入②：', { size: 15, color: INK });
          S.addText('sub-step3', -9, 0.2, '$3x - 2(7 - 2x) = 0$', { size: 15, color: INK });
          S.addText('sub-step4', -9, -0.9, '$3x - 14 + 4x = 0$', { size: 15, color: INK });
          S.addText('sub-step5', -9, -2.0, '$7x = 14$', { size: 16, color: BLUE });
          S.addText('sub-step6', -9, -3.1, '$x = 2$', { size: 18, color: BLUE });
          S.addText('sub-step7', -9, -4.2, '代回①：$y = 7 - 2 \\times 2 = 3$', { size: 15, color: INK });
          S.addText('sub-ans', -5, -5.5,
            '代入法解：$x = 2, y = 3$',
            { size: 16, color: BLUE, anchorX: 'middle' });

          // 步骤计数
          S.addPolygon('bg-cnt-l',
            [[-9.8, -6.5], [-0.2, -6.5], [-0.2, -7.5], [-9.8, -7.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 1 });
          S.addText('cnt-l', -5, -7.0,
            '代入法：变形+代入+整理+求解+回代 = 5步',
            { size: 13, color: BLUE, anchorX: 'middle' });

          P.renderCard(
            '<b>代入法步骤</b><br><br>' +
            '由① $y = 7 - 2x$<br>' +
            '代入②：$3x - 2(7-2x) = 0$<br>' +
            '$3x - 14 + 4x = 0$<br>' +
            '$7x = 14 \\Rightarrow x = 2$<br>' +
            '代回①：$y = 7 - 2 \\times 2 = 3$<br><br>' +
            '<b>结果</b>：$x = 2, y = 3$（共 5 步）'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：右侧展示加减法完整步骤
        narration: '再看右边，加减法的步骤。②中 $y$ 的系数是 $-2$，①中 $y$ 的系数是 $1$。用①×2，得 $4x + 2y = 14$；这样 $y$ 的系数变成 $+2$ 和 $-2$，恰好相反，两式相加，$y$ 就消去了！$7x = 14$，$x = 2$，代入①：$4 + y = 7$，$y = 3$。加减法也完成了，两条路得到完全一样的结果！',
        enter: function (anim) {
          // 右侧加减法步骤
          S.addText('elim-step1', 1.5, 2.5, '$① \\times 2$：$4x + 2y = 14$   ③', { size: 15, color: GREEN });
          S.addText('elim-step2', 1.5, 1.3, '③ $+$ ②：', { size: 15, color: INK });
          S.addText('elim-step3', 1.5, 0.2, '$(4x + 2y) + (3x - 2y) = 14 + 0$', { size: 14, color: INK });
          S.addText('elim-step4', 1.5, -0.9, '$7x = 14$', { size: 16, color: GREEN });
          S.addText('elim-step5', 1.5, -2.0, '$x = 2$', { size: 18, color: GREEN });
          S.addText('elim-step6', 1.5, -3.1, '代入①：$2 \\times 2 + y = 7$', { size: 15, color: INK });
          S.addText('elim-step7', 1.5, -4.2, '$y = 7 - 4 = 3$', { size: 15, color: INK });
          S.addText('elim-ans', 5, -5.5,
            '加减法解：$x = 2, y = 3$',
            { size: 16, color: GREEN, anchorX: 'middle' });

          // 步骤计数
          S.addPolygon('bg-cnt-r',
            [[0.2, -6.5], [9.8, -6.5], [9.8, -7.5], [0.2, -7.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 1 });
          S.addText('cnt-r', 5, -7.0,
            '加减法：乘倍+相加+求解+回代 = 4步',
            { size: 13, color: GREEN, anchorX: 'middle' });

          P.renderCard(
            '<b>加减法步骤</b><br><br>' +
            '$①\\times 2$：$4x + 2y = 14$（记为③）<br>' +
            '③$+$②：$(4x+2y)+(3x-2y) = 14$<br>' +
            '$7x = 14 \\Rightarrow x = 2$<br>' +
            '代入①：$4 + y = 7 \\Rightarrow y = 3$<br><br>' +
            '<b>结果</b>：$x = 2, y = 3$（共 4 步）<br><br>' +
            '殊途同归！两种方法答案完全一致 ✓'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤4：殊途同归 + 比较分析 + 检验
        narration: '两条路走完，答案完全一样：$x = 2, y = 3$！我们来验算：代入①，$2 \\times 2 + 3 = 4 + 3 = 7$ 对；代入②，$3 \\times 2 - 2 \\times 3 = 6 - 6 = 0$ 对！现在对比两种方法——本题 $y$ 系数为 1，代入法变形简单，用代入法更自然；加减法需要先乘倍数，多了一步。因此这道题优先代入法更顺手，但加减法也完全正确！',
        enter: function (anim) {
          // 清除步骤，展示对比总结
          S.remove('sub-step1'); S.remove('sub-step2'); S.remove('sub-step3');
          S.remove('sub-step4'); S.remove('sub-step5'); S.remove('sub-step6'); S.remove('sub-step7');
          S.remove('sub-ans'); S.remove('bg-cnt-l'); S.remove('cnt-l');
          S.remove('elim-step1'); S.remove('elim-step2'); S.remove('elim-step3');
          S.remove('elim-step4'); S.remove('elim-step5'); S.remove('elim-step6'); S.remove('elim-step7');
          S.remove('elim-ans'); S.remove('bg-cnt-r'); S.remove('cnt-r');
          S.remove('bg-ask'); S.remove('ask-text');
          S.remove('think-l'); S.remove('think-l2'); S.remove('think-r'); S.remove('think-r2');

          // 殊途同归标语
          S.addPolygon('bg-banner',
            [[-9.5, 2.8], [9.5, 2.8], [9.5, 0.8], [-9.5, 0.8]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 3 });
          S.addText('banner-text', 0, 2.0,
            '殊途同归！两种方法答案完全一致：$x = 2, y = 3$',
            { size: 17, color: GOLD, anchorX: 'middle' });

          // 对比表格区
          S.addPolygon('bg-cmp',
            [[-9.5, 0.3], [9.5, 0.3], [9.5, -4.5], [-9.5, -4.5]],
            { fillColor: '#f5f5f5', fillOpacity: 0.9, strokeColor: INK, strokeWidth: 2 });
          S.addText('cmp-title', 0, -0.3, '本题对比分析', { size: 17, color: INK, anchorX: 'middle' });
          S.addText('cmp-h1', -6, -1.2, '方法', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('cmp-h2', 0, -1.2, '步数', { size: 15, color: INK, anchorX: 'middle' });
          S.addText('cmp-h3', 6, -1.2, '难点', { size: 15, color: INK, anchorX: 'middle' });
          S.addSegment('cmp-line', [-9.5, -1.6], [9.5, -1.6], { color: INK, width: 1 });
          S.addText('cmp-r1a', -6, -2.3, '代入法', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('cmp-r1b', 0, -2.3, '5步', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('cmp-r1c', 6, -2.3, '展开括号', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addSegment('cmp-line2', [-9.5, -2.8], [9.5, -2.8], { color: INK, width: 1, dash: 2 });
          S.addText('cmp-r2a', -6, -3.5, '加减法', { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('cmp-r2b', 0, -3.5, '4步', { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('cmp-r2c', 6, -3.5, '先乘倍数', { size: 14, color: GREEN, anchorX: 'middle' });

          // 结论
          S.addPolygon('bg-concl',
            [[-9.5, -5.0], [9.5, -5.0], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('concl-t1', 0, -5.6,
            '本题 y 系数为 1 → 代入法更自然（无需乘倍数）',
            { size: 15, color: BLUE, anchorX: 'middle' });
          S.addText('concl-t2', 0, -6.8,
            '两种方法都正确，选"更顺"的那条路！',
            { size: 16, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>检验</b><br>' +
            '代入①：$2\\times 2+3=7$ ✓<br>' +
            '代入②：$3\\times 2-2\\times 3=0$ ✓<br><br>' +
            '<b>对比结论</b><br>' +
            '本题 $y$ 系数为 1，代入法变形简单，<br>' +
            '更自然、步骤少出错风险低。<br>' +
            '加减法也正确，只需多乘一步。<br><br>' +
            '核心认识：<b>两种方法没有对错之分，<br>' +
            '只有"更顺"和"稍绕"之别！</b>',
            'card-compare',
            'headShake'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
