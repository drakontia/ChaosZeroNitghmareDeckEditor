import { CardType, DeckCard, Deck } from "@/types";
import { GOD_HIRAMEKI_EFFECTS } from "@/lib/god-hirameki";
import { getCardById } from "@/lib/data";

// Helper function to get card info based on hirameki level and god hirameki
export function getCardInfo(
  card: DeckCard,
  egoLevel: number = 0,
  hasPotential: boolean = false,
  convertedCards?: Map<string, string>
): {
  cost: number;
  description: string;
  statuses?: string[]; // Return raw status array for translation
} {
  // If this card has been converted, use the target card's variations for info
  const convertedId = convertedCards?.get(card.id);
  const baseCard = convertedId ? (getCardById(convertedId) ?? card) : card;

  const variation = baseCard.hiramekiVariations[card.selectedHiramekiLevel] || baseCard.hiramekiVariations[0];
  
  let cost = variation.cost;
  let description = variation.description;
  const statuses = variation.statuses && variation.statuses.length > 0 
    ? variation.statuses
    : undefined;

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
      if (effect.costModifier !== undefined) {
        cost += effect.costModifier;
      }
    }
  }

  return { cost, description, statuses };
}

// Calculate Faint Memory points based on deck edits
export function calculateFaintMemory(deck: Deck): number {
  let points = 0;

  // Points for cards in the deck
  for (const card of deck.cards) {
    // Character cards: 0pt (base cards, no points)
    if (card.type === CardType.CHARACTER) {
      continue;
    }
    
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

    // God Hirameki: +20pt (for all cards including character cards)
    // If shared/monster, also add the +10pt from hirameki above
    if (card.godHiramekiType) {
      points += 20;
    }
  }

  // Points for removed cards
  for (const [cardId, count] of deck.removedCards.entries()) {
    const removedCard = getCardById(cardId);
    const isCharacter = removedCard?.type === CardType.CHARACTER;

    // Character card removal: +20pt regardless of removal count
    if (isCharacter) {
      points += 20;
      continue;
    }

    // Non-character removal follows escalating points
    if (count === 1) {
      points += 0;
    } else if (count === 2) {
      points += 10;
    } else if (count === 3) {
      points += 30;
    } else if (count === 4) {
      points += 50;
    } else if (count >= 5) {
      points += 70;
    }
  }

  // Points for copied cards
  for (const [cardId, count] of deck.copiedCards.entries()) {
    if (count === 1) {
      points += 0;
    } else if (count === 2) {
      points += 10;
    } else if (count === 3) {
      points += 30;
    } else if (count === 4) {
      points += 50;
    } else if (count >= 5) {
      points += 70;
    }
  }

  // Points for converted cards: +10pt each
  if (deck.convertedCards.size > 0) {
    points += deck.convertedCards.size * 10;
  }

  return points;}