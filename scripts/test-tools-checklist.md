# Tool Test Checklist

All 60 tools — verify input produces a valid downloadable output.

## Image tools (client — 25)

| Slug | Fixture | Expected output | Status |
|------|---------|-------------------|--------|
| jpg-to-png | test-fixtures/sample.jpg | .png | [ ] |
| png-to-jpg | test-fixtures/sample.png | .jpg | [ ] |
| jpg-to-webp | test-fixtures/sample.jpg | .webp | [ ] |
| png-to-webp | test-fixtures/sample.png | .webp | [ ] |
| webp-to-jpg | test-fixtures/sample.webp | .jpg | [ ] |
| webp-to-png | test-fixtures/sample.webp | .png | [ ] |
| jpg-to-gif | test-fixtures/sample.jpg | .png/.gif | [ ] |
| gif-to-jpg | test-fixtures/sample.gif | .jpg | [ ] |
| png-to-gif | test-fixtures/sample.png | .png/.gif | [ ] |
| gif-to-png | test-fixtures/sample.gif | .png | [ ] |
| webp-to-avif | test-fixtures/sample.webp | .avif/.webp | [ ] |
| avif-to-webp | test-fixtures/sample.avif | .webp | [ ] |
| jpg-to-tiff | test-fixtures/sample.jpg | .png/.tiff | [ ] |
| tiff-to-jpg | test-fixtures/sample.tiff | .jpg | [ ] |
| bmp-to-png | test-fixtures/sample.bmp | .png | [ ] |
| png-to-avif | test-fixtures/sample.png | .avif/.webp | [ ] |
| compress-jpg | test-fixtures/sample.jpg | .jpg | [ ] |
| compress-png | test-fixtures/sample.png | .png | [ ] |
| compress-webp | test-fixtures/sample.webp | .webp | [ ] |
| compress-gif | test-fixtures/sample.gif | .png/.gif | [ ] |
| resize-image | test-fixtures/sample.png | resized image | [ ] |
| crop-image | test-fixtures/sample.png | cropped image | [ ] |
| rotate-image | test-fixtures/sample.png | rotated image | [ ] |
| flip-image | test-fixtures/sample.png | flipped image | [ ] |
| strip-metadata | test-fixtures/sample.jpg | cleaned image | [ ] |

## PDF tools (client — 10)

| Slug | Fixture | Expected output | Status |
|------|---------|-------------------|--------|
| merge-pdf | 2× test-fixtures/sample.pdf | merged.pdf | [ ] |
| split-pdf | test-fixtures/sample.pdf | .zip of pages | [ ] |
| compress-pdf | test-fixtures/sample.pdf | smaller.pdf | [ ] |
| rotate-pdf | test-fixtures/sample.pdf | rotated.pdf | [ ] |
| delete-pages-pdf | test-fixtures/sample.pdf | edited.pdf | [ ] |
| extract-pages-pdf | test-fixtures/sample.pdf | edited.pdf | [ ] |
| pdf-to-jpg | test-fixtures/sample.pdf | .zip of JPGs | [ ] |
| pdf-to-png | test-fixtures/sample.pdf | .zip of PNGs | [ ] |
| images-to-pdf | test-fixtures/sample.png | .pdf | [ ] |
| pdf-to-text | test-fixtures/sample.pdf | .txt | [ ] |

## Document tools

| Slug | Location | Fixture | Expected output | Status |
|------|----------|---------|-------------------|--------|
| docx-to-pdf | server | test-fixtures/sample.docx | .pdf | [ ] |
| pptx-to-pdf | server | test-fixtures/sample.pptx | .pdf | [ ] |
| xlsx-to-pdf | server | test-fixtures/sample.xlsx | .pdf | [ ] |
| pdf-to-docx | server | test-fixtures/sample.pdf | .docx | [ ] |
| md-to-pdf | server | test-fixtures/sample.md | .pdf | [ ] |
| rtf-to-pdf | server | test-fixtures/sample.rtf | .pdf | [ ] |
| odt-to-pdf | server | test-fixtures/sample.odt | .pdf | [ ] |
| xlsx-to-csv | client | test-fixtures/sample.xlsx | .csv | [ ] |
| csv-to-xlsx | client | test-fixtures/sample.csv | .xlsx | [ ] |
| docx-to-text | client | test-fixtures/sample.docx | .txt | [ ] |

## Text tools (client — 15)

| Slug | Input | Expected output | Status |
|------|-------|-----------------|--------|
| json-formatter | test-fixtures/sample.json | formatted JSON | [ ] |
| json-minify | test-fixtures/sample.json | minified JSON | [ ] |
| json-to-csv | `[{"a":1}]` | CSV | [ ] |
| csv-to-json | test-fixtures/sample.csv | JSON array | [ ] |
| base64-encode | `hello` | base64 string | [ ] |
| base64-decode | `aGVsbG8=` | `hello` | [ ] |
| url-encode | `a b` | encoded | [ ] |
| url-decode | `a%20b` | `a b` | [ ] |
| md5-hash | `test` | 32-char hex | [ ] |
| sha256-hash | `test` | 64-char hex | [ ] |
| qr-code-generator | `https://example.com` | .png | [ ] |
| word-counter | `one two three` | count report | [ ] |
| case-converter | `Hello World` | converted text | [ ] |
| markdown-to-html | `# Title` | .html | [ ] |
| html-to-text | `<p>Hi</p>` | plain text | [ ] |

## Regression checks

- [ ] `/login` returns 404
- [ ] `/pricing` returns 404
- [ ] `/dashboard` returns 404
- [ ] `/admin` returns 404
- [ ] `/blog` lists published posts from MongoDB
- [ ] `/blog/[slug]` renders a published post
- [ ] Batch image conversion + ZIP download works
- [ ] Client tools do not call `/api/conversions` (network tab)

## Running automated smoke tests

```bash
cd frontend && node scripts/verify-tools.mjs
```
