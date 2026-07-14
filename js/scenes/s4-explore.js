(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', WARM2 = '#f57c00', COOL = '#1565c0', COOL2 = '#0097a7';
  var PURPLE = '#6a1b9a';
  // 曲线族：底数与"探索前中性色"，步 5 重着色为暖/冷
  var FAMILY = [
    { id: 's4-f4', a: 4,     warm: true,  color: '#bdbdbd' },
    { id: 's4-f3', a: 3,     warm: true,  color: '#bdbdbd' },
    { id: 's4-f13', a: 1 / 3, warm: false, color: '#bdbdbd' },
    { id: 's4-f14', a: 1 / 4, warm: false, color: '#bdbdbd' },
  ];
  var sld = null;

  function famFn(a) { return function (x) { return Math.pow(a, x); }; }

  function drawFamily(anim) {
    var p = Promise.resolve();
    FAMILY.forEach(function (f) {
      p = p.then(function () {
        return S.plotCurve(f.id, famFn(f.a), { color: f.color, width: 2.2, opacity: 0.8, animate: anim, duration: 550 });
      });
    });
    return p;
  }
  // 滑块 + 动态主曲线 + 动态读数（放画板顶部空间 y≈8.3）
  function buildSlider(startA) {
    sld = S.slider('s4-sld', { x1: -3.6, y1: 8.3, x2: 0.6, y2: 8.3, min: 0.1, start: startA, max: 5, name: 'a' });
    S.plotCurve('s4-dyn', function (x) { return Math.pow(sld.Value(), x); }, { color: PURPLE, width: 4 });
    S.addText('s4-read', 1.4, 8.3, function () { return 'a = ' + sld.Value().toFixed(2); }, { size: 18, color: PURPLE });
  }

  var scene = {
    id: 's4',
    title: '四、底数 a 对图像的影响',
    bbox: [-4.5, 9.5, 4.5, -2],
    setup: function (stage, panel) {
      S = stage; P = panel;
      // 延续前情：两条基础曲线细线呈现
      S.plotCurve('s4-c2', function (x) { return Math.pow(2, x); }, { color: WARM, width: 2, opacity: 0.55 });
      S.plotCurve('s4-ch', function (x) { return Math.pow(0.5, x); }, { color: COOL, width: 2, opacity: 0.55 });
    },
    steps: [
      {
        narration: '只有两个函数还远远不够。我们再画一批指数函数：$y=3^x$、$y=4^x$、$y=\\left(\\tfrac13\\right)^x$、$y=\\left(\\tfrac14\\right)^x$……',
        enter: function (anim) { return drawFamily(anim); },
      },
      {
        narration: '这是<b>底数滑块</b>：拖动改变 $a$，紫色曲线随之变化。注意——当 $a=1$ 时曲线退化成水平线 $y=1$，这就是定义要求 $a\\neq 1$ 的原因！',
        enter: function (anim) {
          drawFamily(false);
          buildSlider(2);
          if (!anim) return null;
          return S.animateSlider(sld, 1, 900).then(function () {
            return new Promise(function (r) { setTimeout(r, 650); });
          }).then(function () { return S.animateSlider(sld, 2, 900); });
        },
      },
      {
        narration: '先看 $a>1$：滑块从 $1.5$ 增大到 $5$。观察 $y$ 轴<b>右侧</b>——底数越大，图像升得越高，简记<b>"底大幅高"</b>。',
        enter: function (anim) {
          drawFamily(false);
          if (!sld || !S.get('s4-sld')) buildSlider(1.5);
          S.shadeRect('s4-sh', 0, 0, 4.5, 9.5, { color: WARM, opacity: 0.06 });
          if (!anim) { sld.setValue(5); S.getBoard().update(); return null; }
          sld.setValue(1.5); S.getBoard().update();
          return S.animateSlider(sld, 5, 2600);
        },
      },
      {
        narration: '再看 $0\\lt a\\lt 1$：滑块从 $0.9$ 减小到 $0.15$。观察 $y$ 轴<b>左侧</b>——底数越大，图像越低，简记<b>"底大图低"</b>。',
        enter: function (anim) {
          drawFamily(false);
          if (!sld || !S.get('s4-sld')) buildSlider(0.9);
          S.remove('s4-sh');
          S.shadeRect('s4-sh2', -4.5, 0, 0, 9.5, { color: COOL, opacity: 0.06 });
          if (!anim) { sld.setValue(0.15); S.getBoard().update(); return null; }
          sld.setValue(0.9); S.getBoard().update();
          return S.animateSlider(sld, 0.15, 2600);
        },
      },
      {
        narration: '所有指数函数的图像按底数分成<b>两类</b>：$a>1$（暖色）与 $0\\lt a\\lt 1$（冷色）。研究性质时分这两种情况。',
        enter: function () {
          S.remove('s4-sh2');
          FAMILY.forEach(function (f) {
            var c = S.get(f.id);
            if (c) c.setAttribute({ strokeColor: f.warm ? WARM2 : COOL2, strokeOpacity: 0.9 });
          });
          S.getBoard().update();
          P.renderCard('分类研究：<span style="color:#e64a19"><b>$a\\gt 1$</b></span> 与 <span style="color:#1565c0"><b>$0\\lt a\\lt 1$</b></span>', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
