import { proxyRefs } from "@mini-vue/reactivity";
import { shallowReadonly } from "@mini-vue/reactivity";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandlers } from "./componentPublicInstance";
import { initSlots } from "./componentSlots";

export function createComponentInstance(vnode, parent) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    next: null,
    props: {},
    slots: {},
    provides: parent?.provides || {},
    parent,
    subTree: {},
    isMounted: false,
    emit: () => {},
  };

  component.emit = emit.bind(null, component) as any;

  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);

  setupStatefulComponent(instance);
}

export function getCurrentInstance() {
  return currentInstance;
}

let currentInstance = null;
function setCurrentInstance(instance) {
  currentInstance = instance;
}

function setupStatefulComponent(instance: any) {
  console.log("setupStatefulComponent instance =>", instance);
  const Component = instance.type;
  console.log("setupStatefulComponent Component =>", Component);

  // context
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandlers);

  const { setup } = Component;

  if (setup) {
    setCurrentInstance(instance);
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });
    setCurrentInstance(null);

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  if (typeof setupResult === "object") {
    instance.setupState = proxyRefs(setupResult);
  }

  finishComponentSetup(instance);

  // TODO function
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (compiler && !Component.render) {
    if (Component.template) {
      Component.render = compiler(Component.template);
    }
  }
  instance.render = Component.render;
}

let compiler;

export function registerRuntimeCompiler(_compiler) {
  compiler = _compiler;
}
