import fs from 'fs';

/**
 * メンバー型
 */
type Member = {
  no: number;
  name: string;
  exclusions: Member["no"][]
}

/**
 * メンバーのリスト
 */
const members = JSON.parse(fs.readFileSync('./members.json', 'utf8'));

/**
 * 配列を並び替えます。
 * @param array 配列
 * @returns 並び替えた配列
 */
const shuffle = <T>(array: T[]) => [...array].sort(() => Math.random() - Math.random());

/**
 * 配列を左シフトします。
 * @param array 配列 
 * @returns 左シフトした配列
 */
const shiftLeft = <T>(array: T[]) => {
  const [head, ...tail] = array;
  return [...tail, head];
}

/**
 * 配列の各要素から成る配列を作成します。
 * @param left 配列
 * @param right 配列
 * @returns 配列の各要素から成る配列
 */
const zip = <T, U>(left: T[], right: U[]): [T, U][] => {
  return Array.from(Array(Math.min(left.length, right.length)), (_, i) => [left[i], right[i]]);
}

/**
 * 関数が成功するまで指定した回数実行します。
 * @param fn 関数
 * @param count 試行回数
 * @returns Promise
 */
const retry = (fn: Function, count: number) => {
  return Array(count - 2).fill(undefined).reduce(
    (result) => result.catch(() => fn()), Promise.reject().catch(() => fn()));
}

/**
 * メンバーの並び替えを実行します。
 * 除外するパターンを考慮した、並び替えたメンバーのリストを返します。
 * @param members 並び替えを行うメンバーのリスト
 * @returns 並び替えたメンバーのリスト
 */
const execute = (members: Member[]): Member[] => {
  const [from, ...others] = members;
  if (!others.length) return [];

  const to = others.find(member => !from.exclusions.includes(member.no));
  if (!to) throw new Error('組み合わせが見つかりません。');

  return [from, ...execute([to, ...others.filter(member => member.no !== to.no)])];
}

/**
 * エントリーポイント
 */
const main = () => {
  const result = execute(shuffle(members));

  zip(result, shiftLeft(result))
    .forEach(([from, to]) => console.log(`${from .name} → ${to.name}`));
};

retry(main, 10);