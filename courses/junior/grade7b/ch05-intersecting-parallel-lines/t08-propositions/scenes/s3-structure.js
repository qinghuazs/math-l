(function (CW) {
  'use strict';
  // 场景三：题设与结论
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 长例句文字（拆两段用于分色）
  var SENT_IF   = '如果两条直线被第三条直线所截，同位角相等，';
  var SENT_THEN = '那么这两条直线平行。';

  var scene = {
    id: 's3',
    title: '三、题设与结论',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '命题通常可以写成"如果……那么……"的形式。其中"如果"后面的部分叫作题设，"那么"后面的部分叫作结论。题设是条件，结论是在满足条件时必然成立的判断。',
        enter: function (anim) {
          S.actor('s3-title', 0, 5.8, '三、题设与结论', { color: WARM, size: 26, bold: true });
          S.actor('s3-struct', 0, 3.5, '如果……（题设），那么……（结论）', { color: INK, size: 19 });
          // 两个标注框
          S.shadeRect('s3-bg-if',   -9.5, 2.3, -0.5, 1.0, { color: COOL, opacity: 0.12 });
          S.shadeRect('s3-bg-then',  0.5, 2.3,  9.5, 1.0, { color: WARM, opacity: 0.12 });
          S.actor('s3-if-label',   -5.0, 1.65, '题设（条件）', { color: COOL, size: 17, bold: true });
          S.actor('s3-then-label',  5.0, 1.65, '结论',         { color: WARM, size: 17, bold: true });
          S.actor('s3-if-kw',      -5.0, 0.3,  '"如果"后面',   { color: COOL, size: 16 });
          S.actor('s3-then-kw',     5.0, 0.3,  '"那么"后面',   { color: WARM, size: 16 });
          P.renderCard('<b>命题的结构</b><br>命题通常写成"如果……那么……"的形式。<br><br><span style="color:#1565c0;font-weight:700">题设</span>："如果"后面的部分（给定条件）<br><span style="color:#e64a19;font-weight:700">结论</span>：" 那么"后面的部分（推出结果）');
          if (!anim) return null;
          var o = S.get('s3-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 14, to: 26, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '来看一个具体例子。命题："如果两条直线被第三条直线所截，同位角相等，那么这两条直线平行。"我们把它拆开来分析。',
        enter: function (anim) {
          // 移除框
          S.remove('s3-bg-if'); S.remove('s3-bg-then');
          S.remove('s3-if-label'); S.remove('s3-then-label');
          S.remove('s3-if-kw'); S.remove('s3-then-kw');
          S.remove('s3-struct');
          S.actor('s3-title', 0, 6.5, '三、题设与结论', { color: WARM, size: 20, bold: true });
          // 整句显示（先用中性色）
          S.actor('s3-sent-full', 0, 3.8, SENT_IF + SENT_THEN, { color: INK, size: 16 });
          P.renderCard('<b>例句</b><br>如果两条直线被第三条直线所截，同位角相等，那么这两条直线平行。<br><br>请找出其中的<span style="color:#1565c0;font-weight:700">题设</span>和<span style="color:#e64a19;font-weight:700">结论</span>。');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '好，现在进行拆解动画。蓝色部分是题设："两条直线被第三条直线所截，同位角相等"——这是条件。红色部分是结论："这两条直线平行"——这是推出的结果。题设→结论，条件→推断，这就是命题的基本逻辑结构。',
        enter: function (anim) {
          // 移除整句，分两段分色显示
          S.remove('s3-sent-full');
          // 题设（蓝）
          S.shadeRect('s3-bg-ex-if', -9.5, 5.8, 9.5, 4.2, { color: COOL, opacity: 0.10 });
          S.actor('s3-label-if', -7.5, 5.0, '题设（蓝）', { color: COOL, size: 15, bold: true });
          S.actor('s3-ex-if',    0.5, 5.0, SENT_IF, { color: COOL, size: 15 });
          // 结论（红）
          S.shadeRect('s3-bg-ex-then', -9.5, 3.7, 9.5, 2.5, { color: WARM, opacity: 0.10 });
          S.actor('s3-label-then', -7.5, 3.1, '结论（红）', { color: WARM, size: 15, bold: true });
          S.actor('s3-ex-then',    1.5, 3.1, SENT_THEN, { color: WARM, size: 15 });
          // 箭头
          S.actor('s3-arrow', 0, 1.5, '题设 → 结论', { color: INK, size: 18, bold: true });
          P.renderCard('<b>拆解分析</b><br><span style="color:#1565c0;font-weight:700">题设</span>：两条直线被第三条直线所截，同位角相等。<br><span style="color:#e64a19;font-weight:700">结论</span>：这两条直线平行。<br><br>题设是<b>条件</b>，结论是<b>推断</b>。');
          if (!anim) return null;
          return delay(400);
        },
      },
      {
        narration: '练习一下。语句"对顶角相等"——这个命题没有明显的"如果……那么……"。我们来把它改写成标准形式：如果两个角是对顶角，那么它们相等。改写后，题设是"两个角是对顶角"，结论是"它们相等"。很多命题都可以这样改写，帮助我们看清楚题设和结论。',
        enter: function (anim) {
          // 清除上一步内容
          S.remove('s3-bg-ex-if'); S.remove('s3-label-if'); S.remove('s3-ex-if');
          S.remove('s3-bg-ex-then'); S.remove('s3-label-then'); S.remove('s3-ex-then');
          S.remove('s3-arrow');
          // 改写练习
          S.actor('s3-orig-label', -7.0, 5.0, '原命题：', { color: INK, size: 17, bold: true });
          S.actor('s3-orig',       0.5, 5.0, '对顶角相等。', { color: INK, size: 17 });
          S.actor('s3-arr2',       0, 3.5, '↓ 改写为"如果…那么…"形式', { color: GREEN, size: 16 });
          // 改写后：题设蓝，结论红
          S.shadeRect('s3-bg-rw-if',   -9.5, 2.5, 5.0, 1.2, { color: COOL, opacity: 0.10 });
          S.shadeRect('s3-bg-rw-then',  5.0, 2.5, 9.5, 1.2, { color: WARM, opacity: 0.10 });
          S.actor('s3-rw-if',   -2.5, 1.85, '如果两个角是对顶角，', { color: COOL, size: 16 });
          S.actor('s3-rw-then',  7.5, 1.85, '那么它们相等。', { color: WARM, size: 16 });
          // 标注
          S.actor('s3-lbl-if2',   -2.5, 0.3, '← 题设', { color: COOL, size: 15, bold: true });
          S.actor('s3-lbl-then2',  7.5, 0.3, '← 结论', { color: WARM, size: 15, bold: true });
          P.renderCard('<b>改写练习</b><br>原命题：对顶角相等。<br><br>改写：<span style="color:#1565c0">如果两个角是对顶角，</span><span style="color:#e64a19">那么它们相等。</span><br><br><span style="color:#1565c0;font-weight:700">题设</span>：两个角是对顶角<br><span style="color:#e64a19;font-weight:700">结论</span>：它们相等');
          if (!anim) return null;
          return delay(300);
        },
      },
    ],
    expectSteps: 4,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
