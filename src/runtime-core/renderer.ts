import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";
import { ShapeFlags } from "../shared/shapeFlags";
import { createAppAPI } from "./createApp";
import { effect } from "..";
import { EMPTY_OBJ } from "src/shared";

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render(vnode, container, parentComponent) {
    patch(null, vnode, container, parentComponent);
  }

  // n1: old vnode
  // n2: new vnode
  function patch(n1, n2, container, parentComponent) {
    console.log("vnode =>", n2);
    const { type, shapeFlag } = n2;

    switch (type) {
      // Fragment: only renders its children
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;
      case Text:
        processTextVNode(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent);
        }
        break;
    }
  }

  function processFragment(n1, n2: any, container: any, parentComponent) {
    mountChildren(n2.children, container, parentComponent);
  }

  function processTextVNode(n1, n2: any, container: any) {
    const { children } = n2;
    const el = (n2.el = document.createTextNode(children));
    container.append(el);
  }

  function processElement(n1, n2: any, container: any, parentComponent) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container);
    }
  }

  function mountElement(initialVNode: any, container: any, parentComponent) {
    const { props, children } = initialVNode;

    // type
    const el = (initialVNode.el = hostCreateElement(initialVNode.type));

    // props
    for (const key in props) {
      const val = props[key];

      hostPatchProp(el, key, null, val);
    }

    const { shapeFlag } = initialVNode;
    // children
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el, parentComponent);
    }

    hostInsert(el, container);
  }

  function patchElement(n1, n2, container) {
    console.log("patchElement n1 =>", n1);
    console.log("patchElement n2 =>", n2);
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;

    const el = (n2.el = n1.el);

    patchProps(el, oldProps, newProps);
  }

  function patchProps(el, oldProps, newProps) {
    if (oldProps !== newProps) {
      for (const key in newProps) {
        const prevProp = oldProps[key];
        const nextProp = newProps[key];

        if (prevProp !== nextProp) {
          hostPatchProp(el, key, prevProp, nextProp);
        }
      }

      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!newProps[key]) {
            hostPatchProp(el, key, oldProps[key], null);
          }
        }
      }
    }
  }

  function processComponent(n1, n2: any, container: any, parentComponent) {
    mountComponent(n2, container, parentComponent);
  }

  function mountComponent(vnode: any, container, parentComponent) {
    const instance = createComponentInstance(vnode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
  }

  function setupRenderEffect(instance: any, initialVNode, container) {
    effect(() => {
      const { proxy } = instance;
      if (!instance.isMounted) {
        const subTree = (instance.subTree = instance.render.call(proxy));

        console.log("subtree =>", subTree);

        patch(null, subTree, container, instance);

        initialVNode.el = subTree.el;

        instance.isMounted = true;
      } else {
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        instance.subTree = subTree;

        patch(prevSubTree, subTree, container, instance);
      }
    });
  }

  function mountChildren(children, container, parentComponent) {
    children.forEach((child) => {
      patch(null, child, container, parentComponent);
    });
  }

  return {
    createApp: createAppAPI(render),
  };
}
