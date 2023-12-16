[English](./README.md) / [日本語](./README_JP.md) / [中文](./README_CN.md)

# Mini Vue

Implementing a minimal vue3 model for learning Vue3 in depth.

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

# run tests
pnpm run test

# build
pnpm run build
```

## 🧩 How to Open Examples

To open the `index.html` file in the `example/*` directory, it is recommended to use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).

## 💻 Tech Stack

- TypeScript
- Vitest
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
- [ ] Support `watchEffect`

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
- [ ] parse element
- [ ] parse text
