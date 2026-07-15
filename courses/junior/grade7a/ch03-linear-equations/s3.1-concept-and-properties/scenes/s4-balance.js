(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';
  var CSS_X = 'background:#f3e5f5;border:2.5px solid #6a1b9a;border-radius:8px;padding:6px 16px;';
  var CSS_W = 'background:#fbe9e7;border:2.5px solid #e64a19;border-radius:8px;padding:6px 14px;';
  var CSS_B = 'background:#e3f2fd;border:2.5px solid #1565c0;border-radius:8px;padding:6px 14px;';
  var wt = {}; // 砝码演员句柄

  // 静态天平（本场景始终平衡；失衡反例在 S7 演示）
  function buildScale() {
    S.addPolygon('s4-pivot', [[-0.6, -2.2], [0.6, -2.2], [0, 1.2]], { color: '#78909c' });
    S.addSegment('s4-base', [-2, -2.2], [2, -2.2], { color: INK, width: 6, dash: 0 });
    S.addSegment('s4-beam', [-4.5, 1.2], [4.5, 1.2], { color: INK, width: 5, dash: 0 });
    S.addSegment('s4-panL', [-5.6, 1.35], [-3.4, 1.35], { color: '#78909c', width: 4, dash: 0 });
    S.addSegment('s4-panR', [3.4, 1.35], [5.6, 1.35], { color: '#78909c', width: 4, dash: 0 });
  }

  // 等式大字（同 id 幂等重建）
  function eq(str) { S.actor('s4-eq', 0, 5.9, str, { color: PURPLE, size: 30, bold: true }); }

  // 落一个砝码：anim 时从顶部滑落
  function drop(id, x, label, css, anim) {
    if (anim) {
      wt[id] = S.actor(id, x, 7.2, label, { color: INK, size: 19, bold: true, css: css });
      return wt[id].moveTo(x, 2.05, 700);
    }
    wt[id] = S.actor(id, x, 2.05, label, { color: INK, size: 19, bold: true, css: css });
    return Promise.resolve();
  }
  // 砝码飞离并移除
  function flyOff(id, anim) {
    var h = wt[id];
    if (!h || !S.get(id)) return Promise.resolve();
    if (!anim) { S.remove(id); return Promise.resolve(); }
    return h.moveTo(h.obj.X(), 7.2, 700).then(function () { S.remove(id); });
  }

  var scene = {
    id: 's4',
    title: '四、天平与等式的性质',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; wt = {}; buildScale(); },
    steps: [
      {
        narration: '请出<b>天平</b>：左盘放未知物 $x$ 克和 3 克砝码，右盘放 5 克和 3 克砝码——天平<b>平衡</b>。',
        enter: function (anim) {
          eq('x + 3 = 8');
          return drop('s4-wx', -5.1, 'x', CSS_X, anim).then(function () {
            return drop('s4-w3L', -3.9, '3', CSS_W, anim);
          }).then(function () {
            return drop('s4-w5R', 3.9, '5', CSS_B, anim);
          }).then(function () {
            return drop('s4-w3R', 5.1, '3', CSS_B, anim);
          }).then(function () {
            P.renderCard('右盘 $5+3=8$（克）。天平平衡，就是等式 $x+3=8$ 成立。');
          });
        },
      },
      {
        narration: '想知道 $x$ 是多少，就要把左盘的 3 克拿走。为了天平<b>继续平衡</b>，右边也必须<b>同时</b>拿走 3 克！',
        enter: function (anim) {
          eq('x + 3 − 3 = 8 − 3');
          return Promise.all([flyOff('s4-w3L', anim), flyOff('s4-w3R', anim)]).then(function () {
            P.renderCard('<b>等式性质 1</b>：等式两边同时加上（或减去）同一个数或同一个式子，所得结果仍是等式。', 'cool');
          });
        },
      },
      {
        narration: '现在左盘只剩 $x$，右盘只剩 5 克——天平依然平衡，答案自己浮现出来了。',
        enter: function () {
          eq('x = 5');
          P.renderCard('$x=5$。解方程的过程，就是<b>保持平衡</b>地化简，直到变成 $x=a$ 的样子。', 'warm');
        },
      },
      {
        narration: '换一个情况：左盘放 <b>3 个相同的</b>未知物，总重 12 克——这就是方程 $3x=12$。',
        enter: function (anim) {
          S.remove('s4-wx'); S.remove('s4-w5R');
          eq('3x = 12');
          return drop('s4-x1', -5.4, 'x', CSS_X, anim).then(function () {
            return drop('s4-x2', -4.5, 'x', CSS_X, anim);
          }).then(function () {
            return drop('s4-x3', -3.6, 'x', CSS_X, anim);
          }).then(function () {
            return drop('s4-f1', 3.6, '4', CSS_B, anim);
          }).then(function () {
            return drop('s4-f2', 4.5, '4', CSS_B, anim);
          }).then(function () {
            return drop('s4-f3', 5.4, '4', CSS_B, anim);
          }).then(function () {
            P.renderCard('右盘的 12 克恰好是三个 4 克：$12=4+4+4$。');
          });
        },
      },
      {
        narration: '两边都<b>分成 3 等份，各留一份</b>——这就是"两边同时除以 3"。',
        enter: function (anim) {
          eq('x = 4');
          return Promise.all([
            flyOff('s4-x2', anim), flyOff('s4-x3', anim),
            flyOff('s4-f2', anim), flyOff('s4-f3', anim),
          ]).then(function () {
            P.renderCard('<b>等式性质 2</b>：等式两边同时乘同一个数，或同时除以同一个<b>不为 0</b> 的数，所得结果仍是等式。', 'cool');
            P.renderCard('口诀：<b>同加、同减、同乘、同除，两边必须同步进行。</b>', 'warm');
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
