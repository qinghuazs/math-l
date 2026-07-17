// s1-intro.js  环节一：只关心跑多远（3步）
// 数学验算：小狗甲向右跑3格到+3，小狗乙向左跑3格到-3，位置不同但距离相同=3
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数：bbox [-5.5, 3, 5.5, -2]，数轴在 y=0
  // 单位长度 = 1 画面单位（bbox宽11，数轴从-4到4）
  var AXIS_Y = 0;

  // 闭包变量（setup重置）
  var dogA, dogB;

  var scene = {
    id: 's1',
    title: '一、只关心跑多远',
    bbox: [-5.5, 3, 5.5, -2],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      dogA = null;
      dogB = null;
    },
    steps: [
      // Step 1：画数轴，两只小狗从原点出发（动画双向跑到 ±3）
      {
        narration: '我们先来做个小实验。数轴上有两只小狗，都从原点出发——小狗甲向右跑3格，小狗乙向左跑3格。看，它们同时出发，同速度、同时间，往两个相反方向跑去！',
        enter: function (anim) {
          // 数轴主线
          S.addSegment('s1-axis', [-4.8, AXIS_Y], [4.8, AXIS_Y], { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s1-arr-r1', [4.6, AXIS_Y + 0.15], [4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s1-arr-r2', [4.6, AXIS_Y - 0.15], [4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s1-arr-l1', [-4.6, AXIS_Y + 0.15], [-4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s1-arr-l2', [-4.6, AXIS_Y - 0.15], [-4.8, AXIS_Y], { color: INK, width: 2 });

          // 刻度 -4 到 4
          for (var n = -4; n <= 4; n++) {
            S.addSegment('s1-tick-' + (n + 4), [n, AXIS_Y - 0.15], [n, AXIS_Y + 0.15], { color: INK, width: 2 });
            if (n !== 0) {
              S.addText('s1-tlab-' + (n + 4), n - 0.08, AXIS_Y - 0.42, '' + n, { color: INK, size: 14 });
            }
          }
          S.addText('s1-zero', -0.08, AXIS_Y - 0.42, '0', { color: INK, size: 14 });
          // 原点刻度加粗竖线
          S.addSegment('s1-orig', [0, AXIS_Y - 0.22], [0, AXIS_Y + 0.22], { color: TEAL, width: 3 });

          // 两只小狗从原点出发
          dogA = S.actor('s1-dogA', 0, 0.65, '🐶', { size: 22 });
          dogB = S.actor('s1-dogB', 0, 0.65, '🐶', { size: 22 });

          if (!anim) {
            // 快放：直接到最终位置
            dogA.moveTo(3, 0.65, 0);
            dogB.moveTo(-3, 0.65, 0);
            P.renderCard(
              '<b>两只小狗从原点出发</b><br>' +
              '小狗甲向右跑3格，落在 $+3$；<br>' +
              '小狗乙向左跑3格，落在 $-3$。'
            );
            return null;
          }

          P.renderCard(
            '<b>两只小狗从原点出发！</b><br>' +
            '同速度、同时间，方向相反——<br>' +
            '看看它们各跑到哪里。'
          );

          // 动画：同步双向跑动
          return delay(300).then(function () {
            return Promise.all([
              dogA.moveTo(3, 0.65, 1200),
              dogB.moveTo(-3, 0.65, 1200)
            ]);
          }).then(function () {
            P.renderCard(
              '<b>两只小狗从原点出发</b><br>' +
              '小狗甲向右跑3格，落在 $+3$；<br>' +
              '小狗乙向左跑3格，落在 $-3$。'
            );
            return delay(400);
          });
        }
      },

      // Step 2：位置不同，路程一样——引出"到原点的距离"
      {
        narration: '好，停！甲的位置是正3，乙的位置是负3——位置数不一样。但是，它们跑的路程，谁更多？——一样多，都是3格！这说明路程这件事，只跟它们离出发点多远有关，跟方向没关系。数学上把"到原点的距离"这个量，叫什么名字呢？',
        enter: function (anim) {
          // 标注落点
          S.addSegment('s1-tick-pos3', [3, AXIS_Y - 0.22], [3, AXIS_Y + 0.22], { color: WARM, width: 3 });
          S.addText('s1-lab-pos3', 2.7, AXIS_Y - 0.55, '+3', { color: WARM, size: 15 });
          S.addSegment('s1-tick-neg3', [-3, AXIS_Y - 0.22], [-3, AXIS_Y + 0.22], { color: COOL, width: 3 });
          S.addText('s1-lab-neg3', -3.3, AXIS_Y - 0.55, '-3', { color: COOL, size: 15 });

          // 距离线段高亮（双向等长）
          S.addSegment('s1-dist-r', [0, AXIS_Y + 0.35], [3, AXIS_Y + 0.35], { color: WARM, width: 4, dash: 0 });
          S.addSegment('s1-dist-l', [-3, AXIS_Y + 0.35], [0, AXIS_Y + 0.35], { color: COOL, width: 4, dash: 0 });
          S.addText('s1-dist-r-lab', 1.3, AXIS_Y + 0.65, '路程 = 3', { color: WARM, size: 14 });
          S.addText('s1-dist-l-lab', -2.2, AXIS_Y + 0.65, '路程 = 3', { color: COOL, size: 14 });

          P.renderCard(
            '甲的位置：$+3$，乙的位置：$-3$<br>' +
            '位置数<b>不同</b>，但路程<b>一样</b>，都是 3 格。<br>' +
            '路程只跟"离原点多远"有关，和方向无关。'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 3：正式提名"绝对值"，呼应上节课伏笔
      {
        narration: '上节课讲相反数时，老师提过一句：互为相反数的两个数到原点距离相等——当时留了个悬念。现在这个"到原点的距离"，数学上正式给它起了个名字，叫做"绝对值"。今天这节课，我们就把绝对值彻底搞明白，还要用它来比较所有有理数的大小！',
        enter: function (anim) {
          // 大标题卡出现
          S.addText('s1-name', 0, -1.3,
            '<b>到原点的距离 = 绝对值</b>',
            { color: TEAL, size: 20 });
          S.addText('s1-link', 0, -1.75,
            '（呼应上节课伏笔！）',
            { color: GRAY, size: 14 });

          P.renderCard(
            '<b>正式命名：绝对值</b><br>' +
            '数轴上表示数 $a$ 的点与原点的距离，<br>' +
            '叫作 $a$ 的<b>绝对值</b>，记作 $|a|$。<br>' +
            '上节课伏笔到此闭环！',
            'teal'
          );
          return anim ? delay(300) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
