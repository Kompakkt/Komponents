import { setupMarquee } from './marquee';
import { describe, it, expect } from 'vitest';

describe('setupMarquee', () => {
  function makeSpan(viewportWidth: number, spanWidth: number) {
    const span = document.createElement('span');
    Object.defineProperty(span, 'scrollWidth', { value: spanWidth });
    const viewport = document.createElement('div');
    Object.defineProperty(viewport, 'clientWidth', { value: viewportWidth });
    viewport.appendChild(span);
    return { span, viewport };
  }

  it('sets distance and duration when text overflows', () => {
    const { span } = makeSpan(50, 150);
    const cleanup = setupMarquee(span);
    expect(span.style.getPropertyValue('--marquee-distance')).toBe('100px');
    expect(span.style.getPropertyValue('--marquee-duration')).toBe('3s');
    cleanup();
  });

  it('sets zero distance when text fits', () => {
    const { span } = makeSpan(200, 100);
    const cleanup = setupMarquee(span);
    expect(span.style.getPropertyValue('--marquee-distance')).toBe('0px');
    expect(span.style.getPropertyValue('--marquee-duration')).toBe('1s');
    cleanup();
  });
});
