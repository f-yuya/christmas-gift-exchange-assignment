import { expect, it } from "vitest";
import { zip } from "../../lib/zip";

it("正常に処理が行われることを確認する。", () => {
  const actual = zip([1, 2, 3], [true, false, true], ["あ", "い", "う"]);
  const expected = [
    [1, true, "あ"],
    [2, false, "い"],
    [3, true, "う"],
  ];

  expect(actual).toEqual(expected);
});

it("配列の長さが異なる場合、短い配列に合わせて処理が行われることを確認する。", () => {
  const actual = zip([1, 2, 3], ["あ", "い", "う", "え", "お"]);
  const expected = [
    [1, "あ"],
    [2, "い"],
    [3, "う"],
  ];

  expect(actual).toEqual(expected);
});
