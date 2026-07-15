(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a';
  var GREEN = '#2e7d32';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 旋转线的当前角度（闭包变量），由 animate 驱动
  var angle = 0;   // 单位：度，0 = 水平方向
  // 旋转线的长度
  var LEN = 5.5;
  // 固定直线 AB 的端点与交点
  var OX = 0, OY = 0;

  // 将角度（度）转换为弧度
  function toRad(deg) { return deg * Math.PI / 180; }

  // 旋转线端点（由角度闭包计算）
  function rotX() { return OX + LEN * Math.cos(toRad(angle)); }
  function rotY() { return OY + LEN * Math.sin(toRad(angle)); }
  function rotX2() { return OX - LEN * Math.cos(toRad(angle)); }
  function rotY2() { return OY - LEN * Math.sin(toRad(angle)); }

  var scene = {
    id: 's2',
    title: '二、垂直的定义',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
      angle = 30;  // 初始非直角状态
    },
    steps: [
      {
        narration: '两条直线相交，可以形成各种各样的角。现在有一条固定的直线 AB，另一条线 CD 绕交点 O 旋转。观察它们相交形成的角——当角的度数发生变化时，注意看角的大小。',
        enter: function (anim) {
          angle = 30;
          // 固定直线 AB（水平）
          S.addSegment('s2-ab', [-8.5, 0], [8.5, 0], { color: INK, width: 3, dash: 0 });
          // 点 A、B 标注
          S.addText('s2-labA', -8.2, 0.4, 'A', { color: INK, size: 16 });
          S.addText('s2-labB', 8.0, 0.4, 'B', { color: INK, size: 16 });
          // 交点 O
          S.dropPoint('s2-O', OX, OY, { name: '', color: INK, size: 4 });
          S.addText('s2-labO', 0.3, -0.6, 'O', { color: INK, size: 16 });

          // 旋转直线 CD（初始倾斜，坐标用闭包函数）
          S.addSegment('s2-cd', [rotX, rotY], [rotX2, rotY2], { color: COOL, width: 3, dash: 0 });
          S.addText('s2-labC', rotX, function () { return rotY() + 0.5; }, 'C', { color: COOL, size: 16 });
          S.addText('s2-labD', rotX2, function () { return rotY2() - 0.6; }, 'D', { color: COOL, size: 16 });

          // 角度实时显示文本
          S.addText('s2-angval', 3, 5.5, function () {
            return '∠AOC = ' + Math.round(angle) + '°';
          }, { color: WARM, size: 20 });

          // 初始角弧（不是直角）
          S.addAngle('s2-ang1',
            [function () { return OX + 1.5; }, OY],
            [OX, OY],
            [function () { return rotX() > OX ? rotX() * 1.5 / LEN : OX + 1.5; },
             function () { return rotX() > OX ? rotY() * 1.5 / LEN : 0; }],
            { radius: 1.5, color: WARM, ortho: false, opacity: 0.2, label: '' }
          );

          P.renderCard('直线 AB 固定，直线 CD 绕交点 O 旋转。注意观察 $\\angle AOC$ 的度数变化……');
          return Promise.resolve();
        },
      },
      {
        narration: '看！随着 CD 旋转，角度不断变化。现在让 CD 慢慢转到一个特殊位置——当 ∠AOC 恰好等于 90° 时，会发生什么？',
        enter: function (anim) {
          // 动画：把 angle 从当前值旋转到 90°
          var startAngle = angle;
          if (!anim) {
            angle = 90;
            // 快放：直接更新画板
            S.getBoard().update();
            return Promise.resolve();
          }
          return S.animate({
            from: startAngle,
            to: 90,
            duration: 1600,
            easing: 'easeInOutQuart',
            onUpdate: function (v) {
              angle = v;
              S.getBoard().update();
            },
          });
        },
      },
      {
        narration: '当 ∠AOC = 90° 时，两条直线互相垂直！此时角弧变成了直角方块标记。两条直线互相垂直，记作 AB ⊥ CD，读作"AB 垂直于 CD"。交点 O 叫作垂足。',
        enter: function (anim) {
          angle = 90;
          S.getBoard().update();

          // 删除旧角弧，添加直角方块标记
          S.addAngle('s2-ang1',
            [OX + 1.2, OY],
            [OX, OY],
            [OX, OY + 1.2],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.3, label: '' }
          );

          // 垂足高亮
          S.dropPoint('s2-O', OX, OY, { name: '', color: WARM, size: 5, animate: anim });

          // 标注 AB⊥CD
          S.addText('s2-perp', -6, 5, 'AB ⊥ CD', { color: WARM, size: 22 });
          S.addText('s2-foot', 0.4, -1.2, '垂足 O', { color: WARM, size: 16 });

          P.renderCard('$AB\\perp CD$（读作"AB 垂直于 CD"）<br>条件：两直线相交成<b>直角（90°）</b><br>交点 O 称为<b>垂足</b>', 'warm');

          return anim ? delay(400) : Promise.resolve();
        },
      },
      {
        narration: '注意：两直线互相垂直，它们形成的四个角都是直角！所以只需要验证其中一个角是直角，就可以判断两条直线垂直。',
        enter: function (anim) {
          // 显示四个直角标记
          S.addAngle('s2-ang-q1', [OX + 1.2, OY], [OX, OY], [OX, OY + 1.2],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.25 });
          S.addAngle('s2-ang-q2', [OX, OY + 1.2], [OX, OY], [OX - 1.2, OY],
            { radius: 1.2, color: COOL, ortho: true, opacity: 0.25 });
          S.addAngle('s2-ang-q3', [OX - 1.2, OY], [OX, OY], [OX, OY - 1.2],
            { radius: 1.2, color: WARM, ortho: true, opacity: 0.25 });
          S.addAngle('s2-ang-q4', [OX, OY - 1.2], [OX, OY], [OX + 1.2, OY],
            { radius: 1.2, color: COOL, ortho: true, opacity: 0.25 });

          // 四个90°标注
          S.addText('s2-d1', 1.5, 1.5, '90°', { color: WARM, size: 14 });
          S.addText('s2-d2', -2.0, 1.5, '90°', { color: COOL, size: 14 });
          S.addText('s2-d3', -2.0, -1.2, '90°', { color: WARM, size: 14 });
          S.addText('s2-d4', 1.5, -1.2, '90°', { color: COOL, size: 14 });

          P.renderCard('两直线垂直 → 四个角<b>全是直角</b><br>判断方法：验证其中<b>任意一个角 = 90°</b> 即可', 'cool');

          return anim ? delay(300) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
