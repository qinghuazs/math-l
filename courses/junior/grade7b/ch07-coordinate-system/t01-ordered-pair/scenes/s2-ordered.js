(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a';
  var SEAT_NORMAL = '#b0bec5', SEAT_HL1 = '#f57f17', SEAT_HL2 = '#1565c0';
  var SEAT_W = 1.2, SEAT_H = 0.8, COL_GAP = 1.4, ROW_GAP = 1.1;
  var GRID_X0 = -5.6, GRID_Y0 = 5.5;
  var ROWS = 6, COLS = 8;

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function seatX(col) { return GRID_X0 + (col - 1) * COL_GAP; }
  function seatY(row) { return GRID_Y0 - (row - 1) * ROW_GAP; }

  function drawGrid() {
    var r, c, x, y, id;
    for (r = 1; r <= ROWS; r++) {
      for (c = 1; c <= COLS; c++) {
        x = seatX(c);
        y = seatY(r);
        id = 's2-seat-' + r + '-' + c;
        S.addPolygon(id, [
          [x, y], [x + SEAT_W, y], [x + SEAT_W, y - SEAT_H], [x, y - SEAT_H]
        ], { color: SEAT_NORMAL, opacity: 0.35, borderColor: '#90a4ae', borderWidth: 1 });
      }
      S.addText('s2-row-' + r, GRID_X0 - 1.0, seatY(r) - SEAT_H / 2,
        '第' + r + '排', { color: INK, size: 13 });
    }
    for (c = 1; c <= COLS; c++) {
      S.addText('s2-col-' + c, seatX(c) + SEAT_W / 2 - 0.2, GRID_Y0 + 0.5,
        c + '号', { color: INK, size: 13 });
    }
  }

  function highlightSeat(row, col, color, label, labelColor) {
    var id = 's2-seat-' + row + '-' + col;
    var x = seatX(col), y = seatY(row);
    S.remove(id);
    S.addPolygon(id, [
      [x, y], [x + SEAT_W, y], [x + SEAT_W, y - SEAT_H], [x, y - SEAT_H]
    ], { color: color, opacity: 0.88, borderColor: labelColor || color, borderWidth: 2.5 });
    S.actor('s2-lbl-' + row + '-' + col, x + SEAT_W / 2, y - SEAT_H / 2,
      label, { color: labelColor || '#fff', size: 14, bold: true });
  }

  var scene = {
    id: 's2',
    title: '二、有序数对的概念',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '我们把"第3排5号"用一对数来表示：先写排数，再写号数，得到 $(3, 5)$。像这样，<b>把有顺序的两个数 $a$ 和 $b$ 组成的数对，叫作有序数对，记作 $(a, b)$</b>。',
        enter: function (anim) {
          S.addText('s2-title', 0, 6.8, '有序数对', { color: '#37474f', size: 26, anchorX: 'middle' });
          S.addText('s2-def1', -4.5, 5.5, '把有顺序的两个数 $a$ 和 $b$ 组成的数对', { color: INK, size: 17 });
          S.addText('s2-def2', -4.5, 4.5, '叫作有序数对，记作 $(a,b)$', { color: WARM, size: 18 });
          S.addText('s2-eg', -4.5, 3.2, '例：第3排5号 → $(3, 5)$', { color: COOL, size: 17 });
          P.renderCard('有序数对 $(a, b)$：<br>$a$ = 第一个数（如：排数）<br>$b$ = 第二个数（如：号数）', 'cool');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '我们在座位网格上找一找 $(3, 5)$——第3排第5号。注意：我们约定<b>第一个数是排数，第二个数是号数</b>。',
        enter: function (anim) {
          drawGrid();
          highlightSeat(3, 5, SEAT_HL1, '(3,5)', '#fff');
          P.clearExtras();
          P.renderCard('$(3, 5)$：第 <b>3</b> 排第 <b>5</b> 号<br>（排在前，号在后）', 'warm');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '现在看 $(5, 3)$——第5排第3号，和 $(3, 5)$ 是同一个座位吗？当然不是！这就是"有序"的含义：<b>$(3, 5)$ 和 $(5, 3)$ 表示的是完全不同的两个位置！</b>',
        enter: function (anim) {
          highlightSeat(5, 3, SEAT_HL2, '(5,3)', '#fff');
          S.addText('s2-neq', 3.5, 1.5, '$(3,5) \\neq (5,3)$', { color: PURPLE, size: 22 });
          P.clearExtras();
          P.renderCard(
            '$(3,5)$ — 第3排5号<br>' +
            '$(5,3)$ — 第5排3号<br>' +
            '<b>两者完全不同！有序数对中顺序不能颠倒。</b>',
            'warm', 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
