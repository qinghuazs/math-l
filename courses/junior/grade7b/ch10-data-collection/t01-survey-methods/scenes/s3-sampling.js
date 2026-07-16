(function (CW) {
  'use strict';
  // s3 抽样调查
  var S, P;
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var INK    = '#455a64';
  var GRAY   = '#90a4ae';

  // 画小人：圆头 + 身体矩形
  function drawPerson(baseId, cx, cy, color) {
    S.addCircle(baseId + '-head', cx, cy + 1.3, 0.45, {
      color: color, width: 1.5, fill: color, fillOpacity: 0.22,
    });
    S.addPolygon(baseId + '-body', [
      [cx - 0.32, cy + 0.82],
      [cx + 0.32, cy + 0.82],
      [cx + 0.32, cy - 0.1],
      [cx - 0.32, cy - 0.1],
    ], { color: color, opacity: 0.25, borderWidth: 1, strokeColor: color });
  }

  var scene = {
    id: 's3',
    title: '三、抽样调查',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '第二种方式：<b>抽样调查</b>。从全体调查对象（<b>总体</b>）中，<b>抽取一部分个体</b>（<b>样本</b>）进行调查，再用样本的结果来估计总体情况。',
        enter: function (anim) {
          // 标题
          S.actor('s3-title', 0, 6.2, '抽样调查', { color: PURPLE, size: 24, bold: true });

          // 定义框
          S.addPolygon('s3-def-bg', [
            [-9.5, 4.6], [9.5, 4.6], [9.5, 2.8], [-9.5, 2.8],
          ], { color: PURPLE, opacity: 0.08, borderWidth: 2, strokeColor: PURPLE });
          S.actor('s3-def-txt', 0, 3.7,
            '从总体中抽取一部分（样本）调查，用样本估计总体',
            { color: PURPLE, size: 16 });

          // 左侧：总体（10个灰色小人）
          S.actor('s3-lbl-total', -6.5, 1.9, '总体（全部）', { color: INK, size: 15, bold: true });
          var totalPos = [
            [-8.5, -0.3], [-7.0, -0.3], [-5.5, -0.3],
            [-8.5, -2.2], [-7.0, -2.2], [-5.5, -2.2],
            [-8.5, -4.1], [-7.0, -4.1], [-5.5, -4.1],
            [-7.0, -6.0],
          ];
          var i;
          for (i = 0; i < totalPos.length; i++) {
            drawPerson('s3-tot' + i, totalPos[i][0], totalPos[i][1], GRAY);
          }

          // 右侧：样本（3个蓝色小人）
          S.actor('s3-lbl-sample', 5.5, 1.9, '样本（一部分）', { color: PURPLE, size: 15, bold: true });
          var samplePos = [
            [4.5, -0.3], [6.0, -0.3], [7.5, -0.3],
          ];
          for (i = 0; i < samplePos.length; i++) {
            drawPerson('s3-smp' + i, samplePos[i][0], samplePos[i][1], PURPLE);
          }

          // 箭头：从总体指向样本（用线段模拟）
          S.addSegment('s3-arrow', [-4.5, -1.2], [3.5, -1.2], {
            color: ORANGE, width: 2.5, dash: 0,
          });
          S.actor('s3-arrow-lbl', -0.5, -0.5, '抽取', { color: ORANGE, size: 14, bold: true });
          // 反向估计箭头
          S.addSegment('s3-arrow2', [3.5, -2.5], [-4.5, -2.5], {
            color: BLUE, width: 2, dash: 2,
          });
          S.actor('s3-arrow2-lbl', -0.5, -3.1, '估计总体', { color: BLUE, size: 13 });

          P.renderCard('<b>抽样调查</b>：从<b>总体</b>中抽取部分个体（<b>样本</b>）调查，再估计总体。<br>例：从全校抽 100 人调查近视情况，估计全校近视率。');
        },
      },
      {
        narration: '抽样调查的<b>优点</b>是：节省时间和成本、操作方便，特别适合总体很大或调查具有破坏性的情形。<b>局限</b>是：样本选取不当可能导致结论有偏差。',
        enter: function (anim) {
          // 优点
          S.addPolygon('s3-pro-bg', [
            [-9.5, -1.6], [0, -1.6], [0, -5.0], [-9.5, -5.0],
          ], { color: GREEN, opacity: 0.09, borderWidth: 2, strokeColor: GREEN });
          S.actor('s3-pro-title', -4.75, -2.1, '优 点', { color: GREEN, size: 17, bold: true });
          S.actor('s3-pro-t1', -4.75, -3.0, '· 节省时间与成本', { color: GREEN, size: 15 });
          S.actor('s3-pro-t2', -4.75, -3.9, '· 操作方便、可行性高', { color: GREEN, size: 15 });

          // 局限
          S.addPolygon('s3-con-bg', [
            [0.2, -1.6], [9.5, -1.6], [9.5, -5.0], [0.2, -5.0],
          ], { color: ORANGE, opacity: 0.09, borderWidth: 2, strokeColor: ORANGE });
          S.actor('s3-con-title', 4.85, -2.1, '局 限', { color: ORANGE, size: 17, bold: true });
          S.actor('s3-con-t1', 4.85, -3.0, '· 样本不当→结论有偏差', { color: ORANGE, size: 15 });
          S.actor('s3-con-t2', 4.85, -3.9, '· 不如普查结果精确', { color: ORANGE, size: 15 });

          P.renderCard('<b>优点</b>：节省时间和成本，操作方便。<br><b>局限</b>：样本选取不当会导致偏差。');
        },
      },
      {
        narration: '什么情况<b>必须</b>用抽样调查？——总体数量很大（如全国中学生）；调查本身有破坏性（如检测灯泡寿命：测完就报废了，不可能全测）；成本或时间有限。',
        enter: function (anim) {
          // 适用情境
          S.addPolygon('s3-scene-bg', [
            [-9.5, -5.5], [9.5, -5.5], [9.5, -7.3], [-9.5, -7.3],
          ], { color: PURPLE, opacity: 0.08, borderWidth: 1.5, strokeColor: PURPLE });
          S.actor('s3-scene-label', 0, -5.95, '适用情境', { color: PURPLE, size: 16, bold: true });
          S.actor('s3-scene-t', 0, -6.75,
            '总体很大  ·  有破坏性  ·  时间/成本有限',
            { color: INK, size: 14 });

          // 灯泡破坏性检测的示意
          S.actor('s3-eg-bulb', -4.5, -5.95, '灯泡寿命测试', { color: ORANGE, size: 13, bold: true });
          S.actor('s3-eg-arrow', -0.5, -5.95, '→', { color: INK, size: 14 });
          S.actor('s3-eg-why', 4.5, -5.95, '测完即损坏，必须抽样', { color: ORANGE, size: 13 });

          P.renderCard('<b>适用情境</b>：总体大、有破坏性、成本受限。<br>典型例子：灯泡寿命测试、全国居民出行调查、食品质量检测。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
