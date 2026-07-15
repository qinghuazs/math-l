// s1-contrast.js  对比引入：判定与性质（3步）
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

  var scene = {
    id: 's1',
    title: '一、对比引入：判定 vs 性质',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：判定与性质对照表
        narration: '同学们好！我们已经分别学了平行线的判定和平行线的性质。今天这节课，我们来综合运用这两个工具。在动手做题之前，先把这两个工具摆在一起，看清楚它们各自是什么、有什么区别。请看这张对比表。',
        enter: function (anim) {
          P.renderTable(
            ['类型', '已知条件', '得出结论'],
            [
              ['平行线的<b>判定</b>', '角的关系（相等或互补）', '两直线平行'],
              ['平行线的<b>性质</b>', '两直线平行', '角的关系（相等或互补）'],
            ]
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：逻辑方向图示——两大箭头卡片
        narration: '看完表格，我们再用图示感受一下逻辑方向。判定是"从角到线"——知道角的关系，能推出线平行；性质是"从线到角"——已知线平行，能推出角的关系。这两个方向正好相反，一定要分清楚！',
        enter: function (anim) {
          // 上半区：判定卡片（从左到右：角 → 线）
          // 矩形背景 判定
          S.addPolygon('bg-judge',
            [[-9, 7.2], [9, 7.2], [9, 2.2], [-9, 2.2]],
            { fillColor: '#e3f2fd', fillOpacity: 0.8, strokeColor: BLUE, strokeWidth: 2 });

          S.addText('lbl-judge-title', 0, 6.5, '【判定】', { size: 20, color: BLUE, anchorX: 'middle' });

          // 角关系文字
          S.addText('lbl-judge-left', -6.5, 4.7,
            '角的关系', { size: 17, color: INK, anchorX: 'middle' });
          // 箭头线段
          S.addSegment('arr-judge', [-4.2, 4.7], [1.8, 4.7],
            { color: BLUE, width: 4, dash: 0 });
          // 箭头头部（三角形）
          S.addPolygon('arr-judge-head',
            [[1.8, 5.15], [3.0, 4.7], [1.8, 4.25]],
            { fillColor: BLUE, fillOpacity: 1, strokeColor: BLUE, strokeWidth: 1 });
          // "判定"标签在箭头上方
          S.addText('lbl-judge-arrow', -1.2, 5.35, '（判定）', { size: 14, color: BLUE, anchorX: 'middle' });
          // 线平行文字
          S.addText('lbl-judge-right', 6.5, 4.7,
            '线平行', { size: 17, color: BLUE, anchorX: 'middle' });

          // 下半区：性质卡片（从左到右：线 → 角）
          S.addPolygon('bg-prop',
            [[-9, 1.8], [9, 1.8], [9, -3.2], [-9, -3.2]],
            { fillColor: '#f3e5f5', fillOpacity: 0.8, strokeColor: PURPLE, strokeWidth: 2 });

          S.addText('lbl-prop-title', 0, 1.1, '【性质】', { size: 20, color: PURPLE, anchorX: 'middle' });

          // 线平行文字
          S.addText('lbl-prop-left', -6.5, -0.7,
            '线平行', { size: 17, color: INK, anchorX: 'middle' });
          // 箭头线段
          S.addSegment('arr-prop', [-4.2, -0.7], [1.8, -0.7],
            { color: PURPLE, width: 4, dash: 0 });
          // 箭头头部
          S.addPolygon('arr-prop-head',
            [[1.8, -0.25], [3.0, -0.7], [1.8, -1.15]],
            { fillColor: PURPLE, fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 1 });
          // "性质"标签在箭头上方
          S.addText('lbl-prop-arrow', -1.2, -0.05, '（性质）', { size: 14, color: PURPLE, anchorX: 'middle' });
          // 角关系文字
          S.addText('lbl-prop-right', 6.5, -0.7,
            '角的关系', { size: 17, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>判定</b>：角的关系 <b>⟹</b> 线平行<br>' +
            '<b>性质</b>：线平行 <b>⟹</b> 角的关系<br><br>' +
            '两者方向<b>相反</b>，用途不同，用错了就推不出结论！'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：核心问句卡
        narration: '那么做题时，怎么知道该用判定还是性质呢？只需要问自己一句话——"题目要证的是线平行，还是角相等？"要证线平行，就用判定；已知线平行要求角，就用性质。这是解题的总钥匙，请记住这句话！',
        enter: function (anim) {
          // 清除图形，显示核心问句
          S.remove('bg-judge');
          S.remove('lbl-judge-title');
          S.remove('lbl-judge-left');
          S.remove('arr-judge');
          S.remove('arr-judge-head');
          S.remove('lbl-judge-arrow');
          S.remove('lbl-judge-right');
          S.remove('bg-prop');
          S.remove('lbl-prop-title');
          S.remove('lbl-prop-left');
          S.remove('arr-prop');
          S.remove('arr-prop-head');
          S.remove('lbl-prop-arrow');
          S.remove('lbl-prop-right');

          // 核心问句大卡
          S.addPolygon('bg-key',
            [[-8.5, 5], [8.5, 5], [8.5, 0.5], [-8.5, 0.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: ORANGE, strokeWidth: 3 });
          S.addText('lbl-key', 0, 3.5,
            '做题时先问自己：',
            { size: 18, color: INK, anchorX: 'middle' });
          S.addText('lbl-key2', 0, 2.2,
            '"题目要证的是线平行，还是角相等？"',
            { size: 17, color: ORANGE, anchorX: 'middle' });

          // 两个选项分支
          S.addPolygon('bg-ans1',
            [[-8.5, 0], [0.5, 0], [0.5, -3.5], [-8.5, -3.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('lbl-ans1a', -4, -1.2,
            '要证 线平行', { size: 16, color: GREEN, anchorX: 'middle' });
          S.addText('lbl-ans1b', -4, -2.4,
            '→ 用 判定', { size: 16, color: GREEN, anchorX: 'middle' });

          S.addPolygon('bg-ans2',
            [[0.8, 0], [8.5, 0], [8.5, -3.5], [0.8, -3.5]],
            { fillColor: '#ede7f6', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('lbl-ans2a', 4.8, -1.2,
            '已知 线平行，求角', { size: 16, color: PURPLE, anchorX: 'middle' });
          S.addText('lbl-ans2b', 4.8, -2.4,
            '→ 用 性质', { size: 16, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>解题总钥匙</b><br><br>' +
            '要证 <b>线平行</b> → 用 <b>判定</b>（从角推线）<br>' +
            '已知 <b>线平行</b>，求角 → 用 <b>性质</b>（从线推角）'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
