// s4-signs.js  环节四：按符号分类（3步）
// 对应教学设计环节四：换个标准——按符号分类
// 数学验算：
//   按符号分：正有理数（>0）：15, 4/5, 0.1, 128；
//            0：单独一类；
//            负有理数（<0）：-3.9, -10, -2/3, -80
//   非负数 = 正数 + 0 = {15, 4/5, 0.1, 128, 0}
//   非正数 = 负数 + 0 = {-3.9, -10, -2/3, -80, 0}
//   对比：按定义分5类（叶子），按符号分3类（正/零/负）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';
  var RED    = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 三条通道的 x 中心
  var POS_X  = -7;   // 正有理数通道（左）
  var ZERO_X =  0;   // 零通道（中）
  var NEG_X  =  7;   // 负有理数通道（右）

  // 9张卡片信息：label, 目标通道, 通道内纵向位置
  var CARDS = [
    { id: 's4-c0',  label: '15',                         tx: POS_X,  ty: 3.0  },
    { id: 's4-c1',  label: '$-3.9$',                     tx: NEG_X,  ty: 3.0  },
    { id: 's4-c2',  label: '0',                           tx: ZERO_X, ty: 1.5  },
    { id: 's4-c3',  label: '$\\dfrac{4}{5}$',             tx: POS_X,  ty: 1.5  },
    { id: 's4-c4',  label: '$-10$',                       tx: NEG_X,  ty: 1.5  },
    { id: 's4-c5',  label: '$-\\dfrac{2}{3}$',            tx: NEG_X,  ty: 0.0  },
    { id: 's4-c6',  label: '0.1',                         tx: POS_X,  ty: 0.0  },
    { id: 's4-c7',  label: '128',                         tx: POS_X,  ty: -1.5 },
    { id: 's4-c8',  label: '$-80$',                       tx: NEG_X,  ty: -1.5 }
  ];

  var scene = {
    id: 's4',
    title: '四、按符号分类',
    bbox: [-10, 8, 10, -4],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：三岔路动画——9张卡片飞向所属通道
      {
        narration: '刚才我们按"是整数还是分数"分了一次。现在换个角度——按符号，把这9个数分成三条路：向左走正的，大于零；中间直行是零；向右走负的，小于零。看9张卡片一一飞向自己的通道！',
        enter: function (anim) {
          // 画三条通道（竖线+标题）
          // 通道标题
          S.actor('s4-title-pos',  POS_X,  7.2, '正有理数', { color: COOL,  size: 18, bold: true });
          S.actor('s4-title-zero', ZERO_X, 7.2, '0',        { color: INK,   size: 22, bold: true });
          S.actor('s4-title-neg',  NEG_X,  7.2, '负有理数', { color: WARM,  size: 18, bold: true });
          // 通道条件标注
          S.actor('s4-cond-pos',  POS_X,  6.2, '($\\gt 0$)', { color: COOL,  size: 14 });
          S.actor('s4-cond-neg',  NEG_X,  6.2, '($\\lt 0$)', { color: WARM,  size: 14 });
          // 分隔线
          S.addSegment('s4-div1', [-3.5, 7.5], [-3.5, -3.5], { color: GRAY, width: 1.5, dash: 1 });
          S.addSegment('s4-div2', [ 3.5, 7.5], [ 3.5, -3.5], { color: GRAY, width: 1.5, dash: 1 });

          if (!anim) {
            // 快放：直接摆到最终位置
            for (var i = 0; i < CARDS.length; i++) {
              var c = CARDS[i];
              var col = (c.tx === POS_X) ? COOL : (c.tx === NEG_X) ? WARM : INK;
              S.actor(c.id, c.tx, c.ty, c.label, { color: col, size: 18 });
            }
            P.renderCard(
              '<b>按符号分类</b><br>' +
              '正有理数（$\\gt 0$）：$15, \\dfrac{4}{5}, 0.1, 128$<br>' +
              '0<br>' +
              '负有理数（$\\lt 0$）：$-3.9, -10, -\\dfrac{2}{3}, -80$'
            );
            return null;
          }

          // 动画：9张卡片从画板顶部飞入各通道
          var chain = Promise.resolve();
          for (var j = 0; j < CARDS.length; j++) {
            (function (idx) {
              chain = chain.then(function () {
                var c = CARDS[idx];
                var col = (c.tx === POS_X) ? COOL : (c.tx === NEG_X) ? WARM : INK;
                // 从通道顶部飞入
                var startY = 8.5;
                var a = S.actor(c.id, c.tx, startY, c.label, { color: col, size: 18 });
                return a.moveTo(c.tx, c.ty, 250);
              });
            })(j);
          }
          return chain.then(function () {
            P.renderCard(
              '<b>按符号分类</b><br>' +
              '正有理数（$\\gt 0$）：$15, \\dfrac{4}{5}, 0.1, 128$<br>' +
              '0<br>' +
              '负有理数（$\\lt 0$）：$-3.9, -10, -\\dfrac{2}{3}, -80$'
            );
            return delay(300);
          });
        }
      },

      // Step 2：对比两种分类 + 非负数/非正数
      {
        narration: '好，我们把两种分类方式放在一起对比。按定义分——以整数和分数为标准——共有五类，0 落在整数家族里单独一类；按符号分——共有三类，0 也是单独一类。同一批数，标准不同，结果就不同——但每种分法都做到了不重不漏！另外，正数和0合在一起叫"非负数"；负数和0合在一起叫"非正数"。',
        enter: function (anim) {
          // 清掉卡片和通道
          for (var i = 0; i < CARDS.length; i++) { S.remove(CARDS[i].id); }
          S.remove('s4-title-pos'); S.remove('s4-title-zero'); S.remove('s4-title-neg');
          S.remove('s4-cond-pos'); S.remove('s4-cond-neg');
          S.remove('s4-div1'); S.remove('s4-div2');

          P.renderTable({
            head: ['分类标准', '类别数', '0 的位置'],
            rows: [
              ['按定义（整数/分数）', '五类', '整数中单独一类'],
              ['按符号（正/零/负）',  '三类', '单独一类']
            ]
          });

          S.actor('s4-tb-title', 0, 7, '两种分类方式对比', { color: TEAL, size: 20, bold: true });
          S.actor('s4-principle', 0, 5.2, '同一批数，标准不同，结果不同——但都要做到：', { color: INK, size: 15 });
          S.actor('s4-principle2', 0, 4.2, '不 重 不 漏', { color: WARM, size: 22, bold: true });

          // 非负数说明
          S.actor('s4-nonneg-title', -5, 2.5, '非负数：', { color: TEAL, size: 17, bold: true });
          S.actor('s4-nonneg-def',   1,  2.5, '正数 + $0$', { color: TEAL, size: 16 });
          S.actor('s4-nonneg-ex',    1,  1.5, '$15, \\dfrac{4}{5}, 0.1, 128, 0$', { color: TEAL, size: 14 });

          S.actor('s4-nonpos-title', -5, 0.2, '非正数：', { color: GRAY, size: 17, bold: true });
          S.actor('s4-nonpos-def',    1,  0.2, '负数 + $0$', { color: GRAY, size: 16 });
          S.actor('s4-nonpos-ex',     1, -0.8, '$-3.9, -10, -\\dfrac{2}{3}, -80, 0$', { color: GRAY, size: 14 });

          return anim ? delay(400) : null;
        }
      },

      // Step 3：强调 0 的特殊性
      {
        narration: '特别注意：0 这个数非常特殊！按符号分类时，0 既不属于正有理数，也不属于负有理数，它单独一类。同时，0 是非负数（因为非负数包括0），0 也是非正数（因为非正数也包括0）。0 是个"中间人"，两边都不靠，两边又都有它！',
        enter: function (anim) {
          S.remove('s4-nonneg-title'); S.remove('s4-nonneg-def'); S.remove('s4-nonneg-ex');
          S.remove('s4-nonpos-title'); S.remove('s4-nonpos-def'); S.remove('s4-nonpos-ex');
          S.remove('s4-tb-title'); S.remove('s4-principle'); S.remove('s4-principle2');

          // 突出 0 的特殊性
          S.actor('s4-zero-big', 0, 6, '$0$', { color: INK, size: 48, bold: true });
          S.actor('s4-z1', 0, 4.0, '不是正有理数，也不是负有理数', { color: WARM, size: 17 });
          S.actor('s4-z2', 0, 2.8, '按符号分类：0 单独一类', { color: INK, size: 16 });

          S.addSegment('s4-sep', [-8, 1.8], [8, 1.8], { color: GRAY, width: 1, dash: 1 });

          S.actor('s4-z3', 0, 1.0, '0 是 <b>非负数</b>（正数+0）', { color: TEAL,  size: 16 });
          S.actor('s4-z4', 0, 0.0, '0 也是 <b>非正数</b>（负数+0）', { color: GRAY, size: 16 });
          S.actor('s4-z5', 0, -1.2, '0 是个"中间人"——哪边都不靠，哪边又都有它', { color: ORANGE, size: 15 });

          P.renderCard(
            '<b>0 的特殊地位</b><br>' +
            '按符号：正有理数 | <b>0</b> | 负有理数<br>' +
            '$0$ 是非负数（$\\ge 0$），也是非正数（$\\le 0$）<br>' +
            '非负数 $\\ne$ 正数：非负数还包含 $0$！',
            'warm'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
