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
    remove: hostRemove,
    setElementText: hostSetElementText,
  } = options;

  function render(vnode, container) {
    patch(null, vnode, container, null, null);
  }

  // n1: old vnode
  // n2: new vnode
  function patch(n1, n2, container, parentComponent, anchor) {
    console.log("vnode =>", n2);
    const { type, shapeFlag } = n2;

    switch (type) {
      // Fragment: only renders its children
      case Fragment:
        processFragment(n1, n2, container, parentComponent, anchor);
        break;
      case Text:
        processTextVNode(n1, n2, container);
        break;
      default:
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent, anchor);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(n1, n2, container, parentComponent, anchor);
        }
        break;
    }
  }

  function processFragment(
    n1,
    n2: any,
    container: any,
    parentComponent,
    anchor
  ) {
    mountChildren(n2.children, container, parentComponent, anchor);
  }

  function mountChildren(children, container, parentComponent, anchor) {
    children.forEach((c) => {
      patch(null, c, container, parentComponent, anchor);
    });
  }

  function processTextVNode(n1, n2: any, container: any) {
    const { children } = n2;
    const el = (n2.el = document.createTextNode(children));
    container.append(el);
  }

  function processElement(
    n1,
    n2: any,
    container: any,
    parentComponent,
    anchor
  ) {
    if (!n1) {
      mountElement(n2, container, parentComponent, anchor);
    } else {
      patchElement(n1, n2, container, parentComponent, anchor);
    }
  }

  function mountElement(
    initialVNode: any,
    container: any,
    parentComponent,
    anchor
  ) {
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
      mountChildren(children, el, parentComponent, anchor);
    }

    hostInsert(el, container, anchor);
  }

  function patchElement(n1, n2, container, parentComponent, anchor) {
    console.log("patchElement n1 =>", n1);
    console.log("patchElement n2 =>", n2);
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;

    const el = (n2.el = n1.el);

    patchChildren(n1, n2, el, parentComponent, anchor);
    patchProps(el, oldProps, newProps);
  }

  function patchChildren(n1, n2, container, parentComponent, anchor) {
    const prevShapeFlag = n1.shapeFlag;
    const { shapeFlag } = n2;
    const c1 = n1.children;
    const c2 = n2.children;

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      if (prevShapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        unmountChildren(c1);
      }
      if (c1 !== c2) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & ShapeFlags.TEXT_CHILDREN) {
        hostSetElementText(container, "");
        mountChildren(c2, container, parentComponent, anchor);
      } else {
        patchKeyedChildren(c1, c2, container, parentComponent, anchor);
      }
    }
  }

  function patchKeyedChildren(
    c1,
    c2,
    container,
    parentComponent,
    parentAnchor
  ) {
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    let i = 0;

    function isSameVNodeType(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key;
    }

    // left
    while (i <= e1 && i <= e2) {
      const prevChild = c1[i];
      const nextChild = c2[i];

      if (!isSameVNodeType(prevChild, nextChild)) {
        break;
      }

      patch(prevChild, nextChild, container, parentComponent, parentAnchor);
      i++;
    }

    // right
    while (e1 >= 0 && e2 >= 0) {
      const prevChild = c1[e1];
      const nextChild = c2[e2];

      if (!isSameVNodeType(prevChild, nextChild)) {
        break;
      }

      patch(prevChild, nextChild, container, parentComponent, parentAnchor);
      e1--;
      e2--;
    }

    console.log("i =>", i);
    console.log("e1 =>", e1);
    console.log("e2 =>", e2);
    console.log("l2 =>", l2);
    console.log("c1.length =>", c1.length);

    if (i > e1 && i <= e2) {
      const nextPosition = e2 + 1;
      const anchor = nextPosition < l2 ? c2[nextPosition].el : null;

      while (i <= e2) {
        patch(null, c2[i], container, parentComponent, anchor);
        i++;
      }
    } else if (i > e2 && i <= e1) {
      while (i <= e1) {
        hostRemove(c1[i].el);
        i++;
      }
    } else {
      console.log("else");
    }
  }

  function unmountChildren(children) {
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el;
      hostRemove(el);
    }
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

  function processComponent(
    n1,
    n2: any,
    container: any,
    parentComponent,
    anchor
  ) {
    mountComponent(n2, container, parentComponent, anchor);
  }

  function mountComponent(vnode: any, container, parentComponent, anchor) {
    const instance = createComponentInstance(vnode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container, anchor);
  }

  function setupRenderEffect(instance: any, initialVNode, container, anchor) {
    effect(() => {
      const { proxy } = instance;
      if (!instance.isMounted) {
        const subTree = (instance.subTree = instance.render.call(proxy));

        console.log("subtree =>", subTree);

        patch(null, subTree, container, instance, anchor);

        initialVNode.el = subTree.el;

        instance.isMounted = true;
      } else {
        const subTree = instance.render.call(proxy);
        const prevSubTree = instance.subTree;
        instance.subTree = subTree;

        patch(prevSubTree, subTree, container, instance, anchor);
      }
    });
  }

  return {
    createApp: createAppAPI(render),
  };
}
