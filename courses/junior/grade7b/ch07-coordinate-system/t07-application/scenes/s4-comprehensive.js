// s4-comprehensive.js  综合应用（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var TEAL   = '#00695c';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 教材公园路线：A(1,2) → B(5,2) → C(5,6)
  var Ax = 1, Ay = 2;
  var Bx = 5, By = 2;
  var Cx = 5, Cy = 6;
  var walkerActor = null;

  var scene = {
    id: 's4',
    title: '四、综合应用',
    bbox: [-8, 7, 8, -7],
    board: { grid: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      walkerActor = null;
    },
    steps: [
      {
        // 步骤1：综合题：从A到C的路线演算（含方向+距离+描述）
        narration: '来做一道综合题。如图，$A(1,2)$ 是公园入口，$B(5,2)$ 是湖心亭，$C(5,6)$ 是观景台。（1）描述从 $A$ 到 $B$ 的路线和距离：$A$、$B$ 纵坐标相同（都是2），$A$ 在 $B$ 的西边，$|AB|=|5-1|=4$，路线是"向东走4格"。（2）描述从 $B$ 到 $C$ 的路线和距离：$B$、$C$ 横坐标相同（都是5），$B$ 在 $C$ 的南边，$|BC|=|6-2|=4$，路线是"向北走4格"。全程路线：从 $A$ 向东走4格，再向北走4格，到达 $C$。总路程8格。',
        enter: function (anim) {
          S.dropPoint('ptA', Ax, Ay, { color: RED,   name: 'A', size: 4.5, labelOffset: [-18, -18] });
          S.dropPoint('ptB', Bx, By, { color: BLUE,  name: 'B', size: 4.5, labelOffset: [6,  -18] });
          S.dropPoint('ptC', Cx, Cy, { color: GREEN, name: 'C', size: 4.5, labelOffset: [6,    8] });

          S.addText('a-lbl', Ax - 1.8, Ay - 0.7, '$A(1,2)$',  { size: 13, color: RED });
          S.addText('b-lbl', Bx + 0.2, By - 0.7, '$B(5,2)$',  { size: 13, color: BLUE });
          S.addText('c-lbl', Cx + 0.2, Cy + 0.2, '$C(5,6)$',  { size: 13, color: GREEN });

          S.addSegment('seg-AB', [Ax,Ay], [Bx,By], { color: RED,  width: 3.5, dash: 0 });
          S.addSegment('seg-BC', [Bx,By], [Cx,Cy], { color: BLUE, width: 3.5, dash: 0 });

          S.addText('step1-dir', -7, 5.9, '第(1)步：$A\\to B$', { size: 14, color: RED });
          S.addText('step1-dist', -7, 5.0,
            '$y$ 相同，向东 $|AB|=|5-1|=4$ 格',
            { size: 13, color: RED });

          S.addText('step2-dir', -7, 4.0, '第(2)步：$B\\to C$', { size: 14, color: BLUE });
          S.addText('step2-dist', -7, 3.1,
            '$x$ 相同，向北 $|BC|=|6-2|=4$ 格',
            { size: 13, color: BLUE });

          S.addText('d-AB-lbl', 2.8, Ay + 0.3, '东4格', { size: 12, color: RED });
          S.addText('d-BC-lbl', Bx + 0.2, 4.1, '北4格', { size: 13, color: BLUE });
          S.addText('total',  0, -6.2,
            '全程：向东4格，再向北4格；总路程 $=8$ 格',
            { size: 13, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>综合题：路线演算</b><br><br>' +
            '$A(1,2)\\to B(5,2)$<br>' +
            '$y$ 相同，向东，$|AB|=4$<br><br>' +
            '$B(5,2)\\to C(5,6)$<br>' +
            '$x$ 相同，向北，$|BC|=4$<br><br>' +
            '全程路线：向东4格，再向北4格<br>' +
            '总路程 $=4+4=\\mathbf{8}$ 格'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：反向路线——从C回到A（动画+演算）
        narration: '再来做反向路线。现在从观景台 $C(5,6)$ 出发，经过湖心亭 $B(5,2)$，返回入口 $A(1,2)$。第一段 $C\\to B$：$x$ 坐标相同，$y$ 从6减到2，减少了4，所以向南走4格。第二段 $B\\to A$：$y$ 坐标相同，$x$ 从5减到1，减少了4，所以向西走4格。返回路线：先向南走4格，再向西走4格，总路程同样是8格。',
        enter: function (anim) {
          // 删除正向路线标注
          S.remove('seg-AB'); S.remove('seg-BC');
          S.remove('step1-dir'); S.remove('step1-dist'); S.remove('step2-dir'); S.remove('step2-dist');
          S.remove('d-AB-lbl'); S.remove('d-BC-lbl'); S.remove('total');

          if (!anim) {
            // 快放：直接落终态（反向路线）
            S.addSegment('rseg-CB', [Cx,Cy], [Bx,By], { color: ORANGE, width: 3.5, dash: 0 });
            S.addSegment('rseg-BA', [Bx,By], [Ax,Ay], { color: PURPLE, width: 3.5, dash: 0 });
            S.addText('r-CB', Cx + 0.2, 4.1, '南4格', { size: 13, color: ORANGE });
            S.addText('r-BA', 2.8, Ay + 0.3, '西4格', { size: 12, color: PURPLE });
            S.addText('r-total', 0, -6.2,
              '返回路线：向南4格，再向西4格；总路程 $=8$ 格',
              { size: 13, color: PURPLE, anchorX: 'middle' });
            P.renderCard(
              '<b>反向路线：$C\\to B\\to A$</b><br><br>' +
              '$C(5,6)\\to B(5,2)$<br>' +
              '$x$ 相同，向南 $|CB|=4$<br><br>' +
              '$B(5,2)\\to A(1,2)$<br>' +
              '$y$ 相同，向西 $|BA|=4$<br><br>' +
              '总路程 $=4+4=\\mathbf{8}$ 格'
            );
            return;
          }

          // 动画：小人从C走回A
          walkerActor = S.actor('walker', Cx, Cy, '●', { size: 22, color: ORANGE, bold: true });

          P.renderCard(
            '<b>反向路线：$C\\to B\\to A$</b><br><br>' +
            '$C(5,6)\\to B(5,2)$<br>' +
            '$x$ 相同，向南 $|CB|=4$<br><br>' +
            '$B(5,2)\\to A(1,2)$<br>' +
            '$y$ 相同，向西 $|BA|=4$<br><br>' +
            '总路程 $=4+4=\\mathbf{8}$ 格'
          );

          return walkerActor.moveTo(Bx, By, 1000).then(function () {
            S.addSegment('rseg-CB', [Cx,Cy], [Bx,By], { color: ORANGE, width: 3.5, dash: 0 });
            S.addText('r-CB', Cx + 0.2, 4.1, '南4格', { size: 13, color: ORANGE });
            return delay(250);
          }).then(function () {
            return walkerActor.moveTo(Ax, Ay, 1000);
          }).then(function () {
            S.remove('walker');
            S.addSegment('rseg-BA', [Bx,By], [Ax,Ay], { color: PURPLE, width: 3.5, dash: 0 });
            S.addText('r-BA', 2.8, Ay + 0.3, '西4格', { size: 12, color: PURPLE });
            return delay(300);
          }).then(function () {
            S.addText('r-total', 0, -6.2,
              '返回路线：向南4格，再向西4格；总路程 $=8$ 格',
              { size: 13, color: PURPLE, anchorX: 'middle' });
          });
        },
      },
      {
        // 步骤3：变式题——已知路线描述，求终点坐标
        narration: '最后是变式题，考验大家的逆向思维。题目：从 $P(-2,3)$ 出发，向东走5格，再向南走4格，到达终点 $Q$。求 $Q$ 的坐标。解题步骤：起点 $P(-2,3)$，向东走5格，$x$ 坐标增大5，变为 $-2+5=3$，$y$ 坐标不变，到达中间点 $(3,3)$；再向南走4格，$y$ 坐标减小4，变为 $3-4=-1$，$x$ 不变；所以终点 $Q(3,-1)$。方法：方向决定加减，距离决定变化量。',
        enter: function (anim) {
          // 清除前两步残留
          S.remove('rseg-CB'); S.remove('rseg-BA');
          S.remove('r-CB'); S.remove('r-BA'); S.remove('r-total');
          S.remove('ptA'); S.remove('ptB'); S.remove('ptC');
          S.remove('a-lbl'); S.remove('b-lbl'); S.remove('c-lbl');

          // 变式题：P(-2,3) → 中间点(3,3) → Q(3,-1)
          var Px = -2, Py = 3;
          var Mx = 3,  My = 3;
          var Qx = 3,  Qy = -1;

          S.dropPoint('ptP', Px, Py, { color: RED,    name: 'P', size: 4.5, labelOffset: [-18, 8] });
          S.dropPoint('ptMid', Mx, My, { color: ORANGE, name: '', size: 3, labelOffset: [6, 8] });
          S.dropPoint('ptQ', Qx, Qy, { color: BLUE,   name: 'Q', size: 4.5, labelOffset: [6, -18] });

          S.addText('p-lbl',  Px - 1.2, Py + 0.4, '$P(-2,3)$',  { size: 13, color: RED });
          S.addText('mid-lbl', Mx + 0.2, My + 0.4, '$(3,3)$',    { size: 12, color: ORANGE });
          S.addText('q-lbl',  Qx + 0.2, Qy - 0.7, '$Q(3,-1)$',  { size: 13, color: BLUE });

          // 路线段
          S.addSegment('seg-PM', [Px,Py], [Mx,My], { color: RED,    width: 3.5, dash: 0 });
          S.addSegment('seg-MQ', [Mx,My], [Qx,Qy], { color: BLUE,   width: 3.5, dash: 0 });

          // 方向+距离标注
          S.addText('v-dir1', 0.1, Py + 0.4, '向东5格', { size: 13, color: RED });
          S.addText('v-dir2', Qx + 0.2, 1.1, '向南4格', { size: 13, color: BLUE });

          // 演算过程
          S.addText('calc-title', -7, 6.0, '解题过程：', { size: 14, color: PURPLE });
          S.addText('calc1', -7, 5.2, '起点 $P(-2,3)$', { size: 13, color: RED });
          S.addText('calc2', -7, 4.4, '向东5格：$x$ 变为 $-2+5=3$，$y$ 不变', { size: 13, color: INK });
          S.addText('calc3', -7, 3.6, '中间点 $(3,3)$', { size: 13, color: ORANGE });
          S.addText('calc4', -7, 2.8, '再向南4格：$y$ 变为 $3-4=-1$，$x$ 不变', { size: 13, color: INK });
          S.addText('calc5', -7, 2.0, '终点 $Q(3,-1)$', { size: 13, color: BLUE });

          S.addText('rule-box', 0, -5.8,
            '规律：方向决定加减，距离决定变化量',
            { size: 13, color: PURPLE, anchorX: 'middle' });

          P.renderCard(
            '<b>变式题：已知路线求终点</b><br><br>' +
            '从 $P(-2,3)$ 出发<br>' +
            '向东5格：$x=-2+5=3$<br>' +
            '到 $(3,3)$<br>' +
            '向南4格：$y=3-4=-1$<br>' +
            '终点 $Q(3,-1)$'
          );
          if (anim) { return delay(400); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
