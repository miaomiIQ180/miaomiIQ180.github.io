export function rem2px(rem: number) {
  return rem * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
}
