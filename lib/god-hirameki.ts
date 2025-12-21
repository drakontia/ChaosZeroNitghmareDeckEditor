import { GodType, GodHiramekiDefinition } from "@/types";

// Unified God Hirameki effects list with applicable gods per effect
export const GOD_HIRAMEKI_EFFECTS: GodHiramekiDefinition[] = [
  { id: "godhirameki_1", additionalEffect: "ドロー1", gods: "all" },
  { id: "godhirameki_2", additionalEffect: "アクションポイント1獲得", gods: "all" },
  { id: "godhirameki_3", additionalEffect: "このカードのコスト1減少", costModifier: -1, gods: "all" },
  { id: "godhirameki_4", additionalEffect: "このカードのシールド量30%増加", gods: "all" },
  { id: "godhirameki_5", additionalEffect: "このカードのダメージ量30%増加", gods: "all" },
  { id: "godhirameki_6", additionalEffect: "このカードの強靱度ダメージ100%増加", gods: "all" },
  { id: "godhirameki_7", additionalEffect: "対象に脆弱2", gods: "all" },
  { id: "godhirameki_8", additionalEffect: "対象に苦痛4", gods: "all" },
  { id: "godhirameki_9", additionalEffect: "士気1、決意1", gods: "all" },
  { id: "godhirameki_10", additionalEffect: "常に弱点攻撃", gods: [GodType.DIALOS] },
  { id: "godhirameki_11", additionalEffect: "ランダムな味方が対象に挟み撃ち", gods: [GodType.VITOL] }
];
