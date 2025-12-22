import { Card, CardType, CardCategory, CardStatus } from "@/types";

/**
 * Character Cards
 * 
 * Note: Card names and descriptions are displayed using translations from messages/*.json files.
 * - Card name: t(`cards.${card.id}.name`)
 * - Card description: t(`cards.${card.id}.descriptions.${level}`)
 * 
 * The name and description fields below serve as fallback values when translations are not available.
 */
export const CHARACTER_CARDS: Card[] = [
  // Luke's starting cards
  {
    id: "luke_starting_1",
    name: "精密射撃", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "luke_starting_2",
    name: "精密射撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "luke_starting_3",
    name: "影隠れ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "luke_starting_4",
    name: "連続撃発", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: false,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ50%x2<wbr/>会心攻撃数に応じて、ハンドガン弾丸生成<wbr/>会心率+50%" },
      { level: 1, cost: 1, description: "ダメージ75%x2<wbr/>会心攻撃数に応じて、ハンドガン弾丸生成<wbr/>会心率+50%", statuses: [CardStatus.RETRIEVE] },
      { level: 2, cost: 1, description: "ダメージ30%x3<wbr/>会心攻撃数に応じて、ハンドガン弾丸生成<wbr/>会心率+50%"},
      { level: 3, cost: 1, description: "ダメージ150%<wbr/>会心攻撃数に応じて、ハンドガン弾丸生成<wbr/>確定で会心攻撃"},
      { level: 4, cost: 0, description: "ダメージ50%x3<wbr/>会心率+50%", statuses: [CardStatus.BULLET] },
      { level: 5, cost: 1, description: "ダメージ75%x2<wbr/>会心攻撃数に応じて、ドロー<wbr/>会心率+70%"}
    ]
  },
  // Luke's hirameki cards
  {
    id: "luke_hirameki_1",
    name: "隠密な装填", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ハンドガン弾丸2枚生成" },
      { level: 1, cost: 1, description: "ハンドガン弾丸2枚生成<wbr/>そのカードの会心率＋30%"},
      { level: 2, cost: 1, description: "ハンドガン弾丸3枚生成"},
      { level: 3, cost: 1, description: "ハンドガン弾丸2枚生成<wbr/>次のターン開始時、ハンドガン弾丸2枚生成"},
      { level: 4, cost: 0, category: CardCategory.UPGRADE, description: "ターン開始時、ハンドガン弾丸を1枚生成"},
      { level: 5, cost: 2, description: "ハンドガン弾丸5枚生成", statuses: [CardStatus.EXHAUST] }
    ]
  },
  {
    id: "luke_hirameki_2",
    name: "機会捕捉", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.LEAD],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド100%<wbr/>次に使用する弾丸カードのダメージ量＋120%", statuses: [CardStatus.LEAD] },
      { level: 1, cost: 1, description: "シールド150%<wbr/>次に使用する弾丸8)カードのダメージ量＋170%", statuses: [CardStatus.LEAD]  },
      { level: 2, cost: 1, description: "シールド100%<wbr/>次に使用する弾2枚の弾丸カードのダメージ量＋120%", statuses: [CardStatus.LEAD] },
      { level: 3, cost: 1, description: "シールド100%<wbr/>1ターンの間、弾丸カードのダメージ量＋70%", statuses: [CardStatus.LEAD] },
      { level: 4, cost: 1, description: "シールド100%<wbr/>次に使用する攻撃カードのダメージ量＋120%", statuses: [CardStatus.LEAD] },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "ハンドガン弾丸カードのダメージ量＋30%", statuses: [CardStatus.LEAD] }
    ]
  },
  {
    id: "luke_hirameki_3",
    name: "魔眼の乱舞", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ50%<wbr/>今回のターンで使用した弾丸カード数に応じて、ヒット数1回追加" },
      { level: 1, cost: 2, description: "ダメージ75%<wbr/>今回のターンで使用した弾丸カード数に応じて、ヒット数1回追加" },
      { level: 2, cost: 2, description: "ダメージ50%<wbr/>今回のターンで使用した攻撃カードの数に応じて、ヒット数1回追加" },
      { level: 3, cost: 2, description: "ダメージ50%<wbr/>今回のターンで使用した弾丸カード数に応じて、ヒット数1回追加<wbr/>弱点攻撃：ダメージ量＋50%" },
      { level: 4, cost: 1, description: "ダメージ50%<wbr/>シールド50%<wbr/>今回のターンで使用した弾丸カード数に応じて、ヒット数1回追加、シールド獲得量＋50%" },
      { level: 5, cost: 3, description: "ダメージ50%×6<wbr/>弾丸カードの使用時、1ターンの間、コスト1減少" }
    ]
  },
  {
    id: "luke_hirameki_4",
    name: "必殺弾", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.UNIQUE, CardStatus.BULLET],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AF_%E3%82%AB%E3%83%BC%E3%83%89_20251126-215905.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "ダメージ200%<wbr/>ハンドガン弾丸4)カードを5枚使用時、使用不可を排除" },
    ]
  },
  // Khalipe's starting cards
  {
    id: "khalipe_starting_1",
    name: "ムチ打ち", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "防御依存ダメージ100%" } // Fallback
    ]
  },
  {
    id: "khalipe_starting_2",
    name: "斬り上げ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png",
    hiramekiVariations: [
      { level: 0, cost: 2, description: "防御依存ダメージ180%" } // Fallback
    ]
  },
  {
    id: "khalipe_starting_3",
    name: "ティールの誓い", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "khalipe_starting_4",
    name: "バルチャー射出", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.INITIATION, CardStatus.RETAIN],
    isBasicCard: false,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 3, description: "敵全体に防御依存ダメージ100%<wbr/>シールド80%<wbr/>銀色の帳7)1" },
      { level: 1, cost: 3, description: "敵全体に防御依存ダメージ210%<wbr/>銀色の帳1" },
      { level: 2, cost: 3, description: "シールド200%<wbr/>銀色の帳1"},
      { level: 3, cost: 3, description: "敵全体に防御依存ダメージ150%<wbr/>シールド120%<wbr/>銀色の帳1"},
      { level: 4, cost: 3, description: "敵全体に防御依存ダメージ150%<wbr/>銀色の帳1<wbr/>保存：シールド80%" },
      { level: 5, cost: 3, description: "敵全体に防御依存ダメージ150%<wbr/>銀色の帳1<wbr/>手札のカード数に応じて、シールド30%"}
    ]
  },
  // Khalipe's hirameki cards
  {
    id: "khalipe_hirameki_1",
    name: "大剣アクイラ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "敵全体に防御依存ダメージ150%<wbr/>手札に手元バルチャー射出がある場合、コスト1増加、ダメージ量+100%" },
      { level: 1, cost: 1, description: "敵全体に防御依存ダメージ210%<wbr/>手札に手元バルチャー射出がある場合、コスト1増加、ダメージ量+120%"},
      { level: 2, cost: 2, description: "敵全体に防御依存ダメージ220%<wbr/>使用時、ダメージ量+40%"},
      { level: 3, cost: 2, description: "敵全体に防御依存ダメージ220%<wbr/>手札バルチャー射出がある場合、銀色の帳1"},
      { level: 4, cost: 2, description: "敵全体に防御依存ダメージ220%<wbr/>保存：次に使用するバルチャー射出のダメージ量+60%", statuses: [CardStatus.RETAIN]},
      { level: 5, cost: 1, description: "敵全体に防御依存ダメージ150%<wbr/>手札に手元バルチャー射出がある場合、コスト1増加、ダメージ量+100%", statuses: [CardStatus.RETRIEVE] }
    ]
  },
  {
    id: "khalipe_hirameki_2",
    name: "威圧", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "シールド200%<wbr/>敵全体に強靭度ダメージ1"},
      { level: 1, cost: 2, description: "シールド250%<wbr/>敵全体に強靭度ダメージ1<wbr/>大破状態の敵数に応じてダメージ減少1"},
      { level: 2, cost: 2, description: "シールド250%<wbr/>敵全体に強靭度ダメージ1<wbr/>大破状態の敵に、脆弱2、そうでない場合、弱体化2"},
      { level: 3, cost: 2, description: "シールド250%<wbr/>敵全体に強靭度ダメージ2"},
      { level: 4, cost: 2, description: "シールド200%<wbr/>敵全体に強靭度ダメージ1<wbr/>手札のカード数に応じてシールド獲得量+40%"},
      { level: 5, cost: 2, description: "シールド250%<wbr/>敵全体に強靭度ダメージ1<wbr/>敵全体の行動カウント5追加"}
    ]
  },
  {
    id: "khalipe_hirameki_3",
    name: "再集結", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png?w=800&tok=3dba47",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド120%<wbr/>コストが最も高いカードを、ドロー15)1" },
      { level: 1, cost: 1, description: "シールド150%<wbr/>コストが最も高いカードを、ドロー1<wbr/>銀色の帳1" },
      { level: 2, cost: 1, description: "シールド150%<wbr/>天上カードドロー1<wbr/>銀色の帳1" },
      { level: 3, cost: 2, description: "シールド150%<wbr/>コストが最も高いカードを、ドロー1<wbr/>銀色の帳1", statuses: [CardStatus.CELESTIAL] },
      { level: 4, cost: 1, description: "シールド120%<wbr/>ドロー1<wbr/>このカードのコストの分シールド60%<wbr/>銀色の帳1" },
      { level: 5, cost: 1, description: "シールド150%<wbr/>山札からコスト2以上のカードを1枚選択し、ドロー" }
    ]
  },
  {
    id: "khalipe_hirameki_4",
    name: "絶対守護", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.FINALE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%83%AA%E3%83%BC%E3%83%9A_%E3%82%AB%E3%83%BC%E3%83%89.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: "X", description: "X分のシールド100%<wbr/>1ターンの間、手札のすべてのカード保存" },
    ]
  },
  // Magna's starting cards
  {
    id: "magna_starting_1",
    name: "氷結の拳", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "magna_starting_2",
    name: "霜の盾", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "magna_starting_3",
    name: "霜の盾", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%%" } // Fallback
    ]
  },
  {
    id: "magna_starting_4",
    name: "氷の破片", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.LEAD],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "クリスタライズ2<wbr/>ターン開始時、反撃1" },
      { level: 1, cost: 1, description: "クリスタライズ4<wbr/>ターン開始時、反撃1"},
      { level: 2, cost: 1, description: "クリスタライズ2<wbr/>ターン開始時、反撃2" },
      { level: 3, cost: 0, description: "クリスタライズ2<wbr/>ターン開始時、反撃1", statuses: [CardStatus.INITIATION]},
      { level: 4, cost: 2, description: "クリスタライズ2<wbr/>ターン開始時、敵全体に防御依存ダメージ200%", statuses: [CardStatus.UNIQUE, CardStatus.LEAD] },
      { level: 5, cost: 2, category: CardCategory.SKILL, description: "反撃4<wbr/>次の反撃ダメージ量30%増加"}
    ]
  },
  // Magna's hirameki cards
  {
    id: "magna_hirameki_1",
    name: "氷河の鉄拳", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "防御依存ダメージ210%<wbr/>与ダメージの50%分、固定シールドを獲得（最大HPの20%を超えることはできない）" },
      { level: 1, cost: 2, description: "防御依存ダメージ315%<wbr/>与ダメージの50%分固定シールドを獲得（最大HPの20%を超えることはできない）"},
      { level: 2, cost: 2, description: "防御依存ダメージ210%<wbr/>脆弱12)3"},
      { level: 3, cost: 2, description: "防御依存ダメージ315%<wbr/>シールド所持中の場合、ダメージ量50%増加"},
      { level: 4, cost: 2, description: "敵全体に防御依存ダメージ210%<wbr/>与ダメージの50%分固定シールドを獲得（最大HPの20%を超えることはできない）"},
      { level: 5, cost: 3, description: "防御依存ダメージ400%<wbr/>与ダメージの50%分固定シールドを獲得（最大HPの20%を超えることはできない）<wbr/>1ターンの間、シールド保存14)1", statuses: [CardStatus.EXHAUST] }
    ]
  },
  {
    id: "magna_hirameki_2",
    name: "氷の壁", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "シールド100%<wbr/>反撃2<wbr/>1ターンの間、反撃の対象が敵全体に適用"},
      { level: 1, cost: 2, description: "シールド150%<wbr/>反撃3<wbr/>1ターンの間、反撃の対象が敵全体に適用"},
      { level: 2, cost: 2, description: "シールド150%<wbr/>自分が所持中の反撃の数に応じてシールド獲得量+30%<wbr/>反撃2" },
      { level: 3, cost: 2, category: CardCategory.UPGRADE, description: "反撃対象が敵全体に適用" },
      { level: 4, cost: 2, category: CardCategory.ATTACK, description: "シールド100%<wbr/>所持中のシールドに応じて敵全体にダメージ" },
      { level: 5, cost: 2, description: "シールド100%<wbr/>反撃2<wbr/>2ターンの間、反撃の対象が敵全体に適用" }
    ]
  },
  {
    id: "magna_hirameki_3",
    name: "アイスチャージ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド100%<wbr/>敵全体に脆弱2" },
      { level: 1, cost: 1, description: "シールド150%<wbr/>敵全体に脆弱2<wbr/>敵数に応じてシールド獲得量+50%" },
      { level: 2, cost: 1, description: "シールド150%<wbr/>敵全体に脆弱3" },
      { level: 3, cost: 1, category: CardCategory.UPGRADE, description: "反撃した対象に脆弱2" },
      { level: 4, cost: 1, category: CardCategory.ATTACK, description: "ランダムな敵に、防御依存ダメージ110%×3<wbr/>ヒットした対象に脆弱1" },
      { level: 5, cost: 1, description: "敵全体に脆弱2<wbr/>反撃2" }
    ]
  },
  {
    id: "magna_hirameki_4",
    name: "極寒の嵐", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.LEAD],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%82%B0%E3%83%8A_%E3%82%AB%E3%83%BC%E3%83%89_20251206-120609.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "能力でシールド獲得時、反撃1" },
    ]
  },
  // rin's starting cards
  {
    id: "rin_starting_1",
    name: "黒雲剣･一式", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "rin_starting_2",
    name: "黒雲剣･三式", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ200%" } // Fallback
    ]
  },
  {
    id: "rin_starting_3",
    name: "守護", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "rin_starting_4",
    name: "抜刀", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.HASTE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "ダメージ120%<wbr/>黒雲態勢獲得<wbr/>黒雲態勢：ダメージ量50%増加" },
      { level: 1, cost: 0, description: "ダメージ180%<wbr/>黒雲態勢獲得<wbr/>黒雲態勢：ダメージ量50%増加" },
      { level: 2, cost: 0, description: "ダメージ150%<wbr/>黒雲態勢獲得<wbr/>黒雲態勢：ヒット数1回追加"},
      { level: 3, cost: 0, description: "ダメージ350%<wbr/>黒雲態勢：このカード使用可能"},
      { level: 4, cost: 0, description: "ダメージ120%<wbr/>黒雲態勢獲得<wbr/>黒雲態勢：手札のカード数(0)に応じて、ダメージ量30%増加" },
      { level: 5, cost: 2, description: "ダメージ360%<wbr/>黒雲態勢獲得<wbr/>黒雲態勢：ダメージ量50%増加"}
    ]
  },
  // rin's hirameki cards
  {
    id: "rin_hirameki_1",
    name: "黒雲奥義：残", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "シールド100%<wbr/>自分のカード、ドロー2" },
      { level: 1, cost: 0, description: "自分のカード、ドロー1<wbr/>黒雲態勢獲得"},
      { level: 2, cost: 0, description: "自分のカードをドロー1<wbr/>黒雲態勢：1ターンの間、そのカードのコスト1減少"},
      { level: 3, cost: 0, description: "自分の攻撃カードドロー1<wbr/>黒雲態勢：1ターンの間、そのカードのダメージ量50%増加"},
      { level: 4, cost: 0, description: "山札5)または墓地6)から黒雲奥義：滅、黒雲奥義：黒舞を手札に移動"},
      { level: 5, cost: 2, category: CardCategory.UPGRADE, description: "ターン開始時、黒雲態勢状態の場合、リンのカード1枚をドロー" }
    ]
  },
  {
    id: "rin_hirameki_2",
    name: "黒雲奥義：滅", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.HASTE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ150%<wbr/>黒雲態勢：ヒット数1回追加" },
      { level: 1, cost: 1, description: "ダメージ225%<wbr/>黒雲態勢：ヒット数1回追加"  },
      { level: 2, cost: 1, description: "ダメージ50%×2<wbr/>黒雲態勢：ヒット数2回追加" },
      { level: 3, cost: 1, description: "ダメージ100%×2<wbr/>黒雲態勢：会心ダメージ+100%" },
      { level: 4, cost: 1, description: "ダメージ250%<wbr/>黒雲態勢：ダメージ量100%増加" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "ダメージ180%<wbr/>黒雲態勢：手札にあるすべての自分のカードが1ターンの間、コスト1減少" }
    ]
  },
  {
    id: "rin_hirameki_3",
    name: "黒雲の心法", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "1ターンの間、黒雲態勢保存7)<wbr/>黒雲態勢：1ターンの間、自分の攻撃カードのダメージ量+30%" },
      { level: 1, cost: 1, description: "1ターンの間、黒雲態勢保存<wbr/>黒雲態勢：1ターンの間、自分の攻撃カードのダメージ量+60%" },
      { level: 2, cost: 0, description: "1ターンの間、黒雲態勢保存<wbr/>黒雲態勢：1ターンの間、自分の攻撃カードのダメージ量+30%" },
      { level: 3, cost: 1, description: "1ターンの間、黒雲態勢保存<wbr/>黒雲奥義：滅1枚を生成、そのカードに蒸発8)付与" },
      { level: 4, cost: 1, description: "ターン開始時、黒雲態勢を獲得" },
      { level: 5, cost: 1, description: "黒雲態勢状態の場合、リンの攻撃カードダメージ50%増加" }
    ]
  },
  {
    id: "rin_hirameki_4",
    name: "黒雲奥義：黒舞", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.UNIQUE, CardStatus.BULLET],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AA%E3%83%B3_%E3%82%AB%E3%83%BC%E3%83%89_20251120-195729.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ80%<wbr/>黒雲態勢：手札のスキルカード数に応じてヒット数1回追加(最大5回)" },
    ]
  },
  // Orlea's starting cards
  {
    id: "orlea_starting_1",
    name: "突撃だ、みんな", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "orlea_starting_2",
    name: "突撃だ、みんな", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "orlea_starting_3",
    name: "光の治癒", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "orlea_starting_4",
    name: "聖なる香炉", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.INITIATION],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "創造物★を2枚生成" },
      { level: 1, cost: 1, description: "創造物★を3枚生成" },
      { level: 2, cost: 2, description: "創造物★を2枚生成<wbr/>ターン開始時創造物★1枚生成", statuses: [CardStatus.INITIATION, CardStatus.LEAD] },
      { level: 3, cost: 1, description: "ふかちゃん★、創造物★を1枚ずつ生成<wbr/>次にふかちゃん使用時ふかちゃん★を生成"},
      { level: 4, cost: 1, description: "素早いちゃん★、創造物★を1枚ずつ生成<wbr/>次に使用する素早いちゃんのダメージ量が40%増加" },
      { level: 5, cost: 1, description: "丈夫ちゃん★、創造物★を1枚ずつ生成<wbr/>次に丈夫ちゃん使用時シールド150%"}
    ]
  },
  // Orlea's hirameki cards
  {
    id: "orlea_hirameki_1",
    name: "成長促進", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "治癒50%<wbr/>手札の自分のカードを1枚選択、保存効果2回発動" },
      { level: 1, cost: 0, description: "治癒50%<wbr/>手札のカードを1枚選択、保存効果2回発動"},
      { level: 2, cost: 2, description: "治癒50%<wbr/>手札の自分の創造物を1枚選択、手札にコピー", statuses: [CardStatus.EXHAUST]},
      { level: 3, cost: 1, description: "治癒100% 手札の自分のカードを1枚選択、保存効果を2回発動<wbr/>そのカードがふかちゃんの場合、敵全体に脆弱2"},
      { level: 4, cost: 1, description: "治癒100% 手札の自分のカードを1枚選択、保存効果を2回発動<wbr/>そのカードが素早いちゃんの場合、保存効果を3回発動"},
      { level: 5, cost: 1, description: "治癒100% 手札の自分のカードを1枚選択、保存効果を2回発動<wbr/>そのカードが丈夫ちゃんの場合、味方のストレス5減少" }
    ]
  },
  {
    id: "orlea_hirameki_2",
    name: "めんどくさい", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "手札のカード数に応じて、固定ダメージ40%" },
      { level: 1, cost: 1, description: "手札のカード数に応じて、固定ダメージ40%<wbr/>6枚以上の場合、治癒150%"  },
      { level: 2, cost: 1, description: "ダメージ100%<wbr/>手札の創造物の数に応じて、ダメージ量+100%" },
      { level: 3, cost: 1, description: "固定ダメージ450%<wbr/>保存：コスト1減少", statuses: [CardStatus.RETAIN] },
      { level: 4, cost: 1, description: "ランダムな敵に固定ダメージ60%×3<wbr/>ヒットした対象の数に応じて、創造物★1枚生成" },
      { level: 5, cost: 1, description: "ダメージ100%<wbr/>このカードが手札にある時、創造物を生成した数に応じて使用するまで、ダメージ量+100%", statuses: [CardStatus.RETAIN] }
    ]
  },
  {
    id: "orlea_hirameki_3",
    name: "成長する創造物", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "創造物★を1枚生成<wbr/>保存：このカードを創造物★★★に変更" },
      { level: 1, cost: 1, description: "創造物★を1枚生成<wbr/>保存：創造物★1枚生成" },
      { level: 2, cost: 1, description: "創造物★を1枚生成<wbr/>保存：このカードを創造物★★に変更、全ての創造物★を1枚ずつ生成" },
      { level: 3, cost: 1, description: "創造物★を1枚生成<wbr/>保存：このカードをふかちゃん★★★に変更、敵全体に脆弱2" },
      { level: 4, cost: 1, description: "創造物★を1枚生成<wbr/>保存：このカードを素早いちゃん★★★に変更、保存効果2回発動" },
      { level: 5, cost: 1, description: "創造物★を1枚生成<wbr/>保存：このカードを丈夫ちゃん★★★に変更、敵全体に弱体化2" }
    ]
  },
  {
    id: "orlea_hirameki_4",
    name: "光の意志", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%AB%E3%83%AC%E3%82%A2_%E3%82%AB%E3%83%BC%E3%83%89_20251122-151845.png?w=800&tok=f7e271",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "治癒200%<wbr/>手札にある全てのカードの保存効果発動" },
    ]
  },
  // Mei Lin's starting cards
  {
    id: "meilin_starting_1",
    name: "一撃", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "meilin_starting_2",
    name: "一撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "meilin_starting_3",
    name: "火竜護身", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "meilin_starting_4",
    name: "火竜の宝石", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE, CardStatus.INITIATION],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A1%E3%82%A4%E3%83%AA%E3%83%B3_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E7%81%AB%E7%AB%9C%E3%81%AE%E5%AE%9D%E7%9F%B3_1_20251116-154724.png?w=150&h=225&tok=7bca46",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "自分の攻撃カードのダメージ量20%増加<wbr/>攻撃カード使用時、対象に情熱弱点1" },
      { level: 1, cost: 1, description: "自分の攻撃カードのダメージ量30%増加<wbr/>攻撃カード使用時、対象に情熱弱点1" },
      { level: 2, cost: 1, description: "自分の攻撃カードのダメージ量20%増加<wbr/>攻撃カード使用時、対象に強靭度ダメージ1"},
      { level: 3, cost: 1, description: "自分の攻撃カードのダメージ量20%増加<wbr/>攻撃カード使用時、対象に残り火1、情熱弱点1"},
      { level: 4, cost: 1, description: "自分の会心率30%増加<wbr/>会心攻撃時、対象に強靭度ダメージ1、残り火1" },
      { level: 5, cost: 2, description: "大破時、対象にダメージ300%", statuses: [CardStatus.INITIATION]}
    ]
  },
  // Mei Lin's hirameki cards
  {
    id: "meilin_hirameki_1",
    name: "昇龍脚", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A1%E3%82%A4%E3%83%AA%E3%83%B3_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E6%98%87%E9%BE%8D%E8%84%9A_1_20251116-093102.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ100%<wbr/>残り火2<wbr/>連続：ヒット数1回追加" },
      { level: 1, cost: 1, description: "ダメージ100%<wbr/>残り火2<wbr/>連続：ヒット数2回追加 "},
      { level: 2, cost: 1, description: "ダメージ150%<wbr/>残り火3<wbr/>連続：ヒット数1回追加"},
      { level: 3, cost: 2, description: "ダメージ200%<wbr/>次に使用する情熱カード、ヒット数1回追加"},
      { level: 4, cost: 1, description: "ダメージ100%<wbr/>次に使用する自分の基本攻撃カード、ヒット数2回追加"},
      { level: 5, cost: 2, description: "ダメージ150%<wbr/>1ターンの間、使用した情熱カード数に応じて、ヒット数1回追加" }
    ]
  },
  {
    id: "meilin_hirameki_2",
    name: "攻防一体", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A1%E3%82%A4%E3%83%AA%E3%83%B3_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E6%94%BB%E9%98%B2%E4%B8%80%E4%BD%93_1_20251116-093807.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "自分の基本カードドロー2、1ターンの間、そのカードのコスト1減少" },
      { level: 1, cost: 0, description: "自分の基本カードドロー2、1ターンの間、そのカードのコスト1減少、ダメージ量、シールド獲得量50%増加"  },
      { level: 2, cost: 0, description: "自分の基本カード2枚を手札に移動、1ターンの間、そのカードのコスト1減少" },
      { level: 3, cost: 2, description: "自分の基本カードドロー2、手札のカードを2枚まで選択し、消滅<wbr/>その数に応じて1ターンの間、士気2、決意2" },
      { level: 4, cost: 0, category: CardCategory.UPGRADE, description: "一撃2枚生成<wbr/>そのカードのコスト1減少" },
      { level: 5, cost: 2, category: CardCategory.UPGRADE, description: "自分の基本カードのダメージ量100%増加", statuses: [CardStatus.UNIQUE] }
    ]
  },
  {
    id: "meilin_hirameki_3",
    name: "芳香族の精神", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A1%E3%82%A4%E3%83%AA%E3%83%B3_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E8%8A%B3%E9%A6%99%E6%97%8F%E3%81%AE%E7%B2%BE%E7%A5%9E_1_20251116-094745.png.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "1ターンの間、自分のカード使用時、自分のダメージ量+20%" },
      { level: 1, cost: 1, description: "1ターンの間、情熱カード使用時、自分のダメージ量+20%" },
      { level: 2, cost: 1, description: "1ターンの間、自分のカード使用時、自分のダメージ量+30%" },
      { level: 3, cost: 0, description: "1ターンの間、自分のカード使用時、自分のダメージ量+20%", statuses: [CardStatus.INITIATION] },
      { level: 4, cost: 1, description: "1ターンの間、自分のカード使用時、ランダムな敵に残り火1" },
      { level: 5, cost: 1, description: "1ターンの間、自分のカード使用時、自分の基本カードのダメージ量+50%" }
    ]
  },
  {
    id: "meilin_hirameki_4",
    name: "火龍驚天", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.WEAKNESS_ATTACK],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "ダメージ300%<wbr/>破壊：残り火保存" },
    ]
  },
  // Velonica's starting cards
  {
    id: "velonica_starting_1",
    name: "速射弾", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "velonica_starting_2",
    name: "速射弾", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "velonica_starting_3",
    name: "金璇花の幻想", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "velonica_starting_4",
    name: "発射準備", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.UNIQUE, CardStatus.INITIATION],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%99%E3%83%AD%E3%83%8B%E3%82%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E7%99%BA%E5%B0%84%E6%BA%96%E5%82%99_0_20251122-094718.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "バリスタ 1枚生成<wbr/>ターン開始時、バリスタ 1枚生成" },
      { level: 1, cost: 1, description: "バリスタ 1枚生成<wbr/>ターン開始時、バリスタ 1枚生成<wbr/>50%の確率で1枚を追加生成" },
      { level: 2, cost: 1, description: "貫通バリスタ 1枚生成<wbr/>ターン開始時、貫通バリスタ 1枚生成"},
      { level: 3, cost: 1, description: "強化バリスタ 1枚生成<wbr/>ターン開始時、強化バリスタ 1枚生成"},
      { level: 4, cost: 1, description: "大型バリスタ 1枚生成<wbr/>ターン開始時、大型バリスタ 1枚生成" },
      { level: 5, cost: 1, description: "連射バリスタ 1枚生成<wbr/>ターン開始時、連射バリスタ 1枚生成"}
    ]
  },
  // Velonica's hirameki cards
  {
    id: "velonica_hirameki_1",
    name: "息抜き", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%99%E3%83%AD%E3%83%8B%E3%82%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%81%AF%E6%8A%9C%E3%81%8D_0_20251121-112200.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド100%<wbr/>他の戦闘員のカード8)ドロー2" },
      { level: 1, cost: 0, description: "他の戦闘員のカードドロー2"},
      { level: 2, cost: 1, description: "シールド150%<wbr/>他の戦闘員のカードドロー2<wbr/>そのカードがスキルカードの場合、装填1"},
      { level: 3, cost: 1, description: "シールド150%<wbr/>他の戦闘員のカードドロー2<wbr/>そのカードのうち1枚は1ターンの間、コスト1減少"},
      { level: 4, cost: 1, description: "シールド150%<wbr/>手札の他の戦闘員のスキルカード数に応じて、装填1"},
      { level: 5, cost: 1, description: "シールド150%<wbr/>手札の他の戦闘員のカードを全て破棄<wbr/>その数に応じて装填1" }
    ]
  },
  {
    id: "velonica_hirameki_2",
    name: "決意のペンダント", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%99%E3%83%AD%E3%83%8B%E3%82%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%B1%BA%E6%84%8F%E3%81%AE%E3%83%9A%E3%83%B3%E3%83%80%E3%83%B3%E3%83%88_0_20251122-112501.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "他の戦闘員のスキルカード使用時、装填1" },
      { level: 1, cost: 1, description: "スキルカード使用時、装填1" },
      { level: 2, cost: 1, description: "他の戦闘員のスキルカード使用時、装填1<wbr/>3枚使用後に次のターン開始後、超小型バリスタ 1枚生成", statuses: [CardStatus.UNIQUE] },
      { level: 3, cost: 1, category: CardCategory.SKILL, description: "1ターンの間、カード使用時、装填1", statuses: [CardStatus.EXHAUST] },
      { level: 4, cost: 1, description: "他の戦闘員のスキルカード使用時、装填1<wbr/>50%の確率で装填1追加" },
      { level: 5, cost: 1, category: CardCategory.SKILL, description: "装填2", statuses: [CardStatus.RETAIN, CardStatus.RETRIEVE] }
    ]
  },
  {
    id: "velonica_hirameki_3",
    name: "コワルスキー卿", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "手札のバリスタ1枚を選択、発動時までダメージ量+100%<wbr/>ドロー1" },
      { level: 1, cost: 1, description: "手札のバリスタ1枚を選択、発動時までダメージ量+150%<wbr/>ドロー2" },
      { level: 2, cost: 1, description: "ドロー1<wbr/>1ターンの間、バリスタのダメージ量30%増加" },
      { level: 3, cost: 1, description: "ドロー2<wbr/>スキルカードドロー時、バリスタ1枚生成" },
      { level: 4, cost: 1, description: "手札のランダムなバリスタ1枚のダメージ量+250%、発動後消滅" },
      { level: 5, cost: 1, description: "手札のバリスタ1枚を選択して消滅、バリスタ2枚生成、そのカードのダメージ量を発動時まで25%減少" }
    ]
  },
  {
    id: "velonica_hirameki_4",
    name: "爆撃準備", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "装填最大重複1増加<wbr/>装填1" },
    ]
  },
  // Renoa's starting cards
  {
    id: "renoa_starting_1",
    name: "殲滅攻撃", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "renoa_starting_2",
    name: "殲滅攻撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "renoa_starting_3",
    name: "黒い帳", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "renoa_starting_4",
    name: "嘆きの山びこ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ140%<wbr/>鎮魂の弾丸1枚生成" },
      { level: 1, cost: 1, description: "ダメージ140%<wbr/>鎮魂の弾丸2枚生成" },
      { level: 2, cost: 1, description: "ダメージ140%<wbr/>鎮魂の弾丸を1枚生成し、さらに2枚を捨て札に生成"},
      { level: 3, cost: 1, description: "ダメージ140%<wbr/>鎮魂の弾丸1枚生成、山札4)の鎮魂の弾丸2枚破棄"},
      { level: 4, cost: 1, category: CardCategory.SKILL, description: "鎮魂の弾丸 3枚生成" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "鎮魂の弾丸1枚生成<wbr/>ターン開始時、鎮魂の弾丸1枚を生成", statuses: [CardStatus.INITIATION]}
    ]
  },
  // Renoa's hirameki cards
  {
    id: "renoa_hirameki_1",
    name: "即刻処刑", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ180%<wbr/>手札に鎮魂の弾丸がある場合、1枚破棄し、ダメージ量+100%" },
      { level: 1, cost: 1, description: "ダメージ270%<wbr/>手札に鎮魂の弾丸がある場合、1枚破棄し、ダメージ量+150%"},
      { level: 2, cost: 1, description: "ダメージ220%<wbr/>山札に鎮魂の弾丸がある場合、1枚破棄し、ダメージ量+120%"},
      { level: 3, cost: 1, description: "ダメージ220%<wbr/>墓地11)に鎮魂の弾丸がある場合、1枚消滅し、ヒット数1回追加"},
      { level: 4, cost: 2, description: "ダメージ180%<wbr/>墓地に移動時、ランダムな敵に追加攻撃250%"},
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "ターン終了時、HPが最も低い敵に追加攻撃200%" }
    ]
  },
  {
    id: "renoa_hirameki_2",
    name: "漆黒の頌詩", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AC%E3%83%8E%E3%82%A2_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E6%BC%86%E9%BB%92%E3%81%AE%E9%A0%8C%E8%A9%A9_20251117-174116.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ50%×3<wbr/>手札の鎮魂の弾丸の数に応じてダメージ量+20%" },
      { level: 1, cost: 1, description: "ダメージ75%×3<wbr/>手札の鎮魂の弾丸の数に応じて、ダメージ+30%"  },
      { level: 2, cost: 1, category: CardCategory.SKILL, description: "山札と墓地から鎮魂の弾丸を3枚まで手札に移動" },
      { level: 3, cost: 1, description: "ダメージ50%×3<wbr/>対象に手札の鎮魂の弾丸の数に応じて、標識1" },
      { level: 4, cost: 1, description: "ダメージ50%×3<wbr/>1ターンの間 鎮魂の弾丸の追加攻撃のダメージ量100%増加" },
      { level: 5, cost: 1, description: "ダメージ50%×3<wbr/>墓の鎮魂の弾丸の数を全て消滅、その数に応じてダメージ量を50%増加" }
    ]
  },
  {
    id: "renoa_hirameki_3",
    name: "運命を飲み込んだ花", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AC%E3%83%8E%E3%82%A2_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E9%81%8B%E5%91%BD%E3%82%92%E9%A3%B2%E3%81%BF%E8%BE%BC%E3%82%93%E3%81%A0%E8%8A%B1_20251117-174451.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "手札を2枚まで破棄<wbr/>その数に応じて、鎮魂の弾丸を生成" },
      { level: 1, cost: 0, description: "手札を3枚まで破棄<wbr/>その数に応じて、鎮魂の弾丸を生成" },
      { level: 2, cost: 1, description: "手札の他の戦闘員のカードを全て破棄<wbr/>その数に応じて鎮魂の弾丸 2枚生成", statuses: [CardStatus.EXHAUST] },
      { level: 3, cost: 0, description: "手札を2枚まで破棄<wbr/>捨て札のコスト1につき次に使用するカードダメージ量+40%" },
      { level: 4, cost: 1, description: "ドロー2<wbr/>手札に鎮魂の弾丸がある場合、ドロー1追加" },
      { level: 5, cost: 0, description: "手札の全ての鎮魂の弾丸に、回収付与" }
    ]
  },
  {
    id: "renoa_hirameki_4",
    name: "決死の一撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.RETAIN],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ150%(+0%)<wbr/>鎮魂の弾丸を全て破棄、その数に応じてダメージ+50%" },
    ]
  },
  // Hugo's starting cards
  {
    id: "hugo_starting_1",
    name: "ナイフ投げ", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "hugo_starting_2",
    name: "ナイフ投げ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "hugo_starting_3",
    name: "防御システム", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "hugo_starting_4",
    name: "狩猟本能", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.INITIATION],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%92%E3%83%A5%E3%83%BC%E3%82%B4_%E7%8B%A9%E7%8C%9F%E6%9C%AC%E8%83%BD.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "他の戦闘員が強化またはスキルカード使用時、狩猟の開始1" },
      { level: 1, cost: 0, description: "他の戦闘員が強化またはスキルカード使用時、狩猟の開始1", statuses: [] },
      { level: 2, cost: 1, description: "他の戦闘員が強化またはスキルカード使用時、狩猟の開始1<wbr/>50%の確率で狩猟の開始1追加", statuses: []},
      { level: 3, cost: 1, description: "他の戦闘員が強化またはスキルカード使用時、狩猟の開始1<wbr/>狩猟の開始が発動すると対象に挟み撃ち6)50%", statuses: []},
      { level: 4, cost: 0, category: CardCategory.SKILL, description: "手札のスキル数に応じて狩猟の開始", statuses: [] },
      { level: 5, cost: 1, description: "強化またはスキルカード使用時、狩猟の開始1", statuses: []}
    ]
  },
  // Hugo's hirameki cards
  {
    id: "hugo_hirameki_1",
    name: "ナイフ投擲", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.HASTE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%92%E3%83%A5%E3%83%BC%E3%82%B4_%E3%83%8A%E3%82%A4%E3%83%95%E6%8A%95%E6%93%B2.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ランダムな敵にダメージ60%×3<wbr/>攻撃した対象の数に応じて、狩猟の開始" },
      { level: 1, cost: 1, description: "ランダムな敵にダメージ90%×3<wbr/>攻撃した対象の数に応じて、狩猟の開始"},
      { level: 2, cost: 1, description: "ダメージ90%×3<wbr/>狩猟の開始2"},
      { level: 3, cost: 1, description: "ダメージ250%<wbr/>ダメージを与えると、ランダムな味方が対象に挟み撃ち100%"},
      { level: 4, cost: 1, description: "ランダムな敵にダメージ90%×3<wbr/>狩猟の開始状態の場合、ダメージ量100%増加"},
      { level: 5, cost: 2, category: CardCategory.UPGRADE, description: "ターン開始時、ランダムな敵にダメージ60%×2<wbr/>攻撃した対象の数に応じて、狩猟の開始", statuses: [CardStatus.UNIQUE] }
    ]
  },
  {
    id: "hugo_hirameki_2",
    name: "早い解決方法", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.HASTE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%92%E3%83%A5%E3%83%BC%E3%82%B4_%E6%97%A9%E3%81%84%E8%A7%A3%E6%B1%BA%E6%96%B9%E6%B3%95.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ80%×2<wbr/>狩猟の開始状態の場合、攻撃カードを1枚ドロー" },
      { level: 1, cost: 1, description: "ダメージ120%×2<wbr/>狩猟の開始状態の場合、攻撃カードを1枚ドロー" },
      { level: 2, cost: 1, description: "ダメージ80%×2<wbr/>狩猟の開始状態の場合、ヒット数1回追加" },
      { level: 3, cost: 1, description: "ダメージ100%×2<wbr/>狩猟の開始状態の場合、ドロー2" },
      { level: 4, cost: 1, description: "ダメージ60%×3<wbr/>狩猟の開始状態の場合、敵全体の行動カウント1増加" },
      { level: 5, cost: 1, description: "ダメージ120%<wbr/>狩猟の開始最大5減少、その数に応じてヒット数1回追加" }
    ]
  },
  {
    id: "hugo_hirameki_3",
    name: "ディンゴの遠吠え", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%92%E3%83%A5%E3%83%BC%E3%82%B4_%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B4%E3%81%AE%E9%81%A0%E5%90%A0%E3%81%88.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド100%<wbr/>狩猟の開始2" },
      { level: 1, cost: 1, description: "シールド150%<wbr/>狩猟の開始3" },
      { level: 2, cost: 1, description: "シールド150%<wbr/>狩猟の開始状態の場合、シールド獲得量+50%<wbr/>狩猟の開始2" },
      { level: 3, cost: 1, description: "狩猟の開始獲得時、攻撃カードドロー1（ターンごとに1回）" },
      { level: 4, cost: 1, description: "狩猟の開始2<wbr/>連続：狩猟の開始2 追加" },
      { level: 5, cost: 1, description: "狩猟の開始2<wbr/>攻撃カードドロー2" }
    ]
  },
  {
    id: "hugo_hirameki_4",
    name: "万屋のやり方", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "狩猟の開始の追加攻撃ダメージ量40%増加" },
    ]
  },
  // Haru's starting cards
  {
    id: "haru_starting_1",
    name: "アンカー", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "haru_starting_2",
    name: "パワーアンカー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ200%" } // Fallback
    ]
  },
  {
    id: "haru_starting_3",
    name: "アンカードロップ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "haru_starting_4",
    name: "アンカーシュート", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.PULVERIZE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%8F%E3%83%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E3%82%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%88_20251204-202236.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ240%<wbr/>このカードの使用数に応じてダメージ量＋60%（最大5）" },
      { level: 1, cost: 2, description: "ダメージ320%<wbr/>このカードの使用数に応じてダメージ量＋90%（最大5）" },
      { level: 2, cost: 2, description: "ダメージ280%<wbr/>連続4)：ヒット数1回追加"},
      { level: 3, cost: 3, description: "ダメージ350%<wbr/>他の戦闘員のカードを全て破棄、その数に応じてダメージ量＋100%", statuses: [CardStatus.RETAIN, CardStatus.PULVERIZE] },
      { level: 4, cost: 2, description: "ダメージ300%<wbr/>このカードの使用数に応じてダメージ量＋60%（最大5）<wbr/>山札に、このカードを生成（各戦闘2回）" },
      { level: 5, cost: 2, description: "ダメージ300%<wbr/>このカードの使用数に応じてダメージ量＋60%（最大5）<wbr/>会心攻撃時手札に移動（各ターン1回）"}
    ]
  },
  // Haru's hirameki cards
  {
    id: "haru_hirameki_1",
    name: "アンカーポインター", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%8F%E3%83%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E3%82%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%83%9D%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC_20251204-202353.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "山札または墓地7)からアンカーシュートを手札に移動" },
      { level: 1, cost: 0, description: "全アンカーシュートに回収付与"},
      { level: 2, cost: 0, description: "山札または墓地からアンカーシュートを手札に移動、そのカードに保存付与"},
      { level: 3, cost: 0, description: "山札または墓地からアンカーシュートを手札に移動", statuses: [CardStatus.RETRIEVE]},
      { level: 4, cost: 0, description: "山札または墓地からアンカーシュートを手札に移動、そのカードのダメージが1ターンの間20%増加"},
      { level: 5, cost: 0, description: "山札または墓地からアンカーシュートを手札に移動、そのカードの会心率が1ターンの間＋25%" }
    ]
  },
  {
    id: "haru_hirameki_2",
    name: "パワーチャージ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%8F%E3%83%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E3%83%91%E3%83%AF%E3%83%BC%E3%83%81%E3%83%A3%E3%83%BC%E3%82%B8_20251204-202509.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "敵全体にダメージ180%<wbr/>単体対象の場合ダメージ量＋80%" },
      { level: 1, cost: 1, description: "敵全体にダメージ270%<wbr/>単体対象の場合ダメージ量＋120%" },
      { level: 2, cost: 1, description: "敵全体にダメージ270%", statuses: [CardStatus.WEAKNESS_ATTACK] },
      { level: 3, cost: 1, description: "敵全体にダメージ270%<wbr/>撃破：このカードをもう1回発動（最大1回）" },
      { level: 4, cost: 1, description: "敵全体にダメージ240%<wbr/>攻撃した対象の数に応じて次に使用する自分の攻撃カードのダメージ量＋30%" },
      { level: 5, cost: 1, description: "敵全体にダメージ300%<wbr/>連続：このカードコスト1に変更" }
    ]
  },
  {
    id: "haru_hirameki_3",
    name: "エネルギーチャージ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%8F%E3%83%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E3%82%A8%E3%83%8D%E3%83%AB%E3%82%AE%E3%83%BC%E3%83%81%E3%83%A3%E3%83%BC%E3%82%B8_20251204-202637.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "1ターンの間自分の攻撃カードダメージ量30%増加" },
      { level: 1, cost: 2, description: "1ターンの間自分の攻撃カードダメージ量40%増加" },
      { level: 2, cost: 2, description: "次に使用する攻撃カードのダメージ量50%増加、強靭度ダメージ1" },
      { level: 3, cost: 2, description: "1ターンの間、手札の自分の攻撃カード数に応じて自分の攻撃カードダメージ量+70%" },
      { level: 4, cost: 1, description: "1ターンの間自分の攻撃カードダメージ量30%増加<wbr/>自分のカードをドロー12)1" },
      { level: 5, cost: 3, description: "自分の攻撃カードのダメージ量20%増加", statuses: [CardStatus.UNIQUE] }
    ]
  },
  {
    id: "haru_hirameki_4",
    name: "クイックリフト", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "手札のアンカーシュート<wbr/>1ターンの間、コスト1増加<wbr/>ダメージ量70%増加" },
    ]
  },
  // kayron's starting cards
  {
    id: "kayron_starting_1",
    name: "滅", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "kayron_starting_2",
    name: "滅", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "kayron_starting_3",
    name: "救", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "kayron_starting_4",
    name: "虚無の残像", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%A4%E3%83%AD%E3%83%B3_%E8%99%9A%E7%84%A1%E3%81%AE%E6%AE%8B%E5%83%8F.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ240%<wbr/>虚無 2枚生成" },
      { level: 1, cost: 1, description: "ダメージ360%<wbr/>虚無 3枚生成"},
      { level: 2, cost: 1, description: "ダメージ240%<wbr/>虚無2枚生成<wbr/>消滅した虚無数に応じてダメージ量+20%" },
      { level: 3, cost: 1, description: "ダメージ240%<wbr/>虚無2枚生成<wbr/>そのカードに蒸発付与" },
      { level: 4, cost: "X", description: "ダメージ50%×ダメージ量+150%<wbr/>虚無X+1枚生成" },
      { level: 5, cost: 0, description: "ダメージ30%<wbr/>虚無2枚生成<wbr/>今回の戦闘中、生成した虚無数に応じてダメージ量+30%"}
    ]
  },
  // Kayron's hirameki cards
  {
    id: "kayron_hirameki_1",
    name: "消滅の烙印", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%A4%E3%83%AD%E3%83%B3_%E6%B6%88%E6%BB%85%E3%81%AE%E7%83%99%E5%8D%B0.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 3, description: "敵全体にダメージ300%<wbr/>カード消滅時、このカードは1ターンの間コスト1減少" },
      { level: 1, cost: 3, description: "敵全体にダメージ450%<wbr/>カード消滅時、このカードは1ターンの間コスト1減少"},
      { level: 2, cost: 3, description: "ランダムな敵にダメージ300%×2<wbr/>カード消滅時、このカードは1ターンの間コスト1減少"},
      { level: 3, cost: 7, description: "敵全体にダメージ500%<wbr/>消滅した虚無数に応じてコスト減少"},
      { level: 4, cost: 1, description: "敵全体にダメージ200%<wbr/>今回のターンで消滅したカード数に応じてダメージ+40%"},
      { level: 5, cost: 2, description: "敵全体にダメージ300%<wbr/>このターンに消滅したカードがある場合、敵全体に苦痛3" }
    ]
  },
  {
    id: "kayron_hirameki_2",
    name: "ブラックホール", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%A4%E3%83%AD%E3%83%B3_%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF%E3%83%9B%E3%83%BC%E3%83%AB.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ240%<wbr/>消滅した虚無数に応じてダメージ量+40%"},
      { level: 1, cost: 2, description: "ダメージ360%<wbr/>手札の虚無2枚発動"},
      { level: 2, cost: 2, description: "ダメージ360%<wbr/>消滅した虚無数に応じてダメージ量+60%" },
      { level: 3, cost: 2, description: "ランダムな敵にダメージ60%<wbr/>消滅した虚無数に応じてヒット数1回追加（最大5回）" },
      { level: 4, cost: 2, description: "ダメージ300%<wbr/>消滅した虚無5枚につき、ヒット数1回追加（最大2回）" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "	虚無消滅時、ランダムな敵に固定ダメージ100%" }
    ]
  },
  {
    id: "kayron_hirameki_3",
    name: "虚妄の誓約", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%A4%E3%83%AD%E3%83%B3_%E8%99%9A%E5%A6%84%E3%81%AE%E8%AA%93%E7%B4%84.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "虚無生成時、ダメージ、治癒80%効果を持つコスト1の攻撃カードに変更" },
      { level: 1, cost: 1, description: "虚無生成時、ダメージ、治癒120%効果を持つコスト1の攻撃カードに変更" },
      { level: 2, cost: 1, description: "虚無生成時、ダメージ、治癒80%効果を持つコスト1の攻撃カードに変更", statuses: [CardStatus.UNIQUE, CardStatus.INITIATION] },
      { level: 3, cost: 1, description: "虚無生成時、ダメージ180%効果を持つコスト1の攻撃カードに変更" },
      { level: 4, cost: 1, category: CardCategory.SKILL, description: "手札の虚無、状態異常、呪いカードがすべて消滅<wbr/>その数に応じて、ドロー", statuses: [CardStatus.EXHAUST, CardStatus.RETAIN] },
      { level: 5, cost: 1, description: "虚無カード3枚消滅時、敵全体に苦痛2" }
    ]
  },
  {
    id: "kayron_hirameki_4",
    name: "無憾の鼓動", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ240%<wbr/>虚無 3生成<wbr/>その数に応じてダメージ+40%" },
    ]
  },
  // Yuki's starting cards
  {
    id: "yuki_starting_1",
    name: "長剣斬り", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "yuki_starting_2",
    name: "高速斬り", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ200%" } // Fallback
    ]
  },
  {
    id: "yuki_starting_3",
    name: "受け流し", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "yuki_starting_4",
    name: "制圧準備", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A6%E3%82%AD_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E5%88%B6%E5%9C%A7%E6%BA%96%E5%82%99_0_20251116-215413.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "自分の攻撃カードをドロー3)1<wbr/>１ターンの間、そのカードのダメージ量20%増加" },
      { level: 1, cost: 1, description: "自分の攻撃カードドロー1<wbr/>1ターンの間、そのカードのダメージ量40%増加", statuses: [CardStatus.RETAIN]},
      { level: 2, cost: 1, description: "自分の攻撃カードドロー1<wbr/>1ターンの間、自分の攻撃カードのダメージ量20%増加" },
      { level: 3, cost: 0, description: "自分の攻撃カードドロー2<wbr/>1ターンの間、そのカードのダメージ量20% 減少"},
      { level: 4, cost: 2, description: "自分の攻撃カードドロー1<wbr/>1ターンの間、そのカードのダメージ量20%増加<wbr/>インスピレーション：自分の攻撃カードドロー1" },
      { level: 5, cost: 2, description: "自分の攻撃カードドロー1<wbr/>次のターンの開始時、自分の攻撃カードドロー1"}
    ]
  },
  // Yuki's hirameki cards
  {
    id: "yuki_hirameki_1",
    name: "盗み斬り", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A6%E3%82%AD_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E7%9B%97%E3%81%BF%E6%96%AC%E3%82%8A_0_20251116-220417.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "敵全体ダメージ180%<wbr/>インスピレーション：コスト1減少" },
      { level: 1, cost: 2, description: "敵全体ダメージ270%<wbr/>インスピレーション：コスト1減少"},
      { level: 2, cost: 2, description: "敵全体ダメージ180%<wbr/>インスピレーション：コスト2減少"},
      { level: 3, cost: 2, description: "敵全体ダメージ180%<wbr/>インスピレーション：ヒット数1回増加"},
      { level: 4, cost: 2, description: "ダメージ320%<wbr/>1ターンの間、ドローした自分のカード数に応じて、ダメージ量+60%(最大3)", statuses: [CardStatus.RETAIN] },
      { level: 5, cost: 3, description: "敵全体ダメージ300%<wbr/>このカードの使用時、コスト1減少" }
    ]
  },
  {
    id: "yuki_hirameki_2",
    name: "騙し討ち", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.RETAIN],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A6%E3%82%AD_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E9%A8%99%E3%81%97%E8%A8%8E%E3%81%A1_0_20251116-221044.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ150%<wbr/>手札のランダムな自分のカード1枚のインスピレーション効果有効化"},
      { level: 1, cost: 1, description: "ダメージ180%<wbr/>手札の自分のカード1枚選択、インスピレーション効果有効化"},
      { level: 2, cost: 1, description: "ダメージ180%<wbr/>手札のランダムな自分のカード1枚のインスピレーション効果有効化", statuses: [CardStatus.RETAIN, CardStatus.RETRIEVE] },
      { level: 3, cost: 1, category: CardCategory.SKILL, description: "手札の自分のカードすべてのインスピレーション効果を有効化", statuses: [] },
      { level: 4, cost: 1, description: "ダメージ150%<wbr/>インスピレーション効果を持つカードをドロー1", statuses: [] },
      { level: 5, cost: 1, description: "ダメージ260%<wbr/>インスピレーション：コスト1減少", statuses: [] }
    ]
  },
  {
    id: "yuki_hirameki_3",
    name: "氷の刃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%A6%E3%82%AD_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E6%B0%B7%E3%81%AE%E5%88%83_0_20251116-221549.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "自分のインスピレーション効果が有効化したカードを使用したとき、敵全体にダメージ60%" },
      { level: 1, cost: 1, description: "自分のインスピレーション効果が有効化したカードを使用したとき、敵全体にダメージ90%" },
      { level: 2, cost: 0, description: "自分のインスピレーション効果が有効化したカードを使用したとき、敵全体にダメージ60%", statuses: [CardStatus.UNIQUE, CardStatus.INITIATION] },
      { level: 3, cost: 1, description: "自分のインスピレーション効果が有効化したカードを使用したとき、ランダムな敵にダメージ130%" },
      { level: 4, cost: 1, description: "自分のすべての攻撃カードのダメージ量30%増加" },
      { level: 5, cost: 1, description: "ターン開始時、手札のランダムなカード1枚のインスピレーション効果を有効化" }
    ]
  },
  {
    id: "yuki_hirameki_4",
    name: "氷山斬り", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "敵全体ダメージ180%<wbr/>インスピレーション：ヒット数1回追加、ダメージ量20%減少" },
    ]
  },
  // Chizuru's starting cards
  {
    id: "chizuru_starting_1",
    name: "真月", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "chizuru_starting_2",
    name: "真月", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "chizuru_starting_3",
    name: "霊魂の保護", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "chizuru_starting_4",
    name: "業火", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.INITIATION],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%81%E3%82%BA%E3%83%AB_%E3%82%AB%E3%83%BC%E3%83%89_%E6%A5%AD%E7%81%AB_20251202-194357.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ100%<wbr/>呪縛術6)1<wbr/>呪縛術：ヒット数1回追加" },
      { level: 1, cost: 1, description: "ダメージ150%<wbr/>呪縛術1<wbr/>呪縛術：ヒット数1回追加"},
      { level: 2, cost: 1, description: "ダメージ150%<wbr/>呪縛術1<wbr/>呪縛術：次に使用する自分のカードのコスト1減少" },
      { level: 3, cost: 1, description: "ダメージ180%<wbr/>呪縛術1<wbr/>呪縛術：ダメージ量100%増加"},
      { level: 4, cost: 2, category: CardCategory.SKILL, description: "呪縛術1<wbr/>月影1枚生成" },
      { level: 5, cost: 1, category: CardCategory.SKILL, description: "呪縛術1<wbr/>呪縛術状態の対象を撃破した時、このカードを生成", statuses: [CardStatus.INITIATION, CardStatus.EXHAUST]}
    ]
  },
  // Chizuru's hirameki cards
  {
    id: "chizuru_hirameki_1",
    name: "月読", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%81%E3%82%BA%E3%83%AB_%E3%82%AB%E3%83%BC%E3%83%89_%E6%9C%88%E8%AA%AD_20251202-195205.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "次に使用する自分の攻撃カードのヒット数に応じて鬼火2" },
      { level: 1, cost: 0, description: "次に使用する自分の攻撃カードのヒット数に応じて鬼火3"},
      { level: 2, cost: 0, description: "次に使用する自分の攻撃カードのヒット数1回追加、ヒット数にに応じて鬼火1"},
      { level: 3, cost: 0, description: "次に使用する月影、月影+のヒット数2回追加"},
      { level: 4, cost: 0, description: "手札の自分の攻撃カード数に応じて、鬼火 3"},
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "自分の攻撃カード使用時、鬼火 2", statuses: [CardStatus.UNIQUE, CardStatus.LEAD] }
    ]
  },
  {
    id: "chizuru_hirameki_2",
    name: "黄昏の結束", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE, CardStatus.INITIATION],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%81%E3%82%BA%E3%83%AB_%E3%82%AB%E3%83%BC%E3%83%89_%E9%BB%84%E6%98%8F%E3%81%AE%E7%B5%90%E6%9D%9F_20251202-195538.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ターン開始時、拘束を獲得<wbr/>ランダムな他の戦闘員のカード1枚、使用時までコスト1減少"},
      { level: 1, cost: 2, description: "ターン開始時、拘束を獲得<wbr/>ランダムなカード2枚使用時までコスト1減少"},
      { level: 2, cost: 2, description: "ターン開始時、拘束を獲得<wbr/>月影+使用時、次に使用するカード1枚使用時までコスト1減少" },
      { level: 3, cost: 2, description: "ターン開始時、拘束を獲得<wbr/>ランダムな他の戦闘員のカード2枚発動" },
      { level: 4, cost: 2, description: "ターン開始時、拘束を獲得<wbr/>ランダムな主導カード2枚発動" },
      { level: 5, cost: 2, description: "ターン開始時、拘束を獲得<wbr/>コストが最も高いカードのコスト2減少" }
    ]
  },
  {
    id: "chizuru_hirameki_3",
    name: "鬼狩り", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.HASTE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%81%E3%82%BA%E3%83%AB_%E3%82%AB%E3%83%BC%E3%83%89_%E9%AC%BC%E7%8B%A9%E3%82%8A_20251202-202014.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ60%×3<wbr/>次に使用する結束カードのダメージ量+30%" },
      { level: 1, cost: 1, description: "ダメージ50%×4<wbr/>次に使用する結束カードのダメージ量+40%" },
      { level: 2, cost: 1, description: "ダメージ180%<wbr/>次に使用する結束カードのダメージ量+60%" },
      { level: 3, cost: 1, description: "ダメージ60%×3<wbr/>手札に他のカードがない場合、ヒット数2回追加" },
      { level: 4, cost: 1, category: CardCategory.SKILL, description: "真月2枚生成<wbr/>そのカードに消滅付与<wbr/>使用時までコスト1減少" },
      { level: 5, cost: 1, description: "月影+のダメージ+40%<wbr/>ターン開始時、鬼火3", statuses: [CardStatus.UNIQUE] }
    ]
  },
  {
    id: "chizuru_hirameki_4",
    name: "月影", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.BIND, CardStatus.RETAIN],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ50%<wbr/>結束の重複数に応じてダメージ量+20%" },
    ]
  },
  // Nia's starting cards
  {
    id: "nia_starting_1",
    name: "ストローク", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "nia_starting_2",
    name: "アンプセラピー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "nia_starting_3",
    name: "アンプセラピー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "nia_starting_4",
    name: "Gコード", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "デシベル1<wbr/>山札の一番上のカードを1枚発動" },
      { level: 1, cost: 1, description: "デシベル1<wbr/>山札の一番上のカードを3枚確認、1枚選択し発動"},
      { level: 2, cost: 1, description: "デシベル1<wbr/>山札の一番上のカードを1枚発動<wbr/>そのカードのコストに応じてデシベル" },
      { level: 3, cost: 1, description: "デシベル1<wbr/>山札の一番上のカードを所有中の戦闘員が、ランダムな敵に追加攻撃6)120%<wbr/>そのカードが発動" },
      { level: 4, cost: 1, description: "デシベル2<wbr/>山札の一番上のカードを3枚破棄" },
      { level: 5, cost: 2, description: "山札の一番上のカードを1枚発動<wbr/>デシベル状態ならデシベル1減少、1枚追加で発動"}
    ]
  },
  // Nia's hirameki cards
  {
    id: "nia_hirameki_1",
    name: "アクセントミュート", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%8B%E3%82%A2_%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E3%83%9F%E3%83%A5%E3%83%BC%E3%83%88.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "コストが最も高いカードを1枚破棄<wbr/>そのカードを所有中の戦闘員はランダムな敵に追加攻撃150%" },
      { level: 1, cost: 1, description: "ランダムなカードを1枚破棄<wbr/>そのカードを所有中の戦闘員はランダムな敵に追加攻撃250%"},
      { level: 2, cost: 1, description: "破棄1<wbr/>そのカードを所有中の戦闘員はランダムな敵に追加攻撃200%"},
      { level: 3, cost: 1, description: "治癒150%<wbr/>コストが最も低いカードを1枚発動"},
      { level: 4, cost: 2, category: CardCategory.UPGRADE, description: "ターン開始時、破棄1<wbr/>そのカードを所有中の戦闘員はランダムな敵に追加攻撃150%"},
      { level: 5, cost: 1, description: "	コストが最も高いカードを全て破棄<wbr/>そのカードを所有中の戦闘員はランダムな敵に追加攻撃100%" }
    ]
  },
  {
    id: "nia_hirameki_2",
    name: "ソウルリーフ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%8B%E3%82%A2_%E3%82%BD%E3%82%A6%E3%83%AB%E3%83%AA%E3%83%BC%E3%83%95.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "治癒120%<wbr/>1ターンの間カードを破棄したときデシベル1"},
      { level: 1, cost: 2, description: "治癒150%<wbr/>デシベル2<wbr/>破棄されるときにも発動", statuses: []},
      { level: 2, cost: 2, description: "治癒120%<wbr/>1ターンの間、手札のカードを破棄した時、治癒100%、デシベル1" },
      { level: 3, cost: 2, description: "1ターンの間、手札のカードを破棄した時、そのカードを所有中の戦闘員はランダムな敵に追加攻撃100%" },
      { level: 4, cost: 2, description: "治癒200%<wbr/>次に発動するデシベルの効果が1回追加で発動", statuses: [] },
      { level: 5, cost: 2, category: CardCategory.UPGRADE, description: "カードの破棄時、デシベル1", statuses: [] }
    ]
  },
  {
    id: "nia_hirameki_3",
    name: "アダジオ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%8B%E3%82%A2_%E3%82%A2%E3%83%80%E3%82%B8%E3%82%AA.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "ドロー1<wbr/>破棄1<wbr/>この効果で破棄されたカードを山札の上に移動" },
      { level: 1, cost: 0, description: "ドロー2<wbr/>破棄2<wbr/>この効果で破棄されたカードを山札の上に移動" },
      { level: 2, cost: 0, description: "ドロー1<wbr/>1枚まで破棄<wbr/>破棄した場合、消滅が付与されたアダジオ1枚を生成" },
      { level: 3, cost: 1, description: "ドロー1<wbr/>そのカードのコストに応じて、デシベル1<wbr/>破棄1<wbr/>そのカードのコストに応じて、治癒100%" },
      { level: 4, cost: 3, description: "山札の一番上のカードを2枚破棄<wbr/>ドロー2<wbr/>保持しているデシベルの数に応じて、コスト1減少" },
      { level: 5, cost: 0, description: "破棄1<wbr/>そのカードを所有した戦闘員カードを2枚ドロー" }
    ]
  },
  {
    id: "nia_hirameki_4",
    name: "ニアの好奇心", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "山札のランダムなカード3枚を確認<wbr/>1枚選択してドロー<wbr/>残りは破棄" },
    ]
  },
  // Selena's starting cards
  {
    id: "selena_starting_1",
    name: "交戦射撃", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "selena_starting_2",
    name: "交戦射撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "selena_starting_3",
    name: "緊急遮蔽", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "selena_starting_4",
    name: "高倍率照準器", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%BB%E3%83%AC%E3%83%BC%E3%83%8A_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E9%AB%98%E5%80%8D%E7%8E%87%E7%85%A7%E6%BA%96%E5%99%A8_0_20251121-182953.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "標識2" },
      { level: 1, cost: 1, description: "標識2<wbr/>対象が攻撃行動予告状態の場合、標識2追加"},
      { level: 2, cost: 1, category: CardCategory.UPGRADE, description: "自分の攻撃カード使用時、対象に標識1" },
      { level: 3, cost: 1, description: "標識2<wbr/>1ターンの間、標識ダメージ量+50%" },
      { level: 4, cost: 0, description: "1ターンの間、他の戦闘員の攻撃カード使用時、対象に挟み撃ち100%" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "ターン開始時、敵全体に標識1"}
    ]
  },
  // Selena's hirameki cards
  {
    id: "selena_hirameki_1",
    name: "目標捕捉", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%BB%E3%83%AC%E3%83%BC%E3%83%8A_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E7%9B%AE%E6%A8%99%E8%A3%9C%E8%B6%B3_0_20251121-201524.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ150%<wbr/>感応：ランダムな敵に標識1" },
      { level: 1, cost: 1, description: "ダメージ100%<wbr/>感応：ランダムな敵にダメージ200%"},
      { level: 2, cost: 1, description: "ダメージ150%<wbr/>標識2<wbr/>対象が標識状態の場合、標識2追加"},
      { level: 3, cost: 1, category: CardCategory.SKILL, description: "シールド150%<wbr/>敵全体標識2"},
      { level: 4, cost: 1, category: CardCategory.SKILL, description: "シールド150%<wbr/>感応：ドロー1"},
      { level: 5, cost: 1, description: "大破時、対象に挟み撃ち200%" }
    ]
  },
  {
    id: "selena_hirameki_2",
    name: "ドローン爆撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%BB%E3%83%AC%E3%83%BC%E3%83%8A_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E3%83%89%E3%83%AD%E3%83%BC%E3%83%B3%E7%88%86%E6%92%83_0_20251121-201927.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "敵全体にダメージ120%、情熱弱点1"},
      { level: 1, cost: 1, description: "敵全体にダメージ120%、情熱弱点2"},
      { level: 2, cost: 1, description: "敵全体にダメージ120%<wbr/>連続：敵全体に標識2" },
      { level: 3, cost: 0, description: "敵全体にダメージ120%<wbr/>今回のターンで使用した情熱攻撃カード数に応じて、ダメージ量+40%" },
      { level: 4, cost: 1, category: CardCategory.SKILL, description: "1ターンの間、弱点攻撃時、対象に挟み撃ち100%" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "情熱攻撃カード使用時、対象に挟み撃ち50%" }
    ]
  },
  {
    id: "selena_hirameki_3",
    name: "戦術機動", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%BB%E3%83%AC%E3%83%BC%E3%83%8A_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%88%A6%E8%A1%93%E8%B5%B7%E5%8B%95_0_20251121-202059.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド150%<wbr/>強靭度12)ダメージ2" },
      { level: 1, cost: 1, description: "シールド225%<wbr/>強靭度ダメージ3" },
      { level: 2, cost: 1, category: CardCategory.ATTACK, description: "ダメージ150%<wbr/>このカードの強靭度ダメージ150%増加" },
      { level: 3, cost: 1, description: "シールド225%<wbr/>強靭度ダメージ2<wbr/>大破状態の敵標識2" },
      { level: 4, cost: 1, description: "大破状態の場合、強靭度再チャージ", statuses: [CardStatus.RETAIN] },
      { level: 5, cost: 1, description: "敵全体に強靭度ダメージ1、標識1" }
    ]
  },
  {
    id: "selena_hirameki_4",
    name: "狙撃手の領域", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "標識ダメージ量+40%" },
    ]
  },
  // Tressa's starting cards
  {
    id: "tressa_starting_1",
    name: "短剣投てき", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "tressa_starting_2",
    name: "短剣投てき", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "tressa_starting_3",
    name: "闇の手招き", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "tressa_starting_4",
    name: "短剣抜刀", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%88%E3%83%AC%E3%82%B5_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E7%9F%AD%E5%89%A3%E6%8A%9C%E5%88%80_0_20251121-185045.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "影の短剣を2枚生成" },
      { level: 1, cost: 0, description: "影の短剣を2枚生成"},
      { level: 2, cost: 1, description: "影の短剣を3枚生成" },
      { level: 3, cost: 1, category: CardCategory.UPGRADE, description: "影の短剣を1枚生成<wbr/>ターン開始時、影の短剣を1枚生成" },
      { level: 4, cost: 1, description: "影の短剣を2枚生成<wbr/>生成された影の短剣の苦痛付与効果が3増加" },
      { level: 5, cost: 1, description: "影の短剣を4枚生成", statuses: [CardStatus.EXHAUST] }
    ]
  },
  // Tressa's hirameki cards
  {
    id: "tressa_hirameki_1",
    name: "呪い付与", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%88%E3%83%AC%E3%82%B5_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E5%91%AA%E3%81%84%E4%BB%98%E4%B8%8E_0_20251121-190751.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "1ターンの間、攻撃カード使用時、対象に苦痛1" },
      { level: 1, cost: 0, description: "1ターンの間、カード使用時、ランダムな敵に苦痛1"},
      { level: 2, cost: 0, description: "2ターンの間、攻撃カード使用時、対象に苦痛1"},
      { level: 3, cost: 1, description: "ランダムな敵に、苦痛4×2", statuses: [CardStatus.LEAD] },
      { level: 4, cost: 1, description: "敵全体苦痛2<wbr/>ターン開始時、敵全体に、苦痛2", statuses: [CardStatus.INITIATION] },
      { level: 5, cost: 2, description: "カードで苦痛付与時、対象に苦痛1追加" }
    ]
  },
  {
    id: "tressa_hirameki_2",
    name: "影装填", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%88%E3%83%AC%E3%82%B5_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E5%BD%B1%E8%A3%85%E5%A1%AB_0_20251121-191754.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "治癒100%<wbr/>上級影の短剣1枚生成"},
      { level: 1, cost: 2, category: CardCategory.ATTACK, description: "敵全体にダメージ80%<wbr/>苦痛2<wbr/>手札の影の短剣を全て消滅、その数に応じて繰り返す", statuses: [CardStatus.RETAIN]},
      { level: 2, cost: 2, description: "治癒100%<wbr/>上級影の短剣2枚生成" },
      { level: 3, cost: 2, description: "治癒100%xX<wbr/>影の短剣X枚生成" },
      { level: 4, cost: 2, category: CardCategory.UPGRADE, description: "スキルカードで治癒時、影の短剣を1枚生成", statuses: [CardStatus.INITIATION] },
      { level: 5, cost: 2, description: "カードを全て破棄<wbr/>その数に応じて、影の短剣を生成", statuses: [CardStatus.EXHAUST] }
    ]
  },
  {
    id: "tressa_hirameki_3",
    name: "急所攻撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%88%E3%83%AC%E3%82%B5_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%80%A5%E6%89%80%E6%94%BB%E6%92%83_0_20251121-193931.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ80%×3<wbr/>対象が苦痛状態の場合、ダメージ量+50%", statuses: [CardStatus.LEAD] },
      { level: 1, cost: 2, description: "ダメージ150%×3" },
      { level: 2, cost: 2, description: "ダメージ120%×3<wbr/>対象が苦痛状態の場合、ダメージ量+70%" },
      { level: 3, cost: 2, description: "ダメージ80%×3<wbr/>1ターンの間、苦痛ダメージ量+50%" },
      { level: 4, cost: 2, description: "ダメージ200%×2<wbr/>対象の苦痛3 以上の場合、1回さらに発動" },
      { level: 5, cost: 2, description: "ダメージ150%×3<wbr/>対象の苦痛数に応じて、ダメージ量+10%" }
    ]
  },
  {
    id: "tressa_hirameki_4",
    name: "呪い切り落とし", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "苦痛刻印2<wbr/>弱体化2" },
    ]
  },
  // Amir's starting cards
  {
    id: "amir_starting_1",
    name: "レイピア", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "防御依存ダメージ100%" } // Fallback
    ]
  },
  {
    id: "amir_starting_2",
    name: "レイピア", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "防御依存ダメージ100%" } // Fallback
    ]
  },
  {
    id: "amir_starting_3",
    name: "鋼のバリア", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "amir_starting_4",
    name: "ホバリングメタル", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%A2%E3%83%9F%E3%83%BC%E3%83%AB_%E3%83%9B%E3%83%90%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%A1%E3%82%BF%E3%83%AB.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ減少3<wbr/>金属化2" },
      { level: 1, cost: 1, description: "ダメージ減少3<wbr/>金属化4"},
      { level: 2, cost: 1, description: "ダメージ減少2<wbr/>金属化2<wbr/>反撃2" },
      { level: 3, cost: 2, description: "ダメージ減少3<wbr/>金属化3", statuses: [CardStatus.CELESTIAL]},
      { level: 4, cost: 1, description: "ダメージ減少3<wbr/>金属化5", statuses: [CardStatus.EXHAUST] },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "金属化2<wbr/>ターン開始時、金属化1"}
    ]
  },
  // Amir's hirameki cards
  {
    id: "amir_hirameki_1",
    name: "メタルピアス", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "防御依存ダメージ90%×2<wbr/>金属化状態の場合、金属化1減少、脆弱2" },
      { level: 1, cost: 1, description: "防御依存ダメージ110%×2<wbr/>金属化状態の場合、金属化1減少、ヒット数1回追加、脆弱2"},
      { level: 2, cost: 1, description: "防御依存ダメージ200%<wbr/>金属化、最大2減少、その数に応じてダメージ量+150%"},
      { level: 3, cost: 1, description: "防御依存ダメージ90%×2<wbr/>脆弱1<wbr/>金属化2"},
      { level: 4, cost: 2, description: "防御依存ダメージ110%×2<wbr/>脆弱1<wbr/>回復時、1ターンの間、コスト1減少"},
      { level: 5, cost: 1, description: "防御依存ダメージ110%×2<wbr/>金属化状態の場合、金属化1減少、脆弱2、弱体化2" }
    ]
  },
  {
    id: "amir_hirameki_2",
    name: "金属抽出", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%A2%E3%83%9F%E3%83%BC%E3%83%AB_%E9%87%91%E5%B1%9E%E6%8A%BD%E5%87%BA.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "金属化2<wbr/>1ターンの間、決意1"},
      { level: 1, cost: 1, description: "金属化2<wbr/>1ターンの間、スキルカードのシールド獲得量30%増加"},
      { level: 2, cost: 1, description: "金属化3<wbr/>1ターンの間、決意3" },
      { level: 3, cost: 1, description: "金属化2<wbr/>1ターンの間、スキルカード使用時、金属化1（最大2回）" },
      { level: 4, cost: 2, description: "金属化2<wbr/>1ターンの間、決意3", statuses: [CardStatus.CELESTIAL] },
      { level: 5, cost: 1, description: "金属化3<wbr/>1ターンの間、金属化のダメージ量+30%" }
    ]
  },
  {
    id: "amir_hirameki_3",
    name: "鋼鉄の嵐", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%A2%E3%83%9F%E3%83%BC%E3%83%AB_%E9%8B%BC%E9%89%84%E3%81%AE%E5%B5%90.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "敵全体に防御依存ダメージ200%<wbr/>1ターンの間、金属化の対象が敵全体に適用、ダメージ量+20%" },
      { level: 1, cost: 2, description: "敵全体に防御依存ダメージ200%<wbr/>1ターンの間、金属化の対象が敵全体に適用、ダメージ量+60%" },
      { level: 2, cost: 2, description: "敵全体に防御依存ダメージ200%<wbr/>1ターンの間、金属化効果のヒット数1回追加、ダメージ量+50%" },
      { level: 3, cost: 2, category: CardCategory.UPGRADE, description: "敵全体に防御依存ダメージ200%<wbr/>ターン終了時、金属化最大2減少、その数に応じて敵全体防御依存ダメージ120%" },
      { level: 4, cost: 2, description: "敵全体に防御依存ダメージ80%×4<wbr/>1ターンの間、金属化の対象が敵全体に適用、ダメージ量+20%" },
      { level: 5, cost: 2, description: "敵全体に防御依存ダメージ100%×3<wbr/>金属化、最大2減少、その数に応じてヒット数1回追加" }
    ]
  },
  {
    id: "amir_hirameki_4",
    name: "アイアンスキン", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST, CardStatus.FINALE],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "1ターンの間、受けるダメージ量20%減少<wbr/>金属化5)最大4減少<wbr/>その数に応じてダメージ量20%追加減少" },
    ]
  },
  // Lucas's starting cards
  {
    id: "lucas_starting_1",
    name: "マシンガン", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "lucas_starting_2",
    name: "マシンガン", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "lucas_starting_3",
    name: "防護焼夷弾", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "lucas_starting_4",
    name: "大容量マガジン", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.LEAD],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AB%E3%82%B9_%E5%A4%A7%E5%AE%B9%E9%87%8F%E3%83%9E%E3%82%AC%E3%82%B8%E3%83%B3.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ターン開始時、ランチャー弾丸1枚生成" },
      { level: 1, cost: 0, description: "ターン開始時、ランチャー弾丸1枚生成", statuses: [CardStatus.INITIATION] },
      { level: 2, cost: 1, description: "ターン開始時、ランチャー弾丸2枚生成" },
      { level: 3, cost: 1, description: "ターン開始時、ランチャー弾丸1枚生成、50%の確率で1ターンの間、そのカードのコスト1減少"},
      { level: 4, cost: 1, description: "ターン開始時、ランチャー弾丸1枚生成<wbr/>50%の確率でドロー1" },
      { level: 5, cost: 1, description: "ランチャー弾丸5枚生成", statuses: [CardStatus.EXHAUST]}
    ]
  },
  // Lucas's hirameki cards
  {
    id: "lucas_hirameki_1",
    name: "S.S.S", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AB%E3%82%B9_s.s.s.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ100%<wbr/>1ターンの間、弾丸カードのダメージ量+40%" },
      { level: 1, cost: 1, description: "ダメージ200%<wbr/>1ターンの間、弾丸カードのダメージ量+40%"},
      { level: 2, cost: 1, category: CardCategory.SKILL, description: "2ターンの間、弾丸カードのダメージ量+40%"},
      { level: 3, cost: 1, description: "ダメージ150%<wbr/>手札の弾丸カード数に応じてダメージ量+60%"},
      { level: 4, cost: 1, description: "ダメージ150%<wbr/>次に使用する弾丸カードのダメージ量+120%"},
      { level: 5, cost: 1, description: "ダメージ100%<wbr/>1ターンの間弾丸カード使用時、ランダムな敵に固定ダメージ50%" }
    ]
  },
  {
    id: "lucas_hirameki_2",
    name: "フラメンヴェルファー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AB%E3%82%B9_%E3%83%95%E3%83%A9%E3%83%A1%E3%83%B3%E3%83%B4%E3%82%A7%E3%83%AB%E3%83%95%E3%82%A1%E3%83%BC.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "敵全体にダメージ180%<wbr/>ドロー1<wbr/>破棄1"},
      { level: 1, cost: 2, description: "敵全体にダメージ180%<wbr/>ドロー1<wbr/>破棄2<wbr/>破棄した数に応じて、ランチャー弾丸生成"},
      { level: 2, cost: 2, description: "敵全体にダメージ315%<wbr/>ドロー1<wbr/>破棄1" },
      { level: 3, cost: 2, description: "敵全体にダメージ270%<wbr/>会心攻撃時、敵全体にダメージ150%" },
      { level: 4, cost: 2, description: "手札の弾丸カードを2枚まで消滅<wbr/>敵全体にダメージ270%<wbr/>消滅したカード数に応じて、ダメージ量+50%増加" },
      { level: 5, cost: 2, description: "敵全体にダメージ270%<wbr/>攻撃した対象の数に応じて、ランチャー弾丸生成" }
    ]
  },
  {
    id: "lucas_hirameki_3",
    name: "閃光弾", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AB%E3%83%BC%E3%82%AB%E3%82%B9_%E9%96%83%E5%85%89%E5%BC%BE.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "敵全体にダメージ120%<wbr/>弱体化2<wbr/>対象がシールド保持中の場合、ダメージ量+50%" },
      { level: 1, cost: 1, description: "敵全体にダメージ180%<wbr/>弱体化2<wbr/>対象がシールド保持中の場合、ダメージ量+75%" },
      { level: 2, cost: 1, category: CardCategory.SKILL, description: "1ターンの間、シールドを保持中の対象をヒット時、ダメージ量+50%" },
      { level: 3, cost: 1, description: "敵全体にダメージ180%<wbr/>情熱弱点2", statuses: [CardStatus.RETAIN] },
      { level: 4, cost: 1, description: "敵全体にダメージ180%<wbr/>標識2<wbr/>対象がシールド保持中の場合、ダメージ量+50%" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "シールドを保持中の対象をヒット時、ダメージ量30%増加" }
    ]
  },
  {
    id: "lucas_hirameki_4",
    name: "RPG-7", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "弾丸2)カード消滅(このカードは使用後、消滅済みカードに移動))時、敵全体固定ダメージ3)40%" },
    ]
  },
  // Maribell's starting cards
  {
    id: "maribell_starting_1",
    name: "シェルターキック", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "防御依存ダメージ100%" } // Fallback
    ]
  },
  {
    id: "maribell_starting_2",
    name: "シェルターディフェンス", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "maribell_starting_3",
    name: "シェルターホールド", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド200%" } // Fallback
    ]
  },
  {
    id: "maribell_starting_4",
    name: "猪突猛進", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.PULVERIZE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%83%AA%E3%83%99%E3%83%AB_%E7%8C%AA%E7%AA%81%E7%8C%9B%E9%80%B2.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "防御依存ダメージ100%<wbr/>反撃1" },
      { level: 1, cost: 1, description: "防御依存ダメージ150%<wbr/>ダメージを与えると反撃1追加"},
      { level: 2, cost: 1, description: "防御依存ダメージ100%<wbr/>反撃2" },
      { level: 3, cost: 2, description: "敵全体に防御依存ダメージ150%<wbr/>ダメージを与えた対象に応じて反撃獲得" },
      { level: 4, cost: 1, description: "防御依存ダメージ150%<wbr/>所持中のシールドの30%分ダメージ量増加" },
      { level: 5, cost: 2, category: CardCategory.UPGRADE, description: "ターン終了時、反撃1、ランダムな敵に防御依存ダメージ150%", statuses: [] }
    ]
  },
  // Maribell's hirameki cards
  {
    id: "maribell_hirameki_1",
    name: "マリベルシェルターMK.Ⅱ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.PULVERIZE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%83%AA%E3%83%99%E3%83%AB_%E3%83%9E%E3%83%AA%E3%83%99%E3%83%AB%E3%82%B7%E3%82%A7%E3%83%AB%E3%82%BF%E3%83%BCmk.%E2%85%B1.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "防御依存ダメージ100%<wbr/>与ダメージ分、固定シールドを獲得（最大HPの20%をこえることはできない）" },
      { level: 1, cost: 1, description: "敵全体に防御依存ダメージ100%<wbr/>与ダメージ分、固定シールドを獲得（最大HPの20%をこえることはできない"},
      { level: 2, cost: 1, description: "防御依存ダメージ150%<wbr/>与ダメージ分、固定シールドを獲得（最大HPの20%をこえることはできない）"},
      { level: 3, cost: 2, description: "防御依存ダメージ280%<wbr/>与ダメージ分、固定シールドを獲得（最大HPの20%をこえることはできない）"},
      { level: 4, cost: 2, description: "防御依存ダメージ150%<wbr/>自分の反撃数に応じてダメージ量+50%"},
      { level: 5, cost: 0, description: "防御依存ダメージ100%<wbr/>与ダメージ分、固定シールドを獲得（最大HPの20%をこえることはできない）", statuses: [CardStatus.EXHAUST] }
    ]
  },
  {
    id: "maribell_hirameki_2",
    name: "ウルブスドーム", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%83%AA%E3%83%99%E3%83%AB_%E3%82%A6%E3%83%AB%E3%83%96%E3%82%B9%E3%83%89%E3%83%BC%E3%83%A0.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "反撃2<wbr/>ターン開始時、反撃1" },
      { level: 1, cost: 0, description: "反撃2<wbr/>ターン開始時、反撃1", statuses: [CardStatus.INITIATION]},
      { level: 2, cost: 1, description: "反撃2<wbr/>ターン開始時、反撃1、固定シールド50%" },
      { level: 3, cost: 1, description: "反撃2<wbr/>ターン開始時、反撃2" },
      { level: 4, cost: 0, category: CardCategory.SKILL, description: "反撃2<wbr/>1ターンの間、決意2" },
      { level: 5, cost: 2, description: "ターン開始時、反撃2、自分の反撃ダメージ量+20%", statuses: [CardStatus.LEAD] }
    ]
  },
  {
    id: "maribell_hirameki_3",
    name: "あーそうなんだ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9E%E3%83%AA%E3%83%99%E3%83%AB_%E3%81%82%E3%83%BC%E3%81%9D%E3%81%86%E3%81%AA%E3%82%93%E3%81%A0.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド100%<wbr/>反撃1<wbr/>敵全体弱体化1" },
      { level: 1, cost: 1, description: "シールド150%<wbr/>反撃1<wbr/>敵全体弱体化2" },
      { level: 2, cost: 1, description: "シールド150%<wbr/>反撃2" },
      { level: 3, cost: 1, description: "反撃2<wbr/>敵全体弱体化2" },
      { level: 4, cost: 1, category: CardCategory.UPGRADE, description: "ターン終了時、HPが最も低い敵に所持中のシールドの50%分固定ダメージ" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "ターン開始時、自分の反撃数に応じて固定シールド25%", statuses: [CardStatus.UNIQUE] }
    ]
  },
  {
    id: "maribell_hirameki_4",
    name: "シェルターストライク", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.PULVERIZE],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "保有しているシールドに応じて固定ダメージ" },
    ]
  },
  // Mika's starting cards
  {
    id: "mika_starting_1",
    name: "水の矢", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "mika_starting_2",
    name: "水のバリア", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "mika_starting_3",
    name: "水のバリア", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "mika_starting_4",
    name: "水の根源", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9F%E3%82%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%B0%B4%E3%81%AE%E6%A0%B9%E6%BA%90_0_20251124-124458.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "治癒100%<wbr/>アクションポイント1獲得" },
      { level: 1, cost: 0, description: "治癒150%<wbr/>アクションポイント1獲得<wbr/>波1"},
      { level: 2, cost: 1, description: "	治癒150%<wbr/>アクションポイント2獲得<wbr/>回復時、1ターンの間、コスト1減少" },
      { level: 3, cost: 0, description: "治癒150%<wbr/>アクションポイント1獲得<wbr/>次に使用するカードの治癒量50%増加", statuses: [CardStatus.RETAIN]},
      { level: 4, cost: 0, description: "治癒150%<wbr/>アクションポイント1獲得<wbr/>味方のストレス2減少" },
      { level: 5, cost: 0, description: "治癒100%<wbr/>アクションポイント3獲得", statuses: [CardStatus.EXHAUST]}
    ]
  },
  // Mika's hirameki cards
  {
    id: "mika_hirameki_1",
    name: "波の加護", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.RETAIN],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9F%E3%82%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%B3%A2%E3%81%AE%E5%8A%A0%E8%AD%B7_0_20251124-125708.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "治癒100%<wbr/>アクションポイント数に応じて、治癒量30%増加" },
      { level: 1, cost: 1, description: "治癒150%<wbr/>アクションポイント数に応じて、治癒量30%増加<wbr/>超過した治癒量分シールド獲得"},
      { level: 2, cost: 1, description: "治癒150%<wbr/>アクションポイント数に応じて、治癒量30%増加<wbr/>波1"},
      { level: 3, cost: 1, description: "治癒150%<wbr/>アクションポイント数に応じて、次に使用するカードの治癒量20%増加"},
      { level: 4, cost: 1, description: "治癒150%<wbr/>治癒量に応じてランダムな敵にダメージ"},
      { level: 5, cost: 0, description: "治癒50%<wbr/>今回のターンで使用したアクションポイント数に応じて、治癒量+50%", statuses: [CardStatus.FINALE] }
    ]
  },
  {
    id: "mika_hirameki_2",
    name: "作戦分析", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9F%E3%82%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E4%BD%9C%E6%88%A6%E5%88%86%E6%9E%90_0_20251124-121637.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "波1<wbr/>1ターンの間、<wbr/>治癒量+50%"},
      { level: 1, cost: 0, description: "治癒50%<wbr/>波1<wbr/>2ターンの間、<wbr/>治癒量+50%"},
      { level: 2, cost: 0, description: "波2<wbr/>1ターンの間、<wbr/>治癒量+50%" },
      { level: 3, cost: 0, description: "波2<wbr/>1ターンの間、<wbr/>自分の治癒量+100%" },
      { level: 4, cost: 0, description: "1ターンの間、自分のカード使用時、波1" },
      { level: 5, cost: 0, category: CardCategory.UPGRADE, description: "波2<wbr/>治癒量+50%" }
    ]
  },
  {
    id: "mika_hirameki_3",
    name: "渦巻き", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%9F%E3%82%AB_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%B8%A6%E5%B7%BB%E3%81%8D_0_20251124-133057.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "敵全体にダメージ200%<wbr/>攻撃した対象の数に応じて、治癒50%" },
      { level: 1, cost: 2, description: "敵全体にダメージ200%<wbr/>攻撃した対象の数に応じて、治癒100%" },
      { level: 2, cost: 1, description: "敵全体にダメージ200%<wbr/>攻撃した対象の数に応じて、波1" },
      { level: 3, cost: 2, description: "敵全体にダメージ200%<wbr/>攻撃した対象の数に応じて、次に使用するカードの治癒量20%増加" },
      { level: 4, cost: 4, description: "敵全体にダメージ300%<wbr/>回復すると、使用するまでコスト1 減少" },
      { level: 5, cost: 2, description: "治癒100%<wbr/>敵全体にダメージ100%(200%)<wbr/>このカードの治癒量分、ダメージ量増加" }
    ]
  },
  {
    id: "mika_hirameki_4",
    name: "氾濫", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE, CardStatus.INITIATION],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "波1<wbr/>ターン開始時、波1" },
    ]
  },
  // Beryl's starting cards
  {
    id: "beryl_starting_1",
    name: "ランチャー", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "beryl_starting_2",
    name: "チャージランチャー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ200%" } // Fallback
    ]
  },
  {
    id: "beryl_starting_3",
    name: "バリア", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "beryl_starting_4",
    name: "隙あり", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.RETAIN],
    imgUrl: "",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ120%<wbr/>保存：1ターンの間、ヒット数1回追加" },
      { level: 1, cost: 1, description: "ダメージ180%<wbr/>保存：1ターンの間、ヒット数1回追加"},
      { level: 2, cost: 1, description: "ダメージ225%<wbr/>保存：コスト0に変更" },
      { level: 3, cost: 1, description: "ダメージ100%<wbr/>保存：1ターンの間、ヒット数2回追加" },
      { level: 4, cost: 1, description: "ダメージ150%<wbr/>保存：ダメージ量+60%" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "自分のカード保存時、ランダムな敵に追加攻撃150%", statuses: [] }
    ]
  },
  // Beryl's hirameki cards
  {
    id: "beryl_hirameki_1",
    name: "チャージ弾", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.RETAIN],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%99%E3%83%AA%E3%83%AB_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E3%83%81%E3%83%A3%E3%83%BC%E3%82%B8%E5%BC%BE_0_20251119-205603.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ200%<wbr/>保存：ダメージ量+80%" },
      { level: 1, cost: 2, description: "ダメージ300%<wbr/>保存：ダメージ量+120%" },
      { level: 2, cost: 1, description: "ダメージ200%<wbr/>連続6)：ダメージ量+100%" },
      { level: 3, cost: 3, description: "ダメージ450%<wbr/>保存：使用時までコスト1減少" },
      { level: 4, cost: 2, description: "ダメージ300%<wbr/>保存：ダメージ量+160%(最大1回)" },
      { level: 5, cost: 2, description: "ダメージ120%×2<wbr/>保存：ダメージ量+50%" }
    ]
  },
  {
    id: "beryl_hirameki_2",
    name: "隠してたチョコバー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%99%E3%83%AA%E3%83%AB_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E9%9A%A0%E3%81%97%E3%81%A6%E3%81%9F%E3%83%81%E3%83%A7%E3%82%B3%E3%83%90%E3%83%BC_0_20251119-205715.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "ドロー3"},
      { level: 1, cost: 0, description: "ドロー3<wbr/>士気1"},
      { level: 2, cost: 0, description: "ドロー3<wbr/>手札のランダムな自分のカード1枚のコストが1減少" },
      { level: 3, cost: 0, description: "ドロー3<wbr/>次のターン開始時、ドロー2" },
      { level: 4, cost: 0, description: "ドロー1<wbr/>手札の全ての自分のカードに保存効果発動", statuses: [] },
      { level: 5, cost: 0, description: "ドロー3", statuses: [CardStatus.UNIQUE, CardStatus.EXHAUST2] }
    ]
  },
  {
    id: "beryl_hirameki_3",
    name: "無限の火力", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%99%E3%83%AA%E3%83%AB_%E3%81%B2%E3%82%89%E3%82%81%E3%81%8D_%E7%84%A1%E9%99%90%E3%81%AE%E7%81%AB%E5%8A%9B_0_20251119-205824.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド100%<wbr/>次に使用する自分の攻撃カードのダメージ量+80%" },
      { level: 1, cost: 1, description: "シールド150%<wbr/>次に使用する自分の攻撃カードのダメージ量+120%" },
      { level: 2, cost: 1, description: "1ターンの間、自分の攻撃カードダメージ量+80%" },
      { level: 3, cost: 1, description: "次に使用する自分の攻撃カードのダメージ量+160%" },
      { level: 4, cost: 1, description: "シールド150%<wbr/>次に使用する攻撃カードのダメージ量+80%" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "自分の攻撃カードダメージ量30%増加" }
    ]
  },
  {
    id: "beryl_hirameki_4",
    name: "重火器専門家", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "隙ありまたは、チャージ弾を1枚ずつ生成、そのカードに消滅付与、使用するまでコスト1減少" },
    ]
  },
  // Cassius's starting cards
  {
    id: "cassius_starting_1",
    name: "カード", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "cassius_starting_2",
    name: "ワイルドカード", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 2, description: "ダメージ200%" } // Fallback
    ]
  },
  {
    id: "cassius_starting_3",
    name: "魔力場", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "cassius_starting_4",
    name: "ポップアイドポッパー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%B7%E3%82%A6%E3%82%B9_%E3%83%9D%E3%83%83%E3%83%97%E3%82%A2%E3%82%A4%E3%83%89%E3%83%9D%E3%83%83%E3%83%91%E3%83%BC.png",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "4個のクエストのうちランダムで1個開始" },
      { level: 1, cost: 0, description: "4個のクエストのうちランダムで1個開始", statuses: [CardStatus.INITIATION] },
      { level: 2, cost: 0, description: "4個のクエストのうちランダムで1個開始<wbr/>クエストカード生成時、蒸発排除、保存付与" },
      { level: 3, cost: 0, description: "4個のクエストのうちランダムで1個開始<wbr/>クエスト完了時、より強力なクエストカード生成" },
      { level: 4, cost: 0, description: "4個のクエストのうち、1個を選択して開始" },
      { level: 5, cost: 0, description: "4個のクエストのうちランダムで1個開始<wbr/>クエスト完了時、ほかのランダムなクエストに変更"}
    ]
  },
  // Cassius's hirameki cards
  {
    id: "cassius_hirameki_1",
    name: "デビルダイス", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%B7%E3%82%A6%E3%82%B9_%E3%83%87%E3%83%93%E3%83%AB%E3%83%80%E3%82%A4%E3%82%B9.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ160%<wbr/>ドロー1" },
      { level: 1, cost: 1, description: "ダメージ200%<wbr/>クエストカード1枚生成"},
      { level: 2, cost: 1, description: "ダメージ160%<wbr/>ドロー1", statuses: [CardStatus.RETRIEVE3] },
      { level: 3, cost: 1, description: "敵全体にダメージ160%<wbr/>攻撃した対象に応じてドロー"},
      { level: 4, cost: 1, description: "ダメージ240%<wbr/>ドロー2<wbr/>破棄2"},
      { level: 5, cost: 0, description: "ドロー1<wbr/>そのカードのコストに応じて敵全体にダメージ80%" }
    ]
  },
  {
    id: "cassius_hirameki_2",
    name: "カードシャッフル", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%B7%E3%82%A6%E3%82%B9_%E3%82%AB%E3%83%BC%E3%83%89%E3%82%B7%E3%83%A3%E3%83%83%E3%83%95%E3%83%AB.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "手札のすべてのカードを破棄<wbr/>その数に応じてドロー"},
      { level: 1, cost: 1, description: "手札のすべてのカードを破棄<wbr/>その数に応じてドロー", statuses: [CardStatus.EXHAUST2]},
      { level: 2, cost: 1, description: "手札を好きな枚数破棄<wbr/>その数に応じてドロー" },
      { level: 3, cost: 1, description: "手札と捨て札の全てのカードを山札に移動<wbr/>ドロー5" },
      { level: 4, cost: 0, description: "捨て札からカードを5枚まで選択、山札の一番上に移動" },
      { level: 5, cost: 0, description: "ドロー3<wbr/>ドローしたカードの合計コストが4以下の場合、すべて破棄", statuses: [] }
    ]
  },
  {
    id: "cassius_hirameki_3",
    name: "ダイストリック", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AB%E3%82%B7%E3%82%A6%E3%82%B9_%E3%83%80%E3%82%A4%E3%82%B9%E3%83%88%E3%83%AA%E3%83%83%E3%82%AF.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ240%<wbr/>完了したクエストの回数に応じてコスト減少" },
      { level: 1, cost: 2, description: "	ダメージ360%<wbr/>完了したクエストの回数に応じてコスト減少" },
      { level: 2, cost: 2, description: "敵全体にダメージ300%<wbr/>完了したクエストの回数に応じてコスト減少" },
      { level: 3, cost: 0, description: "ダメージ80%<wbr/>完了したクエストの回数に応じて、ダメージ量+80%" },
      { level: 4, cost: 2, category: CardCategory.UPGRADE, description: "クエストカード使用時、治癒100%、ランダムな敵に固定ダメージ100%" },
      { level: 5, cost: 2, category: CardCategory.UPGRADE, description: "クエスト完了時、クエストカードを1枚生成" }
    ]
  },
  {
    id: "cassius_hirameki_4",
    name: "ジョーカー", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "山札2)から1枚選択、そのカードを手札に移動" },
    ]
  },
  // Owen's starting cards
  {
    id: "owen_starting_1",
    name: "打ち下ろし", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "owen_starting_2",
    name: "打ち下ろし", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "owen_starting_3",
    name: "武器防ぎ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "owen_starting_4",
    name: "ウィンドチャージ", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "次に使用する自分の攻撃カードのヒット数が1回追加" },
      { level: 1, cost: 1, description: "次に使用する自分の攻撃カードのヒット数が1回追加", statuses: [CardStatus.RETRIEVE] },
      { level: 2, cost: 1, description: "次に使用する攻撃カードのヒット数が1回追加<wbr/>ダメージ量25%減少" },
      { level: 3, cost: 1, category: CardCategory.UPGRADE, description: "自分の攻撃カード使用時、30%の確率でヒット数1回追加", statuses: [CardStatus.UNIQUE] },
      { level: 4, cost: 1, description: "次に使用するスキルカードを1回さらに発動", statuses: [CardStatus.UNIQUE, CardStatus.EXHAUST] },
      { level: 5, cost: 1, description: "次に使用する自分の攻撃カードのヒット数が3回追加<wbr/>ダメージ量50%減少"}
    ]
  },
  // Owen's hirameki cards
  {
    id: "owen_hirameki_1",
    name: "風斬り", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%BC%E3%82%A6%E3%82%A7%E3%83%B3_%E9%A2%A8%E6%96%AC%E3%82%8A_0_20251124-143724.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "敵全体にダメージ220%" },
      { level: 1, cost: 1, description: "敵全体にダメージ220%"},
      { level: 2, cost: 2, description: "ダメージ120%×3"},
      { level: 3, cost: 2, description: "敵全体にダメージ220%<wbr/>撃破：このカードがもう1回発動"},
      { level: 4, cost: 2, category: CardCategory.UPGRADE, description: "ターン開始時、アクションポイント1減少<wbr/>ターン終了時、敵全体にダメージ220%"},
      { level: 5, cost: 2, description: "敵全体にダメージ220%<wbr/>強靭度ダメージ100%増加" }
    ]
  },
  {
    id: "owen_hirameki_2",
    name: "防具潰し", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%BC%E3%82%A6%E3%82%A7%E3%83%B3_%E9%98%B2%E5%85%B7%E5%A3%8A%E3%81%97_0_20251124-144459.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ100%<wbr/>脆弱2"},
      { level: 1, cost: 1, description: "ダメージ150%<wbr/>1ターンの間不屈4 減少"},
      { level: 2, cost: 0, description: "ダメージ100%<wbr/>脆弱2" },
      { level: 3, cost: 1, description: "ダメージ150%<wbr/>脆弱2<wbr/>対象が脆弱状態の場合、ダメージ量30%増加" },
      { level: 4, cost: 1, description: "ダメージ150%<wbr/>脆弱2<wbr/>対象がシールドを所持中の場合、ダメージ量30%増加" },
      { level: 5, cost: 1, description: "ダメージ100%<wbr/>脆弱3<wbr/>ウィンドチャージ使用時、このカードを捨て札から手札に移動" }
    ]
  },
  {
    id: "owen_hirameki_3",
    name: "風乗り", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%82%AA%E3%83%BC%E3%82%A6%E3%82%A7%E3%83%B3_%E9%A2%A8%E4%B9%97%E3%82%8A_0_20251124-145234.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "シールド150%<wbr/>捨て札からウィンドチャージを手札に移動" },
      { level: 1, cost: 1, description: "シールド220%<wbr/>捨て札から自分のカード2枚を手札に移動" },
      { level: 2, cost: 1, category: CardCategory.UPGRADE, description: "ウィンドチャージ使用時シールド120%、敵全体にダメージ120%" },
      { level: 3, cost: 1, description: "シールド150%<wbr/>次に使用する自分の攻撃カードのヒット数1回追加" },
      { level: 4, cost: 1, description: "シールド220%<wbr/>ダメージ減少3" },
      { level: 5, cost: 1, description: "シールド220%<wbr/>今回のターンにウィンドチャージを使用した場合、このカードを1回さらに発動" }
    ]
  },
  {
    id: "owen_hirameki_4",
    name: "疾風の一撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 2, description: "ダメージ250%<wbr/>シールド80%" },
    ]
  },
  // Rei's starting cards
  {
    id: "rei_starting_1",
    name: "闇黒の刃", // Fallback: See messages/*.json for translations
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    isBasicCard: true,
    isStartingCard: true,
    imgUrl: "",
    hiramekiVariations: [
      { level: 0, cost: 1, description: "ダメージ100%" } // Fallback
    ]
  },
  {
    id: "rei_starting_2",
    name: "闇黒の刃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "シールド100%" } // Fallback
    ]
  },
  {
    id: "rei_starting_3",
    name: "物質再生", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "",
    isBasicCard: true,
    isStartingCard: true,
    hiramekiVariations: [
      { level: 0, cost: 1, description: "治癒100%" } // Fallback
    ]
  },
  {
    id: "rei_starting_4",
    name: "闇の斬撃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [CardStatus.LEAD],
    imgUrl: "",
    isBasicCard: false,
    isStartingCard: true,
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ100%<wbr/>1ターンの間、基本攻撃カードのダメージ量100%増加" },
      { level: 1, cost: 1, description: "ダメージ150%<wbr/>1ターンの間、基本攻撃カードのダメージ量150%増加"},
      { level: 2, cost: 1, description: "ダメージ350%<wbr/>1ターンの間、ダメージ量20%減少", statuses: [] },
      { level: 3, cost: 1, description: "ダメージ150%<wbr/>基本カードを全て破棄、その数に応じて、ヒット数1回追加"},
      { level: 4, cost: 1, category: CardCategory.UPGRADE, description: "基本カードのダメージ量80%増加", statuses: [CardStatus.UNIQUE] },
      { level: 5, cost: 0, category: CardCategory.SKILL, description: "手札の基本カードすべて発動", statuses: [CardStatus.RETAIN] }
    ]
  },
  // Rei's hirameki cards
  {
    id: "rei_hirameki_1",
    name: "共鳴する暗闇", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.UPGRADE,
    statuses: [CardStatus.UNIQUE],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AC%E3%82%A4_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E5%85%B1%E9%B3%B4%E3%81%99%E3%82%8B%E6%9A%97%E9%97%87_0_20251118-221550.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "コスト1のカードのダメージ量+40%" },
      { level: 1, cost: 1, description: "コスト1のカードのダメージ量+60%"},
      { level: 2, cost: 1, description: "空虚カードのダメージ量+40%"},
      { level: 3, cost: 1, description: "コスト1のカードのダメージ量、シールド8)獲得量、治癒量+40%"},
      { level: 4, cost: 1, description: "コスト1以下のカードのダメージ量+40%"},
      { level: 5, cost: 0, category: CardCategory.SKILL, description: "1ターンの間、コスト1のカードのダメージ量+80%" }
    ]
  },
  {
    id: "rei_hirameki_2",
    name: "おやつの時間", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [CardStatus.EXHAUST],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AC%E3%82%A4_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E3%81%8A%E3%82%84%E3%81%A4%E3%81%AE%E6%99%82%E9%96%93_0_20251118-221652.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 0, description: "手札のカードを1枚選択し、消滅<wbr/>治癒100%<wbr/>ドロー1"},
      { level: 1, cost: 0, description: "手札のカードを1枚選択し、消滅<wbr/>治癒150%<wbr/>ドロー1", statuses: [CardStatus.EXHAUST2]},
      { level: 2, cost: 0, description: "治癒150%<wbr/>ドロー2", statuses: [CardStatus.RETAIN, CardStatus.EXHAUST] },
      { level: 3, cost: 0, description: "手札のカードを2枚まで選択し、消滅、その枚数に応じて、ドロー" },
      { level: 4, cost: 0, description: "山札から1枚まで選択し、消滅、その枚数に応じて、ドロー" },
      { level: 5, cost: 0, description: "手札のカードを2枚選択し、消滅、空虚カードを1枚選択し、ドロー" }
    ]
  },
  {
    id: "rei_hirameki_3",
    name: "暗黒凝縮", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.SKILL,
    statuses: [],
    imgUrl: "https://nightmare.aosns.com/_media/%E3%82%AD%E3%83%A3%E3%83%A9%E4%B8%80%E8%A6%A7/%E3%83%AC%E3%82%A4_%E3%83%92%E3%83%A9%E3%83%A1%E3%82%AD_%E6%9A%97%E9%BB%92%E5%87%9D%E9%9B%86_0_20251118-221805.png",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "手札の攻撃カードを1枚選択、1ターンの間、ダメージ量+100%" },
      { level: 1, cost: 1, description: "	手札の攻撃カードを1枚選択、1ターンの間、ダメージ量+150%" },
      { level: 2, cost: 1, description: "手札の攻撃カードを1枚選択、1ターンの間、ダメージ量、シールド獲得量、治癒量+100%" },
      { level: 3, cost: 1, description: "1ターンの間、空虚攻撃カードのダメージ量+50%" },
      { level: 4, cost: 1, description: "攻撃カードを1枚選択、使用するまでダメージ量+100%" },
      { level: 5, cost: 1, category: CardCategory.UPGRADE, description: "手札の攻撃カードを1枚選択、ダメージ量+50%" }
    ]
  },
  {
    id: "rei_hirameki_4",
    name: "捕食者の刃", // Fallback
    type: CardType.CHARACTER,
    category: CardCategory.ATTACK,
    statuses: [],
    imgUrl: "",
    hiramekiVariations: [ // Fallback descriptions
      { level: 0, cost: 1, description: "ダメージ250%<wbr/>1ターンの間、士気2" },
    ]
  },
];
