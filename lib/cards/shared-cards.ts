import { CznCard, CardType, CardCategory, JobType, CardStatus } from "@/types";

/**
 * Shared Cards
 * 
 * Note: Card names and descriptions are displayed using translations from messages/*.json files.
 * - Card name: t(`cards.${card.id}.name`)
 * - Card description: t(`cards.${card.id}.descriptions.${level}`)
 * 
 * The name and description fields below serve as fallback values when translations are not available.
 */
export const SHARED_CARDS: CznCard[] = [
  {
    id: "shared_01",
    name: "加虐性",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.LEAD],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_01.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "敵全体に脆弱1\n手札のランダムな攻撃カード1枚が1ターンの間コスト1減少" }
    ]
  },
  {
    id: "shared_02",
    name: "睡眠の実",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.FINALE, CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_02.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ランダムな戦闘員のストレスを5減少" }
    ]
  },
  {
    id: "shared_03",
    name: "戦闘準備",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_03.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ランダムなデランショップカード1枚生成\n1ターンの間、そのカードのコスト0に変更" }
    ]
  },
  {
    id: "shared_04",
    name: "禁じられたアルゴリズム",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST, CardStatus.LEAD],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_04.png",
    hiramekiVariations: [
      { level: 0, cost: 3, description: "ランダムな禁忌カード1枚生成" }
    ]
  },
  {
    id: "shared_05",
    name: "強制略奪",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_05.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ドロー1\n山札または捨て札からランダムな禁忌カード1枚を手札に移動" }
    ]
  },
  {
    id: "shared_06",
    name: "超再生",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_06.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "次のターン開始時に治癒300%\n自分には脆弱1" }
    ]
  },
  {
    id: "shared_64",
    name: "フリュード",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_64.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ70%\n苦痛4" }
    ]
  },
  {
    id: "shared_65",
    name: "	天上の裁き",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_65.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ350%\n報復3" }
    ]
  },
  {
    id: "shared_66",
    name: "損傷戦術",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_66.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ200%\n対象がシールド所持中の場合、ダメージ量+80%\n損傷2" }
    ]
  },
  {
    id: "shared_67",
    name: "伝染",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_67.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "汚染を2枚生成\n固定ダメージ200%\n手札のカード数に応じてダメージ量+30%" }
    ]
  },
  {
    id: "shared_07",
    name: "HA-00",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_07.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ランダムな敵にダメージ100%×4\nヒットした対象に脆弱1または、弱体化1" }
    ]
  },
  {
    id: "shared_68",
    name: "教団の聖書ページ",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST2],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_68.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "このカード消滅時、ドロー2" }
    ]
  },
  {
    id: "shared_69",
    name: "激しい好き嫌い",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_69.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "手札のカードを1枚消滅\n治療100%" }
    ]
  },
  {
    id: "shared_70",
    name: "変異の霊薬",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_70.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "捨て札に一時的な変異を3枚生成\n1ターンの間、士気3" }
    ]
  },
  {
    id: "shared_71",
    name: "深淵花",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_71.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "HP減少10%\n次に使用する攻撃カードのダメージ量30%増加\nHPが10%以下の場合、使用不可" }
    ]
  },
  {
    id: "shared_72",
    name: "香ばしい餌",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_72.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "敵全体に弱体化;1\n敵数に応じて弱体化追加" }
    ]
  },
  {
    id: "shared_73",
    name: "巣の心臓",
    type: CardType.SHARED,
    category: CardCategory.UPGRADE,
    statuses: [],
    allowedJobs: "all",
    imgUrl: "/images/cards/shared_73.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "鼓動1\nターン開始時、鼓動1(最大4重複)" }
    ]
  },
  // For striker and vanguard jobs
  {
    id: "shared_08",
    name: "圧倒",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_08.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "敵全体にダメージ100%×3\n山札に過負荷を2枚生成" }
    ]
  },
  {
    id: "shared_09",
    name: "トゲの盾",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_09.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "敵全体に防御依存ダメージ100%\n破壊：ヒット数1回追加" }
    ]
  },
  {
    id: "shared_10",
    name: "重い強打",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_10.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ200%\n脆弱2\n弱体化2" }
    ]
  },
  {
    id: "shared_11",
    name: "渾身",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_11.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "防御依存ダメージ100%×2\n決意の数に応じてダメージ量+20%" }
    ]
  },
  {
    id: "shared_12",
    name: "激怒",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_12.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ300%\n手札に他の戦闘員のカードがない場合、このカードのコスト2減少" }
    ]
  },
  {
    id: "shared_13",
    name: "タックル",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.PULVERIZE],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_13.png",
    hiramekiVariations: [
      { level: 0, cost: 3, description: "防御既存ダメージ400%\nHPが最大の場合、このカードのコストを1減少" }
    ]
  },
  {
    id: "shared_14",
    name: "守りの叫び",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_14.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド130%\nシールドがない場合シールド100%追加" }
    ]
  },
  {
    id: "shared_15",
    name: "堅固だ",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_15.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド150%\n連続：次のターン開始時固定シールド150%" }
    ]
  },
  {
    id: "shared_16",
    name: "執拗な忍耐",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_16.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "シールド350%" }
    ]
  },
  {
    id: "shared_17",
    name: "魔力暴走",
    type: CardType.SHARED,
    category: CardCategory.UPGRADE,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_17.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "免疫2" }
    ]
  },
  {
    id: "shared_18",
    name: "肉弾戦",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_18.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "防御依存ダメージ200%\nクリスタライズ2" }
    ]
  },
  {
    id: "shared_19",
    name: "神聖な一撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_19.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ200%\n強靭度ダメージ2" }
    ]
  },
  {
    id: "shared_20",
    name: "エネルギーバリア",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_20.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "シールド100%\nアクションポイント1獲得" }
    ]
  },
  {
    id: "shared_21",
    name: "カモフラージュ",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_21.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "回避1\n次のターンドロー2" }
    ]
  },
  {
    id: "shared_22",
    name: "鉄壁",
    type: CardType.SHARED,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.INITIATION],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_22.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "決意1\n不屈1" }
    ]
  },
  {
    id: "shared_23",
    name: "踏みにじる",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.WEAKNESS_ATTACK],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_23.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ150%×2\nドロー1" }
    ]
  },
  {
    id: "shared_24",
    name: "ケンカ好き",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    imgUrl: "/images/cards/shared_24.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "手札に攻撃カードがない場合ドロー2" }
    ]
  },
  // For Ranger and Hunter jobs
  {
    id: "shared_62",
    name: "クイックドロー",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.INITIATION, CardStatus.EXHAUST],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_62.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ダメージ150%\n標識1" }
    ]
  },
  {
    id: "shared_27",
    name: "とっておきの一発",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.RETAIN, CardStatus.EXHAUST],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_27.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ダメージ100%\n保存：ダメージ量を＋50%" }
    ]
  },
  {
    id: "shared_28",
    name: "跳躍攻撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_28.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ200%\nインスピレーション:コスト1減少,ドロー1" }
    ]
  },
  {
    id: "shared_29",
    name: "頭蓋骨強打",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_29.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ200%\n弱点攻撃：ダメージ量+50%" },
      { level: 1, cost: 1, description: "ダメージ200%\n弱点攻撃：ダメージ量+50%\n行動カウント2増加" }
    ]
  },
  {
    id: "shared_30",
    name: "連続攻撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_30.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ50%×3" }
    ]
  },
  {
    id: "shared_31",
    name: "破滅",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_31.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ300%\n破棄1" }
    ]
  },
  {
    id: "shared_32",
    name: "衝撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_32.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "敵全体にダメージ200%\n脆弱2" }
    ]
  },
  {
    id: "shared_33",
    name: "交渉",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN, CardStatus.EXHAUST],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_33.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "士気2\n敵全体に士気2" }
    ]
  },
  {
    id: "shared_34",
    name: "酸性ガス",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETRIEVE],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_34.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "敵全体に損傷2" }
    ]
  },
  {
    id: "shared_35",
    name: "覚悟",
    type: CardType.SHARED,
    category: CardCategory.UPGRADE,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_35.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ターン開始時、手札のランダムな攻撃カードを1枚、1ターンの間ダメージ量を+50%" }
    ]
  },
  {
    id: "shared_36",
    name: "スピード連射",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_36.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ダメージ80%\nドロー1" },
      { level: 1, cost: 0, description: "ダメージ80%\nドロー1\n対象に標識1" },
      { level: 2, cost: 0, description: "ダメージ80%\nドロー1\n対象に弱体化1" },
      { level: 3, cost: 0, description: "ダメージ80%\nドロー1\n対象に苦痛2" }
    ]
  },
  {
    id: "shared_37",
    name: "機動射撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.INITIATION, CardStatus.EXHAUST],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_37.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "敵全体にダメー200%" },
      { level: 1, cost: 0, description: "敵全体にダメー200%\n次のターン、アクションポイント1" },
      { level: 2, cost: 0, description: "敵全体にダメー200%\n次のターン、ドロー1" },
      { level: 3, cost: 0, description: "敵全体にダメー200%\n敵全体苦痛2" },
      { level: 4, cost: 0, description: "敵全体にダメー200%\n敵全体標識2" }
    ]
  },
  {
    id: "shared_38",
    name: "奇襲",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_38.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ダメージ80%\n大破時このカードを墓地から手札に移動" },
      { level: 1, cost: 0, description: "ダメージ80%\n大破時このカードを墓地から手札に移動\n対象に苦痛2" }
    ]
  },
  {
    id: "shared_39",
    name: "必殺の射撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_39.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ350%\n次のターン開始時、ドロー1" },
      { level: 1, cost: 2, description: "ダメージ350%\n次のターン開始時、ドロー1\n対象に標識2" }
    ]
  },
  {
    id: "shared_40",
    name: "戦術対応",
    type: CardType.SHARED,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.INITIATION],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_40.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド保持中の対象にダメージ量15%増加" }
    ]
  },
  {
    id: "shared_41",
    name: "精密照準",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_41.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ダメージ120%\nドロー1\n手札のカードを1枚選択、そのカードを山札の一番上に移動" },
      { level: 1, cost: 0, description: "ダメージ120%\nドロー1\n手札のカードを1枚選択、そのカードを山札の一番上に移動\n対象に弱体化1" }
    ]
  },
  {
    id: "shared_42",
    name: "照準射撃",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    imgUrl: "/images/cards/shared_42.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ400%\nチャージ：クレジット20獲得" },
      { level: 1, cost: 2, description: "ダメージ400%\nチャージ：クレジット20獲得\nアクションポイント1獲得" }
    ]
  },
  // For Controller and Psionic jobs
  {
    id: "shared_45",
    name: "攻撃せよ！",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_45.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "山札の攻撃カードを1枚選択、そのカードを手札に移動" }
    ]
  },
  {
    id: "shared_46",
    name: "集結",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.HASTE],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_46.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ドロー1\n敵全体の行動カウントを3追加" }
    ]
  },
  {
    id: "shared_47",
    name: "反撃準備",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_47.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "エゴスキルスロットを他のエゴスキルに変更" }
    ]
  },
  {
    id: "shared_48",
    name: "懺悔",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_48.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "士気1減少\n決意1減少" }
    ]
  },
  {
    id: "shared_49",
    name: "戦略の再構成",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_49.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "次に使うエゴスキルのコストが1減少" }
    ]
  },
  {
    id: "shared_50",
    name: "解消の風",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_50.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "敵全体に苦痛2\n手札の状態異常、呪いカードを2枚まで選択して消滅" }
    ]
  },
  {
    id: "shared_51",
    name: "お金でメンタルヘルス",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_51.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒200%\nHPが最大の場合、クレジットを30獲得" }
    ]
  },
  {
    id: "shared_52",
    name: "救急キット",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.CELESTIAL, CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_52.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "治癒250%" }
    ]
  },
  {
    id: "shared_53",
    name: "直観点火",
    type: CardType.SHARED,
    category: CardCategory.UPGRADE,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_53.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "カード生成時、ランダムでひらめき付与（各ターン1回）" }
    ]
  },
  {
    id: "shared_54",
    name: "栄光の抵抗",
    type: CardType.SHARED,
    category: CardCategory.UPGRADE,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_54.png",
    hiramekiVariations: [
      { level: 0, cost: 3, description: "ターン開始時、味方に最大HP10%固定ダメージ、アクションポイント1獲得" }
    ]
  },
  {
    id: "shared_55",
    name: "原子分解",
    type: CardType.SHARED,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_55.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "敵全体貫通ダメージ230%" }
    ]
  },
  {
    id: "shared_56",
    name: "空虚の放浪者",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_56.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "1ターンの間対象の行動カウントが減少しない" }
    ]
  },
  {
    id: "shared_57",
    name: "再活用",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_57.png",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "エゴポイントが2以上の場合、アクションポイントを1獲得、エゴポイントが2減少" }
    ]
  },
  {
    id: "shared_58",
    name: "戦略の開始点",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_58.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "エゴポイント2獲得" }
    ]
  },
  {
    id: "shared_59",
    name: "闇の知識",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.FINALE, CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_59.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ドロー1\nそのカードを発動" }
    ]
  },
  {
    id: "shared_60",
    name: "装備カバン",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST, CardStatus.COMBO],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_60.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ドロー2" }
    ]
  },
  {
    id: "shared_61",
    name: "再整備",
    type: CardType.SHARED,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    imgUrl: "/images/cards/shared_61.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ドロー3" }
    ]
  },
];
