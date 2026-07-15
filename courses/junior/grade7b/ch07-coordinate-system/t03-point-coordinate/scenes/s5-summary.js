(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var C_A = '#c62828';   // 点 A(3,2)
  var C_B = '#1565c0';   // 点 B(2,3)

  var scene = {
    id: 's5',
    title: '五、课时小结',
    bbox: [-6, 6, 6, -6],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '本节课我们学习了两大核心技能：' +
          '①<b>由点写坐标</b>——向两轴作垂线，读出横纵坐标；' +
          '②<b>由坐标描点</b>——在轴上找横纵坐标，两垂线交点即目标点。' +
          '两种方法互为逆过程，关键都是"先横后纵"。',
        enter: function (anim) {
          P.clearExtras();
          P.renderTable({
            head: ['方法', '已知', '操作', '结果'],
            rows: [
              ['<b>写坐标</b>', '点的位置', '分别向两轴作垂线', '读出 $(a,\\ b)$'],
              ['<b>描点</b>',   '坐标 $(a,\\ b)$', '在两轴找位置，作垂线', '交点即目标点'],
            ]
          });
          P.renderCard(
            '<b>口诀</b>：先横后纵，横走纵升<br>' +
            '横坐标在前，纵坐标在后',
            'cool', 'flipInX'
          );
          return Promise.resolve();
        },
      },
      {
        narration: '课后作业：完成课本对应练习题。' +
          '重点：①写出各象限特征点坐标；②已知坐标描出对应点；' +
          '③判断 $(3,\\ 2)$ 和 $(2,\\ 3)$ 是否是同一个点并说明理由。',
        enter: function (anim) {
          P.clearExtras();
          P.renderCard(
            '<b>课后作业</b><br>' +
            '① 写出各象限内各一个点的坐标<br>' +
            '② 描出点 $A(3,\\ 2)$ 与点 $B(2,\\ 3)$<br>' +
            '③ 判断：$(3,\\ 2)$ 与 $(2,\\ 3)$ 是同一个点吗？',
            'warm', 'fadeInDown'
          );
          // 画板展示易混的两个点作为视觉提示
          var pa = S.dropPoint('s5-a', 3, 2, {
            color: C_A, name: '$A(3,\\ 2)$', labelOffset: [8, 8], animate: anim
          });
          var pb = S.dropPoint('s5-b', 2, 3, {
            color: C_B, name: '$B(2,\\ 3)$', labelOffset: [8, 8], animate: anim
          });
          return anim ? Promise.all([pa, pb]) : Promise.resolve();
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
