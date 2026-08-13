import type { ToolSeoMap } from "./types";

export const textToolContent: ToolSeoMap = {
  "json-formatter": {
    seoTitle: "JSON Formatter & Validator Online Free | ApkaOS Tools",
    seoDescription:
      "Format and validate JSON in your browser with ApkaOS. Free pretty-print, no signup, never uploaded. Fix indentation and spot JSON syntax errors instantly.",
    intro:
      "Pretty-print JSON in your browser on ApkaOS. Paste a minified payload or a messy API response, and the formatter indents objects, arrays, and keys so you can read them. Validation catches missing commas and unquoted keys before you ship the file. Everything stays on your device — nothing is uploaded. The tool is free and needs no account.",
    howToSteps: [
      "Open the JSON Formatter on ApkaOS. Processing never leaves this tab.",
      "Paste JSON, or drop a .json file if the page accepts one.",
      "Run format. Invalid JSON shows a parse error instead of silently rewriting your data.",
      "Copy the indented result or download it as a .json file.",
      "Paste the formatted text into your editor, ticket, or documentation.",
    ],
    benefits: [
      "100% browser-local — API payloads and secrets in JSON never hit ApkaOS servers.",
      "Free pretty-print with no signup and no watermark.",
      "Instant validation so a missing comma is obvious before a deploy.",
      "Works offline after the page loads; no CLI or IDE plugin required.",
    ],
    useCases: [
      "Read a minified REST or webhook body that arrived as one line.",
      "Clean JSON before pasting it into a GitHub issue or Confluence page.",
      "Check a Firebase, Stripe, or local config file for syntax errors.",
      "Compare two formatted documents visually after indenting both the same way.",
    ],
    guide: `## Why format JSON at all

JSON is the default for APIs, config files, and browser storage. Minified JSON is efficient on the wire and unreadable on a screen. A formatter adds consistent indentation and line breaks so objects, nested arrays, and long string values are scannable. ApkaOS JSON Formatter does that entirely in your browser with the built-in JSON parser. Nothing is uploaded. The tool is free and does not require an account.

This is not a linter for schema (required keys, types). It only asks: is this valid JSON, and can we reprint it with whitespace? For schema checks, use a JSON Schema validator in your project. For smaller files on the wire, use JSON Minify on the same site — the inverse operation, also local.

## What “valid JSON” means here

The parser follows standard JSON: double-quoted keys and strings, no trailing commas, no comments, no undefined, no single quotes. JavaScript object literals that work in a .js file often fail here. That is correct. If you need to accept JSONC or JSON5, strip comments in your editor first or use a dedicated JSONC tool.

Numbers stay numbers. Large integers above Number.MAX_SAFE_INTEGER can lose precision in JavaScript. If you are formatting bank IDs or snowflake IDs, treat them as strings in the source JSON. The formatter will not silently convert types; it reprints what the parser accepted.

Unicode in strings is preserved. Escapes like \\n stay valid JSON escapes after round-trip in most engines. You do not need to HTML-escape the output unless you are embedding it in a web page.

## Errors and how to read them

A parse error usually names a position. Look one token earlier: a missing comma after a value, an extra comma after the last property, or a key without quotes. Copy the snippet around that index into a smaller test. Do not “fix” JSON by adding quotes around the entire blob.

If the input is empty, you get an error, not an empty object. If you paste XML, YAML, or a Python dict, it will fail — convert those formats properly instead of hoping a formatter will guess.

## Privacy

Logs and API responses often contain tokens, emails, and PII. Because formatting is local, you can pretty-print production payloads on a locked-down laptop without sending them to an online “JSON viewer” that stores pastes. ApkaOS does not keep a history of what you typed.

Very large documents (tens of megabytes) can freeze a tab. Pretty-printing multiplies size with whitespace. For huge files, use jq or a desktop editor. This page is for the everyday payload: a few kilobytes to a couple of megabytes.

## After you format

Copy with confidence into git. Set your editor to the same indent (2 spaces is common) so diffs stay small. If you need CSV rows from an array of objects, use JSON to CSV next. If you only needed to shrink the file again, run JSON Minify.

ApkaOS is a convenience formatter, not a JSON database. Keep source of truth in your repo.`,
    tips: [
      "If parse fails, you likely have a trailing comma, a comment, or single-quoted keys — those are not JSON.",
      "Keep large numeric IDs as strings in JSON to avoid JavaScript precision loss.",
      "Do not paste secrets into a formatter that uploads; this one does not upload, but your clipboard still exists.",
      "Use 2-space indent if the result will be committed next to typical JavaScript projects.",
      "Minify before shipping to production; keep the formatted copy for humans.",
    ],
    faq: [
      {
        question: "Is my JSON uploaded to ApkaOS?",
        answer:
          "No. Formatting and validation run in your browser. The payload never leaves your device.",
      },
      {
        question: "Does the formatter accept comments or trailing commas?",
        answer:
          "No. Standard JSON forbids both. Remove comments and extra commas, or use a JSONC-aware tool first.",
      },
      {
        question: "Is it free? Do I need an account?",
        answer:
          "Yes. The JSON Formatter on apkaos.in is free with no signup.",
      },
      {
        question: "Will formatting change my data?",
        answer:
          "It only changes whitespace. Keys, values, and types stay the same, aside from JavaScript number precision on huge integers.",
      },
      {
        question: "Can I format a .json file from disk?",
        answer:
          "Paste the contents or use a file input if the page provides one. Processing still happens locally.",
      },
      {
        question: "How is this different from JSON Minify?",
        answer:
          "Formatter adds whitespace for reading. Minify removes it for smaller payloads. Both are browser-local on ApkaOS.",
      },
    ],
    searchKeywords: [
      "json formatter",
      "json pretty print",
      "json validator",
      "format json online",
      "beautify json",
      "json formatter no upload",
      "json formatter apkaos",
    ],
  },

  "json-minify": {
    seoTitle: "JSON Minify Online — Compact JSON Free | ApkaOS Tools",
    seoDescription:
      "Minify JSON in your browser with ApkaOS. Strip whitespace, keep valid JSON, never upload. Free, no signup. Smaller payloads for APIs, config, and storage.",
    intro:
      "Compress JSON by removing unnecessary whitespace in your browser on ApkaOS. Minify turns a pretty-printed document into a single compact payload without changing keys or values. Nothing is uploaded. The tool is free and needs no account. Use it before embedding JSON in a script tag, shipping a config, or trimming localStorage — not as a substitute for gzip on the server.",
    howToSteps: [
      "Open JSON Minify on ApkaOS. The text stays in this tab.",
      "Paste formatted JSON or a file’s contents.",
      "Run minify. Invalid JSON is rejected; the tool will not emit broken output.",
      "Copy the compact string or download it.",
      "Use JSON Formatter if you need to read the result again later.",
    ],
    benefits: [
      "Browser-local — configs and tokens in JSON are not sent to a server.",
      "Free, no signup, no watermark (text cannot carry one).",
      "Guarantees the output still parses as JSON, unlike naive space-stripping.",
      "Pairs with the formatter so you can expand and collapse the same document.",
    ],
    useCases: [
      "Shrink a fixture file before committing it to a mobile app bundle.",
      "Prepare a compact JSON body for a curl example or a webhook tester.",
      "Trim a GeoJSON or translation file where every kilobyte matters on first load.",
      "Store a settings blob in localStorage closer to the quota limit.",
    ],
    guide: `## Minify is not encryption and not gzip

Removing spaces, tabs, and newlines from JSON makes the text shorter. It does not hide data, and it is weaker than HTTP gzip or Brotli, which your server should still enable. Use ApkaOS JSON Minify when you need the JSON text itself to be compact: inline config, a file on disk, or a message body you will paste somewhere that does not compress. Everything runs in the browser. Nothing is uploaded. The tool is free and needs no account.

The correct way to minify JSON is parse-then-stringify with no extra whitespace. Deleting spaces with a regex can break strings that contain spaces you actually need. ApkaOS parses first; if the input is invalid, you get an error instead of a corrupted file.

## What stays, what goes

Keys, strings, numbers, booleans, null, and nesting are unchanged. Indentation and extra blank lines disappear. The order of object keys follows what the JavaScript parser emitted (generally insertion order for ordinary objects). Do not rely on minify to sort keys; if you need canonical JSON for hashing, sort keys in code.

String contents keep their spaces. "hello world" remains "hello world". Only insignificant whitespace between tokens is removed.

Comments are not JSON. They must be gone before minify, or parse fails. Trailing commas fail the same way.

## Size expectations

Pretty-printed JSON with 2-space indent is often 20–40% larger than minified, more if it was deeply nested with short keys. After minify, gzip on the wire still helps a lot because keys repeat. Minify plus gzip is normal for production APIs; minify alone is for places without a compressor.

Huge integers have the same precision caveat as the formatter: JavaScript numbers are IEEE doubles. Snowflake IDs should be strings.

## Privacy and limits

Minifying in the browser means you can compact a file that contains credentials without sending it to a website that logs pastes. Still, do not paste production secrets into a shared screen.

Very large documents can stall the tab. Use jq -c or a build step in CI for multi-megabyte artifacts.

## After you minify

Put the compact file behind gzip in production. Keep a formatted copy in git if humans edit it; many teams store formatted JSON and minify at build time. If you minified only to share a snippet, say so — a one-line blob is hostile in code review.

Need rows for Excel? JSON to CSV wants an array of objects and is also local. Need to inspect the minified result? Paste it into JSON Formatter.`,
    tips: [
      "Never strip spaces with find-and-replace; parse and serialize so strings stay intact.",
      "Keep formatted JSON in git and minify in the build if people edit the file.",
      "Enable gzip or Brotli on the server; minify does not replace transport compression.",
      "If minify fails, fix JSON syntax first — comments and trailing commas are the usual culprits.",
      "Treat huge integer IDs as strings before you round-trip through the browser parser.",
    ],
    faq: [
      {
        question: "Does JSON Minify upload my data?",
        answer:
          "No. Parse and compact stringify run in your browser on ApkaOS.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup and no charge.",
      },
      {
        question: "Will minify remove spaces inside strings?",
        answer:
          "No. Only whitespace between JSON tokens is removed. String values are unchanged.",
      },
      {
        question: "Can I minify JSON with comments?",
        answer:
          "Not directly. Comments are not valid JSON. Strip them first, then minify.",
      },
      {
        question: "Does this encrypt or obfuscate JSON?",
        answer:
          "No. Anyone can format it again. Minify is size, not security.",
      },
      {
        question: "How is this different from gzip?",
        answer:
          "Minify shortens the JSON text. Gzip is a separate compression layer on the network. Use both for APIs; use minify when the text itself must be small.",
      },
    ],
    searchKeywords: [
      "json minify",
      "minify json online",
      "compress json",
      "json compact",
      "remove whitespace json",
      "json minify in browser",
      "json minify apkaos",
    ],
  },

  "json-to-csv": {
    seoTitle: "JSON to CSV Converter in Browser Free | ApkaOS Tools",
    seoDescription:
      "Convert JSON arrays to CSV in your browser with ApkaOS. Free, no signup, never uploaded. Flatten objects into spreadsheet-ready rows and columns for Excel.",
    intro:
      "Turn a JSON array of objects into a CSV table in your browser on ApkaOS. Each object becomes a row; keys become column headers. Nested objects need flattening or they will not look like a sheet. Nothing is uploaded. The tool is free and needs no account. Use it when an API gave you JSON and Excel, Sheets, or a database import wants CSV.",
    howToSteps: [
      "Open JSON to CSV on ApkaOS. Conversion stays in the browser.",
      "Paste a JSON array of objects (not a single object unless the tool wraps it).",
      "Convert. Check that headers match the keys you care about.",
      "Download the CSV and open it in Excel, Google Sheets, or a text editor.",
      "If nested fields are missing, flatten the JSON in code or pick a shallower payload.",
    ],
    benefits: [
      "100% local — API dumps never leave your device.",
      "Free conversion with no signup.",
      "Produces a real CSV you can import into spreadsheets and databases.",
      "Faster than rewriting a one-off script for a small export.",
    ],
    useCases: [
      "Export a list of users or orders from an API response into Excel for a manager.",
      "Turn a JSON fixture of products into a CSV for a bulk-upload template.",
      "Share analytics events with a colleague who only works in spreadsheets.",
      "Prep an array of objects for a SQL COPY or pandas read_csv.",
    ],
    guide: `## JSON trees versus CSV rectangles

JSON can nest. CSV cannot, not without conventions. JSON to CSV on ApkaOS expects a list of similar objects and writes one row per object. Top-level keys become headers. Nested objects and arrays are either flattened with a separator, stringified, or omitted — depending on how the converter is implemented. Plan for a flat shape: id, name, email, not user.profile.address.city unless flattening is documented in the UI.

Everything runs in your browser. Nothing is uploaded. The tool is free and needs no account.

A single object is not a table. Wrap it in an array [ { ... } ] if you have one record. A JSON array of strings or numbers becomes a one-column sheet at best. An object whose values are arrays (a map of lists) is the wrong shape; invert it in code first.

## Headers, missing keys, and types

Union of keys across all objects is the usual header set. Row 1 might lack "phone" while row 2 has it; the first row still gets an empty phone cell. That is correct CSV.

Booleans and numbers become their text forms (true, 3.14). null becomes an empty cell or the word null — check a sample row. Dates that are ISO strings stay strings; Excel may parse them on open.

Commas and quotes inside values are escaped with CSV quoting rules. Newlines inside a JSON string become a quoted multiline field, which some importers dislike. Replace newlines if the destination is picky.

## What this tool is not

It is not a general ETL mapper. It will not join two arrays, will not explode a nested array into extra rows (unless a specific flatten mode says so), and will not apply JSONPath. For those jobs, use a script. It is also not XLSX — you get CSV. Open it in Excel or send it through CSV to XLSX (also local on ApkaOS) if you need a workbook.

Deep GeoJSON, GraphQL blobs, and arbitrary nested documents are a poor fit. Extract the array you actually need with JSON Formatter + a small edit, then convert.

## Privacy and size

Because conversion is local, you can turn a production export into CSV on your laptop without sending PII to a converter site. Large arrays (hundreds of thousands of rows) may hit memory limits in the tab. Split the JSON or use a command-line tool.

## After you download

Open the CSV as UTF-8. Confirm the header row. If a column shifted, a value probably contained an unescaped quote in the source — fix the JSON string. Keep the JSON as the structured source of truth; CSV is a projection.

Going the other way: CSV to JSON on ApkaOS rebuilds an array of objects from rows. Round-trips lose types (everything comes back as strings unless you coerce) and lose nested structure you flattened away.`,
    tips: [
      "Start from an array of flat objects. Nesting does not belong in CSV without a flatten step.",
      "Wrap a single record in [ ] if you only have one object.",
      "Open the CSV as UTF-8 so names and rupee notes stay intact.",
      "Use CSV to XLSX afterwards if the recipient needs Excel, not a text file.",
      "Split huge arrays; the browser tab has less RAM than a Python process.",
    ],
    faq: [
      {
        question: "Is the JSON uploaded?",
        answer:
          "No. JSON to CSV runs entirely in your browser on ApkaOS.",
      },
      {
        question: "What JSON shape works best?",
        answer:
          "An array of objects with similar keys, for example [{id, name}, {id, name}]. Nested documents may stringify or drop nested fields.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Will nested arrays become extra rows?",
        answer:
          "Usually not. Nested arrays are not automatically exploded into child rows. Flatten or unwrap them first if you need one row per item.",
      },
      {
        question: "Can I get an Excel file directly?",
        answer:
          "This tool outputs CSV. Convert that file with CSV to XLSX on ApkaOS (also browser-local) if you need .xlsx.",
      },
      {
        question: "How are null and booleans exported?",
        answer:
          "Booleans become true/false text. null is typically an empty cell or the word null — check one row before you import a large file.",
      },
    ],
    searchKeywords: [
      "json to csv",
      "convert json array to csv",
      "json to spreadsheet",
      "json to csv online",
      "json to csv in browser",
      "free json csv converter",
      "json to csv apkaos",
    ],
  },

  "csv-to-json": {
    seoTitle: "CSV to JSON Converter in Browser Free | ApkaOS Tools",
    seoDescription:
      "Convert CSV to JSON in your browser with ApkaOS. Free, no signup, never uploaded. Header row becomes object keys; each record is a JSON object for APIs.",
    intro:
      "Turn a CSV table into a JSON array of objects in your browser on ApkaOS. The first row becomes keys; every following row becomes an object. Nothing is uploaded. The tool is free and needs no account. Use it to feed a web app, a mock API, or a script when your data started life in Excel or a bank export.",
    howToSteps: [
      "Open CSV to JSON on ApkaOS. Parsing stays in this tab.",
      "Paste CSV or select a .csv file. Confirm the first row is a header.",
      "Convert to JSON. Each data row should become one object.",
      "Copy or download the JSON. Pretty-print it with JSON Formatter if you want to inspect it.",
      "Coerce types in your app if you need numbers and booleans instead of strings.",
    ],
    benefits: [
      "Browser-local — bank CSVs and contact lists never hit a server.",
      "Free, no signup, no watermark.",
      "Produces standard JSON that any language can parse.",
      "Avoids Excel’s JSON export quirks and encoding dialogs.",
    ],
    useCases: [
      "Turn a Google Sheets export into mock data for a frontend prototype.",
      "Load a product catalog CSV into a Node or Python script as JSON.",
      "Convert a class roster for a small static site that reads a JSON file.",
      "Prepare seed data for a test database from an operations spreadsheet.",
    ],
    guide: `## Rows become objects

CSV is a rectangle: headers on row one, values below. CSV to JSON on ApkaOS maps that rectangle into [{ "Header": "value", ... }, ...]. Conversion runs in your browser. Nothing is uploaded. The tool is free and needs no account.

If there is no header row, you will get keys like 0, 1, 2 or field1 — add a header in a text editor first. Duplicate headers collide; rename columns so each key is unique.

Delimiter issues are the same as CSV to XLSX: semicolon-separated European exports look like one column. Fix the delimiter before converting.

## Types: everything starts as a string

CSV has no types. "42" stays a string unless the converter tries to guess. Guessing is dangerous (leading zeros on PIN codes). Prefer strings in the JSON and coerce in your application, or only enable numeric detection if you trust the column.

Empty cells become "" or are omitted from the object. Decide which your consumer wants. Boolean-looking values (true, false, yes, no) usually remain strings.

UTF-8 is the right encoding. If names break, re-save the CSV as UTF-8.

Quoted commas and newlines inside fields should parse as a single value. Broken quotes in the source will shift keys. Validate with a small sample.

## Shape choices

An array of objects is the default and what JSON to CSV on ApkaOS expects on the way back. Some tools offer an array of arrays (no keys) or a single object keyed by the first column. Use array-of-objects unless you have a reason not to.

This is not a schema generator and not TypeScript. It will not infer interfaces. It will not nest columns like address.city unless the CSV already used a convention and the UI flattens/unflattens that way.

## Privacy and scale

Local conversion is appropriate for payroll and student lists. Do not use an uploading converter for those files. Very large CSVs can freeze the tab; stream them with a script instead.

## After you convert

Run JSON Formatter to read the result. Minify if you will embed it. If you need Excel again, you already had CSV — or use CSV to XLSX. Round-tripping CSV → JSON → CSV should preserve headers and values if types were left as strings; nested JSON you add by hand will not survive a trip back to CSV without flattening.

ApkaOS does not host your JSON. Copy it into the project that needs it.`,
    tips: [
      "Put a unique header on every column before converting.",
      "Treat values as strings in JSON unless you are sure numeric inference will not drop leading zeros.",
      "Fix semicolon-delimited files before you expect multiple keys per row.",
      "Save the CSV as UTF-8 so converted JSON keeps non-English names.",
      "Pretty-print the result with JSON Formatter to verify a few rows by eye.",
    ],
    faq: [
      {
        question: "Does CSV to JSON upload my file?",
        answer:
          "No. Parsing runs in your browser. ApkaOS never receives the CSV.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No account required on apkaos.in.",
      },
      {
        question: "Why is every value a string in the JSON?",
        answer:
          "CSV has no types. Keeping strings avoids destroying leading zeros. Parse numbers in your application when you know the column.",
      },
      {
        question: "What if my CSV has no header row?",
        answer:
          "Add one. Without headers, keys will be generic and the JSON will be harder to use.",
      },
      {
        question: "Can I convert TSV?",
        answer:
          "This page expects comma-separated values. Replace tabs with commas carefully (or use a TSV parser) before converting.",
      },
      {
        question: "How do I get nested JSON from columns?",
        answer:
          "This converter builds a flat object per row. Nest in code after, or reshape the CSV first. It is not a full mapping language.",
      },
    ],
    searchKeywords: [
      "csv to json",
      "convert csv to json",
      "csv to json array",
      "spreadsheet to json",
      "csv to json online",
      "csv to json in browser",
      "csv to json apkaos",
    ],
  },

  "base64-encode": {
    seoTitle: "Base64 Encode Text Online Free, No Signup | ApkaOS",
    seoDescription:
      "Encode text to Base64 in your browser with ApkaOS. Free, no signup, never uploaded. Encoding is not encryption — anyone can decode the result in one click.",
    intro:
      "Convert text to Base64 in your browser on ApkaOS. Encoding turns bytes into an A–Z, a–z, 0–9, +, / alphabet (with = padding) so you can embed data in JSON, data URLs, or email-safe strings. It is not encryption and not hashing. Nothing is uploaded. The tool is free and needs no account. Decode with the companion Base64 Decode page.",
    howToSteps: [
      "Open Base64 Encode on ApkaOS. Encoding runs locally in this tab.",
      "Paste the text you want to encode (UTF-8 is the usual interpretation).",
      "Encode. Copy the ASCII Base64 string that appears.",
      "Paste it into a data URL, a JSON field, or a config file that requires Base64.",
      "Use Base64 Decode when you need the original text back.",
    ],
    benefits: [
      "100% browser-local — source text never leaves your device.",
      "Free, no signup.",
      "Uses standard Base64 so other languages’ decoders will accept the output.",
      "Paired decode tool on ApkaOS for a full round-trip.",
    ],
    useCases: [
      "Embed a small SVG or snippet in a data: URL during front-end work.",
      "Prepare a Basic auth header (remember: Base64 is not a secret).",
      "Put UTF-8 text into a system that only allows ASCII tokens.",
      "Encode a JSON blob that must travel inside a query parameter or XML text node.",
    ],
    guide: `## Encoding is not encryption

Base64 maps every three bytes to four ASCII characters. Anyone who sees the string can decode it in one click. Do not treat Base64 as a way to hide passwords, API keys, or personal data. If you need confidentiality, use TLS in transit and a real cipher at rest. ApkaOS Base64 Encode only transforms representation. It runs in your browser, uploads nothing, is free, and needs no account.

HTTP Basic authentication uses Base64(username:password). That is a transport convention, not protection — it must only be used over HTTPS, and it is still not a substitute for OAuth or hashed passwords on a server.

## UTF-8 and binary

This page encodes text. The browser treats your paste as Unicode and typically encodes the UTF-8 bytes. That is what you want for ordinary copy. If you need to encode a file (a PNG, a PDF), a dedicated file-to-Base64 tool is more appropriate; pasting binary into a text box will corrupt it.

Output uses the standard alphabet + and / with = padding. URL-safe Base64 replaces those with - and _ and may drop padding. If a JWT or a URL rejects your string, you may need the URL-safe variant — this encoder is the classic MIME-style alphabet unless the UI says otherwise.

Line breaks every 76 characters appear in some MIME encoders. Modern APIs usually want a single line. If a decoder complains about whitespace, strip newlines.

## Size and performance

Base64 expands data by about 33%. A 300-character string becomes about 400 characters. That is expected. Do not Base64 large files in a text box; the tab will grow quickly.

Round-trip: encode here, decode on Base64 Decode. If the decoded text has replacement characters, the original was not UTF-8 text or the string was truncated (missing padding).

## Privacy

Because encoding is local, you can Base64 a draft email or a token without sending it to a paste site. The output is still readable by anyone with a decoder, including anyone looking at your screen.

Do not confuse this with hashing (MD5, SHA-256 on ApkaOS). Hashes are one-way fingerprints. Base64 is two-way. Do not confuse it with URL encode either — percent-encoding is a different mapping for URLs.

## When Base64 is the wrong tool

If you need a checksum, use SHA-256 (or MD5 only for a legacy checksum). If you need to put a name in a query string, use URL Encode. If you need to hide a secret, use encryption and TLS, not an alphabet change. Base64 shows up in PEM certificates, SMTP attachments, and JSON web tokens as a wrapper — the wrapper is not the security.

ApkaOS does not store what you encode. Copy the string into the system that asked for Base64 and delete it from shared chats if it wraps a token.`,
    tips: [
      "Never use Base64 to “hide” passwords or secrets — decoding is trivial.",
      "Assume UTF-8 input. Do not paste raw binary into a text encoder.",
      "If a URL or JWT rejects + or /, you need URL-safe Base64, not the MIME alphabet.",
      "Expect the output to be about one-third longer than the input bytes.",
      "Use Base64 Decode on ApkaOS to verify a round-trip before you ship the string.",
    ],
    faq: [
      {
        question: "Is Base64 encoding done on a server?",
        answer:
          "No. ApkaOS encodes in your browser. Text is never uploaded.",
      },
      {
        question: "Is Base64 encryption?",
        answer:
          "No. It is a reversible encoding. Anyone can decode the string. Use HTTPS and real cryptography for secrets.",
      },
      {
        question: "Is the tool free?",
        answer:
          "Yes. No signup on apkaos.in.",
      },
      {
        question: "Why does my decoder show garbled characters?",
        answer:
          "The string may be truncated, use a different alphabet (URL-safe), or the original bytes were not UTF-8 text.",
      },
      {
        question: "Can I encode files, not just text?",
        answer:
          "This page is a text encoder. Pasting binary will break it. Use a file-oriented Base64 utility for images and PDFs.",
      },
      {
        question: "How is this different from URL Encode?",
        answer:
          "URL encoding percent-encodes characters for query strings. Base64 maps arbitrary bytes to a 64-character alphabet. They solve different problems.",
      },
    ],
    searchKeywords: [
      "base64 encode",
      "encode text to base64",
      "base64 encoder online",
      "utf8 to base64",
      "base64 encode in browser",
      "free base64 encoder",
      "base64 encode apkaos",
    ],
  },

  "base64-decode": {
    seoTitle: "Base64 Decode Text Online Free, No Signup | ApkaOS",
    seoDescription:
      "Decode Base64 to text in your browser with ApkaOS. Free, no signup, never uploaded. Reverses standard Base64 — not a way to crack encryption or hashes.",
    intro:
      "Decode a Base64 string back to text in your browser on ApkaOS. Paste an encoded payload from an API, a data URL, or an email, and read the original UTF-8 text. Decoding is the reverse of encoding, not a cryptographic attack. Nothing is uploaded. The tool is free and needs no account. Encode again with Base64 Encode if you need to go the other way.",
    howToSteps: [
      "Open Base64 Decode on ApkaOS. Decoding stays in this tab.",
      "Paste the Base64 string. Strip data:image/...;base64, prefixes if you only want the payload, or keep them out of the decoder input.",
      "Decode. Invalid characters or bad padding produce an error instead of garbage.",
      "Read or copy the recovered text.",
      "If you expected a file (PNG, PDF), this text view is the wrong tool — use a file decoder.",
    ],
    benefits: [
      "Browser-local decode — tokens and message bodies stay on your device.",
      "Free, no signup.",
      "Rejects malformed strings instead of silently emitting junk when possible.",
      "Matches the ApkaOS encoder so round-trips work for UTF-8 text.",
    ],
    useCases: [
      "Read a Base64 field in a JSON log without writing a one-liner in a REPL.",
      "Inspect a Basic auth header you own (user:pass is still not a stored-password hash).",
      "Recover text that a teammate sent as Base64 in chat.",
      "Check whether a string is actually Base64 before you paste it into production config.",
    ],
    guide: `## What decoding does

Base64 decode maps four ASCII characters back to three bytes, then those bytes are shown as text (UTF-8). ApkaOS does this in your browser. Nothing is uploaded. The tool is free and needs no account. If the bytes are not valid UTF-8, you may see replacement characters — the data might be a file, not a sentence.

Decoding is not “breaking” encryption, hashing, or password storage. Encrypted blobs that happen to be Base64-wrapped still need the key. MD5 and SHA-256 hashes are not Base64 of the password; they are one-way digests (and MD5 must not be used for passwords anyway).

## Prefixes, whitespace, and alphabets

Data URLs look like data:text/plain;base64,SGVsbG8=. The decoder wants SGVsbG8=, not the data: prefix. JWT parts use URL-safe Base64 without padding; a standard decoder may fail on - and _ or missing =. Replace - with +, _ with /, and add padding to a multiple of 4 if you are unwrapping a JWT payload by hand. This page targets classic Base64 unless the UI states URL-safe support.

Whitespace and line breaks in MIME-wrapped strings should be ignored by a tolerant decoder. If yours is strict, delete newlines first.

Invalid characters (!, unicode quotes copied from Slack) cause failure. Re-copy the string from source.

## Padding

Base64 length should be a multiple of 4. Missing = padding is common. Adding = until the length is divisible by 4 often fixes it. Extra characters at the end usually mean a copy-paste included a trailing quote.

## Privacy and safety

You might decode something that contains a secret. Because the tool is local, ApkaOS never sees it. You still should not paste other people’s credentials into a shared screen.

Do not decode untrusted Base64 and then execute it as HTML or a script. Treat the output like any untrusted text.

## After you decode

If the result looks like JSON, run JSON Formatter. If it looks like a URL, you are done. If it looks like binary noise, it was probably an image or protobuf — save those bytes with a file-oriented tool, not a text box.

To go the other way, use Base64 Encode. Round-trip only holds for the same alphabet and UTF-8 text.

## Common payloads you will see

API logs often Base64-wrap small JSON blobs. Decode, then run JSON Formatter. Email MIME parts may include line-wrapped Base64; strip whitespace if the decoder is strict. Browser data URLs mix a media type with a payload — only the part after the comma is Base64. None of these are encrypted. If the decoded bytes look like a ZIP or PNG header, save them as a file instead of reading them as a paragraph.

ApkaOS never logs the string. Treat the output like the original secret if the payload contained one.`,
    tips: [
      "Strip data: and ;base64, prefixes before pasting into a raw decoder.",
      "JWT segments need URL-safe handling and padding; they are not always classic Base64.",
      "Missing = padding is a common copy-paste issue — length should be a multiple of four.",
      "Garbled output often means the bytes are a file, not UTF-8 text.",
      "Decoding is not decrypting. Ciphertext still needs a key.",
    ],
    faq: [
      {
        question: "Does Base64 Decode upload my string?",
        answer:
          "No. Decoding runs in your browser on ApkaOS.",
      },
      {
        question: "Can this decrypt encrypted data?",
        answer:
          "No. It only reverses Base64 encoding. Encryption, hashing, and password storage are different.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Why do I get an error or empty output?",
        answer:
          "The string may use the URL-safe alphabet, lack padding, include a data-URL prefix, or contain invalid characters from chat formatting.",
      },
      {
        question: "Why is the decoded text full of odd symbols?",
        answer:
          "Those bytes are probably not UTF-8 text (for example an image). Use a file decoder, not a text decoder.",
      },
      {
        question: "Will this decode MD5 or SHA-256 hashes?",
        answer:
          "No. Hashes are not Base64 of the original text and cannot be reversed here. Use the hash tools only to generate fingerprints.",
      },
    ],
    searchKeywords: [
      "base64 decode",
      "decode base64 online",
      "base64 to text",
      "base64 decoder",
      "base64 decode in browser",
      "free base64 decode",
      "base64 decode apkaos",
    ],
  },

  "url-encode": {
    seoTitle: "URL Encode / Percent-Encode Online Free | ApkaOS Tools",
    seoDescription:
      "Percent-encode text for URLs in your browser with ApkaOS. Free, no signup, never uploaded. Safe query strings without breaking &, ?, or spaces in links.",
    intro:
      "Percent-encode text for use in URLs in your browser on ApkaOS. Spaces become %20 (or + in form style), and reserved characters are escaped so a query parameter cannot break the rest of the link. This is not Base64 and not encryption. Nothing is uploaded. The tool is free and needs no account. Decode with URL Decode when you need the original string.",
    howToSteps: [
      "Open URL Encode on ApkaOS. Encoding runs locally.",
      "Paste the parameter value — the search term, name, or path segment, not necessarily the entire URL.",
      "Encode. Copy the percent-encoded result.",
      "Insert it into your query string or path. Do not encode the entire URL including https:// unless you intend to nest a URL as data.",
      "Use URL Decode to reverse a string you received.",
    ],
    benefits: [
      "Browser-local — query values never leave your device.",
      "Free, no signup.",
      "Prevents broken links when names contain spaces, ampersands, or non-ASCII text.",
      "Companion decoder on ApkaOS for inspecting incoming query strings.",
    ],
    useCases: [
      "Build a search URL that contains Hindi, emoji, or spaces.",
      "Put an email address or full name into a query parameter without breaking the & separators.",
      "Encode a nested URL that must travel as a single redirect parameter.",
      "Prepare application/x-www-form-urlencoded bodies for a manual POST test.",
    ],
    guide: `## Why URLs need encoding

A URL uses ?, &, =, #, and / as syntax. If a search term contains & or a space, the browser (or a naive string concat) will split the query in the wrong place. Percent-encoding replaces unsafe bytes with %HH sequences (UTF-8 then hex). ApkaOS URL Encode does that in your browser. Nothing is uploaded. The tool is free and needs no account.

Encode values, not whole URLs, in the common case. Encoding https://apkaos.in/tools into a redirect parameter is correct. Encoding the entire address bar including the scheme will turn : and / into %3A and %2F and the link will not navigate until something decodes it.

## encodeURIComponent versus forms

In JavaScript, encodeURIComponent is the right default for query values: spaces become %20, and characters like & = ? are escaped. application/x-www-form-urlencoded (HTML forms) historically uses + for space. If a server expects +, you may need that variant. This page follows percent-encoding suitable for query components unless the UI labels a form mode.

Do not encode an already encoded string a second time unless you are double-encoding on purpose (rare). %20 becoming %2520 is the usual bug when someone encodes twice.

Non-ASCII text is first expressed as UTF-8 bytes. Hindi, accents, and emoji are valid in modern IRIs but many backends still want percent-encoded UTF-8. Encoding is the safe choice for APIs.

## What this is not

It is not Base64. It is not hashing. It does not make a URL “secret.” A percent-encoded token in a query string still appears in logs and Referer headers. Prefer headers or POST bodies for credentials.

It also does not validate that the result is a legal URL. You can encode any text, including junk.

## Privacy

Local encoding means you can prepare a query that contains a customer name without sending it to a third-party encoder. The finished URL may still leak in analytics — that is a product choice, not a failure of this tool.

## After you encode

Paste into the query, test in a browser, and confirm the server decoded once. If you see pluses where you wanted spaces, check form-encoding versus %20. Use URL Decode on ApkaOS to inspect a captured request.

## Path segments versus query values

Path encoding is stricter about some characters than query encoding. A space in a path should be %20, not +. Reserved characters that are allowed in a path (such as unencoded slashes) must not be encoded if they are meant as separators. When in doubt, encode each path segment separately and join with /. Hash fragments after # are not sent to servers; encoding them only affects client-side routers.

ApkaOS does not fetch the URL you build. You still need to test the finished link in a browser.`,
    tips: [
      "Encode parameter values, not the entire https:// URL, unless the whole URL is itself a value.",
      "Avoid double-encoding; %20 should not become %2520.",
      "Spaces may be %20 or + depending on query versus form encoding — match what the server expects.",
      "Percent-encoding is not security. Do not put passwords in query strings.",
      "Use UTF-8. Mixing Latin-1 percent-encoding with UTF-8 servers causes mojibake.",
    ],
    faq: [
      {
        question: "Is URL encoding done on a server?",
        answer:
          "No. ApkaOS percent-encodes in your browser. Nothing is uploaded.",
      },
      {
        question: "Is this the same as Base64?",
        answer:
          "No. URL encoding uses %HH sequences for unsafe characters. Base64 uses a 64-character alphabet for arbitrary bytes.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup on apkaos.in.",
      },
      {
        question: "Should I encode a full URL or just the query value?",
        answer:
          "Usually just the value. Encode a full URL only when that URL is data inside another parameter (for example a redirect target).",
      },
      {
        question: "Why did my server receive %2520?",
        answer:
          "The value was encoded twice. Decode once or skip encoding if the framework already encodes.",
      },
      {
        question: "Does encoding hide personal data in the URL?",
        answer:
          "No. Encoded text is still in the URL, logs, and history. It is only escaped for syntax, not confidentiality.",
      },
    ],
    searchKeywords: [
      "url encode",
      "percent encode",
      "encodeuri component",
      "query string encode",
      "url encoder online",
      "url encode in browser",
      "url encode apkaos",
    ],
  },

  "url-decode": {
    seoTitle: "URL Decode Percent-Encoding Online Free | ApkaOS Tools",
    seoDescription:
      "Decode percent-encoded URL text in your browser with ApkaOS. Free, no signup, never uploaded. Turn %20 and %26 back into readable query values and paths.",
    intro:
      "Decode percent-encoded URL text in your browser on ApkaOS. Paste a query value or a full encoded string and recover spaces, ampersands, and UTF-8 characters. Useful when you are reading logs, debugging a redirect, or copying a messy address bar. Nothing is uploaded. The tool is free and needs no account. Encode with URL Encode when you are building a link.",
    howToSteps: [
      "Open URL Decode on ApkaOS. Decoding stays in this tab.",
      "Paste the encoded fragment. You can paste a whole query string if you only need to read it.",
      "Decode. %20 becomes a space, %26 becomes &, and UTF-8 sequences become characters.",
      "Copy the readable text. Decode a second time only if the value was double-encoded.",
      "Do not treat the result as a verified safe URL — it is just text.",
    ],
    benefits: [
      "Local decode — captured query strings never leave your device.",
      "Free, no signup.",
      "Makes server logs and analytics dumps readable.",
      "Pairs with URL Encode so you can test both directions.",
    ],
    useCases: [
      "Read a search term from an access log that stored the raw query string.",
      "Debug a redirect parameter that looks like https%3A%2F%2F…",
      "Recover a filename or Hindi title that arrived as percent-encoded UTF-8.",
      "Check whether a value was double-encoded before you file a backend ticket.",
    ],
    guide: `## Reading what the address bar hid

Percent-encoding is how URLs carry bytes that would otherwise be syntax. URL Decode on ApkaOS reverses %HH sequences (and often + to space for form-encoded data) in your browser. Nothing is uploaded. The tool is free and needs no account.

If you paste a full URL, only the encoded parts change; already-plain characters stay. If you paste only q=foo%20bar, you get the decoded value (or the whole snippet decoded — either way you can read it).

## Plus, percent, and UTF-8

In query strings from HTML forms, + means space. In path segments, + is a plus. A practical decoder treating input as a query value will turn + into space. If you needed a literal plus, it should have been %2B.

Invalid % sequences (a % not followed by two hex digits) should error or leave that part unchanged. Do not “fix” them by guessing.

UTF-8 multi-byte characters are several %HH tokens. Decoding them together yields one character. Mixed encodings (UTF-8 plus leftover Latin-1) produce mojibake; recapture the original bytes if you can.

Double-encoded values need two passes: %2520 → %20 → space. Stop when the text looks like what a human typed. Extra passes can corrupt % that were meant to stay literal.

## Security notes

Decoding is not sanitizing. The result might contain <script>, javascript: URLs, or CRLF. Do not paste decoded text into HTML unescaped and do not fetch a decoded URL you do not trust. This tool does not check phishing; it only changes encoding.

Query strings can contain tokens. Local decode keeps them on your machine, but your screen and clipboard are still in play.

## After you decode

If the result is JSON, format it. If it is Base64, decode that next. If you need to put the value back into a URL, use URL Encode once — not by hand.

## Reading real-world query strings

Access logs often store the raw request target. You might see q=caf%C3%A9&redirect=https%3A%2F%2Fexample.com%2Fpath. Decoding once yields café and a nested URL. If the nested URL is still encoded, that parameter was double-wrapped on purpose — decode that value separately, not the whole line twice blindly.

Plus signs in emails copied from HTML can be real pluses in phone numbers. If a decoded phone number lost a +, the log used form-encoding. Prefer %2B in APIs you control so the meaning is unambiguous.

Broken copies from chat apps replace % with a fullwidth percent or insert zero-width spaces. Those will not decode. Re-copy from the server log or the address bar.

ApkaOS does not log the strings you decode. Use the readable text to fix the bug, then encode again when you rebuild the link.`,
    tips: [
      "If you still see %20 after one pass, the value was double-encoded — decode again once.",
      "A plus sign in a query often means space; %2B is a real plus.",
      "Invalid %XY sequences usually mean a truncated copy-paste.",
      "Decoded text is not automatically safe to inject into HTML or to visit as a link.",
      "Use URL Encode to rebuild a query after you have edited the readable value.",
    ],
    faq: [
      {
        question: "Does URL Decode upload my text?",
        answer:
          "No. Percent-decoding runs in your browser on ApkaOS.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Why is + becoming a space?",
        answer:
          "Form-encoded query strings use + for space. A literal plus should appear as %2B. If you are decoding a path, treat + as plus instead.",
      },
      {
        question: "Why do I still see % sequences after decoding?",
        answer:
          "The string was likely encoded twice, or it contains a literal percent that was never encoded as %25.",
      },
      {
        question: "Can this decode Base64?",
        answer:
          "No. Use the Base64 Decode tool. Percent-encoding and Base64 are different encodings.",
      },
      {
        question: "Does decoding make a URL safe to open?",
        answer:
          "No. It only restores characters. Treat unknown URLs as untrusted.",
      },
    ],
    searchKeywords: [
      "url decode",
      "percent decode",
      "decode query string",
      "url decoder online",
      "decodeuri component",
      "url decode in browser",
      "url decode apkaos",
    ],
  },

  "md5-hash": {
    seoTitle: "MD5 Hash Generator Online — Not for Passwords | ApkaOS",
    seoDescription:
      "Generate an MD5 hash in your browser with ApkaOS. Free, no signup, never uploaded. For checksums only — MD5 is not safe for passwords or security use.",
    intro:
      "Create an MD5 digest from text in your browser on ApkaOS. You get a 128-bit fingerprint, usually shown as 32 hex characters. Use it to compare files or to match a published checksum — not to store passwords. MD5 is broken for security use; attackers can force collisions. Hashing stays on your device. The tool is free and needs no account. Prefer SHA-256 when you need a stronger fingerprint.",
    howToSteps: [
      "Open MD5 Hash on ApkaOS. The text never leaves this tab.",
      "Paste the string you want to fingerprint (UTF-8).",
      "Generate the hash. Copy the 32-character hexadecimal value.",
      "Compare it to a known checksum, or store it as a non-security cache key.",
      "For passwords or integrity against attackers, stop — use a password hasher (Argon2, bcrypt) or SHA-256 at minimum for file integrity.",
    ],
    benefits: [
      "Browser-local hashing — input text is never uploaded.",
      "Free, no signup.",
      "Fast checksums for “did this string change?” in non-adversarial settings.",
      "Same hex format most docs and older systems expect for MD5.",
    ],
    useCases: [
      "Match a published MD5 checksum for a small text payload or license key format you do not control.",
      "Build a cheap cache key for a non-secret string in a legacy tool that already uses MD5.",
      "Reproduce a tutorial or exam question that still asks for an MD5 hex digest.",
      "Confirm two pastes are identical without reading every character.",
    ],
    guide: `## MD5 is a checksum, not a lock

MD5 produces a 128-bit digest. For decades it was used for file checksums and, wrongly, for password databases. Collision attacks are practical: two different inputs can share an MD5 hash. Chosen-prefix collisions exist too. Do not use MD5 to protect passwords, to sign data, or to verify a file when an attacker might swap it. ApkaOS still offers MD5 because legacy systems and docs ask for it. The hash is computed in your browser. Nothing is uploaded. The tool is free and needs no account.

For a stronger fingerprint of the same text, use SHA-256 Hash on ApkaOS. For storing user passwords on a server, use a slow password hashing function (Argon2id, scrypt, or bcrypt) with a unique salt — never MD5, never plain SHA-256 by itself either.

## What you get

The output is typically 32 lowercase or uppercase hex digits (128 bits). Some UIs also show Base64 of the raw digest. That is still MD5, not “encrypted text.” You cannot decode an MD5 hash back to the original string. If someone offers an “MD5 decryptor,” they are using a lookup table of common passwords, not reversing the math.

Same input bytes always yield the same MD5. Change one character and the digest changes (avalanche). That does not make it secure against a motivated attacker.

UTF-8 matters. The hash of café depends on those bytes. Windows-1252 versus UTF-8 will disagree. This page hashes the Unicode text as UTF-8 unless it says otherwise. File MD5 tools hash raw file bytes; a text box is not a substitute for md5sum on a binary.

## Privacy

Hashing locally means you can fingerprint a string without sending it to a website that might log it. Do not paste real passwords here to “see the hash” — even locally, the habit is bad, and screenshots leak. If you are testing, use fake input.

## After you hash

If you needed MD5 to satisfy an old API, you have it. If you are designing something new, pick SHA-256 for integrity checks and a real password KDF for authentication. ApkaOS will not store the digest or the input.

Rainbow tables exist for MD5 of common passwords. That is another reason MD5 must not be used for credentials.

## Matching another tool’s MD5

People often compare this page to md5sum, PHP md5(), or Python hashlib.md5. All of those hash bytes. A text box hashes UTF-8 of what you pasted. A Unix file that ends with a newline has an extra 0x0A. Trim or keep that newline on purpose. HMAC-MD5 is a different algorithm that needs a key — this page does not compute HMAC.

If a vendor still requires MD5 of a license string, hash exactly their specified encoding and do not use the digest as proof that the string is secret. Anyone can MD5 the same public string.`,
    tips: [
      "Do not use MD5 for passwords, tokens, or anything an attacker might forge.",
      "Use SHA-256 on ApkaOS when you need a stronger content fingerprint.",
      "You cannot reverse an MD5 hash; “decrypt MD5” sites only look up common strings.",
      "Hash UTF-8 text consistently or your digest will not match another tool’s.",
      "For files, compare against a file hasher; this page hashes the text you paste, not a binary path on disk.",
    ],
    faq: [
      {
        question: "Is my text uploaded to compute MD5?",
        answer:
          "No. MD5 runs in your browser on ApkaOS.",
      },
      {
        question: "Can I use MD5 to store passwords?",
        answer:
          "No. MD5 is too fast and collision-prone. Use Argon2, scrypt, or bcrypt with a salt on the server. Never MD5.",
      },
      {
        question: "Is MD5 encryption? Can I decrypt it?",
        answer:
          "No. It is a one-way hash. You cannot decrypt it. Lookup sites only work for common inputs.",
      },
      {
        question: "Is this free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Why does my hash not match another website?",
        answer:
          "Different encoding (UTF-8 vs UTF-16), extra newline, or spaces. Hash the exact same bytes. Also confirm both sides use raw MD5, not HMAC-MD5.",
      },
      {
        question: "Should I use SHA-256 instead?",
        answer:
          "Yes for new integrity checks. SHA-256 is stronger. For passwords, use a dedicated password hasher, not SHA-256 alone.",
      },
    ],
    searchKeywords: [
      "md5 hash",
      "md5 generator",
      "md5 checksum online",
      "md5 hash in browser",
      "create md5 digest",
      "md5 not for passwords",
      "md5 hash apkaos",
    ],
  },

  "sha256-hash": {
    seoTitle: "SHA-256 Hash Generator Online Free, No Signup | ApkaOS",
    seoDescription:
      "Generate a SHA-256 hash in your browser with ApkaOS. Free, no signup, never uploaded. Stronger than MD5 — still not a password storage function alone.",
    intro:
      "Create a SHA-256 digest from text in your browser on ApkaOS. You get a 256-bit fingerprint, usually 64 hex characters. SHA-256 is the SHA-2 family hash used for file integrity and many protocols. It is much stronger than MD5, but it is still not how you should store passwords (use Argon2 or bcrypt). Hashing stays on your device. The tool is free and needs no account.",
    howToSteps: [
      "Open SHA-256 Hash on ApkaOS. Computation never leaves this tab.",
      "Paste the text to fingerprint (UTF-8).",
      "Generate the hash and copy the 64-character hex string.",
      "Use it to verify a payload, label a cache, or match a published SHA-256 checksum.",
      "Do not use this alone as your website’s password database — use a slow salted KDF.",
    ],
    benefits: [
      "Browser-local — input never uploaded to ApkaOS.",
      "Free, no signup.",
      "256-bit digest; collision resistance far above MD5 for practical use.",
      "Hex output matches openssl dgst -sha256 and Web Crypto.",
    ],
    useCases: [
      "Verify that a copied manifest, license text, or config blob matches a published SHA-256.",
      "Fingerprint a JSON payload before you send it, then compare on the other side.",
      "Replace an old MD5 checksum in a non-password workflow.",
      "Teach the difference between hashing and encryption without installing OpenSSL.",
    ],
    guide: `## SHA-256 versus MD5 versus password hashing

SHA-256 is a cryptographic hash function in the SHA-2 family. It outputs 256 bits. In 2026 it remains appropriate for content integrity, many signature schemes (as the hash inside them), and Bitcoin-style fingerprints. It is not “broken” the way MD5 and SHA-1 are for collisions.

It is still a fast hash. Fast is bad for storing passwords: attackers can try billions of guesses per second on GPUs. Password storage needs a memory-hard, slow function (Argon2id, scrypt, bcrypt) and a unique salt per user. Do not hash passwords with SHA-256 and call it done. HMAC-SHA256 is for keyed integrity, not for a password file either unless you know why you are using it.

ApkaOS SHA-256 Hash computes the digest in your browser with Web Crypto or an equivalent local implementation. Nothing is uploaded. The tool is free and needs no account. Use MD5 Hash only when a legacy checksum demands MD5.

## Output format

Expect 64 hexadecimal characters. Uppercase versus lowercase does not change the value; compare case-insensitively. Some tools show Base64 of the raw 32 bytes — that is a different presentation of the same digest.

The function is deterministic. Same UTF-8 bytes → same hash. A trailing newline will change it. Hash files with a file tool if you need to match shasum; this page hashes the text in the box.

You cannot reverse SHA-256 to get the original text. Brute force only works for short, low-entropy secrets. That is why it must not be your password scheme.

## Privacy

Local hashing lets you fingerprint sensitive documents without sending them to an online hasher. Do not paste real passwords. Do not assume the hex string is anonymous if the input was guessable.

## After you hash

If you are verifying a download, compare the hex to the publisher’s SHA-256, not MD5. If you are designing an API, hashing the body with SHA-256 can detect accidental corruption; use HMAC or signatures when an attacker is in the threat model.

ApkaOS does not store hashes or inputs. For QR codes of a URL, use the QR tool — hashing a URL is unrelated to encoding it as an image.

## Integrity versus authenticity

A SHA-256 digest tells you whether two byte strings match. It does not tell you who produced the string. An attacker who can change the file can also publish a new hash. Authenticity needs a signature (or HTTPS from a trusted host) in addition to the hash. Publishers who list SHA-256 sums on the same site that hosts the download are only helping with accidental corruption, not a full supply-chain guarantee.

When you compare hashes, copy both hex strings into a text editor and compare, or use a known-good command on your machine. Case and whitespace are the usual false mismatches.

Use the MD5 tool on ApkaOS only when a legacy checklist still names MD5. For anything new, SHA-256 is the fingerprint to reach for — and a password KDF is what you reach for when the input is a user password.`,
    tips: [
      "Prefer SHA-256 over MD5 for new checksums and integrity checks.",
      "Do not store user passwords as SHA-256(password). Use Argon2, scrypt, or bcrypt with a salt.",
      "Compare hex case-insensitively; watch for extra newlines in the input.",
      "This page hashes typed text as UTF-8, not an arbitrary binary file on disk.",
      "HMAC-SHA256 and raw SHA-256 are different; do not mix them when matching a spec.",
    ],
    faq: [
      {
        question: "Is SHA-256 computed on the server?",
        answer:
          "No. ApkaOS hashes in your browser. Text is never uploaded.",
      },
      {
        question: "Is SHA-256 safe for passwords?",
        answer:
          "No. It is too fast for password storage. Use Argon2id, scrypt, or bcrypt with a unique salt. SHA-256 is fine for file and content fingerprints.",
      },
      {
        question: "How is SHA-256 stronger than MD5?",
        answer:
          "Longer digest (256 vs 128 bits) and no practical collision attacks like MD5’s. Use SHA-256 for new integrity checks; avoid MD5 for security.",
      },
      {
        question: "Can I decrypt a SHA-256 hash?",
        answer:
          "No. Hashing is one-way. You can only try guesses or look up common strings.",
      },
      {
        question: "Is the tool free?",
        answer:
          "Yes. No signup on apkaos.in.",
      },
      {
        question: "Why does my hash not match openssl?",
        answer:
          "openssl hashes file bytes, including a final newline if the file has one. The web tool hashes exactly what is in the box. Also confirm both use raw SHA-256, not SHA-256 HMAC.",
      },
    ],
    searchKeywords: [
      "sha256 hash",
      "sha-256 generator",
      "sha256 checksum online",
      "sha256 in browser",
      "sha256 vs md5",
      "sha256 integrity hash",
      "sha256 hash apkaos",
    ],
  },

  "qr-code-generator": {
    seoTitle: "QR Code Generator from URL or Text Free | ApkaOS Tools",
    seoDescription:
      "Generate a QR code image from a URL or text in your browser with ApkaOS. Free, no signup, never uploaded. Scan to open a link or read a short message.",
    intro:
      "Turn a URL or short text into a QR code image in your browser on ApkaOS. Someone scans the code with a phone camera and gets the link or the message. Nothing is uploaded. The tool is free and needs no account. QR codes are public once printed — do not encode secrets. This is an encoder to an image, not a tracker and not a URL shortener.",
    howToSteps: [
      "Open the QR Code Generator on ApkaOS. Encoding runs locally in this tab.",
      "Paste a full URL (including https://) or the short text you want the scan to reveal.",
      "Generate the QR image. Keep the text short so the pattern stays easy to scan.",
      "Download the image (PNG) and place it on a poster, slide, menu, or product insert.",
      "Scan it with your own phone before you print a hundred copies.",
    ],
    benefits: [
      "Browser-local — the URL or message is not sent to ApkaOS servers.",
      "Free, no signup, no watermark on the QR image.",
      "Works for links and plain text; no app install on your computer.",
      "You keep the image file; ApkaOS does not host a tracking redirect.",
    ],
    useCases: [
      "Put a Wi-Fi-free restaurant menu link on a table tent.",
      "Add a QR to a slide that opens the demo URL when the audience scans it.",
      "Print a code on a flyer that goes to your apkaos.in tool or a form.",
      "Encode a short inventory ID or classroom join code as text for quick capture.",
    ],
    guide: `## From text to a scannable image

A QR code is a 2D barcode. It stores the bytes you give it — typically a URL or a short string — as a square pattern. A camera reads the pattern and hands the text to the phone (often opening https links automatically). ApkaOS QR Code Generator builds that image in your browser. Nothing is uploaded. The tool is free and needs no account.

This is not a link shortener. The full URL is inside the code. Long URLs make denser patterns that fail in print or from a distance. Use a short, stable https URL. This is not analytics: ApkaOS does not know who scanned the code, because the image is just pixels on their device.

## URLs versus raw text

For a website, paste the complete URL with https://. Missing schemes can produce a code that shows text instead of opening a browser. For plain text (a coupon code, a UPI note, a sentence), paste the text. Phones will show a copyable string instead of navigating.

Wi-Fi and vCard have special payload formats (WIFI:T:WPA;S:...;; and BEGIN:VCARD). This generator encodes whatever you type. If you need those formats, type them correctly or use a dedicated Wi-Fi QR helper. Do not put a Wi-Fi password on a public poster unless that is intentional.

Binary files, PDFs, and images are not stored inside a typical QR. Encode a URL that points to the file. QR capacity is on the order of a few kilobytes at low error correction; it is the wrong container for a document.

## Print quality and scanning

Download a PNG large enough for print. Do not screenshot a tiny on-screen code and stretch it. Keep quiet space (margin) around the square. High contrast — dark modules on a light background — scans best. Do not cover the finder squares in the corners with a logo unless you know the error-correction level still holds.

Test with iOS Camera and Android Camera, indoors and in glare. If it fails, shorten the URL and regenerate. Laminate and curved surfaces need even larger codes.

## Privacy and security

Anyone who sees the code can read the payload. Do not encode passwords, OTPs, or private URLs that grant access. Phishing uses QR codes too: print your own, and do not scan random stickers over payment codes.

Because generation is local, a private staging URL never hits ApkaOS. Once you print the poster, the URL is as public as the paper.

## After you generate

Keep the PNG with the project. If the destination URL changes, you must print a new code (or use a redirect you control). Hashing the URL (SHA-256) is unrelated — hashes are not scannable links. For counting words on a poster, use Word Counter; it will not create a QR.`,
    tips: [
      "Always include https:// when the QR should open a website.",
      "Shorter URLs scan more reliably, especially when printed small.",
      "Download a high-resolution PNG; do not upscale a tiny screenshot.",
      "Test with a real phone before a print run.",
      "Never encode secrets — a QR is as public as a printed sentence.",
    ],
    faq: [
      {
        question: "Is the URL uploaded to generate the QR code?",
        answer:
          "No. ApkaOS draws the QR image in your browser. The text never leaves your device.",
      },
      {
        question: "Is it free? Is there a watermark?",
        answer:
          "Yes, it is free with no signup. The downloaded QR image has no ApkaOS watermark.",
      },
      {
        question: "Can I put a PDF or image inside the QR code?",
        answer:
          "No. Encode a URL that points to the file. QR codes hold a short text payload, not documents.",
      },
      {
        question: "Will I see who scanned the code?",
        answer:
          "No. ApkaOS does not track scans. The code is only an image of your text or URL.",
      },
      {
        question: "Why will my phone not open the website?",
        answer:
          "The payload may be missing https://, the URL may be too dense to scan, or the print may be too small or low-contrast.",
      },
      {
        question: "Can I encode a Wi-Fi password?",
        answer:
          "Only if you type a valid WIFI: payload and accept that anyone who sees the code gets the password. Do not do that on a public poster.",
      },
    ],
    searchKeywords: [
      "qr code generator",
      "url to qr code",
      "text to qr image",
      "qr code from link",
      "free qr generator",
      "qr code in browser",
      "qr code generator apkaos",
    ],
  },

  "word-counter": {
    seoTitle: "Word Counter: Characters & Lines Online | ApkaOS Tools",
    seoDescription:
      "Count words, characters, and lines in your browser with ApkaOS. Free, no signup, never uploaded. Instant totals for essays, captions, and social posts.",
    intro:
      "Count words, characters, and lines in your browser on ApkaOS. Paste an essay, caption, or script and see live totals. Nothing is uploaded and nothing is stored. The tool is free and needs no account. Use it for school limits, ad copy, and social posts — remembering that “word” rules differ slightly between tools and languages.",
    howToSteps: [
      "Open Word Counter on ApkaOS. Counting runs locally as you type.",
      "Paste or type your text.",
      "Read the word, character (with and without spaces if shown), and line counts.",
      "Trim or expand the draft until you hit the limit you were given.",
      "Copy the final text back to your editor; ApkaOS does not save a document.",
    ],
    benefits: [
      "100% in-browser — unpublished drafts never leave your device.",
      "Free, no signup.",
      "Instant counts while you edit, without Microsoft Word.",
      "Useful when a form, journal, or ad platform enforces a limit.",
    ],
    useCases: [
      "Stay under a 500-word school essay or SOP limit.",
      "Fit a product description into an Amazon or marketplace character cap.",
      "Check a tweet, LinkedIn post, or YouTube description before publishing.",
      "Estimate reading length of a script by word count before a recording session.",
    ],
    guide: `## What a “word” is

Most online counters split on whitespace: hello world is two words. Hyphenated compounds (state-of-the-art) may count as one. Numbers like 2026 usually count as a word. ApkaOS Word Counter follows a simple, transparent rule in the browser — whitespace-separated tokens — unless the UI documents otherwise. Nothing is uploaded. The tool is free and needs no account.

Character counts matter more for tweets, SMS, and meta descriptions. “Characters with spaces” is the length of the string. “Without spaces” excludes space characters but usually not punctuation. Line count is newline-based; a wrapped sentence that looks like three lines on your screen may still be one line in the file.

Microsoft Word’s count can differ slightly (footnotes, text boxes, hyphenation). If a professor says “Word count,” use Word — or confirm they accept any counter. For web limits, the platform’s counter wins; use ApkaOS as a draft check.

## Languages and scripts

English and other space-delimited languages work as people expect. Chinese, Japanese, and Thai do not use spaces the same way; a “word” count is a poor metric there — use characters. Hindi with danda and English mixed in a paragraph still splits on spaces, which is usually what students want.

Emoji and combining marks: a grapheme cluster may be multiple code points. Character counts that use JavaScript string length count UTF-16 code units, which can disagree with “visible characters.” For strict Twitter-style limits, check the platform.

## Privacy

Drafts of theses, complaint letters, and unpublished posts stay in the tab. That is the point of a local counter versus a website that saves history. Clearing the page clears the text. ApkaOS does not create an account or a cloud document.

## After you count

If you need a different case for a title, use Case Converter (also local). If the text is Markdown, count the source or the rendered text depending on the rule you were given. Hashing the essay (SHA-256) can fingerprint a version; it does not count words.

For DOCX files, extract text with DOCX to Text first (browser-local), then paste here. A Word file is not plain text until you extract it.

## Limits, citations, and reading time

Some schools want a count that excludes the title, bibliography, or footnotes. Delete those sections before you paste, or subtract them after. Automatic exclusion is not reliable across citation styles.

A rough spoken-word estimate is 130–150 words per minute. That is a planning number, not a clock. Character limits on ads include spaces and punctuation; going one character over can truncate a headline in ugly ways, so leave a small buffer.

ApkaOS does not store drafts and does not offer revision history. Copy the text back to your editor when you are done. If you need a case change next, use Case Converter on the same paste — still local, still free, still no account.`,
    tips: [
      "Match the authority’s counter when it matters (Word for a thesis, the ad platform for ads).",
      "Use character count for tweets and meta descriptions; word count for essays.",
      "Hyphens and numbers can change the total — skim the rule if you are on a knife-edge limit.",
      "Paste extracted DOCX text, not the .docx bytes, if you started in Word.",
      "Nothing is saved; copy your draft out before you close the tab.",
    ],
    faq: [
      {
        question: "Is my writing uploaded?",
        answer:
          "No. Word Counter runs in your browser. ApkaOS does not store the text.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Why is the count different from Microsoft Word?",
        answer:
          "Word may include footnotes, text boxes, and different hyphen rules. For official academic counts, use Word if that is what the reviewer uses.",
      },
      {
        question: "Does it count characters with or without spaces?",
        answer:
          "Check the labels on the page. Platforms usually care about every character including spaces.",
      },
      {
        question: "Can I count words in a PDF or DOCX directly?",
        answer:
          "Paste plain text. Extract a DOCX with DOCX to Text, or copy from a PDF, then count.",
      },
      {
        question: "Are Hindi or emoji counted correctly?",
        answer:
          "Hindi words split on spaces. Emoji may count as more than one character in JavaScript length. Use the platform’s own counter for strict social limits.",
      },
    ],
    searchKeywords: [
      "word counter",
      "character count",
      "line count",
      "essay word count",
      "word counter online",
      "word counter in browser",
      "word counter apkaos",
    ],
  },

  "case-converter": {
    seoTitle: "Case Converter — Upper, Lower, Title | ApkaOS Free",
    seoDescription:
      "Convert text case in your browser with ApkaOS: uppercase, lowercase, title case, and more. Free, no signup, never uploaded. Instant letter-case changes.",
    intro:
      "Change letter case in your browser on ApkaOS: UPPERCASE, lowercase, Title Case, and sentence case. Paste a headline or a noisy ALL CAPS paragraph and convert it in one click. Nothing is uploaded. The tool is free and needs no account. Case conversion does not translate language and does not fix grammar — it only changes character case.",
    howToSteps: [
      "Open Case Converter on ApkaOS. Conversion stays in this tab.",
      "Paste the text.",
      "Choose uppercase, lowercase, title case, or sentence case.",
      "Copy the result. Tweak small words (of, the) in titles if the automatic title case is too aggressive.",
      "Run Word Counter if you also need length; it is a separate local tool.",
    ],
    benefits: [
      "Browser-local — drafts and brand names never leave your device.",
      "Free, no signup.",
      "Faster than retyping a paragraph that arrived in caps lock.",
      "Consistent casing for headings before you paste into a CMS.",
    ],
    useCases: [
      "Fix an email or chat message that was written in ALL CAPS.",
      "Turn a slug or filename into a readable title for a blog heading.",
      "Normalize product names from a CSV before a catalog import.",
      "Prepare sentence case for a caption that a style guide forbids title case on.",
    ],
    guide: `## Case is style, not meaning

UPPERCASE shouts. lowercase is informal. Title Case Capitalizes Most Words. Sentence case capitalizes the first letter. ApkaOS Case Converter applies those mechanical rules in your browser. Nothing is uploaded. The tool is free and needs no account.

It will not detect proper nouns perfectly. “iPhone” may become “Iphone” in title case. “NASA” may become “Nasa”. After conversion, restore brand spellings by hand. It also will not lowercase the I in a mid-sentence English pronoun unless the mode says so — read the output.

## Title case rules vary

Some title-case algorithms capitalize every word. Others leave short prepositions in lowercase (AP, Chicago). ApkaOS uses a simple, predictable rule so you are not surprised. If you publish under a specific style guide, fix of/and/the after conversion.

Hyphenated words and apostrophes (O’Neill, state-of-the-art) are edge cases. Check them. Mixed scripts (Hindi + English) only change the Latin letters; Devanagari has no upper/lower case.

## What does not change

Punctuation, numbers, and spacing stay. Emoji stay. URL paths may break if you uppercase a case-sensitive link — do not run a URL through title case. Markdown heading hashes (#) stay; you can still convert the heading text.

This is not a grammar fixer and not a translator. For counting, use Word Counter. For Markdown to HTML, use that tool. For hashing the result, SHA-256 will change when case changes — hashes are case-sensitive on the bytes.

## Privacy

Local conversion is appropriate for unpublished copy and internal names. Clearing the tab clears the text.

## After you convert

Paste into the CMS. If you started from a slug (my-post-title), replacing hyphens with spaces before title case gives a better heading. The converter will not invent hyphens or remove them unless that mode exists in the UI.

## Alternating case, slugs, and programming identifiers

Viral “aLtErNaTiNg cAsE” is sometimes offered as a novelty mode. It is not a readability feature; skip it for anything you will publish. Programming identifiers (camelCase, snake_case) should be converted in an IDE so you do not break APIs. This page is for prose and headings.

If you pasted a URL-style slug, replace hyphens with spaces first, then title-case, then restore brand words. Going the other way — title to slug — is not what this tool does; lowercase and replace spaces with hyphens in your editor, then URL-encode if the slug will sit in a path.

All-caps legal disclaimers are often left in uppercase on purpose. Converting them to sentence case can make a contract clause look unofficial. Know the document type before you convert the whole paste.

ApkaOS does not save a casing history. Keep the original in your clipboard until you like the result.`,
    tips: [
      "Restore brand spellings (iPhone, NASA) after automatic title case.",
      "Do not title-case URLs or file paths; they can be case-sensitive.",
      "Devanagari and many other scripts have no capital letters — only Latin characters change.",
      "Match your style guide for small words in titles; simple converters often capitalize everything.",
      "Sentence case is usually better for UI copy than Title Case.",
    ],
    faq: [
      {
        question: "Is my text uploaded?",
        answer:
          "No. Case conversion runs in your browser on ApkaOS.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Will title case follow AP or Chicago style?",
        answer:
          "Expect a simple capitalize-each-word (or similar) rule. Adjust short prepositions yourself if your guide requires it.",
      },
      {
        question: "Does this work for Hindi?",
        answer:
          "Hindi letters have no upper/lower case. English words inside the same paragraph will change; Devanagari will not.",
      },
      {
        question: "Can it fix grammar or spelling?",
        answer:
          "No. It only changes letter case.",
      },
      {
        question: "Why did iPhone become Iphone?",
        answer:
          "Title case does not know brand rules. Correct those words manually after converting.",
      },
    ],
    searchKeywords: [
      "case converter",
      "uppercase converter",
      "lowercase converter",
      "title case online",
      "sentence case",
      "convert text case",
      "case converter apkaos",
    ],
  },

  "markdown-to-html": {
    seoTitle: "Markdown to HTML Converter Online Free | ApkaOS Tools",
    seoDescription:
      "Convert Markdown to HTML in your browser with ApkaOS. Free, no signup, never uploaded. Headings, lists, and links become HTML you can paste into a page.",
    intro:
      "Turn Markdown into HTML in your browser on ApkaOS. Headings, lists, links, emphasis, and fenced code become tags you can paste into a CMS or static page. Nothing is uploaded. The tool is free and needs no account. This is HTML markup, not a PDF — for a printable file use Markdown to PDF (that one is a temporary server job).",
    howToSteps: [
      "Open Markdown to HTML on ApkaOS. Conversion stays in this tab.",
      "Paste Markdown (README style: # headings, lists, links, code fences).",
      "Convert and preview or copy the HTML.",
      "Paste into your page or CMS. Sanitize if the Markdown came from untrusted users.",
      "Do not expect a full static-site theme; you get HTML fragments, not a designed layout.",
    ],
    benefits: [
      "100% browser-local — drafts and private READMEs never leave the device.",
      "Free, no signup.",
      "Faster than spinning up a local static generator for a one-off fragment.",
      "Pairs with HTML to Text when you need the opposite direction.",
    ],
    useCases: [
      "Paste a GitHub README into a simple internal HTML page.",
      "Turn lecture notes written in Markdown into HTML for an LMS that accepts markup.",
      "Preview how a changelog will look before you commit it to a docs site.",
      "Generate a snippet of HTML from a Markdown email draft.",
    ],
    guide: `## Markdown in, HTML out

Markdown is a writing format. HTML is what browsers render. Markdown to HTML on ApkaOS runs a client-side parser (CommonMark or GFM-like) in your tab and returns tags: h1–h3, p, ul/ol, a, code, pre, blockquote, and often tables. Nothing is uploaded. The tool is free and needs no account.

This is not Markdown to PDF. PDF rendering needs a print engine and is a temporary upload on ApkaOS. Keep private notes here (local HTML) and only use MD to PDF when you accept a short-lived server job.

## Flavour and what is skipped

Expect ATX headings, emphasis, links, images as img tags (URLs as written — relative paths will break unless those files exist next to the HTML), fenced code blocks, and GitHub-style tables if the parser allows them. YAML front matter is usually emitted as a paragraph or dropped. Raw HTML in the Markdown may pass through or be escaped — treat untrusted Markdown as dangerous if raw HTML is allowed (XSS).

Footnotes, math, and mermaid diagrams are not guaranteed. Write portable Markdown.

Code is escaped inside code/pre so a snippet of HTML in a fence should not execute. Still, if you paste the output into a CMS that allows scripts, review it.

## Security

If you convert Markdown written by other people, sanitize the HTML before putting it on a public site. A link can be javascript: and an image URL can track. Local conversion does not make the output safe — it only means ApkaOS never saw the source.

## After you convert

Copy the HTML into your template. Add CSS yourself; the converter does not ship a blog theme. If you need a PDF handout, use Markdown to PDF and do not upload secrets. If you need plain text without tags, use HTML to Text on the result, or skip HTML entirely.

ApkaOS does not host the HTML. You own the snippet.

## Images, tables, and pasting into a CMS

An image in Markdown becomes an img tag with the URL you wrote. If that URL is a relative path, the CMS must serve the file from the same place. Tables become HTML tables; some email editors and older CMS fields strip table tags, so check the preview. Tight lists with blank lines can become extra paragraphs — that is how Markdown interprets a blank line.

When you paste into WordPress, Notion, or Google Docs, those apps may treat the HTML as rich text or as a code block. Use “paste as HTML” or a custom HTML block if you want tags to remain tags. If the CMS already accepts Markdown, you may not need this converter at all.

For a printout of the same notes, use Markdown to PDF on ApkaOS and remember that path is a temporary server upload. Keep secrets in this local HTML tool instead.`,
    tips: [
      "Use https image URLs; relative ./img.png will 404 unless you host that file beside the HTML.",
      "Sanitize HTML if the Markdown is from users — conversion is not a security boundary.",
      "For a printable PDF, use the Markdown to PDF document tool (temporary server), not this page.",
      "Keep one H1 and simple lists for the cleanest HTML.",
      "YAML front matter is for static site generators; it may not become a title tag here.",
    ],
    faq: [
      {
        question: "Is Markdown uploaded?",
        answer:
          "No. Markdown to HTML runs in your browser on ApkaOS.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Does this create a PDF?",
        answer:
          "No. It outputs HTML. Use Markdown to PDF in document tools if you need a PDF (that path uploads temporarily).",
      },
      {
        question: "Is GitHub Flavored Markdown supported?",
        answer:
          "Common constructs and often tables work. Task lists, footnotes, and other extensions are not guaranteed.",
      },
      {
        question: "Can the HTML include scripts from the Markdown?",
        answer:
          "If raw HTML is passed through, yes — that is an XSS risk. Do not publish unsanitized HTML from untrusted Markdown.",
      },
      {
        question: "Will my CSS theme apply?",
        answer:
          "Only if you paste the HTML into a page that already has CSS. The converter returns markup, not a designed site.",
      },
    ],
    searchKeywords: [
      "markdown to html",
      "md to html converter",
      "convert markdown online",
      "markdown parser",
      "gfm to html",
      "markdown to html in browser",
      "markdown to html apkaos",
    ],
  },

  "html-to-text": {
    seoTitle: "HTML to Text Converter — Strip Tags Free | ApkaOS Tools",
    seoDescription:
      "Strip HTML tags and extract plain text in your browser with ApkaOS. Free, no signup, never uploaded. Get readable copy from a page fragment or email HTML.",
    intro:
      "Extract plain text from HTML in your browser on ApkaOS. Tags, scripts, and styles are stripped so you can keep the words — for a word count, a translation, or a text-only archive. Nothing is uploaded. The tool is free and needs no account. This is not a full browser: JavaScript will not run, and layout such as columns or hidden menus is not interpreted like a rendered page.",
    howToSteps: [
      "Open HTML to Text on ApkaOS. Stripping runs locally in this tab.",
      "Paste an HTML fragment or a saved .html snippet (not a live URL fetch unless the UI offers one — default is paste).",
      "Convert. Review the text for leftover entities or missing line breaks.",
      "Copy the plain text. Run Word Counter if you need totals.",
      "Do not expect alt text, captions, and hidden DOM nodes to appear unless they were in the pasted markup.",
    ],
    benefits: [
      "Browser-local — email HTML and draft pages never leave your device.",
      "Free, no signup.",
      "Removes tags faster than doing it by hand in an editor.",
      "Useful before counting words or pasting into a system that rejects HTML.",
    ],
    useCases: [
      "Pull the body copy out of an HTML email before forwarding as plain text.",
      "Strip a CMS export so a translator works in a .txt file.",
      "Get a text-only version of a newsletter module for SMS or WhatsApp.",
      "Clean a scraped fragment you already have in the clipboard (you paste it; ApkaOS does not crawl the web).",
    ],
    guide: `## Tags off, words on

HTML to Text walks markup and keeps character data. script and style contents should be dropped. Tags disappear. Entities like &amp; and &nbsp; should become & and a space. Line breaks are inferred from block tags (p, div, br, li, h1) so the result is readable rather than one long line. ApkaOS does this in your browser. Nothing is uploaded. The tool is free and needs no account.

This is the inverse of Markdown to HTML only in a loose sense: you will not get Markdown back, just text. Links may appear as the link text only, or as text plus URL — check the output. Images become nothing or their alt attribute.

## What a stripper cannot see

It does not execute JavaScript, so content injected by JS is absent unless it was already in the pasted HTML. It does not fetch a URL from the internet; you paste the source. It does not apply CSS; display:none text might still appear if it is in the HTML. Tables flatten. That is enough for emails and article bodies, not for a pixel-perfect reading of a web app.

Malformed HTML can confuse a simple parser. If the result looks empty, the text may have lived only in attributes or in a broken fragment. Paste a smaller piece.

## Security

Do not paste HTML and then feed the result into a shell or into innerHTML without thought. Stripping tags is not a complete sanitizer for every XSS vector, but it is far safer than rendering unknown HTML. Still, treat the output as untrusted if the source was.

Because processing is local, confidential HTML emails stay on your machine.

## After you extract

Count words, convert case, or hash the text with SHA-256 if you are fingerprinting a version. If you needed structured data, this is the wrong tool — parse the HTML in a script. If you needed a PDF of the rendered page, print from a browser; ApkaOS HTML to Text will not paginate a design.

Related: DOCX to Text for Word files (also local), PDF to Text for PDFs (local PDF tools). Those start from documents, not markup.

## Entities, whitespace, and emails

Named entities (nbsp, copy, mdash) and numeric entities should decode to the real characters. If you still see &amp; in the output, the source was double-escaped — decode once more or fix the exporter. Collapse of extra blank lines is normal; a newsletter’s table-based layout becomes a long column of phrases, which is what you want for SMS and not what you want for design QA.

HTML email is notoriously messy: VML for Outlook, hidden preheader spans, and tracker pixels. Those pixels will not load here because we only strip text, but their alt or leftover URLs might appear. Delete tracking URLs before you forward the plain-text version.

ApkaOS does not fetch remote HTML. Paste what you already have, convert, and copy the words into the next tool — Word Counter, Case Converter, or a translator — all without an account.`,
    tips: [
      "Paste HTML source, not a live URL, unless the page explicitly fetches (the default tool is a paste box).",
      "Check how links are emitted — you may want the href kept in parentheses for an archive.",
      "script and style should be gone; if you still see CSS, you pasted a fragment that was not wrapped as expected.",
      "Use Word Counter on the result for essay-style limits.",
      "This will not run JavaScript; dynamic pages must be saved after render if you need that text.",
    ],
    faq: [
      {
        question: "Is the HTML uploaded?",
        answer:
          "No. HTML to Text runs in your browser on ApkaOS.",
      },
      {
        question: "Is it free?",
        answer:
          "Yes. No signup required.",
      },
      {
        question: "Can I paste a URL and have ApkaOS download the page?",
        answer:
          "No. You paste HTML you already have. The site does not crawl arbitrary URLs for this tool.",
      },
      {
        question: "Will I get Markdown back?",
        answer:
          "No. You get plain text. Use a dedicated HTML-to-Markdown converter if you need Markdown syntax.",
      },
      {
        question: "Are images included?",
        answer:
          "No. At most you get alt text. Binary images are not extracted.",
      },
      {
        question: "Why is some on-page text missing?",
        answer:
          "It was probably rendered by JavaScript or lived outside the fragment you pasted. Save the rendered DOM from your browser if you need that copy.",
      },
    ],
    searchKeywords: [
      "html to text",
      "strip html tags",
      "html to plain text",
      "extract text from html",
      "remove html tags online",
      "html to text in browser",
      "html to text apkaos",
    ],
  },
};
