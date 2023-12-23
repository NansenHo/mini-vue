import { ShapeFlags } from "@mini-vue/shared";

export function initSlots(instance, children) {
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
