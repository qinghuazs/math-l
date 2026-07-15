# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目

《指数函数的图像和性质》高中数学课堂投影课件。**零构建、零运行时依赖、完全离线**：浏览器直接打开 `index.html` 即运行（file:// 协议），第三方库（JSXGraph 画板、KaTeX 公式）全部本地化在 `vendor/`。Node 仅用于开发期测试。

## 命令

- 运行课件：Chrome/Edge 直接打开 `index.html`（无 dev server、无构建步骤）
- 全部测试：`node --test tests/*.test.js`
  - 必须用 glob 形式；`node --test tests/`（目录尾斜杠）在 Node 23 下不工作
- 单个测试文件：`node --test tests/director.test.js`
- 无 lint、无 package.json——有意为之，保持"拷贝文件夹即可上课"

## 架构：导演-剧本-舞台-面板

`js/app.js` 在 DOMContentLoaded 时装配四大件，键盘与 URL hash 由导演统一处理：

- **director.js（导演）**：维护光标 (环节 s, 步 k)。前进 = 执行新步 `enter(true)`；后退/任意跳转 = `stage.reset` → `scene.setup` → 步 0..k 依次 `enter(false)`（**"重置+快放"机制**）。这就是场景每步只写 enter、从不写逆操作的原因。`busy` 防抖挡住连按；异常路径必须释放 busy 且不提交光标（课堂不能死锁——有专门回归测试）。
- **stage.js（舞台）**：JSXGraph 封装。`reg` 注册表按 id 管理对象，`put` 同 id 先删旧对象再登记（**幂等**——场景可放心用固定 id 重建状态）；`reset` = freeBoard 整板重建；所有动画必须经 `runTween` 登记（不要直接调 `CW.tween`），reset 时统一 cancel 防孤儿动画。
- **panel.js（面板）**：讲解词/KaTeX/数值表/结论卡片。`renderTable` 全量重绘幂等；`renderCard` 只追加不去重——导演 replay 前会调 `clearExtras` 清场，这对契约不能破坏。
- **scenes/s1..s7（剧本）**：纯数据 `{id, title, bbox, setup(stage,panel), steps:[{narration, enter(anim)}]}`，按 `index.html` 中 script 顺序注册进 `CW.scenes`。7 场景步数 3,6,3,5,6,5,4 = 32 步，由 `tests/scenes.test.js` 固化为回归契约。

## 硬性约定（改代码必须遵守）

1. **无 ES Modules、无 import/export**——file:// 下 ESM 被浏览器 CORS 拦截导致双击打开失败。全部代码用 IIFE 挂 `window.CW` 命名空间；`index.html` 的 script 标签顺序即依赖顺序。
2. 无模板字符串，`var` 声明，字符串用 `+` 拼接。
3. 场景步骤 `enter(anim)` 含舞台动画时**必须 return 其 Promise**，否则导演不等动画完成就解锁下一步；重建前置状态（快放路径重复绘制）一律传 `animate: false`。
4. **HTML 解析安全**：面板文案走 innerHTML，`$..$` 数学式内的不等号必须写 `\\lt`/`\\gt`——裸 `<` 后跟字母（如 `$0<a<1$` 的 `<a`）会被当作标签起始静默截断。画板 `addText` 的上标用 `<sup>x</sup>`（JSXGraph text 走 HTML 渲染，`^` 是字面字符）。
5. **课堂零报错承诺**：任何改动后 console 必须干净，包括乱序数字键跳转、快速连按、动画中途打断等操作序列。

## 测试沙箱

`tests/helpers/load.js` 用 Node vm 把 IIFE 浏览器脚本载入沙箱（stub 了 window/rAF/performance），返回 `window.CW`。纯逻辑（tween、director、场景结构）在 Node 里测；画板/DOM 行为用浏览器实测（chrome-devtools MCP 打开 file:// 页面截图 + 查 console）。director 测试通过 `cfg.win` 注入 fake window。

## 文档

- `docs/superpowers/specs/2026-07-14-exponential-courseware-design.md`：设计文档——32 步分镜表、技术决策 D1-D6、验收清单、讲课稿勘误表（**教学文案以它为准**，原始讲课稿是语音转写稿含同音错字）。
- `docs/superpowers/plans/2026-07-14-exponential-courseware.md`：16 任务实现计划（含每个模块的完整规格代码）。
