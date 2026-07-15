(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';

  // 静态重建 S2 的完成态：双圆 + 全部数字就位
  function base() {
    S.addCircle('s3-ca', -2.2, 0, 3.3, { color: WARM, width: 3.5, fill: WARM, fillOpacity: 0.08 });
    S.addCircle('s3-cb', 2.2, 0, 3.3, { color: COOL, width: 3.5, fill: COOL, fillOpacity: 0.08 });
    S.actor('s3-ta', -3.6, 4.1, 'A', { color: WARM, size: 22, bold: true });
    S.actor('s3-tb', 3.6, 4.1, 'B', { color: COOL, size: 22, bold: true });
    [['n2', -4.5, 1.1, '2'], ['n4', -3.3, 1.1, '4'], ['n6', -4.5, -1.1, '6'], ['n10', -3.3, -1.1, '10'],
     ['n3', 3.3, 1.1, '3'], ['n5', 4.5, 1.1, '5'], ['n12', 3.9, -1.1, '12']].forEach(function (n) {
      S.actor('s3-' + n[0], n[1], n[2], n[3], { color: INK, size: 19, bold: true });
    });
    S.actor('s3-n8', 0, 0, '8', { color: PURPLE, size: 22, bold: true });
  }

  function breathe8(times) {
    var o = S.get('s3-n8');
    function set(v) { if (o) o.setAttribute({ fontSize: v }); }
    var p = Promise.resolve(), i;
    for (i = 0; i < times; i++) {
      p = p.then(function () {
        return S.animate({ from: 22, to: 32, duration: 280, easing: 'easeOut', onUpdate: set });
      }).then(function () {
        return S.animate({ from: 32, to: 22, duration: 280, onUpdate: set });
      });
    }
    return p;
  }

  var scene = {
    id: 's3',
    title: '三、概念形成：认识交集',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; base(); },
    steps: [
      {
        narration: '现在给这种"由公共元素组成的集合"起一个正式的名字——<b>交集</b>。',
        enter: function () {
          P.renderCard('定义：一般地，由属于集合 $A$ <b>且</b>属于集合 $B$ 的所有元素组成的集合，称为集合 $A$ 与集合 $B$ 的<b>交集</b>。', 'warm');
        },
      },
      {
        narration: '交集有专门的记号和读法，请看画板中央。',
        enter: function (anim) {
          S.actor('s3-sym', 0, 5.8, 'A ∩ B', { color: PURPLE, size: 34, bold: true });
          P.renderCard('记作：$A\\cap B$，读作"<b>$A$ 交 $B$</b>"。<br>用描述法表示：$A\\cap B=\\{x\\mid x\\in A\\text{，且 }x\\in B\\}$', 'cool');
          if (!anim) return null;
          var o = S.get('s3-sym');
          function set(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 20, to: 34, duration: 500, easing: 'easeOut', onUpdate: set });
        },
      },
      {
        narration: '回到刚才的例子：$A=\\{2,4,6,8,10\\}$，$B=\\{3,5,8,12\\}$，它们的交集是什么？',
        enter: function (anim) {
          P.renderCard('$A\\cap B=\\{8\\}$ —— 重叠区域里的那个元素。');
          return anim ? breathe8(2) : null;
        },
      },
      {
        narration: '怎么求两个集合的交集？分三步走，记住一句话就够了。',
        enter: function () {
          P.renderCard('三步法：<br>① 看集合 $A$ 中有哪些元素；<br>② 看这些元素是否<b>也在</b>集合 $B$ 中；<br>③ 把公共元素写成一个新的集合。');
          P.renderCard('口诀：<b>求交集，就是找公共元素。</b>', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
