import { reactive, isReactive, isProxy } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1, bar: { a: 2 } };
    const observed = reactive(original);
    // not equal
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);

    // isReactive
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);

    // isProxy
    expect(isProxy(observed)).toBe(true);
    expect(isProxy(original)).toBe(false);

    // nested readonly
    expect(isReactive(observed.bar)).toBe(true);
    expect(isReactive(original.bar)).toBe(false);
  });

  it("nested reactive", () => {
    const original = {
      obj: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    };
    const obesrved = reactive(original);
    expect(isReactive(obesrved.obj)).toBe(true);
    expect(isReactive(obesrved.array)).toBe(true);
    expect(isReactive(obesrved.array[0])).toBe(true);
  });
});
