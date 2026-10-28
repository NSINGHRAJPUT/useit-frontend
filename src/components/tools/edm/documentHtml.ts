/** Shared document CSS for editor canvas, live preview, and HTML/PDF export. */
export const DOCUMENT_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 16px;
    line-height: 1.65;
    color: #1a1a1a;
    background: #fff;
  }
  .page {
    width: 100%;
    max-width: 100%;
    min-height: 480px;
    padding: 40px 48px;
    overflow: hidden;
  }
  .page::after {
    content: "";
    display: table;
    clear: both;
  }
  h1 { font-size: 2em; line-height: 1.25; margin: 0 0 0.6em; font-weight: 700; }
  h2 { font-size: 1.5em; line-height: 1.3; margin: 1.2em 0 0.5em; font-weight: 700; }
  h3 { font-size: 1.2em; line-height: 1.35; margin: 1em 0 0.4em; font-weight: 700; }
  p { margin: 0 0 0.85em; }
  ul, ol { margin: 0 0 0.85em; padding-left: 1.4em; }
  li { margin: 0.2em 0; }
  a { color: #1d4ed8; }
  img.freeform-image {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 2px;
  }
  img.freeform-image[data-float="left"] {
    float: left;
    margin-right: 1.1em;
    margin-bottom: 0.75em;
  }
  img.freeform-image[data-float="right"] {
    float: right;
    margin-left: 1.1em;
    margin-bottom: 0.75em;
  }
  img.freeform-image[data-float="none"] {
    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0.85em;
  }
  p.is-editor-empty:first-child::before {
    color: #94a3b8;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
`.trim();

export const PAGE_WIDTH = 760;

export function buildDocumentHtml(bodyHtml: string, width: number = PAGE_WIDTH): string {
  const content = bodyHtml.trim() || "<p></p>";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Document</title>
<style>
${DOCUMENT_CSS}
body { width: ${width}px; }
.page { width: ${width}px; }
</style>
</head>
<body>
<div class="page">
${content}
</div>
</body>
</html>`;
}
