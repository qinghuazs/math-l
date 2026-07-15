(function (CW) {
  'use strict';
  var S, P;
  var PURPLE = '#6a1b9a', INK = '#455a64';
  var mover = null; // "+ 3" 演员（飞越等号的主角）

  var scene = {
    id: 's6',
    title: '六、理解"移项"',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; mover = null; },
    steps: [
      {
        narration: '还是方程 $2x+3=11$。盯住左边这个 <b>$+3$</b>——看它接下来的表演。',
        enter: function () {
          S.actor('s6-t1', -3.4, 2.5, '2x', { color: INK, size: 34, bold: true });
          mover = S.actor('s6-mv', -1.6, 2.5, '+ 3', { color: PURPLE, size: 34, bold: true });
          S.actor('s6-t2', 0.3, 2.5, '=', { color: INK, size: 34, bold: true });
          S.actor('s6-t3', 2.0, 2.5, '11', { color: INK, size: 34, bold: true });
        },
      },
      {
        narration: '两边同时减 3 之后，左边的 $+3$ 消失了，右边多出一个 $-3$——看起来就像 $+3$ <b>跳过等号、变了符号</b>！',
        enter: function (anim) {
          if (!mover || !S.get('s6-mv')) {
            mover = S.actor('s6-mv', -1.6, 2.5, '+ 3', { color: PURPLE, size: 34, bold: true });
          }
          var land = function () {
            mover.obj.setText('− 3');
            S.getBoard().update();
            S.actor('s6-t4', 0, -0.5, '2x = 11 − 3', { color: INK, size: 30, bold: true });
            P.renderCard('从形式上看：左边的 $+3$ 移到右边后变成了 $-3$。<br>这种变形叫作<b>移项</b>。', 'cool');
          };
          if (!anim) {
            return mover.moveTo(4.0, 2.5, 0).then(land);
          }
          return mover.moveTo(0.3, 5.2, 700).then(function () {
            return mover.moveTo(4.0, 2.5, 700);
          }).then(function () {
            land();
            var o = mover.obj;
            function set(v) { if (o) o.setAttribute({ fontSize: v }); }
            return S.animate({ from: 34, to: 44, duration: 260, easing: 'easeOut', onUpdate: set }).then(function () {
              return S.animate({ from: 44, to: 34, duration: 260, onUpdate: set });
            });
          });
        },
      },
      {
        narration: '但请记住：移项<b>不是</b>"拿过去自动变号"的魔法——它的<b>本质</b>是等式两边同时减去了同一个数。',
        enter: function () {
          P.renderCard('$2x+3=11$<br>$2x+3-3=11-3$（两边同减 3——性质 1）<br>$2x=11-3$（写简洁些，就"像"移项了）', 'warm');
          P.renderCard('规则：<b>移项必须变号；不移动的项不变号。</b>');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
