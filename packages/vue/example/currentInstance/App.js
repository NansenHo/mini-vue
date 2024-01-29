import { h, getCurrentInstance } from "../../dist/mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",

  render() {
    return h("div", { class: "title" }, [
      h("p", {}, "currentInstance Demo"),
      h(Foo),
    ]);
  },

  setup() {
    const instance = getCurrentInstance();
    console.log("App instance =>", instance);
  },
};
