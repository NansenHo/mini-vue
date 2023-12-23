import { ref, h } from "../../dist/mini-vue.esm.js";

// 新的是 text
// 老的是 text
const prevChildren = "oldChild";
const nextChildren = "newChild";

export default {
  name: "TextToText",
  setup() {
    const isChange = ref(false);
    window.isChange = isChange;

    return {
      isChange,
    };
  },
  render() {
    const self = this;

    return self.isChange === true
      ? h("div", {}, nextChildren)
      : h("div", {}, prevChildren);
  },
};
