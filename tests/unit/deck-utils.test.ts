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

  it('should calculate removed cards correctly with multiple removals per card', () => {
    // Sequential removal: 1st=0, 2nd=10, 3rd=30, 4th=50, 5th+=70
    // Total 15 removals (1+2+3+4+5):
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
    // Sequential copy: 1st=0, 2nd=10, 3rd=30, 4th=50, 5th+=70
    // card-1: 1 copy = copy #1 = 0
    // card-2: 2 copies = copy #2, #3 = 10 + 30 = 40
    // card-3: 3 copies = copy #4, #5, #6 = 50 + 70 + 70 = 190
    // total = 0 + 40 + 190 = 230
    baseDeck.copiedCards.set('card-1', 1);
    baseDeck.copiedCards.set('card-2', 2);
    baseDeck.copiedCards.set('card-3', 3);
    
    expect(calculateFaintMemory(baseDeck)).toBe(230);
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

    // Add removed card: card-1 removed 2 times = removal #1, #2 = 0 + 10 = 10
    baseDeck.removedCards.set('card-1', 2);

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

describe('calculateFaintMemory (removed/copied attribute handling)', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = {
      character: null,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 0,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };
  });

  it('should NOT add shared/monster/god/hirameki points for removed cards (only sequence base points apply)', () => {
    // 1st removal (shared): base 0
    deck.removedCards.set('shared_01', 1);
    expect(calculateFaintMemory(deck)).toBe(0);

    // 1st + 2nd removal (shared + monster): 0 + 10 = 10
    deck.removedCards.clear();
    deck.removedCards.set('shared_01', 1);
    deck.removedCards.set('monster_01', 1);
    expect(calculateFaintMemory(deck)).toBe(10);

    // Two removals of a shared card: 0 + 10 = 10
    deck.removedCards.clear();
    deck.removedCards.set('shared_01', 2);
    expect(calculateFaintMemory(deck)).toBe(10);
  });

  it('should NOT add shared/monster/god/hirameki points for copied cards (only sequence base points apply)', () => {
    // 1st copy (shared): base 0
    deck.copiedCards.set('shared_01', 1);
    expect(calculateFaintMemory(deck)).toBe(0);
  });
});

describe('calculateFaintMemory (snapshot attribute handling)', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = {
      character: null,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 0,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };
  });

  it('should add attribute points for removed cards when snapshot provided', () => {
    // Removed shared card with hirameki level 2 and god effect, count=2
    deck.removedCards.set('shared_01', {
      count: 2,
      type: CardType.SHARED,
      selectedHiramekiLevel: 2,
      godHiramekiType: GodType.KILKEN,
      godHiramekiEffectId: 'godhirameki_1',
      isBasicCard: false
    });

    // Sequence base points: removal #1=0, #2=10 => 10
    // Attribute points: shared(20)+hirameki(10)+god(20)=50
    // Total expected: 10 + 50 = 60
    expect(calculateFaintMemory(deck)).toBe(60);
  });

  it('should add attribute points for copied cards when snapshot provided', () => {
    // Copied monster card with hirameki level 1, no god, count=3
    deck.copiedCards.set('monster_01', {
      count: 3,
      type: CardType.MONSTER,
      selectedHiramekiLevel: 1,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false
    });

    // Sequence base points: copy #1=0, #2=10, #3=30 => 40
    // Attribute points: monster(80)+hirameki(10)=90
    // Total expected: 40 + 90 = 130
    expect(calculateFaintMemory(deck)).toBe(130);
  });

  it('should add conversion points with snapshot attributes', () => {
    // Convert shared card (with hirameki Lv1 and god) to monster card (with hirameki Lv2 and no god)
    // Original shared card: ヒラメキLv1 + 神ヒラメキ有り
    // Converted-to monster card in deck: ヒラメキLv2
    deck.cards = [
      {
        id: 'monster_01',
        deckId: 'monster_01_001',
        name: 'モンスター1',
        type: CardType.MONSTER,
        category: CardCategory.ATTACK,
        statuses: [],
        selectedHiramekiLevel: 2,
        godHiramekiType: null,
        godHiramekiEffectId: null,
        isBasicCard: false,
        hiramekiVariations: [
          {
            level: 0,
            cost: 5,
            description: 'モンスター説明'
          }
        ]
      }
    ];

    deck.convertedCards.set('shared_01', {
      convertedToId: 'monster_01',
      originalType: CardType.SHARED,
      selectedHiramekiLevel: 1,
      godHiramekiType: GodType.KILKEN,
      godHiramekiEffectId: 'kilken_01',
      isBasicCard: false
    });

    // Deck card points: type(80) + hirameki(10) = 90
    // Base conversion: +10pt
    // Original card preserved points: hirameki(10) + god(20) = 30
    // Total: 90 + 10 + 30 = 130
    expect(calculateFaintMemory(deck)).toBe(130);
  });

  it('should preserve conversion points even after converted card is removed', () => {
    // Convert shared card with hirameki to monster, then remove the monster
    // Original shared card: ヒラメキLv1
    deck.cards = []; // Monster card removed from deck

    deck.convertedCards.set('shared_01', {
      convertedToId: 'monster_01',
      originalType: CardType.SHARED,
      selectedHiramekiLevel: 1,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false
    });

    // Base conversion: +10pt
    // Converted-to card not in deck: no points
    // Original card preserved points: hirameki(10) = 10
    // Total: 10 + 0 + 10 = 20
    expect(calculateFaintMemory(deck)).toBe(20);
  });
});

describe('calculateFaintMemory (copy double-counting issue)', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = {
      character: null,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 0,
      hasPotential: false,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };
  });

  it('should NOT double-count points when original card remains in deck after copy', () => {
    // Shared card with hirameki level 1 in deck
    deck.cards = [
      {
        id: 'shared_01',
        deckId: 'shared_01_original',
        name: 'Shared Card',
        type: CardType.SHARED,
        category: CardCategory.ATTACK,
        statuses: [],
        selectedHiramekiLevel: 1,
        godHiramekiType: null,
        godHiramekiEffectId: null,
        isBasicCard: false,
        hiramekiVariations: [
          {
            level: 0,
            cost: 5,
            description: 'Base'
          }
        ]
      }
    ];

    // Then copy it (card remains in deck, plus a copy is added)
    deck.copiedCards.set('shared_01', {
      count: 1,
      type: CardType.SHARED,
      selectedHiramekiLevel: 1,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false
    });

    // Expected calculation:
    // Original card in deck: type(20) + hirameki(10) = 30
    // Copy sequence: copy #1 = base 0
    // Copy snapshot should NOT add type/hirameki points since original is still in deck
    // Expected: 30 + 0 = 30
    
    const points = calculateFaintMemory(deck);
    
    // Fixed: Should not double-count when original is in deck
    expect(points).toBe(30);
  });

  it('should count snapshot points only when copy is made AFTER removing original from deck', () => {
    // Scenario: Card was copied while in deck with certain attributes, then original was removed
    // In this case, we should count the snapshot attributes
    
    deck.cards = []; // Original card removed from deck

    deck.copiedCards.set('shared_01', {
      count: 1,
      type: CardType.SHARED,
      selectedHiramekiLevel: 1,
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false
    });

    // Copy sequence: copy #1 = base 0
    // Copy snapshot: type(20) + hirameki(10) = 30
    // Total: 0 + 30 = 30
    expect(calculateFaintMemory(deck)).toBe(30);
  });

  it('should NOT double-count when copy has different attributes than current deck card', () => {
    // Card was copied at hirameki Lv1, then original was upgraded to Lv2
    deck.cards = [
      {
        id: 'shared_01',
        deckId: 'shared_01_original',
        name: 'Shared Card',
        type: CardType.SHARED,
        category: CardCategory.ATTACK,
        statuses: [],
        selectedHiramekiLevel: 2, // Now at Lv2
        godHiramekiType: null,
        godHiramekiEffectId: null,
        isBasicCard: false,
        hiramekiVariations: [
          {
            level: 0,
            cost: 5,
            description: 'Base'
          }
        ]
      }
    ];

    // Copy was made when card was at Lv1
    deck.copiedCards.set('shared_01', {
      count: 1,
      type: CardType.SHARED,
      selectedHiramekiLevel: 1, // Copied at Lv1
      godHiramekiType: null,
      godHiramekiEffectId: null,
      isBasicCard: false
    });

    // Current deck card: type(20) + hirameki(10) = 30
    // Copy sequence: copy #1 = base 0
    // Copy snapshot should NOT be added since original is still in deck
    // Expected: 30 + 0 = 30
    
    const points = calculateFaintMemory(deck);
    
    // Fixed: Should only count once even with different attributes
    expect(points).toBe(30);
  });

  it('should handle multiple copies with original still in deck', () => {
    // Original card in deck
    deck.cards = [
      {
        id: 'monster_01',
        deckId: 'monster_01_original',
        name: 'Monster Card',
        type: CardType.MONSTER,
        category: CardCategory.ATTACK,
        statuses: [],
        selectedHiramekiLevel: 2,
        godHiramekiType: GodType.KILKEN,
        godHiramekiEffectId: 'godhirameki_1',
        isBasicCard: false,
        hiramekiVariations: [
          {
            level: 0,
            cost: 5,
            description: 'Base'
          }
        ]
      }
    ];

    // Made 3 copies
    deck.copiedCards.set('monster_01', {
      count: 3,
      type: CardType.MONSTER,
      selectedHiramekiLevel: 2,
      godHiramekiType: GodType.KILKEN,
      godHiramekiEffectId: 'godhirameki_1',
      isBasicCard: false
    });

    // Current deck card: type(80) + hirameki(10) + god(20) = 110
    // Copy sequence: copy #1=0, #2=10, #3=30 = 40
    // Copy snapshot should NOT be added since original is in deck
    // Expected: 110 + 40 = 150
    
    const points = calculateFaintMemory(deck);
    
    // Fixed: snapshot should not add type/hirameki/god if original in deck
    expect(points).toBe(150);
  });

  it('should handle undo copy correctly - removing copy should clear copiedCards entry', () => {
    // This tests the interaction with useDeckBuilder's undoCard function
    // When a copied card is undone, the copiedCards count should decrease
    
    // Original card in deck
    deck.cards = [
      {
        id: 'shared_01',
        deckId: 'shared_01_original',
        name: 'Shared Card',
        type: CardType.SHARED,
        category: CardCategory.ATTACK,
        statuses: [],
        selectedHiramekiLevel: 1,
        godHiramekiType: null,
        godHiramekiEffectId: null,
        isBasicCard: false,
        hiramekiVariations: [
          {
            level: 0,
            cost: 5,
            description: 'Base'
          }
        ]
      }
    ];

    // Copy was made and then undone (copiedCards should be empty/0)
    // This represents the state AFTER undo
    deck.copiedCards.clear();

    // Only original card points should count
    // type(20) + hirameki(10) = 30
    expect(calculateFaintMemory(deck)).toBe(30);
  });
});