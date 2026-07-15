// s2-rule.js  坐标平移规律（3步）
(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 演示点 B：用于左右平移规律
  var BX0 = -3, BY0 = 2;
  var BD  = 4;   // 右移 4 单位 → B'(-3+4, 2) = B'(1, 2)

  // 演示点 C：用于上下平移规律
  var CX0 = -1, CY0 = -2;
  var CD  = 3;   // 上移 3 单位 → C'(-1, -2+3) = C'(-1, 1)

  // 闭包变量（setup 重置）
  var actorB, actorBp;
  var actorC, actorCp;

  var scene = {
    id: 's2',
    title: '二、坐标平移规律',
    bbox: [-8, 7, 8, -7],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      actorB = null; actorBp = null;
      actorC = null; actorCp = null;
    },
    steps: [
      {
        // 步骤1：左右平移规律——演示 B(-3,2) → B'(1,2)，highlight 横坐标
        narration: '我们来总结规律！先看左右平移。取点 $B(-3,\\ 2)$，向右平移 $4$ 个单位，得到 $B\'(1,\\ 2)$。横坐标从 $-3$ 变为 $1$，增加了 $4$；纵坐标 $2$ 完全不动。这就说明：<b>向右平移，横坐标加上平移距离；纵坐标不变</b>！向左呢？横坐标就减去平移距离。总结：左右平移只改横坐标，且右加左减！',
        enter: function (anim) {
          P.clearExtras();

          var bx1 = BX0 + BD;  // 1
          var by1 = BY0;        // 2

          // 绘制 B
          actorB = S.actor('pt-B', BX0, BY0, '$B(-3,2)$', {
            size: 15, color: RED, bold: true
          });
          S.dropPoint('dot-B', BX0, BY0, { color: RED, size: 4, name: '' });

          P.renderCard(
            '<b>左右平移规律</b><br><br>' +
            '$B(-3,\\ 2) \\to B\'(1,\\ 2)$<br><br>' +
            '横坐标：$-3 + 4 = 1$（改变）<br>' +
            '纵坐标：$2$（不变）<br><br>' +
            '向右 $\\Rightarrow$ 横坐标 $+$ 平移距离<br>' +
            '向左 $\\Rightarrow$ 横坐标 $-$ 平移距离',
            'warm', 'fadeInDown'
          );

          if (!anim) {
            // 快放终态
            S.remove('pt-B'); S.remove('dot-B');
            actorB = S.actor('pt-B', BX0, BY0, '$B(-3,2)$', {
              size: 13, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-B', BX0, BY0, { color: '#90a4ae', size: 3, name: '' });
            actorBp = S.actor('pt-Bp', bx1, by1, "$B'(1,2)$", {
              size: 15, color: BLUE, bold: true
            });
            S.dropPoint('dot-Bp', bx1, by1, { color: BLUE, size: 4, name: '' });
            S.addSegment('arr-bx', [BX0, BY0 + 0.45], [bx1, by1 + 0.45], {
              color: ORANGE, width: 3, dash: 0
            });
            S.addText('arr-blbl', (BX0 + bx1) / 2, BY0 + 1.0, '+4', {
              size: 14, color: ORANGE, anchorX: 'middle'
            });
            return;
          }

          return delay(500).then(function () {
            return actorB.moveTo(bx1, by1, 1400);
          }).then(function () {
            S.remove('pt-B'); S.remove('dot-B');
            actorB = S.actor('pt-B', BX0, BY0, '$B(-3,2)$', {
              size: 13, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-B', BX0, BY0, { color: '#90a4ae', size: 3, name: '' });
            actorBp = S.actor('pt-Bp', bx1, by1, "$B'(1,2)$", {
              size: 15, color: BLUE, bold: true
            });
            return S.dropPoint('dot-Bp', bx1, by1, { color: BLUE, size: 4, name: '', animate: true });
          }).then(function () {
            S.addSegment('arr-bx', [BX0, BY0 + 0.45], [bx1, by1 + 0.45], {
              color: ORANGE, width: 3, dash: 0
            });
            S.addText('arr-blbl', (BX0 + bx1) / 2, BY0 + 1.0, '+4', {
              size: 14, color: ORANGE, anchorX: 'middle'
            });
          });
        },
      },
      {
        // 步骤2：上下平移规律——演示 C(-1,-2) → C'(-1,1)，highlight 纵坐标
        narration: '再来看上下平移！取点 $C(-1,\\ -2)$，向上平移 $3$ 个单位，得到 $C\'(-1,\\ 1)$。纵坐标从 $-2$ 变为 $1$，增加了 $3$；横坐标 $-1$ 完全不动。规律：<b>向上平移，纵坐标加上平移距离；横坐标不变</b>！向下呢？纵坐标就减去平移距离。总结：上下平移只改纵坐标，且上加下减！',
        enter: function (anim) {
          P.clearExtras();

          var cx1 = CX0;        // -1
          var cy1 = CY0 + CD;   // 1

          // 绘制 C
          actorC = S.actor('pt-C', CX0, CY0, '$C(-1,-2)$', {
            size: 15, color: RED, bold: true
          });
          S.dropPoint('dot-C', CX0, CY0, { color: RED, size: 4, name: '' });

          P.renderCard(
            '<b>上下平移规律</b><br><br>' +
            "$C(-1,\\ -2) \\to C'(-1,\\ 1)$<br><br>" +
            '横坐标：$-1$（不变）<br>' +
            '纵坐标：$-2 + 3 = 1$（改变）<br><br>' +
            '向上 $\\Rightarrow$ 纵坐标 $+$ 平移距离<br>' +
            '向下 $\\Rightarrow$ 纵坐标 $-$ 平移距离',
            'cool', 'fadeInDown'
          );

          if (!anim) {
            S.remove('pt-C'); S.remove('dot-C');
            actorC = S.actor('pt-C', CX0, CY0, '$C(-1,-2)$', {
              size: 13, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-C', CX0, CY0, { color: '#90a4ae', size: 3, name: '' });
            actorCp = S.actor('pt-Cp', cx1, cy1, "$C'(-1,1)$", {
              size: 15, color: GREEN, bold: true
            });
            S.dropPoint('dot-Cp', cx1, cy1, { color: GREEN, size: 4, name: '' });
            S.addSegment('arr-cy', [CX0 + 0.4, CY0], [cx1 + 0.4, cy1], {
              color: GOLD, width: 3, dash: 0
            });
            S.addText('arr-clbl', CX0 + 0.8, (CY0 + cy1) / 2, '+3', {
              size: 14, color: GOLD
            });
            return;
          }

          return delay(500).then(function () {
            return actorC.moveTo(cx1, cy1, 1400);
          }).then(function () {
            S.remove('pt-C'); S.remove('dot-C');
            actorC = S.actor('pt-C', CX0, CY0, '$C(-1,-2)$', {
              size: 13, color: '#90a4ae', bold: false
            });
            S.dropPoint('dot-C', CX0, CY0, { color: '#90a4ae', size: 3, name: '' });
            actorCp = S.actor('pt-Cp', cx1, cy1, "$C'(-1,1)$", {
              size: 15, color: GREEN, bold: true
            });
            return S.dropPoint('dot-Cp', cx1, cy1, { color: GREEN, size: 4, name: '', animate: true });
          }).then(function () {
            S.addSegment('arr-cy', [CX0 + 0.4, CY0], [cx1 + 0.4, cy1], {
              color: GOLD, width: 3, dash: 0
            });
            S.addText('arr-clbl', CX0 + 0.8, (CY0 + cy1) / 2, '+3', {
              size: 14, color: GOLD
            });
          });
        },
      },
      {
        // 步骤3：规律表 + 一般化公式 (x,y)→(x+a,y+b)
        narration: '两个方向的规律我们都验证了。现在来做完整总结！四个平移方向的坐标变化规律，整理成一张表格。最重要的是最后一行的一般化公式：任意点 $(x,y)$ 向右 $a$ 单位、向上 $b$ 单位后，新坐标是 $(x+a,\\ y+b)$。向左用负值 $a$，向下用负值 $b$——一个公式包含四个方向，非常优雅！记住这个公式，以后解题速度会大大提升！',
        enter: function (anim) {
          P.clearExtras();

          P.renderTable({
            head: ['平移方向', '坐标变化', '公式'],
            rows: [
              ['向右 $a$ 个单位', '横坐标 $+a$，纵坐标不变', '$(x,y)\\to(x+a,\\ y)$'],
              ['向左 $a$ 个单位', '横坐标 $-a$，纵坐标不变', '$(x,y)\\to(x-a,\\ y)$'],
              ['向上 $b$ 个单位', '横坐标不变，纵坐标 $+b$', '$(x,y)\\to(x,\\ y+b)$'],
              ['向下 $b$ 个单位', '横坐标不变，纵坐标 $-b$', '$(x,y)\\to(x,\\ y-b)$'],
            ]
          });

          P.renderCard(
            '<b>一般化公式</b><br><br>' +
            '$(x,\\ y) \\to (x+a,\\ y+b)$<br><br>' +
            '$a > 0$ 右，$a < 0$ 左<br>' +
            '$b > 0$ 上，$b < 0$ 下',
            'cool', 'tada'
          );

          // 画板上展示公式文字
          S.addText('gen-formula', 0, -4.5,
            '$(x,y) \\to (x+a,\\ y+b)$',
            { size: 20, color: PURPLE, anchorX: 'middle' }
          );

          if (anim) { return delay(300); }
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
