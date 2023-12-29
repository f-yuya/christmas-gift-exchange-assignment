import { expect, it } from "vitest";
import { range } from "../../lib/range";

it("正常に処理が行われることを確認する。", () => {
  expect([...range(10, 10)]).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
});
