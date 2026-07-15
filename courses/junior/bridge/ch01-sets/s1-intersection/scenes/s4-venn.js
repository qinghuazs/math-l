(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', INK = '#455a64';
  var ra = 0, rb = 0; // 两圆半径（闭包驱动"生长"动画）
  var sym = null;     // 'A∩B' 标注演员
  var walkers = {};   // 站位活动演员

  var scene = {
    id: 's4',
    title: '四、图形表示：文氏图',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; ra = 0; rb = 0; sym = null; walkers = {}; },
    steps: [
      {
        narration: '数学家喜欢用图说话。画两个相交的圆：左圆表示集合 $A$，右圆表示集合 $B$——这叫<b>文氏图</b>。',
        enter: function (anim) {
          ra = anim ? 0 : 3.3; rb = ra;
          S.addCircle('s4-ca', -2.2, 0, function () { return ra; }, { color: WARM, width: 4, fill: WARM, fillOpacity: 0.15 });
          S.addCircle('s4-cb', 2.2, 0, function () { return rb; }, { color: COOL, width: 4, fill: COOL, fillOpacity: 0.15 });
          S.actor('s4-ta', -4.2, 4.3, 'A', { color: WARM, size: 24, bold: true });
          S.actor('s4-tb', 4.2, 4.3, 'B', { color: COOL, size: 24, bold: true });
          if (!anim) { S.getBoard().update(); return null; }
          return S.animate({
            from: 0, to: 3.3, duration: 1100, easing: 'easeOut',
            onUpdate: function (v) { ra = v; rb = v; S.getBoard().update(); },
          });
        },
      },
      {
        narration: '两圆<b>重叠的部分</b>颜色最深——落在这里的元素有<b>双重身份</b>：它属于 $A$，也属于 $B$。',
        enter: function (anim) {
          sym = S.actor('s4-sym', 0, anim ? 6.2 : 0, 'A ∩ B', { color: PURPLE, size: 26, bold: true });
          P.renderCard('重叠区域中的元素：<br>① 它属于集合 $A$；<br>② 它<b>也</b>属于集合 $B$。<br>所以重叠部分表示 $A\\cap B$。', 'cool');
          return anim ? sym.moveTo(0, 0, 1100) : null;
        },
      },
      {
        narration: '来做个"站位游戏"：甲只参加篮球社，乙只参加足球社，丙<b>两个社团都参加</b>——他们该站在哪里？',
        enter: function (anim) {
          walkers.jia = S.actor('s4-jia', -4, -6.4, '甲', { color: INK, size: 19, bold: true });
          walkers.yi = S.actor('s4-yi', 4, -6.4, '乙', { color: INK, size: 19, bold: true });
          walkers.bing = S.actor('s4-bing', 0, -6.4, '丙', { color: PURPLE, size: 19, bold: true });
          P.renderCard('甲 $\\to$ 只在 $A$ 圈；乙 $\\to$ 只在 $B$ 圈；<br><b>丙 $\\to$ 站进重叠区</b>（他同时属于两个集合）。', 'warm');
          if (!anim) {
            return Promise.all([
              walkers.jia.moveTo(-3.9, 0.6, 0),
              walkers.yi.moveTo(3.9, 0.6, 0),
              walkers.bing.moveTo(0, -1.0, 0),
            ]);
          }
          return walkers.jia.moveTo(-3.9, 0.6, 1000).then(function () {
            return walkers.yi.moveTo(3.9, 0.6, 1000);
          }).then(function () {
            return walkers.bing.moveTo(0, -1.0, 1300);
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
