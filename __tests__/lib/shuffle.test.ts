import { expect, it } from "vitest";
import "../../lib/shuffle";

it("正常に処理が行われることを確認する。", () => {
  const array = [1, 2, 3, 4, 5];
  const actual = array.shuffle();

  // シャッフル後の配列の長さと要素が同じことを確かめる。
  expect(actual).toHaveLength(array.length);
  expect([...actual].sort()).toEqual(array);
});
