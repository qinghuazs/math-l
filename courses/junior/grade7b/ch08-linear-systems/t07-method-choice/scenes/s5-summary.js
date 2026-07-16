// s5-summary.js  课堂小结（2步）
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
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：方法选择决策树 + 口诀
        narration: '好，最后来做一个完整的课堂小结。方法选择的核心是"看系数"。我们来把决策过程整理成一棵决策树，以后拿到任何一道方程组，都可以照这个流程来判断。读一遍口诀：见系数 1 想代入——见同倍数想加减——都不明显先乘再加减！把这三句话记住，选方法就不再迷茫了！',
        enter: function (anim) {
          // 顶部：问题
          S.addPolygon('bg-q',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, 5.8], [-9.5, 5.8]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: ORANGE, strokeWidth: 3 });
          S.addText('q-text', 0, 6.8,
            '拿到方程组，第一步：观察各未知数的系数！',
            { size: 17, color: ORANGE, anchorX: 'middle' });

          // 决策树层1：三个分支
          S.addPolygon('bg-b1',
            [[-9.5, 5.3], [-3.5, 5.3], [-3.5, 3.3], [-9.5, 3.3]],
            { fillColor: '#e3f2fd', fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('b1-title', -6.5, 4.8, '信号①', { size: 15, color: BLUE, anchorX: 'middle' });
          S.addText('b1-text', -6.5, 4.0, '某系数为 1 或 -1', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('b1-arrow', -6.5, 3.2, '→ 选代入法', { size: 14, color: BLUE, anchorX: 'middle' });

          S.addPolygon('bg-b2',
            [[-3.2, 5.3], [3.2, 5.3], [3.2, 3.3], [-3.2, 3.3]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('b2-title', 0, 4.8, '信号②', { size: 15, color: GREEN, anchorX: 'middle' });
          S.addText('b2-text', 0, 4.0, '某系数相同/相反', { size: 14, color: GREEN, anchorX: 'middle' });
          S.addText('b2-arrow', 0, 3.2, '→ 选加减法（直接）', { size: 14, color: GREEN, anchorX: 'middle' });

          S.addPolygon('bg-b3',
            [[3.5, 5.3], [9.5, 5.3], [9.5, 3.3], [3.5, 3.3]],
            { fillColor: '#f3e5f5', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('b3-title', 6.5, 4.8, '信号③', { size: 15, color: PURPLE, anchorX: 'middle' });
          S.addText('b3-text', 6.5, 4.0, '系数成整数倍', { size: 14, color: PURPLE, anchorX: 'middle' });
          S.addText('b3-arrow', 6.5, 3.2, '→ 选加减法（乘倍）', { size: 14, color: PURPLE, anchorX: 'middle' });

          // 连接线
          S.addSegment('arrow-1', [-6.5, 5.8], [-6.5, 5.3], { color: BLUE, width: 2 });
          S.addSegment('arrow-2', [0, 5.8], [0, 5.3], { color: GREEN, width: 2 });
          S.addSegment('arrow-3', [6.5, 5.8], [6.5, 5.3], { color: PURPLE, width: 2 });

          // 无明显信号时
          S.addPolygon('bg-none',
            [[-9.5, 2.8], [9.5, 2.8], [9.5, 1.5], [-9.5, 1.5]],
            { fillColor: '#ffebee', fillOpacity: 0.85, strokeColor: RED, strokeWidth: 2 });
          S.addText('none-text', 0, 2.2,
            '无明显信号？ → 选一个未知数，乘以适当倍数后用加减法（通用策略）',
            { size: 14, color: RED, anchorX: 'middle' });

          // 口诀框
          S.addPolygon('bg-slogan',
            [[-9.5, 1.0], [9.5, 1.0], [9.5, -1.5], [-9.5, -1.5]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 3 });
          S.addText('slogan-title', 0, 0.6, '选法口诀', { size: 18, color: GOLD, anchorX: 'middle' });
          S.addText('slogan-1', 0, -0.2,
            '见系数 1 想代入 · 见同倍数想加减 · 都不明显先乘再加减',
            { size: 16, color: ORANGE, anchorX: 'middle' });

          // 本质统一
          S.addPolygon('bg-unity',
            [[-9.5, -2.0], [9.5, -2.0], [9.5, -4.5], [-9.5, -4.5]],
            { fillColor: '#e0f7fa', fillOpacity: 0.9, strokeColor: CYAN, strokeWidth: 2 });
          S.addText('unity-title', 0, -2.5, '两种方法的本质统一', { size: 17, color: CYAN, anchorX: 'middle' });
          S.addText('unity-text', 0, -3.5,
            '无论哪种方法，本质都是消元：二元 → 一元 → 求解',
            { size: 15, color: INK, anchorX: 'middle' });

          // 加油话语
          S.addPolygon('bg-cheer',
            [[-9.5, -5.0], [9.5, -5.0], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.85, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('cheer-1', 0, -5.6,
            '掌握了方法选择，解方程组的速度和准确率都会大幅提升！',
            { size: 15, color: GREEN, anchorX: 'middle' });
          S.addText('cheer-2', 0, -6.8,
            '记住口诀，做题前先观察，选对方法事半功倍！',
            { size: 16, color: GOLD, anchorX: 'middle' });

          P.renderCard(
            '<b>方法选择决策树</b><br><br>' +
            '① 系数有 <b>1 或 -1</b> → 代入法<br>' +
            '② 系数<b>相同或相反</b> → 加减法（直接）<br>' +
            '③ 系数<b>成整数倍</b> → 加减法（乘倍数）<br>' +
            '④ 无明显信号 → 乘倍数后加减法<br><br>' +
            '<b>口诀</b>：<br>' +
            '见系数 1 想代入 ·<br>' +
            '见同倍数想加减 ·<br>' +
            '都不明显先乘再加减'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：两法本质统一卡 + 结束语
        narration: '最后，我们来强调一遍两种方法的本质统一。不管是代入法还是加减法，它们都是在解同一类问题——二元一次方程组，目的都是把二元化为一元来求解。两种方法没有高下之分，只有"适不适合这道题"之别。以后做题，先观察系数，选顺手的方法，计算最少、出错最少。这就是"优化意识"！同学们，今天的课到这里就结束了，掌握了方法选择，解方程组再也不迷糊！',
        enter: function (anim) {
          // 清除所有图形，显示终结画面
          S.remove('bg-q'); S.remove('q-text');
          S.remove('bg-b1'); S.remove('b1-title'); S.remove('b1-text'); S.remove('b1-arrow');
          S.remove('bg-b2'); S.remove('b2-title'); S.remove('b2-text'); S.remove('b2-arrow');
          S.remove('bg-b3'); S.remove('b3-title'); S.remove('b3-text'); S.remove('b3-arrow');
          S.remove('arrow-1'); S.remove('arrow-2'); S.remove('arrow-3');
          S.remove('bg-none'); S.remove('none-text');
          S.remove('bg-slogan'); S.remove('slogan-title'); S.remove('slogan-1');
          S.remove('bg-unity'); S.remove('unity-title'); S.remove('unity-text');
          S.remove('bg-cheer'); S.remove('cheer-1'); S.remove('cheer-2');

          // 两法统一大卡
          S.addPolygon('bg-unify',
            [[-9.5, 7.5], [9.5, 7.5], [9.5, 3.0], [-9.5, 3.0]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 3 });
          S.addText('unify-title', 0, 7.0, '两种消元方法——本质统一', { size: 20, color: GOLD, anchorX: 'middle' });

          S.addPolygon('bg-sub-box',
            [[-9.2, 6.3], [-0.5, 6.3], [-0.5, 4.0], [-9.2, 4.0]],
            { fillColor: '#e3f2fd', fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('sub-box-t', -4.8, 5.9, '代入法', { size: 17, color: BLUE, anchorX: 'middle' });
          S.addText('sub-box-d', -4.8, 5.1, '变形 → 代入 → 消去一元', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('sub-box-s', -4.8, 4.3, '适合：系数为 1/-1', { size: 14, color: BLUE, anchorX: 'middle' });

          S.addPolygon('bg-elim-box',
            [[0.5, 6.3], [9.2, 6.3], [9.2, 4.0], [0.5, 4.0]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('elim-box-t', 4.8, 5.9, '加减法', { size: 17, color: GREEN, anchorX: 'middle' });
          S.addText('elim-box-d', 4.8, 5.1, '乘倍 → 加减 → 消去一元', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('elim-box-s', 4.8, 4.3, '适合：系数相同/倍数关系', { size: 14, color: GREEN, anchorX: 'middle' });

          // 共同本质箭头
          S.addPolygon('arr-h1', [[-0.3, 5.2], [0, 4.8], [0.3, 5.2]], { fillColor: GOLD, fillOpacity: 1, strokeColor: GOLD, strokeWidth: 1 });
          S.addPolygon('arr-h2', [[-0.3, 4.7], [0, 4.3], [0.3, 4.7]], { fillColor: GOLD, fillOpacity: 1, strokeColor: GOLD, strokeWidth: 1 });

          S.addPolygon('bg-shared',
            [[-9.5, 2.5], [9.5, 2.5], [9.5, 0.8], [-9.5, 0.8]],
            { fillColor: '#f3e5f5', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('shared-text', 0, 1.9,
            '共同本质：消元 = 二元一次方程组 → 一元一次方程 → 求解',
            { size: 15, color: PURPLE, anchorX: 'middle' });

          // 口诀最终版
          S.addPolygon('bg-final-slogan',
            [[-9.5, 0.2], [9.5, 0.2], [9.5, -2.5], [-9.5, -2.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.95, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('fs-title', 0, -0.3, '选法口诀（请大声读出来！）', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('fs-1', 0, -1.2, '见系数 1 想代入', { size: 18, color: BLUE, anchorX: 'middle' });
          S.addText('fs-2', 0, -2.1, '见同倍数想加减 · 都不明显先乘再加减', { size: 16, color: GREEN, anchorX: 'middle' });

          // 课堂结束语
          S.addPolygon('bg-end',
            [[-9.5, -3.0], [9.5, -3.0], [9.5, -7.5], [-9.5, -7.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 3 });
          S.addText('end-t1', 0, -3.8,
            '优化意识：做题前先观察，选对方法事半功倍！',
            { size: 16, color: ORANGE, anchorX: 'middle' });
          S.addText('end-t2', 0, -5.0,
            '两种方法都正确，"更顺"的那条路就是最好的选择。',
            { size: 15, color: INK, anchorX: 'middle' });
          S.addText('end-t3', 0, -6.3,
            '第7课时结束，同学们掌握了消元方法的选择！',
            { size: 16, color: GOLD, anchorX: 'middle' });

          P.renderCard(
            '<b>两种方法本质统一</b><br><br>' +
            '代入法、加减法都是<b>消元策略</b>，<br>' +
            '本质相同，路径不同。<br><br>' +
            '<b>选法口诀</b>：<br>' +
            '见系数 1 → 代入法<br>' +
            '见同/倍数 → 加减法<br>' +
            '都不明显 → 乘倍后加减<br><br>' +
            '<b>优化意识</b>：每次选"步骤最少"的那条路！',
            'card-final',
            'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
