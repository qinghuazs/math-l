(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_X = '#c62828';
  var C_Y = '#1565c0';
  var C_O = '#6a1b9a';
  var C_LABEL = '#37474f';

  var BBOX = [-6, 6, 6, -6];

  // 绘制 x 轴标注：在正半轴末端标注 "x" 和箭头提示
  function labelXAxis() {
    S.addText('s2-xlabel', 5.2, -0.45, '$x$', { color: C_X, size: 18 });
    S.addText('s2-xname', -1, -0.85, '横轴（$x$ 轴）', { color: C_X, size: 15 });
    S.addText('s2-xdir', 3.5, 0.35, '正方向 →', { color: C_X, size: 13 });
  }

  // 绘制 y 轴标注
  function labelYAxis() {
    S.addText('s2-ylabel', 0.25, 5.4, '$y$', { color: C_Y, size: 18 });
    S.addText('s2-yname', 0.25, 2.5, '纵轴（$y$ 轴）', { color: C_Y, size: 15 });
    S.addText('s2-ydir', 0.25, 3.8, '↑ 正方向', { color: C_Y, size: 13 });
  }

  // 绘制原点标注
  function labelOrigin() {
    S.dropPoint('s2-origin', 0, 0, { color: C_O, size: 5, name: '' });
    S.addText('s2-oname', 0.2, -0.55, '$O$（原点）', { color: C_O, size: 16 });
  }

  var scene = {
    id: 's2',
    title: '二、三大要素命名',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '水平方向的数轴叫作<b>横轴</b>，也叫 $x$ 轴。' +
          '$x$ 轴的正方向向右，与普通数轴一致。',
        enter: function () {
          P.clearExtras();
          labelXAxis();
          P.renderCard(
            '<b>$x$ 轴（横轴）</b><br>' +
            '水平方向的数轴<br>' +
            '正方向：向右 →',
            'warm', 'fadeInLeft'
          );
        },
      },
      {
        narration: '竖直方向的数轴叫作<b>纵轴</b>，也叫 $y$ 轴。' +
          '$y$ 轴的正方向向上。',
        enter: function () {
          P.clearExtras();
          labelXAxis();
          labelYAxis();
          P.renderCard(
            '<b>$y$ 轴（纵轴）</b><br>' +
            '竖直方向的数轴<br>' +
            '正方向：向上 ↑',
            'cool', 'fadeInLeft'
          );
        },
      },
      {
        narration: '两条数轴的<b>交点</b>叫作<b>原点</b>，记作 $O$。' +
          '原点是平面直角坐标系的"出发点"，它的坐标是 $(0,0)$。',
        enter: function () {
          P.clearExtras();
          labelXAxis();
          labelYAxis();
          labelOrigin();
          P.renderCard(
            '<b>原点 $O$</b><br>' +
            '$x$ 轴与 $y$ 轴的交点<br>' +
            '坐标为 $(0,0)$',
            '', 'flipInX'
          );
        },
      },
      {
        narration: '小结：平面直角坐标系的<b>三大要素</b>——$x$ 轴（横轴）、$y$ 轴（纵轴）、原点 $O$。' +
          '这三者缺一不可，共同构成坐标系的"骨架"。',
        enter: function () {
          P.clearExtras();
          labelXAxis();
          labelYAxis();
          labelOrigin();
          P.renderTable({
            head: ['要素', '名称', '说明'],
            rows: [
              ['水平轴', '$x$ 轴（横轴）', '正方向向右'],
              ['竖直轴', '$y$ 轴（纵轴）', '正方向向上'],
              ['交点', '原点 $O$', '坐标 $(0,0)$'],
            ],
          });
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
