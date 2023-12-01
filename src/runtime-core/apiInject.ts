import { getCurrentInstance } from "./component";

export function provide(key, value) {
  const currentInstance: any = getCurrentInstance();

  let provides = currentInstance?.provides;
  const parentProvides = currentInstance.parent?.provides;

  console.log(provides === parentProvides);

  // init
  if (provides === parentProvides) {
    provides = currentInstance.provides = Object.create(parentProvides);
  }

  provides[key] = value;

  console.log("provide provides =>", provides);
}

export function inject(key, defaultValue) {
  const currentInstance: any = getCurrentInstance();

  console.log("inject provides =>", currentInstance.provides);

  const providesValue = currentInstance?.provides[key];

  if (!providesValue) {
    if (typeof defaultValue === "function") {
      return defaultValue();
    }
    return defaultValue;
  }

  return providesValue;
}
