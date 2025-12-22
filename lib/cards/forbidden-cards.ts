import { CznCard, CardType, CardCategory, CardStatus } from "@/types";

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
