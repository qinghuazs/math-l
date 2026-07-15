// s1-eight-angles.js  三线八角登场（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 布局坐标
  // 截线 c：竖直偏斜，从上到下
  // 直线 a：左侧，水平偏上
  // 直线 b：右侧，水平偏下（初始略微向右斜，非平行）

  // 两条被截线：水平方向，a 在 y=2，b 在 y=-2（微斜）
  // 截线 c 斜穿，约 x = 0.7*y 形式
  // 交点：c∩a: 点A, c∩b: 点B

  // c 是从(-4, 5.5)到(4,-5.5)的斜线，斜率约 11/8
  // a 是 y=2 的水平线
  // b 是 y=-2 的水平线（初始微斜：斜率0.15，使8角不严格平行，但不影响角的标注意义）

  // c∩a 交点：x=c(y=2)=> x = 0.7*(5.5-2) *(-1)... 更简单：
  // c: 经(-4,5.5)和(4,-5.5)，参数方程 x=-4+8t, y=5.5-11t
  // y=2: 5.5-11t=2 => t=3.5/11=0.318 => x=-4+8*0.318=-4+2.545=-1.455
  // 取A=(-1.5, 2), B=(-1.5+1.3, -2)=(-0.2, -2) 更规整

  // 改用简单固定坐标：
  // c: 直线过(-1.5, 2)和(-0.2, -2)，沿这两点作延长线到画板边缘
  // a: 过(-1.5,2)，水平线 y=2
  // b: 过(-0.2,-2)，微斜线（斜率0.1）

  var ptAx = -1.5, ptAy = 2;    // c∩a 交点
  var ptBx = -0.2, ptBy = -2;   // c∩b 交点（b微斜时仍经此点）

  // 截线 c 方向向量
  var cdx = ptBx - ptAx; // 1.3
  var cdy = ptBy - ptAy; // -4
  var cLen = Math.sqrt(cdx * cdx + cdy * cdy);
  var cux = cdx / cLen; // 单位向量x
  var cuy = cdy / cLen; // 单位向量y

  // c 延伸端点
  var c1 = [ptAx - cux * 14, ptAy - cuy * 14];
  var c2 = [ptBx + cux * 14, ptBy + cuy * 14];

  // a 的两端（水平，y=2）
  var a1 = [-9, ptAy]; var a2 = [8, ptAy];
  // b 微斜（斜率0.12，过ptB）
  var bSlope = 0.12;
  var b1 = [-9, ptBy + bSlope * (-9 - ptBx)];
  var b2 = [8,  ptBy + bSlope * (8  - ptBx)];

  // 八个角的标注位置（文本偏移量，相对于各交点）
  // 以A为上交点（c∩a），B为下交点（c∩b）
  // 截线c方向：从上到下偏右
  // a方向：水平向右
  // 在A处：截线左上侧=∠1, 截线右上侧=∠2, 截线右下侧=∠3, 截线左下侧=∠4
  // 在B处：截线左上侧=∠5, 截线右上侧=∠6, 截线右下侧=∠7, 截线左下侧=∠8

  // 角弧位置用 addAngle 精确绘制，文字标签用 addText 辅助
  // 这里 8 个角的命名遵循教材常见顺序：
  //   上交点A（直线a）处：∠1(左上), ∠2(右上), ∠3(右下), ∠4(左下)
  //   下交点B（直线b）处：∠5(左上), ∠6(右上), ∠7(右下), ∠8(左下)
  // 注：∠1与∠5同位角（F形）；∠3与∠5内错角（Z形）；∠4与∠5同旁内角（U形）

  // 截线方向的"左"和"右"基于截线从上到下方向（cux≈0.31, cuy≈-0.95，即向右下）
  // 法向：(-cuy, cux) = (0.95, 0.31) 向右    (cuy,-cux)=(-0.31,-0.95) 向左

  // 各角弧的 p1,p2 锚点用 1单位偏移模拟
  // ∠1: A处，在a左方(截线左上侧) —— p1沿a向左偏，p2沿c向上偏
  // 简化：直接用角度偏移坐标
  var R1 = 0.8; // 角弧半径（绘图用，stage.addAngle 的 radius 参数）

  // 计算各角位置的辅助p1,p2
  // A处各角：直线a方向(1,0)，截线c方向(cux, cuy)=-约(0.309,-0.951)
  // 截线c方向从A到B：(cux,cuy)，反向：(-cux,-cuy)向上
  // 直线a从左到右：(1,0)
  // ∠1(A处左上，a左×c上)：p1在a左(A+(-1,0)*r), p2在c上(A+(-cux,-cuy)*r)
  // ∠2(A处右上，c上×a右)：p1在c上, p2在a右
  // ∠3(A处右下，a右×c下)：p1在a右, p2在c下
  // ∠4(A处左下，c下×a左)：p1在c下, p2在a左

  function angleP(x, y, dx, dy, r) {
    return [x + dx * r, y + dy * r];
  }

  var scene = {
    id: 's1',
    title: '一、三线八角登场',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：画两条直线 a、b，再让截线 c 从画板外滑入
        narration: '今天我们来学习平行线的判定——怎么证明两条直线平行。先来看这样一幅图：平面上有两条直线 $a$ 和 $b$，它们看起来是平行的，但怎么从数学上严格说明呢？现在，让第三条直线 $c$ 来"截"这两条直线，看看会产生什么。',
        enter: function (anim) {
          // 先画 a、b
          S.addSegment('line-a', a1, a2, { color: BLUE, width: 3, dash: 0 });
          S.addText('lbl-a', 8.2, ptAy + 0.2, 'a', { size: 18, color: BLUE });
          S.addSegment('line-b', b1, b2, { color: GREEN, width: 3, dash: 0 });
          S.addText('lbl-b', 8.2, ptBy + 0.2, 'b', { size: 18, color: GREEN });

          if (!anim) {
            // 快放：直接画截线 c
            S.addSegment('line-c', c1, c2, { color: RED, width: 3, dash: 0 });
            S.addText('lbl-c', c2[0] + 0.3, c2[1] - 0.3, 'c', { size: 18, color: RED });
            S.dropPoint('pt-A', ptAx, ptAy, { color: INK, name: 'A', size: 3, animate: false, labelOffset: [-18, 8] });
            S.dropPoint('pt-B', ptBx, ptBy, { color: INK, name: 'B', size: 3, animate: false, labelOffset: [-18, -16] });
            P.renderCard('两条直线 $a$、$b$ 被第三条直线 $c$ 所截，<br>产生了 <b>8 个角</b>，形成"<b>三线八角</b>"。');
            return;
          }

          // 动画：截线 c 从上向下生长
          var board = S.getBoard();
          var cx = c1[0], cy = c1[1];
          var ex = cx, ey = cy;
          var ptC1 = board.create('point', [function () { return cx; }, function () { return cy; }],
            { visible: false, fixed: true, withLabel: false });
          var ptC2 = board.create('point', [function () { return ex; }, function () { return ey; }],
            { visible: false, fixed: true, withLabel: false });
          var segC = board.create('segment', [ptC1, ptC2], {
            strokeColor: RED, strokeWidth: 3, dash: 0, highlight: false, fixed: true,
          });
          board.update();

          return S.animate({
            from: 0, to: 1, duration: 1800, easing: 'easeInOutQuart',
            onUpdate: function (v) {
              ex = c1[0] + (c2[0] - c1[0]) * v;
              ey = c1[1] + (c2[1] - c1[1]) * v;
              board.update();
            },
          }).then(function () {
            // 注册为 line-c（清理时 board remove 会出错，用 addSegment 覆盖）
            S.addSegment('line-c', c1, c2, { color: RED, width: 3, dash: 0 });
            // 清理临时对象
            try { board.removeObject(segC); board.removeObject(ptC1); board.removeObject(ptC2); } catch (e) {}
            board.update();
            S.addText('lbl-c', c2[0] + 0.3, c2[1] - 0.3, 'c', { size: 18, color: RED });
            S.dropPoint('pt-A', ptAx, ptAy, { color: INK, name: 'A', size: 3, animate: false, labelOffset: [-18, 8] });
            S.dropPoint('pt-B', ptBx, ptBy, { color: INK, name: 'B', size: 3, animate: false, labelOffset: [-18, -16] });
            P.renderCard('两条直线 $a$、$b$ 被第三条直线 $c$ 所截，<br>产生了 <b>8 个角</b>，形成"<b>三线八角</b>"。');
          });
        },
      },
      {
        // 步骤2：标注8个角
        narration: '直线 $c$ 与直线 $a$ 相交于点 $A$，与直线 $b$ 相交于点 $B$。在 $A$、$B$ 两处各形成 4 个角，一共 8 个角，我们按顺序标注为 ∠1 到 ∠8。注意看它们分别在哪个位置。',
        enter: function (anim) {
          var r = 0.75;
          var rBig = 1.2;

          // A处（c∩a 交点）四个角：∠1~∠4
          // ∠1: 左上，a←(→左)，c↑(→上)
          // p1=a左方向，p2=c上方向
          S.addAngle('ang1', angleP(ptAx, ptAy, -1, 0, r * 2), [ptAx, ptAy],
            angleP(ptAx, ptAy, -cux, -cuy, r * 2),
            { radius: r, color: '#7b1fa2', label: '∠1', opacity: 0.12, labelSize: 13 });

          // ∠2: 右上，c↑，a→
          S.addAngle('ang2', angleP(ptAx, ptAy, -cux, -cuy, r * 2), [ptAx, ptAy],
            angleP(ptAx, ptAy, 1, 0, r * 2),
            { radius: rBig, color: RED, label: '∠2', opacity: 0.12, labelSize: 13 });

          // ∠3: 右下，a→，c↓
          S.addAngle('ang3', angleP(ptAx, ptAy, 1, 0, r * 2), [ptAx, ptAy],
            angleP(ptAx, ptAy, cux, cuy, r * 2),
            { radius: r, color: ORANGE, label: '∠3', opacity: 0.12, labelSize: 13 });

          // ∠4: 左下，c↓，a←
          S.addAngle('ang4', angleP(ptAx, ptAy, cux, cuy, r * 2), [ptAx, ptAy],
            angleP(ptAx, ptAy, -1, 0, r * 2),
            { radius: rBig, color: GREEN, label: '∠4', opacity: 0.12, labelSize: 13 });

          // B处（c∩b 交点）四个角：∠5~∠8
          // b微斜，方向大致向右(1, bSlope)，归一化
          var bLen = Math.sqrt(1 + bSlope * bSlope);
          var bux = 1 / bLen; var buy = bSlope / bLen;

          // ∠5: 左上，b←，c↑
          S.addAngle('ang5', angleP(ptBx, ptBy, -bux, -buy, r * 2), [ptBx, ptBy],
            angleP(ptBx, ptBy, -cux, -cuy, r * 2),
            { radius: r, color: '#7b1fa2', label: '∠5', opacity: 0.12, labelSize: 13 });

          // ∠6: 右上，c↑，b→
          S.addAngle('ang6', angleP(ptBx, ptBy, -cux, -cuy, r * 2), [ptBx, ptBy],
            angleP(ptBx, ptBy, bux, buy, r * 2),
            { radius: rBig, color: RED, label: '∠6', opacity: 0.12, labelSize: 13 });

          // ∠7: 右下，b→，c↓
          S.addAngle('ang7', angleP(ptBx, ptBy, bux, buy, r * 2), [ptBx, ptBy],
            angleP(ptBx, ptBy, cux, cuy, r * 2),
            { radius: r, color: ORANGE, label: '∠7', opacity: 0.12, labelSize: 13 });

          // ∠8: 左下，c↓，b←
          S.addAngle('ang8', angleP(ptBx, ptBy, cux, cuy, r * 2), [ptBx, ptBy],
            angleP(ptBx, ptBy, -bux, -buy, r * 2),
            { radius: rBig, color: GREEN, label: '∠8', opacity: 0.12, labelSize: 13 });

          P.renderCard(
            'A 处（$c$ 截 $a$）：∠1（左上）∠2（右上）∠3（右下）∠4（左下）<br>' +
            'B 处（$c$ 截 $b$）：∠5（左上）∠6（右上）∠7（右下）∠8（左下）<br>' +
            '共 <b>8 个角</b>，这就是"三线八角"。'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：提问三类角
        narration: '这 8 个角，按照位置关系可以分成三大类——同位角、内错角、同旁内角。接下来我们逐类分析。大家先想一想：哪些角看起来"位置相同"？哪些角在两直线"内部且错开两侧"？哪些角在两直线"内部且同侧"？',
        enter: function (anim) {
          P.renderCard(
            '<b>三线八角——按位置分三类</b><br><br>' +
            '① <b>同位角</b>：两个角位置相同（F形）<br>' +
            '② <b>内错角</b>：两个角在两直线内部且在截线两侧（Z形）<br>' +
            '③ <b>同旁内角</b>：两个角在两直线内部且在截线同侧（U形）<br><br>' +
            '下面我们一类一类来看。'
          );
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
