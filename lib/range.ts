/**
 * 指定した範囲内の整数のシーケンスを生成します。
 * @param start シーケンス内の整数の値
 * @param count 生成する連続した整数の数
 */
export function* range(start: number, count: number): Generator<number> {
  for (let index = 0; index < count; index++) {
    yield start + index;
  }
}
