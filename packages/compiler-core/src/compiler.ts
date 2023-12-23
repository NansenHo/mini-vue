import { generator } from "./codegen";
import { baseParse } from "./parse";
import { transform } from "./transform";
import { transformElement } from "./transform/transformElement";
import { transformExpression } from "./transform/transformExpression";
import { transformText } from "./transform/transformText";

export function baseCompiler(template) {
  const ast: any = baseParse(template);
  transform(ast, {
    nodeTransforms: [transformExpression, transformElement, transformText],
  });

  return generator(ast);
}
