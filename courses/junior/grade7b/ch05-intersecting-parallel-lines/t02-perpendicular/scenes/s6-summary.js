(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GRAY = '#90a4ae', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、课堂小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '本课知识小结：三个核心内容——垂直的定义、垂线的唯一性、垂线段最短。逐一回顾，打牢基础。',
        enter: function (anim) {
          P.renderTable({
            head: ['知识点', '核心内容', '记号/公式'],
            rows: [
              ['垂直定义', '两直线相交成直角，互相垂直', '$AB\\perp CD$，垂足 $O$'],
              ['垂线唯一性', '过一点有且只有一条直线垂直于已知直线', '—'],
              ['垂线段最短', '从直线外一点向直线引线段，垂线段最短', '$PA\\leq PQ$（Q 在 l 上）'],
              ['点到直线的距离', '垂线段的长度', '= 最短距离'],
            ],
          });

          P.renderCard('判断两直线垂直的方法：验证其中一个角 = 90° 即可', 'warm');

          return Promise.resolve();
        },
      },
      {
        narration: '实践活动：在纸上画一条直线 l 和直线外一点 P，用三角板从 P 作 l 的垂线。再在 l 上取几个点，分别连接 P 和这些点，用直尺测量长度，验证垂线段最短。',
        enter: function (anim) {
          var LY = -1.5;
          var PX = -1, PY = 4;
          var AX = PX; // 垂足

          // 画板展示实践操作示意图
          // 直线 l
          S.addSegment('s6-l', [-9, LY], [9, LY], { color: INK, width: 3, dash: 0 });
          S.addText('s6-labl', 8.6, LY + 0.5, 'l', { color: INK, size: 18 });

          // 外点 P
          S.dropPoint('s6-P', PX, PY, { name: '', color: WARM, size: 5, animate: anim });
          S.addText('s6-labP', PX + 0.3, PY + 0.5, 'P', { color: WARM, size: 16 });

          // 垂线段 PA（红色粗线）
          S.addSegment('s6-PA', [PX, PY], [AX, LY], { color: WARM, width: 4, dash: 0 });
          S.dropPoint('s6-A', AX, LY, { name: '', color: WARM, size: 4, animate: false });
          S.addText('s6-labA', AX + 0.3, LY - 0.7, 'A', { color: WARM, size: 16 });
          S.addAngle('s6-rt',
            [AX, LY + 1.2],
            [AX, LY],
            [AX + 1.2, LY],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.3 }
          );
          S.addText('s6-PA-len', 0.2, 1.5, 'PA = 5.5', { color: WARM, size: 15 });

          // 三条斜线段
          var sidePoints = [[-5, LY], [3, LY], [6, LY]];
          var labels = ['B', 'C', 'D'];
          var lengths = ['PB ≈ 7.4', 'PC ≈ 6.4', 'PD ≈ 9.0'];
          var labelX = [-3.5, 1.5, 2.8];
          var labelY = [2.2, 3.0, 1.8];

          sidePoints.forEach(function (pt, i) {
            S.addSegment('s6-P' + labels[i], [PX, PY], pt, { color: GRAY, width: 2, dash: 2 });
            S.dropPoint('s6-' + labels[i], pt[0], pt[1], { name: '', color: GRAY, size: 3, animate: false });
            S.addText('s6-lab' + labels[i], pt[0] + 0.2, LY - 0.7, labels[i], { color: GRAY, size: 15 });
            S.addText('s6-len' + labels[i], labelX[i], labelY[i], lengths[i], { color: GRAY, size: 13 });
          });

          // 最短标注
          S.addText('s6-shortest', -3, -4.5, '▲ PA 最短，PA 就是 P 到 l 的距离', { color: WARM, size: 16 });

          P.renderCard('实践活动：画直线 l 和外点 P，作垂线并量各线段长度<br>结论：<b>垂线段最短</b>，即 PA = P 到 l 的距离', 'warm');

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
