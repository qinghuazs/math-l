(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0';
  var SEAT_NORMAL = '#b0bec5', SEAT_HL = '#f57f17';
  var SEAT_W = 1.2, SEAT_H = 0.8, COL_GAP = 1.4, ROW_GAP = 1.1;
  var GRID_X0 = -5.6, GRID_Y0 = 5.5;
  var ROWS = 6, COLS = 8;
  var seatObjs;

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function seatX(col) { return GRID_X0 + (col - 1) * COL_GAP; }
  function seatY(row) { return GRID_Y0 - (row - 1) * ROW_GAP; }

  function drawGrid() {
    seatObjs = {};
    var r, c, x, y, id;
    for (r = 1; r <= ROWS; r++) {
      for (c = 1; c <= COLS; c++) {
        x = seatX(c);
        y = seatY(r);
        id = 's1-seat-' + r + '-' + c;
        S.addPolygon(id, [
          [x, y], [x + SEAT_W, y], [x + SEAT_W, y - SEAT_H], [x, y - SEAT_H]
        ], { color: SEAT_NORMAL, opacity: 0.4, borderColor: '#90a4ae', borderWidth: 1 });
        seatObjs[id] = { x: x, y: y };
      }
      S.addText('s1-row-' + r, GRID_X0 - 1.0, seatY(r) - SEAT_H / 2,
        '第' + r + '排', { color: INK, size: 13 });
    }
    for (c = 1; c <= COLS; c++) {
      S.addText('s1-col-' + c, seatX(c) + SEAT_W / 2 - 0.2, GRID_Y0 + 0.5,
        c + '号', { color: INK, size: 13 });
    }
  }

  var scene = {
    id: 's1',
    title: '一、情境导入：电影院找座位',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      seatObjs = {};
    },
    steps: [
      {
        narration: '同学们好！我们来玩一个找座位的游戏。进入电影院，工作人员告诉你："你的座位是 <b>5号</b>"，你能找到吗？',
        enter: function (anim) {
          S.addText('s1-title', 0, 6.8, '电影院找座位', { color: INK, size: 26, anchorX: 'middle' });
          S.addText('s1-q', -4.5, 5.8, '工作人员说：你的座位是"5号"', { color: WARM, size: 18 });
          S.addText('s1-q2', -4.5, 4.8, '问：你能找到吗？', { color: COOL, size: 17 });
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '看！电影院有 6 排，每排 8 个座位，光说"5号"，每排都有 5 号！根本不知道去哪一排。我们必须同时说清楚<b>排</b>和<b>号</b>，才能唯一确定一个座位。',
        enter: function (anim) {
          S.remove('s1-q'); S.remove('s1-q2');
          drawGrid();
          P.renderCard('只说"5号" → 每排都有5号，无法确定！<br>必须同时说<b>排数</b>和<b>号数</b>才能唯一定位。', 'warm');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '比如，<b>第3排5号</b>——先找第3排，再找5号，只有唯一一个座位！这就是今天我们要研究的"有序数对"的思想：用<b>两个有顺序的数</b>确定一个位置。',
        enter: function (anim) {
          var hlId = 's1-seat-3-5';
          var x = seatX(5), y = seatY(3);
          S.remove(hlId);
          S.addPolygon(hlId, [
            [x, y], [x + SEAT_W, y], [x + SEAT_W, y - SEAT_H], [x, y - SEAT_H]
          ], { color: SEAT_HL, opacity: 0.9, borderColor: WARM, borderWidth: 2.5 });
          S.actor('s1-hl-label', x + SEAT_W / 2, y - SEAT_H / 2, '★', { color: WARM, size: 18 });
          P.clearExtras();
          P.renderCard('<b>第3排5号</b> → 唯一确定一个座位！<br>两个数缺一不可，且顺序不能颠倒。', 'warm', 'bounceIn');
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
