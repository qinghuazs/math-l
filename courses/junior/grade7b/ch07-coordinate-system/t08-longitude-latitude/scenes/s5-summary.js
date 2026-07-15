(function (CW) {
  'use strict';
  // s5：小结与拓展（2步）：要点小结；GPS/导航应用拓展卡
  // board:{axis:false, keepAspect:true} bbox:[-10,7.5,10,-7.5]
  var S, P;
  var COOL   = '#1565c0';
  var WARM   = '#e64a19';
  var GREEN  = '#2e7d32';
  var PURPLE = '#6a1b9a';
  var INK    = '#37474f';
  var GOLD   = '#f9a825';

  var CX = 0, CY = 0.5, R = 4.8;

  var scene = {
    id: 's5',
    title: '五、小结与拓展',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 2,
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：知识要点小结（画板放精简地球+知识树，面板放结论卡）
        narration: '本节课的核心知识点：①<b>纬线</b>与<b>经线</b>的定义；②<b>纬度</b>（$0^\\circ \\sim 90^\\circ$，赤道为基准）和<b>经度</b>（$0^\\circ \\sim 180^\\circ$，本初子午线为基准）；③经纬度合起来确定地球上的<b>唯一位置</b>，体现<b>有序数对</b>的思想。',
        enter: function () {
          // 画板：简洁地球 + 关键标注
          S.addCircle('s5-globe', CX, CY, R, { color: COOL, width: 3, fill: COOL, fillOpacity: 0.05 });
          // 赤道
          S.addSegment('s5-eq',  [CX - R, CY], [CX + R, CY], { color: WARM,  width: 2.5, dash: 0 });
          // 本初子午线
          S.addSegment('s5-pm',  [CX, CY + R], [CX, CY - R], { color: GREEN, width: 2.5, dash: 0 });
          // 北极、南极（name 含 $..$，引擎 dropPoint 自动用 addText 渲染 KaTeX）
          S.dropPoint('s5-np', CX, CY + R, { name: '北极 $90^\\circ$N', color: INK, size: 3 });
          S.dropPoint('s5-sp', CX, CY - R, { name: '南极 $90^\\circ$S', color: INK, size: 3, labelOffset: [8, -16] });
          // 北京标注
          var bjX = CX + R * Math.sin(116 * Math.PI / 180) * Math.cos(40 * Math.PI / 180);
          var bjY = CY + R * Math.sin(40 * Math.PI / 180);
          S.dropPoint('s5-bj', bjX, bjY, { name: '北京', color: WARM, size: 4 });
          S.addText('s5-bj-c', bjX + 0.2, bjY + 0.5,
            '$116^\\circ$E, $40^\\circ$N', { color: WARM, size: 13 });
          // 标签
          S.addText('s5-eq-l',  CX + R + 0.2, CY,       '赤道', { color: WARM,  size: 13 });
          S.addText('s5-pm-l',  CX + 0.1, CY + R + 0.4, '本初子午线', { color: GREEN, size: 13 });

          // 面板：知识小结卡片
          P.renderCard(
            '<b>【知识小结】经纬度表示地理位置</b><br><br>' +
            '① <b>纬线</b>：平行于赤道的圆圈；赤道 $0^\\circ$，向北为北纬N，向南为南纬S<br>' +
            '② <b>经线</b>：连接南北极的半圆；本初子午线 $0^\\circ$，向东为东经E，向西为西经W<br>' +
            '③ 位置表示：（经度，纬度），顺序固定——<b>有序数对</b><br>' +
            '④ 与平面坐标类比：经度↔横坐标，纬度↔纵坐标',
            'cool',
            'fadeInUp'
          );
          return Promise.resolve();
        },
      },
      {
        // 步骤2：GPS/导航拓展
        narration: '拓展思考：手机 GPS 导航依赖<b>卫星定位</b>——至少需要 4 颗卫星同时测量，才能精确得到你的经纬度和海拔。航海、航空、军事……经纬度的应用无处不在。数学中的"坐标思想"，从平面走向了球面，走向了整个地球！',
        enter: function () {
          P.clearExtras();
          P.renderCard(
            '<b>【拓展：GPS 与经纬度】</b><br><br>' +
            '📡 GPS（全球定位系统）：利用多颗卫星发射无线电信号，<br>' +
            '　　接收器通过计算<b>时差</b>得到与卫星的距离，<br>' +
            '　　从而定出精确的<b>经度、纬度、海拔</b>。<br><br>' +
            '🚢 <b>航海</b>：古代水手用六分仪测纬度，用天文钟测经度。<br>' +
            '✈️ <b>航空</b>：飞行计划按经纬度坐标规划航线。<br><br>' +
            '💡 思考：纬度相同的两个地点，距离一定相同吗？',
            'warm',
            'tada'
          );
          // 画板：装饰性卫星轨道示意
          S.addCircle('s5-orbit1', CX, CY, R + 1.2, { color: PURPLE, width: 1.5, dash: 2 });
          S.addCircle('s5-orbit2', CX, CY, R + 2.2, { color: GOLD,   width: 1.5, dash: 2 });
          // 卫星符号
          S.actor('s5-sat1', CX + (R + 1.2), CY,         '🛰', { size: 22 });
          S.actor('s5-sat2', CX - (R + 1.2) * 0.7, CY + (R + 1.2) * 0.7, '🛰', { size: 22 });
          S.actor('s5-sat3', CX,              CY - (R + 2.2), '🛰', { size: 22 });
          // 信号线
          var bjX = CX + R * Math.sin(116 * Math.PI / 180) * Math.cos(40 * Math.PI / 180);
          var bjY = CY + R * Math.sin(40 * Math.PI / 180);
          S.addSegment('s5-sig1', [bjX, bjY], [CX + (R + 1.2), CY],         { color: GOLD, width: 1, dash: 2 });
          S.addSegment('s5-sig2', [bjX, bjY], [CX - (R + 1.2) * 0.7, CY + (R + 1.2) * 0.7], { color: GOLD, width: 1, dash: 2 });
          S.addSegment('s5-sig3', [bjX, bjY], [CX, CY - (R + 2.2)],         { color: GOLD, width: 1, dash: 2 });
          return Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
