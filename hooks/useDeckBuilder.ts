"use client";

import { useState, useCallback, useEffect } from "react";
import { Character, Equipment, CznCard, DeckCard, Deck, EquipmentType, GodType, CardType, CardStatus, RemovedCardEntry, CopiedCardEntry, ConvertedCardEntry } from "@/types";
import { getCharacterStartingCards } from "@/lib/data";
import { sortDeckCards } from "@/lib/deck-utils";

const createEmptyDeck = (): Deck => ({
  name: "",
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
});

export function useDeckBuilder(initialDeck?: Deck) {
  const [deck, setDeck] = useState<Deck>(() => initialDeck ?? createEmptyDeck());

  useEffect(() => {
    if (initialDeck) {
      setDeck(initialDeck);
    }
  }, [initialDeck]);

  const selectCharacter = useCallback((character: Character) => {
    setDeck(prev => {
      // Get starting cards for the character
      const startingCards = getCharacterStartingCards(character);
      const deckCards: DeckCard[] = startingCards.map(card => ({
        ...card,
        deckId: `${card.id}_${Date.now()}_${Math.random()}`,
        selectedHiramekiLevel: 0,
        godHiramekiType: null,
        godHiramekiEffectId: null
      }));

      return {
        ...prev,
        character,
        cards: deckCards,
        removedCards: new Map(),
        copiedCards: new Map(),
        convertedCards: new Map()
      };
    });
  }, []);

  const selectEquipment = useCallback((equipment: Equipment | null, type?: EquipmentType) => {
    setDeck(prev => {
      const newEquipment = { ...prev.equipment };
      const targetType = equipment?.type ?? type;
      switch (targetType) {
        case EquipmentType.WEAPON:
          newEquipment.weapon = equipment;
          break;
        case EquipmentType.ARMOR:
          newEquipment.armor = equipment;
          break;
        case EquipmentType.PENDANT:
          newEquipment.pendant = equipment;
          break;
      }
      return {
        ...prev,
        equipment: newEquipment
      };
    });
  }, []);

  const addCard = useCallback((card: CznCard) => {
    setDeck(prev => {
      // Check if hirameki card already exists in deck or has been removed
      if (card.type === CardType.CHARACTER) {
        const alreadyExists = prev.cards.some(c => c.id === card.id);
        const hasBeenRemoved = prev.removedCards.has(card.id);
        if (alreadyExists || hasBeenRemoved) {
          return prev; // Don't add duplicate or removed hirameki card
        }
      }

      const deckCard: DeckCard = {
        ...card,
        deckId: `${card.id}_${Date.now()}_${Math.random()}`,
        selectedHiramekiLevel: 0,
        godHiramekiType: null,
        godHiramekiEffectId: null
      };
      
      const newCards = sortDeckCards([...prev.cards, deckCard]);
      
      return {
        ...prev,
        cards: newCards
      };
    });
  }, []);

  const removeCard = useCallback((deckId: string) => {
    setDeck(prev => {
      // Find the card being removed
      const cardToRemove = prev.cards.find(card => card.deckId === deckId);
      if (!cardToRemove) return prev;

      // Update removedCards with snapshot
      const newRemovedCards = new Map(prev.removedCards);
      const entry = newRemovedCards.get(cardToRemove.id);
      const currentCount = typeof entry === 'number' ? entry : (entry?.count || 0);
      
      // Save snapshot with card attributes at removal time
      const snapshot: RemovedCardEntry = {
        count: currentCount + 1,
        type: cardToRemove.type,
        selectedHiramekiLevel: cardToRemove.selectedHiramekiLevel,
        godHiramekiType: cardToRemove.godHiramekiType,
        godHiramekiEffectId: cardToRemove.godHiramekiEffectId,
        isBasicCard: cardToRemove.isBasicCard
      };
      newRemovedCards.set(cardToRemove.id, snapshot);

      return {
        ...prev,
        cards: prev.cards.filter(card => card.deckId !== deckId),
        removedCards: newRemovedCards
      };
    });
  }, []);

  const restoreCard = useCallback((card: CznCard) => {
    setDeck(prev => {
      // If this is an ORIGINAL that has been converted, revert conversion
      const convertedId = prev.convertedCards.get(card.id);
      if (convertedId) {
        const newConvertedCards = new Map(prev.convertedCards);
        newConvertedCards.delete(card.id);

        // Replace the converted card in the deck with the original
        const convertedIndex = prev.cards.findIndex(c => c.id === convertedId);
        const restoredDeckCard: DeckCard = {
          ...card,
          deckId: `${card.id}_${Date.now()}_${Math.random()}`,
          selectedHiramekiLevel: 0,
          godHiramekiType: null,
          godHiramekiEffectId: null
        };

        if (convertedIndex !== -1) {
          const newCards = [...prev.cards];
          newCards[convertedIndex] = restoredDeckCard;
          return {
            ...prev,
            cards: sortDeckCards(newCards),
            convertedCards: newConvertedCards
          };
        }

        // Converted card is no longer in deck; add the original back
        return {
          ...prev,
          cards: sortDeckCards([...prev.cards, restoredDeckCard]),
          convertedCards: newConvertedCards
        };
      }

      // For character cards, only restore once and remove from removedCards
      if (card.type === CardType.CHARACTER) {
        const newRemovedCards = new Map(prev.removedCards);
        newRemovedCards.delete(card.id);

        const deckCard: DeckCard = {
          ...card,
          deckId: `${card.id}_${Date.now()}_${Math.random()}`,
          selectedHiramekiLevel: 0,
          godHiramekiType: null,
          godHiramekiEffectId: null
        };

        return {
          ...prev,
          cards: sortDeckCards([...prev.cards, deckCard]),
          removedCards: newRemovedCards
        };
      }

      // For non-character cards, use regular addCard behavior
      const deckCard: DeckCard = {
        ...card,
        deckId: `${card.id}_${Date.now()}_${Math.random()}`,
        selectedHiramekiLevel: 0,
        godHiramekiType: null,
        godHiramekiEffectId: null
      };
      return {
        ...prev,
        cards: sortDeckCards([...prev.cards, deckCard])
      };
    });
  }, []);

  const undoCard = useCallback((deckId: string) => {
    setDeck(prev => {
      const cardToUndo = prev.cards.find(card => card.deckId === deckId);
      if (!cardToUndo) return prev;

      // If this is a copied card, decrement the copy count
      if (cardToUndo.isCopied) {
        const newCopiedCards = new Map(prev.copiedCards);
        const entry = newCopiedCards.get(cardToUndo.id);
        const currentCount = typeof entry === 'number' ? entry : (entry?.count || 0);
        if (currentCount > 1) {
          newCopiedCards.set(cardToUndo.id, currentCount - 1);
        } else {
          newCopiedCards.delete(cardToUndo.id);
        }

        return {
          ...prev,
          cards: prev.cards.filter(card => card.deckId !== deckId),
          copiedCards: newCopiedCards
        };
      }

      // For non-copied cards, simply remove from deck
      return {
        ...prev,
        cards: prev.cards.filter(card => card.deckId !== deckId)
      };
    });
  }, []);

  const copyCard = useCallback((deckId: string) => {
    setDeck(prev => {
      const cardToCopy = prev.cards.find(c => c.deckId === deckId);
      if (!cardToCopy || cardToCopy.isBasicCard) {
        return prev; // Can't copy basic cards
      }
      
      const variation = cardToCopy.hiramekiVariations?.[cardToCopy.selectedHiramekiLevel] ?? cardToCopy.hiramekiVariations?.[0];
      const effectiveStatuses = (variation?.statuses && variation.statuses.length > 0)
        ? variation.statuses
        : cardToCopy.statuses;
      
      if (effectiveStatuses?.includes(CardStatus.UNIQUE)) {
        return prev; // Can't copy unique-status cards
      }

      // Create a copy with a new deckId
      const copiedCard: DeckCard = {
        ...cardToCopy,
        deckId: `${cardToCopy.id}_copy_${Date.now()}_${Math.random()}`,
        isCopied: true,
        copiedFromCardId: cardToCopy.copiedFromCardId ?? cardToCopy.id
      };

      // Track in copiedCards Map with snapshot
      const newCopiedCards = new Map(prev.copiedCards);
      const entry = newCopiedCards.get(cardToCopy.id);
      const currentCount = typeof entry === 'number' ? entry : (entry?.count || 0);
      
      // Save snapshot with card attributes at copy time
      const snapshot: CopiedCardEntry = {
        count: currentCount + 1,
        type: cardToCopy.type,
        selectedHiramekiLevel: cardToCopy.selectedHiramekiLevel,
        godHiramekiType: cardToCopy.godHiramekiType,
        godHiramekiEffectId: cardToCopy.godHiramekiEffectId,
        isBasicCard: cardToCopy.isBasicCard
      };
      newCopiedCards.set(cardToCopy.id, snapshot);

      return {
        ...prev,
        cards: sortDeckCards([...prev.cards, copiedCard]),
        copiedCards: newCopiedCards
      };
    });
  }, []);

  const convertCard = useCallback((deckId: string, targetCard: CznCard) => {
    setDeck(prev => {
      const cardToConvert = prev.cards.find(c => c.deckId === deckId);
      if (!cardToConvert) {
        return prev;
      }

      // Create new deck card from target card
      const convertedCard: DeckCard = {
        ...targetCard,
        deckId: `${targetCard.id}_${Date.now()}_${Math.random()}`,
        selectedHiramekiLevel: 0,
        godHiramekiType: null,
        godHiramekiEffectId: null
      };

      // Replace the original card with converted card at the same position
      const cardIndex = prev.cards.findIndex(c => c.deckId === deckId);
      const newCards = [...prev.cards];
      newCards[cardIndex] = convertedCard;

      // Track conversion with snapshot of original card state
      const newConverted = new Map(prev.convertedCards);
      const snapshot: ConvertedCardEntry = {
        convertedToId: targetCard.id,
        originalType: cardToConvert.type,
        selectedHiramekiLevel: cardToConvert.selectedHiramekiLevel,
        godHiramekiType: cardToConvert.godHiramekiType,
        godHiramekiEffectId: cardToConvert.godHiramekiEffectId,
        isBasicCard: cardToConvert.isBasicCard
      };
      newConverted.set(cardToConvert.id, snapshot);

      return {
        ...prev,
        cards: sortDeckCards(newCards),
        convertedCards: newConverted
      };
    });
  }, []);

  const updateCardHirameki = useCallback((deckId: string, hiramekiLevel: number) => {
    setDeck(prev => ({
      ...prev,
      cards: prev.cards.map(card => 
        card.deckId === deckId 
          ? { ...card, selectedHiramekiLevel: hiramekiLevel }
          : card
      )
    }));
  }, []);

  const setCardGodHirameki = useCallback((deckId: string, godType: GodType | null) => {
    setDeck(prev => ({
      ...prev,
      cards: prev.cards.map(card => 
        card.deckId === deckId 
          ? { ...card, godHiramekiType: godType, godHiramekiEffectId: null }
          : card
      )
    }));
  }, []);

  const setCardGodHiramekiEffect = useCallback((deckId: string, effectId: string | null) => {
    setDeck(prev => ({
      ...prev,
      cards: prev.cards.map(card => 
        card.deckId === deckId 
          ? { ...card, godHiramekiEffectId: effectId }
          : card
      )
    }));
  }, []);

  const clearDeck = useCallback(() => {
    setDeck(createEmptyDeck());
  }, []);

  const setName = useCallback((name: string) => {
    setDeck(prev => ({
      ...prev,
      name
    }));
  }, []);

  const setEgoLevel = useCallback((level: number) => {
    setDeck(prev => ({
      ...prev,
      egoLevel: Math.max(0, Math.min(6, level))
    }));
  }, []);

  const togglePotential = useCallback(() => {
    setDeck(prev => ({
      ...prev,
      hasPotential: !prev.hasPotential
    }));
  }, []);

  return {
    deck,
    selectCharacter,
    selectEquipment,
    addCard,
    removeCard,
    restoreCard,
    undoCard,
    copyCard,
    convertCard,
    updateCardHirameki,
    setCardGodHirameki,
    setCardGodHiramekiEffect,
    clearDeck,
    setName,
    setEgoLevel,
    togglePotential
  };
}
