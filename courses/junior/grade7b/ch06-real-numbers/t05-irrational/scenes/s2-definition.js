(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 绘制一张 actor 样式的示例卡（用 addPolygon 做背景矩形 + actor 做文字）
  // cx,cy: 中心坐标; w,h: 宽高; color: 主色; titleStr: 上方标题; bodyStr: 正文
  function drawCard(id, cx, cy, w, h, color, titleStr, bodyStr) {
    var hw = w / 2, hh = h / 2;
    S.addPolygon(id + '-bg', [
      [cx - hw, cy - hh],
      [cx + hw, cy - hh],
      [cx + hw, cy + hh],
      [cx - hw, cy + hh]
    ], { fillColor: color, opacity: 0.13, strokeColor: color, borderWidth: 2.5 });
    S.addText(id + '-title', cx, cy + hh - 0.55, titleStr,
      { color: color, size: 15, anchorX: 'middle', bold: true });
    S.addText(id + '-body', cx, cy - 0.15, bodyStr,
      { color: INK, size: 14, anchorX: 'middle' });
  }

  // 示例卡数据
  var CARDS = [
    {
      id: 'card-sqrt',
      cx: -6.5, cy: 1.5,
      w: 5.5, h: 3.8,
      color: WARM,
      title: '① 开方开不尽',
      body: '$\\sqrt{2},\\;\\sqrt{3},\\;\\sqrt{5}$'
    },
    {
      id: 'card-pi',
      cx: 0, cy: 1.5,
      w: 5.5, h: 3.8,
      color: COOL,
      title: '② 圆周率 $\\pi$',
      body: '$\\pi,\\;2\\pi,\\;\\dfrac{\\pi}{3}$'
    },
    {
      id: 'card-construct',
      cx: 6.5, cy: 1.5,
      w: 5.5, h: 3.8,
      color: GREEN,
      title: '③ 人为构造',
      body: '$0.101001000\\cdots$'
    },
  ];

  var scene = {
    id: 's2',
    title: '二、无理数的定义',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '数学上，把<b>无限不循环小数</b>叫作无理数。这个定义抓住两个关键字："无限"——小数位不终止；"不循环"——没有周期性重复节。有理数的小数形式不是有限就是无限循环；而无理数是"无限且不循环"的那一类。',
        enter: function (anim) {
          S.addText('def-title', 0, 6.2,
            '无理数的定义', { color: WARM, size: 22, anchorX: 'middle' });
          S.addText('def-body', 0, 5.0,
            '无限不循环小数叫作<b>无理数</b>',
            { color: INK, size: 18, anchorX: 'middle' });
          // 对比框
          S.addPolygon('contrast-rational', [
            [-8, 3.2], [0.5, 3.2], [0.5, 4.2], [-8, 4.2]
          ], { fillColor: COOL, opacity: 0.10, strokeColor: COOL, borderWidth: 1.5 });
          S.addText('rational-lbl', -7.8, 3.55,
            '有理数：有限小数 或 无限循环小数', { color: COOL, size: 14 });
          S.addPolygon('contrast-irr', [
            [-8, 2.0], [0.5, 2.0], [0.5, 3.0], [-8, 3.0]
          ], { fillColor: WARM, opacity: 0.10, strokeColor: WARM, borderWidth: 1.5 });
          S.addText('irr-lbl', -7.8, 2.35,
            '无理数：无限 <b>不</b>循环小数', { color: WARM, size: 14 });
          P.renderCard('<b>无理数</b>定义<br>无限不循环小数<br><small>关键：无限 &amp; 不循环，缺一不可</small>');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '无理数有三大常见类型。第一类：开方开不尽的数，如 $\\sqrt{2}$、$\\sqrt{3}$、$\\sqrt{5}$——注意 $\\sqrt{4}=2$ 开得尽，是有理数！第二类：圆周率 $\\pi$ 及含 $\\pi$ 的表达式，如 $2\\pi$。第三类：人为构造的无限不循环小数，如 $0.101001000100001\\cdots$——每节之间多一个 $0$，永不循环。',
        enter: function (anim) {
          var p = Promise.resolve();
          CARDS.forEach(function (c, i) {
            p = p.then(function () {
              drawCard(c.id, c.cx, c.cy, c.w, c.h, c.color, c.title, c.body);
              return anim ? delay(350) : null;
            });
          });
          return p;
        },
      },
      {
        narration: '来记一个易错点：带根号的数不一定是无理数！比如 $\\sqrt{9}=3$ 是整数，$\\sqrt{0.04}=0.2$ 是有限小数，它们都是有理数。只有"开不尽"的根号数才是无理数。同样，$\\pi$ 的近似值 $\\dfrac{22}{7}$ 是有理数，但 $\\pi$ 本身是无理数！',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>易错警示</b><br>' +
            '$\\sqrt{9} = 3$ &nbsp;→ 有理数（开得尽！）<br>' +
            '$\\sqrt{4} = 2$ &nbsp;→ 有理数<br>' +
            '$\\dfrac{22}{7}$ &nbsp;→ 有理数（$\\pi$ 的近似，不是 $\\pi$）<br>' +
            '$\\pi$ &nbsp;→ 无理数', 'warm');
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
