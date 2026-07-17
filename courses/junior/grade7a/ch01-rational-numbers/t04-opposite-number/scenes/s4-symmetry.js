// s4-symmetry.js  环节四：关于原点的对称舞蹈（3步）
// 数学验算：
//   1.5 在数轴正半轴，-1.5 在数轴负半轴，两者到原点距离均为 1.5
//   翻折动画：1.5 沿原点翻折后重合于 -1.5
//   追问：原点右侧 4.5 处的数的相反数 = -4.5（原点左侧 4.5 处）
// 数轴 bbox: [-7, 3.5, 7, -3]，y=0 为数轴，单位=1 画面单位
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var AXIS_Y = 0;

  // 闭包变量
  var moverActor = null;

  var scene = {
    id: 's4',
    title: '四、关于原点的对称舞蹈',
    bbox: [-7, 3.5, 7, -3],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      moverActor = null;
    },
    steps: [
      // Step 1：数轴标 1.5 与 -1.5，红色距离线段双向等长高亮
      {
        narration: '我们呼应上节课：在数轴上标出 1.5 和 -1.5 这两个点。用红色标注原点到这两点的距离——两段距离完全相等，都是 1.5 个单位！',
        enter: function (anim) {
          // 数轴
          S.addSegment('s4-axis', [-6.5, AXIS_Y], [6.5, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s4-arr-r1', [6.3, 0.15], [6.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr-r2', [6.3, -0.15], [6.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr-l1', [-6.3, 0.15], [-6.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr-l2', [-6.3, -0.15], [-6.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });

          // 刻度 -5 ~ 5
          for (var n = -5; n <= 5; n++) {
            S.addSegment('s4-tick-' + (n + 10), [n, -0.2], [n, 0.2],
              { color: INK, width: 2, dash: 0 });
            if (n !== 0) {
              S.addText('s4-tlab-' + (n + 10), n - 0.12, -0.55, '' + n,
                { color: INK, size: 13 });
            }
          }
          S.addText('s4-origin', -0.12, -0.55, 'O', { color: INK, size: 14 });

          // 1.5 与 -1.5 点标注
          S.dropPoint('s4-pt-pos', 1.5, AXIS_Y, { color: COOL, size: 4 });
          S.addText('s4-lab-pos', 1.5 - 0.3, -0.65, '1.5', { color: COOL, size: 14 });
          S.dropPoint('s4-pt-neg', -1.5, AXIS_Y, { color: WARM, size: 4 });
          S.addText('s4-lab-neg', -1.5 - 0.45, -0.65, '-1.5', { color: WARM, size: 14 });

          // 红色距离线段
          S.addSegment('s4-dist-pos', [0, 0.55], [1.5, 0.55],
            { color: RED, width: 5, dash: 0 });
          S.addText('s4-dist-pos-lab', 0.6, 0.9, '1.5', { color: RED, size: 14 });
          S.addSegment('s4-dist-neg', [-1.5, 0.55], [0, 0.55],
            { color: RED, width: 5, dash: 0 });
          S.addText('s4-dist-neg-lab', -1.1, 0.9, '1.5', { color: RED, size: 14 });

          P.renderCard(
            '<b>几何意义：等距对称</b><br>' +
            '数轴上：$1.5$ 在原点右侧，$-1.5$ 在原点左侧。<br>' +
            '原点到 $1.5$ 的距离 $= 1.5$<br>' +
            '原点到 $-1.5$ 的距离 $= 1.5$<br>' +
            '<b>两段距离完全相等！</b>'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：翻折动画（1.5 点沿直线滑动到 -1.5 处重合）
      {
        narration: '现在来一个翻折动画！把右侧的 1.5 沿原点向左平移，它会滑过来……恰好和 -1.5 重合！这就叫关于原点对称。互为相反数的两个数，在数轴上关于原点对称，到原点的距离相等。',
        enter: function (anim) {
          // 清场上一步距离线段（防叠印）
          S.remove('s4-dist-pos'); S.remove('s4-dist-pos-lab');
          S.remove('s4-dist-neg'); S.remove('s4-dist-neg-lab');

          if (!anim) {
            // 快放：直接显示翻折后的状态，mover 停在 -1.5
            S.remove('s4-pt-pos'); S.remove('s4-lab-pos');
            // 显示一个临时点表示重合
            S.dropPoint('s4-mover-end', -1.5, AXIS_Y, { color: GREEN, size: 6 });
            S.addText('s4-mover-lab', -1.5 - 0.45, -1.1, '重合！', { color: GREEN, size: 13 });
            // 结论
            S.actor('s4-concl-text', 0, 1.8,
              '关于原点对称，到原点距离相等',
              { color: TEAL, size: 16 });
            P.renderCard(
              '<b>翻折 → 重合！</b><br>' +
              '$1.5$ 关于原点翻折后，恰好与 $-1.5$ 重合。<br>' +
              '互为相反数的两个数在数轴上<b>关于原点对称</b>，<br>' +
              '到原点的距离相等。'
            );
            return Promise.resolve();
          }

          // 动画：用 actor 从 1.5 滑到 -1.5
          // 先移除静态的 1.5 点，换成 actor 做动画
          S.remove('s4-pt-pos'); S.remove('s4-lab-pos');
          moverActor = S.actor('s4-mover', 1.5, 0.0, '●', { color: GREEN, size: 18 });

          return moverActor.moveTo(-1.5, 0.0, 1200).then(function () {
            // 到达 -1.5 后脉冲
            S.addText('s4-mover-lab', -1.5 - 0.45, -1.1, '重合！', { color: GREEN, size: 13 });
            return delay(200);
          }).then(function () {
            S.actor('s4-concl-text', 0, 1.8,
              '关于原点对称，到原点距离相等',
              { color: TEAL, size: 16 });
            P.renderCard(
              '<b>翻折 → 重合！</b><br>' +
              '$1.5$ 关于原点翻折后，恰好与 $-1.5$ 重合。<br>' +
              '互为相反数的两个数在数轴上<b>关于原点对称</b>，<br>' +
              '到原点的距离相等。',
              'teal'
            );
            return delay(300);
          });
        },
      },

      // Step 3：追问：原点右侧 4.5 处的数的相反数在哪
      {
        narration: '来追问！如果一个数在数轴上位于原点右侧 4.5 个单位处，也就是 +4.5，它的相反数在哪里？在原点左侧 4.5 个单位处，即 -4.5。利用"关于原点对称"可以直接找到！',
        enter: function (anim) {
          // 清场动画残留
          S.remove('s4-mover'); S.remove('s4-mover-end'); S.remove('s4-mover-lab');
          S.remove('s4-concl-text');

          // 标出 +4.5 与 -4.5
          S.dropPoint('s4-pt-45', 4.5, AXIS_Y, { color: COOL, size: 5 });
          S.addText('s4-lab-45', 4.5 - 0.35, -0.65, '+4.5', { color: COOL, size: 14 });

          S.dropPoint('s4-pt-45n', -4.5, AXIS_Y, { color: WARM, size: 5 });
          S.addText('s4-lab-45n', -4.5 - 0.55, -0.65, '-4.5', { color: WARM, size: 14 });

          // 等距线段
          S.addSegment('s4-dist2-r', [0, 0.55], [4.5, 0.55],
            { color: RED, width: 4, dash: 0 });
          S.addText('s4-dist2-r-lab', 2.0, 0.9, '4.5', { color: RED, size: 14 });
          S.addSegment('s4-dist2-l', [-4.5, 0.55], [0, 0.55],
            { color: RED, width: 4, dash: 0 });
          S.addText('s4-dist2-l-lab', -2.7, 0.9, '4.5', { color: RED, size: 14 });

          // 结论
          S.actor('s4-ans', 0, 2.5,
            '$+4.5$ 的相反数 $= -4.5$（原点左侧 $4.5$ 处）',
            { color: GREEN, size: 15 });

          P.renderCard(
            '<b>追问答案</b><br>' +
            '原点右侧 $4.5$ 个单位处的数是 $+4.5$，<br>' +
            '它的相反数在原点<b>左侧</b> $4.5$ 个单位处，即 $-4.5$。<br>' +
            '<b>几何意义：关于原点对称，到原点距离相等。</b>',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
