/**
 * メンバー型
 * @typedef {{ no: number; name: string; }} Member
 */

/**
 * メンバーのリスト
 * 参加しないメンバーはコメントアウトします。
 * @type {Member[]}
 */
const members = [
  { no: 1, name: 'No.1' },
  { no: 2, name: 'No.2' },
  { no: 3, name: 'No.3' },
  { no: 6, name: 'No.6' },
  { no: 9, name: 'No.9' },
  { no: 14, name: 'No.14' },
  { no: 15, name: 'No.15' },
  { no: 16, name: 'No.16' },
  { no: 17, name: 'No.17' },
  { no: 18, name: 'No.18' },
  { no: 23, name: 'No.23' },
  { no: 25, name: 'No.25' },
];

/**
 * 除外するパターン
 */
const exclusions = {
  1: [],
  2: [14, 16, 17],
  3: [6, 9, 16, 23],
  6: [2, 15, 18, 23],
  9: [6, 14, 15, 16],
  14: [9, 15, 16, 17],
  15: [3, 17, 18, 23],
  16: [3, 6, 15, 17],
  17: [3, 6, 14, 18],
  18: [2, 3, 14, 25],
  23: [2, 9, 18],
  25: [9],
};

/**
 * 配列を並び替えます。
 * @param {any[]} array
 * @returns 並び替えた配列
 */
const shuffle = (array) => [...array].sort(() => Math.random() - Math.random());

/**
 * 配列の次の要素を取得します。
 * 最後の要素の場合は最初の要素を取得します。
 * @param {any[]} array 配列
 * @param {number} index インデックス番号
 * @returns 配列の次の要素
 */
const nextItem = (array, index) =>
  array.at(index === array.length - 1 ? 0 : index + 1);

/**
 * 除外するパターンを考慮した、並び替えたメンバーのリストを返します。
 * @param {Member[]} members 並び替えを行うメンバーのリスト
 * @param {object} exclusions 除外するパターン
 * @returns 並び替えたメンバーのリスト
 */
const shuffleMembers = (members, exclusions) => {
  while (true) {
    const shuffled = shuffle(members);
    if (
      shuffled.every(
        (member, index) =>
          !exclusions[member.no].includes(nextItem(shuffled, index).no)
      )
    ) {
      return shuffled;
    }
  }
};

/**
 * エントリーポイント
 */
const main = () => {
  const shuffled = shuffleMembers(members, exclusions);
  shuffled.forEach((member, index) =>
    console.log(`${member.name} → ${nextItem(shuffled, index).name}`)
  );
};

main();
