// s2-concept.js  环节二：绝对值——到原点的距离（3步）
// 数学验算：|-3|=3（点-3到原点距离3），|3|=3；|2.5|=2.5，|-3/4|=3/4，|0|=0
// 非负性：距离≥0，|0|=0等号成立；互为相反数则绝对值相等
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var AXIS_Y = 0;

  var scene = {
    id: 's2',
    title: '二、绝对值：到原点的距离',
    bbox: [-5.5, 3.5, 5.5, -2],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：定义+记号，数轴上 |-3| 与 |3| 两段等长线段高亮
      {
        narration: '正式定义！数轴上，表示数 a 的点与原点之间的距离，叫作 a 的绝对值，记作竖线 a 竖线，读作"a 的绝对值"。比如负3到原点距离是3，所以负3的绝对值等于3；正3到原点距离也是3，所以正3的绝对值也等于3。这两段距离线段一样长！',
        enter: function (anim) {
          // 数轴
          S.addSegment('s2-axis', [-4.8, AXIS_Y], [4.8, AXIS_Y], { color: INK, width: 3 });
          S.addSegment('s2-arr-r1', [4.6, AXIS_Y + 0.15], [4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s2-arr-r2', [4.6, AXIS_Y - 0.15], [4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s2-arr-l1', [-4.6, AXIS_Y + 0.15], [-4.8, AXIS_Y], { color: INK, width: 2 });
          S.addSegment('s2-arr-l2', [-4.6, AXIS_Y - 0.15], [-4.8, AXIS_Y], { color: INK, width: 2 });
          // 刻度
          for (var n = -4; n <= 4; n++) {
            S.addSegment('s2-tick-' + (n + 4), [n, AXIS_Y - 0.15], [n, AXIS_Y + 0.15], { color: INK, width: 2 });
            if (n !== 0) {
              S.addText('s2-tlab-' + (n + 4), n - 0.08, AXIS_Y - 0.42, '' + n, { color: INK, size: 14 });
            }
          }
          S.addText('s2-zero', -0.08, AXIS_Y - 0.42, '0', { color: INK, size: 14 });

          // 点 -3 和 +3 高亮
          S.dropPoint('s2-pt-neg3', -3, AXIS_Y, { color: COOL, size: 4 });
          S.dropPoint('s2-pt-pos3', 3, AXIS_Y, { color: WARM, size: 4 });

          // 两段距离线段（在轴上方）
          S.addSegment('s2-dist-l', [-3, AXIS_Y + 0.4], [0, AXIS_Y + 0.4], { color: COOL, width: 5 });
          S.addSegment('s2-dist-r', [0, AXIS_Y + 0.4], [3, AXIS_Y + 0.4], { color: WARM, width: 5 });
          S.addText('s2-lab-distl', -1.7, AXIS_Y + 0.75, '$|-3| = 3$', { color: COOL, size: 17 });
          S.addText('s2-lab-distr', 0.9, AXIS_Y + 0.75, '$|3| = 3$', { color: WARM, size: 17 });

          // 等长标注
          S.addText('s2-eq-note', 0, AXIS_Y + 1.25,
            '两段距离<b>等长</b>，均为 3',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>绝对值定义</b><br>' +
            '数轴上表示数 $a$ 的点与原点的距离，<br>' +
            '叫作 $a$ 的<b>绝对值</b>，记作 $|a|$。<br>' +
            '$|-3| = 3$，$|3| = 3$——双向等长！'
          );
          return anim ? delay(400) : null;
        }
      },

      // Step 2：即时练习 |2.5| / |-3/4| / |0|
      {
        narration: '来做个即时练习！|2.5| 等于多少？2.5到原点距离是2.5，所以是2.5。|-3/4| 呢？负四分之三到原点距离是四分之三，答案是四分之三。|0| 呢？0就在原点上，离原点距离是0，所以|0|=0。',
        enter: function (anim) {
          S.remove('s2-dist-l');
          S.remove('s2-dist-r');
          S.remove('s2-lab-distl');
          S.remove('s2-lab-distr');
          S.remove('s2-eq-note');
          S.remove('s2-pt-neg3');
          S.remove('s2-pt-pos3');

          // 练习题布局
          S.actor('s2-pr-title', 0, 2.8, '即时练习', { color: TEAL, size: 18, bold: true });
          S.actor('s2-pr-q1', -3.5, 1.8, '$|2.5| = $ 【？】', { color: INK, size: 17 });
          S.actor('s2-pr-q2', 0.5, 1.8, '$\\left|-\\dfrac{3}{4}\\right| = $ 【？】', { color: INK, size: 17 });
          S.actor('s2-pr-q3', -1.5, 0.6, '$|0| = $ 【？】', { color: INK, size: 17 });

          P.renderCard('计算绝对值：想想"到原点的距离"是多少？');

          if (!anim) {
            S.actor('s2-pr-a1', -3.5, 1.2, '$= 2.5$', { color: WARM, size: 17 });
            S.actor('s2-pr-a2', 0.5, 1.2, '$= \\dfrac{3}{4}$', { color: WARM, size: 17 });
            S.actor('s2-pr-a3', -1.5, 0.0, '$= 0$', { color: WARM, size: 17 });
            P.renderCard('$|2.5|=2.5$，$\\left|-\\dfrac{3}{4}\\right|=\\dfrac{3}{4}$，$|0|=0$');
            return null;
          }

          return delay(1200).then(function () {
            S.actor('s2-pr-a1', -3.5, 1.2, '$= 2.5$', { color: WARM, size: 17 });
            return delay(600);
          }).then(function () {
            S.actor('s2-pr-a2', 0.5, 1.2, '$= \\dfrac{3}{4}$', { color: WARM, size: 17 });
            return delay(600);
          }).then(function () {
            S.actor('s2-pr-a3', -1.5, 0.0, '$= 0$', { color: WARM, size: 17 });
            P.renderCard(
              '$|2.5|=2.5$，$\\left|-\\dfrac{3}{4}\\right|=\\dfrac{3}{4}$，$|0|=0$<br>' +
              '结论初见：绝对值永远不为负！'
            );
            return delay(400);
          });
        }
      },

      // Step 3：非负性 |a|≥0 + 互为相反数绝对值相等（闭环上节课）
      {
        narration: '从这几个例子我们发现：距离永远不会是负数——绝对值有个重要性质，叫非负性：|a|大于等于0，而且等号成立当且仅当a等于0，也就是原点到它自己距离才是0。另外，上节课我们学过的相反数，有个漂亮的结论：互为相反数的两个数绝对值相等！比如1.5和-1.5互为相反数，|1.5|=|-1.5|=1.5，两个概念完美闭环！',
        enter: function (anim) {
          S.remove('s2-pr-title'); S.remove('s2-pr-q1'); S.remove('s2-pr-q2'); S.remove('s2-pr-q3');
          S.remove('s2-pr-a1'); S.remove('s2-pr-a2'); S.remove('s2-pr-a3');

          S.actor('s2-nonneg-title', 0, 2.8, '非负性', { color: TEAL, size: 20, bold: true });
          S.actor('s2-nonneg-rule', 0, 1.9,
            '$|a| \\ge 0$，等号成立当且仅当 $a = 0$',
            { color: WARM, size: 18 });
          S.actor('s2-nonneg-note', 0, 1.1,
            '距离永远不为负——<b>不存在负的绝对值</b>',
            { color: INK, size: 15 });

          S.addSegment('s2-divider', [-4, 0.55], [4, 0.55], { color: GRAY, width: 1, dash: 2 });

          S.actor('s2-opp-title', 0, 0.2, '与相反数的关系（闭环上节课）', { color: TEAL, size: 15 });
          S.actor('s2-opp-rule', 0, -0.6,
            '互为相反数的两数绝对值<b>相等</b>',
            { color: GREEN, size: 17 });
          S.actor('s2-opp-eg', 0, -1.3,
            '$|1.5| = |-1.5| = 1.5$',
            { color: INK, size: 16 });

          P.renderCard(
            '<b>非负性：$|a| \\ge 0$</b>（等号当且仅当 $a=0$）<br>' +
            '<b>互为相反数</b>的两数绝对值相等：<br>' +
            '$|a| = |-a|$',
            'teal'
          );
          return anim ? delay(300) : null;
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
