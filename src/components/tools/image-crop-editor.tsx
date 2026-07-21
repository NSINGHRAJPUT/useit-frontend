"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type AspectRatioPreset = "free" | "1:1" | "4:3" | "16:9" | "3:2" | "9:16";

export const ASPECT_RATIO_PRESETS: { value: AspectRatioPreset; label: string; ratio: number | null }[] = [
  { value: "free", label: "Free", ratio: null },
  { value: "1:1", label: "1:1", ratio: 1 },
  { value: "4:3", label: "4:3", ratio: 4 / 3 },
  { value: "16:9", label: "16:9", ratio: 16 / 9 },
  { value: "3:2", label: "3:2", ratio: 3 / 2 },
  { value: "9:16", label: "9:16", ratio: 9 / 16 },
];

const MIN_CROP_SIZE = 24;

type Handle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | "move";

type DisplayRect = { x: number; y: number; width: number; height: number };

function getDisplayedImageRect(
  containerWidth: number,
  containerHeight: number,
  naturalWidth: number,
  naturalHeight: number,
): DisplayRect {
  const scale = Math.min(containerWidth / naturalWidth, containerHeight / naturalHeight);
  const width = naturalWidth * scale;
  const height = naturalHeight * scale;
  return {
    x: (containerWidth - width) / 2,
    y: (containerHeight - height) / 2,
    width,
    height,
  };
}

export function createInitialCrop(
  naturalWidth: number,
  naturalHeight: number,
  aspectRatio: number | null,
): CropArea {
  const margin = 0.1;
  let width = naturalWidth * (1 - margin * 2);
  let height = naturalHeight * (1 - margin * 2);

  if (aspectRatio) {
    if (width / height > aspectRatio) {
      width = height * aspectRatio;
    } else {
      height = width / aspectRatio;
    }
  }

  return clampCrop(
    {
      x: (naturalWidth - width) / 2,
      y: (naturalHeight - height) / 2,
      width,
      height,
    },
    naturalWidth,
    naturalHeight,
    aspectRatio,
  );
}

export function clampCrop(
  crop: CropArea,
  imgW: number,
  imgH: number,
  aspectRatio: number | null = null,
): CropArea {
  let { x, y, width, height } = crop;

  width = Math.max(MIN_CROP_SIZE, Math.min(width, imgW));
  height = Math.max(MIN_CROP_SIZE, Math.min(height, imgH));

  if (aspectRatio) {
    if (width / height > aspectRatio) {
      width = height * aspectRatio;
    } else {
      height = width / aspectRatio;
    }
    width = Math.max(MIN_CROP_SIZE, Math.min(width, imgW));
    height = Math.max(MIN_CROP_SIZE, Math.min(height, imgH));
  }

  x = Math.max(0, Math.min(x, imgW - width));
  y = Math.max(0, Math.min(y, imgH - height));

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
}

function normalizeBox(left: number, top: number, right: number, bottom: number) {
  if (left > right) [left, right] = [right, left];
  if (top > bottom) [top, bottom] = [bottom, top];
  return { left, top, right, bottom };
}

function resizeCrop(
  crop: CropArea,
  handle: Handle,
  dx: number,
  dy: number,
  imgW: number,
  imgH: number,
  aspectRatio: number | null,
): CropArea {
  if (handle === "move") {
    return clampCrop({ x: crop.x + dx, y: crop.y + dy, width: crop.width, height: crop.height }, imgW, imgH, aspectRatio);
  }

  const origLeft = crop.x;
  const origTop = crop.y;
  const origRight = crop.x + crop.width;
  const origBottom = crop.y + crop.height;

  let left = origLeft;
  let top = origTop;
  let right = origRight;
  let bottom = origBottom;

  if (handle.includes("w")) left += dx;
  if (handle.includes("e")) right += dx;
  if (handle.includes("n")) top += dy;
  if (handle.includes("s")) bottom += dy;

  ({ left, top, right, bottom } = normalizeBox(left, top, right, bottom));

  let width = right - left;
  let height = bottom - top;

  if (aspectRatio) {
    const widthLed =
      handle === "e" ||
      handle === "w" ||
      (handle !== "n" && handle !== "s" && Math.abs(dx) >= Math.abs(dy));

    if (widthLed) {
      width = handle.includes("w") ? origRight - left : right - origLeft;
      height = width / aspectRatio;
    } else {
      height = handle.includes("n") ? origBottom - top : bottom - origTop;
      width = height * aspectRatio;
    }

    if (handle.includes("w")) {
      left = origRight - width;
      right = origRight;
    } else {
      left = origLeft;
      right = origLeft + width;
    }

    if (handle.includes("n")) {
      top = origBottom - height;
      bottom = origBottom;
    } else {
      top = origTop;
      bottom = origTop + height;
    }
  }

  return clampCrop({ x: left, y: top, width: right - left, height: bottom - top }, imgW, imgH, aspectRatio);
}

type ImageCropEditorProps = {
  src: string;
  imageWidth: number;
  imageHeight: number;
  crop: CropArea;
  aspectRatio: number | null;
  onCropChange: (crop: CropArea) => void;
  className?: string;
};

export function ImageCropEditor({
  src,
  imageWidth,
  imageHeight,
  crop,
  aspectRatio,
  onCropChange,
  className,
}: ImageCropEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayRect, setDisplayRect] = useState<DisplayRect | null>(null);
  const dragRef = useRef<{
    handle: Handle;
    startX: number;
    startY: number;
    startCrop: CropArea;
    pointerId: number;
  } | null>(null);

  const onCropChangeRef = useRef(onCropChange);
  onCropChangeRef.current = onCropChange;

  const aspectRatioRef = useRef(aspectRatio);
  aspectRatioRef.current = aspectRatio;

  const imageSizeRef = useRef({ w: imageWidth, h: imageHeight });
  imageSizeRef.current = { w: imageWidth, h: imageHeight };

  const updateLayout = useCallback(() => {
    const container = containerRef.current;
    if (!container || !imageWidth || !imageHeight) return;
    const { clientWidth, clientHeight } = container;
    if (!clientWidth || !clientHeight) return;
    setDisplayRect(getDisplayedImageRect(clientWidth, clientHeight, imageWidth, imageHeight));
  }, [imageWidth, imageHeight]);

  useEffect(() => {
    updateLayout();
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(updateLayout);
    observer.observe(container);
    return () => observer.disconnect();
  }, [updateLayout]);

  useEffect(() => {
    function onPointerMove(event: PointerEvent) {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;

      const scale = displayRect ? displayRect.width / imageSizeRef.current.w : 1;
      const dx = (event.clientX - drag.startX) / scale;
      const dy = (event.clientY - drag.startY) / scale;
      const { w, h } = imageSizeRef.current;

      const next = resizeCrop(
        drag.startCrop,
        drag.handle,
        dx,
        dy,
        w,
        h,
        aspectRatioRef.current,
      );
      onCropChangeRef.current(next);
    }

    function endDrag(event: PointerEvent) {
      const drag = dragRef.current;
      if (!drag || event.pointerId !== drag.pointerId) return;
      dragRef.current = null;
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [displayRect]);

  const scale = displayRect ? displayRect.width / imageWidth : 1;
  const hasCrop = crop.width > 0 && crop.height > 0;

  const overlayStyle =
    displayRect && hasCrop
      ? {
          left: displayRect.x + crop.x * scale,
          top: displayRect.y + crop.y * scale,
          width: crop.width * scale,
          height: crop.height * scale,
        }
      : null;

  function startDrag(handle: Handle, event: React.PointerEvent) {
    if (!imageWidth || !imageHeight) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = {
      handle,
      startX: event.clientX,
      startY: event.clientY,
      startCrop: crop,
      pointerId: event.pointerId,
    };
  }

  const handles: { id: Handle; className: string; cursor: string }[] = [
    { id: "nw", className: "left-0 top-0 -translate-x-1/2 -translate-y-1/2", cursor: "nwse-resize" },
    { id: "n", className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2", cursor: "ns-resize" },
    { id: "ne", className: "right-0 top-0 translate-x-1/2 -translate-y-1/2", cursor: "nesw-resize" },
    { id: "e", className: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2", cursor: "ew-resize" },
    { id: "se", className: "right-0 bottom-0 translate-x-1/2 translate-y-1/2", cursor: "nwse-resize" },
    { id: "s", className: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2", cursor: "ns-resize" },
    { id: "sw", className: "left-0 bottom-0 -translate-x-1/2 translate-y-1/2", cursor: "nesw-resize" },
    { id: "w", className: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2", cursor: "ew-resize" },
  ];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[min(480px,60vh)] w-full overflow-hidden rounded-xl border border-gold/15 bg-black/40",
        className,
      )}
    >
      <img
        src={src}
        alt="Crop preview"
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain select-none"
      />

      {displayRect && overlayStyle ? (
        <>
          <div
            className="pointer-events-none absolute bg-black/55"
            style={{
              left: displayRect.x,
              top: displayRect.y,
              width: displayRect.width,
              height: overlayStyle.top - displayRect.y,
            }}
          />
          <div
            className="pointer-events-none absolute bg-black/55"
            style={{
              left: displayRect.x,
              top: overlayStyle.top + overlayStyle.height,
              width: displayRect.width,
              height: displayRect.y + displayRect.height - (overlayStyle.top + overlayStyle.height),
            }}
          />
          <div
            className="pointer-events-none absolute bg-black/55"
            style={{
              left: displayRect.x,
              top: overlayStyle.top,
              width: overlayStyle.left - displayRect.x,
              height: overlayStyle.height,
            }}
          />
          <div
            className="pointer-events-none absolute bg-black/55"
            style={{
              left: overlayStyle.left + overlayStyle.width,
              top: overlayStyle.top,
              width: displayRect.x + displayRect.width - (overlayStyle.left + overlayStyle.width),
              height: overlayStyle.height,
            }}
          />

          <div
            className="absolute border-2 border-gold shadow-[0_0_0_1px_rgba(0,0,0,0.35)_inset]"
            style={overlayStyle}
          >
            <div className="absolute inset-0 cursor-move" onPointerDown={(event) => startDrag("move", event)} />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/3 top-0 h-full w-px bg-white/25" />
              <div className="absolute left-2/3 top-0 h-full w-px bg-white/25" />
              <div className="absolute left-0 top-1/3 h-px w-full bg-white/25" />
              <div className="absolute left-0 top-2/3 h-px w-full bg-white/25" />
            </div>
            {handles.map((handle) => (
              <button
                key={handle.id}
                type="button"
                aria-label={`Resize ${handle.id}`}
                className={cn(
                  "absolute z-10 size-3 rounded-full border-2 border-gold bg-background shadow-sm touch-none",
                  handle.className,
                )}
                style={{ cursor: handle.cursor }}
                onPointerDown={(event) => startDrag(handle.id, event)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
