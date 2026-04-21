/**
 * Converts Sanity Portable Text blocks back to Markdown-ish text that the
 * existing BlogDetail `renderContent()` parser understands.
 *
 * Pragmatic round-trip: the migration produced PT from MD, and now we convert
 * back so the current renderer (markdown parser + TOC heading detection)
 * keeps working unchanged.
 *
 * Lossy:  tables drop to plain text; nested lists flatten to one level;
 * code blocks inside a paragraph become inline `code`.
 *
 * Good enough — the source markdown IS still in src/data/blogPosts.ts as a
 * fallback, and BBB-authored new posts are generally simpler structures.
 */

type Span = { _type: "span"; text: string; marks?: string[] };
type BlockLink = { _key: string; _type: "link"; href: string };
type Block = {
  _type: "block";
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: Span[];
  markDefs?: BlockLink[];
};
type ImageBlock = {
  _type: "image";
  asset?: { url?: string };
  alt?: string;
  caption?: string;
};
export type PortableTextNode = Block | ImageBlock | Record<string, unknown>;

function renderSpan(span: Span, markDefs: BlockLink[] = []): string {
  let text = span.text ?? "";
  const marks = span.marks ?? [];

  // Decorator marks (order: inner-out so nesting is right)
  if (marks.includes("code")) text = `\`${text}\``;
  if (marks.includes("em")) text = `*${text}*`;
  if (marks.includes("strong")) text = `**${text}**`;

  // Annotation marks (links) — markDefs key referenced by mark
  for (const mark of marks) {
    const def = markDefs.find((d) => d._key === mark);
    if (def && def._type === "link" && def.href) {
      text = `[${text}](${def.href})`;
    }
  }
  return text;
}

function renderBlock(block: Block): string {
  const children = block.children ?? [];
  const markDefs = block.markDefs ?? [];
  const text = children.map((c) => renderSpan(c, markDefs)).join("");

  // List items
  if (block.listItem === "bullet") return `- ${text}`;
  if (block.listItem === "number") return `1. ${text}`;

  // Block styles
  switch (block.style) {
    case "h1":
      return `# ${text}`;
    case "h2":
      return `## ${text}`;
    case "h3":
      return `### ${text}`;
    case "h4":
      return `#### ${text}`;
    case "blockquote":
      return `> ${text}`;
    default:
      return text;
  }
}

function renderImage(img: ImageBlock): string {
  const url = img.asset?.url;
  if (!url) return "";
  const alt = img.alt ?? "";
  const caption = img.caption ? `\n\n*${img.caption}*` : "";
  return `![${alt}](${url})${caption}`;
}

export function portableTextToMarkdown(
  blocks: PortableTextNode[] | null | undefined
): string {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((node) => {
      if ((node as Block)._type === "block") return renderBlock(node as Block);
      if ((node as ImageBlock)._type === "image")
        return renderImage(node as ImageBlock);
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}
