// s4-translation.js  平移复习（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画平移示意图：点 A(-2,3) 向右移5单位、向下移3单位 → A'(3,0)
  function drawPointTranslation(anim) {
    // 原点
    S.dropPoint('tr-a', -2, 3, { color: BLUE, name: 'A(-2,3)', size: 4, animate: false });
    S.addText('tr-al', -2, 3.6, '原点 A(-2,3)', { size: 12, color: BLUE, anchorX: 'middle' });
    if (anim) {
      // 先画横移箭头
      return delay(500).then(function () {
        S.addSegment('tr-hv', [-2, 3], [3, 3], { color: ORANGE, width: 2, dash: 2 });
        S.addText('tr-ht', 0.5, 3.4, '向右5单位\n$x:-2\\to3$', { size: 12, color: ORANGE, anchorX: 'middle' });
        return delay(600);
      }).then(function () {
        // 再画纵移箭头
        S.addSegment('tr-vv', [3, 3], [3, 0], { color: RED, width: 2, dash: 2 });
        S.addText('tr-vt', 3.8, 1.5, '向下3单位\n$y:3\\to0$', { size: 12, color: RED });
        return delay(600);
      }).then(function () {
        return S.dropPoint('tr-a2', 3, 0, { color: GREEN, name: "A'(3,0)", size: 4, animate: true });
      });
    } else {
      S.addSegment('tr-hv', [-2, 3], [3, 3], { color: ORANGE, width: 2, dash: 2 });
      S.addText('tr-ht', 0.5, 3.4, '向右5单位', { size: 12, color: ORANGE, anchorX: 'middle' });
      S.addSegment('tr-vv', [3, 3], [3, 0], { color: RED, width: 2, dash: 2 });
      S.addText('tr-vt', 3.8, 1.5, '向下3单位', { size: 12, color: RED });
      S.dropPoint('tr-a2', 3, 0, { color: GREEN, name: "A'(3,0)", size: 4, animate: false });
    }
  }

  // 三角形平移：原三角形 + 平移后的三角形
  function drawTriangleTranslation() {
    // 原三角形 P(-3,2) Q(-1,2) R(-2,5)
    var origPts = [[-3, 2], [-1, 2], [-2, 5]];
    var origNames = ['P(-3,2)', 'Q(-1,2)', 'R(-2,5)'];
    for (var i = 0; i < origPts.length; i++) {
      S.dropPoint('tt-o' + i, origPts[i][0], origPts[i][1], {
        color: BLUE, name: origNames[i], size: 3, animate: false
      });
    }
    S.addSegment('tt-s1', origPts[0], origPts[1], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('tt-s2', origPts[1], origPts[2], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('tt-s3', origPts[2], origPts[0], { color: BLUE, width: 2, dash: 0 });
    S.addText('tt-ol', -2, 1.5, '原三角形', { size: 12, color: BLUE, anchorX: 'middle' });

    // 向右移4单位、向下移3单位 → P'(1,-1) Q'(3,-1) R'(2,2)
    var newPts = [[1, -1], [3, -1], [2, 2]];
    var newNames = ["P'(1,-1)", "Q'(3,-1)", "R'(2,2)"];
    for (var j = 0; j < newPts.length; j++) {
      S.dropPoint('tt-n' + j, newPts[j][0], newPts[j][1], {
        color: GREEN, name: newNames[j], size: 3, animate: false
      });
    }
    S.addSegment('tt-n1', newPts[0], newPts[1], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('tt-n2', newPts[1], newPts[2], { color: GREEN, width: 2, dash: 0 });
    S.addSegment('tt-n3', newPts[2], newPts[0], { color: GREEN, width: 2, dash: 0 });
    S.addText('tt-nl', 2, -1.6, "平移后△P'Q'R'", { size: 12, color: GREEN, anchorX: 'middle' });

    // 平移方向标注
    S.addSegment('tt-arr', [-2, 2], [2, -1], { color: ORANGE, width: 1.5, dash: 2 });
    S.addText('tt-arrt', 0.5, 0.5, '右4下3', { size: 12, color: ORANGE, anchorX: 'middle' });
  }

  var scene = {
    id: 's4',
    title: '四、平移复习',
    bbox: [-6, 6, 6, -6],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：平移坐标规律回顾（表格）
        narration: '复习坐标平移规律！平移的核心口诀就四个字：左右改横，上下改纵。具体来说：向右平移 a 单位，横坐标加 a；向左平移 a 单位，横坐标减 a；向上平移 b 单位，纵坐标加 b；向下平移 b 单位，纵坐标减 b。整体图形平移时，每个顶点都按相同的规则变换，形状和大小不变！请看这张规律表格，把每条规则牢牢记住。',
        enter: function (anim) {
          P.renderTable({
            head: ['平移方向', '改变的坐标', '变化规则', '不变的坐标'],
            rows: [
              ['向右移 $a$ 单位', '横坐标 $x$', '$x\\to x+a$', '纵坐标 $y$ 不变'],
              ['向左移 $a$ 单位', '横坐标 $x$', '$x\\to x-a$', '纵坐标 $y$ 不变'],
              ['向上移 $b$ 单位', '纵坐标 $y$', '$y\\to y+b$', '横坐标 $x$ 不变'],
              ['向下移 $b$ 单位', '纵坐标 $y$', '$y\\to y-b$', '横坐标 $x$ 不变'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：例题（点平移 + 三角形平移）
        narration: '来看例题！例题一：点 A(-2,3) 向右移5单位，再向下移3单位，求 A′ 的坐标。向右5单位，横坐标 $-2+5=3$；向下3单位，纵坐标 $3-3=0$；所以 A′(3,0)。注意：向右移5、向下移3 可以合并写成"右5下3"，两步各只影响一个坐标！我们在画板上展示这个过程——先画出 A，再画出移动轨迹，最后落到 A′。',
        enter: function (anim) {
          return Promise.resolve(drawPointTranslation(anim)).then(function () {
            P.renderCard(
              '<b>例题1：点的平移</b><br>' +
              'A(-2,3) 向右5单位、向下3单位<br>' +
              '横坐标：$-2+5=3$<br>' +
              '纵坐标：$3-3=0$<br>' +
              '∴ $A\'(3,0)$<br><br>' +
              '<b>验证：</b>A 在第二象限，A′ 在 x 轴上（$y=0$）✓'
            );
            return delay(200);
          });
        },
      },
      {
        // 步骤3：三角形平移 + 易错卡
        narration: '例题二：三角形 PQR 三顶点为 P(-3,2)、Q(-1,2)、R(-2,5)，向右移4单位、向下移3单位，求各顶点新坐标。整体平移，每个点各自按同样规则计算：P(-3+4, 2-3)=P′(1,-1)；Q(-1+4, 2-3)=Q′(3,-1)；R(-2+4, 5-3)=R′(2,2)。画板上蓝色是原三角形，绿色是平移后的三角形，形状完全相同，只是位置移动了！',
        enter: function (anim) {
          drawTriangleTranslation();
          P.renderCard(
            '<b>易错提醒</b><br>' +
            '✗ 错：向右平移改变<b>纵</b>坐标<br>' +
            '✓ 正：向右/左平移只改变<b>横</b>坐标<br><br>' +
            '✗ 错：各顶点用<b>不同</b>的平移规则<br>' +
            '✓ 正：整体平移，每个顶点<b>规则相同</b><br><br>' +
            '✗ 错：忘记负数加减方向（如 $-3+4=1$ 而非 $7$）<br>' +
            '✓ 正：正移加、负移减，先算再写',
            'warm'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
