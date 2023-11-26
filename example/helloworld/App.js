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
          class: "yellow",
          onMouseover: () => {
            alert("mouse over");
          },
        },
        this.msg
      ),
      h(
        "p",
        {
          onClick: () => {
            alert("click");
          },
          class: "blue",
        },
        "Please click the blue text!"
      ),
    ]);
  },

  setup() {
    // composition api
    return {
      msg: "Please mouse over the yellow text!",
    };
  },
};
