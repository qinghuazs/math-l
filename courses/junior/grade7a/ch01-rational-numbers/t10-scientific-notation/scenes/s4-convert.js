// s4-convert.js  环节四：互化练习（3步）
// 数学验算：
//   567000 → 整数位6位 → n=5 → a=5.67 → 5.67×10^5
//   40000000 → 整数位8位 → n=7 → a=4 → 4×10^7
//   134217728 → 整数位9位 → n=8 → a=1.34217728 ≈ 1.3（保留一位小数，看第二位0.34中3舍去）
//   还原：8.5×10^6 → 小数点右移6位 → 8500000
//   还原练习：3×10^8 → 小数点右移8位 → 300000000
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、互化练习',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：压缩三题
      {
        narration: '压缩练习来了——三道题，逐一分析。第一题：567000，整数位6位，n=5，a=5.67，结果 5.67乘以10的5次方。第二题：40000000，整数位8位，n=7，a=4，结果 4乘以10的7次方。第三题：134217728，整数位9位，n=8，a保留一位小数——看第二位小数是3，小于5舍去，a约等于1.3，结果约等于 1.3乘以10的8次方。',
        enter: function (anim) {
          S.actor('s4-title', 0, 7.0, '压缩练习（大数 → 科学记数法）', { color: COOL, size: 20, bold: true });

          S.actor('s4-q1-label', -8, 5.0, '①', { color: INK, size: 17 });
          S.actor('s4-q1-orig',  -6, 5.0, '$567000$', { color: INK, size: 17 });
          S.actor('s4-q1-proc',  -1, 5.0, '6位，$n=5$，$a=5.67$', { color: TEAL, size: 16 });
          S.actor('s4-q1-res',    6, 5.0, '$5.67 \\times 10^{5}$', { color: WARM, size: 17, bold: true });

          S.actor('s4-q2-label', -8, 3.0, '②', { color: INK, size: 17 });
          S.actor('s4-q2-orig',  -6, 3.0, '$40000000$', { color: INK, size: 17 });
          S.actor('s4-q2-proc',  -1, 3.0, '8位，$n=7$，$a=4$', { color: TEAL, size: 16 });
          S.actor('s4-q2-res',    6, 3.0, '$4 \\times 10^{7}$', { color: WARM, size: 17, bold: true });

          S.actor('s4-q3-label', -8, 1.0, '③', { color: INK, size: 17 });
          S.actor('s4-q3-orig',  -6, 1.0, '$134217728$', { color: INK, size: 17 });
          S.actor('s4-q3-proc',  -1, 1.0, '9位，$n=8$，$a \\approx 1.3$', { color: TEAL, size: 16 });
          S.actor('s4-q3-res',    6, 1.0, '$\\approx 1.3 \\times 10^{8}$', { color: WARM, size: 17, bold: true });

          S.actor('s4-note', 0, -0.8,
            '③ $a$ 保留一位小数：看第二位小数 3，小于5舍去',
            { color: INK, size: 15 }
          );

          P.renderTable({
            head: ['题', '原数', '分析', '结果'],
            rows: [
              ['①', '$567000$', '6位，$n=5$', '$5.67 \\times 10^{5}$'],
              ['②', '$40000000$', '8位，$n=7$', '$4 \\times 10^{7}$'],
              ['③', '$134217728$', '9位，$n=8$', '$\\approx 1.3 \\times 10^{8}$'],
            ],
          });

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：还原 8.5×10^6（小数点右移跳格动画）
      {
        narration: '现在反向操作——还原！8.5乘以10的6次方怎么变回整数？口诀：n是几，小数点向右跳几格，不够用零补位。n=6，所以小数点向右跳6格。看动画：8.5，小数点从5后面开始，跳——1格、2格、3格……6格，补上零，得到 8500000！',
        enter: function (anim) {
          S.remove('s4-title');
          S.remove('s4-q1-label'); S.remove('s4-q1-orig'); S.remove('s4-q1-proc'); S.remove('s4-q1-res');
          S.remove('s4-q2-label'); S.remove('s4-q2-orig'); S.remove('s4-q2-proc'); S.remove('s4-q2-res');
          S.remove('s4-q3-label'); S.remove('s4-q3-orig'); S.remove('s4-q3-proc'); S.remove('s4-q3-res');
          S.remove('s4-note');

          S.actor('s4-rest-title', 0, 7.0, '还原（科学记数法 → 整数）', { color: COOL, size: 20, bold: true });
          S.actor('s4-rest-rule', 0, 5.5,
            '口诀：$n$ 是几，小数点向右跳几格，不够补零',
            { color: TEAL, size: 17 }
          );

          S.actor('s4-rest-orig', 0, 3.8,
            '$8.5 \\times 10^{6}$',
            { color: INK, size: 22, bold: true }
          );

          if (!anim) {
            // 快放：直接摆终态
            S.actor('s4-jump-final', 0, 2.0,
              '小数点右移6格 $\\Rightarrow$ <b>8500000</b>',
              { color: WARM, size: 20 }
            );
            S.actor('s4-rest-ans', 0, 0.4,
              '$8.5 \\times 10^{6} = 8500000$',
              { color: GREEN, size: 22, bold: true }
            );
            P.renderCard(
              '<b>还原口诀</b>：$n$ 是几，小数点右移几格<br>' +
              '$8.5 \\times 10^{6}$：右移6格，补零<br>' +
              '结果：$8500000$'
            );
            return Promise.resolve();
          }

          // 动画：小数点逐格跳
          var steps = [
            '8.5000000',
            '85.000000',
            '850.00000',
            '8500.0000',
            '85000.000',
            '850000.00',
            '8500000.',
          ];
          var i = 0;
          S.actor('s4-jump-cur', 0, 2.0, steps[0], { color: WARM, size: 22 });

          function nextStep() {
            i++;
            if (i >= steps.length) {
              S.remove('s4-jump-cur');
              S.actor('s4-rest-ans', 0, 0.4,
                '$8.5 \\times 10^{6} = 8500000$',
                { color: GREEN, size: 22, bold: true }
              );
              P.renderCard(
                '<b>还原口诀</b>：$n$ 是几，小数点右移几格<br>' +
                '$8.5 \\times 10^{6}$：右移6格，补零<br>' +
                '结果：$8500000$'
              );
              return Promise.resolve();
            }
            S.remove('s4-jump-cur');
            S.actor('s4-jump-cur', 0, 2.0, steps[i], { color: WARM, size: 22 });
            return delay(350).then(nextStep);
          }

          return delay(500).then(nextStep);
        },
      },

      // Step 3：还原练习 3×10^8 揭晓
      {
        narration: '再来一道还原题，你自己先试：3乘以10的8次方等于多少？小数点从3后面开始，右移8格，需要补7个零，结果是 300000000——正好就是光速！一课开头我们写的那串数字，科学记数法把它浓缩成了 3乘以10的8次方，简洁多了吧？',
        enter: function (anim) {
          S.remove('s4-rest-title');
          S.remove('s4-rest-rule');
          S.remove('s4-rest-orig');
          S.remove('s4-jump-final');
          S.remove('s4-jump-cur');
          S.remove('s4-rest-ans');

          S.actor('s4-prac-title', 0, 7.0, '还原练习', { color: COOL, size: 20, bold: true });
          S.actor('s4-prac-q', 0, 5.2,
            '$3 \\times 10^{8} = \\text{?}$',
            { color: INK, size: 26, bold: true }
          );
          S.actor('s4-prac-hint', 0, 3.5,
            '右移8格，补7个零',
            { color: TEAL, size: 17 }
          );
          S.actor('s4-prac-ans', 0, 1.8,
            '<b>300000000</b>（光速！）',
            { color: WARM, size: 26, bold: true }
          );
          S.actor('s4-prac-link', 0, 0.2,
            '压缩：$300000000 \\Leftrightarrow 3 \\times 10^{8}$',
            { color: GREEN, size: 17 }
          );

          P.renderCard(
            '<b>还原练习</b>：$3 \\times 10^{8} = ?$<br>' +
            '右移8格，补7个零<br>' +
            '答：$300000000$（正是光速！）<br>' +
            '压缩与还原互为逆操作。',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
