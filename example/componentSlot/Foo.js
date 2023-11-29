import { h } from "../../lib/mini-vue.esm.js";
import { renderSlots } from "../../lib/mini-vue.esm.js";

export const Foo = {
  name: "Foo",
  setup() {},
  render() {
    const foo = h("p", {}, "foo");

    // - 我们期望 slotsContent1 和 slotsContent2 作为 Foo 组件的子节点被渲染出来
    // 具名插槽:
    // - 我们期望 slotsContent1 被渲染在 header 插槽中，slotsContent2 被渲染在 footer 插槽中
    // 作用域插槽:
    // - 我们期望在 Foo 组件里定义的 age 可以在 App 组件里使用
    const age = 3;
    return h("div", {}, [renderSlots(this.$slots, "header", age), foo]);
  },
};
