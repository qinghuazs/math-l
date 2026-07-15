// s6-summary.js  小结（2步）
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

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、课堂小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 2,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：小结表格（定义/两要素/性质/作图）
        narration: '这节课我们学习了平移及其性质，来做一个完整的课堂小结。平移的四大板块：第一，定义——图形沿方向移动距离；第二，两要素——方向+距离，缺一不可；第三，性质——对应点连线平行且相等，对应边平行且相等，对应角相等，两图形全等；第四，作图步骤——定方向距离、逐点平移、连接成形。',
        enter: function (anim) {
          // 表格背景
          S.addPolygon('tbl-hd',
            [[-9.5, 7.4], [9.5, 7.4], [9.5, 5.8], [-9.5, 5.8]],
            { fillColor: BLUE, fillOpacity: 0.9, strokeColor: BLUE, strokeWidth: 0 });
          S.addText('tbl-hd-t', 0, 6.4, '平移及其性质——课堂小结',
            { size: 19, color: '#ffffff', anchorX: 'middle' });

          // 行1：定义
          S.addPolygon('row1-bg',
            [[-9.5, 5.7], [9.5, 5.7], [9.5, 4.2], [-9.5, 4.2]],
            { fillColor: '#e3f2fd', fillOpacity: 0.95, strokeColor: '#90caf9', strokeWidth: 1 });
          S.addText('row1-key', -9.2, 5.2, '① 定义', { size: 16, color: BLUE });
          S.addText('row1-val', -5.8, 5.2,
            '图形沿某方向移动一定距离（形状大小不变）',
            { size: 14, color: INK });

          // 行2：两要素
          S.addPolygon('row2-bg',
            [[-9.5, 4.1], [9.5, 4.1], [9.5, 2.6], [-9.5, 2.6]],
            { fillColor: '#fff8e1', fillOpacity: 0.95, strokeColor: '#ffcc02', strokeWidth: 1 });
          S.addText('row2-key', -9.2, 3.6, '② 两要素', { size: 16, color: GOLD });
          S.addText('row2-val', -5.8, 3.6,
            '方向 + 距离（缺一不可，合称"平移向量"）',
            { size: 14, color: INK });

          // 行3：性质（多行）
          S.addPolygon('row3-bg',
            [[-9.5, 2.5], [9.5, 2.5], [9.5, -1.5], [-9.5, -1.5]],
            { fillColor: '#e8f5e9', fillOpacity: 0.95, strokeColor: '#a5d6a7', strokeWidth: 1 });
          S.addText('row3-key', -9.2, 2.1, '③ 性质', { size: 16, color: GREEN });
          S.addText('row3-a', -5.8, 2.1, 'a. 两图形全等（形状大小均不变）', { size: 14, color: INK });
          S.addText('row3-b', -5.8, 1.2, 'b. 对应点连线：平行且相等', { size: 14, color: RED });
          S.addText('row3-c', -5.8, 0.3, 'c. 对应边：平行且相等', { size: 14, color: ORANGE });
          S.addText('row3-d', -5.8, -0.6, 'd. 对应角：相等', { size: 14, color: PURPLE });
          S.addText('row3-e', -5.8, -1.3, '（b是最核心的——其他均由此推出）', { size: 13, color: '#78909c' });

          // 行4：作图步骤
          S.addPolygon('row4-bg',
            [[-9.5, -1.6], [9.5, -1.6], [9.5, -4.0], [-9.5, -4.0]],
            { fillColor: '#f3e5f5', fillOpacity: 0.95, strokeColor: '#ce93d8', strokeWidth: 1 });
          S.addText('row4-key', -9.2, -2.0, '④ 作图', { size: 16, color: PURPLE });
          S.addText('row4-a', -5.8, -2.0, '①确定方向距离  ②逐顶点平移', { size: 14, color: INK });
          S.addText('row4-b', -5.8, -2.9, '③顺次连接对应点  →  得新图形', { size: 14, color: INK });
          S.addText('row4-c', -5.8, -3.7, '（网格纸上：沿格线数格子）', { size: 13, color: '#78909c' });

          // 铁律提示
          S.addPolygon('iron-bg',
            [[-9.5, -4.5], [9.5, -4.5], [9.5, -5.8], [-9.5, -5.8]],
            { fillColor: '#ffebee', fillOpacity: 0.9, strokeColor: RED, strokeWidth: 2 });
          S.addText('iron-txt', 0, -5.0,
            '易错铁律：所有点必须同方向、同距离移动！',
            { size: 15, color: RED, anchorX: 'middle' });

          P.renderCard(
            '<b>课堂小结</b><br><br>' +
            '① 定义：图形沿方向移距离<br>' +
            '② 两要素：方向 + 距离<br>' +
            '③ 性质：对应点连线平行且等<br>' +
            '&nbsp;&nbsp;&nbsp;&nbsp;对应边平行且等，对应角等<br>' +
            '④ 作图：定向→逐点→连线'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：核心结论强调卡 + 本课结束
        narration: '非常好！今天这节课的核心概念是平移的定义、两要素和性质，重点难点是性质的理解和网格作图。同学们课后要注意：平移是图形的整体移动，不能只移部分；同时要能根据平移性质快速判断对应边、对应角的关系。下节课我们将继续学习图形变换，大家加油！',
        enter: function (anim) {
          S.remove('iron-bg'); S.remove('iron-txt');

          // 核心结论卡（彩色强调）
          S.addPolygon('core-bg',
            [[-9.5, -4.5], [9.5, -4.5], [9.5, -7.4], [-9.5, -7.4]],
            { fillColor: '#1565c0', fillOpacity: 0.88, strokeColor: '#1565c0', strokeWidth: 0 });
          S.addText('core-title', 0, -5.0, '核心记忆口诀', { size: 18, color: '#ffffff', anchorX: 'middle' });
          S.addText('core-1', 0, -5.8,
            '平移两要素：方向和距离',
            { size: 16, color: '#ffcc02', anchorX: 'middle' });
          S.addText('core-2', 0, -6.5,
            '对应点连线：平行且相等',
            { size: 16, color: '#80cbc4', anchorX: 'middle' });
          S.addText('core-3', 0, -7.2,
            '全部顶点同向同距 → 才是平移！',
            { size: 15, color: '#ef9a9a', anchorX: 'middle' });

          P.renderCard(
            '<b>本课核心</b><br><br>' +
            '<b style="color:#1565c0">两要素</b>：方向 + 距离<br><br>' +
            '<b style="color:#2e7d32">三性质</b>：<br>' +
            '对应点连线 → 平行且相等<br>' +
            '对应边 → 平行且相等<br>' +
            '对应角 → 相等<br><br>' +
            '<b style="color:#c62828">铁律</b>：同向 + 同距离！',
            null, 'tada'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
