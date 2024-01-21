import { circularPermutations } from "./lib/circularPermutations";
import "./lib/rotate";
import { ShuffledArray } from "./lib/shuffle";
import { zip } from "./lib/zip";

/**
 * メンバー型
 */
export type Member = {
  no: number;
  name: string;
  exclusions: Member["no"][];
};

/**
 * ペア型
 */
export type Pair = [Member, Member];

/**
 * 組み合わせが正しいか検証します。
 * @param pair ペア
 * @returns 検証に成功した場合は true、失敗した場合は false
 */
export const isValidPair = (pair: Pair) => {
  const [from, to] = pair;
  return !from.exclusions.includes(to.no);
};

/**
 * メンバーのリストをペアの形に変換します。
 * @param members メンバーのリスト
 * @returns ペア
 */
export const toPairs = (members: Member[]): Pair[] =>
  zip(members, members.rotate(1));

/**
 * ペアの組み合わせのシーケンスを作成します。
 * @param members メンバーのリスト
 */
export function* pairsGenerator(
  members: ShuffledArray<Member>
): Generator<Pair[]> {
  for (const pattern of circularPermutations(members)) {
    const pairs = toPairs(pattern);
    if (pairs.every(isValidPair)) {
      yield pairs;
    }
  }
}
