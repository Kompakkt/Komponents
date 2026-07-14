export function setupMarquee(span: HTMLElement): () => void {
  const update = () => {
    const viewport = span.parentElement;
    if (!viewport) return;
    const distance = Math.max(span.scrollWidth - viewport.clientWidth, 0);
    span.style.setProperty('--marquee-distance', `${distance}px`);
    span.style.setProperty('--marquee-duration', `${distance * 0.02 + 1}s`);
  };
  update();
  const ro = new ResizeObserver(update);
  ro.observe(span.parentElement ?? span);
  return () => ro.disconnect();
}
