// s4-format.js  规范表达：书写格式（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var CYAN   = '#00838f';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、规范书写格式',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：规范书写模板
        narration: '会推理还不够，数学证明要<b>规范表达</b>。每一步推理必须写清楚：因为什么条件，根据什么定理，所以得出什么结论。这就是几何推理的"三段式"——因为……根据……所以……。看这张模板卡，把它记住！',
        enter: function (anim) {
          // 模板标题
          S.addPolygon('tmpl-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, -0.5], [-9.5, -0.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 3 });

          S.addText('tmpl-title', 0, 6.5,
            '几何推理规范表达模板',
            { size: 19, color: GOLD, anchorX: 'middle' });

          S.addText('tmpl-line1', -9, 5.3,
            '∵（因为）…… 条件/已知 ……',
            { size: 16, color: INK });
          S.addText('tmpl-line2', -9, 3.9,
            '∴（所以）…… 中间结论 ……',
            { size: 16, color: CYAN });
          S.addText('tmpl-line3', -9, 2.5,
            '（根据：……定理/公理……）',
            { size: 16, color: ORANGE });
          S.addText('tmpl-line4', -9, 1.2,
            '∴（所以）…… 最终结论 ……',
            { size: 16, color: PURPLE });

          P.renderCard(
            '<b>规范书写模板</b><br><br>' +
            '∵ 条件 ……<br>' +
            '根据 …… 定理<br>' +
            '∴ 结论 ……<br><br>' +
            '每步必须"条件—依据—结论"齐全！'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：例题第一步完整书写
        narration: '现在把刚才例题的第一步推理用规范格式写出来。第一步：因为 ∠1 = ∠2（同位角相等），根据"同位角相等，两直线平行"，所以 $a \\parallel b$。注意：要写出"根据"的依据名称，这样才算完整的几何证明。',
        enter: function (anim) {
          // 清除模板，显示第一步书写
          S.remove('tmpl-bg');
          S.remove('tmpl-title');
          S.remove('tmpl-line1');
          S.remove('tmpl-line2');
          S.remove('tmpl-line3');
          S.remove('tmpl-line4');

          // 第一步卡片
          S.addPolygon('step1-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 1.5], [-9.5, 1.5]],
            { fillColor: '#e0f7fa', fillOpacity: 0.9, strokeColor: CYAN, strokeWidth: 3 });
          S.addText('step1-title', 0, 6.5,
            '第一步：由角推线（用判定）',
            { size: 18, color: CYAN, anchorX: 'middle' });
          S.addText('step1-line1', -9, 5.3,
            '∵ ∠1 = ∠2',
            { size: 17, color: INK });
          S.addText('step1-line2', -9, 4.0,
            '（∠1 与 ∠2 是同位角）',
            { size: 15, color: ORANGE });
          S.addText('step1-line3', -9, 2.7,
            '∴ a ∥ b',
            { size: 17, color: CYAN });

          // 依据标注
          S.addText('step1-basis', 3.0, 4.0,
            '依据：同位角相等，两直线平行',
            { size: 14, color: ORANGE });

          P.renderCard(
            '<b>第一步（规范书写）</b><br><br>' +
            '∵ $\\angle 1 = \\angle 2$（同位角）<br>' +
            '根据"同位角相等，两直线平行"<br>' +
            '∴ $a \\parallel b$'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：例题第二步完整书写
        narration: '非常好！第一步已经写完。紧接着写第二步：因为 $a \\parallel b$（刚才已证），根据"两直线平行，内错角相等"，所以 $\\angle 3 = \\angle 4$。把两步合在一起，整个证明就完成了！这就是规范的两步推理书写。',
        enter: function (anim) {
          // 第二步卡片（下半区）
          S.addPolygon('step2-bg',
            [[-9.5, 1.0], [9.5, 1.0], [9.5, -4.5], [-9.5, -4.5]],
            { fillColor: '#f3e5f5', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 3 });
          S.addText('step2-title', 0, 0.3,
            '第二步：由线推角（用性质）',
            { size: 18, color: PURPLE, anchorX: 'middle' });
          S.addText('step2-line1', -9, -0.9,
            '∵ a ∥ b（已证）',
            { size: 17, color: INK });
          S.addText('step2-line2', -9, -2.2,
            '（∠3 与 ∠4 是内错角）',
            { size: 15, color: GREEN });
          S.addText('step2-line3', -9, -3.5,
            '∴ ∠3 = ∠4',
            { size: 17, color: PURPLE });

          S.addText('step2-basis', 3.0, -2.2,
            '依据：两直线平行，内错角相等',
            { size: 14, color: GREEN });

          // 总结横幅
          S.addPolygon('done-bg',
            [[-9.5, -5.2], [9.5, -5.2], [9.5, -7.3], [-9.5, -7.3]],
            { fillColor: '#e8f5e9', fillOpacity: 0.95, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('done-t', 0, -6.1,
            '证明完毕！两步推理，逻辑严密。',
            { size: 17, color: GREEN, anchorX: 'middle' });

          P.renderCard(
            '<b>第二步（规范书写）</b><br><br>' +
            '∵ $a \\parallel b$（已证）<br>' +
            '根据"两直线平行，内错角相等"<br>' +
            '∴ $\\angle 3 = \\angle 4$<br><br>' +
            '<b>证毕！</b>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
