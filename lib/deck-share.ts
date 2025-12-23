import { CHARACTERS, EQUIPMENT, getCardById } from "@/lib/data";
import { CznCard, Deck, DeckCard, Equipment, EquipmentType } from "@/types";

interface SharedDeckCard {
  id: string;
  selectedHiramekiLevel?: number;
  godHiramekiType?: DeckCard["godHiramekiType"];
  godHiramekiEffectId?: DeckCard["godHiramekiEffectId"];
  isCopied?: boolean;
  copiedFromCardId?: string;
}

interface SharedDeckPayload {
  v: 1;
  n?: string;
  c?: string | null;
  e?: {
    w?: string | null;
    a?: string | null;
    p?: string | null;
  };
  k: SharedDeckCard[];
  ego?: number;
  pot?: boolean;
  ct?: string;
  rm?: Array<[string, number]>;
  cp?: Array<[string, number]>;
  cv?: Array<[string, string]>;
}

const DEFAULT_VERSION = 1;

const encodeText = (value: string): string => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf-8").toString("base64");
  }
  const utf8 = new TextEncoder().encode(value);
  let binary = "";
  utf8.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
};

const decodeText = (value: string): string => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  if (typeof Buffer !== "undefined") {
    return Buffer.from(padded, "base64").toString("utf-8");
  }
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const toBase64Url = (value: string): string =>
  encodeText(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const fromBase64Url = (value: string): string => decodeText(value);

const createNonce = (): string => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

const createDeckId = (prefix: string): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random()}`;
};

const pickCard = (cardId: string): CznCard | null => getCardById(cardId) ?? null;

const pickEquipment = (id: string | null | undefined, type: EquipmentType): Equipment | null => {
  if (!id) return null;
  return EQUIPMENT.find((item) => item.id === id && item.type === type) ?? null;
};

const pickCharacter = (id: string | null | undefined) => CHARACTERS.find((char) => char.id === id) ?? null;

export function encodeDeckShare(deck: Deck): string {
  const payload: SharedDeckPayload = {
    v: DEFAULT_VERSION,
    ...(deck.name && { n: deck.name }),
    ...(deck.character && { c: deck.character.id }),
    ...(deck.equipment.weapon || deck.equipment.armor || deck.equipment.pendant) && {
      e: {
        ...(deck.equipment.weapon && { w: deck.equipment.weapon.id }),
        ...(deck.equipment.armor && { a: deck.equipment.armor.id }),
        ...(deck.equipment.pendant && { p: deck.equipment.pendant.id }),
      },
    },
    k: deck.cards.map((card) => ({
      id: card.id,
      ...(card.selectedHiramekiLevel && { selectedHiramekiLevel: card.selectedHiramekiLevel }),
      ...(card.godHiramekiType && { godHiramekiType: card.godHiramekiType }),
      ...(card.godHiramekiEffectId && { godHiramekiEffectId: card.godHiramekiEffectId }),
      ...(card.isCopied && { isCopied: card.isCopied }),
      ...(card.copiedFromCardId && { copiedFromCardId: card.copiedFromCardId }),
    })),
    ...(deck.egoLevel && { ego: deck.egoLevel }),
    ...(deck.hasPotential && { pot: deck.hasPotential }),
    ct: deck.createdAt.toISOString(),
    ...(deck.removedCards.size && { 
      rm: Array.from(deck.removedCards.entries()).map(([id, entry]) => 
        [id, typeof entry === 'number' ? entry : entry.count] as [string, number]
      )
    }),
    ...(deck.copiedCards.size && { 
      cp: Array.from(deck.copiedCards.entries()).map(([id, entry]) => 
        [id, typeof entry === 'number' ? entry : entry.count] as [string, number]
      )
    }),
    ...(deck.convertedCards.size && { cv: Array.from(deck.convertedCards.entries()) }),
  };

  const json = JSON.stringify(payload);
  return toBase64Url(json);
}

const toDeckCard = (card: CznCard, shared: SharedDeckCard): DeckCard => {
  const maxLevel = Math.max(0, card.hiramekiVariations.length - 1);
  const safeLevel = Math.min(Math.max(shared.selectedHiramekiLevel ?? 0, 0), maxLevel);
  return {
    ...card,
    deckId: createDeckId(card.id),
    selectedHiramekiLevel: safeLevel,
    godHiramekiType: shared.godHiramekiType ?? null,
    godHiramekiEffectId: shared.godHiramekiEffectId ?? null,
    isCopied: shared.isCopied,
    copiedFromCardId: shared.copiedFromCardId,
  };
};

export function decodeDeckShare(value: string): Deck | null {
  try {
    const json = fromBase64Url(value);
    const payload = JSON.parse(json) as SharedDeckPayload;

    if (payload.v !== DEFAULT_VERSION) {
      return null;
    }

    const character = payload.c ? pickCharacter(payload.c) : null;

    const equipment = {
      weapon: payload.e?.w ? pickEquipment(payload.e.w, EquipmentType.WEAPON) : null,
      armor: payload.e?.a ? pickEquipment(payload.e.a, EquipmentType.ARMOR) : null,
      pendant: payload.e?.p ? pickEquipment(payload.e.p, EquipmentType.PENDANT) : null,
    };

    const cards: DeckCard[] = (payload.k ?? [])
      .map((shared) => {
        const card = pickCard(shared.id);
        if (!card) return null;
        return toDeckCard(card, shared);
      })
      .filter((card): card is DeckCard => Boolean(card));

    const createdAt = payload.ct ? new Date(payload.ct) : new Date();
    const validCreatedAt = Number.isNaN(createdAt.getTime()) ? new Date() : createdAt;

    return {
      name: payload.n ?? "",
      character,
      equipment,
      cards,
      egoLevel: payload.ego ?? 0,
      hasPotential: payload.pot ?? false,
      createdAt: validCreatedAt,
      removedCards: new Map(payload.rm ?? []),
      copiedCards: new Map(payload.cp ?? []),
      convertedCards: new Map(payload.cv ?? []),
    };
  } catch (error) {
    console.error("Failed to decode deck share", error);
    return null;
  }
}
