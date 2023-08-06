import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
	// component
  processComponent(vnode, container);
	//TODO if vnode is a element
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
  const instance = createComponentInstance(vnode);
  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();
  patch(subTree, container);
}
