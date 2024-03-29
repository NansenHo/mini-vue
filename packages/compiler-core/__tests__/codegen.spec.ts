import { describe, it, expect } from "vitest";
import { baseParse } from "../src/parse";
import { generator } from "../src/codegen";
import { transform } from "../src/transform";
import { transformExpression } from "../src/transform/transformExpression";
import { transformElement } from "../src/transform/transformElement";
import { transformText } from "../src/transform/transformText";

describe("codegen", () => {
  it("string", () => {
    const ast = baseParse("hi!");
    transform(ast);
    const { code } = generator(ast);
    expect(code).toMatchSnapshot();
  });

  it("interpolation", () => {
    const ast = baseParse("{{message}}");
    transform(ast, {
      nodeTransforms: [transformExpression],
    });
    const { code } = generator(ast);
    expect(code).toMatchSnapshot();
  });

  it("element", () => {
    const ast = baseParse("<div></div>");
    transform(ast, {
      nodeTransforms: [transformElement],
    });
    const { code } = generator(ast);
    expect(code).toMatchSnapshot();
  });

  it("element & text & interpolation", () => {
    const ast: any = baseParse("<div>hi, {{message}}</div>");
    transform(ast, {
      nodeTransforms: [transformExpression, transformElement, transformText],
    });
    const { code } = generator(ast);
    expect(code).toMatchSnapshot();
  });
});
