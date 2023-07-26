import { track, trigger } from "./effect";

// higher-order function
function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    trigger(target, key);
    return res;
  };
}

export const mutableHandlers = {
  get: createGetter(),
  set: createSetter(),
};

export const readonlyHandlers = {
  get: createGetter(true),
  set(target, key, value) {
    console.warn(
      `key: ${String(
        key
      )} cannot be modified because the target is a read-only object.`,
      target
    );
    return true;
  },
};
