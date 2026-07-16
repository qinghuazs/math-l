// s4-tally.js  数据的整理（3步）—— 划记法动画 + 统计表
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // "正"字的5笔，每笔用 addPolygon 画粗线段近似（矩形）
  // 以左上角为原点 (ox, oy)，单个正字尺寸约 2.0×2.4
  function drawZhengStroke(strokeIdx, ox, oy, color) {
    // 5笔坐标（归一化，宽2，高2.4）
    var strokes = [
      // 第1笔：横（顶部）
      [[-0.05, 2.4], [2.05, 2.4], [2.05, 2.1], [-0.05, 2.1]],
      // 第2笔：竖（左）
      [[0.0, 2.4], [0.35, 2.4], [0.35, 0.0], [0.0, 0.0]],
      // 第3笔：横（中部）
      [[-0.05, 1.35], [2.05, 1.35], [2.05, 1.05], [-0.05, 1.05]],
      // 第4笔：竖（右）
      [[1.65, 2.4], [2.0, 2.4], [2.0, 0.0], [1.65, 0.0]],
      // 第5笔：横（底部）
      [[-0.05, 0.3], [2.05, 0.3], [2.05, 0.0], [-0.05, 0.0]],
    ];
    var pts = strokes[strokeIdx].map(function (p) {
      return [ox + p[0], oy + p[1]];
    });
    return { pts: pts, color: color };
  }

  var zhengGroups = []; // [{id, char-index, stroke-index}] 存已画的笔划
  var rawData = [
    'A','B','A','C','B','A','D','B','A','C',
    'A','B','D','A','C','B','A','A','B','C',
    'A','D','B','A','C','A','B','A','C','B',
  ];

  // 统计结果
  var counts = { A: 0, B: 0, C: 0, D: 0 };
  rawData.forEach(function (v) { counts[v]++; });
  // A:12, B:9, C:6, D:3

  var scene = {
    id: 's4',
    title: '四、数据整理',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      // 重置闭包变量
      zhengGroups = [];
    },
    steps: [
      {
        // 步骤1：介绍划记法（唱票法），展示"正"字结构
        narration: '收集到问卷后，我们得到一堆原始数据，需要整理统计。最直观、最传统的方法叫"划记法"，也叫"唱票法"。划记法用"正"字来计数——"正"字一共5笔，每笔代表1个，所以一个完整的"正"字代表5个。统计时，每出现一条数据，就在对应选项旁边画一笔；画满5笔就是一个"正"字，再从头开始。最后数有几个"正"字，乘以5再加上剩余笔数，就得到频数。这个方法不容易漏数，也不容易重复计数，非常实用！让我们看一下"正"字的5笔是怎么画的。',
        enter: function (anim) {
          // 标题
          S.addPolygon('title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 5.9], [-9.5, 5.9]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('title', 0, 6.7, '划记法（唱票法）整理数据', { size: 19, color: ORANGE, anchorX: 'middle' });

          // 说明
          S.addText('intro1', -9.0, 5.3, '"正"字共 5 笔，每笔代表 1 个数据', { size: 15, color: INK });
          S.addText('intro2', -9.0, 4.6, '一个完整的"正"字 = 5 个数据', { size: 15, color: ORANGE });

          // 画"正"字示意（大号，中央）——静态展示全部5笔带序号
          var ox = -2.5, oy = -1.5;
          var colors = ['#c62828','#e65100','#1565c0','#2e7d32','#6a1b9a'];
          var strokeLabels = [
            { x: -1.5, y: 3.5, txt: '第①笔（横）' },
            { x: -4.0, y: 1.2, txt: '第②笔（竖）' },
            { x: -1.5, y: 0.5, txt: '第③笔（横）' },
            { x:  1.5, y: 1.2, txt: '第④笔（竖）' },
            { x: -1.5, y: -2.0, txt: '第⑤笔（横）' },
          ];

          for (var i = 0; i < 5; i++) {
            var sd = drawZhengStroke(i, ox, oy, colors[i]);
            S.addPolygon('demo-stroke-' + i, sd.pts,
              { fillColor: colors[i], fillOpacity: 0.85, strokeColor: colors[i], strokeWidth: 0 });
            S.addText('demo-label-' + i,
              ox + strokeLabels[i].x, oy + strokeLabels[i].y,
              strokeLabels[i].txt,
              { size: 12, color: colors[i] });
          }

          // 右侧公式
          S.addPolygon('formula-bg',
            [[2.5, 3.5], [9.5, 3.5], [9.5, -3.5], [2.5, -3.5]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('formula-t', 6.0, 3.0, '计数公式', { size: 14, color: BLUE, anchorX: 'middle' });
          S.addText('formula-1', 3.0, 2.0, '正字数 × 5', { size: 14, color: INK });
          S.addText('formula-2', 3.0, 1.0, '+ 剩余笔数', { size: 14, color: INK });
          S.addText('formula-3', 3.0, 0.0, '= 频数', { size: 14, color: ORANGE });
          S.addText('formula-eg', 3.0, -1.5, '例：正正丨= 11', { size: 14, color: BLUE });
          S.addText('formula-eg2', 3.0, -2.3, '(2×5 + 1 = 11)', { size: 13, color: '#546e7a' });

          P.renderCard(
            '<b>划记法（唱票法）</b><br><br>' +
            '"正"字 5 笔 = 5 个数据<br><br>' +
            '统计方法：<br>' +
            '来一条数据 → 画一笔<br>' +
            '满5笔 → 一个"正"字<br><br>' +
            '<b>频数 = 正字数×5 + 剩余笔数</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：划记法动画——逐条数据统计（选项A~D）
        narration: '现在假设我们做了一次"最喜欢的课外活动"调查，共收集到30份数据，选项是：A体育运动、B阅读、C艺术、D游戏。我来演示用划记法统计A选项的过程——每出现一个A，就画一笔。你们看，第一笔是"正"字的横，第二笔是左竖，第三笔是中横，第四笔是右竖，第五笔是底横，一个"正"字完成，表示已经统计了5个A。我们继续画第二个"正"字……最终A有12个、B有9个（正正丨丨丨丨）、C有6个（正丨）、D有3个（丨丨丨）。完成划记后，数一数就得到了每个选项的频数！',
        enter: function (anim) {
          // 清除上一步
          for (var i = 0; i < 5; i++) {
            S.remove('demo-stroke-' + i);
            S.remove('demo-label-' + i);
          }
          S.remove('title-bg'); S.remove('title');
          S.remove('intro1'); S.remove('intro2');
          S.remove('formula-bg'); S.remove('formula-t');
          S.remove('formula-1'); S.remove('formula-2'); S.remove('formula-3');
          S.remove('formula-eg'); S.remove('formula-eg2');

          // 标题
          S.addPolygon('tally-title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 6.0], [-9.5, 6.0]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('tally-title', 0, 6.7, '划记法动画演示', { size: 18, color: BLUE, anchorX: 'middle' });

          // 四行：A B C D
          var rows = [
            { opt: 'A', label: 'A 体育运动', count: 12, color: BLUE,   oy: 4.5  },
            { opt: 'B', label: 'B 阅读',     count: 9,  color: GREEN,  oy: 1.5  },
            { opt: 'C', label: 'C 艺术',     count: 6,  color: ORANGE, oy: -1.5 },
            { opt: 'D', label: 'D 游戏',     count: 3,  color: PURPLE, oy: -4.5 },
          ];

          rows.forEach(function (row) {
            // 行底色
            S.addPolygon('row-bg-' + row.opt,
              [[-9.5, row.oy + 1.3], [9.5, row.oy + 1.3], [9.5, row.oy - 1.0], [-9.5, row.oy - 1.0]],
              { fillColor: '#fafafa', fillOpacity: 1, strokeColor: '#e0e0e0', strokeWidth: 1 });
            // 选项标签
            S.addText('row-label-' + row.opt, -9.0, row.oy + 0.5, row.label,
              { size: 15, color: row.color });
          });

          // 逐笔画"正"字动画（for A=12笔，B=9笔，C=6笔，D=3笔）
          // 每个"正"字宽2.2，间隔0.3；左起 x0 = -1.5
          var x0 = -1.5;
          var zhengW = 2.2;
          var zhengGap = 0.4;

          // 快放时直接画全部
          function drawAllStrokes(row, done) {
            var charCount = Math.floor(row.count / 5);
            var remainder = row.count % 5;
            var k = 0;
            // 完整字
            for (var c = 0; c < charCount; c++) {
              for (var s = 0; s < 5; s++) {
                var ox = x0 + c * (zhengW + zhengGap);
                var sd = drawZhengStroke(s, ox, row.oy - 0.8, row.color);
                var sid = 'z-' + row.opt + '-' + c + '-' + s;
                S.addPolygon(sid, sd.pts,
                  { fillColor: row.color, fillOpacity: 0.8, strokeColor: row.color, strokeWidth: 0 });
                k++;
              }
            }
            // 余笔
            for (var r = 0; r < remainder; r++) {
              var ox2 = x0 + charCount * (zhengW + zhengGap);
              var sd2 = drawZhengStroke(r, ox2, row.oy - 0.8, row.color);
              var sid2 = 'z-' + row.opt + '-extra-' + r;
              S.addPolygon(sid2, sd2.pts,
                { fillColor: row.color, fillOpacity: 0.6, strokeColor: row.color, strokeWidth: 0 });
            }
            if (done) done();
          }

          if (!anim) {
            // 快放：直接落终态
            rows.forEach(function (row) { drawAllStrokes(row, null); });
            return;
          }

          // 动画：逐笔画（A行演示，其余快画）
          var row = rows[0];
          var charCount = Math.floor(row.count / 5);
          var remainder = row.count % 5;
          var strokes = [];
          var c, s;
          for (c = 0; c < charCount; c++) {
            for (s = 0; s < 5; s++) {
              strokes.push({ c: c, s: s });
            }
          }
          for (s = 0; s < remainder; s++) {
            strokes.push({ c: charCount, s: s, extra: true });
          }

          var idx = 0;
          function nextStroke() {
            if (idx >= strokes.length) {
              // A画完，快画其他行
              for (var i = 1; i < rows.length; i++) { drawAllStrokes(rows[i], null); }
              return;
            }
            var st = strokes[idx++];
            var ox = x0 + st.c * (zhengW + zhengGap);
            var sd = drawZhengStroke(st.s, ox, row.oy - 0.8, row.color);
            var sid = st.extra
              ? 'z-' + row.opt + '-extra-' + st.s
              : 'z-' + row.opt + '-' + st.c + '-' + st.s;
            S.addPolygon(sid, sd.pts,
              { fillColor: row.color, fillOpacity: 0.8, strokeColor: row.color, strokeWidth: 0 });
            setTimeout(nextStroke, 110);
          }

          return new Promise(function (resolve) {
            function drawAll() {
              // A行结束后快画其他行然后resolve
              var orig = nextStroke;
              var localIdx = 0;
              var localStrokes = strokes;
              (function tick() {
                if (localIdx >= localStrokes.length) {
                  for (var i = 1; i < rows.length; i++) { drawAllStrokes(rows[i], null); }
                  resolve();
                  return;
                }
                var st = localStrokes[localIdx++];
                var ox = x0 + st.c * (zhengW + zhengGap);
                var sd = drawZhengStroke(st.s, ox, row.oy - 0.8, row.color);
                var sid = st.extra
                  ? 'z-' + row.opt + '-extra-' + st.s
                  : 'z-' + row.opt + '-' + st.c + '-' + st.s;
                S.addPolygon(sid, sd.pts,
                  { fillColor: row.color, fillOpacity: 0.8, strokeColor: row.color, strokeWidth: 0 });
                setTimeout(tick, 110);
              })();
            }
            drawAll();
          });
        },
      },
      {
        // 步骤3：整理成统计表（renderTable）
        narration: '划记完成后，我们把数据整理成一张统计表，这样更加清晰直观。表格包含三列：选项（课外活动类型）、划记符号和频数（人数）。可以看到，A体育运动最多，有12人；B阅读9人；C艺术6人；D游戏3人，共计30人。统计表让我们一眼就能看出哪个选项最受欢迎，方便进行下一步的数据分析和图形展示。这张表我们叫做"频数统计表"，它是后续绘制条形统计图、折线图、扇形图的基础！',
        enter: function (anim) {
          // 清除划记内容
          var opts = ['A','B','C','D'];
          opts.forEach(function (opt) {
            S.remove('row-bg-' + opt);
            S.remove('row-label-' + opt);
            var counts2 = { A: 12, B: 9, C: 6, D: 3 };
            var cnt = counts2[opt];
            var charCount = Math.floor(cnt / 5);
            var remainder = cnt % 5;
            for (var c = 0; c < charCount; c++) {
              for (var s = 0; s < 5; s++) {
                S.remove('z-' + opt + '-' + c + '-' + s);
              }
            }
            for (var r = 0; r < remainder; r++) {
              S.remove('z-' + opt + '-extra-' + r);
            }
          });
          S.remove('tally-title-bg'); S.remove('tally-title');

          // 标题
          S.addPolygon('table-title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 6.0], [-9.5, 6.0]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('table-title', 0, 6.7, '频数统计表', { size: 19, color: GREEN, anchorX: 'middle' });

          // 说明
          S.addText('table-sub', 0, 5.5, '班级课外活动偏好调查（共30人）',
            { size: 15, color: INK, anchorX: 'middle' });

          P.clearExtras();
          P.renderTable({
            head: ['课外活动类型', '划记', '频数（人）'],
            rows: [
              ['A 体育运动', '正正正丨丨', '12'],
              ['B 阅读',     '正正丨丨丨丨', '9'],
              ['C 艺术',     '正丨', '6'],
              ['D 游戏',     '丨丨丨', '3'],
              ['合计', '', '30'],
            ],
          });

          // 板书：频率 = 频数/总数
          S.addPolygon('freq-bg',
            [[-9.5, 4.5], [9.5, 4.5], [9.5, 1.5], [-9.5, 1.5]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('freq-title', 0, 4.0, '从频数可以计算频率', { size: 16, color: ORANGE, anchorX: 'middle' });
          S.addText('freq-def', 0, 3.0,
            '频率 = 频数 ÷ 总人数',
            { size: 16, color: INK, anchorX: 'middle' });
          S.addText('freq-eg', 0, 2.0,
            'A的频率 = 12 ÷ 30 = 0.4（即40%）',
            { size: 15, color: ORANGE, anchorX: 'middle' });

          // 条形示意
          S.addPolygon('bar-title-bg',
            [[-9.5, 0.8], [9.5, 0.8], [9.5, -0.2], [-9.5, -0.2]],
            { fillColor: '#f3e5f5', fillOpacity: 1, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('bar-title', 0, 0.4, '统计表 → 可进一步绘制条形图/扇形图',
            { size: 14, color: PURPLE, anchorX: 'middle' });

          // 简单条形图示意
          var barData = [
            { opt: 'A', cnt: 12, color: BLUE },
            { opt: 'B', cnt: 9,  color: GREEN },
            { opt: 'C', cnt: 6,  color: ORANGE },
            { opt: 'D', cnt: 3,  color: PURPLE },
          ];
          var baseY = -6.5;
          var scale = 0.25;
          var barW = 1.5;
          var startX = -6.0;
          barData.forEach(function (bd, i) {
            var cx = startX + i * (barW + 1.0);
            S.addPolygon('bar-' + bd.opt,
              [[cx - barW/2, baseY], [cx + barW/2, baseY],
               [cx + barW/2, baseY + bd.cnt * scale], [cx - barW/2, baseY + bd.cnt * scale]],
              { fillColor: bd.color, fillOpacity: 0.75, strokeColor: bd.color, strokeWidth: 1 });
            S.addText('bar-label-' + bd.opt, cx, baseY - 0.5, bd.opt,
              { size: 14, color: bd.color, anchorX: 'middle' });
            S.addText('bar-val-' + bd.opt, cx, baseY + bd.cnt * scale + 0.2,
              String(bd.cnt), { size: 12, color: bd.color, anchorX: 'middle' });
          });
          // 基线
          S.addPolygon('bar-base',
            [[-8.5, baseY + 0.05], [5.5, baseY + 0.05], [5.5, baseY - 0.05], [-8.5, baseY - 0.05]],
            { fillColor: INK, fillOpacity: 1, strokeColor: INK, strokeWidth: 0 });

          P.renderCard(
            '<b>频数统计表完成！</b><br><br>' +
            'A 体育运动：12人（40%）<br>' +
            'B 阅读：9人（30%）<br>' +
            'C 艺术：6人（20%）<br>' +
            'D 游戏：3人（10%）<br><br>' +
            '<span style="color:#2e7d32">统计表是图形化展示的基础</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
