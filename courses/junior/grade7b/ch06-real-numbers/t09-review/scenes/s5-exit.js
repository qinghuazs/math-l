// s5-exit.js  八句话与出口（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画学习主线图（从乘方逆运算 → 平方根 → 无理数 → 实数体系 → 数轴 → 运算）
  function drawMainLine() {
    var nodes = [
      { x: -7.5, y: 2.0, label: '乘方\n逆运算', color: BLUE },
      { x: -3.5, y: 4.5, label: '平方根\n立方根', color: ORANGE },
      { x:  1.0, y: 4.5, label: '无理数\n诞生', color: RED },
      { x:  5.5, y: 4.5, label: '实数\n体系', color: PURPLE },
      { x:  8.0, y: 2.0, label: '数轴 +\n运算', color: TEAL },
    ];
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      S.addCircle('ml-c' + i, n.x, n.y, 1.3,
        { color: n.color, width: 2.5, fill: n.color, fillOpacity: 0.10 });
      var lines = n.label.split('\n');
      S.addText('ml-t' + i + 'a', n.x, n.y + 0.3, lines[0], { size: 13, color: n.color, anchorX: 'middle' });
      S.addText('ml-t' + i + 'b', n.x, n.y - 0.5, lines[1], { size: 13, color: n.color, anchorX: 'middle' });
    }
    // 连接线（节点间）
    S.addSegment('ml-a1', [-6.2, 2.8], [-4.8, 3.8], { color: INK, width: 1.5, dash: 2 });
    S.addSegment('ml-a2', [-2.2, 4.5], [-0.3, 4.5], { color: INK, width: 1.5, dash: 2 });
    S.addSegment('ml-a3', [2.3, 4.5], [4.2, 4.5], { color: INK, width: 1.5, dash: 2 });
    S.addSegment('ml-a4', [6.8, 3.8], [7.3, 2.8], { color: INK, width: 1.5, dash: 2 });
    S.addText('ml-hd', -0.5, 7.0, '本章学习主线', { size: 16, color: INK, anchorX: 'middle' });
    S.addText('ml-sub', -0.5, 6.2,
      '从乘方的逆运算出发，发现有理数的不足，引入无理数，建立实数体系',
      { size: 12, color: INK, anchorX: 'middle' });
  }

  var scene = {
    id: 's5',
    title: '五、八句话与收官',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：八句话前四句
        narration: '现在来看本章最重要的八句话——这是整章精髓，也是考场拿分的保障。前四句：第一，"正数有两个平方根，但只有一个算术平方根"——这是最高频的考点；第二，"根号 $\\sqrt{a}$ 表示非负的算术平方根"——根号结果恒非负；第三，"$0$ 的平方根和算术平方根都是 $0$"——$0$ 是特例，注意不要遗漏；第四，"负数没有平方根，但有立方根"——立方根的定义域是全体实数！',
        enter: function (anim) {
          P.renderCard(
            '<b>本章八句话（前 4 句）</b><br>' +
            '<ol style="margin:8px 0 0 16px;line-height:2.2">' +
            '<li>正数有<b>两个</b>平方根，但只有<b>一个</b>算术平方根。</li>' +
            '<li>根号 $\\sqrt{a}$ 表示<b>非负</b>的算术平方根。</li>' +
            '<li>$0$ 的平方根和算术平方根<b>都是 $0$</b>。</li>' +
            '<li>负数<b>没有</b>平方根，但<b>有</b>立方根。</li>' +
            '</ol>'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：八句话后四句（tada 收官效果）
        narration: '后四句：第五，"带根号的数不一定是无理数"——$\\sqrt{16}=4$ 是有理数；第六，"无限小数不一定是无理数，关键要看是否循环"——循环的是有理数；第七，"实数与数轴上的点是一一对应的"——有理数覆盖了数轴上的"大多数"点，但剩下的空隙全是无理数填满的；第八，"估算根式时，应先寻找相邻的完全平方数或完全立方数"——这是估算的标准方法。八句话全部记住，本章就胜券在握！',
        enter: function (anim) {
          P.renderCard(
            '<b>本章八句话（后 4 句）</b><br>' +
            '<ol start="5" style="margin:8px 0 0 16px;line-height:2.2">' +
            '<li>带根号的数<b>不一定</b>是无理数。</li>' +
            '<li>无限小数<b>不一定</b>是无理数，关键看<b>是否循环</b>。</li>' +
            '<li>实数与数轴上的点<b>一一对应</b>。</li>' +
            '<li>估算根式：先找相邻的<b>完全平方数</b>（或完全立方数）。</li>' +
            '</ol>',
            'default',
            'tada'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：出口题 + 单元学习闭环卡
        narration: '最后是出口题，也是本章的闭环检验。六道题：第一题，$16$ 的平方根是 $\\pm4$；第二题，$\\sqrt{16}=4$；第三题，$\\sqrt[3]{-27}=-3$；第四题，$\\sqrt{4}=2$ 是有理数，$\\sqrt{5}$ 是无理数，$\\pi$ 是无理数，$0.25$ 是有理数，所以无理数有 $\\sqrt{5}$ 和 $\\pi$；第五题，$2.7^2=7.29>7$，故 $\\sqrt{7}<2.7$；第六题，$\\sqrt{9}=3$，$3$ 是整数，是有理数，所以 $\\sqrt{9}$ 不是无理数。同学们，这一章我们圆满完成了！',
        enter: function (anim) {
          drawMainLine();
          P.renderCard(
            '<b>单元出口题·参考答案</b><br>' +
            '<ol style="margin:6px 0 0 14px;line-height:1.95;font-size:13px">' +
            '<li>$16$ 的平方根 $=\\pm4$</li>' +
            '<li>$\\sqrt{16}=4$</li>' +
            '<li>$\\sqrt[3]{-27}=-3$</li>' +
            '<li>无理数有：$\\sqrt{5}$、$\\pi$（$\\sqrt{4}=2$ 和 $0.25$ 是有理数）</li>' +
            '<li>$2.7^2=7.29>7$，∴ $\\sqrt{7}<2.7$</li>' +
            '<li>$\\sqrt{9}=3$，$3$ 是整数→有理数，∴ $\\sqrt{9}$ 不是无理数</li>' +
            '</ol>' +
            '<br><b style="color:#00695c;font-size:14px">第六章 · 实数 · 圆满收官！</b>',
            'cool'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
