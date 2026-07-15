(function (CW) {
  'use strict';
  // s2：经线与纬线（4步）★ 核心：addCircle 画地球，经线/纬线绘制，东西经/南北纬划分
  // board:{axis:false, keepAspect:true} bbox:[-10,7.5,10,-7.5]
  var S, P;
  var GLOBE   = '#1565c0';   // 地球轮廓
  var EQUATOR = '#e64a19';   // 赤道高亮
  var MERIDIAN= '#2e7d32';   // 本初子午线高亮
  var LATLINE = '#42a5f5';   // 普通纬线
  var LONLINE = '#66bb6a';   // 普通经线
  var INK     = '#37474f';
  var GOLD    = '#f9a825';

  // 地球圆心和半径（keepAspect保证比例正确）
  var CX = 0, CY = 0, R = 5.5;

  // 画椭圆弧模拟纬线（keepAspect:true 时 x/y 单位相等，可直接用参数方程）
  // 纬线在地球上是水平圆，透视投影为水平椭圆
  // phi 为纬度（弧度），纬线圆半径 = R*cos(phi)，y 位置 = R*sin(phi)
  // 我们用 plotCurve 画参数化 x=r*cos(t), y=yr + 0*t 是水平直线在椭圆透视
  // 简化：用 addSegment 水平线段代表纬线（球面投影的简化教学示意）
  // 经线用竖直弧线（addArc 竖向椭圆弧，或用 plotCurve 参数曲线）

  // 用 addSegment 画"地球内"横线代表纬线，y = R*sin(phi)
  function addLatLine(id, phi, opts) {
    var yr = R * Math.sin(phi);
    var xr = R * Math.cos(phi);
    S.addSegment(id, [CX - xr, CY + yr], [CX + xr, CY + yr], opts || { color: LATLINE, width: 1.5, dash: 1 });
  }

  // 用竖直 addArc 弧模拟经线（半圆弧，从北极点绕到南极点）
  // 经线在透视图里是椭圆弧，用参数曲线简化为垂直线段（教学示意）
  // 为保持简洁，经线用 addSegment 画竖直线段（从北极到南极的轴方向）
  // lambda 为经度（弧度），在投影中 x 位移 = R*sin(lambda)
  function addLonLine(id, lambda, opts) {
    var xl = CX + R * Math.sin(lambda);
    // 从北极 (xl, R) 到南极 (xl, -R) 的竖向线段
    // 但要限制在圆内——用 plotCurve 画正弦形竖线
    // 简化：用 addSegment 切断在圆弧内
    var topY  = Math.sqrt(Math.max(0, R * R - Math.pow(CX + R * Math.sin(lambda) - CX, 2)));
    S.addSegment(id, [xl, CY + topY], [xl, CY - topY], opts || { color: LONLINE, width: 1.5, dash: 1 });
  }

  var scene = {
    id: 's2',
    title: '二、经线与纬线',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：画地球（大圆），提出"如何划分地球"
        narration: '我们把地球看作一个球。要在球面上定位，就需要给地球建立一套"坐标网"——由<b>经线</b>和<b>纬线</b>组成的网格。',
        enter: function () {
          // 地球轮廓大圆
          S.addCircle('s2-globe', CX, CY, R, {
            color: GLOBE, width: 3.5,
            fill: GLOBE, fillOpacity: 0.05,
          });
          // 标注"地球"
          S.addText('s2-label', CX - 0.8, CY + R + 0.5, '地球（示意）', { color: GLOBE, size: 16 });
          // 北极点、南极点
          S.dropPoint('s2-np', CX, CY + R, { name: '北极', color: INK, size: 3 });
          S.dropPoint('s2-sp', CX, CY - R, { name: '南极', color: INK, size: 3 });
          return Promise.resolve();
        },
      },
      {
        // 步骤2：画纬线（赤道高亮）
        narration: '与赤道平行的圆圈叫<b>纬线</b>。赤道纬度为 $0^\\circ$，向北为<b>北纬</b>（$0^\\circ \\sim 90^\\circ$N），向南为<b>南纬</b>（$0^\\circ \\sim 90^\\circ$S）。',
        enter: function (anim) {
          var PI = Math.PI;
          // 赤道（0° 高亮）
          S.addSegment('s2-eq', [CX - R, CY], [CX + R, CY], {
            color: EQUATOR, width: 3, dash: 0,
          });
          S.addText('s2-eq-label', CX + R + 0.2, CY, '赤道 $0^\\circ$', { color: EQUATOR, size: 15 });
          // 北纬 30°、60°
          addLatLine('s2-lat-n30', PI / 6, { color: LATLINE, width: 1.5, dash: 1 });
          S.addText('s2-lat-n30-l', CX + R * Math.cos(PI / 6) + 0.1, CY + R * Math.sin(PI / 6),
            '$30^\\circ$N', { color: LATLINE, size: 13 });
          addLatLine('s2-lat-n60', PI / 3, { color: LATLINE, width: 1.5, dash: 1 });
          S.addText('s2-lat-n60-l', CX + R * Math.cos(PI / 3) + 0.1, CY + R * Math.sin(PI / 3),
            '$60^\\circ$N', { color: LATLINE, size: 13 });
          // 南纬 30°、60°
          addLatLine('s2-lat-s30', -PI / 6, { color: LATLINE, width: 1.5, dash: 1 });
          S.addText('s2-lat-s30-l', CX + R * Math.cos(PI / 6) + 0.1, CY - R * Math.sin(PI / 6),
            '$30^\\circ$S', { color: LATLINE, size: 13 });
          addLatLine('s2-lat-s60', -PI / 3, { color: LATLINE, width: 1.5, dash: 1 });
          S.addText('s2-lat-s60-l', CX + R * Math.cos(PI / 3) + 0.1, CY - R * Math.sin(PI / 3),
            '$60^\\circ$S', { color: LATLINE, size: 13 });
          // 南北方向箭头标注
          S.addText('s2-north', CX - R - 1.2, CY + 1.5, '↑ 北纬', { color: LATLINE, size: 14 });
          S.addText('s2-south', CX - R - 1.2, CY - 1.5, '↓ 南纬', { color: LATLINE, size: 14 });
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 300); });
          }
          return Promise.resolve();
        },
      },
      {
        // 步骤3：画经线（本初子午线高亮）
        narration: '连接南北两极的半圆叫<b>经线</b>。经过英国格林尼治天文台的经线为<b>本初子午线</b>，经度 $0^\\circ$，向东为<b>东经</b>，向西为<b>西经</b>（各 $0^\\circ \\sim 180^\\circ$）。',
        enter: function (anim) {
          var PI = Math.PI;
          // 本初子午线（0°，竖直高亮）
          S.addSegment('s2-lon0', [CX, CY + R], [CX, CY - R], {
            color: MERIDIAN, width: 3, dash: 0,
          });
          S.addText('s2-lon0-label', CX + 0.15, CY + R + 0.4,
            '本初子午线 $0^\\circ$', { color: MERIDIAN, size: 14 });
          // 东经 60°、120°
          addLonLine('s2-lon-e60',  PI / 3, { color: LONLINE, width: 1.5, dash: 1 });
          S.addText('s2-lon-e60-l', CX + R * Math.sin(PI / 3) + 0.1, CY + 0.3,
            '$60^\\circ$E', { color: LONLINE, size: 13 });
          addLonLine('s2-lon-e120', 2 * PI / 3, { color: LONLINE, width: 1.5, dash: 1 });
          S.addText('s2-lon-e120-l', CX + R * Math.sin(2 * PI / 3) + 0.1, CY + 0.3,
            '$120^\\circ$E', { color: LONLINE, size: 13 });
          // 西经 60°、120°
          addLonLine('s2-lon-w60',  -PI / 3, { color: LONLINE, width: 1.5, dash: 1 });
          S.addText('s2-lon-w60-l', CX + R * Math.sin(-PI / 3) - 1.6, CY + 0.3,
            '$60^\\circ$W', { color: LONLINE, size: 13 });
          addLonLine('s2-lon-w120', -2 * PI / 3, { color: LONLINE, width: 1.5, dash: 1 });
          S.addText('s2-lon-w120-l', CX + R * Math.sin(-2 * PI / 3) - 1.8, CY + 0.3,
            '$120^\\circ$W', { color: LONLINE, size: 13 });
          // 东西方向标注
          S.addText('s2-east', CX + 1.5, CY - R - 0.7, '→ 东经', { color: LONLINE, size: 14 });
          S.addText('s2-west', CX - 3.5, CY - R - 0.7, '西经 ←', { color: LONLINE, size: 14 });
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 300); });
          }
          return Promise.resolve();
        },
      },
      {
        // 步骤4：归纳经纬度范围
        narration: '经纬线把地球表面织成一张"网格"。<b>经度</b>：东经 $0^\\circ \\sim 180^\\circ$（E），西经 $0^\\circ \\sim 180^\\circ$（W）；<b>纬度</b>：北纬 $0^\\circ \\sim 90^\\circ$（N），南纬 $0^\\circ \\sim 90^\\circ$（S）。',
        enter: function () {
          P.renderTable({
            head: ['', '参考线', '范围', '正方向'],
            rows: [
              ['经度', '本初子午线 $0^\\circ$', '$0^\\circ \\sim 180^\\circ$', '向东为东经（E）'],
              ['纬度', '赤道 $0^\\circ$',       '$0^\\circ \\sim 90^\\circ$',  '向北为北纬（N）'],
            ],
          });
          return Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
