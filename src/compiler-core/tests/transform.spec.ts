import { describe, it, expect } from "vitest";
import { baseParse } from "../src/parse";
import { transform } from "../src/transform";
import { NodeTypes } from "../src/ast";

describe("transform", () => {
  it("happy path", () => {
    const ast = baseParse("<div>hi,{{message}}</div>");

    const plugin = (node) => {
      if (node.type === NodeTypes.TEXT) {
        node.content = "hi, mini-vue";
      }
    };

    transform(ast, {
      nodeTransforms: [plugin],
    });

    const nextText = ast.children[0].children[0].content;
    expect(nextText).toBe("hi, mini-vue");
  });
});
