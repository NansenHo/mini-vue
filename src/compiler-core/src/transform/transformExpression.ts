import { NodeTypes } from "../ast";

export function transformExpression(node) {
  if (node.type === NodeTypes.INTERPOLATION) {
    node.content = processExpression(node.content);
  }
}

function processExpression(node) {
  const rawContent = node.content;
  node.content = `_ctx.${rawContent}`;
  return node;
}
