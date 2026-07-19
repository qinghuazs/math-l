// s6-summary.js  环节六：小结（3步）
// 本场景：知识地图回顾 + 三条结论卡 + 悬念预告
// 数学验算：本场景无新计算，引用前各步骤结论。
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var ORANGE = '#e65100', GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '来看本节课的知识地图。解一元一次方程共五步，每步都有理论依据，都有易错点。去分母是等式性质 2 的应用，两边同乘 LCM，每一项都要乘；去括号用分配律展开，负号前特别注意变号；移项是等式性质 1，移动变号；合并同类项是把系数相加；最后系数化为 1。记住各步的易错点，解题就不会犯低级错误。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.5, '知识地图：解一元一次方程', { color: COOL, size: 21, bold: true });
          P.renderTable({
            head: ['步骤', '操作', '依据', '易错点'],
            rows: [
              ['①去分母', '两边同乘 LCM', '等式性质 2', '漏乘整数项；分子多项式漏括号'],
              ['②去括号', '展开括号', '分配律', '负号前括号展开变号'],
              ['③移项', '移项变号', '等式性质 1', '忘记变号'],
              ['④合并同类项', '同类项相加减', '同类项定义', '系数计算出错'],
              ['⑤系数化为 1', '两边除以系数', '等式性质 2', '注意除数符号'],
            ],
          });
          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '三条核心结论，记住它们就记住了本节课的精华！第一条：去分母等于等式性质 2，两边同乘 LCM，每项一个不漏。第二条：两大坑——不漏乘，要括号！第三条：有了去分母技能，含任意分数的一元一次方程都可以解了！',
        enter: function (anim) {
          var cards = [
            ['去分母 = 等式性质 2，两边同乘 LCM，<b>每一项一个都不能落下！</b>', 'cool'],
            ['两大坑：①<b>不漏乘</b>——整数项也要乘；②<b>要括号</b>——分子多项式乘后加括号。', 'warm'],
            ['有了去分母，任意含分数的一元一次方程都可以解！', 'teal'],
          ];
          var p = Promise.resolve();
          cards.forEach(function (it) {
            p = p.then(function () {
              P.renderCard(it[0], it[1]);
              return anim ? delay(500) : Promise.resolve();
            });
          });
          return p;
        },
      },
      {
        narration: '方程已经会解了！那方程能帮我们解决什么实际问题呢？下节课我们就来挑战真实的应用题——下面是三类经典问题的预告，先猜猜各自设什么为 x，等一等，这些秘密留到下节课揭晓！',
        enter: function (anim) {
          S.actor('s6-suspense-title', 0, 6.5, '下节课预告：方程解决实际问题！', { color: ORANGE, size: 21, bold: true });
          var previews = [
            ['s6-p1', 0, 5.0, '工程队修路，每天修 100 米，几天完工？', WARM, 18],
            ['s6-p2', 0, 3.4, '商品打八折后还是 48 元，进价是多少？', WARM, 18],
            ['s6-p3', 0, 1.8, '甲乙两地相距 300 千米，速度几何？', WARM, 18],
          ];
          var p = Promise.resolve();
          previews.forEach(function (it) {
            p = p.then(function () {
              S.actor(it[0], it[1], it[2], it[3], { color: it[4], size: it[5] });
              return anim ? delay(400) : Promise.resolve();
            });
          });
          return p.then(function () {
            S.actor('s6-final', 0, 0.0,
              '方程会解了，下节课让方程解决真实问题！',
              { color: GREEN, size: 20, bold: true });
            P.renderCard(
              '<b>下节课：3.6 实际问题</b><br>' +
              '工程 / 商业 / 行程三类经典问题，<br>' +
              '全部用方程一步搞定！<br>' +
              '设好 $x$，列好方程，解方程——三步走！',
              'warm'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
