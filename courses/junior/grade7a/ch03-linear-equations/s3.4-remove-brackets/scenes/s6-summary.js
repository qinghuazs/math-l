// s6-summary.js  环节六：易错与小结（3步）
// 易错1：漏乘项 2(x-1)=2x-1 ✗  正确=2x-2 ✓
// 易错2：负号括号只改第一项 -(x+2)=-x+2 ✗  正确=-x-2 ✓
// 口诀：括号前是减号全变号；乘数乘到每一项，一个都不能少
// 流程图：去括号→合并同类项→移项→系数化1→检验
// 悬念：x/2+x/3=5 引出3.5去分母
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var GREEN = '#2e7d32', RED = '#c62828', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步1：易错辨析（漏乘项 + 负号只改第一项）
        narration: '最后来梳理本节课最容易出错的两个地方。第一种错误：漏乘项。$2(x-1)$ 有人写成 $2x-1$，忘了系数 2 也要乘常数项 $-1$，正确结果是 $2x-2$。第二种错误：负号括号只改第一项。$-(x+2)$ 有人写成 $-x+2$，只改了 $x$ 的符号，第二项 $+2$ 没变，正确应该是 $-x-2$，两项都要变！',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.3, '易错辨析', { color: WARM, size: 21, bold: true });
          // 错误1：漏乘项
          S.actor('s6-err1-t', -5, 6.0, '错误1：漏乘项', { color: RED, size: 16, bold: true });
          S.actor('s6-err1-w', -5, 4.7, '$2(x-1)=2x-1$ ✗', { color: RED, size: 18 });
          S.actor('s6-err1-r', -5, 3.3, '$2(x-1)=2x-2$ ✓', { color: GREEN, size: 18 });
          S.actor('s6-err1-note', -5, 2.0, '系数要乘到每一项！', { color: INK, size: 15 });
          // 错误2：负号只改第一项
          S.actor('s6-err2-t', 4, 6.0, '错误2：只改第一项', { color: RED, size: 16, bold: true });
          S.actor('s6-err2-w', 4, 4.7, '$-(x+2)=-x+2$ ✗', { color: RED, size: 18 });
          S.actor('s6-err2-r', 4, 3.3, '$-(x+2)=-x-2$ ✓', { color: GREEN, size: 18 });
          S.actor('s6-err2-note', 4, 2.0, '负号括号，每项都变！', { color: INK, size: 15 });
          P.renderCard(
            '<b>两大易错点</b>：<br>' +
            '① 漏乘项：$2(x-1)=2x-2$（不是 $2x-1$）<br>' +
            '② 负号只改第一项：$-(x+2)=-x-2$（不是 $-x+2$）',
            'warm',
            'headShake'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        // 步2：解方程五步流程图 + 口诀
        narration: '好，现在来做知识小结。解含括号方程的五步流程：去括号、合并同类项、移项、系数化为 1、检验。每一步都不能省，尤其是最后的检验。口诀一起读：括号前是加号不变符，括号前是减号全变号；乘数要乘到每一项，一个都不能少！',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-err1-t'); S.remove('s6-err1-w'); S.remove('s6-err1-r'); S.remove('s6-err1-note');
          S.remove('s6-err2-t'); S.remove('s6-err2-w'); S.remove('s6-err2-r'); S.remove('s6-err2-note');
          S.actor('s6-flow-title', 0, 7.2, '解含括号方程——五步流程', { color: COOL, size: 20, bold: true });
          // 流程图节点
          var steps = ['去括号', '合并同类项', '移项', '系数化为1', '检验'];
          var colors = [WARM, ORANGE, TEAL, COOL, GREEN];
          var xs = [-8.5, -4.5, -0.5, 3.5, 7.5];
          for (var i = 0; i < steps.length; i++) {
            S.actor('s6-node-' + i, xs[i], 4.5, steps[i], { color: colors[i], size: 16, bold: true });
            if (i < steps.length - 1) {
              S.addSegment(
                's6-arr-' + i,
                [xs[i] + 1.8, 4.5],
                [xs[i + 1] - 1.8, 4.5],
                { color: INK, width: 2, dash: 0 }
              );
            }
          }
          P.renderCard(
            '<b>口诀</b>：括号前是加号不变符，括号前是减号全变号；<br>' +
            '乘数要乘到每一项，一个都不能少！',
            'cool'
          );
          if (!anim) { return null; }
          return delay(400);
        },
      },
      {
        // 步3：悬念引出3.5去分母
        narration: '今天我们学会了去括号，解方程的武器库又扩充了一件。但还有一种方程我们还没法轻松解——比如这道：$\\dfrac{x}{2}+\\dfrac{x}{3}=5$。括号去不掉，因为问题在分母上有数字。怎么处理？下节课 3.5 将祭出新武器——去分母！期待吗？下课！',
        enter: function (anim) {
          S.actor('s6-suspend-t', 0, 2.5, '下节课悬念：', { color: ORANGE, size: 20, bold: true });
          S.actor('s6-suspend-eq', 0, 0.8, '$\\dfrac{x}{2}+\\dfrac{x}{3}=5$', { color: COOL, size: 30, bold: true });
          S.actor('s6-suspend-hint', 0, -1.2, '分母上有数字，怎么处理？', { color: INK, size: 18 });
          S.actor('s6-next', 0, -2.8, '→ 3.5 去分母！', { color: WARM, size: 22, bold: true });
          P.renderCard(
            '<b>今日收获</b>：去括号 + 含括号方程完整解法<br>' +
            '<b>悬念</b>：$\\dfrac{x}{2}+\\dfrac{x}{3}=5$ 分母上有数字，怎么办？<br>' +
            '→ 下节课 3.5 去分母！',
            'teal'
          );
          if (!anim) { return null; }
          return delay(300);
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
