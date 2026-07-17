# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目

**数学动态课件库**：面向课堂投影的网页课件集合（初中六册蓝图 + 高中课程），**零构建、零运行时依赖、完全离线**——浏览器直接打开任意 `index.html` 即运行（file:// 协议）。Node 仅用于开发期测试。

- 根 `index.html`：课程导航页，读 `courses.js`（数据即代码——file:// 下 fetch json 会被 CORS 拦截，所以课程清单是 `window.COURSES = {...}` 的 script）。
- `shared/`：全仓库唯一一份的引擎（`core/` 五件）、主题（`css/main.css`）与第三方库（`vendor/` 的 JSXGraph + KaTeX + Animate.css，约 7MB，**绝不随课复制**）。
- `courses/<学段>/<册>/<章>/<节>/`：每课自包含目录 = `index.html`（引用 shared，上溯 5 层 `../../../../../shared/`）+ `scenes/` 场景剧本。

## 命令

- 运行：浏览器打开根 `index.html`（导航页）或任意课的 `index.html`（Chrome/Edge）
- 全部测试：`node --test tests/*.test.js`
  - 必须用 glob 形式；`node --test tests/`（目录尾斜杠）在 Node 23 下不工作；测试文件保持 tests/ 平级（glob 不递归）
- 单个测试文件：`node --test tests/director.test.js`
- 无 lint、无 package.json——有意为之，保持"拷贝文件夹即可上课"

## 架构：导演-剧本-舞台-面板（shared/core/）

每课页面加载 shared/core 五件 + 本课 scenes，`app.js` 在 DOMContentLoaded 装配；键盘与 URL hash 由导演统一处理：

- **director.js（导演）**：维护光标 (环节 s, 步 k)。前进 = 执行新步 `enter(true)`；后退/任意跳转 = `stage.reset` → `scene.setup` → 步 0..k 依次 `enter(false)`（**"重置+快放"机制**）。这就是场景每步只写 enter、从不写逆操作的原因。`busy` 防抖挡住连按；异常路径必须释放 busy 且不提交光标（课堂不能死锁——有专门回归测试）。
- **stage.js（舞台）**：JSXGraph 封装。`reg` 注册表按 id 管理对象，`put` 同 id 先删旧再登记（**幂等**——场景可放心用固定 id 重建状态）；`reset` = freeBoard 整板重建；所有动画必须经 `runTween` 登记（不要直接调 `CW.tween`），reset 时统一 cancel 防孤儿动画。场景层自定义补间用 `stage.animate({from,to,duration,onUpdate})`（runTween 的正规出口）。几何/集合类课程 API：`addCircle`（圆，圆心/半径可传函数做动态动画）、`actor`（可自由移动的文本元素，返回 `{obj, moveTo(x,y,ms)}`，moveTo 须顺序 await）。几何扩展：`addAngle`（角弧标注，创建时**劣角自愈**——检测优角自动交换端点）、`addRay` 射线、`addArc` 圆弧（√2 数轴落点类演示；逆时针从 from 扫到 to，按逆时针给点即得短弧）。统计图 API：`addBar`（条形/直方图柱，高度可传函数配 animate 做生长动画；直方图柱相邻需 cx 间隔=柱宽）、`addSector`（扇形区，度数逆时针，**必须 keepAspect**）、`addPolyline`（折线）。**画板文本原生支持 KaTeX**：addText/actor/dropPoint 的 name 里写 `$..$` 自动渲染（dropPoint 带 $ 名会注册为 [point,text] 数组，消费 reg 的 API 需数组感知——pulse 已适配）；连续下划线 `___` 会被 JSXGraph 解析成 `<sub>`，填空用【？】代替。坐标参数支持"整点函数" `function(){return [x,y];}`（自动拆分）。场景可声明 `board: {axis:false, keepAspect:true, grid:true}` 关闭坐标轴/开启等比/加网格（**画圆画弧画扇形必须开 keepAspect，否则被拉成椭圆**），由导演透传给 `stage.reset`。多步共用画板区域时，后步 `enter` 开头用 `S.remove(id)` 清掉前步元素防叠印（remove 对不存在的 id 安全）。
- **panel.js（面板）**：讲解词/KaTeX/数值表/结论卡片。`renderTable` 全量重绘幂等；`renderCard` 只追加不去重——导演 replay 前会调 `clearExtras` 清场，这对契约不能破坏。`renderCard(html, cls, effect)` 第三参可选 Animate.css 效果名（如 'headShake'/'tada'，不含 animate__ 前缀），节制使用于对错反馈等关键卡片。
- **scenes/（每课剧本）**：纯数据 `{id, title, bbox, setup(stage,panel), steps:[{narration, enter(anim)}]}`，按该课 `index.html` 的 script 顺序注册进 `CW.scenes`（每课页面独立加载，无跨课冲突）。

## 新增一课的标准流程

1. 建目录 `courses/<学段>/<册>/<章 chNN-slug>/<节 sN.N-slug>/`（目录名 ASCII，中文标题放 courses.js）；
2. 复制参考课 `courses/senior/must1/ch04/s4.2-exponential-function/index.html`，改标题与 scenes 列表（shared 引用路径若目录深度相同则不变）；
3. 写 `scenes/s*.js` 场景剧本（遵守下方硬性约定）；
4. 在 `courses.js` 对应章节登记 `{id, title, path, status: 'done', scenes, expectSteps}`；
5. `node --test tests/*.test.js`（courses.test.js 会自动校验新课的场景结构与步数契约）；
6. 浏览器走查全部步骤：顺序前进、逐步回退、数字键乱序跳转，console 必须零报错。

## 硬性约定（改代码必须遵守）

1. **无 ES Modules、无 import/export**——file:// 下 ESM 被浏览器 CORS 拦截导致双击打开失败。全部代码用 IIFE 挂 `window.CW` 命名空间；每课 `index.html` 的 script 标签顺序即依赖顺序。
2. 无模板字符串，`var` 声明，字符串用 `+` 拼接。
3. 场景步骤 `enter(anim)` 含舞台动画时**必须 return 其 Promise**，否则导演不等动画完成就解锁下一步；快放路径重建前置状态一律传 `animate: false`。
4. **HTML 解析安全**：面板文案走 innerHTML，`$..$` 数学式内的不等号必须写 `\\lt`/`\\gt`——裸 `<` 后跟字母（如 `$0<a<1$` 的 `<a`）会被当作标签起始静默截断。画板 `addText` 的上标用 `<sup>x</sup>`（JSXGraph text 走 HTML 渲染，`^` 是字面字符）。
5. **课堂零报错承诺**：任何改动后 console 必须干净，包括乱序数字键跳转、快速连按、动画中途打断等操作序列。

## 测试沙箱

`tests/helpers/load.js` 用 Node vm 把 IIFE 浏览器脚本载入沙箱（stub 了 window/rAF/performance），返回 `window.CW`。纯逻辑（tween、director、场景结构）在 Node 里测；画板/DOM 行为用浏览器实测（chrome-devtools MCP 打开 file:// 页面截图 + 查 console）。director 测试通过 `cfg.win` 注入 fake window。`tests/courses.test.js` 遍历 `courses.js` 中 status='done' 的课，自动校验场景文件存在性、结构与步数契约。

## 文档

- `docs/superpowers/specs/2026-07-14-exponential-courseware-design.md`：指数函数课设计文档——32 步分镜表、技术决策 D1-D6、验收清单、讲课稿勘误表（**该课教学文案以它为准**）。
- `docs/superpowers/plans/2026-07-14-exponential-courseware.md`：该课 16 任务实现计划（含引擎各模块的完整规格代码——新课场景写法可参考其 Task 9-14）。
