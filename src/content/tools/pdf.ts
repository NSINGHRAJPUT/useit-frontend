import type { ToolSeoMap } from "./types";

export const pdfToolContent: ToolSeoMap = {
  "merge-pdf": {
    seoTitle: "Merge PDF Online Free — Combine Files Locally | ApkaOS",
    seoDescription:
      "Combine multiple PDF files into one document in your browser. ApkaOS merges PDFs locally—no upload, no account, no watermark. Free, up to 250MB per file.",
    intro:
      "Need one packet from many PDFs? ApkaOS Merge PDF stitches files together in the order you choose, entirely in your browser. Nothing is uploaded, so contracts, marksheets, and scans stay on your device. No signup, no watermark, and a typical 250MB limit. Drag files in, rearrange, and download a single PDF.",
    howToSteps: [
      "Open Merge PDF on apkaos.in and drop two or more PDF files into the picker (up to 20).",
      "Drag the file list so chapters, annexures, and scans appear in the order you want.",
      "Start the merge. Processing runs locally in your browser—nothing is uploaded.",
      "Open the combined PDF, check the page flow, then download. Keep originals until you confirm.",
    ],
    benefits: [
      "Files never leave your device—the merge runs entirely in the browser",
      "Combine up to 20 PDFs with no watermark, no account, and no daily cap",
      "Reorder files before merging so the packet reads in a sensible sequence",
      "Typical 250MB per-file limit, free on apkaos.in",
    ],
    useCases: [
      "Assemble a job packet: resume, degree scans, and ID proof as one attachment",
      "Bundle a quarter of GST invoices into a single file for your accountant",
      "Combine lab reports from different diagnostics centres before a clinic visit",
      "Stitch lecture handouts from several courses into one revision PDF",
    ],
    guide: `When a portal, recruiter, or clerk asks for “one PDF only,” the files you actually have are almost never one file. You have an application form, a photograph scan, a fee receipt, and three certificates saved on different days. ApkaOS Merge PDF is built for that pile. You drop the PDFs into the browser, set the order, and download a single document. The join happens on your device. ApkaOS never receives the files, never stores them, and never stamps a watermark.

Merging is not the same as converting or compressing. Each source PDF keeps its pages; they are simply concatenated in the sequence you choose. Page size, fonts, and existing bookmarks in a given file are not “redesigned.” That is why a clean merge starts with a clean list. Name files \`01-form.pdf\`, \`02-id.pdf\`, \`03-marksheet.pdf\` before you drop them in, or drag them in the tool after they load. A merged job application that puts the ID after the annexure looks sloppy even if every page is correct.

Because processing is local, the practical limit is your device, not an ApkaOS server queue. Individual files up to about 250MB are typical. Twenty smaller PDFs merge faster than two huge scanned books. If one source is a 120MB scan of a bound register, compress that file first, then merge. A 400-page combined scan is painful to email even when the merge itself succeeds.

Use merge when the reader must see a packet in one sitting: a university admission set, a loan file, a tender with drawings and a covering letter, or a medical folder for a second opinion. Do not use merge when the recipient only needs two pages from a 90-page report—extract those pages instead, then merge the extracts if you are combining extracts from several reports. Do not merge files that still contain pages you would rather hide. Delete blank or confidential pages first. Merge last, after the contents of each file are already the contents you are willing to send.

Print shops and government counters still care about paper size. Mixing A4 forms with landscape slides in one merge is allowed, but the printout will look uneven. Keep similar page sizes together, or rotate landscape pages beforehand so everything reads portrait. If two files use different page labels (some start at i, others at 1), the merged file will not magically renumber them for you. Check the result before you upload it to a portal that rejects “wrong page count.”

Privacy is the reason to prefer a browser merge over an email-to-yourself workaround or a random “upload and wait” site. Offer letters, bank statements, and medical scans should not sit on someone else’s disk. On ApkaOS the bytes stay in the tab. Close the tab when you are done. There is no account to create and no history to delete on our side because we never received the files.

After you download the combined PDF, open it and scroll every section once. Confirm that no file was dropped, that the last page of file A is not followed by a blank from file B, and that the file size is still acceptable for the destination inbox or portal. If it is too large, run Compress PDF on the merged result rather than recompressing every source. If you need to send only part of the packet later, extract those pages from the merged file instead of rebuilding from scratch.

ApkaOS Merge PDF is free. You can merge again as often as you need. Keep the original separate files until the recipient confirms they can open the packet. A merge is easy to repeat; reconstructing a deleted source is not.`,
    tips: [
      "Prefix source filenames with 01-, 02-, 03- so the default drop order is already correct.",
      "Merge similar page sizes; mixing A4 forms with landscape slides looks uneven in print.",
      "Compress a huge scan first, then merge, so the combined file still fits email or a portal.",
      "Keep originals until you open the merged PDF and check every section.",
    ],
    faq: [
      {
        question: "How many PDFs can I merge at once?",
        answer:
          "You can combine up to 20 PDF files in one pass. Drop them in, reorder the list, and download a single document. If you have more than 20, merge in batches, then merge the batch files.",
      },
      {
        question: "Does merging upload my files to ApkaOS?",
        answer:
          "No. Merge PDF runs entirely in your browser. Contracts, IDs, and scans never leave your device, and ApkaOS does not store a copy.",
      },
      {
        question: "Will the merged PDF have a watermark?",
        answer:
          "No. ApkaOS never stamps a watermark. The combined file contains only the pages you selected, in the order you set.",
      },
      {
        question: "What is the file size limit for merging?",
        answer:
          "Browser merges typically accept individual files up to 250MB, depending on available memory. Very large scans merge more reliably if you compress them first.",
      },
      {
        question: "Can I change the order after I drop the files?",
        answer:
          "Yes. Drag items in the list before you start the merge. The first file in the list becomes the first pages of the combined PDF.",
      },
      {
        question: "Do I need an account to merge PDFs?",
        answer:
          "No. Open the tool on apkaos.in, drop your files, and download. There is no signup and no daily merge cap for this browser tool.",
      },
    ],
    searchKeywords: [
      "merge pdf",
      "combine pdf files",
      "join pdf online",
      "pdf merger no upload",
      "merge pdf free",
      "combine pdf apkaos",
      "merge pdf in browser",
    ],
  },
  "split-pdf": {
    seoTitle: "Split PDF Online Free — Separate Pages Locally | ApkaOS",
    seoDescription:
      "Split a PDF into single pages or custom ranges in your browser. ApkaOS splits locally—no upload, no account, no watermark. Free, typical 250MB file limit.",
    intro:
      "A 180-page board is useless when you only need paper three. ApkaOS Split PDF breaks a file into single pages or custom ranges in your browser. Files never leave your device. There is no account, no watermark, and a typical 250MB limit. Choose pages, split, and download a ZIP or separate PDFs.",
    howToSteps: [
      "Open Split PDF on apkaos.in and drop the PDF you want to break apart.",
      "Choose every page as its own file, or enter the page ranges you actually need.",
      "Run the split locally in your browser. Nothing is uploaded to ApkaOS.",
      "Download the resulting PDFs or ZIP, then open a sample to confirm the cuts are right.",
    ],
    benefits: [
      "Split runs in the browser—the original PDF never leaves your device",
      "Cut by single pages or ranges without installing Acrobat or creating an account",
      "No watermark on the pieces you download; the tool is free on apkaos.in",
      "Typical 250MB file limit, with a ZIP download when you produce many files",
    ],
    useCases: [
      "Break a combined university question-paper set into one PDF per subject",
      "Cut a 12-month bank statement into monthly files for a visa or loan officer",
      "Separate a multi-drawing CAD export so each sheet can go to a different vendor",
      "Split a scanned notebook so each chapter becomes its own revision file",
    ],
    guide: `A merged PDF is convenient until someone asks for “only March” or “only Paper II.” Then the 180-page board becomes a liability. ApkaOS Split PDF is the inverse of merge: you take one file and cut it into smaller PDFs—every page on its own, or custom ranges such as 1–4, 12–18, and 40. The cut happens in your browser. The source file is never uploaded.

Splitting is not extraction with a different label, though the two look similar. Extract builds one new PDF that contains only the pages you keep, and you usually want that single file. Split is for when you need many files: one page per student, one drawing per contractor, one month per folder. If you only need pages 7–9 as a single attachment, use Extract PDF Pages. If you need pages 7, 8, and 9 as three separate attachments, use Split.

Ranges should follow how the reader will file the result. A bank statement split into calendar months is easier to attach to a visa form than 30 one-page PDFs. A question paper split by subject is easier to print than a ZIP of 80 singles. A scanned diary split by date range matches how you actually study. Think about the destination folder before you click split, or you will spend the next hour renaming files.

Because the work is local, a 250MB scan can still split on a typical laptop, but memory matters. Splitting a huge image-only PDF into 200 separate files will stress the tab more than cutting the same file into four ranges. If the browser slows down, split in two passes: first into large chunks, then split those chunks. You do not need an ApkaOS account and there is no watermark on any piece.

Page numbers in the PDF viewer are not always the numbers printed on the paper. Front matter numbered i, ii, iii can shift “page 12” in the tool relative to “page 12” in the footer. Open the source, note the viewer page index for the first and last page of each range, and split against those indices. After download, open the first and last page of each output. A one-page overrun is the usual mistake—an extra blank, or a leftover header sheet from the next section.

Use split when you received a bundle you did not assemble: a court annexure dump, a property file from a lawyer, a “all drawings” export from an architect, or a combined marksheet pack from a university portal. You are not trying to hide pages from a file you still need whole; you are distributing pieces. If your goal is to send the same document minus two confidential pages, that is Delete PDF Pages, not split. If your goal is one slim PDF of selected pages, that is extract.

Naming the outputs saves pain later. If the tool downloads a ZIP, unpack it and rename immediately: \`statement-2026-01.pdf\`, \`statement-2026-02.pdf\`. Do not leave \`split-003.pdf\` sitting in Downloads. The next time you need March, you will not remember which number it was.

ApkaOS Split PDF is free and has no signup. Close the tab when you are finished. The original remains on your disk unless you delete it yourself. Keep that original until every recipient confirms they have the right slice. Splitting is cheap to repeat; reconstructing a discarded source is not.`,
    tips: [
      "Use ranges (1–8, 9–20) when the reader will file by section; use one-file-per-page only when each leaf must travel alone.",
      "Match viewer page numbers, not printed footers, when the PDF has roman-numeral front matter.",
      "If a huge scan stalls, split into a few large chunks first, then split those chunks.",
      "Rename ZIP contents immediately so \`split-003.pdf\` does not become a mystery next month.",
    ],
    faq: [
      {
        question: "Can I split a PDF into individual pages?",
        answer:
          "Yes. Choose a one-file-per-page split and download a ZIP of single-page PDFs. Use ranges instead when you want sections, not every leaf as its own file.",
      },
      {
        question: "Is the original PDF uploaded when I split it?",
        answer:
          "No. Split PDF runs in your browser on apkaos.in. The source file and the pieces you download never go to an ApkaOS server.",
      },
      {
        question: "What is the difference between split and extract?",
        answer:
          "Extract produces one new PDF containing only the pages you keep. Split produces multiple files—every page, or several ranges—when you need pieces, not one slim packet.",
      },
      {
        question: "Is there a watermark on split files?",
        answer:
          "No. Each output PDF contains only the pages you cut. ApkaOS does not add a logo, banner, or stamp.",
      },
      {
        question: "How large a PDF can I split?",
        answer:
          "Typical limit is about 250MB per file, limited by your device memory. Very large image-only scans split more smoothly in a couple of passes.",
      },
      {
        question: "Do I need Adobe Acrobat or an ApkaOS account?",
        answer:
          "No. Open the tool in a modern browser, drop the PDF, and download. There is no signup and nothing to install.",
      },
    ],
    searchKeywords: [
      "split pdf",
      "split pdf pages",
      "pdf splitter online",
      "separate pdf pages",
      "split pdf no upload",
      "break pdf into files",
      "split pdf apkaos",
    ],
  },
  "compress-pdf": {
    seoTitle: "Compress PDF Online Free — Shrink Size Locally | ApkaOS",
    seoDescription:
      "Reduce PDF file size in your browser for email and portal uploads. ApkaOS compresses locally—no upload, no account, no watermark. Free, typical 250MB.",
    intro:
      "Portals bounce PDFs that exceed a few megabytes. ApkaOS Compress PDF shrinks bulky reports, scans, and slide decks locally so you can attach them to email or upload them on time. Nothing is sent to a server. The tool is free, has no watermark, needs no account, and typically handles files up to 250MB.",
    howToSteps: [
      "Open Compress PDF on apkaos.in and drop the oversized PDF.",
      "Start compression. The browser rewrites the file locally—nothing is uploaded.",
      "Compare the new size with the original. If a portal still rejects it, compress once more or drop unused pages first.",
      "Download the smaller PDF and open a few pages to confirm text and scans still look acceptable.",
    ],
    benefits: [
      "Compression runs in the browser so statements and reports never leave your device",
      "Shrink files for email, WhatsApp, and portal caps without a watermark",
      "Free to use with no account and no daily compression limit",
      "Typical 250MB input limit—useful for scanned books and slide-heavy decks",
    ],
    useCases: [
      "Squeeze a 25MB scanned affidavit so it fits a 5MB court or RTI upload field",
      "Shrink a photo-heavy project report before emailing an examiner",
      "Reduce a slide-export PDF so it can travel through a company mail gateway",
      "Compress a property-document scan for a housing-society WhatsApp group",
    ],
    guide: `Email gateways and government portals do not care that your scan is “high quality.” They care that the attachment is 4.8MB, not 26MB. ApkaOS Compress PDF exists for that mismatch. You drop a bulky PDF in the browser, wait while the tab rewrites it, and download a smaller file. The original never leaves your device. There is no signup, no watermark, and a typical 250MB ceiling.

Compression is not merge, split, or convert. It aims to keep the same pages and the same reading order while throwing away bulk you do not need: oversized embedded images, redundant streams, and scan resolution far above what a screen or a cheap laser printer will show. Text-heavy PDFs that were born digital (exported from Word or LaTeX) often shrink only a little, because they were already compact. The wins are almost always in scanned papers, photographed whiteboards, and slide decks exported with full-resolution photos on every slide.

Know the destination before you chase the smallest possible file. A 2MB court upload field is less forgiving than a 25MB university LMS. Compress until you are under the cap, then stop. A second or third pass can help when the first pass still leaves fat images, but each pass can soften photographs. Open a page with small print and a page with a photo after you download. If a signature looks muddy or a table’s rules vanish, you went too far—keep the previous version.

If the PDF is large because it contains pages you do not need, compression is the wrong first step. Delete blank backs, duplicate scans, and unused annexures, then compress what remains. Ten discarded pages save more than a heroic compress of pages nobody will read. If you only need three pages from a 90-page scan, extract those three and compress the extract. Do not compress the whole book “just in case.”

Local processing means your device does the work. A 200MB scan of a bound register will make the tab work hard. Close other heavy tabs, keep the laptop plugged in, and be patient. If the browser runs out of memory, split the scan into two ranges, compress each half, then merge the halves. That path is slower to describe than “one click,” but it finishes on machines that cannot hold the whole file in RAM at once.

Scans from phone apps are a common culprit. A 12-megapixel photo of each A4 page, wrapped in a PDF, is a 40MB “document” that looks no sharper in Gmail than an 8MB version. Compress those. Conversely, do not expect miracles from a PDF that is already 400KB of selectable text. If a portal still rejects a small text PDF, the problem is usually format or password protection, not size.

ApkaOS does not keep your file and does not add a logo to the cover. Download the result, rename it with the purpose (\`affidavit-compressed.pdf\`), and keep the original until the portal shows a green tick. If the upload fails for reasons other than size, you still have the uncompressed master. Compression is free to repeat on apkaos.in whenever the next form announces a new megabyte cap.`,
    tips: [
      "Delete or extract unused pages before compressing—fewer pages beat a harsher crush of a full scan.",
      "Stop when you are under the portal cap; extra passes can soften signatures and photos.",
      "Text-only exports shrink little; photo scans and slide decks shrink a lot.",
      "If a huge file stalls the tab, split, compress each part, then merge the parts.",
    ],
    faq: [
      {
        question: "Will compressing a PDF upload it to ApkaOS?",
        answer:
          "No. Compress PDF runs locally in your browser. Statements, affidavits, and reports are not sent to our servers.",
      },
      {
        question: "How small will my PDF become?",
        answer:
          "It depends on the contents. Scanned photos and slide decks often drop sharply. Born-digital text PDFs may shrink only a little because they are already compact.",
      },
      {
        question: "Is the compressed file watermarked?",
        answer:
          "No. ApkaOS never stamps a watermark. You download a smaller PDF of the same pages, not a branded preview.",
      },
      {
        question: "What file size can I compress?",
        answer:
          "Typical input limit is about 250MB, depending on device memory. Very large scans may need to be split, compressed in parts, then merged.",
      },
      {
        question: "Will text stay selectable after compression?",
        answer:
          "If the original had a text layer, compression aims to keep it. Image-only scans stay image-only; this tool does not run OCR.",
      },
      {
        question: "Do I need an account to compress PDFs?",
        answer:
          "No. The tool is free on apkaos.in with no signup and no daily cap for browser compression.",
      },
    ],
    searchKeywords: [
      "compress pdf",
      "reduce pdf size",
      "shrink pdf online",
      "compress pdf no upload",
      "pdf compressor free",
      "compress pdf for email",
      "compress pdf apkaos",
    ],
  },
  "rotate-pdf": {
    seoTitle: "Rotate PDF Pages Online Free — Fix Orientation | ApkaOS",
    seoDescription:
      "Rotate PDF pages 90° or 180° in your browser to fix sideways scans. ApkaOS rotates locally—no upload, no account, no watermark. Free, typical 250MB limit.",
    intro:
      "Phone scans land sideways more often than not. ApkaOS Rotate PDF turns pages 90 or 180 degrees in the browser so a form prints the right way up. Your file is never uploaded. Use it free, with no watermark and no signup, on documents typically up to 250MB. Fix one page or the whole stack.",
    howToSteps: [
      "Open Rotate PDF on apkaos.in and drop the PDF with the wrong orientation.",
      "Choose 90° clockwise, 90° counter-clockwise, or 180° for the pages that need it.",
      "Apply the rotation locally in your browser. Nothing is uploaded.",
      "Download the corrected PDF and check on-screen and in print preview before you send it.",
    ],
    benefits: [
      "Rotation runs in the browser—IDs and forms never leave your device",
      "Fix one page or a whole stack without Acrobat or a signup",
      "No watermark on the corrected file; the tool is free on apkaos.in",
      "Typical 250MB limit for scanned packets and mixed-orientation exports",
    ],
    useCases: [
      "Turn a sideways Aadhaar or passport scan so a KYC portal accepts the page",
      "Fix a phone-scanned rent agreement where every other page is upside down",
      "Rotate landscape CAD sheets that exported into a portrait report by mistake",
      "Correct a mixed lecture PDF so students are not tilting phones for half the slides",
    ],
    guide: `A scanner lid, a phone camera, and a “save as PDF” button do not agree on which way is up. The result is a form that looks fine in one viewer and prints as a landscape strip of unreadably small type in another. ApkaOS Rotate PDF turns pages 90° or 180° in your browser so the file matches how a human actually reads it. The PDF never leaves your device. There is no account, no watermark, and a typical 250MB limit.

Rotation is a display and print fix, not a crop and not a compress. Pixels stay; only the page box’s orientation changes. That is why a page that was scanned at an angle still looks crooked after a 90° turn—you need a crop or a rescan for skew, not another rotation. Use rotate when the whole page is a clean quarter-turn or a flip: a phone held in portrait over a landscape certificate, a feeder that grabbed a sheet upside down, or a slide deck exported with the wrong page setup.

Mixed documents are the usual headache. Page 1 is a portrait covering letter; pages 2–5 are landscape drawings; page 6 is a portrait signature sheet. Rotating the entire file 90° “to fix the drawings” ruins the letter. Rotate only the pages that are wrong. If most pages are already correct, it is faster to extract the bad pages, rotate that extract, then merge it back in the right slot—or to rotate in place when the tool lets you target specific pages. Check the result by scrolling the whole file once. Viewers remember the last zoom; a page can look upright in a thumbnail and still be wrong when printed.

Printing is the real test. On-screen rotation can look fine while a desktop printer still uses an old cached orientation. After you download from ApkaOS, open the file, use print preview, and confirm that portrait pages fill the sheet and landscape pages use landscape paper (or rotate to portrait if the clerk’s printer has no landscape tray). Government counters and bank branches will not flip sheets for you.

Do not confuse rotate with “make this scan look like a photo.” JPG and PNG tools change format. Compress changes size. Rotate does not shrink a 20MB scan and does not sharpen blurry text. If a page is both sideways and huge, rotate first so you can read it, then compress. If only two pages of a 40-page file are sideways, fix those two rather than rotating the whole document and rotating the good pages back.

Local processing matters for KYC packs and signed contracts. You should not upload an ID scan to a random rotate site. On ApkaOS the bytes stay in the tab. Close it when you are done. Keep the un-rotated original until the portal or the printer confirms the new file. Rotation is free to repeat. If you guess 90° the wrong way, rotate again—two wrong 90° turns are a 180°, which is often what an upside-down feeder actually needed.

Phone scanner apps sometimes save a page that looks upright in the app and sideways in every other PDF reader, because they wrote a rotation flag instead of rewriting the page. ApkaOS rewrites the page orientation into the file you download, which is what most portals and printers honour. If a picky uploader still complains, export the page to PNG, then rebuild a one-page PDF from that image—but try a simple rotate first. It is the smaller, reversible fix.`,
    tips: [
      "Rotate only the pages that are wrong; a full-file 90° turn will break pages that were already upright.",
      "Use print preview, not just on-screen view, before you send a form to a clerk or a portal.",
      "A crooked scan needs a rescan or crop—90° rotation will not fix skew.",
      "Keep the original until the destination accepts the rotated file; a wrong-way turn is easy to undo.",
    ],
    faq: [
      {
        question: "Can I rotate only some pages in a PDF?",
        answer:
          "Yes. Target the pages that are sideways or upside down. Leave covering letters and already-correct sheets alone so you do not create a new mess.",
      },
      {
        question: "Does rotate upload my PDF?",
        answer:
          "No. Rotation runs in your browser on apkaos.in. ID scans and signed forms never go to an ApkaOS server.",
      },
      {
        question: "Will the rotated PDF have a watermark?",
        answer:
          "No. You get the same pages, turned the right way up, with no ApkaOS stamp.",
      },
      {
        question: "What rotations are supported?",
        answer:
          "Use 90° clockwise, 90° counter-clockwise, or 180°. Those cover feeder mix-ups and phone scans. Skewed photos need a rescan, not another quarter-turn.",
      },
      {
        question: "Is there a file size limit?",
        answer:
          "Typical limit is about 250MB per PDF, depending on device memory. Large scanned packets rotate more comfortably on a desktop than on a low-RAM phone.",
      },
      {
        question: "Do I need an account to rotate PDFs?",
        answer:
          "No. The tool is free, with no signup and no watermark. Open it, drop the file, download the correction.",
      },
    ],
    searchKeywords: [
      "rotate pdf",
      "rotate pdf pages",
      "fix sideways pdf",
      "rotate pdf online free",
      "rotate pdf no upload",
      "upside down pdf",
      "rotate pdf apkaos",
    ],
  },
  "delete-pages-pdf": {
    seoTitle: "Delete PDF Pages Online Free — Remove Locally | ApkaOS",
    seoDescription:
      "Remove blank or unwanted PDF pages in your browser and keep the rest. ApkaOS deletes locally—no upload, no account, no watermark. Free, typical 250MB.",
    intro:
      "Blank sheets, duplicate scans, and leftover answer keys should not travel with the file you send. ApkaOS Delete PDF Pages removes the pages you mark and rebuilds the document in your browser. Nothing is uploaded. The tool is free, has no watermark, needs no account, and typically accepts files up to 250MB.",
    howToSteps: [
      "Open Delete PDF Pages on apkaos.in and drop the PDF that still contains pages you do not want to send.",
      "Mark blank backs, duplicates, answer keys, or confidential annexures for removal.",
      "Run the delete locally. The browser rebuilds the PDF without those pages—nothing is uploaded.",
      "Download the slimmer file and scroll it once to confirm the remaining pages still read in order.",
    ],
    benefits: [
      "Deletion runs in the browser so the source PDF never leaves your device",
      "Strip blanks and sensitive leaves without Acrobat, a watermark, or an account",
      "Keep one document identity—same file, fewer pages—rather than a new extract name",
      "Typical 250MB limit, free on apkaos.in",
    ],
    useCases: [
      "Strip the printed answer key from a practice paper before sharing it with a class",
      "Drop blank ‘intentionally left blank’ sheets from a scanned government form",
      "Remove a salary annexure from a contract PDF before forwarding it to a vendor",
      "Delete duplicate feeder scans so a 40-page affidavit is actually 20 pages",
    ],
    guide: `The PDF you want to send is often the PDF you have, minus a few pages you should never have included. A blank back from a duplex scan. A duplicate of page 4 because the feeder grabbed twice. An answer key that was stapled behind a practice paper. A salary schedule sitting after a contract you are about to forward. ApkaOS Delete PDF Pages removes those leaves and writes a new file that is still “the same document,” just shorter. The work stays in your browser. Nothing is uploaded. There is no watermark and no account. Typical files up to 250MB are fine.

Delete is the opposite instinct from extract. Extract says: I want a new, smaller PDF that contains only pages 12–18. Delete says: I want this report to remain this report, but pages 3, 19, and 40 must disappear. If you would still call the result by the same name—\`offer-letter.pdf\`, \`visa-form.pdf\`—you are in delete territory. If you would rename it \`chapter-3-only.pdf\`, use Extract PDF Pages.

Work from a checklist, not from memory. Open the source, write down viewer page numbers to remove, then mark them in the tool. Duplex scans produce a rhythm: odd pages are content, even pages are blank. It is easy to delete one too many and drop a real even page that had a stamp on the back. After download, compare page count: source pages minus deletions should equal the new count. Then spot-check the junctions—what is now page 12 should be what used to be page 14 if you removed 13 and a blank.

Confidential pages are the serious case. Deleting a page from a PDF you then send is not the same as redacting text on a page you keep. If a salary figure sits on a page you still need, deletion will not help; you need a redacted export or a rescan of a masked printout. Use delete only when the entire page can go. Also remember that some PDFs carry unused objects. For ordinary office files, a page delete in the browser is enough. For highly sensitive legal production, follow your counsel’s process. ApkaOS does not keep the file either way, because it never received it.

Blank-page cleanup is the everyday case. Phone scanner apps love to add a black sheet or a thumb-blurred extra. Those pages inflate compress jobs and annoy clerks who print the whole file. Delete them first, then compress if the portal still complains about megabytes. Removing ten blanks often does more for size than a harsh compress of pages you still need.

Do not delete pages as a substitute for split. If each remaining section must become its own file for different people, split or extract after you have cleaned the source—or clean each split piece. A teacher who deletes the answer key and then splits by question is following a sane order: remove what must never leak, then cut what must travel separately.

ApkaOS Delete PDF Pages is free. Keep the original until the recipient opens the cleaned file. You cannot undelete from the download; you can only go back to the source and delete again with a better list. That is a feature. Treat the source as the master and the deleted-pages file as the thing you actually send.`,
    tips: [
      "List viewer page numbers to remove before you click anything—duplex blanks are easy to miscount.",
      "Confirm new page count equals old count minus deletions, then check the pages on either side of each cut.",
      "Delete entire confidential pages; this tool does not redact text that stays on a kept page.",
      "Remove blanks before you compress—fewer pages beat crushing a file full of empty sheets.",
    ],
    faq: [
      {
        question: "Is delete the same as extract?",
        answer:
          "No. Delete keeps the same document minus the pages you mark. Extract builds a new PDF that contains only the pages you want to keep, usually under a new purpose.",
      },
      {
        question: "Are my files uploaded when I delete pages?",
        answer:
          "No. Page deletion runs in your browser on apkaos.in. The source and the cleaned file never go to an ApkaOS server.",
      },
      {
        question: "Can I recover a page after I download?",
        answer:
          "Not from the cleaned file. Keep the original PDF. If you removed the wrong leaf, delete again from the source with a corrected list.",
      },
      {
        question: "Will the cleaned PDF have a watermark?",
        answer:
          "No. ApkaOS does not stamp remaining pages. You download a shorter PDF, not a branded copy.",
      },
      {
        question: "Does deleting pages redact confidential text?",
        answer:
          "Only if the whole page is removed. Text on pages you keep is unchanged. For in-page secrets, mask and rescan or use a dedicated redaction workflow.",
      },
      {
        question: "What size PDF can I edit?",
        answer:
          "Typical limit is about 250MB, depending on memory. No account is required. The tool is free.",
      },
    ],
    searchKeywords: [
      "delete pdf pages",
      "remove pages from pdf",
      "remove blank pdf pages",
      "delete pdf pages online",
      "delete pdf pages no upload",
      "strip pdf pages",
      "delete pdf pages apkaos",
    ],
  },
  "extract-pages-pdf": {
    seoTitle: "Extract PDF Pages Online Free — Keep Only Some | ApkaOS",
    seoDescription:
      "Copy selected PDF pages into a new smaller file in your browser. ApkaOS extracts locally—no upload, no account, no watermark. Free, typical 250MB limit.",
    intro:
      "You rarely need the whole report—just the signed page, one chapter, or the invoice leaf. ApkaOS Extract PDF Pages copies only those pages into a new file, leaving the original untouched. Processing stays in the browser. Free, no watermark, no account, typical 250MB limit. Select the pages you need, extract them, and download the smaller PDF.",
    howToSteps: [
      "Open Extract PDF Pages on apkaos.in and drop the source PDF. The original will stay on your disk.",
      "Select the pages or ranges you need—a chapter, a signed last page, an invoice leaf.",
      "Run the extract locally in your browser. Nothing is uploaded.",
      "Download the new, smaller PDF and check that it contains only the pages you meant to share.",
    ],
    benefits: [
      "Extraction runs in the browser; the source PDF is never uploaded",
      "Build a purpose-built file (one chapter, one invoice) without a watermark or account",
      "Leave the original untouched so you can extract a different slice later",
      "Typical 250MB limit, free on apkaos.in",
    ],
    useCases: [
      "Pull only the signed last page of a contract to send to a counterparty’s clerk",
      "Lift one textbook chapter from a combined course pack for weekend study",
      "Extract the invoice page from a 40-page merchant statement for reimbursement",
      "Copy map plates out of a project report so a printer can run them in colour",
    ],
    guide: `Most people do not need the PDF they downloaded. They need four pages from it. A clerk wants the signed last leaf, not the 30-page schedule. A student wants Chapter 4, not the whole course pack. Accounts wants the invoice page from a merchant statement. ApkaOS Extract PDF Pages copies those pages into a new file and leaves the source alone. The copy is built in your browser. Nothing is uploaded. There is no watermark, no account, and a typical 250MB limit.

Extract and delete are cousins with different jobs. Delete edits the identity of a document: it is still the offer letter, minus two annexures. Extract creates a new identity: \`signed-page.pdf\`, \`chapter-4.pdf\`, \`invoice-mar.pdf\`. If you would be uncomfortable sending the rest of the file, extract is the right verb. You are not “cleaning” a document you still intend to circulate whole; you are publishing a slice.

Ranges should match how the recipient will use the file. One signed page is a single-page extract. A chapter is a contiguous range. Invoice plus tax breakup might be pages 12 and 14—two non-contiguous leaves in one extract if the tool allows a list, or two extracts you then merge. Do not extract an entire 80-page section “to be safe” when the request was for the table on page 17. Extra pages reintroduce the original problem: too much file, too much disclosure.

The source stays on disk. That is the point. You can extract a different slice tomorrow without reconstructing anything. Name the download after the purpose, not after the source. \`board-exam-full.pdf\` should remain the board file; \`physics-paper.pdf\` is the extract. If you overwrite the source with the extract, you have accidentally performed a destructive delete.

Viewer page numbers still matter. Printed “page 1” of a chapter may be viewer page 87. Note the indices before you select. After download, check the first and last page of the extract and the page count. A one-page miss at either end is common when a section starts with a half-title you forgot.

Extract is also the polite way to share. A 90-page medical file in an email is a burden and a privacy risk. Three relevant reports are enough for a second opinion. A full bank PDF in a visa packet may include months you were not asked for. Extract the months listed on the checklist. If several extracts from several sources must travel as one attachment, extract first, then merge the extracts. Do not merge whole files and hope the officer only reads the middle.

Size often drops as a side effect, but extract is not compress. A three-page photo scan can still be 12MB. If a portal cap remains, compress the extract. If you needed every page but smaller, you wanted compress, not extract. If you needed every page as its own file, you wanted split.

ApkaOS Extract PDF Pages is free. Close the tab when you are done. Keep the source. Treat extracts as disposable, purpose-built copies. When the purpose changes, extract again rather than forwarding an old slice that contains one page too many.`,
    tips: [
      "Name the download after the purpose (\`invoice-mar.pdf\`), not after the 90-page source.",
      "Never overwrite the original with the extract—you will want a different slice later.",
      "Check viewer indices when chapters do not start at page 1 of the file.",
      "Extract first, then merge or compress the slice; do not drag the whole book through those tools.",
    ],
    faq: [
      {
        question: "Does extract change my original PDF?",
        answer:
          "No. Extract writes a new file with only the pages you selected. The source stays on your disk unless you replace it yourself.",
      },
      {
        question: "Is extraction uploaded to ApkaOS?",
        answer:
          "No. The tool runs in your browser. Course packs, contracts, and statements never leave your device.",
      },
      {
        question: "When should I extract instead of delete?",
        answer:
          "Extract when the result is a new, purpose-built PDF (one chapter, one invoice). Delete when you still want the same document, just with a few pages gone.",
      },
      {
        question: "Is the extracted PDF watermarked?",
        answer:
          "No. ApkaOS does not add a logo. The new file contains only the pages you copied.",
      },
      {
        question: "Can I extract non-contiguous pages into one file?",
        answer:
          "Select a list or several ranges when you need pages that are not a single block—then download one extract, or extract twice and merge.",
      },
      {
        question: "Do I need an account? What is the size limit?",
        answer:
          "No account. The tool is free. Typical input limit is about 250MB, depending on your device memory.",
      },
    ],
    searchKeywords: [
      "extract pdf pages",
      "extract pages from pdf",
      "save pdf pages as new file",
      "extract pdf online free",
      "extract pdf no upload",
      "copy pdf pages",
      "extract pdf pages apkaos",
    ],
  },
  "pdf-to-jpg": {
    seoTitle: "PDF to JPG Converter Free — Photos in Browser | ApkaOS",
    seoDescription:
      "Turn PDF pages into JPG images in your browser—smaller files for photos and scans. ApkaOS converts locally: no upload, no account, no watermark. Free, 250MB.",
    intro:
      "JPG is the format you want when PDF pages are photos or photo-heavy scans and you need a smaller image for WhatsApp or a form upload. ApkaOS PDF to JPG renders each page locally in your browser. No upload, no account, no watermark. Typical 250MB limit. Download individual JPGs ready to share.",
    howToSteps: [
      "Open PDF to JPG on apkaos.in and drop the PDF whose pages you want as photos.",
      "Convert. Each page is rendered to JPG in your browser—nothing is uploaded.",
      "Download the JPG files (or a ZIP) and check a photo page and a text page for quality.",
      "If a form needs one image, pick that page’s JPG. If you needed sharp diagrams, use PDF to PNG instead.",
    ],
    benefits: [
      "Conversion runs locally—pages never leave your device",
      "JPG keeps photo scans small enough for WhatsApp, email, and many upload fields",
      "No watermark, no account, free on apkaos.in",
      "Typical 250MB PDF limit for multi-page photo packets",
    ],
    useCases: [
      "Export photo pages from a scanned album PDF to share a few pictures on WhatsApp",
      "Turn a one-page photo ID PDF into a JPG a KYC form will actually accept",
      "Pull a product-shot page out of a catalogue PDF for a marketplace listing",
      "Make a smaller image of a site photograph that currently lives only inside a report PDF",
    ],
    guide: `A PDF is a container. When the page is really a photograph—an ID shot, a site photo, a catalogue spread—you often need a JPG, not another PDF. Portals ask for “photo in JPG.” WhatsApp compresses PDFs poorly and images well. Designers want a still they can drop into a listing. ApkaOS PDF to JPG renders each page to a JPEG in your browser. The PDF is not uploaded. There is no account, no watermark, and a typical 250MB limit.

JPG is the lossy, photo-oriented choice. It shines when the page is continuous-tone: faces, landscapes, product shots, faded paper with colour. File size stays modest, which is the point of JPEG. It is the wrong default when the page is mostly text, a spreadsheet screenshot, a circuit diagram, or a form with hairline rules. Those edges halo and muddy in JPEG. For those pages, use PDF to PNG. If you are not sure, convert one representative page both ways and compare: if the PNG is only slightly larger and the type looks cleaner, keep PNG. If the page is a photo and the PNG is huge, keep JPG.

This tool does not extract an image that was already embedded in the PDF as a standalone asset. It renders the whole page—the photo plus any caption, header, or crop marks sitting on that page—into one JPG per page. If you only wanted the photo in the middle, you may still need to crop the JPG in an image editor. If you needed selectable text, you wanted PDF to Text, not an image.

Resolution versus size is the trade you are making. A high-resolution render looks better in print and explodes in megabytes. A WhatsApp-bound ID photo does not need poster resolution. Convert, check the file size, and only re-render higher if a portal rejects the image as “too blurry” rather than “too large.” Many KYC fields want both: under 2MB and still readable. JPG is how you get there from a 15MB one-page PDF scan.

Multi-page PDFs become many JPGs. Name them as you would split outputs: \`id-front.jpg\`, not \`page-1.jpg\`, if you can. A ZIP of untitled numbers is how the wrong photo gets uploaded to a form. You do not need to convert pages you will not use—extract those pages to a small PDF first, then convert. Rendering a 90-page report to 90 JPGs “in case” is slow and fills Downloads with junk.

Local rendering uses your device. A 200-page photo scan will work the CPU and memory. Convert in batches if the tab struggles. Close the tab when you are done; ApkaOS never had the file. The original PDF remains your master. JPGs are disposable derivatives. If you later need a sharper diagram from the same source, run PDF to PNG on those pages rather than upscaling a JPG.

ApkaOS PDF to JPG is free. No watermark is baked into the pixels. That matters when a portal’s clarity check would otherwise see a logo across a face. Download, rename, upload. If the field still wants a PDF, you may be in the wrong tool—Images to PDF can rebuild a PDF from the JPGs, but starting from a good PDF and staying in PDF is simpler when the destination accepts PDF.`,
    tips: [
      "Choose JPG for photo pages; switch to PDF to PNG when type, tables, or diagrams look muddy.",
      "Extract the pages you actually need before converting a long report to dozens of images.",
      "Aim at the portal’s megabyte cap—KYC fields often want under 2MB, not poster resolution.",
      "Rename outputs (\`id-front.jpg\`) before you upload so the wrong page never goes to a form.",
    ],
    faq: [
      {
        question: "Should I convert a PDF to JPG or PNG?",
        answer:
          "Use JPG for photographs and photo-heavy scans when you need a smaller image. Use PNG when the page is text, a table, or a diagram and you need sharp edges.",
      },
      {
        question: "Does PDF to JPG upload my file?",
        answer:
          "No. Pages are rendered in your browser on apkaos.in. IDs and photo scans never leave your device.",
      },
      {
        question: "Will the JPG have a watermark?",
        answer:
          "No. ApkaOS does not stamp converted images. You get a plain JPEG of the page.",
      },
      {
        question: "Can I convert only one page of a long PDF?",
        answer:
          "Extract that page first with Extract PDF Pages, then convert the one-page PDF. You avoid a ZIP of unused images.",
      },
      {
        question: "Is the text in the JPG selectable?",
        answer:
          "No. JPG is a picture of the page. For copy-paste text from a born-digital PDF, use PDF to Text instead.",
      },
      {
        question: "Do I need an account? What size is supported?",
        answer:
          "No account. The converter is free. Typical PDF limit is about 250MB, depending on memory.",
      },
    ],
    searchKeywords: [
      "pdf to jpg",
      "convert pdf to jpg",
      "pdf to jpeg online",
      "pdf to jpg no upload",
      "pdf page to image",
      "pdf to jpg free",
      "pdf to jpg apkaos",
    ],
  },
  "pdf-to-png": {
    seoTitle: "PDF to PNG Converter Free — Sharp Text Pages | ApkaOS",
    seoDescription:
      "Convert PDF pages to PNG images in your browser—sharper text, tables, and diagrams than JPG. Local, no upload, no account, no watermark. Free, typical 250MB.",
    intro:
      "PNG keeps sharp edges on text, tables, and diagrams that JPG smears. Use ApkaOS PDF to PNG when you need a crisp page image for a slide, a printout, or a screenshot-style share. Conversion runs in your browser—nothing is uploaded. Free, no watermark, no signup, typical 250MB file limit.",
    howToSteps: [
      "Open PDF to PNG on apkaos.in and drop the PDF that contains text, forms, or diagrams.",
      "Convert each needed page to PNG in your browser. Nothing is uploaded.",
      "Open a PNG at 100% zoom and check small type, table rules, and arrowheads.",
      "Download the images. If the pages are photographs and the PNGs are huge, use PDF to JPG instead.",
    ],
    benefits: [
      "Local rendering—forms and diagrams never leave your device",
      "Lossless PNG keeps type, rules, and line art sharper than JPEG",
      "No watermark, no account, free on apkaos.in",
      "Typical 250MB PDF limit for slide decks and schematic packets",
    ],
    useCases: [
      "Snapshot a filled form page to paste into a slide when the PDF viewer will not present well",
      "Export a wiring diagram or flowchart page for a report figure without JPEG halos",
      "Turn a table-heavy statement page into a PNG a chat app will display at readable type",
      "Capture a UI spec sheet from a PDF so developers can pin a crisp image in a ticket",
    ],
    guide: `JPEG is built for photographs. PDF pages are often not photographs. They are forms, tables, UML, circuit diagrams, maps with thin contours, slide text, and screenshots of software. Those pages need sharp edges. ApkaOS PDF to PNG renders each page to a lossless PNG in your browser so hairline rules and small type survive. The PDF is not uploaded. There is no account, no watermark, and a typical 250MB limit.

PNG versus JPG is the decision this page exists to make obvious. PNG stores exact pixels. Text stays crisp; a 1-pixel table rule stays a line instead of a muddy band. The cost is size. A full-colour photo page as PNG can be several times larger than the same page as JPG, with no visual win a phone screen will show. If the page is a face or a site photo, use PDF to JPG. If the page would still look right as a screenshot, use PNG. Catalogues that mix both should be split by page type: extract photo plates to JPG, extract diagram plates to PNG.

Rendering a page is not the same as pulling a native PNG that an author embedded. You get a picture of the full page, including headers and footers. That is what you want for “this is how the form looks filled.” It is not what you want if you needed only the chart in the centre—crop afterwards, or go back to the source application. It is also not OCR. You cannot copy a sentence out of the PNG; you can only see it. For copy-paste from a text-layer PDF, use PDF to Text.

Use PNG when the next step is a slide, a ticket, a print at 100%, or a chat preview that must remain readable. WhatsApp and similar apps recompress images; starting from a sharp PNG still beats starting from an already-soft JPG when the subject is text. For a tiny upload field that insists on JPG and 500KB, PNG may simply not fit—convert to JPG as a last resort and accept some smear, or extract a cropped region.

Long decks should not all become PNGs by habit. Extract the three slides you will paste into a document, then convert those. A 60-page PNG dump is slow to render, heavy on disk, and hard to search. Name files after the slide title if you can. Local processing means your laptop does the rasterising. Complex vector pages (CAD exports, tiny type on A3) take longer and use more RAM than a simple letter. If the tab complains, convert fewer pages per pass.

ApkaOS does not stamp a logo on the PNG. That matters for diagrams you will publish. Keep the PDF as master. PNGs are snapshots. If a line looks jaggy, the cause is usually render resolution, not the PNG format—try a higher-quality convert of that one page rather than switching to JPG, which will not invent missing pixels.

The tool is free. No signup. Close the tab when you finish. If you later need those pages as a PDF again, Images to PDF can restack PNGs, but you will have flattened vectors into pixels. Prefer to keep the original PDF whenever the destination still accepts PDF.`,
    tips: [
      "Use PNG for text, forms, tables, and line art; use JPG only when the page is a photograph and size matters more than edges.",
      "Extract the pages you will actually paste or print before converting a whole deck.",
      "Inspect small type at 100% zoom—if it is soft, raise render quality, do not switch to JPEG.",
      "Do not expect to copy text from a PNG; use PDF to Text when you need a .txt.",
    ],
    faq: [
      {
        question: "Why is PNG better than JPG for some PDF pages?",
        answer:
          "PNG is lossless and keeps sharp edges. Text, tables, and diagrams stay readable. JPG is smaller for photos but smears lines and type.",
      },
      {
        question: "Does PDF to PNG upload my document?",
        answer:
          "No. Rendering runs in your browser on apkaos.in. Forms and schematics never leave your device.",
      },
      {
        question: "Will the PNG include a watermark?",
        answer:
          "No. ApkaOS does not stamp converted images. You get a plain PNG of the page.",
      },
      {
        question: "Can I copy text from the PNG?",
        answer:
          "No. PNG is a picture. If the PDF has a text layer and you need words, use PDF to Text.",
      },
      {
        question: "Why is my PNG so large?",
        answer:
          "Lossless photo pages are heavy. For photographs, use PDF to JPG. For diagrams, the extra size is the price of sharp lines.",
      },
      {
        question: "Is an account required? What is the limit?",
        answer:
          "No account. The tool is free. Typical PDF input is about 250MB, depending on device memory.",
      },
    ],
    searchKeywords: [
      "pdf to png",
      "convert pdf to png",
      "pdf to png online",
      "pdf to png no upload",
      "pdf page to png",
      "sharp pdf to image",
      "pdf to png apkaos",
    ],
  },
  "images-to-pdf": {
    seoTitle: "Images to PDF Online Free — Photos to Document | ApkaOS",
    seoDescription:
      "Combine JPG, PNG, or WebP images into one PDF in your browser. ApkaOS builds the file locally—no upload, no account, no watermark. Free, typical 250MB.",
    intro:
      "Camera rolls fill with receipts, ID photos, and whiteboard shots that need to become one document. ApkaOS Images to PDF stacks JPG, PNG, or WebP files into a single PDF in your browser. Files never leave the device. No account, no watermark, free to use, typical 250MB per file. Order the photos, then download.",
    howToSteps: [
      "Open Images to PDF on apkaos.in and drop JPG, PNG, or WebP files (up to 20).",
      "Drag the list into the page order you want—front of ID, back of ID, receipt, and so on.",
      "Build the PDF locally in your browser. Nothing is uploaded.",
      "Download the document, open every page, then compress if an email or portal cap still bites.",
    ],
    benefits: [
      "Images stay on your device—the PDF is assembled in the browser",
      "Stack JPG, PNG, and WebP into one shareable file with no watermark",
      "Reorder pages before you build, free and without an account",
      "Typical 250MB per image, useful for phone scans and whiteboard shots",
    ],
    useCases: [
      "Turn phone photos of shop receipts into one reimbursement PDF for accounts",
      "Build a KYC pack from ID front, ID back, and a selfie still sitting in the camera roll",
      "Make a PDF of whiteboard photos after a workshop so absentees get a single file",
      "Stack property photos (plot, approach road, documents) for a broker WhatsApp send",
    ],
    guide: `Phones capture pages as photos. Institutions still ask for a PDF. The gap between those two facts is this tool. ApkaOS Images to PDF takes JPG, JPEG, PNG, and WebP files, puts each image on its own page, and writes one PDF in your browser. Nothing is uploaded. There is no account, no watermark, and a typical 250MB per-file limit. You can stack up to 20 images.

This is not a scan-quality miracle and it is not OCR. Crooked photos stay crooked. A picture of a printed contract does not become selectable text—that would be PDF to Text on a born-digital file, or a real OCR app on a scan. What you get is a convenient container: one attachment instead of twelve photos, pages in a fixed order, something a clerk can print. Shoot the photos as square-on as you can, in even light, before you convert. The PDF will not straighten a sofa-angle receipt.

Order is the whole product. A KYC PDF that puts the selfie first and the ID back last will be rejected by a human even if every image is sharp. Name files \`01-id-front.jpg\` or drag them in the tool. Receipts should run chronological or by vendor, not by whatever order the camera roll used. Whiteboard shots should follow the session, left-to-right as the board was used. After download, scroll every page. A missing back-of-ID is cheaper to fix now than after a portal closes.

Page size follows the image. A tall phone photo becomes a tall page; a wide whiteboard becomes landscape. That is usually what you want. Mixing a tiny cropped stamp with a 12-megapixel poster shot in one PDF looks odd in print—similar crops produce a calmer document. If the PDF is huge, the cause is almost always the photos, not the PDF wrapper. Compress the PDF after you build it, or shrink the images first. Do not confuse this tool with Compress PDF; build first, then shrink the result if email complains.

Use Images to PDF when the source of truth is the camera roll: receipts, handwritten notes, printed letters you do not have as digital files, site photos, and ID cards. Do not use it to “print” a document you already have as a PDF—that path flattens text into pixels and throws away search. Do not use it as a merge of existing PDFs; that is Merge PDF. If you exported PDF pages to PNG to mark them up and now want them back as a PDF, this tool is the return trip, with the caveat that vectors are gone.

Local assembly is the privacy feature. Receipts show what you bought. ID photos are KYC. Whiteboards show other people’s writing. Those images should not sit on a conversion server. On ApkaOS they never leave the tab. Close it when you are done. Keep the original photos; the PDF is a packet, not an archive. If one page is wrong, rebuild from the images rather than editing a flattened page.

The tool is free. Twenty images cover a typical reimbursement set or a small photo argument for a landlord. If you have more, build two PDFs and merge them. If a counter still wants JPG, you may have built the wrong format—PDF to JPG can take you back, but starting from the images the form asked for is simpler.`,
    tips: [
      "Photograph pages square-on in even light; the PDF will not deskew a bad shot.",
      "Prefix filenames with 01-, 02- so ID fronts, backs, and receipts land in clerk order.",
      "Build the PDF first, then run Compress PDF if the packet misses an email or portal cap.",
      "Keep the original photos—the PDF is a packet, and rebuilding a page is easier from the JPG.",
    ],
    faq: [
      {
        question: "Which image formats can I convert to PDF?",
        answer:
          "JPG, JPEG, PNG, and WebP. Drop up to 20 files, set the order, and download one PDF. Processing stays in your browser.",
      },
      {
        question: "Are my photos uploaded to ApkaOS?",
        answer:
          "No. Images to PDF runs locally. Receipts, IDs, and whiteboard shots never leave your device.",
      },
      {
        question: "Will the PDF be watermarked?",
        answer:
          "No. ApkaOS does not stamp pages. Each image becomes a clean page in the download.",
      },
      {
        question: "Can I search or copy text from a photo PDF?",
        answer:
          "No. This tool does not run OCR. Pictures of pages stay pictures. Use PDF to Text only when a PDF already has a text layer.",
      },
      {
        question: "Why is the PDF still large?",
        answer:
          "It wraps your photos at their existing size. Compress the finished PDF, or use smaller images, if a portal cap still applies.",
      },
      {
        question: "Do I need an account? What is the size limit?",
        answer:
          "No account. The tool is free. Typical limit is about 250MB per image, depending on memory.",
      },
    ],
    searchKeywords: [
      "images to pdf",
      "jpg to pdf",
      "png to pdf",
      "photos to pdf",
      "convert images to pdf",
      "images to pdf no upload",
      "images to pdf apkaos",
    ],
  },
  "pdf-to-text": {
    seoTitle: "PDF to Text Online Free — Extract Without OCR | ApkaOS",
    seoDescription:
      "Copy a PDF’s existing text layer to a .txt file in your browser—no OCR, no upload, no account, no watermark. Free on ApkaOS, typical 250MB file limit.",
    intro:
      "When a PDF already contains a text layer, you should not retype it. ApkaOS PDF to Text copies that text into a .txt file in your browser—no OCR, no upload, no account. It will not read scanned pictures of pages. Free, no watermark, typical 250MB limit. Paste the result into notes or a search.",
    howToSteps: [
      "Open PDF to Text on apkaos.in and drop a PDF that was exported from Word, LaTeX, or another app that wrote real text.",
      "Extract. The browser copies the existing text layer into a .txt file—nothing is uploaded and no OCR runs.",
      "Open the .txt and skim it. If you see little or nothing, the PDF is probably a scan; this tool cannot read pictures of pages.",
      "Copy the text into notes, a search, or a draft. Keep the PDF as the layout master.",
    ],
    benefits: [
      "Extraction is local—the PDF never leaves your browser",
      "No OCR wait: you get the text that is already in the file, fast",
      "Plain .txt with no watermark, no account, free on apkaos.in",
      "Typical 250MB limit for long born-digital reports and papers",
    ],
    useCases: [
      "Pull quotes from a journal PDF into a notes file without retyping paragraphs",
      "Dump a syllabus or circular into text so you can search names and dates in an editor",
      "Copy a born-digital contract’s clauses into a comparison draft",
      "Extract a README-style appendix from a spec PDF for a ticket description",
    ],
    guide: `Many PDFs are not pictures of paper. They were exported from Word, Google Docs, LaTeX, or a website, and they still contain a text layer: real characters, not just ink-coloured pixels. ApkaOS PDF to Text copies that layer into a \`.txt\` file in your browser so you can paste, search, and edit without fighting a PDF viewer. It does not run OCR. It will not “read” a photographed marksheet or a phone scan of a book. If the page is only an image, the output will be empty or nearly empty. That limitation is the product: fast, private, honest.

OCR-less extraction is the right tool when you already know the file was born digital. A company policy PDF, a court judgment downloaded as text, a research paper from an author-accepted manuscript, a syllabus from a university site—these usually have a text layer. A 40MB “PDF” that is 40 photographed pages does not. Try extract once. If you get clean paragraphs, you are done in seconds. If you get nothing, stop; you need a scanner-OCR workflow, not this page, and you should not expect ApkaOS to invent words from pixels here.

Layout will not survive. Columns may run in the wrong order. Headers and footers repeat. Hyphenation at line breaks may split words. Tables become ragged lines. That is normal for text-layer dump. You are not producing a second PDF and you are not producing a Word file with styles. You are producing a string you can grep, cite, or rewrite. Keep the original PDF for page-accurate reading and printing. Use the \`.txt\` as a working copy.

Because nothing is uploaded, you can run this on drafts that should not leave the laptop: unpublished papers, internal memos, contracts still in negotiation. There is no account and no watermark (a watermark would be meaningless on plain text anyway; the point is we do not keep the file). Typical size limit is about 250MB, which is far above any reasonable text PDF. If a file that large is mostly images, you are in the wrong tool.

Do not use PDF to Text as a substitute for PDF to PNG when you needed a picture of a page, or for extract when you needed a few PDF pages to send to someone who must see the layout. Do not use it to “compress” a scan—there is no text to take, and the image is untouched. If you needed images in a PDF, that was Images to PDF going the other way.

After download, open the \`.txt\` in a real editor and scan for obvious garbage: ligatures, missing spaces, or a column that inserted every other sentence. Clean what you will reuse. For citation, go back to the PDF page number; the text file has no stable pagination. If you only needed one paragraph, extracting the whole book is still fine—text is cheap—and you can delete the rest in the editor.

ApkaOS PDF to Text is free. Close the tab when you finish. The PDF remains the source of truth for layout; the \`.txt\` is a convenience copy. When a colleague sends a scan and asks you to “just copy the text,” this tool will not magically help. Tell them you need a digital export, or they need OCR. Setting that expectation saves a wasted convert.`,
    tips: [
      "If the .txt is empty, the PDF is likely a scan—this tool has no OCR and will not read photos of pages.",
      "Keep the PDF for layout and page numbers; use the .txt only as a working, searchable copy.",
      "Expect broken columns and repeating headers; clean the passages you will actually reuse.",
      "Use this on Word/LaTeX exports and official digital downloads, not on phone-scanned books.",
    ],
    faq: [
      {
        question: "Does PDF to Text use OCR?",
        answer:
          "No. It copies the existing text layer only. Photographed or scanned pages without text will yield little or nothing. That is expected, not a failed upload.",
      },
      {
        question: "Is my PDF uploaded to extract text?",
        answer:
          "No. Extraction runs in your browser on apkaos.in. Papers and contracts never leave your device.",
      },
      {
        question: "Will the .txt file have a watermark?",
        answer:
          "No. You get plain text. ApkaOS does not add a header, footer, or stamp.",
      },
      {
        question: "Why is the extracted text out of order?",
        answer:
          "Text-layer dumps follow the PDF’s internal order, which may not match visual columns. Clean the passages you need; keep the PDF for layout.",
      },
      {
        question: "Can I extract text from a scanned marksheet?",
        answer:
          "Not with this tool. A scan is an image. You would need OCR elsewhere, or a digital copy that already contains text.",
      },
      {
        question: "Do I need an account? What size works?",
        answer:
          "No account. The tool is free. Typical limit is about 250MB. Real text PDFs are usually far smaller than that.",
      },
    ],
    searchKeywords: [
      "pdf to text",
      "extract text from pdf",
      "pdf to txt",
      "pdf text extract no ocr",
      "pdf to text no upload",
      "copy text from pdf",
      "pdf to text apkaos",
    ],
  },
};
