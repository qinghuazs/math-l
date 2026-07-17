// s2-families.js  环节二：整数家族与分数家族（4步）
// 对应教学设计环节二：整数家族与分数家族
// 数学验算：
//   整数：15, 0, -10, 128, -80  其中正整数15/128，负整数-10/-80，0单独一类
//   小数化分数：0.1 = 1/10（正分数）；-3.9 = -39/10（负分数）
//   分数：4/5, -2/3, 0.1(=1/10), -3.9(=-39/10)
//   正分数：4/5, 0.1；负分数：-2/3, -3.9
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

  // 帮助函数：画分类标签行（id前缀, x, y, 文字, 颜色）
  function labelRow(id, x, y, text, color) {
    S.actor(id, x, y, text, { color: color, size: 16 });
  }

  var scene = {
    id: 's2',
    title: '二、整数家族与分数家族',
    bbox: [-10, 7, 10, -4],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：整数家族圈出并细分
      {
        narration: '先来看整数家族！我们把 15、0、-10、128、-80 圈出来。整数家族里有三兄弟：正整数——也就是大于零的整数，比如 15 和 128；零——0 不是正整数也不是负整数，它单独算一类；负整数——小于零的整数，比如 -10 和 -80。',
        enter: function (anim) {
          // 整数分三行排列
          S.actor('s2-title-int', -5, 6.5, '整数家族', { color: COOL, size: 22, bold: true });

          // 正整数行
          labelRow('s2-lb-posint', -9, 4.5, '正整数：', COOL);
          S.actor('s2-v-15',  -4.5, 4.5, '15',  { color: COOL, size: 18 });
          S.actor('s2-v-128', -1.5, 4.5, '128', { color: COOL, size: 18 });

          // 0 行
          labelRow('s2-lb-zero', -9, 2.5, '0（单独一类）：', INK);
          S.actor('s2-v-0', -3, 2.5, '0', { color: INK, size: 22, bold: true });

          // 负整数行
          labelRow('s2-lb-negint', -9, 0.5, '负整数：', WARM);
          S.actor('s2-v-n10',  -4.5, 0.5, '$-10$', { color: WARM, size: 18 });
          S.actor('s2-v-n80',  -1.5, 0.5, '$-80$', { color: WARM, size: 18 });

          // 强调框
          S.addSegment('s2-int-bx1', [-10, 5.1], [0.5, 5.1], { color: COOL, width: 1.5, dash: 1 });
          S.addSegment('s2-int-bx2', [-10, 3.1], [0.5, 3.1], { color: INK,  width: 1.5, dash: 1 });
          S.addSegment('s2-int-bx3', [-10, 1.1], [0.5, 1.1], { color: WARM, width: 1.5, dash: 1 });

          P.renderCard(
            '<b>整数 = 正整数 + 0 + 负整数</b><br>' +
            '正整数：$15$、$128$<br>' +
            '0：既不是正整数，也不是负整数<br>' +
            '负整数：$-10$、$-80$'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 2：小数化分数推演卡
      {
        narration: '剩下的 4/5、-2/3、0.1、-3.9——其中 4/5 和 -2/3 很明显是分数。那 0.1 和 -3.9 呢？我们来算一下：0.1 等于 1 除以 10，写成分数就是十分之一；-3.9 等于 -39 除以 10，写成分数就是负十分之三十九。有限小数可以化成分数！其实无限循环小数也可以，比如 0.333… 等于三分之一。所以这些小数本质上就是分数！',
        enter: function (anim) {
          S.actor('s2-title-frac', 4, 6.5, '小数化分数', { color: GREEN, size: 22, bold: true });

          // 推演卡：0.1
          S.actor('s2-d01-1', 1, 4.8, '$0.1$', { color: WARM, size: 20, bold: true });
          S.actor('s2-d01-2', 3, 4.8, '$=$', { color: INK, size: 20 });
          S.actor('s2-d01-3', 5.5, 4.8, '$\\dfrac{1}{10}$', { color: GREEN, size: 20, bold: true });
          S.actor('s2-d01-tip', 8.5, 4.8, '（正分数）', { color: GREEN, size: 14 });

          // 推演卡：-3.9
          S.actor('s2-d39-1', 1, 2.5, '$-3.9$', { color: WARM, size: 20, bold: true });
          S.actor('s2-d39-2', 3, 2.5, '$=$', { color: INK, size: 20 });
          S.actor('s2-d39-3', 5.5, 2.5, '$-\\dfrac{39}{10}$', { color: GREEN, size: 20, bold: true });
          S.actor('s2-d39-tip', 8.5, 2.5, '（负分数）', { color: GREEN, size: 14 });

          // 无限循环小数也行
          S.actor('s2-d-inf', 1, 0.5, '$0.\\overline{3}$', { color: GRAY, size: 18 });
          S.actor('s2-d-inf2', 3, 0.5, '$=$', { color: INK, size: 18 });
          S.actor('s2-d-inf3', 5.5, 0.5, '$\\dfrac{1}{3}$', { color: GRAY, size: 18 });
          S.actor('s2-d-inf-tip', 8.5, 0.5, '无限循环也行', { color: GRAY, size: 13 });

          P.renderCard(
            '<b>有限小数 = 分数</b><br>' +
            '$0.1 = \\dfrac{1}{10}$（正分数）<br>' +
            '$-3.9 = -\\dfrac{39}{10}$（负分数）<br>' +
            '无限循环小数也能化分数！<br><b>小数的本质是分数。</b>',
            'teal'
          );
          return anim ? delay(500) : null;
        }
      },

      // Step 3：分数家族归位
      {
        narration: '好，现在我们把分数家族整理出来。4/5 是正分数，0.1 也是正分数（等于十分之一）；-2/3 是负分数，-3.9 也是负分数（等于负十分之三十九）。分数家族也有两兄弟：正分数和负分数。',
        enter: function (anim) {
          S.remove('s2-d01-1'); S.remove('s2-d01-2'); S.remove('s2-d01-3'); S.remove('s2-d01-tip');
          S.remove('s2-d39-1'); S.remove('s2-d39-2'); S.remove('s2-d39-3'); S.remove('s2-d39-tip');
          S.remove('s2-d-inf'); S.remove('s2-d-inf2'); S.remove('s2-d-inf3'); S.remove('s2-d-inf-tip');

          S.actor('s2-title-frac2', 4, 6.5, '分数家族', { color: GREEN, size: 22, bold: true });

          // 正分数行
          labelRow('s2-lb-posfrac', 1, 4.5, '正分数：', GREEN);
          S.actor('s2-f-45',  5.5, 4.5, '$\\dfrac{4}{5}$', { color: GREEN, size: 20 });
          S.actor('s2-f-01',  8,   4.5, '$0.1\\left(=\\dfrac{1}{10}\\right)$', { color: GREEN, size: 16 });

          // 负分数行
          labelRow('s2-lb-negfrac', 1, 2.2, '负分数：', WARM);
          S.actor('s2-f-n23', 5.5, 2.2, '$-\\dfrac{2}{3}$', { color: WARM, size: 20 });
          S.actor('s2-f-n39', 8,   2.2, '$-3.9\\left(=-\\dfrac{39}{10}\\right)$', { color: WARM, size: 14 });

          S.addSegment('s2-frac-bx1', [0.5, 5.2], [10, 5.2], { color: GREEN, width: 1.5, dash: 1 });
          S.addSegment('s2-frac-bx2', [0.5, 2.9], [10, 2.9], { color: WARM, width: 1.5, dash: 1 });

          P.renderCard(
            '<b>分数 = 正分数 + 负分数</b><br>' +
            '正分数：$\\dfrac{4}{5}$、$0.1$<br>' +
            '负分数：$-\\dfrac{2}{3}$、$-3.9$'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 4：两家族全景
      {
        narration: '现在我们看整个全景：左边是整数家族——正整数 15、128，零 0，负整数 -10、-80；右边是分数家族——正分数 4/5、0.1，负分数 -2/3、-3.9。9个数分成了两大家族，每个数都有了归属。这两大家族合在一起，我们给它们起一个新名字——这就是下个环节要讲的。',
        enter: function (anim) {
          // 清掉右侧分数家族标注，用更简洁的全景展示
          S.remove('s2-lb-posfrac'); S.remove('s2-lb-negfrac');
          S.remove('s2-frac-bx1'); S.remove('s2-frac-bx2');

          // 左：整数家族小结
          S.actor('s2-overview-int', -8.5, 6.5, '【整数家族】', { color: COOL, size: 18, bold: true });
          S.actor('s2-ov-i1', -8.5, 5.2, '正整数：15、128', { color: COOL, size: 15 });
          S.actor('s2-ov-i2', -8.5, 3.8, '0（单独）', { color: INK, size: 15 });
          S.actor('s2-ov-i3', -8.5, 2.4, '负整数：-10、-80', { color: WARM, size: 15 });

          // 中间 + 号
          S.actor('s2-plus', 0, 4.5, '+', { color: INK, size: 36, bold: true });

          // 右：分数家族小结
          S.actor('s2-overview-frac', 5, 6.5, '【分数家族】', { color: GREEN, size: 18, bold: true });
          S.actor('s2-ov-f1', 5, 5.2, '$\\dfrac{4}{5}$、$0.1$（正）', { color: GREEN, size: 15 });
          S.actor('s2-ov-f2', 5, 2.8, '$-\\dfrac{2}{3}$、$-3.9$（负）', { color: WARM, size: 15 });

          P.renderCard(
            '<b>两大家族全景</b><br>' +
            '整数：$15$、$0$、$-10$、$128$、$-80$<br>' +
            '分数：$\\dfrac{4}{5}$、$0.1$、$-\\dfrac{2}{3}$、$-3.9$<br>' +
            '<b>这两大家族合称什么？下一环节揭晓！</b>',
            'teal'
          );
          return anim ? delay(400) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
