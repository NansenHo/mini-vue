import { CREATE_ELEMENT_BLOCK } from "./runtimeHelpers";

export const enum NodeTypes {
  INTERPOLATION,
  SIMPLE_EXPRESSION,
  ELEMENT,
  TEXT,
  ROOT,
  COMPOUND_EXPRESSION,
}

export function createVNodeCall(context, tag, props, children) {
  context.setHelpersMap(CREATE_ELEMENT_BLOCK);

  return {
    type: NodeTypes.ELEMENT,
    tag,
    props,
    children,
  };
}
