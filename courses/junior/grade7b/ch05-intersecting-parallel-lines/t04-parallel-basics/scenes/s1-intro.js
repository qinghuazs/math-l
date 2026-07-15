(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64';
  var RAIL = '#546e7a';
  var TIE  = '#795548';
  var LINE = '#1565c0';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、情境导入：生活中的平行线',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们看这幅图——这是一段笔直的铁路。两条钢轨向远方延伸，中间还铺着许多横向的枕木。大家观察一下：两条钢轨，它们会不会相交？',
        enter: function (anim) {
          // 两条平行钢轨（水平方向，略带透视感竖直布置）
          S.addSegment('rail-l', [-9, 2.2], [9, 2.2], { color: RAIL, width: 6, dash: 0 });
          S.addSegment('rail-r', [-9, -1.2], [9, -1.2], { color: RAIL, width: 6, dash: 0 });

          // 枕木（横向 segment）
          var ties = [-8, -6, -4, -2, 0, 2, 4, 6, 8];
          var p = Promise.resolve();
          ties.forEach(function (x, i) {
            p = p.then(function () {
              S.addSegment('tie-' + i, [x, 2.8], [x, -1.8], { color: TIE, width: 10, dash: 0 });
              return anim ? delay(80) : null;
            });
          });

          p = p.then(function () {
            // 标注 "铁轨" 文字
            S.actor('lbl-rail-l', 9.5, 2.2, '钢轨 a', { color: RAIL, size: 15, bold: true });
            S.actor('lbl-rail-r', 9.5, -1.2, '钢轨 b', { color: RAIL, size: 15, bold: true });
            S.actor('lbl-tie', 0, -3.8, '枕木（横线）', { color: TIE, size: 15 });
            P.renderCard('铁路：两条钢轨向远处延伸，是否会相交？');
            return null;
          });
          return p;
        },
      },
      {
        narration: '再看练习本的横线——每一行都是一条直线，这些横线之间会不会相交？生活中还有很多这样的例子：斑马线、楼层线、电梯轨道……这些直线有一个共同的特征。今天我们就来研究它们。',
        enter: function (anim) {
          // 清除铁轨，换成练习本横线示意
          S.remove('rail-l');
          S.remove('rail-r');
          var ties = [-8, -6, -4, -2, 0, 2, 4, 6, 8];
          ties.forEach(function (x, i) { S.remove('tie-' + i); });
          S.remove('lbl-rail-l');
          S.remove('lbl-rail-r');
          S.remove('lbl-tie');

          // 练习本横线：多条水平线
          var ys = [5.5, 3.8, 2.1, 0.4, -1.3, -3.0, -4.7];
          var p = Promise.resolve();
          ys.forEach(function (y, i) {
            p = p.then(function () {
              S.addSegment('hline-' + i, [-8.5, y], [8.5, y], { color: LINE, width: 2, dash: 0 });
              return anim ? delay(120) : null;
            });
          });

          p = p.then(function () {
            S.actor('lbl-notebook', 0, -6.3, '练习本横线', { color: LINE, size: 16, bold: true });
            P.renderCard(
              '观察：铁路钢轨、练习本横线、斑马线……<br>' +
              '这些直线在同一个平面内，<b>永远不会相交</b>。<br>' +
              '它们有一个共同的名字，叫作——<b>平行线</b>。'
            );
            return null;
          });
          return p;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
