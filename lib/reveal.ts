/**
 * Runs `play` the first time `el` reaches the viewport, then disconnects.
 *
 * Entrance reveals establish their start state during the layout phase, then
 * use this lightweight one-shot observer to play toward the normal state.
 * IntersectionObserver answers "is this on screen?" directly, disconnects
 * after the first hit, and fires immediately for anything already in view.
 *
 * ScrollTrigger remains the right tool for scrubbed, position-mapped motion,
 * where progress is continuously recomputed from the scroll position.
 */
export function onEnterOnce(
  el: Element,
  play: () => void,
  rootMargin = '0px 0px -10% 0px',
): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    play();
    return () => {};
  }

  let fired = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (fired || !entries.some((entry) => entry.isIntersecting)) return;
      fired = true;
      observer.disconnect();
      play();
    },
    { rootMargin, threshold: 0.01 },
  );

  observer.observe(el);
  return () => observer.disconnect();
}
