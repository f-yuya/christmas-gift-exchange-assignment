import { expect, it } from "vitest";
import { circularPermutations } from "../../lib/circularPermutations";

it("正常に処理が行われることを確認する。", () => {
  const expected = [
    [1, 2, 3, 4],
    [1, 2, 4, 3],
    [1, 3, 2, 4],
    [1, 3, 4, 2],
    [1, 4, 2, 3],
    [1, 4, 3, 2],
  ];

  const actual = circularPermutations([1, 2, 3, 4]);
  expect([...actual]).toEqual(expected);
});
