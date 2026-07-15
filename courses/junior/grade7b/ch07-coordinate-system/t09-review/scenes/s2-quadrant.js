// s2-quadrant.js  坐标与象限复习（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画板：标注四象限及典型点
  function drawQuadrantOverview() {
    // 象限区域着色（用虚线框示意）
    S.addSegment('q-div-x', [-5.5, 0], [5.5, 0], { color: '#90a4ae', width: 1, dash: 2 });
    S.addSegment('q-div-y', [0, 5.5], [0, -5.5], { color: '#90a4ae', width: 1, dash: 2 });
    // 各象限标注
    S.addText('q-lbl1', 3, 4, 'Ⅰ\n$(x>0,y>0)$', { size: 14, color: BLUE, anchorX: 'middle' });
    S.addText('q-lbl2', -3, 4, 'Ⅱ\n$(x<0,y>0)$', { size: 14, color: ORANGE, anchorX: 'middle' });
    S.addText('q-lbl3', -3, -3, 'Ⅲ\n$(x<0,y<0)$', { size: 14, color: RED, anchorX: 'middle' });
    S.addText('q-lbl4', 3, -3, 'Ⅳ\n$(x>0,y<0)$', { size: 14, color: PURPLE, anchorX: 'middle' });
  }

  // 典型例题点（逐步揭示）
  function drawExPoints() {
    // 陷阱点：(-3,0) 和 (0,2)
    S.dropPoint('qp-e', -3, 0, { color: TEAL, name: 'E(-3,0)', size: 3.5, animate: false });
    S.dropPoint('qp-f', 0, 2, { color: TEAL, name: 'F(0,2)', size: 3.5, animate: false });
    // 标注说明
    S.addText('qp-et', -3, -0.6, 'E在x轴\n不属于任何象限', { size: 12, color: TEAL, anchorX: 'middle' });
    S.addText('qp-ft', 1.0, 2.0, 'F在y轴\n不属于任何象限', { size: 12, color: TEAL });
    // 四象限各一个典型点
    S.dropPoint('qp-a', 4, 3, { color: BLUE, name: 'A(4,3)', size: 3, animate: false });
    S.dropPoint('qp-b', -2, 4, { color: ORANGE, name: 'B(-2,4)', size: 3, animate: false });
    S.dropPoint('qp-c', -3, -2, { color: RED, name: 'C(-3,-2)', size: 3, animate: false });
    S.dropPoint('qp-d', 2, -4, { color: PURPLE, name: 'D(2,-4)', size: 3, animate: false });
  }

  var scene = {
    id: 's2',
    title: '二、坐标与象限复习',
    bbox: [-6, 6, 6, -6],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：象限符号快判表
        narration: '复习坐标与象限！判断一个点在哪个象限，关键看横纵坐标的符号。请看这张快判表：第一象限横正纵正；第二象限横负纵正；第三象限横负纵负；第四象限横正纵负。记忆口诀：从第一象限开始逆时针数，符号依次是"正正、负正、负负、正负"。画板上用颜色标出了四个象限和各自的符号条件，一目了然！',
        enter: function (anim) {
          drawQuadrantOverview();
          P.renderTable({
            head: ['象限', '横坐标符号', '纵坐标符号', '记忆口诀'],
            rows: [
              ['第一象限 Ⅰ', '$x>0$（正）', '$y>0$（正）', '正正'],
              ['第二象限 Ⅱ', '$x<0$（负）', '$y>0$（正）', '负正'],
              ['第三象限 Ⅲ', '$x<0$（负）', '$y<0$（负）', '负负'],
              ['第四象限 Ⅳ', '$x>0$（正）', '$y<0$（负）', '正负'],
              ['坐标轴', '$x=0$ 或 $y=0$', '——', '不属于任何象限'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：典型例题（含轴上点陷阱）
        narration: '来看典型例题：判断以下各点在哪个象限或坐标轴上？A(4,3)：横正纵正，在第一象限；B(-2,4)：横负纵正，在第二象限；C(-3,-2)：横负纵负，在第三象限；D(2,-4)：横正纵负，在第四象限。然后是陷阱点——E(-3,0)：纵坐标为0，在 x 轴上，不属于任何象限！F(0,2)：横坐标为0，在 y 轴上，也不属于任何象限！注意：坐标轴上的点不属于任何象限，这是本章最常考的易错点！',
        enter: function (anim) {
          drawExPoints();
          P.renderCard(
            '<b>典型例题：判断所在位置</b><br>' +
            'A(4,3) → 第<b>一</b>象限（正正）<br>' +
            'B(-2,4) → 第<b>二</b>象限（负正）<br>' +
            'C(-3,-2) → 第<b>三</b>象限（负负）<br>' +
            'D(2,-4) → 第<b>四</b>象限（正负）<br>' +
            '<span style="color:#c62828"><b>E(-3,0) → x轴上，不属于任何象限 ⚠</b></span><br>' +
            '<span style="color:#c62828"><b>F(0,2) → y轴上，不属于任何象限 ⚠</b></span>',
            'warm'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：由符号条件反推象限
        narration: '进阶题：由符号条件反推象限。已知点 P(a,b) 满足某些符号条件，判断它在哪个象限。第一题：P(a,-3)，如果 a<0，那么横坐标 a 为负，纵坐标 -3 为负，所以 P 在第三象限。第二题：P(a,b) 在第二象限，则 a<0、b>0。第三题：若 x·y<0，即 x 与 y 异号，那么点在第二或第四象限——这道题需要分两种情况！反推时先从符号条件确定正负号，再对照四象限规律作判断。',
        enter: function (anim) {
          P.renderTable({
            head: ['题目条件', '横坐标符号', '纵坐标符号', '结论'],
            rows: [
              ['P(a,-3)，$a<0$', '$a<0$（负）', '$-3<0$（负）', '第三象限'],
              ['P(a,b)在第二象限', '$a<0$（负）', '$b>0$（正）', '由象限推符号'],
              ['P(a,b)，$a\\cdot b<0$', '与纵坐标<b>异号</b>', '——', '第二或第四象限'],
              ['P(a,b)，$a>0,b<0$', '$a>0$（正）', '$b<0$（负）', '第四象限'],
            ],
          });
          P.renderCard(
            '<b>反推口诀</b><br>' +
            '由点的位置 → 推符号：<b>先定象限</b>，再套符号规律<br>' +
            '由符号条件 → 推象限：<b>先定正负</b>，再查哪个象限匹配<br>' +
            '当有乘积或商时：同号为正（一、三象限），异号为负（二、四象限）'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
