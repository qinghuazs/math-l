(function (CW) {
  'use strict';
  // 场景四：圆大小错觉（艾宾浩斯错觉）
  // 左侧：中心圆被 6 个大圆环绕 → 看起来小
  // 右侧：同尺寸中心圆被 6 个小圆环绕 → 看起来大
  // 揭示：移除外围圆，两中心圆向中间靠拢，对比等大
  var S, P;
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var PURPLE = '#6a1b9a';
  var GRAY_FILL = '#cfd8dc';

  // 中心圆半径
  var RC = 1.3;
  // 左组圆心 x（中心圆）
  var CX_L = -4.5;
  // 右组圆心 x（中心圆）
  var CX_R = 4.5;
  // 左组外围大圆半径
  var RB = 2.2;
  // 右组外围小圆半径
  var RS = 0.55;
  // 外围圆环绕半径（圆心到外围圆圆心的距离）
  var ORBIT_L = RC + RB + 0.15;   // 大圆紧贴中心圆
  var ORBIT_R = RC + RS + 0.15;   // 小圆紧贴中心圆

  // 闭包：用于 moveTo 动画
  var cxL = CX_L;
  var cxR = CX_R;
  var castL = null;
  var castR = null;

  // 计算 6 个等分角度的外围圆圆心坐标
  function surroundPos(cx, cy, orbit, i) {
    var angle = (i * 60 - 90) * Math.PI / 180;
    return [cx + orbit * Math.cos(angle), cy + orbit * Math.sin(angle)];
  }

  // 绘制左侧：中心小圆 + 6 个大圆
  function drawLeft() {
    var i, pos;
    // 中心圆（动态圆心，用闭包驱动平移动画）
    S.addCircle('s4-cL', function () { return cxL; }, 0, RC,
      { color: WARM, width: 3, fill: WARM, fillOpacity: 0.25 });
    // 6 个大外围圆
    for (i = 0; i < 6; i++) {
      pos = surroundPos(CX_L, 0, ORBIT_L, i);
      S.addCircle('s4-bL' + i, pos[0], pos[1], RB,
        { color: GRAY_FILL, width: 2, fill: GRAY_FILL, fillOpacity: 0.35 });
    }
  }

  // 绘制右侧：中心小圆 + 6 个小圆
  function drawRight() {
    var i, pos;
    // 中心圆（动态圆心，用闭包驱动平移动画）
    S.addCircle('s4-cR', function () { return cxR; }, 0, RC,
      { color: COOL, width: 3, fill: COOL, fillOpacity: 0.25 });
    // 6 个小外围圆
    for (i = 0; i < 6; i++) {
      pos = surroundPos(CX_R, 0, ORBIT_R, i);
      S.addCircle('s4-sR' + i, pos[0], pos[1], RS,
        { color: GRAY_FILL, width: 2, fill: GRAY_FILL, fillOpacity: 0.35 });
    }
  }

  // 移除外围圆
  function removeSurrounds() {
    var i;
    for (i = 0; i < 6; i++) {
      S.remove('s4-bL' + i);
      S.remove('s4-sR' + i);
    }
  }

  var scene = {
    id: 's4',
    title: '四、实验三：圆的大小错觉（艾宾浩斯）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      cxL = CX_L; cxR = CX_R;
      castL = null; castR = null;
    },
    steps: [
      {
        narration: '实验三，艾宾浩斯错觉！左边：一个中心圆，被 6 个大圆包围；右边：同样大小的中心圆，被 6 个小圆包围。请问，左右两个中心圆，哪个更大？',
        enter: function (anim) {
          drawLeft();
          drawRight();
          // 标注
          castL = S.actor('s4-tL', CX_L, -5.5, '左侧中心圆', { color: WARM, size: 18, bold: true });
          castR = S.actor('s4-tR', CX_R, -5.5, '右侧中心圆', { color: COOL, size: 18, bold: true });
          P.renderCard('左：中心圆被<b>大圆</b>包围<br>右：中心圆被<b>小圆</b>包围<br><br>请凭<b>直觉</b>判断：哪个中心圆更大？');
          if (!anim) return null;
          return new Promise(function (res) { setTimeout(res, 300); });
        },
      },
      {
        narration: '大多数人会觉得右边那个中心圆更大！因为被小圆包围，显得"格外大"；而左边被大圆包围，显得"格外小"。但真相是——两个中心圆大小完全相同！',
        enter: function (anim) {
          P.renderCard('大多数人的直觉：<b>右边中心圆更大</b>！<br><br>周围圆的大小，影响了我们对中心圆的判断——<br>这就是<b>艾宾浩斯错觉</b>！', 'warm');
          if (!anim) return null;
          return new Promise(function (res) { setTimeout(res, 200); });
        },
      },
      {
        narration: '揭示！先把所有外围圆移走，再让两个中心圆向中间靠拢——放在一起对比，完全一样大！这再次证明：眼睛看到的"大小"，会受到周围背景的影响。',
        enter: function (anim) {
          removeSurrounds();
          P.renderCard('<b>揭示</b>：移除外围圆，两圆相向靠拢……<br>大小<b>完全相同</b>！<br><br>背景（周围的圆）改变了大脑对"大"和"小"的感知。', 'cool');
          // 两圆向中间平移到 -1.5 和 1.5 并排
          var TARGET_L = -1.5;
          var TARGET_R = 1.5;
          var d = anim ? 1200 : 0;
          var fromL = cxL, fromR = cxR;
          return S.animate({
            from: 0, to: 1, duration: d, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              cxL = fromL + (TARGET_L - fromL) * v;
              cxR = fromR + (TARGET_R - fromR) * v;
              S.getBoard().update();
            },
          });
        },
      },
      {
        narration: '两个中心圆半径都是 1.3 个单位，完全相等。背景的"大"与"小"改变了大脑对中心圆的感知，产生了大小错觉。这就是艾宾浩斯错觉——几何形状看起来怎样，不等于它实际上怎样！',
        enter: function () {
          S.actor('s4-eq', 0, 4.5, '两圆等大！', { color: '#388e3c', size: 26, bold: true });
          P.renderCard('<b>实验三结论</b><br>两中心圆半径均为 $1.3$ 个单位，完全相等。<br>周围参照物影响大脑的大小判断，产生错觉。<br><br>几何结论要有依据，不能只凭观察！');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
