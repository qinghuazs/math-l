(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var AMBER = '#f57f17', PURPLE = '#6a1b9a';
  var SEAT_NORMAL = '#b0bec5';
  var SEAT_W = 1.2, SEAT_H = 0.8, COL_GAP = 1.4, ROW_GAP = 1.1;
  var GRID_X0 = -5.6, GRID_Y0 = 5.5;
  var ROWS = 5, COLS = 6;

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function seatX(col) { return GRID_X0 + (col - 1) * COL_GAP; }
  function seatY(row) { return GRID_Y0 - (row - 1) * ROW_GAP; }

  function drawGrid() {
    var r, c, x, y, id;
    for (r = 1; r <= ROWS; r++) {
      for (c = 1; c <= COLS; c++) {
        x = seatX(c);
        y = seatY(r);
        id = 's4-seat-' + r + '-' + c;
        S.addPolygon(id, [
          [x, y], [x + SEAT_W, y], [x + SEAT_W, y - SEAT_H], [x, y - SEAT_H]
        ], { color: SEAT_NORMAL, opacity: 0.35, borderColor: '#90a4ae', borderWidth: 1 });
      }
      S.addText('s4-row-' + r, GRID_X0 - 1.0, seatY(r) - SEAT_H / 2,
        '第' + r + '排', { color: INK, size: 13 });
    }
    for (c = 1; c <= COLS; c++) {
      S.addText('s4-col-' + c, seatX(c) + SEAT_W / 2 - 0.2, GRID_Y0 + 0.5,
        c + '号', { color: INK, size: 13 });
    }
  }

  function highlightSeat(row, col, color, label) {
    var id = 's4-seat-' + row + '-' + col;
    var x = seatX(col), y = seatY(row);
    S.remove(id);
    S.addPolygon(id, [
      [x, y], [x + SEAT_W, y], [x + SEAT_W, y - SEAT_H], [x, y - SEAT_H]
    ], { color: color, opacity: 0.88, borderColor: color, borderWidth: 2.5 });
    if (label) {
      S.actor('s4-lbl-' + row + '-' + col, x + SEAT_W / 2, y - SEAT_H / 2,
        label, { color: '#fff', size: 13, bold: true });
    }
  }

  var scene = {
    id: 's4',
    title: '四、课堂练习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '来做几道练习！约定：排数在前，号数在后。看下面的座位图，请写出各高亮位置的有序数对。先独立思考，再看答案。',
        enter: function (anim) {
          S.addText('s4-title', 0, 6.8, '练习一：位置 → 有序数对', { color: INK, size: 22, anchorX: 'middle' });
          drawGrid();
          highlightSeat(1, 3, WARM, 'A');
          highlightSeat(2, 5, COOL, 'B');
          highlightSeat(4, 2, GREEN, 'C');
          highlightSeat(5, 6, PURPLE, 'D');
          P.renderCard(
            '约定：排数在前，号数在后<br>' +
            'A（第1排3号） → ?<br>' +
            'B（第2排5号） → ?<br>' +
            'C（第4排2号） → ?<br>' +
            'D（第5排6号） → ?',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '来对答案！A 是第1排3号，写作 $(1, 3)$；B 是第2排5号，写作 $(2, 5)$；C 是第4排2号，写作 $(4, 2)$；D 是第5排6号，写作 $(5, 6)$。注意每对数的顺序和数值都要准确。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>答案揭晓：</b><br>' +
            'A → <b>$(1, 3)$</b>（第1排3号）<br>' +
            'B → <b>$(2, 5)$</b>（第2排5号）<br>' +
            'C → <b>$(4, 2)$</b>（第4排2号）<br>' +
            'D → <b>$(5, 6)$</b>（第5排6号）',
            'cool', 'flipInX'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '现在反过来练习！给你有序数对，请在座位网格上找到对应位置。$(2, 4)$ 是第2排4号，$(3, 1)$ 是第3排1号，$(1, 6)$ 是第1排6号——看，有序数对和位置之间是一一对应的！',
        enter: function (anim) {
          P.clearExtras();
          S.addText('s4-title2', 0, 6.8, '练习二：有序数对 → 位置', { color: INK, size: 22, anchorX: 'middle' });
          if (anim) {
            return delay(200).then(function () {
              highlightSeat(2, 4, AMBER, '(2,4)');
              return delay(500);
            }).then(function () {
              highlightSeat(3, 1, COOL, '(3,1)');
              return delay(500);
            }).then(function () {
              highlightSeat(1, 6, GREEN, '(1,6)');
              return delay(400);
            }).then(function () {
              P.renderCard(
                '$(2,4)$ → 第<b>2</b>排第<b>4</b>号<br>' +
                '$(3,1)$ → 第<b>3</b>排第<b>1</b>号<br>' +
                '$(1,6)$ → 第<b>1</b>排第<b>6</b>号',
                'cool'
              );
            });
          }
          highlightSeat(2, 4, AMBER, '(2,4)');
          highlightSeat(3, 1, COOL, '(3,1)');
          highlightSeat(1, 6, GREEN, '(1,6)');
          P.renderCard(
            '$(2,4)$ → 第<b>2</b>排第<b>4</b>号<br>' +
            '$(3,1)$ → 第<b>3</b>排第<b>1</b>号<br>' +
            '$(1,6)$ → 第<b>1</b>排第<b>6</b>号',
            'cool'
          );
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
