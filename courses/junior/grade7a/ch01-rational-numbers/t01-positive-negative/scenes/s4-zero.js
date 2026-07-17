// s4-zero.js  对应教学设计"环节四：0 的特殊地位"
// 温度计画板演示液柱停在0刻度，上红下蓝分区高亮。
// 关键结论：正数>0，负数<0，0既不是正数也不是负数；0是分界；0表示基准。
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 温度计参数（与 s1 同布局，但液柱停在 0）
  var TX   = -6;     // 温度计中心x
  var TW   = 0.5;    // 半宽
  var TBOT = -5;     // 底部
  var TTOP = 5;      // 顶部
  var SX   = TX + TW + 0.3; // 刻度标注x起点

  var scene = {
    id: 's4',
    title: '四、0 的特殊地位',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：先抛问——0 是正数还是负数？
      {
        narration: '现在出一道思考题：0 是正数还是负数？先别急着回答，独立想30秒。有人说"0是正数"，有人说"0就是没有，不算数"——这两种说法，对不对？',
        enter: function (anim) {
          S.actor('s4-q-title', 0, 6, '思考题', { color: TEAL, size: 22, bold: true });
          S.actor('s4-q-text',  0, 4,
            '$0$ 是正数还是负数？',
            { color: WARM, size: 28, bold: true });
          S.actor('s4-opt-a', -5, 2, 'A. $0$ 是正数', { color: INK, size: 18 });
          S.actor('s4-opt-b',  5, 2, 'B. $0$ 是负数', { color: INK, size: 18 });
          S.actor('s4-opt-c',  0, 0.5, 'C. $0$ 既不是正数，也不是负数', { color: INK, size: 18 });
          S.actor('s4-hint',   0, -1, '独立思考 30 秒，再说答案……', { color: GRAY, size: 15 });

          P.renderCard(
            '<b>思考：$0$ 是正数还是负数？</b><br>' +
            '先别急，独立想一想再回答。'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 2：温度计分界演示（液柱停在0，上红下蓝分区）
      {
        narration: '答案是 C——0 既不是正数，也不是负数。为什么？正数大于0，负数小于0，0本身这两个条件都不满足，所以单独成一类。看温度计：液柱停在0刻度，0刻度以上画红色区（正温度），0以下画蓝色区（负温度），0本身就是那条分界线——它不属于任何一边！',
        enter: function (anim) {
          // 清掉问题actor
          S.remove('s4-q-title');
          S.remove('s4-q-text');
          S.remove('s4-opt-a');
          S.remove('s4-opt-b');
          S.remove('s4-opt-c');
          S.remove('s4-hint');

          // 温度计外框
          S.addSegment('s4-thermo-left',
            [TX - TW, TBOT], [TX - TW, TTOP], { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-thermo-right',
            [TX + TW, TBOT], [TX + TW, TTOP], { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-thermo-top',
            [TX - TW, TTOP], [TX + TW, TTOP], { color: INK, width: 2, dash: 0 });
          S.addSegment('s4-thermo-bot',
            [TX - TW, TBOT], [TX + TW, TBOT], { color: INK, width: 2, dash: 0 });

          // 蓝色区（负温度区：TBOT 到 0）
          S.addPolygon('s4-neg-zone',
            [[TX - TW, TBOT], [TX + TW, TBOT], [TX + TW, 0], [TX - TW, 0]],
            { color: COOL, opacity: 0.18, borderWidth: 0 });
          // 红色区（正温度区：0 到 TTOP）
          S.addPolygon('s4-pos-zone',
            [[TX - TW, 0], [TX + TW, 0], [TX + TW, TTOP], [TX - TW, TTOP]],
            { color: WARM, opacity: 0.18, borderWidth: 0 });

          // 0刻度分界线（加粗）
          S.addSegment('s4-zero-line',
            [TX - TW, 0], [TX + TW + 0.8, 0], { color: INK, width: 3, dash: 0 });

          // 刻度与标注
          var ticks = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
          for (var i = 0; i < ticks.length; i++) {
            var t = ticks[i];
            var tw = 0.3;
            S.addSegment('s4-tick-' + (t + 5),
              [TX + TW, t], [TX + TW + tw, t],
              { color: INK, width: 1.5, dash: 0 });
          }
          S.addText('s4-tlab-n5', SX + 0.5, -5 - 0.15, '-5', { color: COOL, size: 12 });
          S.addText('s4-tlab-0',  SX + 0.3,  0 - 0.15, '0',  { color: INK,  size: 15 });
          S.addText('s4-tlab-p5', SX + 0.3,  5 - 0.15, '+5', { color: WARM, size: 12 });
          S.addText('s4-unit', TX + TW + 1.5, TTOP - 0.3, '℃', { color: INK, size: 13 });

          // 区域标注
          S.addText('s4-pos-label', TX - TW - 2, 3, '正', { color: WARM, size: 18, bold: true });
          S.addText('s4-pos-label2', TX - TW - 2, 2, '温', { color: WARM, size: 18, bold: true });
          S.addText('s4-pos-label3', TX - TW - 2, 1, '度', { color: WARM, size: 18, bold: true });
          S.addText('s4-neg-label', TX - TW - 2, -1, '负', { color: COOL, size: 18, bold: true });
          S.addText('s4-neg-label2', TX - TW - 2, -2, '温', { color: COOL, size: 18, bold: true });
          S.addText('s4-neg-label3', TX - TW - 2, -3, '度', { color: COOL, size: 18, bold: true });

          // 右侧结论
          S.actor('s4-concl1', 4, 6.5, '$0$ 的三条结论：', { color: TEAL, size: 18, bold: true });
          S.actor('s4-c1', 4, 5, '① 正数 $\\gt 0$，负数 $\\lt 0$', { color: INK, size: 16 });
          S.actor('s4-c2', 4, 3.5, '② $0$ 既<b>不是</b>正数，也<b>不是</b>负数', { color: RED, size: 16, bold: true });
          S.actor('s4-c3', 4, 2, '③ $0$ 是正数与负数的<b>分界</b>', { color: INK, size: 16 });

          P.renderCard(
            '<b>$0$ 的地位</b><br>' +
            '正数 $\\gt 0$，负数 $\\lt 0$，$0$ 两边都不满足<br>' +
            '<b>$0$ 既不是正数，也不是负数</b><br>' +
            '$0$ 是正数与负数的分界线'
          );

          return anim ? delay(400) : Promise.resolve();
        }
      },

      // Step 3：0 作基准三例（冰点/海平面/账户清零）
      {
        narration: '第三层更重要：0 不只表示"没有"，它还可以表示基准。0℃ 是冰水共存的温度——冰点，不是"没有温度"；海拔0米是海平面，不是"没有高度"；存折余额0元是账户清零，不是"没有账户"。如果今天气温是0℃，你觉得冷吗？当然冷！0℃ 是有实际意义的。',
        enter: function (anim) {
          S.remove('s4-concl1');
          S.remove('s4-c1');
          S.remove('s4-c2');
          S.remove('s4-c3');

          S.actor('s4-base-title', 4, 7, '$0$ 作基准的三个例子', { color: TEAL, size: 18, bold: true });
          S.actor('s4-b1',  4, 5.5, '① $0$℃ = 冰点（冰水共存）', { color: COOL, size: 15 });
          S.actor('s4-b1x', 4, 4.5, '  不是"没有温度"！', { color: RED, size: 14 });
          S.actor('s4-b2',  4, 3.3, '② 海拔 $0$ 米 = 海平面高度', { color: COOL, size: 15 });
          S.actor('s4-b2x', 4, 2.3, '  不是"没有高度"！', { color: RED, size: 14 });
          S.actor('s4-b3',  4, 1.1, '③ 余额 $0$ 元 = 账户清零', { color: COOL, size: 15 });
          S.actor('s4-b3x', 4, 0.1, '  不是"没有账户"！', { color: RED, size: 14 });
          S.actor('s4-concl-base', 4, -1.5,
            '$0$ 表示<b>基准</b>，不只是"没有"',
            { color: TEAL, size: 17, bold: true });

          P.renderCard(
            '<b>$0$ 不只表示"没有"</b><br>' +
            '$0$℃：冰点（有意义的温度基准）<br>' +
            '海拔 $0$ 米：海平面（高度基准）<br>' +
            '余额 $0$ 元：账户清零（金额基准）',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
