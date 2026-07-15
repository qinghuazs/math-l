// s5-exit.js  综合与收官（3步）
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

  // 综合出口题画板：建系 + 描点 + 平移 + 判象限
  function drawComprehensive(anim) {
    // 出口题：坐标系内标出以下点，然后平移
    // 原点 A(-4,3) B(0,-5) C(2,-1)
    if (anim) {
      return delay(300).then(function () {
        return S.dropPoint('ex-a', -4, 3, { color: BLUE, name: 'A(-4,3)', size: 3.5, animate: true });
      }).then(function () { return delay(350); }).then(function () {
        return S.dropPoint('ex-b', 0, -5, { color: RED, name: 'B(0,-5)', size: 3.5, animate: true });
      }).then(function () { return delay(350); }).then(function () {
        return S.dropPoint('ex-c', 2, -1, { color: ORANGE, name: 'C(2,-1)', size: 3.5, animate: true });
      }).then(function () { return delay(400); }).then(function () {
        // 平移：C 向左3单位 → C'(-1,-1)
        S.addSegment('ex-arr', [2, -1], [-1, -1], { color: GREEN, width: 2, dash: 2 });
        S.addText('ex-arrt', 0.5, -0.6, '左移3', { size: 12, color: GREEN, anchorX: 'middle' });
        return S.dropPoint('ex-c2', -1, -1, { color: GREEN, name: "C'(-1,-1)", size: 3.5, animate: true });
      }).then(function () { return delay(300); });
    } else {
      S.dropPoint('ex-a', -4, 3, { color: BLUE, name: 'A(-4,3)', size: 3.5, animate: false });
      S.dropPoint('ex-b', 0, -5, { color: RED, name: 'B(0,-5)', size: 3.5, animate: false });
      S.dropPoint('ex-c', 2, -1, { color: ORANGE, name: 'C(2,-1)', size: 3.5, animate: false });
      S.addSegment('ex-arr', [2, -1], [-1, -1], { color: GREEN, width: 2, dash: 2 });
      S.addText('ex-arrt', 0.5, -0.6, '左移3', { size: 12, color: GREEN, anchorX: 'middle' });
      S.dropPoint('ex-c2', -1, -1, { color: GREEN, name: "C'(-1,-1)", size: 3.5, animate: false });
    }
  }

  // 收官学习主线图（圆节点串联）
  function drawMainLine() {
    var nodes = [
      { x: -4.5, y: 3.5, label: '有序数对', color: BLUE },
      { x: -1.5, y: 3.5, label: '坐标系与象限', color: ORANGE },
      { x:  1.5, y: 3.5, label: '点的坐标', color: GREEN },
      { x:  4.0, y: 1.5, label: '坐标与平移', color: RED },
      { x:  4.0, y: -1.0, label: '坐标应用', color: PURPLE },
    ];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      S.addCircle('ml-c' + i, n.x, n.y, 1.1,
        { color: n.color, width: 2.5, fill: n.color, fillOpacity: 0.12 });
      S.addText('ml-t' + i, n.x, n.y, n.label, { size: 12, color: n.color, anchorX: 'middle' });
    }
    // 连接线
    S.addSegment('ml-a1', [-3.4, 3.5], [-2.6, 3.5], { color: INK, width: 1.5, dash: 2 });
    S.addSegment('ml-a2', [-0.4, 3.5], [0.4, 3.5], { color: INK, width: 1.5, dash: 2 });
    S.addSegment('ml-a3', [2.6, 3.5], [3.5, 2.5], { color: INK, width: 1.5, dash: 2 });
    S.addSegment('ml-a4', [4.0, 0.4], [4.0, -0.0], { color: INK, width: 1.5, dash: 2 });
    // 标题
    S.addText('ml-hd', -0.5, 5.5, '本章学习主线', { size: 16, color: INK, anchorX: 'middle' });
    S.addText('ml-sub', -0.5, 4.8,
      '从有序数对出发，建立坐标系，描述位置，应用平移',
      { size: 11, color: INK, anchorX: 'middle' });
    // 核心思想
    S.addText('ml-core', -0.5, -3.5,
      '核心思想：数形结合——用一对有序数对唯一刻画平面上一点的位置',
      { size: 12, color: TEAL, anchorX: 'middle' });
  }

  var scene = {
    id: 's5',
    title: '五、综合与收官',
    bbox: [-6, 6, 6, -6],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：综合出口题（建系+描点+平移+判象限）
        narration: '进入综合出口题！本章综合小检验，六道必考题型：第一题，A(-4,3) 在第二象限；第二题，B(0,-5) 在 y 轴负半轴，不属于任何象限；第三题，C(2,-1) 向左移3单位，横坐标 $2-3=-1$，纵坐标不变，得 C′(-1,-1)，在第三象限；第四题，D(-2,4) 向下移6单位，纵坐标 $4-6=-2$，横坐标不变，得 D′(-2,-2)；第五题，E(a,b) 在第二象限，则 $a<0，b>0$；第六题，(2,3) 与 (3,2) 因为顺序不同，代表不同位置！请对照画板确认答案。',
        enter: function (anim) {
          return Promise.resolve(drawComprehensive(anim)).then(function () {
            P.renderTable({
              head: ['题目', '答案', '关键点'],
              rows: [
                ['A(-4,3) 在哪？', '第二象限', '负正 → 第二象限'],
                ['B(0,-5) 在哪？', 'y轴负半轴', '$x=0$ → 在坐标轴上，不属于象限'],
                ['C(2,-1) 左移3', "$C'(-1,-1)$", '$x:2-3=-1$，$y$ 不变'],
                ['D(-2,4) 下移6', "$D'(-2,-2)$", '$y:4-6=-2$，$x$ 不变'],
                ['E(a,b) 在第二象限', '$a<0,\\ b>0$', '负正 → 横负纵正'],
                ['(2,3) 和 (3,2)', '不同位置', '顺序不同 → 有序数对含义'],
              ],
            });
          });
        },
      },
      {
        // 步骤2：本章八句话（收官记忆）
        narration: '本章最重要的八句话——这是整章精髓，也是考场得分保障！前四句：第一，"平面内一个点的位置通常需要两个有顺序的数共同确定"；第二，"点的坐标必须按照横坐标在前、纵坐标在后的顺序书写"；第三，"描点时要遵循先横后纵"；第四，"坐标轴上的点不属于任何象限"。后四句：第五，"四象限符号依次为正正、负正、负负、正负"；第六，"左右平移只改变横坐标，上下平移只改变纵坐标"；第七，"同一个实际位置在不同坐标系中可能有不同坐标"；第八，"建立坐标系时，应选择最有利于描述和计算的方式"！',
        enter: function (anim) {
          P.renderCard(
            '<b>本章八句话（收官记忆）</b><br>' +
            '<ol style="margin:8px 0 0 16px;line-height:2.1">' +
            '<li>平面内一点的位置需要<b>两个有顺序的数</b>共同确定。</li>' +
            '<li>坐标书写：<b>横坐标在前，纵坐标在后</b>。</li>' +
            '<li>描点：<b>先横后纵</b>（先找列，再找行）。</li>' +
            '<li>坐标轴上的点<b>不属于任何象限</b>。⚠</li>' +
            '<li>四象限符号口诀：<b>正正 / 负正 / 负负 / 正负</b>。</li>' +
            '<li>平移：左右改<b>横坐标</b>，上下改<b>纵坐标</b>。</li>' +
            '<li>同一位置在<b>不同坐标系</b>中可能有不同坐标。</li>' +
            '<li>建系方式<b>不唯一</b>，选最有利于描述和计算的。</li>' +
            '</ol>',
            'default',
            'tada'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：收官卡 + 数形结合思想总结
        narration: '最后是本章的学习闭环！我们从"有序数对"出发，建立"平面直角坐标系"，学会了"描点与读坐标"，研究了"坐标与平移的关系"，最终学会"用坐标方法解决实际问题"。这整条学习主线，体现的是数学中最核心的思想——数形结合：用一对有序数对唯一刻画平面上一点的位置，把"形"变成了"数"，从此几何问题可以用代数方法解决！同学们，《平面直角坐标系》第七章，圆满收官！',
        enter: function (anim) {
          drawMainLine();
          P.renderCard(
            '<b>本章学习闭环 · 数形结合思想</b><br>' +
            '<div style="font-size:13px;line-height:2;margin-top:6px">' +
            '核心：<b>用一对有序数对 $(x, y)$ 唯一确定平面上一点的位置</b><br>' +
            '意义：把几何图形"翻译"成代数语言，数形互转<br>' +
            '坐标系是沟通数与形的"桥梁"<br>' +
            '</div>' +
            '<div style="margin-top:10px;text-align:center;font-size:15px;font-weight:bold;color:#00695c">' +
            '第七章 · 平面直角坐标系 · 圆满收官！🎉' +
            '</div>',
            'cool',
            'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
