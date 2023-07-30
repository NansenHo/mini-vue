import { extend, isObject } from "../shared";
import { track, trigger } from "./effect";
import { ReactiveFlags, reactive, readonly } from "./reactive";

// Performance Optimization:
// In order to avoid repetitive calls to the `createGetter` function,
// use an object to store previously created getter.
let get = createGetter();
let set = createSetter();
let readonlyGet = createGetter(true);
let shallowReadonlyGet = createGetter(true, true);

// higher-order function
function createGetter(isReadonly = false, shallow = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }

    const res = Reflect.get(target, key);

    if (shallow) {
      return res;
    }

    // nested obj
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }

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

export const shallowReadonlyHanders = extend({}, readonlyHandlers, {
  get: shallowReadonlyGet,
});
