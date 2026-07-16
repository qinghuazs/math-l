(function (CW) {
  'use strict';
  // s2 全面调查（普查）
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  // 画一个简单的人形图标（圆头+身体矩形），cx/cy 为中心
  function drawPerson(baseId, cx, cy, color) {
    // 圆头
    S.addCircle(baseId + '-head', cx, cy + 1.3, 0.55, {
      color: color, width: 2, fill: color, fillOpacity: 0.25,
    });
    // 身体
    S.addPolygon(baseId + '-body', [
      [cx - 0.4, cy + 0.7],
      [cx + 0.4, cy + 0.7],
      [cx + 0.4, cy - 0.4],
      [cx - 0.4, cy - 0.4],
    ], { color: color, opacity: 0.30, borderWidth: 1.5, strokeColor: color });
  }

  var scene = {
    id: 's2',
    title: '二、全面调查（普查）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '第一种方式：<b>全面调查</b>，也叫<b>普查</b>。对调查对象中的<b>每一个个体</b>都进行调查，一个都不漏。',
        enter: function (anim) {
          // 标题
          S.actor('s2-title', 0, 6.2, '全面调查（普查）', { color: BLUE, size: 24, bold: true });

          // 定义文字卡
          S.addPolygon('s2-def-bg', [
            [-9, 4.2], [9, 4.2], [9, 2.5], [-9, 2.5],
          ], { color: BLUE, opacity: 0.08, borderWidth: 2, strokeColor: BLUE });
          S.actor('s2-def-txt', 0, 3.35,
            '对每一个调查对象都进行调查 ——"一个不漏"',
            { color: BLUE, size: 17 });

          // 绘制 6 个小人（代表全班同学，全部被调查）
          var positions = [
            [-7, 0.5], [-4.2, 0.5], [-1.4, 0.5],
            [ 1.4, 0.5], [ 4.2, 0.5], [ 7, 0.5],
          ];
          var i;
          for (i = 0; i < positions.length; i++) {
            drawPerson('s2-p' + i, positions[i][0], positions[i][1], BLUE);
          }
          // 打勾标记——每个人头上画一个 ✓
          var checkX = [-7, -4.2, -1.4, 1.4, 4.2, 7];
          for (i = 0; i < checkX.length; i++) {
            S.actor('s2-ck' + i, checkX[i], 2.3, '✓', { color: GREEN, size: 18, bold: true });
          }

          P.renderCard('<b>全面调查（普查）</b>：对调查对象的<b>每一个个体</b>都进行调查。<br>例：调查全班同学的身高，每位同学都要量。');
        },
      },
      {
        narration: '全面调查的<b>优点</b>是：数据全面，结果通常比较准确。<b>局限</b>是：工作量大、成本高、耗时长。适用于调查对象数量较少、要求精确，且调查不具破坏性的情形。',
        enter: function (anim) {
          // 优点卡
          S.addPolygon('s2-pro-bg', [
            [-9.5, -1.8], [0, -1.8], [0, -4.8], [-9.5, -4.8],
          ], { color: GREEN, opacity: 0.09, borderWidth: 2, strokeColor: GREEN });
          S.actor('s2-pro-title', -4.75, -2.3, '优 点', { color: GREEN, size: 17, bold: true });
          S.actor('s2-pro-t1', -4.75, -3.2, '· 数据全面', { color: GREEN, size: 15 });
          S.actor('s2-pro-t2', -4.75, -4.0, '· 结果准确', { color: GREEN, size: 15 });

          // 局限卡
          S.addPolygon('s2-con-bg', [
            [0.2, -1.8], [9.5, -1.8], [9.5, -4.8], [0.2, -4.8],
          ], { color: ORANGE, opacity: 0.09, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s2-con-title', 4.85, -2.3, '局 限', { color: ORANGE, size: 17, bold: true });
          S.actor('s2-con-t1', 4.85, -3.2, '· 工作量大、成本高', { color: ORANGE, size: 15 });
          S.actor('s2-con-t2', 4.85, -4.0, '· 耗时较长', { color: ORANGE, size: 15 });

          P.renderCard('全面调查<b>优点</b>：数据全面，结果准确。<br><b>局限</b>：工作量大、成本高、耗时长。');
        },
      },
      {
        narration: '哪些情形适合使用全面调查？——调查对象数量较少、结果要求非常精确、调查过程不会损坏对象。典型例子：全国人口普查、调查全班学生视力、统计当天到校人数。',
        enter: function (anim) {
          // 适用情境
          S.addPolygon('s2-scene-bg', [
            [-9.5, -5.4], [9.5, -5.4], [9.5, -7.3], [-9.5, -7.3],
          ], { color: BLUE, opacity: 0.07, borderWidth: 1.5, strokeColor: BLUE });
          S.actor('s2-scene-label', 0, -5.85, '适用情境', { color: BLUE, size: 16, bold: true });
          S.actor('s2-scene-t1', -3.5, -6.6,
            '对象少  ·  要求精确  ·  调查无破坏性',
            { color: INK, size: 14 });

          // 三个具体例子
          S.actor('s2-eg1', -6.5, -5.85, '全国人口普查', { color: GRAY, size: 13 });
          S.actor('s2-eg2', 0,    -5.85, '→ 全班身高', { color: GRAY, size: 13 });
          S.actor('s2-eg3', 6.5,  -5.85, '当天到校人数', { color: GRAY, size: 13 });

          P.renderCard('<b>适用情境</b>：对象少、要求精确、无破坏性。<br>典型例子：人口普查、全班体检、当天到校统计。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
