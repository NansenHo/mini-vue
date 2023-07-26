import { track, trigger } from "./effect";

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key);
      track(target, key);
      return res;
    },

    set(target, key, value) {
      const res = Reflect.set(target, key, value);
      trigger(target, key);
      return res;
    },
  });
}

export function readonly(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const res = Reflect.get(target, key);
      return res;
    },

    set(target, key, value) {
      console.warn(
        `key: ${String(
          key
        )} cannot be modified because the target is a read-only object.`,
        target
      );
      return true;
    },
  });
}
