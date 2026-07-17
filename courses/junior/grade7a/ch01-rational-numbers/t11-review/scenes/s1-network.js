// s1-network.js  一、知识网络总览（3步）
// 数学验算：
// ① (-20)+3+5-7 = (-20-7)+(3+5) = -27+8 = -19
// ② (-2)^3×(-3)+|-6|÷(-2) = (-8)×(-3)+6÷(-2) = 24+(-3) = 21
// ③ -3^2+[1-(-2)^3]÷(-3) = -9+[1+8]÷(-3) = -9+9÷(-3) = -9+(-3) = -12
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、知识网络总览',
    bbox: [-11, 8, 11, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：三大板块知识树逐枝展开
        narration: '同学们，今天是第一章《有理数》的收官课！我们学了10节课，今天用45分钟把它串成一张图。先看大结构——三大板块：概念、运算、应用。概念是地基，运算是楼层，应用是把楼用起来。先看概念枝：正负数→有理数分类→数轴→相反数→绝对值与大小比较。再看运算枝：加法→减法→乘除法→乘方→混合运算顺序→运算律。最后应用枝：科学记数法→近似数与精确度。',
        enter: function (anim) {
          // 主干
          S.actor('s1-root', 0, 7.2, '第一章  有理数', { color: INK, size: 22, bold: true });
          S.addSegment('s1-trunk', [0, 6.8], [0, 5.5], { color: INK, width: 3, dash: 0 });
          // 三大分枝横线
          S.addSegment('s1-branch-h', [-7.5, 5.5], [7.5, 5.5], { color: INK, width: 2.5, dash: 0 });
          // 概念枝
          S.addSegment('s1-br-concept', [-7.5, 5.5], [-7.5, 4.6], { color: COOL, width: 2.5, dash: 0 });
          S.actor('s1-concept-title', -7.5, 4.2, '【概念板块】', { color: COOL, size: 17, bold: true });
          // 概念子节点（逐行）
          var nodes1 = ['正数与负数', '有理数分类', '数轴三要素', '相反数', '绝对值与大小比较'];
          for (var i = 0; i < nodes1.length; i++) {
            S.addSegment('s1-cv-v' + i, [-7.5, 3.7 - i * 1.3], [-7.5, 3.0 - i * 1.3],
              { color: COOL, width: 1.5, dash: 2 });
            S.actor('s1-cv-' + i, -7.5, 2.85 - i * 1.3, nodes1[i], { color: COOL, size: 14 });
          }
          // 运算枝
          S.addSegment('s1-br-ops', [0, 5.5], [0, 4.6], { color: WARM, width: 2.5, dash: 0 });
          S.actor('s1-ops-title', 0, 4.2, '【运算板块】', { color: WARM, size: 17, bold: true });
          var nodes2 = ['加法法则', '减法→加法', '乘除法（奇负偶正）', '乘方（优先级最高）', '混合运算顺序', '运算律'];
          for (var j = 0; j < nodes2.length; j++) {
            S.addSegment('s1-op-v' + j, [0, 3.7 - j * 1.0], [0, 3.1 - j * 1.0],
              { color: WARM, width: 1.5, dash: 2 });
            S.actor('s1-op-' + j, 0, 2.95 - j * 1.0, nodes2[j], { color: WARM, size: 13 });
          }
          // 应用枝
          S.addSegment('s1-br-app', [7.5, 5.5], [7.5, 4.6], { color: TEAL, width: 2.5, dash: 0 });
          S.actor('s1-app-title', 7.5, 4.2, '【应用板块】', { color: TEAL, size: 17, bold: true });
          var nodes3 = ['科学记数法', '近似数与精确度'];
          for (var k = 0; k < nodes3.length; k++) {
            S.addSegment('s1-ap-v' + k, [7.5, 3.7 - k * 1.6], [7.5, 3.0 - k * 1.6],
              { color: TEAL, width: 1.5, dash: 2 });
            S.actor('s1-ap-' + k, 7.5, 2.85 - k * 1.6, nodes3[k], { color: TEAL, size: 14 });
          }
          P.renderCard(
            '<b>三大板块</b>：概念是地基，运算是楼层，应用是把楼用起来。<br>' +
            '<span style="color:' + COOL + '">概念</span>：正负数 → 分类 → 数轴 → 相反数 → 绝对值<br>' +
            '<span style="color:' + WARM + '">运算</span>：加 → 减 → 乘除 → 乘方 → 混合 → 运算律<br>' +
            '<span style="color:' + TEAL + '">应用</span>：科学记数法 → 近似数'
          );
          return anim ? delay(500) : null;
        },
      },
      {
        // 步骤2：数轴一线串珠——把概念五点挂上数轴
        narration: '概念板块有一条主线——数轴是桥梁。我们在数轴上标出 -3、-1.5、0、2/5、8 这五个数。高亮 -3 与 3 关于原点对称，这就是相反数！|−3|=3 是到原点的距离，对应绝对值。负有理数在原点左侧，正有理数在原点右侧——分类清晰可见。数轴把概念板块五个知识点串成一条线，一眼看清！',
        enter: function (anim) {
          // 清除上一步所有树枝节点，保留简化版背景
          S.remove('s1-root'); S.remove('s1-trunk'); S.remove('s1-branch-h');
          S.remove('s1-br-concept'); S.remove('s1-concept-title');
          S.remove('s1-br-ops'); S.remove('s1-ops-title');
          S.remove('s1-br-app'); S.remove('s1-app-title');
          for (var i = 0; i < 5; i++) { S.remove('s1-cv-v' + i); S.remove('s1-cv-' + i); }
          for (var j = 0; j < 6; j++) { S.remove('s1-op-v' + j); S.remove('s1-op-' + j); }
          for (var k = 0; k < 2; k++) { S.remove('s1-ap-v' + k); S.remove('s1-ap-' + k); }

          // 数轴主线（y=0 处，横跨画面）
          S.addSegment('s1-ax', [-10, 0], [10.2, 0], { color: INK, width: 3, dash: 0 });
          // 箭头
          S.addSegment('s1-arr1', [10.0, 0.25], [10.3, 0], { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-arr2', [10.0, -0.25], [10.3, 0], { color: INK, width: 2, dash: 0 });

          // 刻度与标签（-4 到 9，标整数刻度）
          var ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          for (var t = 0; t < ticks.length; t++) {
            var xpos = ticks[t] * 0.9;
            S.addSegment('s1-tk-' + t, [xpos, -0.2], [xpos, 0.2], { color: GRAY, width: 1.5, dash: 0 });
            if (ticks[t] !== 0) {
              S.addText('s1-tl-' + t, xpos - 0.1, -0.55, '' + ticks[t], { color: GRAY, size: 12 });
            }
          }
          // 原点标签
          S.addText('s1-tl-o', -0.15, -0.55, '0', { color: INK, size: 14, bold: true });

          // 标注五个数
          var pts = [
            { v: -3,   x: -3 * 0.9, lab: '-3',              color: RED   },
            { v: -1.5, x: -1.5 * 0.9, lab: '-1.5',          color: COOL  },
            { v: 0,    x: 0,           lab: '',              color: INK   },
            { v: 2/5,  x: (2/5) * 0.9, lab: '$\\frac{2}{5}$', color: GREEN },
            { v: 8,    x: 8 * 0.9,     lab: '8',             color: ORANGE},
          ];
          for (var p = 0; p < pts.length; p++) {
            S.addSegment('s1-pt-tk-' + p, [pts[p].x, -0.3], [pts[p].x, 0.3],
              { color: pts[p].color, width: 2.5, dash: 0 });
            if (pts[p].lab) {
              S.addText('s1-pt-lb-' + p, pts[p].x - 0.3, 0.7, pts[p].lab,
                { color: pts[p].color, size: 15, bold: true });
            }
          }

          // 相反数：高亮 -3 与 3 对称弧
          S.addSegment('s1-sym-l', [-3 * 0.9, 1.7], [-3 * 0.9, 1.3], { color: RED, width: 2, dash: 0 });
          S.addSegment('s1-sym-r', [3 * 0.9, 1.7], [3 * 0.9, 1.3], { color: RED, width: 2, dash: 0 });
          S.addSegment('s1-sym-top', [-3 * 0.9, 1.7], [3 * 0.9, 1.7], { color: RED, width: 2, dash: 2 });
          S.addText('s1-sym-lab', -0.3, 2.15, '关于原点对称（相反数）', { color: RED, size: 13 });
          S.addText('s1-3pos', 3 * 0.9 - 0.15, 0.7, '3', { color: RED, size: 15, bold: true });

          // 绝对值：距离线段标注
          S.addSegment('s1-abs-line', [0, -1.5], [-3 * 0.9, -1.5], { color: WARM, width: 3, dash: 0 });
          S.addText('s1-abs-lab', -1.5, -2.15, '$|-3|=3$（到原点的距离）', { color: WARM, size: 14 });

          // 分类标注
          S.addText('s1-neg-lab', -5.5, -3.5, '← 负有理数（原点左侧）', { color: COOL, size: 13 });
          S.addText('s1-pos-lab', 2.0, -3.5, '正有理数（原点右侧）→', { color: GREEN, size: 13 });

          P.renderCard(
            '<b>数轴是桥梁</b>——概念五点一线串：<br>' +
            '① 分类：负数在左，正数在右，0 在中间<br>' +
            '② 相反数：<span style="color:' + RED + '">-3 与 3</span> 关于原点对称<br>' +
            '③ 绝对值：$|-3|=3$ 是点到原点的距离<br>' +
            '④ 大小比较：数轴上越靠右越大'
          );
          return anim ? delay(500) : null;
        },
      },
      {
        // 步骤3：主线宣言
        narration: '记住这句话：数轴是桥梁，分类、相反数、绝对值、大小比较，全都可以挂在数轴上理解。三大板块中，概念是基础，没有概念谈不了运算，不会运算用不了科学记数法。这张图就是本章的全部家当！',
        enter: function (anim) {
          // 清除数轴细节，保留主轴，加上总结卡
          S.remove('s1-sym-l'); S.remove('s1-sym-r'); S.remove('s1-sym-top'); S.remove('s1-sym-lab');
          S.remove('s1-abs-line'); S.remove('s1-abs-lab');
          S.remove('s1-neg-lab'); S.remove('s1-pos-lab'); S.remove('s1-3pos');

          // 三个板块标注在画面上方
          S.actor('s1-fin-c', -7, 4.5, '概念板块', { color: COOL, size: 17, bold: true });
          S.actor('s1-fin-o', 0, 4.5, '运算板块', { color: WARM, size: 17, bold: true });
          S.actor('s1-fin-a', 7, 4.5, '应用板块', { color: TEAL, size: 17, bold: true });
          // 箭头连接
          S.addSegment('s1-arr-co', [-4.5, 4.5], [-2.0, 4.5], { color: INK, width: 2, dash: 0 });
          S.addSegment('s1-arr-oa', [2.0, 4.5], [4.5, 4.5], { color: INK, width: 2, dash: 0 });
          S.addText('s1-lbl-co', -3.5, 5.0, '支撑', { color: INK, size: 13 });
          S.addText('s1-lbl-oa', 3.0, 5.0, '应用', { color: INK, size: 13 });

          // 主线宣言
          S.actor('s1-slogan', 0, -4.5, '数轴是桥梁——一线串珠，全章融通', { color: TEAL, size: 17, bold: true });

          P.renderCard(
            '<b>全章主线：数轴是桥梁</b><br>' +
            '<span style="color:' + COOL + '">概念</span> → <span style="color:' + WARM + '">运算</span> → <span style="color:' + TEAL + '">应用</span><br>' +
            '地基扎实，运算才稳；运算熟练，应用才准。<br>' +
            '带着这张地图，我们开始闯关！',
            'teal'
          );
          return anim ? delay(400) : null;
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
