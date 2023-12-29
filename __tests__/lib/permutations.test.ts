import { expect, it } from "vitest";
import { permutations } from "../../lib/permutations";

it("正常に処理が行われることを確認する。", () => {
  const expected = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ];

  const actual = permutations([1, 2, 3]);
  expect([...actual]).toEqual(expected);
});
