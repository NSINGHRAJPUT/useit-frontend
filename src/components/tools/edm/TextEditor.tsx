"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";
import type { Editor } from "@tiptap/react";
import { FreeformImage } from "./FreeformImage";
import { compressImageFile, isImageFile } from "./imageUtils";
import "./editor.css";

type TextEditorProps = {
  onHtmlChange?: (html: string) => void;
  onEditorReady?: (editor: Editor) => void;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      className={active ? "is-active" : undefined}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function TextEditor({ onHtmlChange, onEditorReady }: TextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const onHtmlChangeRef = useRef(onHtmlChange);
  const onEditorReadyRef = useRef(onEditorReady);

  useEffect(() => {
    onHtmlChangeRef.current = onHtmlChange;
    onEditorReadyRef.current = onEditorReady;
  }, [onHtmlChange, onEditorReady]);

  async function insertImageFromFile(file: File | Blob) {
    const current = editorRef.current;
    if (!current) return;
    try {
      const image = await compressImageFile(file);
      const displayWidth = Math.min(320, image.width);
      const displayHeight = Math.round((image.height / image.width) * displayWidth);
      current
        .chain()
        .focus()
        .insertFreeformImage({
          src: image.src,
          width: displayWidth,
          height: displayHeight,
          left: 0,
          top: 0,
          floatSide: "left",
        })
        .run();
    } catch {
      // ignore failed image reads
    }
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: "Start writing… Drop an image anywhere, then drag it to place it.",
      }),
      FreeformImage,
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class: "focus:outline-none",
        "aria-label": "Document editor",
      },
      handleDrop: (_view, event, _slice, moved) => {
        if (moved) return false;
        const files = event.dataTransfer?.files;
        if (!files?.length) return false;
        const file = files[0];
        if (!isImageFile(file)) return false;
        event.preventDefault();
        void insertImageFromFile(file);
        return true;
      },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (!file) continue;
            event.preventDefault();
            void insertImageFromFile(file);
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor: current }) => {
      onHtmlChangeRef.current?.(current.getHTML());
    },
  });

  useEffect(() => {
    editorRef.current = editor;
    if (!editor) return;
    onEditorReadyRef.current?.(editor);
    onHtmlChangeRef.current?.(editor.getHTML());
  }, [editor]);

  if (!editor) {
    return (
      <div className="text-editor-shell rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="px-4 py-8 text-sm text-gray-500">Loading editor…</div>
      </div>
    );
  }

  const activeEditor = editor;

  function setLink() {
    const previous = activeEditor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous || "https://");
    if (url === null) return;
    if (url.trim() === "") {
      activeEditor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    activeEditor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  return (
    <div className="text-editor-shell overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="text-editor-toolbar" role="toolbar" aria-label="Formatting">
        <ToolbarButton
          title="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </ToolbarButton>
        <span className="toolbar-divider" aria-hidden />
        <ToolbarButton
          title="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          Underline
        </ToolbarButton>
        <span className="toolbar-divider" aria-hidden />
        <ToolbarButton
          title="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </ToolbarButton>
        <ToolbarButton
          title="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </ToolbarButton>
        <span className="toolbar-divider" aria-hidden />
        <ToolbarButton
          title="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          List
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. 2. 3.
        </ToolbarButton>
        <span className="toolbar-divider" aria-hidden />
        <ToolbarButton
          title="Align left"
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          Left
        </ToolbarButton>
        <ToolbarButton
          title="Align center"
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          Center
        </ToolbarButton>
        <ToolbarButton
          title="Align right"
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          Right
        </ToolbarButton>
        <span className="toolbar-divider" aria-hidden />
        <ToolbarButton title="Insert link" active={editor.isActive("link")} onClick={setLink}>
          Link
        </ToolbarButton>
        <label className="toolbar-file">
          Add image
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void insertImageFromFile(file);
              event.target.value = "";
            }}
          />
        </label>
      </div>

      <div className="text-editor-canvas-wrap">
        <div className="text-editor-page">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
