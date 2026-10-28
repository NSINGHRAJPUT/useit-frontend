import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { FreeformImageView } from "./FreeformImageView";

export type FreeformImageAttrs = {
  src: string;
  width: number;
  height: number;
  left: number;
  top: number;
  floatSide: "left" | "right" | "none";
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    freeformImage: {
      insertFreeformImage: (attrs: Partial<FreeformImageAttrs> & { src: string }) => ReturnType;
    };
  }
}

export const FreeformImage = Node.create({
  name: "freeformImage",
  group: "block",
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: 280 },
      height: { default: 180 },
      left: { default: 0 },
      top: { default: 0 },
      floatSide: { default: "left" },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[data-freeform="true"]',
        getAttrs: (el) => {
          const element = el as HTMLImageElement;
          return {
            src: element.getAttribute("src"),
            width: Number(element.getAttribute("width") || element.style.width || 280),
            height: Number(element.getAttribute("height") || 180),
            left: Number(element.getAttribute("data-left") || 0),
            top: Number(element.getAttribute("data-top") || element.style.marginTop || 0),
            floatSide: (element.getAttribute("data-float") as FreeformImageAttrs["floatSide"]) || "left",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, width, height, left, top, floatSide } = HTMLAttributes as FreeformImageAttrs;
    const styleParts = [`width: ${width}px`, `margin-top: ${top || 0}px`];
    if (floatSide === "left") {
      styleParts.push("float: left", "margin-right: 1.1em", "margin-bottom: 0.75em");
      if (left > 0) styleParts.push(`margin-left: ${left}px`);
    } else if (floatSide === "right") {
      styleParts.push("float: right", "margin-left: 1.1em", "margin-bottom: 0.75em");
    } else {
      styleParts.push("float: none", "display: block", "margin-left: auto", "margin-right: auto", "margin-bottom: 0.85em");
    }

    return [
      "img",
      mergeAttributes({
        src,
        width,
        height,
        class: "freeform-image",
        "data-freeform": "true",
        "data-float": floatSide,
        "data-left": left,
        "data-top": top,
        style: styleParts.join("; "),
      }),
    ];
  },

  addCommands() {
    return {
      insertFreeformImage:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              width: 280,
              height: 180,
              left: 0,
              top: 0,
              floatSide: "left",
              ...attrs,
            },
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(FreeformImageView, {
      className: "freeform-image-view",
      attrs: ({ node }) => {
        const { width, left, top, floatSide } = node.attrs as FreeformImageAttrs;
        const styleParts = [`width: ${width}px`, `margin-top: ${top || 0}px`, "max-width: 100%"];
        if (floatSide === "left") {
          styleParts.push("float: left", "margin-right: 1.1em", "margin-bottom: 0.75em");
          if (left > 0) styleParts.push(`margin-left: ${left}px`);
        } else if (floatSide === "right") {
          styleParts.push("float: right", "margin-left: 1.1em", "margin-bottom: 0.75em");
        } else {
          styleParts.push(
            "float: none",
            "display: block",
            "margin-left: auto",
            "margin-right: auto",
            "margin-bottom: 0.85em"
          );
        }
        return {
          style: styleParts.join("; "),
          "data-float": floatSide,
        };
      },
    });
  },
});

