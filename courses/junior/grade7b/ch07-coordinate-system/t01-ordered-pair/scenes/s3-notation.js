(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、记法与约定',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '有序数对的<b>记法</b>有三个关键：①必须写在<b>小括号</b>内；②两个数之间用<b>逗号</b>隔开；③顺序不能颠倒。来记住这三点！',
        enter: function (anim) {
          S.addText('s3-title', 0, 6.5, '有序数对的记法', { color: INK, size: 24, anchorX: 'middle' });
          S.addText('s3-formula', 0, 4.8, '$(a, b)$', { color: WARM, size: 36, anchorX: 'middle' });
          S.addText('s3-r1', -7.5, 3.2, '① 必须写在小括号内：$(a, b)$  不是 $a, b$', { color: INK, size: 16 });
          S.addText('s3-r2', -7.5, 2.0, '② 两个数之间用逗号隔开', { color: INK, size: 16 });
          S.addText('s3-r3', -7.5, 0.8, '③ 顺序不能颠倒：$(3,5) \\neq (5,3)$', { color: WARM, size: 16 });
          P.renderCard(
            '<b>易错提醒</b><br>' +
            '✗ $3, 5$（没有括号）<br>' +
            '✗ 把两个数随意交换位置<br>' +
            '✓ $(3, 5)$ ← 正确写法',
            'warm'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '有序数对在生活中无处不在！教室座位、国际象棋棋盘、电影院……都用两个有顺序的数来定位。来看几个例子。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s3-eg-title', 0, 6.0, '生活中的有序数对', { color: COOL, size: 22, anchorX: 'middle' });

          S.addPolygon('s3-card1', [[-9, 5.0], [-1, 5.0], [-1, 2.0], [-9, 2.0]], { color: '#e3f2fd', opacity: 0.8, borderColor: COOL, borderWidth: 1.5 });
          S.addText('s3-c1t', -8.7, 4.5, '教室座位', { color: COOL, size: 16 });
          S.addText('s3-c1d', -8.7, 3.7, '第2组第4位 → $(2, 4)$', { color: INK, size: 15 });
          S.addText('s3-c1d2', -8.7, 2.8, '约定：组在前，位在后', { color: INK, size: 14 });

          S.addPolygon('s3-card2', [[-0.5, 5.0], [8, 5.0], [8, 2.0], [-0.5, 2.0]], { color: '#e8f5e9', opacity: 0.8, borderColor: GREEN, borderWidth: 1.5 });
          S.addText('s3-c2t', -0.2, 4.5, '棋盘坐标', { color: GREEN, size: 16 });
          S.addText('s3-c2d', -0.2, 3.7, '第4列第2行 → $(4, 2)$', { color: INK, size: 15 });
          S.addText('s3-c2d2', -0.2, 2.8, '约定：列在前，行在后', { color: INK, size: 14 });

          S.addPolygon('s3-card3', [[-9, 1.5], [8, 1.5], [8, -1.0], [-9, -1.0]], { color: '#fff8e1', opacity: 0.8, borderColor: AMBER, borderWidth: 1.5 });
          S.addText('s3-c3t', -8.7, 1.0, '电影院', { color: AMBER, size: 16 });
          S.addText('s3-c3d', -8.7, 0.2, '第3排第5号 → $(3, 5)$', { color: INK, size: 15 });
          S.addText('s3-c3d2', -8.7, -0.7, '约定：排在前，号在后', { color: INK, size: 14 });

          P.renderCard('有序数对可用于各种定位场景，<br>关键是<b>提前约定</b>谁在前、谁在后。', 'cool');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '这里有一个重要原则：使用有序数对之前，<b>必须提前约定</b>两个数各代表什么。不同的约定会产生不同的有序数对，所以约定一旦确定，就必须统一遵守。',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s3-warn-t', 0, 6.0, '约定的重要性', { color: WARM, size: 22, anchorX: 'middle' });
          S.addText('s3-same', -7.5, 4.5, '同一个座位（第3排5号）：', { color: INK, size: 17 });
          S.addText('s3-cv1', -7.5, 3.3, '约定"排在前、号在后" → $(3, 5)$', { color: COOL, size: 17 });
          S.addText('s3-cv2', -7.5, 2.1, '约定"号在前、排在后" → $(5, 3)$', { color: WARM, size: 17 });
          S.addText('s3-concl', -7.5, 0.5, '→ 约定不同，同一位置对应不同的有序数对！', { color: GREEN, size: 16 });
          P.renderCard(
            '<b>关键结论</b><br>' +
            '① 有序数对必须有约定才有意义<br>' +
            '② 约定统一后，每个位置对应唯一的有序数对<br>' +
            '③ 数学中会用坐标系来给出统一约定',
            'cool', 'flipInX'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
