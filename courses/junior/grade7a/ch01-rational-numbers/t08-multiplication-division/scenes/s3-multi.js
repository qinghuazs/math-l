// s3-multi.js  环节三：多因数数负号（3步）
// 数学验算：
//   例：(-5)×(-8/15)×(-3/4)
//     负因数个数：3（奇数）→ 积为负
//     绝对值：5×(8/15)×(3/4) = (5×8×3)/(15×4) = 120/60 = 2
//     结果：-2 ✓
//   练习：(-1)×(-1)×(-1)×(-1)×(-1)
//     负因数个数：5（奇数）→ 积为负
//     绝对值：1×1×1×1×1=1
//     结果：-1 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var RED = '#c62828', GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 计数灯参数：用 addPolygon 小方块（无需 keepAspect）
  // 灯的位置：y=3，x 从 -3 到 +3 间距 2
  var LIGHT_Y = 2.5;
  var LIGHT_X = [-4, -2, 0, 2, 4]; // 最多5盏

  function makeLightId(i) { return 's3-light-' + i; }
  function makeLightLabelId(i) { return 's3-light-lab-' + i; }

  var scene = {
    id: 's3',
    title: '三、多因数数负号',
    bbox: [-10, 7, 10, -7],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // ── 步1：负因数计数器演示 ──
      {
        narration: '三个或更多因数相乘，符号怎么判断？方法是：数一数负因数的个数！每找到一个负因数，就亮一盏红灯。最后看红灯是奇数盏还是偶数盏——奇数个负因数积为负，偶数个负因数积为正；有零因数积为零。',
        enter: function (anim) {
          S.actor('s3-title', 0, 6.0, '多因数相乘：数负号定正负', { color: COOL, size: 20, bold: true });
          S.actor('s3-rule1', 0, 4.8,
            '负因数个数为<b>奇数</b> → 积为<b>负</b>',
            { color: WARM, size: 18 });
          S.actor('s3-rule2', 0, 3.9,
            '负因数个数为<b>偶数</b> → 积为<b>正</b>',
            { color: GREEN, size: 18 });
          S.actor('s3-rule3', 0, 3.0,
            '有 <b>0</b> 因数 → 积为 <b>0</b>',
            { color: TEAL, size: 18 });

          S.addSegment('s3-sep', [-7, 2.2], [7, 2.2], { color: GRAY, width: 1.5, dash: 2 });

          // 计数灯展示（演示3盏亮起=奇数=负）
          var labels = ['负', '负', '负'];
          var i;
          for (i = 0; i < 3; i++) {
            var cx = -2 + i * 2;
            // 小方块（红色）
            S.addPolygon(makeLightId(i),
              [
                [cx - 0.7, LIGHT_Y - 0.6],
                [cx + 0.7, LIGHT_Y - 0.6],
                [cx + 0.7, LIGHT_Y + 0.6],
                [cx - 0.7, LIGHT_Y + 0.6]
              ],
              { color: RED, opacity: 0.85, borderColor: RED, borderWidth: 2 }
            );
            S.addText(makeLightLabelId(i), cx - 0.15, LIGHT_Y, labels[i],
              { color: '#ffffff', size: 18 });
          }
          S.actor('s3-count-tip', 0, 0.9,
            '3盏红灯 = 3个负因数 = 奇数 → 积为<b>负</b>',
            { color: WARM, size: 16 });

          P.renderCard(
            '<b>多因数乘法符号口诀</b><br>' +
            '数一数负因数的个数：<br>' +
            '奇数个 → 积为<b>负</b>；偶数个 → 积为<b>正</b><br>' +
            '有 $0$ 因数 → 积为 $0$'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步2：例 (-5)×(-8/15)×(-3/4)=-2 ──
      {
        narration: '例题：(-5)×(-8/15)×(-3/4)。第一步，数负因数：-5、-8/15、-3/4，共3个，奇数个，积为负。第二步，算绝对值：5×8/15×3/4 = (5×8×3)/(15×4) = 120/60 = 2。结果：-2。',
        enter: function (anim) {
          // 清场计数灯
          var i;
          for (i = 0; i < 3; i++) {
            S.remove(makeLightId(i));
            S.remove(makeLightLabelId(i));
          }
          S.remove('s3-title'); S.remove('s3-rule1'); S.remove('s3-rule2'); S.remove('s3-rule3');
          S.remove('s3-sep'); S.remove('s3-count-tip');

          S.actor('s3-ex-title', 0, 6.0, '例题3', { color: COOL, size: 19, bold: true });
          S.actor('s3-ex-q', 0, 4.8,
            '$(-5)\\times\\left(-\\dfrac{8}{15}\\right)\\times\\left(-\\dfrac{3}{4}\\right)=?$',
            { color: INK, size: 20 });

          // 三盏计数灯（奇数）
          var lx = [-3, 0, 3];
          for (i = 0; i < 3; i++) {
            S.addPolygon('s3-ex-light-' + i,
              [
                [lx[i] - 0.6, 3.2],
                [lx[i] + 0.6, 3.2],
                [lx[i] + 0.6, 4.2],
                [lx[i] - 0.6, 4.2]
              ],
              { color: RED, opacity: 0.85, borderColor: RED, borderWidth: 2 }
            );
            S.addText('s3-ex-llab-' + i, lx[i] - 0.15, 3.7, '负',
              { color: '#ffffff', size: 17 });
          }
          S.actor('s3-ex-sign', 0, 2.5,
            '3个负因数（<b>奇数</b>）→ 积为<b>负</b>',
            { color: WARM, size: 16, bold: true });

          S.addSegment('s3-ex-sep', [-7, 1.8], [7, 1.8], { color: GRAY, width: 1.5, dash: 2 });

          S.actor('s3-ex-abs', 0, 1.0,
            '绝对值：$5\\times\\dfrac{8}{15}\\times\\dfrac{3}{4}=\\dfrac{5\\times8\\times3}{15\\times4}=\\dfrac{120}{60}=2$',
            { color: COOL, size: 16 });
          S.actor('s3-ex-ans', 0, -0.3,
            '$(-5)\\times\\left(-\\dfrac{8}{15}\\right)\\times\\left(-\\dfrac{3}{4}\\right)=\\boldsymbol{-2}$',
            { color: RED, size: 22, bold: true });

          P.renderCard(
            '<b>例3</b>：$(-5)\\times\\left(-\\dfrac{8}{15}\\right)\\times\\left(-\\dfrac{3}{4}\\right)$<br>' +
            '① 定符号：负因数共 $3$ 个（奇数）→ <b>积为负</b><br>' +
            '② 绝对值：$\\dfrac{5\\times8\\times3}{15\\times4}=\\dfrac{120}{60}=2$<br>' +
            '结果：$\\boldsymbol{-2}$'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步3：练习 (-1)×(-1)×(-1)×(-1)×(-1)=-1 ──
      {
        narration: '练习：五个负1连乘。先数负因数个数：一、二、三、四、五，共5个，奇数个，积为负。绝对值是1×1×1×1×1=1。所以结果是-1。注意：我们把它写成连乘的形式，不用乘方记号——因为乘方是下一节课的内容！',
        enter: function (anim) {
          // 清场例题元素
          S.remove('s3-ex-title'); S.remove('s3-ex-q');
          var i;
          for (i = 0; i < 3; i++) {
            S.remove('s3-ex-light-' + i);
            S.remove('s3-ex-llab-' + i);
          }
          S.remove('s3-ex-sign'); S.remove('s3-ex-sep'); S.remove('s3-ex-abs'); S.remove('s3-ex-ans');

          S.actor('s3-pra-title', 0, 6.0, '学生练习', { color: TEAL, size: 19, bold: true });
          S.actor('s3-pra-q', 0, 4.8,
            '$(-1)\\times(-1)\\times(-1)\\times(-1)\\times(-1)=?$',
            { color: INK, size: 18 });

          // 五盏计数灯
          var plx = [-4, -2, 0, 2, 4];
          for (i = 0; i < 5; i++) {
            S.addPolygon('s3-pra-light-' + i,
              [
                [plx[i] - 0.55, 3.0],
                [plx[i] + 0.55, 3.0],
                [plx[i] + 0.55, 3.9],
                [plx[i] - 0.55, 3.9]
              ],
              { color: RED, opacity: 0.85, borderColor: RED, borderWidth: 2 }
            );
            S.addText('s3-pra-llab-' + i, plx[i] - 0.15, 3.45, '负',
              { color: '#ffffff', size: 15 });
          }

          S.actor('s3-pra-count', 0, 2.3,
            '5个负因数（<b>奇数</b>）→ 积为<b>负</b>',
            { color: WARM, size: 16, bold: true });
          S.actor('s3-pra-abs', 0, 1.3,
            '绝对值：$1\\times1\\times1\\times1\\times1=1$',
            { color: COOL, size: 16 });
          S.actor('s3-pra-ans', 0, 0.1,
            '$(-1)\\times(-1)\\times(-1)\\times(-1)\\times(-1)=\\boldsymbol{-1}$',
            { color: RED, size: 20, bold: true });
          S.actor('s3-pra-note', 0, -1.0,
            '（连乘形式，乘方记号下节课学）',
            { color: GRAY, size: 14 });

          P.renderCard(
            '<b>练习</b>：$(-1)\\times(-1)\\times(-1)\\times(-1)\\times(-1)$<br>' +
            '① 负因数个数：$5$ 个（奇数）→ <b>积为负</b><br>' +
            '② 绝对值：$1$<br>' +
            '结果：$\\boldsymbol{-1}$<br>' +
            '（连乘形式，乘方是下节课的新内容）'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
