// s3-cautions.js  环节三：两大坑（4步）
// 数学验算：
//   坑一错解：x/2+1=3，只乘含分母项得 x+1=6，x=5；验算：5/2+1=3.5≠3（错误）
//   坑一正解：x/2+1=3，两边乘2：x+2=6，x=4；验算：4/2+1=3 ✓
//   坑二错解：(x+3)/4=2，漏括号写 x+3×4=8 即 x+12=8，x=-4；验算：(-4+3)/4=-1/4≠2（错误）
//   坑二正解：(x+3)/4=2，两边乘4：(x+3)=8，x=5；验算：(5+3)/4=2 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var RED = '#c62828', GREEN = '#2e7d32', ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、两大坑',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '去分母有两大坑，今天我们要亲手踩一踩，看看错在哪里。先看坑一——漏乘不含分母的项。方程 x 除以 2 加 1 等于 3，有同学两边乘 2 时，只乘了含分母的那项，而跳过了整数 1，写成 x 加 1 等于 6，解出 x 等于 5。这对吗？我们来验算一下！',
        enter: function (anim) {
          S.actor('s3-pit1-title', 0, 7.2, '坑一：漏乘不含分母的项', { color: RED, size: 22, bold: true });
          S.actor('s3-pit1-eq', 0, 5.8,
            '方程：$\\dfrac{x}{2} + 1 = 3$',
            { color: COOL, size: 24, bold: true });
          S.actor('s3-wrong-title', -5, 4.0, '❌ 错解', { color: RED, size: 18, bold: true });
          var wrongs = [
            ['s3-w1', -5, 2.8, '两边乘 $2$，只乘含分母项：'],
            ['s3-w2', -5, 1.6, '$x + 1 = 6$'],
            ['s3-w3', -5, 0.4, '$x = 5$'],
            ['s3-w4', -5, -1.0, '验算：$\\dfrac{5}{2}+1=3.5 \\neq 3$'],
            ['s3-w5', -5, -2.4, '错了！漏乘了 1！'],
          ];
          var wcolors = [INK, RED, RED, RED, WARM];
          var wsizes = [15, 19, 22, 16, 17];
          var p = Promise.resolve();
          wrongs.forEach(function (it, i) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: wcolors[i], size: wsizes[i] });
              return anim ? delay(350) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>坑一：漏乘</b><br>' +
              '错解：只乘含分母的项，常数项 $1$ 被漏掉！<br>' +
              '代入验算：$\\dfrac{5}{2}+1=3.5 \\neq 3$，结果不对。<br>' +
              '错误根源：没有"每一项都乘"。',
              'warm'
            );
          });
        },
      },
      {
        narration: '正解是这样的：两边每一项都要乘 2，包括那个 1！2 乘 x 除以 2 得 x，2 乘 1 得 2，2 乘 3 得 6，所以 x 加 2 等于 6，x 等于 4。验算：4 除以 2 加 1 等于 3，完全正确！关键在于：等式性质 2 说的是"两边同乘"——是每一项、一项都不能落下！',
        enter: function (anim) {
          S.actor('s3-right-title', 5, 4.0, '✓ 正解', { color: GREEN, size: 18, bold: true });
          var rights = [
            ['s3-r1', 5, 2.8, '两边每项都乘 $2$：'],
            ['s3-r2', 5, 1.6, '$x + 2 = 6$'],
            ['s3-r3', 5, 0.4, '$x = 4$'],
            ['s3-r4', 5, -1.0, '验算：$\\dfrac{4}{2}+1=3$ ✓'],
            ['s3-r5', 5, -2.4, '正确！'],
          ];
          var rcolors = [INK, COOL, GREEN, GREEN, GREEN];
          var rsizes = [15, 19, 22, 16, 17];
          var p = Promise.resolve();
          rights.forEach(function (it, i) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: rcolors[i], size: rsizes[i] });
              return anim ? delay(350) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>正解</b><br>' +
              '不含分母的整式项和常数项，<b>也必须乘 LCM</b>！<br>' +
              '$2 \\cdot \\dfrac{x}{2} + 2 \\cdot 1 = 2 \\cdot 3$<br>' +
              '$\\Rightarrow x+2=6 \\Rightarrow x=4$，验算 ✓',
              'teal'
            );
          });
        },
      },
      {
        narration: '第二个坑：分子是多项式时，乘完 LCM 后一定要加括号，否则展开时符号会出错。看这个方程：x 加 3 的商除以 4 等于 2，分子是 x 加 3，两项。有同学去分母时漏了括号，写成 x 加 3 乘以 4 等于 8，即 x 加 12 等于 8，x 等于负 4。我们验算一下看看！',
        enter: function (anim) {
          S.remove('s3-pit1-title'); S.remove('s3-pit1-eq');
          S.remove('s3-wrong-title'); S.remove('s3-w1'); S.remove('s3-w2');
          S.remove('s3-w3'); S.remove('s3-w4'); S.remove('s3-w5');
          S.remove('s3-right-title'); S.remove('s3-r1'); S.remove('s3-r2');
          S.remove('s3-r3'); S.remove('s3-r4'); S.remove('s3-r5');

          S.actor('s3-pit2-title', 0, 7.2, '坑二：分子多项式漏加括号', { color: RED, size: 22, bold: true });
          S.actor('s3-pit2-eq', 0, 5.8,
            '方程：$\\dfrac{x+3}{4} = 2$',
            { color: COOL, size: 24, bold: true });
          S.actor('s3-w2-title', -5, 4.0, '❌ 错解', { color: RED, size: 18, bold: true });
          var wrongs2 = [
            ['s3-p2w1', -5, 2.8, '两边乘 $4$，漏了括号：'],
            ['s3-p2w2', -5, 1.6, '$x + 3 \\times 4 = 8$'],
            ['s3-p2w3', -5, 0.3, '$x + 12 = 8$'],
            ['s3-p2w4', -5, -1.0, '$x = -4$'],
            ['s3-p2w5', -5, -2.4, '验算：$\\dfrac{-4+3}{4}=-\\dfrac{1}{4} \\neq 2$'],
          ];
          var wc2 = [INK, RED, RED, RED, RED];
          var ws2 = [15, 19, 18, 22, 16];
          var p = Promise.resolve();
          wrongs2.forEach(function (it, i) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: wc2[i], size: ws2[i] });
              return anim ? delay(350) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>坑二：漏括号</b><br>' +
              '分子 $x+3$ 是多项式，乘 $4$ 后应写 $(x+3)$，<br>' +
              '漏加括号导致 $3 \\times 4=12$，完全算错！<br>' +
              '代入验算：$\\dfrac{-4+3}{4}=-\\dfrac{1}{4} \\neq 2$。',
              'warm'
            );
          });
        },
      },
      {
        narration: '正解：4 乘以 x 加 3 除以 4，分母被约掉，分子加括号得 x 加 3，等于 8，所以 x 等于 5。验算：5 加 3 等于 8，除以 4 等于 2，完全正确！记住这两大坑的口诀：不漏乘，要括号！',
        enter: function (anim) {
          S.actor('s3-r2-title', 5, 4.0, '✓ 正解', { color: GREEN, size: 18, bold: true });
          var rights2 = [
            ['s3-p2r1', 5, 2.8, '两边乘 $4$，加括号：'],
            ['s3-p2r2', 5, 1.6, '$4 \\cdot \\dfrac{x+3}{4} = 4 \\cdot 2$'],
            ['s3-p2r3', 5, 0.3, '$(x+3) = 8$'],
            ['s3-p2r4', 5, -1.0, '$x = 5$'],
            ['s3-p2r5', 5, -2.4, '验算：$\\dfrac{5+3}{4}=2$ ✓'],
          ];
          var rc2 = [INK, COOL, COOL, GREEN, GREEN];
          var rs2 = [15, 17, 19, 22, 16];
          var p = Promise.resolve();
          rights2.forEach(function (it, i) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: rc2[i], size: rs2[i] });
              return anim ? delay(350) : Promise.resolve();
            });
          });
          return p.then(function () {
            P.renderCard(
              '<b>两大坑口诀</b><br>' +
              '①<b>不漏乘</b>：每一项都要同乘 LCM，<br>' +
              '整数项、整式项一个不能落下！<br>' +
              '②<b>要括号</b>：分子是多项式，乘后先加括号再展开！',
              'teal',
              'headShake'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
