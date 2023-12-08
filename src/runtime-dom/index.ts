import { createRenderer } from "src/runtime-core";

function createElement(type) {
  return document.createElement(type);
}

function patchProp(el, key, prevVal, nextVal) {
  const isOn = /^on[A-Z]/.test(key);

  if (isOn) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, nextVal);
  } else {
    if (nextVal !== undefined && nextVal !== null) {
      el.setAttribute(key, nextVal);
    } else {
      el.removeAttribute(key);
    }
  }
}

function insert(el, parent) {
  parent.appendChild(el);
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
});

export function createApp(...arg) {
  return renderer.createApp(...arg);
}

export * from "../runtime-core";
