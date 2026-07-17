// s1-snail.js  环节一：蜗牛爬行的四种走法（4步）
// 数学验算：
//   情形①：(+2)×(+3)=+6，蜗牛向右爬，3分钟后在右6
//   情形②：(-2)×(+3)=-6，蜗牛向左爬，3分钟后在左6
//   情形③：(+2)×(-3)=-6，蜗牛向右爬，3分钟前在左6（当前在0，3分钟前已向右走了6，故3分钟前在-6）
//   情形④：(-2)×(-3)=+6，蜗牛向左爬，3分钟前在右6（当前在0，3分钟前它向左爬还没到这，所以在右边）
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var RED = '#c62828', GREEN = '#2e7d32', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 数轴参数：bbox [-8, 3.5, 8, -2.5]，原点 x=0，y=0
  // 1个数学单位 = 1画面单位（keepAspect:false，数轴水平）
  var AXIS_Y = 0;
  // 蜗牛起始在原点

  // 情形对应的终点 x 坐标
  var POS = [6, -6, -6, 6]; // 情形①②③④

  var snail; // actor 对象

  var scene = {
    id: 's1',
    title: '一、蜗牛爬行的四种走法',
    bbox: [-8, 3.5, 8, -2.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
      snail = null;
    },
    steps: [
      // ── 步1：情境与规定 ──
      {
        narration: '我们用一只蜗牛来引出有理数的乘法！蜗牛在数轴上爬行，向右为正方向。时间也有正负：之后为正，之前为负。速度的正负表示方向，时间的正负表示是"之后"还是"之前"。',
        enter: function (anim) {
          // 数轴主线
          S.addSegment('s1-axis', [-7.5, AXIS_Y], [7.5, AXIS_Y], { color: INK, width: 3, dash: 0 });
          // 箭头（右）
          S.addSegment('s1-arr1', [7.3, 0.18], [7.6, AXIS_Y], { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-arr2', [7.3, -0.18], [7.6, AXIS_Y], { color: INK, width: 2, dash: 0 });
          // 刻度 -7~7
          var i;
          for (i = -7; i <= 7; i++) {
            S.addSegment('s1-tick-' + i, [i, -0.15], [i, 0.15], { color: INK, width: 1.5, dash: 0 });
            if (i !== 0) {
              S.addText('s1-tlab-' + i, i - 0.1, -0.45, '' + i, { color: GRAY, size: 12 });
            }
          }
          S.addText('s1-tlab-0', -0.1, -0.45, '0', { color: INK, size: 13 });
          // 正方向标注
          S.addText('s1-rlab', 7.0, 0.55, '正方向', { color: COOL, size: 14 });
          // 蜗牛 actor（在原点）
          snail = S.actor('s1-snail', 0, 0.65, '🐌', { size: 28 });

          P.renderCard(
            '<b>规定</b><br>' +
            '向右为<b>正方向</b>，向左为负方向；<br>' +
            '之后的时间为正，之前的时间为负。<br>' +
            '蜗牛速度：正 = 向右爬；负 = 向左爬。<br>' +
            '蜗牛从原点出发，现在在 <b>0</b> 处。'
          );
          return anim ? delay(300) : Promise.resolve();
        }
      },

      // ── 步2：情形①②（正×正、负×正）──
      {
        narration: '先看两种"3分钟后"的情形。情形①：蜗牛速度+2，3分钟后在哪？——向右走了6格，在+6！情形②：速度-2，向左走，3分钟后在-6。同号得正，异号得负——初见端倪！',
        enter: function (anim) {
          // 清场前一情形残留（步2是步1之后，无需额外清场，但要防止叠印——步1没有终点标记）
          S.remove('s1-end1'); S.remove('s1-end2');
          S.remove('s1-lab-case1'); S.remove('s1-lab-case2');

          // 情形①标注
          S.addText('s1-lab-case1', 6, 1.5,
            '①(+2)\xd7(+3)=<b>+6</b>', { color: GREEN, size: 16 });
          // 情形②标注
          S.addText('s1-lab-case2', -6, 1.5,
            '②(−2)\xd7(+3)=<b>−6</b>', { color: WARM, size: 16 });

          if (!anim) {
            // 快放：移除旧蜗牛，在+6重建（两情形终态取①）
            S.remove('s1-snail');
            snail = S.actor('s1-snail', 6, 0.65, '🐌', { size: 28 });
            // 画两个落点
            S.addSegment('s1-end1', [6, -0.25], [6, 0.25], { color: GREEN, width: 3, dash: 0 });
            S.addText('s1-end1-lab', 5.8, -0.55, '+6', { color: GREEN, size: 14 });
            S.addSegment('s1-end2', [-6, -0.25], [-6, 0.25], { color: WARM, width: 3, dash: 0 });
            S.addText('s1-end2-lab', -6.4, -0.55, '-6', { color: WARM, size: 14 });
            P.renderCard(
              '<b>情形①②</b><br>' +
              '①&nbsp;$(+2)\\times(+3)=\\boldsymbol{+6}$&nbsp;（同号得正）<br>' +
              '②&nbsp;$(-2)\\times(+3)=\\boldsymbol{-6}$&nbsp;（异号得负）'
            );
            return Promise.resolve();
          }

          // 动画：先向右到+6
          return snail.moveTo(6, 0.65, 700).then(function () {
            S.addSegment('s1-end1', [6, -0.25], [6, 0.25], { color: GREEN, width: 3, dash: 0 });
            S.addText('s1-end1-lab', 5.8, -0.55, '+6', { color: GREEN, size: 14 });
            return delay(400);
          }).then(function () {
            // 复位到原点，再向左
            return snail.moveTo(0, 0.65, 500);
          }).then(function () {
            return snail.moveTo(-6, 0.65, 700);
          }).then(function () {
            S.addSegment('s1-end2', [-6, -0.25], [-6, 0.25], { color: WARM, width: 3, dash: 0 });
            S.addText('s1-end2-lab', -6.4, -0.55, '-6', { color: WARM, size: 14 });
            P.renderCard(
              '<b>情形①②</b><br>' +
              '①&nbsp;$(+2)\\times(+3)=\\boldsymbol{+6}$&nbsp;（同号得正）<br>' +
              '②&nbsp;$(-2)\\times(+3)=\\boldsymbol{-6}$&nbsp;（异号得负）'
            );
            return delay(300);
          });
        }
      },

      // ── 步3：情形③④（正×负、负×负）—— 重点渲染负负得正 ──
      {
        narration: '现在是关键：3分钟前蜗牛在哪？蜗牛现在在原点。情形③：速度+2，向右爬。3分钟前——它还没到达原点，当时在左边6格！(+2)×(-3)=-6。情形④：速度-2，向左爬。3分钟前——它在原点的右边6格！(-2)×(-3)=+6，负负得正！这不是规定，是真实的位置！',
        enter: function (anim) {
          // 清场情形①②的元素，重置蜗牛到原点
          S.remove('s1-end1'); S.remove('s1-end1-lab');
          S.remove('s1-end2'); S.remove('s1-end2-lab');
          S.remove('s1-lab-case1'); S.remove('s1-lab-case2');

          // 添加情形③④标注
          S.addText('s1-lab-case3', -6, 1.5,
            '③(+2)\xd7(-3)=<b>-6</b>', { color: WARM, size: 16 });
          S.addText('s1-lab-case4', 6, 1.5,
            '④(-2)\xd7(-3)=<b style="color:#2e7d32">+6</b>（负负得正！）', { color: COOL, size: 15 });

          if (!anim) {
            // 快放：清理旧蜗牛，在终态+6处重放蜗牛（情形④落点）
            S.remove('s1-snail');
            snail = S.actor('s1-snail', 6, 0.65, '🐌', { size: 28 });
            S.addSegment('s1-end3', [-6, -0.25], [-6, 0.25], { color: WARM, width: 3, dash: 0 });
            S.addText('s1-end3-lab', -6.4, -0.55, '-6', { color: WARM, size: 14 });
            S.addSegment('s1-end4', [6, -0.25], [6, 0.25], { color: GREEN, width: 3, dash: 0 });
            S.addText('s1-end4-lab', 5.8, -0.55, '+6', { color: GREEN, size: 14 });
            P.renderCard(
              '<b>情形③④（3分钟前）</b><br>' +
              '③ $(+2)\\times(-3)=\\boldsymbol{-6}$&nbsp;——向右爬，3分钟前在<b>左边6格</b><br>' +
              '④ $(-2)\\times(-3)=\\boldsymbol{+6}$&nbsp;——向左爬，3分钟前在<b>右边6格</b><br>' +
              '<b>负负得正，来自真实的位置，不是规定！</b>',
              'warm'
            );
            return Promise.resolve();
          }

          // 蜗牛复位到0
          return snail.moveTo(0, 0.65, 400).then(function () {
            return delay(300);
          }).then(function () {
            // 情形③：向左（3分钟前，向右蜗牛在左边）
            return snail.moveTo(-6, 0.65, 700);
          }).then(function () {
            S.addSegment('s1-end3', [-6, -0.25], [-6, 0.25], { color: WARM, width: 3, dash: 0 });
            S.addText('s1-end3-lab', -6.4, -0.55, '-6', { color: WARM, size: 14 });
            return delay(400);
          }).then(function () {
            return snail.moveTo(0, 0.65, 400);
          }).then(function () {
            return delay(200);
          }).then(function () {
            // 情形④：向右（负负得正）
            return snail.moveTo(6, 0.65, 700);
          }).then(function () {
            S.addSegment('s1-end4', [6, -0.25], [6, 0.25], { color: GREEN, width: 3, dash: 0 });
            S.addText('s1-end4-lab', 5.8, -0.55, '+6', { color: GREEN, size: 14 });
            P.renderCard(
              '<b>情形③④（3分钟前）</b><br>' +
              '③ $(+2)\\times(-3)=\\boldsymbol{-6}$&nbsp;——向右爬，3分钟前在<b>左边6格</b><br>' +
              '④ $(-2)\\times(-3)=\\boldsymbol{+6}$&nbsp;——向左爬，3分钟前在<b>右边6格</b><br>' +
              '<b>负负得正，来自真实的位置，不是规定！</b>',
              'warm'
            );
            return delay(400);
          });
        }
      },

      // ── 步4：四情形 renderTable 归纳 ──
      {
        narration: '归纳四种情形！速度和时间同号——积为正；异号——积为负。这就是乘法符号法则的直观来源。下节课我们把它提炼成法则！',
        enter: function (anim) {
          // 清场③④元素
          S.remove('s1-end3'); S.remove('s1-end3-lab');
          S.remove('s1-end4'); S.remove('s1-end4-lab');
          S.remove('s1-lab-case3'); S.remove('s1-lab-case4');
          S.remove('s1-snail');

          // 画板上展示汇总标题
          S.actor('s1-sum-title', 0, 2.5, '四种情形归纳', { color: COOL, size: 20, bold: true });
          S.actor('s1-sum1', 0, 1.4,
            '①$(+2)\\times(+3)=+6$&nbsp;&nbsp;&nbsp;同号得<b>正</b>', { color: GREEN, size: 15 });
          S.actor('s1-sum2', 0, 0.6,
            '②$(-2)\\times(+3)=-6$&nbsp;&nbsp;&nbsp;异号得<b>负</b>', { color: WARM, size: 15 });
          S.actor('s1-sum3', 0, -0.2,
            '③$(+2)\\times(-3)=-6$&nbsp;&nbsp;&nbsp;异号得<b>负</b>', { color: WARM, size: 15 });
          S.actor('s1-sum4', 0, -1.0,
            '④$(-2)\\times(-3)=+6$&nbsp;&nbsp;&nbsp;同号得<b>正</b>', { color: GREEN, size: 15 });

          P.renderTable({
            head: ['情形', '速度', '时间', '积', '符号规律'],
            rows: [
              ['①', '+2', '+3', '+6', '同号得正'],
              ['②', '-2', '+3', '-6', '异号得负'],
              ['③', '+2', '-3', '-6', '异号得负'],
              ['④', '-2', '-3', '+6', '同号得正']
            ]
          });

          return anim ? delay(400) : Promise.resolve();
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
