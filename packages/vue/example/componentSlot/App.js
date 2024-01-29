import { h, createTextVnode } from "../../dist/mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",
  setup() {},
  render() {
    const app = h("div", { class: "title" }, "App");

    // - 我们期望 slotsContent1 和 slotsContent2 作为 Foo 组件的子节点被渲染出来
    // 具名插槽:
    // - 我们期望 slotsContent1 被渲染在 header 插槽中，slotsContent2 被渲染在 footer 插槽中
    // 作用域插槽:
    // - 我们期望在 Foo 组件里定义的 age 可以在 App 组件里使用
    const slotsContent = (age) => [
      h("p", {}, "12" + age),
      h("p", {}, [createTextVnode("你好啊")]),
    ];
    const foo = h(
      Foo,
      {},
      {
        header: slotsContent,
      }
    );

    return h("div", {}, [app, foo]);
  },
};
