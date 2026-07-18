// s1-intro.js  环节一：一、数不完的儿歌（3步）
// 数学验算：n只青蛙 → n张嘴、2n只眼睛、4n条腿；n=1验算：1张嘴2眼4腿 ✓；n=3：3张嘴6眼12腿 ✓
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、数不完的儿歌',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：展示儿歌情境表格（前3行）
      {
        narration: '同学们，我们先来唱一首大家小时候都听过的儿歌——"1只青蛙1张嘴，2只眼睛4条腿；2只青蛙2张嘴，4只眼睛8条腿……"你们看，老师把它做成一张表格。第1行、第2行、第3行，规律很清晰——但这首儿歌能唱完吗？',
        enter: function (anim) {
          // 标题
          S.actor('s1-title', 0, 7.0, '数不完的儿歌', { color: COOL, size: 22, bold: true });

          // 表头
          S.actor('s1-h0', -6.5, 5.5, '只数', { color: INK, size: 17, bold: true });
          S.actor('s1-h1', -2.2, 5.5, '嘴数', { color: INK, size: 17, bold: true });
          S.actor('s1-h2',  2.2, 5.5, '眼睛数', { color: INK, size: 17, bold: true });
          S.actor('s1-h3',  6.5, 5.5, '腿数', { color: INK, size: 17, bold: true });

          // 横线
          S.addSegment('s1-hline-top',    [-9, 6.0], [9, 6.0], { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-hline-head',   [-9, 4.9], [9, 4.9], { color: INK, width: 1, dash: 0 });

          // 数据行 1、2、3
          S.actor('s1-r1c0', -6.5, 4.1, '1', { color: INK, size: 17 });
          S.actor('s1-r1c1', -2.2, 4.1, '1', { color: INK, size: 17 });
          S.actor('s1-r1c2',  2.2, 4.1, '2', { color: INK, size: 17 });
          S.actor('s1-r1c3',  6.5, 4.1, '4', { color: INK, size: 17 });

          S.actor('s1-r2c0', -6.5, 2.9, '2', { color: INK, size: 17 });
          S.actor('s1-r2c1', -2.2, 2.9, '2', { color: INK, size: 17 });
          S.actor('s1-r2c2',  2.2, 2.9, '4', { color: INK, size: 17 });
          S.actor('s1-r2c3',  6.5, 2.9, '8', { color: INK, size: 17 });

          S.actor('s1-r3c0', -6.5, 1.7, '3', { color: INK, size: 17 });
          S.actor('s1-r3c1', -2.2, 1.7, '3', { color: INK, size: 17 });
          S.actor('s1-r3c2',  2.2, 1.7, '6', { color: INK, size: 17 });
          S.actor('s1-r3c3',  6.5, 1.7, '12', { color: INK, size: 17 });

          // 省略号行
          S.actor('s1-r4c0', -6.5, 0.5, '…', { color: GRAY, size: 17 });
          S.actor('s1-r4c1', -2.2, 0.5, '…', { color: GRAY, size: 17 });
          S.actor('s1-r4c2',  2.2, 0.5, '…', { color: GRAY, size: 17 });
          S.actor('s1-r4c3',  6.5, 0.5, '…', { color: GRAY, size: 17 });

          S.addSegment('s1-hline-bot',    [-9, -0.2], [9, -0.2], { color: INK, width: 2, dash: 0 });

          P.renderCard(
            '<b>青蛙儿歌</b><br>' +
            '1只青蛙1张嘴，2只眼睛4条腿；<br>' +
            '2只青蛙2张嘴，4只眼睛8条腿……<br>' +
            '规律显然——但<b>能唱完吗？</b>'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：第100行、第1000行飞入后渐隐——"唱不完"冲突
      {
        narration: '同学们想一想：第100行怎么写？100只青蛙100张嘴，200只眼睛400条腿。第1000行呢？1000张嘴、2000只眼睛、4000条腿。要把所有行都写出来，我们要唱到什么时候？青蛙只数可以无限增大，这张表永远写不完！',
        enter: function (anim) {
          // 清除省略行，插入第100行和第1000行，再做提问
          S.remove('s1-r4c0'); S.remove('s1-r4c1'); S.remove('s1-r4c2'); S.remove('s1-r4c3');
          S.remove('s1-hline-bot');

          S.actor('s1-r100c0',  -6.5, 0.3, '100',  { color: WARM, size: 16 });
          S.actor('s1-r100c1',  -2.2, 0.3, '100',  { color: WARM, size: 16 });
          S.actor('s1-r100c2',   2.2, 0.3, '200',  { color: WARM, size: 16 });
          S.actor('s1-r100c3',   6.5, 0.3, '400',  { color: WARM, size: 16 });

          S.actor('s1-r1000c0', -6.5, -0.9, '1000', { color: WARM, size: 16 });
          S.actor('s1-r1000c1', -2.2, -0.9, '1000', { color: WARM, size: 16 });
          S.actor('s1-r1000c2',  2.2, -0.9, '2000', { color: WARM, size: 16 });
          S.actor('s1-r1000c3',  6.5, -0.9, '4000', { color: WARM, size: 16 });

          S.actor('s1-rdot0',   -6.5, -2.1, '…', { color: GRAY, size: 17 });
          S.actor('s1-rdot1',   -2.2, -2.1, '…', { color: GRAY, size: 17 });
          S.actor('s1-rdot2',    2.2, -2.1, '…', { color: GRAY, size: 17 });
          S.actor('s1-rdot3',    6.5, -2.1, '…', { color: GRAY, size: 17 });

          S.actor('s1-q', 0, -3.5, '这张表——永远写不完！', { color: WARM, size: 20, bold: true });

          P.renderCard(
            '<b>写不完的表格</b><br>' +
            '第 100 行：100 只青蛙，100 张嘴，200 只眼睛，400 条腿<br>' +
            '第 1000 行：1000 张嘴，2000 只眼睛，4000 条腿<br>' +
            '青蛙只数可以无限增大，<b>表格永远写不完！</b>'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },

      // Step 3：字母 n 登场，一句话概括全部规律
      {
        narration: '有没有一句话，就能把所有规律说清楚？当然有！我们用一个字母 n 来表示青蛙的只数——n 可以是 1、2、3、100、1000，甚至任意正整数。那么：n 只青蛙，n 张嘴，2n 只眼睛，4n 条腿。一行就概括了无穷多行！这就是用字母表示数的威力！',
        enter: function (anim) {
          // 清除第100、第1000行及省略
          S.remove('s1-r100c0'); S.remove('s1-r100c1'); S.remove('s1-r100c2'); S.remove('s1-r100c3');
          S.remove('s1-r1000c0'); S.remove('s1-r1000c1'); S.remove('s1-r1000c2'); S.remove('s1-r1000c3');
          S.remove('s1-rdot0'); S.remove('s1-rdot1'); S.remove('s1-rdot2'); S.remove('s1-rdot3');
          S.remove('s1-q');

          // 用字母 n 替换 "…" 行，高亮显示
          S.actor('s1-rn0', -6.5, 0.3, '$n$',   { color: TEAL, size: 22, bold: true });
          S.actor('s1-rn1', -2.2, 0.3, '$n$',   { color: TEAL, size: 22, bold: true });
          S.actor('s1-rn2',  2.2, 0.3, '$2n$',  { color: TEAL, size: 22, bold: true });
          S.actor('s1-rn3',  6.5, 0.3, '$4n$',  { color: TEAL, size: 22, bold: true });

          S.addSegment('s1-hline-n-top', [-9, 1.0], [9, 1.0], { color: TEAL, width: 2, dash: 2 });
          S.addSegment('s1-hline-n-bot', [-9, -0.3], [9, -0.3], { color: TEAL, width: 2, dash: 2 });

          // 结论文字
          S.actor('s1-concl', 0, -2.0,
            '$n$ 只青蛙：$n$ 张嘴，$2n$ 只眼睛，$4n$ 条腿',
            { color: TEAL, size: 19, bold: true });
          S.actor('s1-concl2', 0, -3.5,
            '一个字母，概括无穷！',
            { color: WARM, size: 21, bold: true });

          P.renderCard(
            '<b>一个字母，概括无穷！</b><br>' +
            '$n$ 只青蛙：$n$ 张嘴，$2n$ 只眼睛，$4n$ 条腿<br>' +
            '字母 $n$ 可以代表任意正整数，<br>' +
            '一行式子覆盖了无穷多行具体数据！',
            'teal'
          );

          return anim ? delay(500) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
