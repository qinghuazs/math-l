(function (CW) {
  'use strict';
  // 场景一：定义
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、定义',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '同学们好！前几课我们学习了平行线的性质和判定，知道了很多几何事实。但我们有没有想过：这些几何知识是怎么建立起来的？从今天开始，我们来学习数学推理的基础——定义、命题和定理。首先来看：什么叫做定义？',
        enter: function (anim) {
          S.actor('s1-title', 0, 4.5, '一、定义', { color: WARM, size: 28, bold: true });
          S.actor('s1-def', 0, 2.0, '对一个概念的本质特征所作的规定，叫作定义。', { color: INK, size: 18 });
          P.renderCard('我们学过的每一个几何概念，都有一个精确的<b>定义</b>。<br><br>定义就是对概念<b>本质特征</b>的规定——<br>告诉我们这个概念"是什么"。');
          if (!anim) return null;
          var o = S.get('s1-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 14, to: 28, duration: 600, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '我们来看第一个例子。平行线的定义：在同一平面内，不相交的两条直线叫作平行线。这个定义精确地描述了平行线的两个本质特征：第一，在同一平面内；第二，不相交。缺少任何一个条件，定义就不完整了。',
        enter: function (anim) {
          // 例1：平行线定义 — 两条平行线直观图
          S.actor('s1-ex1-title', -4, 5.5, '例1 平行线的定义', { color: COOL, size: 20, bold: true });
          // 画两条平行线
          S.addSegment('s1-lineA', [-8.5, 2.5], [1.5, 2.5], { color: COOL, width: 3, dash: 0 });
          S.addSegment('s1-lineB', [-8.5, 0.0], [1.5, 0.0], { color: COOL, width: 3, dash: 0 });
          S.actor('s1-la', -9.0, 2.5, 'a', { color: COOL, size: 18, bold: true });
          S.actor('s1-lb', -9.0, 0.0, 'b', { color: COOL, size: 18, bold: true });
          // 定义文字框
          S.actor('s1-def1a', -3.5, -2.0, '在同一平面内，', { color: WARM, size: 17 });
          S.actor('s1-def1b', -3.5, -3.2, '不相交的两条直线', { color: WARM, size: 17 });
          S.actor('s1-def1c', -3.5, -4.4, '叫作平行线。', { color: INK, size: 17, bold: true });
          // 平行符号
          S.actor('s1-para', 3.5, 1.25, 'a ∥ b', { color: GREEN, size: 22, bold: true });
          P.renderCard('<b>平行线的定义</b><br>在同一平面内，不相交的两条直线叫作<b>平行线</b>。<br><br>关键词：① 同一平面内 &nbsp; ② 不相交');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '第二个例子：垂线的定义。两条直线相交，所成的四个角中，有一个角是直角，就说这两条直线互相垂直。其中一条叫做另一条的垂线。这个定义中，本质特征是"相交所成角为直角"。每个定义都是对概念最精炼、最准确的描述。',
        enter: function (anim) {
          // 清理平行线，换垂线图
          S.remove('s1-lineA'); S.remove('s1-lineB');
          S.remove('s1-la'); S.remove('s1-lb');
          S.remove('s1-def1a'); S.remove('s1-def1b'); S.remove('s1-def1c');
          S.remove('s1-para');
          S.actor('s1-ex2-title', -4, 5.5, '例2 垂线的定义', { color: WARM, size: 20, bold: true });
          // 画垂线图：两条线相交于原点区域
          var cx = -3.5, cy = 1.5;
          S.addSegment('s1-vlineH', [cx - 3.5, cy], [cx + 3.5, cy], { color: WARM, width: 3, dash: 0 });
          S.addSegment('s1-vlineV', [cx, cy - 3.5], [cx, cy + 3.0], { color: WARM, width: 3, dash: 0 });
          // 直角标记
          S.addAngle('s1-vang', [cx + 0.8, cy], [cx, cy], [cx, cy + 0.8],
            { radius: 0.55, color: WARM, opacity: 0.12, ortho: true });
          // 标注
          S.actor('s1-vl1', cx + 4.0, cy, 'l', { color: WARM, size: 18, bold: true });
          S.actor('s1-vl2', cx, cy + 3.5, 'm', { color: WARM, size: 18, bold: true });
          S.actor('s1-vfootlabel', cx + 0.4, cy - 0.5, 'O', { color: INK, size: 17 });
          // 定义
          S.actor('s1-def2a', 2.5, 2.0, '两条直线相交，', { color: WARM, size: 17 });
          S.actor('s1-def2b', 2.5, 0.8, '所成角为直角，', { color: WARM, size: 17 });
          S.actor('s1-def2c', 2.5, -0.4, '则两直线互相垂直。', { color: INK, size: 17, bold: true });
          S.actor('s1-def2d', 2.5, -2.0, 'l ⊥ m', { color: GREEN, size: 22, bold: true });
          P.renderCard('<b>垂线的定义</b><br>两条直线相交成直角，这两条直线互相<b>垂直</b>。<br><br>关键词：① 相交 &nbsp; ② 成角为直角');
          if (!anim) return null;
          return delay(300);
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
