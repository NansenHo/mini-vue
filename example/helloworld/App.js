// App component
import { h } from "../../lib/mini-vue.esm.js";

window.self = undefined;
export const App = {
  render() {
    // execute `self.$el` in the browser console.
    window.self = this;
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
      msg: "mini-vue-hello-world",
    };
  },
};
