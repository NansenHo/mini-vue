import { track, trigger } from "./effect";

// Performance Optimization:
// In order to avoid repetitive calls to the `createGetter` function,
// use an object to store previously created getter.
let get = createGetter();
let set = createSetter();
let readonlyGet = createGetter(true);

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
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGet,
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
