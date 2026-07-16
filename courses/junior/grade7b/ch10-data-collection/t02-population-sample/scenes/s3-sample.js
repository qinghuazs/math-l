(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', PURPLE = '#6a1b9a', GREEN = '#2e7d32';

  // 大框（左侧：总体）中的点阵布局
  var BIG_COLS = 10, BIG_ROWS = 8;
  var BIG_X0 = -8.5, BIG_Y0 = 5.0;
  var BIG_DX = 1.0, BIG_DY = 1.0;

  // 小框（右侧：样本）目标区域
  var SMALL_X0 = 5.0, SMALL_Y0 = 3.5;
  var SMALL_DX = 0.8, SMALL_DY = 0.85;
  var SMALL_COLS = 5, SMALL_ROWS = 4; // 20个点示意

  var actors = {};

  function bigDotX(c) { return BIG_X0 + c * BIG_DX; }
  function bigDotY(r) { return BIG_Y0 - r * BIG_DY; }
  function smallDotX(c) { return SMALL_X0 + c * SMALL_DX; }
  function smallDotY(r) { return SMALL_Y0 - r * SMALL_DY; }

  // 绘制大框全体点（灰色）
  function drawBigDots() {
    var r, c, id;
    for (r = 0; r < BIG_ROWS; r++) {
      for (c = 0; c < BIG_COLS; c++) {
        id = 's3-big-' + r + '-' + c;
        actors[id] = S.actor(id, bigDotX(c), bigDotY(r), '●', { color: '#b0bec5', size: 11 });
      }
    }
  }

  // 标记要被"抽取"的点（前 SMALL_ROWS*SMALL_COLS 个点，用WARM色）
  function markSampleDots() {
    var r, c, id;
    for (r = 0; r < SMALL_ROWS; r++) {
      for (c = 0; c < SMALL_COLS; c++) {
        id = 's3-big-' + r + '-' + c;
        if (actors[id]) {
          actors[id].obj.setAttribute({ strokeColor: WARM, fontSize: 11 });
        }
      }
    }
  }

  // 动画：将标记点移动到右侧小框
  function moveSampleDots(anim) {
    var moves = [];
    var d = anim ? 900 : 0;
    var r, c, id;
    for (r = 0; r < SMALL_ROWS; r++) {
      for (c = 0; c < SMALL_COLS; c++) {
        id = 's3-big-' + r + '-' + c;
        if (actors[id]) {
          moves.push(actors[id].moveTo(smallDotX(c), smallDotY(r), d));
        }
      }
    }
    return Promise.all(moves);
  }

  // 大框顶点
  var BIG_BOX = [[-9.5, 6.2], [0.5, 6.2], [0.5, -5.8], [-9.5, -5.8]];
  // 小框顶点
  var SM_BOX = [[3.8, 4.5], [8.5, 4.5], [8.5, 0.2], [3.8, 0.2]];

  var scene = {
    id: 's3',
    title: '三、样本与样本容量',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      actors = {};
    },
    steps: [
      {
        narration: '现在来画图理解抽样过程。左边大框代表总体——全校 2000 名学生的视力数据。我们要从中随机抽取一部分……被抽中的点会变成红色，表示"即将被调查的学生的视力数据"。',
        enter: function () {
          // 大框
          S.addPolygon('s3-bigbox', BIG_BOX, {
            color: 'none', fillOpacity: 0,
            borderColor: BLUE, borderWidth: 3,
          });
          S.addText('s3-lbl-pop', -4.5, 6.8, '总  体（2000名学生的视力）', {
            size: 15, color: BLUE, anchorX: 'middle',
          });
          drawBigDots();
          // 标红要被抽取的点
          markSampleDots();
          P.renderCard('左边大框 = <b>总体</b><br>红色圆点 = 即将被抽取的 200 个数据（示意 20 个）');
        },
      },
      {
        narration: '把这些被抽到的红点"移"到右边的小框里——这个过程就是<b>抽样</b>！右边小框里的数据合在一起，叫做<b>样本</b>。样本是从总体中抽取的一部分个体，它代表了总体的信息。',
        enter: function (anim) {
          // 小框（先画框）
          S.addPolygon('s3-smbox', SM_BOX, {
            color: 'none', fillOpacity: 0,
            borderColor: WARM, borderWidth: 3,
          });
          S.addText('s3-lbl-smp', 6.2, 5.1, '样本', {
            size: 16, color: WARM, anchorX: 'middle',
          });
          // 动画：抽样移动
          return moveSampleDots(anim);
        },
      },
      {
        narration: '样本中个体的数目，叫做<b>样本容量</b>。本例中，200 名学生被调查，样本容量就是 200。特别注意：样本容量是一个<b>纯数</b>，不带任何单位！说"样本容量是 200 人"是错误的，应该说"样本容量是 200"。',
        enter: function () {
          // 在小框内标注数目
          S.addText('s3-lbl-n', 6.2, -0.5, '样本容量 = 200', {
            size: 17, color: PURPLE, anchorX: 'middle',
          });
          S.addText('s3-tip', 6.2, -1.6, '（纯数，无单位）', {
            size: 14, color: '#888', anchorX: 'middle',
          });
          P.renderCard('<b>样本容量</b>：样本中个体的数目<br>本例 = <b>200</b>（不带单位！）<br><br>易错：样本容量是 <b>200</b>，不是"200人"');
        },
      },
      {
        narration: '四个概念的关系：总体由全部个体组成；从总体中抽出一部分个体构成样本；样本中个体的个数就是样本容量。层层嵌套，关系清晰！',
        enter: function () {
          P.renderTable({
            head: ['概念', '本例'],
            rows: [
              ['总体', '全校2000名学生的视力（全部）'],
              ['个体', '每一名学生的视力值'],
              ['样本', '被抽取的200名学生的视力'],
              ['样本容量', '200（纯数，无单位）'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
