import { renderMarkdown } from "@/lib/markdown";

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function BlogContent({ content }: { content: string }) {
  const html = looksLikeHtml(content) ? content : renderMarkdown(content);

  return (
    <div
      className="blog-content space-y-4 text-base leading-8 text-foreground/90"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
