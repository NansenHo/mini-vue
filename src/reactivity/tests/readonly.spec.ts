import { isReadonly, readonly, isProxy } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    const obj = { foo: 1 };
    const wrapper = readonly(obj);
    expect(wrapper).not.toBe(obj);
    expect(wrapper.foo).toBe(1);

    // isReadonly
    expect(isReadonly(wrapper)).toBe(true);
    expect(isReadonly(obj)).toBe(false);

    // isProxy
    expect(isProxy(wrapper)).toBe(true);
    expect(isProxy(obj)).toBe(false);
  });

  it("receive a warning when attempting to modify a read-only object", () => {
    console.warn = jest.fn();
    const obj = readonly({ foo: 1 });
    obj.foo++;
    expect(console.warn).toHaveBeenCalled();
  });
});
