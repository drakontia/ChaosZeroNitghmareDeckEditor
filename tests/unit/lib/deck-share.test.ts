import { describe, it, expect, beforeEach } from 'vitest';
import { encodeDeckShare, decodeDeckShare } from '@/lib/deck-share';
import { Deck, CardType, CardCategory, GodType, EquipmentType } from '@/types';

describe('deck-share', () => {
  let mockDeck: Deck;

  beforeEach(() => {
    mockDeck = {
      name: 'Test Deck',
      character: {
        id: 'chizuru',
        name: 'character.chizuru',
        job: 'PSIONIC' as any,
        element: 'VOID' as any,
        startingCards: ['char_card_1', 'char_card_2', 'char_card_3', 'char_card_4'],
        hiramekiCards: ['char_hirameki_1', 'char_hirameki_2', 'char_hirameki_3', 'char_hirameki_4'],
        imgUrl: ''
      } as any,
      equipment: {
        weapon: { id: 'weapon_1', name: 'equipment.weapon.weapon_1.name', type: EquipmentType.WEAPON, rarity: 'RARE' },
        armor: null,
        pendant: null
      },
      cards: [
        {
          deckId: 'deck-1',
          id: 'shared_card_1',
          name: '全体攻撃',
          type: CardType.SHARED,
          category: CardCategory.ATTACK,
          statuses: [],
          selectedHiramekiLevel: 0,
          godHiramekiType: null,
          godHiramekiEffectId: null,
          isBasicCard: false,
          isCopied: true,
          copiedFromCardId: 'shared_card_1',
          hiramekiVariations: [
            { level: 0, cost: 5, description: '敵全体に無属性ダメージを与える' }
          ]
        }
      ],
      egoLevel: 2,
      hasPotential: true,
      createdAt: new Date('2024-01-01T12:00:00Z'),
      removedCards: new Map([['removed-1', 2]]),
      copiedCards: new Map([['shared_card_1', 1]]),
      convertedCards: new Map([['original-1', 'converted-1']])
    };
  });

  describe('encodeDeckShare', () => {
    it('should encode deck to base64url string', () => {
      const encoded = encodeDeckShare(mockDeck);

      expect(typeof encoded).toBe('string');
      expect(encoded.length).toBeGreaterThan(0);
      // Base64url should not have + or / or =
      expect(encoded).not.toMatch(/[+/=]/);
    });

    it('should include essential deck data', () => {
      const encoded = encodeDeckShare(mockDeck);
      // The encoded string should be decodable
      expect(() => decodeDeckShare(encoded)).not.toThrow();
    });

    it('should encode deck names with special characters', () => {
      const specialDeck = {
        ...mockDeck,
        name: 'デッキ with !@#$% characters'
      };

      const encoded = encodeDeckShare(specialDeck);
      expect(encoded).not.toMatch(/[+/=]/);
    });

    it('should handle empty deck', () => {
      const emptyDeck: Deck = {
        name: '',
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

      const encoded = encodeDeckShare(emptyDeck);
      expect(typeof encoded).toBe('string');
    });
  });

  describe('decodeDeckShare', () => {
    it('should decode valid encoded string back to deck', () => {
      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded);

      expect(decoded).not.toBeNull();
      expect(decoded!.name).toBe('Test Deck');
      expect(decoded!.character?.id).toBe('chizuru');
      expect(decoded!.egoLevel).toBe(2);
      expect(decoded!.hasPotential).toBe(true);
    });

    it('should preserve card data', () => {
      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded);

      expect(decoded!.cards).toHaveLength(1);
      expect(decoded!.cards[0].id).toBe('shared_card_1');
      expect(decoded!.cards[0].copiedFromCardId).toBe('shared_card_1');
    });

    it('should preserve equipment data', () => {
      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded);

      expect(decoded!.equipment.weapon?.id).toBe('weapon_1');
      expect(decoded!.equipment.armor).toBeNull();
    });

    it('should preserve maps data', () => {
      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded);

      expect(decoded!.removedCards.get('removed-1')).toBe(2);
      expect(decoded!.copiedCards.get('shared_card_1')).toBe(1);
      expect(decoded!.convertedCards.get('original-1')).toBe('converted-1');
    });

    it('should return null for invalid encoded string', () => {
      const decoded = decodeDeckShare('invalid');
      expect(decoded).toBeNull();
    });

    it('should return null for malformed base64', () => {
      const decoded = decodeDeckShare('!!!invalid!!!');
      expect(decoded).toBeNull();
    });

    it('should handle createdAt as ISO string', () => {
      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded);

      expect(decoded!.createdAt).toBeInstanceOf(Date);
      expect(decoded!.createdAt.toISOString()).toBe('2024-01-01T12:00:00.000Z');
    });
  });

  describe('encoding/decoding round trip', () => {
    it('should maintain data integrity through encode-decode cycle', () => {
      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded)!;

      expect(decoded.name).toBe(mockDeck.name);
      expect(decoded.character?.id).toBe(mockDeck.character?.id);
      expect(decoded.egoLevel).toBe(mockDeck.egoLevel);
      expect(decoded.hasPotential).toBe(mockDeck.hasPotential);
      expect(decoded.cards.length).toBe(mockDeck.cards.length);
    });

    it('should handle deck with multiple cards', () => {
      mockDeck.cards = [
        ...mockDeck.cards,
        {
          deckId: 'deck-2',
          id: 'monster_card_1',
          name: 'モンスター召喚',
          type: CardType.MONSTER,
          category: CardCategory.SKILL,
          statuses: [],
          selectedHiramekiLevel: 1,
          godHiramekiType: 'kilken' as GodType,
          godHiramekiEffectId: 'effect-1',
          isBasicCard: false,
          hiramekiVariations: [
            { level: 0, cost: 4, description: 'モンスターを召喚して攻撃' }
          ]
        }
      ];

      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded);

      expect(decoded!.cards).toHaveLength(2);
      expect(decoded!.cards[1].selectedHiramekiLevel).toBe(1);
      expect(decoded!.cards[1].godHiramekiType).toBe('kilken' as GodType);
    });

    it('should handle high ego levels', () => {
      mockDeck.egoLevel = 6;

      const encoded = encodeDeckShare(mockDeck);
      const decoded = decodeDeckShare(encoded);

      expect(decoded!.egoLevel).toBe(6);
    });
  });

  describe('URL encoding safety', () => {
    it('should produce URL-safe characters', () => {
      const encoded = encodeDeckShare(mockDeck);
      
      // Test that it's safe for URL
      const testUrl = `https://example.com/deck/${encoded}`;
      expect(() => new URL(testUrl)).not.toThrow();
    });

    it('should produce reasonably short encoded strings', () => {
      const encoded = encodeDeckShare(mockDeck);
      // Encoded string should be reasonably short (less than 1000 chars for typical decks)
      expect(encoded.length).toBeLessThan(1000);
    });
  });
});
