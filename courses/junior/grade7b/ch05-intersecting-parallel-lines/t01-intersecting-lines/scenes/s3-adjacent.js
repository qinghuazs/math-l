(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', GREEN = '#2e7d32';
  var CSS_DEF = 'background:#fff3e0;border:2.5px solid #e64a19;border-radius:8px;padding:6px 14px;';
  var CSS_KEY = 'background:#e8f5e9;border:2.5px solid #2e7d32;border-radius:8px;padding:6px 14px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 固定角度展示邻补角，∠1 约 120°，∠2 约 60°
  var THETA = 2 * Math.PI / 3; // 120°

  function buildBase() {
    // 直线 CD 水平
    S.addSegment('s3-cd', [-8, 0], [8, 0], { color: INK, width: 3, dash: 0 });
    // 直线 AB 斜向（theta=120°方向）
    S.addSegment('s3-ab',
      [8 * Math.cos(THETA), 8 * Math.sin(THETA)],
      [-8 * Math.cos(THETA), -8 * Math.sin(THETA)],
      { color: INK, width: 3, dash: 0 });
    // 标注
    S.addText('s3-lbl-o', 0.2, -0.7, 'O', { size: 16, color: INK });
    S.addText('s3-lbl-a', 8 * Math.cos(THETA) + 0.4, 8 * Math.sin(THETA) + 0.3, 'A', { size: 16, color: INK });
    S.addText('s3-lbl-b', -8 * Math.cos(THETA) - 0.6, -8 * Math.sin(THETA) - 0.4, 'B', { size: 16, color: INK });
    S.addText('s3-lbl-c', -8.5, 0.3, 'C', { size: 16, color: INK });
    S.addText('s3-lbl-d', 8.1, 0.3, 'D', { size: 16, color: INK });
  }

  var scene = {
    id: 's3',
    title: '三、邻补角：定义与性质',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '我们聚焦到 ∠1 和 ∠2 这两个角上。请看：∠1 是 ∠AOC，∠2 是 ∠AOD。这两个角共享一条边 OA；另一边 OC 和 OD 正好在一条直线 CD 上，互为反向延长线。像这样的两个角，就叫作<b>邻补角</b>。',
        enter: function (anim) {
          buildBase();
          // 高亮 ∠1（∠AOC，在 OA 和 OC 之间）
          S.addAngle('s3-a1',
            [-3, 0],
            [0, 0],
            [3 * Math.cos(THETA), 3 * Math.sin(THETA)],
            { radius: 1.6, color: WARM, label: '∠1', opacity: 0.3 });
          // 高亮 ∠2（∠AOD，在 OA 和 OD 之间）
          S.addAngle('s3-a2',
            [3 * Math.cos(THETA), 3 * Math.sin(THETA)],
            [0, 0],
            [3, 0],
            { radius: 1.2, color: COOL, label: '∠2', opacity: 0.3 });
          // 标注度数
          S.addText('s3-deg1', -3.5, 1.8, '∠1=120°', { size: 15, color: WARM });
          S.addText('s3-deg2', 2.5, 1.5, '∠2=60°', { size: 15, color: COOL });
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '重要：注意这两个条件缺一不可——① <b>有一条公共边</b>（这里是 OA）；② <b>另外两边互为反向延长线</b>（OC 和 OD 在同一直线 CD 上）。两个条件同时满足，才能叫邻补角。满足这两个条件，这两个角就叫作互为邻补角，或者说它们<b>相邻且互补</b>。',
        enter: function (anim) {
          // 高亮公共边 OA
          S.addSegment('s3-oa-hl', [0, 0], [8 * Math.cos(THETA), 8 * Math.sin(THETA)], { color: GREEN, width: 6, dash: 0 });
          // 标注公共边
          S.actor('s3-lbl-oa', 3.5 * Math.cos(THETA) - 1, 3.5 * Math.sin(THETA) + 0.5, '公共边 OA', { color: GREEN, size: 14 });
          P.renderCard('<b>邻补角的定义：</b><br>有一条公共边，另一边互为反向延长线的两个角，叫作<b>邻补角</b>。<br><br>条件 ①：有公共边（OA）<br>条件 ②：另两边互为反向延长线（OC 与 OD）', 'warm');
          if (anim) { return delay(200); }
        },
      },
      {
        narration: '邻补角有一个重要的性质：它们的和等于 180°。为什么？因为 OC 和 OD 成一条直线，所以 ∠1 + ∠2 = 180°——这就是<b>邻补角互补</b>的道理。图上 120° + 60° = 180°，完全吻合。',
        enter: function (anim) {
          // 演算卡
          S.actor('s3-sum', 0, -3.5, '∠1 + ∠2 = 120° + 60° = 180°', { color: PURPLE, size: 20, bold: true, css: CSS_KEY });
          P.renderCard('<b>邻补角的性质：</b><br>邻补角互补，即 $\\angle 1 + \\angle 2 = 180^\\circ$。<br><br>原因：OC 与 OD 是一条直线，∠COD = 180°<br>而 ∠COD = ∠1 + ∠2，所以 ∠1 + ∠2 = 180°。', 'cool');
          if (anim) { return delay(200); }
        },
      },
      {
        narration: '强调一下：邻补角不只是"互补"，还必须"相邻"——有公共顶点和公共边。如果两个角只是度数相加等于 180°，但没有公共顶点和公共边，那它们只是互补角，<b>不是</b>邻补角。这个区别很重要，后面易错点会专门说。',
        enter: function () {
          P.renderCard('<b>易混点提示：</b><br>邻补角 ≠ 只是"互补"<br>邻补角 = 互补 <b>且</b> 相邻（有公共顶点和公共边）<br>互补的两角不一定是邻补角！', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
