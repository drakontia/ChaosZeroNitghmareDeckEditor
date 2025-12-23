// Character Job/Class types
export enum JobType {
  STRIKER = "striker",       // ストライカー
  VANGUARD = "vanguard",     // ヴァンガード
  RANGER = "ranger",         // レンジャー
  HUNTER = "hunter",         // ハンター
  CONTROLLER = "controller", // コントローラー
  PSIONIC = "psionic"       // サイオニック
}

// Elemental affinities
export enum ElementType {
  PASSION = "passion",   // 情熱
  JUSTICE = "justice",   // 正義
  ORDER = "order",       // 秩序
  INSTINCT = "instinct", // 本能
  VOID = "void"          // 空虚
}

// Job icon information
export interface JobIcon {
  job: JobType;
  iconUrl: string;
}

// Character types
export interface Character {
  id: string;
  name: string;
  rarity: string; // ★4、★5
  job: JobType; // Character's job class
  element?: ElementType; // Element affinity
  egoLevel?: number; // Ego manifestation level
  imgUrl?: string;
  startingCards: string[]; // IDs of 4 starting cards
  hiramekiCards: string[]; // IDs of 4 hirameki cards
}

// Equipment types
export enum EquipmentType {
  WEAPON = "weapon",
  ARMOR = "armor",
  PENDANT = "pendant"
}

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  rarity: string;
  description?: string;
  imgUrl?: string;
}

// Card types with enhanced Hirameki support
export enum CardType {
  CHARACTER = "character",
  SHARED = "shared",      // 共用カード
  MONSTER = "monster",    // モンスターカード
  FORBIDDEN = "forbidden" // 禁忌カード
}

// Card category types
export enum CardCategory {
  ATTACK = "attack",       // 攻撃
  UPGRADE = "upgrade", // 強化
  SKILL = "skill"         // スキル
}

// Card status types (can have multiple)
export enum CardStatus {
  INITIATION = "initiation",     // 開戦
  RETAIN = "retain", // 保存
  CELESTIAL = "celestial", // 天上
  COMBO = "combo", // 連携
  EXHAUST = "exhaust",       // 消滅
  EXHAUST2 = "exhaust2",       // 消滅2
  EXHAUST3 = "exhaust3",       // 消滅3
  LEAD = "lead",             // 主導
  UNIQUE = "unique",          // 唯一
  HASTE = "haste",         // 迅速
  FINALE = "finale",   // 終極
  RETRIEVE = "retrieve",    // 回収
  RETRIEVE2 = "retrieve2",    // 回収2
  RETRIEVE3 = "retrieve3",    // 回収3
  BULLET = "bullet",        // 弾丸
  WEAKNESS_ATTACK = "weakness_attack", // 弱点攻撃
  PULVERIZE = "pulverize",     // 粉砕
  BIND = "bind"               // 結束
}

// Hirameki variation for a card
export interface HiramekiVariation {
  level: number; // 0 = base, 1-5 for character cards, 1-3 for other cards
  cost: number | "X"; // "X" allows variable-cost cards defined by effect text
  description: string;
  // Hiramekiでカテゴリが変化する場合の上書き
  category?: CardCategory;
  statuses?: CardStatus[]; // Status effects display text
  // Variations based on Ego Manifestation level
  egoVariations?: {
    [egoLevel: number]: {
      description: string;
      cost?: number;
    };
  };
  // Variation when potential is active
  potentialVariation?: {
    description: string;
    cost?: number;
  };
}

// God types for God Hirameki system
export enum GodType {
  KILKEN = "kilken",       // キルケン
  SECLAID = "seclaid",     // セクレド
  DIALOS = "dialos",       // ディアロス
  NIHILUM = "nihilum",     // ニヒルム
  VITOL = "vitol"          // ヴィトル
}

// Single God Hirameki effect option
export interface GodHiramekiEffectOption {
  id: string;              // Unique ID for this effect
  additionalEffect: string; // Description of the effect
  costModifier?: number;   // Optional cost change
}

// Unified God Hirameki effect definition (not grouped by god)
export interface GodHiramekiDefinition {
  id: string;              // Effect id (matches i18n key under godEffects)
  additionalEffect: string; // Fallback description
  costModifier?: number;   // Optional cost change
  gods: GodType[] | "all"; // Applicable gods or all
}

export interface CznCard {
  id: string;
  name: string;
  type: CardType;
  category: CardCategory; // Attack, Enhancement, or Skill
  statuses: CardStatus[]; // Card status effects
  isBasicCard?: boolean; // True for the 3 basic cards that can't have hirameki
  isStartingCard?: boolean; // True for character's 4 starting cards
  allowedJobs?: JobType[] | "all"; // For shared/monster/forbidden cards
  imgUrl?: string;
  // Hirameki variations (index 0 is base, 1-5 for character cards, 1-3 for others)
  hiramekiVariations: HiramekiVariation[];
}

// Deck state
export interface DeckCard extends CznCard {
  deckId: string; // unique ID for this card in the deck
  selectedHiramekiLevel: number; // 0 = base, 1-5 for variations
  godHiramekiType: GodType | null; // Which god's hirameki is applied (null = none)
  godHiramekiEffectId: string | null; // Which specific effect of that god is applied
  isCopied?: boolean; // True if this is a copied card
  copiedFromCardId?: string; // Original card id this copy was created from
}

// Removal/Copy snapshot entries to preserve attributes at action time
export interface RemovedCardEntry {
  count: number;
  type?: CardType; // Optional: card type at removal
  selectedHiramekiLevel?: number;
  godHiramekiType?: GodType | null;
  godHiramekiEffectId?: string | null;
  isBasicCard?: boolean;
}

export interface CopiedCardEntry {
  count: number;
  type?: CardType; // Optional: card type at copy time
  selectedHiramekiLevel?: number;
  godHiramekiType?: GodType | null;
  godHiramekiEffectId?: string | null;
  isBasicCard?: boolean;
}

export interface Deck {
  name?: string;
  character: Character | null;
  equipment: {
    weapon: Equipment | null;
    armor: Equipment | null;
    pendant: Equipment | null;
  };
  cards: DeckCard[];
  egoLevel: number; // 0-6, Ego Manifestation level
  hasPotential: boolean; // Whether potential is active
  createdAt: Date; // Deck creation date
  // Tracking for Faint Memory calculation
  removedCards: Map<string, number | RemovedCardEntry>; // cardId -> removal count or snapshot entry
  copiedCards: Map<string, number | CopiedCardEntry>; // cardId -> copy count or snapshot entry
  convertedCards: Map<string, string>; // originalCardId -> convertedCardId mapping
}


