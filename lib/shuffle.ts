type ShuffledArray<T> = Array<T> & { _shuffledArrayBrand: never; };

declare global {
    interface Array<T> {
        shuffle(): ShuffledArray<T>
    }
}

/**
 * 配列を並び替えます。
 * @param this 配列
 * @returns 並び変えた配列
 */
Array.prototype.shuffle = function <T>(this: T[]) {
    return [...this].sort(() => Math.random() - Math.random()) as ShuffledArray<T>;
};

export { };
