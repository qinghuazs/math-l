// s2-concepts.js  二、概念关卡（4步）
// 数学验算：
// ① -2/3 与 -3/4 通分：-8/12 与 -9/12，|-9/12|>|-8/12|，故 -3/4 < -2/3
// ② -(-4) = 4，4 的相反数 = -4
// ③ |a|=5 → a=5 或 a=-5（两解）
// 分类验证：-3整数✓，2/5分数✓，0整数✓，-1.5分数✓，8整数✓
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

  var scene = {
    id: 's2',
    title: '二、概念关卡',
    bbox: [-11, 8, 11, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：分类题——五个数填入整数/分数/负有理数框，逐一归位
        narration: '闯第一关——概念关卡！题一：把 -3、2/5、0、-1.5、8 填入整数、分数、负有理数三个框。先给30秒思考，再逐一归位。整数包括正整数、0、负整数；分数包括正分数和负分数；负有理数是所有负的有理数。-3 是负整数，属于整数；2/5 是正分数；0 是整数（不是正不是负，但是整数）；-1.5 是负分数；8 是正整数。',
        enter: function (anim) {
          // 三个分类框
          S.actor('s2-title', 0, 7.2, '题1：把这五个数填入对应的框', { color: INK, size: 18, bold: true });
          // 题目数
          S.actor('s2-nums', 0, 5.8, '$-3,\\ \\dfrac{2}{5},\\ 0,\\ -1.5,\\ 8$', { color: RED, size: 20, bold: true });

          // 框：整数
          S.actor('s2-box-int-title', -7, 3.5, '整  数', { color: COOL, size: 16, bold: true });
          S.addSegment('s2-box-int-t', [-10.5, 4.2], [-3.5, 4.2], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s2-box-int-b', [-10.5, -0.5], [-3.5, -0.5], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s2-box-int-l', [-10.5, 4.2], [-10.5, -0.5], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s2-box-int-r', [-3.5, 4.2], [-3.5, -0.5], { color: COOL, width: 2, dash: 0 });

          // 框：分数
          S.actor('s2-box-fra-title', 0, 3.5, '分  数', { color: WARM, size: 16, bold: true });
          S.addSegment('s2-box-fra-t', [-3, 4.2], [3, 4.2], { color: WARM, width: 2, dash: 0 });
          S.addSegment('s2-box-fra-b', [-3, -0.5], [3, -0.5], { color: WARM, width: 2, dash: 0 });
          S.addSegment('s2-box-fra-l', [-3, 4.2], [-3, -0.5], { color: WARM, width: 2, dash: 0 });
          S.addSegment('s2-box-fra-r', [3, 4.2], [3, -0.5], { color: WARM, width: 2, dash: 0 });

          // 框：负有理数
          S.actor('s2-box-neg-title', 7, 3.5, '负有理数', { color: RED, size: 16, bold: true });
          S.addSegment('s2-box-neg-t', [3.5, 4.2], [10.5, 4.2], { color: RED, width: 2, dash: 0 });
          S.addSegment('s2-box-neg-b', [3.5, -0.5], [10.5, -0.5], { color: RED, width: 2, dash: 0 });
          S.addSegment('s2-box-neg-l', [3.5, 4.2], [3.5, -0.5], { color: RED, width: 2, dash: 0 });
          S.addSegment('s2-box-neg-r', [10.5, 4.2], [10.5, -0.5], { color: RED, width: 2, dash: 0 });

          // 归位：整数 -3, 0, 8
          S.actor('s2-in-m3',  -7, 2.2, '-3',              { color: COOL, size: 16, bold: true });
          S.actor('s2-in-0',   -7, 1.1, '0',               { color: COOL, size: 16, bold: true });
          S.actor('s2-in-8',   -7, 0.0, '8',               { color: COOL, size: 16, bold: true });
          // 归位：分数 2/5, -1.5
          S.actor('s2-fr-25',  0, 2.2, '$\\dfrac{2}{5}$', { color: WARM, size: 16, bold: true });
          S.actor('s2-fr-m15', 0, 0.8, '-1.5',             { color: WARM, size: 16, bold: true });
          // 归位：负有理数 -3, -1.5
          S.actor('s2-neg-m3',  7, 2.2, '-3',   { color: RED, size: 16, bold: true });
          S.actor('s2-neg-m15', 7, 1.1, '-1.5', { color: RED, size: 16, bold: true });

          // 说明：0 是整数
          S.actor('s2-note-0', 0, -2.5, '⚠ 0 不是正数也不是负数，但 0 是整数，也是有理数！', { color: ORANGE, size: 14 });

          P.renderCard(
            '分类口诀：<b>整数</b>（正整数、0、负整数）+ <b>分数</b>（正分数、负分数）= 有理数全集<br>' +
            '整数：<span style="color:' + COOL + '">-3、0、8</span><br>' +
            '分数：<span style="color:' + WARM + '">$\\dfrac{2}{5}$、-1.5</span><br>' +
            '负有理数：<span style="color:' + RED + '">-3、-1.5</span>'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤2：比较 -2/3 与 -3/4（通分，"反而"规则）
        narration: '第二题：比较 -2/3 与 -3/4 的大小。负数比大小最容易出错——同学们先想30秒。通分：-2/3 = -8/12，-3/4 = -9/12。问：|-9/12| 比 |-8/12| 大，所以 -9/12 更小，即 -3/4 < -2/3。关键口诀：负数中绝对值大的反而更小——这是最反直觉的地方！',
        enter: function (anim) {
          // 清上一步元素
          S.remove('s2-title'); S.remove('s2-nums'); S.remove('s2-note-0');
          S.remove('s2-box-int-title'); S.remove('s2-box-int-t'); S.remove('s2-box-int-b');
          S.remove('s2-box-int-l'); S.remove('s2-box-int-r');
          S.remove('s2-box-fra-title'); S.remove('s2-box-fra-t'); S.remove('s2-box-fra-b');
          S.remove('s2-box-fra-l'); S.remove('s2-box-fra-r');
          S.remove('s2-box-neg-title'); S.remove('s2-box-neg-t'); S.remove('s2-box-neg-b');
          S.remove('s2-box-neg-l'); S.remove('s2-box-neg-r');
          S.remove('s2-in-m3'); S.remove('s2-in-0'); S.remove('s2-in-8');
          S.remove('s2-fr-25'); S.remove('s2-fr-m15');
          S.remove('s2-neg-m3'); S.remove('s2-neg-m15');

          S.actor('s2-t2-title', 0, 7.0, '题2：比较大小', { color: INK, size: 18, bold: true });
          S.actor('s2-t2-q', 0, 5.5, '比较 $-\\dfrac{2}{3}$ 与 $-\\dfrac{3}{4}$ 的大小', { color: INK, size: 18 });

          // 通分步骤
          S.actor('s2-step1', -4, 3.5, '通分：', { color: COOL, size: 16 });
          S.actor('s2-step1a', 2, 3.5, '$-\\dfrac{2}{3} = -\\dfrac{8}{12}$', { color: COOL, size: 17 });
          S.actor('s2-step1b', 2, 2.0, '$-\\dfrac{3}{4} = -\\dfrac{9}{12}$', { color: COOL, size: 17 });

          // 比较绝对值
          S.addSegment('s2-t2-sep', [-10, 1.0], [10, 1.0], { color: GRAY, width: 1, dash: 2 });
          S.actor('s2-cmp', -4, 0.0, '比较绝对值：', { color: WARM, size: 15 });
          S.actor('s2-cmp2', 2, 0.0, '$\\dfrac{9}{12} \\gt \\dfrac{8}{12}$', { color: WARM, size: 17 });
          S.actor('s2-cmp3', -2, -1.5, '所以 $-\\dfrac{9}{12} \\lt -\\dfrac{8}{12}$', { color: RED, size: 16 });

          // 结论
          S.actor('s2-concl', 0, -3.5, '即：$-\\dfrac{3}{4} \\lt -\\dfrac{2}{3}$', { color: RED, size: 22, bold: true });

          // 口诀警示
          S.actor('s2-tip', 0, -5.5, '⚠ 负数：绝对值<b>大</b>的反而更<b>小</b>！', { color: ORANGE, size: 15 });

          P.renderCard(
            '负数比大小口诀：<b>绝对值大的负数反而更小</b><br>' +
            '$-\\dfrac{3}{4} = -\\dfrac{9}{12}$，$\\dfrac{9}{12} \\gt \\dfrac{8}{12}$<br>' +
            '所以 $-\\dfrac{3}{4} \\lt -\\dfrac{2}{3}$<br>' +
            '记忆：在数轴上越靠左越小'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤3：-(-4) 的相反数（两步不跳）
        narration: '第三题：求 -(-4) 的相反数。注意：这道题要分两步，不能跳！第一步：先化简 -(-4)，等于 4；第二步：4 的相反数是 -4。强调：求"某数的相反数"——先把那个数化简，再取相反数，顺序不能颠倒！',
        enter: function (anim) {
          // 清上一步元素
          S.remove('s2-t2-title'); S.remove('s2-t2-q');
          S.remove('s2-step1'); S.remove('s2-step1a'); S.remove('s2-step1b');
          S.remove('s2-t2-sep'); S.remove('s2-cmp'); S.remove('s2-cmp2'); S.remove('s2-cmp3');
          S.remove('s2-concl'); S.remove('s2-tip');

          S.actor('s2-t3-title', 0, 7.0, '题3：求相反数', { color: INK, size: 18, bold: true });
          S.actor('s2-t3-q', 0, 5.5, '求 $-(-4)$ 的相反数', { color: INK, size: 20 });

          // 步骤分解
          S.actor('s2-t3-s1-label', -4, 3.5, '第一步：化简', { color: COOL, size: 16 });
          S.actor('s2-t3-s1', 4, 3.5, '$-(-4) = 4$', { color: COOL, size: 20, bold: true });

          S.addSegment('s2-t3-arr', [0, 2.5], [0, 1.5], { color: INK, width: 2, dash: 0 });

          S.actor('s2-t3-s2-label', -4, 0.5, '第二步：取相反数', { color: WARM, size: 16 });
          S.actor('s2-t3-s2', 4, 0.5, '$4$ 的相反数 $= -4$', { color: RED, size: 20, bold: true });

          // 警告框
          S.actor('s2-t3-warn', 0, -2.5, '⚠ 两步必须分开，不能直接说 -(-4) 的相反数是 4！', { color: ORANGE, size: 14 });

          P.renderCard(
            '求"某数的相反数"——<b>两步不跳</b>：<br>' +
            '第一步：化简该数 $-(-4) = 4$<br>' +
            '第二步：取相反数 $-4$<br>' +
            '⚠ 直接说"相反数是正的"是错误的——要先化简！'
          );
          return anim ? delay(400) : null;
        },
      },
      {
        // 步骤4：|a|=5 双解 + 绝对值分段定义回放
        narration: '第四题：已知 |a|=5，a 等于多少？绝对值表示到原点的距离，距离等于 5 的点有两个：a=5 在右边，a=-5 在左边，所以有两个解。追问：若 a<0，|a| 等于 a 还是 -a？等于 -a，因为 a<0 时 -a>0，才是正的距离。绝对值的分段定义：a≥0 时 |a|=a；a<0 时 |a|=-a。',
        enter: function (anim) {
          // 清上一步
          S.remove('s2-t3-title'); S.remove('s2-t3-q');
          S.remove('s2-t3-s1-label'); S.remove('s2-t3-s1');
          S.remove('s2-t3-arr');
          S.remove('s2-t3-s2-label'); S.remove('s2-t3-s2');
          S.remove('s2-t3-warn');

          S.actor('s2-t4-title', 0, 7.0, '题4：绝对值方程', { color: INK, size: 18, bold: true });
          S.actor('s2-t4-q', 0, 5.5, '已知 $|a|=5$，求 $a$ 的值', { color: INK, size: 20 });

          // 双解
          S.actor('s2-t4-exp', 0, 4.0, '距离为 5 的点有两个：', { color: INK, size: 16 });
          S.actor('s2-t4-ans1', -4, 2.5, '$a = 5$', { color: GREEN, size: 22, bold: true });
          S.actor('s2-t4-or', 0, 2.5, '或', { color: INK, size: 18 });
          S.actor('s2-t4-ans2', 4, 2.5, '$a = -5$', { color: RED, size: 22, bold: true });

          // 分段定义回放
          S.addSegment('s2-t4-sep', [-10, 1.2], [10, 1.2], { color: GRAY, width: 1, dash: 2 });
          S.actor('s2-t4-def-title', 0, 0.4, '绝对值分段定义回放：', { color: COOL, size: 15, bold: true });
          S.actor('s2-t4-def1', -3, -0.8, '$|a| = a$', { color: GREEN, size: 17 });
          S.actor('s2-t4-def1c', 3, -0.8, '（当 $a \\geq 0$ 时）', { color: GREEN, size: 14 });
          S.actor('s2-t4-def2', -3, -2.2, '$|a| = -a$', { color: RED, size: 17 });
          S.actor('s2-t4-def2c', 3, -2.2, '（当 $a \\lt 0$ 时）', { color: RED, size: 14 });

          // 举例
          S.actor('s2-t4-eg', 0, -4.2, '例：$|-3| = -(-3) = 3 \\gt 0$', { color: WARM, size: 16 });
          S.actor('s2-t4-always', 0, -6.0, '$|a| \\geq 0$ 永远成立！', { color: TEAL, size: 16, bold: true });

          P.renderCard(
            '$|a|=5$ 有<b>两个解</b>：$a=5$ 或 $a=-5$<br>' +
            '绝对值分段定义：<br>' +
            '$|a|=a$（$a \\geq 0$），$|a|=-a$（$a \\lt 0$）<br>' +
            '关键：$a \\lt 0$ 时，$-a \\gt 0$，绝对值永远非负'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
