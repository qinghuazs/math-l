(function (CW) {
  'use strict';
  // 场景五：定理与小结
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、定理与小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '最后来学习定理。什么是定理？经过推理证实的真命题，可以作为进一步推理依据的，叫作定理。注意定理有两个特点：第一，它是真命题，已经被证实是正确的；第二，它可以作为推理的依据，也就是说以后可以直接引用它来进行推理，不需要每次重新证明。',
        enter: function (anim) {
          S.actor('s5-title', 0, 5.8, '五、定理', { color: WARM, size: 26, bold: true });
          S.actor('s5-def', 0, 3.8, '经过推理证实的真命题，', { color: INK, size: 18 });
          S.actor('s5-def2', 0, 2.8, '可以作为进一步推理依据的，叫作定理。', { color: INK, size: 18 });
          // 两个特点
          S.shadeRect('s5-bg1', -9.5, 1.5, -0.5, 0.2, { color: GREEN, opacity: 0.10 });
          S.actor('s5-feat1', -5.0, 0.85, '① 已被证实（真命题）', { color: GREEN, size: 17 });
          S.shadeRect('s5-bg2', 0.5, 1.5, 9.5, 0.2, { color: COOL, opacity: 0.10 });
          S.actor('s5-feat2', 5.0, 0.85, '② 可作推理依据', { color: COOL, size: 17 });
          P.renderCard('<b>定理的定义</b><br>经过推理证实的真命题，可以作为进一步推理依据的，叫作<b>定理</b>。<br><br>特点：① 已被严格证明（真命题）<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;② 可直接引用为推理依据');
          if (!anim) return null;
          var o = S.get('s5-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 14, to: 26, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '本章我们已经学过几个重要定理。第一个：对顶角相等。第二个：垂线段最短。这两个定理都是经过推理证实的真命题，可以直接作为后续推理的依据。当我们以后做几何证明时，可以直接说"由对顶角相等定理，得……"，不需要再重新推导一遍。',
        enter: function (anim) {
          // 清理定义部分
          S.remove('s5-def'); S.remove('s5-def2');
          S.remove('s5-bg1'); S.remove('s5-feat1');
          S.remove('s5-bg2'); S.remove('s5-feat2');
          S.actor('s5-title', 0, 6.5, '五、定理', { color: WARM, size: 20, bold: true });
          S.actor('s5-thm-label', 0, 5.5, '本章已学定理举例', { color: INK, size: 18, bold: true });
          // 定理1卡片
          S.shadeRect('s5-bg-t1', -9.5, 4.5, 9.5, 2.8, { color: WARM, opacity: 0.10 });
          S.actor('s5-t1-num',  -8.0, 3.65, '定理1', { color: WARM, size: 17, bold: true });
          S.actor('s5-t1-text',  1.0, 3.65, '对顶角相等', { color: INK, size: 18 });
          // 定理2卡片
          S.shadeRect('s5-bg-t2', -9.5, 2.3, 9.5, 0.6, { color: COOL, opacity: 0.10 });
          S.actor('s5-t2-num',  -8.0, 1.45, '定理2', { color: COOL, size: 17, bold: true });
          S.actor('s5-t2-text',  0.5, 1.45, '垂线段最短', { color: INK, size: 18 });
          // 说明
          S.actor('s5-note', 0, -0.5, '以上均为经证明的真命题，可作推理依据', { color: GREEN, size: 15 });
          P.renderCard('<b>本章定理举例</b><br><br>定理 1：<b>对顶角相等</b><br>定理 2：<b>垂线段最短</b><br><br>这两个定理已经严格证明，<br>后续推理可直接引用。');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '最后做一个完整小结。本课我们学了六个核心概念：定义——对概念本质特征的规定；命题——判断一件事情的语句；题设——命题中"如果"后面的条件；结论——命题中"那么"后面的推断；真命题与假命题——命题的真假性；反例——否定假命题的工具；定理——经推理证实可作推理依据的真命题。这六个概念是数学推理的基础！',
        enter: function (anim) {
          // 清理上一步内容
          S.remove('s5-thm-label');
          S.remove('s5-bg-t1'); S.remove('s5-t1-num'); S.remove('s5-t1-text');
          S.remove('s5-bg-t2'); S.remove('s5-t2-num'); S.remove('s5-t2-text');
          S.remove('s5-note');
          S.actor('s5-title', 0, 7.0, '小结', { color: WARM, size: 22, bold: true });

          // 小结六行：画板逐行底色+标签+释义
          var colors = [WARM, COOL, COOL, GREEN, WARM, PURPLE];
          var labels = ['定义', '命题', '题设/结论', '真命题', '假命题/反例', '定理'];
          var descs  = [
            '对概念本质特征的规定',
            '判断一件事情的语句',
            '"如果…"（条件）/ "那么…"（推断）',
            '正确的命题（经验证/推理）',
            '错误命题；一个反例即可否定',
            '经推理证实、可作推理依据的真命题',
          ];
          var yStart = 5.5;
          var yStep  = 1.75;
          var i;
          for (i = 0; i < labels.length; i++) {
            var yy = yStart - i * yStep;
            S.shadeRect('s5-row-bg' + i, -9.5, yy + 0.7, 9.5, yy - 0.7,
              { color: colors[i], opacity: 0.08 });
            S.actor('s5-row-lbl' + i, -7.0, yy, labels[i],
              { color: colors[i], size: 16, bold: true });
            S.actor('s5-row-desc' + i, 1.5, yy, descs[i],
              { color: INK, size: 14 });
          }
          P.renderCard('<b>本课小结</b><br>定义 → 概念的规定<br>命题 → 判断性语句<br>题设/结论 → 条件与推断<br>真/假命题 → 对命题真伪的判定<br>反例 → 否定假命题的有力工具<br>定理 → 经证实的真命题');
          if (!anim) return null;
          return delay(400);
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
