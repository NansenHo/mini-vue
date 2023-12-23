// App component
import { h } from "../../dist/mini-vue.esm.js";
import { Foo } from "./Foo.js";

window.self = undefined;
export const App = {
  name: "App",
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
      h("div", {}, "hi,", this.component),
      h(Foo, { count: 1 }),
    ]);
  },

  setup() {
    // composition api
    return {
      msg: "Please mouse over the yellow text!",
      component: "Foo",
    };
  },
};
