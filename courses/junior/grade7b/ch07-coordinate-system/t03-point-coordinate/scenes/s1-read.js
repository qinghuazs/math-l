(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_PROJ = '#7b1fa2';   // 投影虚线（紫色）
  var C_PT   = '#c62828';   // 点（红色）
  var C_TICK = '#1565c0';   // 轴上截点（蓝色）

  // 目标点坐标
  var PX = 3, PY = 2;

  var scene = {
    id: 's1',
    title: '一、由点写坐标',
    bbox: [-6, 6, 6, -6],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '坐标系中有一个点 $P$，位置如图所示。' +
          '我们如何用一对有序数来精确描述它的位置？' +
          '方法是：分别向两条坐标轴<b>作垂线</b>。',
        enter: function (anim) {
          P.clearExtras();
          return S.dropPoint('s1-p', PX, PY, {
            color: C_PT,
            name: '$P$',
            labelOffset: [8, 8],
            animate: anim
          });
        },
      },
      {
        narration: '过点 $P$ 向 $x$ 轴作垂线，垂足就是横坐标所在的位置。' +
          '垂足对应 $x$ 轴上的数 $3$，所以 $P$ 的<b>横坐标</b>是 $3$。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '横坐标 = $P$ 到 $y$ 轴的有向距离<br><b>$x$ 轴方向投影 → 横坐标 $3$</b>',
            'cool', 'fadeInDown'
          );
          // 恢复点 P
          S.dropPoint('s1-p', PX, PY, {
            color: C_PT, name: '$P$', labelOffset: [8, 8]
          });
          // 从 P 向 x 轴作垂线段（虚线）
          S.addSegment('s1-proj-x', [PX, PY], [PX, 0], {
            color: C_PROJ, width: 2, dash: 2
          });
          // x 轴上截点
          return S.dropPoint('s1-fx', PX, 0, {
            color: C_TICK,
            size: 3,
            name: '$3$',
            labelOffset: [4, -18],
            animate: anim
          });
        },
      },
      {
        narration: '过点 $P$ 再向 $y$ 轴作垂线，垂足对应 $y$ 轴上的数 $2$，' +
          '所以 $P$ 的<b>纵坐标</b>是 $2$。' +
          '于是点 $P$ 的坐标是 $(3,\\ 2)$——<b>横坐标在前，纵坐标在后</b>！',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '点 $P$ 的坐标：$P(3,\\ 2)$<br>' +
            '横坐标 $a=3$，纵坐标 $b=2$<br>' +
            '<b>规则：横坐标在前，纵坐标在后</b>',
            'warm', 'flipInX'
          );
          // 恢复已有对象
          S.dropPoint('s1-p', PX, PY, {
            color: C_PT, name: '$P$', labelOffset: [8, 8]
          });
          S.addSegment('s1-proj-x', [PX, PY], [PX, 0], {
            color: C_PROJ, width: 2, dash: 2
          });
          S.dropPoint('s1-fx', PX, 0, {
            color: C_TICK, size: 3, name: '$3$', labelOffset: [4, -18]
          });
          // 向 y 轴作垂线
          S.addSegment('s1-proj-y', [PX, PY], [0, PY], {
            color: C_PROJ, width: 2, dash: 2
          });
          // y 轴上截点
          return S.dropPoint('s1-fy', 0, PY, {
            color: C_TICK,
            size: 3,
            name: '$2$',
            labelOffset: [8, 4],
            animate: anim
          }).then(function () {
            S.addText('s1-label', PX + 0.2, PY + 0.55,
              '$P(3,\\ 2)$', { color: C_PT, size: 15 });
          });
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
