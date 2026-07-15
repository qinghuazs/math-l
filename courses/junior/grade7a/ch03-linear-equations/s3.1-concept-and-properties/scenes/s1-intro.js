(function (CW) {
  'use strict';
  // 场景模板约定同前两课：S=stage P=panel；enter(anim) 含舞台动画必须 return 其 Promise。
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';
  var CARD_W = 'background:#fbe9e7;border:2px solid #e64a19;border-radius:8px;padding:4px 14px;';
  var CARD_C = 'background:#e3f2fd;border:2px solid #1565c0;border-radius:8px;padding:4px 14px;';
  var CARD_I = 'background:#eceff1;border:2px solid #90a4ae;border-radius:8px;padding:4px 14px;';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、情境导入：把问题写成式子',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '文具店里：一个文具盒和 3 支相同的笔，一共 18 元。文具盒 9 元，<b>每支笔多少元</b>？',
        enter: function (anim) {
          var items = [
            ['s1-box', -6.2, 3.2, '文具盒 9 元', WARM, CARD_W],
            ['s1-p1', -2.6, 3.2, '笔 ? 元', COOL, CARD_C],
            ['s1-p2', -0.2, 3.2, '笔 ? 元', COOL, CARD_C],
            ['s1-p3', 2.2, 3.2, '笔 ? 元', COOL, CARD_C],
            ['s1-sum', 6.2, 3.2, '共 18 元', INK, CARD_I],
          ];
          var p = Promise.resolve();
          items.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: 18, bold: true, css: it[5] });
              return anim ? delay(200) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '笔的价格不知道——就用字母 $x$ 来表示：<b>设每支笔 $x$ 元</b>。总价关系写成式子，就是一个方程。',
        enter: function (anim) {
          var parts = [
            ['s1-e1', -4.2, -0.6, '9', WARM],
            ['s1-e2', -2.9, -0.6, '+', INK],
            ['s1-e3', -1.4, -0.6, '3x', COOL],
            ['s1-e4', 0.4, -0.6, '=', INK],
            ['s1-e5', 2.0, -0.6, '18', INK],
          ];
          P.renderCard('设每支笔 $x$ 元，3 支笔共 $3x$ 元：<br>$9+3x=18$');
          var p = Promise.resolve();
          parts.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: 34, bold: true });
              return anim ? delay(260) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '为什么中间是<b>等号</b>？左边 $9+3x$ 是按单价算出来的总价，右边 $18$ 是已知的总价——<b>两边表示同一个量</b>，所以相等。',
        enter: function () {
          S.addSegment('s1-ul', [-4.9, -1.6], [-0.4, -1.6], { color: WARM, width: 3, dash: 0 });
          S.actor('s1-lab1', -2.6, -2.5, '算出来的总价', { color: WARM, size: 16 });
          S.addSegment('s1-ur', [1.3, -1.6], [2.7, -1.6], { color: COOL, width: 3, dash: 0 });
          S.actor('s1-lab2', 2.0, -2.5, '已知的总价', { color: COOL, size: 16 });
          P.renderCard('方程不是拼凑出来的——它是实际问题中<b>相等关系</b>的数学表达。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
