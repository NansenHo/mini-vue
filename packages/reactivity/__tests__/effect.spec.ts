// You need to use Babel to transpile ES6 Modules into CommonJS Modules in NodeJS
// Detail: https://jestjs.io/docs/getting-started#using-babel
import { describe, it, expect, vi } from "vitest";
import { reactive } from "../src/reactive";
import { effect, stop } from "../src/effect";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 22,
    });

    let nextAge;
    // dependencies collection
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

  it("scheduler", () => {
    let dummy;
    let run: any;
    const obj = reactive({ foo: 1 });
    const scheduler = vi.fn(() => {
      run = runner;
    });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );

    // initialization
    // fn will be called, scheduler will be not.
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);

    // updates
    // fn will not be executed directly, instead, scheduler will be invoked.
    obj.foo++;
    expect(dummy).toBe(1);
    expect(scheduler).toHaveBeenCalledTimes(1);

    // when the runner is called, it will execute fn again.
    run();
    expect(dummy).toBe(2);
  });

  it("stop", () => {
    let dummy;
    const obj = reactive({ foo: 1 });
    const runner = effect(() => {
      dummy = obj.foo;
    });
    obj.foo = 2;
    expect(dummy).toBe(2);

    // trigger set()
    stop(runner);
    obj.foo = 3;
    expect(dummy).toBe(2);

    // trigger get() and set()
    stop(runner);
    obj.foo++;
    expect(dummy).toBe(2);

    // trigger get() and set()
    stop(runner);
    obj.foo = obj.foo + 1;
    expect(dummy).toBe(2);

    // stopped effect should still be manually callable.
    runner();
    expect(dummy).toBe(5);
  });

  it("onStop", () => {
    let dummy;
    let onStop = vi.fn();
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        onStop,
      }
    );

    stop(runner);
    expect(onStop).toHaveBeenCalled();
  });
});
