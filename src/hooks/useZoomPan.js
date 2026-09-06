import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SWIPE_THRESHOLD = 45;
const DRAG_THRESHOLD = 6;

const clampScale = (value) =>
  Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

/**
 * Zoom and pan for the gallery stage.
 *
 * Wheel, pinch, double click, buttons and the keyboard all feed the same
 * scale, and panning is only enabled once zoomed in so a horizontal drag at
 * 1x still flicks to the next image.
 *
 * `resetKey` returns the view to 1x whenever it changes (new image, or the
 * gallery being reopened).
 */
export const useZoomPan = ({ onSwipe, resetKey } = {}) => {
  const stageRef = useRef(null);
  const wheelProxy = useRef(null);
  const pointers = useRef(new Map());
  const pinch = useRef(null);
  const drag = useRef(null);

  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const viewRef = useRef(view);
  viewRef.current = view;

  const reset = useCallback(() => setView({ scale: 1, x: 0, y: 0 }), []);

  useEffect(() => {
    reset();
  }, [resetKey, reset]);

  // keeps the image from being dragged completely out of the stage
  const clampOffset = (x, y, scale) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };
    const maxX = (rect.width * (scale - 1)) / 2;
    const maxY = (rect.height * (scale - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  };

  /** Scales around a point so whatever is under the cursor stays put. */
  const applyScale = useCallback((resolve, originX, originY) => {
    setView((current) => {
      const scale = clampScale(resolve(current.scale));
      if (scale === current.scale) return current;
      if (scale === MIN_SCALE) return { scale: 1, x: 0, y: 0 };

      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return { ...current, scale };

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = originX ?? cx;
      const py = originY ?? cy;
      const ratio = scale / current.scale;

      const next = {
        x: px - cx - (px - cx - current.x) * ratio,
        y: py - cy - (py - cy - current.y) * ratio,
      };
      return { scale, ...clampOffset(next.x, next.y, scale) };
    });
  }, []);

  const zoomBy = useCallback(
    (factor, originX, originY) =>
      applyScale((scale) => scale * factor, originX, originY),
    [applyScale]
  );

  const zoomIn = useCallback(() => zoomBy(1.4), [zoomBy]);
  const zoomOut = useCallback(() => zoomBy(1 / 1.4), [zoomBy]);
  const toggleZoom = useCallback(
    (originX, originY) =>
      applyScale((scale) => (scale > 1 ? 1 : 2), originX, originY),
    [applyScale]
  );

  // Wheel has to be a non-passive native listener, otherwise the browser
  // will not let us call preventDefault to stop the page behind from moving.
  const setStage = useCallback((node) => {
    if (stageRef.current && wheelProxy.current) {
      stageRef.current.removeEventListener("wheel", wheelProxy.current);
    }
    stageRef.current = node;
    if (!node) return;
    wheelProxy.current = (event) => {
      event.preventDefault();
      zoomBy(event.deltaY < 0 ? 1.15 : 1 / 1.15, event.clientX, event.clientY);
    };
    node.addEventListener("wheel", wheelProxy.current, { passive: false });
  }, [zoomBy]);

  const onPointerDown = (event) => {
    // Controls sit inside the stage, so their pointerdown bubbles here. If we
    // started a gesture (and captured the pointer) the browser would retarget
    // the click to the stage and the arrow / close buttons would stop working.
    if (event.target.closest?.("button")) return;

    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y) };
      drag.current = null;
      return;
    }

    drag.current = {
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
    };
  };

  const onPointerMove = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size >= 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance > 0 && pinch.current.distance > 0) {
        zoomBy(distance / pinch.current.distance, (a.x + b.x) / 2, (a.y + b.y) / 2);
      }
      pinch.current.distance = distance;
      return;
    }

    if (!drag.current) return;

    const dx = event.clientX - drag.current.startX;
    const dy = event.clientY - drag.current.startY;
    if (!drag.current.moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      drag.current.moved = true;
      // capture only once this is really a drag, so plain clicks stay intact
      try {
        stageRef.current?.setPointerCapture?.(event.pointerId);
      } catch {
        // capture is an optimisation, the gesture still works without it
      }
    }
    if (!drag.current.moved) return;

    const stepX = event.clientX - drag.current.lastX;
    const stepY = event.clientY - drag.current.lastY;
    drag.current.lastX = event.clientX;
    drag.current.lastY = event.clientY;

    // at 1x the drag is a swipe, not a pan
    if (viewRef.current.scale === 1) return;

    setView((current) => ({
      scale: current.scale,
      ...clampOffset(current.x + stepX, current.y + stepY, current.scale),
    }));
  };

  const endPointer = (event) => {
    const wasSingle = pointers.current.size === 1;
    pointers.current.delete(event.pointerId);
    try {
      if (stageRef.current?.hasPointerCapture?.(event.pointerId)) {
        stageRef.current.releasePointerCapture(event.pointerId);
      }
    } catch {
      // nothing to release
    }
    if (pointers.current.size < 2) pinch.current = null;

    if (wasSingle && drag.current && viewRef.current.scale === 1) {
      const dx = event.clientX - drag.current.startX;
      const dy = event.clientY - drag.current.startY;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        onSwipe?.(dx < 0 ? 1 : -1);
      }
    }
    if (pointers.current.size === 0) drag.current = null;
  };

  const stageProps = {
    ref: setStage,
    onPointerDown,
    onPointerMove,
    onPointerUp: endPointer,
    onPointerCancel: endPointer,
    onDoubleClick: (event) => toggleZoom(event.clientX, event.clientY),
  };

  return {
    view,
    stageProps,
    zoomIn,
    zoomOut,
    reset,
    toggleZoom,
    isZoomed: view.scale > 1,
    canZoomIn: view.scale < MAX_SCALE,
    canZoomOut: view.scale > MIN_SCALE,
  };
};

export default useZoomPan;
