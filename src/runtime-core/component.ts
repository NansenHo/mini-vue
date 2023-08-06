export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  };
  return component;
}

export function setupComponent(instance) {
  // TODO
  // initProps()
  // initSlots()

  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  console.log(instance);
  const Component = instance.type;

  const { setup } = Component;

  if (setup) {
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  // function Object
  // object
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishCompontSetup(instance);

  // TODO function
}

function finishCompontSetup(instance: any) {
  const Component = instance.type;
  instance.render = Component.render;
}
