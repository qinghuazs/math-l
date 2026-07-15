(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GRAY = '#90a4ae', GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、点到直线的距离与生活应用',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '我们已经知道垂线段最短。由此引出一个重要概念：点到直线的距离。从直线外一点向直线引垂线段，这条垂线段的长度，就叫作该点到直线的距离。',
        enter: function (anim) {
          var LY = -1;
          var PX = -3, PY = 4;
          var AX = -3; // 垂足

          // 直线 l
          S.addSegment('s5-l', [-9, LY], [9, LY], { color: INK, width: 3, dash: 0 });
          S.addText('s5-labl', 8.5, LY + 0.5, 'l', { color: INK, size: 18 });

          // 外点 P
          S.dropPoint('s5-P', PX, PY, { name: '', color: WARM, size: 5, animate: anim });
          S.addText('s5-labP', PX + 0.3, PY + 0.5, 'P', { color: WARM, size: 16 });

          // 垂线段 PA
          S.addSegment('s5-PA', [PX, PY], [AX, LY], { color: WARM, width: 4, dash: 0 });
          S.dropPoint('s5-A', AX, LY, { name: '', color: WARM, size: 4, animate: false });
          S.addText('s5-labA', AX + 0.3, LY - 0.7, 'A（垂足）', { color: WARM, size: 14 });

          // 直角标记
          S.addAngle('s5-rt',
            [AX, LY + 1.2],
            [AX, LY],
            [AX + 1.2, LY],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.3 }
          );

          // 长度标注
          S.addText('s5-dist-label', PX - 3.0, (PY + LY) / 2, 'PA = 点P到l的距离', { color: WARM, size: 15 });

          P.renderCard('【点到直线的距离】<br>直线外一点到这条直线的<b>垂线段的长度</b>，<br>叫作该点到直线的距离', 'warm');

          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '斜线段 PB 比垂线段 PA 长，所以 PA < PB——"垂线段最短"就是在说：点到直线的距离，是从该点到直线所能连的最短线段。',
        enter: function (anim) {
          var LY = -1;
          var PX = -3, PY = 4;
          var AX = -3;

          // 添加斜线段
          S.addSegment('s5-PB', [PX, PY], [3, LY], { color: GRAY, width: 2, dash: 2 });
          S.dropPoint('s5-B', 3, LY, { name: '', color: GRAY, size: 3, animate: false });
          S.addText('s5-labB', 3.3, LY - 0.7, 'B', { color: GRAY, size: 15 });
          S.addText('s5-pb-len', 0.5, 2.0, 'PB（斜线段，较长）', { color: GRAY, size: 14 });

          P.renderCard('$PA\\lt PB$（PA 是垂线段，PB 是斜线段）<br>点到直线的距离 = 垂线段长度 = <b>最短距离</b>', 'cool');

          return anim ? delay(300) : Promise.resolve();
        },
      },
      {
        narration: '这个概念在生活中有很多实际应用！测量河宽——从河岸上一点，向对岸直线垂直量距离；设计最短通道——从一点到一条路最短的路线就是垂线；计算点球距离——点球点到球门线的距离就是垂线段长度。',
        enter: function (anim) {
          var p = Promise.resolve();

          // 应用1：测量河宽（左上）
          // 河岸两条平行横线
          S.addSegment('s5-river1', [-9.5, 6], [-0.5, 6], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s5-river2', [-9.5, 4.5], [-0.5, 4.5], { color: COOL, width: 3, dash: 0 });
          // 填充河流
          S.shadeRect('s5-river-fill', -9.5, 6, -0.5, 4.5, { color: COOL, opacity: 0.15 });
          // 测量垂线
          S.addSegment('s5-river-meas', [-5, 6], [-5, 4.5], { color: WARM, width: 3, dash: 0 });
          S.addAngle('s5-river-rt', [-5, 6 - 0.8], [-5, 6], [-5 + 0.8, 6],
            { radius: 0.8, color: WARM, ortho: true, opacity: 0.3 });
          S.addText('s5-river-lab', -4.7, 5.25, '河宽', { color: WARM, size: 13 });
          S.addText('s5-river-title', -8.5, 4.0, '① 测量河宽', { color: COOL, size: 14 });

          // 应用2：最短通道（中间）
          S.addSegment('s5-road', [-0.5, 5.5], [4.5, 5.5], { color: '#78909c', width: 18, dash: 0 });
          S.addText('s5-road-lab', 0.0, 5.1, '道路', { color: INK, size: 13 });
          S.dropPoint('s5-house', 2, 3.0, { name: '', color: GREEN, size: 5, animate: false });
          S.addText('s5-house-lab', 2.3, 2.6, '居民点', { color: GREEN, size: 12 });
          S.addSegment('s5-shortest-path', [2, 3.0], [2, 4.6], { color: WARM, width: 3, dash: 0 });
          S.addAngle('s5-road-rt', [2, 4.6 - 0.7], [2, 4.6], [2 + 0.7, 4.6],
            { radius: 0.7, color: WARM, ortho: true, opacity: 0.3 });
          S.addText('s5-road-title', -0.2, 2.2, '② 最短通道', { color: GREEN, size: 14 });

          // 应用3：点球距离（右侧）
          S.addSegment('s5-goalline', [5.5, 6.5], [9.5, 6.5], { color: INK, width: 4, dash: 0 });
          S.addText('s5-goal-lab', 6.5, 7.0, '球门线', { color: INK, size: 13 });
          S.dropPoint('s5-penalty', 7.5, 4.2, { name: '', color: WARM, size: 5, animate: false });
          S.addText('s5-penalty-lab', 7.8, 3.8, '点球点', { color: WARM, size: 12 });
          S.addSegment('s5-penalty-dist', [7.5, 4.2], [7.5, 6.5], { color: WARM, width: 3, dash: 0 });
          S.addAngle('s5-goal-rt', [7.5, 6.5 - 0.7], [7.5, 6.5], [7.5 + 0.7, 6.5],
            { radius: 0.7, color: WARM, ortho: true, opacity: 0.3 });
          S.addText('s5-goal-title', 5.6, 3.2, '③ 点球距离', { color: WARM, size: 14 });

          P.renderTable({
            head: ['应用场景', '数学原理'],
            rows: [
              ['测量河宽', '垂线段 = 最短距离'],
              ['设计最短通道', '居民点到道路的垂线段'],
              ['点球点到球门线', '垂足在球门线上，距离最短'],
            ],
          });

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
