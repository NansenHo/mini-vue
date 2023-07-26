import { readonly } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    const obj = { foo: 1 };
    const wrapper = readonly(obj);
    expect(wrapper).not.toBe(obj);
    expect(wrapper.foo).toBe(1);
  });

  it("receive a warning when attempting to modify a read-only object", () => {
    console.warn = jest.fn();
    const obj = readonly({ foo: 1 });
    obj.foo++;
    expect(console.warn).toHaveBeenCalled();
  });
});
