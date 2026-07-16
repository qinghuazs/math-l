(function (CW) {
  'use strict';
  var S, P;

  // 颜色常量
  var BLUE   = '#1565c0';
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';
  var AMBER  = '#f57f17';

  // 数据：某城市一周最高气温（℃）
  var DAYS  = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  var TEMPS = [22, 25, 28, 24, 20, 18, 23];
  // 坐标：x=1..7, y=温度值
  var XS = [1, 2, 3, 4, 5, 6, 7];

  // 折线图坐标点
  var PTS = [];
  (function () {
    var i;
    for (i = 0; i < XS.length; i++) {
      PTS.push([XS[i], TEMPS[i]]);
    }
  })();

  // 已绘制的点数（动画闭包）
  var drawnCount = 0;

  // 画坐标轴标签
  function drawAxisLabels() {
    var i;
    S.addText('s3-title', 4, 31.5, '某城市一周最高气温折线统计图', { size: 13, color: INK, anchorX: 'middle' });
    S.addText('s3-yunit', 0.1, 30.8, '（℃）', { size: 11, color: INK });
    for (i = 0; i < DAYS.length; i++) {
      S.addText('s3-xlab' + i, XS[i], 14.5, DAYS[i], { size: 11, color: INK, anchorX: 'middle' });
    }
    // y 轴刻度 16~30
    var yticks = [16, 18, 20, 22, 24, 26, 28, 30];
    for (i = 0; i < yticks.length; i++) {
      S.addText('s3-ylab' + i, 0.55, yticks[i], '' + yticks[i], { size: 11, color: INK, anchorX: 'right' });
    }
  }

  // 逐点描点+连线动画
  function growLine(anim) {
    drawnCount = 0;
    if (!anim) {
      // 快放：直接画所有点和完整折线
      var i;
      for (i = 0; i < PTS.length; i++) {
        S.dropPoint('s3-pt' + i, PTS[i][0], PTS[i][1], { color: WARM, size: 4, name: '' + TEMPS[i] + '℃' });
      }
      S.addPolyline('s3-line', PTS, { color: BLUE, width: 3 });
      return Promise.resolve();
    }
    // 动画：逐点出现，描一个点就连一段折线
    var p = Promise.resolve();
    var i;
    for (i = 0; i < PTS.length; i++) {
      (function (idx) {
        p = p.then(function () {
          return S.dropPoint('s3-pt' + idx, PTS[idx][0], PTS[idx][1],
            { color: WARM, size: 4, name: '' + TEMPS[idx] + '℃', animate: true }
          ).then(function () {
            drawnCount = idx + 1;
            if (drawnCount >= 2) {
              // 画到目前为止的折线段
              S.addPolyline('s3-line', PTS.slice(0, drawnCount), { color: BLUE, width: 3 });
            }
          });
        });
      })(i);
    }
    return p;
  }

  var scene = {
    id: 's3',
    title: '三、折线统计图：变化趋势',
    board: {},
    bbox: [0, 33, 8.5, 13],
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      drawnCount = 0;
    },
    steps: [
      {
        narration: '学完扇形图，我们再来认识<b>折线统计图</b>！折线图用折线的起伏来反映数据的变化趋势，非常适合表示随时间变化的数据。今天的情境：某城市连续7天的最高气温。先搭好坐标轴：横轴是时间（星期），纵轴是温度（℃）。',
        enter: function () {
          drawAxisLabels();
          P.renderCard('<b>折线统计图</b>：<br>用折线的<b>起伏变化</b>反映<br>数据随时间的变化趋势。<br>横轴→时间，纵轴→数量');
        },
      },
      {
        narration: '现在逐天描点！每个数据用圆点标出，然后依次连线。注意观察折线的走势——先升后降再升，这就是一周气温的变化轨迹！周三最高（28℃），周六最低（18℃）。',
        enter: function (anim) {
          drawAxisLabels();
          return growLine(anim);
        },
      },
      {
        narration: '折线图完成！从图中我们能清楚看出：<b>周三气温最高（28℃）</b>，<b>周六气温最低（18℃）</b>。折线上升说明气温升高，折线下降说明气温降低。折线的<b>坡度越陡，变化越剧烈</b>！这正是折线图的优势——一眼看出变化趋势。',
        enter: function (anim) {
          drawAxisLabels();
          var i;
          for (i = 0; i < PTS.length; i++) {
            S.dropPoint('s3-pt' + i, PTS[i][0], PTS[i][1], { color: WARM, size: 4, name: '' + TEMPS[i] + '℃' });
          }
          S.addPolyline('s3-line', PTS, { color: BLUE, width: 3 });
          // 标注最高最低点
          S.addText('s3-max', PTS[2][0], PTS[2][1] + 1.2, '最高！', { size: 12, color: WARM, anchorX: 'middle' });
          S.addText('s3-min', PTS[5][0], PTS[5][1] - 1.8, '最低！', { size: 12, color: PURPLE, anchorX: 'middle' });
          P.renderCard('从折线图可以读出：<br>· <b>整体趋势</b>：先升后降再升<br>· <b>最高值</b>：28℃（周三）<br>· <b>最低值</b>：18℃（周六）<br>· 折线越陡，变化越快');
        },
      },
      {
        narration: '折线统计图适合哪些场景？凡是数据随<b>时间</b>（或顺序）变化的情境都适合用折线图：气温变化、销售额月报、身高年增、股价走势……只要你想看"变化趋势"，折线图就是最佳选择！',
        enter: function (anim) {
          drawAxisLabels();
          var i;
          for (i = 0; i < PTS.length; i++) {
            S.dropPoint('s3-pt' + i, PTS[i][0], PTS[i][1], { color: WARM, size: 4, name: '' + TEMPS[i] + '℃' });
          }
          S.addPolyline('s3-line', PTS, { color: BLUE, width: 3 });
          P.renderTable({
            head: ['折线图适用情境'],
            rows: [
              ['气温变化（日/月/季）'],
              ['销售额月度变化'],
              ['身高/体重年增长'],
              ['股价走势'],
              ['运动成绩变化'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
