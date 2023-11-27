import {
  mutableHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers,
} from "./baseHandlers";

// Using functions to encapsulate certain operations can enhance the readability of the codes.
function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function isReactive(value) {
  // trigger one `get` operation
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  // trigger one `get` operation
  return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}

export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowReadonlyHandlers);
}
