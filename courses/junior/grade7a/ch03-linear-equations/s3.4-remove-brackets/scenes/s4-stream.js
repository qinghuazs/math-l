// s4-stream.js  环节四：顺流逆流（4步）
// 速度模型：顺流速度=x+3，逆流速度=x-3（水速=3 km/h）
// 列方程：2(x+3)=2.5(x-3)（路程相等）
// 解：去括号 2x+6=2.5x-7.5；移项 2x-2.5x=-7.5-6；合并 -0.5x=-13.5；两负相除 x=27
// 验算：顺流速30×2=60，逆流速24×2.5=60，路程相等 ✓
// 船Actor动画：顺流船向右，逆流船向左
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', RED = '#c62828', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 船actor引用
  var shipF = null; // 顺流船
  var shipB = null; // 逆流船

  var scene = {
    id: 's4',
    title: '四、顺流逆流',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) { S = stage; P = panel; shipF = null; shipB = null; },
    steps: [
      {
        // 步1：速度模型 + 数轴船动画
        narration: '好，回到开头的顺逆流问题。设静水速度 $x$ 千米/时，水流速度 3 千米/时。顺流时，水帮忙推，速度是 $x+3$；逆流时，水来阻挡，速度是 $x-3$。我们在数轴上用两艘船来表示——左边是起点，右边是终点，顺流船向右，逆流船向左。',
        enter: function (anim) {
          // 数轴
          S.addSegment('s4-axis', [-8.5, 1.0], [8.5, 1.0], { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr', [8.3, 1.2], [8.6, 1.0], { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-arr2', [8.3, 0.8], [8.6, 1.0], { color: INK, width: 2, dash: 0 });
          // 起点终点刻度
          S.addSegment('s4-tick-A', [-7.0, 0.7], [-7.0, 1.3], { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-tick-B', [7.0, 0.7], [7.0, 1.3], { color: INK, width: 2, dash: 0 });
          S.addText('s4-lab-A', -7.2, 0.2, '甲地', { color: INK, size: 15 });
          S.addText('s4-lab-B', 6.8, 0.2, '乙地', { color: INK, size: 15 });
          // 水速标注
          S.addText('s4-water', 0, -0.5, '水流方向 →  水速 $= 3$ 千米/时', { color: COOL, size: 16 });
          // 两艘船
          shipF = S.actor('s4-ship-f', -7.0, 3.2, '→ 顺流船', { color: TEAL, size: 20, bold: true });
          shipB = S.actor('s4-ship-b', 7.0, -1.5, '逆流船 ←', { color: WARM, size: 20, bold: true });
          // 速度标注
          S.actor('s4-sf-label', -7.0, 4.5, '顺流速度 $=(x+3)$ 千米/时', { color: TEAL, size: 16 });
          S.actor('s4-sb-label', 7.0, -2.8, '逆流速度 $=(x-3)$ 千米/时', { color: WARM, size: 16 });

          P.renderTable({
            head: ['状态', '速度（千米/时）'],
            rows: [
              ['静水速度', '$x$'],
              ['水流速度', '$3$'],
              ['顺流速度', '$x+3$'],
              ['逆流速度', '$x-3$'],
            ],
          });

          if (!anim) {
            return shipF.moveTo(7.0, 3.2, 0).then(function () {
              return shipB.moveTo(-7.0, -1.5, 0);
            });
          }
          return delay(400).then(function () {
            return shipF.moveTo(7.0, 3.2, 1200);
          }).then(function () {
            return shipB.moveTo(-7.0, -1.5, 1200);
          }).then(function () {
            return delay(300);
          });
        },
      },
      {
        // 步2：列方程（路程相等）
        narration: '两次走的是同一段路，路程相等——注意：是路程相等，不是时间相等！顺流时间 2 小时，速度 $(x+3)$，路程是 $2(x+3)$；逆流时间 2.5 小时，速度 $(x-3)$，路程是 $2.5(x-3)$。路程相等，列出方程：$2(x+3)=2.5(x-3)$。',
        enter: function (anim) {
          S.remove('s4-sf-label'); S.remove('s4-sb-label');
          S.actor('s4-eq-label', 0, 6.5, '等量关系：顺流路程 $=$ 逆流路程', { color: TEAL, size: 18, bold: true });
          S.actor('s4-forward-dist', -4.5, 5.0, '顺流路程 $= 2(x+3)$', { color: TEAL, size: 17 });
          S.actor('s4-back-dist', 4.5, 5.0, '逆流路程 $= 2.5(x-3)$', { color: WARM, size: 17 });
          S.actor('s4-eq', 0, 3.2, '$2(x+3) = 2.5(x-3)$', { color: COOL, size: 26, bold: true });
          P.renderCard(
            '<b>等量关系</b>：顺流路程 $=$ 逆流路程<br>' +
            '$2(x+3) = 2.5(x-3)$<br>' +
            '注意：是<b>路程相等</b>，不是时间相等！',
            'cool'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        // 步3：解方程
        narration: '现在来解这个方程。第一步去括号：左边 $2(x+3)$ 得 $2x+6$，右边 $2.5(x-3)$ 得 $2.5x-7.5$，方程变成 $2x+6=2.5x-7.5$。第二步移项：$2x-2.5x=-7.5-6$，得 $-0.5x=-13.5$。两边都是负数，除以 $-0.5$，两个负号抵消，$x=27$。',
        enter: function (anim) {
          S.remove('s4-eq-label'); S.remove('s4-forward-dist'); S.remove('s4-back-dist');
          S.remove('s4-eq');
          S.actor('s4-solve-title', 0, 6.8, '解方程 $2(x+3)=2.5(x-3)$', { color: COOL, size: 20, bold: true });
          S.actor('s4-s1', 0, 5.2, '去括号：$2x+6=2.5x-7.5$', { color: INK, size: 19 });
          S.actor('s4-s2', 0, 3.7, '移项：$2x-2.5x=-7.5-6$', { color: INK, size: 19 });
          S.actor('s4-s3', 0, 2.2, '合并：$-0.5x=-13.5$', { color: INK, size: 19 });
          S.actor('s4-s4', 0, 0.5, '两边除以 $-0.5$（负负得正）：', { color: INK, size: 17 });
          S.actor('s4-sol', 0, -1.2, '$x = 27$', { color: RED, size: 36, bold: true });
          P.renderCard(
            '<b>解方程过程</b><br>' +
            '去括号：$2x+6=2.5x-7.5$<br>' +
            '移项：$-0.5x=-13.5$<br>' +
            '系数化1（两负相除为正）：$x=27$'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        // 步4：验算 + 回答
        narration: '验算一下：顺流速度等于 $27+3=30$ 千米/时，2 小时路程等于 $30 \\times 2=60$ 千米；逆流速度等于 $27-3=24$ 千米/时，2.5 小时路程等于 $24 \\times 2.5=60$ 千米。两段路程都是 60 千米，相等！$x=27$ 正确。船在静水中的速度是 27 千米/时。',
        enter: function (anim) {
          S.remove('s4-solve-title'); S.remove('s4-s1'); S.remove('s4-s2');
          S.remove('s4-s3'); S.remove('s4-s4');
          S.actor('s4-check-title', 0, 6.5, '验算：$x=27$', { color: GREEN, size: 20, bold: true });
          S.actor('s4-ck1', -4, 4.8, '顺流速度 $=27+3=30$ 千米/时', { color: TEAL, size: 16 });
          S.actor('s4-ck2', -4, 3.4, '路程 $=30 \\times 2=60$ 千米', { color: TEAL, size: 16 });
          S.actor('s4-ck3', 4, 4.8, '逆流速度 $=27-3=24$ 千米/时', { color: WARM, size: 16 });
          S.actor('s4-ck4', 4, 3.4, '路程 $=24 \\times 2.5=60$ 千米', { color: WARM, size: 16 });
          S.actor('s4-ck5', 0, 1.8, '两段路程均为 60 千米，相等 ✓', { color: GREEN, size: 18, bold: true });
          S.actor('s4-ans', 0, 0.0, '船在静水中的速度为 $27$ 千米/时', { color: RED, size: 20, bold: true });
          P.renderCard(
            '<b>验算</b>：顺流 $30 \\times 2 = 60$，逆流 $24 \\times 2.5 = 60$，路程相等 ✓<br>' +
            '<b>答</b>：船在静水中的速度为 <b>27</b> 千米/时。',
            'teal',
            'tada'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
