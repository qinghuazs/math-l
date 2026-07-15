(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_A      = '#c62828';   // 点 A(3,2)
  var C_B      = '#1565c0';   // 点 B(2,3)
  var C_O      = '#2e7d32';   // 原点
  var C_PROJ_A = '#e57373';   // A 的投影（浅红）
  var C_PROJ_B = '#64b5f6';   // B 的投影（浅蓝）

  var scene = {
    id: 's3',
    title: '三、坐标的意义',
    bbox: [-6, 6, 6, -6],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '坐标 $(a,\\ b)$ 中：$a$ 是<b>横坐标</b>，表示点到 $y$ 轴的有向距离；' +
          '$b$ 是<b>纵坐标</b>，表示点到 $x$ 轴的有向距离。' +
          '注意：横坐标一定在前，纵坐标一定在后！',
        enter: function (anim) {
          P.clearExtras();
          P.renderTable({
            head: ['坐标分量', '名称', '含义'],
            rows: [
              ['$a$（第一个数）', '横坐标', '点到 $y$ 轴的有向距离'],
              ['$b$（第二个数）', '纵坐标', '点到 $x$ 轴的有向距离'],
            ]
          });
          return Promise.resolve();
        },
      },
      {
        narration: '易错点：$(3,\\ 2)$ 和 $(2,\\ 3)$ 是<b>不同的点</b>！' +
          '红点 $A(3,\\ 2)$：横坐标3纵坐标2；蓝点 $B(2,\\ 3)$：横坐标2纵坐标3。' +
          '坐标是<b>有序数对</b>，顺序不同，位置就不同。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>有序数对！</b><br>' +
            '$(3,\\ 2) \\neq (2,\\ 3)$<br>' +
            '位置完全不同，不可交换！',
            'warm', 'flipInX'
          );
          // 点 A(3,2) 的投影虚线
          S.addSegment('s3-ax', [3, 2], [3, 0], { color: C_PROJ_A, width: 1.5, dash: 2 });
          S.addSegment('s3-ay', [3, 2], [0, 2], { color: C_PROJ_A, width: 1.5, dash: 2 });
          // 点 B(2,3) 的投影虚线
          S.addSegment('s3-bx', [2, 3], [2, 0], { color: C_PROJ_B, width: 1.5, dash: 2 });
          S.addSegment('s3-by', [2, 3], [0, 3], { color: C_PROJ_B, width: 1.5, dash: 2 });
          // 落下两点
          var pa = S.dropPoint('s3-a', 3, 2, {
            color: C_A, name: '$A(3,\\ 2)$', labelOffset: [8, 8], animate: anim
          });
          var pb = S.dropPoint('s3-b', 2, 3, {
            color: C_B, name: '$B(2,\\ 3)$', labelOffset: [8, 8], animate: anim
          });
          return anim ? Promise.all([pa, pb]) : Promise.resolve();
        },
      },
      {
        narration: '特殊情况：<b>原点 $O$ 的坐标是 $(0,\\ 0)$</b>——' +
          '它到 $x$ 轴和 $y$ 轴的距离都是 $0$。原点是坐标系的"起点"，两轴的唯一交汇处。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>原点坐标：$O(0,\\ 0)$</b><br>' +
            '到两轴距离均为 $0$<br>' +
            '两轴的唯一交点',
            'cool', 'fadeInDown'
          );
          // 保留 A、B 的投影虚线
          S.addSegment('s3-ax', [3, 2], [3, 0], { color: C_PROJ_A, width: 1.5, dash: 2 });
          S.addSegment('s3-ay', [3, 2], [0, 2], { color: C_PROJ_A, width: 1.5, dash: 2 });
          S.addSegment('s3-bx', [2, 3], [2, 0], { color: C_PROJ_B, width: 1.5, dash: 2 });
          S.addSegment('s3-by', [2, 3], [0, 3], { color: C_PROJ_B, width: 1.5, dash: 2 });
          // 保留 A、B
          S.dropPoint('s3-a', 3, 2, {
            color: C_A, name: '$A(3,\\ 2)$', labelOffset: [8, 8]
          });
          S.dropPoint('s3-b', 2, 3, {
            color: C_B, name: '$B(2,\\ 3)$', labelOffset: [8, 8]
          });
          // 原点高亮落下
          return S.dropPoint('s3-o', 0, 0, {
            color: C_O,
            name: '$O(0,\\ 0)$',
            size: 4,
            labelOffset: [-68, -18],
            animate: anim
          });
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
