/**
 * 関数が成功するまで指定した回数実行します。
 * @param fn 関数
 * @param count 試行回数
 * @returns Promise
 */
export const retry = <T>(
  fn: (...args: unknown[]) => T,
  count: number,
): Promise<T> => {
  return Array(count)
    .fill(undefined)
    .reduce((result) => result.catch(() => fn()), Promise.reject());
};
