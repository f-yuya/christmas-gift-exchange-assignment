declare global {
  interface Array<T> {
    rotate(step: number): Array<T>;
  }
}

/**
 * 指定された回数だけ配列を回転します。
 * @param this 配列
 * @param step 回転する回数
 * @returns 回転した配列
 */
Array.prototype.rotate = function <T>(this: T[], step: number) {
  const n = (step + this.length) % this.length;
  return [...this.slice(n), ...this.slice(0, n)];
};

export {};
