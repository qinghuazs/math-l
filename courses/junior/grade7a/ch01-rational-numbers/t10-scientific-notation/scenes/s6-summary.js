// s6-summary.js  环节六：易错辨析与小结（3步）
// 数学验算：
//   判1：57×10^4，a=57不在[1,10)，错误，正确写法5.7×10^5
//   判2：400000末尾5个0，整数位6位，n=5，4×10^5，0个数=n-1时凑巧一致但思路易错
//   判3：1.80和1.8精确度不同，1.80精确到百分位，1.8精确到十分位
//   判4：2.4万=24000，4在千位，精确到千位而非十分位
//   填空验算：10^n 1后面n个0；a范围1≤a<10，n正整数；n=整数位数-1；6.5×10^4右移4位=65000
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错辨析与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：判断四连
      {
        narration: '最后一关——易错判断！四道题，逐一亮出答案和理由。判断一：57乘以10的4次方是科学记数法，对吗？——错！57不在[1,10)卡尺内，正确写法是5.7乘以10的5次方。判断二：400000末尾5个零，n=5，结果4乘以10的5次方，对吗？——对！但提醒：数零个数偶尔能用，养成"整数位数减1"的习惯更稳。判断三：1.80和1.8精确度相同，对吗？——错！1.80精确到百分位，1.8精确到十分位。判断四：2.4万精确到十分位，对吗？——错！2.4万等于24000，4在千位，精确到千位。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.0, '易错判断四连', { color: COOL, size: 22, bold: true });

          // 判断1
          S.actor('s6-j1-q', 0, 5.7,
            '① $57 \\times 10^{4}$ 是科学记数法？',
            { color: INK, size: 16 }
          );
          S.actor('s6-j1-ans', -7, 4.6,
            '✗ 错',
            { color: RED, size: 16, bold: true }
          );
          S.actor('s6-j1-why', 2, 4.6,
            '$57 \\notin [1,10)$，应写 $5.7 \\times 10^{5}$',
            { color: RED, size: 15 }
          );

          // 分隔线
          S.addSegment('s6-line1', [-9, 3.9], [9, 3.9], { color: GRAY, width: 1, dash: 2 });

          // 判断2
          S.actor('s6-j2-q', 0, 3.2,
            '② 数0个数得 $n=5$，$400000=4\\times10^{5}$？',
            { color: INK, size: 16 }
          );
          S.actor('s6-j2-ans', -7, 2.1,
            '✓ 对',
            { color: GREEN, size: 16, bold: true }
          );
          S.actor('s6-j2-why', 2, 2.1,
            '巧合一致，建议用"整数位数减1"',
            { color: TEAL, size: 15 }
          );

          // 分隔线
          S.addSegment('s6-line2', [-9, 1.4], [9, 1.4], { color: GRAY, width: 1, dash: 2 });

          // 判断3
          S.actor('s6-j3-q', 0, 0.7,
            '③ $1.80$ 和 $1.8$ 精确度相同？',
            { color: INK, size: 16 }
          );
          S.actor('s6-j3-ans', -7, -0.4,
            '✗ 错',
            { color: RED, size: 16, bold: true }
          );
          S.actor('s6-j3-why', 2, -0.4,
            '$1.80$ 百分位；$1.8$ 十分位',
            { color: RED, size: 15 }
          );

          // 分隔线
          S.addSegment('s6-line3', [-9, -1.1], [9, -1.1], { color: GRAY, width: 1, dash: 2 });

          // 判断4
          S.actor('s6-j4-q', 0, -1.8,
            '④ $2.4$ 万精确到十分位？',
            { color: INK, size: 16 }
          );
          S.actor('s6-j4-ans', -7, -2.9,
            '✗ 错',
            { color: RED, size: 16, bold: true }
          );
          S.actor('s6-j4-why', 2, -2.9,
            '$2.4$ 万 $=24000$，4在千位',
            { color: RED, size: 15 }
          );

          P.renderCard(
            '<b>判断四连答案</b><br>' +
            '① $57 \\times 10^{4}$：✗（$57 \\notin [1,10)$）<br>' +
            '② $400000=4\\times10^{5}$：✓（但用整数位数减1更稳）<br>' +
            '③ $1.80$ 和 $1.8$ 精确度相同：✗<br>' +
            '④ $2.4$ 万精确到十分位：✗（应为千位）'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：小结填空
      {
        narration: '小结时间！六个填空，先不看答案，自己在心里说出来。第一空：10的n次方，1后面跟多少个零？n个。第二空：科学记数法 a 的范围？1小于等于a小于10。第三空：n是什么整数？正整数。第四空：n等于整数位数减几？减1。第五空：6.5乘以10的4次方还原，小数点向哪移几位？向右移4位，结果65000。第六空：1.80精确到哪位，1.8精确到哪位，两者精确度？百分位；十分位；不同。',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-j1-q'); S.remove('s6-j1-ans'); S.remove('s6-j1-why');
          S.remove('s6-j2-q'); S.remove('s6-j2-ans'); S.remove('s6-j2-why');
          S.remove('s6-j3-q'); S.remove('s6-j3-ans'); S.remove('s6-j3-why');
          S.remove('s6-j4-q'); S.remove('s6-j4-ans'); S.remove('s6-j4-why');
          S.remove('s6-line1'); S.remove('s6-line2'); S.remove('s6-line3');

          S.actor('s6-sum-title', 0, 7.0, '课堂小结填空', { color: TEAL, size: 22, bold: true });

          S.actor('s6-fill1', 0, 5.6,
            '① $10^n$ = 1后面跟 <b>n</b> 个零',
            { color: INK, size: 16 }
          );
          S.actor('s6-fill2', 0, 4.4,
            '② $a$ 的范围：$1 \\leq a \\lt 10$',
            { color: WARM, size: 16 }
          );
          S.actor('s6-fill3', 0, 3.2,
            '③ $n$ 是<b>正</b>整数',
            { color: INK, size: 16 }
          );
          S.actor('s6-fill4', 0, 2.0,
            '④ $n$ = 整数位数 <b>减 1</b>',
            { color: INK, size: 16 }
          );
          S.actor('s6-fill5', 0, 0.8,
            '⑤ $6.5\\times10^{4}$ 还原：右移4位 = <b>65000</b>',
            { color: COOL, size: 16 }
          );
          S.actor('s6-fill6', 0, -0.5,
            '⑥ $1.80$ 精确到百分位，$1.8$ 精确到十分位，精确度<b>不同</b>',
            { color: INK, size: 15 }
          );

          P.renderCard(
            '<b>小结</b><br>' +
            '① $10^n$：1后面跟 $n$ 个零<br>' +
            '② $a$ 满足 $1 \\leq a \\lt 10$，$n$ 是正整数<br>' +
            '③ $n$ = 整数位数 $- 1$<br>' +
            '④ 还原：小数点右移 $n$ 位<br>' +
            '⑤ 末位0不能省（携带精确度信息）',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：预告下节课
      {
        narration: '很好！今天我们学完了科学记数法与近似数。有理数这一章的知识现在已经全部集齐——乘方、科学记数法、近似数，一个都不少。下节课我们做整章大盘点，从正负数一路回顾到科学记数法，把第一章所有内容串成一张完整的知识网络。记得带好这一章所有笔记！',
        enter: function (anim) {
          S.remove('s6-sum-title');
          S.remove('s6-fill1'); S.remove('s6-fill2'); S.remove('s6-fill3');
          S.remove('s6-fill4'); S.remove('s6-fill5'); S.remove('s6-fill6');

          S.actor('s6-prev-title', 0, 6.0, '下节课预告', { color: WARM, size: 22, bold: true });
          S.actor('s6-prev-body', 0, 4.2,
            '有理数一章知识齐了！',
            { color: INK, size: 19 }
          );
          S.actor('s6-prev-list', 0, 2.5,
            '正负数 → 绝对值 → 四则运算 → 乘方 → 科学记数法',
            { color: COOL, size: 16 }
          );
          S.actor('s6-prev-next', 0, 0.8,
            '下节：整章大盘点！',
            { color: WARM, size: 22, bold: true }
          );
          S.actor('s6-prev-hint', 0, -0.8,
            '带好第一章所有笔记！',
            { color: TEAL, size: 17 }
          );

          P.renderCard(
            '<b>下节课预告</b><br>' +
            '有理数第一章知识全部收录！<br>' +
            '正负数 → 绝对值 → 四则运算 → 乘方 → 科学记数法<br>' +
            '下节课：整章大盘点<br>' +
            '<b>带好第一章所有笔记！</b>',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
