// s5-pitfalls.js  五、易错大扫除——七大坑（3步）
// 数学验算：
// ① 0 是整数 → 整数属于有理数 → 0 是有理数 ✓（坑①是错误判断）
// ② a=-2<0 时，-a=-(-2)=2>0，所以 -a 不一定是负数 ✓（坑②是错误判断）
// ③ a=-3 时 |a|=3≠-3=a，所以 |a|=a 不恒成立 ✓（坑③是错误判断）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 七个坑的数据
  var PITS = [
    {
      id: 'p1',
      q: '坑①：0 不是正数也不是负数，所以 0 不是有理数',
      ans: '错误',
      reason: '0 不是正数也不是负数，但 0 是整数，整数属于有理数，所以 0 <b>是</b>有理数！'
    },
    {
      id: 'p2',
      q: '坑②：$-a$ 一定是负数',
      ans: '错误',
      reason: '$-a$ 是 $a$ 的相反数。若 $a \\lt 0$，则 $-a \\gt 0$（正数）；若 $a=0$，则 $-a=0$；只有 $a \\gt 0$ 时 $-a$ 才是负数。'
    },
    {
      id: 'p3',
      q: '坑③：对任意有理数 $a$，都有 $|a|=a$',
      ans: '错误',
      reason: '当 $a \\lt 0$ 时，$|a|=-a \\gt 0 \\neq a$。例如 $|-3|=3 \\neq -3$。正确：$|a| \\geq 0$ 恒成立。'
    },
    {
      id: 'p4',
      q: '坑④：因为 $-10 \\lt -1$，所以 $|-10|$ 比 $|-1|$ 小',
      ans: '错误',
      reason: '$|-10|=10 \\gt 1=|-1|$。两个负数，数轴上更靠左的更小，但绝对值（到原点的距离）反而更大！'
    },
    {
      id: 'p5',
      q: '坑⑤：异号两数相加，结果的符号取绝对值<b>较小</b>的那个加数的符号',
      ans: '错误',
      reason: '异号相加取<b>绝对值较大</b>的加数的符号。例如 $(-7)+3=-4$，取负号，因为 $|-7| \\gt |3|$。'
    },
    {
      id: 'p6',
      q: '坑⑥：$(-2)^{2}=-4$',
      ans: '错误',
      reason: '$(-2)^{2} = (-2) \\times (-2) = 4$（正数）。注意 $-2^{2}=-4$（先乘方后取反）与 $(-2)^{2}=4$ 不同！'
    },
    {
      id: 'p7',
      q: '坑⑦：$0 \\div 0 = 0$',
      ans: '错误',
      reason: '0 不能作除数！$0 \\div 0$ 无意义。$0$ 作被除数可以：$0 \\div 5 = 0$；但 $0$ 放分母或除号右侧绝对禁止。'
    },
  ];

  var scene = {
    id: 's5',
    title: '五、易错大扫除——七大坑',
    bbox: [-11, 8, 11, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：坑①②③——判断+理由，标错
        narration: '易错大扫除！七大坑逐一拆雷，每道必须说理由。坑①：0不是正数也不是负数，所以0不是有理数——错！0是整数，整数属于有理数，所以0是有理数。坑②：-a一定是负数——错！-a 是a的相反数，若a<0则-a>0是正数。坑③：对任意有理数a，|a|=a——错！当a<0时，|a|=-a，例如|-3|=3≠-3。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.4, '七大坑排雷——必须说理由！', { color: RED, size: 18, bold: true });

          // 坑①
          S.actor('s5-p1-q', 0, 6.3, '坑①：0 不是正数也不是负数，所以 0 不是有理数 （ ）', { color: INK, size: 14 });
          S.actor('s5-p1-badge', -9.5, 5.4, '✗ 错', { color: RED, size: 14, bold: true });
          S.actor('s5-p1-reason', 1, 5.4, '0 是整数，整数属于有理数，所以 0 是有理数！', { color: RED, size: 13 });

          // 坑②
          S.actor('s5-p2-q', 0, 4.3, '坑②：$-a$ 一定是负数 （ ）', { color: INK, size: 14 });
          S.actor('s5-p2-badge', -9.5, 3.4, '✗ 错', { color: RED, size: 14, bold: true });
          S.actor('s5-p2-reason', 1, 3.4, '$a \\lt 0$ 时，$-a \\gt 0$！$-a$ 的符号取决于 $a$', { color: RED, size: 13 });
          S.actor('s5-p2-eg', -2, 2.5, '例：$a=-2$，$-a=-(-2)=2 \\gt 0$', { color: ORANGE, size: 12 });

          // 坑③
          S.actor('s5-p3-q', 0, 1.6, '坑③：对任意有理数 $a$，都有 $|a|=a$ （ ）', { color: INK, size: 14 });
          S.actor('s5-p3-badge', -9.5, 0.7, '✗ 错', { color: RED, size: 14, bold: true });
          S.actor('s5-p3-reason', 1, 0.7, '$a \\lt 0$ 时，$|a|=-a \\gt 0 \\neq a$', { color: RED, size: 13 });
          S.actor('s5-p3-eg', -2, -0.2, '例：$|-3|=3 \\neq -3$', { color: ORANGE, size: 12 });

          S.addSegment('s5-sep1', [-10, -1.2], [10, -1.2], { color: GRAY, width: 1, dash: 2 });
          S.actor('s5-prog', 0, -2.2, '已拆雷：坑① ✓  坑② ✓  坑③ ✓  （剩余：坑④⑤⑥⑦）', { color: TEAL, size: 13 });

          P.renderCard(
            '坑①：<b>0 是有理数</b>（0 是整数，整数属于有理数）<br>' +
            '坑②：<b>$-a$ 不一定是负数</b>（$a \\lt 0$ 时 $-a \\gt 0$）<br>' +
            '坑③：<b>$|a|=a$ 不恒成立</b>（$a \\lt 0$ 时 $|a|=-a$）',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤2：坑④⑤
        narration: '继续拆雷！坑④：因为-10<-1，所以|-10|比|-1|小——错！|-10|=10，|-1|=1，10>1，绝对值反而更大。两个负数：数轴上靠左的更小，但到原点的距离（绝对值）反而更大。坑⑤：异号相加取绝对值较小的符号——错！要取绝对值较大的那个加数的符号。例如(-7)+3=-4，取负号，因为|-7|=7>3=|3|。',
        enter: function (anim) {
          // 清上一步
          S.remove('s5-title');
          S.remove('s5-p1-q'); S.remove('s5-p1-badge'); S.remove('s5-p1-reason');
          S.remove('s5-p2-q'); S.remove('s5-p2-badge'); S.remove('s5-p2-reason'); S.remove('s5-p2-eg');
          S.remove('s5-p3-q'); S.remove('s5-p3-badge'); S.remove('s5-p3-reason'); S.remove('s5-p3-eg');
          S.remove('s5-sep1'); S.remove('s5-prog');

          S.actor('s5-t2-title', 0, 7.4, '七大坑排雷（续）', { color: RED, size: 18, bold: true });
          S.actor('s5-done3', 0, 6.5, '坑①✓ 坑②✓ 坑③✓ 已拆除', { color: GREEN, size: 13 });

          // 坑④
          S.actor('s5-p4-q', 0, 5.5,
            '坑④：因为 $-10 \\lt -1$，所以 $|-10|$ 比 $|-1|$ 小 （ ）',
            { color: INK, size: 14 });
          S.actor('s5-p4-badge', -9.5, 4.5, '✗ 错', { color: RED, size: 14, bold: true });
          S.actor('s5-p4-r1', 1, 4.5, '$|-10|=10,\\ |-1|=1,\\ 10 \\gt 1$', { color: RED, size: 14 });
          S.actor('s5-p4-r2', 0, 3.5,
            '负数：数轴靠左 → 更小；但绝对值（距原点距离）反而更大！',
            { color: WARM, size: 13 });

          // 坑⑤
          S.actor('s5-p5-q', 0, 2.4,
            '坑⑤：异号相加，结果符号取绝对值<b>较小</b>的那个加数的符号 （ ）',
            { color: INK, size: 14 });
          S.actor('s5-p5-badge', -9.5, 1.4, '✗ 错', { color: RED, size: 14, bold: true });
          S.actor('s5-p5-r1', 1, 1.4,
            '应取绝对值<b>较大</b>的加数的符号！',
            { color: RED, size: 14 });
          S.actor('s5-p5-eg', 0, 0.3,
            '例：$(-7)+3=-4$，取负号，因为 $|-7|=7 \\gt 3=|3|$',
            { color: ORANGE, size: 13 });

          S.addSegment('s5-sep2', [-10, -0.9], [10, -0.9], { color: GRAY, width: 1, dash: 2 });
          S.actor('s5-prog2', 0, -1.8, '已拆雷：坑①② ③④⑤ ✓  （剩余：坑⑥⑦）', { color: TEAL, size: 13 });

          P.renderCard(
            '坑④：$|-10|=10 \\gt |-1|=1$<br>' +
            '负数：越小（靠左）绝对值越大<br>' +
            '坑⑤：异号相加，取<b>绝对值较大</b>的符号<br>' +
            '例：$(-7)+3=-4$（取负，$|-7|$ 更大）',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤3：坑⑥⑦ + 七雷全部拆除
        narration: '最后两坑！坑⑥：(-2)^2=-4——错！(-2)^2=(-2)×(-2)=4，负数偶次幂是正数。注意：-2^2=-4 和 (-2)^2=4 完全不同，区别在于括号！坑⑦：0÷0=0——错！0不能作除数，0÷0无意义。0作被除数可以：0÷5=0；但0放分母或除号右侧绝对禁止。七坑全部拆除，排雷成功！',
        enter: function (anim) {
          // 清上一步
          S.remove('s5-t2-title'); S.remove('s5-done3');
          S.remove('s5-p4-q'); S.remove('s5-p4-badge'); S.remove('s5-p4-r1'); S.remove('s5-p4-r2');
          S.remove('s5-p5-q'); S.remove('s5-p5-badge'); S.remove('s5-p5-r1'); S.remove('s5-p5-eg');
          S.remove('s5-sep2'); S.remove('s5-prog2');

          S.actor('s5-t3-title', 0, 7.4, '七大坑排雷（终）', { color: RED, size: 18, bold: true });
          S.actor('s5-done5', 0, 6.5, '坑①②③④⑤ ✓ 已拆除', { color: GREEN, size: 13 });

          // 坑⑥
          S.actor('s5-p6-q', 0, 5.5,
            '坑⑥：$(-2)^{2} = -4$ （ ）',
            { color: INK, size: 16 });
          S.actor('s5-p6-badge', -9.5, 4.5, '✗ 错', { color: RED, size: 14, bold: true });
          S.actor('s5-p6-r1', 1, 4.5,
            '$(-2)^{2} = (-2) \\times (-2) = 4$（正数！）',
            { color: RED, size: 15 });
          S.actor('s5-p6-cmp', -1, 3.4,
            '对比：$-2^{2} = -(2 \\times 2) = -4$  vs  $(-2)^{2} = 4$',
            { color: ORANGE, size: 13 });

          // 坑⑦
          S.actor('s5-p7-q', 0, 2.4,
            '坑⑦：$0 \\div 0 = 0$ （ ）',
            { color: INK, size: 16 });
          S.actor('s5-p7-badge', -9.5, 1.4, '✗ 错', { color: RED, size: 14, bold: true });
          S.actor('s5-p7-r1', 1, 1.4,
            '$0$ 不能作除数，$0 \\div 0$ 无意义！',
            { color: RED, size: 15 });
          S.actor('s5-p7-ok', -2, 0.3,
            '正确：$0 \\div 5 = 0$（0 作被除数可以）',
            { color: GREEN, size: 13 });

          // 七雷全部拆除
          S.addSegment('s5-fin-sep', [-10, -0.9], [10, -0.9], { color: GRAY, width: 1, dash: 2 });
          S.actor('s5-fin-all', 0, -2.0,
            '坑①✓ 坑②✓ 坑③✓ 坑④✓ 坑⑤✓ 坑⑥✓ 坑⑦✓',
            { color: GREEN, size: 15 });
          S.actor('s5-fin-banner', 0, -3.6,
            '七雷全部拆除，排雷成功！',
            { color: TEAL, size: 20, bold: true });

          P.renderCard(
            '坑⑥：$(-2)^{2}=4$（不是 $-4$！）<br>' +
            '$(-2)^{2}$（括号内底数取负）$\\neq -2^{2}$（先平方再取反）<br>' +
            '坑⑦：$0 \\div 0$ <b>无意义</b>——$0$ 不能做除数<br>' +
            '七坑扫清，全章易错点排雷完成！',
            'teal'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
