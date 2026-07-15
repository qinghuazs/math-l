// s1-network.js  知识网络（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画板：标准坐标系配四象限标注 + 几个"名场面"点
  function drawCoordSystem() {
    // 四象限标注
    S.addText('ns-q1', 2.5, 2.5, '第一象限\n$(+,+)$', { size: 13, color: BLUE, anchorX: 'middle' });
    S.addText('ns-q2', -2.5, 2.5, '第二象限\n$(-,+)$', { size: 13, color: ORANGE, anchorX: 'middle' });
    S.addText('ns-q3', -2.5, -2.5, '第三象限\n$(-,-)$', { size: 13, color: RED, anchorX: 'middle' });
    S.addText('ns-q4', 2.5, -2.5, '第四象限\n$(+,-)$', { size: 13, color: PURPLE, anchorX: 'middle' });
    // 几个典型"名场面"点
    S.dropPoint('ns-a', 3, 4, { color: BLUE, name: 'A(3,4)', size: 3, animate: false });
    S.dropPoint('ns-b', -2, 3, { color: ORANGE, name: 'B(-2,3)', size: 3, animate: false });
    S.dropPoint('ns-c', -1, -2, { color: RED, name: 'C(-1,-2)', size: 3, animate: false });
    S.dropPoint('ns-d', 4, -3, { color: PURPLE, name: 'D(4,-3)', size: 3, animate: false });
    // 轴上点
    S.dropPoint('ns-e', -3, 0, { color: TEAL, name: 'E(-3,0)', size: 3, animate: false });
    S.dropPoint('ns-f', 0, 2, { color: TEAL, name: 'F(0,2)', size: 3, animate: false });
    S.addText('ns-xe', -3, -0.5, 'x轴上', { size: 11, color: TEAL, anchorX: 'middle' });
    S.addText('ns-yf', 0.7, 2, 'y轴上', { size: 11, color: TEAL });
  }

  var scene = {
    id: 's1',
    title: '一、知识网络',
    bbox: [-6, 6, 6, -6],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：本章知识树总览表
        narration: '同学们，今天是《平面直角坐标系》的收官课——第九课时：数学活动与单元复习！让我们先来梳理本章的完整知识网络。本章围绕"用两个数确定平面位置"这条核心线索，共有五大知识板块：有序数对、坐标系与象限、点的坐标读写、坐标与平移，以及坐标方法的应用。请看这张知识总览表！',
        enter: function (anim) {
          P.renderTable({
            head: ['知识板块', '核心内容'],
            rows: [
              ['有序数对', '两个有顺序的数 $(a,b)$；顺序不可互换'],
              ['坐标系与象限', 'x轴、y轴、原点；四个象限逆时针编号'],
              ['点的坐标', '先横坐标后纵坐标；描点"先横后纵"'],
              ['坐标与平移', '左右改横坐标；上下改纵坐标'],
              ['坐标应用', '描述位置 · 表示图形 · 设计路线 · 计算距离'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：画板坐标系名场面全景
        narration: '画板上这幅图就是本章知识的"名场面"缩影——一个标准直角坐标系。四个象限用颜色标注了各自的坐标符号规律：第一象限正正、第二象限负正、第三象限负负、第四象限正负。此外还标出了四种典型点：四象限内的点 A、B、C、D，以及 x 轴上的 E(−3,0) 和 y 轴上的 F(0,2)——它们不属于任何象限，这是本章最大的考点陷阱！',
        enter: function (anim) {
          drawCoordSystem();
          P.renderCard(
            '<b>本章知识体系一览</b><br>' +
            '核心思想：用<b>一对有序数对</b>唯一确定平面上一个点的位置<br>' +
            '关键图形：平面直角坐标系（原点 + x轴 + y轴）<br>' +
            '重要规律：象限符号口诀、平移坐标变化<br>' +
            '特别注意：坐标轴上的点<b>不属于任何象限</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：六大复习重点提示卡
        narration: '复习有六大重点：第一，有序数对的"序"——$(2,3)$ 和 $(3,2)$ 是不同的点；第二，四象限符号记忆口诀；第三，坐标轴上的点不属于任何象限；第四，描点先横坐标后纵坐标；第五，平移只改变对应坐标，左右改横坐标，上下改纵坐标；第六，建系方式不唯一，要选择最方便描述的方式。下面我们逐块深入复习！',
        enter: function (anim) {
          P.renderCard(
            '<b>六大复习重点</b><br>' +
            '<ol style="margin:6px 0 0 16px;line-height:2">' +
            '<li>有序数对：顺序不同代表<b>不同位置</b></li>' +
            '<li>四象限符号：正正 / 负正 / 负负 / 正负（逆时针）</li>' +
            '<li>坐标轴上的点<b>不属于任何象限</b>（高频考点）</li>' +
            '<li>描点：先按横坐标找列，再按纵坐标找行</li>' +
            '<li>平移：左右只改<b>横坐标</b>，上下只改<b>纵坐标</b></li>' +
            '<li>建系方式<b>不唯一</b>，选最方便的</li>' +
            '</ol>',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
