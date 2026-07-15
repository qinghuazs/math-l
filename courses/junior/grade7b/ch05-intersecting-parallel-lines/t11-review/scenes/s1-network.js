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

  // 画两直线相交的小缩影图（左区域）
  function drawIntersectMini() {
    // 两条相交线
    S.addSegment('n-l1', [-9.2, 5.5], [-5.8, 2.0], { color: BLUE, width: 2.5, dash: 0 });
    S.addSegment('n-l2', [-9.2, 2.5], [-5.8, 5.0], { color: RED, width: 2.5, dash: 0 });
    // 标注对顶角
    S.addAngle('n-a1',
      [-8.6, 2.7], [-7.5, 3.75], [-8.6, 4.8],
      { radius: 0.5, color: ORANGE, opacity: 0.12, label: '∠1' });
    S.addAngle('n-a2',
      [-6.4, 4.7], [-7.5, 3.75], [-6.4, 2.8],
      { radius: 0.5, color: ORANGE, opacity: 0.12, label: '∠3' });
    S.addText('n-t-inter', -8.5, 1.3, '相交线', { size: 14, color: BLUE });
  }

  // 画平行线小缩影图（中区域）
  function drawParallelMini() {
    // 两条平行线
    S.addSegment('n-p1', [-2.5, 5.2], [2.5, 5.2], { color: BLUE, width: 2.5, dash: 0 });
    S.addSegment('n-p2', [-2.5, 2.8], [2.5, 2.8], { color: BLUE, width: 2.5, dash: 0 });
    // 截线
    S.addSegment('n-pc', [-1.0, 6.5], [0.5, 1.5], { color: INK, width: 2, dash: 0 });
    // 平行标记
    S.addSegment('n-pm1', [0.8, 5.2], [1.2, 5.6], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('n-pm2', [1.0, 5.2], [1.4, 5.6], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('n-pm3', [0.8, 2.8], [1.2, 3.2], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('n-pm4', [1.0, 2.8], [1.4, 3.2], { color: BLUE, width: 2, dash: 0 });
    // 同位角高亮
    S.addAngle('n-pa1',
      [-0.75, 5.7], [-0.18, 5.2], [0.35, 5.2],
      { radius: 0.4, color: GREEN, opacity: 0.12 });
    S.addAngle('n-pa2',
      [-0.45, 3.3], [0.12, 2.8], [0.65, 2.8],
      { radius: 0.4, color: GREEN, opacity: 0.12 });
    S.addText('n-t-para', -1.5, 1.3, '平行线', { size: 14, color: BLUE });
  }

  // 画平移小缩影图（右区域）
  function drawTranslationMini() {
    // 原三角形
    S.addPolygon('n-tri1',
      [[5.5, 3.2], [7.2, 3.2], [6.2, 5.5]],
      { fillColor: TEAL, opacity: 0.18, borderWidth: 2, strokeColor: TEAL });
    // 平移后三角形（向右1.5向上0.5）
    S.addPolygon('n-tri2',
      [[6.8, 3.7], [8.5, 3.7], [7.5, 6.0]],
      { fillColor: ORANGE, opacity: 0.18, borderWidth: 2, strokeColor: ORANGE });
    // 平移箭头（对应顶点）
    S.addSegment('n-arr1', [5.5, 3.2], [6.8, 3.7], { color: RED, width: 2, dash: 2 });
    S.addSegment('n-arr2', [7.2, 3.2], [8.5, 3.7], { color: RED, width: 2, dash: 2 });
    S.addSegment('n-arr3', [6.2, 5.5], [7.5, 6.0], { color: RED, width: 2, dash: 2 });
    S.addText('n-t-trans', 5.8, 1.3, '平移', { size: 14, color: TEAL });
  }

  var scene = {
    id: 's1',
    title: '一、知识网络',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：展示四大知识块分区卡
        narration: '同学们，我们用了整整一单元的时间，学习了《相交线与平行线》。今天是最后一节课——单元小结与复习。让我们先来回顾这一章的知识网络，共有四大块：相交线、平行线、几何语言和平移。每一块都有各自的核心内容，我们把它们整理成一张大表来看一看。',
        enter: function (anim) {
          P.renderTable({
            head: ['知识板块', '核心内容'],
            rows: [
              ['相交线', '邻补角互补 / 对顶角相等 / 垂线唯一 / 垂线段最短'],
              ['平行线', '三判定（同位角/内错角/同旁内角） / 三性质（同位角/内错角/同旁内角）'],
              ['几何语言', '定义 / 命题 / 题设与结论 / 真命题 / 假命题 / 定理'],
              ['平移', '方向 / 距离 / 对应点 / 形状大小不变'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：画板配全章名场面缩影图
        narration: '再来看画板——这里我们把三大"名场面"并排排列：左边是两直线相交形成四个角的经典图形（对顶角用同色高亮），中间是两平行线被截线穿过时的同位角图形，右边是三角形平移前后的对应关系。这三个图是贯穿全章的核心视觉符号，希望大家见到就能立刻反应出对应的定理！',
        enter: function (anim) {
          drawIntersectMini();
          drawParallelMini();
          drawTranslationMini();
          // 分隔线
          S.addSegment('n-div1', [-3.5, 7.0], [-3.5, 0.8], { color: '#b0bec5', width: 1.5, dash: 2 });
          S.addSegment('n-div2', [3.5, 7.0], [3.5, 0.8], { color: '#b0bec5', width: 1.5, dash: 2 });
          // 标题
          S.addText('n-hd', -0.5, 7.1, '第五章 · 知识网络全景', { size: 16, color: INK });
          P.renderCard(
            '<b>三大核心图形</b><br>' +
            '左：两直线相交 → <b>对顶角相等、邻补角互补</b><br>' +
            '中：平行线截线图 → <b>同位角、内错角、同旁内角</b><br>' +
            '右：平移前后 → <b>方向相同、距离相等、形状不变</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：复习重点提示卡
        narration: '复习时有六个重点需要特别关注：第一，对顶角与邻补角的识别——两者都由两直线相交产生，但概念不同；第二，垂线段最短——这是点到直线距离的本质；第三，三线八角的识别；第四，判定与性质的区别；第五，几何推理的规范书写；第六，平移性质与作图。下面我们逐一来复习！',
        enter: function (anim) {
          P.renderCard(
            '<b>六大复习重点</b><br>' +
            '<ol style="margin:6px 0 0 16px;line-height:2">' +
            '<li>对顶角与邻补角的识别</li>' +
            '<li>垂线段最短（点到直线距离）</li>' +
            '<li>三线八角的识别</li>' +
            '<li>平行线<b>判定</b>与<b>性质</b>的区别</li>' +
            '<li>几何推理的规范书写</li>' +
            '<li>平移性质与作图</li>' +
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
