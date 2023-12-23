export const extend = Object.assign;
export * from "./shapeFlags";
export * from "./toDisplayString";

export const EMPTY_OBJ = {};

export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

export const isString = (val) => {
  return typeof val === "string";
};

export const hasChanged = (val, newVal) => {
  return !Object.is(val, newVal);
};

export const hasOwn = (target, key) => {
  return Object.prototype.hasOwnProperty.call(target, key);
};

function capitalize(str: string) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}

export function toHandlerName(str: string) {
  return str ? "on" + capitalize(str) : "";
}

export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c: string) => {
    return c ? c.toUpperCase() : "";
  });
}
