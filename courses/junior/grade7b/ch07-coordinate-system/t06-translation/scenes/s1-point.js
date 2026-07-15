// s1-point.js  点的平移（3步）★核心
(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 原始点 A 坐标
  var AX0 = 2, AY0 = 1;

  // 平移量
  var DX = 3;  // x轴正向平移3单位
  var DY = 2;  // y轴正向平移2单位

  // 动画用闭包变量（setup 中重置）
  var actorA;   // actor 对象（带 moveTo）
  var actorAp;  // A' actor
  var actorApp; // A'' actor

  var scene = {
    id: 's1',
    title: '一、点的平移',
    bbox: [-8, 7, 8, -7],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      actorA = null;
      actorAp = null;
      actorApp = null;
    },
    steps: [
      {
        // 步骤1：展示 A(2,1)，讲解初始位置
        narration: '大家看坐标系！我们在坐标系中取一个点 $A(2,1)$，横坐标是 $2$，纵坐标是 $1$。接下来，我们要研究：把点 $A$ 向右平移 $3$ 个单位，新点的坐标会怎么变化？',
        enter: function (anim) {
          P.clearExtras();

          // 用 actor 绘制点 A（闭包坐标，后续可 moveTo）
          actorA = S.actor('pt-A', AX0, AY0, '$A(2,1)$', {
            size: 16, color: RED, bold: true
          });

          // 标注点位
          S.dropPoint('dot-A', AX0, AY0, {
            color: RED, size: 4, name: '', labelOffset: [0, 0]
          });

          P.renderCard(
            '<b>初始位置</b><br><br>' +
            '点 $A(2,\\ 1)$<br>' +
            '横坐标 $= 2$，纵坐标 $= 1$',
            'cool', 'fadeInDown'
          );

          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：向右平移3单位 → A'(5,1)；动画 + 观察坐标变化
        narration: '现在我们把点 $A(2,1)$ 沿 $x$ 轴正方向（即向右）平移 $3$ 个单位！注意看动画：点在水平方向移动，纵坐标始终保持为 $1$，只有横坐标在增大。最终到达 $A\'(5,1)$——横坐标从 $2$ 变为 $5$，正好增加了 $3$；纵坐标依然是 $1$，丝毫未变！',
        enter: function (anim) {
          P.clearExtras();

          // 确保 A 在初始位置
          S.remove('pt-A');
          S.remove('dot-A');
          actorA = S.actor('pt-A', AX0, AY0, '$A(2,1)$', {
            size: 16, color: RED, bold: true
          });
          S.dropPoint('dot-A', AX0, AY0, { color: RED, size: 4, name: '' });

          // 终态目标
          var tx = AX0 + DX;  // 5
          var ty = AY0;        // 1

          P.renderCard(
            '<b>向右平移 $3$ 个单位</b><br><br>' +
            '$A(2,\\ 1) \\to A\'(5,\\ 1)$<br><br>' +
            '横坐标：$2 + 3 = 5$<br>' +
            '纵坐标：$1$（不变）',
            'warm', 'fadeInDown'
          );

          if (!anim) {
            // 快放：直接到终态
            S.remove('pt-A');
            S.remove('dot-A');
            actorA = S.actor('pt-A', AX0, AY0, '$A(2,1)$', {
              size: 14, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-A', AX0, AY0, { color: '#90a4ae', size: 3, name: '' });
            actorAp = S.actor('pt-Ap', tx, ty, "$A'(5,1)$", {
              size: 16, color: BLUE, bold: true
            });
            S.dropPoint('dot-Ap', tx, ty, { color: BLUE, size: 4, name: '' });
            // 平移箭头
            S.addSegment('arr-x', [AX0, AY0 + 0.4], [tx, ty + 0.4], {
              color: ORANGE, width: 3, dash: 0
            });
            S.addText('arr-lbl', (AX0 + tx) / 2, AY0 + 0.9, '+3', { size: 15, color: ORANGE, anchorX: 'middle' });
            return;
          }

          // 动画：actor A 向右 moveTo(5, 1)
          return delay(400).then(function () {
            return actorA.moveTo(tx, ty, 1200);
          }).then(function () {
            // A 改为淡色留影
            S.remove('pt-A');
            S.remove('dot-A');
            actorA = S.actor('pt-A', AX0, AY0, '$A(2,1)$', {
              size: 14, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-A', AX0, AY0, { color: '#90a4ae', size: 3, name: '' });
            // 落下 A'
            actorAp = S.actor('pt-Ap', tx, ty, "$A'(5,1)$", {
              size: 16, color: BLUE, bold: true
            });
            return S.dropPoint('dot-Ap', tx, ty, { color: BLUE, size: 4, name: '', animate: true });
          }).then(function () {
            S.addSegment('arr-x', [AX0, AY0 + 0.4], [tx, ty + 0.4], {
              color: ORANGE, width: 3, dash: 0
            });
            S.addText('arr-lbl', (AX0 + tx) / 2, AY0 + 0.9, '+3', { size: 15, color: ORANGE, anchorX: 'middle' });
          });
        },
      },
      {
        // 步骤3：再向上平移2单位 → A''(2,3)；纵坐标+2横坐标不变
        narration: '很好！规律已经初现。现在我们回到原点 $A(2,1)$，换一个方向——沿 $y$ 轴正方向（即向上）平移 $2$ 个单位。看动画：点在竖直方向移动，横坐标始终是 $2$，只有纵坐标在增大。到达 $A\'\'(2,3)$——纵坐标从 $1$ 变为 $3$，增加了 $2$；横坐标依然是 $2$，没有变化！结论：<b>左右平移改横坐标，上下平移改纵坐标</b>！',
        enter: function (anim) {
          P.clearExtras();

          // 清理第2步的内容
          S.remove('pt-Ap'); S.remove('dot-Ap');
          S.remove('arr-x'); S.remove('arr-lbl');
          S.remove('pt-A'); S.remove('dot-A');

          // 重新绘制原点 A
          actorA = S.actor('pt-A', AX0, AY0, '$A(2,1)$', {
            size: 16, color: RED, bold: true
          });
          S.dropPoint('dot-A', AX0, AY0, { color: RED, size: 4, name: '' });

          var tx = AX0;        // 2
          var ty = AY0 + DY;   // 3

          P.renderCard(
            '<b>向上平移 $2$ 个单位</b><br><br>' +
            '$A(2,\\ 1) \\to A\'\'(2,\\ 3)$<br><br>' +
            '横坐标：$2$（不变）<br>' +
            '纵坐标：$1 + 2 = 3$',
            'cool', 'flipInX'
          );
          P.renderCard(
            '<b>规律小结</b><br>' +
            '左右平移 → <b>横坐标变</b>，纵坐标不变<br>' +
            '上下平移 → 横坐标不变，<b>纵坐标变</b>',
            'warm', 'tada'
          );

          if (!anim) {
            // 快放终态
            S.remove('pt-A'); S.remove('dot-A');
            actorA = S.actor('pt-A', AX0, AY0, '$A(2,1)$', {
              size: 14, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-A', AX0, AY0, { color: '#90a4ae', size: 3, name: '' });
            actorApp = S.actor('pt-App', tx, ty, "$A''(2,3)$", {
              size: 16, color: GREEN, bold: true
            });
            S.dropPoint('dot-App', tx, ty, { color: GREEN, size: 4, name: '' });
            S.addSegment('arr-y', [AX0 + 0.4, AY0], [tx + 0.4, ty], {
              color: GOLD, width: 3, dash: 0
            });
            S.addText('arr-lbl2', AX0 + 0.7, (AY0 + ty) / 2, '+2', { size: 15, color: GOLD });
            return;
          }

          return delay(400).then(function () {
            return actorA.moveTo(tx, ty, 1200);
          }).then(function () {
            S.remove('pt-A'); S.remove('dot-A');
            actorA = S.actor('pt-A', AX0, AY0, '$A(2,1)$', {
              size: 14, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-A', AX0, AY0, { color: '#90a4ae', size: 3, name: '' });
            actorApp = S.actor('pt-App', tx, ty, "$A''(2,3)$", {
              size: 16, color: GREEN, bold: true
            });
            return S.dropPoint('dot-App', tx, ty, { color: GREEN, size: 4, name: '', animate: true });
          }).then(function () {
            S.addSegment('arr-y', [AX0 + 0.4, AY0], [tx + 0.4, ty], {
              color: GOLD, width: 3, dash: 0
            });
            S.addText('arr-lbl2', AX0 + 0.7, (AY0 + ty) / 2, '+2', { size: 15, color: GOLD });
          });
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
