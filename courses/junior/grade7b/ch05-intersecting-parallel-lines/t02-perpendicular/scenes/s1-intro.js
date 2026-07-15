(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var CARD_I = 'background:#eceff1;border:2px solid #90a4ae;border-radius:8px;padding:6px 14px;';
  var CARD_W = 'background:#fbe9e7;border:2px solid #e64a19;border-radius:8px;padding:6px 14px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、情境导入',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '生活中随处可见两条直线相交的情形。请看——旗杆笔直地立在地面上；十字路口，两条道路相互交叉。这些相交的直线，有什么特殊之处呢？',
        enter: function (anim) {
          // 场景1：旗杆与地面（左半区）
          // 地面：水平线
          S.addSegment('s1-ground', [-8, -3], [0, -3], { color: INK, width: 4, dash: 0 });
          // 旗杆：垂直线段
          S.addSegment('s1-pole', [-4, -3], [-4, 4], { color: WARM, width: 5, dash: 0 });
          // 旗帜三角形
          S.addPolygon('s1-flag', [[-4, 4], [-4, 2.6], [-2.2, 3.3]], { color: COOL, opacity: 0.85 });
          // 标注
          S.addText('s1-lb-ground', -6.5, -3.8, '地面', { color: INK, size: 15 });
          S.addText('s1-lb-pole', -3.5, 0.5, '旗杆', { color: WARM, size: 15 });

          // 场景2：十字路口（右半区）
          // 竖向道路
          S.addSegment('s1-road-v', [5, 5], [5, -5.5], { color: '#78909c', width: 18, dash: 0 });
          // 横向道路
          S.addSegment('s1-road-h', [1, -1], [9, -1], { color: '#78909c', width: 18, dash: 0 });
          // 道路中心线
          S.addSegment('s1-mid-v', [5, 5], [5, -5.5], { color: '#f9a825', width: 2, dash: 2 });
          S.addSegment('s1-mid-h', [1, -1], [9, -1], { color: '#f9a825', width: 2, dash: 2 });
          // 标注"十字路口"
          S.addText('s1-lb-cross', 6.2, -4.8, '十字路口', { color: INK, size: 14 });

          P.renderCard('旗杆与地面垂直，十字路口两条路互相交叉——这些直线的<b>位置关系</b>有什么特殊？');

          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '观察这两幅图，大家有没有发现：旗杆和地面形成了一个直角！十字路口的两条路也是互相垂直的！这种特殊的相交关系，就是今天我们要研究的"垂直"。',
        enter: function (anim) {
          // 在旗杆与地面的交点处添加直角标记
          S.addAngle('s1-rt-pole',
            [-4, -3 + 0.8],  // p1：旗杆上方点
            [-4, -3],         // 顶点：交点
            [-4 + 0.8, -3],   // p2：地面右方点
            { radius: 0.8, color: WARM, ortho: true, opacity: 0.25 }
          );
          // 在十字路口添加直角标记
          S.addAngle('s1-rt-cross',
            [5, -1 + 0.8],
            [5, -1],
            [5 + 0.8, -1],
            { radius: 0.8, color: COOL, ortho: true, opacity: 0.25 }
          );

          P.renderCard('旗杆 ⊥ 地面，两条路互相 ⊥<br>它们相交所成的角，恰好是<b>直角（90°）</b>！', 'warm');

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
