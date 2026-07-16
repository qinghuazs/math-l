(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  var ITEMS  = ['篮球', '足球', '羽毛球', '乒乓球', '其他'];
  var COUNTS = [12, 8, 10, 6, 4];
  var COLORS = ['#1565c0', '#e64a19', '#2e7d32', '#6a1b9a', '#f57f17'];
  var W  = 0.6;
  var XS = [1, 2, 3, 4, 5];

  function drawFullChart() {
    var i;
    S.addText('s3-chart-title', 3, 13.5, '全班同学最喜欢的体育项目统计图', { size: 14, color: INK, anchorX: 'middle' });
    S.addText('s3-yunit', -0.7, 13.2, '（人）', { size: 11, color: INK, anchorX: 'right' });
    for (i = 0; i < ITEMS.length; i++) {
      S.addText('s3-xlabel' + i, XS[i], -0.7, ITEMS[i], { size: 12, color: INK, anchorX: 'middle' });
    }
    var yticks = [2, 4, 6, 8, 10, 12];
    for (i = 0; i < yticks.length; i++) {
      S.addText('s3-ytick' + i, -0.7, yticks[i], '' + yticks[i], { size: 11, color: INK, anchorX: 'right' });
    }
    for (i = 0; i < ITEMS.length; i++) {
      (function (idx) {
        S.addBar('s3-bar' + idx, XS[idx], W, COUNTS[idx], { color: COLORS[idx] });
        S.addText('s3-label' + idx, XS[idx], COUNTS[idx] + 0.35, '' + COUNTS[idx],
          { size: 13, color: COLORS[idx], anchorX: 'middle' }
        );
      })(i);
    }
  }

  var scene = {
    id: 's3',
    title: '三、从图读信息',
    bbox: [-1, 14, 7, -2],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '有了条形统计图，我们就能快速回答很多问题。第一个问题：<b>哪个体育项目最受欢迎？哪个最少？</b>——直接看最高和最低的条形！篮球柱最高，是最受欢迎的；其他柱最低，是最少人喜欢的。',
        enter: function () {
          drawFullChart();
          S.addText('s3-max', XS[0], COUNTS[0] + 1.3, '最多 ▲', { size: 13, color: WARM,   anchorX: 'middle' });
          S.addText('s3-min', XS[4], COUNTS[4] + 1.3, '最少 ▼', { size: 13, color: PURPLE, anchorX: 'middle' });
          P.renderCard('最多：<b>篮球</b>（12人）<br>最少：<b>其他</b>（4人）<br>——直接看条形高低即可！');
        },
      },
      {
        narration: '第二个问题：<b>极差</b>是多少？极差 = 最大值 - 最小值 = 12 - 4 = 8。极差反映了数据的波动范围，值越大说明各类别之间的差距越悬殊。同时，喜欢篮球的比喜欢足球的多 12 - 8 = 4 人。',
        enter: function () {
          drawFullChart();
          // 画差值辅助线（在篮球柱旁边标注极差）
          S.addSegment('s3-diff-line', [XS[0] + 0.5, COUNTS[4]], [XS[0] + 0.5, COUNTS[0]],
            { color: GREEN, width: 3, dash: 0 }
          );
          S.addText('s3-diff-top', XS[0] + 0.65, COUNTS[0],       '12', { size: 12, color: GREEN, anchorX: 'left' });
          S.addText('s3-diff-bot', XS[0] + 0.65, COUNTS[4],        '4',  { size: 12, color: GREEN, anchorX: 'left' });
          S.addText('s3-diff-lbl', XS[0] + 0.65, (COUNTS[0] + COUNTS[4]) / 2, '差=8', { size: 13, color: GREEN, anchorX: 'left' });
          P.renderCard('极差 = 最大值 - 最小值<br>= 12 - 4 = <b>8</b><br>篮球比足球多：12 - 8 = <b>4</b> 人');
        },
      },
      {
        narration: '第三个问题：<b>数形对照</b>——从图中能一眼看出各项目的大小关系：篮球 > 羽毛球 > 足球 > 乒乓球 > 其他。全班合计 12+8+10+6+4 = 40 人。这正是条形图"以形助数"的魅力！',
        enter: function () {
          drawFullChart();
          P.renderTable({
            head: ['读图问题', '答案'],
            rows: [
              ['最多项目',       '篮球（12人）'],
              ['最少项目',       '其他（4人）'],
              ['极差',           '12 - 4 = 8'],
              ['篮球比足球多几人', '12 - 8 = 4 人'],
              ['总人数',          '40人'],
              ['大小顺序', '篮球 > 羽毛球 > 足球 > 乒乓球 > 其他'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
