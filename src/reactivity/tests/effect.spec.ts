// You need to use Babel to transpile ES6 Modules into CommonJS Modules in NodeJS
// Detail: https://jestjs.io/docs/getting-started#using-babel
import { reactive } from "../reactive";
import { effect } from "../effect";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 22,
    });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    // init
    expect(nextAge).toBe(23);
    // // update
    user.age++;
    expect(nextAge).toBe(24);
  });

  it("should return a runner function when effect is called", () => {
    let foo = 1;
    const runner = effect(() => {
      foo++;
      return "foo";
    });
    expect(foo).toBe(2);

    // call runner
    const value = runner();
    // fn will be called again when runner is called.
    expect(foo).toBe(3);
    // runner will return the return value of fn
    expect(value).toBe("foo");
  });
});
