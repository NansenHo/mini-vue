import { createVNode, Fragment } from "../vnode";

export function renderSlots(slots, name, props) {
  console.log("slot props =>", props);

  const slot = slots[name];
  console.log("slot =>", slot);

  if (slot && typeof slot === "function") {
    console.log("slot(props) =>", slot(props));

    return createVNode(Fragment, {}, slot(props));
  }
}
