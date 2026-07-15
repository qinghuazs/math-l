// s2-choose-origin.js  建立坐标系的选择（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 四个固定地标的绝对位置（以某个统一参考系表示，单位格）
  // A=图书馆, B=食堂, C=操场, D=教学楼（绝对位置）
  var ABS = {
    A: [2, 3],
    B: [-1, 2],
    C: [3, -1],
    D: [-3, 1],
  };

  // 方案一：以校门(0,-3)为原点 => 各点坐标 = 绝对 - (0,-3)
  // 但我们把"绝对坐标系"即为方案一，不做偏移，直接用 ABS
  // 方案二：以图书馆A(2,3)为原点 => 各点坐标 = 绝对 - (2,3)
  var ORIG2 = [2, 3]; // 以图书馆为原点时，其绝对坐标

  // 方案一坐标
  var COORDS1 = {
    A: [ABS.A[0], ABS.A[1]],
    B: [ABS.B[0], ABS.B[1]],
    C: [ABS.C[0], ABS.C[1]],
    D: [ABS.D[0], ABS.D[1]],
  };

  // 方案二坐标（偏移后）
  var COORDS2 = {
    A: [ABS.A[0] - ORIG2[0], ABS.A[1] - ORIG2[1]], // (0,0)
    B: [ABS.B[0] - ORIG2[0], ABS.B[1] - ORIG2[1]], // (-3,-1)
    C: [ABS.C[0] - ORIG2[0], ABS.C[1] - ORIG2[1]], // (1,-4)
    D: [ABS.D[0] - ORIG2[0], ABS.D[1] - ORIG2[1]], // (-5,-2)
  };

  var scene = {
    id: 's2',
    title: '二、建立坐标系的选择',
    bbox: [-6, 6, 6, -6],
    board: { grid: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：以校园中心为原点（方案一）
        narration: '现在我们来思考一个重要问题：同一幅图，可以建立不同的坐标系吗？答案是：<b>可以！</b>选择不同的原点，同一个地点的坐标就会不同。先看方案一——以校园中心O为原点建系，四个地标坐标分别是：图书馆A$(2,3)$、食堂B$(-1,2)$、操场C$(3,-1)$、教学楼D$(-3,1)$。',
        enter: function (anim) {
          // 方案一：以(0,0)为原点
          S.dropPoint('o1', 0, 0, { color: RED, name: 'O₁', size: 5, labelOffset: [-18, -16] });

          S.dropPoint('A1', COORDS1.A[0], COORDS1.A[1], { color: BLUE,   name: 'A', size: 4, labelOffset: [6, 8] });
          S.dropPoint('B1', COORDS1.B[0], COORDS1.B[1], { color: ORANGE, name: 'B', size: 4, labelOffset: [-18, 8] });
          S.dropPoint('C1', COORDS1.C[0], COORDS1.C[1], { color: GREEN,  name: 'C', size: 4, labelOffset: [6, -16] });
          S.dropPoint('D1', COORDS1.D[0], COORDS1.D[1], { color: PURPLE, name: 'D', size: 4, labelOffset: [-18, 8] });

          S.addText('A1-lbl', COORDS1.A[0]+0.1, COORDS1.A[1]-0.5, '$(2,3)$',   { size: 12, color: BLUE });
          S.addText('B1-lbl', COORDS1.B[0]+0.1, COORDS1.B[1]-0.5, '$(-1,2)$',  { size: 12, color: ORANGE });
          S.addText('C1-lbl', COORDS1.C[0]+0.1, COORDS1.C[1]-0.5, '$(3,-1)$',  { size: 12, color: GREEN });
          S.addText('D1-lbl', COORDS1.D[0]-1.5, COORDS1.D[1]-0.5, '$(-3,1)$',  { size: 12, color: PURPLE });

          S.addText('s2-scheme1', -5.8, 5.3, '方案一：以校园中心为原点', { size: 13, color: RED });

          P.renderCard(
            '<b>方案一：以校园中心为原点</b><br><br>' +
            '原点 $O_1$：校园中心 $(0,0)$<br><br>' +
            '图书馆 $A(2,3)$<br>' +
            '食 堂 $B(-1,2)$<br>' +
            '操 场 $C(3,-1)$<br>' +
            '教学楼 $D(-3,1)$'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：换以图书馆为原点（方案二），展示坐标变化
        narration: '现在换一种建系方式——以图书馆A为原点（方案二）。注意看：图书馆A本来在 $(2,3)$，现在变成了原点 $(0,0)$！而其他地点的坐标也全部改变了：食堂B变成了 $(-3,-1)$，操场C变成了 $(1,-4)$，教学楼D变成了 $(-5,-2)$。地点的实际位置没有变，但坐标却完全不同了！这就说明：<b>坐标依赖于坐标系的选择</b>。',
        enter: function (anim) {
          // 移除方案一标注
          S.remove('A1-lbl'); S.remove('B1-lbl'); S.remove('C1-lbl'); S.remove('D1-lbl');
          S.remove('s2-scheme1');

          // 新原点标记（图书馆位置）
          S.remove('o1');
          S.remove('A1');
          S.dropPoint('o2', COORDS1.A[0], COORDS1.A[1], { color: RED, name: 'O₂', size: 5, labelOffset: [-18, -16] });

          // 方案二：点的"显示"坐标相对于新原点，但画板坐标系不变
          // 为了在同一画板上展示对比，我们直接在原有坐标位置显示点，
          // 但用文字标注新坐标
          S.addText('A2-lbl', COORDS1.A[0]+0.1, COORDS1.A[1]-0.5, '$(0,0)$',   { size: 12, color: RED });
          S.addText('B2-lbl', COORDS1.B[0]+0.1, COORDS1.B[1]-0.5, '$(-3,-1)$', { size: 12, color: ORANGE });
          S.addText('C2-lbl', COORDS1.C[0]+0.1, COORDS1.C[1]-0.5, '$(1,-4)$',  { size: 12, color: GREEN });
          S.addText('D2-lbl', COORDS1.D[0]-1.8, COORDS1.D[1]-0.5, '$(-5,-2)$', { size: 12, color: PURPLE });

          S.addText('s2-scheme2', -5.8, 5.3, '方案二：以图书馆A为原点', { size: 13, color: RED });

          // 高亮说明文字
          S.addText('s2-note', 0, -5.2, '同一位置，不同坐标系→坐标不同！', { size: 13, color: ORANGE, anchorX: 'middle' });

          P.renderCard(
            '<b>方案二：以图书馆A为原点</b><br><br>' +
            '原点 $O_2$：图书馆 → $(0,0)$<br><br>' +
            '食 堂 $B(-3,-1)$ ← 原 $(-1,2)$<br>' +
            '操 场 $C(1,-4)$ ← 原 $(3,-1)$<br>' +
            '教学楼 $D(-5,-2)$ ← 原 $(-3,1)$<br><br>' +
            '<b>实际位置不变，坐标变了！</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：总结选择坐标系的原则
        narration: '通过对比我们发现：建立坐标系时，原点和单位长度的选择非常关键。选得好，坐标的数值会更简洁，计算更方便。一般遵循这几条原则：<b>①让尽量多的关键点落在坐标轴上或原点处；②尽量避免出现负数或复杂分数；③选对称图形的中心为原点最方便</b>。记住：同一位置在不同坐标系中坐标不同，但实际位置不变——坐标是"相对的"，要先约定坐标系！',
        enter: function (anim) {
          S.remove('s2-note');
          S.remove('s2-scheme2');
          S.remove('A2-lbl'); S.remove('B2-lbl'); S.remove('C2-lbl'); S.remove('D2-lbl');

          // 展示选择原则
          S.addText('pr-title', 0, 5.2, '选择坐标系的原则', { size: 15, color: BLUE, anchorX: 'middle' });
          S.addText('pr-1', -5.5, 4.0, '① 让关键点落在坐标轴或原点上', { size: 14, color: GREEN });
          S.addText('pr-2', -5.5, 3.0, '② 尽量避免负数和复杂分数', { size: 14, color: ORANGE });
          S.addText('pr-3', -5.5, 2.0, '③ 对称图形选对称中心为原点', { size: 14, color: PURPLE });
          S.addText('pr-remind', 0, -5.2,
            '同一位置，不同坐标系 → 坐标不同；坐标系要先约定！',
            { size: 12, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>选择坐标系的原则</b><br><br>' +
            '① 关键点落在轴上或原点<br>' +
            '② 避免负数和复杂分数<br>' +
            '③ 对称图形选对称中心<br><br>' +
            '核心：先约定原点和单位！<br>' +
            '<b>坐标 = 相对量（依赖坐标系）</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
