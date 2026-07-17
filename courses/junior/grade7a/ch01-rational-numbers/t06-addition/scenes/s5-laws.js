// s5-laws.js  五、运算律与简便运算（4步）
// 数学验算：
//   交换律验证：(-3)+5=2；5+(-3)=2 ✓ 相等
//   结合律验证：[(-3)+(-5)]+(-2)=(-8)+(-2)=-10；(-3)+[(-5)+(-2)]=(-3)+(-7)=-10 ✓ 相等
//   凑整例：16+(-25)+24+(-35)
//     = [16+24]+[(-25)+(-35)]
//     = 40+(-60) = -20 ✓
//   凑零例：(-2.4)+3.5+2.4
//     = [(-2.4)+2.4]+3.5
//     = 0+3.5 = 3.5 ✓
//   练习：(-37)+48+37+(-48)
//     = [(-37)+37]+[48+(-48)]
//     = 0+0 = 0 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、运算律与简便运算',
    bbox: [-11, 9, 11, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：交换律和结合律验证
      {
        narration: '小学里我们知道3+5=5+3（交换律），(2+3)+4=2+(3+4)（结合律）。这两条规律对有理数还成立吗？先看交换律：(-3)+5和5+(-3)，分别算一下——异号，|5|>|-3|，取正，5-3=2；两个都等于2！再看结合律：[(-3)+(-5)]+(-2)=(-8)+(-2)=-10；(-3)+[(-5)+(-2)]=(-3)+(-7)=-10，也相等！结论：两条运算律在有理数范围内继续成立。',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.8, '<b>有理数加法运算律验证</b>', { color: COOL, size: 20 });
          // 交换律
          S.actor('s5-comm-t', 0, 6.3, '<b>交换律：</b>$a+b = b+a$ 对有理数成立？', { color: COOL, size: 17 });
          S.actor('s5-comm1', -5, 5.0, '$(-3)+5$', { color: INK, size: 17 });
          S.actor('s5-comm1v', -1, 5.0, '$=2$', { color: GREEN, size: 17 });
          S.actor('s5-comm2', 3, 5.0, '$5+(-3)$', { color: INK, size: 17 });
          S.actor('s5-comm2v', 7, 5.0, '$=2$ ✓', { color: GREEN, size: 17 });
          S.actor('s5-comm-res', 0, 3.9, '两个结果相等，<b>交换律成立！</b>', { color: COOL, size: 15 });
          // 结合律
          S.actor('s5-assoc-t', 0, 2.8, '<b>结合律：</b>$(a+b)+c = a+(b+c)$ 对有理数成立？', { color: WARM, size: 16 });
          S.actor('s5-assoc1', -5, 1.5, '$[(-3)+(-5)]+(-2)$', { color: INK, size: 15 });
          S.actor('s5-assoc1v', 1, 1.5, '$=(-8)+(-2)=-10$', { color: GREEN, size: 15 });
          S.actor('s5-assoc2', -5, 0.2, '$(-3)+[(-5)+(-2)]$', { color: INK, size: 15 });
          S.actor('s5-assoc2v', 1, 0.2, '$=(-3)+(-7)=-10$ ✓', { color: GREEN, size: 15 });
          S.actor('s5-assoc-res', 0, -1.0, '两个结果相等，<b>结合律成立！</b>', { color: WARM, size: 15 });
          P.renderCard(
            '<b>运算律在有理数中仍然成立</b><br>' +
            '<b>交换律</b>：$(-3)+5 = 5+(-3) = 2$ ✓<br>' +
            '<b>结合律</b>：$[(-3)+(-5)]+(-2) = (-3)+[(-5)+(-2)] = -10$ ✓'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 2：凑整例 16+(-25)+24+(-35)=-20
      {
        narration: '有了运算律，就可以做简便运算。看这道题：16+(-25)+24+(-35)。直接按顺序算比较麻烦。但注意到16和24可以凑整得40，(-25)和(-35)同号相加得-60。所以重新结合：[16+24]+[(-25)+(-35)]=40+(-60)=-20。凑整的关键是先观察，再改变顺序。',
        enter: function (anim) {
          S.remove('s5-title');
          S.remove('s5-comm-t'); S.remove('s5-comm1'); S.remove('s5-comm1v');
          S.remove('s5-comm2'); S.remove('s5-comm2v'); S.remove('s5-comm-res');
          S.remove('s5-assoc-t'); S.remove('s5-assoc1'); S.remove('s5-assoc1v');
          S.remove('s5-assoc2'); S.remove('s5-assoc2v'); S.remove('s5-assoc-res');

          S.actor('s5-int-t', 0, 7.8, '<b>简便运算——凑整</b>', { color: COOL, size: 20 });
          S.actor('s5-int-q', 0, 6.3, '$16+(-25)+24+(-35)$', { color: INK, size: 22 });
          // 四张"卡片"用actor表示，然后展示配对
          S.actor('s5-c1', -7, 4.5, '$16$', { color: COOL, size: 22 });
          S.actor('s5-c2', -3, 4.5, '$(-25)$', { color: WARM, size: 22 });
          S.actor('s5-c3', 1, 4.5, '$24$', { color: COOL, size: 22 });
          S.actor('s5-c4', 5, 4.5, '$(-35)$', { color: WARM, size: 22 });
          // 配对提示
          S.addSegment('s5-br1', [-7, 3.7], [1, 3.7], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s5-br2', [-3, 3.2], [5, 3.2], { color: WARM, width: 2, dash: 0 });
          S.actor('s5-br1-lab', -3, 3.7, '凑整 +40', { color: COOL, size: 14 });
          S.actor('s5-br2-lab', 1, 3.2, '凑整 -60', { color: WARM, size: 14 });
          S.actor('s5-int-step1', 0, 2.0, '$= [16+24]+[(-25)+(-35)]$', { color: INK, size: 19 });
          S.actor('s5-int-step2', 0, 0.8, '$= 40+(-60)$', { color: INK, size: 19 });
          S.addSegment('s5-int-line', [-8, 0.0], [8, 0.0], { color: INK, width: 2, dash: 0 });
          S.actor('s5-int-res', 0, -1.2, '$= \\mathbf{-20}$', { color: GREEN, size: 26 });
          P.renderCard(
            '<b>凑整：$16+(-25)+24+(-35)$</b><br>' +
            '$= [16+24]+[(-25)+(-35)]$<br>' +
            '$= 40+(-60)$<br>' +
            '$= \\mathbf{-20}$',
            'cool'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 3：凑零例 (-2.4)+3.5+2.4=3.5
      {
        narration: '再看凑零例：(-2.4)+3.5+2.4。注意(-2.4)和2.4互为相反数！把它们凑在一起先算：[(-2.4)+2.4]+3.5=0+3.5=3.5。凑零比凑整更简单，一眼就能看出来。',
        enter: function (anim) {
          S.remove('s5-int-t'); S.remove('s5-int-q');
          S.remove('s5-c1'); S.remove('s5-c2'); S.remove('s5-c3'); S.remove('s5-c4');
          S.remove('s5-br1'); S.remove('s5-br2'); S.remove('s5-br1-lab'); S.remove('s5-br2-lab');
          S.remove('s5-int-step1'); S.remove('s5-int-step2'); S.remove('s5-int-line'); S.remove('s5-int-res');

          S.actor('s5-z-t', 0, 7.8, '<b>简便运算——凑零</b>', { color: TEAL, size: 20 });
          S.actor('s5-z-q', 0, 6.3, '$(-2.4)+3.5+2.4$', { color: INK, size: 22 });
          // 三张卡片
          S.actor('s5-zc1', -5, 4.5, '$(-2.4)$', { color: WARM, size: 22 });
          S.actor('s5-zc2', 0, 4.5, '$3.5$', { color: COOL, size: 22 });
          S.actor('s5-zc3', 5, 4.5, '$2.4$', { color: WARM, size: 22 });
          // 相反数配对
          S.addSegment('s5-zbr', [-5, 3.7], [5, 3.7], { color: TEAL, width: 2, dash: 0 });
          S.actor('s5-zbr-lab', 0, 3.7, '互为相反数，先凑零！', { color: TEAL, size: 14 });
          S.actor('s5-z-step1', 0, 2.5, '$= [(-2.4)+2.4]+3.5$', { color: INK, size: 19 });
          S.actor('s5-z-step2', 0, 1.3, '$= 0+3.5$', { color: INK, size: 19 });
          S.addSegment('s5-z-line', [-8, 0.5], [8, 0.5], { color: INK, width: 2, dash: 0 });
          S.actor('s5-z-res', 0, -0.7, '$= \\mathbf{3.5}$', { color: GREEN, size: 28 });
          P.renderCard(
            '<b>凑零：$(-2.4)+3.5+2.4$</b><br>' +
            '发现 $(-2.4)$ 与 $2.4$ 互为相反数！<br>' +
            '$= [(-2.4)+2.4]+3.5 = 0+3.5 = \\mathbf{3.5}$',
            'teal'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 4：课堂练习 (-37)+48+37+(-48)=0 揭晓
      {
        narration: '课堂练习：(-37)+48+37+(-48)等于多少？大家在本子上独立算一算。先找配对：(-37)和37互为相反数得0，48和(-48)也互为相反数得0！所以[(-37)+37]+[48+(-48)]=0+0=0！两对相反数全部凑零，结果为0。',
        enter: function (anim) {
          S.remove('s5-z-t'); S.remove('s5-z-q');
          S.remove('s5-zc1'); S.remove('s5-zc2'); S.remove('s5-zc3');
          S.remove('s5-zbr'); S.remove('s5-zbr-lab');
          S.remove('s5-z-step1'); S.remove('s5-z-step2'); S.remove('s5-z-line'); S.remove('s5-z-res');

          S.actor('s5-pr-t', 0, 7.8, '<b>课堂练习</b>', { color: INK, size: 20 });
          S.actor('s5-pr-q', 0, 6.3, '$(-37)+48+37+(-48) = ?$', { color: INK, size: 22 });
          // 四个数的卡片
          S.actor('s5-pr-c1', -7, 4.5, '$(-37)$', { color: WARM, size: 22 });
          S.actor('s5-pr-c2', -3, 4.5, '$48$', { color: COOL, size: 22 });
          S.actor('s5-pr-c3', 1, 4.5, '$37$', { color: WARM, size: 22 });
          S.actor('s5-pr-c4', 5, 4.5, '$(-48)$', { color: COOL, size: 22 });
          // 配对1
          S.addSegment('s5-pr-br1', [-7, 3.7], [1, 3.7], { color: TEAL, width: 2.5, dash: 0 });
          S.actor('s5-pr-br1-lab', -3, 3.7, '相反数 → 0', { color: TEAL, size: 14 });
          // 配对2
          S.addSegment('s5-pr-br2', [-3, 3.2], [5, 3.2], { color: TEAL, width: 2.5, dash: 0 });
          S.actor('s5-pr-br2-lab', 1, 3.2, '相反数 → 0', { color: TEAL, size: 14 });
          S.actor('s5-pr-step', 0, 2.0, '$= [(-37)+37]+[48+(-48)]$', { color: INK, size: 18 });
          S.actor('s5-pr-step2', 0, 0.8, '$= 0 + 0$', { color: INK, size: 18 });
          S.addSegment('s5-pr-line', [-8, 0.0], [8, 0.0], { color: INK, width: 2, dash: 0 });
          S.actor('s5-pr-res', 0, -1.2, '$= \\mathbf{0}$', { color: GREEN, size: 32 });
          P.renderCard(
            '<b>练习揭晓：$(-37)+48+37+(-48) = 0$</b><br>' +
            '$(-37)+37=0$，$48+(-48)=0$，<br>' +
            '两对相反数全部凑零！结果 $= \\mathbf{0}$',
            'teal',
            'tada'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
