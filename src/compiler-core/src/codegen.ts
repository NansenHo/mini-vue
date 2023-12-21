import { transform } from "./transform";

export function generator(ast) {
  const context = createCodegenContext();
  const { push } = context;

  transform(ast);

  push("return ");
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

function createCodegenContext() {
  const context = {
    code: "",
    push(source) {
      context.code += source;
    },
  };

  return context;
}

function genNode(node, context) {
  const { push } = context;
  push(`'${node.content}'`);
}
