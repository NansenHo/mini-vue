import { effect } from "../src/effect";
import { reactive } from "../src/reactive";
import { isRef, proxyRefs, ref, unRef } from "../src/ref";
import { describe, it, expect } from "vitest";

describe("ref", () => {
  it("happy path", () => {
    let a = ref(1);
    expect(a.value).toBe(1);
  });

  it("should be reactive", () => {
    let dummy;
    let calls = 0;
    let n = ref(1);
    effect(() => {
      calls++;
      dummy = n.value;
    });

    expect(calls).toBe(1);
    expect(dummy).toBe(1);

    n.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);

    n.value = 2;
    expect(calls).toBe(2);
    expect(dummy).toBe(2);
  });

  it("should make nested properties reactive", () => {
    let n = ref({
      foo: 1,
    });
    let dummy;
    effect(() => {
      dummy = n.value.foo;
    });
    expect(dummy).toBe(1);
    n.value.foo++;
    expect(dummy).toBe(2);
    n.value = { foo: 3 };
    expect(dummy).toBe(3);
  });

  it("isRef", () => {
    const a = ref(1);
    const b = reactive({ foo: 1 });
    expect(isRef(a)).toBe(true);
    expect(isRef(1)).toBe(false);
    expect(isRef(b)).toBe(false);
  });

  it("unRef", () => {
    const a = ref(1);
    expect(unRef(a)).toBe(1);
    expect(unRef(1)).toBe(1);
  });

  it("proxyRefs", () => {
    const user = {
      age: ref(23),
      name: ref("Olivia"),
      profession: "singer",
    };
    const proxyUser = proxyRefs(user);

    // get operation
    expect(user.age.value).toBe(23);
    expect(proxyUser.age).toBe(23);
    expect(proxyUser.name).toBe("Olivia");

    // set operation
    // ref -> plain
    proxyUser.age = 24;
    expect(proxyUser.age).toBe(24);
    expect(user.age.value).toBe(24);

    // ref -> ref
    proxyUser.age = ref(10);
    expect(proxyUser.age).toBe(10);
    expect(user.age.value).toBe(10);

    // plain -> ref
    proxyUser.profession = ref("songwriter");
    expect(proxyUser.profession).toBe("songwriter");
  });
});
