(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', TEAL = '#00695c';
  var DOT_COLOR = '#90a4ae', HL_COLOR = '#e64a19';

  // 大框内的点阵（8列×10行 = 80个点，用于代表"全校2000名学生的视力"示意）
  var DOT_COLS = 10, DOT_ROWS = 8;
  var DOT_X0 = -8.5, DOT_Y0 = 5.5;
  var DOT_DX = 1.7, DOT_DY = 1.5;
  var dots = [];

  function dotX(c) { return DOT_X0 + c * DOT_DX; }
  function dotY(r) { return DOT_Y0 - r * DOT_DY; }

  function drawAllDots() {
    dots = [];
    var r, c, id, actor;
    for (r = 0; r < DOT_ROWS; r++) {
      for (c = 0; c < DOT_COLS; c++) {
        id = 's2-dot-' + r + '-' + c;
        actor = S.actor(id, dotX(c), dotY(r), '●', { color: DOT_COLOR, size: 11 });
        dots.push({ id: id, actor: actor, r: r, c: c });
      }
    }
  }

  // 大矩形框 4个顶点
  var BOX_POLY = [[-9.5, 6.3], [9.5, 6.3], [9.5, -5.5], [-9.5, -5.5]];

  var scene = {
    id: 's2',
    title: '二、总体与个体',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      dots = [];
    },
    steps: [
      {
        narration: '我们用一个大矩形框代表全校所有学生的视力数据，框里每一个小圆点代表一名学生的视力值。框里一共有 2000 个数据——这<b>所有数据合在一起</b>，就叫做<b>总体</b>。注意：总体是"考察对象的全体"，这里指的是全体学生视力的数值，不是学生本人。',
        enter: function () {
          // 绘制大框
          S.addPolygon('s2-bigbox', BOX_POLY, {
            color: 'none', fillOpacity: 0,
            borderColor: BLUE, borderWidth: 3,
          });
          // 绘制点阵
          drawAllDots();
          // 标注"总体"标签
          S.addText('s2-label-pop', 0, 7.0, '总体：全校 2000 名学生的视力（全部数据）', {
            size: 16, color: BLUE, anchorX: 'middle',
          });
          P.renderCard('<b>总体</b>：考察对象的<b>全体</b><br>= 全校 2000 名学生的<b>视力</b>数据<br><br>注意：总体是"指标"（视力数值），不是"学生本人"！');
        },
      },
      {
        narration: '在总体中，每一个被考察的数据，叫做<b>个体</b>。这里，每一名学生的视力值就是一个个体。现在让我高亮其中一个点——这一个点就是一个个体。',
        enter: function (anim) {
          // 高亮单个点（第3行第4列）
          var hlId = 's2-dot-3-4';
          var hlActor = S.get(hlId);
          if (hlActor) {
            hlActor.setAttribute({ fontSize: 18, strokeColor: HL_COLOR });
          }
          // 强调标签
          S.addText('s2-label-ind', 0, -6.2, '个体：每一名学生的视力（框里的一个点）', {
            size: 16, color: WARM, anchorX: 'middle',
          });
          P.renderCard('<b>个体</b>：总体中<b>每一个</b>被考察的数据<br>= 每一名学生的<b>视力值</b><br><br>红点 ● = 1个个体');
          return anim ? S.animate({
            from: 11, to: 18, duration: 500, easing: 'easeOutBack',
            onUpdate: function (v) {
              if (hlActor) hlActor.setAttribute({ fontSize: v });
            },
          }) : null;
        },
      },
      {
        narration: '总结一下：总体和个体都针对"考察的数量指标"，不是指人本身。研究视力，总体是视力的全体数据，个体是每一个视力数值。如果研究的是身高，那总体就变成所有学生的身高，个体是每个学生的身高值。记住：总体 = 所有个体的集合！',
        enter: function () {
          P.renderTable({
            head: ['概念', '含义', '本例'],
            rows: [
              ['总体', '考察对象的全体', '全校2000名学生的视力'],
              ['个体', '总体中每一个考察对象', '每一名学生的视力值'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
