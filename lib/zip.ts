type ZippedTuple<T extends unknown[][]> = { [K in keyof T]: T[K] extends (infer V)[] ? V : never };

/**
 * 配列の各要素から成る配列を作成します。
 * @param arrays zip を適用する配列の配列
 * @returns 配列の各要素から成る配列
 */
export const zip = <T extends unknown[][]>(...arrays: T): ZippedTuple<T>[] => {
    return Array.from(
        Array(Math.min(...arrays.map(array => array.length))),
        (_, index) => [...arrays.map(array => array[index])] as ZippedTuple<T>
    );
}
