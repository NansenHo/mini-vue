import { isReadonly, shallowReadonly } from "../reactive";

describe("shallowReadonly", () => {
  it("", () => {
    const obj = { n: { foo: 1 } };
    const shallowObj = shallowReadonly(obj);
    expect(isReadonly(shallowObj)).toBe(true);
    expect(isReadonly(shallowObj.n)).toBe(false);
  });

  it("receive a warning when attempting to modify a read-only object", () => {
    console.warn = jest.fn();
    const obj = shallowReadonly({ foo: 1 });
    obj.foo++;
    expect(console.warn).toHaveBeenCalled();
  });
});
