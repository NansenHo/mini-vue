import { ref } from "../../dist/mini-vue.esm.js";

export const App = {
  name: "App",
  template: `<p>{{count}}</p>`,
  setup() {
    const count = (window.count = ref(1));
    return {
      count,
    };
  },
};
