(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a', AMBER = '#f57f17';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错辨析与课堂小结',
    bbox: [-6, 10, 6, -4],
    board: { axis: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '学完平方根，我们来辨析两个最常见的错误。第一个：有人说"$25$ 的平方根是 $5$"——这句话对吗？',
        enter: function (anim) {
          S.addText('s6-err-title', 0, 9, '易错辨析', { color: WARM, size: 22, anchorX: 'middle' });

          // 易错 1
          S.addText('s6-err1-q', -5, 7.5, '判断：$25$ 的平方根是 $5$。（对还是错？）', { color: INK, size: 17 });

          P.renderCard('思考：$25$ 的平方根有几个？分别是什么？<br><br>提示：$5^2 = 25$，$(-5)^2 = 25$');
          if (anim) { return delay(400); }
        },
      },
      {
        narration: '这句话是<b>错误的</b>！$25$ 的平方根是 $\\pm 5$（两个），不能只写 $5$，漏掉 $-5$ 就错了。第二个易错：有人说"$-4$ 有平方根"——这又对吗？任何实数的平方都大于等于零，所以 $-4$ 在实数范围内<b>没有平方根</b>。',
        enter: function (anim) {
          S.addText('s6-err-title', 0, 9, '易错辨析', { color: WARM, size: 22, anchorX: 'middle' });

          // 易错 1 判断
          S.addText('s6-err1-q', -5, 7.8, '判断：$25$ 的平方根是 $5$。', { color: INK, size: 16 });
          S.addText('s6-err1-wrong', -5, 6.8, '✗ 错！遗漏了 $-5$', { color: WARM, size: 16 });
          S.addText('s6-err1-right', -5, 5.8, '✓ 正确：$25$ 的平方根是 $\\pm 5$（两个）', { color: GREEN, size: 16 });

          // 易错 2
          S.addText('s6-err2-q', -5, 4.5, '判断：$-4$ 有平方根。', { color: INK, size: 16 });
          S.addText('s6-err2-wrong', -5, 3.5, '✗ 错！实数的平方 $\\geq 0$', { color: WARM, size: 16 });
          S.addText('s6-err2-right', -5, 2.5, '✓ 正确：$-4$ 在实数范围内没有平方根', { color: GREEN, size: 16 });

          // 易错 3：混淆平方根与算术平方根
          S.addText('s6-err3-q', -5, 1.5, '注意：$\\sqrt{25} = 5$（算术平方根，只取正）', { color: COOL, size: 15 });
          S.addText('s6-err3-r', -5, 0.5, '而 $25$ 的平方根 $= \\pm 5$（两个）', { color: COOL, size: 15 });

          P.renderCard(
            '<b>易错总结</b><br>' +
            '① 正数的平方根有 <b>2 个</b>，不要漏掉负根<br>' +
            '② 负数在实数范围内<b>没有</b>平方根<br>' +
            '③ $\\sqrt{a}$ 是算术平方根（$\\geq 0$）；平方根是 $\\pm\\sqrt{a}$（两个）'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '最后做本节课的整体小结。这节课我们学习了平方根与开平方的核心知识，包括定义、三种分类情况、根号记法和互逆运算关系。这是整个实数单元的基础，后续学习无理数和实数运算都要用到。',
        enter: function (anim) {
          P.renderTable({
            head: ['知识点', '内容'],
            rows: [
              ['平方根定义', '若 $x^2 = a$，则 $x$ 是 $a$ 的平方根'],
              ['正数', '有两个平方根（$\\pm\\sqrt{a}$），互为相反数'],
              ['零', '只有一个平方根：$0$'],
              ['负数', '实数范围内没有平方根'],
              ['开平方', '求平方根的运算，与平方互为逆运算'],
              ['算术平方根', '$\\sqrt{a}$（非负，$a \\geq 0$）']
            ]
          });
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
