(function (CW) {
  'use strict';
  var S, P;
  var F2 = function (x) { return Math.pow(2, x); };
  var FH = function (x) { return Math.pow(0.5, x); };
  var WARM = '#e64a19', COOL = '#1565c0';

  // setup 静态重建 S2 的完成态：两条曲线+标签
  function base() {
    S.plotCurve('s3-c2', F2, { color: WARM });
    S.plotCurve('s3-ch', FH, { color: COOL });
    S.addText('s3-l2', 1.6, 5.2, 'y = 2<sup>x</sup>', { color: WARM, size: 18 });
    S.addText('s3-lh', -3.9, 5.2, 'y = (1/2)<sup>x</sup>', { color: COOL, size: 18 });
  }

  var scene = {
    id: 's3',
    title: '三、图像的对称性',
    bbox: [-4.5, 9, 4.5, -1.5],
    setup: function (stage, panel) { S = stage; P = panel; base(); },
    steps: [
      {
        narration: '观察发现：图像上的点是<b>成对</b>出现的——$(1,2)$ 与 $(-1,2)$、$(2,4)$ 与 $(-2,4)$……它们关于 $y$ 轴对称。',
        enter: function (anim) {
          S.dropPoint('s3-a1', 1, 2, { color: WARM, name: '(1, 2)', animate: anim });
          S.dropPoint('s3-b1', -1, 2, { color: COOL, name: '(-1, 2)', animate: anim, labelOffset: [-58, 10] });
          S.addSegment('s3-s1', [1, 2], [-1, 2], { dash: 2 });
          S.dropPoint('s3-a2', 2, 4, { color: WARM, name: '(2, 4)', animate: anim });
          S.dropPoint('s3-b2', -2, 4, { color: COOL, name: '(-2, 4)', animate: anim, labelOffset: [-58, 10] });
          S.addSegment('s3-s2', [2, 4], [-2, 4], { dash: 2 });
          return anim ? Promise.all([S.pulse('s3-a1', 2), S.pulse('s3-b1', 2)]) : null;
        },
      },
      {
        narration: '把 $y=2^x$ 沿 $y$ 轴<b>翻折</b>过去，看——恰好与 $y=\\left(\\tfrac12\\right)^x$ <b>完全重合</b>！',
        enter: function (anim) {
          if (!anim) return null; // 快放不留翻折虚影
          return S.mirrorFold('s3-ghost', F2, { color: WARM, duration: 1600 }).then(function () {
            // 蓝曲线加粗闪两下表示重合确认
            var c = S.get('s3-ch');
            return new Promise(function (res) {
              CW.tween({ from: 3.5, to: 6.5, duration: 260, onUpdate: function (v) { c.setAttribute({ strokeWidth: v }); },
                onDone: function () {
                  CW.tween({ from: 6.5, to: 3.5, duration: 260, onUpdate: function (v) { c.setAttribute({ strokeWidth: v }); },
                    onDone: function () { S.remove('s3-ghost'); res(); } });
                } });
            });
          });
        },
      },
      {
        narration: '$2$ 与 $\\tfrac12$ 互为<b>倒数</b>。这个结论可以推广到一般情形。',
        enter: function () {
          P.renderCard('结论：底数<b>互为倒数</b>的两个指数函数，即 $y=a^x$ 与 $y=\\left(\\tfrac1a\\right)^x$，图像关于 $y$ 轴对称。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
