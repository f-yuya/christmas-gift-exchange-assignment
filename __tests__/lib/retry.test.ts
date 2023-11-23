import { describe, expect, it, vi } from "vitest";
import { retry } from "../../lib/retry";

describe("処理が成功した場合の挙動を確認する。", () => {
  it("処理結果が返ることを確認する。", async () => {
    const fn = () => {
      return 0;
    };

    expect(await retry(fn, 3)).toBe(0);
  });

  it("処理に成功した時点で処理が完了することを確認する。", async () => {
    const fn = vi.fn().mockImplementation(() => 0);

    await retry(fn, 3);
    expect(fn).toBeCalledTimes(1);
  });
});

describe("処理に失敗した場合の挙動を確認する。", () => {
  it("エラーが返ることを確認する。", () => {
    const fn = () => {
      throw new Error("処理が失敗しました。");
    };

    expect(async () => await retry(fn, 3)).rejects.toThrowError(
      "処理が失敗しました。",
    );
  });

  it("指定した回数まで処理を実行することを確認する。", async (count) => {
    const fn = vi.fn().mockImplementation(() => {
      throw new Error(
        `${count}回処理を実行しましたが、処理が成功しませんでした。`,
      );
    });

    try {
      await retry(fn, 3);
    } catch {
      expect(fn).toBeCalledTimes(3);
    }
  });
});
