(function (CW) {
  'use strict';
  // s3 二元一次方程的解：x+y=7 的多组解，描点发现直线
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var RED    = '#d32f2f';
  var ORANGE = '#e65100';
  var INK    = '#455a64';

  // x+y=7 的几组整数解
  var SOLUTIONS = [
    { x: 1, y: 6 },
    { x: 2, y: 5 },
    { x: 3, y: 4 },
    { x: 4, y: 3 },
    { x: 5, y: 2 },
    { x: 6, y: 1 },
  ];

  var scene = {
    id: 's3',
    title: '三、二元一次方程的解',
    // 带轴画板，范围 0~8
    bbox: [-1, 9, 9, -1],
    board: {},
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '以方程 x + y = 7 为例，来研究二元一次方程的解。什么叫一组解？就是找一对 x、y 的值，代入方程两边相等。比如 x=1、y=6，代入：1+6=7，等式成立，所以 x=1，y=6 是一组解。',
        enter: function (anim) {
          // 方程标题
          S.addText('s3-eq-title', 0.5, 8.4, '$x + y = 7$ 的解', {
            size: 18, color: BLUE,
          });

          // 解的定义与示例统一放右上空白区（直线 y=7-x 斜穿左上，左列文字会与点标签重叠）
          S.addText('s3-def', 3.4, 7.9,
            '使方程两边相等的一对 $x$、$y$ 的值，叫作方程的一组解',
            { size: 14, color: INK });

          // 第一组解示例
          S.addText('s3-eg-label', 4.6, 7.1, '验证第一组解：', { size: 14, color: INK });
          S.addText('s3-eg1', 4.6, 6.4,
            '$x=1, y=6$   代入：$1+6=7$ ✓',
            { size: 15, color: GREEN });

          // 解的写法格式说明
          S.addText('s3-fmt-label', 4.6, 5.4, '写法格式（大括号联立）：', { size: 14, color: ORANGE });
          S.addText('s3-fmt', 5.4, 4.4,
            '$\\begin{cases} x=1 \\\\ y=6 \\end{cases}$',
            { size: 16, color: ORANGE });

          P.renderCard(
            '<b>二元一次方程的解</b>：使方程两边相等的一对未知数的值。<br>' +
            '写成：$\\begin{cases}x=1\\\\y=6\\end{cases}$，读作"x等于1，y等于6这一组解"。'
          );
        },
      },
      {
        narration: 'x+y=7 的解只有这一组吗？我们继续找：x=2时y=5，x=3时y=4，x=4时y=3……越找越多！一个二元一次方程的解，不止一组，而是有无数组解！',
        enter: function (anim) {
          // 解的表格
          P.renderTable({
            head: ['$x$', '1', '2', '3', '4', '5', '6', '…'],
            rows: [
              ['$y$', '6', '5', '4', '3', '2', '1', '…'],
            ],
          });
          // 提示无数组
          S.addText('s3-inf', 0.5, 3.2,
            '解有无数组！',
            { size: 19, color: RED });
          S.addText('s3-inf2', 0.5, 2.4,
            '（$x$ 每取一个值，$y$ 就唯一确定）',
            { size: 14, color: INK });

          P.renderCard(
            '<b>结论</b>：一个二元一次方程通常有<b>无数组解</b>！<br>' +
            '$x$ 每取一个值，$y = 7 - x$ 就唯一确定一个值。'
          );
        },
      },
      {
        narration: '现在把这些解在坐标系里描点！x=1,y=6 对应坐标 (1,6)；x=2,y=5 对应 (2,5)；依次描下去……你发现这些点有什么规律吗？',
        enter: function (anim) {
          var i, sol;
          var promises = [];
          for (i = 0; i < SOLUTIONS.length; i++) {
            sol = SOLUTIONS[i];
            promises.push(
              S.dropPoint(
                's3-pt' + i,
                sol.x, sol.y,
                {
                  name: '(' + sol.x + ',' + sol.y + ')',
                  color: BLUE,
                  size: 4,
                  animate: !!anim,
                  labelOffset: [8, 8],
                }
              )
            );
          }
          P.renderCard(
            '将 $x+y=7$ 的几组整数解在坐标系里描点……<br>' +
            '仔细观察这些点的排列，发现了什么？'
          );
          if (anim) {
            return Promise.all(promises);
          }
        },
      },
      {
        narration: '太神奇了！这些点居然排成了一条直线！其实，x+y=7 的所有解（包括小数、负数）对应的点，都在这条直线上。一个二元一次方程的解，在坐标系里对应一条直线——这就是方程的"图像"！',
        enter: function (anim) {
          // 用 plotCurve 画出直线 y = 7 - x，domain 为 [0, 8]
          return S.plotCurve(
            's3-line',
            function (x) { return 7 - x; },
            {
              color: RED,
              width: 2.5,
              dash: 2,
              domain: [0, 8],
              animate: !!anim,
              duration: 1200,
            }
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
