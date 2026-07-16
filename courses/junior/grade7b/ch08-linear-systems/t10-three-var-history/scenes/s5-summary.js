// s5-summary.js  小结（2步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var BROWN  = '#5d4037';

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '小结本课两大收获。其一，三元一次方程组的解法：核心仍是消元——先设法消去同一个未知数，把三元化为二元，再化为一元，逐层求解、逐层回代。其二，数学史的启示：《九章算术》的方程术是世界数学史上的里程碑，"方程"这个词就诞生在中国。',
        enter: function () {
          S.actor('s5-title', 0, 7.0, '本课小结', { color: PURPLE, size: 24, bold: true });
          P.renderTable({
            head: ['收获', '要点'],
            rows: [
              ['三元方程组解法', '消元降维：三元 → 二元 → 一元；逐层回代'],
              ['消元的选择', '选系数简单的未知数先消，两两组合'],
              ['数学史', '《九章算术》方程术领先欧洲 1500 多年'],
              ['名词由来', '算筹摆成"方"阵，一列一"程"——方程'],
            ],
          });
          S.actor('s5-k', 0, 2.2, '降维打击：$3 \\to 2 \\to 1$', { color: GREEN, size: 22, bold: true });
        },
      },
      {
        narration: '至此，方程组的"新知"部分全部学完。从一个方程解不了两个未知数的困境出发，我们发明了消元；从二元到三元，消元思想一路通关；再回望两千年，古人早已在算筹上演绎同样的智慧。下节课是本单元的最后一课——单元复习，我们把整章知识串成一张网。',
        enter: function () {
          S.actor('s5-end', 0, 4.5, '消元思想：一以贯之', { color: ORANGE, size: 24, bold: true });
          P.renderCard('<b>本课要点</b>：三元方程组 = 消元降维（3→2→1）+ 逐层回代。<br><b>文化收获</b>：方程术——中国古代数学的世界级贡献。', 'warm');
          P.renderCard('<b>下节预告</b>：单元复习——把全章知识串成网络，查漏补缺。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
