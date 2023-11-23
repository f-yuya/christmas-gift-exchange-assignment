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
  if (!others.length) return [];

  const to = others.find((member) => !from.exclusions.includes(member.no));
  if (!to) throw new Error("組み合わせが見つかりません。");

  const rest = others.filter((member) => member.no !== to.no);
  return [from, ...execute([to, ...rest.shuffle()])];
};

/**
 * エントリーポイント
 */
const main = () => {
  const result = execute(members.shuffle());

  zip(result, result.shiftLeft()).forEach(([from, to]) =>
    console.log(`${from.name} → ${to.name}`),
  );
};

retry(main, 10);
