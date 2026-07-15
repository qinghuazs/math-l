(function (CW) {
  'use strict';
  // 场景三：平行线错觉（Zöllner 简化版）
  // 两条水平平行长线，每条线上叠加方向相反的短斜线（干扰线）
  // 干扰线使平行线看起来"歪了"
  var S, P;
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GRAY = '#b0bec5';
  var GREEN = '#388e3c';

  // 两条平行长线的 y 坐标
  var YA = 2.0;
  var YB = -2.0;
  // 干扰斜线半长
  var SL = 0.8;
  // 干扰斜线角度（弧度）
  var ANG_UP = 50 * Math.PI / 180;   // 上线：斜线向右上（/方向）
  var ANG_DN = -50 * Math.PI / 180;  // 下线：斜线向右下（\方向）

  // 干扰斜线 x 位置（间距 2.2，从 -8.8 到 8.8）
  var XPOS = [-8.8, -6.6, -4.4, -2.2, 0, 2.2, 4.4, 6.6, 8.8];

  // 绘制两条主平行线
  function drawMainLines() {
    S.addSegment('s3-lineA', [-9.5, YA], [9.5, YA], { color: WARM, width: 4, dash: 0 });
    S.addSegment('s3-lineB', [-9.5, YB], [9.5, YB], { color: COOL, width: 4, dash: 0 });
    S.actor('s3-la', -9.2, YA + 1.0, '直线 a', { color: WARM, size: 17, bold: true });
    S.actor('s3-lb', -9.2, YB - 1.0, '直线 b', { color: COOL, size: 17, bold: true });
  }

  // 绘制干扰斜线（上线：右上 / 方向，下线：右下 \ 方向）
  function drawDistractors() {
    var i, x, dx, dy;
    for (i = 0; i < XPOS.length; i++) {
      x = XPOS[i];
      // 上线斜线：/ 方向（左下到右上）
      dx = SL * Math.cos(ANG_UP);
      dy = SL * Math.sin(ANG_UP);
      S.addSegment('s3-ua' + i, [x - dx, YA - dy], [x + dx, YA + dy], { color: GRAY, width: 1.5, dash: 0 });
      // 下线斜线：\ 方向（左上到右下）
      dx = SL * Math.cos(ANG_DN);
      dy = SL * Math.sin(ANG_DN);
      S.addSegment('s3-db' + i, [x - dx, YB - dy], [x + dx, YB + dy], { color: GRAY, width: 1.5, dash: 0 });
    }
  }

  // 移除所有干扰斜线
  function removeDistractors(anim) {
    var i;
    var p = Promise.resolve();
    if (!anim) {
      for (i = 0; i < XPOS.length; i++) {
        S.remove('s3-ua' + i);
        S.remove('s3-db' + i);
      }
      return p;
    }
    // 分批移除，制造逐渐消失的效果
    var batch1 = [0, 4, 8];
    var batch2 = [1, 3, 5, 7];
    var batch3 = [2, 6];
    function removeBatch(indices) {
      var j;
      for (j = 0; j < indices.length; j++) {
        S.remove('s3-ua' + indices[j]);
        S.remove('s3-db' + indices[j]);
      }
    }
    return new Promise(function (res) {
      removeBatch(batch1);
      setTimeout(function () {
        removeBatch(batch2);
        setTimeout(function () {
          removeBatch(batch3);
          setTimeout(res, 200);
        }, 250);
      }, 250);
    });
  }

  var scene = {
    id: 's3',
    title: '三、实验二：平行线倾斜错觉（Zöllner）',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '实验二，Zöllner 错觉！看这两条长线，直线 $a$ 和直线 $b$。每条线上都画了一些短斜线——上面的斜向右上，下面的斜向右下。请问：这两条长线，是平行的吗？',
        enter: function (anim) {
          drawMainLines();
          drawDistractors();
          P.renderCard('两条长线 $a$、$b$ 上，叠加了方向相反的短斜线。<br><br>请先凭<b>直觉</b>判断：$a$ 与 $b$ 平行吗？');
          if (!anim) return null;
          return new Promise(function (res) { setTimeout(res, 300); });
        },
      },
      {
        narration: '感觉歪了对不对？$a$ 好像朝左倾，$b$ 好像朝右倾，看起来像要相交的样子！但真相是……它们完全平行！让我们把干扰斜线去掉看看！',
        enter: function (anim) {
          P.renderCard('你的直觉：这两条线<b>歪了</b>，不像平行的！<br><br>短斜线的方向让大脑产生了<b>倾斜错觉</b>……<br>但事实究竟如何？', 'warm');
          if (!anim) return null;
          return new Promise(function (res) { setTimeout(res, 200); });
        },
      },
      {
        narration: '把所有干扰斜线移走——两条长线完全水平，完全平行！这就是 Zöllner 错觉：短斜线的干扰让平行线"看起来不平行"。',
        enter: function (anim) {
          P.renderCard('<b>揭示</b>：去掉干扰斜线……<br>两条长线<b>完全平行</b>！<br><br>短斜线方向不同，欺骗了大脑的方向感。', 'cool');
          return removeDistractors(anim);
        },
      },
      {
        narration: '怎样验证两条直线平行？不能光用眼睛看，要用直尺量两条线的距离——任意取几个点，测量到对方直线的距离，若处处相等，则这两条线平行。',
        enter: function () {
          // 画几条等距测量竖线辅助说明
          S.addSegment('s3-m1', [-5, YA], [-5, YB], { color: '#388e3c', width: 2, dash: 2 });
          S.addSegment('s3-m2', [0, YA], [0, YB], { color: '#388e3c', width: 2, dash: 2 });
          S.addSegment('s3-m3', [5, YA], [5, YB], { color: '#388e3c', width: 2, dash: 2 });
          S.actor('s3-dist', 0, -4.5, '各处距离相等 = 平行！', { color: GREEN, size: 20, bold: true });
          P.renderCard('<b>实验二结论</b><br>$a$、$b$ 两直线实际平行，处处等距。<br>短斜线干扰使大脑产生倾斜错觉。<br><br><b>验证平行</b>：测量各点到对方直线的距离，处处相等则平行。');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
