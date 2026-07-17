// s1-intro.js  一、净胜球里的加法（3步）
// 数学验算：上半场+3，下半场-2，全场净胜 = (+3)+(-2)
// 凭常识：进3失2 = 净胜1球，即结果 +1
// 本环节不算，只制造认知冲突
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、净胜球里的加法',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：足球比赛记录卡
      {
        narration: '同学们好！先看一道生活题——某队踢了一场足球，上半场进了3个球，下半场被对手打进了2个球。规定：进球记正数，失球记负数。上半场净胜 +3，下半场净胜 −2。我们把这张比赛记录卡展示出来。',
        enter: function (anim) {
          S.actor('s1-title', 0, 6.5, '<b>足球比赛记录</b>', { color: COOL, size: 22 });
          S.actor('s1-rule',  0, 5.2, '规定：进球记正数，失球记负数', { color: INK, size: 16 });
          S.actor('s1-row1', -4, 3.2, '上半场', { color: INK, size: 18 });
          S.actor('s1-row1v', 0, 3.2, '进球 3 个', { color: INK, size: 18 });
          S.actor('s1-row1n', 4.5, 3.2, '<b>+3</b>', { color: GREEN, size: 22 });
          S.actor('s1-row2', -4, 1.2, '下半场', { color: INK, size: 18 });
          S.actor('s1-row2v', 0, 1.2, '失球 2 个', { color: INK, size: 18 });
          S.actor('s1-row2n', 4.5, 1.2, '<b>−2</b>', { color: WARM, size: 22 });
          S.addSegment('s1-line', [-7, 0.0], [7, 0.0], { color: INK, width: 2, dash: 0 });
          S.actor('s1-q', -4, -1.2, '全场净胜', { color: INK, size: 18 });
          S.actor('s1-qn', 4.5, -1.2, '<b>【？】</b>', { color: TEAL, size: 22 });
          P.renderCard('<b>足球净胜球</b><br>上半场 <b>+3</b>，下半场 <b>−2</b>，全场净胜多少球？');
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 2：列算式
      {
        narration: '全场净胜球，就是把两个半场的净胜球数加起来。写成算式：(+3)+(−2)=？注意：这是一个正数加一个负数，和我们小学学的加法不一样！',
        enter: function (anim) {
          S.remove('s1-qn');
          S.actor('s1-formula', 4.5, -1.2, '<b>?</b>', { color: TEAL, size: 22 });
          S.actor('s1-eq', 0, -3.5, '$(+3) + (-2) = ?$', { color: WARM, size: 26 });
          P.renderCard('<b>列出算式</b><br>全场净胜 $= (+3) + (-2) = ?$<br>正数与负数相加，怎么算？');
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 3：认知冲突
      {
        narration: '凭生活常识，进了3球又被打进2球，当然净胜1球！所以结果应该是+1。但是，正数加负数按什么规则算？我们说不清楚！——这就是今天要解决的问题：建立有理数加法的规则。',
        enter: function (anim) {
          S.remove('s1-formula');
          S.actor('s1-ans', 4.5, -1.2, '<b>+1</b>', { color: GREEN, size: 22 });
          S.actor('s1-ans2', 0, -5.5, '$(+3)+(-2) = +1$　凭常识知道，但说不清道理！', { color: TEAL, size: 16 });
          P.renderCard(
            '<b>认知冲突</b><br>' +
            '常识告诉我们答案是 <b>+1</b>，<br>' +
            '但<b>正数加负数</b>怎么算，我们还没有规则！<br>' +
            '今天就来建立<b>有理数加法法则</b>。',
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
