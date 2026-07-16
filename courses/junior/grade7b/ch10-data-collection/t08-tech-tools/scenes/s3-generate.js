(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a', AMBER = '#f57f17';

  // 数据
  var ITEMS  = ['篮球', '足球', '羽毛球', '乒乓球', '其他'];
  var COUNTS = [12, 8, 10, 6, 4];
  var COLORS = [BLUE, WARM, GREEN, PURPLE, AMBER];
  var TOTAL  = 40;

  // ========== 条形图布局（左半区，keepAspect bbox [-8,8,8,-8]）==========
  // 画板 16×16 等比，左半 x∈[-7.5,-1.5]，y∈[-7,7]
  var BAR_XS    = [-6.5, -5.5, -4.5, -3.5, -2.5];
  var BAR_W     = 0.7;
  var BAR_SCALE = 0.44;  // 频数→高度（12*0.44≈5.3，适合）
  var BAR_Y0    = -6.5;  // 柱底 y

  // ========== 折线图布局（左半，与条形共用坐标系）==========
  var LINE_XS = [-6.5, -5.5, -4.5, -3.5, -2.5];

  // ========== 扇形图布局（右半区）==========
  var PIE_CX = 3.5, PIE_CY = 0, PIE_R = 3.5;
  var pieAngles    = [];
  var pieMidAngles = [];

  function computePieAngles() {
    var a = 90;
    var i;
    pieAngles    = [];
    pieMidAngles = [];
    for (i = 0; i < ITEMS.length; i++) {
      pieAngles[i] = a;
      var span = COUNTS[i] / TOTAL * 360;
      pieMidAngles[i] = a + span / 2;
      a += span;
    }
  }

  // 闭包高度（setup 重置）
  var barH = [0, 0, 0, 0, 0];

  // -------- 条形图辅助：手工坐标轴（axis:false 画板需自画）--------
  function drawBarAxis() {
    var i;
    // x 轴
    S.addSegment('s3-bar-xa', [-7.5, BAR_Y0], [-1.8, BAR_Y0], { color: INK, width: 2 });
    // y 轴
    S.addSegment('s3-bar-ya', [-7.5, BAR_Y0], [-7.5, 6.5], { color: INK, width: 2 });
    // y 轴刻度 2,4,6,8,10,12
    var yticks = [2, 4, 6, 8, 10, 12];
    for (i = 0; i < yticks.length; i++) {
      var yy = BAR_Y0 + yticks[i] * BAR_SCALE;
      S.addSegment('s3-bar-yt' + i, [-7.6, yy], [-7.4, yy], { color: INK, width: 1 });
      S.addText('s3-bar-ytl' + i, -7.7, yy, '' + yticks[i], { size: 9, color: INK, anchorX: 'right' });
    }
    // x 轴标签
    for (i = 0; i < ITEMS.length; i++) {
      S.addText('s3-bar-xl' + i, BAR_XS[i], BAR_Y0 - 0.7, ITEMS[i], { size: 9, color: INK, anchorX: 'middle' });
    }
    S.addText('s3-bar-title', -4.8, 7.3, '条形统计图', { size: 13, color: BLUE, anchorX: 'middle' });
    S.addText('s3-bar-yu', -7.7, 6.5, '人', { size: 9, color: INK, anchorX: 'right' });
  }

  function growBar(idx, anim) {
    var target = COUNTS[idx] * BAR_SCALE;
    var bx = BAR_XS[idx], bw2 = BAR_W / 2;
    if (!anim) {
      barH[idx] = target;
      S.addPolygon('s3-bar' + idx, [
        [bx - bw2, BAR_Y0],
        [bx + bw2, BAR_Y0],
        [bx + bw2, BAR_Y0 + target],
        [bx - bw2, BAR_Y0 + target],
      ], { color: COLORS[idx], opacity: 0.82, borderWidth: 1, borderColor: COLORS[idx] });
      S.addText('s3-bar-lbl' + idx, bx, BAR_Y0 + target + 0.3,
        '' + COUNTS[idx], { size: 10, color: COLORS[idx], anchorX: 'middle' });
      return Promise.resolve();
    }
    barH[idx] = 0;
    return S.animate({
      from: 0, to: target, duration: 500, easing: 'easeOutCubic',
      onUpdate: function (v) {
        barH[idx] = v;
        S.addPolygon('s3-bar' + idx, [
          [bx - bw2, BAR_Y0],
          [bx + bw2, BAR_Y0],
          [bx + bw2, BAR_Y0 + v],
          [bx - bw2, BAR_Y0 + v],
        ], { color: COLORS[idx], opacity: 0.82, borderWidth: 1, borderColor: COLORS[idx] });
      },
    }).then(function () {
      S.addText('s3-bar-lbl' + idx, bx, BAR_Y0 + target + 0.3,
        '' + COUNTS[idx], { size: 10, color: COLORS[idx], anchorX: 'middle' });
    });
  }

  function growAllBars(anim) {
    var p = Promise.resolve(), i;
    for (i = 0; i < ITEMS.length; i++) {
      (function (idx) { p = p.then(function () { return growBar(idx, anim); }); })(i);
    }
    return p;
  }

  // -------- 扇形图 --------
  function drawPieLabel(idx) {
    var mid = pieMidAngles[idx] * Math.PI / 180;
    var lx = PIE_CX + (PIE_R + 1.1) * Math.cos(mid);
    var ly = PIE_CY + (PIE_R + 1.1) * Math.sin(mid);
    var pct = Math.round(COUNTS[idx] / TOTAL * 100);
    S.addText('s3-pie-lbl' + idx, lx, ly,
      ITEMS[idx] + '\n' + pct + '%',
      { size: 11, color: COLORS[idx], anchorX: 'middle' });
  }

  function drawSector(idx, anim) {
    var a0 = pieAngles[idx];
    var span = COUNTS[idx] / TOTAL * 360;
    var a1 = a0 + span;
    if (!anim) {
      S.addSector('s3-sec' + idx, [PIE_CX, PIE_CY], PIE_R, a0, a1, { color: COLORS[idx], fillOpacity: 0.78 });
      return Promise.resolve();
    }
    return S.animate({
      from: a0, to: a1, duration: 500, easing: 'easeOutCubic',
      onUpdate: function (v) {
        S.addSector('s3-sec' + idx, [PIE_CX, PIE_CY], PIE_R, a0, v, { color: COLORS[idx], fillOpacity: 0.78 });
      },
    }).then(function () {
      S.addSector('s3-sec' + idx, [PIE_CX, PIE_CY], PIE_R, a0, a1, { color: COLORS[idx], fillOpacity: 0.78 });
    });
  }

  function growAllSectors(anim) {
    var p = Promise.resolve(), i;
    for (i = 0; i < ITEMS.length; i++) {
      (function (idx) { p = p.then(function () { return drawSector(idx, anim); }); })(i);
    }
    return p.then(function () {
      var j;
      for (j = 0; j < ITEMS.length; j++) { drawPieLabel(j); }
    });
  }

  // -------- 折线图 --------
  function drawLineChart(anim) {
    var i;
    var pts = [];
    for (i = 0; i < ITEMS.length; i++) {
      pts.push([LINE_XS[i], BAR_Y0 + COUNTS[i] * BAR_SCALE]);
    }
    // 坐标轴
    S.addSegment('s3-ln-xa', [-7.5, BAR_Y0], [-1.8, BAR_Y0], { color: INK, width: 2 });
    S.addSegment('s3-ln-ya', [-7.5, BAR_Y0], [-7.5, 6.5], { color: INK, width: 2 });
    // 刻度
    var yticks = [2, 4, 6, 8, 10, 12];
    for (i = 0; i < yticks.length; i++) {
      var yy = BAR_Y0 + yticks[i] * BAR_SCALE;
      S.addSegment('s3-ln-yt' + i, [-7.6, yy], [-7.4, yy], { color: INK, width: 1 });
      S.addText('s3-ln-ytl' + i, -7.7, yy, '' + yticks[i], { size: 9, color: INK, anchorX: 'right' });
    }
    for (i = 0; i < ITEMS.length; i++) {
      S.addText('s3-ln-xl' + i, LINE_XS[i], BAR_Y0 - 0.7, ITEMS[i], { size: 9, color: INK, anchorX: 'middle' });
    }
    S.addText('s3-ln-title', -4.8, 7.3, '折线统计图', { size: 13, color: WARM, anchorX: 'middle' });
    if (!anim) {
      S.addPolyline('s3-polyline', pts, { color: WARM, width: 2.5 });
      for (i = 0; i < pts.length; i++) {
        // 用小正方形代替点（addPolygon）
        var px = pts[i][0], py = pts[i][1], pd = 0.18;
        S.addPolygon('s3-ln-pt' + i, [
          [px - pd, py - pd], [px + pd, py - pd],
          [px + pd, py + pd], [px - pd, py + pd],
        ], { color: WARM, opacity: 1, borderWidth: 0 });
        S.addText('s3-ln-lbl' + i, px, py + 0.45, '' + COUNTS[i], { size: 10, color: WARM, anchorX: 'middle' });
      }
      return Promise.resolve();
    }
    // 动画：逐段顺序出现
    var p = Promise.resolve();
    for (i = 0; i < pts.length; i++) {
      (function (idx) {
        p = p.then(function () {
          var px = pts[idx][0], py = pts[idx][1], pd = 0.18;
          S.addPolygon('s3-ln-pt' + idx, [
            [px - pd, py - pd], [px + pd, py - pd],
            [px + pd, py + pd], [px - pd, py + pd],
          ], { color: WARM, opacity: 1, borderWidth: 0 });
          S.addText('s3-ln-lbl' + idx, px, py + 0.45, '' + COUNTS[idx], { size: 10, color: WARM, anchorX: 'middle' });
          if (idx > 0) {
            S.addPolyline('s3-ln-seg' + idx, [pts[idx - 1], pts[idx]], { color: WARM, width: 2.5 });
          }
          return new Promise(function (res) { setTimeout(res, 200); });
        });
      })(i);
    }
    return p;
  }

  var scene = {
    id: 's3',
    title: '三、一键生成三种图',
    board: { axis: false, keepAspect: true },
    bbox: [-8, 8, 8, -8],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      barH = [0, 0, 0, 0, 0];
      computePieAngles();
    },
    steps: [
      {
        narration: '选好数据、点击"插入图表"之后，软件会问你：要生成哪种统计图？<b>条形图</b>、<b>扇形图</b>还是<b>折线图</b>？我们用体育项目频数数据——篮球12、足球8、羽毛球10、乒乓球6、其他4（共40人）——来依次体验三种图的"一键生成"效果！',
        enter: function () {
          P.renderTable({
            head: ['体育项目', '频数（人）', '百分比'],
            rows: [
              ['篮球',   '12', '30%'],
              ['足球',   '8',  '20%'],
              ['羽毛球', '10', '25%'],
              ['乒乓球', '6',  '15%'],
              ['其他',   '4',  '10%'],
              ['合计',   '40', '100%'],
            ],
          });
          // 中央图示文字
          S.addText('s3-intro1', 0, 3.5, '同一组数据 → 三种图表', { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('s3-intro2', 0, 1.5, '条形图  ／  扇形图  ／  折线图', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('s3-intro3', 0, -0.5, '点击"下一步"依次生成！', { size: 13, color: WARM, anchorX: 'middle' });
        },
      },
      {
        narration: '第一种：<b>条形统计图</b>！软件瞬间生成，每根柱的高度对应频数。篮球最高（12人），其他最低（4人），差距一目了然。条形图最擅长<b>比较各类别的多少</b>！电子表格生成的条形图颜色美观、刻度精准。',
        enter: function (anim) {
          drawBarAxis();
          return growAllBars(anim);
        },
      },
      {
        narration: '第二种：<b>扇形统计图</b>！切换一下，软件立刻变成扇形图——整个圆代表全班40人（100%），每块扇形代表一种项目的比例。篮球占 30%（最大扇形），其他占 10%（最小扇形）。扇形图擅长表示<b>各部分占总体的比例</b>！',
        enter: function (anim) {
          S.addText('s3-pie-title', PIE_CX, 5.5, '扇形统计图', { size: 14, color: GREEN, anchorX: 'middle' });
          return growAllSectors(anim);
        },
      },
      {
        narration: '第三种：<b>折线统计图</b>！折线图用各点的位置表示频数，折线连接各点，体现数据变化趋势。注意：体育项目是类别数据，折线图一般用于随时间变化的数据；这里仅演示软件生成效果。折线图最适合表示<b>随时间变化的趋势</b>！三种图，一键切换，电子表格的强大显而易见！',
        enter: function (anim) {
          return drawLineChart(anim);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
