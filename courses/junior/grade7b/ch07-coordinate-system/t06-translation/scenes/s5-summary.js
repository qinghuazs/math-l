// s5-summary.js  小结（2步）
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

  var scene = {
    id: 's5',
    title: '五、课堂小结',
    bbox: [-8, 7, 8, -7],
    board: { axis: false, keepAspect: false },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：坐标平移规律完整总结表 + 核心口诀
        narration: '这节课我们学习了坐标与平移的规律，内容非常重要！先来一起回顾：左右平移改横坐标，上下平移改纵坐标；向正方向平移，坐标增加；向负方向平移，坐标减少。这四条规律可以用一个总公式概括：点 $(x,y)$ 经过平移后变为 $(x+a, y+b)$，其中 $a$ 和 $b$ 的正负决定方向。图形平移时，所有顶点遵循同一规律，图形形状大小不变！',
        enter: function (anim) {
          P.clearExtras();

          // 规律总结表（4行完整版）
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
            '<b>核心口诀</b><br><br>' +
            '左右平移改横坐标，上下平移改纵坐标<br>' +
            '向正方向平移坐标增，向负方向平移坐标减<br><br>' +
            '<b>一般公式：</b>$(x,y) \\to (x+a,\\ y+b)$',
            'cool', 'tada'
          );

          // 画板上展示公式
          S.addPolygon('bg-box',
            [[-7, 5], [7, 5], [7, 1], [-7, 1]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 3 }
          );
          S.addText('sum-title', 0, 4.3, '坐标平移规律', {
            size: 22, color: GREEN, anchorX: 'middle'
          });
          S.addText('sum-lr', -6.5, 3.3, '左右平移：横坐标变（右加左减），纵坐标不变', {
            size: 15, color: BLUE
          });
          S.addText('sum-ud', -6.5, 2.3, '上下平移：纵坐标变（上加下减），横坐标不变', {
            size: 15, color: RED
          });
          S.addText('sum-gen', 0, 1.4, '$(x,y) \\to (x+a,\\ y+b)$', {
            size: 18, color: PURPLE, anchorX: 'middle'
          });

          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：作业卡
        narration: '非常好！今天的内容就总结到这里。课后请完成以下三道练习题，巩固今天学到的坐标平移规律。第一题考察单点平移；第二题考察图形平移坐标计算；第三题考察逆向推断。这三道题覆盖了今天所有知识点，认真完成！有问题记得问老师。下课！',
        enter: function (anim) {
          P.clearExtras();

          P.renderCard(
            '<b>课后作业</b><br><br>' +
            '① 点 $P(-2,\\ 3)$ 向左平移 $4$ 个单位后的坐标是？<br><br>' +
            '② 三角形三顶点 $(0,0)$、$(2,0)$、$(1,2)$，向右平移 $3$、向上平移 $1$ 后各顶点坐标？<br><br>' +
            '③ 已知点 $Q$ 平移后变为 $Q\'(-1,\\ 5)$，平移规律是向左 $2$、向上 $3$，求点 $Q$ 的坐标。',
            'warm', 'fadeInDown'
          );

          P.renderCard(
            '<b>本节知识树</b><br><br>' +
            '坐标与平移<br>' +
            '├ 点的平移 → 坐标规律<br>' +
            '├ 图形平移 → 顶点同规律<br>' +
            '└ 逆向推断 → 坐标差判方向',
            'cool', 'flipInX'
          );

          if (anim) { return delay(300); }
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
