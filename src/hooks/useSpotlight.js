import { useCallback } from "react";

/**
 * Feeds the pointer position into --mx / --my so the `.spotlight` background
 * gradient can follow the cursor. Pure CSS variable writes, no re-renders.
 */
export const useSpotlight = () =>
  useCallback((event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

export default useSpotlight;
