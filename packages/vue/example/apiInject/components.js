import { createApp, provide, inject, h } from "../../dist/mini-vue.esm.js";

const GrandFather = {
  name: "GrandFather",
  setup() {
    provide("name", "Grandfather");
    provide("age", 70);
  },

  render() {
    return h(Father);
  },
};

const Father = {
  name: "Father",
  setup() {
    provide("living", "USA");
    provide("name", "Father");
  },
  render() {
    return h(Child);
  },
};

const Child = {
  name: "Child",
  setup() {},
  render() {
    return h(SonOfChild);
  },
};

const SonOfChild = {
  name: "SonOfChild",
  setup() {
    const name = inject("name");
    const age = inject("age");
    const living = inject("living", "Tokyo");
    const pet = inject("pet", "two cats and one dog");
    const hobby = inject("hobby", () => "coding");
    const nothing = inject("nothing");

    return {
      name,
      age,
      living,
      pet,
      hobby,
      nothing,
    };
  },
  render() {
    return h("div", {}, [
      h("p", {}, `name: ${this.name}`),
      h("p", {}, `age: ${this.age}`),
      h("p", {}, `living in: ${this.living}`),
      h("p", {}, `pet: ${this.pet}`),
      h("p", {}, `hobby: ${this.hobby}`),
      h("p", {}, `nothing: ${this.nothing}`),
    ]);
  },
};

const rootContainer = document.querySelector("#app");
createApp(GrandFather).mount(rootContainer);
