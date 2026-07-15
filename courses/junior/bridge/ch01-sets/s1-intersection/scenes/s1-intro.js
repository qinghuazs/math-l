(function (CW) {
  'use strict';
  // 场景模板约定同指数函数课：S=stage P=panel；enter(anim) 含舞台动画必须 return 其 Promise。
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';
  var R = 3.3;
  var ax = -5.2, bx = 5.2; // 两圆圆心 x（闭包驱动"靠拢"动画）
  var cast = {};           // 名字演员句柄

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function addCircles() {
    ax = -5.2; bx = 5.2;
    S.addCircle('s1-ca', function () { return ax; }, 0, R, { color: WARM, width: 3.5, fill: WARM, fillOpacity: 0.08 });
    S.addCircle('s1-cb', function () { return bx; }, 0, R, { color: COOL, width: 3.5, fill: COOL, fillOpacity: 0.08 });
    cast.ta = S.actor('s1-ta', -5.2, 4.3, 'A · 喜欢篮球', { color: WARM, size: 19, bold: true });
    cast.tb = S.actor('s1-tb', 5.2, 4.3, 'B · 喜欢足球', { color: COOL, size: 19, bold: true });
  }

  // [id, 初x, 初y, 名字, 颜色, 终x, 终y]（xh2/xl2 是 B 圈里的另一份，合拢后与 A 圈份重合并删除）
  var ROSTER = [
    ['xm', -6.3, 1.2, '小明', INK, -3.9, 1.1],
    ['xh', -4.1, 1.2, '小华', PURPLE, 0, 1.0],
    ['xl', -4.1, -1.2, '小丽', PURPLE, 0, -1.0],
    ['xg', -6.3, -1.2, '小刚', INK, -3.9, -1.1],
    ['xh2', 4.1, 1.2, '小华', PURPLE, 0, 1.0],
    ['xq', 6.3, 1.2, '小强', INK, 3.9, 1.1],
    ['xl2', 4.1, -1.2, '小丽', PURPLE, 0, -1.0],
    ['xy', 6.3, -1.2, '小宇', INK, 3.9, -1.1],
  ];

  function addRoster(anim) {
    var p = Promise.resolve();
    ROSTER.forEach(function (r) {
      p = p.then(function () {
        cast[r[0]] = S.actor('s1-' + r[0], r[1], r[2], r[3], { color: r[4], size: 17 });
        return anim ? delay(140) : null;
      });
    });
    return p;
  }

  // 一组文本元素字号呼吸 n 次
  function breathe(ids, times) {
    var objs = ids.map(function (id) { return S.get('s1-' + id); });
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
    id: 's1',
    title: '一、情境导入：找"共同的人"',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; cast = {}; },
    steps: [
      {
        narration: '班级兴趣调查：集合 $A$ 是喜欢<b>篮球</b>的同学，集合 $B$ 是喜欢<b>足球</b>的同学。',
        enter: function (anim) {
          addCircles();
          P.renderCard('$A=\\{$小明、小华、小丽、小刚$\\}$<br>$B=\\{$小华、小强、小丽、小宇$\\}$');
          return addRoster(anim);
        },
      },
      {
        narration: '问题：哪些同学<b>既</b>喜欢篮球，<b>又</b>喜欢足球？——找找看，谁的名字在两个圈里都出现了？',
        enter: function (anim) {
          return anim ? breathe(['xh', 'xl', 'xh2', 'xl2'], 2) : null;
        },
      },
      {
        narration: '把两个圈<b>靠在一起</b>——同时属于两个集合的同学，就站进了<b>重叠的区域</b>。',
        enter: function (anim) {
          var d = anim ? 1300 : 0;
          var moves = [
            S.animate({
              from: ax, to: -2.2, duration: d,
              onUpdate: function (v) { ax = v; bx = -v; S.getBoard().update(); },
            }),
            cast.ta.moveTo(-2.2, 4.3, d),
            cast.tb.moveTo(2.2, 4.3, d),
          ];
          ROSTER.forEach(function (r) { moves.push(cast[r[0]].moveTo(r[5], r[6], d)); });
          return Promise.all(moves).then(function () {
            S.remove('s1-xh2'); // 两份"小华"重合，只留一份
            S.remove('s1-xl2');
          });
        },
      },
      {
        narration: '小华和小丽<b>同时</b>在集合 $A$ 和集合 $B$ 中。"既……又……"表示的这种关系，就是我们今天要研究的内容。',
        enter: function () {
          P.renderCard('小明只在 $A$ 中，小强只在 $B$ 中；<br><b>小华、小丽</b>既在 $A$ 中，<b>又</b>在 $B$ 中。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
