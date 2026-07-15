(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、平行线的定义与记号',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '我们先来看平行线的定义。请大家跟我一起读：在同一平面内，不相交的两条直线叫作平行线。这个定义有三个要素，少一个都不行。',
        enter: function () {
          // 定义卡：画两条平行线示意
          S.addSegment('def-a', [-8, 1.8], [8, 1.8], { color: BLUE, width: 4, dash: 0 });
          S.addSegment('def-b', [-8, -1.2], [8, -1.2], { color: BLUE, width: 4, dash: 0 });
          S.actor('lbl-a', -8.5, 1.8, 'a', { color: BLUE, size: 18, bold: true });
          S.actor('lbl-b', -8.5, -1.2, 'b', { color: BLUE, size: 18, bold: true });

          P.renderCard(
            '<b>平行线定义</b><br>' +
            '在<span style="color:#c62828">同一平面内</span>，' +
            '<span style="color:#1565c0">不相交</span>的' +
            '<span style="color:#2e7d32">两条直线</span>叫作<b>平行线</b>。<br><br>' +
            '三要素：① 同一平面内 ② 两条直线 ③ 不相交'
          );
        },
      },
      {
        narration: '平行线有专门的符号表示。直线 a 平行于直线 b，我们记作 a ∥ b，读作"a 平行于 b"。注意：平行符号是两条竖线，不要和等号混淆。',
        enter: function (anim) {
          // 大字展示平行记号
          S.actor('sym-par', 0, 4.5, '∥', { color: ORANGE, size: 80, bold: true });

          var p = anim ? delay(400) : Promise.resolve();
          p = p.then(function () {
            S.actor('sym-label', 0, 2.2, 'a ∥ b', { color: INK, size: 36, bold: true });
            return anim ? delay(300) : null;
          });
          p = p.then(function () {
            S.actor('sym-read', 0, 0.6, '读作：a 平行于 b', { color: INK, size: 20 });
            P.renderCard(
              '<b>平行记号</b>：$a \\parallel b$，读作"$a$ 平行于 $b$"。<br>' +
              '也可写作 $AB \\parallel CD$（表示直线 $AB$ 平行于直线 $CD$）。'
            );
            return null;
          });
          return p;
        },
      },
      {
        narration: '有同学可能会问：两条线段，如果我"看上去"它们不相交，就能说它们平行吗？答案是不能！我们来看一个反例——',
        enter: function () {
          // 清除记号
          S.remove('sym-par');
          S.remove('sym-label');
          S.remove('sym-read');

          // 两条"看起来"不相交的线段（实际上延长后会相交）
          // 线段 e1：从 (-8, 2) 到 (1, 1.5)  — 略微向右下倾
          // 线段 e2：从 (-8, -1) 到 (1, 0.2) — 略微向右上倾
          // 延长后将在 x≈9 附近相交
          S.addSegment('ex-e1', [-8, 2.0], [1, 1.5], { color: RED, width: 4, dash: 0 });
          S.addSegment('ex-e2', [-8, -1.0], [1, 0.2], { color: RED, width: 4, dash: 0 });
          S.actor('lbl-e1', -8.5, 2.0, 'e', { color: RED, size: 18, bold: true });
          S.actor('lbl-e2', -8.5, -1.0, 'f', { color: RED, size: 18, bold: true });
          S.actor('hint-ex', 0, -3.5, '看起来不相交……但真的平行吗？', { color: INK, size: 17 });

          P.renderCard(
            '⚠ 注意：线段"看起来不相交"不等于平行！<br>' +
            '直线是<b>无限延伸</b>的，必须将线段延长为直线，才能判断是否相交。'
          );
        },
      },
      {
        narration: '现在我们把这两条线段延长，看看它们是否真的平行。注意看右侧——延长后，它们相交了！所以这两条线段所在的直线并不平行。平行线的"不相交"是指整条直线（无限延伸后）都不相交。',
        enter: function (anim) {
          // e1: 从(-8,2)到(1,1.5)，斜率k1=(1.5-2)/(1-(-8))=-0.5/9
          // e2: 从(-8,-1)到(1,0.2)，斜率k2=(0.2-(-1))/(1-(-8))=1.2/9
          // 直线方程：
          // e1: y - 2 = (-0.5/9)*(x - (-8)) => y = 2 - (0.5/9)*(x+8)
          // e2: y - (-1) = (1.2/9)*(x+8)   => y = -1 + (1.2/9)*(x+8)
          // 交点：2 - (0.5/9)*(x+8) = -1 + (1.2/9)*(x+8)
          //       3 = (1.7/9)*(x+8) => x+8 = 27/1.7 ≈ 15.88 => x ≈ 7.88, y ≈ 2 - 0.5/9*15.88 ≈ 1.12

          // 先动画延长两条线段到接近交点处
          // 使用函数坐标实现生长动画
          var ext1End = [8.5, 1.53];  // e1 延长终点（接近交点前）
          var ext2End = [8.5, 0.87];  // e2 延长终点
          // 交点
          var ix = 7.88, iy = 1.12;

          // 用 animate 驱动 "生长端" 坐标
          var t1x = 1, t1y = 1.5;
          var t2x = 1, t2y = 0.2;

          // 先添加延长段（初始长度为0，通过更新端点实现生长）
          // JSXGraph segment 需要点对象或固定数组，用 board.create 动态点
          var board = S.getBoard();

          var p1end = board.create('point', [function () { return t1x; }, function () { return t1y; }],
            { visible: false, fixed: true, withLabel: false });
          var p2end = board.create('point', [function () { return t2x; }, function () { return t2y; }],
            { visible: false, fixed: true, withLabel: false });

          var ext1 = board.create('segment', [[1, 1.5], p1end], {
            strokeColor: ORANGE, strokeWidth: 4, dash: 2, highlight: false, fixed: true,
          });
          var ext2 = board.create('segment', [[1, 0.2], p2end], {
            strokeColor: ORANGE, strokeWidth: 4, dash: 2, highlight: false, fixed: true,
          });

          S.remove('hint-ex');

          if (!anim) {
            t1x = ext1End[0]; t1y = ext1End[1];
            t2x = ext2End[0]; t2y = ext2End[1];
            board.update();
            S.dropPoint('inter-pt', ix, iy, { color: RED, name: '相交！', size: 5, animate: false, labelOffset: [8, 10] });
            S.actor('lbl-inter', 0, -3.5, '延长后相交 → 不是平行线！', { color: RED, size: 18, bold: true });
            return Promise.resolve();
          }

          return S.animate({
            from: 0, to: 1, duration: 1200,
            onUpdate: function (v) {
              t1x = 1 + (ext1End[0] - 1) * v;
              t1y = 1.5 + (ext1End[1] - 1.5) * v;
              t2x = 1 + (ext2End[0] - 1) * v;
              t2y = 0.2 + (ext2End[1] - 0.2) * v;
              board.update();
            },
          }).then(function () {
            return S.dropPoint('inter-pt', ix, iy, { color: RED, name: '相交！', size: 5, animate: true, labelOffset: [8, 10] });
          }).then(function () {
            return delay(200);
          }).then(function () {
            S.actor('lbl-inter', 0, -3.5, '延长后相交 → 不是平行线！', { color: RED, size: 18, bold: true });
            P.renderCard(
              '<b>平行的三要素（缺一不可）</b><br>' +
              '① <span style="color:#c62828">同一平面内</span>（平面几何前提）<br>' +
              '② <span style="color:#1565c0">两条直线</span>（必须是完整的直线，不能只看线段）<br>' +
              '③ <span style="color:#2e7d32">不相交</span>（无限延伸后也不相交）'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
