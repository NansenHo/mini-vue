[English](./README.md) / [日本語](./README_JP.md) / [中文](./README_CN.md)

# Mini Vue

为了深入学习 Vue3，本仓库实现了一个简化版的 Vue3。

> 你可以在[这里](https://til-nansenho.netlify.app/docs/vue/mini-vue/effect_reactive_dependenciesCollection_dependenciesTriggering/dependenciesCollection_dependenciesTriggering)查看笔记。
>
> 笔记记录了本仓库实现过程中的思考和重点知识点。

## 🧐 项目创建背景

当我们需要深入学习 Vue3 时，往往需要去阅读 Vue3 的源码。

但是 Vue3 源码中有很多逻辑，用于处理边缘情况或兼容性处理逻辑，这使得 Vue3 源码阅读起来更加困难。

我们应该专注于核心逻辑，而该仓库的目的就是剥离 Vue3 源码中的核心逻辑，只留下核心部分。

## 🛠️ 快速开始

```bash
# 克隆仓库
git clone https://github.com/NansenHo/mini-vue.git
cd mini-vue

# 安装依赖
pnpm install

# 运行所有测试
pnpm run test

# 打包
pnpm run build
```

## 🧩 Example 的打开方式

用 Server 打开 `example/*` 目录下的 `index.html` 文件即可。

推荐使用 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)。

## 💻 技术栈

- TypeScript
- Vitest
- Rollup

## 📌 任务

**runtime-core 模块**:

- [x] 支持 component 类型
- [x] 支持 element 类型
- [x] 支持 `proxy`
- [x] 可以在 `render` 函数里获取 `setup` 返回的对象
- [x] 支持 `$el` api
- [x] 初始化 `props` (包括 `events`)
- [x] 支持基础的 `slots`
- [x] 支持 component `emit`
- [x] `setup` 函数能访问 `props` 和 `context`
- [x] 支持 `provide` / `inject`
- [x] 支持 `getCurrentInstance`
- [x] 支持 Text 类型节点
- [x] 实现 `props` 更新
- [x] 实现 `nextTick`
- [ ] 支持 `watchEffect`

**reactivity 模块**:

- [x] 实现 `reactive`
- [x] 实现 `ref`
- [x] `track` 依赖收集
- [x] `trigger` 触发依赖
- [x] `effect` 返回 `runner` 函数
- [x] 支持 `effect.scheduler`
- [x] 支持 `effect.stop`
- [x] 支持 `isReadonly`
- [x] 支持 `isReactive`
- [x] 支持嵌套 `reactive`
- [x] 支持嵌套 `readonly`
- [x] 支持 `isRef`
- [x] 支持 `unRef`
- [x] 支持 `proxyRefs`
- [x] 实现 `computed`

**compiler-core 模块**:

- [x] 解析插值
- [x] 解析 element
- [x] 解析 text
