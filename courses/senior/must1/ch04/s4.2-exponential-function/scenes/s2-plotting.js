(function (CW) {
  'use strict';
  var S, P;
  var F2 = function (x) { return Math.pow(2, x); };
  var FH = function (x) { return Math.pow(0.5, x); };
  var XS = [-2, -1, 0, 1, 2];
  var R2 = ['\\tfrac14', '\\tfrac12', '1', '2', '4'];      // y=2^x 的展示值
  var RH = ['4', '2', '1', '\\tfrac12', '\\tfrac14'];       // y=(1/2)^x 的展示值
  var HEAD = ['$x$', '$-2$', '$-1$', '$0$', '$1$', '$2$'];
  var WARM = '#e64a19', COOL = '#1565c0';

  // n2/nh：两行各已填格数；popRow：本次弹入动画的行
  function table(n2, nh, popRow) {
    var r2 = ['$y=2^x$'], rh = ['$y=\\left(\\tfrac12\\right)^x$'];
    var i;
    for (i = 0; i < 5; i++) {
      r2.push(i < n2 ? '$' + R2[i] + '$' : '');
      rh.push(i < nh ? '$' + RH[i] + '$' : '');
    }
    P.renderTable({ head: HEAD, rows: [r2, rh], popRow: popRow });
  }

  function allPoints(anim) {
    var p = Promise.resolve();
    XS.forEach(function (x, i) {
      p = p.then(function () {
        if (anim) P.highlightCol(i + 1);
        var a = S.dropPoint('s2-p' + i, x, F2(x), { color: WARM, animate: anim });
        var b = S.dropPoint('s2-q' + i, x, FH(x), { color: COOL, animate: anim });
        return anim ? Promise.all([a, b]).then(function () {
          return new Promise(function (r) { setTimeout(r, 120); });
        }) : null;
      });
    });
    return p.then(function () { P.highlightCol(null); });
  }

  var scene = {
    id: 's2',
    title: '二、描点法作图',
    bbox: [-4.5, 9, 4.5, -1.5],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '描点法三步：<b>列表、描点、连线</b>。第一步列表：在定义域中取特殊值 $x=-2,-1,0,1,2$。',
        enter: function () { table(0, 0, null); },
      },
      {
        narration: '把 $x$ 代入 $y=2^x$ 计算：如 $x=-2$ 时 $y=2^{-2}=\\tfrac14$，其余同理。',
        enter: function () { table(5, 0, 0); },
      },
      {
        narration: '同样完成 $y=\\left(\\tfrac12\\right)^x$ 一行：如 $x=-2$ 时 $y=\\left(\\tfrac12\\right)^{-2}=4$。',
        enter: function () { table(5, 5, 1); },
      },
      {
        narration: '第二步<b>描点</b>：把表中每一组 $(x, y)$ 描到坐标系中（红色对应 $y=2^x$，蓝色对应 $y=\\left(\\tfrac12\\right)^x$）。',
        enter: function (anim) { table(5, 5, null); return allPoints(anim); },
      },
      {
        narration: '第三步<b>连线</b>：按顺序用平滑曲线连接各点，得到两个函数的图像。',
        enter: function (anim) {
          table(5, 5, null);
          return allPoints(false).then(function () {
            return S.plotCurve('s2-c2', F2, { color: WARM, animate: anim, duration: 1300 });
          }).then(function () {
            return S.plotCurve('s2-ch', FH, { color: COOL, animate: anim, duration: 1300 });
          });
        },
      },
      {
        narration: '两条图像画好了。仔细观察：它们之间存在怎样的<b>关系</b>？',
        enter: function (anim) {
          table(5, 5, null);
          return allPoints(false).then(function () {
            return Promise.all([
              S.plotCurve('s2-c2', F2, { color: WARM }),
              S.plotCurve('s2-ch', FH, { color: COOL }),
            ]);
          }).then(function () {
            S.addText('s2-l2', 1.6, 5.2, 'y = 2<sup>x</sup>', { color: WARM, size: 18 });
            S.addText('s2-lh', -3.9, 5.2, 'y = (1/2)<sup>x</sup>', { color: COOL, size: 18 });
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
