(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a', GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 旋转动画驱动角度（弧度），初始值让四条射线对称排列
  var theta = Math.PI / 4; // AB 方向与 X 轴夹角（CD 固定水平）

  // 基于 theta 计算 AB 的端点（绕 O 旋转）
  function ptA() { return [8 * Math.cos(theta), 8 * Math.sin(theta)]; }
  function ptB() { return [-8 * Math.cos(theta), -8 * Math.sin(theta)]; }

  // CD 固定水平
  var ptC = [-8, 0];
  var ptD = [8, 0];
  var ptO = [0, 0];

  // 构建所有静态元素（直线、标注字母）
  function buildLines() {
    // 直线 CD（水平固定）
    S.addSegment('s2-cd', ptC, ptD, { color: COOL, width: 3, dash: 0 });
    // 直线 AB（以函数引用 theta 动态更新）
    S.addSegment('s2-ab',
      [function () { return 8 * Math.cos(theta); }, function () { return 8 * Math.sin(theta); }],
      [function () { return -8 * Math.cos(theta); }, function () { return -8 * Math.sin(theta); }],
      { color: WARM, width: 3, dash: 0 });
    // 交点 O
    S.addText('s2-lbl-o', 0.2, -0.7, 'O', { size: 16, color: INK });
    // 端点标签（固定）
    S.addText('s2-lbl-c', -8.5, 0.3, 'C', { size: 16, color: COOL });
    S.addText('s2-lbl-d', 8.1, 0.3, 'D', { size: 16, color: COOL });
    // A/B 标签跟随 theta
    S.addText('s2-lbl-a',
      function () { return 8 * Math.cos(theta) + 0.4; },
      function () { return 8 * Math.sin(theta) + 0.3; },
      'A', { size: 16, color: WARM });
    S.addText('s2-lbl-b',
      function () { return -8 * Math.cos(theta) - 0.6; },
      function () { return -8 * Math.sin(theta) - 0.4; },
      'B', { size: 16, color: WARM });
  }

  // 构建四个角标注（坐标均为函数，随 theta 动态变化）
  function buildAngles() {
    // ∠1：C方向 → O → A方向（第二象限侧，∠COA）
    S.addAngle('s2-a1',
      [function () { return -3; }, function () { return 0; }],
      ptO,
      [function () { return 3 * Math.cos(theta); }, function () { return 3 * Math.sin(theta); }],
      { radius: 1.0, color: WARM, label: '∠1', opacity: 0.12 });

    // ∠2：A方向 → O → D方向（第一象限侧，∠AOD）
    S.addAngle('s2-a2',
      [function () { return 3 * Math.cos(theta); }, function () { return 3 * Math.sin(theta); }],
      ptO,
      [function () { return 3; }, function () { return 0; }],
      { radius: 1.6, color: COOL, label: '∠2', opacity: 0.12 });

    // ∠3：D方向 → O → B方向（第四象限侧，∠DOB）
    S.addAngle('s2-a3',
      [function () { return 3; }, function () { return 0; }],
      ptO,
      [function () { return -3 * Math.cos(theta); }, function () { return -3 * Math.sin(theta); }],
      { radius: 1.0, color: PURPLE, label: '∠3', opacity: 0.12 });

    // ∠4：B方向 → O → C方向（第三象限侧，∠BOC）
    S.addAngle('s2-a4',
      [function () { return -3 * Math.cos(theta); }, function () { return -3 * Math.sin(theta); }],
      ptO,
      [function () { return -3; }, function () { return 0; }],
      { radius: 1.6, color: GREEN, label: '∠4', opacity: 0.12 });
  }

  // 度数文本（动态，用 addText + 函数）
  function buildDegTexts() {
    // ∠1 度数显示：右上偏左位置
    S.addText('s2-deg1',
      function () { return -2.2 + 1.5 * Math.cos(theta / 2 + Math.PI / 2); },
      function () { return 1.5 * Math.sin(theta / 2 + Math.PI / 2) + 0.3; },
      function () {
        var deg = Math.round(theta * 180 / Math.PI);
        return '∠1=' + (180 - deg) + '°';
      },
      { size: 14, color: WARM });

    // ∠2 度数显示
    S.addText('s2-deg2',
      function () { return 1.8 * Math.cos(theta / 2) + 0.5; },
      function () { return 1.8 * Math.sin(theta / 2) + 0.5; },
      function () {
        var deg = Math.round(theta * 180 / Math.PI);
        return '∠2=' + deg + '°';
      },
      { size: 14, color: COOL });

    // ∠3 度数（对顶 ∠1）
    S.addText('s2-deg3',
      function () { return 2.2 - 1.5 * Math.cos(theta / 2 + Math.PI / 2); },
      function () { return -1.5 * Math.sin(theta / 2 + Math.PI / 2) - 0.3; },
      function () {
        var deg = Math.round(theta * 180 / Math.PI);
        return '∠3=' + (180 - deg) + '°';
      },
      { size: 14, color: PURPLE });

    // ∠4 度数（对顶 ∠2）
    S.addText('s2-deg4',
      function () { return -1.8 * Math.cos(theta / 2) - 0.5; },
      function () { return -1.8 * Math.sin(theta / 2) - 0.5; },
      function () {
        var deg = Math.round(theta * 180 / Math.PI);
        return '∠4=' + deg + '°';
      },
      { size: 14, color: GREEN });
  }

  var scene = {
    id: 's2',
    title: '二、两直线相交与四个角',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      theta = Math.PI / 4;
    },
    steps: [
      {
        narration: '现在我们在图上正式画出两条相交直线。设直线 $AB$ 与直线 $CD$ 相交于点 $O$——$O$ 就是它们的交点。两条直线相交，把平面分成四个区域，形成了<b>四个角</b>：∠1、∠2、∠3、∠4，我们分别用不同颜色标出来。',
        enter: function (anim) {
          theta = Math.PI / 4;
          buildLines();
          if (!anim) {
            buildAngles();
            return;
          }
          return delay(500).then(function () {
            buildAngles();
          });
        },
      },
      {
        narration: '请大家注意各个角的位置关系：∠1 和 ∠3 是<b>对角线方向</b>相对的——它们"顶点相同、两边互为反向延长线"；∠2 和 ∠4 也是如此。而 ∠1 和 ∠2 则是<b>挨着的</b>——共享 OA 这条公共边，另一边 OC 与 OD 是一条直线上的反向延长线。',
        enter: function (anim) {
          buildDegTexts();
          P.renderCard('四个角的位置：<br>∠1 与 ∠3 <b>对顶</b>（相对）；∠2 与 ∠4 <b>对顶</b>（相对）<br>∠1 与 ∠2 <b>相邻</b>（共边 OA）；∠2 与 ∠3 <b>相邻</b>（共边 OD）');
          if (anim) { return delay(200); }
        },
      },
      {
        narration: '现在来看一个核心演示：如果直线 $AB$ 绕交点 $O$ 旋转，四个角的度数会怎么变化？注意观察——∠1 和 ∠3 的度数始终相同，∠2 和 ∠4 的度数也始终相同，并且 ∠1 + ∠2 始终等于 180°。',
        enter: function (anim) {
          if (!anim) {
            theta = Math.PI / 3;
            S.getBoard().update();
            P.renderCard('旋转观察：无论直线 $AB$ 转到什么位置，<br>∠1 = ∠3（对顶角相等）<br>∠2 = ∠4（对顶角相等）<br>∠1 + ∠2 = 180°（邻补角互补）');
            return;
          }
          return S.animate({
            from: Math.PI / 4,
            to: Math.PI / 3,
            duration: 1800,
            easing: 'easeInOutQuart',
            onUpdate: function (v) { theta = v; S.getBoard().update(); },
          }).then(function () {
            P.renderCard('旋转观察：无论直线 $AB$ 转到什么位置，<br>∠1 = ∠3（对顶角相等）<br>∠2 = ∠4（对顶角相等）<br>∠1 + ∠2 = 180°（邻补角互补）');
          });
        },
      },
      {
        narration: '再旋转一次，换一个角度来感受规律。可以看到，∠2 从 45° 变到 60° 再变到其他值，∠1 始终是 180° 减 ∠2。这两个规律就是今天的核心内容——邻补角和对顶角。',
        enter: function (anim) {
          if (!anim) {
            theta = 5 * Math.PI / 12;
            S.getBoard().update();
            return;
          }
          return S.animate({
            from: Math.PI / 3,
            to: 5 * Math.PI / 12,
            duration: 1600,
            easing: 'easeInOutQuart',
            onUpdate: function (v) { theta = v; S.getBoard().update(); },
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
