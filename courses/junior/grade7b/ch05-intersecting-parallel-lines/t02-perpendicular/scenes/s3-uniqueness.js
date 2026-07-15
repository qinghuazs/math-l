(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 将角度（度）转换为弧度
  function toRad(deg) { return deg * Math.PI / 180; }

  var scene = {
    id: 's3',
    title: '三、垂线的唯一性',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '过一条直线上的一点，能画几条与该直线垂直的直线呢？我们先看"点在直线上"的情形。直线 l 上有一点 A，试着过 A 画出与 l 垂直的直线。',
        enter: function (anim) {
          // 已知直线 l（水平）
          S.addSegment('s3-l', [-8.5, 0], [8.5, 0], { color: INK, width: 3, dash: 0 });
          S.addText('s3-labl', 8.0, 0.5, 'l', { color: INK, size: 18 });

          // 点 A 在直线上
          S.dropPoint('s3-A', -2, 0, { name: '', color: INK, size: 4, animate: anim });
          S.addText('s3-labA', -2, -0.7, 'A', { color: INK, size: 16 });

          // 候选线（扇形分布，灰色虚线）：多条过 A 的直线，不同倾斜角度
          var angles = [30, 55, 80, 115, 145];
          var LEN = 5;
          angles.forEach(function (deg, i) {
            var rad = toRad(deg);
            var dx = LEN * Math.cos(rad);
            var dy = LEN * Math.sin(rad);
            S.addSegment('s3-cand-' + i,
              [-2 - dx, -dy], [-2 + dx, dy],
              { color: GRAY, width: 2, dash: 3 }
            );
          });

          P.renderCard('过直线 l 上的点 A，尝试画多条穿过 A 的直线——哪条才垂直于 l？');

          return anim ? delay(500) : Promise.resolve();
        },
      },
      {
        narration: '这么多候选线，只有一条是 90°。把非垂直的灰线淡化，唯一的垂线亮起来——过直线上的一点，有且只有一条直线与已知直线垂直！',
        enter: function (anim) {
          // 覆盖候选线为更淡的灰色（重新绘制，淡化）
          var angles = [30, 55, 115, 145];
          var LEN = 5;
          angles.forEach(function (deg, i) {
            var rad = toRad(deg);
            var dx = LEN * Math.cos(rad);
            var dy = LEN * Math.sin(rad);
            S.addSegment('s3-cand-' + i,
              [-2 - dx, -dy], [-2 + dx, dy],
              { color: GRAY, width: 1, dash: 3 }
            );
          });

          // 唯一垂线（90°，竖直）高亮红色
          S.addSegment('s3-perp-line', [-2, -5.5], [-2, 5.5], { color: WARM, width: 4, dash: 0 });

          // 直角标记
          S.addAngle('s3-rt-on',
            [-2, 1.2],
            [-2, 0],
            [-2 + 1.2, 0],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.3 }
          );

          S.addText('s3-unique-on', -2, 6.0, '唯一垂线', { color: WARM, size: 16 });

          P.renderCard('<b>情形一：点在直线上</b><br>过 l 上的点 A，有且只有一条直线 ⊥ l', 'warm');

          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '再看"点在直线外"的情形。直线 l 外有一点 P，同样地，过 P 可以画很多条直线……但与 l 垂直的，仍然只有一条！',
        enter: function (anim) {
          // 重置为点在线外的情形
          // 直线 l 保留（已在画板），外点 P
          S.dropPoint('s3-P', 3, 4, { name: '', color: COOL, size: 5, animate: anim });
          S.addText('s3-labP', 3.3, 4.4, 'P', { color: COOL, size: 16 });

          // 候选线（过 P 画各种斜率的线，与 l 交于不同点）
          var configs = [
            [-7, 0], [-4, 0], [-1, 0], [3, 0], [6, 0]
          ];
          configs.forEach(function (pt, i) {
            S.addSegment('s3-ext-cand-' + i, [3, 4], pt, { color: GRAY, width: 2, dash: 3 });
          });

          P.renderCard('<b>情形二：点在直线外</b><br>过 l 外的点 P，同样有且只有一条直线 ⊥ l', 'cool');

          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '唯一的垂线是从 P 出发，垂直落到直线 l 上的那一条。淡化其他候选线，垂线亮红，直角标记出现——基本事实：过一点有且只有一条直线与已知直线垂直。',
        enter: function (anim) {
          // 淡化其他候选线
          var configs = [
            [-7, 0], [-4, 0], [-1, 0], [6, 0]
          ];
          configs.forEach(function (pt, i) {
            S.addSegment('s3-ext-cand-' + i, [3, 4], pt, { color: GRAY, width: 1, dash: 3 });
          });

          // 唯一垂线：从 P(3,4) 垂直到 l（l是 y=0，垂足即 (3,0)）
          S.addSegment('s3-ext-perp', [3, 4], [3, 0], { color: WARM, width: 4, dash: 0 });
          // 垂足
          S.dropPoint('s3-foot-ext', 3, 0, { name: '', color: WARM, size: 4, animate: anim });
          S.addText('s3-lab-foot-ext', 3.3, -0.6, '垂足', { color: WARM, size: 14 });

          // 直角标记
          S.addAngle('s3-rt-ext',
            [3, 1.2],
            [3, 0],
            [3 + 1.2, 0],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.3 }
          );

          P.renderCard('基本事实：在同一平面内，<br>过一点<b>有且只有一条</b>直线与已知直线垂直', 'warm');

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
