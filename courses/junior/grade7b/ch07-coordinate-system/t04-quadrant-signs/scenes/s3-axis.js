(function (CW) {
  'use strict';
  var S, P;
  var C_PX = '#e64a19';
  var C_PY = '#1565c0';
  var C_O  = '#c62828';
  var C_SHADE1 = '#ffccbc';
  var C_SHADE2 = '#bbdefb';
  var C_SHADE3 = '#c8e6c9';
  var C_SHADE4 = '#e1bee7';
  var BBOX = [-6, 6, 6, -6];

  var pxVal;
  var pyActor;

  function shadeAll() {
    S.shadeRect('s3-q1bg', 0, 0, 6, 6, { color: C_SHADE1, opacity: 0.15 });
    S.shadeRect('s3-q2bg', -6, 0, 0, 6, { color: C_SHADE2, opacity: 0.15 });
    S.shadeRect('s3-q3bg', -6, -6, 0, 0, { color: C_SHADE3, opacity: 0.15 });
    S.shadeRect('s3-q4bg', 0, -6, 6, 0, { color: C_SHADE4, opacity: 0.15 });
  }

  var scene = {
    id: 's3',
    title: '三、坐标轴上点的特征',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      pxVal = -5;
      pyActor = null;
    },
    steps: [
      {
        narration: '现在研究<b>坐标轴上点</b>的特征。先看 $x$ 轴——' +
          '请注意这个在 $x$ 轴上滑动的点，不管它在 $x$ 轴的什么位置，' +
          '它的<b>纵坐标 $y$ 始终等于 $0$</b>！' +
          '所以 $x$ 轴上点的坐标形式是 $(a, 0)$，$a$ 可以是任意实数。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          pxVal = -5;
          var mp = S.movingPoint('s3-px', function (x) { return 0; }, { from: -5, color: C_PX, size: 5 });
          // 动态标签直接读动点 obj.X()，保证动画期间实时跟随
          S.addText('s3-px-lbl',
            function () { return mp.obj.X() + 0.2; },
            function () { return 0.5; },
            function () {
              var v = Math.round(mp.obj.X() * 10) / 10;
              return '$(' + v + ',\\ 0)$';
            },
            { size: 14, color: C_PX }
          );
          S.addText('s3-form-x', -1.8, -1.2, '$x$ 轴上的点：$(a,\\ 0)$', { size: 16, color: C_PX });
          P.renderCard(
            '<b>$x$ 轴上的点</b><br>' +
            '纵坐标恒为 $0$<br>' +
            '坐标形式：$(a,\\ 0)$',
            'warm', 'fadeInDown'
          );
          if (anim) {
            return mp.run(5, 2800);
          }
          // 快放：run 到终态（duration=0 立即完成）
          return mp.run(5, 0);
        },
      },
      {
        narration: '再看 $y$ 轴。这个点在 $y$ 轴上上下滑动——' +
          '不管它在 $y$ 轴的什么位置，它的<b>横坐标 $x$ 始终等于 $0$</b>！' +
          '所以 $y$ 轴上点的坐标形式是 $(0, b)$，$b$ 可以是任意实数。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          pxVal = 5;
          S.movingPoint('s3-px', function (x) { return 0; }, { from: 5, color: C_PX, size: 5 });
          S.addText('s3-form-x', -1.8, -1.2, '$x$ 轴上的点：$(a,\\ 0)$', { size: 16, color: C_PX });
          pyActor = S.actor('s3-py', 0, -5, '$\\bullet$', { size: 22, color: C_PY });
          S.addText('s3-py-lbl',
            0.3,
            function () { return pyActor ? pyActor.obj.Y() + 0.3 : -5 + 0.3; },
            '$(0,\\ b)$',
            { size: 14, color: C_PY }
          );
          S.addText('s3-form-y', 0.5, 2.5, '$y$ 轴上的点：$(0,\\ b)$', { size: 16, color: C_PY });
          P.renderCard(
            '<b>$y$ 轴上的点</b><br>' +
            '横坐标恒为 $0$<br>' +
            '坐标形式：$(0,\\ b)$',
            'cool', 'fadeInDown'
          );
          if (anim) {
            return pyActor.moveTo(0, 5, 2800);
          }
          return pyActor.moveTo(0, 5, 0);
        },
      },
      {
        narration: '还有最特殊的点——<b>原点 $O$</b>，它同时在 $x$ 轴上又在 $y$ 轴上，' +
          '坐标是 $(0, 0)$。原点的横坐标和纵坐标都是 $0$。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          pxVal = 5;
          S.movingPoint('s3-px', function (x) { return 0; }, { from: 5, color: C_PX, size: 5 });
          S.addText('s3-form-x', -1.8, -1.2, '$x$ 轴上的点：$(a,\\ 0)$', { size: 16, color: C_PX });
          pyActor = S.actor('s3-py', 0, 5, '$\\bullet$', { size: 22, color: C_PY });
          S.addText('s3-form-y', 0.5, 2.5, '$y$ 轴上的点：$(0,\\ b)$', { size: 16, color: C_PY });
          S.dropPoint('s3-origin', 0, 0, {
            color: C_O, size: 6, name: '$O(0,0)$', animate: anim, labelOffset: [8, -18]
          });
          S.addText('s3-form-o', -3.5, -2, '原点：$(0,\\ 0)$', { size: 16, color: C_O });
          P.renderCard(
            '<b>原点 $O$</b><br>' +
            '坐标 $(0,\\ 0)$<br>' +
            '同时在 $x$ 轴和 $y$ 轴上',
            '', 'flipInX'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 500); });
          }
          return Promise.resolve();
        },
      },
      {
        narration: '特别注意：坐标轴上的点<b>不属于任何象限</b>！' +
          '比如点 $(0, 3)$ 在 $y$ 轴上，有同学误说"在第一象限"，这是错的。' +
          '象限只包含两轴之间的区域，不含坐标轴本身。',
        enter: function (anim) {
          P.clearExtras();
          shadeAll();
          pxVal = 5;
          S.movingPoint('s3-px', function (x) { return 0; }, { from: 5, color: C_PX, size: 5 });
          S.addText('s3-form-x', -1.8, -1.2, '$x$ 轴上的点：$(a,\\ 0)$', { size: 16, color: C_PX });
          pyActor = S.actor('s3-py', 0, 5, '$\\bullet$', { size: 22, color: C_PY });
          S.addText('s3-form-y', 0.5, 2.5, '$y$ 轴上的点：$(0,\\ b)$', { size: 16, color: C_PY });
          S.dropPoint('s3-origin', 0, 0, { color: C_O, size: 6, name: '$O(0,0)$', labelOffset: [8, -18] });
          S.dropPoint('s3-trap', 0, 3, { color: '#e91e63', size: 5, name: '$(0,3)$', labelOffset: [8, 6] });
          P.renderCard(
            '<b>注意：</b>坐标轴上的点<br>' +
            '<b>不属于任何象限！</b><br>' +
            '$(0,3)$ 在 $y$ 轴上，不在第一象限',
            'warm', 'tada'
          );
          if (anim) {
            return new Promise(function (res) { setTimeout(res, 400); });
          }
          return Promise.resolve();
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
