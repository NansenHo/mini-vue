# Mini Vue

Implementing a minimal vue3 model for learning Vue3 in depth.

> This repo comes with [notes](https://til-nansenho.netlify.app/docs/vue/mini-vue/effect_reactive_dependenciesCollection_dependenciesTriggering/dependenciesCollection_dependenciesTriggering) to record what I was thinking and what I learned from studying mini-vue.

## Why

When we need to learn Vue 3 in depth, we need to read the Vue 3 source code.

But there is a lot of logic in the Vue 3 source code, which is used to deal with edge cases or compatibility processing logic, and it makes Vue 3 source code more difficult for us to read it.

We should focus on the core logic, and the purpose of this library is to strip out the core logic in the Vue 3 source code, leaving only the core logic.

## How This Repository Helps You

## Tech Stack

- TypeScript
- Vitest
- Rollup

## Tasking

**reactivity**:

- [x] Implementation of `reactive`
- [x] Implementation of `ref`
- [x] `track` dependencies collection
- [x] `trigger` dependencies triggering
- [x] `effect` return `runner` function
- [x] Support `effect.scheduler`
- [x] Support `effect.stop`
- [x] Support `isReadonly`
- [x] Support `isReactive	`
- [x] Support nested `reactive`
- [x] Support nested `readonly`
- [x] Support `isRef`
- [x] Support `unRef`
- [x] Support `proxyRefs`
- [x] Implementation of `computed`

**runtime-core**:

- [x] Support component
- [x] Support element
- [x] Access the object returned by `setup` within the `render` function
- [x] Support `$el` api
- [x] init props (including events)
- [x] Support basic `slots`
- [x] Support component `emit`
- [x] `setup` function can access both `props` and `context`
- [x] Support `provide` / `inject`
- [x] Support `getCurrentInstance`
- [x] Support text node
- [x] Update props
- [ ] Support proxy
- [ ] Implementation of `nextTick`
- [ ] Support `watchEffect`
