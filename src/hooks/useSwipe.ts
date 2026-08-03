import { useRef } from "react";
import type { TouchEvent } from "react";

const SWIPE_THRESHOLD_PX = 50;

/** Swipe horizontal simples, sem dependência externa. Usado na galeria e no lightbox. */
export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startX = useRef<number | null>(null);

  function onTouchStart(event: TouchEvent) {
    startX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    if (startX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? startX.current;
    const delta = endX - startX.current;
    startX.current = null;

    if (delta <= -SWIPE_THRESHOLD_PX) onSwipeLeft();
    else if (delta >= SWIPE_THRESHOLD_PX) onSwipeRight();
  }

  return { onTouchStart, onTouchEnd };
}
