// entry point of mini vue
export * from "@mini-vue/runtime-dom";
import { baseCompiler } from "@mini-vue/compiler-core";
import * as runtimeDom from "@mini-vue/runtime-dom";
import { registerRuntimeCompiler } from "@mini-vue/runtime-dom";

export function compilerToFunction(template) {
  const { code } = baseCompiler(template);
  const render = new Function("Vue", code)(runtimeDom);
  return render;
}

registerRuntimeCompiler(compilerToFunction);
