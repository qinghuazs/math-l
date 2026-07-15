// s4-inverse.js  逆向应用（3步）
(function (CW) {
  'use strict';

  var S, P;

  // 颜色常量
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 已知点 A(1,2) 和平移后 A'(4,-1)
  var AX = 1, AY = 2;
  var APX = 4, APY = -1;

  var scene = {
    id: 's4',
    title: '四、逆向应用',
    bbox: [-8, 7, 8, -7],
    board: { axis: true, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        // 步骤1：给出 A(1,2) 和 A'(4,-1)，绘制两点
        narration: '前面我们学了"已知平移方向求新坐标"。现在来反过来！已知平移前的点 $A(1,2)$ 和平移后的点 $A\'(4,-1)$，请判断：点 $A$ 经过怎样的平移得到了点 $A\'$？这叫"逆向推断平移规律"，考试中经常出现！先把两个点标在坐标系中，仔细观察它们的位置关系。',
        enter: function (anim) {
          P.clearExtras();

          // 落点 A
          S.dropPoint('dot-A', AX, AY, {
            color: RED, size: 4, name: '', animate: false
          });
          S.addText('lbl-A', AX + 0.2, AY + 0.3, '$A(1,2)$', { size: 15, color: RED });

          P.renderCard(
            '<b>逆向问题</b><br><br>' +
            '已知：$A(1,\\ 2)$ 平移后变为 $A\'(4,\\ -1)$<br><br>' +
            '求：平移方向和距离？',
            'warm', 'fadeInDown'
          );

          if (!anim) {
            // 快放：两点都显示
            S.dropPoint('dot-Ap', APX, APY, { color: BLUE, size: 4, name: '' });
            S.addText('lbl-Ap', APX + 0.2, APY + 0.3, "$A'(4,-1)$", { size: 15, color: BLUE });
            return;
          }

          return S.dropPoint('dot-A', AX, AY, {
            color: RED, size: 4, name: '', animate: true
          }).then(function () {
            return delay(600);
          }).then(function () {
            S.addText('lbl-A', AX + 0.2, AY + 0.3, '$A(1,2)$', { size: 15, color: RED });
            return S.dropPoint('dot-Ap', APX, APY, {
              color: BLUE, size: 4, name: '', animate: true
            });
          }).then(function () {
            S.addText('lbl-Ap', APX + 0.2, APY + 0.3, "$A'(4,-1)$", { size: 15, color: BLUE });
          });
        },
      },
      {
        // 步骤2：连线 + 分析横纵坐标变化量
        narration: '关键一步！我们把 $A$ 和 $A\'$ 用线段连起来，然后分别计算横坐标和纵坐标的变化量。横坐标：$4 - 1 = 3$，正数 $3$ 说明向右移了 $3$ 个单位！纵坐标：$-1 - 2 = -3$，负数 $-3$ 说明向下移了 $3$ 个单位！所以整个平移过程是先向右 $3$ 个单位，再向下 $3$ 个单位。方法记住了吗？用"差"来判断方向——正数向右/上，负数向左/下！',
        enter: function (anim) {
          P.clearExtras();

          // 确保两点存在
          S.dropPoint('dot-A',  AX,  AY,  { color: RED,  size: 4, name: '' });
          S.addText('lbl-A',  AX + 0.2,  AY + 0.3,  '$A(1,2)$',    { size: 15, color: RED });
          S.dropPoint('dot-Ap', APX, APY, { color: BLUE, size: 4, name: '' });
          S.addText('lbl-Ap', APX + 0.2, APY + 0.3, "$A'(4,-1)$",  { size: 15, color: BLUE });

          // 连线 AA'
          S.addSegment('seg-AAp', [AX, AY], [APX, APY], {
            color: ORANGE, width: 3, dash: 0
          });

          // 辅助线：水平分量 + 竖直分量
          S.addSegment('seg-dx', [AX, AY], [APX, AY], {
            color: GREEN, width: 2, dash: 2
          });
          S.addText('lbl-dx', (AX + APX) / 2, AY + 0.5, '+3（向右）', {
            size: 13, color: GREEN, anchorX: 'middle'
          });

          S.addSegment('seg-dy', [APX, AY], [APX, APY], {
            color: GOLD, width: 2, dash: 2
          });
          S.addText('lbl-dy', APX + 0.3, (AY + APY) / 2, '-3（向下）', {
            size: 13, color: GOLD
          });

          P.renderCard(
            '<b>坐标差分析</b><br><br>' +
            '横坐标差：$4 - 1 = +3$ → 向右 $3$ 单位<br>' +
            '纵坐标差：$-1 - 2 = -3$ → 向下 $3$ 单位',
            'cool', 'fadeInDown'
          );

          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤3：结论 + 规律验证
        narration: '结论：点 $A(1,2)$ 先向右平移 $3$ 个单位得 $(4,2)$，再向下平移 $3$ 个单位得 $A\'(4,-1)$。来验证一下：$(1+3, 2-3) = (4,-1)$，完全正确！逆向推断方法总结：横坐标差 $= x\' - x$，正数向右、负数向左；纵坐标差 $= y\' - y$，正数向上、负数向下。这个方法适用于任何点的平移逆推！',
        enter: function (anim) {
          P.clearExtras();

          // 确保在终态
          S.dropPoint('dot-A',  AX,  AY,  { color: RED,  size: 4, name: '' });
          S.addText('lbl-A',  AX + 0.2,  AY + 0.3,  '$A(1,2)$',   { size: 15, color: RED });
          S.dropPoint('dot-Ap', APX, APY, { color: BLUE, size: 4, name: '' });
          S.addText('lbl-Ap', APX + 0.2, APY + 0.3, "$A'(4,-1)$", { size: 15, color: BLUE });
          S.addSegment('seg-AAp', [AX, AY], [APX, APY], { color: ORANGE, width: 3, dash: 0 });

          // 验证中间点
          S.dropPoint('dot-mid', APX, AY, { color: PURPLE, size: 3.5, name: '' });
          S.addText('lbl-mid', APX + 0.2, AY + 0.3, '$(4,2)$', { size: 13, color: PURPLE });

          P.renderCard(
            '<b>逆向推断公式</b><br><br>' +
            '横坐标差 $= x\' - x$<br>' +
            '&nbsp;&nbsp;$> 0$ 向右，$< 0$ 向左<br><br>' +
            '纵坐标差 $= y\' - y$<br>' +
            '&nbsp;&nbsp;$> 0$ 向上，$< 0$ 向下',
            'cool', 'fadeInDown'
          );
          P.renderCard(
            '<b>验证</b><br>' +
            '$(1+3,\\ 2-3) = (4,\\ -1) = A\'$ ✓',
            'warm', 'tada'
          );

          if (anim) { return delay(300); }
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
