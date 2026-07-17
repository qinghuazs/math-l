// s6-apply.js  六、从珠峰到海沟与小结（3步）
// 数学验算：
//   珠峰高度：8848.86 m（海平面以上）
//   马里亚纳海沟深度：-11034 m（海平面以下）
//   高度差 = 8848.86 - (-11034) = 8848.86 + 11034 = 19882.86 ≈ 19883 m ✓
//   (近2万米，比两座珠峰叠起 17697.72 m 还要多)
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

  // 剖面图参数（bbox：[-10, 8, 10, -8]，示意化比例）
  // 海平面 y=0（水平线）
  // 珠峰：山峰三角形，顶点 y=5.5，底部 y=0，底宽 4
  // 海沟：V形，最深点 y=-5.5，V口宽 4，V口在 y=0
  // 示意化，不是真实比例；数值标注准确
  var SEA_Y = 0;
  var PEAK_TOP_Y = 5.5;
  var TRENCH_BOT_Y = -5.5;

  var scene = {
    id: 's6',
    title: '六、从珠峰到海沟与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：纵剖面图（山峰 + 海沟）
      {
        narration: '现在来看一道真实的地理问题。看这张纵剖面示意图：上面是世界最高峰珠穆朗玛峰，海拔约 8848.86 米；下面是世界最深的马里亚纳海沟，深约 11034 米，记为 -11034 米（以海平面为基准）。海平面就是这条水平线。请思考：从最高点到最低点，高度差是多少？',
        enter: function (anim) {
          // 海平面线
          S.addSegment('s6-sealevel', [-9, SEA_Y], [9, SEA_Y],
            { color: COOL, width: 2.5, dash: 2 });
          S.actor('s6-sea-lbl', 7.0, SEA_Y + 0.4,
            '海平面 $0$', { color: COOL, size: 13 });

          // 珠峰轮廓（三角形）：底部在海平面，左底(-3,0)，右底(3,0)，顶(0,5.5)
          S.addSegment('s6-peak-left',  [-3, SEA_Y], [0, PEAK_TOP_Y],
            { color: INK, width: 2.5, dash: 0 });
          S.addSegment('s6-peak-right', [3,  SEA_Y], [0, PEAK_TOP_Y],
            { color: INK, width: 2.5, dash: 0 });
          S.addSegment('s6-peak-base',  [-3, SEA_Y], [3,  SEA_Y],
            { color: INK, width: 1, dash: 0 });

          // 填充珠峰（浅棕）
          S.addPolygon('s6-peak-fill',
            [[-3, SEA_Y], [3, SEA_Y], [0, PEAK_TOP_Y]],
            { color: '#795548', opacity: 0.15, borderWidth: 0 });

          // 珠峰顶部标注
          S.actor('s6-peak-name', 0, PEAK_TOP_Y + 0.55,
            '珠穆朗玛峰', { color: INK, size: 14, bold: true });
          S.actor('s6-peak-val', 0, PEAK_TOP_Y + 0.0,
            '$8848.86$ 米', { color: WARM, size: 13 });

          // 马里亚纳海沟（V 形，V 口在海平面，最深点在下方）
          // V 口：左(-3.5, 0)，右(3.5, 0)；底(-0, -5.5)
          S.addSegment('s6-trench-left',  [-3.5, SEA_Y], [0, TRENCH_BOT_Y],
            { color: COOL, width: 2.5, dash: 0 });
          S.addSegment('s6-trench-right', [3.5,  SEA_Y], [0, TRENCH_BOT_Y],
            { color: COOL, width: 2.5, dash: 0 });

          // 填充海沟（浅蓝）
          S.addPolygon('s6-trench-fill',
            [[-3.5, SEA_Y], [3.5, SEA_Y], [0, TRENCH_BOT_Y]],
            { color: COOL, opacity: 0.12, borderWidth: 0 });

          // 海沟底部标注
          S.actor('s6-trench-name', 0, TRENCH_BOT_Y - 0.65,
            '马里亚纳海沟', { color: COOL, size: 14, bold: true });
          S.actor('s6-trench-val', 0, TRENCH_BOT_Y - 0.1,
            '$-11034$ 米', { color: COOL, size: 13 });

          // 双向箭头示意高度差
          S.addSegment('s6-diff-arr', [-7.5, TRENCH_BOT_Y], [-7.5, PEAK_TOP_Y],
            { color: TEAL, width: 2, dash: 0 });
          S.actor('s6-diff-q', -8.8, 0,
            '高度差\n【？】', { color: TEAL, size: 13 });

          P.renderCard(
            '<b>世界地理：最高与最低</b><br>' +
            '珠穆朗玛峰：$+8848.86$ 米<br>' +
            '马里亚纳海沟：$-11034$ 米<br>' +
            '问：最高点与最低点的高度差是多少？'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：计算高度差
      {
        narration: '列式计算：高度差等于珠峰高度减去海沟深度，即 8848.86 减 (-11034)。应用法则两变：减号变加号，-11034 变相反数 +11034。所以等于 8848.86 加 11034 等于 19882.86 米，约等于 19883 米。将近 2 万米！',
        enter: function (anim) {
          // 在图上叠加计算过程
          S.actor('s6-calc-lbl', 5.5, 6.5, '计算高度差：', { color: INK, size: 15 });
          S.actor('s6-calc-q', 5.5, 5.5,
            '$8848.86 - (-11034)$',
            { color: INK, size: 15 });
          S.actor('s6-calc-s1', 5.5, 4.4,
            '$= 8848.86 + 11034$',
            { color: TEAL, size: 15 });
          S.actor('s6-calc-s2', 5.5, 3.4,
            '$= 19882.86$ 米',
            { color: GREEN, size: 16, bold: true });
          S.actor('s6-calc-approx', 5.5, 2.3,
            '$\\approx 19883$ 米',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>计算高度差</b><br>' +
            '$8848.86 - (-11034)$<br>' +
            '$= 8848.86 + 11034$<br>' +
            '$= 19882.86 \\approx 19883$ 米',
            'warm'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：小结填空 + 悬念
      {
        narration: '将近 2 万米的落差，比两座珠峰叠起来还多！这就是有理数减法帮我们"量"出来的。最后来做课堂小结填空。有理数减法法则：减去一个数，等于加上这个数的"相反数"，即 a 减 b 等于 a 加上负 b。用法则做减法的操作叫"两变"：减号变加号，减数变相反数，两变必须同步。加减统一成加法后，省略括号的式子叫代数和。最后留下一个悬念：负数乘以负数会得到什么？是负数吗？下节课见分晓！',
        enter: function (anim) {
          S.remove('s6-sealevel');
          S.remove('s6-sea-lbl');
          S.remove('s6-peak-left');
          S.remove('s6-peak-right');
          S.remove('s6-peak-base');
          S.remove('s6-peak-fill');
          S.remove('s6-peak-name');
          S.remove('s6-peak-val');
          S.remove('s6-trench-left');
          S.remove('s6-trench-right');
          S.remove('s6-trench-fill');
          S.remove('s6-trench-name');
          S.remove('s6-trench-val');
          S.remove('s6-diff-arr');
          S.remove('s6-diff-q');
          S.remove('s6-calc-lbl');
          S.remove('s6-calc-q');
          S.remove('s6-calc-s1');
          S.remove('s6-calc-s2');
          S.remove('s6-calc-approx');

          S.actor('s6-sum-title', 0, 7.3, '课堂小结', { color: COOL, size: 21, bold: true });

          // 填空
          S.actor('s6-f1', 0, 6.2,
            '① 法则：$a - b = a + (-b)$（减 = 加相反数）',
            { color: INK, size: 15 });
          S.actor('s6-f2', 0, 5.2,
            '② 两变：减号变<b style="color:#c62828">加号</b>，减数变<b style="color:#1565c0">相反数</b>（同步！）',
            { color: INK, size: 15 });
          S.actor('s6-f3', 0, 4.2,
            '③ 省略括号后的式子叫<b>代数和</b>',
            { color: INK, size: 15 });
          S.actor('s6-f4', 0, 3.2,
            '④ 同号集中，分步计算更顺畅',
            { color: INK, size: 15 });

          // 减法的哲学
          S.actor('s6-philosophy', 0, 2.0,
            '"减法没有新法则——它把自己变成了加法！"',
            { color: TEAL, size: 15, bold: true });

          // 珠峰成就
          S.actor('s6-geo', 0, 1.0,
            '高度差 $\\approx 19883$ 米 ≈ 两座珠峰叠加 ✓',
            { color: GREEN, size: 14 });

          // 分割线
          S.addSegment('s6-div', [-9, 0.2], [9, 0.2], { color: GRAY, width: 1.5, dash: 2 });

          // 悬念
          S.actor('s6-next-lbl', 0, -0.6, '下节课悬念：', { color: WARM, size: 16, bold: true });
          S.actor('s6-next', 0, -1.7,
            '负数 × 负数 = ？（正数？负数？）',
            { color: WARM, size: 18 });
          S.actor('s6-next2', 0, -2.8,
            '加减统一了，乘除下回分解！',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>课堂小结</b><br>' +
            '① $a - b = a + (-b)$<br>' +
            '② 两变：减号→加号，减数→相反数<br>' +
            '③ 省略括号 → <b>代数和</b><br>' +
            '④ 同号集中，顺畅计算<br>' +
            '<i>悬念：$(-) \\times (-) = $ ？下节课见！</i>',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
