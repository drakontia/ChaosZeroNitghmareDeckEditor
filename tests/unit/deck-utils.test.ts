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
      statuses: [CardStatus.INITIATION]
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
    expect(info.statuses).toContain(CardStatus.INITIATION);
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
    baseCard.godHiramekiEffectId = 'godhirameki_3'; // Cost -1 effect
    const info = getCardInfo(baseCard);
    expect(info.cost).toBe(5); // 6 + (-1) cost modifier
    expect(info.description).toContain('Hirameki level 1');
    expect(info.description).toContain('このカードのコスト1減少');
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
    baseCard.godHiramekiEffectId = 'godhirameki_3';
    const info = getCardInfo(baseCard);
    // Should not apply god hirameki effect
    expect(info.description).not.toContain('このカードのコスト1減少');
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
      godHiramekiEffectId: 'godhirameki_1',
      isBasicCard: false,
      hiramekiVariations: [variation]
    });
    expect(calculateFaintMemory(baseDeck)).toBe(40); // 20 (shared) + 20 (god)
  });

  it('should calculate removed cards correctly', () => {
    // Sequential removal: 1st=0, 2nd=10, 3rd=30, 4th=50, 5th+=70
    // card-1: 1 removal = removal #1 = 0
    // card-2: 2 removals = removal #2, #3 = 10 + 30 = 40
    // card-3: 3 removals = removal #4, #5, #6 = 50 + 70 + 70 = 190
    // card-4: 4 removals = removal #7-10 = 70 * 4 = 280
    // card-5: 5 removals = removal #11-15 = 70 * 5 = 350
    // total = 0 + 40 + 190 + 280 + 350 = 860
    baseDeck.removedCards.set('card-1', 1);
    baseDeck.removedCards.set('card-2', 2);
    baseDeck.removedCards.set('card-3', 3);
    baseDeck.removedCards.set('card-4', 4);
    baseDeck.removedCards.set('card-5', 5);
    
    expect(calculateFaintMemory(baseDeck)).toBe(860);
  });

  it('should add +20 for first removed character card', () => {
    baseDeck.removedCards.set('luke_starting_1', 1);
    expect(calculateFaintMemory(baseDeck)).toBe(20);
  });

  it('should add +30 for second removed character card', () => {
    // card-1: 1 removal = removal #1 = 0
    // luke_starting_1: 2 removals = removal #2, #3 = (10+20) + (30+20) = 30 + 50 = 80
    baseDeck.removedCards.set('card-1', 1);
    baseDeck.removedCards.set('luke_starting_1', 2);
    expect(calculateFaintMemory(baseDeck)).toBe(80); // 0 + (10+20) + (30+20)
  });

  it('should add removal points for third removed character card', () => {
    // card-1: 1 removal = removal #1 = 0
    // card-2: 2 removals = removal #2, #3 = 10 + 30 = 40
    // luke_starting_1: 3 removals = removal #4, #5, #6 = (50+20) + (70+20) + (70+20) = 70 + 90 + 90 = 250
    baseDeck.removedCards.set('card-1', 1);
    baseDeck.removedCards.set('card-2', 2);
    baseDeck.removedCards.set('luke_starting_1', 3);
    expect(calculateFaintMemory(baseDeck)).toBe(290); // 0 + (10+30) + (50+20) + (70+20) + (70+20)
  });

    it('should add removal points for 3 different character cards', () => {
    // luke_starting_1: 1 removal = removal #1 = (0+20) = 20
    // luke_starting_2: 2 removals = removal #2, #3 = (10+20) + (30+20) = 30 + 50 = 80
    // luke_starting_3: 3 removals = removal #4, #5, #6 = (50+20) + (70+20) + (70+20) = 70 + 90 + 90 = 250
    baseDeck.removedCards.set('luke_starting_1', 1);
    baseDeck.removedCards.set('luke_starting_2', 2);
    baseDeck.removedCards.set('luke_starting_3', 3);
    expect(calculateFaintMemory(baseDeck)).toBe(350); // 20 + 80 + 250
  });

  it('should add +80 for removed 4 different character cards', () => {
    // 4つの異なるキャラクターカードを1回ずつ削除
    // 1番目の削除: 0 + 20 = 20
    // 2番目の削除: 10 + 20 = 30
    // 3番目の削除: 30 + 20 = 50
    // 4番目の削除: 50 + 20 = 70 (but basePoints 50, so capped at 50? no, should be 50+20=70)
    // wait, removalIndex goes 1,2,3,4 so: 0+20, 10+20, 30+20, 50+20 = 20+30+50+70=170
    baseDeck.removedCards.set('luke_starting_1', 1);
    baseDeck.removedCards.set('luke_starting_2', 1);
    baseDeck.removedCards.set('luke_starting_3', 1);
    baseDeck.removedCards.set('luke_starting_4', 1);
    expect(calculateFaintMemory(baseDeck)).toBe(170); // (0+20) + (10+20) + (30+20) + (50+20)
  });

  it('should add +260 for removed 5 different character cards', () => {
    // 5つの異なるキャラクターカードを1回ずつ削除
    // 1番目: 0 + 20 = 20
    // 2番目: 10 + 20 = 30
    // 3番目: 30 + 20 = 50
    // 4番目: 50 + 20 = 70
    // 5番目: 70 + 20 = 90
    baseDeck.removedCards.set('luke_starting_1', 1);
    baseDeck.removedCards.set('luke_starting_2', 1);
    baseDeck.removedCards.set('luke_starting_3', 1);
    baseDeck.removedCards.set('luke_starting_4', 1);
    baseDeck.removedCards.set('luke_hirameki_1', 1);
    expect(calculateFaintMemory(baseDeck)).toBe(260); // (0+20) + (10+20) + (30+20) + (50+20) + (70+20)
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
      godHiramekiEffectId: 'godhirameki_1',
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
