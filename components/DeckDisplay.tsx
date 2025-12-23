"use client";
import { useTranslations } from 'next-intl';
import { CardFrame } from './CardFrame';
import { HiramekiControls } from './HiramekiControls';
import { CardActionsMenu } from './CardActionsMenu';

import { DeckCard, GodType, CznCard, JobType } from "@/types";
import { Card } from "./ui/card";
import { getCardInfo, sortDeckCards } from "@/lib/deck-utils";
import { GOD_HIRAMEKI_EFFECTS } from "@/lib/god-hirameki";

interface DeckDisplayProps {
  cards: DeckCard[];
  egoLevel: number;
  hasPotential: boolean;
  allowedJob?: JobType;
  onRemoveCard: (deckId: string) => void;
  onUndoCard: (deckId: string) => void;
  onCopyCard: (deckId: string) => void;
  onConvertCard: (deckId: string, targetCard: CznCard) => void;
  onUpdateHirameki: (deckId: string, hiramekiLevel: number) => void;
  onSetGodHirameki: (deckId: string, godType: GodType | null) => void;
  onSetGodHiramekiEffect: (deckId: string, effectId: string | null) => void;
}

export function DeckDisplay({ cards, egoLevel, hasPotential, allowedJob, onRemoveCard, onUndoCard, onCopyCard, onConvertCard, onUpdateHirameki, onSetGodHirameki, onSetGodHiramekiEffect }: DeckDisplayProps) {
  const t = useTranslations();

  // Sort cards to maintain consistent order: Character (Starting -> Hirameki) -> Shared -> Monster -> Forbidden
  const sortedCards = sortDeckCards(cards);

  // name translation will be performed in CardFrame using ID

  if (cards.length === 0) {
    return (
      <Card className="border-dashed border-2 p-10 text-center text-muted-foreground">
        {t('deck.selectCharacterHint')}
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {sortedCards.map((card) => {
        const cardInfo = getCardInfo(card, egoLevel, hasPotential);
        const hasNoHirameki = card.hiramekiVariations.length === 1;
        const nameId = `cards.${card.id}.name`;
        const nameFallback = card.name;

        // Pass god effect ID and fallback; CardFrame will translate at render time
        let godEffectId: string | undefined;
        let godEffectFallback: string | undefined;
        if (card.godHiramekiType && card.godHiramekiEffectId) {
          const effect = GOD_HIRAMEKI_EFFECTS.find(e => e.id === card.godHiramekiEffectId);
          if (effect) {
            godEffectId = effect.id;
            godEffectFallback = effect.additionalEffect;
          }
        }

        const leftControls = !hasNoHirameki ? (
          <HiramekiControls
            card={card}
            egoLevel={egoLevel}
            hasPotential={hasPotential}
            onUpdateHirameki={onUpdateHirameki}
            onSetGodHirameki={onSetGodHirameki}
            onSetGodHiramekiEffect={onSetGodHiramekiEffect}
          />
        ) : undefined;

        return (
          <Card key={card.deckId}>
            <CardFrame
              imgUrl={card.imgUrl}
              alt={nameFallback}
              cost={cardInfo.cost}
              nameId={nameId}
              nameFallback={nameFallback}
              category={t(`category.${cardInfo.category ?? card.category}`)}
              descriptionId={`cards.${card.id}.descriptions.${card.selectedHiramekiLevel}`}
              descriptionFallback={cardInfo.description}
              godEffectId={godEffectId}
              godEffectFallback={godEffectFallback}
              statuses={cardInfo.statuses?.map(s => t(`status.${s}`))}
              leftControls={leftControls}
              rightControls={
                <CardActionsMenu
                  card={card}
                  allowedJob={allowedJob}
                  onRemoveCard={onRemoveCard}
                  onCopyCard={onCopyCard}
                  onConvertCard={onConvertCard}
                  onUndoCard={onUndoCard}
                />
              }
            />
          </Card>
        );
      })}
    </div>
  );
}
