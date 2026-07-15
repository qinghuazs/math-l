(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function base() {
    S.addCircle('s2-ca', -2.2, 0, 3.3, { color: WARM, width: 3.5, fill: WARM, fillOpacity: 0.08 });
    S.addCircle('s2-cb', 2.2, 0, 3.3, { color: COOL, width: 3.5, fill: COOL, fillOpacity: 0.08 });
    S.actor('s2-ta', -3.6, 4.1, 'A', { color: WARM, size: 22, bold: true });
    S.actor('s2-tb', 3.6, 4.1, 'B', { color: COOL, size: 22, bold: true });
  }

  // A 独有：2,4,6,10（左月牙）；B 独有：3,5,12（右月牙）；公共：8（重叠区，最后落）
  var NUMS = [
    ['n2', -4.5, 1.1, '2'], ['n4', -3.3, 1.1, '4'],
    ['n6', -4.5, -1.1, '6'], ['n10', -3.3, -1.1, '10'],
    ['n3', 3.3, 1.1, '3'], ['n5', 4.5, 1.1, '5'], ['n12', 3.9, -1.1, '12'],
  ];

  function breathe8(times) {
    var o = S.get('s2-n8');
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

  function fillNums(anim) {
    var p = Promise.resolve();
    NUMS.forEach(function (n) {
      p = p.then(function () {
        S.actor('s2-' + n[0], n[1], n[2], n[3], { color: INK, size: 19, bold: true });
        return anim ? delay(160) : null;
      });
    });
    return p.then(function () {
      S.actor('s2-n8', 0, 0, '8', { color: PURPLE, size: 22, bold: true });
      return anim ? breathe8(2) : null;
    });
  }

  var scene = {
    id: 's2',
    title: '二、观察比较：发现公共元素',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; base(); },
    steps: [
      {
        narration: '再看教材中的例子。把两个集合的元素放进各自的圈里——注意看 <b>8</b> 落在了哪里？',
        enter: function (anim) {
          P.renderCard('$A=\\{2,4,6,8,10\\}$<br>$B=\\{3,5,8,12\\}$');
          return fillNums(anim);
        },
      },
      {
        narration: '还有一个集合 $C=\\{8\\}$。想一想：集合 $C$ 与集合 $A$、$B$ 有什么关系？',
        enter: function (anim) {
          P.renderCard('$C=\\{8\\}$：元素 $8$ <b>既</b>在 $A$ 中（$8\\in A$），<b>又</b>在 $B$ 中（$8\\in B$）。', 'cool');
          return anim ? breathe8(2) : null;
        },
      },
      {
        narration: '像 $8$ 这样的元素叫作两个集合的<b>公共元素</b>——"既……又……"，用数学的话说就是"<b>且</b>"。',
        enter: function () {
          P.renderCard('公共元素：既属于集合 $A$，<b>且</b>属于集合 $B$ 的元素。<br>$C=\\{8\\}$ 正是由 $A$ 与 $B$ 的公共元素组成的集合。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
