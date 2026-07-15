(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_PROJ = '#7b1fa2';   // 辅助投影虚线
  var C_PT   = '#c62828';   // 第一个点（红色）
  var C_PT2  = '#1565c0';   // 第二个点（蓝色）
  var C_TICK = '#2e7d32';   // 轴上标记点（绿色）

  // 描点动画：给定坐标(px,py)，先在轴上找位置，再从轴向内延伸虚线，交点落下目标点
  function plotPoint(idPfx, px, py, color, nameStr, anim) {
    // x 轴上标出横坐标
    S.dropPoint(idPfx + '-fx', px, 0, {
      color: C_TICK,
      size: 2.5,
      name: '$' + px + '$',
      labelOffset: [4, -18]
    });
    // y 轴上标出纵坐标
    S.dropPoint(idPfx + '-fy', 0, py, {
      color: C_TICK,
      size: 2.5,
      name: '$' + py + '$',
      labelOffset: [8, 4]
    });
    // 从 x 轴向内作垂线（纵向延伸到目标点）
    S.addSegment(idPfx + '-lx', [px, 0], [px, py], {
      color: C_PROJ, width: 2, dash: 2
    });
    // 从 y 轴向内作垂线（横向延伸到目标点）
    S.addSegment(idPfx + '-ly', [0, py], [px, py], {
      color: C_PROJ, width: 2, dash: 2
    });
    // 交点处落下目标点
    return S.dropPoint(idPfx + '-pt', px, py, {
      color: color,
      name: nameStr,
      labelOffset: [8, 8],
      animate: anim
    });
  }

  var scene = {
    id: 's2',
    title: '二、由坐标描点',
    bbox: [-6, 6, 6, -6],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '描点与读坐标方向相反。给定坐标 $Q(-2,\\ 3)$，' +
          '先在 $x$ 轴找到 $-2$，再在 $y$ 轴找到 $3$，' +
          '分别作出与坐标轴垂直的辅助线，两线<b>交点</b>就是点 $Q$。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>描点步骤</b><br>' +
            '① 在 $x$ 轴找横坐标 $-2$<br>' +
            '② 在 $y$ 轴找纵坐标 $3$<br>' +
            '③ 两垂线交点即为 $Q$',
            'cool', 'fadeInDown'
          );
          return plotPoint('s2-q', -2, 3, C_PT, '$Q$', anim);
        },
      },
      {
        narration: '再来描点 $R(4,\\ -3)$：横坐标 $4$ 在 $x$ 轴正方向，纵坐标 $-3$ 在 $y$ 轴负方向。' +
          '注意负数方向不要搞错！',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '负坐标 = 沿<b>负方向</b>移动<br>' +
            '$R(4,\\ -3)$：向右4，向下3',
            'warm', 'fadeInDown'
          );
          // 恢复点 Q
          plotPoint('s2-q', -2, 3, C_PT, '$Q$', false);
          return plotPoint('s2-r', 4, -3, C_PT2, '$R$', anim);
        },
      },
      {
        narration: '口诀：<b>先横后纵，横走纵升（或降）</b>。' +
          '无论坐标正负，方法不变——先确定横坐标方向移动，再确定纵坐标方向移动，交点即是目标点。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>描点口诀</b><br>' +
            '先横后纵，横走纵升<br>' +
            '两垂线交点即所求点',
            'cool', 'tada'
          );
          plotPoint('s2-q', -2, 3, C_PT, '$Q$', false);
          plotPoint('s2-r', 4, -3, C_PT2, '$R$', false);
          return Promise.resolve();
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
