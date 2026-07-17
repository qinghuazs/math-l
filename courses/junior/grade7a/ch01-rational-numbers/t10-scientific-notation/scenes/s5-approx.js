// s5-approx.js  环节五：近似数与精确度（4步）
// 数学验算：
//   π≈3.14（百分位）；π≈3.142（千分位，千分位是1，万分位5进位）
//   1.804→1.8（十分位）；1.804→1.80（百分位，百分位0，千分位4舍去）
//   0.0158→0.016（千分位，千分位5，万分位8进位）；132.4→132（个位，十分位4舍去）
//   2.4万=24000，4在千位，精确到千位
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、近似数与精确度',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：测量都是近似 + 概念卡
      {
        narration: '进入第二个板块——近似数与精确度。拿出一把直尺量课桌宽度：你能精确到毫米吗？精确到微米呢？不行！任何测量工具都有精度上限，所以测量所得的数都是近似数。生活中圆周率π取3.14，人口统计保留到万——都是近似数。精确数则是计数所得，比如班里30位同学，一个不多一个不少，是精确数。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.0, '近似数与精确度', { color: COOL, size: 22, bold: true });

          S.actor('s5-scene', 0, 5.5,
            '情境：用直尺量课桌宽，能精确到微米吗？',
            { color: INK, size: 17 }
          );

          S.actor('s5-def-exact', -4, 3.5,
            '<b>精确数</b>',
            { color: GREEN, size: 18 }
          );
          S.actor('s5-def-exact-body', -4, 2.3,
            '计数所得，无误差',
            { color: INK, size: 16 }
          );
          S.actor('s5-def-exact-eg', -4, 1.2,
            '例：班级 30 人',
            { color: GRAY, size: 15 }
          );

          S.actor('s5-def-approx', 4, 3.5,
            '<b>近似数</b>',
            { color: WARM, size: 18 }
          );
          S.actor('s5-def-approx-body', 4, 2.3,
            '测量/取舍所得，有误差',
            { color: INK, size: 16 }
          );
          S.actor('s5-def-approx-eg', 4, 1.2,
            '例：$\\pi \\approx 3.14$',
            { color: GRAY, size: 15 }
          );

          S.addSegment('s5-sep', [0, 4.4], [0, 0.5], { color: GRAY, width: 1, dash: 2 });

          P.renderCard(
            '<b>精确数 vs 近似数</b><br>' +
            '精确数：计数所得，无误差（班级30人）<br>' +
            '近似数：测量/取舍所得，有误差（$\\pi \\approx 3.14$）<br>' +
            '测量工具有精度上限，任何测量都是近似数。'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 2：四舍五入规则 + 六行示例表
      {
        narration: '取近似数的标准方法是四舍五入：看保留末位之后的那一位，小于5就舍去，大于等于5就向前进一位。六个例子一次看清楚：π精确到百分位得3.14，精确到千分位得3.142；1.804精确到十分位得1.8，精确到百分位得1.80；0.0158精确到千分位得0.016；132.4精确到个位得132。',
        enter: function (anim) {
          S.remove('s5-title');
          S.remove('s5-scene');
          S.remove('s5-def-exact'); S.remove('s5-def-exact-body'); S.remove('s5-def-exact-eg');
          S.remove('s5-def-approx'); S.remove('s5-def-approx-body'); S.remove('s5-def-approx-eg');
          S.remove('s5-sep');

          S.actor('s5-title2', 0, 7.0, '四舍五入法', { color: COOL, size: 22, bold: true });
          S.actor('s5-rule', 0, 5.8,
            '看保留末位之后一位：$\\lt 5$ 舍，$\\geq 5$ 进',
            { color: TEAL, size: 17 }
          );

          P.renderTable({
            head: ['原数', '要求', '结果', '精确到'],
            rows: [
              ['$\\pi = 3.14159\\cdots$', '百分位', '$3.14$', '百分位'],
              ['$\\pi = 3.14159\\cdots$', '千分位', '$3.142$', '千分位'],
              ['$1.804$', '十分位', '$1.8$', '十分位'],
              ['$1.804$', '百分位', '$1.80$', '百分位'],
              ['$0.0158$', '千分位', '$0.016$', '千分位'],
              ['$132.4$', '个位', '$132$', '个位'],
            ],
          });

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：1.8 与 1.80 辨析（末位0携带精确度信息）
      {
        narration: '重点辨析！1.804精确到十分位得1.8，精确到百分位得1.80——请问：能把1.80末尾的零去掉吗？不能！1.80的末位零不是多余的，它告诉读者"我精确到了百分位，百分位上刚好是0"。如果写成1.8，读者只知道精确到十分位，精确度完全不同。末位0携带精确度信息，不能随便去掉！',
        enter: function (anim) {
          S.remove('s5-title2');
          S.remove('s5-rule');

          S.actor('s5-cmp-title', 0, 7.0, '重点辨析：1.8 vs 1.80', { color: RED, size: 20, bold: true });

          S.actor('s5-cmp-left', -5, 5.2,
            '$1.804 \\approx 1.8$',
            { color: INK, size: 20 }
          );
          S.actor('s5-cmp-left-acc', -5, 3.8,
            '精确到<b>十分位</b>',
            { color: COOL, size: 17 }
          );

          S.actor('s5-cmp-right', 4, 5.2,
            '$1.804 \\approx 1.80$',
            { color: INK, size: 20 }
          );
          S.actor('s5-cmp-right-acc', 4, 3.8,
            '精确到<b>百分位</b>',
            { color: WARM, size: 17 }
          );

          S.addSegment('s5-cmp-sep', [0, 6.0], [0, 2.8], { color: GRAY, width: 1, dash: 2 });

          S.actor('s5-cmp-concl', 0, 1.8,
            '末位 $0$ 携带精确度信息，不能省略！',
            { color: RED, size: 18, bold: true }
          );
          S.actor('s5-cmp-why', 0, 0.4,
            '$1.80$ 中的 $0$：百分位上恰好是零，是真实信息',
            { color: INK, size: 16 }
          );

          P.renderCard(
            '<b>1.8 与 1.80 不同！</b><br>' +
            '$1.8$：精确到十分位<br>' +
            '$1.80$：精确到百分位<br>' +
            '末位的 $0$ 告诉读者精确度，<b>不能随意去掉</b>！',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 4：2.4万精确度（数位标尺）
      {
        narration: '"2.4万"精确到哪一位？——注意陷阱！不能直接看小数十分位上的4！要先换算原数：2.4万等于24000，再看4在哪个数位上。万、千、百、十、个——2在万位，4在千位。所以精确到千位！而不是十分位。带单位的大数，精确度看原数的数位，不看小数点后的位置。',
        enter: function (anim) {
          S.remove('s5-cmp-title');
          S.remove('s5-cmp-left'); S.remove('s5-cmp-left-acc');
          S.remove('s5-cmp-right'); S.remove('s5-cmp-right-acc');
          S.remove('s5-cmp-sep');
          S.remove('s5-cmp-concl');
          S.remove('s5-cmp-why');

          S.actor('s5-unit-title', 0, 7.0, '带单位大数的精确度', { color: COOL, size: 20, bold: true });
          S.actor('s5-unit-q', 0, 5.6,
            '"2.4 万"精确到哪一位？',
            { color: INK, size: 20 }
          );
          S.actor('s5-unit-step1', 0, 4.2,
            '第一步：换算原数  2.4 万 = 24000',
            { color: TEAL, size: 17 }
          );
          S.actor('s5-unit-step2', 0, 2.9,
            '第二步：数位标尺',
            { color: TEAL, size: 17 }
          );

          // 数位标尺：五格
          var labels = ['万', '千', '百', '十', '个'];
          var digits = ['2', '4', '0', '0', '0'];
          var xs = [-6, -3, 0, 3, 6];
          for (var i = 0; i < 5; i++) {
            var hi = (i === 1); // 千位高亮
            S.addText('s5-ruler-lab-' + i, xs[i] - 0.2, 1.8, labels[i],
              { color: hi ? WARM : INK, size: 17 });
            S.addText('s5-ruler-dig-' + i, xs[i] - 0.1, 0.5, digits[i],
              { color: hi ? WARM : INK, size: 22 });
            S.addSegment('s5-ruler-tick-' + i,
              [xs[i] - 1.2, 1.2], [xs[i] + 1.2, 1.2],
              { color: hi ? WARM : GRAY, width: hi ? 3 : 1, dash: 0 });
          }
          // 连接整体标尺横线
          S.addSegment('s5-ruler-base', [-7.2, 1.2], [7.2, 1.2], { color: GRAY, width: 1, dash: 0 });

          S.actor('s5-unit-ans', 0, -0.8,
            '4 在<b>千位</b>，精确到<b>千位</b>！',
            { color: WARM, size: 20, bold: true }
          );
          S.actor('s5-unit-warn', 0, -2.2,
            '不是十分位！带单位要先换算再看数位',
            { color: RED, size: 16 }
          );

          P.renderCard(
            '<b>带单位大数的精确度</b><br>' +
            '$2.4$ 万 $= 24000$<br>' +
            '<table><tr><td>万</td><td>千</td><td>百</td><td>十</td><td>个</td></tr>' +
            '<tr><td>2</td><td><b>4</b></td><td>0</td><td>0</td><td>0</td></tr></table>' +
            '4 在千位 → 精确到<b>千位</b>（不是十分位！）'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
