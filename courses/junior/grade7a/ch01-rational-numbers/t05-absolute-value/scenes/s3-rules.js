// s3-rules.js  环节三：代数规则三分类（3步）
// 数学验算：|-3/4| = -(-3/4) = 3/4（因为 -3/4 < 0，取相反数）
// "|a|=a 恒成立"判错：a=-2时 |a|=2 ≠ a=-2
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';
  var GREEN = '#2e7d32';
  var RED  = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、代数规则三分类',
    bbox: [-6, 5, 6, -4],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：三岔流程图（a>0 / a=0 / a<0）
      {
        narration: '现在来解决一个问题：如果我只告诉你有个数 a，不说它是正是负，你能算出 |a| 是多少吗？这就需要分情况讨论！我们画一棵三叉树：a 可能大于0、等于0，或者小于0，三种情况分别怎么算？',
        enter: function (anim) {
          // 顶部问题框
          S.actor('s3-q', 0, 4.3, '已知数 $a$，求 $|a|$ = ?', { color: INK, size: 19, bold: true });

          // 三叉节点标题
          S.actor('s3-branch', 0, 3.2, '按符号分三类：', { color: TEAL, size: 16 });

          // 三个分支标签
          S.actor('s3-c1', -3.8, 2.1, '$a \\gt 0$', { color: WARM, size: 18, bold: true });
          S.actor('s3-c2', 0, 2.1, '$a = 0$', { color: TEAL, size: 18, bold: true });
          S.actor('s3-c3', 3.8, 2.1, '$a \\lt 0$', { color: COOL, size: 18, bold: true });

          // 竖线+横线模拟岔路（addSegment）
          S.addSegment('s3-stem',    [0, 2.8], [0, 2.55],  { color: GRAY, width: 2 });
          S.addSegment('s3-hline',   [-3.8, 2.55], [3.8, 2.55], { color: GRAY, width: 2 });
          S.addSegment('s3-vl1',     [-3.8, 2.55], [-3.8, 1.75], { color: WARM, width: 2 });
          S.addSegment('s3-vl2',     [0, 2.55],    [0, 1.75],    { color: TEAL, width: 2 });
          S.addSegment('s3-vl3',     [3.8, 2.55],  [3.8, 1.75],  { color: COOL, width: 2 });

          // 三个结果
          S.actor('s3-r1', -3.8, 0.85, '$|a| = a$', { color: WARM, size: 19 });
          S.actor('s3-r2', 0, 0.85, '$|a| = 0$', { color: TEAL, size: 19 });
          S.actor('s3-r3', 3.8, 0.85, '$|a| = -a$', { color: COOL, size: 19 });

          // 结果下方竖线
          S.addSegment('s3-vl1b', [-3.8, 1.75], [-3.8, 1.1], { color: WARM, width: 2 });
          S.addSegment('s3-vl2b', [0, 1.75],    [0, 1.1],    { color: TEAL, width: 2 });
          S.addSegment('s3-vl3b', [3.8, 1.75],  [3.8, 1.1],  { color: COOL, width: 2 });

          P.renderCard(
            '<b>分类讨论——初中第一次！</b><br>' +
            '遇到符号不明的 $a$，先分三类：<br>' +
            '$a \\gt 0$：$|a|=a$；$a=0$：$|a|=0$；$a \\lt 0$：$|a|=-a$'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 2：分段规则卡片 + 强调 -a 是正数
      {
        narration: '三种情况合并成一个分段规则——这是初中数学第一次正式出现分类讨论思想。重点来了：当 a 小于0的时候，|a| 等于 -a。很多同学看到"-a"就以为这是个负数，其实不对！a 是负数，那 -a 就是 a 的相反数，相反数是正数。举个例子：a 等于 -5，那 -a 等于 5，是正的。绝对值永远非负！',
        enter: function (anim) {
          // 清除岔路图保留标题
          S.remove('s3-q'); S.remove('s3-branch');
          S.remove('s3-c1'); S.remove('s3-c2'); S.remove('s3-c3');
          S.remove('s3-stem'); S.remove('s3-hline');
          S.remove('s3-vl1'); S.remove('s3-vl2'); S.remove('s3-vl3');
          S.remove('s3-r1'); S.remove('s3-r2'); S.remove('s3-r3');
          S.remove('s3-vl1b'); S.remove('s3-vl2b'); S.remove('s3-vl3b');

          // 分段规则展示
          S.actor('s3-rule-title', 0, 4.3, '绝对值代数规则', { color: TEAL, size: 20, bold: true });
          S.actor('s3-rule1', -2.5, 3.0, '$a \\gt 0$ 时，$|a| = a$', { color: WARM, size: 18 });
          S.actor('s3-rule2', -2.5, 1.9, '$a = 0$ 时，$|a| = 0$', { color: TEAL, size: 18 });
          S.actor('s3-rule3', -2.5, 0.8, '$a \\lt 0$ 时，$|a| = -a$', { color: COOL, size: 18 });

          // 重点提示
          S.addSegment('s3-emph-line', [-5, 0.2], [5, 0.2], { color: GRAY, width: 1, dash: 2 });
          S.actor('s3-emph', 0, -0.55,
            '<b>注意：$a \\lt 0$ 时，$-a \\gt 0$</b>',
            { color: RED, size: 17 });
          S.actor('s3-emph2', 0, -1.4,
            '$-a$ 是 $a$ 的相反数，是<b>正数</b>',
            { color: RED, size: 16 });
          S.actor('s3-emph-eg', 0, -2.3,
            '例：$a=-5$，则 $-a=5 \\gt 0$',
            { color: INK, size: 15 });

          P.renderCard(
            '<b>分段规则</b>（用 $a$ 的符号分三类）<br>' +
            '$a \\gt 0$：$|a|=a$；$a=0$：$|a|=0$；$a \\lt 0$：$|a|=-a$<br>' +
            '当 $a \\lt 0$ 时，$-a$ 是<b>正数</b>——绝对值不会是负数！',
            'cool'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 3：例 |-3/4| 推演 + 辨析"|a|=a 恒成立"判错
      {
        narration: '用规则算一道例题：求负四分之三的绝对值。因为负四分之三小于零，用第三类规则：|a|=-a，所以绝对值等于负的负四分之三，等于正四分之三。再来辨析一个易错说法："|a|=a 恒成立"——对吗？错！当 a=-2 时，|a|=2，但 a=-2，2≠-2，所以不恒成立。正确说法是：当 a 大于等于零时才有 |a|=a。',
        enter: function (anim) {
          S.remove('s3-rule-title'); S.remove('s3-rule1'); S.remove('s3-rule2'); S.remove('s3-rule3');
          S.remove('s3-emph-line'); S.remove('s3-emph'); S.remove('s3-emph2'); S.remove('s3-emph-eg');

          // 例题
          S.actor('s3-ex-title', 0, 4.3, '例题', { color: TEAL, size: 18, bold: true });
          S.actor('s3-ex-q', 0, 3.4,
            '计算 $\\left|-\\dfrac{3}{4}\\right|$',
            { color: INK, size: 18 });
          S.actor('s3-ex-s1', 0, 2.4,
            '因为 $-\\dfrac{3}{4} \\lt 0$，用规则 $|a|=-a$',
            { color: COOL, size: 16 });
          S.actor('s3-ex-s2', 0, 1.5,
            '$\\left|-\\dfrac{3}{4}\\right| = -\\left(-\\dfrac{3}{4}\\right) = \\dfrac{3}{4}$',
            { color: WARM, size: 19 });

          // 分隔线
          S.addSegment('s3-div2', [-5, 0.8], [5, 0.8], { color: GRAY, width: 1, dash: 2 });

          // 辨析
          S.actor('s3-judge-title', 0, 0.3, '辨析易错', { color: RED, size: 16, bold: true });
          S.actor('s3-judge-q', 0, -0.5,
            '"$|a| = a$ 恒成立"——对吗？',
            { color: INK, size: 17 });
          S.actor('s3-judge-a', 0, -1.4,
            '<b>错！</b>$a=-2$ 时，$|a|=2 \\ne a=-2$',
            { color: RED, size: 16 });
          S.actor('s3-judge-fix', 0, -2.3,
            '正确：$a \\ge 0$ 时才有 $|a|=a$',
            { color: GREEN, size: 16 });

          P.renderCard(
            '<b>例：</b>$\\left|-\\dfrac{3}{4}\\right| = -\\left(-\\dfrac{3}{4}\\right) = \\dfrac{3}{4}$<br>' +
            '<b>辨析：</b>$|a|=a$ <b>不恒成立</b><br>' +
            '（$a \\lt 0$ 时 $|a|=-a \\ne a$）',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
