(function (CW) {
  'use strict';
  var S, P;
  var C_SHADE1 = '#ffccbc';
  var C_SHADE2 = '#bbdefb';
  var C_SHADE3 = '#c8e6c9';
  var C_SHADE4 = '#e1bee7';
  var BBOX = [-6, 6, 6, -6];

  function shadeAll() {
    S.shadeRect('s5-q1bg', 0, 0, 6, 6, { color: C_SHADE1, opacity: 0.25 });
    S.shadeRect('s5-q2bg', -6, 0, 0, 6, { color: C_SHADE2, opacity: 0.25 });
    S.shadeRect('s5-q3bg', -6, -6, 0, 0, { color: C_SHADE3, opacity: 0.25 });
    S.shadeRect('s5-q4bg', 0, -6, 6, 0, { color: C_SHADE4, opacity: 0.25 });
    S.addText('s5-n1', 3, 4.5, '$(+,+)$', { size: 18, color: '#b71c1c' });
    S.addText('s5-n2', -5.5, 4.5, '$(-,+)$', { size: 18, color: '#0d47a1' });
    S.addText('s5-n3', -5.5, -3.5, '$(-,-)$', { size: 18, color: '#1b5e20' });
    S.addText('s5-n4', 3, -3.5, '$(+,-)$', { size: 18, color: '#4a148c' });
  }

  var scene = {
    id: 's5',
    title: '五、小结',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '今天这节课，我们学习了两大核心内容：' +
          '第一，<b>四象限内点的坐标符号特征</b>——用口诀"一正正，二负正，三负负，四正负"来记忆；' +
          '第二，<b>坐标轴上点的特征</b>——$x$ 轴上 $y=0$，$y$ 轴上 $x=0$，原点 $(0,0)$，轴上点不属于任何象限。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          P.renderTable({
            head: ['位置', '坐标特征', '例'],
            rows: [
              ['第一象限', '$x>0$，$y>0$（$+,+$）', '$(3,2)$'],
              ['第二象限', '$x<0$，$y>0$（$-,+$）', '$(-3,2)$'],
              ['第三象限', '$x<0$，$y<0$（$-,-$）', '$(-3,-2)$'],
              ['第四象限', '$x>0$，$y<0$（$+,-$）', '$(3,-2)$'],
              ['$x$ 轴上', '$y=0$，$(a,0)$', '$(5,0)$'],
              ['$y$ 轴上', '$x=0$，$(0,b)$', '$(0,-7)$'],
              ['原点', '$(0,0)$', '唯一'],
            ],
          });
          P.renderCard(
            '口诀：<b>一正正，二负正，三负负，四正负</b><br>' +
            '轴上点：$x$ 轴 $y=0$；$y$ 轴 $x=0$<br>' +
            '<b>轴上点不属于任何象限！</b>',
            'cool', 'flipInX'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 400); });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '布置作业：课本相关练习题。特别注意含 $0$ 坐标的点的判断——' +
          '遇到 $x=0$ 或 $y=0$ 时，要想到"轴上点"，不能草率写"第几象限"。' +
          '期待大家下节课展示解题过程！',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          P.renderCard(
            '<b>课后作业</b><br>' +
            '① 判断下列点的位置：<br>' +
            '$P(2,-3)$，$Q(-1,0)$，$R(0,4)$，$T(-2,-5)$<br>' +
            '② 若点 $(a, b)$ 在第三象限，<br>&nbsp;&nbsp;&nbsp;则点 $(-a, -b)$ 在哪个象限？<br>' +
            '③ 举出一个在 $y$ 轴负半轴上的点',
            'cool', 'fadeInUp'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 300); });
          }
          return Promise.resolve();
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
