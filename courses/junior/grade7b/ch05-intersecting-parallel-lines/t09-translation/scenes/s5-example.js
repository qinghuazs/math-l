// s5-example.js  例题与易错（3步）
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
    title: '五、例题与易错提醒',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：例题6——快问快答
        narration: '来做例题6！题目是：将三角形ABC向右平移4格，再向上平移2格，得到△A\'B\'C\'。问题一：AA\'的长度和方向如何？问题二：∠A和∠A\'的关系？问题三：AB和A\'B\'的关系？大家先独立思考20秒，再看答案！',
        enter: function (anim) {
          // 快问背景
          S.addPolygon('q-bg',
            [[-9.5, 7.0], [9.5, 7.0], [9.5, 3.5], [-9.5, 3.5]],
            { fillColor: '#e3f2fd', fillOpacity: 0.95, strokeColor: BLUE, strokeWidth: 3 });
          S.addText('q-title', 0, 6.4, '例题6（快问快答）', { size: 18, color: BLUE, anchorX: 'middle' });
          S.addText('q-cond', 0, 5.5,
            '△ABC 向右平移4格、向上平移2格 → △A\'B\'C\'',
            { size: 15, color: INK, anchorX: 'middle' });
          S.addText('q1', -9.2, 4.5, 'Q1: AA\' 的长度和方向？', { size: 15, color: BLUE });
          S.addText('q2', -9.2, 3.7, 'Q2: ∠A 与 ∠A\' 的关系？', { size: 15, color: BLUE });

          // 示意图（网格上简单三角形）
          S.addPolygon('ex-orig',
            [[-6, 2], [-3, 2], [-5, 0]],
            { fillColor: '#90caf9', fillOpacity: 0.5, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('ex-A', -6.5, 2.2, 'A', { size: 14, color: BLUE });
          S.addText('ex-B', -2.7, 2.2, 'B', { size: 14, color: BLUE });
          S.addText('ex-C', -5.2, -0.5, 'C', { size: 14, color: BLUE });

          S.addPolygon('ex-new',
            [[-2, 4], [1, 4], [-1, 2]],
            { fillColor: '#a5d6a7', fillOpacity: 0.6, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('ex-Ap', -2.7, 4.2, "A'", { size: 14, color: GREEN });
          S.addText('ex-Bp', 1.1, 4.2, "B'", { size: 14, color: GREEN });
          S.addText('ex-Cp', -1.3, 1.5, "C'", { size: 14, color: GREEN });

          // AA'连线
          S.addSegment('ex-AA', [-6, 2], [-2, 4], { color: ORANGE, width: 2, dash: 4 });

          P.renderCard(
            '<b>例题6 快问快答</b><br><br>' +
            '△ABC 向右4格向上2格<br>' +
            '→ △A\'B\'C\'<br><br>' +
            'Q1: AA\' 的长度和方向？<br>' +
            'Q2: ∠A 与 ∠A\' 的关系？'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：例题答案揭晓
        narration: '时间到，揭晓答案！Q1：AA\'的方向——斜向右上方（右4格上2格合成的向量方向），长度等于平移向量的长度，即 $\\sqrt{4^2+2^2}=\\sqrt{20}=2\\sqrt{5}$ 格。Q2：∠A = ∠A\'，对应角相等（平移性质）。Q3：AB ∥ A\'B\'，且AB = A\'B\'，对应边平行且相等！这些都是平移性质的直接应用。',
        enter: function (anim) {
          // 答案框
          S.addPolygon('ans-bg',
            [[-9.5, -0.5], [9.5, -0.5], [9.5, -7.0], [-9.5, -7.0]],
            { fillColor: '#e8f5e9', fillOpacity: 0.95, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('ans-title', 0, -1.1, '答案解析', { size: 17, color: GREEN, anchorX: 'middle' });
          S.addText('ans-1', -9.2, -2.0,
            'A1: AA\' 方向 = 右4格上2格的合成方向', { size: 14, color: BLUE });
          S.addText('ans-1b', -9.2, -3.0,
            '       长度 = √(4²+2²) = 2√5 格', { size: 14, color: BLUE });
          S.addText('ans-2', -9.2, -4.0,
            'A2: ∠A = ∠A\'（对应角相等）', { size: 14, color: ORANGE });
          S.addText('ans-3', -9.2, -5.0,
            'A3: AB ∥ A\'B\'，且 AB = A\'B\'（对应边平行且相等）', { size: 14, color: RED });
          S.addText('ans-key', 0, -6.2,
            '关键：以上均来自平移性质——直接使用！',
            { size: 15, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>例题6 答案</b><br><br>' +
            'A1: AA\' = 2√5格，斜向右上<br>' +
            'A2: ∠A = ∠A\'（对应角相等）<br>' +
            'A3: AB ∥ A\'B\'，AB = A\'B\'<br><br>' +
            '依据：<b>平移性质</b>',
            null, 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：易错提醒——错误示例图对比
        narration: '最后要提醒大家几个常见错误！请看错误示例：有同学作平移时，把顶点A移对了，但顶点B没有移动，顶点C移到了错误的位置，导致"平移后的三角形"歪了——形状变了！这是绝对错误的！平移的铁律是：<b>所有点</b>必须沿<b>同一方向</b>移动<b>相同距离</b>，一个点都不能例外！',
        enter: function (anim) {
          // 画正确结果（左）
          S.addPolygon('correct-bg',
            [[-9.5, 6.5], [-0.5, 6.5], [-0.5, 2.5], [-9.5, 2.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('correct-title', -5, 6.1, '✓ 正确', { size: 16, color: GREEN, anchorX: 'middle' });
          // 原三角形
          S.addPolygon('cor-orig',
            [[-8.5, 5.2], [-7, 5.2], [-8, 3.8]],
            { fillColor: '#90caf9', fillOpacity: 0.5, strokeColor: BLUE, strokeWidth: 2 });
          // 对应平移向量箭头
          S.addSegment('cor-arr1', [-8.5, 5.2], [-6.5, 5.8], { color: ORANGE, width: 2, dash: 4 });
          S.addSegment('cor-arr2', [-7, 5.2],  [-5, 5.8],  { color: ORANGE, width: 2, dash: 4 });
          S.addSegment('cor-arr3', [-8, 3.8],  [-6, 4.4],  { color: ORANGE, width: 2, dash: 4 });
          // 新三角形（正确）
          S.addPolygon('cor-new',
            [[-6.5, 5.8], [-5, 5.8], [-6, 4.4]],
            { fillColor: '#a5d6a7', fillOpacity: 0.8, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('cor-note', -5, 3.1, '三点同向等距', { size: 13, color: GREEN, anchorX: 'middle' });

          // 画错误结果（右）
          S.addPolygon('wrong-bg',
            [[0.5, 6.5], [9.5, 6.5], [9.5, 2.5], [0.5, 2.5]],
            { fillColor: '#ffebee', fillOpacity: 0.9, strokeColor: RED, strokeWidth: 2 });
          S.addText('wrong-title', 5, 6.1, '✗ 错误', { size: 16, color: RED, anchorX: 'middle' });
          // 原三角形
          S.addPolygon('wrg-orig',
            [[1.5, 5.2], [3, 5.2], [2, 3.8]],
            { fillColor: '#90caf9', fillOpacity: 0.5, strokeColor: BLUE, strokeWidth: 2 });
          // 错误：只移了A，B原地，C移到错误位置
          S.addSegment('wrg-arr1', [1.5, 5.2], [3.5, 5.8], { color: RED, width: 2, dash: 4 });
          // B 没移（×）
          S.addText('wrg-B-err', 3.2, 4.9, '×B未动', { size: 12, color: RED });
          // C 移到错误位置
          S.addSegment('wrg-arr3', [2, 3.8], [4.5, 4.8], { color: RED, width: 2, dash: 4 });
          // 歪的"新三角形"
          S.addPolygon('wrg-new',
            [[3.5, 5.8], [3, 5.2], [4.5, 4.8]],
            { fillColor: '#ef9a9a', fillOpacity: 0.7, strokeColor: RED, strokeWidth: 2 });
          S.addText('wrg-note', 5, 3.1, '形状已变！', { size: 13, color: RED, anchorX: 'middle' });

          // 易错清单
          S.addPolygon('err-list-bg',
            [[-9.5, 2.0], [9.5, 2.0], [9.5, -2.0], [-9.5, -2.0]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('err-title', 0, 1.5, '易错提醒', { size: 17, color: ORANGE, anchorX: 'middle' });
          S.addText('err-1', -9.2, 0.6, '✗ 只移动部分顶点（方向距离不一致）', { size: 14, color: RED });
          S.addText('err-2', -9.2, -0.3, '✗ 移动距离不同（有的多有的少）', { size: 14, color: RED });
          S.addText('err-3', -9.2, -1.2, '✓ 所有点：同方向、同距离——平移的铁律！', { size: 14, color: GREEN });

          // 底部总结
          S.addPolygon('iron-bg',
            [[-9.5, -2.5], [9.5, -2.5], [9.5, -4.5], [-9.5, -4.5]],
            { fillColor: '#c8e6c9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('iron-rule', 0, -3.1,
            '铁律：所有点 → 同一方向 → 相同距离',
            { size: 16, color: GREEN, anchorX: 'middle' });
          S.addText('iron-rule2', 0, -3.9,
            '违反任意一条 = 不是平移！',
            { size: 15, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>易错提醒</b><br><br>' +
            '✗ 只移动部分顶点<br>' +
            '✗ 各点移动距离不同<br>' +
            '✗ 各点移动方向不同<br><br>' +
            '<b>铁律：全部顶点<br>同方向 + 同距离</b>',
            null, 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
