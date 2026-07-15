(function (CW) {
  'use strict';
  var S, P;
  var C_Q1 = '#e53935'; // 红，第一象限示例点
  var C_Q2 = '#1e88e5'; // 蓝，第二象限示例点
  var C_Q3 = '#43a047'; // 绿，第三象限示例点
  var C_Q4 = '#8e24aa'; // 紫，第四象限示例点
  var C_SHADE1 = '#ffccbc'; // 第一象限底色
  var C_SHADE2 = '#bbdefb'; // 第二象限底色
  var C_SHADE3 = '#c8e6c9'; // 第三象限底色
  var C_SHADE4 = '#e1bee7'; // 第四象限底色

  var BBOX = [-6, 6, 6, -6];

  // 画四象限淡色底色
  function shadeAll() {
    S.shadeRect('s1-q1', 0, 0, 6, 6, { color: C_SHADE1, opacity: 0.35 });
    S.shadeRect('s1-q2', -6, 0, 0, 6, { color: C_SHADE2, opacity: 0.35 });
    S.shadeRect('s1-q3', -6, -6, 0, 0, { color: C_SHADE3, opacity: 0.35 });
    S.shadeRect('s1-q4', 0, -6, 6, 0, { color: C_SHADE4, opacity: 0.35 });
    // 象限编号文字
    S.addText('s1-n1', 3.5, 4.5, '第一象限', { size: 14, color: '#b71c1c' });
    S.addText('s1-n2', -5.5, 4.5, '第二象限', { size: 14, color: '#0d47a1' });
    S.addText('s1-n3', -5.5, -3.5, '第三象限', { size: 14, color: '#1b5e20' });
    S.addText('s1-n4', 3.5, -3.5, '第四象限', { size: 14, color: '#4a148c' });
  }

  // 放四个示例点
  function dropExamples(anim) {
    if (anim) {
      return S.dropPoint('s1-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4, animate: true, labelOffset: [8, 8] })
        .then(function () {
          return S.dropPoint('s1-p2', -3, 2, { color: C_Q2, name: '$(-3,2)$', size: 4, animate: true, labelOffset: [8, 8] });
        }).then(function () {
          return S.dropPoint('s1-p3', -3, -2, { color: C_Q3, name: '$(-3,-2)$', size: 4, animate: true, labelOffset: [8, -16] });
        }).then(function () {
          return S.dropPoint('s1-p4', 3, -2, { color: C_Q4, name: '$(3,-2)$', size: 4, animate: true, labelOffset: [8, -16] });
        });
    }
    S.dropPoint('s1-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4, labelOffset: [8, 8] });
    S.dropPoint('s1-p2', -3, 2, { color: C_Q2, name: '$(-3,2)$', size: 4, labelOffset: [8, 8] });
    S.dropPoint('s1-p3', -3, -2, { color: C_Q3, name: '$(-3,-2)$', size: 4, labelOffset: [8, -16] });
    S.dropPoint('s1-p4', 3, -2, { color: C_Q4, name: '$(3,-2)$', size: 4, labelOffset: [8, -16] });
    return Promise.resolve();
  }

  var scene = {
    id: 's1',
    title: '一、引入：符号有规律吗',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们，平面直角坐标系把平面分成了四个区域，我们叫它们<b>四个象限</b>。' +
          '我在每个象限里各放了一个点——请大家注意观察这四个点的坐标：' +
          '$(3,2)$、$(-3,2)$、$(-3,-2)$、$(3,-2)$。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          return dropExamples(anim);
        },
      },
      {
        narration: '仔细看这四个坐标，你有没有发现：不同象限的点，坐标里的"正负号"似乎有某种规律？' +
          '接下来我们就来系统地研究<b>各象限内点的坐标符号特征</b>。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          S.dropPoint('s1-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4, labelOffset: [8, 8] });
          S.dropPoint('s1-p2', -3, 2, { color: C_Q2, name: '$(-3,2)$', size: 4, labelOffset: [8, 8] });
          S.dropPoint('s1-p3', -3, -2, { color: C_Q3, name: '$(-3,-2)$', size: 4, labelOffset: [8, -16] });
          S.dropPoint('s1-p4', 3, -2, { color: C_Q4, name: '$(3,-2)$', size: 4, labelOffset: [8, -16] });
          P.renderCard(
            '<b>探究问题：</b><br>' +
            '不同象限的点，坐标 $(x, y)$ 的<br>' +
            '<b>正负号</b>有什么规律？',
            'cool', 'fadeInDown'
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
