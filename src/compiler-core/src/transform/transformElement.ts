import { NodeTypes } from "../ast";
import { CREATE_ELEMENT_BLOCK } from "../runtimeHelpers";

export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    context.setHelpersMap(CREATE_ELEMENT_BLOCK);
  }
}
