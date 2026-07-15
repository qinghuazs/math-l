(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_AXIS = '#37474f';
  var C_TICK = '#546e7a';
  var C_HINT = '#455a64';
  var C_ARROW = '#1565c0';

  var BBOX = [-6, 6, 6, -6];

  // y0：水平数轴所在高度（画板坐标）
  var Y0 = -3;

  // 添加水平数轴刻度与标签（静态）
  function addHAxisTicks() {
    var i;
    for (i = -4; i <= 4; i++) {
      if (i === 0) continue;
      S.addSegment('s1-htk' + i, [i, Y0 - 0.13], [i, Y0 + 0.13], { color: C_TICK, width: 1.5, dash: 0 });
      S.addText('s1-hn' + i, i - 0.12, Y0 - 0.55, '$' + i + '$', { color: C_HINT, size: 12 });
    }
    S.addText('s1-hn0', -0.12, Y0 - 0.55, '$0$', { color: C_HINT, size: 12 });
  }

  // 用 plotCurve 画水平数轴生长动画（y = Y0 常数函数，domain 从 -4.5 到 4.5）
  function drawHAxis(anim) {
    return S.plotCurve('s1-hax', function () { return Y0; }, {
      color: C_AXIS, width: 3, dash: 0,
      domain: [-4.5, 4.5],
      animate: anim, duration: 900,
    }).then(function () {
      addHAxisTicks();
      // 箭头：右端小三角（两段线模拟）
      S.addSegment('s1-harr1', [4.5, Y0], [4.25, Y0 + 0.15], { color: C_ARROW, width: 2.5, dash: 0 });
      S.addSegment('s1-harr2', [4.5, Y0], [4.25, Y0 - 0.15], { color: C_ARROW, width: 2.5, dash: 0 });
    });
  }

  // 用 plotCurve 画竖直数轴生长动画（x = 0 处，用参数形式：y=t → x=0）
  // plotCurve 只支持 y=f(x)，所以用一个逼近法：画极细的竖带
  // 更好方案：用一条参数曲线替代。这里改用 addSegment 静态 + Promise.resolve()，
  // step2 的"竖起"感通过 addText 动态提示模拟——保持 API 合规。
  function drawVAxis() {
    S.addSegment('s1-vax', [0, Y0], [0, Y0 + 5], { color: C_AXIS, width: 3, dash: 0 });
    // 刻度
    var i;
    for (i = 1; i <= 4; i++) {
      S.addSegment('s1-vtk' + i, [-0.13, Y0 + i], [0.13, Y0 + i], { color: C_TICK, width: 1.5, dash: 0 });
      S.addText('s1-vn' + i, 0.2, Y0 + i - 0.15, '$' + i + '$', { color: C_HINT, size: 12 });
    }
    // 箭头：上端
    S.addSegment('s1-varr1', [0, Y0 + 5], [-0.15, Y0 + 4.7], { color: C_ARROW, width: 2.5, dash: 0 });
    S.addSegment('s1-varr2', [0, Y0 + 5], [0.15, Y0 + 4.7], { color: C_ARROW, width: 2.5, dash: 0 });
  }

  // 清除手绘辅助数轴（回到画板自带坐标系）
  function clearHandAxes() {
    var ids = ['s1-hax', 's1-harr1', 's1-harr2',
               's1-vax', 's1-varr1', 's1-varr2'];
    var i, j;
    for (i = -4; i <= 4; i++) {
      ids.push('s1-htk' + i);
      ids.push('s1-hn' + i);
    }
    for (j = 1; j <= 4; j++) {
      ids.push('s1-vtk' + j);
      ids.push('s1-vn' + j);
    }
    ids.push('s1-hn0');
    ids.forEach(function (id) { S.remove(id); });
  }

  var scene = {
    id: 's1',
    title: '一、从数轴到坐标系',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '大家还记得<b>数轴</b>吗？数轴有三要素：<b>原点、正方向、单位长度</b>。' +
          '一条数轴只能表示<b>一个方向</b>上的位置——比如这条水平数轴，向右为正方向。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>数轴三要素</b><br>① 原点 &nbsp; ② 正方向 &nbsp; ③ 单位长度',
            'cool', 'fadeInDown'
          );
          return drawHAxis(anim);
        },
      },
      {
        narration: '如果在同一平面内，再<b>竖起</b>一条数轴，让它与水平数轴<b>垂直</b>，' +
          '并使两条数轴的原点<b>重合</b>——两轴的交汇处就是新的原点！',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>关键动作</b><br>' +
            '① 画第二条数轴，竖直放置<br>' +
            '② 两轴互相垂直<br>' +
            '③ 两轴原点重合',
            'warm', 'fadeIn'
          );
          return drawHAxis(false).then(function () {
            if (anim) {
              return new Promise(function (res) {
                setTimeout(function () {
                  drawVAxis();
                  res();
                }, 300);
              });
            }
            drawVAxis();
            return Promise.resolve();
          });
        },
      },
      {
        narration: '两条互相垂直、原点重合的数轴，共同组成了<b>平面直角坐标系</b>！' +
          '看画板上的坐标系，这就是它的标准样貌。' +
          '注意：两轴<b>必须垂直</b>，原点<b>必须重合</b>，缺一不可。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>平面直角坐标系</b><br>' +
            '两条互相垂直且原点重合的数轴<br>' +
            '共同构成平面直角坐标系',
            'cool', 'flipInX'
          );
          // 快放/终态：清除手绘轴，画板自带坐标轴"接管"
          return drawHAxis(false).then(function () {
            drawVAxis();
          }).then(function () {
            if (anim) {
              return new Promise(function (res) {
                setTimeout(function () {
                  clearHandAxes();
                  res();
                }, 500);
              });
            }
            clearHandAxes();
            return Promise.resolve();
          });
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
