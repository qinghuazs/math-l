(function (CW) {
  'use strict';
  // s1：引入——如何描述地球上的位置（3步）
  // board:{axis:false, keepAspect:true} bbox:[-10,7.5,10,-7.5]
  var S, P;
  var OCEAN = '#1565c0';
  var SHIP  = '#e64a19';
  var INK   = '#37474f';
  var GOLD  = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's1',
    title: '一、情境导入：茫茫大海，船在哪里？',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        // 步骤1：画一片"大海"，一艘小船漂在其中
        narration: '想象一下：茫茫大海上，一艘船遇到了麻烦。你需要<b>告诉救援队这艘船在哪里</b>——你会怎么说？',
        enter: function (anim) {
          // 海洋背景矩形
          S.shadeRect('s1-sea', -10, 7.5, 10, -7.5, { color: OCEAN, opacity: 0.08 });
          // 几条波浪线（用曲线模拟）
          S.addText('s1-wave1', -8, -2, '〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜', { color: OCEAN, size: 18 });
          S.addText('s1-wave2', -8, -3.5, '〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜', { color: OCEAN, size: 18 });
          S.addText('s1-wave3', -8, -5, '〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜', { color: OCEAN, size: 18 });
          // 小船（用文字符号表示）
          S.actor('s1-ship', 2, 1.5, '⛵', { size: 38, color: SHIP });
          // 提问气泡
          S.actor('s1-bubble', -2, 4, '❓ 船在哪里？', { size: 20, color: SHIP, bold: true });
          // 方向模糊描述
          S.addText('s1-vague', -8, 5.5, '说"在东边"？说"在北方"？', { color: INK, size: 16 });
          if (anim) {
            return delay(300);
          }
          return Promise.resolve();
        },
      },
      {
        // 步骤2：强调仅凭模糊方向无法定位，引出"需要精确表示"
        narration: '"在东边""在北方"这样的描述太<b>模糊</b>了，无法精确找到船的位置。我们需要像数学那样，用<b>两个数</b>来精确定位。',
        enter: function (anim) {
          // 叉掉模糊描述
          S.addText('s1-cross', -8, 4.8, '✗ "在东边" — 无法定位', { color: SHIP, size: 16 });
          S.addText('s1-cross2', -8, 3.8, '✗ "在北方" — 无法定位', { color: SHIP, size: 16 });
          // 打上问号
          S.actor('s1-q', 4.5, 4, '需要两个数！', { size: 19, color: GOLD, bold: true });
          if (anim) {
            return delay(200);
          }
          return Promise.resolve();
        },
      },
      {
        // 步骤3：类比平面直角坐标系——两个数确定位置的思想
        narration: '我们已经学过：平面直角坐标系用<b>横坐标和纵坐标</b>两个数确定平面上一个点的位置。地球上也有类似的方法——这就是<b>经度和纬度</b>！',
        enter: function (anim) {
          P.renderCard(
            '平面坐标系：两个数 $(x, y)$ 定位平面上的点<br>' +
            '经纬度系统：两个数（经度, 纬度）定位地球上的点<br>' +
            '<b>核心思想相同：用有序的两个数确定位置！</b>',
            'cool'
          );
          // 强调文字
          S.actor('s1-hint', 0, -1, '经纬度 = 地球版的"坐标"', { size: 21, color: OCEAN, bold: true });
          if (anim) {
            return delay(200);
          }
          return Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
