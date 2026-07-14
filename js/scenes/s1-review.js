(function (CW) {
  'use strict';
  // 场景文件模板约定（s2-s7 同构）：
  // S = stage（画板），P = panel（面板），由 setup 赋值，导演保证 setup 先于任何 enter。
  // 步骤 enter(animate) -> Promise|undefined：含舞台动画时必须 return 其 Promise
  // （如 return S.plotCurve(...)），否则导演不等动画完成就会解锁下一步。
  var S, P;
  var scene = {
    id: 's1',
    title: '一、复习导入',
    bbox: [-4.5, 9, 4.5, -1.5],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '这节课我们一起学习<b>指数函数的图像和性质</b>。先回顾上节课的定义。',
        enter: function () {
          P.renderCard('定义：一般地，函数 $y=a^x$（$a>0$ 且 $a\\neq 1$）叫做<b>指数函数</b>。');
        },
      },
      {
        narration: '注意定义中的两个要点。',
        enter: function () {
          P.renderCard('要点：① 指数 $x$ 是<b>自变量</b>；② 定义域为 $\\mathbb{R}$；③ 规定 $a>0$ 且 $a\\neq 1$。', 'cool');
        },
      },
      {
        narration: '如何研究一个函数？类比上一章幂函数：由解析式定定义域，<b>描点法</b>画图像，再由图像读性质。我们先研究两个特殊又简单的函数：$y=2^x$ 和 $y=\\left(\\tfrac12\\right)^x$。',
        enter: function () {
          P.renderCard('研究路径：定义 $\\to$ 图像 $\\to$ 性质<br>先画 $y=2^x$ 与 $y=\\left(\\tfrac12\\right)^x$', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
