// s2-solve.js  环节二：配套问题求解（4步）
// 数学验算：2000(22-x)=2×1200x → 44000-2000x=2400x → 44000=4400x → x=10
// 检验：左边=2000×12=24000，右边=2×1200×10=24000 ✓；10为正整数且10<22 ✓
// 答：10人生产螺钉，12人生产螺母
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100', GREEN = '#2e7d32', PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's2',
    title: '二、配套问题求解',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：设未知数
      {
        narration: '好，现在来正式解题。第一步：设未知数。设 x 人生产螺钉，注意——x 的单位是"人"，不是"个"！这一点很重要，单位必须写清楚。那么生产螺母的人数自然就是 22 减 x 人。这两个量互补，加起来是 22。',
        enter: function (anim) {
          S.actor('s2-title', 0, 7.2, '例1 配套问题·完整解题过程', { color: TEAL, size: 19, bold: true });

          // 设元部分
          S.actor('s2-set-label', -8, 5.5, '【设】', { color: PURPLE, size: 17, bold: true });
          S.actor('s2-set1', 0, 5.5,
            '设 $x$ 人生产螺钉（单位：人）',
            { color: WARM, size: 17 });
          S.actor('s2-set2', 0, 4.0,
            '则 $(22-x)$ 人生产螺母',
            { color: COOL, size: 17 });

          // 产量说明
          S.actor('s2-prod1', -3.0, 2.4,
            '螺钉总数：$1200x$ 个',
            { color: WARM, size: 16 });
          S.actor('s2-prod2', 4.5, 2.4,
            '螺母总数：$2000(22-x)$ 个',
            { color: COOL, size: 16 });

          P.renderCard(
            '<b>第一步·设未知数</b><br>' +
            '设 $x$ 人生产螺钉（$x$ 的单位：人）<br>' +
            '则 $(22-x)$ 人生产螺母<br>' +
            '<b>切记：设元时必须写清单位！</b>'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：列方程 + 展开
      {
        narration: '第二步：列方程。利用等量关系"螺母总数等于2乘以螺钉总数"，直接写出方程：2000乘以(22-x) 等于 2乘以1200x。展开左边：2000乘22等于44000，然后减去2000x；右边是2400x。移项：44000等于4400x。',
        enter: function (anim) {
          // 新增列方程部分
          S.actor('s2-list-label', -8, 0.8, '【列】', { color: PURPLE, size: 17, bold: true });
          S.actor('s2-eq0', 0, 0.8,
            '等量关系：螺母总数 $= 2 \\times$ 螺钉总数',
            { color: ORANGE, size: 16 });
          S.actor('s2-eq1', 0, -0.6,
            '$2000(22-x) = 2 \\times 1200x$',
            { color: INK, size: 18 });

          var p = anim ? delay(500) : Promise.resolve();
          return p.then(function () {
            S.actor('s2-eq2', 0, -2.0,
              '$44000 - 2000x = 2400x$',
              { color: INK, size: 18 });
            return anim ? delay(400) : Promise.resolve();
          }).then(function () {
            S.actor('s2-eq3', 0, -3.4,
              '$44000 = 4400x$',
              { color: WARM, size: 18 });
            return anim ? delay(400) : Promise.resolve();
          });
        },
      },

      // Step 3：解方程 x=10
      {
        narration: '两边同除以4400，得到 x 等于10。所以生产螺钉的有10人，生产螺母的有22减10等于12人。',
        enter: function (anim) {
          S.actor('s2-solve-label', -8, -4.8, '【解】', { color: PURPLE, size: 17, bold: true });
          S.actor('s2-x', 0, -4.8,
            '$x = \\dfrac{44000}{4400} = 10$',
            { color: WARM, size: 20, bold: true });

          var p = anim ? delay(500) : Promise.resolve();
          return p.then(function () {
            S.actor('s2-ans-bolt', -4.0, -6.4,
              '螺钉：$10$ 人',
              { color: WARM, size: 18, bold: true, css: 'background:#fbe9e7;border:2px solid #e64a19;border-radius:6px;padding:4px 12px;' });
            S.actor('s2-ans-nut', 4.0, -6.4,
              '螺母：$12$ 人',
              { color: COOL, size: 18, bold: true, css: 'background:#e3f2fd;border:2px solid #1565c0;border-radius:6px;padding:4px 12px;' });
            return anim ? delay(300) : Promise.resolve();
          });
        },
      },

      // Step 4：检验 + 作答
      {
        narration: '检验分两关。第一关：代入原方程。左边等于2000乘以12等于24000，右边等于2乘以1200乘以10等于24000，左边等于右边，验算通过。第二关：实际意义。10是正整数，且10小于22，满足题目约束。最终答案：应安排10人生产螺钉，12人生产螺母，每天螺钉12000个恰好配套螺母24000个。',
        enter: function (anim) {
          S.remove('s2-eq0'); S.remove('s2-eq1'); S.remove('s2-eq2'); S.remove('s2-eq3');
          S.remove('s2-solve-label'); S.remove('s2-x');
          S.remove('s2-ans-bolt'); S.remove('s2-ans-nut');

          S.actor('s2-check-title', 0, 5.0, '【检验】', { color: PURPLE, size: 17, bold: true });
          S.actor('s2-check1', 0, 3.4,
            '代入：左边 $= 2000 \\times 12 = 24000$',
            { color: INK, size: 16 });
          S.actor('s2-check2', 0, 2.0,
            '右边 $= 2 \\times 1200 \\times 10 = 24000$',
            { color: INK, size: 16 });
          S.actor('s2-check3', 0, 0.6,
            '左边 $=$ 右边 ✓　$x=10$ 为正整数且 $10 \\lt 22$ ✓',
            { color: GREEN, size: 16 });

          S.actor('s2-final-label', 0, -1.2, '【答】', { color: PURPLE, size: 17, bold: true });
          S.actor('s2-final', 0, -2.8,
            '应安排 <b>10</b> 人生产螺钉，<b>12</b> 人生产螺母',
            { color: WARM, size: 17, bold: true });
          S.actor('s2-final2', 0, -4.4,
            '每天螺钉 12000 个配套螺母 24000 个，恰好配套！',
            { color: COOL, size: 16 });

          P.renderCard(
            '<b>检验两关必须都过</b><br>' +
            '① 代入原方程：左边 $= 2000 \\times 12 = 24000$，右边 $= 2 \\times 1200 \\times 10 = 24000$ ✓<br>' +
            '② 实际约束：$x=10$ 为正整数且 $10 \\lt 22$ ✓<br>' +
            '<b>答：安排10人生产螺钉，12人生产螺母。</b>',
            'teal', 'tada'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
