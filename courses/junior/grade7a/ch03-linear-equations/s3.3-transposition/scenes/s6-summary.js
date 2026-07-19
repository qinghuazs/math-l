// s6-summary.js  六、易错与小结（3步）
// 环节六：易错辨析（忘变号）、课堂小结、悬念引入去括号
// 易错数学验算：3x+7=32-2x，错误移项 3x+2x=32+7=39，5x=39，x=7.8（错）
//              正确移项 3x+2x=32-7=25，5x=25，x=5（对）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：易错辨析——移项忘变号（左红右绿对比）
      {
        narration: '最后来辨析一个最容易犯的错误：移项忘变号。左边是错误做法，右边是正确做法。同一道题：3x+7=32 减 2x。错误：移项时 +7 没有变号，写成了 3x+2x=32+7=39，得出 x=7.8——错！正确：+7 移到右边变 -7，得 3x+2x=32-7=25，解得 x=5——对！',
        enter: function (anim) {
          // 左侧：错误过程（红色）
          S.actor('s6-err-title', -5.5, 7.0, '✗ 错误（忘变号）', { color: RED, size: 18, bold: true });
          S.actor('s6-err-0', -5.5, 5.5, '$3x+7=32-2x$', { color: RED, size: 16 });
          S.actor('s6-err-1', -5.5, 4.0, '$3x+2x=32+7$', { color: RED, size: 18, bold: true });
          S.actor('s6-err-mark', -5.5, 3.1, '↑ +7 忘记变号！', { color: RED, size: 14 });
          S.actor('s6-err-2', -5.5, 2.0, '$5x=39$', { color: RED, size: 16 });
          S.actor('s6-err-3', -5.5, 0.8, '$x=7.8$（错！）', { color: RED, size: 16 });

          // 分隔线
          S.addSegment('s6-divider', [0, 7.5], [0, -1.0], { color: INK, width: 2, dash: 2 });

          // 右侧：正确过程（绿色）
          S.actor('s6-ok-title', 5.5, 7.0, '✓ 正确（记得变号）', { color: GREEN, size: 18, bold: true });
          S.actor('s6-ok-0', 5.5, 5.5, '$3x+7=32-2x$', { color: INK, size: 16 });
          S.actor('s6-ok-1', 5.5, 4.0, '$3x+2x=32-7$', { color: GREEN, size: 18, bold: true });
          S.actor('s6-ok-mark', 5.5, 3.1, '↑ +7 变成了 -7 ✓', { color: GREEN, size: 14 });
          S.actor('s6-ok-2', 5.5, 2.0, '$5x=25$', { color: GREEN, size: 16 });
          S.actor('s6-ok-3', 5.5, 0.8, '$x=5$ ✓', { color: GREEN, size: 16, bold: true });

          P.renderCard(
            '<b>易错：移项忘变号！</b><br>' +
            '$+7$ 移到右边必须变 $-7$；<br>' +
            '$-2x$ 移到左边必须变 $+2x$。<br>' +
            '口诀：移项必变号，正变负、负变正！',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 2：课堂小结——知识树与填空回顾
      {
        narration: '来做课堂小结。移项的依据是等式性质1。移项的定义：把等式一边的某项变号后移到另一边。规则：移项必变号；没移动的项，符号不变。解方程步骤：移项→合并同类项→系数化为 1→检验。大家对照知识表，自己填写一遍。',
        enter: function (anim) {
          S.remove('s6-err-title'); S.remove('s6-err-0'); S.remove('s6-err-1');
          S.remove('s6-err-mark'); S.remove('s6-err-2'); S.remove('s6-err-3');
          S.remove('s6-divider');
          S.remove('s6-ok-title'); S.remove('s6-ok-0'); S.remove('s6-ok-1');
          S.remove('s6-ok-mark'); S.remove('s6-ok-2'); S.remove('s6-ok-3');

          P.renderTable({
            head: ['知识点', '内容'],
            rows: [
              ['移项依据', '等式性质 1'],
              ['移项定义', '变号后移到另一边'],
              ['移项规则', '移项必变号；不移不变号'],
              ['解方程步骤', '移项→合并→系数化为1→检验'],
              ['易错点', '移项忘变号（最高频）'],
              ['系数为负', '$-x=-45$ 除以 $-1$，得 $x=45$'],
            ],
          });
          P.renderCard(
            '<b>本节核心：移项必变号！</b><br>' +
            '正项过等号变负项，负项过等号变正项；<br>' +
            '没有移动的项，符号绝对不变。',
            'cool'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
      // Step 3：悬念引入——有括号的方程，引出 3.4 去括号
      {
        narration: '最后留一个思考题，引出下节课的内容。看这个方程：2 乘以括号 3x 减 1，等于 5x 加 4。移项之前，你觉得需要先做什么？——对，要先去括号！3.4 节我们就来学"去括号解方程"，期待一下吧！',
        enter: function (anim) {
          S.actor('s6-next-title', 0, 6.0, '思考：下节课的挑战', { color: TEAL, size: 20, bold: true });
          S.actor('s6-next-eq', 0, 4.0, '$2(3x-1)=5x+4$', { color: INK, size: 30, bold: true });
          S.actor('s6-next-q', 0, 2.0, '移项之前，需要先做什么？', { color: WARM, size: 18 });
          return anim ? delay(500).then(function () {
            S.actor('s6-next-hint', 0, 0.2, '先去括号！→ 3.4 节学习', { color: TEAL, size: 20, bold: true });
            P.renderCard(
              '<b>下节预告：去括号解方程（3.4节）</b><br>' +
              '有括号时，先用分配律展开，<br>' +
              '再按本节学的步骤移项求解。<br>' +
              '本节移项技能是基础，务必熟练！',
              'teal'
            );
            return delay(300);
          }) : (function () {
            S.actor('s6-next-hint', 0, 0.2, '先去括号！→ 3.4 节学习', { color: TEAL, size: 20, bold: true });
            P.renderCard(
              '<b>下节预告：去括号解方程（3.4节）</b><br>' +
              '有括号时，先用分配律展开，<br>' +
              '再按本节学的步骤移项求解。<br>' +
              '本节移项技能是基础，务必熟练！',
              'teal'
            );
            return Promise.resolve();
          })();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
