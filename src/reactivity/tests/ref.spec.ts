import { effect } from "../effect";
import { ref } from "../ref";

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
});
