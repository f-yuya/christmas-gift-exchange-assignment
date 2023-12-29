import fs from "fs";
import { circularPermutations } from "./lib/circularPermutations";
import "./lib/rotate";
import "./lib/shuffle";
import { ShuffledArray } from "./lib/shuffle";
import { zip } from "./lib/zip";

/**
 * メンバー型
 */
type Member = {
  no: number;
  name: string;
  exclusions: Member["no"][];
};

/**
 * 組み合わせが正しいか検証します。
 * @param from あげるメンバー
 * @param to もらうメンバー
 * @returns 検証に成功した場合は true、失敗した場合は false
 */
const isValidPair = (from: Member, to: Member) =>
  !from.exclusions.includes(to.no);

/**
 * メンバーのリストをペアの形に変換します。
 * @param members メンバーのリスト
 * @returns ペア
 */
const toPairs = (members: Member[]) => zip(members, members.rotate(1));

/**
 * メンバーの組み合わせを作成します。
 * @param members 並び変えられたメンバーの配列
 */
const execute = (members: ShuffledArray<Member>) => {
  for (const pattern of circularPermutations(members)) {
    const pairs = toPairs(pattern);
    if (pairs.every((pair) => isValidPair(...pair))) {
      return pairs.forEach(([from, to]) =>
        console.log(`${from.name} → ${to.name}`)
      );
    }
  }
  throw new Error("すべてのパターンを検証しましたが、ペアを生成できません。");
};

/**
 * エントリーポイント
 */
const main = () => {
  const members: Member[] = JSON.parse(
    fs.readFileSync("./members.json", "utf8")
  );

  execute(members.shuffle());
};

main();
