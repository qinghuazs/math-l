(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', GREEN = '#2e7d32', RED = '#c62828';
  var CSS_ERR = 'background:#ffebee;border:2.5px solid #c62828;border-radius:8px;padding:5px 12px;';
  var CSS_OK = 'background:#e8f5e9;border:2.5px solid #2e7d32;border-radius:8px;padding:5px 12px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错与课堂小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '在结束本节课之前，我们来看三个最容易出错的地方，逐一辨析。<b>易错 1</b>：有同学认为"只要两角相等，就是对顶角"——这是错的！对顶角必须由两条直线相交形成，而且两边互为反向延长线、顶点相同、无公共边。单纯度数相等不够，位置关系才是判定关键。',
        enter: function (anim) {
          S.actor('s6-e1-wrong', 0, 5.0, '✗ 错：相等的角 = 对顶角', { color: RED, size: 20, bold: true, css: CSS_ERR });
          S.actor('s6-e1-right', 0, 3.0, '✓ 对：对顶角必须由两直线相交形成，顶点相同，两边互为反向延长线', { color: GREEN, size: 15, bold: false, css: CSS_OK });
          P.renderCard('<b>易错 1：相等的角不一定是对顶角</b><br>判断标准：<br>① 必须由两条直线相交形成<br>② 顶点相同<br>③ 两边互为反向延长线（无公共边）<br>三个条件同时满足，才是对顶角。', 'warm');
          if (anim) { return delay(200); }
        },
      },
      {
        narration: '<b>易错 2</b>：有同学混淆邻补角和补角。邻补角是互补角的特殊情况——邻补角一定互补，但互补的角不一定是邻补角。关键在于"相邻"两字：邻补角有公共顶点和公共边，而普通互补角可以分散在空间的任何位置，没有这个要求。',
        enter: function (anim) {
          S.actor('s6-e2-wrong', 0, 5.0, '✗ 错：互补的两角就是邻补角', { color: RED, size: 20, bold: true, css: CSS_ERR });
          S.actor('s6-e2-right', 0, 3.0, '✓ 对：邻补角一定互补，但互补不一定邻补（要看有没有公共顶点和公共边）', { color: GREEN, size: 14, bold: false, css: CSS_OK });
          P.renderCard('<b>易错 2：互补 ≠ 邻补</b><br>邻补角 ⊂ 互补角（邻补一定互补）<br>互补角 ⊃ 邻补角（互补不一定邻补）<br><br>邻补角额外要求：有公共顶点 + 有公共边', 'warm');
          if (anim) { return delay(200); }
        },
      },
      {
        narration: '<b>易错 3</b>：有同学认为只要两角和为 180°，就能用邻补角的关系来推理。注意：在后续学习中，我们会遇到"同旁内角""补角"等，它们互补但不相邻。在做推理时，一定要先确认两角是<b>邻补角</b>（有公共顶点和公共边），再用"邻补角互补"这个性质。',
        enter: function (anim) {
          S.actor('s6-e3-wrong', 0, 5.0, '✗ 错：两角和=180°就可以用邻补角关系', { color: RED, size: 18, bold: true, css: CSS_ERR });
          S.actor('s6-e3-right', 0, 3.0, '✓ 对：先判断是邻补角（有公共顶点和公共边），再用互补性质', { color: GREEN, size: 14, bold: false, css: CSS_OK });
          P.renderCard('<b>易错 3：互补性质使用前提</b><br>使用"邻补角互补"推理的步骤：<br>① 先确认两角有公共顶点和公共边<br>② 另两边互为反向延长线<br>③ 才能说这两角互补（和为 180°）', 'warm');
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
