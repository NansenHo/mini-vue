import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

// Using functions to encapsulate certain operations can enhance the readability of the codes.
function createActiveObject(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandlers);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandlers);
}
