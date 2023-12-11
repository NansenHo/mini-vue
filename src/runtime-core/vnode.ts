import { isObject } from "../shared";
import { ShapeFlags } from "../shared/shapeFlags";

export const Fragment = Symbol("Fragment");
export const Text = Symbol("Text");

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    key: props && props.key,
    shapeFlag: getShapeFlag(type),
    el: null,
  };

  // children
  if (typeof vnode.children === "string") {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }

  // slots children
  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT && isObject(children)) {
    vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
  }

  return vnode;
}

export function createTextVnode(children) {
  console.log("Text VNode children =>", children);
  return createVNode(Text, {}, children);
}

function getShapeFlag(type) {
  return typeof type === "string"
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}
