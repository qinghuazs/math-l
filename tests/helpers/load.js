'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 把 IIFE 风格 (window.CW 命名空间) 的浏览器脚本加载进 Node 沙箱。
// files: 相对项目根的路径数组，按序执行；extraCtx: 额外注入的全局。
function loadCW(files, extraCtx) {
  const window = {
    addEventListener: function () {},
    removeEventListener: function () {},
    location: { hash: '' },
  };
  const ctx = {
    window: window,
    console: console,
    performance: { now: function () { return Date.now(); } },
    requestAnimationFrame: function (cb) { return setTimeout(function () { cb(Date.now()); }, 0); },
    cancelAnimationFrame: function (id) { clearTimeout(id); },
  };
  Object.assign(ctx, extraCtx || {});
  ctx.window = window; // extraCtx 不得覆盖 window，否则 return window.CW 失效
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  files.forEach(function (f) {
    const p = path.join(__dirname, '..', '..', f);
    vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
  });
  return window.CW;
}
module.exports = { loadCW: loadCW };
