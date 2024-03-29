[English](./README.md) / [日本語](./README_JP.md) / [中文](./README_CN.md)

# Mini Vue

Implementing a minimal vue3 model based on [TDD (Test-Driven Development)](https://en.wikipedia.org/wiki/Test-driven_development) and [TPP (Transformation Priority Premise)](https://en.wikipedia.org/wiki/Transformation_Priority_Premise) for learning Vue3 in depth.

> This repo comes with [notes](https://til-nansenho.netlify.app/docs/vue/mini-vue/effect_reactive_dependenciesCollection_dependenciesTriggering/dependenciesCollection_dependenciesTriggering) to record what I was thinking and what I learned from studying mini-vue.

## 🧐 Why

When we need to learn Vue3 in depth, we need to read the Vue3 source code.

But there is a lot of logic in the Vue3 source code, which is used to deal with edge cases or compatibility processing logic, and it makes Vue3 source code more difficult for us to read it.

We should focus on the core logic, and the purpose of this repo is to strip out the core logic in the Vue3 source code, leaving only the core logic.

## 🛠️ Quickstart

```bash
# clone the project
git clone https://github.com/NansenHo/mini-vue.git
cd mini-vue

# install packages
pnpm install

# run unit tests
pnpm run test-unit

# run e2e tests
pnpm run test-e2e
pnpm run test-e2e:open

# build
pnpm run build
```

## 🧩 How to Open Examples

To open the `index.html` file in the `example/*` directory, it is recommended to use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## 💻 Tech Stack

- TypeScript
- Vitest
- Cypress
- Rollup

## 📌 Tasking

**runtime-core module**:

- [x] Support component
- [x] Support element
- [x] Support `proxy`
- [x] Access the object returned by `setup` within the `render` function
- [x] Support `$el` api
- [x] init `props` (including `events`)
- [x] Support basic `slots`
- [x] Support component `emit`
- [x] `setup` function can access both `props` and `context`
- [x] Support `provide` / `inject`
- [x] Support `getCurrentInstance`
- [x] Support text node
- [x] Update `props`
- [x] Implementation of `nextTick`
- [x] Support `watchEffect`

**reactivity module**:

- [x] Implementation of `reactive`
- [x] Implementation of `ref`
- [x] `track` dependencies collection
- [x] `trigger` dependencies triggering
- [x] `effect` return `runner` function
- [x] Support `effect.scheduler`
- [x] Support `effect.stop`
- [x] Support `isReadonly`
- [x] Support `isReactive`
- [x] Support nested `reactive`
- [x] Support nested `readonly`
- [x] Support `isRef`
- [x] Support `unRef`
- [x] Support `proxyRefs`
- [x] Implementation of `computed`

**compiler-core module**:

- [x] parse interpolation
- [x] parse element
- [x] parse text

## Reference Links

- [cuixiaorui/mini-vue](https://github.com/cuixiaorui/mini-vue)
- [HcySunYang/code-for-vue-3-book](https://github.com/HcySunYang/code-for-vue-3-book)
- [vuejs/core](https://github.com/vuejs/core/)
- [Vue.js Contributing Guide](https://github.com/vuejs/core/blob/main/.github/contributing.md)
