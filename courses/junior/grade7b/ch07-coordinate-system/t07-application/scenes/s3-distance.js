// s3-distance.js  用坐标求距离（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、用坐标求距离',
    bbox: [-8, 7, 8, -7],
    board: { grid: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：横向距离（同y坐标）
        narration: '现在我们学习如何用坐标计算两点间的距离。先看横向（水平方向）的情形。$A(1,2)$ 和 $B(5,2)$，它们的 $y$ 坐标相同，都是2，说明这两点在同一条水平线上。水平线上两点的距离，就等于 $x$ 坐标差的绝对值：$|x_2-x_1|=|5-1|=4$。为什么要加绝对值？因为不管谁减谁，距离都是正的。公式：若 $A(x_1,y)$，$B(x_2,y)$，则 $|AB|=|x_2-x_1|$。',
        enter: function (anim) {
          // 标出 A(1,2), B(5,2)
          S.dropPoint('ptA', 1, 2, { color: RED,  name: 'A', size: 4.5, labelOffset: [-16, -18] });
          S.dropPoint('ptB', 5, 2, { color: BLUE, name: 'B', size: 4.5, labelOffset: [6,  -18] });
          S.addText('a-lbl', -0.2, 1.4, '$A(1,2)$', { size: 13, color: RED });
          S.addText('b-lbl',  4.7, 1.4, '$B(5,2)$', { size: 13, color: BLUE });

          // 连接线段
          S.addSegment('seg-AB', [1,2], [5,2], { color: ORANGE, width: 4, dash: 0 });

          // 标注距离
          S.addText('dist-lbl', 2.8, 2.4, '$|AB|=|5-1|=4$', { size: 14, color: ORANGE });

          // x轴投影辅助线
          S.addSegment('proj-A', [1,0], [1,2], { color: RED,   width: 1.5, dash: 3 });
          S.addSegment('proj-B', [5,0], [5,2], { color: BLUE,  width: 1.5, dash: 3 });

          // 公式说明
          S.addText('formula1', -7, 5.9, '水平距离公式：', { size: 14, color: ORANGE });
          S.addText('formula1b', -7, 5.0,
            '$y$ 相同时：$|AB|=|x_2-x_1|$',
            { size: 14, color: ORANGE });

          S.addText('same-y', -7, 3.8, '$A(1,2)$，$B(5,2)$：$y$ 坐标相同，在水平线上', { size: 13, color: INK });
          S.addText('calc1', -7, 3.0, '$|AB|=|5-1|=4$', { size: 14, color: RED });

          P.renderCard(
            '<b>水平距离（$y$ 坐标相同）</b><br><br>' +
            '$A(x_1,y)$，$B(x_2,y)$<br>' +
            '$|AB| = |x_2 - x_1|$<br><br>' +
            '<b>例：</b>$A(1,2)$，$B(5,2)$<br>' +
            '$|AB| = |5-1| = \\mathbf{4}$<br><br>' +
            '（绝对值确保距离为正）'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：纵向距离（同x坐标）
        narration: '再看纵向（竖直方向）的情形。$B(5,2)$ 和 $C(5,6)$，$x$ 坐标相同，都是5，说明这两点在同一条竖直线上。竖直线上两点的距离，等于 $y$ 坐标差的绝对值：$|y_2-y_1|=|6-2|=4$。公式：若 $C(x,y_1)$，$D(x,y_2)$，则 $|CD|=|y_2-y_1|$。记忆口诀：横看 $x$，竖看 $y$，取绝对值是距离。',
        enter: function (anim) {
          // 标出 C(5,6)（保留A、B）
          S.dropPoint('ptC', 5, 6, { color: GREEN, name: 'C', size: 4.5, labelOffset: [6, 8] });
          S.addText('c-lbl', 5.2, 6.2, '$C(5,6)$', { size: 13, color: GREEN });

          // 纵向线段 B→C
          S.addSegment('seg-BC', [5,2], [5,6], { color: GREEN, width: 4, dash: 0 });

          // 标注距离
          S.addText('dist-lbl2', 5.3, 4.0, '$|BC|=|6-2|=4$', { size: 14, color: GREEN });

          // y轴投影辅助线
          S.addSegment('proj-C', [0,6], [5,6], { color: GREEN, width: 1.5, dash: 3 });
          S.addText('y2-lbl', 0.2, 6.2, '$y=6$', { size: 12, color: GREEN });
          S.addText('y1-lbl', 0.2, 2.3, '$y=2$', { size: 12, color: BLUE });

          // 公式
          S.addText('formula2', -7, 5.9, '竖直距离公式：', { size: 14, color: GREEN });
          S.addText('formula2b', -7, 5.0,
            '$x$ 相同时：$|CD|=|y_2-y_1|$',
            { size: 14, color: GREEN });

          S.addText('same-x', -7, 3.8, '$B(5,2)$，$C(5,6)$：$x$ 坐标相同，在竖直线上', { size: 13, color: INK });
          S.addText('calc2', -7, 3.0, '$|BC|=|6-2|=4$', { size: 14, color: GREEN });

          S.addText('mnemonic', 0, -6.2,
            '口诀：横看 $x$，竖看 $y$，取绝对值是距离',
            { size: 13, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>竖直距离（$x$ 坐标相同）</b><br><br>' +
            '$C(x,y_1)$，$D(x,y_2)$<br>' +
            '$|CD| = |y_2 - y_1|$<br><br>' +
            '<b>例：</b>$B(5,2)$，$C(5,6)$<br>' +
            '$|BC| = |6-2| = \\mathbf{4}$<br><br>' +
            '口诀：横看 $x$，竖看 $y$'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：综合练习——计算多段距离
        narration: '好，我们做一道综合练习。已知四个点：$P(2,1)$，$Q(6,1)$，$R(6,4)$，$T(2,4)$。（1）$P$、$Q$ 同 $y$ 坐标，$|PQ|=|6-2|=4$；（2）$Q$、$R$ 同 $x$ 坐标，$|QR|=|4-1|=3$；（3）$R$、$T$ 同 $y$ 坐标，$|RT|=|6-2|=4$；（4）$T$、$P$ 同 $x$ 坐标，$|TP|=|4-1|=3$。这四个点连起来是一个长方形，周长 $=2\\times(4+3)=14$，面积 $=4\\times3=12$。',
        enter: function (anim) {
          // 清除之前的内容
          S.remove('ptA'); S.remove('ptB'); S.remove('ptC');
          S.remove('a-lbl'); S.remove('b-lbl'); S.remove('c-lbl');
          S.remove('seg-AB'); S.remove('seg-BC');
          S.remove('proj-A'); S.remove('proj-B'); S.remove('proj-C');
          S.remove('dist-lbl'); S.remove('dist-lbl2');
          S.remove('y1-lbl'); S.remove('y2-lbl');
          S.remove('formula1'); S.remove('formula1b'); S.remove('formula2'); S.remove('formula2b');
          S.remove('same-y'); S.remove('same-x'); S.remove('calc1'); S.remove('calc2');
          S.remove('mnemonic');

          // 新四点：P(2,1), Q(6,1), R(6,4), T(2,4)
          S.dropPoint('ptP', 2, 1, { color: RED,    name: 'P', size: 4.5, labelOffset: [-16, -18] });
          S.dropPoint('ptQ', 6, 1, { color: BLUE,   name: 'Q', size: 4.5, labelOffset: [6,  -18] });
          S.dropPoint('ptR', 6, 4, { color: GREEN,  name: 'R', size: 4.5, labelOffset: [6,    8] });
          S.dropPoint('ptT', 2, 4, { color: ORANGE, name: 'T', size: 4.5, labelOffset: [-16,  8] });

          S.addText('p-lbl',  0.5, 0.5, '$P(2,1)$', { size: 12, color: RED });
          S.addText('q-lbl',  5.8, 0.5, '$Q(6,1)$', { size: 12, color: BLUE });
          S.addText('r-lbl',  6.2, 4.2, '$R(6,4)$', { size: 12, color: GREEN });
          S.addText('t-lbl',  0.5, 4.2, '$T(2,4)$', { size: 12, color: ORANGE });

          // 四条边
          S.addSegment('seg-PQ', [2,1], [6,1], { color: RED,    width: 3, dash: 0 });
          S.addSegment('seg-QR', [6,1], [6,4], { color: BLUE,   width: 3, dash: 0 });
          S.addSegment('seg-RT', [6,4], [2,4], { color: GREEN,  width: 3, dash: 0 });
          S.addSegment('seg-TP', [2,4], [2,1], { color: ORANGE, width: 3, dash: 0 });

          // 填充长方形
          S.addPolygon('rect-pqrt',
            [[2,1],[6,1],[6,4],[2,4]],
            { fillColor: '#fff9c4', fillOpacity: 0.5, strokeColor: PURPLE, strokeWidth: 0 });

          // 距离标注
          S.addText('d-PQ', 3.8, 0.5,  '$|PQ|=4$', { size: 13, color: RED });
          S.addText('d-QR', 6.3, 2.5,  '$|QR|=3$', { size: 13, color: BLUE });
          S.addText('d-RT', 3.8, 4.4,  '$|RT|=4$', { size: 13, color: GREEN });
          S.addText('d-TP', 1.0, 2.5,  '$|TP|=3$', { size: 13, color: ORANGE });

          // 结果
          S.addText('area-calc', -7, -4.5,
            '周长 $= 2\\times(4+3) = 14$；面积 $= 4\\times3 = 12$',
            { size: 14, color: PURPLE });

          P.renderCard(
            '<b>综合练习</b><br><br>' +
            '$P(2,1)$, $Q(6,1)$, $R(6,4)$, $T(2,4)$<br><br>' +
            '$|PQ|=|6-2|=4$<br>' +
            '$|QR|=|4-1|=3$<br>' +
            '$|RT|=|6-2|=4$<br>' +
            '$|TP|=|4-1|=3$<br><br>' +
            'PQRT 是长方形<br>' +
            '周长 $=14$，面积 $=12$'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
