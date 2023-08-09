// App component
import { h } from "../../lib/mini-vue.esm.js";

export const App = {
  render() {
    // UI
    return h("div", { id: "root", class: ["title", "test"] }, [
      h(
        "p",
        {
          class: "blue",
        },
        "hello!"
      ),
      h(
        "p",
        {
          class: "yellow",
        },
        "mini-vue"
      ),
    ]);
  },

  setup() {
    // composition api
    return {
      msg: "mini-vue",
    };
  },
};
