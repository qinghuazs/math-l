(function (CW) {
  'use strict';
  // CW.createPanel(rootEl) -> panel
  // panel: setScene/setNarration/renderTable/highlightCol/renderCard/clearExtras/setControls
  function createPanel(root) {
    root.innerHTML = '<div class="p-scene"></div><div class="p-narration"></div>' +
      '<div class="p-extras"></div><div class="p-controls"></div>';
    var sceneEl = root.querySelector('.p-scene');
    var narrEl = root.querySelector('.p-narration');
    var extraEl = root.querySelector('.p-extras');
    var ctrlEl = root.querySelector('.p-controls');

    function math(el) {
      if (typeof renderMathInElement === 'function') {
        renderMathInElement(el, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
      }
    }

    return {
      setScene: function (t) { sceneEl.textContent = t || ''; },
      // html 支持 $...$ 行内公式与 <b> 等标签
      setNarration: function (html) {
        narrEl.innerHTML = html || '';
        math(narrEl);
        narrEl.classList.remove('flash');
        void narrEl.offsetWidth; // 重触发动画
        narrEl.classList.add('flash');
      },
      // cfg: { head: [], rows: [[]], popRow: 行号|null } 全量重绘（幂等，供快放）
      renderTable: function (cfg) {
        var old = extraEl.querySelector('table.vtable');
        if (old) old.remove();
        var tb = document.createElement('table');
        tb.className = 'vtable';
        var html = '<thead><tr>';
        cfg.head.forEach(function (h) { html += '<th>' + h + '</th>'; });
        html += '</tr></thead><tbody>';
        cfg.rows.forEach(function (r) {
          html += '<tr>';
          r.forEach(function (c) { html += '<td>' + (c == null ? '' : c) + '</td>'; });
          html += '</tr>';
        });
        html += '</tbody>';
        tb.innerHTML = html;
        extraEl.prepend(tb);
        if (cfg.popRow != null) {
          var tr = tb.querySelectorAll('tbody tr')[cfg.popRow];
          if (tr) {
            Array.prototype.forEach.call(tr.children, function (td, i) {
              if (i > 0 && td.textContent) {
                td.classList.add('pop');
                td.style.animationDelay = (i * 90) + 'ms';
              }
            });
          }
        }
        math(tb);
        return tb;
      },
      // 高亮第 ci 列（0 基，null 清除）
      highlightCol: function (ci) {
        var t = extraEl.querySelector('table.vtable');
        if (!t) return;
        t.querySelectorAll('td.hl, th.hl').forEach(function (c) { c.classList.remove('hl'); });
        if (ci == null) return;
        t.querySelectorAll('tr').forEach(function (r) {
          var c = r.children[ci];
          if (c) c.classList.add('hl');
        });
      },
      // 追加结论卡片；cls 可选 'warm'|'cool'
      renderCard: function (html, cls) {
        var d = document.createElement('div');
        d.className = 'card' + (cls ? ' ' + cls : '');
        d.innerHTML = html;
        extraEl.appendChild(d);
        math(d);
        return d;
      },
      clearExtras: function () { extraEl.innerHTML = ''; },
      setControls: function (el) { ctrlEl.innerHTML = ''; if (el) ctrlEl.appendChild(el); },
    };
  }
  CW.createPanel = createPanel;
})(window.CW = window.CW || {});
