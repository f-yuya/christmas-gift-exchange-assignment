import { describe, expect, it } from "vitest";
import { ShuffledArray } from "../lib/shuffle";
import { Member, isValidPair, pairsGenerator, toPairs } from "../member";

describe("isValidPair", () => {
  it("正しいペアの場合、true が返る。", () => {
    const from: Member = { no: 1, name: "No.1", exclusions: [] };
    const to: Member = { no: 2, name: "No.2", exclusions: [] };
    expect(isValidPair([from, to])).toBe(true);
  });

  it("正しくないペアの場合、false が返る。", () => {
    const from: Member = { no: 1, name: "No.1", exclusions: [2] };
    const to: Member = { no: 2, name: "No.2", exclusions: [] };
    expect(isValidPair([from, to])).toBe(false);
  });
});

describe("toPairs", () => {
  it("正常に処理が行われることを確認する。", () => {
    const no1: Member = { no: 1, name: "No.1", exclusions: [] };
    const no2: Member = { no: 2, name: "No.2", exclusions: [] };
    const no3: Member = { no: 3, name: "No.3", exclusions: [] };
    expect(toPairs([no1, no2, no3])).toEqual([
      [no1, no2],
      [no2, no3],
      [no3, no1],
    ]);
  });
});

describe("pairsGenerator", () => {
  it("正常に処理が行われることを確認する。", () => {
    const no1: Member = { no: 1, name: "No.1", exclusions: [] };
    const no2: Member = { no: 2, name: "No.2", exclusions: [] };
    const no3: Member = { no: 3, name: "No.3", exclusions: [] };
    const pairs = pairsGenerator([no1, no2, no3] as ShuffledArray<Member>);
    expect([...pairs]).toEqual([
      [
        [no1, no2],
        [no2, no3],
        [no3, no1],
      ],
      [
        [no1, no3],
        [no3, no2],
        [no2, no1],
      ],
    ]);
  });

  it("除外するペアが正しく除外されることを確認する。", () => {
    const no1: Member = { no: 1, name: "No.1", exclusions: [2] };
    const no2: Member = { no: 2, name: "No.2", exclusions: [3] };
    const no3: Member = { no: 3, name: "No.3", exclusions: [1] };
    const pairs = pairsGenerator([no1, no2, no3] as ShuffledArray<Member>);
    expect([...pairs]).toEqual([
      [
        [no1, no3],
        [no3, no2],
        [no2, no1],
      ],
    ]);
  });

  it("ペアが作成できないことを確認する。", () => {
    const no1: Member = { no: 1, name: "No.1", exclusions: [2, 3] };
    const no2: Member = { no: 2, name: "No.2", exclusions: [3, 1] };
    const no3: Member = { no: 3, name: "No.3", exclusions: [1, 2] };
    const pairs = pairsGenerator([no1, no2, no3] as ShuffledArray<Member>);
    expect([...pairs]).toEqual([]);
  });
});
