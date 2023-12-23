import { isString } from "src/shared";
import { NodeTypes } from "./ast";
import {
  CREATE_ELEMENT_BLOCK,
  TO_DISPLAY_STRING,
  helperMapName,
} from "./runtimeHelpers";

export function generator(ast) {
  const context = createCodegenContext();
  const { push } = context;

  genFunctionPreamble(ast, context);

  const functionName = "render";
  const args = ["_ctx", "_cache"];
  const signature = args.join(", ");

  push(`function ${functionName}(${signature}){`);
  push("return ");
  genNode(ast.codegenNode, context);
  push(`}`);

  return {
    code: context.code,
  };
}

function genFunctionPreamble(ast, context) {
  const { push, helper } = context;
  const VueBinging = "Vue";
  const aliasHelper = (s) => `${helper(s)}: _${helper(s)}`;

  const { helpers } = ast;
  if (helpers.length > 0) {
    push(`const { ${helpers.map(aliasHelper).join(", ")} } = ${VueBinging}`);
  }

  push("\n");
  push("return ");
}

function createCodegenContext() {
  const context = {
    code: "",
    push(source) {
      context.code += source;
    },
    helper(key) {
      return `${helperMapName[key]}`;
    },
  };

  return context;
}

function genNode(node, context) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context);
      break;

    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context);
      break;

    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context);
      break;

    case NodeTypes.ELEMENT:
      genElement(node, context);
      break;

    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context);
      break;

    default:
      break;
  }
}

function genText(node, context) {
  const { push } = context;
  push(`"${node.content}"`);
}

function genInterpolation(node, context) {
  const { push, helper } = context;
  push(`_${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(")");
}

function genExpression(node, context) {
  const { push } = context;
  push(`${node.content}`);
}

function genElement(node, context) {
  const { push, helper } = context;
  const { tag, children, props } = node;

  push(`(_${helper(CREATE_ELEMENT_BLOCK)}(`);

  const filteredNodes = removeLastNull(genNullable([tag, props, children]));

  genNodeList(filteredNodes, context);

  push(")");
}

function genNullable(nodes) {
  return nodes.map((node) => node || "null");
}

function removeLastNull(nodes) {
  let i = nodes.length;

  while (i--) {
    if (nodes[i] === "null") {
      nodes.pop();
    } else {
      break;
    }
  }

  return nodes;
}

function genNodeList(nodes, context) {
  const { push } = context;

  for (let i = 0; i < nodes.length; i++) {
    console.log(nodes);
    const node = nodes[i];
    if (isString(node)) {
      push(node);
    } else {
      genNode(node, context);
    }

    if (i < nodes.length - 1) {
      push(", ");
    }
  }

  push(")");
}

function genCompoundExpression(node, context) {
  const { children } = node;
  const { push } = context;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isString(child)) {
      push(child);
    } else {
      genNode(child, context);
    }
  }
}
