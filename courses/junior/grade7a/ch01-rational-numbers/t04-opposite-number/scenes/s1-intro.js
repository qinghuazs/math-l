// s1-intro.js  环节一：背靠背出发的机器人（3步）
// 数学验算：原点出发，向右走5格 → +5；向左走5格 → -5
// 数轴 bbox: [-8, 4, 8, -4]，原点 x=0，单位长度 1 画面单位
// 机器人 R 从 (0, 1) 向右动画到 (5, 1)；机器人 L 从 (0, 1) 向左动画到 (-5, 1)
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数
  var AXIS_Y = 0;
  // 闭包变量（每次 setup 重置）
  var roboR = null;
  var roboL = null;

  var scene = {
    id: 's1',
    title: '一、背靠背出发的机器人',
    bbox: [-8, 4, 8, -4],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      roboR = null;
      roboL = null;
    },
    steps: [
      // Step 1：画数轴 + 原点两个机器人
      {
        narration: '同学们，数轴上的原点站着两个机器人。一个面朝右方，一个面朝左方——它们背靠背！接下来它们要同时出发，各走 5 格，看看会停在哪里。',
        enter: function (anim) {
          // 数轴主线
          S.addSegment('s1-axis', [-7.5, AXIS_Y], [7.5, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          // 箭头右
          S.addSegment('s1-arr-r1', [7.3, 0.15], [7.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-arr-r2', [7.3, -0.15], [7.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          // 箭头左
          S.addSegment('s1-arr-l1', [-7.3, 0.15], [-7.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-arr-l2', [-7.3, -0.15], [-7.6, AXIS_Y],
            { color: INK, width: 2, dash: 0 });

          // 刻度 -6 ~ 6
          for (var n = -6; n <= 6; n++) {
            S.addSegment('s1-tick-' + (n + 10), [n, AXIS_Y - 0.2], [n, AXIS_Y + 0.2],
              { color: INK, width: 2, dash: 0 });
            if (n !== 0) {
              S.addText('s1-tlab-' + (n + 10), n - 0.12, AXIS_Y - 0.55, '' + n,
                { color: INK, size: 13 });
            }
          }
          // 原点标注
          S.addText('s1-origin', 0 - 0.12, AXIS_Y - 0.55, 'O',
            { color: INK, size: 14 });

          // 两个机器人（actor）停在原点，稍高于数轴
          roboR = S.actor('s1-roboR', 0, 1.2, '▶', { color: COOL, size: 28 });
          roboL = S.actor('s1-roboL', 0, 1.2, '◀', { color: WARM, size: 28 });

          P.renderCard(
            '<b>情境导入</b><br>' +
            '两个机器人在原点 <b>O</b> 背靠背站立：<br>' +
            '▶（蓝色）面朝右方，◀（橙色）面朝左方。<br>' +
            '它们即将同时出发，各走 <b>5 格</b>……'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：双向各走 5 格动画，落点 +5 与 -5
      {
        narration: '出发！蓝色机器人向右走 5 格，到达正 5；橙色机器人向左走 5 格，到达负 5。两个落点分别是 +5 和 -5！',
        enter: function (anim) {
          if (!anim) {
            // 快放：直接移到终点
            roboR = S.actor('s1-roboR', 5, 1.2, '▶', { color: COOL, size: 28 });
            roboL = S.actor('s1-roboL', -5, 1.2, '◀', { color: WARM, size: 28 });
            // 落点标记
            S.addSegment('s1-pt-r-tick', [5, AXIS_Y - 0.25], [5, AXIS_Y + 0.25],
              { color: COOL, width: 3, dash: 0 });
            S.addText('s1-pt-r-lab', 5 - 0.35, AXIS_Y - 0.65, '+5',
              { color: COOL, size: 15 });
            S.addSegment('s1-pt-l-tick', [-5, AXIS_Y - 0.25], [-5, AXIS_Y + 0.25],
              { color: WARM, width: 3, dash: 0 });
            S.addText('s1-pt-l-lab', -5 - 0.35, AXIS_Y - 0.65, '-5',
              { color: WARM, size: 15 });
            P.renderCard(
              '蓝色机器人到达 <b>+5</b>，橙色机器人到达 <b>-5</b>。<br>' +
              '落点：$+5$ 和 $-5$。'
            );
            return Promise.resolve();
          }

          // 动画路径：两个 actor 同时移动
          var moveR = roboR.moveTo(5, 1.2, 900);
          var moveL = roboL.moveTo(-5, 1.2, 900);
          return Promise.all([moveR, moveL]).then(function () {
            // 落点刻度标注
            S.addSegment('s1-pt-r-tick', [5, AXIS_Y - 0.25], [5, AXIS_Y + 0.25],
              { color: COOL, width: 3, dash: 0 });
            S.addText('s1-pt-r-lab', 5 - 0.35, AXIS_Y - 0.65, '+5',
              { color: COOL, size: 15 });
            S.addSegment('s1-pt-l-tick', [-5, AXIS_Y - 0.25], [-5, AXIS_Y + 0.25],
              { color: WARM, width: 3, dash: 0 });
            S.addText('s1-pt-l-lab', -5 - 0.35, AXIS_Y - 0.65, '-5',
              { color: WARM, size: 15 });
            P.renderCard(
              '蓝色机器人到达 <b>+5</b>，橙色机器人到达 <b>-5</b>。<br>' +
              '落点：$+5$ 和 $-5$。'
            );
            return delay(300);
          });
        },
      },

      // Step 3：追问共同点与不同点，呼应上节课 1.5 / -1.5 伏笔
      {
        narration: '现在追问：这两个数 +5 和 -5，有什么共同点？又有什么不同点？——数字部分都是 5，相同！但符号一正一负，不同！上节课我们标过 1.5 和 -1.5 这对点，还记得它们有什么特别吗？今天我们要给这种关系取一个正式的名字——相反数！',
        enter: function (anim) {
          // 双向等距线段高亮（原点到 +5 和 -5）
          S.addSegment('s1-dist-r', [0, 0.55], [5, 0.55],
            { color: COOL, width: 4, dash: 0 });
          S.addText('s1-dist-r-lab', 2.3, 0.9, '5 格', { color: COOL, size: 14 });
          S.addSegment('s1-dist-l', [-5, 0.55], [0, 0.55],
            { color: WARM, width: 4, dash: 0 });
          S.addText('s1-dist-l-lab', -3.2, 0.9, '5 格', { color: WARM, size: 14 });

          P.renderCard(
            '<b>追问：两个数有什么共同点和不同点？</b><br>' +
            '共同：数字部分都是 <b>5</b>，都离原点 <b>5 格</b>。<br>' +
            '不同：一正一负，符号相反。<br>' +
            '上节课的 $1.5$ 与 $-1.5$ 也是这样的一对！<br>' +
            '今天我们给它取个名字——<b>互为相反数</b>。',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
