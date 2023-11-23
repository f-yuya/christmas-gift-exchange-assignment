/**
 * 関数が成功するまで指定した回数実行します。
 * @param fn 関数
 * @param count 試行回数
 * @returns Promise
 */
export const retry = (fn: Function, count: number) => {
    return Array(count).fill(undefined).reduce(
        (result) => result.catch(() => fn()), Promise.reject());
}