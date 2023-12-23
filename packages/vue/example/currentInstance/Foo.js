import { h, getCurrentInstance } from "../../dist/mini-vue.esm.js";

export const Foo = {
  name: "Foo",
  render() {
    return h("div", {}, "foo");
  },
  setup() {
    const instance = getCurrentInstance();
    console.log('Foo instance =>', instance)
  },
};
