const fs = require('fs');

/**
 * メンバー型
 * @typedef {{ no: number; name: string; exclusions: number[] }} Member
 */

/**
 * メンバーのリスト
 * @type {Member[]}
 */
const members = JSON.parse(fs.readFileSync('./members.json', 'utf8'));

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
 * @returns 並び替えたメンバーのリスト
 */
const shuffleMembers = (members) => {
  while (true) {
    const shuffled = shuffle(members);
    if (
      shuffled.every(
        (member, index) =>
          !member.exclusions.includes(nextItem(shuffled, index).no)
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
  const shuffled = shuffleMembers(members);
  shuffled.forEach((member, index) =>
    console.log(`${member.name} → ${nextItem(shuffled, index).name}`)
  );
};

main();
