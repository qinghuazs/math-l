(function (CW) {
  'use strict';
  var S, P;
  // 颜色常量
  var BOTTLE  = '#5d4037';
  var BEAN    = '#8d6e63';   // 普通豆子（暖棕）
  var MARKED  = '#d32f2f';   // 标记豆子（红色）
  var INK     = '#37474f';
  var ACCENT  = '#1565c0';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 闭包变量（setup 中重置）
  var markedActors = [];   // 已标记的红豆 actor 对象
  var sampleActors = [];   // 第二次抓取的豆子 actor
  var redInSample  = [];   // 第二次中带标记的红豆

  // ---------- 辅助：画静态瓶子（小尺寸，左侧区域） ----------
  function drawSmallBottle(xOff, yOff, id) {
    S.addPolygon(id + '-body', [
      [xOff - 2.0, yOff - 4.5], [xOff + 2.0, yOff - 4.5],
      [xOff + 2.0, yOff + 1.5], [xOff - 2.0, yOff + 1.5]
    ], { color: '#a1887f', opacity: 0.25, borderColor: BOTTLE, borderWidth: 2.5 });
    S.addPolygon(id + '-shoulder', [
      [xOff - 2.0, yOff + 1.5], [xOff + 2.0, yOff + 1.5],
      [xOff + 1.2, yOff + 3.0], [xOff - 1.2, yOff + 3.0]
    ], { color: '#a1887f', opacity: 0.25, borderColor: BOTTLE, borderWidth: 2.5 });
    S.addPolygon(id + '-neck', [
      [xOff - 1.2, yOff + 3.0], [xOff + 1.2, yOff + 3.0],
      [xOff + 1.2, yOff + 4.5], [xOff - 1.2, yOff + 4.5]
    ], { color: '#bcaaa4', opacity: 0.35, borderColor: BOTTLE, borderWidth: 2.5 });
  }

  // 瓶内静态豆子位置（不含标记豆），原点在 (-5.5, -1.5)
  var BOTTLE_BEANS = [
    [-7.2, -5.2], [-6.1, -4.9], [-5.0, -5.3], [-4.0, -5.1], [-3.2, -4.8],
    [-7.4, -4.0], [-6.3, -3.7], [-5.2, -4.1], [-4.1, -3.9], [-3.1, -3.6],
    [-7.1, -2.8], [-6.0, -2.5], [-4.9, -2.9], [-3.9, -2.7], [-3.3, -2.4],
    [-7.3, -1.8], [-6.2, -1.5], [-5.1, -1.9], [-4.2, -1.6],
    [-7.0, -0.8], [-5.8, -0.5], [-4.6, -0.9], [-3.5, -0.7],
    [-6.8,  0.2], [-5.5,  0.5], [-4.4,  0.1],
  ];

  // 标记豆子（红）在瓶内的落点（共 50 粒标记，这里展示具有代表性的 12 粒动画）
  var MARKED_POSITIONS = [
    [-6.8, -4.5], [-5.6, -4.2], [-4.5, -4.6], [-3.6, -4.3],
    [-7.0, -3.2], [-5.9, -2.9], [-4.7, -3.3], [-3.4, -3.0],
    [-6.5, -2.0], [-5.3, -1.7], [-4.3, -2.1],
    [-6.1, -1.0],
  ];

  // 第二次抓取 40 粒的右侧展示区（原点 (4, 0)）
  // 8 粒是标记红豆，32 粒是普通豆
  var SAMPLE_PLAIN = [
    [2.5, -4.8], [3.3, -4.5], [4.2, -4.9], [5.1, -4.6], [6.0, -4.3],
    [2.3, -3.6], [3.1, -3.3], [5.3, -3.7], [6.2, -3.4], [7.0, -3.1],
    [2.6, -2.4], [3.5, -2.1], [4.5, -2.5], [5.6, -2.2], [6.5, -1.9], [7.2, -1.6],
    [2.4, -1.2], [3.2, -0.9], [4.1, -1.3], [5.5, -1.0], [6.3, -0.7],
    [2.7,  0.0], [3.6,  0.3], [5.0,  0.4], [6.1,  0.1],
    [2.2,  1.1], [3.4,  1.4], [4.6,  1.0], [5.8,  1.3], [6.6,  1.6], [7.3,  1.8],
    [2.9,  2.2],
  ];
  var SAMPLE_MARKED = [
    [4.0, -4.2], [5.8, -3.0], [4.8, -1.8], [3.9, -0.5],
    [6.8, -2.2], [4.3,  0.8], [7.1,  0.9], [5.3,  2.0],
  ];

  // 初始装态：画瓶子和里面的普通豆子
  function drawScene() {
    drawSmallBottle(-5.5, -1.5, 's2-bottle');
    BOTTLE_BEANS.forEach(function (pos, i) {
      S.addCircle('s2-bb-' + i, pos[0], pos[1], 0.22,
        { color: BEAN, fill: BEAN, fillOpacity: 0.85, width: 1 });
    });
  }

  // 步骤1：第一次取出50粒，做标记（显示红豆落入瓶中）
  function step1MarkBeans(anim) {
    var p = Promise.resolve();
    // 先显示"取出一把豆子"文字
    S.addText('s2-hint1', -9.5, 6.5, '① 第一次取出 $N=50$ 粒，做上标记（染红色）', { size: 17, color: ACCENT });
    MARKED_POSITIONS.forEach(function (pos, i) {
      p = p.then(function () {
        var a = S.actor('s2-marked-' + i,
          pos[0] + (i % 3 - 1) * 0.5,   // 稍做偏移模拟"从上面落入"
          pos[1] + 3.5,
          '●',
          { color: MARKED, size: 16 });
        markedActors.push(a);
        // 落入动画：从瓶口上方落到瓶内位置
        return anim ? a.moveTo(pos[0], pos[1], 400) : a.moveTo(pos[0], pos[1], 0);
      });
    });
    return p;
  }

  // 步骤2：放回摇匀——标记豆在瓶内随机扩散（移动到分散位置）
  function step2ShakeMix(anim) {
    var MIX_POS = [
      [-7.3, -5.0], [-4.8, -5.2], [-6.0, -3.5], [-3.5, -2.8], [-7.1, -2.0],
      [-5.5, -1.2], [-4.0, -0.4], [-6.6,  0.3], [-5.0, -4.2], [-3.8, -3.9],
      [-7.0, -3.0], [-5.2, -2.3],
    ];
    var d = anim ? 700 : 0;
    var moves = markedActors.map(function (a, i) {
      var tp = MIX_POS[i] || MIX_POS[i % MIX_POS.length];
      return a.moveTo(tp[0], tp[1], d);
    });
    S.addText('s2-hint2', -9.5, 5.5, '放回瓶中，充分摇匀……', { size: 17, color: '#e65100' });
    return anim ? Promise.all(moves) : Promise.resolve();
  }

  // 步骤3：第二次抓取 40 粒，展示在右侧
  function step3SecondSample(anim) {
    S.remove('s2-hint2');
    S.addText('s2-hint3', -9.5, 5.5, '② 再随机抓取 $M=40$ 粒', { size: 17, color: ACCENT });
    // 右侧展示区标签
    S.addText('s2-label-right', 1.5, 6.5, '第二次样本（40粒）', { size: 16, color: INK });
    var p = Promise.resolve();
    SAMPLE_PLAIN.forEach(function (pos, i) {
      p = p.then(function () {
        var a = S.actor('s2-sp-' + i, pos[0], pos[1], '●', { color: BEAN, size: 14 });
        sampleActors.push(a);
        return anim ? delay(30) : null;
      });
    });
    SAMPLE_MARKED.forEach(function (pos, i) {
      p = p.then(function () {
        var a = S.actor('s2-sm-' + i, pos[0], pos[1], '●', { color: MARKED, size: 14 });
        sampleActors.push(a);
        redInSample.push(a);
        return anim ? delay(40) : null;
      });
    });
    return p;
  }

  // 步骤4：圈出标记豆，数出 m=8
  function step4CountMarked(anim) {
    S.remove('s2-hint3');
    S.addText('s2-hint4', -9.5, 5.5, '③ 数出样本中带标记的有 $m=8$ 粒（红色）', { size: 17, color: MARKED });
    // 在每个红豆旁边加圆圈高亮
    var p = Promise.resolve();
    SAMPLE_MARKED.forEach(function (pos, i) {
      p = p.then(function () {
        S.addCircle('s2-ring-' + i, pos[0], pos[1], 0.45,
          { color: MARKED, fill: 'none', width: 2.5 });
        return anim ? delay(120) : null;
      });
    });
    return p;
  }

  // 步骤5：比例推算，展示演算卡
  function step5Calculate() {
    P.clearExtras();
    P.renderCard(
      '按比例估算：<br>' +
      '$$\\frac{标记数}{总数} \\approx \\frac{重捕中标记数}{重捕总数}$$' +
      '即：$\\dfrac{50}{N} \\approx \\dfrac{8}{40}$<br><br>' +
      '$N \\approx \\dfrac{50 \\times 40}{8} = \\mathbf{250}$（粒）',
      'cool', 'flipInX'
    );
    S.addText('s2-result', -0.5, -6.0,
      '估计瓶中约有 $\\mathbf{250}$ 粒豆子',
      { size: 19, color: MARKED });
  }

  var scene = {
    id: 's2',
    title: '二、标记重捕法原理',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      markedActors = [];
      sampleActors = [];
      redInSample  = [];
    },
    steps: [
      {
        // 步骤1：画出瓶子和豆子，取出50粒做标记
        narration: '第一步：从瓶中随机取出一把豆子，数出 $N=50$ 粒，在每粒豆子上<b>做上记号</b>（这里染成红色），然后放回瓶中。',
        enter: function (anim) {
          drawScene();
          return step1MarkBeans(anim);
        },
      },
      {
        // 步骤2：摇匀混合
        narration: '关键操作：将标记豆放回后，<b>充分摇匀</b>——使标记豆与未标记豆均匀混合，这是方法成立的前提！',
        enter: function (anim) {
          return step2ShakeMix(anim);
        },
      },
      {
        // 步骤3：第二次取样
        narration: '第二步：再随机抓取 $M=40$ 粒豆子，摆放在桌上，仔细检查哪些豆子有标记。',
        enter: function (anim) {
          return step3SecondSample(anim);
        },
      },
      {
        // 步骤4：数出标记豆
        narration: '数一数：这 40 粒里，有标记的豆子（红色）共有 $m=8$ 粒！记录下这三个数据：$N=50$，$M=40$，$m=8$。',
        enter: function (anim) {
          return step4CountMarked(anim);
        },
      },
      {
        // 步骤5：建立比例推算
        narration: '第三步：建立<b>比例方程</b>——假设标记豆在总体中的比例，与在样本中的比例近似相等，就能解出总数 $N$！',
        enter: function () {
          step5Calculate();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
