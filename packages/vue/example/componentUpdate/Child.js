import { h } from "../../dist/mini-vue.esm.js";
export default {
  name: "Child",
  setup(props, { emit }) {},
  render(proxy) {
    return h("div", { class: "child" }, [
      h("div", {}, [h("p", {}, this.$props.msg)]),
    ]);
  },
};
