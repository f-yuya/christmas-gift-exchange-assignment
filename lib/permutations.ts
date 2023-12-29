import { range } from "./range";

/**
 * 配列のすべての要素を使用した順列を生成します。
 * @param array 配列
 */
export function* permutations<T>(array: T[]): Generator<T[]> {
  if (!array.length) {
    yield [];
  }

  for (const current of range(0, array.length)) {
    const rest = array.filter((_, index) => index !== current);
    for (const pattern of permutations(rest)) {
      yield [array[current], ...pattern];
    }
  }
}
