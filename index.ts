import fs from "fs";
import "./lib/shuffle";
import { Member, pairsGenerator } from "./member";

/**
 * 実行します。
 */
const execute = () => {
  const members: Member[] = JSON.parse(
    fs.readFileSync("./members.json", "utf8")
  );
  const generator = pairsGenerator(members.shuffle());
  const pairs = generator.next();
  if (pairs.done)
    throw new Error("すべてのパターンを検証しましたが、ペアを生成できません。");
  pairs.value.forEach(([from, to]) => console.log(`${from.name} → ${to.name}`));
};

/**
 * エントリーポイント
 */
const main = () => {
  try {
    console.time("time");
    execute();
  } catch (e: unknown) {
    console.error(e);
  } finally {
    console.log("------------------------------");
    console.timeEnd("time");
    console.log("------------------------------");
  }
};

main();
