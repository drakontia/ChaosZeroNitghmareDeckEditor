import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDeckBuilder } from '@/hooks/useDeckBuilder';
import { CardStatus, CardType, EquipmentType, GodType, CardCategory } from '@/types';
import * as dataModule from '@/lib/data';

// Mock data module
vi.mock('@/lib/data', () => ({
  getCharacterStartingCards: vi.fn(() => [])
}));

describe('useDeckBuilder', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty deck', () => {
    const { result } = renderHook(() => useDeckBuilder());

    expect(result.current.deck.name).toBe('');
    expect(result.current.deck.character).toBeNull();
    expect(result.current.deck.cards).toEqual([]);
    expect(result.current.deck.egoLevel).toBe(0);
    expect(result.current.deck.hasPotential).toBe(false);
  });

  it('should initialize with provided initial deck', () => {
    const initialDeck = {
      name: 'Test Deck',
      character: { id: 'char-1', name: 'Test Character' } as any,
      equipment: { weapon: null, armor: null, pendant: null },
      cards: [],
      egoLevel: 3,
      hasPotential: true,
      createdAt: new Date(),
      removedCards: new Map(),
      copiedCards: new Map(),
      convertedCards: new Map()
    };

    const { result } = renderHook(() => useDeckBuilder(initialDeck));

    expect(result.current.deck.name).toBe('Test Deck');
    expect(result.current.deck.character?.id).toBe('char-1');
    expect(result.current.deck.egoLevel).toBe(3);
    expect(result.current.deck.hasPotential).toBe(true);
  });

  it('should set deck name', () => {
    const { result } = renderHook(() => useDeckBuilder());

    act(() => {
      result.current.setName('My Deck');
    });

    expect(result.current.deck.name).toBe('My Deck');
  });

  it('should select character', () => {
    const mockCharacter = { id: 'char-1', name: 'Test Character' } as any;
    vi.mocked(dataModule.getCharacterStartingCards).mockReturnValue([]);

    const { result } = renderHook(() => useDeckBuilder());

    act(() => {
      result.current.selectCharacter(mockCharacter);
    });

    expect(result.current.deck.character).toEqual(mockCharacter);
  });

  it('should add card to deck', () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    act(() => {
      result.current.addCard(mockCard);
    });

    expect(result.current.deck.cards).toHaveLength(1);
    expect(result.current.deck.cards[0].id).toBe('card-1');
    expect(result.current.deck.cards[0].selectedHiramekiLevel).toBe(0);
    expect(result.current.deck.cards[0].godHiramekiType).toBeNull();
  });

  it('should prevent duplicate character cards', () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'char-card-1',
      name: 'Character Card',
      type: CardType.CHARACTER,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    act(() => {
      result.current.addCard(mockCard);
      result.current.addCard(mockCard);
    });

    expect(result.current.deck.cards).toHaveLength(1);
  });

  it('should remove card from deck', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.removeCard(deckId);
    });

    expect(result.current.deck.cards).toHaveLength(0);
    const removedEntry = result.current.deck.removedCards.get('card-1');
    expect(typeof removedEntry === 'object' && removedEntry !== null).toBe(true);
    expect((removedEntry as any).count).toBe(1);
  });

  it('should update hirameki level', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      hiramekiVariations: Array(4).fill({})
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.updateCardHirameki(deckId, 2);
    });

    expect(result.current.deck.cards[0].selectedHiramekiLevel).toBe(2);
  });

  it('should set god hirameki', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.setCardGodHirameki(deckId, GodType.KILKEN);
    });

    expect(result.current.deck.cards[0].godHiramekiType).toBe('kilken');
    expect(result.current.deck.cards[0].godHiramekiEffectId).toBeNull();
  });

  it('should set god hirameki effect', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.setCardGodHiramekiEffect(deckId, 'effect-1');
    });

    expect(result.current.deck.cards[0].godHiramekiEffectId).toBe('effect-1');
  });

  it('should copy card', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      isBasicCard: false
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.copyCard(deckId);
    });

    expect(result.current.deck.cards).toHaveLength(2);
    const copiedEntry = result.current.deck.copiedCards.get('card-1');
    expect(typeof copiedEntry === 'object' && copiedEntry !== null).toBe(true);
    expect((copiedEntry as any).count).toBe(1);
    const copied = result.current.deck.cards.find(card => card.isCopied);
    expect(copied?.isCopied).toBe(true);
    expect(copied?.copiedFromCardId).toBe('card-1');
  });

  it('should not copy basic cards', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      isBasicCard: true
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.copyCard(deckId);
    });

    expect(result.current.deck.cards).toHaveLength(1);
  });

  it('should not copy cards when current hirameki variation is UNIQUE', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-unique-hirameki',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: [],
      hiramekiVariations: [
        { level: 0, cost: 0, description: 'base', statuses: [] },
        { level: 1, cost: 1, description: 'unique', statuses: [CardStatus.UNIQUE] }
      ]
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.updateCardHirameki(deckId, 1);
    });

    act(() => {
      result.current.copyCard(deckId);
    });

    expect(result.current.deck.cards).toHaveLength(1);
    expect(result.current.deck.copiedCards.get('card-unique-hirameki')).toBeUndefined();
  });

  it('should convert card', async () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    const targetCard = {
      id: 'card-2',
      name: 'Target Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    let deckId = '';

    act(() => {
      result.current.addCard(mockCard);
    });
    await waitFor(() => expect(result.current.deck.cards).toHaveLength(1));
    deckId = result.current.deck.cards[0].deckId;

    act(() => {
      result.current.convertCard(deckId, targetCard);
    });

    expect(result.current.deck.cards).toHaveLength(1);
    expect(result.current.deck.cards[0].id).toBe('card-2');
    const convertedEntry = result.current.deck.convertedCards.get('card-1');
    expect(convertedEntry).toBeDefined();
    if (typeof convertedEntry === 'object') {
      expect(convertedEntry.convertedToId).toBe('card-2');
      expect(convertedEntry.originalType).toBe('shared');
      expect(convertedEntry.selectedHiramekiLevel).toBe(0);
    }
  });

  it('should clear deck', () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockCard = {
      id: 'card-1',
      name: 'Test Card',
      type: CardType.SHARED,
      category: CardCategory.ATTACK,
      statuses: []
    } as any;

    act(() => {
      result.current.setName('My Deck');
      result.current.addCard(mockCard);
    });

    expect(result.current.deck.cards).toHaveLength(1);

    act(() => {
      result.current.clearDeck();
    });

    expect(result.current.deck.name).toBe('');
    expect(result.current.deck.cards).toHaveLength(0);
    expect(result.current.deck.character).toBeNull();
  });

  it('should toggle potential', () => {
    const { result } = renderHook(() => useDeckBuilder());

    expect(result.current.deck.hasPotential).toBe(false);

    act(() => {
      result.current.togglePotential();
    });

    expect(result.current.deck.hasPotential).toBe(true);

    act(() => {
      result.current.togglePotential();
    });

    expect(result.current.deck.hasPotential).toBe(false);
  });

  it('should set ego level with bounds', () => {
    const { result } = renderHook(() => useDeckBuilder());

    act(() => {
      result.current.setEgoLevel(3);
    });

    expect(result.current.deck.egoLevel).toBe(3);

    act(() => {
      result.current.setEgoLevel(10);
    });

    expect(result.current.deck.egoLevel).toBe(6);

    act(() => {
      result.current.setEgoLevel(-1);
    });

    expect(result.current.deck.egoLevel).toBe(0);
  });

  it('should select equipment by type', () => {
    const { result } = renderHook(() => useDeckBuilder());
    const mockWeapon = { id: 'weapon-1', type: EquipmentType.WEAPON, name: 'Sword' } as any;

    act(() => {
      result.current.selectEquipment(mockWeapon);
    });

    expect(result.current.deck.equipment.weapon).toEqual(mockWeapon);
  });
});
