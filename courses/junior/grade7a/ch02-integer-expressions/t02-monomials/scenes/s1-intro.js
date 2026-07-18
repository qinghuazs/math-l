// s1-intro.js  环节一：给式子起名字（3步）
// 数学验算：六个式子 3x、a+b、-5y²、1/x、πr²、2a-3b
// 乘积型（无加减、分母无字母）：3x（数×字母）、-5y²（数×字母²）、πr²（常数×字母²）共3个
// 含加减或分母含字母：a+b、1/x、2a-3b 共3个
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 六个式子的画板坐标（两列三行布局，bbox: [-10,8,10,-8]）
  // 左列 x=-5，右列 x=4，行 y=4、1、-2
  var EXPRS = [
    { id: 's1-e1', x: -5, y:  4, tex: '$3x$',         isProduct: true  },
    { id: 's1-e2', x:  4, y:  4, tex: '$a+b$',        isProduct: false },
    { id: 's1-e3', x: -5, y:  1, tex: '$-5y^2$',      isProduct: true  },
    { id: 's1-e4', x:  4, y:  1, tex: '$\\dfrac{1}{x}$', isProduct: false },
    { id: 's1-e5', x: -5, y: -2, tex: '$\\pi r^2$',   isProduct: true  },
    { id: 's1-e6', x:  4, y: -2, tex: '$2a-3b$',      isProduct: false },
  ];

  var scene = {
    id: 's1',
    title: '一、给式子起名字',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：把上节课的六个代数式摆出来
      {
        narration: '同学们，上节课我们用字母表示数，写出了很多代数式。今天我们把其中六个摆出来仔细看一看——3x，a加b，负5y的平方，1除以x，π乘以r的平方，2a减3b。请大家想一想：这六个式子里，分别用了哪些运算？',
        enter: function (anim) {
          var i;
          for (i = 0; i < EXPRS.length; i++) {
            S.actor(EXPRS[i].id, EXPRS[i].x, EXPRS[i].y, EXPRS[i].tex,
              { color: INK, size: 22 });
          }
          P.renderCard(
            '<b>上节课的六个代数式</b><br>' +
            '$3x$，$a+b$，$-5y^2$，$\\dfrac{1}{x}$，$\\pi r^2$，$2a-3b$<br>' +
            '仔细观察：每个式子里用了什么运算？'
          );
          return anim ? delay(300) : null;
        },
      },

      // Step 2：学生分类——引导观察运算结构
      {
        narration: '我来引导大家分类：有的式子里有加号或减号，比如 a加b、2a减3b；有的式子里只有乘法——3x 是3乘x，负5y的平方是负5乘y的平方，πr的平方是π乘r的平方。还有 1除以x，分母含有字母，有点特别。我们能不能按"有没有加减运算"来分成两组？',
        enter: function (anim) {
          var i, e;
          // 乘积型变暖橙色，非乘积型变灰
          for (i = 0; i < EXPRS.length; i++) {
            e = EXPRS[i];
            S.remove(e.id);
            S.actor(e.id, e.x, e.y, e.tex,
              { color: e.isProduct ? WARM : GRAY, size: 22 });
          }
          // 分组标签
          S.actor('s1-lab-product', -5, 6.2, '乘积型（只含乘法）', { color: WARM, size: 16 });
          S.actor('s1-lab-other',    4, 6.2, '含加减或分母含字母', { color: GRAY, size: 16 });
          P.renderCard(
            '<b>按运算分两组</b><br>' +
            '<span style="color:#e64a19">乘积型</span>：$3x$、$-5y^2$、$\\pi r^2$（只含乘法）<br>' +
            '<span style="color:#90a4ae">另一组</span>：$a+b$、$2a-3b$（含加减）；$\\dfrac{1}{x}$（分母含字母）'
          );
          return anim ? delay(400) : null;
        },
      },

      // Step 3：聚拢乘积型，圆圈标注，引出悬念
      {
        narration: '好，现在把乘积型的三个式子聚拢到中间来。3x、负5y的平方、πr的平方——这三个家伙只用了乘法，它们是一家人！数学家给这一家人起了个专门的名字。是什么名字呢？我们下一个环节就来揭晓！',
        enter: function (anim) {
          var i, e;
          // 移除所有旧元素
          for (i = 0; i < EXPRS.length; i++) {
            S.remove(EXPRS[i].id);
          }
          S.remove('s1-lab-product');
          S.remove('s1-lab-other');

          // 非乘积型留灰色在原位（淡化）
          S.actor('s1-e2-gray', 5, 5,   '$a+b$',   { color: GRAY, size: 18 });
          S.actor('s1-e4-gray', 5, 3,   '$\\dfrac{1}{x}$', { color: GRAY, size: 18 });
          S.actor('s1-e6-gray', 5, 1,   '$2a-3b$', { color: GRAY, size: 18 });

          // 乘积型聚拢到中央
          S.actor('s1-p1', -2.5, 2,  '$3x$',      { color: WARM, size: 26 });
          S.actor('s1-p2',  0,   2,  '$-5y^2$',   { color: WARM, size: 26 });
          S.actor('s1-p3',  2.5, 2,  '$\\pi r^2$', { color: WARM, size: 26 });

          // 圆圈圈住三个乘积型（keepAspect:false 下 addCircle 只做视觉效果）
          S.addCircle('s1-circle', 0, 2, 4.2,
            { color: WARM, fill: WARM, fillOpacity: 0.06, width: 2.5, dash: 2 });

          // 悬念问号
          S.actor('s1-question', 0, -3.5, '这一家人叫什么名字？', { color: TEAL, size: 20 });

          P.renderCard(
            '<b>乘积型聚拢</b><br>' +
            '$3x$，$-5y^2$，$\\pi r^2$——它们都只含乘法！<br>' +
            '数学给这一家人起了一个专门的名字……<br>' +
            '<b>下一步揭晓！</b>',
            'warm'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
