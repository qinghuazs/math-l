(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 平行线 a（y=2）端点
  var ptA1 = [-8, 2];
  var ptA2 = [8, 2];
  // 平行线 b（y=-2）端点
  var ptB1 = [-8, -2];
  var ptB2 = [8, -2];
  // 截线 c：固定斜率，从左上到右下
  var ptC1 = [-3, 5];
  var ptC2 = [3, -5];

  function buildParallelLines() {
    // 直线 a（蓝色）
    S.addSegment('s1-a', ptA1, ptA2, { color: COOL, width: 3, dash: 0 });
    S.addText('s1-lbl-a', 8.2, 2.3, 'a', { size: 18, color: COOL });
    // 直线 b（绿色）
    S.addSegment('s1-b', ptB1, ptB2, { color: GREEN, width: 3, dash: 0 });
    S.addText('s1-lbl-b', 8.2, -1.7, 'b', { size: 18, color: GREEN });
  }

  function buildArrows() {
    // 在直线 a 上画平行箭头（小三角形表示平行）
    S.addSegment('s1-arr-a1', [-1.3, 2.5], [-0.8, 2], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s1-arr-a2', [-1.3, 1.5], [-0.8, 2], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s1-arr-a3', [0.7, 2.5], [1.2, 2], { color: COOL, width: 2, dash: 0 });
    S.addSegment('s1-arr-a4', [0.7, 1.5], [1.2, 2], { color: COOL, width: 2, dash: 0 });
    // 在直线 b 上画平行箭头
    S.addSegment('s1-arr-b1', [-1.3, -1.5], [-0.8, -2], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s1-arr-b2', [-1.3, -2.5], [-0.8, -2], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s1-arr-b3', [0.7, -1.5], [1.2, -2], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('s1-arr-b4', [0.7, -2.5], [1.2, -2], { color: GREEN, width: 2, dash: 0 });
  }

  function buildTransversal() {
    // 截线 c（暖红色）
    S.addSegment('s1-c', ptC1, ptC2, { color: WARM, width: 3, dash: 0 });
    S.addText('s1-lbl-c', 3.2, -5.2, 'c', { size: 18, color: WARM });
  }

  var scene = {
    id: 's1',
    title: '一、引入：方向反过来',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '同学们好！上节课我们学习了平行线的判定——通过角的关系来断定两条直线平行。比如，同位角相等，就能推出两条直线平行。今天我们要把思路<b>反过来</b>：如果已经知道两条直线平行，能不能推出角的关系呢？这就是今天的课题——<b>平行线的性质</b>。',
        enter: function (anim) {
          P.renderCard(
            '<b>上节课（判定）：</b><br>角的关系 <b>⟹</b> 直线平行<br><br>' +
            '<b>本节课（性质）：</b><br>直线平行 <b>⟹</b> 角的关系'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '我们先在黑板上画出基本图形：两条平行线 $a$ 和 $b$，以及一条截线 $c$。直线 $a \\parallel b$——平行线我们用相同的箭头符号来标记，这是国际惯例。截线 $c$ 同时与 $a$、$b$ 相交，就产生了一系列的角。',
        enter: function (anim) {
          buildParallelLines();
          if (!anim) {
            buildArrows();
            buildTransversal();
            P.renderCard('基本图形：$a \\parallel b$，截线 $c$ 同时截两条平行线');
            return;
          }
          return delay(400).then(function () {
            buildArrows();
            return delay(500);
          }).then(function () {
            buildTransversal();
            P.renderCard('基本图形：$a \\parallel b$，截线 $c$ 同时截两条平行线');
          });
        },
      },
      {
        narration: '这就是我们今天研究的舞台——两条平行线被一条直线所截，产生的八个角。回忆一下：这些角按位置分为三类——同位角、内错角、同旁内角。从下节起，我们逐一探究：已知 $a \\parallel b$，这三类角各有什么规律？',
        enter: function (anim) {
          // 标注交点
          S.addText('s1-lbl-p', -0.7, 2.5, 'P', { size: 16, color: INK });
          S.addText('s1-lbl-q', -0.7, -1.5, 'Q', { size: 16, color: INK });
          P.renderCard(
            '截线 $c$ 与 $a$、$b$ 分别交于点 $P$、$Q$<br><br>' +
            '产生八个角，分三类：<br>' +
            '① 同位角 &nbsp;② 内错角 &nbsp;③ 同旁内角<br><br>' +
            '<b>问题：$a \\parallel b$ 时，各类角有何关系？</b>'
          );
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
