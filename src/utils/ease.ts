function easeInQuad(t: number, b: number, c: number, d: number) {
  return c * (t /= d) * t + b;
}
export { easeInQuad };
