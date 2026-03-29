/**
 * Normalizes client coordinates to match shader UV space:
 * x: 0 left → 1 right, y: 0 bottom → 1 top (aligned with gl_FragCoord / resolution).
 */
export function clientToLightUv(
  clientX: number,
  clientY: number
): { x: number; y: number } {
  const w = typeof window !== "undefined" ? window.innerWidth : 1;
  const h = typeof window !== "undefined" ? window.innerHeight : 1;
  return {
    x: clientX / w,
    y: 1 - clientY / h,
  };
}

export function elementCenterToLightUv(el: HTMLElement): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  return clientToLightUv(r.left + r.width / 2, r.top + r.height / 2);
}
