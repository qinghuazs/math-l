// s6-onion.js  环节六：剥洋葱与小结（4步）
// 数学验算（逐层计算）：
//   -(+5)：正号不变，最外负号 → -5
//   -(-3)：内层 -3，外层负号取反 → +3
//   +(-2)：正号不变 → -2
//   -(-(-2))：第1层 -(-2)=+2，第2层 -(+2)=-2；负号数量=3（奇数）→ 负 → -2 ✓
//
// 及时练习验算：
//   -(-(-(-6)))：第1层 -(-6)=6，第2层 -(6)=-6，第3层 -(-6)=6；负号数量=4（偶数）→ 正 → 6 ✓
//   -(+(-4))：+(-4)=-4，-(−4)=4；负号数量=2（偶数）→ 正 → 4 ✓
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

  var scene = {
    id: 's6',
    title: '六、剥洋葱与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：四个化简例逐一剥洋葱（分行展示）
      {
        narration: '多重符号化简——剥洋葱！方法：从内向外，一层一层处理。四个例子：负正5；负负3；正负2；负负负2。让我们一起来拆！',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.2, '多重符号化简：剥洋葱法', { color: COOL, size: 20 });
          S.actor('s6-sub', 0, 6.1, '从内向外，一层一层处理', { color: TEAL, size: 15 });

          // 四个例子逐行展示过程
          // 例1: -(+5) = -5
          S.actor('s6-e1-q', -6, 4.5, '$-(+5)$', { color: INK, size: 18 });
          S.actor('s6-e1-step', -1, 4.5, '正号不影响', { color: GRAY, size: 14 });
          S.actor('s6-e1-ans', 4.5, 4.5, '$= -5$', { color: RED, size: 18 });

          // 例2: -(-3) = 3
          S.actor('s6-e2-q', -6, 2.5, '$-(-3)$', { color: INK, size: 18 });
          S.actor('s6-e2-step', -1, 2.5, '负负得正', { color: GRAY, size: 14 });
          S.actor('s6-e2-ans', 4.5, 2.5, '$= 3$', { color: GREEN, size: 18 });

          // 例3: +(-2) = -2
          S.actor('s6-e3-q', -6, 0.5, '$+(-2)$', { color: INK, size: 18 });
          S.actor('s6-e3-step', -1, 0.5, '正号不变', { color: GRAY, size: 14 });
          S.actor('s6-e3-ans', 4.5, 0.5, '$= -2$', { color: RED, size: 18 });

          // 例4: -(-(-2)) 逐层
          S.actor('s6-e4-q', -6, -1.5, '$-(-(- 2))$', { color: INK, size: 18 });
          S.actor('s6-e4-l1', -1, -1.5, '第1层：$-(-2)=2$', { color: WARM, size: 14 });
          S.actor('s6-e4-l2', -1, -2.5, '第2层：$-(2)=-2$', { color: WARM, size: 14 });
          S.actor('s6-e4-ans', 4.5, -2.0, '$= -2$', { color: RED, size: 18 });

          // 负号计数说明
          S.actor('s6-neg-count', 0, -4.2,
            '负号个数：$3$ 个（奇数）→ 结果为<b>负</b>，$-2$ ✓',
            { color: COOL, size: 14 });

          P.renderCard(
            '<b>剥洋葱：从内向外</b><br>' +
            '$-(+5)=-5$（正号不影响，外层负号翻转）<br>' +
            '$-(-3)=3$（负负得正）<br>' +
            '$+(-2)=-2$（正号不变）<br>' +
            '$-(-(-2))=-2$：第 1 层 $-(-2)=2$，第 2 层 $-(2)=-2$<br>' +
            '共 $3$ 个负号（奇数）→ 结果为负 ✓'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 2：奇偶性口诀
      {
        narration: '发现规律了吗？可以数负号个数！负号奇数个，结果为负；负号偶数个，结果为正。正号不影响最终符号，不计入数量。这是快速判断的口诀，但还是要会"剥洋葱"来验证！',
        enter: function (anim) {
          // 清场上一步大量内容
          S.remove('s6-sub');
          S.remove('s6-e1-q'); S.remove('s6-e1-step'); S.remove('s6-e1-ans');
          S.remove('s6-e2-q'); S.remove('s6-e2-step'); S.remove('s6-e2-ans');
          S.remove('s6-e3-q'); S.remove('s6-e3-step'); S.remove('s6-e3-ans');
          S.remove('s6-e4-q'); S.remove('s6-e4-l1'); S.remove('s6-e4-l2'); S.remove('s6-e4-ans');
          S.remove('s6-neg-count');

          S.actor('s6-rule-title', 0, 5.8, '奇偶性口诀', { color: COOL, size: 22 });

          S.actor('s6-rule1', 0, 4.0,
            '负号个数为<b>奇数</b>个 → 结果为<b>负</b>',
            { color: RED, size: 20 });
          S.actor('s6-rule2', 0, 2.2,
            '负号个数为<b>偶数</b>个 → 结果为<b>正</b>',
            { color: GREEN, size: 20 });

          // 注意事项
          S.actor('s6-rule-note', 0, 0.2,
            '注意：正号<b>不计入</b>负号个数',
            { color: WARM, size: 16 });

          // 验证
          S.actor('s6-verify1', -4, -1.5,
            '$-(+5)$：负号 $1$ 个（奇）→ $-5$ ✓',
            { color: INK, size: 14 });
          S.actor('s6-verify2', -4, -2.7,
            '$-(-3)$：负号 $2$ 个（偶）→ 正 $3$ ✓',
            { color: INK, size: 14 });
          S.actor('s6-verify3', -4, -3.9,
            '$-(-(-2))$：负号 $3$ 个（奇）→ $-2$ ✓',
            { color: INK, size: 14 });

          P.renderCard(
            '<b>奇偶性口诀（快速判断）</b><br>' +
            '负号个数为<b>奇数</b> → 结果为<b>负</b><br>' +
            '负号个数为<b>偶数</b> → 结果为<b>正</b><br>' +
            '⚠ 正号不计入数量。<br>' +
            '口诀可快速验算，仍需会"剥洋葱"确认过程！',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 3：练习两题（-(-(-(-6)))=6、-(+(-4))=4）
      {
        narration: '来两道练习！第一题：负负负负6，有4个负号，偶数个，结果为正——等于6！剥洋葱验算：第1层-(-6)=6，第2层-(6)=-6，第3层-(-6)=6，确认等于6。第二题：负正负4，先算里面正负4=-4，再算负的负4=4，有2个负号，偶数，结果为正——等于4！',
        enter: function (anim) {
          // 清场
          S.remove('s6-rule-title'); S.remove('s6-rule1'); S.remove('s6-rule2');
          S.remove('s6-rule-note');
          S.remove('s6-verify1'); S.remove('s6-verify2'); S.remove('s6-verify3');

          S.actor('s6-prac-title', 0, 6.8, '练习：用两种方法化简', { color: COOL, size: 18 });

          // 练习1
          S.actor('s6-p1-q', 0, 5.5,
            '① $-(-(-(-6)))=$【？】',
            { color: INK, size: 18 });
          S.actor('s6-p1-method1', -3, 4.0,
            '剥洋葱：$-(-6)=6$，$-(6)=-6$，$-(-6)=6$',
            { color: WARM, size: 14 });
          S.actor('s6-p1-method2', 3, 2.8,
            '负号 $4$ 个（偶）→ 正',
            { color: TEAL, size: 14 });
          S.actor('s6-p1-ans', 0, 1.6,
            '$= 6$ ✓',
            { color: GREEN, size: 22 });

          // 分割线
          S.addSegment('s6-split', [-8, 0.7], [8, 0.7],
            { color: GRAY, width: 1, dash: 2 });

          // 练习2
          S.actor('s6-p2-q', 0, -0.2,
            '② $-(+(-4))=$【？】',
            { color: INK, size: 18 });
          S.actor('s6-p2-method1', -3, -1.5,
            '剥洋葱：$+(-4)=-4$，$-(-4)=4$',
            { color: WARM, size: 14 });
          S.actor('s6-p2-method2', 3, -2.6,
            '负号 $2$ 个（偶）→ 正',
            { color: TEAL, size: 14 });
          S.actor('s6-p2-ans', 0, -3.8,
            '$= 4$ ✓',
            { color: GREEN, size: 22 });

          P.renderCard(
            '<b>练习答案</b><br>' +
            '① $-(-(-(-6)))=6$（$4$ 个负号，偶数 → 正）<br>' +
            '② $-(+(-4))=4$（$2$ 个负号，偶数 → 正）',
            'teal',
            'tada'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },

      // Step 4：小结填空 + 悬念（不说"绝对值"）
      {
        narration: '最后小结！相反数的定义、0 的规定、字母表示 -a、几何意义，全部收入囊中。课堂小结：只有——符号——不同的两个数互为相反数；0 的相反数是 0；a 的相反数是 -a，-a 不一定是负数；在数轴上关于原点对称，到原点距离相等。还有一个"宝贝"：1.5 和 -1.5 到原点的距离都是 1.5，这个"到原点的距离"本身也很有用，明天我们专门研究它！',
        enter: function (anim) {
          // 清场所有练习内容
          S.remove('s6-prac-title');
          S.remove('s6-p1-q'); S.remove('s6-p1-method1'); S.remove('s6-p1-method2'); S.remove('s6-p1-ans');
          S.remove('s6-split');
          S.remove('s6-p2-q'); S.remove('s6-p2-method1'); S.remove('s6-p2-method2'); S.remove('s6-p2-ans');

          S.actor('s6-sum-title', 0, 6.8, '课堂小结', { color: COOL, size: 22 });

          // 小结四点
          S.actor('s6-sum1', 0, 5.2,
            '① 只有<b>符号</b>不同的两个数，叫作互为相反数',
            { color: INK, size: 15 });
          S.actor('s6-sum2', 0, 3.8,
            '② $0$ 的相反数是 $0$（$0$ 与自身互为相反数）',
            { color: INK, size: 15 });
          S.actor('s6-sum3', 0, 2.4,
            '③ $a$ 的相反数是 $-a$，$-a$ <b>不一定是负数</b>',
            { color: WARM, size: 15 });
          S.actor('s6-sum4', 0, 1.0,
            '④ 几何意义：关于原点对称，到原点距离相等',
            { color: TEAL, size: 15 });

          // 分割线
          S.addSegment('s6-sum-split', [-8, 0.1], [8, 0.1],
            { color: GRAY, width: 1, dash: 2 });

          // 悬念（不说绝对值）
          S.actor('s6-preview', 0, -1.3,
            '悬念：$1.5$ 与 $-1.5$ 到原点的距离都是 $1.5$，',
            { color: GRAY, size: 14 });
          S.actor('s6-preview2', 0, -2.4,
            '这个"<b>到原点的距离</b>"本身也是一个宝贝……',
            { color: GRAY, size: 14 });
          S.actor('s6-preview3', 0, -3.5,
            '明天我们专门研究它！敬请期待 🎯',
            { color: COOL, size: 15 });

          P.renderCard(
            '<b>课堂小结</b><br>' +
            '① 只有<b>符号</b>不同 → 互为相反数<br>' +
            '② $0$ 的相反数是 $0$<br>' +
            '③ $a$ 的相反数是 $-a$，$-a$ 不一定是负数<br>' +
            '④ 数轴上：<b>关于原点对称，到原点距离相等</b><br>' +
            '明天：研究"到原点的距离"这个宝贝！',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
