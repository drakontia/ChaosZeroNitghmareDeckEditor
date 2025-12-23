import { CardType, DeckCard, Deck, CardStatus, CardCategory, RemovedCardEntry, CopiedCardEntry } from "@/types";
import { GOD_HIRAMEKI_EFFECTS } from "@/lib/god-hirameki";
import { getCardById } from "@/lib/data";

// Helper function to get card info based on hirameki level and god hirameki
export function getCardInfo(
  card: DeckCard,
  egoLevel: number = 0,
  hasPotential: boolean = false,
  convertedCards?: Map<string, string>
): {
  cost: number | "X";
  description: string;
  category: CardCategory;
  statuses?: CardStatus[]; // Return raw status array for translation
} {
  // If this card has been converted, use the target card's variations for info
  const convertedId = convertedCards?.get(card.id);
  const baseCard = convertedId ? (getCardById(convertedId) ?? card) : card;

  const variation = baseCard.hiramekiVariations[card.selectedHiramekiLevel] || baseCard.hiramekiVariations[0];
  
  let cost = variation.cost;
  let description = variation.description;
  const category = variation.category ?? baseCard.category;
  const statuses = (variation.statuses && variation.statuses.length > 0)
    ? variation.statuses
    : (baseCard.statuses && baseCard.statuses.length > 0 ? baseCard.statuses : undefined);

  // Apply ego level variations
  if (variation.egoVariations && variation.egoVariations[egoLevel]) {
    const egoVar = variation.egoVariations[egoLevel];
    description = egoVar.description;
    if (egoVar.cost !== undefined) {
      cost = egoVar.cost;
    }
  }

  // Apply potential variation
  if (hasPotential && variation.potentialVariation) {
    description = variation.potentialVariation.description;
    if (variation.potentialVariation.cost !== undefined) {
      cost = variation.potentialVariation.cost;
    }
  }

  // Apply god hirameki if active and an effect is selected
  if (card.godHiramekiType && card.godHiramekiEffectId && !card.isBasicCard) {
    const effect = GOD_HIRAMEKI_EFFECTS.find(e => e.id === card.godHiramekiEffectId);
    if (effect) {
      description = `${description}\n${effect.additionalEffect}`;
      if (effect.costModifier !== undefined && typeof cost === "number") {
        cost += effect.costModifier;
      }
    }
  }

  return { cost, description, category, statuses };
}

// Calculate Faint Memory points based on deck edits
export function calculateFaintMemory(deck: Deck): number {
  let points = 0;

  // Points for cards in the deck
  for (const card of deck.cards) {
    // Character cards: base cards do not add points.
    // Collect God Hirameki state once and handle uniformly for all types.
    const hasGodHirameki = (card.godHiramekiType && card.godHiramekiEffectId && !card.isBasicCard);

    // Non-character cards receive base acquisition and hirameki points
    if (card.type !== CardType.CHARACTER) {
      // Shared card acquisition: +20pt
      if (card.type === CardType.SHARED) {
        points += 20;
      }
      
      // Monster card acquisition: +80pt
      if (card.type === CardType.MONSTER) {
        points += 80;
      }

      // Forbidden card: +20pt (always saved)
      if (card.type === CardType.FORBIDDEN) {
        points += 20;
      }

      // Hirameki on shared/monster cards: +10pt (character cards are 0pt)
      if ((card.type === CardType.SHARED || card.type === CardType.MONSTER) && card.selectedHiramekiLevel > 0) {
        points += 10;
      }
    }
    
    // God Hirameki: +20pt (uniformly applied after type-specific points)
    if (hasGodHirameki) {
      points += 20;
    }
  }

  // Points for removed cards
  // Calculate removal points based on sequential removal order across all cards
  let removalIndex = 0;
  for (const [cardId, entry] of deck.removedCards.entries()) {
    const removedCard = getCardById(cardId);
    const count = typeof entry === "number" ? entry : (entry.count ?? 0);
    // Check if card is character type by card data
    const isCharacter = removedCard?.type === CardType.CHARACTER;

    // Apply points for each removal of this card
    for (let i = 0; i < count; i++) {
      removalIndex++;
      
      // Base points based on removal sequence number
      let basePoints = 0;
      if (removalIndex === 1) {
        basePoints = 0;
      } else if (removalIndex === 2) {
        basePoints = 10;
      } else if (removalIndex === 3) {
        basePoints = 30;
      } else if (removalIndex === 4) {
        basePoints = 50;
      } else if (removalIndex >= 5) {
        basePoints = 70;
      }

      // Character card removal: base points + 20pt bonus
      if (isCharacter) {
        points += basePoints + 20;
      } else {
        points += basePoints;
      }
    }

    // Attribute points for removed cards (optional snapshot-based)
    const snapshot: RemovedCardEntry | null = typeof entry === "number" ? null : entry as RemovedCardEntry;
    if (snapshot && count > 0) {
      const cardType = snapshot.type ?? removedCard?.type;
      // Type acquisition points
      if (cardType === CardType.SHARED) {
        points += 20 * count;
      } else if (cardType === CardType.MONSTER) {
        points += 80 * count;
      } else if (cardType === CardType.FORBIDDEN) {
        points += 20 * count;
      }
      // Hirameki points for shared/monster
      if ((cardType === CardType.SHARED || cardType === CardType.MONSTER) && (snapshot.selectedHiramekiLevel ?? 0) > 0) {
        points += 10 * count;
      }
      // God hirameki points
      if (snapshot.godHiramekiType && snapshot.godHiramekiEffectId && !snapshot.isBasicCard) {
        points += 20 * count;
      }
    }
  }

  // Points for copied cards
  // Calculate copy points based on sequential copy order across all cards
  let copyIndex = 0;
  for (const [cardId, entry] of deck.copiedCards.entries()) {
    const count = typeof entry === "number" ? entry : (entry.count ?? 0);
    // Apply points for each copy of this card
    for (let i = 0; i < count; i++) {
      copyIndex++;
      
      // Base points based on copy sequence number
      let basePoints = 0;
      if (copyIndex === 1) {
        basePoints = 0;
      } else if (copyIndex === 2) {
        basePoints = 10;
      } else if (copyIndex === 3) {
        basePoints = 30;
      } else if (copyIndex === 4) {
        basePoints = 50;
      } else if (copyIndex >= 5) {
        basePoints = 70;
      }
      
      points += basePoints;
    }

    // Attribute points for copied cards (optional snapshot-based)
    const snapshot: CopiedCardEntry | null = typeof entry === "number" ? null : entry as CopiedCardEntry;
    if (snapshot && count > 0) {
      const copiedCard = getCardById(cardId);
      const cardType = snapshot.type ?? copiedCard?.type;
      // Type acquisition points
      if (cardType === CardType.SHARED) {
        points += 20 * count;
      } else if (cardType === CardType.MONSTER) {
        points += 80 * count;
      } else if (cardType === CardType.FORBIDDEN) {
        points += 20 * count;
      }
      // Hirameki points for shared/monster
      if ((cardType === CardType.SHARED || cardType === CardType.MONSTER) && (snapshot.selectedHiramekiLevel ?? 0) > 0) {
        points += 10 * count;
      }
      // God hirameki points
      if (snapshot.godHiramekiType && snapshot.godHiramekiEffectId && !snapshot.isBasicCard) {
        points += 20 * count;
      }
    }
  }

  // Points for converted cards: +10pt each
  if (deck.convertedCards.size > 0) {
    points += deck.convertedCards.size * 10;
  }

  return points;
}

// Sort cards by type: Character (Starting -> Hirameki) -> Shared -> Monster -> Forbidden
export function sortDeckCards(cards: DeckCard[]): DeckCard[] {
  const typeOrder: Record<CardType, number> = {
    [CardType.CHARACTER]: 1,
    [CardType.SHARED]: 2,
    [CardType.MONSTER]: 3,
    [CardType.FORBIDDEN]: 4
  };

  return [...cards].sort((a, b) => {
    // First sort by card type
    const typeComparison = typeOrder[a.type] - typeOrder[b.type];
    if (typeComparison !== 0) {
      return typeComparison;
    }

    // For character cards, sort by starting card vs hirameki card
    if (a.type === CardType.CHARACTER && b.type === CardType.CHARACTER) {
      // Starting cards come before hirameki cards
      const aIsStarting = a.isStartingCard ?? false;
      const bIsStarting = b.isStartingCard ?? false;
      
      if (aIsStarting && !bIsStarting) return -1;
      if (!aIsStarting && bIsStarting) return 1;
    }

    // Within same type and subtype, maintain stable order by id
    return a.id.localeCompare(b.id);
  });
}