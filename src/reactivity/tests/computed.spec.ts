import { computed } from "../computed";
import { reactive } from "../reactive";

describe("computed", () => {
  it("happy path", () => {
    const user = reactive({
      birthday: 1998,
    });

    let age = computed(() => {
      return 2023 - user.birthday;
    });

    expect(age.value).toBe(25);
  });

  it("should compute lazily", () => {
    const user = reactive({
      birthday: 1998,
    });

    const getter = jest.fn(() => {
      return 2023 - user.birthday;
    });

    let age = computed(getter);

    // lazy
		// getter will not execute, when the get operation of `age` is not triggered.
    expect(getter).not.toHaveBeenCalled();

    // first time computation.
    expect(age.value).toBe(25);
    expect(getter).toHaveBeenCalledTimes(1);

		// cache mechanism
    // should not compute again, because `user.birthday` is not changed.
    age.value;
    expect(getter).toHaveBeenCalledTimes(1);

    // now should not compute again, because `age` is not triggered.
		// should compute again, until the get operation of `age` is triggered again.
		// the scheduler function will be executed.
    user.birthday = 1999;
		// when reactive object `user` is set, the function `trigger` will be executed.
    expect(getter).toHaveBeenCalledTimes(1);

    // should compute again.
    expect(age.value).toBe(24);
    expect(getter).toHaveBeenCalledTimes(2);

		// should not compute, because `user.birthday` is set to the same value. 
    // user.birthday = 1999;
    // expect(age.value).toBe(24);
    // expect(getter).toHaveBeenCalledTimes(2);
  });
});
