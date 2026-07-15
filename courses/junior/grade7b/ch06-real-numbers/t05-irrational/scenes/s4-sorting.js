(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var PURPLE = '#6a1b9a', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 分拣动画：数字卡从中央出发，分别飞入左筐（有理数）或右筐（无理数）
  // 筐的坐标：左筐中心 (-6, -2)，右筐中心 (6, -2)
  var BASKET_RAT_CX = -5.5;
  var BASKET_IRR_CX = 5.5;
  var BASKET_Y = -2.0;
  var BASKET_W = 6.5;
  var BASKET_H = 4.5;

  // 数字卡数据：[id, 显示文本, 起始x, 起始y, 目标'rat'|'irr', 落点x偏移, 落点y偏移, 说明]
  // 起始排列：-9到9之间均匀分布，初始y=4.0
  // 7张数字卡：22/7, π, √9, √7, 0, -3.14, 0.101001...
  var CARDS = [
    { id: 'c1', label: '$\\dfrac{22}{7}$',       sx: -7.5, sy: 4.8, dest: 'rat', dx:  0.0, dy:  0.8, note: '$\\frac{22}{7}$ 是分数，是有理数（$\\pi$ 的近似值，但不等于 $\\pi$）' },
    { id: 'c2', label: '$\\pi$',                 sx: -4.5, sy: 4.8, dest: 'irr', dx:  0.0, dy:  0.8, note: '$\\pi=3.14159\\cdots$ 无限不循环，是无理数' },
    { id: 'c3', label: '$\\sqrt{9}$',            sx: -1.5, sy: 4.8, dest: 'rat', dx:  0.0, dy: -0.0, note: '$\\sqrt{9}=3$ 是整数，是有理数（陷阱题！）' },
    { id: 'c4', label: '$\\sqrt{7}$',            sx:  1.5, sy: 4.8, dest: 'irr', dx:  0.0, dy: -0.0, note: '$\\sqrt{7}$ 开不尽，是无理数' },
    { id: 'c5', label: '$0$',                    sx:  4.5, sy: 4.8, dest: 'rat', dx: -1.5, dy: -0.8, note: '$0$ 是整数，是有理数' },
    { id: 'c6', label: '$-3.14$',                sx:  7.5, sy: 4.8, dest: 'rat', dx:  1.5, dy: -0.8, note: '$-3.14$ 是有限小数，是有理数' },
    { id: 'c7', label: '$0.101001\\cdots$',      sx:  0,   sy: 2.8, dest: 'irr', dx:  0.0, dy: -0.8, note: '$0.101001\\cdots$ 是无限不循环小数，是无理数' },
  ];

  // 落入筐的坐标：按次序在筐内排列
  var ratSlots = [
    [BASKET_RAT_CX - 1.8, BASKET_Y + 1.2],
    [BASKET_RAT_CX + 0.2, BASKET_Y + 1.2],
    [BASKET_RAT_CX - 0.8, BASKET_Y - 0.2],
    [BASKET_RAT_CX + 1.5, BASKET_Y - 0.2],
  ];
  var irrSlots = [
    [BASKET_IRR_CX - 0.8, BASKET_Y + 1.2],
    [BASKET_IRR_CX + 0.8, BASKET_Y + 1.2],
    [BASKET_IRR_CX + 0.0, BASKET_Y - 0.2],
  ];
  var ratCount = 0, irrCount = 0;

  var cast = {};

  function drawBaskets() {
    // 左筐（有理数）
    S.addPolygon('basket-rat', [
      [BASKET_RAT_CX - BASKET_W / 2, BASKET_Y - BASKET_H / 2],
      [BASKET_RAT_CX + BASKET_W / 2, BASKET_Y - BASKET_H / 2],
      [BASKET_RAT_CX + BASKET_W / 2, BASKET_Y + BASKET_H / 2],
      [BASKET_RAT_CX - BASKET_W / 2, BASKET_Y + BASKET_H / 2],
    ], { fillColor: COOL, opacity: 0.10, strokeColor: COOL, borderWidth: 2.5 });
    S.addText('basket-rat-lbl', BASKET_RAT_CX, BASKET_Y + BASKET_H / 2 - 0.55,
      '有理数', { color: COOL, size: 17, anchorX: 'middle' });

    // 右筐（无理数）
    S.addPolygon('basket-irr', [
      [BASKET_IRR_CX - BASKET_W / 2, BASKET_Y - BASKET_H / 2],
      [BASKET_IRR_CX + BASKET_W / 2, BASKET_Y - BASKET_H / 2],
      [BASKET_IRR_CX + BASKET_W / 2, BASKET_Y + BASKET_H / 2],
      [BASKET_IRR_CX - BASKET_W / 2, BASKET_Y + BASKET_H / 2],
    ], { fillColor: WARM, opacity: 0.10, strokeColor: WARM, borderWidth: 2.5 });
    S.addText('basket-irr-lbl', BASKET_IRR_CX, BASKET_Y + BASKET_H / 2 - 0.55,
      '无理数', { color: WARM, size: 17, anchorX: 'middle' });
  }

  function spawnCard(c) {
    cast[c.id] = S.actor('sort-' + c.id, c.sx, c.sy, c.label,
      { color: INK, size: 16 });
  }

  function flyCard(c, anim) {
    var slot, tx, ty;
    if (c.dest === 'rat') {
      slot = ratSlots[ratCount] || [BASKET_RAT_CX, BASKET_Y];
      ratCount++;
      tx = slot[0]; ty = slot[1];
    } else {
      slot = irrSlots[irrCount] || [BASKET_IRR_CX, BASKET_Y];
      irrCount++;
      tx = slot[0]; ty = slot[1];
    }
    var dur = anim ? 900 : 0;
    return cast[c.id].moveTo(tx, ty, dur);
  }

  var scene = {
    id: 's4',
    title: '四、分类练习：分拣数字卡',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      cast = {};
      ratCount = 0; irrCount = 0;
    },
    steps: [
      {
        narration: '现在来做分类练习！这里有七张数字卡，请你判断每张卡属于有理数还是无理数，然后将它们分别投入对应的筐中。注意 $\\sqrt{9}$ 和 $\\dfrac{22}{7}$ 是两道陷阱题，仔细想清楚！',
        enter: function (anim) {
          drawBaskets();
          // 生成所有数字卡
          CARDS.forEach(function (c) { spawnCard(c); });
          P.renderCard('判断方法：<br>有理数 = 有限小数 或 无限循环小数<br>无理数 = 无限不循环小数');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '$\\dfrac{22}{7}$ 飞入有理数筐！$\\dfrac{22}{7}$ 是分数，分子分母都是整数，所以是有理数。很多同学以为它是 $\\pi$，但 $\\dfrac{22}{7}\\approx 3.1428\\cdots$ 是 $\\pi$ 的近似值，它们并不相等！',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(CARDS[0].note, 'cool');
          return flyCard(CARDS[0], anim);
        },
      },
      {
        narration: '$\\pi$ 飞入无理数筐！$\\pi = 3.14159265\\cdots$ 是无限不循环小数，是无理数。注意：$3.14$ 是 $\\pi$ 的近似有理数，$\\pi$ 本身是无理数。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(CARDS[1].note, 'warm');
          return flyCard(CARDS[1], anim);
        },
      },
      {
        narration: '陷阱题！$\\sqrt{9}$ 飞入有理数筐——因为 $\\sqrt{9}=3$，是整数！带根号不一定是无理数，关键要看能不能开得尽。如果开得尽，结果是有理数；开不尽，才是无理数。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(CARDS[2].note, 'cool');
          return flyCard(CARDS[2], anim);
        },
      },
      {
        narration: '$\\sqrt{7}$ 飞入无理数筐！$2^2=4<7<9=3^2$，所以 $\\sqrt{7}$ 在 $2$ 和 $3$ 之间，它不是整数；用任何分数都无法精确表示它，是无限不循环小数，是无理数。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(CARDS[3].note, 'warm');
          return flyCard(CARDS[3], anim);
        },
      },
      {
        narration: '$0$、$-3.14$、$0.101001\\cdots$ 三张牌一起揭晓！$0$ 是整数，有理数；$-3.14$ 是有限小数，有理数；$0.101001000100001\\cdots$ 每两个 $1$ 之间多一个 $0$，永不循环，是无理数！',
        enter: function (anim) {
          P.clearExtras();
          P.renderTable({
            head: ['数', '类型', '理由'],
            rows: [
              ['$0$', '有理数', '整数'],
              ['$-3.14$', '有理数', '有限小数'],
              ['$0.101001\\cdots$', '无理数', '无限不循环'],
            ]
          });
          var dur = anim ? 800 : 0;
          var p = cast[CARDS[4].id].moveTo(ratSlots[ratCount] ? ratSlots[ratCount][0] : BASKET_RAT_CX, ratSlots[ratCount] ? ratSlots[ratCount][1] : BASKET_Y - 0.5, dur);
          ratCount++;
          p = p.then(function () {
            var slot = ratSlots[ratCount] || [BASKET_RAT_CX + 0.5, BASKET_Y - 0.8];
            return cast[CARDS[5].id].moveTo(slot[0], slot[1], anim ? 800 : 0);
          });
          ratCount++;
          p = p.then(function () {
            var slot = irrSlots[irrCount] || [BASKET_IRR_CX, BASKET_Y - 0.5];
            return cast[CARDS[6].id].moveTo(slot[0], slot[1], anim ? 800 : 0);
          });
          irrCount++;
          return p;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
