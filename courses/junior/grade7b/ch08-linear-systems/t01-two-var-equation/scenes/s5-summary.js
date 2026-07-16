(function (CW) {
  'use strict';
  // s5 小结：定义+解的特点+引出方程组
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '今天我们学习了二元一次方程。来做一个完整的小结：什么是二元一次方程？它的解有什么特点？',
        enter: function (anim) {
          // 标题
          S.actor('s5-title', 0, 7.2, '课堂小结', { color: BLUE, size: 26, bold: true });

          // 要点1：定义
          S.addPolygon('s5-def-bg', [
            [-9.5, 6.3], [9.5, 6.3], [9.5, 4.0], [-9.5, 4.0],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s5-def-num', -8.5, 5.5, '①', { color: BLUE, size: 18, bold: true });
          S.actor('s5-def-t1', -3, 5.5, '二元一次方程的定义', { color: BLUE, size: 17, bold: true });
          S.actor('s5-def-t2', 0, 4.5,
            '两个未知数 · 次数均为1 · 整式方程',
            { color: INK, size: 15 });

          // 要点2：解的个数
          S.addPolygon('s5-inf-bg', [
            [-9.5, 3.3], [9.5, 3.3], [9.5, 1.0], [-9.5, 1.0],
          ], { color: GREEN, opacity: 0.08, borderWidth: 2, strokeColor: GREEN });
          S.actor('s5-inf-num', -8.5, 2.4, '②', { color: GREEN, size: 18, bold: true });
          S.actor('s5-inf-t1', -3, 2.4, '解的个数', { color: GREEN, size: 17, bold: true });
          S.actor('s5-inf-t2', 0, 1.5,
            '一个二元一次方程通常有无数组解',
            { color: INK, size: 15 });

          // 要点3：图像
          S.addPolygon('s5-img-bg', [
            [-9.5, 0.3], [9.5, 0.3], [9.5, -1.9], [-9.5, -1.9],
          ], { color: ORANGE, opacity: 0.08, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s5-img-num', -8.5, -0.6, '③', { color: ORANGE, size: 18, bold: true });
          S.actor('s5-img-t1', -3, -0.6, '解的图像', { color: ORANGE, size: 17, bold: true });
          S.actor('s5-img-t2', 0, -1.5,
            '所有解对应的点，在坐标系里排成一条直线',
            { color: INK, size: 15 });

          // 要点4：格式
          S.addPolygon('s5-fmt-bg', [
            [-9.5, -2.7], [9.5, -2.7], [9.5, -4.9], [-9.5, -4.9],
          ], { color: GRAY, opacity: 0.10, borderWidth: 2, strokeColor: GRAY });
          S.actor('s5-fmt-num', -8.5, -3.6, '④', { color: INK, size: 18, bold: true });
          S.actor('s5-fmt-t1', -3, -3.6, '解的书写格式', { color: INK, size: 17, bold: true });
          S.actor('s5-fmt-t2', 0, -4.5,
            '大括号联立：$\\begin{cases}x=a\\\\y=b\\end{cases}$，必须同时给出两个值',
            { color: INK, size: 14 });

          P.renderCard(
            '<b>今日小结</b><br>' +
            '① 二元一次方程：两个未知数，次数均为1，整式方程<br>' +
            '② 解有<b>无数组</b><br>' +
            '③ 解对应坐标点，排成<b>一条直线</b><br>' +
            '④ 解的格式：$\\begin{cases}x=a\\\\y=b\\end{cases}$'
          );
        },
      },
      {
        narration: '最后引出新问题：篮球联赛中，我们有两个方程 x+y=10 和 2x+y=16。一个二元一次方程有无数组解，那两个方程放在一起，就能唯一确定 x 和 y 了！把这两个方程联立在一起，就叫二元一次方程组——这就是我们下节课的内容！',
        enter: function (anim) {
          // 引出方程组
          S.actor('s5-next-title', 0, -6.0, '下节预告：二元一次方程组', {
            color: BLUE, size: 20, bold: true,
          });

          S.addPolygon('s5-sys-bg', [
            [-7, -6.7], [7, -6.7], [7, -7.8], [-7, -7.8],
          ], { color: BLUE, opacity: 0.10, borderWidth: 2, strokeColor: BLUE });
          S.actor('s5-sys-eq', 0, -7.25,
            '$\\begin{cases}x+y=10\\\\2x+y=16\\end{cases}$ → 唯一确定 $x$、$y$ ！',
            { color: BLUE, size: 15 });

          P.renderCard(
            '<b>思考</b>：一个方程有无数组解，<br>' +
            '两个方程联立：$\\begin{cases}x+y=10\\\\2x+y=16\\end{cases}$<br>' +
            '能唯一确定 $x$、$y$ 吗？——下节课揭晓！',
            'cool',
            'tada'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
