"use client";
import { useTranslations } from 'next-intl';
import { CardFrame } from './CardFrame';
import { HiramekiControls } from './HiramekiControls';
import { CardActionsMenu } from './CardActionsMenu';

import { DeckCard, GodType } from "@/types";
import { Card as UiCard } from "./ui/card";
import { getCardInfo } from "@/lib/deck-utils";

interface DeckDisplayProps {
  cards: DeckCard[];
  egoLevel: number;
  hasPotential: boolean;
  onRemoveCard: (deckId: string) => void;
  onUndoCard: (deckId: string) => void;
  onCopyCard: (deckId: string) => void;
  onConvertCard: (deckId: string) => void;
  onUpdateHirameki: (deckId: string, hiramekiLevel: number) => void;
  onSetGodHirameki: (deckId: string, godType: GodType | null) => void;
}

export function DeckDisplay({ cards, egoLevel, hasPotential, onRemoveCard, onUndoCard, onCopyCard, onConvertCard, onUpdateHirameki, onSetGodHirameki }: DeckDisplayProps) {
  const t = useTranslations();

  // Helper function to get translated card name
  const getTranslatedCardName = (card: DeckCard) =>
    t(`cards.${card.id}.name`, { defaultValue: card.name });

  if (cards.length === 0) {
    return (
      <UiCard className="border-dashed border-2 p-10 text-center text-muted-foreground">
        キャラクターを選択すると開始カードが表示されます
      </UiCard>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const cardInfo = getCardInfo(card, egoLevel, hasPotential);
        const isBasicCard = card.isBasicCard === true;
        const translatedName = getTranslatedCardName(card);

        const leftControls = !isBasicCard ? (
          <HiramekiControls
            card={card}
            egoLevel={egoLevel}
            hasPotential={hasPotential}
            translatedName={translatedName}
            onUpdateHirameki={onUpdateHirameki}
            onSetGodHirameki={onSetGodHirameki}
          />
        ) : undefined;

        return (
          <UiCard key={card.deckId}>
            <CardFrame
              imgUrl={card.imgUrl}
              alt={translatedName}
              cost={cardInfo.cost}
              name={translatedName}
              category={t(`category.${card.category}`)}
              description={t(`cards.${card.id}.descriptions.${card.selectedHiramekiLevel}`, { defaultValue: cardInfo.description })}
              statuses={cardInfo.statuses?.map(s => t(`status.${s}`))}
              leftControls={leftControls}
              rightControls={
                <CardActionsMenu
                  card={card}
                  onRemoveCard={onRemoveCard}
                  onCopyCard={onCopyCard}
                  onConvertCard={onConvertCard}
                  onUndoCard={onUndoCard}
                />
              }
            />
          </UiCard>
        );
      })}
    </div>
  );
}
