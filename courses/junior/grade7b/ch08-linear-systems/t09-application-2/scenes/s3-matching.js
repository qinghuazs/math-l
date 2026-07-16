(function (CW) {
  'use strict';
  // s3 配套问题
  // 题目：车间22名工人生产螺栓和螺母，每人每天生产螺栓1200个或螺母2000个。
  //       1个螺栓配2个螺母，怎样分配人数使产品正好配套？
  // 设生产螺栓x人，生产螺母y人。
  // 方程①：x + y = 22
  // 方程②（配套关系）：每天螺母数 = 2 × 每天螺栓数
  //   2000y = 2 × 1200x  →  2000y = 2400x  →  5y = 6x  →  6x = 5y
  // 由②：y = 6x/5，代入①：x + 6x/5 = 22 → 5x/5 + 6x/5 = 22 → 11x/5 = 22 → x = 10，y = 12
  // 验算：10+12=22 ✓；螺栓：10×1200=12000个，螺母：12×2000=24000个，24000=2×12000 ✓
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';
  var RED    = '#c62828';

  var scene = {
    id: 's3',
    title: '三、配套问题',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '第二类进阶题型——配套问题。题目：某车间有22名工人，专门生产螺栓和螺母。每人每天能生产螺栓1200个，或者螺母2000个。已知1个螺栓需要配2个螺母，请问应该安排多少人生产螺栓、多少人生产螺母，才能使每天的产品正好配套？同学们，这道题的难点在哪里？就在于"正好配套"这四个字——它背后藏着一个比例关系，需要我们翻译成数学式子。',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.2, '螺栓螺母配套问题', {
            color: BLUE, size: 21, bold: true,
          });

          // 题目框
          S.addPolygon('s3-q-bg', [
            [-9.5, 6.3], [9.5, 6.3], [9.5, 3.0], [-9.5, 3.0],
          ], { color: ORANGE, opacity: 0.07, borderWidth: 2, strokeColor: ORANGE });

          S.actor('s3-q1', 0, 5.9,
            '车间共 $22$ 名工人，生产螺栓或螺母',
            { color: INK, size: 15 });
          S.actor('s3-q2', -3, 5.0,
            '每人每天：螺栓 $1200$ 个', { color: INK, size: 14 });
          S.actor('s3-q3',  4, 5.0,
            '或螺母 $2000$ 个', { color: INK, size: 14 });
          S.actor('s3-q4', 0, 4.1,
            '配套规格：$1$ 个螺栓配 $2$ 个螺母',
            { color: ORANGE, size: 15, bold: true });
          S.actor('s3-q-ask', 0, 3.2,
            '怎样分配人数，使产品正好配套？',
            { color: RED, size: 16, bold: true });

          // 配套示意
          S.actor('s3-bolt-icon', -5, 1.6, '🔩', { size: 36 });
          S.actor('s3-nut-icon1', -1, 1.6, '🔧', { size: 36 });
          S.actor('s3-nut-icon2',  2, 1.6, '🔧', { size: 36 });
          S.actor('s3-match-text', 0, 0.5,
            '1 个螺栓  +  2 个螺母  = 1 套',
            { color: BLUE, size: 15 });

          // 隐藏关系提示
          S.addPolygon('s3-tip-bg', [
            [-7, -0.2], [7, -0.2], [7, -1.5], [-7, -1.5],
          ], { color: GREEN, opacity: 0.10, borderWidth: 2, strokeColor: GREEN });
          S.actor('s3-tip', 0, -0.8,
            '隐藏关系：螺母数 $= 2 \\times$ 螺栓数',
            { color: GREEN, size: 15, bold: true });

          P.renderCard(
            '<b>配套问题</b><br>' +
            '22人，每人产螺栓1200或螺母2000<br>' +
            '1螺栓配2螺母<br>' +
            '<b>关键：找出"配套"背后的比例等量关系</b>'
          );
        },
      },
      {
        narration: '好，现在设元和找关系。设生产螺栓 x 人，生产螺母 y 人。关系①很明显：工人总数22人，所以 x 加 y 等于22。关系②是配套关系——每天生产螺栓 x 乘以1200 个，每天生产螺母 y 乘以2000 个。要配套，螺母数必须是螺栓数的2倍，所以 2000y 等于 2 乘以 1200x。化简：2000y 等于 2400x，两边除以200，得 10y 等于 12x，再化简，6x 等于 5y。这就是第二个方程！',
        enter: function (anim) {
          S.actor('s3-set-title', 0, 7.2, '设元与找配套关系', {
            color: BLUE, size: 20, bold: true,
          });

          // 设元
          S.addPolygon('s3-set-bg', [
            [-9.5, 6.5], [9.5, 6.5], [9.5, 5.5], [-9.5, 5.5],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s3-set-x', -2.5, 6.0,
            '设生产螺栓 $x$ 人', { color: BLUE, size: 15, bold: true });
          S.actor('s3-set-y',  4.5, 6.0,
            '生产螺母 $y$ 人', { color: BLUE, size: 15, bold: true });

          // 关系①
          S.addPolygon('s3-r1-bg', [
            [-9.5, 5.0], [9.5, 5.0], [9.5, 3.8], [-9.5, 3.8],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s3-r1-label', -7, 4.5, '关系①', { color: GREEN, size: 15, bold: true });
          S.actor('s3-r1-cond', 0, 4.5,
            '工人总数 $22$ 人：$x + y = 22$', { color: GREEN, size: 17 });

          // 关系②：配套推导
          S.addPolygon('s3-r2-bg', [
            [-9.5, 3.3], [9.5, 3.3], [9.5, 0.0], [-9.5, 0.0],
          ], { color: RED, opacity: 0.07, borderWidth: 2, strokeColor: RED });
          S.actor('s3-r2-label', -7, 3.0, '关系②', { color: RED, size: 15, bold: true });
          S.actor('s3-r2-cond', 0.5, 3.0,
            '配套：螺母数 $= 2 \\times$ 螺栓数', { color: INK, size: 14 });
          S.actor('s3-r2-step1', 0, 2.3,
            '$2000y = 2 \\times 1200x$', { color: RED, size: 17 });
          S.actor('s3-r2-step2', 0, 1.5,
            '$2000y = 2400x$', { color: RED, size: 16 });
          S.actor('s3-r2-step3-label', -7, 0.7, '化简（$\\div 200$）：', { color: ORANGE, size: 13 });
          S.actor('s3-r2-step3', 3, 0.7,
            '$6x = 5y$', { color: RED, size: 19, bold: true });

          // 方程组
          S.addPolygon('s3-sys-bg', [
            [-5, -0.5], [5, -0.5], [5, -2.3], [-5, -2.3],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s3-sys-label', 0, -0.8, '联立方程组：', { color: BLUE, size: 14 });
          S.actor('s3-sys-eq', 0, -1.7,
            '$\\begin{cases}x+y=22\\\\6x=5y\\end{cases}$',
            { color: BLUE, size: 18, bold: true });

          P.renderCard(
            '设螺栓 $x$ 人，螺母 $y$ 人<br>' +
            '关系①：$x+y=22$<br>' +
            '配套：$2000y=2\\times1200x$ → $6x=5y$<br>' +
            '$\\begin{cases}x+y=22\\\\6x=5y\\end{cases}$'
          );
        },
      },
      {
        narration: '解方程组。由方程②得 y 等于 6x 除以 5，代入方程①：x 加 6x 除以5 等于22。通分：5x 除以5 加 6x 除以5 等于22，即 11x 除以5 等于22，所以 x 等于 22 乘以5 除以11 等于 10。再代回①：10 加 y 等于22，y 等于12。最后检验：10加12等于22 ✓；螺栓每天 10×1200=12000 个，螺母每天 12×2000=24000 个，24000 等于 2×12000 ✓，配套！答：应安排10人生产螺栓，12人生产螺母。',
        enter: function (anim) {
          S.actor('s3-solve-title', 0, 7.2, '解、验、答', {
            color: GREEN, size: 21, bold: true,
          });

          // 解题过程
          S.actor('s3-sl1', -1, 6.5,
            '由②：$y = \\dfrac{6x}{5}$', { color: ORANGE, size: 16 });

          S.actor('s3-sl2-label', -7.5, 5.6, '代入①：', { color: INK, size: 14 });
          S.actor('s3-sl2-eq', 2.5, 5.6,
            '$x + \\dfrac{6x}{5} = 22$', { color: INK, size: 16 });

          S.actor('s3-sl3-label', -7.5, 4.6, '通分：', { color: INK, size: 14 });
          S.actor('s3-sl3-eq', 2, 4.6,
            '$\\dfrac{11x}{5} = 22$', { color: INK, size: 16 });

          S.actor('s3-x-res', 0, 3.6,
            '$x = 10$（生产螺栓 $10$ 人）',
            { color: BLUE, size: 18, bold: true });

          S.actor('s3-y-res', 0, 2.8,
            '$y = 12$（生产螺母 $12$ 人）',
            { color: GREEN, size: 18, bold: true });

          S.addSegment('s3-div-line', [-9, 2.2], [9, 2.2], {
            color: GRAY, width: 1, dash: 1,
          });

          // 检验
          S.actor('s3-ck1', -2, 1.7,
            '验①：$10+12=22$ ✓', { color: GREEN, size: 15 });
          S.actor('s3-ck2-bolt', -4, 0.9,
            '螺栓：$10\\times1200=12000$ 个', { color: INK, size: 13 });
          S.actor('s3-ck2-nut', 4, 0.9,
            '螺母：$12\\times2000=24000$ 个', { color: INK, size: 13 });
          S.actor('s3-ck2-match', 0, 0.1,
            '$24000 = 2 \\times 12000$ ✓  配套！',
            { color: GREEN, size: 15, bold: true });

          // 答句
          S.addPolygon('s3-ans-bg', [
            [-8, -0.6], [8, -0.6], [8, -1.8], [-8, -1.8],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s3-ans', 0, -1.2,
            '答：应安排 $10$ 人生产螺栓，$12$ 人生产螺母。',
            { color: BLUE, size: 16, bold: true });

          P.renderCard(
            '由②得 $y=\\frac{6x}{5}$，代入①得 $x=10,y=12$<br>' +
            '验①：$10+12=22$ ✓<br>' +
            '验配套：$24000=2\\times12000$ ✓<br>' +
            '<b>答：10人产螺栓，12人产螺母。</b>',
            'cool',
            'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
