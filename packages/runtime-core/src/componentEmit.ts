import { camelize, toHandlerName } from "@mini-vue/shared";

export function emit(instance, event, ...args) {
  console.log("event =>", event);

  const { props } = instance.vnode;

  const handler = props[toHandlerName(camelize(event))];

  handler && handler(...args);
}
