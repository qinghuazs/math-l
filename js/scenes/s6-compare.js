(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32';
  var IDS = []; // 当前例题在画板上的对象 id 列表

  function clearProblem() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }
  function pow(a, x) { return Math.pow(a, x); }

  var scene = {
    id: 's6',
    title: '六、应用：比较大小',
    bbox: [-3.5, 6.5, 5, -1],
    setup: function (stage, panel) { S = stage; P = panel; IDS = []; },
    steps: [
      {
        narration: '例1：比较 $1.7^{2.5}$ 与 $1.7^{3}$。<b>底数相同</b>，可看作 $y=1.7^x$ 在 $x=2.5$、$x=3$ 处的函数值。底 $1.7\\gt 1$ 是增函数，$2.5\\lt 3$，所以 $1.7^{2.5}\\lt 1.7^{3}$。',
        enter: function (anim) {
          clearProblem();
          return S.plotCurve(keep('s6-c1'), function (x) { return pow(1.7, x); },
            { color: WARM, animate: anim }).then(function () {
            S.addSegment(keep('s6-v1'), [2.5, 0], [2.5, pow(1.7, 2.5)], { dash: 2 });
            S.addSegment(keep('s6-v2'), [3, 0], [3, pow(1.7, 3)], { dash: 2 });
            var a = S.dropPoint(keep('s6-p1'), 2.5, pow(1.7, 2.5), { color: WARM, name: '1.7^2.5', animate: anim, labelOffset: [-70, 8] });
            var b = S.dropPoint(keep('s6-p2'), 3, pow(1.7, 3), { color: WARM, name: '1.7^3', animate: anim });
            S.addText(keep('s6-t1'), -3.1, 5.8, 'y = 1.7<sup>x</sup>（增）', { color: WARM, size: 17 });
            return Promise.all([a, b]);
          });
        },
      },
      {
        narration: '例2：比较 $0.3^{-0.3}$ 与 $0.5^{-0.3}$。<b>指数相同</b>，比较两条曲线在 $x=-0.3$ 处的高低：由图像规律得 $0.3^{-0.3}\\gt 0.5^{-0.3}$。',
        enter: function (anim) {
          clearProblem();
          return S.plotCurve(keep('s6-c2'), function (x) { return pow(0.3, x); },
            { color: COOL, animate: anim, duration: 800 }).then(function () {
            return S.plotCurve(keep('s6-c3'), function (x) { return pow(0.5, x); },
              { color: '#0097a7', animate: anim, duration: 800 });
          }).then(function () {
            S.addVLine(keep('s6-v3'), -0.3, { dash: 2, color: '#f9a825', width: 2.5 });
            var a = S.dropPoint(keep('s6-p3'), -0.3, pow(0.3, -0.3), { color: COOL, name: '0.3^{-0.3}', animate: anim, labelOffset: [10, 12] });
            var b = S.dropPoint(keep('s6-p4'), -0.3, pow(0.5, -0.3), { color: '#0097a7', name: '0.5^{-0.3}', animate: anim, labelOffset: [10, -14] });
            S.addText(keep('s6-t2'), -3.1, 5.8, 'y = 0.3<sup>x</sup> 与 y = 0.5<sup>x</sup>', { color: COOL, size: 17 });
            return Promise.all([a, b]);
          });
        },
      },
      {
        narration: '例3：比较 $1.7^{0.3}$ 与 $0.9^{3.1}$。底、指都不同——找<b>中间量</b> $1$：$1.7^{0.3}\\gt 1.7^{0}=1$，而 $0.9^{3.1}\\lt 0.9^{0}=1$，故 $1.7^{0.3}\\gt 0.9^{3.1}$。',
        enter: function (anim) {
          clearProblem();
          return S.plotCurve(keep('s6-c4'), function (x) { return pow(1.7, x); },
            { color: WARM, animate: anim, duration: 800 }).then(function () {
            return S.plotCurve(keep('s6-c5'), function (x) { return pow(0.9, x); },
              { color: COOL, animate: anim, duration: 800 });
          }).then(function () {
            S.addHLine(keep('s6-h1'), 1, { color: GREEN, dash: 3, width: 2.5 });
            S.addText(keep('s6-t3'), 3.6, 1.28, 'y = 1', { color: GREEN, size: 17 });
            var a = S.dropPoint(keep('s6-p5'), 0.3, pow(1.7, 0.3), { color: WARM, name: '1.7^{0.3}', animate: anim, labelOffset: [8, 14] });
            var b = S.dropPoint(keep('s6-p6'), 3.1, pow(0.9, 3.1), { color: COOL, name: '0.9^{3.1}', animate: anim, labelOffset: [8, -14] });
            return Promise.all([a, b]).then(function () {
              return anim ? Promise.all([S.pulse('s6-p5', 2), S.pulse('s6-p6', 2)]) : null;
            });
          });
        },
      },
      {
        narration: '把三道题放在一起总结规律。',
        enter: function () {
          P.renderCard('方法总结：<br>① 底同指不同 $\\to$ <b>单调性法</b><br>② 指同底不同 $\\to$ <b>图像规律法</b><br>③ 底指都不同 $\\to$ <b>中间量法</b>（常用 $1$）', 'warm');
        },
      },
      {
        narration: '记住选法口诀，以后遇到比较大小就不慌了。',
        enter: function () {
          P.renderCard('口诀：<b>同底看单调，同指看图像，都异找中间。</b>', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
