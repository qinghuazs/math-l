(function (CW) {
  'use strict';
  // s4：类比与练习（3步）：经纬度 vs 平面坐标对照，读城市经纬度
  // board:{axis:false, keepAspect:true} bbox:[-10,7.5,10,-7.5]
  var S, P;
  var COOL   = '#1565c0';
  var WARM   = '#e64a19';
  var PURPLE = '#6a1b9a';
  var GREEN  = '#2e7d32';
  var INK    = '#37474f';
  var GOLD   = '#f9a825';

  var scene = {
    id: 's4',
    title: '四、类比平面坐标·读经纬练习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：画对比图——左平面坐标系，右地球经纬网
        narration: '我们来做一个类比：平面直角坐标系和地球经纬度系统，有什么<b>相同之处</b>和<b>不同之处</b>？',
        enter: function () {
          // ── 左侧：平面坐标系示意 ──
          // x轴、y轴
          S.addSegment('s4-xax', [-9, 0], [-1, 0], { color: COOL, width: 2, dash: 0 });
          S.addSegment('s4-yax', [-5, -3.5], [-5, 4], { color: COOL, width: 2, dash: 0 });
          // 箭头标注
          S.addText('s4-xlab', -1.2, 0.3, '$x$', { color: COOL, size: 16 });
          S.addText('s4-ylab', -5.4, 4.3, '$y$', { color: COOL, size: 16 });
          S.addText('s4-o',    -4.7, 0.3, '$O$', { color: COOL, size: 15 });
          // 网格虚线
          S.addSegment('s4-gx1', [-3, -3.5], [-3, 4], { color: COOL, width: 1, dash: 2 });
          S.addSegment('s4-gx2', [-7, -3.5], [-7, 4], { color: COOL, width: 1, dash: 2 });
          S.addSegment('s4-gy1', [-9, 2], [-1, 2], { color: COOL, width: 1, dash: 2 });
          S.addSegment('s4-gy2', [-9, -2], [-1, -2], { color: COOL, width: 1, dash: 2 });
          // 标一个点
          S.dropPoint('s4-pt', -3, 2, { name: '$(2, 2)$', color: WARM, size: 4 });
          S.addText('s4-ptl', -3, -4.1, '平面直角坐标系', { color: COOL, size: 14, anchorX: 'middle' });

          // ── 右侧：地球经纬网示意圆 ──
          S.addCircle('s4-globe', 5, 0, 3.8, { color: GREEN, width: 2.5, fill: GREEN, fillOpacity: 0.05 });
          // 赤道
          S.addSegment('s4-eq', [1.2, 0], [8.8, 0], { color: WARM, width: 2, dash: 0 });
          // 本初子午线
          S.addSegment('s4-pm', [5, 3.8], [5, -3.8], { color: PURPLE, width: 2, dash: 0 });
          // 网格虚线（纬线/经线）
          S.addSegment('s4-lat1', [5 - 3.8 * Math.cos(Math.PI / 6), 3.8 * Math.sin(Math.PI / 6)],
            [5 + 3.8 * Math.cos(Math.PI / 6), 3.8 * Math.sin(Math.PI / 6)],
            { color: WARM, width: 1, dash: 2 });
          S.addSegment('s4-lat2', [5 - 3.8 * Math.cos(Math.PI / 6), -3.8 * Math.sin(Math.PI / 6)],
            [5 + 3.8 * Math.cos(Math.PI / 6), -3.8 * Math.sin(Math.PI / 6)],
            { color: WARM, width: 1, dash: 2 });
          // 城市点（类比平面点）
          var bjX = 5 + 3.8 * Math.sin(116 * Math.PI / 180) * Math.cos(40 * Math.PI / 180);
          var bjY = 3.8 * Math.sin(40 * Math.PI / 180);
          S.dropPoint('s4-bj', bjX, bjY, { name: '北京', color: WARM, size: 4 });
          S.addText('s4-globelab', 5, -4.5, '地球经纬网', { color: GREEN, size: 14, anchorX: 'middle' });
          return Promise.resolve();
        },
      },
      {
        // 步骤2：类比对照表
        narration: '对比两者：经度对应横坐标，纬度对应纵坐标；两者都用<b>两个有序的数</b>确定位置，都需要规定<b>参考原点</b>（坐标原点 O ↔ 赤道+本初子午线交点）。不同点在于：一个在平面，一个在球面。',
        enter: function () {
          P.renderTable({
            head: ['', '平面直角坐标系', '地球经纬度'],
            rows: [
              ['确定位置用', '$(x, y)$ 两个数', '（经度，纬度）两个数'],
              ['横向参考',   '$x$ 轴（横轴）', '赤道（$0^\\circ$ 纬线）'],
              ['纵向参考',   '$y$ 轴（纵轴）', '本初子午线（$0^\\circ$ 经线）'],
              ['研究对象',   '平面', '球面'],
              ['距离计算',   '直线距离公式', '球面大圆弧长'],
            ],
          });
          return Promise.resolve();
        },
      },
      {
        // 步骤3：读经纬度练习
        narration: '练习：根据下表，说出各城市的经纬度，并判断它们分别在哪个半球。',
        enter: function () {
          P.clearExtras();
          P.renderTable({
            head: ['城市', '经度', '纬度', '所在半球'],
            rows: [
              ['北京',   '$116^\\circ$E', '$40^\\circ$N', '东半球 / 北半球'],
              ['伦敦',   '$0^\\circ$',    '$51^\\circ$N', '本初子午线 / 北半球'],
              ['纽约',   '$74^\\circ$W',  '$41^\\circ$N', '西半球 / 北半球'],
              ['悉尼',   '$151^\\circ$E', '$34^\\circ$S', '东半球 / 南半球'],
              ['南极点', '—',             '$90^\\circ$S', '南极点（无东西经）'],
            ],
          });
          P.renderCard(
            '小结：知道经纬度，就能在地球上<b>唯一确定</b>一个地点。<br>' +
            '经度决定东西位置，纬度决定南北位置。',
            'warm'
          );
          // 画板：高亮北京
          S.addText('s4-exercise', -9, 6.5, '结合地球图，找到以下城市的位置：', { color: INK, size: 15 });
          return Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
