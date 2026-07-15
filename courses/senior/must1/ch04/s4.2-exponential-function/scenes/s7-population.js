(function (CW) {
  'use strict';
  var S, P;
  var GREEN = '#2e7d32', ORANGE = '#e64a19', PURPLE = '#6a1b9a';
  function pop(t) { return 5 * Math.pow(2, t / 20); }

  var scene = {
    id: 's7',
    title: '七、应用：人口增长 · 小结',
    bbox: [-10, 195, 135, -18],
    setup: function (stage, panel) {
      S = stage; P = panel;
      S.addText('s7-ax', 122, -10, 't / 年', { size: 15, color: '#546e7a' });
      S.addText('s7-ay', -8.5, 185, 'P / 万人', { size: 15, color: '#546e7a' });
    },
    steps: [
      {
        narration: '换一个真实情境：某城市人口呈<b>指数增长</b>。横轴是时间（年），纵轴是人口（万人）。',
        enter: function (anim) {
          return S.plotCurve('s7-c', pop, { color: GREEN, width: 4, domain: [0, 125], animate: anim, duration: 1800 });
        },
      },
      {
        narration: '读图：约 $20$ 年时人口 $10$ 万，约 $40$ 年时 $20$ 万——由 $10$ 万翻到 $20$ 万用了约 $20$ 年。人口每翻一番所需时间（<b>倍增期</b>）约为 $\\mathbf{20}$ <b>年</b>。',
        enter: function (anim) {
          S.plotCurve('s7-c', pop, { color: GREEN, width: 4, domain: [0, 125] });
          S.addSegment('s7-g1', [20, 0], [20, 10], { dash: 2 });
          S.addSegment('s7-g2', [0, 10], [20, 10], { dash: 2 });
          S.addSegment('s7-g3', [40, 0], [40, 20], { dash: 2 });
          S.addSegment('s7-g4', [0, 20], [40, 20], { dash: 2 });
          var a = S.dropPoint('s7-p1', 20, 10, { color: ORANGE, name: '(20, 10)', animate: anim });
          var b = S.dropPoint('s7-p2', 40, 20, { color: ORANGE, name: '(40, 20)', animate: anim });
          return Promise.all([a, b]).then(function () {
            return anim ? Promise.all([S.pulse('s7-p1', 2), S.pulse('s7-p2', 2)]) : null;
          });
        },
      },
      {
        narration: '第二问：从 $80$ 万人开始，经过 $20$ 年（一个倍增期），人口翻一番——增长到约 $\\mathbf{160}$ <b>万人</b>。',
        enter: function (anim) {
          var m = anim ? S.movingPoint('s7-m', pop, { from: 80, color: PURPLE }) : null;
          var go = anim ? m.run(100, 2200) : Promise.resolve();
          return go.then(function () {
            if (m) S.remove('s7-m');
            S.addSegment('s7-g5', [80, 0], [80, 80], { dash: 2, color: PURPLE });
            S.addSegment('s7-g6', [100, 0], [100, 160], { dash: 2, color: PURPLE });
            return Promise.all([
              S.dropPoint('s7-p3', 80, 80, { color: PURPLE, name: '(80, 80)', animate: anim }),
              S.dropPoint('s7-p4', 100, 160, { color: PURPLE, name: '(100, 160)', animate: anim }),
            ]);
          });
        },
      },
      {
        narration: '<b>课堂小结</b>：本节课学习了指数函数的图像和性质，以及数形结合、类比、分类讨论的数学思想。',
        enter: function () {
          P.renderCard('小结：<br>① 底数互为倒数 $\\Rightarrow$ 图像关于 $y$ 轴对称<br>② 分 $0\\lt a\\lt 1$ 与 $a\\gt 1$ 两类研究图像与性质<br>③ 应用：比较大小、解决实际增长问题', 'warm');
          P.renderCard('课后作业：教科书第 118 页练习第 1~3 题；习题 4.2 第 1~4 题。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
