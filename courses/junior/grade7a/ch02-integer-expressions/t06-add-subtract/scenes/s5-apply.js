// s5-apply.js  环节五：几何应用——面积差的整式表达（3步）
// 数学验算：
//   S大 = (3a+b)×2a = 6a²+2ab
//   S小 = a×b = ab
//   面积差 = (6a²+2ab)-ab = 6a²+2ab-ab = 6a²+ab  ✓
//   验证(a=2,b=1)：6×4+2=26  ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var RED  = '#c62828';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、几何应用',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：画大矩形，标边长，求 S大
      {
        narration: '现在我们来看整式加减的几何应用。一块大长方形草坪，长是 3a加b，宽是 2a。先求大长方形的面积——用公式长乘宽：括号3a加b，乘以2a。展开：3a乘2a等于6a²，b乘2a等于2ab。所以 S大 等于 6a²加2ab。注意这里要用分配律，括号里每项都要乘2a！',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.3, '几何应用：面积差', { color: TEAL, size: 21, bold: true });
          // 大矩形（蓝色边框）：左下(-8,-3) 右上(7,3)
          S.addPolyline('s5-big',
            [[-8, -3], [7, -3], [7, 3], [-8, 3], [-8, -3]],
            { color: COOL, width: 3 });
          // 大矩形标注
          S.actor('s5-big-w', -0.5, -4.0, '长：$3a + b$', { color: COOL, size: 18 });
          S.actor('s5-big-h', -9.5, 0, '宽：$2a$', { color: COOL, size: 18 });
          S.actor('s5-big-label', -0.5, 0.3, '大长方形', { color: COOL, size: 17 });
          // S大 公式
          S.actor('s5-big-formula', -0.5, -1.2,
            '$S_{\\text{大}} = (3a+b) \\times 2a = 6a^{2}+2ab$',
            { color: COOL, size: 18 });
          P.renderCard(
            '<b>大长方形面积</b><br>' +
            '长 $= 3a + b$，宽 $= 2a$<br>' +
            '$S_{\\text{大}} = (3a + b) \\times 2a$<br>' +
            '$= 6a^{2} + 2ab$'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 2：画小矩形（右下角内嵌），求 S小
      {
        narration: '草坪右下角有一块小长方形花坛，长是 a，宽是 b。小长方形面积：S小 等于 a乘b，就是 ab。面积表达式很简洁。',
        enter: function (anim) {
          // 小矩形（橙色边框）：右下角内嵌，左下(3,-3) 右上(7,-1)
          S.addPolyline('s5-small',
            [[3, -3], [7, -3], [7, -1], [3, -1], [3, -3]],
            { color: WARM, width: 3 });
          S.actor('s5-small-w', 5, -3.7, '长：$a$', { color: WARM, size: 16 });
          S.actor('s5-small-h', 7.8, -2, '宽：$b$', { color: WARM, size: 16 });
          S.actor('s5-small-label', 5, -2.3, '花坛', { color: WARM, size: 16 });
          S.actor('s5-small-formula', -0.5, 5.5,
            '$S_{\\text{小}} = a \\times b = ab$',
            { color: WARM, size: 18 });
          P.renderCard(
            '<b>小长方形面积</b><br>' +
            '长 $= a$，宽 $= b$<br>' +
            '$S_{\\text{小}} = a \\times b = ab$<br>' +
            '接下来求面积差...'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：求面积差，打括号列式化简，得 6a²+ab
      {
        narration: '第三步求面积差：S大 减去 S小。注意——两个整式作差，被减式必须打括号！写成 括号6a²加2ab，减去括号ab。去括号：第一个加号括号各项不变，得 6a²加2ab；减号括号里只有 ab 一项，变号得 负ab。合并同类项：6a²只有它自己没有同类项，2ab减ab等于ab。最终面积差是 6a²加ab！把 a=2，b=1 代入验算：6乘4加2，等于 24加2，等于 26。代数工具太好用了！',
        enter: function (anim) {
          S.remove('s5-big-label'); S.remove('s5-big-formula');
          S.remove('s5-small-label'); S.remove('s5-small-formula');
          // 面积差推导
          S.actor('s5-diff-label', -9, 5.5, '面积差：', { color: GREEN, size: 18, bold: true });
          S.actor('s5-diff1', 0, 5.5,
            '$S_{\\text{大}} - S_{\\text{小}} = (6a^{2}+2ab) - ab$',
            { color: INK, size: 18 });
          S.actor('s5-diff2', 0, 4.3,
            '$= 6a^{2} + 2ab - ab$',
            { color: INK, size: 18 });
          S.actor('s5-diff3', 0, 3.2,
            '$= 6a^{2} + ab$',
            { color: GREEN, size: 22, bold: true });
          // 验算
          S.actor('s5-verify', 0, 1.8,
            '验算($a=2, b=1$)：$6 \\times 4 + 2 = 26$',
            { color: TEAL, size: 17 });
          P.renderCard(
            '<b>面积差</b><br>' +
            '$S_{\\text{大}} - S_{\\text{小}} = (6a^{2}+2ab) - ab$<br>' +
            '$= 6a^{2} + 2ab - ab$<br>' +
            '$= 6a^{2} + ab$<br>' +
            '代入 $a=2, b=1$：$6 \\times 4 + 2 = 26$',
            'teal',
            'tada'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
