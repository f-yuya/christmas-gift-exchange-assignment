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
 * @param array 並び変える配列
 * @returns 並び替えた配列
 */
const shuffle = <T>(array: T[]) => [...array].sort(() => Math.random() - Math.random());

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

  const [head, ...tail] = result;
  [...tail, head].map((to, index) => ({ from: result.at(index), to }))
    .forEach(({ from, to }) => console.log(`${from?.name} → ${to.name}`));
};

retry(main, 10);