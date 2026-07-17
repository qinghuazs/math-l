// s1-intro.js  对应教学设计"环节一：情境导入——天气预报里的零下"
// 无数学运算，纯情境引入。温度计用 addSegment+addPolygon 组合绘制。
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var RED  = '#c62828';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 温度计参数
  // 外框：矩形，x ∈ [-0.4, 0.4]，y ∈ [-5, 5]（画板单位）
  // 液柱：竖线段（粗），从底部 y=-5 升到当前温度刻度
  // 刻度：-5 ~ +5，每格 1 单位，标 -3/0/+3
  var THERMO_X    = -6;   // 温度计中心x
  var THERMO_W    = 0.5;  // 半宽
  var THERMO_BOT  = -5;   // 底部y
  var THERMO_TOP  = 5;    // 顶部y
  var SCALE_X     = THERMO_X + THERMO_W + 0.3; // 刻度文字x

  // 闭包变量
  var liquidY;  // 当前液柱顶部y（-3 → 温度-3℃ 对应画板y=-3）

  var scene = {
    id: 's1',
    title: '一、天气预报里的零下',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      liquidY = -3;
    },
    steps: [
      // Step 1：天气预报卡出场 + 温度计绘制（液柱停在 -3℃）
      {
        narration: '同学们，看这道天气预报：今日北京气温 -3℃ 至 3℃。你在电视上、手机上肯定见过这样的数字——但你有没有想过，-3℃ 里面那个"减号"是什么？小学里我们学过 3 这个数，可"负三"这种写法，小学见过吗？',
        enter: function (anim) {
          // 温度计外框（矩形四边）
          S.addSegment('s1-thermo-left',
            [THERMO_X - THERMO_W, THERMO_BOT],
            [THERMO_X - THERMO_W, THERMO_TOP],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-thermo-right',
            [THERMO_X + THERMO_W, THERMO_BOT],
            [THERMO_X + THERMO_W, THERMO_TOP],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-thermo-top',
            [THERMO_X - THERMO_W, THERMO_TOP],
            [THERMO_X + THERMO_W, THERMO_TOP],
            { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-thermo-bot',
            [THERMO_X - THERMO_W, THERMO_BOT],
            [THERMO_X + THERMO_W, THERMO_BOT],
            { color: INK, width: 2, dash: 0 });

          // 刻度线与标注 -5 到 5
          var ticks = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
          for (var i = 0; i < ticks.length; i++) {
            var t = ticks[i];
            var tw = (t % 5 === 0 || t === 0) ? 0.6 : 0.3;
            S.addSegment('s1-tick-' + (t + 5),
              [THERMO_X + THERMO_W, t],
              [THERMO_X + THERMO_W + tw, t],
              { color: INK, width: 1.5, dash: 0 });
          }
          // 只标 -3、0、+3 的刻度值
          S.addText('s1-tlab-n3', SCALE_X + 0.4, -3 - 0.15, '-3', { color: COOL, size: 14 });
          S.addText('s1-tlab-0',  SCALE_X + 0.2,  0 - 0.15, '0',  { color: INK,  size: 14 });
          S.addText('s1-tlab-p3', SCALE_X + 0.3,  3 - 0.15, '+3', { color: WARM, size: 14 });
          S.addText('s1-tlab-unit', THERMO_X + THERMO_W + 1.5, THERMO_TOP - 0.3, '℃', { color: INK, size: 13 });

          // 液柱（从底部到 -3℃）
          S.addSegment('s1-liquid',
            [THERMO_X, THERMO_BOT],
            [THERMO_X, liquidY],
            { color: COOL, width: 12, dash: 0 });

          // 天气预报信息卡（右侧画板区域）
          S.actor('s1-weather-title', 3, 6.5, '☀ 北京天气预报', { color: INK, size: 20, bold: true });
          S.actor('s1-weather-low',   3, 4.5, '最低气温：$-3$℃',  { color: COOL, size: 24, bold: true });
          S.actor('s1-weather-high',  3, 2.5, '最高气温：$+3$℃', { color: WARM, size: 24, bold: true });

          P.renderCard(
            '<b>今日北京：$-3$℃ 至 $+3$℃</b><br>' +
            '你能读出 $-3$℃ 吗？它表示什么意思？<br>' +
            '小学里见过 $-3$ 这种写法吗？'
          );

          return anim ? delay(400) : Promise.resolve();
        }
      },

      // Step 2：-3℃ 的含义 + 液柱从 -3 升到 +3 动画
      {
        narration: '零下三摄氏度——这个"零下"就是"比零还低"的意思。我们看温度计：现在液柱停在 -3 刻度。如果气温升到 +3℃，液柱会怎么变化？看，液柱从 -3 一路上升到 +3！——它穿过了 0 这个刻度。',
        enter: function (anim) {
          // 清掉旧液柱，重画到 +3
          S.remove('s1-liquid');

          if (!anim) {
            liquidY = 3;
            S.addSegment('s1-liquid',
              [THERMO_X, THERMO_BOT],
              [THERMO_X, liquidY],
              { color: WARM, width: 12, dash: 0 });
            P.renderCard(
              '<b>$-3$℃ → $+3$℃：液柱穿过 $0$</b><br>' +
              '$-3$℃：读作"负三摄氏度"，比 $0$℃ 低 $3$ 度<br>' +
              '$+3$℃：读作"正三摄氏度"，比 $0$℃ 高 $3$ 度'
            );
            return Promise.resolve();
          }

          // 动画：用 stage.animate 让液柱高度从 -3 升到 +3（tween 只支持标量 from/to）
          return S.animate({
            from: -3,
            to: 3,
            duration: 1200,
            onUpdate: function (v) {
              S.remove('s1-liquid');
              S.addSegment('s1-liquid',
                [THERMO_X, THERMO_BOT],
                [THERMO_X, v],
                { color: WARM, width: 12, dash: 0 });
            }
          }).then(function () {
            liquidY = 3;
            P.renderCard(
              '<b>$-3$℃ → $+3$℃：液柱穿过 $0$</b><br>' +
              '$-3$℃：读作"负三摄氏度"，比 $0$℃ 低 $3$ 度<br>' +
              '$+3$℃：读作"正三摄氏度"，比 $0$℃ 高 $3$ 度',
              'cool'
            );
            return delay(300);
          });
        }
      },

      // Step 3：归纳"方向相反、数值一样"
      {
        narration: '这两个温度 -3℃ 和 +3℃，有什么特点？方向相反——一个在零下，一个在零上；数值一样——都是 3。数学上，我们说它们是一对"具有相反意义的量"。这就是今天引入负数的核心原因！',
        enter: function (anim) {
          // 清掉天气预报actor，换成归纳卡
          S.remove('s1-weather-title');
          S.remove('s1-weather-low');
          S.remove('s1-weather-high');

          // 在液柱 -3 和 +3 处画箭头指示
          S.addSegment('s1-arr-low',
            [THERMO_X + THERMO_W + 0.1, -3],
            [THERMO_X + THERMO_W + 1.8, -3],
            { color: COOL, width: 2, dash: 0 });
          S.addSegment('s1-arr-high',
            [THERMO_X + THERMO_W + 0.1, 3],
            [THERMO_X + THERMO_W + 1.8, 3],
            { color: WARM, width: 2, dash: 0 });

          // 归纳文字
          S.actor('s1-concl1', 3, 6,   '归纳：',               { color: TEAL, size: 18, bold: true });
          S.actor('s1-concl2', 3, 4.5, '$-3$℃ 与 $+3$℃', { color: INK,  size: 18 });
          S.actor('s1-concl3', 3, 3,   '方向<b>相反</b>，数值<b>相同</b>',   { color: INK,  size: 17 });
          S.actor('s1-concl4', 3, 1.5, '↓',                   { color: INK,  size: 18 });
          S.actor('s1-concl5', 3, 0,   '具有<b>相反意义的量</b>',         { color: WARM, size: 18, bold: true });

          P.renderCard(
            '<b>核心发现</b><br>' +
            '$-3$℃（零下）与 $+3$℃（零上）：<br>' +
            '方向<b>相反</b>，数值<b>一样</b>——叫做"具有相反意义的量"<br>' +
            '这就是引入负数的动机！',
            'teal'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
