import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";
import { ShapeFlags } from "../shared/shapeFlags";

export function render(vnode, container, parentComponent) {
  patch(vnode, container, parentComponent);
}

function patch(vnode, container, parentComponent) {
  console.log("vnode =>", vnode);
  const { type, shapeFlag } = vnode;

  switch (type) {
    // Fragment: only renders its children
    case Fragment:
      processFragment(vnode, container, parentComponent);
      break;
    case Text:
      processTextVNode(vnode, container);
      break;
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent);
      }
      break;
  }
}

function processTextVNode(vnode: any, container: any) {
  const { children } = vnode;
  const el = (vnode.el = document.createTextNode(children));
  container.append(el);
}

function processFragment(vnode: any, container: any, parentComponent) {
  mountChildren(vnode.children, container, parentComponent);
}

function processElement(vnode: any, container: any, parentComponent) {
  // init
  mountElement(vnode, container, parentComponent);
  // TODO update
}

function processComponent(vnode: any, container: any, parentComponent) {
  mountComponent(vnode, container, parentComponent);
}

function mountComponent(vnode: any, container, parentComponent) {
  const instance = createComponentInstance(vnode, parentComponent);
  setupComponent(instance);
  setupRenderEffect(instance, vnode, container);
}

function mountElement(initialVNode: any, container: any, parentComponent) {
  const { props, children } = initialVNode;

  // type
  const el = (initialVNode.el = document.createElement(initialVNode.type));

  // props
  for (const key in props) {
    const val = props[key];
    const isOn = /^on[A-Z]/.test(key);

    if (isOn) {
      const event = key.slice(2).toLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }

  const { shapeFlag } = initialVNode;
  // children
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(children, el, parentComponent);
  }

  container.append(el);
}

function setupRenderEffect(instance: any, initialVNode, container) {
  console.log("setupRenderEffect instance =>", instance);
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  patch(subTree, container, instance);

  initialVNode.el = subTree.el;
}

function mountChildren(children, container, parentComponent) {
  children.forEach((v) => {
    patch(v, container, parentComponent);
  });
}
