// 环节五：五、易错大扫除
// 四坑判断题（已验算）：
// ①移项不变号：3x-5=x+1 移项应得 3x-x=1+5 → 2x=6 → x=3（不是 3x+x=1+5）
// ②去分母漏乘常数：x/3-1=x/2 两边×6 → 2x-6=3x（-1乘以6得-6，不是-1）→ x=-6
// ③去括号漏变号：-(x-3)=-x+3（不是-x-3）
// ④解完不检验：含分母方程须检验增根；标准规范要求必须检验
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';
  var RED = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、易错大扫除',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '接下来是易错大扫除！下面四道判断题，精准命中全章最高频失分点。请先独立判断——对还是错？然后说出"错在哪一步，怎么改"。准备好了吗？30 秒思考时间，开始！',
        enter: function (anim) {
          S.actor('s5-title', 0, 7.0, '易错大扫除：判断对错', { color: WARM, size: 20, bold: true });
          S.actor('s5-q1', 0, 5.2,
            '① 解 $3x-5=x+1$，移项得 $3x+x=1+5$。（对/错？）',
            { color: INK, size: 15 });
          S.actor('s5-q2', 0, 3.6,
            '② 解 $\\dfrac{x}{3}-1=\\dfrac{x}{2}$，两边乘 6 后得 $2x-1=3x$。（对/错？）',
            { color: INK, size: 15 });
          S.actor('s5-q3', 0, 2.0,
            '③ $-(x-3)=-x-3$。（对/错？）',
            { color: INK, size: 15 });
          S.actor('s5-q4', 0, 0.4,
            '④ 解完方程直接写答案，不需要代入检验。（对/错？）',
            { color: INK, size: 15 });
          P.renderCard(
            '<b>四道判断题（30 秒思考）</b><br>' +
            '①②③④ 各判断对错，并说出错在哪一步、如何改正。<br>' +
            '提示：四道题覆盖四大最高频失分点。'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '揭晓答案！第一题错误：x 从右边移到左边要变号，应该是 3x 减 x，不是 3x 加 x。正确过程：移项得 3x 减 x 等于 1 加 5，即 2x 等于 6，x 等于 3。第二题错误：常数项负 1 也必须乘以 6，得负 6，正确是 2x 减 6 等于 3x，所以 x 等于负 6。第三题错误：括号前是负号，括号内每项都要变号，负 x 减 3 中的负 3 要变成正 3，所以是负 x 加 3。第四题错误：解完方程必须代入原方程检验，这是规范要求，不是可选步骤！',
        enter: function (anim) {
          S.remove('s5-q1'); S.remove('s5-q2'); S.remove('s5-q3'); S.remove('s5-q4');
          // 四条纠错
          S.actor('s5-a1-x', -9, 5.5, '①错', { color: RED, size: 16, bold: true });
          S.actor('s5-a1', 0, 5.5,
            '移项须变号：应为 $3x-x=1+5$，即 $2x=6$，$x=3$',
            { color: GREEN, size: 14 });
          S.actor('s5-a2-x', -9, 4.0, '②错', { color: RED, size: 16, bold: true });
          S.actor('s5-a2', 0, 4.0,
            '常数 $-1$ 也乘 6：$2x-6=3x$，移项得 $x=-6$',
            { color: GREEN, size: 14 });
          S.actor('s5-a3-x', -9, 2.5, '③错', { color: RED, size: 16, bold: true });
          S.actor('s5-a3', 0, 2.5,
            '负号前括号内每项变号：$-(x-3)=-x+3$（$-3$ 变 $+3$）',
            { color: GREEN, size: 14 });
          S.actor('s5-a4-x', -9, 1.0, '④错', { color: RED, size: 16, bold: true });
          S.actor('s5-a4', 0, 1.0,
            '必须代入原方程检验，含分母方程尤其要排查增根',
            { color: GREEN, size: 14 });
          P.renderCard(
            '<b>四大易错点揭晓</b><br>' +
            '①错：移项须变号（$x$ 移到左边变 $-x$）<br>' +
            '②错：去分母时常数项也要乘最小公倍数<br>' +
            '③错：负号前括号内<b>每项</b>都变号<br>' +
            '④错：解完必须检验，这是规范要求',
            'warm'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '最后，把四大易错点浓缩成四句口诀，背下来！第一句：移项必变号。第二句：去分母不漏常数。第三句：去括号负号全变。第四句：解完必检验。这四句口诀覆盖了全章最高频的失分场景，课后自查用得上！',
        enter: function (anim) {
          S.remove('s5-title');
          S.remove('s5-a1-x'); S.remove('s5-a1');
          S.remove('s5-a2-x'); S.remove('s5-a2');
          S.remove('s5-a3-x'); S.remove('s5-a3');
          S.remove('s5-a4-x'); S.remove('s5-a4');
          S.actor('s5-slogan-title', 0, 7.0, '四大口诀', { color: WARM, size: 22, bold: true });
          S.actor('s5-s1', 0, 5.2, '移项必变号', { color: RED, size: 24, bold: true });
          S.actor('s5-s2', 0, 3.5, '去分母不漏常数', { color: ORANGE, size: 24, bold: true });
          S.actor('s5-s3', 0, 1.8, '去括号负号全变', { color: COOL, size: 24, bold: true });
          S.actor('s5-s4', 0, 0.1, '解完必检验', { color: TEAL, size: 24, bold: true });
          P.renderCard(
            '<b>四大易错口诀（请齐读两遍）</b><br>' +
            '<b>移项必变号</b><br>' +
            '<b>去分母不漏常数</b><br>' +
            '<b>去括号负号全变</b><br>' +
            '<b>解完必检验</b>',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
