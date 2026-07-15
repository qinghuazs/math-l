// s5-eight.js  八句话与出口（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 四个学习环节的图示（观察→猜想→验证→推理）
  function drawLearningCycle() {
    // 四个圆形节点
    var nodes = [
      { x: -6.5, y: 1.0, label: '观察', color: BLUE },
      { x: -1.5, y: 3.5, label: '猜想', color: PURPLE },
      { x:  3.5, y: 1.0, label: '验证', color: GREEN },
      { x:  1.0, y: -3.0, label: '推理', color: ORANGE },
    ];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      S.addCircle('cyc-c' + i, n.x, n.y, 1.5,
        { color: n.color, width: 3, fill: n.color, fillOpacity: 0.12 });
      S.addText('cyc-t' + i, n.x, n.y, n.label,
        { size: 17, color: n.color, anchorX: 'middle' });
    }
    // 连接箭头（线段）
    S.addSegment('cyc-a1', [-5.0, 1.7], [-2.8, 2.8], { color: INK, width: 2, dash: 2 });
    S.addSegment('cyc-a2', [-0.1, 3.2], [2.0, 1.9], { color: INK, width: 2, dash: 2 });
    S.addSegment('cyc-a3', [3.3, -0.5], [2.2, -1.8], { color: INK, width: 2, dash: 2 });
    S.addSegment('cyc-a4', [-0.1, -3.0], [-5.2, -0.5], { color: INK, width: 2, dash: 2 });
    // 主线说明
    S.addText('cyc-hd', -2.5, 6.5, '本章学习主线', { size: 16, color: INK });
    S.addText('cyc-sub', -4.0, 5.5,
      '相交线 → 平行线 → 命题推理 → 平移应用',
      { size: 13, color: INK });
  }

  var scene = {
    id: 's5',
    title: '五、八句话与收官',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：八句话前四句
        narration: '现在来看本章最重要的八句话——这是老师总结的整章精髓，也是考试拿分的保证。前四句：第一，"图形看起来怎样，不等于它实际上怎样"——这是几何学的基本态度，不能只靠观察；第二，"对顶角相等，但相等的角不一定是对顶角"——这是例题5的核心；第三，"从直线外一点到直线，垂线段最短"——这是距离的本质；第四，"判断两直线平行时，要先确认角的位置关系"——这是易错点3。',
        enter: function (anim) {
          P.renderCard(
            '<b>本章八句话（前4句）</b><br>' +
            '<ol style="margin:8px 0 0 16px;line-height:2.1">' +
            '<li>图形<b>看起来</b>怎样，不等于它<b>实际上</b>怎样。</li>' +
            '<li><b>对顶角相等</b>，但相等的角不一定是对顶角。</li>' +
            '<li>从直线外一点到直线，<b>垂线段最短</b>。</li>' +
            '<li>判断两直线平行时，要先确认<b>角的位置关系</b>。</li>' +
            '</ol>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：八句话后四句（用 tada 效果收官）
        narration: '后四句：第五，"角的关系推出线平行，用判定"；第六，"线平行推出角的关系，用性质"——这两句是判定和性质的核心口诀，务必牢记！第七，"几何结论要有依据，不能只凭观察"——这是规范推理的要求；第八，"平移只改变图形的位置，不改变形状和大小"——平移的本质。这八句话串联起了整章的所有核心知识点！',
        enter: function (anim) {
          P.renderCard(
            '<b>本章八句话（后4句）</b><br>' +
            '<ol start="5" style="margin:8px 0 0 16px;line-height:2.1">' +
            '<li><b>角的关系</b>推出线平行，用<b style="color:#c62828">判定</b>。</li>' +
            '<li><b>线平行</b>推出角的关系，用<b style="color:#2e7d32">性质</b>。</li>' +
            '<li>几何结论要有<b>依据</b>，不能只凭观察。</li>' +
            '<li>平移只改变图形的<b>位置</b>，不改变形状和大小。</li>' +
            '</ol>',
            'default',
            'tada'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：单元学习闭环卡
        narration: '最后来看整章的学习主线——这是一条从相交线出发、一路走到推理和应用的完整旅程：从相交线中的角出发，认识垂直与平行；学习用角的关系判断直线位置；再用平行关系研究角；然后通过命题和定理形成规范推理；最后利用平移解决图形变换问题。这条主线展示了数学最美的一面——观察、猜想、验证、推理，环环相扣。同学们，这一章我们学到了，也将终身受用！',
        enter: function (anim) {
          drawLearningCycle();
          P.renderCard(
            '<b>单元学习闭环</b><br>' +
            '<div style="line-height:1.9">' +
            '观察 → 猜想 → 验证 → 推理<br>' +
            '<br>' +
            '<b>本章学习主线</b>：<br>' +
            '相交线（角）<br>' +
            '↓ 垂直·平行<br>' +
            '↓ 角判定线 / 线推角<br>' +
            '↓ 命题·定理·规范推理<br>' +
            '↓ 平移与图形变换<br>' +
            '<br>' +
            '<b style="color:#00695c">第五章 · 圆满收官！</b>' +
            '</div>',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
