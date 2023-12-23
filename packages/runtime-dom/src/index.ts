export * from "@mini-vue/runtime-core";
import { createRenderer } from "@mini-vue/runtime-core";

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

function insert(child, parent, anchor = null) {
  parent.insertBefore(child, anchor);
}

function remove(child) {
  const parent = child.parentNode;
  if (parent) {
    parent.removeChild(child);
  }
}

function setElementText(el, text) {
  el.textContent = text;
}

const renderer: any = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText,
});

export function createApp(...arg) {
  return renderer.createApp(...arg);
}
