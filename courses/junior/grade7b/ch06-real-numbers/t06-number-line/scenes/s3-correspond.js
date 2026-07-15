(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b', GRAY = '#90a4ae';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数（bbox: [-8, 5.5, 8, -2.5]，数轴在 y=0）
  var AXIS_Y = 0;
  var UNIT = 1.4; // 1 数学单位 = 1.4 画面单位
  function tx(n) { return n * UNIT; }

  var scene = {
    id: 's3',
    title: '三、实数与数轴一一对应',
    bbox: [-8, 5.5, 8, -2.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // Step 1：有理数填不满数轴（有"缝隙"）
      {
        narration: '同学们想一想，如果数轴上只有有理数，会怎样？有理数虽然有无限多个，但数学家发现，有理数点之间存在"缝隙"——比如 √2 的位置，有理数就填不进去。数轴上有理数的集合是有"空洞"的！这些缝隙里，住着无理数！',
        enter: function (anim) {
          // 画数轴
          S.addSegment('s3-axis', [tx(-5) - 0.2, AXIS_Y], [tx(5) + 0.2, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s3-arr1', [tx(5) + 0.0, AXIS_Y + 0.15], [tx(5) + 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s3-arr2', [tx(5) + 0.0, AXIS_Y - 0.15], [tx(5) + 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s3-arr3', [tx(-5) - 0.0, AXIS_Y + 0.15], [tx(-5) - 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s3-arr4', [tx(-5) - 0.0, AXIS_Y - 0.15], [tx(-5) - 0.3, AXIS_Y],
            { color: INK, width: 2, dash: 0 });

          // 刻度
          for (var n = -4; n <= 4; n++) {
            S.addSegment('s3-tick-' + (n + 10), [tx(n), AXIS_Y - 0.18], [tx(n), AXIS_Y + 0.18],
              { color: INK, width: 2, dash: 0 });
            if (n !== 0) {
              S.addText('s3-tlab-' + (n + 10), tx(n) - 0.1, AXIS_Y - 0.5, '' + n,
                { color: INK, size: 13 });
            }
          }
          S.addText('s3-tlab-0', tx(0) - 0.08, AXIS_Y - 0.5, '0', { color: INK, size: 13 });

          // 有理数点（密密排列一段，模拟"但有缝隙"）
          var rpts = [-3, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 3];
          for (var i = 0; i < rpts.length; i++) {
            S.dropPoint('s3-rpt-' + i, tx(rpts[i]), AXIS_Y, { color: COOL, size: 3 });
          }

          // "缝隙"示意：在 √2 位置标问号
          var sq2x = tx(Math.sqrt(2));
          S.addText('s3-gap1', sq2x - 0.25, AXIS_Y + 0.65, '?', { color: WARM, size: 20 });
          S.addText('s3-gap-lab', sq2x - 1.3, AXIS_Y + 1.3,
            '有理数的"缝隙"', { color: WARM, size: 14 });

          // 左侧文字
          S.addText('s3-left1', -7.8, 4.8, '只有有理数时：', { color: COOL, size: 18 });
          S.addText('s3-left2', -7.8, 4.0,
            '数轴上有"缝隙"——', { color: INK, size: 16 });
          S.addText('s3-left3', -7.8, 3.3,
            '无理数的位置没有对应点！', { color: WARM, size: 16 });

          P.renderCard(
            '<b>有理数填不满数轴</b><br>' +
            '有理数虽然稠密，但数轴上仍然有"缝隙"。<br>' +
            '例如 $\\sqrt{2}$ 的位置，没有有理数能精确对应。<br>' +
            '这些"缝隙"里住着无理数！'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：加入无理数后填满——实数与数轴点一一对应（基本事实）
      {
        narration: '加入无理数之后，所有这些缝隙就被填满了！有理数加上无理数合在一起，就是实数。实数恰好完整地"填满"了整条数轴，没有任何缝隙。这是数学中的一个基本事实：实数与数轴上的点——一一对应！',
        enter: function (anim) {
          // 移除缝隙问号
          S.remove('s3-gap1');
          S.remove('s3-gap-lab');

          // 加入几个无理数点（填缝隙）
          var irpts = [
            { v: Math.sqrt(2),  label: '$\\sqrt{2}$',  dy: 0.55 },
            { v: -Math.sqrt(2), label: '$-\\sqrt{2}$', dy: 0.55 },
            { v: Math.PI,       label: '$\\pi$',       dy: 0.55 },
            { v: Math.sqrt(3),  label: '$\\sqrt{3}$',  dy: -0.8 },
          ];
          for (var i = 0; i < irpts.length; i++) {
            var r = irpts[i];
            S.dropPoint('s3-irpt-' + i, tx(r.v), AXIS_Y,
              { color: WARM, size: 4, animate: !!anim });
            S.addText('s3-irlab-' + i, tx(r.v) - 0.25, AXIS_Y + r.dy, r.label,
              { color: WARM, size: 14 });
          }

          // 更新左侧文字
          S.addText('s3-fill1', -7.8, 2.5, '加入无理数后：', { color: TEAL, size: 18 });
          S.addText('s3-fill2', -7.8, 1.8,
            '缝隙被填满，数轴完整！', { color: TEAL, size: 16 });

          // 基本事实卡（画面中央偏上）
          S.addText('s3-fact', -7.8, 4.8, '【基本事实】', { color: TEAL, size: 18 });
          S.addText('s3-fact2', -7.8, 4.0,
            '实数与数轴上的点', { color: INK, size: 16 });
          S.addText('s3-fact3', -7.8, 3.3,
            '一一对应', { color: TEAL, size: 20 });

          P.renderCard(
            '<b>实数与数轴一一对应（基本事实）</b><br>' +
            '有理数 + 无理数 = <b>实数</b><br>' +
            '每一个实数对应数轴上唯一一个点；<br>' +
            '数轴上每一个点对应唯一一个实数。<br>' +
            '→ 实数与数轴上的点 <b>一一对应</b>！',
            'teal'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 3：数轴标几个实数点（-√2, -1, 0, 1, √2, π）综合展示
      {
        narration: '我们来看看数轴上几个实数的位置。负根号2，约等于负1.414，在 -1 和 -2 之间；-1 是有理数；0；1；根号2，约等于1.414，在 1 和 2 之间；π，约等于3.14，在3和4之间。有理数、无理数，一起和谐地住在数轴上！',
        enter: function (anim) {
          // 清除之前的无理数点标注（重新整合展示）
          S.remove('s3-irpt-0');
          S.remove('s3-irpt-1');
          S.remove('s3-irpt-2');
          S.remove('s3-irpt-3');
          S.remove('s3-irlab-0');
          S.remove('s3-irlab-1');
          S.remove('s3-irlab-2');
          S.remove('s3-irlab-3');

          // 综合标注点列表
          var pts = [
            { v: -Math.sqrt(2), label: '$-\\sqrt{2}$', color: WARM, dy: 0.58 },
            { v: -1,            label: '$-1$',          color: COOL,  dy: 0.58 },
            { v: 0,             label: '$0$',           color: INK,   dy: 0.58 },
            { v: 1,             label: '$1$',           color: COOL,  dy: 0.58 },
            { v: Math.sqrt(2),  label: '$\\sqrt{2}$',  color: WARM,  dy: 0.58 },
            { v: Math.PI,       label: '$\\pi$',        color: PURPLE, dy: 0.58 },
          ];
          for (var i = 0; i < pts.length; i++) {
            var p = pts[i];
            S.dropPoint('s3-allpt-' + i, tx(p.v), AXIS_Y,
              { color: p.color, size: 4.5, animate: !!anim });
            S.addText('s3-allab-' + i, tx(p.v) - 0.25, AXIS_Y + p.dy, p.label,
              { color: p.color, size: 14 });
          }

          // 近似值标注
          S.addText('s3-approx1', tx(-Math.sqrt(2)) - 0.5, AXIS_Y - 0.75,
            '$\\approx{-}1.414$', { color: WARM, size: 11 });
          S.addText('s3-approx2', tx(Math.sqrt(2)) - 0.4, AXIS_Y - 0.75,
            '$\\approx 1.414$', { color: WARM, size: 11 });
          S.addText('s3-approx3', tx(Math.PI) - 0.4, AXIS_Y - 0.75,
            '$\\approx 3.14$', { color: PURPLE, size: 11 });

          P.renderCard(
            '<b>数轴上的实数点</b><br>' +
            '$-\\sqrt{2} \\approx -1.414$（无理数）&emsp;' +
            '$-1$（有理数）<br>' +
            '$0$（有理数）&emsp;$1$（有理数）<br>' +
            '$\\sqrt{2} \\approx 1.414$（无理数）&emsp;' +
            '$\\pi \\approx 3.14$（无理数）<br>' +
            '有理数与无理数共同住在数轴上！',
            'teal'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
