import { CznCard, CardType, CardCategory, CardStatus, JobType } from "@/types";

/**
 * Forbidden Cards
 * 
 * Note: Card names and descriptions are displayed using translations from messages/*.json files.
 * - Card name: t(`cards.${card.id}.name`)
 * - Card description: t(`cards.${card.id}.descriptions.${level}`)
 * 
 * The name and description fields below serve as fallback values when translations are not available.
 */
export const FORBIDDEN_CARDS: CznCard[] = [
  {
    id: "forbidden_card_8",
    name: "筋肉強化進化体",
    type: CardType.FORBIDDEN,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ80%×2\nインスピレーション:ヒット数2回増加" }
    ]
  },
  {
    id: "forbidden_card_9",
    name: "感染性ウイルス",
    type: CardType.FORBIDDEN,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: [JobType.RANGER, JobType.HUNTER],
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ120%×1\n感化:ヒット数1回増加(最大5重複)" }
    ]
  },
  {
    id: "forbidden_card_10",
    name: "攻撃性の突然変異",
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    hiramekiVariations: [
      { level: 0, cost: 0, description: "自分の攻撃カードドロー1、1ターンの間、そのカードのダメージ量+50%" }
    ]
  },
  {
    id: "forbidden_card_11",
    name: "殻形成細胞",
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    allowedJobs: [JobType.STRIKER, JobType.VANGUARD],
    hiramekiVariations: [
      { level: 0, cost: 0, description: "シールド70%\n手札のカードに応じてシールド+25%" }
    ]
  },
  {
    id: "forbidden_card_12",
    name: "強制略奪",
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: "all",
    hiramekiVariations: [
      { level: 0, cost: 0, description: "ドロー1\n山札または捨て札から、ランダムな禁忌カード1枚を手元に移動" }
    ]
  },
  {
    id: "forbidden_card_13",
    name: "禁じられたアルゴリズム",
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    allowedJobs: "all",
    hiramekiVariations: [
      { level: 0, cost: 3, description: "手札にランダムな禁忌カードを1枚生成" }
    ]
  },
  {
    id: "forbidden_card_14",
    name: "自己発電実験",
    type: CardType.FORBIDDEN,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.LEAD],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    hiramekiVariations: [
      { level: 0, cost: 2, description: "手札のカードが6枚以上の時、ランダムなカード1枚1ターンのコスト0（ターンごとに1回）" }
    ]
  },
  {
    id: "forbidden_card_15",
    name: "強制学習装置",
    type: CardType.FORBIDDEN,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.LEAD],
    allowedJobs: [JobType.CONTROLLER, JobType.PSIONIC],
    hiramekiVariations: [
      { level: 0, cost: 2, description: "カード4枚使用時、ドロー1（ターンごとに1回）" }
    ]
  },
  {
    id: "forbidden_card_1",
    name: "禁忌:永生の飢え", // Fallback
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN, CardStatus.EXHAUST],
    allowedJobs: "all",
    imgUrl: "/cards/forbidden/forbidden_card_1.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "感応:ドロー1、アクションポイント1獲得" },
    ]
  },
  {
    id: "forbidden_card_2",
    name: "禁忌:自由の手招き", // Fallback
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST, CardStatus.INITIATION],
    allowedJobs: "all",
    imgUrl: "/cards/forbidden/forbidden_card_2.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "手札のランダムなカード1枚のコスト1減少" },
    ]
  },
  {
    id: "forbidden_card_3",
    name: "禁忌:使い捨ての自我", // Fallback
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [],
    allowedJobs: "all",
    imgUrl: "/cards/forbidden/forbidden_card_3.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ドロー1、そのカードのコストに応じて、ドロー" },
    ]
  },
  {
    id: "forbidden_card_4",
    name: "禁忌:虚無の導き", // Fallback
    type: CardType.FORBIDDEN,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.INITIATION],
    allowedJobs: "all",
    imgUrl: "/cards/forbidden/forbidden_card_4.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "能力でドロー時、治癒40％、ランダムな戦闘員のストレス1減少" },
    ]
  },
  {
    id: "forbidden_card_5",
    name: "禁忌:暴力の歓喜", // Fallback
    type: CardType.FORBIDDEN,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.RETAIN],
    allowedJobs: "all",
    imgUrl: "/cards/forbidden/forbidden_card_5.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 9, description: "ダメージ150%x4\n能力でドロー時、このカードのコスト1減少" },
    ]
  },
  {
    id: "forbidden_card_6",
    name: "禁忌:憤怒の肖像", // Fallback
    type: CardType.FORBIDDEN,
    category: CardCategory.ATTACK,
    statuses: [],
    allowedJobs: "all",
    imgUrl: "/cards/forbidden/forbidden_card_6.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ70%x1\n手札のカード4枚ごとにヒット数1回追加\nヒット数に応じてドロー1" },
    ]
  },
  {
    id: "forbidden_card_7",
    name: "禁忌:刻まれた悪意", // Fallback
    type: CardType.FORBIDDEN,
    category: CardCategory.SKILL,
    statuses: [CardStatus.LEAD],
    allowedJobs: "all",
    imgUrl: "/cards/forbidden/forbidden_card_7.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ドロー1\n手札のランダムカード発動2" },
    ]
  },
];
