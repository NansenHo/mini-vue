import { h } from "../../dist/mini-vue.esm.js";

export const Foo = {
  name: "Foo",
  setup(props, { emit }) {
    function emitAdd() {
      console.log("emit add");
      emit("add-foo");
      emit("add", 1, 2);
    }

    return {
      emitAdd,
    };
  },
  render() {
    const btn = h(
      "button",
      {
        onClick: this.emitAdd,
      },
      "Emit Button"
    );
    const foo = h("p", {}, "Foo");
    return h("div", {}, [btn, foo]);
  },
};
