import { permutations } from "./permutations";

/**
 * 配列のすべての要素を使用した円順列を生成します。
 * @param array 配列
 */
export function* circularPermutations<T>(array: T[]): Generator<T[]> {
  const [head, ...rest] = array;
  for (const pattern of permutations(rest)) {
    yield [head, ...pattern];
  }
}
