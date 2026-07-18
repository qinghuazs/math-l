// s5-judge.js  环节五：判断练习（3步）
// 数学验算：
// Step1：1/x = x^{-1}（分母含字母 x，是负整数幂，不是单项式）✗
//        x/3 = (1/3)x（分母是数字3，是整式，是单项式）✓ 系数1/3，次数1
// Step2：a+b（含加法）✗；ab（乘法，系数1，次数2）✓
// Step3（综合快判六题）：
//   m²n：系数1，次数2+1=3 ✓
//   3/x：分母含字母 ✗
//   -2.5：单独数，系数-2.5，次数0 ✓
//   p+q：含加法 ✗
//   a/4 = (1/4)a：系数1/4，次数1 ✓
//   √2·xy：√2 是确定常数，系数√2，次数2 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var GREEN = '#2e7d32';
  var RED   = '#c62828';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's5',
    title: '五、判断练习',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：1/x 与 x/3 的对比
      {
        narration: '现在做判断练习，专项突破两个经典混淆。左边这个：1除以x，也就是x分之1，分母含字母x，它等于 x 的负一次方，不是整式，所以不是单项式，打叉。右边这个：x除以3，分母是数字3，可以改写成 三分之一 乘 x，这是数乘字母的积，系数是三分之一，次数是1，是单项式，打勾！关键在于：分母含字母就排除；分母是数字没问题。',
        enter: function (anim) {
          // 左：1/x（红色，叉）
          S.actor('s5-left-expr', -4.5, 5.5,
            '$\\dfrac{1}{x}$',
            { color: RED, size: 36 });
          S.actor('s5-left-note1', -4.5, 3.2,
            '分母含字母 $x$',
            { color: RED, size: 17 });
          S.actor('s5-left-note2', -4.5, 2.0,
            '$= x^{-1}$（不是整式）',
            { color: RED, size: 15 });
          S.actor('s5-left-verdict', -4.5, 0.8,
            '✗ 不是单项式',
            { color: RED, size: 20 });

          // 分隔线
          S.addSegment('s5-divider', [0, 7.5], [0, -1.5],
            { color: GRAY, width: 1.5, dash: 2 });

          // 右：x/3（绿色，勾）
          S.actor('s5-right-expr', 4.5, 5.5,
            '$\\dfrac{x}{3}$',
            { color: GREEN, size: 36 });
          S.actor('s5-right-note1', 4.5, 3.2,
            '分母是数字 $3$',
            { color: GREEN, size: 17 });
          S.actor('s5-right-note2', 4.5, 2.0,
            '$= \\dfrac{1}{3}x$（数乘字母）',
            { color: GREEN, size: 15 });
          S.actor('s5-right-verdict', 4.5, 0.8,
            '✓ 单项式，系数 $\\dfrac{1}{3}$，次数 $1$',
            { color: GREEN, size: 17 });

          // 口诀
          S.actor('s5-rule', 0, -0.8,
            '判断口诀：分母含字母→排除；分母是数字→没问题！',
            { color: TEAL, size: 15 });

          P.renderCard(
            '<b>对比：$\\dfrac{1}{x}$ 与 $\\dfrac{x}{3}$</b><br>' +
            '$\\dfrac{1}{x}$：分母含字母，<b>不是</b>单项式 ✗<br>' +
            '$\\dfrac{x}{3} = \\dfrac{1}{3}x$：分母是数字，<b>是</b>单项式 ✓<br>' +
            '关键：看<b>分母</b>里有没有字母！'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 2：a+b 与 ab 的对比 + 结论卡
      {
        narration: '再看一组：a加b 和 ab。a加b 含有加法，所以不是单项式；ab 是字母乘字母的积，系数是1（隐含），次数是1加1等于2，是单项式。记住两条判别规则：含加减就排除；分母含字母就排除。',
        enter: function (anim) {
          // 清掉旧内容
          S.remove('s5-left-expr'); S.remove('s5-left-note1');
          S.remove('s5-left-note2'); S.remove('s5-left-verdict');
          S.remove('s5-divider');
          S.remove('s5-right-expr'); S.remove('s5-right-note1');
          S.remove('s5-right-note2'); S.remove('s5-right-verdict');
          S.remove('s5-rule');

          // a+b（红叉）
          S.actor('s5-ab-plus', -4, 5.5, '$a+b$', { color: RED, size: 32 });
          S.actor('s5-ab-note', -4, 3.8, '含加法→不是单项式', { color: RED, size: 17 });
          S.actor('s5-ab-x', -4, 2.6, '✗', { color: RED, size: 36 });

          // 分隔线
          S.addSegment('s5-div2', [0, 7.5], [0, 1.0],
            { color: GRAY, width: 1.5, dash: 2 });

          // ab（绿勾）
          S.actor('s5-ab-prod', 4, 5.5, '$ab$', { color: GREEN, size: 32 });
          S.actor('s5-ab-prod-note', 4, 3.8,
            '乘法关系，系数 $1$，次数 $2$',
            { color: GREEN, size: 17 });
          S.actor('s5-ab-ok', 4, 2.6, '✓ 单项式', { color: GREEN, size: 26 });

          // 结论卡
          P.renderCard(
            '<b>判别规则（两条）</b><br>' +
            '含加减 → 不是单项式<br>' +
            '分母含字母 → 不是单项式<br>' +
            '都不违反 → 是单项式',
            'cool'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 3：综合快判六题（3×2 布局）
      {
        narration: '好，现在做综合快判！六个式子摆出来，大家先自己判断约一分钟，然后我逐一揭晓。m的平方n——乘法，系数1，次数3，是；3除以x——分母含字母，不是；负2.5——单独的数，次数0，是；p加q——含加法，不是；a除以4等于四分之一a——是，系数四分之一，次数1；根号2乘xy——根号2是确定的常数不是字母，是，系数根号2，次数2。',
        enter: function (anim) {
          // 清除旧内容
          S.remove('s5-ab-plus'); S.remove('s5-ab-note'); S.remove('s5-ab-x');
          S.remove('s5-div2');
          S.remove('s5-ab-prod'); S.remove('s5-ab-prod-note'); S.remove('s5-ab-ok');

          // 六题 3×2 布局
          // 列 x: -5.5, 0, 5.5；行 y: 5.5, 1.5
          var items = [
            { id: 's5-g1', x: -5.5, y: 5.5, tex: '$m^2n$',           ok: true,
              info: '系数 $1$，次数 $3$' },
            { id: 's5-g2', x:  0,   y: 5.5, tex: '$\\dfrac{3}{x}$',  ok: false,
              info: '分母含字母' },
            { id: 's5-g3', x:  5.5, y: 5.5, tex: '$-2.5$',           ok: true,
              info: '系数 $-2.5$，次数 $0$' },
            { id: 's5-g4', x: -5.5, y: 1.5, tex: '$p+q$',            ok: false,
              info: '含加法' },
            { id: 's5-g5', x:  0,   y: 1.5, tex: '$\\dfrac{a}{4}$',  ok: true,
              info: '系数 $\\dfrac{1}{4}$，次数 $1$' },
            { id: 's5-g6', x:  5.5, y: 1.5, tex: '$\\sqrt{2}\\cdot xy$', ok: true,
              info: '$\\sqrt{2}$ 是常数，系数 $\\sqrt{2}$，次数 $2$' },
          ];
          var i, it;
          for (i = 0; i < items.length; i++) {
            it = items[i];
            S.actor(it.id, it.x, it.y, it.tex, { color: INK, size: 22 });
            S.actor(it.id + '-v', it.x, it.y - 1.0,
              it.ok ? ('✓ ' + it.info) : ('✗ ' + it.info),
              { color: it.ok ? GREEN : RED, size: 14 });
          }

          P.renderTable({
            head: ['式子', '结论', '理由'],
            rows: [
              ['$m^2n$',                    '单项式',   '系数 $1$，次数 $3$'],
              ['$\\dfrac{3}{x}$',           '非单项式', '分母含字母'],
              ['$-2.5$',                    '单项式',   '系数 $-2.5$，次数 $0$'],
              ['$p+q$',                     '非单项式', '含加法'],
              ['$\\dfrac{a}{4}$',           '单项式',   '系数 $\\dfrac{1}{4}$，次数 $1$'],
              ['$\\sqrt{2}\\cdot xy$',      '单项式',   '$\\sqrt{2}$ 是常数，次数 $2$'],
            ]
          });

          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
