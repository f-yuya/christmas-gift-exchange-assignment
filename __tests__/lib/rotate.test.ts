import { expect, it } from "vitest";
import "../../lib/rotate";

it("正常に処理が行われることを確認する。", () => {
  expect([1, 2, 3, 4, 5].rotate(2)).toEqual([3, 4, 5, 1, 2]);
  expect([1, 2, 3, 4, 5].rotate(-2)).toEqual([4, 5, 1, 2, 3]);
});

it("ステップ数が 0 の場合、元の配列が返ることを確認する。", () => {
  expect([1, 2, 3, 4, 5].rotate(0)).toEqual([1, 2, 3, 4, 5]);
});

it("配列が空の場合、空の配列が返ることを確認する。", () => {
  expect([].rotate(2)).toEqual([]);
  expect([].rotate(-2)).toEqual([]);
});
