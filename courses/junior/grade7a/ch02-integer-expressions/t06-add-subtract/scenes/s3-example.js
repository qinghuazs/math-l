// s3-example.js  环节三：例题精讲——x 项消失的惊喜（3步）
// 数学验算：(8x-7y)-2(4x-5y)
//   去括号：8x-7y-8x+10y （-2×4x=-8x，-2×(-5y)=+10y）
//   合并 x 项：8x-8x=0；合并 y 项：-7y+10y=3y
//   结果：3y  ✓
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
    id: 's3',
    title: '三、例题精讲',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：出示例题，提示含系数括号的去括号要点
      {
        narration: '来看例题：计算 括号8x减7y，减去 2乘以括号4x减5y。注意看——减号外面还有系数2，这个括号叫"含系数的括号"，去括号时括号内每一项都要乘以负2，不是只乘第一项！先把注意力放在 负2乘以括号4x减5y 上——负2乘4x等于负8x，负2乘负5y等于正10y，负负得正！',
        enter: function (anim) {
          S.actor('s3-title', 0, 7.0, '例题：含系数括号的去括号', { color: COOL, size: 21, bold: true });
          S.actor('s3-origin', 0, 5.2,
            '$(8x - 7y) - 2(4x - 5y)$',
            { color: INK, size: 24 });
          // 提示框：系数部分
          S.actor('s3-warn-label', -8, 3.3, '注意：', { color: RED, size: 18, bold: true });
          S.actor('s3-warn1', 0, 3.3,
            '$-2 \\times 4x = -8x$',
            { color: RED, size: 20 });
          S.actor('s3-warn2', 0, 2.0,
            '$-2 \\times (-5y) = +10y$',
            { color: RED, size: 20 });
          S.actor('s3-warn-note', 0, 0.8,
            '负负得正——这是最容易漏的！',
            { color: WARM, size: 17 });
          P.renderCard(
            '<b>例题</b>：$(8x - 7y) - 2(4x - 5y)$<br>' +
            '关键：$-2$ 要乘括号内<b>每一项</b><br>' +
            '$-2 \\times 4x = -8x$<br>' +
            '$-2 \\times (-5y) = +10y$（负负得正！）'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：去括号展开完整式
      {
        narration: '好，现在去括号。第一个括号前是减号，系数是1，所以 括号8x减7y 去掉括号，8x和负7y符号不变；第二个括号，负2分别乘进去，4x乘负2得负8x，负5y乘负2得正10y。展开后整行是：8x减7y减8x加10y。四项全部展开！',
        enter: function (anim) {
          S.remove('s3-warn-label'); S.remove('s3-warn1'); S.remove('s3-warn2'); S.remove('s3-warn-note');
          S.actor('s3-step1-label', -9, 3.0, '第一步：去括号', { color: TEAL, size: 18, bold: true });
          S.actor('s3-expand', 0, 3.0,
            '$= 8x - 7y - 8x + 10y$',
            { color: INK, size: 24 });
          // 标注 x 项（同色）
          S.actor('s3-xmark1', -5.5, 1.6, '$8x$', { color: COOL, size: 20 });
          S.actor('s3-xmark2', 1.3, 1.6, '$-8x$', { color: COOL, size: 20 });
          S.actor('s3-xlink', -2.0, 1.6, '与', { color: GRAY, size: 16 });
          S.actor('s3-xlabel', 4.5, 1.6, '← x 项配对', { color: COOL, size: 15 });
          // 标注 y 项
          S.actor('s3-ymark1', -3.0, 0.3, '$-7y$', { color: WARM, size: 20 });
          S.actor('s3-ymark2', 3.5, 0.3, '$+10y$', { color: WARM, size: 20 });
          S.actor('s3-ylink', 0.5, 0.3, '与', { color: GRAY, size: 16 });
          S.actor('s3-ylabel', 6.5, 0.3, '← y 项配对', { color: WARM, size: 15 });
          P.renderCard(
            '<b>第一步：去括号</b><br>' +
            '$(8x - 7y) - 2(4x - 5y)$<br>' +
            '$= 8x - 7y - 8x + 10y$<br>' +
            '$x$ 项：$8x$ 与 $-8x$ 配对<br>' +
            '$y$ 项：$-7y$ 与 $+10y$ 配对'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：合并——x 项消失的惊喜，得结果 3y
      {
        narration: '第二步合并同类项。x 项：8x 加负8x，等于0——x 项完全抵消，消失了！这是今天的惊喜时刻！y 项：负7y 加 10y，等于 3y。最终结果只剩下 3y，整整齐齐，一目了然。整式加减运算完成！',
        enter: function (anim) {
          S.remove('s3-xmark1'); S.remove('s3-xmark2'); S.remove('s3-xlink'); S.remove('s3-xlabel');
          S.remove('s3-ymark1'); S.remove('s3-ymark2'); S.remove('s3-ylink'); S.remove('s3-ylabel');
          S.actor('s3-step2-label', -9, 1.5, '第二步：合并同类项', { color: WARM, size: 18, bold: true });
          S.actor('s3-x-calc', -3, 1.5,
            '$x$ 项：$8x - 8x = 0$ ←消失！',
            { color: COOL, size: 18 });
          S.actor('s3-y-calc', -3, 0.2,
            '$y$ 项：$-7y + 10y = 3y$',
            { color: WARM, size: 18 });
          S.actor('s3-result', 0, -1.5,
            '$= 3y$',
            { color: GREEN, size: 32, bold: true });
          P.renderCard(
            '<b>第二步：合并同类项</b><br>' +
            '$x$ 项：$8x - 8x = 0$（消失！）<br>' +
            '$y$ 项：$-7y + 10y = 3y$<br>' +
            '最终结果：$3y$',
            'warm',
            'tada'
          );
          return anim ? delay(500) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
