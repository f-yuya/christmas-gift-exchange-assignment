import { expect, it } from "vitest";
import "../../lib/shiftLeft";

it("正常に処理が行われることを確認する。", () => {
  expect([1, 2, 3, 4, 5].shiftLeft()).toEqual([2, 3, 4, 5, 1]);
});

it("配列が空の場合、空の配列が返ることを確認する。", () => {
  expect([].shiftLeft()).toEqual([]);
});
