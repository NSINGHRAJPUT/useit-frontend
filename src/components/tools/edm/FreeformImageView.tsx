"use client";

import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { useCallback, useRef, type PointerEvent as ReactPointerEvent } from "react";

type FloatSide = "left" | "right" | "none";

function floatFromX(x: number, pageWidth: number, imageWidth: number): FloatSide {
  const center = x + imageWidth / 2;
  const mid = pageWidth / 2;
  if (Math.abs(center - mid) < pageWidth * 0.12) return "none";
  return center < mid ? "left" : "right";
}

export function FreeformImageView({ node, selected, updateAttributes, editor }: NodeViewProps) {
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originLeft: number;
    originTop: number;
    pageWidth: number;
  } | null>(null);
  const resizeRef = useRef<{
    startX: number;
    originWidth: number;
    originHeight: number;
  } | null>(null);

  const { src, width, height, left, top, floatSide } = node.attrs as {
    src: string;
    width: number;
    height: number;
    left: number;
    top: number;
    floatSide: FloatSide;
  };

  const onDragPointerDown = useCallback(
    (event: ReactPointerEvent) => {
      if ((event.target as HTMLElement).dataset.resize === "true") return;
      event.preventDefault();
      event.stopPropagation();

      const page = (event.currentTarget as HTMLElement).closest(".ProseMirror") as HTMLElement | null;
      const pageWidth = page?.clientWidth ?? 760;

      dragRef.current = {
        startX: event.clientX,
        startY: event.clientY,
        originLeft: left,
        originTop: top,
        pageWidth,
      };

      const target = event.currentTarget as HTMLElement;
      target.setPointerCapture(event.pointerId);

      const onMove = (moveEvent: PointerEvent) => {
        if (!dragRef.current) return;
        const dx = moveEvent.clientX - dragRef.current.startX;
        const dy = moveEvent.clientY - dragRef.current.startY;
        const nextLeft = Math.max(0, Math.min(dragRef.current.pageWidth - 40, dragRef.current.originLeft + dx));
        const nextTop = Math.max(0, dragRef.current.originTop + dy);
        const nextFloat = floatFromX(nextLeft, dragRef.current.pageWidth, width);
        updateAttributes({ left: Math.round(nextLeft), top: Math.round(nextTop), floatSide: nextFloat });
      };

      const onUp = (upEvent: PointerEvent) => {
        dragRef.current = null;
        target.releasePointerCapture(upEvent.pointerId);
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
        target.removeEventListener("pointercancel", onUp);
      };

      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onUp);
      target.addEventListener("pointercancel", onUp);
    },
    [left, top, width, updateAttributes]
  );

  const onResizePointerDown = useCallback(
    (event: ReactPointerEvent) => {
      event.preventDefault();
      event.stopPropagation();

      resizeRef.current = {
        startX: event.clientX,
        originWidth: width,
        originHeight: height,
      };

      const target = event.currentTarget as HTMLElement;
      target.setPointerCapture(event.pointerId);

      const onMove = (moveEvent: PointerEvent) => {
        if (!resizeRef.current) return;
        const dx = moveEvent.clientX - resizeRef.current.startX;
        const nextWidth = Math.max(80, Math.min(720, Math.round(resizeRef.current.originWidth + dx)));
        const ratio = resizeRef.current.originHeight / resizeRef.current.originWidth;
        updateAttributes({ width: nextWidth, height: Math.round(nextWidth * ratio) });
      };

      const onUp = (upEvent: PointerEvent) => {
        resizeRef.current = null;
        target.releasePointerCapture(upEvent.pointerId);
        target.removeEventListener("pointermove", onMove);
        target.removeEventListener("pointerup", onUp);
        target.removeEventListener("pointercancel", onUp);
      };

      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerup", onUp);
      target.addEventListener("pointercancel", onUp);
    },
    [width, height, updateAttributes]
  );

  return (
    <NodeViewWrapper
      className={`freeform-image-node${selected ? " is-selected" : ""}`}
      data-drag-handle
      onPointerDown={onDragPointerDown}
      contentEditable={false}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        className="freeform-image"
        draggable={false}
        data-float={floatSide}
        style={{ width: "100%", height: "auto", display: "block", pointerEvents: "none" }}
      />
      {selected && (
        <button
          type="button"
          data-resize="true"
          aria-label="Resize image"
          className="freeform-image-resize"
          onPointerDown={onResizePointerDown}
        />
      )}
      {selected && editor.isEditable && (
        <span className="freeform-image-hint" aria-hidden>
          Drag to move · corner to resize
        </span>
      )}
    </NodeViewWrapper>
  );
}
