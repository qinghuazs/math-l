(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var PURPLE = '#6a1b9a', ORANGE = '#f57c00', TEAL = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、判定 vs 性质 + 小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        narration: '现在我们来对比一下上节课的判定定理和今天的性质定理——它们<b>条件和结论正好互逆</b>。判定：用角的关系推出直线平行（角→线）；性质：用直线平行推出角的关系（线→角）。这两类定理互为逆命题，但注意：互逆的两个命题不一定都成立，正因为都能证明，才分别成为定理。',
        enter: function (anim) {
          // 画对比示意：箭头图
          // 左侧"判定"
          S.addText('s6-t-judge', -8.5, 5.5, '判定（上节课）', { size: 17, color: COOL });
          S.addText('s6-t-j1', -8.5, 4.0, '同位角相等 ⟹ 两直线平行', { size: 14, color: COOL });
          S.addText('s6-t-j2', -8.5, 2.8, '内错角相等 ⟹ 两直线平行', { size: 14, color: COOL });
          S.addText('s6-t-j3', -8.5, 1.6, '同旁内角互补 ⟹ 两直线平行', { size: 14, color: COOL });
          // 分隔线
          S.addSegment('s6-div', [0, 6.5], [0, -6.5], { color: INK, width: 1, dash: 2 });
          // 右侧"性质"
          S.addText('s6-t-prop', 1.0, 5.5, '性质（本节课）', { size: 17, color: WARM });
          S.addText('s6-t-p1', 1.0, 4.0, '两直线平行 ⟹ 同位角相等', { size: 14, color: WARM });
          S.addText('s6-t-p2', 1.0, 2.8, '两直线平行 ⟹ 内错角相等', { size: 14, color: WARM });
          S.addText('s6-t-p3', 1.0, 1.6, '两直线平行 ⟹ 同旁内角互补', { size: 14, color: WARM });
          // 互逆标注
          S.addText('s6-arrow-l', -4.5, -1.5, '条件', { size: 16, color: COOL });
          S.addText('s6-arrow-r', 3.5, -1.5, '结论', { size: 16, color: WARM });
          S.addText('s6-arrow-l2', -4.5, -2.8, '= 角的关系', { size: 14, color: COOL });
          S.addText('s6-arrow-r2', 3.5, -2.8, '= 角的关系', { size: 14, color: WARM });
          S.addText('s6-arrow-l3', -4.5, -4.0, '结论', { size: 16, color: COOL });
          S.addText('s6-arrow-r3', 3.5, -4.0, '条件', { size: 16, color: WARM });
          S.addText('s6-arrow-l4', -4.5, -5.2, '= 直线平行', { size: 14, color: COOL });
          S.addText('s6-arrow-r4', 3.5, -5.2, '= 直线平行', { size: 14, color: WARM });
          P.renderTable({
            head: ['', '判定', '性质'],
            rows: [
              ['条件', '角的关系', '直线平行'],
              ['结论', '直线平行', '角的关系'],
              ['方向', '角 ⟹ 线', '线 ⟹ 角'],
            ]
          });
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '易错提醒！有些同学会把条件和结论搞反——性质的条件是"两直线<b>平行</b>"，结论才是"角相等或互补"。如果两条直线不平行，就算看起来差不多，也不能用这三条性质。举例：如果题目没有告诉你 $a \\parallel b$，你就不能说同位角相等！',
        enter: function (anim) {
          P.renderCard(
            '<b>易错提醒</b><br><br>' +
            '性质的使用必须满足条件：<br>' +
            '✓ 已知 $a \\parallel b$ → 可用三条性质<br>' +
            '✗ 未知是否平行 → 不能用性质<br><br>' +
            '性质的条件是"直线平行"，<br>结论是"角相等或互补"——不能倒用！<br><br>' +
            '（倒用就变成了判定定理）',
            '',
            'headShake'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        narration: '最后来做个总结。今天我们学习了平行线的三条性质：性质1——两直线平行，同位角相等；性质2——两直线平行，内错角相等；性质3——两直线平行，同旁内角互补。记忆口诀：<b>平行线，真厉害；同位等，内错等，同旁补！</b>掌握这三条性质，配合上节课的三条判定，就完整掌握了平行线与角的全部关系。',
        enter: function (anim) {
          P.renderCard(
            '<b>平行线性质总结</b><br><br>' +
            '<b>性质1：</b>$a \\parallel b \\Rightarrow$ 同位角相等<br>' +
            '<b>性质2：</b>$a \\parallel b \\Rightarrow$ 内错角相等<br>' +
            '<b>性质3：</b>$a \\parallel b \\Rightarrow$ 同旁内角互补（和为 $180^\\circ$）<br><br>' +
            '<b>口诀：平行线，真厉害；</b><br>' +
            '<b>同位等，内错等，同旁补！</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
