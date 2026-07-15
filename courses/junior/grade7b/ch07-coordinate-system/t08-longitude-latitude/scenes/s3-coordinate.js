(function (CW) {
  'use strict';
  // s3：经纬度表示位置（4步）：标注城市，理解"经纬度=地球有序数对"
  // board:{axis:false, keepAspect:true} bbox:[-10,7.5,10,-7.5]
  var S, P;
  var GLOBE   = '#1565c0';
  var EQUATOR = '#e64a19';
  var MERIDIAN= '#2e7d32';
  var LATLINE = '#42a5f5';
  var LONLINE = '#66bb6a';
  var INK     = '#37474f';
  var WARM    = '#e64a19';
  var GOLD    = '#f9a825';
  var PURPLE  = '#6a1b9a';

  var CX = 0, CY = 0, R = 5.0;

  // 经纬度转画板坐标（简化正射投影：x=R*sin(lon)*cos(lat), y=R*sin(lat)）
  // 因 keepAspect 等比，x/y 单位一致，正射投影即可
  function lonlatToXY(lonDeg, latDeg) {
    var lon = lonDeg * Math.PI / 180;
    var lat = latDeg * Math.PI / 180;
    return [CX + R * Math.sin(lon) * Math.cos(lat), CY + R * Math.sin(lat)];
  }

  // 城市数据：[id, 名称, 经度(正=东), 纬度(正=北), 标注偏移描述]
  var CITIES = [
    ['beijing',   '北京',   116,  40,  [0.3, 0.4]],
    ['london',    '伦敦',   0,    51,  [0.3, 0.4]],
    ['newyork',   '纽约',   -74,  41,  [-2.8, 0.4]],
    ['sydney',    '悉尼',   151, -34,  [0.3, -0.6]],
  ];

  var scene = {
    id: 's3',
    title: '三、经纬度确定位置',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：重建基础地球图（网格）
        narration: '有了经纬网，地球上任意一点都可以用<b>一个经度值和一个纬度值</b>来描述。就像用 $(x, y)$ 确定平面上的点一样！',
        enter: function () {
          var PI = Math.PI;
          // 地球轮廓
          S.addCircle('s3-globe', CX, CY, R, { color: GLOBE, width: 3, fill: GLOBE, fillOpacity: 0.05 });
          // 赤道
          S.addSegment('s3-eq', [CX - R, CY], [CX + R, CY], { color: EQUATOR, width: 2, dash: 0 });
          // 本初子午线
          S.addSegment('s3-lon0', [CX, CY + R], [CX, CY - R], { color: MERIDIAN, width: 2, dash: 0 });
          // 几条辅助纬线（虚线）
          var lats = [PI / 6, PI / 3, -PI / 6, -PI / 3];
          lats.forEach(function (phi, i) {
            var yr = R * Math.sin(phi);
            var xr = R * Math.cos(phi);
            S.addSegment('s3-lat' + i, [CX - xr, CY + yr], [CX + xr, CY + yr],
              { color: LATLINE, width: 1, dash: 2 });
          });
          // 几条辅助经线（虚线）
          var lons = [PI / 3, 2 * PI / 3, -PI / 3, -2 * PI / 3];
          lons.forEach(function (lam, i) {
            var xl = CX + R * Math.sin(lam);
            var topY = Math.sqrt(Math.max(0, R * R - Math.pow(R * Math.sin(lam), 2)));
            S.addSegment('s3-lon' + i, [xl, CY + topY], [xl, CY - topY],
              { color: LONLINE, width: 1, dash: 2 });
          });
          // 标注
          S.addText('s3-eq-l',  CX + R + 0.2, CY + 0.1, '赤道', { color: EQUATOR, size: 13 });
          S.addText('s3-lon0-l', CX + 0.1, CY + R + 0.4, '本初子午线', { color: MERIDIAN, size: 13 });
          return Promise.resolve();
        },
      },
      {
        // 步骤2：标注北京（东经116°，北纬40°）——动画落点
        narration: '例如：<b>北京</b>位于东经 $116^\\circ$、北纬 $40^\\circ$，记作（$116^\\circ$E，$40^\\circ$N）。让我们在地球上标出北京的位置。',
        enter: function (anim) {
          var city = CITIES[0]; // 北京
          var xy = lonlatToXY(city[2], city[3]);
          var d = anim ? 420 : 0;
          // 辅助线：从本初子午线到北京经度的横向线
          S.addSegment('s3-bj-vline', [xy[0], CY + R * Math.sin(40 * Math.PI / 180)],
            [CX, CY + R * Math.sin(40 * Math.PI / 180)],
            { color: GOLD, width: 1.5, dash: 2 });
          S.addSegment('s3-bj-hline', [xy[0], CY], [xy[0], xy[1]],
            { color: GOLD, width: 1.5, dash: 2 });
          return S.dropPoint('s3-' + city[0], xy[0], xy[1], {
            name: city[1], color: WARM, size: 4.5, animate: anim,
            labelOffset: [city[4][0] * 20, city[4][1] * 20],
          }).then(function () {
            S.addText('s3-bj-coord', xy[0] + 0.3, xy[1] + 0.8,
              '北京 ($116^\\circ$E, $40^\\circ$N)', { color: WARM, size: 15 });
          });
        },
      },
      {
        // 步骤3：标注伦敦、纽约、悉尼
        narration: '再来看其他几座城市：<b>伦敦</b>（$0^\\circ$, $51^\\circ$N）、<b>纽约</b>（$74^\\circ$W, $41^\\circ$N）、<b>悉尼</b>（$151^\\circ$E, $34^\\circ$S）。经纬度就像一张"地球地址"，每座城市都有唯一的坐标！',
        enter: function (anim) {
          var rest = CITIES.slice(1);
          var colors = [GLOBE, PURPLE, '#00838f'];
          var labels = [
            '伦敦 ($0^\\circ$, $51^\\circ$N)',
            '纽约 ($74^\\circ$W, $41^\\circ$N)',
            '悉尼 ($151^\\circ$E, $34^\\circ$S)',
          ];
          var p = Promise.resolve();
          rest.forEach(function (city, i) {
            p = p.then(function () {
              var xy = lonlatToXY(city[2], city[3]);
              return S.dropPoint('s3-' + city[0], xy[0], xy[1], {
                name: city[1], color: colors[i], size: 4, animate: anim,
              }).then(function () {
                S.addText('s3-' + city[0] + '-coord',
                  xy[0] + city[4][0], xy[1] + city[4][1],
                  labels[i], { color: colors[i], size: 13 });
                return anim ? new Promise(function (r) { setTimeout(r, 200); }) : null;
              });
            });
          });
          return p;
        },
      },
      {
        // 步骤4：点明"经纬度=有序数对"
        narration: '经度和纬度的顺序不能颠倒——这正是<b>有序数对</b>的思想！$(116^\\circ$E, $40^\\circ$N)$ 是北京，而 $(40^\\circ$N, $116^\\circ$E)$ 这种写法是没有意义的。两个数，有顺序，才能唯一确定位置。',
        enter: function () {
          P.renderCard(
            '经纬度 = 地球上的<b>有序数对</b><br>' +
            '$(\\text{经度}, \\text{纬度})$ ← 顺序固定，不可互换<br>' +
            '北京：$(116^\\circ\\text{E},\\ 40^\\circ\\text{N})$<br>' +
            '纽约：$(74^\\circ\\text{W},\\ 41^\\circ\\text{N})$',
            'cool',
            'flipInX'
          );
          return Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
