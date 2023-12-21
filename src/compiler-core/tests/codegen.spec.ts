import { describe, it, expect } from "vitest";
import { baseParse } from "../src/parse";
import { generator } from "../src/codegen";
import { transform } from "../src/transform";

describe("codegen", () => {
  it("string", () => {
    const ast = baseParse("hi!");
    transform(ast);
    const { code } = generator(ast);
    expect(code).toMatchSnapshot();
  });
});
