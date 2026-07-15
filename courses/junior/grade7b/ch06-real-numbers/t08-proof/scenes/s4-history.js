// s4-history.js  数学史与欣赏（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、数学史与欣赏',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：希帕索斯的故事
        narration: '这个证明背后，有一段令人唏嘘的数学史。大约公元前 5 世纪，古希腊数学家<b>希帕索斯</b>（Hippasus）是毕达哥拉斯学派的成员。这个学派信奉"万物皆数"——一切都可以用整数或整数之比来表示。然而，希帕索斯发现了边长为 1 的正方形的对角线——也就是 $\\sqrt{2}$——无法用整数之比表示。这彻底动摇了毕达哥拉斯学派的哲学基础！',
        enter: function (anim) {
          // 左侧：正方形示意图
          // 正方形顶点：以 (-6, 1) 为中心，边长 3
          var sq = [[-7.5, 2.5], [-4.5, 2.5], [-4.5, -0.5], [-7.5, -0.5]];
          S.addPolygon('square', sq,
            { fillColor: '#e3f2fd', fillOpacity: 0.8, strokeColor: BLUE, strokeWidth: 3 });
          // 对角线
          S.addSegment('diag', [-7.5, -0.5], [-4.5, 2.5],
            { color: RED, width: 3, dash: 0 });
          // 标注
          S.addText('sq-lbl1', -8.2, 1.0, '1', { size: 16, color: BLUE });
          S.addText('sq-lbl2', -6.2, -1.2, '1', { size: 16, color: BLUE });
          S.addText('diag-lbl', -5.5, 0.8, '$\\sqrt{2}$', { size: 18, color: RED });

          // 右侧：故事卡
          S.addPolygon('story-bg',
            [[-2.5, 7.0], [9.5, 7.0], [9.5, -1.5], [-2.5, -1.5]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 2 });
          S.addText('story-title', 3.5, 6.3,
            '数学史：希帕索斯的发现',
            { size: 16, color: GOLD, anchorX: 'middle' });
          S.addText('story-t1', -1.5, 5.2,
            '约公元前 5 世纪，古希腊',
            { size: 14, color: INK });
          S.addText('story-t2', -1.5, 4.2,
            '毕达哥拉斯学派：万物皆数',
            { size: 14, color: PURPLE });
          S.addText('story-t3', -1.5, 3.2,
            '（数 = 整数之比）',
            { size: 13, color: GRAY });
          S.addText('story-t4', -1.5, 2.0,
            '希帕索斯发现：$\\sqrt{2}$ 不是有理数！',
            { size: 14, color: RED });
          S.addText('story-t5', -1.5, 0.8,
            '动摇了学派的哲学基础……',
            { size: 14, color: INK });
          S.addText('story-t6', -1.5, -0.4,
            '史称"第一次数学危机"',
            { size: 14, color: ORANGE });

          P.renderCard(
            '<b>数学史：希帕索斯</b><br><br>' +
            '约公元前 5 世纪<br>' +
            '毕达哥拉斯学派：<b>万物皆数</b><br>（一切皆整数之比）<br><br>' +
            '希帕索斯发现 $\\sqrt{2}$ 不是有理数<br>' +
            '⟹ <b>第一次数学危机</b>'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：第一次数学危机的意义
        narration: '希帕索斯的发现引发了"第一次数学危机"。传说毕达哥拉斯学派的人无法接受这个结论，甚至将希帕索斯投入大海——当然，历史真相已难以考证，但这个故事生动地说明了数学新发现对于旧有认知的冲击。最终，数学家们不得不扩展"数"的概念，承认无理数的存在，这才有了我们今天学的实数体系！正是这场危机，推动了数学的一次重大进步。',
        enter: function (anim) {
          // 清除左侧图形，改为时间线
          S.remove('square'); S.remove('diag');
          S.remove('sq-lbl1'); S.remove('sq-lbl2'); S.remove('diag-lbl');
          S.remove('story-bg'); S.remove('story-title');
          S.remove('story-t1'); S.remove('story-t2'); S.remove('story-t3');
          S.remove('story-t4'); S.remove('story-t5'); S.remove('story-t6');

          // 时间轴
          S.addSegment('timeline', [-8, -4.0], [-8, 6.5],
            { color: GRAY, width: 2, dash: 0 });

          // 事件1
          S.addText('ev1-year', -8.5, 6.0, '~前5世纪', { size: 13, color: GOLD });
          S.addSegment('ev1-tick', [-8.2, 5.8], [-7.8, 5.8], { color: GOLD, width: 2, dash: 0 });
          S.addText('ev1-t', -7.2, 5.8, '希帕索斯发现 $\\sqrt{2}$ 不是有理数', { size: 13, color: ORANGE });

          // 事件2
          S.addText('ev2-year', -8.5, 4.0, '第一次', { size: 13, color: RED });
          S.addText('ev2-year2', -8.5, 3.4, '数学危机', { size: 13, color: RED });
          S.addSegment('ev2-tick', [-8.2, 3.8], [-7.8, 3.8], { color: RED, width: 2, dash: 0 });
          S.addText('ev2-t', -7.2, 3.8, '学派动荡，"万物皆数"动摇', { size: 13, color: INK });

          // 事件3
          S.addText('ev3-year', -8.5, 2.0, '~前4-3世纪', { size: 13, color: BLUE });
          S.addSegment('ev3-tick', [-8.2, 1.8], [-7.8, 1.8], { color: BLUE, width: 2, dash: 0 });
          S.addText('ev3-t', -7.2, 1.8, '欧多克斯建立比例理论', { size: 13, color: BLUE });

          // 事件4
          S.addText('ev4-year', -8.5, 0.2, '近代', { size: 13, color: GREEN });
          S.addSegment('ev4-tick', [-8.2, 0.0], [-7.8, 0.0], { color: GREEN, width: 2, dash: 0 });
          S.addText('ev4-t', -7.2, 0.0, '实数理论完善，无理数正式纳入', { size: 13, color: GREEN });

          // 总结
          S.addPolygon('conclude-bg',
            [[-9.5, -1.5], [9.5, -1.5], [9.5, -3.8], [-9.5, -3.8]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('conclude-t', 0, -2.3,
            '危机推动进步：从"整数之比"到实数体系！',
            { size: 15, color: GREEN, anchorX: 'middle' });
          S.addText('conclude-t2', 0, -3.3,
            '无理数的发现扩展了数的边界，是数学的重大飞跃',
            { size: 13, color: INK, anchorX: 'middle' });

          P.renderCard(
            '<b>第一次数学危机的意义</b><br><br>' +
            '希帕索斯的发现：旧认知崩塌<br>' +
            '↓<br>' +
            '数学家扩展"数"的概念<br>' +
            '↓<br>' +
            '<b>无理数正式进入数学体系</b><br>' +
            '↓<br>' +
            '实数体系建立 ✓'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：反证法的威力——√3、√5 同理可证
        narration: '反证法是数学中的强大武器，用同样的思路，可以证明 $\\sqrt{3}$、$\\sqrt{5}$、$\\sqrt{7}$ 等也都不是有理数。更一般地，对于任意质数 $p$，$\\sqrt{p}$ 都不是有理数——这个结论都可以用反证法严格证明。同学们，你们已经学会了这种方法，课后可以尝试仿照今天的证明，证明 $\\sqrt{3}$ 不是有理数，这就是今天的思考题！',
        enter: function (anim) {
          S.remove('timeline');
          S.remove('ev1-year'); S.remove('ev1-tick'); S.remove('ev1-t');
          S.remove('ev2-year'); S.remove('ev2-year2'); S.remove('ev2-tick'); S.remove('ev2-t');
          S.remove('ev3-year'); S.remove('ev3-tick'); S.remove('ev3-t');
          S.remove('ev4-year'); S.remove('ev4-tick'); S.remove('ev4-t');
          S.remove('conclude-bg'); S.remove('conclude-t'); S.remove('conclude-t2');

          // 展示反证法威力：可以推广
          S.addPolygon('power-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 2.5], [-9.5, 2.5]],
            { fillColor: '#f3e5f5', fillOpacity: 0.9, strokeColor: PURPLE, strokeWidth: 2 });
          S.addText('power-title', 0, 6.5,
            '反证法是数学的强大武器',
            { size: 18, color: PURPLE, anchorX: 'middle' });
          S.addText('power-t1', 0, 5.3,
            '用同样思路可以证明：',
            { size: 16, color: INK, anchorX: 'middle' });
          S.addText('power-t2', 0, 4.3,
            '$\\sqrt{3}$ 不是有理数',
            { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('power-t3', 0, 3.3,
            '$\\sqrt{5}$、$\\sqrt{7}$、…… 都不是有理数',
            { size: 16, color: ORANGE, anchorX: 'middle' });

          // 推广说明
          S.addPolygon('gen-bg',
            [[-9.5, 2.0], [9.5, 2.0], [9.5, -0.5], [-9.5, -0.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.9, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('gen-t', 0, 1.2,
            '一般结论：对任意质数 $p$，$\\sqrt{p}$ 都不是有理数',
            { size: 15, color: GREEN, anchorX: 'middle' });
          S.addText('gen-t2', 0, 0.1,
            '（反证法均可严格证明）',
            { size: 14, color: INK, anchorX: 'middle' });

          // 思考题
          S.addPolygon('hw-bg',
            [[-9.5, -1.0], [9.5, -1.0], [9.5, -4.0], [-9.5, -4.0]],
            { fillColor: '#fff3e0', fillOpacity: 0.95, strokeColor: GOLD, strokeWidth: 2 });
          S.addText('hw-title', 0, -1.7,
            '课后思考题',
            { size: 17, color: GOLD, anchorX: 'middle' });
          S.addText('hw-t', 0, -2.7,
            '仿照今天的证明，证明 $\\sqrt{3}$ 不是有理数',
            { size: 15, color: ORANGE, anchorX: 'middle' });
          S.addText('hw-hint', 0, -3.5,
            '（提示：先假设 $\\sqrt{3}=\\dfrac{p}{q}$，$p,q$ 互质……）',
            { size: 13, color: GRAY, anchorX: 'middle' });

          P.renderCard(
            '<b>反证法的威力</b><br><br>' +
            '同理可证：$\\sqrt{3}$、$\\sqrt{5}$、$\\sqrt{7}$……<br>' +
            '均不是有理数<br><br>' +
            '<b>课后思考题：</b><br>' +
            '仿照证明 $\\sqrt{3}$ 不是有理数<br>' +
            '<span style="color:#90a4ae">（提示：先假设 $\\sqrt{3}=\\frac{p}{q}$，$p,q$ 互质……）</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
