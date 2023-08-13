// App component
import { h } from "../../lib/mini-vue.esm.js";

export const App = {
  render() {
    // UI
    return h("div", { id: "root", class: ["title", "test"] }, [
      h(
        "p",
        {
          class: "",
        },
        this.msg
      ),
      h(
        "p",
        {
          class: "blue",
        },
        "mini-vue"
      ),
    ]);
  },

  setup() {
    // composition api
    return {
      msg: "mini-vue-hello",
    };
  },
};
