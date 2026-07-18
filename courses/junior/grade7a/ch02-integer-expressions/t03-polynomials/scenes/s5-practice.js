// s5-practice.js  环节五：综合判断（3步）
// 数学验算：
//   第1组次数命名：
//     2x²-3x+1：最高次项2x²次数2，共3项 → 二次三项式
//     x+y+z：各项次数均1，共3项 → 一次三项式
//     -x³+2x²y-xy²+y³：次数均3，共4项 → 三次四项式
//   第2组整式归类：-5单项式、3a+2b多项式、2/x非整式、4m²n单项式、a²-3a+2多项式、m-n+1多项式
//   第3组逆向：2x^m*y²是三次单项式 → m+2=3 → m=1；验证 2xy²次数1+2=3 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、综合判断',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：次数命名练习（三个多项式）
      {
        narration: '第一组：次数命名练习。三个多项式，请先自己判断，再看揭晓。第一个：2x²-3x+1，最高次项 2x²，次数2，共3项，二次三项式。第二个：x+y+z，每一项次数都是1，最高次1，共3项，一次三项式。第三个：-x³+2x²y-xy²+y³，四项的次数分别是：x³是3，2x²y是2加1等于3，-xy²是1加2等于3，y³是3，全部是3，最高次3，共4项，三次四项式。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.0, '第一组：次数命名', { color: COOL, size: 20, bold: true });
          P.renderTable({
            head: ['多项式', '各项次数', '多项式次数', '命名'],
            rows: [
              ['$2x^{2}-3x+1$',            '$2,1,0$',   '$2$', '二次三项式'],
              ['$x+y+z$',                   '$1,1,1$',   '$1$', '一次三项式'],
              ['$-x^{3}+2x^{2}y-xy^{2}+y^{3}$', '$3,3,3,3$', '$3$', '三次四项式'],
            ],
          });
          S.actor('s5-key', 0, 1.5,
            '口诀：各项次数取最大，不相加！',
            { color: RED, size: 17 });
          P.renderCard(
            '<b>次数命名要点</b><br>' +
            '各项次数取<b>最大值</b>（不相加！）<br>' +
            '命名：次数在前，项数在后。'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 2：整式归类判断
      {
        narration: '第二组：整式归类。6个式子，逐一判断是单项式、多项式还是非整式。-5 是单独的数，单项式；3a+2b 含加法，两项，多项式；x 分之 2 分母含字母，非整式；4m²n 数与字母的积，单项式；a²-3a+2 三项，多项式；m-n+1 三项，多项式。',
        enter: function (anim) {
          S.remove('s5-key');
          S.actor('s5-t2', 0, 7.0, '第二组：整式归类', { color: COOL, size: 20, bold: true });
          // 六格式子
          S.actor('s5-f1', -7, 5.5, '$-5$',              { color: INK, size: 20 });
          S.actor('s5-f2', -2, 5.5, '$3a+2b$',           { color: INK, size: 20 });
          S.actor('s5-f3',  3, 5.5, '$\\dfrac{2}{x}$',   { color: INK, size: 20 });
          S.actor('s5-f4', -7, 3.5, '$4m^{2}n$',         { color: INK, size: 20 });
          S.actor('s5-f5', -2, 3.5, '$a^{2}-3a+2$',      { color: INK, size: 20 });
          S.actor('s5-f6',  3, 3.5, '$m-n+1$',           { color: INK, size: 20 });
          // 标签
          S.actor('s5-l1', -7, 4.5, '单项式', { color: TEAL, size: 15, bold: true });
          S.actor('s5-l2', -2, 4.5, '多项式', { color: WARM, size: 15, bold: true });
          S.actor('s5-l3',  3, 4.5, '非整式', { color: RED,  size: 15, bold: true });
          S.actor('s5-l4', -7, 2.5, '单项式', { color: TEAL, size: 15, bold: true });
          S.actor('s5-l5', -2, 2.5, '多项式', { color: WARM, size: 15, bold: true });
          S.actor('s5-l6',  3, 2.5, '多项式', { color: WARM, size: 15, bold: true });
          P.renderCard(
            '<b>整式归类要点</b><br>' +
            '含加减 → 多项式；数与字母的积（或单独的数/字母）→ 单项式；<br>' +
            '分母含字母 → 非整式。',
            'teal'
          );
          return anim ? delay(400) : null;
        },
      },
      // Step 3：逆向求指数
      {
        narration: '第三组：逆向求指数。已知 2x 的 m 次方乘 y² 是三次单项式，求 m 的值。单项式的次数等于各字母指数之和：m 加 2 等于 3，解得 m 等于 1。把 m=1 代入：2xy²，次数等于 1+2=3，确实是三次单项式。验证通过，m=1。',
        enter: function (anim) {
          S.remove('s5-t2');
          S.remove('s5-f1'); S.remove('s5-f2'); S.remove('s5-f3');
          S.remove('s5-f4'); S.remove('s5-f5'); S.remove('s5-f6');
          S.remove('s5-l1'); S.remove('s5-l2'); S.remove('s5-l3');
          S.remove('s5-l4'); S.remove('s5-l5'); S.remove('s5-l6');
          S.actor('s5-t3', 0, 7.0, '第三组：逆向求指数', { color: COOL, size: 20, bold: true });
          S.actor('s5-q', 0, 5.5,
            '已知 $2x^{m}y^{2}$ 是三次单项式，求 $m$',
            { color: INK, size: 21 });
          S.actor('s5-eq1', 0, 4.0,
            '单项式次数：$m+2=3$',
            { color: WARM, size: 22 });
          S.actor('s5-eq2', 0, 2.8,
            '$m=1$',
            { color: RED, size: 28, bold: true });
          S.actor('s5-verify', 0, 1.2,
            '验证：$2xy^{2}$ 次数 $= 1+2 = 3$ ✓',
            { color: GREEN, size: 20 });
          P.renderCard(
            '<b>$m=1$</b><br>' +
            '列方程：$m+2=3 \\Rightarrow m=1$<br>' +
            '验证：代入得 $2xy^{2}$，次数 $1+2=3$ ✓',
            'cool',
            'tada'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
