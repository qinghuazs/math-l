// s1-fold.js  一、折纸挑战（3步）
// 数学验算：
//   对折1次=2层，2次=4层，3次=8层，4次=16层
//   对折n次=2^n层，厚度=0.1×2^n 毫米
//   折20次：2^20=1048576层，0.1×1048576=104857.6mm≈104.9m
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 闭包变量（setup 重置）
  var barsBuilt = false;

  var scene = {
    id: 's1',
    title: '一、折纸挑战',
    bbox: [-1, 10, 13, -1],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      barsBuilt = false;
    },
    steps: [
      // Step 1：引入折纸 + 层数翻倍动画（addBar 依次生长）
      {
        narration: '一张纸大约 0.1 毫米厚，差不多是头发丝的粗细。如果我们把它不断对折，层数有什么变化？对折 1 次变 2 层，2 次变 4 层，3 次 8 层，4 次 16 层……我们来看看这个翻倍的过程。',
        enter: function (anim) {
          // 坐标轴标签
          S.actor('s1-title', 6, 9.2, '<b>对折次数 vs 纸张层数</b>', { color: COOL, size: 20 });

          // x 轴底线
          S.addSegment('s1-xaxis', [0, 0], [12, 0], { color: INK, width: 2 });

          // 四根柱子参数
          var cols = [
            { id: 's1-bar1', cx: 1.5, label: '1次', layers: 2,  color: TEAL },
            { id: 's1-bar2', cx: 3.5, label: '2次', layers: 4,  color: TEAL },
            { id: 's1-bar3', cx: 5.5, label: '3次', layers: 8,  color: COOL },
            { id: 's1-bar4', cx: 7.5, label: '4次', layers: 16, color: WARM }
          ];

          var scale = 0.4; // 每层 0.4 单位高度

          if (!anim) {
            // 快放：直接摆终态
            for (var i = 0; i < cols.length; i++) {
              var c = cols[i];
              var h = c.layers * scale;
              S.addBar(c.id, c.cx, 1.2, h, { color: c.color, opacity: 0.85 });
              S.actor(c.id + '-xlabel', c.cx, -0.55, c.label, { color: INK, size: 14 });
              S.actor(c.id + '-hlabel', c.cx, h + 0.3, '' + c.layers + ' 层', { color: c.color, size: 14, bold: true });
            }
            P.renderCard(
              '<b>层数翻倍</b><br>' +
              '对折 $1$ 次：$2$ 层<br>' +
              '对折 $2$ 次：$4$ 层<br>' +
              '对折 $3$ 次：$8$ 层<br>' +
              '对折 $4$ 次：$16$ 层<br>' +
              '每折一次，层数 <b>×2</b>！'
            );
            barsBuilt = true;
            return Promise.resolve();
          }

          // 动画：逐柱生长
          var idx = 0;
          function nextBar() {
            if (idx >= cols.length) {
              P.renderCard(
                '<b>层数翻倍</b><br>' +
                '对折 $1$ 次：$2$ 层<br>' +
                '对折 $2$ 次：$4$ 层<br>' +
                '对折 $3$ 次：$8$ 层<br>' +
                '对折 $4$ 次：$16$ 层<br>' +
                '每折一次，层数 <b>×2</b>！'
              );
              barsBuilt = true;
              return Promise.resolve();
            }
            var c = cols[idx];
            var h = c.layers * scale;
            var finalH = h;
            S.addBar(c.id, c.cx, 1.2, 0, { color: c.color, opacity: 0.85 });
            S.actor(c.id + '-xlabel', c.cx, -0.55, c.label, { color: INK, size: 14 });
            var result = S.animate({
              from: 0,
              to: finalH,
              duration: 400,
              onUpdate: function (v) {
                S.addBar(c.id, c.cx, 1.2, v, { color: c.color, opacity: 0.85 });
              }
            });
            idx++;
            return result.then(function () {
              S.actor(c.id + '-hlabel', c.cx, finalH + 0.3, '' + c.layers + ' 层', { color: c.color, size: 14, bold: true });
              return delay(150);
            }).then(nextBar);
          }
          return nextBar();
        },
      },

      // Step 2：猜测——折 20 次有多厚？
      {
        narration: '规律很清楚：每折一次层数乘以 2。那如果折 20 次呢？先别算，凭感觉猜一猜：1 厘米？1 米？还是更多？把你的猜测记在脑子里，我们等一会儿揭晓答案！',
        enter: function (anim) {
          S.remove('s1-bar1'); S.remove('s1-bar2'); S.remove('s1-bar3'); S.remove('s1-bar4');
          S.remove('s1-bar1-xlabel'); S.remove('s1-bar2-xlabel'); S.remove('s1-bar3-xlabel'); S.remove('s1-bar4-xlabel');
          S.remove('s1-bar1-hlabel'); S.remove('s1-bar2-hlabel'); S.remove('s1-bar3-hlabel'); S.remove('s1-bar4-hlabel');
          S.remove('s1-xaxis'); S.remove('s1-title');

          S.actor('s1-q-title', 6, 8.0, '<b>你的猜测是？</b>', { color: WARM, size: 22 });
          S.actor('s1-q-sub', 6, 6.5, '一张纸（0.1mm）对折 $20$ 次，厚度是？', { color: INK, size: 17 });
          S.actor('s1-c1', 3, 4.5, '1 厘米？', { color: GRAY, size: 18 });
          S.actor('s1-c2', 6, 4.5, '1 米？', { color: GRAY, size: 18 });
          S.actor('s1-c3', 9, 4.5, '更多？', { color: GRAY, size: 18 });
          S.actor('s1-hint', 6, 2.5, '先记下你的直觉……答案在最后一环节揭晓！', { color: TEAL, size: 15 });

          P.renderCard(
            '<b>凭感觉猜一猜</b><br>' +
            '对折 $20$ 次 = $20$ 个 $2$ 连乘：$2 \\times 2 \\times \\cdots \\times 2$<br>' +
            '这要写 $20$ 个 $2$……有没有更简洁的写法？<br>' +
            '猜完先不急——本节课结束后我们来揭晓！'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：规律归纳——引出乘方记法的需求
      {
        narration: '我们发现：折 n 次就是 n 个 2 连乘。但写 20 个 2 相乘太麻烦了！数学家发明了一种简洁记法——把 n 个相同因数连乘，用"乘方"来表示。这就是我们今天要学的新运算！',
        enter: function (anim) {
          S.remove('s1-q-title'); S.remove('s1-q-sub');
          S.remove('s1-c1'); S.remove('s1-c2'); S.remove('s1-c3'); S.remove('s1-hint');

          S.actor('s1-r-title', 6, 8.5, '<b>规律归纳</b>', { color: COOL, size: 21 });
          S.actor('s1-r1', 6, 7.0, '折 $1$ 次：$2 = 2^{1}$（1个2相乘）', { color: INK, size: 16 });
          S.actor('s1-r2', 6, 5.8, '折 $2$ 次：$2 \\times 2 = 2^{2}$（2个2相乘）', { color: INK, size: 16 });
          S.actor('s1-r3', 6, 4.6, '折 $3$ 次：$2 \\times 2 \\times 2 = 2^{3}$（3个2相乘）', { color: INK, size: 16 });
          S.actor('s1-r4', 6, 3.4, '折 $n$ 次：$\\underbrace{2 \\times 2 \\times \\cdots \\times 2}_{n} = 2^{n}$', { color: WARM, size: 17 });
          S.actor('s1-r5', 6, 1.8, '折 $20$ 次：写 $20$ 个 $2$ 相乘……有没有简洁记法？', { color: TEAL, size: 15 });

          P.renderCard(
            '<b>连乘太长——需要简记！</b><br>' +
            '折 $n$ 次 = $n$ 个 $2$ 连乘<br>' +
            '折 $20$ 次要写 $20$ 个 $2$——太繁琐了！<br>' +
            '数学家用 <b>乘方</b> 解决了这个问题，下面就来认识它。',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
