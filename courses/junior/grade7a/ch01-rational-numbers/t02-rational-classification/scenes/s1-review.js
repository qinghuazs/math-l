// s1-review.js  环节一：数的家族大聚会（3步）
// 对应教学设计环节一：复习导入——数的家族大聚会
// 数学验算：9张数字卡片 15, -3.9, 0, 4/5, -10, -2/3, 0.1, 128, -80
//   正整数：15, 128；负整数：-10, -80；0；正分数：4/5, 0.1；负分数：-2/3, -3.9
//   小数 0.1 = 1/10（正分数）；-3.9 = -39/10（负分数）——两者都是分数
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 9张卡片的显示文字与初始飞入位置
  // 最终落位：3行3列排列，bbox [-10,7,10,-3]
  //   列 x：-6, 0, 6；行 y：5, 2.5, 0
  var CARDS = [
    { id: 's1-c0',  label: '15',                      fx: -6,  fy: 5 },
    { id: 's1-c1',  label: '$-3.9$',                  fx:  0,  fy: 5 },
    { id: 's1-c2',  label: '0',                        fx:  6,  fy: 5 },
    { id: 's1-c3',  label: '$\\dfrac{4}{5}$',          fx: -6,  fy: 2.5 },
    { id: 's1-c4',  label: '$-10$',                    fx:  0,  fy: 2.5 },
    { id: 's1-c5',  label: '$-\\dfrac{2}{3}$',         fx:  6,  fy: 2.5 },
    { id: 's1-c6',  label: '0.1',                      fx: -6,  fy: 0 },
    { id: 's1-c7',  label: '128',                      fx:  0,  fy: 0 },
    { id: 's1-c8',  label: '$-80$',                    fx:  6,  fy: 0 }
  ];

  // 飞入起点（画板上方/右侧屏外）
  var START_POSITIONS = [
    [-12, 10], [0, 10], [12, 10],
    [-12, 6],  [0, 6],  [12, 6],
    [-12, -4], [0, -4], [12, -4]
  ];

  // 闭包变量（setup 重置）
  var actors = [];

  var scene = {
    id: 's1',
    title: '一、数的家族大聚会',
    bbox: [-10, 7, 10, -3],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      actors = [];
    },
    steps: [
      // Step 1：9张卡片飞入画板
      {
        narration: '同学们，上节课我们认识了正数和负数。今天老师把一批"老朋友"请来了——这九个数你们都见过！我们来看看，它们都是谁。',
        enter: function (anim) {
          if (!anim) {
            // 快放：直接摆到最终位置
            for (var i = 0; i < CARDS.length; i++) {
              var c = CARDS[i];
              var a = S.actor(c.id, c.fx, c.fy, c.label, { color: COOL, size: 20, bold: true });
              actors.push(a);
            }
            P.renderCard('<b>9 张数字卡片</b><br>$15$、$-3.9$、$0$、$\\dfrac{4}{5}$、$-10$、$-\\dfrac{2}{3}$、$0.1$、$128$、$-80$');
            return null;
          }
          // 动画：依次飞入
          var chain = Promise.resolve();
          for (var j = 0; j < CARDS.length; j++) {
            (function (idx) {
              chain = chain.then(function () {
                var c = CARDS[idx];
                var sp = START_POSITIONS[idx];
                var a = S.actor(c.id, sp[0], sp[1], c.label, { color: COOL, size: 20, bold: true });
                actors.push(a);
                return a.moveTo(c.fx, c.fy, 300);
              });
            })(j);
          }
          return chain.then(function () {
            P.renderCard('<b>9 张数字卡片全部就位！</b><br>$15$、$-3.9$、$0$、$\\dfrac{4}{5}$、$-10$、$-\\dfrac{2}{3}$、$0.1$、$128$、$-80$');
            return delay(300);
          });
        }
      },

      // Step 2：提问哪些是一家人
      {
        narration: '这九个数里面，有正数，有负数，还有一个特别的——0。请你想一想：哪些数"长得像"，应该是一家人呢？（学生自由发言）同学们说得很好，15、128、-10、-80 看起来都是整数；4/5、-2/3 是分数；0.1 和 -3.9 嘛……看起来是小数？',
        enter: function (anim) {
          // 用不同颜色标注整数候选（15, -10, 0, 128, -80）
          S.actor('s1-hint-int', -8.5, 6, '整数？', { color: TEAL, size: 16, bold: true });
          S.addSegment('s1-box-int', [-9, 6.5], [-9, -0.6], { color: TEAL, width: 2, dash: 2 });
          S.addSegment('s1-box-int2', [-9, -0.6], [-3.5, -0.6], { color: TEAL, width: 2, dash: 2 });
          S.addSegment('s1-box-int3', [-3.5, -0.6], [-3.5, 6.5], { color: TEAL, width: 2, dash: 2 });
          S.addSegment('s1-box-int4', [-3.5, 6.5], [-9, 6.5], { color: TEAL, width: 2, dash: 2 });

          S.actor('s1-hint-frac', 2.2, 6, '分数？', { color: GREEN, size: 16, bold: true });

          S.actor('s1-hint-dec', 2.2, -1.5, '小数？', { color: WARM, size: 16, bold: true });
          S.actor('s1-hint-q', 0, -2.3, '小数算哪一类？', { color: WARM, size: 17, bold: true });

          P.renderCard('整数：$15$、$0$、$-10$、$128$、$-80$<br>分数：$\\dfrac{4}{5}$、$-\\dfrac{2}{3}$<br><b>0.1 和 -3.9 是什么？小数 = 分数？</b>', 'warm');
          return anim ? delay(400) : null;
        }
      },

      // Step 3：暴露"小数算哪类"冲突
      {
        narration: '看，问题来了！0.1 和 -3.9 是小数——但我们以前的分类里只有整数和分数，小数算哪家？这就是今天我们要解决的核心问题。今天这节课，我们来给数的大家族做一次彻底的整理，弄清楚它们到底分几类、每一类谁是成员！',
        enter: function (anim) {
          S.remove('s1-hint-int');
          S.remove('s1-box-int'); S.remove('s1-box-int2');
          S.remove('s1-box-int3'); S.remove('s1-box-int4');
          S.remove('s1-hint-frac');
          S.remove('s1-hint-dec');
          S.remove('s1-hint-q');

          // 给 0.1 和 -3.9 加问号标注
          S.actor('s1-q-01',  -8, -1.5, '0.1 → ？', { color: WARM, size: 18, bold: true });
          S.actor('s1-q-39',   2, -1.5, '$-3.9$ → ？', { color: WARM, size: 18, bold: true });

          S.actor('s1-conflict', 0, 6.2,
            '小数 = 分数？还是独立一类？',
            { color: WARM, size: 18, bold: true });

          P.renderCard(
            '<b>认知冲突：</b><br>' +
            '$0.1$ 和 $-3.9$ 是小数，但小数属于哪一家？<br>' +
            '今天我们就来彻底整理数的大家族！',
            'warm'
          );
          return anim ? delay(500) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
