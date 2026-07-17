// s6-summary.js  环节六：综合与小结（3步）
// 数学验算：-(-2)=2（相反数的相反数），-|-3|=-(3)=-3（绝对值再取相反数）
// 所以 -(-2)=2 > -3=-|-3|，即 2 > -3
// 判断四题：①|a|一定大于0——错（a=0时|0|=0）；②绝对值大的数一定大——错（-5<3但|-5|>|3|）
// ③|a|=|b|则a=b——错（|3|=|-3|但3≠-3）；④互为相反数绝对值相等——正确
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
    id: 's6',
    title: '六、综合与小结',
    bbox: [-6, 5, 6, -4],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：混合化简比较（-(-2)=2 与 -|-3|=-3）
      {
        narration: '来一道综合题：比较 -(-2) 和 -|-3| 的大小。先各自化简：-(-2) 是负2的相反数，等于2；-|-3| 先算绝对值 |-3|=3，再取相反数变成-3。2 和 -3 谁大？2大！所以 -(-2) 大于 -|-3|。注意：外面那个减号不能漏看！',
        enter: function (anim) {
          S.actor('s6-mix-title', 0, 4.5, '混合化简比较', { color: TEAL, size: 19, bold: true });
          S.actor('s6-mix-q', 0, 3.6,
            '比较 $-(-2)$ 与 $-|-3|$ 的大小',
            { color: INK, size: 18 });

          S.actor('s6-mix-s1a', -3, 2.5, '$-(-2)$', { color: WARM, size: 18 });
          S.actor('s6-mix-s1b', -3, 1.7, '$= 2$', { color: WARM, size: 20, bold: true });
          S.actor('s6-mix-note1', -3, 0.95, '（相反数的相反数）', { color: GRAY, size: 13 });

          S.actor('s6-mix-s2a', 3, 2.5, '$-|-3|$', { color: COOL, size: 18 });
          S.actor('s6-mix-s2b', 3, 1.7, '$= -(3) = -3$', { color: COOL, size: 18, bold: true });
          S.actor('s6-mix-note2', 3, 0.95, '（先绝对值，再取反）', { color: GRAY, size: 13 });

          S.addSegment('s6-mix-line', [-5, 0.4], [5, 0.4], { color: GRAY, width: 1, dash: 2 });

          S.actor('s6-mix-cmp', 0, -0.3,
            '$2 \\gt -3$',
            { color: RED, size: 22, bold: true });
          S.actor('s6-mix-ans', 0, -1.1,
            '所以 $-(-2) \\gt -|-3|$',
            { color: WARM, size: 18 });
          S.actor('s6-mix-warn', 0, -2.0,
            '⚠ 外面的负号不能漏看！',
            { color: RED, size: 15 });

          P.renderCard(
            '<b>混合化简</b><br>' +
            '$-(-2) = 2$（相反数的相反数）<br>' +
            '$-|-3| = -(3) = -3$（先绝对值再取反）<br>' +
            '$2 \\gt -3$，即 $-(-2) \\gt -|-3|$',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 2：判断四连（易错点清理）
      {
        narration: '判断四道易错题！第一题：|a| 一定大于0？——错！当 a=0 时 |0|=0，不大于0，只能说 |a|≥0。第二题：绝对值大的数一定大？——错！负5的绝对值5比3大，但负5小于3。第三题：|a|=|b| 则 a=b？——错！|3|=|-3|=3，但3不等于-3，两数可能互为相反数。第四题：互为相反数的两数绝对值相等？——正确！这是今天学的结论。',
        enter: function (anim) {
          S.remove('s6-mix-title'); S.remove('s6-mix-q');
          S.remove('s6-mix-s1a'); S.remove('s6-mix-s1b'); S.remove('s6-mix-note1');
          S.remove('s6-mix-s2a'); S.remove('s6-mix-s2b'); S.remove('s6-mix-note2');
          S.remove('s6-mix-line'); S.remove('s6-mix-cmp'); S.remove('s6-mix-ans'); S.remove('s6-mix-warn');

          S.actor('s6-jd-title', 0, 4.5, '判断四连（易错点清理）', { color: TEAL, size: 18, bold: true });

          // 四道判断题
          S.actor('s6-jd-q1', 0, 3.6, '① "$|a|$ 一定大于 $0$"', { color: INK, size: 16 });
          S.actor('s6-jd-a1', 0, 2.95,
            '<b>✗ 错</b>：$a=0$ 时 $|0|=0$，只能说 $|a| \\ge 0$',
            { color: RED, size: 14 });

          S.actor('s6-jd-q2', 0, 2.2, '② "绝对值大的数一定大"', { color: INK, size: 16 });
          S.actor('s6-jd-a2', 0, 1.55,
            '<b>✗ 错</b>：$|-5|=5 \\gt |3|=3$，但 $-5 \\lt 3$',
            { color: RED, size: 14 });

          S.actor('s6-jd-q3', 0, 0.8, '③ "$|a|=|b|$ 则 $a=b$"', { color: INK, size: 16 });
          S.actor('s6-jd-a3', 0, 0.15,
            '<b>✗ 错</b>：$|3|=|-3|=3$，但 $3 \\ne -3$',
            { color: RED, size: 14 });

          S.actor('s6-jd-q4', 0, -0.6, '④ "互为相反数的两数绝对值相等"', { color: INK, size: 16 });
          S.actor('s6-jd-a4', 0, -1.25,
            '<b>✓ 正确</b>：$b=-a$ 则 $|b|=|-a|=|a|$',
            { color: GREEN, size: 14 });

          P.renderCard(
            '<b>判断四连</b><br>' +
            '① 错：$|a| \\ge 0$（非 $\\gt 0$）<br>' +
            '② 错：负数区间方向相反<br>' +
            '③ 错：可能互为相反数<br>' +
            '④ 正确！',
            'cool'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 3：小结填空 + 悬念
      {
        narration: '最后做个填空小结，也是今天课的出口题。数轴上表示数a的点与原点的距离叫绝对值，记作|a|；负数a的绝对值等于-a（相反数）；|a|大于等于0；两个负数比大小，绝对值大的那个数反而小。——下节课，我们要让有理数开始做运算了，负数怎么做加法？敬请期待！',
        enter: function (anim) {
          S.remove('s6-jd-title');
          S.remove('s6-jd-q1'); S.remove('s6-jd-a1');
          S.remove('s6-jd-q2'); S.remove('s6-jd-a2');
          S.remove('s6-jd-q3'); S.remove('s6-jd-a3');
          S.remove('s6-jd-q4'); S.remove('s6-jd-a4');

          S.actor('s6-sum-title', 0, 4.5, '课堂小结', { color: TEAL, size: 20, bold: true });

          S.actor('s6-sum-1', 0, 3.5,
            '1. 数轴上表示 $a$ 的点到原点的距离 = <b>绝对值</b> $|a|$',
            { color: INK, size: 15 });
          S.actor('s6-sum-2', 0, 2.7,
            '2. $a \\lt 0$ 时，$|a| = -a$（$-a$ 是正数）',
            { color: COOL, size: 15 });
          S.actor('s6-sum-3', 0, 1.9,
            '3. 非负性：$|a| \\ge 0$，等号当 $a=0$',
            { color: INK, size: 15 });
          S.actor('s6-sum-4', 0, 1.1,
            '4. 两负数比大小：绝对值<b>大</b>的反而<b>小</b>',
            { color: WARM, size: 15 });

          S.addSegment('s6-sum-line', [-5, 0.55], [5, 0.55], { color: GRAY, width: 1, dash: 2 });

          S.actor('s6-next', 0, -0.2, '下节课预告', { color: TEAL, size: 16, bold: true });
          S.actor('s6-next2', 0, -1.0,
            '有理数做运算——<b>负数怎么做加法？</b>',
            { color: WARM, size: 17 });
          S.actor('s6-next3', 0, -1.8,
            '（$-3 + (-5)$ 等于多少？直觉和规则哪个对？）',
            { color: INK, size: 14 });

          P.renderTable({
            head: ['知识点', '核心结论'],
            rows: [
              ['绝对值定义', '到原点的距离，记 $|a|$'],
              ['代数规则', '$a\\gt 0$：$|a|=a$；$a\\lt 0$：$|a|=-a$'],
              ['非负性', '$|a| \\ge 0$，等号当 $a=0$'],
              ['两负数', '绝对值大的反而小']
            ]
          });
          return anim ? delay(300) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
