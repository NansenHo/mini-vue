import { NodeTypes } from "./ast";

const enum TagType {
  Start,
  End,
}

export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}

function createParserContext(content: string): any {
  return {
    source: content,
  };
}

function createRoot(children) {
  return {
    children,
  };
}

function parseChildren(context) {
  const nodes: any[] = [];

  const s = context.source;
  let node;
  if (isValidBraceFormat(s)) {
    node = parseInterpolation(context);
  } else if (s[0] === "<") {
    node = parseElement(context);
  }

  nodes.push(node);

  return nodes;
}

function isValidBraceFormat(content: string): boolean {
  return content.startsWith("{{") && content.includes("}}");
}

function parseInterpolation(context) {
  const openDelimiter = "{{";
  const closeDelimiter = "}}";

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );
  const rawContentLength = closeIndex - openDelimiter.length;

  advanceBy(context, openDelimiter.length);

  const rawContent = context.source.slice(0, rawContentLength);
  const content = rawContent.trim();

  advanceBy(context, rawContentLength + closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  };
}

function parseElement(context) {
  const element = parseTag(context, TagType.Start);

  parseTag(context, TagType.End);

  return element;
}

function parseTag(context: any, type: TagType) {
  const match: any = /^<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1];

  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  if (type === TagType.End) return;

  return {
    type: NodeTypes.ELEMENT,
    tag,
  };
}

function advanceBy(context: any, length: number) {
  context.source = context.source.slice(length);
}
