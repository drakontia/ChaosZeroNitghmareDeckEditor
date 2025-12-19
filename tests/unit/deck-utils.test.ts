import { describe, it, expect, beforeEach } from 'vitest';
import { getCardInfo, calculateFaintMemory } from '../../lib/deck-utils';
import { CardType, CardCategory, CardStatus, GodType, DeckCard, Deck, HiramekiVariation } from '@/types';

describe('getCardInfo', () => {
  let baseCard: DeckCard;

  beforeEach(() => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 5,
      description: 'Base description',
      statuses: [CardStatus.OPENING]
    };
    
    const variation1: HiramekiVariation = {
      level: 1,
      cost: 6,
      description: 'Hirameki level 1',
      egoVariations: {
        3: {
          description: 'Ego level 3 variant',
          cost: 7
        }
      },
      potentialVariation: {
        description: 'Potential variant',
        cost: 8
      }
    };

    baseCard = {
      deckId: 'test-1',
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 0,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false,
      hiramekiVariations: [variation, variation1]
    };
  });

  it('should return base card info', () => {
    const info = getCardInfo(baseCard);
    expect(info.cost).toBe(5);
    expect(info.description).toBe('Base description');
    expect(info.statuses).toContain(CardStatus.OPENING);
  });

  it('should return hirameki level 1 info', () => {
    baseCard.selectedHiramekiLevel = 1;
    const info = getCardInfo(baseCard);
    expect(info.cost).toBe(6);
    expect(info.description).toBe('Hirameki level 1');
  });

  it('should apply ego level variation', () => {
    baseCard.selectedHiramekiLevel = 1;
    const info = getCardInfo(baseCard, 3);
    expect(info.cost).toBe(7);
    expect(info.description).toBe('Ego level 3 variant');
  });

  it('should apply potential variation', () => {
    baseCard.selectedHiramekiLevel = 1;
    const info = getCardInfo(baseCard, 0, true);
    expect(info.cost).toBe(8);
    expect(info.description).toBe('Potential variant');
  });

  it('should apply god hirameki modifier', () => {
    baseCard.selectedHiramekiLevel = 1;
    baseCard.godHiramekiType = GodType.KILKEN;
    baseCard.godHiramekiEffectId = 'kilken_1';
    const info = getCardInfo(baseCard);
    expect(info.cost).toBe(5); // 6 + (-1) cost modifier
    expect(info.description).toContain('Hirameki level 1');
    expect(info.description).toContain('攻撃時、追加ダメージを与える');
  });

  it('should handle missing hirameki variations gracefully', () => {
    baseCard.selectedHiramekiLevel = 99; // Out of range
    const info = getCardInfo(baseCard);
    expect(info.cost).toBe(5);
    expect(info.description).toBe('Base description');
  });

  it('should not apply god hirameki to basic cards', () => {
    baseCard.isBasicCard = true;
    baseCard.selectedHiramekiLevel = 1;
    baseCard.godHiramekiType = GodType.KILKEN;
    baseCard.godHiramekiEffectId = 'kilken_1';
    const info = getCardInfo(baseCard);
    // Should not apply god hirameki effect
    expect(info.description).not.toContain('攻撃時、追加ダメージを与える');
  });
});

describe('calculateFaintMemory', () => {
  let baseDeck: Deck;

  beforeEach(() => {
    baseDeck = {
      character: null,
      equipment: {
        weapon: null,
        armor: null,
        pendant: null
      },
      cards: [],
      egoLevel: 0,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };
  });

  it('should return 0 for empty deck', () => {
    expect(calculateFaintMemory(baseDeck)).toBe(0);
  });

  it('should return 0 for character cards', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    baseDeck.cards.push({
      deckId: '1',
      id: 'char-1',
      name: 'Character Card',
      type: CardType.CHARACTER,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 0,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    expect(calculateFaintMemory(baseDeck)).toBe(0);
  });

  it('should add 20pt for shared card', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    baseDeck.cards.push({
      deckId: '1',
      id: 'shared-1',
      name: 'Shared Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 0,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    expect(calculateFaintMemory(baseDeck)).toBe(20);
  });

  it('should add 80pt for monster card', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    baseDeck.cards.push({
      deckId: '1',
      id: 'monster-1',
      name: 'Monster Card',
      type: CardType.MONSTER,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 0,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    expect(calculateFaintMemory(baseDeck)).toBe(80);
  });

  it('should add 20pt for forbidden card', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    baseDeck.cards.push({
      deckId: '1',
      id: 'forbidden-1',
      name: 'Forbidden Card',
      type: CardType.FORBIDDEN,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 0,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    expect(calculateFaintMemory(baseDeck)).toBe(20);
  });

  it('should add 10pt for hirameki on shared/monster card', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    baseDeck.cards.push({
      deckId: '1',
      id: 'shared-1',
      name: 'Shared Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 2, // Has hirameki
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    expect(calculateFaintMemory(baseDeck)).toBe(30); // 20 + 10
  });

  it('should add 20pt for god hirameki', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    baseDeck.cards.push({
      deckId: '1',
      id: 'shared-1',
      name: 'Shared Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 0,
      godHiramekiType: GodType.KILKEN,
      godHiramekiEffectId: 'kilken_1',
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    expect(calculateFaintMemory(baseDeck)).toBe(40); // 20 (shared) + 20 (god)
  });

  it('should calculate removed cards correctly', () => {
    baseDeck.removedCards.set('card-1', 1);
    baseDeck.removedCards.set('card-2', 2);
    baseDeck.removedCards.set('card-3', 3);
    baseDeck.removedCards.set('card-4', 4);
    baseDeck.removedCards.set('card-5', 5);
    
    expect(calculateFaintMemory(baseDeck)).toBe(0 + 10 + 30 + 50 + 70);
  });

  it('should add +20 for first removed character card', () => {
    baseDeck.removedCards.set('char_card_1', 1);
    expect(calculateFaintMemory(baseDeck)).toBe(20);
  });

  it('should add +20 for removed character card even when count is 2', () => {
    baseDeck.removedCards.set('char_card_1', 2);
    expect(calculateFaintMemory(baseDeck)).toBe(20);
  });

  it('should add +20 for removed character card even when count is 3', () => {
    baseDeck.removedCards.set('char_card_1', 3);
    expect(calculateFaintMemory(baseDeck)).toBe(20);
  });

  it('should calculate copied cards correctly', () => {
    baseDeck.copiedCards.set('card-1', 1);
    baseDeck.copiedCards.set('card-2', 2);
    baseDeck.copiedCards.set('card-3', 3);
    
    expect(calculateFaintMemory(baseDeck)).toBe(0 + 10 + 30);
  });

  it('should add 10pt for each converted card', () => {
    baseDeck.convertedCards.set('card-1', 'converted-1');
    baseDeck.convertedCards.set('card-2', 'converted-2');
    baseDeck.convertedCards.set('card-3', 'converted-3');
    
    expect(calculateFaintMemory(baseDeck)).toBe(30);
  });

  it('should calculate combined faint memory correctly', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    // Add 1 shared card with hirameki and god hirameki
    baseDeck.cards.push({
      deckId: '1',
      id: 'shared-1',
      name: 'Shared Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      selectedHiramekiLevel: 2,
      godHiramekiType: GodType.KILKEN,
      godHiramekiEffectId: 'kilken_1',
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    // 20 (shared) + 10 (hirameki) + 20 (god hirameki) = 50

    // Add removed card
    baseDeck.removedCards.set('card-1', 2); // +10

    // Add converted card
    baseDeck.convertedCards.set('card-2', 'converted-2'); // +10

    expect(calculateFaintMemory(baseDeck)).toBe(70);
  });

  it('should handle multiple cards of same type', () => {
    const variation: HiramekiVariation = {
      level: 0,
      cost: 0,
      description: ''
    };
    
    baseDeck.cards.push(
      {
        deckId: '1',
        id: 'shared-1',
        name: 'Shared Card 1',
        type: CardType.SHARED,
        category: CardCategory.ATTACK,
        statuses: [],
        selectedHiramekiLevel: 0,
        godHiramekiType: null,
        godHiramekiEffectId: null,
        isBasicCard: false,
        hiramekiVariations: [variation]
      },
      {
        deckId: '2',
        id: 'shared-2',
        name: 'Shared Card 2',
        type: CardType.SHARED,
        category: CardCategory.ATTACK,
        statuses: [],
        selectedHiramekiLevel: 0,
        godHiramekiType: null,
        godHiramekiEffectId: null,
        isBasicCard: false,
        hiramekiVariations: [variation]
      }
    );

    expect(calculateFaintMemory(baseDeck)).toBe(40); // 20 + 20
  });
});
