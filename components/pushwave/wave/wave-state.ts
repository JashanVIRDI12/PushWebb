/**
 * Mutable state shared between the DOM (ScrollTrigger, pointer) and the
 * WebGL render loop. Written every frame, read every frame: kept outside
 * React on purpose so scrolling never causes a re-render.
 */
export const waveState = {
  /** 0 → 1 as the hero scrolls away: one clip spreads into hundreds. */
  spread: 0,
  /** 0 → 1 as the final call to action scrolls in: the wave returns. */
  finale: 0,
  mode: 'hero' as 'hero' | 'finale',
  /** Pointer, normalised to -1..1 from the viewport centre. */
  pointerX: 0,
  pointerY: 0,
};
