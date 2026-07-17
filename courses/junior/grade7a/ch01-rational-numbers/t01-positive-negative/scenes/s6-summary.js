// s6-summary.js  对应教学设计"环节六：易错辨析与小结"+ "课堂小结"
// 辨析三题对应教学设计易错点：
//   ①"不是正数就是负数"——错（漏掉0）
//   ②"0就是没有，不是一个数"——错（0是有意义的基准）
//   ③"负数的-号可以省略"——错（省掉就变正数）
// 出口题：-4℃至+6℃，会经过0℃吗？答案：会（温度从-4升到+6必过0）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错辨析与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：辨析三连（逐一判错，renderCard warm+headShake）
      {
        narration: '课堂最后，来集中处理三个易错点。第一：不是正数的数，一定是负数——错！忘了0不是正数，但0也不是负数，0是第三类。第二：0就是什么都没有，不是一个数——错！0℃是有温度的，海拔0米是有高度的，0是实实在在的基准数。第三：负数前面的减号可以省略不写——错！省了减号就变成正数，意思完全改变。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7, '三大易错点辨析', { color: WARM, size: 21, bold: true });

          S.actor('s6-e1-q', 0, 5.8,
            '❌ 说法1：不是正数就一定是负数',
            { color: RED, size: 16 });
          S.actor('s6-e1-a', 0, 5,
            '错！$0$ 不是正数，但 $0$ 也<b>不是负数</b>',
            { color: GREEN, size: 15 });

          S.actor('s6-e2-q', 0, 3.8,
            '❌ 说法2：$0$ 就是没有，不是一个数',
            { color: RED, size: 16 });
          S.actor('s6-e2-a', 0, 3,
            '错！$0$℃ 是冰点，$0$ 是有意义的基准',
            { color: GREEN, size: 15 });

          S.actor('s6-e3-q', 0, 1.8,
            '❌ 说法3：负数前面的"$-$"号可以省略',
            { color: RED, size: 16 });
          S.actor('s6-e3-a', 0, 1,
            '错！省掉 $-$ 号就变成了正数，意思全变',
            { color: GREEN, size: 15 });

          P.renderCard(
            '<b>⚠ 三大易错：全部错误！</b><br>' +
            '① 不是正数 ≠ 是负数（$0$ 例外）<br>' +
            '② $0$ 不只是"没有"，是有意义的基准<br>' +
            '③ 负数的 $-$ 号绝对不可省',
            'warm',
            'headShake'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 2：出口题（-4℃至+6℃，会经过0℃吗）
      {
        narration: '现在做出口题，检验今天的学习成果。某城市某日气温在零下4℃至零上6℃之间。问题：1. 用正负数分别表示这两个温度；2. 这一天气温会经过0℃吗？0℃表示什么？它是正数还是负数？',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-e1-q');
          S.remove('s6-e1-a');
          S.remove('s6-e2-q');
          S.remove('s6-e2-a');
          S.remove('s6-e3-q');
          S.remove('s6-e3-a');

          S.actor('s6-exit-title', 0, 7, '出口题', { color: TEAL, size: 22, bold: true });
          S.actor('s6-exit-q', 0, 5.5,
            '某日气温：零下 $4$℃ 至零上 $6$℃',
            { color: INK, size: 17 });
          S.actor('s6-exit-q1', 0, 4.3,
            '① 用正负数分别表示两个温度',
            { color: INK, size: 16 });
          S.actor('s6-exit-q2', 0, 3.3,
            '② 这天气温会经过 $0$℃ 吗？',
            { color: INK, size: 16 });
          S.actor('s6-exit-q3', 0, 2.3,
            '   $0$℃ 表示什么？它是正数还是负数？',
            { color: INK, size: 16 });
          S.actor('s6-exit-hint', 0, 1, '先自己写答案……', { color: GRAY, size: 15 });

          P.renderCard(
            '<b>出口题</b><br>' +
            '气温从零下 $4$℃ 升到零上 $6$℃：<br>' +
            '① 记作什么？② 会经过 $0$℃ 吗？'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 3：出口题答案
      {
        narration: '答案：零下4℃记作 -4℃，零上6℃记作 +6℃（或6℃）。会经过0℃——因为气温从 -4℃ 升到 +6℃，必须穿过0℃这条分界。0℃ 表示冰水共存的温度（冰点），既不是正数也不是负数。',
        enter: function (anim) {
          S.remove('s6-exit-title');
          S.remove('s6-exit-q');
          S.remove('s6-exit-q1');
          S.remove('s6-exit-q2');
          S.remove('s6-exit-q3');
          S.remove('s6-exit-hint');

          S.actor('s6-ans-title', 0, 7, '出口题答案', { color: GREEN, size: 22, bold: true });
          S.actor('s6-ans1', 0, 5.8,
            '① 零下 $4$℃ → $-4$℃',
            { color: COOL, size: 18, bold: true });
          S.actor('s6-ans1b', 0, 5,
            '   零上 $6$℃ → $+6$℃（或 $6$℃）',
            { color: WARM, size: 18, bold: true });
          S.actor('s6-ans2', 0, 3.8,
            '② 会经过 $0$℃！',
            { color: GREEN, size: 20, bold: true });
          S.actor('s6-ans2-reason', 0, 3,
            '从 $-4$℃ 升到 $+6$℃，必须穿过 $0$',
            { color: INK, size: 16 });
          S.actor('s6-ans3', 0, 2,
            '$0$℃：冰水共存的温度（冰点）',
            { color: TEAL, size: 16 });
          S.actor('s6-ans3b', 0, 1.2,
            '$0$ <b>既不是正数，也不是负数</b>',
            { color: RED, size: 16, bold: true });

          P.renderCard(
            '<b>答案</b><br>' +
            '零下 $4$℃：$-4$℃；零上 $6$℃：$+6$℃<br>' +
            '会经过 $0$℃（$-4$ 到 $+6$ 必过 $0$）<br>' +
            '$0$℃ = 冰点；$0$ 既不是正数也不是负数',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 4：知识树 + 结尾悬念
      {
        narration: '来梳理今天学的五条要点。第一：引入动机——表示具有相反意义的量；第二：正数大于零，加号可省；第三：负数在正数前加减号，减号绝不可省；第四：0 既不是正数也不是负数，是分界与基准；第五：表示相反意义的量，先约定正方向再写符号。下节课，我们要给数的家族做个大整理——正数、负数、0，它们有个统一的名字，叫有理数。下节课见！',
        enter: function (anim) {
          S.remove('s6-ans-title');
          S.remove('s6-ans1');
          S.remove('s6-ans1b');
          S.remove('s6-ans2');
          S.remove('s6-ans2-reason');
          S.remove('s6-ans3');
          S.remove('s6-ans3b');

          S.actor('s6-tree-title', 0, 7.5, '知识树', { color: TEAL, size: 22, bold: true });
          S.actor('s6-pt1', 0, 6.5,
            '① 引入动机：表示具有相反意义的量',
            { color: INK, size: 14 });
          S.actor('s6-pt2', 0, 5.7,
            '② 正数：大于 $0$；$+$ 号<b>可省</b>',
            { color: WARM, size: 14 });
          S.actor('s6-pt3', 0, 4.9,
            '③ 负数：正数前加 $-$ 号；$-$ 号<b>绝不可省</b>',
            { color: COOL, size: 14 });
          S.actor('s6-pt4', 0, 4.1,
            '④ $0$：既非正也非负；是分界与基准',
            { color: RED, size: 14 });
          S.actor('s6-pt5', 0, 3.3,
            '⑤ 应用：先约定正方向，再用正负数表示',
            { color: TEAL, size: 14 });
          S.actor('s6-divider', 0, 2.6, '─────────────────', { color: GRAY, size: 14 });
          S.actor('s6-next', 0, 2,
            '悬念：正数、负数、$0$ 有统一的名字——',
            { color: INK, size: 16 });
          S.actor('s6-next2', 0, 1.2,
            '下节课学习<b>有理数</b>！',
            { color: WARM, size: 20, bold: true });

          P.renderCard(
            '<b>本课五条要点</b><br>' +
            '① 负数源于相反意义的量<br>' +
            '② 正数 $\\gt 0$，$+$ 可省<br>' +
            '③ 负数 $\\lt 0$，$-$ 不可省<br>' +
            '④ $0$：分界与基准，非正非负<br>' +
            '⑤ 先约定正方向，再写正负号<br>' +
            '<b>下节课：有理数的分类</b>',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
