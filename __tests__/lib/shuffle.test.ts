import { expect, it, vi } from "vitest";
import "../../lib/shuffle";

function* mockedRandomGenerator(): Generator<number> {
  for (let i = 0; ; i++) yield i;
}

it("正常に処理が行われることを確認する。", () => {
  // Array.shuffle() では、Math.random() による比較でソートを行っているためモックする。
  const generator = mockedRandomGenerator();
  vi.spyOn(Math, "random").mockImplementation(() => generator.next().value);

  const actual = [1, 2, 3, 4, 5].shuffle();
  const expected = [5, 4, 3, 2, 1];

  expect(actual).toEqual(expected);
});
