(function (CW) {
  'use strict';
  function fatal() {
    var el = document.getElementById('fatal');
    if (el) el.hidden = false;
  }
  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }
  function buildUI(director, scenes) {
    var dots = document.getElementById('dots');
    scenes.forEach(function (sc, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'dot';
      d.title = sc.title;
      d.setAttribute('aria-label', sc.title);
      d.addEventListener('click', function () { director.jump(i, 0); });
      dots.appendChild(d);
    });
    document.getElementById('btn-prev').addEventListener('click', function () { director.prev(); });
    document.getElementById('btn-next').addEventListener('click', function () { director.next(); });
    document.getElementById('btn-fs').addEventListener('click', toggleFullscreen);
    return function update(st) {
      dots.querySelectorAll('.dot').forEach(function (d, i) {
        d.classList.toggle('on', i === st.s);
      });
      document.getElementById('step-ind').textContent =
        '环节 ' + (st.s + 1) + '/' + scenes.length +
        ' · 步 ' + (st.k + 1) + '/' + scenes[st.s].steps.length;
    };
  }
  window.addEventListener('DOMContentLoaded', function () {
    if (typeof JXG === 'undefined' || typeof katex === 'undefined' || !CW.scenes || !CW.scenes.length) {
      fatal();
      return;
    }
    var stage = CW.createStage('board');
    var panel = CW.createPanel(document.getElementById('panel'));
    var updateUI = null;
    var director = CW.createDirector({
      scenes: CW.scenes, stage: stage, panel: panel,
      onUpdate: function (st) { if (updateUI) updateUI(st); },
      onFullscreen: toggleFullscreen,
    });
    updateUI = buildUI(director, CW.scenes);
    director.start();
  });
})(window.CW = window.CW || {});
