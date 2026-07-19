// s3-solve.js  环节三：例1 分步解方程（4步）
// 例1：2(x-1)-(x+2)=3(4-x)
// 步1去括号：2x-2-x-2=12-3x
//   2(x-1)=2x-2; -(x+2)=-x-2; 3(4-x)=12-3x
// 步2合并：x-4=12-3x（左：2x-x=x, -2-2=-4）
// 步3移项：x+3x=12+4（-3x飞到左变+3x，-4飞到右变+4）
// 步4化1：4x=16 → x=4
// 验算：左=2(4-1)-(4+2)=2×3-6=6-6=0；右=3(4-4)=3×0=0；左=右 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', RED = '#c62828', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 飞行actor引用（移项动画主角）
  var moverL = null; // -3x 从右飞到左变 +3x
  var moverR = null; // -4 从左飞到右变 +4

  var scene = {
    id: 's3',
    title: '三、例1 分步解方程',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) { S = stage; P = panel; moverL = null; moverR = null; },
    steps: [
      {
        // 步1：去括号
        narration: '好，现在来解例1。方程是 $2(x-1)-(x+2)=3(4-x)$。第一步：去括号。$2(x-1)$，系数 2 乘每一项，得 $2x-2$；$-(x+2)$，括号前是负号，两项都变，得 $-x-2$；右边 $3(4-x)$，系数 3 乘每一项，得 $12-3x$。展开后写出来：$2x-2-x-2=12-3x$。',
        enter: function (anim) {
          S.actor('s3-orig', 0, 7.0, '$2(x-1)-(x+2)=3(4-x)$', { color: INK, size: 22, bold: true });
          S.actor('s3-step1-label', -7, 5.5, '第1步  去括号：', { color: COOL, size: 17, bold: true });
          S.actor('s3-exp1', -3.5, 4.0, '$2(x-1)=2x-2$', { color: TEAL, size: 18 });
          S.actor('s3-exp2', 3.5, 4.0, '$-(x+2)=-x-2$', { color: WARM, size: 18 });
          S.actor('s3-exp3', 0, 2.5, '$3(4-x)=12-3x$', { color: ORANGE, size: 18 });
          S.actor('s3-result1', 0, 0.8, '$2x-2-x-2 = 12-3x$', { color: COOL, size: 24, bold: true });
          P.renderCard(
            '<b>第1步：去括号</b><br>' +
            '$2(x-1)$ → $2x-2$（系数 2 乘每项）<br>' +
            '$-(x+2)$ → $-x-2$（负号括号，全变号）<br>' +
            '$3(4-x)$ → $12-3x$（系数 3 乘每项）'
          );
          if (!anim) { return null; }
          return delay(500);
        },
      },
      {
        // 步2：合并同类项
        narration: '第二步：合并同类项。左边 $2x-x=x$，$-2-2=-4$，合并得 $x-4$；右边 $12-3x$ 已经不能合并，就是 $x-4=12-3x$。这跟我们上节课 3.3 移项学的方程形式一样了，下一步就可以移项！',
        enter: function (anim) {
          S.remove('s3-step1-label'); S.remove('s3-exp1'); S.remove('s3-exp2'); S.remove('s3-exp3');
          S.actor('s3-step2-label', -7, 5.5, '第2步  合并同类项：', { color: COOL, size: 17, bold: true });
          S.actor('s3-comb-left', -3.5, 3.5, '左边：$2x-x=x$，$-2-2=-4$', { color: TEAL, size: 17 });
          S.actor('s3-result2', 0, 1.5, '$x-4 = 12-3x$', { color: COOL, size: 28, bold: true });
          P.renderCard(
            '<b>第2步：合并同类项</b><br>' +
            '左边：$2x - x = x$；$-2-2 = -4$<br>' +
            '右边：已合并<br>' +
            '结果：$x-4 = 12-3x$'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        // 步3：移项（飞越等号动画，复用3.1节视效）
        narration: '第三步：移项。把含 $x$ 的项都移到左边，常数项移到右边。右边的 $-3x$ 移到左边变成 $+3x$；左边的 $-4$ 移到右边变成 $+4$。移项必须变号，这是 3.3 节的规则。结果：$x+3x=12+4$。',
        enter: function (anim) {
          S.remove('s3-step2-label'); S.remove('s3-comb-left');
          S.actor('s3-step3-label', -7, 5.5, '第3步  移项：', { color: COOL, size: 17, bold: true });

          // 方程各部分
          S.actor('s3-mv-x', -5.5, 1.5, 'x', { color: INK, size: 28, bold: true });
          moverR = S.actor('s3-mv-m4', -3.5, 1.5, '- 4', { color: WARM, size: 28, bold: true });
          S.actor('s3-mv-eq', -1.5, 1.5, '=', { color: INK, size: 28, bold: true });
          S.actor('s3-mv-12', 0.5, 1.5, '12', { color: INK, size: 28, bold: true });
          moverL = S.actor('s3-mv-m3x', 3.5, 1.5, '- 3x', { color: WARM, size: 28, bold: true });

          if (!anim) {
            // 快放：直接呈现移项后结果
            return moverL.moveTo(-2.5, 1.5, 0).then(function () {
              moverL.obj.setText('+ 3x');
              return moverR.moveTo(3.0, 1.5, 0);
            }).then(function () {
              moverR.obj.setText('+ 4');
              S.actor('s3-result3', 0, -1.0, '$x+3x = 12+4$', { color: COOL, size: 28, bold: true });
              P.renderCard(
                '<b>第3步：移项</b>（移项必须变号）<br>' +
                '$-3x$ 移到左边 → $+3x$<br>' +
                '$-4$ 移到右边 → $+4$<br>' +
                '结果：$x+3x=12+4$'
              );
              return null;
            });
          }

          // 动画：-3x 飞越等号到左边
          return moverL.moveTo(-1.5, 3.5, 600).then(function () {
            return moverL.moveTo(-2.5, 1.5, 600);
          }).then(function () {
            moverL.obj.setText('+ 3x');
            S.getBoard().update();
            // -4 飞越等号到右边
            return moverR.moveTo(-1.5, -0.5, 600);
          }).then(function () {
            return moverR.moveTo(3.0, 1.5, 600);
          }).then(function () {
            moverR.obj.setText('+ 4');
            S.getBoard().update();
            S.actor('s3-result3', 0, -1.0, '$x+3x = 12+4$', { color: COOL, size: 28, bold: true });
            P.renderCard(
              '<b>第3步：移项</b>（移项必须变号）<br>' +
              '$-3x$ 移到左边 → $+3x$<br>' +
              '$-4$ 移到右边 → $+4$<br>' +
              '结果：$x+3x=12+4$',
              'cool'
            );
            return delay(300);
          });
        },
      },
      {
        // 步4：系数化1 + 验算
        narration: '第四步：合并并系数化 1。左边 $x+3x=4x$，右边 $12+4=16$，得到 $4x=16$，两边除以 4，$x=4$。最后验算：代入原方程左边等于 $2(4-1)-(4+2)=2 \\times 3-6=6-6=0$；右边等于 $3(4-4)=3 \\times 0=0$，左边等于右边，所以 $x=4$ 是方程的解，验算正确！',
        enter: function (anim) {
          S.remove('s3-step3-label'); S.remove('s3-mv-x'); S.remove('s3-mv-m4');
          S.remove('s3-mv-eq'); S.remove('s3-mv-12'); S.remove('s3-mv-m3x');
          S.remove('s3-result3');
          S.actor('s3-step4-label', -7, 6.0, '第4步  系数化1：', { color: COOL, size: 17, bold: true });
          S.actor('s3-comb2', 0, 4.5, '$4x = 16$', { color: COOL, size: 26, bold: true });
          S.actor('s3-sol', 0, 2.8, '$x = 4$', { color: RED, size: 34, bold: true });
          S.actor('s3-check-label', -7, 1.0, '验算：', { color: TEAL, size: 17, bold: true });
          S.actor('s3-check1', 0, -0.2, '左 $=2(4-1)-(4+2)=6-6=0$', { color: INK, size: 17 });
          S.actor('s3-check2', 0, -1.5, '右 $=3(4-4)=3 \\times 0=0$', { color: INK, size: 17 });
          S.actor('s3-check3', 0, -2.8, '左 $=$ 右 ✓', { color: GREEN, size: 20, bold: true });
          P.renderCard(
            '<b>第4步：系数化为1</b><br>' +
            '$4x=16 \\Rightarrow x=4$<br>' +
            '<b>验算</b>：代入原方程，左边 $=0$，右边 $=0$<br>' +
            '$\\therefore x=4$ 是方程的解',
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
