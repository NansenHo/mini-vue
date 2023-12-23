import { h, ref } from "../../dist/mini-vue.esm.js";

export const App = {
  name: "App",

  setup() {
    const props = ref({
      foo: "foo",
      bar: "bar",
    });
    const onChangePropsDemo1 = () => {
      props.value.foo = "new-foo";
      console.log("props =>", props);
    };

    const onChangePropsDemo2 = () => {
      props.value.foo = undefined;
      console.log("props =>", props);
    };

    const onChangePropsDemo3 = () => {
      props.value = {
        foo: "foo",
      };
      console.log("props =>", props);
    };

    return {
      onChangePropsDemo1,
      onChangePropsDemo2,
      onChangePropsDemo3,
      props,
    };
  },
  render() {
    return h(
      "div",
      {
        id: "root",
        ...this.props,
      },
      [
        h(
          "button",
          {
            onClick: this.onChangePropsDemo1,
          },
          "changeProps - 值改变了 - 修改"
        ),

        h(
          "button",
          {
            onClick: this.onChangePropsDemo2,
          },
          "changeProps - 值变成了 undefined - 删除"
        ),

        h(
          "button",
          {
            onClick: this.onChangePropsDemo3,
          },
          "changeProps - key 在新的里面没有了 - 删除"
        ),
      ]
    );
  },
};
