import fs from "fs";
import { retry } from "./lib/retry";
import "./lib/shiftLeft";
import "./lib/shuffle";
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
 * メンバーのリスト
 */
const members: Member[] = JSON.parse(fs.readFileSync("./members.json", "utf8"));

/**
 * メンバーの並び替えを実行します。
 * 除外するパターンを考慮した、並び替えたメンバーのリストを返します。
 * @param members 並び替えを行うメンバーのリスト
 * @returns 並び替えたメンバーのリスト
 */
const execute = (members: Member[]): Member[] => {
  const [from, ...others] = members;
  if (!others.length) return [from];

  const to = others.find((member) => isValidPair(from, member));
  if (!to) throw new Error("組み合わせを生成できません。");

  const rest = others.filter((member) => member.no !== to.no);
  return [from, ...execute([to, ...rest.shuffle()])];
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
const toPair = (members: Member[]) => zip(members, members.shiftLeft());

/**
 * エントリーポイント
 */
const main = () => {
  const result = toPair(execute(members.shuffle()));

  // 最後のペアが正しくない場合があるため、検証する。
  if (result.some(([from, to]) => !isValidPair(from, to)))
    throw new Error("組み合わせを生成できません。");

  result.forEach(([from, to]) => console.log(`${from.name} → ${to.name}`));
};

retry(main, 10);
