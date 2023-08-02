# Mini Vue

Implementing a minimal vue3 model for learning Vue3 in depth.

> This repo comes with [notes](notes) to record what I was thinking and what I learned from studying mini-vue.

## Why

When we need to learn Vue 3 in depth, we need to read the Vue 3 source code.

But there is a lot of logic in the Vue 3 source code, which is used to deal with edge cases or compatibility processing logic, and it makes Vue 3 source code more difficult for us to read it.

We should focus on the core logic, and the purpose of this library is to strip out the core logic in the Vue 3 source code, leaving only the core logic.

## Tasking

**reactivity**

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
