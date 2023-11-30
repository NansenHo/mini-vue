'use strict';

const extend = Object.assign;
const isObject = (val) => {
    return val !== null && typeof val === "object";
};
const hasOwn = (target, key) => {
    return Object.prototype.hasOwnProperty.call(target, key);
};
function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function toHandlerName(str) {
    return str ? "on" + capitalize(str) : "";
}
function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => {
        return c ? c.toUpperCase() : "";
    });
}

// collect dependents
const targetMap = new Map();
// trigger dependents
function trigger(target, key) {
    let depsMap = targetMap.get(target);
    let dep = depsMap.get(key);
    triggerEffects(dep);
}
function triggerEffects(dep) {
    for (const effect of dep) {
        if (effect.scheduler) {
            effect.scheduler();
        }
        else {
            effect.run();
        }
    }
}

// Performance Optimization:
// In order to avoid repetitive calls to the `createGetter` function,
// use an object to store previously created getter.
let get = createGetter();
let set = createSetter();
let readonlyGet = createGetter(true);
let shallowReadonlyGet = createGetter(true, true);
// higher-order function
function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key) {
        if (key === "__v_isReactive" /* ReactiveFlags.IS_REACTIVE */) {
            return !isReadonly;
        }
        else if (key === "__v_isReadonly" /* ReactiveFlags.IS_READONLY */) {
            return isReadonly;
        }
        const res = Reflect.get(target, key);
        if (shallow) {
            return res;
        }
        // nested obj
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res);
        }
        return res;
    };
}
function createSetter() {
    return function set(target, key, value) {
        const res = Reflect.set(target, key, value);
        trigger(target, key);
        return res;
    };
}
const mutableHandlers = {
    get,
    set,
};
const readonlyHandlers = {
    get: readonlyGet,
    set(target, key, value) {
        console.warn(`key: ${String(key)} cannot be modified because the target is a read-only object.`, target);
        return true;
    },
};
const shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet,
});

// Using functions to encapsulate certain operations can enhance the readability of the codes.
function createActiveObject(raw, baseHandlers) {
    return new Proxy(raw, baseHandlers);
}
function reactive(raw) {
    return createActiveObject(raw, mutableHandlers);
}
function readonly(raw) {
    return createActiveObject(raw, readonlyHandlers);
}
function shallowReadonly(raw) {
    return createActiveObject(raw, shallowReadonlyHandlers);
}

function emit(instance, event, ...args) {
    console.log("event =>", event);
    const { props } = instance.vnode;
    const handler = props[toHandlerName(camelize(event))];
    handler && handler(...args);
}

function initProps(instance, rawProps) {
    instance.props = rawProps || {};
}

const publicPropertiesMap = {
    $el: (i) => i.vnode.el,
    $slots: (i) => i.slots,
};
const PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
        const { setupState, props } = instance;
        if (hasOwn(setupState, key)) {
            return setupState[key];
        }
        else if (hasOwn(props, key)) {
            return props[key];
        }
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(instance);
        }
    },
};

// prettier-ignore
var ShapeFlags;
(function (ShapeFlags) {
    ShapeFlags[ShapeFlags["ELEMENT"] = 1] = "ELEMENT";
    ShapeFlags[ShapeFlags["STATEFUL_COMPONENT"] = 2] = "STATEFUL_COMPONENT";
    ShapeFlags[ShapeFlags["TEXT_CHILDREN"] = 4] = "TEXT_CHILDREN";
    ShapeFlags[ShapeFlags["ARRAY_CHILDREN"] = 8] = "ARRAY_CHILDREN";
    ShapeFlags[ShapeFlags["SLOT_CHILDREN"] = 16] = "SLOT_CHILDREN";
})(ShapeFlags || (ShapeFlags = {}));

function initSlots(instance, children) {
    console.log("children =>", children);
    const { vnode } = instance;
    if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
        console.log("handle slot");
        normalizeSlotObject(children, instance.slots);
    }
}
function normalizeSlotObject(children, slots) {
    for (let key in children) {
        const value = children[key];
        console.log("value =>", value);
        slots[key] = (props) => normalizeSlotValue(value(props));
    }
}
function normalizeSlotValue(value) {
    return Array.isArray(value) ? value : [value];
}

function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
        props: {},
        slots: {},
        emit: () => { },
    };
    component.emit = emit.bind(null, component);
    return component;
}
function setupComponent(instance) {
    initProps(instance, instance.vnode.props);
    initSlots(instance, instance.vnode.children);
    setupStatefulComponent(instance);
}
function getCurrentInstance() {
    return currentInstance;
}
let currentInstance = null;
function setCurrentInstance(instance) {
    currentInstance = instance;
}
function setupStatefulComponent(instance) {
    console.log("instance =>", instance);
    const Component = instance.type;
    console.log("Component =>", Component);
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
function handleSetupResult(instance, setupResult) {
    // function Object
    // object
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
    // TODO function
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        shapeFlag: getShapeFlag(type),
        children,
    };
    // children
    if (typeof vnode.children === "string") {
        vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
    }
    else if (Array.isArray(children)) {
        vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
    }
    // slots children
    if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT && isObject(children)) {
        vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
    }
    return vnode;
}
function createTextVnode(children) {
    console.log("Text VNode children =>", children);
    return createVNode(Text, {}, children);
}
function getShapeFlag(type) {
    return typeof type === "string"
        ? ShapeFlags.ELEMENT
        : ShapeFlags.STATEFUL_COMPONENT;
}

function render(vnode, container) {
    patch(vnode, container);
}
function patch(vnode, container) {
    console.log("vnode =>", vnode);
    const { type, shapeFlag } = vnode;
    switch (type) {
        // Fragment: only renders its children
        case Fragment:
            processFragment(vnode, container);
            break;
        case Text:
            processTextVNode(vnode, container);
            break;
        default:
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode, container);
            }
            else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode, container);
            }
            break;
    }
}
function processTextVNode(vnode, container) {
    const { children } = vnode;
    const el = (vnode.el = document.createTextNode(children));
    container.append(el);
}
function processFragment(vnode, container) {
    mountChildren(vnode.children, container);
}
function processElement(vnode, container) {
    // init
    mountElement(vnode, container);
    // TODO update
}
function processComponent(vnode, container) {
    mountComponent(vnode, container);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance, vnode, container);
}
function mountElement(initialVNode, container) {
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
        }
        else {
            el.setAttribute(key, val);
        }
    }
    const { shapeFlag } = initialVNode;
    // children
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
        el.textContent = children;
    }
    else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
        mountChildren(children, el);
    }
    container.append(el);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
    initialVNode.el = subTree.el;
}
function mountChildren(children, container) {
    children.forEach((v) => {
        patch(v, container);
    });
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

function renderSlots(slots, name, props) {
    console.log("slot props =>", props);
    const slot = slots[name];
    console.log("slot =>", slot);
    if (slot && typeof slot === "function") {
        console.log("slot(props) =>", slot(props));
        return createVNode(Fragment, {}, slot(props));
    }
}

exports.createApp = createApp;
exports.createTextVnode = createTextVnode;
exports.getCurrentInstance = getCurrentInstance;
exports.h = h;
exports.renderSlots = renderSlots;
//# sourceMappingURL=mini-vue.cjs.js.map
