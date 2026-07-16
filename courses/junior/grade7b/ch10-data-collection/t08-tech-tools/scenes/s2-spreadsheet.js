(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  // 数据（与 t05 保持一致，便于与前课衔接）
  var ITEMS  = ['篮球', '足球', '羽毛球', '乒乓球', '其他', '合计'];
  var COUNTS = [12, 8, 10, 6, 4, 40];

  // 电子表格网格布局（带轴画板，bbox [-1,14,7,-2]）
  var COL_A_W = 1.6;  // A 列宽
  var COL_B_W = 1.3;  // B 列宽
  var ROW_H   = 1.7;  // 行高
  var GRID_X  = 0.3;  // 左边距
  var GRID_Y  = 13.2; // 第0行（表头）顶边 y

  // 画单个单元格
  function drawCell(id, col, row, fillColor, bColor) {
    var x = GRID_X + (col === 0 ? 0 : COL_A_W);
    var w = (col === 0 ? COL_A_W : COL_B_W);
    var y = GRID_Y - row * ROW_H;
    fillColor = fillColor || '#fafafa';
    bColor = bColor || '#b0bec5';
    S.addPolygon(id, [
      [x,     y],
      [x + w, y],
      [x + w, y - ROW_H + 0.08],
      [x,     y - ROW_H + 0.08],
    ], { color: fillColor, opacity: 1, borderWidth: 1.5, borderColor: bColor });
  }

  // 画整个表格框架（表头 + 6 行数据）
  function drawGrid(highlightRows) {
    var i;
    highlightRows = highlightRows || [];
    // 表头（第0行）
    drawCell('s2-hA0', 0, 0, '#e3f2fd', BLUE);
    drawCell('s2-hB0', 1, 0, '#e3f2fd', BLUE);
    S.addText('s2-hd-A', GRID_X + COL_A_W / 2, GRID_Y - ROW_H / 2, '体育项目',
      { size: 11, color: BLUE, anchorX: 'middle' });
    S.addText('s2-hd-B', GRID_X + COL_A_W + COL_B_W / 2, GRID_Y - ROW_H / 2, '频数（人）',
      { size: 11, color: BLUE, anchorX: 'middle' });
    // 数据行 1-6
    for (i = 0; i < ITEMS.length; i++) {
      var hi = (highlightRows.indexOf(i + 1) >= 0);
      drawCell('s2-cA' + i, 0, i + 1, hi ? '#fff9c4' : '#fff', hi ? '#f9a825' : '#b0bec5');
      drawCell('s2-cB' + i, 1, i + 1, hi ? '#fff9c4' : '#fff', hi ? '#f9a825' : '#b0bec5');
    }
  }

  // 填入文字数据
  function fillData(limit) {
    var i;
    if (limit == null) { limit = ITEMS.length; }
    for (i = 0; i < limit; i++) {
      S.addText('s2-dA' + i,
        GRID_X + COL_A_W / 2,
        GRID_Y - (i + 1) * ROW_H + ROW_H / 2,
        ITEMS[i],
        { size: 12, color: i === 5 ? WARM : INK, anchorX: 'middle' });
      S.addText('s2-dB' + i,
        GRID_X + COL_A_W + COL_B_W / 2,
        GRID_Y - (i + 1) * ROW_H + ROW_H / 2,
        '' + COUNTS[i],
        { size: 12, color: i === 5 ? WARM : GREEN, anchorX: 'middle' });
    }
  }

  // 画"选中"高亮框（覆盖数据行 1-5，不含合计行）
  function drawSelectionBox() {
    var x = GRID_X;
    var y = GRID_Y - ROW_H;       // 第1行顶部
    var w = COL_A_W + COL_B_W;
    var h = ROW_H * 5;
    S.addPolygon('s2-sel-box', [
      [x,     y],
      [x + w, y],
      [x + w, y - h + 0.08],
      [x,     y - h + 0.08],
    ], { color: '#1565c0', opacity: 0.13, borderWidth: 2.5, borderColor: '#1565c0' });
  }

  var scene = {
    id: 's2',
    title: '二、电子表格基本操作',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '我们打开电子表格软件，看到的是一个由<b>行</b>和<b>列</b>组成的网格。每个格子叫做<b>单元格</b>，用"列字母+行数字"来定位，比如 A1 就是第 A 列第 1 行。现在我们在 A 列输入体育项目名称，B 列输入对应的频数。',
        enter: function () {
          drawGrid([]);
          // 列名提示
          S.addText('s2-col-A', GRID_X + COL_A_W / 2, 13.7, 'A 列', { size: 11, color: PURPLE, anchorX: 'middle' });
          S.addText('s2-col-B', GRID_X + COL_A_W + COL_B_W / 2, 13.7, 'B 列', { size: 11, color: PURPLE, anchorX: 'middle' });
          // 行号提示（1-3行）
          S.addText('s2-row1', -0.7, GRID_Y - ROW_H + ROW_H / 2, '1', { size: 11, color: PURPLE, anchorX: 'right' });
          S.addText('s2-row2', -0.7, GRID_Y - 2 * ROW_H + ROW_H / 2, '2', { size: 11, color: PURPLE, anchorX: 'right' });
          S.addText('s2-row3', -0.7, GRID_Y - 3 * ROW_H + ROW_H / 2, '3', { size: 11, color: PURPLE, anchorX: 'right' });
          // 单元格命名示例
          S.addText('s2-cell-tip', 3.7, 5.0, 'A1 = 第A列第1行单元格', { size: 12, color: PURPLE, anchorX: 'left' });
          S.addText('s2-cell-tip2', 3.7, 3.8, 'B3 = 第B列第3行单元格', { size: 12, color: GREEN, anchorX: 'left' });
          P.renderCard('<b>电子表格基本概念</b>：<br>行（横）+ 列（竖）= 单元格<br>单元格名：列字母 + 行数字（如 A1）');
        },
      },
      {
        narration: '现在逐行录入数据：A 列输入体育项目名称，B 列输入对应的频数。最后一行用<b>求和公式</b>计算合计——在 B7 单元格输入"=SUM(B2:B6)"，软件自动算出 40。看，录入完成！数据整齐排列在表格里。',
        enter: function () {
          drawGrid([]);
          fillData();
          // 公式说明（右侧）
          S.addText('s2-formula-hd', 3.8, 5.8, 'B7 单元格输入：', { size: 12, color: INK, anchorX: 'left' });
          S.addText('s2-formula-code', 3.8, 4.8, '=SUM(B2:B6)', { size: 14, color: WARM, anchorX: 'left' });
          S.addText('s2-formula-res', 3.8, 3.8, '结果自动显示：40', { size: 13, color: GREEN, anchorX: 'left' });
          S.addPolygon('s2-formula-box', [
            [3.6, 6.2],
            [7.0, 6.2],
            [7.0, 3.2],
            [3.6, 3.2],
          ], { color: '#fff8e1', opacity: 0.85, borderWidth: 1.5, borderColor: WARM });
          P.renderCard('<b>求和公式</b>：<br>=SUM(B2:B6)<br>软件自动计算合计，不需要手动加！');
        },
      },
      {
        narration: '数据录入好之后，第二步：<b>选中数据区域</b>（A1 到 B6，项目名和频数）。选中后出现蓝色高亮框。然后点击菜单"插入"→"图表"，软件就会弹出图表向导，让我们选择图表类型。就这三步——录入、选中、插入——统计图就生成了！',
        enter: function () {
          drawGrid([1, 2, 3, 4, 5]);
          fillData();
          drawSelectionBox();
          // 三步流程说明
          S.addText('s2-step1', 3.7, 5.5, '第一步：录入数据 ✓', { size: 13, color: GREEN, anchorX: 'left' });
          S.addText('s2-step2', 3.7, 4.3, '第二步：选中 A1:B6', { size: 13, color: BLUE, anchorX: 'left' });
          S.addText('s2-step3', 3.7, 3.1, '第三步：插入 → 图表', { size: 13, color: WARM, anchorX: 'left' });
          S.addPolygon('s2-steps-box', [
            [3.5, 6.0],
            [7.0, 6.0],
            [7.0, 2.5],
            [3.5, 2.5],
          ], { color: '#f3e5f5', opacity: 0.7, borderWidth: 1.5, borderColor: PURPLE });
          P.renderCard('三步生成统计图：<br>① 录入数据<br>② <b>选中</b>数据区域（蓝色高亮）<br>③ 菜单"插入→图表"');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
