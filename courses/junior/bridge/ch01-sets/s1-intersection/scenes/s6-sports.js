(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function base() {
    S.addCircle('s6-ca', -2.2, 0, 3.3, { color: WARM, width: 3.5, fill: WARM, fillOpacity: 0.08 });
    S.addCircle('s6-cb', 2.2, 0, 3.3, { color: COOL, width: 3.5, fill: COOL, fillOpacity: 0.08 });
    S.actor('s6-ta', -3.8, 4.3, 'A · 百米赛跑', { color: WARM, size: 19, bold: true });
    S.actor('s6-tb', 3.8, 4.3, 'B · 跳高', { color: COOL, size: 19, bold: true });
  }

  var ROSTER = [
    ['xm', -4.3, 1.0, '小明', INK],
    ['xy', -3.5, -1.0, '小宇', INK],
    ['xh', 0, 1.0, '小红', PURPLE],
    ['xg', 0, -1.0, '小刚', PURPLE],
    ['xq', 3.9, 0, '小强', INK],
  ];

  function breathe(ids, times) {
    var objs = ids.map(function (id) { return S.get('s6-' + id); });
    function setAll(v) { objs.forEach(function (o) { if (o) o.setAttribute({ fontSize: v }); }); }
    var p = Promise.resolve(), i;
    for (i = 0; i < times; i++) {
      p = p.then(function () {
        return S.animate({ from: 17, to: 24, duration: 260, easing: 'easeOut', onUpdate: setAll });
      }).then(function () {
        return S.animate({ from: 24, to: 17, duration: 260, onUpdate: setAll });
      });
    }
    return p;
  }

  var scene = {
    id: 's6',
    title: '六、实际应用：运动会问题',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; base(); },
    steps: [
      {
        narration: '运动会报名：$A$ 是参加<b>百米赛跑</b>的同学，$B$ 是参加<b>跳高</b>的同学。先把名单放进图里。',
        enter: function (anim) {
          P.renderCard('$A=\\{$小明、小红、小刚、小宇$\\}$<br>$B=\\{$小红、小刚、小强$\\}$');
          var p = Promise.resolve();
          ROSTER.forEach(function (r) {
            p = p.then(function () {
              S.actor('s6-' + r[0], r[1], r[2], r[3], { color: r[4], size: 17 });
              return anim ? delay(150) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '求 $A\\cap B$——看重叠区域里站着谁？',
        enter: function (anim) {
          P.renderCard('$A\\cap B=\\{$小红、小刚$\\}$');
          return anim ? breathe(['xh', 'xg'], 2) : null;
        },
      },
      {
        narration: '最后一问：这个集合<b>表示什么</b>？要用完整的数学语言说出来，而不只是写出答案。',
        enter: function () {
          P.renderCard('$A\\cap B$ 表示：<b>既</b>参加百米赛跑，<b>又</b>参加跳高比赛的同学组成的集合。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
