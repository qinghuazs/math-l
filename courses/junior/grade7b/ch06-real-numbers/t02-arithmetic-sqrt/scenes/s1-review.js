(function (CW) {
  'use strict';
  // 场景一：复习引入
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、复习引入',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '同学们好！上节课我们学习了平方根的概念：一个数的平方等于 $a$，这个数就叫作 $a$ 的平方根。比如，$25$ 的平方根是什么呢？因为 $5^2=25$，$(-5)^2=25$，所以 $25$ 的平方根是 $\\pm 5$，也就是 $5$ 和 $-5$ 两个数。请大家先在心里回答一下。',
        enter: function (anim) {
          S.actor('s1-title', 0, 5.5, '一、复习引入', { color: WARM, size: 26, bold: true });
          S.actor('s1-q', 0, 2.5, '$25$ 的平方根是多少？', { color: INK, size: 20 });
          // 画一个正方形示意：面积25
          S.addPolygon('s1-sq', [[-3, -0.5], [3, -0.5], [3, -4.5], [-3, -4.5]],
            { color: COOL, opacity: 0.12, borderWidth: 3, borderColor: COOL });
          S.actor('s1-area', 0, -2.5, '面积 $= 25$', { color: COOL, size: 18 });
          P.clearExtras();
          P.renderCard('复习：<b>平方根</b><br><br>若 $x^2 = a$（$a\\geq 0$），<br>则 $x$ 叫作 $a$ 的平方根。<br><br>$25$ 的平方根 $= ?$');
          if (!anim) return null;
          var o = S.get('s1-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 12, to: 26, duration: 600, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '回答得很好！$25$ 的平方根是 $\\pm 5$，即 $+5$ 和 $-5$。不过，问题来了：我们把一块正方形地板铺在地上，面积是 $25$ 平方厘米，那它的边长应该是多少？边长能是负数 $-5$ 吗？当然不能！现实中的长度只能取正值，所以边长只能是 $5$ 厘米。',
        enter: function (anim) {
          // 显示±5答案
          S.actor('s1-ans-plus', -2.5, 1.0, '$+5$', { color: GREEN, size: 22, bold: true });
          S.actor('s1-ans-minus', 2.5, 1.0, '$-5$', { color: GRAY, size: 22 });
          S.actor('s1-ans-label', 0, 1.0, '或', { color: INK, size: 18 });
          // 在正方形内标注边长
          S.actor('s1-side-top', 0, -0.2, '$5$', { color: GREEN, size: 18, bold: true });
          S.actor('s1-side-right', 3.5, -2.5, '$5$', { color: GREEN, size: 18, bold: true });
          // 叉掉负5
          S.actor('s1-cross', 2.5, 0.2, '✗', { color: WARM, size: 20 });
          P.clearExtras();
          P.renderCard('$25$ 的平方根 $= \\pm 5$<br><br>但边长只取<b>正值</b>：<br>边长 $= 5$（不能取 $-5$）<br><br>生活中只需要<b>正的那个</b>平方根！');
          if (!anim) return null;
          return delay(400);
        },
      },
      {
        narration: '这就引出了今天的新概念：算术平方根。正数的平方根有两个，一正一负，生活中我们往往只需要那个正的。数学上给这个"正的平方根"起了一个专门的名字，叫作算术平方根。今天我们就来系统学习算术平方根的定义、记号和性质。',
        enter: function (anim) {
          S.remove('s1-ans-plus'); S.remove('s1-ans-minus');
          S.remove('s1-ans-label'); S.remove('s1-cross');
          S.remove('s1-side-top'); S.remove('s1-side-right');
          S.remove('s1-sq'); S.remove('s1-area');
          S.remove('s1-q');
          S.actor('s1-lead', 0, 2.5, '正数的平方根有两个：', { color: INK, size: 18 });
          S.actor('s1-lead2', 0, 1.0, '正的那个 $\\Rightarrow$ 算术平方根', { color: WARM, size: 20, bold: true });
          S.actor('s1-arrow', 0, -1.5, '今天学习：算术平方根', { color: COOL, size: 20, bold: true });
          P.clearExtras();
          P.renderCard('<b>本节目标</b><br><br>① 算术平方根的定义<br>② 根号记号 $\\sqrt{a}$ 的含义<br>③ 双重非负性<br>④ 典型计算练习');
          if (!anim) return null;
          return delay(300);
        },
      },
    ],
    expectSteps: 3,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
