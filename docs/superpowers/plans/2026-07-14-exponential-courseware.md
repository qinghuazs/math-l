# 《指数函数的图像和性质》动态演示课件 · 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个零依赖、双击即开、完全离线的网页动态课件，以连续演变的数学画板呈现《指数函数的图像和性质》全部 7 个教学环节（32 步）。

**Architecture:** 导演—剧本—舞台—面板模型。导演维护光标 (环节,步)，前进播动画，后退/跳转用"重置+无动画快放"保证状态一致；舞台封装 JSXGraph 提供语义化动画 API；面板渲染讲解文字/KaTeX 公式/表格；7 个场景文件是纯数据+enter() 剧本。

**Tech Stack:** 原生 HTML/CSS/JS（IIFE + `window.CW` 命名空间，无构建、无 ESM）；JSXGraph 1.11（画板）；KaTeX 0.16（公式）；Node 内置 `node --test`（仅开发期逻辑测试，运行时零 Node 依赖）。

**设计文档：** `docs/superpowers/specs/2026-07-14-exponential-courseware-design.md`（分镜表、决策 D1-D6、验收清单以它为准）

---

## 全局约定（每个任务都要遵守）

1. **代码风格**：每个 js 文件用 IIFE 挂到 `window.CW` 命名空间：
   ```js
   (function (CW) {
     'use strict';
     // ...
     CW.xxx = xxx;
   })(window.CW = window.CW || {});
   ```
   不用 ES Modules（file:// 下被 CORS 拦截，见设计 D1）。不用模板字符串（统一 `+` 拼接）。
2. **测试**：纯逻辑（tween、director、场景结构）用 Node 内置测试跑：`node --test tests/`。DOM/画板视觉用浏览器走查（chrome-devtools MCP 或手动打开），验收标准=控制台零报错+截图符合预期。要求 Node ≥ 18（仅开发机需要）。
3. **提交**：每个任务至少 commit 一次，信息格式 `feat|test|style: 中文描述`。
4. **文件超过 500 行时**：用 Bash `cat heredoc` 分段写入，禁用 Write 工具（用户全局规则）。
5. **浏览器走查方法**：`open index.html`（macOS 手动）或 chrome-devtools MCP：`navigate_page` 到 `file:///Users/xingleiwang/Documents/wangxinglei/code/nodejs/math-l/index.html`，然后 `take_screenshot` + `list_console_messages` 确认零报错。

## 文件全景

| 文件 | 职责 | 产生于 |
|------|------|--------|
| `index.html` | 入口、布局骨架、script 加载顺序 | Task 3 |
| `css/main.css` | 布局/主题/投影可读性/动画 | Task 3 |
| `js/tween.js` | rAF 缓动工具 `CW.tween` | Task 2 |
| `js/panel.js` | 面板 `CW.createPanel` | Task 4 |
| `js/stage.js` | 舞台 `CW.createStage`（JSXGraph 封装） | Task 5-6 |
| `js/director.js` | 导演 `CW.createDirector` | Task 7 |
| `js/app.js` | 装配 + UI 构建 | Task 8 |
| `js/scenes/s1-review.js` … `s7-population.js` | 7 个场景剧本 | Task 8-14 |
| `tests/helpers/load.js` | Node 端 vm 加载器 | Task 1 |
| `tests/*.test.js` | 逻辑测试 | Task 2/7/15 |
| `vendor/jsxgraph/`, `vendor/katex/` | 本地化第三方库 | Task 1 |

---

### Task 1: 项目骨架与 vendor 本地化

**Files:**
- Create: `vendor/jsxgraph/jsxgraphcore.js`, `vendor/jsxgraph/jsxgraph.css`（下载）
- Create: `vendor/katex/katex.min.js`, `vendor/katex/katex.min.css`, `vendor/katex/fonts/*`, `vendor/katex/contrib/auto-render.min.js`（下载）
- Create: `tests/helpers/load.js`
- Create: `.gitignore`

- [ ] **Step 1: 确认 Node 版本 ≥ 18**

Run: `node --version`
Expected: `v18.x` 或更高。若无 node，本任务照常，但 Task 2/7/15 的自动测试改为浏览器控制台人工验证（不推荐，先装 node）。

- [ ] **Step 2: 建目录 + .gitignore**

```bash
cd /Users/xingleiwang/Documents/wangxinglei/code/nodejs/math-l
mkdir -p vendor/jsxgraph vendor/katex/contrib css js/scenes tests/helpers shots
printf '.DS_Store\nshots/\n' > .gitignore
```

- [ ] **Step 3: 下载 JSXGraph 1.11.1（两个文件）**

```bash
curl -fL -o vendor/jsxgraph/jsxgraphcore.js https://cdn.jsdelivr.net/npm/jsxgraph@1.11.1/distrib/jsxgraphcore.js
curl -fL -o vendor/jsxgraph/jsxgraph.css https://cdn.jsdelivr.net/npm/jsxgraph@1.11.1/distrib/jsxgraph.css
ls -la vendor/jsxgraph/
```
Expected: jsxgraphcore.js 约 2-3MB，jsxgraph.css 约 10-20KB。

- [ ] **Step 4: 下载 KaTeX 0.16 完整发行包（含字体）**

```bash
curl -fL -o /tmp/katex.tar.gz https://github.com/KaTeX/KaTeX/releases/download/v0.16.21/katex.tar.gz
tar -xzf /tmp/katex.tar.gz -C /tmp
cp /tmp/katex/katex.min.js /tmp/katex/katex.min.css vendor/katex/
cp -R /tmp/katex/fonts vendor/katex/fonts
cp /tmp/katex/contrib/auto-render.min.js vendor/katex/contrib/
ls vendor/katex/fonts | wc -l
```
Expected: fonts 目录 ≥ 20 个字体文件。若 GitHub 不可达，备选：`npm pack katex@0.16.21 && tar -xzf katex-*.tgz`，从 `package/dist/` 拷同名文件。

- [ ] **Step 5: 写 Node 测试加载器**

`tests/helpers/load.js`：
```js
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
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  files.forEach(function (f) {
    const p = path.join(__dirname, '..', '..', f);
    vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: f });
  });
  return window.CW;
}
module.exports = { loadCW: loadCW };
```

- [ ] **Step 6: 冒烟验证 loader 可运行**

Run: `node -e "const {loadCW}=require('./tests/helpers/load.js'); console.log(typeof loadCW)"`
Expected: `function`

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: 项目骨架与 vendor 本地化（JSXGraph/KaTeX 离线包）"
```

---

### Task 2: tween.js 缓动工具（TDD）

**Files:**
- Create: `js/tween.js`
- Test: `tests/tween.test.js`

- [ ] **Step 1: 写失败测试**

`tests/tween.test.js`：
```js
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { loadCW } = require('./helpers/load.js');

test('easings 数学性质', function () {
  const CW = loadCW(['js/tween.js']);
  const e = CW.tween.easings;
  assert.equal(e.linear(0.5), 0.5);
  assert.equal(e.easeInOut(0), 0);
  assert.equal(e.easeInOut(1), 1);
  assert.equal(e.easeOut(1), 1);
  assert.ok(e.easeInOut(0.3) < e.easeInOut(0.7), 'easeInOut 单调递增');
});

test('tween 从 0 到 10 收敛到终值且进度回调递增', async function () {
  const CW = loadCW(['js/tween.js']);
  let last = null;
  const seen = [];
  await new Promise(function (done) {
    CW.tween({ from: 0, to: 10, duration: 30, onUpdate: function (v, p) { last = v; seen.push(p); }, onDone: done });
  });
  assert.equal(last, 10);
  assert.ok(seen.length >= 1);
  assert.equal(seen[seen.length - 1], 1);
});

test('cancel 后不再触发 onDone', async function () {
  const CW = loadCW(['js/tween.js']);
  let doneCalled = false;
  const h = CW.tween({ from: 0, to: 1, duration: 50, onUpdate: function () {}, onDone: function () { doneCalled = true; } });
  h.cancel();
  await new Promise(function (r) { setTimeout(r, 80); });
  assert.equal(doneCalled, false);
});
```

- [ ] **Step 2: 运行确认失败**

Run: `node --test tests/`
Expected: FAIL（`js/tween.js` 不存在，ENOENT）

- [ ] **Step 3: 实现 js/tween.js**

```js
(function (CW) {
  'use strict';
  var easings = {
    linear: function (t) { return t; },
    easeInOut: function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    easeOut: function (t) { return 1 - Math.pow(1 - t, 3); },
  };
  // CW.tween({from,to,duration,easing,onUpdate(v,p),onDone}) -> {cancel()}
  // 结束帧保证 v===to、p===1（不受缓动浮点误差影响）。
  function tween(opts) {
    var from = opts.from, to = opts.to;
    var duration = opts.duration == null ? 600 : opts.duration;
    var ease = easings[opts.easing || 'easeInOut'] || easings.easeInOut;
    var rafId = null, cancelled = false;
    var t0 = performance.now();
    function frame(now) {
      if (cancelled) return;
      var p = duration <= 0 ? 1 : Math.min((now - t0) / duration, 1);
      var v = p >= 1 ? to : from + (to - from) * ease(p);
      opts.onUpdate(v, p);
      if (p < 1) rafId = requestAnimationFrame(frame);
      else if (opts.onDone) opts.onDone();
    }
    rafId = requestAnimationFrame(frame);
    return { cancel: function () { cancelled = true; if (rafId) cancelAnimationFrame(rafId); } };
  }
  tween.easings = easings;
  CW.tween = tween;
})(window.CW = window.CW || {});
```

- [ ] **Step 4: 运行测试确认通过**

Run: `node --test tests/`
Expected: `pass 3`，`fail 0`

- [ ] **Step 5: Commit**

```bash
git add js/tween.js tests/tween.test.js && git commit -m "feat: tween 缓动工具（TDD）"
```

---

### Task 3: index.html + css/main.css 布局骨架

**Files:**
- Create: `index.html`
- Create: `css/main.css`

- [ ] **Step 1: 写 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>指数函数的图像和性质 · 动态课件</title>
<link rel="stylesheet" href="vendor/jsxgraph/jsxgraph.css">
<link rel="stylesheet" href="vendor/katex/katex.min.css">
<link rel="stylesheet" href="css/main.css">
</head>
<body>
<header>
  <h1>指数函数的图像和性质</h1>
  <nav id="dots" aria-label="环节进度"></nav>
</header>
<main>
  <div id="board" class="jxgbox"></div>
  <aside id="panel"></aside>
</main>
<footer>
  <button id="btn-prev" type="button">◀ 上一步</button>
  <button id="btn-next" type="button">下一步 ▶</button>
  <span id="step-ind"></span>
  <span class="hint">空格/→ 下一步 · ← 上一步 · 1-7 跳环节 · Home 回环节首步 · F 全屏</span>
  <button id="btn-fs" type="button">⛶ 全屏</button>
</footer>
<div id="fatal" hidden>课件资源加载失败：请确认 vendor 目录完整，并使用 Chrome / Edge 浏览器打开。</div>
<script src="vendor/jsxgraph/jsxgraphcore.js"></script>
<script src="vendor/katex/katex.min.js"></script>
<script src="vendor/katex/contrib/auto-render.min.js"></script>
<script src="js/tween.js"></script>
<script src="js/panel.js"></script>
<script src="js/stage.js"></script>
<script src="js/director.js"></script>
<script src="js/scenes/s1-review.js"></script>
<script src="js/scenes/s2-plotting.js"></script>
<script src="js/scenes/s3-symmetry.js"></script>
<script src="js/scenes/s4-explore.js"></script>
<script src="js/scenes/s5-properties.js"></script>
<script src="js/scenes/s6-compare.js"></script>
<script src="js/scenes/s7-population.js"></script>
<script src="js/app.js"></script>
</body>
</html>
```
注意：本任务时 js/panel.js 等尚不存在，浏览器会对缺失 script 报 404/ERR_FILE_NOT_FOUND——属预期，本任务只验证布局与两库加载；Task 4-8 逐个补齐。

- [ ] **Step 2: 写 css/main.css**

```css
:root {
  --warm: #e64a19;   /* a>1 暖色（设计 D5） */
  --warm2: #f57c00;
  --cool: #1565c0;   /* 0<a<1 冷色 */
  --cool2: #0097a7;
  --accent: #6a1b9a; /* 强调紫 */
  --ink: #263238;
  --muted: #546e7a;
  --bg: #f7f8fa;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; }
body {
  display: flex; flex-direction: column;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background: var(--bg); color: var(--ink); overflow: hidden;
}
header { display: flex; align-items: center; gap: 26px; padding: 10px 22px 6px; }
header h1 { font-size: clamp(20px, 2.2vw, 30px); letter-spacing: 1px; }
#dots { display: flex; gap: 10px; }
.dot {
  width: 15px; height: 15px; border-radius: 50%;
  border: 2px solid #90a4ae; background: #eceff1; cursor: pointer; padding: 0;
}
.dot.on { background: var(--accent); border-color: var(--accent); transform: scale(1.15); }
main {
  flex: 1; display: grid; grid-template-columns: 62fr 38fr;
  gap: 12px; padding: 4px 16px 8px; min-height: 0;
}
#board {
  width: 100%; height: 100%;
  background: #fff; border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,.08);
}
#panel { display: flex; flex-direction: column; gap: 14px; overflow-y: auto; padding: 6px 6px 6px 2px; }
.p-scene { font-size: clamp(18px, 1.8vw, 25px); font-weight: 700; color: var(--accent); }
.p-narration { font-size: clamp(18px, 1.7vw, 23px); line-height: 1.7; }
.p-narration.flash { animation: fadein .45s both; }
.p-extras { display: flex; flex-direction: column; gap: 12px; }
.p-controls:empty, .p-extras:empty { display: none; }
.vtable { border-collapse: collapse; font-size: clamp(16px, 1.5vw, 21px); align-self: flex-start; }
.vtable th, .vtable td {
  border: 1.5px solid #b0bec5; padding: 6px 13px; text-align: center; min-width: 54px;
}
.vtable th { background: #eceff1; }
.vtable td.hl, .vtable th.hl { background: #fff3e0; }
.vtable td.pop { animation: pop .35s both; }
.card {
  border-left: 5px solid var(--accent); background: #f3e5f5;
  padding: 10px 16px; border-radius: 6px;
  font-size: clamp(17px, 1.6vw, 22px); line-height: 1.6;
  animation: fadein .5s both;
}
.card.warm { border-color: var(--warm); background: #fbe9e7; }
.card.cool { border-color: var(--cool); background: #e3f2fd; }
footer { display: flex; align-items: center; gap: 16px; padding: 8px 22px 12px; }
footer button {
  font-size: 17px; padding: 8px 20px; border-radius: 8px;
  border: 1.5px solid #90a4ae; background: #fff; cursor: pointer; color: var(--ink);
}
footer button:hover { background: #eceff1; }
#step-ind { font-size: 16px; color: var(--muted); min-width: 150px; }
.hint { margin-left: auto; color: #90a4ae; font-size: 14px; }
#fatal {
  position: fixed; left: 20%; right: 20%; top: 34%;
  background: #ffebee; color: #b71c1c; font-size: 22px; line-height: 1.6;
  padding: 34px; border-radius: 12px; text-align: center;
  box-shadow: 0 8px 40px rgba(0,0,0,.25);
}
@keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
@keyframes pop { from { opacity: 0; transform: scale(.4); } to { opacity: 1; transform: none; } }
@media (max-width: 1100px) { main { grid-template-columns: 58fr 42fr; } }
```

- [ ] **Step 3: 浏览器验证布局**

打开 `file:///Users/xingleiwang/Documents/wangxinglei/code/nodejs/math-l/index.html`，截图确认：
- 顶部标题、中部左白板右空面板、底部按钮条三段布局成形；
- 控制台仅有 js/*.js 尚未创建的 404 报错（预期），**无 jsxgraph/katex 加载错误**；
- 执行 `typeof JXG !== 'undefined' && typeof katex !== 'undefined'` 应为 `true`。

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css && git commit -m "feat: 布局骨架与投影主题样式"
```

---

### Task 4: panel.js 讲解面板

**Files:**
- Create: `js/panel.js`

- [ ] **Step 1: 实现 js/panel.js**

```js
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
```

- [ ] **Step 2: 浏览器驱动验证**

刷新页面后在控制台（或 chrome-devtools MCP `evaluate_script`）执行：
```js
var p = CW.createPanel(document.getElementById('panel'));
p.setScene('测试环节');
p.setNarration('定义：$y=a^x$（$a>0$ 且 $a\\neq 1$）');
p.renderTable({ head: ['$x$', '$-2$', '$-1$', '$0$'], rows: [['$y=2^x$', '$\\tfrac14$', '$\\tfrac12$', '$1$']], popRow: 0 });
p.highlightCol(2);
p.renderCard('结论：过定点 $(0,1)$', 'warm');
```
Expected 截图确认：标题紫色、公式正常渲染（非源码 $ 符号）、表格第 3 列橙底高亮、暖色卡片出现；控制台无新报错。

- [ ] **Step 3: Commit**

```bash
git add js/panel.js && git commit -m "feat: 讲解面板（KaTeX 渲染/数值表/结论卡片）"
```

---

### Task 5: stage.js 舞台（基础绘图 API）

**Files:**
- Create: `js/stage.js`

- [ ] **Step 1: 实现 js/stage.js（本任务先写基础部分，Task 6 在同文件追加动画 API）**

```js
(function (CW) {
  'use strict';
  var DEFAULT_BBOX = [-4.5, 9, 4.5, -1.5];

  // CW.createStage(containerId) -> stage
  // 重置策略（设计 D2）：reset() = freeBoard + initBoard，彻底无残留。
  function createStage(containerId) {
    var board = null;
    var reg = new Map(); // id -> JXG 对象（或对象数组）

    function initBoard(bbox) {
      board = JXG.JSXGraph.initBoard(containerId, {
        boundingbox: bbox || DEFAULT_BBOX,
        axis: true,
        showNavigation: false,
        showCopyright: false,
        pan: { enabled: false },
        zoom: { enabled: false },
        keyboard: { enabled: false }, // 键盘留给导演
        defaultAxes: {
          x: { ticks: { label: { fontSize: 13 }, insertTicks: true } },
          y: { ticks: { label: { fontSize: 13 }, insertTicks: true } },
        },
      });
    }
    initBoard(DEFAULT_BBOX);

    // 幂等登记：同 id 再次绘制先删旧对象——场景可放心用固定 id 重建状态
    function put(id, obj) {
      if (reg.has(id)) {
        var old = reg.get(id);
        (Array.isArray(old) ? old : [old]).forEach(function (x) {
          try { board.removeObject(x); } catch (e) { /* 已随 board 销毁 */ }
        });
      }
      reg.set(id, obj);
      return obj;
    }

    var stage = {
      getBoard: function () { return board; },
      get: function (id) { return reg.get(id); },
      reset: function (bbox) {
        JXG.JSXGraph.freeBoard(board);
        reg.clear();
        initBoard(bbox || DEFAULT_BBOX);
      },
      remove: function (id) {
        var o = reg.get(id);
        if (!o) return;
        (Array.isArray(o) ? o : [o]).forEach(function (x) {
          try { board.removeObject(x); } catch (e) { /* 已随场景清理 */ }
        });
        reg.delete(id);
        board.update();
      },
      // 曲线。o: {color,width,dash,opacity,domain:[a,b],animate,duration}
      // animate=true 返回生长动画 Promise；否则同步画完返回 resolved Promise
      plotCurve: function (id, fn, o) {
        o = o || {};
        var bb = board.getBoundingBox();
        var dom = o.domain || [bb[0], bb[2]];
        var head = o.animate ? dom[0] : dom[1];
        var curve = board.create('functiongraph', [fn, dom[0], function () { return head; }], {
          strokeColor: o.color || '#37474f',
          strokeWidth: o.width == null ? 3.5 : o.width,
          dash: o.dash || 0,
          strokeOpacity: o.opacity == null ? 1 : o.opacity,
          highlight: false, fixed: true,
        });
        put(id, curve);
        board.update();
        if (!o.animate) return Promise.resolve(curve);
        return new Promise(function (res) {
          CW.tween({
            from: dom[0], to: dom[1], duration: o.duration || 1100,
            onUpdate: function (v) { head = v; board.update(); },
            onDone: function () { res(curve); },
          });
        });
      },
      // 点。o: {color,name,size,animate,labelOffset}
      dropPoint: function (id, x, y, o) {
        o = o || {};
        var target = o.size == null ? 3.5 : o.size;
        var p = board.create('point', [x, y], {
          name: o.name || '', size: target,
          strokeColor: o.color || '#d32f2f', fillColor: o.color || '#d32f2f',
          fixed: true, highlight: false,
          label: { offset: o.labelOffset || [8, 10], fontSize: 14, strokeColor: '#455a64' },
        });
        put(id, p);
        board.update();
        if (!o.animate) return Promise.resolve(p);
        return new Promise(function (res) {
          CW.tween({
            from: target * 3, to: target, duration: 320, easing: 'easeOut',
            onUpdate: function (v) { p.setAttribute({ size: v }); },
            onDone: function () { res(p); },
          });
        });
      },
      addSegment: function (id, p1, p2, o) {
        o = o || {};
        return put(id, board.create('segment', [p1, p2], {
          strokeColor: o.color || '#90a4ae', strokeWidth: o.width || 2,
          dash: o.dash == null ? 2 : o.dash, highlight: false, fixed: true,
        }));
      },
      addVLine: function (id, x, o) {
        o = o || {};
        return put(id, board.create('line', [[x, 0], [x, 1]], {
          strokeColor: o.color || '#90a4ae', strokeWidth: o.width || 2,
          dash: o.dash == null ? 2 : o.dash, highlight: false, fixed: true,
        }));
      },
      addHLine: function (id, y, o) {
        o = o || {};
        return put(id, board.create('line', [[0, y], [1, y]], {
          strokeColor: o.color || '#90a4ae', strokeWidth: o.width || 2,
          dash: o.dash == null ? 2 : o.dash, highlight: false, fixed: true,
        }));
      },
      // str 可为字符串或函数（动态文本）
      addText: function (id, x, y, str, o) {
        o = o || {};
        return put(id, board.create('text', [x, y, str], {
          fontSize: o.size || 16, strokeColor: o.color || '#37474f',
          anchorX: o.anchorX || 'left', fixed: true, highlight: false,
        }));
      },
      // 着色矩形（值域/区间高亮）。挂到 reg，remove(id) 可清除。
      shadeRect: function (id, x1, y1, x2, y2, o) {
        o = o || {};
        var poly = board.create('polygon', [[x1, y1], [x2, y1], [x2, y2], [x1, y2]], {
          fillColor: o.color || '#1565c0', fillOpacity: o.opacity == null ? 0.08 : o.opacity,
          highlight: false, fixed: true,
          borders: { strokeWidth: 0, highlight: false },
          vertices: { visible: false, fixed: true },
        });
        board.update();
        return put(id, poly);
      },
    };
    return stage;
  }
  CW.createStage = createStage;
})(window.CW = window.CW || {});
```

- [ ] **Step 2: 浏览器驱动验证**

刷新页面，控制台执行：
```js
var st = CW.createStage('board');
st.plotCurve('c1', function (x) { return Math.pow(2, x); }, { color: '#e64a19', animate: true });
st.dropPoint('p1', 1, 2, { color: '#e64a19', name: '(1,2)', animate: true });
st.addVLine('v1', 1, { dash: 2 });
st.shadeRect('sh', 0, 0, 4.5, 9, { color: '#e64a19', opacity: 0.06 });
st.addText('t1', -4, 8, '测试文本', { size: 18 });
```
Expected：红曲线从左向右生长约 1 秒、点弹入、竖虚线、右半平面淡橙色、文本出现。然后：
```js
st.reset(); // 应回到空坐标系，无任何残留
```

- [ ] **Step 3: Commit**

```bash
git add js/stage.js && git commit -m "feat: 舞台基础绘图 API（曲线生长/落点/线/文本/着色/重置）"
```

---

### Task 6: stage.js 动画进阶 API

**Files:**
- Modify: `js/stage.js`（在 `shadeRect` 方法后、`};` `return stage;` 之前追加以下方法）

- [ ] **Step 1: 追加动画方法（注意加在 stage 对象字面量内部，前一个方法末尾补逗号）**

```js
      // 视窗缓动飞行
      flyTo: function (bbox, o) {
        o = o || {};
        var from = board.getBoundingBox();
        return new Promise(function (res) {
          CW.tween({
            from: 0, to: 1, duration: o.duration || 1200,
            onUpdate: function (v) {
              var bb = from.map(function (a, i) { return a + (bbox[i] - a) * v; });
              board.setBoundingBox(bb, false);
            },
            onDone: res,
          });
        });
      },
      // 沿 Y 轴翻折动画：绘制 y=baseFn(s*x)，s 从 1 到 -1（视觉=绕 Y 轴翻转）
      mirrorFold: function (id, baseFn, o) {
        o = o || {};
        var s = 1;
        var bb = board.getBoundingBox();
        var c = board.create('functiongraph',
          [function (x) { return baseFn(s * x); }, bb[0], bb[2]], {
            strokeColor: o.color || '#d32f2f', strokeWidth: o.width || 3,
            strokeOpacity: o.opacity == null ? 0.55 : o.opacity,
            dash: 2, highlight: false, fixed: true,
          });
        put(id, c);
        return new Promise(function (res) {
          CW.tween({
            from: 1, to: -1, duration: o.duration || 1500,
            onUpdate: function (v) { s = v; board.update(); },
            onDone: function () { res(c); },
          });
        });
      },
      // 沿曲线运动的点：mp = movingPoint(...); await mp.run(to, duration)
      movingPoint: function (id, fn, o) {
        o = o || {};
        var cx = o.from == null ? 0 : o.from;
        var p = board.create('point', [function () { return cx; }, function () { return fn(cx); }], {
          size: o.size || 4.5, name: '',
          strokeColor: o.color || '#6a1b9a', fillColor: o.color || '#6a1b9a',
          fixed: true, highlight: false,
        });
        put(id, p);
        board.update();
        return {
          obj: p,
          run: function (to, duration) {
            return new Promise(function (res) {
              CW.tween({
                from: cx, to: to, duration: duration || 2400,
                onUpdate: function (v) { cx = v; board.update(); },
                onDone: res,
              });
            });
          },
        };
      },
      // 底数滑块。o: {x1,y1,x2,y2,min,start,max,name,onChange}
      slider: function (id, o) {
        var s = board.create('slider',
          [[o.x1, o.y1], [o.x2, o.y2], [o.min, o.start, o.max]], {
            name: o.name || 'a', snapWidth: 0.05,
            fillColor: '#455a64', strokeColor: '#455a64',
            baseline: { strokeColor: '#90a4ae' }, highline: { strokeColor: '#6a1b9a' },
            label: { fontSize: 16, strokeColor: '#37474f' },
          });
        if (o.onChange) s.on('drag', function () { o.onChange(s.Value()); });
        put(id, s);
        board.update();
        return s;
      },
      // 程序驱动滑块动画（配合依赖它的 functiongraph 自动重绘）
      animateSlider: function (sliderObj, target, duration) {
        return new Promise(function (res) {
          CW.tween({
            from: sliderObj.Value(), to: target, duration: duration || 1500,
            onUpdate: function (v) { sliderObj.setValue(v); board.update(); },
            onDone: res,
          });
        });
      },
      // 点尺寸脉冲 n 次（默认 3）
      pulse: function (id, times) {
        var el = reg.get(id);
        if (!el) return Promise.resolve();
        var n = times || 3, i = 0;
        var base = el.getAttribute('size') || 3.5;
        return new Promise(function (res) {
          (function once() {
            CW.tween({
              from: base, to: base * 2.1, duration: 200, easing: 'easeOut',
              onUpdate: function (v) { el.setAttribute({ size: v }); },
              onDone: function () {
                CW.tween({
                  from: base * 2.1, to: base, duration: 200,
                  onUpdate: function (v) { el.setAttribute({ size: v }); },
                  onDone: function () { (++i < n) ? once() : res(); },
                });
              },
            });
          })();
        });
      },
      // 沿 X 轴扫描光带（演示定义域），扫完自动消失
      sweep: function (o) {
        o = o || {};
        var bb = board.getBoundingBox();
        var from = o.from == null ? bb[0] : o.from;
        var to = o.to == null ? bb[2] : o.to;
        var x = from;
        var l = board.create('line', [[function () { return x; }, 0], [function () { return x; }, 1]], {
          strokeColor: o.color || '#f9a825', strokeWidth: 3, strokeOpacity: 0.85,
          highlight: false, fixed: true,
        });
        return new Promise(function (res) {
          CW.tween({
            from: from, to: to, duration: o.duration || 1700,
            onUpdate: function (v) { x = v; board.update(); },
            onDone: function () { board.removeObject(l); board.update(); res(); },
          });
        });
      },
```

- [ ] **Step 2: 浏览器驱动验证**

刷新页面，控制台执行：
```js
var st = CW.createStage('board');
st.plotCurve('base', function (x) { return Math.pow(2, x); }, { color: '#e64a19' });
st.mirrorFold('ghost', function (x) { return Math.pow(2, x); }).then(function () { console.log('fold done'); });
```
Expected：红曲线立现；虚线副本"压扁再向左展开"成 y=(1/2)ˣ 形，控制台打印 fold done。继续：
```js
var sld = st.slider('sa', { x1: -3.5, y1: 8.3, x2: 0.5, y2: 8.3, min: 0.1, start: 2, max: 5 });
st.plotCurve('dyn', function (x) { return Math.pow(sld.Value(), x); }, { color: '#6a1b9a' });
st.animateSlider(sld, 4.5, 1500); // 紫曲线应随滑块连续形变
var mp = st.movingPoint('mp', function (x) { return Math.pow(2, x); }, { from: -3 });
mp.run(2.5, 2000); // 紫点沿红曲线爬升
st.flyTo([-13, 3.5, 3, -0.8], { duration: 1200 }); // 视窗左飞看渐近
st.sweep({});
st.pulse('mp');
```
全程控制台无报错。

- [ ] **Step 3: Commit**

```bash
git add js/stage.js && git commit -m "feat: 舞台动画进阶（视窗飞行/翻折/动点/滑块/脉冲/扫描）"
```

---

### Task 7: director.js 导演（TDD）

**Files:**
- Create: `js/director.js`
- Test: `tests/director.test.js`

- [ ] **Step 1: 写失败测试**

`tests/director.test.js`：
```js
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { loadCW } = require('./helpers/load.js');

function makeEnv() {
  const log = [];
  function scene(id, n) {
    return {
      id: id, title: id, bbox: null,
      setup: function () { log.push(id + ':setup'); },
      steps: Array.from({ length: n }, function (_, i) {
        return {
          narration: id + '-' + i,
          enter: function (anim) { log.push(id + ':' + i + ':' + (anim ? 'anim' : 'fast')); },
        };
      }),
    };
  }
  const CW = loadCW(['js/director.js']);
  const win = { location: { hash: '' }, addEventListener: function () {} };
  const stage = { reset: function () { log.push('reset'); } };
  const panel = {
    setScene: function () {}, setNarration: function (n) { log.push('narr:' + n); },
    clearExtras: function () {}, setControls: function () {},
  };
  const scenes = [scene('a', 2), scene('b', 3)];
  const d = CW.createDirector({ scenes: scenes, stage: stage, panel: panel, win: win });
  return { d: d, log: log, win: win };
}

test('start 后位于 (0,0)，只快放第 0 步', async function () {
  const env = makeEnv();
  await env.d.start();
  assert.deepEqual(env.d.getState(), { s: 0, k: 0 });
  assert.ok(env.log.includes('a:0:fast'));
  assert.equal(env.win.location.hash, '#1/1');
});

test('next 逐步带动画推进，跨环节时重置并快放新环节第 0 步', async function () {
  const env = makeEnv();
  await env.d.start();
  await env.d.next(); // a:1 anim
  assert.deepEqual(env.d.getState(), { s: 0, k: 1 });
  assert.ok(env.log.includes('a:1:anim'));
  await env.d.next(); // 进入场景 b
  assert.deepEqual(env.d.getState(), { s: 1, k: 0 });
  assert.ok(env.log.includes('b:setup'));
  assert.ok(env.log.includes('b:0:anim'));
  assert.equal(env.win.location.hash, '#2/1');
});

test('prev 用重置+快放回退；环节首步再 prev 回上环节末步', async function () {
  const env = makeEnv();
  await env.d.start();
  await env.d.next();
  await env.d.next(); // (1,0)
  await env.d.prev(); // 回 (0,1)
  assert.deepEqual(env.d.getState(), { s: 0, k: 1 });
  // 完整证据链：重置 -> setup -> 快放步0 -> 快放步1（含面板讲解词写入）
  assert.deepEqual(env.log.slice(-6),
    ['reset', 'a:setup', 'narr:a-0', 'a:0:fast', 'narr:a-1', 'a:1:fast']);
  assert.ok(env.log.filter(function (x) { return x === 'a:setup'; }).length >= 2);
});

test('jump 任意跳转 + parseHash 解析与越界钳制', async function () {
  const env = makeEnv();
  await env.d.start();
  await env.d.jump(1, 2);
  assert.deepEqual(env.d.getState(), { s: 1, k: 2 });
  assert.equal(env.win.location.hash, '#2/3');
  assert.deepEqual(env.d.parseHash('#2/2'), { s: 1, k: 1 });
  assert.deepEqual(env.d.parseHash('#2/99'), { s: 1, k: 2 }); // 步越界钳到末步
  assert.equal(env.d.parseHash('#9/1'), null);   // 环节越界
  assert.equal(env.d.parseHash('bad'), null);
});
```

- [ ] **Step 2: 运行确认失败**

Run: `node --test tests/`
Expected: director 相关 4 个测试 FAIL（js/director.js 不存在）

- [ ] **Step 3: 实现 js/director.js**

```js
(function (CW) {
  'use strict';
  // CW.createDirector({scenes, stage, panel, win?, onUpdate?, onFullscreen?})
  // 光标 (s,k)：s 环节索引，k 步索引（进入环节即执行步 0）。
  // 前进：steps[k].enter(true)；后退/跳转：reset -> setup -> 快放 enter(false)（设计 D2）。
  function createDirector(cfg) {
    var scenes = cfg.scenes, stage = cfg.stage, panel = cfg.panel;
    var win = cfg.win || window;
    var s = 0, k = 0, busy = false;
    var expectedHash = '';

    function writeHash() {
      expectedHash = '#' + (s + 1) + '/' + (k + 1);
      if (win.location.hash !== expectedHash) win.location.hash = expectedHash;
    }
    function notify() { if (cfg.onUpdate) cfg.onUpdate({ s: s, k: k }); }

    function parseHash(h) {
      var m = /^#(\d+)\/(\d+)$/.exec(h || '');
      if (!m) return null;
      var si = +m[1] - 1;
      if (si < 0 || si >= scenes.length) return null;
      var ki = Math.min(Math.max(+m[2] - 1, 0), scenes[si].steps.length - 1);
      return { s: si, k: ki };
    }

    // 重置 + 快放到 (ts,tk)；animateLast=true 时最后一步带动画
    function replay(ts, tk, animateLast) {
      busy = true;
      var sc = scenes[ts];
      stage.reset(sc.bbox);
      panel.setScene(sc.title);
      panel.clearExtras();
      panel.setControls(null);
      if (sc.setup) sc.setup(stage, panel);
      var p = Promise.resolve();
      var i;
      for (i = 0; i <= tk; i++) {
        (function (idx) {
          var step = sc.steps[idx];
          var anim = animateLast && idx === tk;
          p = p.then(function () {
            panel.setNarration(step.narration);
            return step.enter(anim);
          });
        })(i);
      }
      return p.then(function () {
        s = ts; k = tk; busy = false;
        writeHash(); notify();
      });
    }

    function next() {
      if (busy) return Promise.resolve();
      var sc = scenes[s];
      if (k + 1 < sc.steps.length) {
        busy = true;
        k += 1;
        var step = sc.steps[k];
        panel.setNarration(step.narration);
        return Promise.resolve(step.enter(true)).then(function () {
          busy = false; writeHash(); notify();
        });
      }
      if (s + 1 < scenes.length) return replay(s + 1, 0, true);
      return Promise.resolve();
    }

    function prev() {
      if (busy) return Promise.resolve();
      if (k > 0) return replay(s, k - 1, false);
      if (s > 0) return replay(s - 1, scenes[s - 1].steps.length - 1, false);
      return Promise.resolve();
    }

    function jump(ts, tk) {
      if (busy) return Promise.resolve();
      return replay(ts, tk == null ? 0 : tk, false);
    }

    function onKey(e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key) {
        case ' ': case 'ArrowRight': case 'PageDown':
          e.preventDefault(); next(); break;
        case 'ArrowLeft': case 'PageUp':
          e.preventDefault(); prev(); break;
        case 'Home':
          e.preventDefault(); jump(s, 0); break;
        case 'f': case 'F':
          if (cfg.onFullscreen) cfg.onFullscreen(); break;
        default:
          if (/^[1-9]$/.test(e.key)) {
            var n = +e.key - 1;
            if (n < scenes.length) jump(n, 0);
          }
      }
    }

    function start() {
      var h = parseHash(win.location.hash);
      var t = h || { s: 0, k: 0 };
      win.addEventListener('keydown', onKey);
      win.addEventListener('hashchange', function () {
        if (win.location.hash === expectedHash) return; // 自己写的，忽略
        var hh = parseHash(win.location.hash);
        if (hh) replay(hh.s, hh.k, false);
      });
      return replay(t.s, t.k, false);
    }

    return {
      start: start, next: next, prev: prev, jump: jump,
      getState: function () { return { s: s, k: k }; },
      parseHash: parseHash,
    };
  }
  CW.createDirector = createDirector;
})(window.CW = window.CW || {});
```

- [ ] **Step 4: 运行测试确认通过**

Run: `node --test tests/`
Expected: 全部 pass（tween 3 + director 4），`fail 0`

- [ ] **Step 5: Commit**

```bash
git add js/director.js tests/director.test.js && git commit -m "feat: 步进导演（光标/重置快放/hash/键盘，TDD）"
```

---

### Task 8: app.js 装配 + S1 复习导入场景（端到端首通）

**Files:**
- Create: `js/scenes/s1-review.js`
- Create: `js/app.js`

- [ ] **Step 1: 写 S1 场景 js/scenes/s1-review.js**

场景文件统一模式：IIFE 内闭包变量 `S`(stage)/`P`(panel)，`setup` 时赋值；步骤只实现 `enter(anim)`，讲解词由导演写入面板。**enter 必须幂等**（快放会从头重放）。

```js
(function (CW) {
  'use strict';
  var S, P;
  var scene = {
    id: 's1',
    title: '一、复习导入',
    bbox: [-4.5, 9, 4.5, -1.5],
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '这节课我们一起学习<b>指数函数的图像和性质</b>。先回顾上节课的定义。',
        enter: function () {
          P.renderCard('定义：一般地，函数 $y=a^x$（$a>0$ 且 $a\\neq 1$）叫做<b>指数函数</b>。');
        },
      },
      {
        narration: '注意定义中的两个要点。',
        enter: function () {
          P.renderCard('要点：① 指数 $x$ 是<b>自变量</b>；② 定义域为 $\\mathbb{R}$；③ 规定 $a>0$ 且 $a\\neq 1$。', 'cool');
        },
      },
      {
        narration: '如何研究一个函数？类比上一章幂函数：由解析式定定义域，<b>描点法</b>画图像，再由图像读性质。我们先研究两个特殊又简单的函数：$y=2^x$ 和 $y=\\left(\\tfrac12\\right)^x$。',
        enter: function () {
          P.renderCard('研究路径：定义 $\\to$ 图像 $\\to$ 性质<br>先画 $y=2^x$ 与 $y=\\left(\\tfrac12\\right)^x$', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
```

- [ ] **Step 2: 写 js/app.js**

```js
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
```

- [ ] **Step 3: 端到端走查**

刷新 `index.html`（此时 s2-s7 的 script 仍 404，属预期——若 `CW.scenes` 只有 s1 也应正常启动）。确认：
- 顶部出现 1 个进度点（后续任务逐渐变 7 个）且高亮；
- 面板显示"一、复习导入"与第 1 步卡片，公式渲染正常；
- 按 `→` 两次推进到第 3 步、步指示"环节 1/1 · 步 3/3"；按 `←` 回退卡片相应减少；
- 地址栏 hash 变化为 `#1/3` 等；手动刷新恢复原步；
- 除缺失场景文件的 404 外控制台无报错。

- [ ] **Step 4: Commit**

```bash
git add js/app.js js/scenes/s1-review.js && git commit -m "feat: 装配入口与 S1 复习导入（端到端首通）"
```

---

### Task 9: S2 描点法作图场景

**Files:**
- Create: `js/scenes/s2-plotting.js`

- [ ] **Step 1: 实现场景（6 步：列表→填 2ˣ→填 (1/2)ˣ→描点→连线→完成态）**

```js
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
        P.highlightCol(i + 1);
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
            S.addText('s2-l2', 1.6, 5.2, 'y = 2^x', { color: WARM, size: 18 });
            S.addText('s2-lh', -3.9, 5.2, 'y = (1/2)^x', { color: COOL, size: 18 });
            return anim ? null : null;
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
```
说明：步 5/6 的 enter 先无动画重建前置状态（点/曲线）再做本步动画——因为"重置+快放"后前进时画板只含 setup 状态；同 id 重复绘制由 stage 的幂等 `put`（先删旧再登记，Task 5 已实现）保证不残留。

- [ ] **Step 2: 浏览器走查 S2**

刷新页面按 `2` 跳到本环节，逐步按 `→`：表格三段填充（第 2、3 步有逐格弹入）、10 个点依次落下伴随表格列高亮、两条曲线先红后蓝生长、标签出现。按 `←` 逐步回退无残留；按 `1` 再按 `2` 重进正常。控制台无报错。

- [ ] **Step 3: Commit**

```bash
git add js/scenes/s2-plotting.js && git commit -m "feat: S2 描点法作图（表格联动/落点/曲线生长）"
```

---

### Task 10: S3 对称性场景

**Files:**
- Create: `js/scenes/s3-symmetry.js`

- [ ] **Step 1: 实现场景（3 步：对应点观察→翻折重合→一般结论）**

```js
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
    S.addText('s3-l2', 1.6, 5.2, 'y = 2^x', { color: WARM, size: 18 });
    S.addText('s3-lh', -3.9, 5.2, 'y = (1/2)^x', { color: COOL, size: 18 });
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
```

- [ ] **Step 2: 浏览器走查 S3**

按 `3` 跳转：setup 即有两曲线；步 1 两对点+虚线段+脉冲；步 2 翻折虚影从红曲线压扁展开盖到蓝曲线上、蓝曲线闪粗两下后虚影消失；步 3 暖色结论卡片。回退/重进无残留、无报错。

- [ ] **Step 3: Commit**

```bash
git add js/scenes/s3-symmetry.js && git commit -m "feat: S3 对称性（对应点/沿Y轴翻折重合动画）"
```

---

### Task 11: S4 底数滑块探索场景（核心环节）

**Files:**
- Create: `js/scenes/s4-explore.js`

- [ ] **Step 1: 实现场景（5 步：曲线族→滑块与 a=1 退化→底大幅高→底大图低→分类结论）**

```js
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
        narration: '先看 $a>1$：滑块从 $1.5$ 增大到 $5$。观察 $y$ 轴<b>右侧</b>——底数越大，图像升得越高，简记<b>“底大幅高”</b>。',
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
        narration: '再看 $0<a<1$：滑块从 $0.9$ 减小到 $0.15$。观察 $y$ 轴<b>左侧</b>——底数越大，图像越低，简记<b>“底大图低”</b>。',
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
        narration: '所有指数函数的图像按底数分成<b>两类</b>：$a>1$（暖色）与 $0<a<1$（冷色）。研究性质时分这两种情况。',
        enter: function () {
          S.remove('s4-sh2');
          FAMILY.forEach(function (f) {
            var c = S.get(f.id);
            if (c) c.setAttribute({ strokeColor: f.warm ? WARM2 : COOL2, strokeOpacity: 0.9 });
          });
          S.getBoard().update();
          P.renderCard('分类研究：<span style="color:#e64a19"><b>$a>1$</b></span> 与 <span style="color:#1565c0"><b>$0<a<1$</b></span>', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
```
注意：`sld` 是文件级闭包变量，但 stage.reset 后旧 slider 对象已随 board 销毁——所以每步都要用 `S.get('s4-sld')` 判断当前 board 上是否存在，不存在则 `buildSlider()` 重建（上面代码已体现）。setValue 后必须 `S.getBoard().update()`。

- [ ] **Step 2: 浏览器走查 S4**

按 `4`：底图两条细曲线；步 1 灰色曲线族生长；步 2 滑块出现、自动滑到 a=1（紫线变平）再回 2，手动拖滑块曲线实时形变、读数跟随；步 3 右半屏淡橙、滑块自动 1.5→5；步 4 左半屏淡蓝、0.9→0.15；步 5 曲线族分色+结论卡。回退重进（尤其 5→3→5）滑块行为正常无报错。

- [ ] **Step 3: Commit**

```bash
git add js/scenes/s4-explore.js && git commit -m "feat: S4 底数滑块探索（曲线族/a=1退化/底大幅高/底大图低）"
```

---

### Task 12: S5 性质汇总场景

**Files:**
- Create: `js/scenes/s5-properties.js`

- [ ] **Step 1: 实现场景（6 步：定义域值域→定点→单调性→渐近无最值→非奇非偶→总表）**

```js
(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', PURPLE = '#6a1b9a';
  var F2 = function (x) { return Math.pow(2, x); };
  var FH = function (x) { return Math.pow(0.5, x); };
  var BBOX = [-4.5, 9.5, 4.5, -2];

  function base() {
    S.plotCurve('s5-c2', F2, { color: WARM });
    S.plotCurve('s5-ch', FH, { color: COOL });
    S.addText('s5-l2', 1.7, 5.4, 'a > 1', { color: WARM, size: 18 });
    S.addText('s5-lh', -3.9, 5.4, '0 < a < 1', { color: COOL, size: 18 });
  }

  var scene = {
    id: 's5',
    title: '五、指数函数的性质',
    bbox: BBOX,
    setup: function (stage, panel) { S = stage; P = panel; base(); },
    steps: [
      {
        narration: '<b>定义域</b>：$x$ 从左到右每个值都取得到，定义域为 $\\mathbb{R}$；<b>值域</b>：图像始终在 $x$ 轴<b>上方</b>，值域为 $(0,+\\infty)$。',
        enter: function (anim) {
          S.shadeRect('s5-range', -4.5, 0, 4.5, 9.5, { color: '#43a047', opacity: 0.05 });
          return anim ? S.sweep({ duration: 1500 }) : null;
        },
      },
      {
        narration: '无论底数取多少，$x=0$ 时 $y=a^0=1$——图像都过<b>定点</b> $(0,1)$。',
        enter: function (anim) {
          return Promise.resolve(
            S.dropPoint('s5-fix', 0, 1, { color: PURPLE, name: '(0, 1)', size: 4.5, animate: anim })
          ).then(function () { return anim ? S.pulse('s5-fix', 3) : null; });
        },
      },
      {
        narration: '<b>单调性</b>：看动点。$a>1$ 时从左到右一路<b>上升</b>——增函数；$0<a<1$ 时一路<b>下降</b>——减函数。',
        enter: function (anim) {
          if (!anim) return null;
          var m1 = S.movingPoint('s5-m1', F2, { from: -3.8, color: WARM });
          return m1.run(2.9, 2300).then(function () {
            S.remove('s5-m1');
            var m2 = S.movingPoint('s5-m2', FH, { from: -2.9, color: COOL });
            return m2.run(3.8, 2300);
          }).then(function () { S.remove('s5-m2'); });
        },
      },
      {
        narration: '往远处看：曲线无限<b>贴近</b> $x$ 轴却永不相交，另一端无限上升——所以<b>没有最大值也没有最小值</b>。',
        enter: function (anim) {
          if (!anim) return null;
          var m = S.movingPoint('s5-m3', F2, { from: 0, color: WARM });
          return Promise.all([
            m.run(-11, 2000),
            S.flyTo([-13, 3.5, 3, -0.8], { duration: 2000 }),
          ]).then(function () {
            return new Promise(function (r) { setTimeout(r, 500); });
          }).then(function () {
            S.remove('s5-m3');
            return S.flyTo(BBOX, { duration: 1100 });
          });
        },
      },
      {
        narration: '<b>奇偶性</b>：沿 $y$ 轴翻折不重合（非偶），绕原点旋转 $180^\\circ$ 也不重合（非奇）——<b>非奇非偶</b>函数。',
        enter: function (anim) {
          if (!anim) {
            return null;
          }
          return S.mirrorFold('s5-g1', F2, { color: '#9e9e9e', duration: 1100 }).then(function () {
            S.plotCurve('s5-g2', function (x) { return -Math.pow(2, -x); }, { color: '#9e9e9e', width: 2.5, dash: 2, opacity: 0.6 });
            S.addText('s5-x1', -3.3, 2.6, '✗ 不重合', { color: '#b71c1c', size: 17 });
            S.addText('s5-x2', 2.1, -1.3, '✗ 不重合', { color: '#b71c1c', size: 17 });
            return new Promise(function (r) { setTimeout(r, 900); });
          });
        },
      },
      {
        narration: '汇总：指数函数 $y=a^x$（$a>0$ 且 $a\\neq 1$）的图像和性质如下表。',
        enter: function () {
          S.remove('s5-g1'); S.remove('s5-g2'); S.remove('s5-x1'); S.remove('s5-x2');
          P.renderTable({
            head: ['', '$0<a<1$', '$a>1$'],
            rows: [
              ['定义域', '$\\mathbb{R}$', '$\\mathbb{R}$'],
              ['值域', '$(0,+\\infty)$', '$(0,+\\infty)$'],
              ['定点', '$(0,1)$', '$(0,1)$'],
              ['单调性', '减函数', '增函数'],
              ['奇偶性', '非奇非偶', '非奇非偶'],
              ['最值', '无', '无'],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
```

- [ ] **Step 2: 浏览器走查 S5**

按 `5`：两曲线+分类标签就位；步 1 扫描光带+上半平面淡绿；步 2 定点 (0,1) 弹入脉冲；步 3 暖点爬升、冷点下滑后消失；步 4 视窗左飞跟随动点看渐近、回弹；步 5 灰翻折虚影+灰旋转虚影+两个红色"✗ 不重合"；步 6 虚影清除、面板出六行性质总表。快放（回退到步 6）时无动画对象残留。控制台无报错。

- [ ] **Step 3: Commit**

```bash
git add js/scenes/s5-properties.js && git commit -m "feat: S5 性质汇总（值域着色/定点脉冲/单调动点/渐近飞行/奇偶翻折/总表）"
```

---

### Task 13: S6 比较大小例题场景

**Files:**
- Create: `js/scenes/s6-compare.js`

- [ ] **Step 1: 实现场景（5 步：三道例题 + 两步方法总结）**

```js
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
        narration: '例1：比较 $1.7^{2.5}$ 与 $1.7^{3}$。<b>底数相同</b>，可看作 $y=1.7^x$ 在 $x=2.5$、$x=3$ 处的函数值。底 $1.7>1$ 是增函数，$2.5<3$，所以 $1.7^{2.5}<1.7^{3}$。',
        enter: function (anim) {
          clearProblem();
          return S.plotCurve(keep('s6-c1'), function (x) { return pow(1.7, x); },
            { color: WARM, animate: anim }).then(function () {
            S.addSegment(keep('s6-v1'), [2.5, 0], [2.5, pow(1.7, 2.5)], { dash: 2 });
            S.addSegment(keep('s6-v2'), [3, 0], [3, pow(1.7, 3)], { dash: 2 });
            var a = S.dropPoint(keep('s6-p1'), 2.5, pow(1.7, 2.5), { color: WARM, name: '1.7^2.5', animate: anim, labelOffset: [-70, 8] });
            var b = S.dropPoint(keep('s6-p2'), 3, pow(1.7, 3), { color: WARM, name: '1.7^3', animate: anim });
            S.addText(keep('s6-t1'), -3.1, 5.8, 'y = 1.7^x（增）', { color: WARM, size: 17 });
            return Promise.all([a, b]);
          });
        },
      },
      {
        narration: '例2：比较 $0.3^{-0.3}$ 与 $0.5^{-0.3}$。<b>指数相同</b>，比较两条曲线在 $x=-0.3$ 处的高低：由图像规律得 $0.3^{-0.3}>0.5^{-0.3}$。',
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
            S.addText(keep('s6-t2'), -3.1, 5.8, 'y = 0.3^x 与 y = 0.5^x', { color: COOL, size: 17 });
            return Promise.all([a, b]);
          });
        },
      },
      {
        narration: '例3：比较 $1.7^{0.3}$ 与 $0.9^{3.1}$。底、指都不同——找<b>中间量</b> $1$：$1.7^{0.3}>1.7^{0}=1$，而 $0.9^{3.1}<0.9^{0}=1$，故 $1.7^{0.3}>0.9^{3.1}$。',
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
```
注意：`keep()` 返回 id 字符串传给 plotCurve 等（它们第一个参数就是 id），同时登记到 IDS 供 clearProblem 清场——三道题共用画板互不残留；步 4/5 只加卡片不清画板（保留例 3 图象作背景）。

- [ ] **Step 2: 浏览器走查 S6**

按 `6`：例 1 红曲线+两点两虚线；`→` 例 2 清场换两条冷色曲线+黄竖线+两点；`→` 例 3 清场换两曲线+绿色 y=1 虚线+两点脉冲；`→`、`→` 两张总结卡片依次出现且例 3 图保留。回退跨题清场正确。控制台无报错。

- [ ] **Step 3: Commit**

```bash
git add js/scenes/s6-compare.js && git commit -m "feat: S6 比较大小三例题（单调性/图像规律/中间量法）"
```

---

### Task 14: S7 人口增长应用与课堂小结场景

**Files:**
- Create: `js/scenes/s7-population.js`

- [ ] **Step 1: 实现场景（4 步：情境曲线→倍增期读图→第二问→小结与作业）**

人口模型 $P(t)=5\cdot 2^{t/20}$（万人）：$P(20)=10$、$P(40)=20$（与讲课稿"20 年约 10 万、40 年约 20 万"一致）；$P(80)=80$、$P(100)=160$ 用于第二问。

```js
(function (CW) {
  'use strict';
  var S, P;
  var GREEN = '#2e7d32', ORANGE = '#e64a19', PURPLE = '#6a1b9a';
  function pop(t) { return 5 * Math.pow(2, t / 20); }

  var scene = {
    id: 's7',
    title: '七、应用：人口增长 · 小结',
    bbox: [-10, 195, 135, -18],
    setup: function (stage, panel) {
      S = stage; P = panel;
      S.addText('s7-ax', 122, -10, 't / 年', { size: 15, color: '#546e7a' });
      S.addText('s7-ay', -8.5, 185, 'P / 万人', { size: 15, color: '#546e7a' });
    },
    steps: [
      {
        narration: '换一个真实情境：某城市人口呈<b>指数增长</b>。横轴是时间（年），纵轴是人口（万人）。',
        enter: function (anim) {
          return S.plotCurve('s7-c', pop, { color: GREEN, width: 4, domain: [0, 125], animate: anim, duration: 1800 });
        },
      },
      {
        narration: '读图：约 $20$ 年时人口 $10$ 万，约 $40$ 年时 $20$ 万——由 $10$ 万翻到 $20$ 万用了约 $20$ 年。人口每翻一番所需时间（<b>倍增期</b>）约为 $\\mathbf{20}$ <b>年</b>。',
        enter: function (anim) {
          S.plotCurve('s7-c', pop, { color: GREEN, width: 4, domain: [0, 125] });
          S.addSegment('s7-g1', [20, 0], [20, 10], { dash: 2 });
          S.addSegment('s7-g2', [0, 10], [20, 10], { dash: 2 });
          S.addSegment('s7-g3', [40, 0], [40, 20], { dash: 2 });
          S.addSegment('s7-g4', [0, 20], [40, 20], { dash: 2 });
          var a = S.dropPoint('s7-p1', 20, 10, { color: ORANGE, name: '(20, 10)', animate: anim });
          var b = S.dropPoint('s7-p2', 40, 20, { color: ORANGE, name: '(40, 20)', animate: anim });
          return Promise.all([a, b]).then(function () {
            return anim ? Promise.all([S.pulse('s7-p1', 2), S.pulse('s7-p2', 2)]) : null;
          });
        },
      },
      {
        narration: '第二问：从 $80$ 万人开始，经过 $20$ 年（一个倍增期），人口翻一番——增长到约 $\\mathbf{160}$ <b>万人</b>。',
        enter: function (anim) {
          var m = anim ? S.movingPoint('s7-m', pop, { from: 80, color: PURPLE }) : null;
          var go = anim ? m.run(100, 2200) : Promise.resolve();
          return go.then(function () {
            if (m) S.remove('s7-m');
            S.addSegment('s7-g5', [80, 0], [80, 80], { dash: 2, color: PURPLE });
            S.addSegment('s7-g6', [100, 0], [100, 160], { dash: 2, color: PURPLE });
            return Promise.all([
              S.dropPoint('s7-p3', 80, 80, { color: PURPLE, name: '(80, 80)', animate: anim }),
              S.dropPoint('s7-p4', 100, 160, { color: PURPLE, name: '(100, 160)', animate: anim }),
            ]);
          });
        },
      },
      {
        narration: '<b>课堂小结</b>：本节课学习了指数函数的图像和性质，以及数形结合、类比、分类讨论的数学思想。',
        enter: function () {
          P.renderCard('小结：<br>① 底数互为倒数 $\\Rightarrow$ 图像关于 $y$ 轴对称<br>② 分 $0<a<1$ 与 $a>1$ 两类研究图像与性质<br>③ 应用：比较大小、解决实际增长问题', 'warm');
          P.renderCard('课后作业：教科书第 118 页练习第 1~3 题；习题 4.2 第 1~4 题。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
```

- [ ] **Step 2: 浏览器走查 S7**

按 `7`：坐标轴刻度自动适配大数值、轴标签"t/年""P/万人"；步 1 绿色人口曲线生长；步 2 两组虚线引导+橙点脉冲；步 3 紫色动点沿曲线从 (80,80) 爬到 (100,160) 后落双点；步 4 小结与作业两张卡片。控制台无报错。

- [ ] **Step 3: Commit**

```bash
git add js/scenes/s7-population.js && git commit -m "feat: S7 人口倍增期应用与课堂小结"
```

---

### Task 15: 场景注册完整性测试（Node）

**Files:**
- Test: `tests/scenes.test.js`

- [ ] **Step 1: 写测试（此时场景已全部存在，测试直接应通过——这是回归防护网）**

```js
'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { loadCW } = require('./helpers/load.js');

const SCENE_FILES = [
  'js/scenes/s1-review.js', 'js/scenes/s2-plotting.js', 'js/scenes/s3-symmetry.js',
  'js/scenes/s4-explore.js', 'js/scenes/s5-properties.js', 'js/scenes/s6-compare.js',
  'js/scenes/s7-population.js',
];
const EXPECT_STEPS = [3, 6, 3, 5, 6, 5, 4]; // 设计文档第 6 节分镜

test('7 个场景注册齐全、步数与设计一致、结构完整', function () {
  const CW = loadCW(SCENE_FILES);
  assert.equal(CW.scenes.length, 7);
  const ids = new Set();
  CW.scenes.forEach(function (sc, i) {
    assert.ok(sc.id && !ids.has(sc.id), 'id 唯一: ' + sc.id);
    ids.add(sc.id);
    assert.ok(sc.title, sc.id + ' 有标题');
    assert.ok(Array.isArray(sc.bbox) && sc.bbox.length === 4, sc.id + ' bbox 合法');
    assert.equal(typeof sc.setup, 'function', sc.id + ' 有 setup');
    assert.equal(sc.steps.length, EXPECT_STEPS[i], sc.id + ' 步数=' + EXPECT_STEPS[i]);
    sc.steps.forEach(function (st, j) {
      assert.ok(st.narration && st.narration.length > 4, sc.id + ' 步 ' + j + ' 有讲解词');
      assert.equal(typeof st.enter, 'function', sc.id + ' 步 ' + j + ' 有 enter');
    });
  });
  assert.equal(EXPECT_STEPS.reduce(function (a, b) { return a + b; }, 0), 32, '总步数 32');
});
```

- [ ] **Step 2: 运行全部测试**

Run: `node --test tests/`
Expected: 全部 pass（tween 3 + director 4 + scenes 1），`fail 0`

- [ ] **Step 3: Commit**

```bash
git add tests/scenes.test.js && git commit -m "test: 场景注册与分镜步数回归防护"
```

---

### Task 16: 全流程验收走查

**Files:**
- 无新文件（截图存 `shots/`，已在 .gitignore）

- [ ] **Step 1: 验收清单第 1 条——file:// 直开与离线**

用 chrome-devtools MCP `navigate_page` 到 `file:///Users/xingleiwang/Documents/wangxinglei/code/nodejs/math-l/index.html`，`list_console_messages` 确认零报错（此时 7 个场景 script 均存在，不应再有 404）。确认页面所有资源均为本地 vendor 路径（无 http/https 请求：`list_network_requests` 里不出现远程 URL）。

- [ ] **Step 2: 验收清单第 2 条——全 32 步顺序走查 + 截图**

从 `#1/1` 开始连按"下一步"直到 `#7/4`（共 32 步），每步 `take_screenshot` 存 `shots/s{环节}-{步}.png`，肉眼核对与设计文档第 6 节分镜一致；然后从 `#7/4` 连按"上一步"回到 `#1/1`；再随机按数字键跳环节 ≥10 次。全程 `list_console_messages` 零报错。

- [ ] **Step 3: 验收清单第 3 条——数学正确性抽查**

对照截图核对：S2 数值表（1/4,1/2,1,2,4 与 4,2,1,1/2,1/4）；S5 总表六行；S6 三题结论（$1.7^{2.5}<1.7^3$、$0.3^{-0.3}>0.5^{-0.3}$、$1.7^{0.3}>0.9^{3.1}$）；S7 倍增期 20 年、80→160 万。

- [ ] **Step 4: 验收清单第 4 条——两种分辨率**

chrome-devtools MCP `resize_page` 到 1920×1080 与 1024×768 各截图 `#2/6`、`#4/3`、`#5/6` 三个信息最密的步，确认布局不破版、文字可读。

- [ ] **Step 5: 验收问题修复与最终提交**

发现的问题逐个修复（修复遵循本计划约定），全部通过后：
```bash
node --test tests/   # 最后回归：全部 pass
git add -A && git commit -m "chore: 全流程验收通过"
```

---

## 完成定义（Definition of Done）

- [ ] `node --test tests/` 全部通过（8 个测试）；
- [ ] 设计文档第 10 节验收清单 5 条全部满足；
- [ ] 讲课稿 7 环节 32 步全部可演示，文案已按第 11 节勘误表修正；
- [ ] git 历史干净：每任务至少一个原子提交。
