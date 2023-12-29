import { range } from "./range";

export type ShuffledArray<T> = Array<T> & { _shuffledArrayBrand: never };

declare global {
  interface Array<T> {
    shuffle(): ShuffledArray<T>;
  }
}

/**
 * 配列を並び替えます。
 * @param this 配列
 * @returns 並び変えた配列
 */
Array.prototype.shuffle = function <T>(this: T[]) {
  const array = [...this];

  for (const i of range(0, array.length)) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array as ShuffledArray<T>;
};
