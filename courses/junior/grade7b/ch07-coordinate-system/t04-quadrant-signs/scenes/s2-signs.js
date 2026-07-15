(function (CW) {
  'use strict';
  var S, P;
  var C_Q1 = '#e53935';
  var C_Q2 = '#1e88e5';
  var C_Q3 = '#43a047';
  var C_Q4 = '#8e24aa';
  var C_SHADE1 = '#ffccbc';
  var C_SHADE2 = '#bbdefb';
  var C_SHADE3 = '#c8e6c9';
  var C_SHADE4 = '#e1bee7';
  var BBOX = [-6, 6, 6, -6];

  // 画所有四象限底色（常驻背景）
  function shadeAll() {
    S.shadeRect('s2-q1bg', 0, 0, 6, 6, { color: C_SHADE1, opacity: 0.2 });
    S.shadeRect('s2-q2bg', -6, 0, 0, 6, { color: C_SHADE2, opacity: 0.2 });
    S.shadeRect('s2-q3bg', -6, -6, 0, 0, { color: C_SHADE3, opacity: 0.2 });
    S.shadeRect('s2-q4bg', 0, -6, 6, 0, { color: C_SHADE4, opacity: 0.2 });
  }

  // 高亮某象限（加深着色，覆盖淡色）
  function highlightQ(q) {
    var map = {
      1: { id: 's2-hl1', x1: 0, y1: 0, x2: 6, y2: 6, c: C_SHADE1 },
      2: { id: 's2-hl2', x1: -6, y1: 0, x2: 0, y2: 6, c: C_SHADE2 },
      3: { id: 's2-hl3', x1: -6, y1: -6, x2: 0, y2: 0, c: C_SHADE3 },
      4: { id: 's2-hl4', x1: 0, y1: -6, x2: 6, y2: 0, c: C_SHADE4 },
    };
    var m = map[q];
    S.shadeRect(m.id, m.x1, m.y1, m.x2, m.y2, { color: m.c, opacity: 0.5 });
  }

  var scene = {
    id: 's2',
    title: '二、四象限符号规律',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '先看<b>第一象限</b>。点 $(3,2)$ 在第一象限——' +
          '$x=3$ 是正数，$y=2$ 也是正数。' +
          '不管是哪个第一象限的点，它的横坐标和纵坐标都是<b>正数</b>，符号是 $(+,+)$。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          highlightQ(1);
          S.dropPoint('s2-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4.5, labelOffset: [8, 8] });
          S.addText('s2-sign1', 1.5, 4.2, '$(+,+)$', { size: 28, color: C_Q1 });
          P.renderCard(
            '<b>第一象限</b><br>' +
            '横坐标 $x > 0$，纵坐标 $y > 0$<br>' +
            '符号特征：$(+,+)$',
            'warm', 'fadeInLeft'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 300); });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '再看<b>第二象限</b>。点 $(-3,2)$ 在第二象限——' +
          '$x=-3$ 是负数，$y=2$ 是正数。' +
          '第二象限内的点：横坐标为<b>负</b>，纵坐标为<b>正</b>，符号是 $(-,+)$。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          highlightQ(1);
          highlightQ(2);
          S.dropPoint('s2-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4.5, labelOffset: [8, 8] });
          S.addText('s2-sign1', 1.5, 4.2, '$(+,+)$', { size: 28, color: C_Q1 });
          S.dropPoint('s2-p2', -3, 2, { color: C_Q2, name: '$(-3,2)$', size: 4.5, labelOffset: [-80, 8] });
          S.addText('s2-sign2', -5.5, 4.2, '$(-,+)$', { size: 28, color: C_Q2 });
          P.renderCard(
            '<b>第二象限</b><br>' +
            '横坐标 $x < 0$，纵坐标 $y > 0$<br>' +
            '符号特征：$(-,+)$',
            'cool', 'fadeInLeft'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 300); });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '接着看<b>第三象限</b>。点 $(-3,-2)$ 在第三象限——' +
          '$x=-3$ 负数，$y=-2$ 也是负数。' +
          '第三象限内的点：横坐标和纵坐标都是<b>负数</b>，符号是 $(-,-)$。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          highlightQ(1);
          highlightQ(2);
          highlightQ(3);
          S.dropPoint('s2-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4.5, labelOffset: [8, 8] });
          S.addText('s2-sign1', 1.5, 4.2, '$(+,+)$', { size: 28, color: C_Q1 });
          S.dropPoint('s2-p2', -3, 2, { color: C_Q2, name: '$(-3,2)$', size: 4.5, labelOffset: [-80, 8] });
          S.addText('s2-sign2', -5.5, 4.2, '$(-,+)$', { size: 28, color: C_Q2 });
          S.dropPoint('s2-p3', -3, -2, { color: C_Q3, name: '$(-3,-2)$', size: 4.5, labelOffset: [-90, -18] });
          S.addText('s2-sign3', -5.5, -4.0, '$(-,-)$', { size: 28, color: C_Q3 });
          P.renderCard(
            '<b>第三象限</b><br>' +
            '横坐标 $x < 0$，纵坐标 $y < 0$<br>' +
            '符号特征：$(-,-)$',
            '', 'fadeInLeft'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 300); });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '最后看<b>第四象限</b>。点 $(3,-2)$ 在第四象限——' +
          '$x=3$ 正数，$y=-2$ 是负数。' +
          '第四象限内的点：横坐标为<b>正</b>，纵坐标为<b>负</b>，符号是 $(+,-)$。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          highlightQ(1);
          highlightQ(2);
          highlightQ(3);
          highlightQ(4);
          S.dropPoint('s2-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4.5, labelOffset: [8, 8] });
          S.addText('s2-sign1', 1.5, 4.2, '$(+,+)$', { size: 28, color: C_Q1 });
          S.dropPoint('s2-p2', -3, 2, { color: C_Q2, name: '$(-3,2)$', size: 4.5, labelOffset: [-80, 8] });
          S.addText('s2-sign2', -5.5, 4.2, '$(-,+)$', { size: 28, color: C_Q2 });
          S.dropPoint('s2-p3', -3, -2, { color: C_Q3, name: '$(-3,-2)$', size: 4.5, labelOffset: [-90, -18] });
          S.addText('s2-sign3', -5.5, -4.0, '$(-,-)$', { size: 28, color: C_Q3 });
          S.dropPoint('s2-p4', 3, -2, { color: C_Q4, name: '$(3,-2)$', size: 4.5, labelOffset: [8, -18] });
          S.addText('s2-sign4', 1.5, -4.0, '$(+,-)$', { size: 28, color: C_Q4 });
          P.renderCard(
            '<b>第四象限</b><br>' +
            '横坐标 $x > 0$，纵坐标 $y < 0$<br>' +
            '符号特征：$(+,-)$',
            'warm', 'fadeInLeft'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 300); });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '四个象限的符号规律全部揭示完毕！我们用一张表来整理，并记住口诀：' +
          '"<b>一正正，二负正，三负负，四正负</b>"，非常好记。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          highlightQ(1);
          highlightQ(2);
          highlightQ(3);
          highlightQ(4);
          S.dropPoint('s2-p1', 3, 2, { color: C_Q1, name: '$(3,2)$', size: 4.5, labelOffset: [8, 8] });
          S.addText('s2-sign1', 1.5, 4.2, '$(+,+)$', { size: 22, color: C_Q1 });
          S.dropPoint('s2-p2', -3, 2, { color: C_Q2, name: '$(-3,2)$', size: 4.5, labelOffset: [-80, 8] });
          S.addText('s2-sign2', -5.5, 4.2, '$(-,+)$', { size: 22, color: C_Q2 });
          S.dropPoint('s2-p3', -3, -2, { color: C_Q3, name: '$(-3,-2)$', size: 4.5, labelOffset: [-90, -18] });
          S.addText('s2-sign3', -5.5, -4.0, '$(-,-)$', { size: 22, color: C_Q3 });
          S.dropPoint('s2-p4', 3, -2, { color: C_Q4, name: '$(3,-2)$', size: 4.5, labelOffset: [8, -18] });
          S.addText('s2-sign4', 1.5, -4.0, '$(+,-)$', { size: 22, color: C_Q4 });
          P.renderTable({
            head: ['象限', '横坐标 $x$', '纵坐标 $y$', '例'],
            rows: [
              ['第一象限', '$x>0$ $(+)$', '$y>0$ $(+)$', '$(3,2)$'],
              ['第二象限', '$x<0$ $(-)$', '$y>0$ $(+)$', '$(-3,2)$'],
              ['第三象限', '$x<0$ $(-)$', '$y<0$ $(-)$', '$(-3,-2)$'],
              ['第四象限', '$x>0$ $(+)$', '$y<0$ $(-)$', '$(3,-2)$'],
            ],
          });
          P.renderCard('口诀：<b>一正正，二负正，三负负，四正负</b>', 'warm', 'flipInX');
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
