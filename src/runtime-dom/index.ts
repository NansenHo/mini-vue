import { createRenderer } from "src/runtime-core";

function createElement(type) {
  return document.createElement(type);
}

function patchProps(el, key, val) {
  const isOn = /^on[A-Z]/.test(key);

  if (isOn) {
    const event = key.slice(2).toLowerCase();
    el.addEventListener(event, val);
  } else {
    el.setAttribute(key, val);
  }
}

function insert(el, parent) {
  parent.appendChild(el);
}

const renderer: any = createRenderer({
  createElement,
  patchProps,
  insert,
});

export function createApp(...arg) {
  return renderer.createApp(...arg);
}

export * from "../runtime-core";
