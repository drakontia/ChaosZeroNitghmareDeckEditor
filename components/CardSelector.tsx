"use client";
import { useTranslations } from 'next-intl';

import { Card, CardType, Character } from "@/types";
import { getCharacterHiramekiCards, getAddableCards, getCardById } from "@/lib/data";
import { Card as UiCard, CardContent } from "./ui/card";
import { CardFrame } from "./CardFrame";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface CardSelectorProps {
  character: Character | null;
  onAddCard: (card: Card) => void;
  onRestoreCard: (card: Card) => void;
  removedCards?: Map<string, number>;
  convertedCards?: Set<string>;
  presentHiramekiIds?: Set<string>;
}

export function CardSelector({ character, onAddCard, onRestoreCard, removedCards, convertedCards, presentHiramekiIds }: CardSelectorProps) {
  const t = useTranslations();
  const characterHiramekiCards = character ? getCharacterHiramekiCards(character) : [];
  const addableCards = getAddableCards(character?.job);

  // ヒラメキカードの表示制御：デッキに存在・削除済みは非表示
  const hiddenHiramekiIds = new Set<string>();
  if (presentHiramekiIds) {
    for (const id of presentHiramekiIds.values()) hiddenHiramekiIds.add(id);
  }
  if (removedCards) {
    for (const id of removedCards.keys()) hiddenHiramekiIds.add(id);
  }
  const visibleCharacterHiramekiCards = characterHiramekiCards.filter(card => !hiddenHiramekiIds.has(card.id));

  const getCardTypeLabel = (type: CardType) => {
    switch (type) {
      case CardType.SHARED:
        return t("card.sharedCards");
      case CardType.MONSTER:
        return t("card.monsterCards");
      case CardType.FORBIDDEN:
        return t("card.forbiddenCards");
      default:
        return t("card.title");
    }
  };

  // 共通のカードタイル描画関数
  const renderCardTile = (
    card: Card,
    options: {
      keyPrefix?: string;
      onClick?: () => void;
      className?: string;
      title?: string;
      subtitle?: string;
      showFullDescription?: boolean;
    } = {}
  ) => {
    const {
      keyPrefix = '',
      onClick,
      className = 'cursor-pointer',
      title,
      subtitle,
      showFullDescription = true
    } = options;
    const baseVariation = card.hiramekiVariations[0];
    const key = keyPrefix ? `${keyPrefix}-${card.id}` : card.id;
    const translatedName = t(`cards.${card.id}.name`, { defaultValue: card.name });
    const cardTitle = title || translatedName;

    const statuses = baseVariation.statuses?.map(s => t(`status.${s}`));
    const description = showFullDescription
      ? t(`cards.${card.id}.descriptions.0`, { defaultValue: baseVariation.description })
      : undefined;

    return (
      <UiCard key={key} className={`cursor-pointer ${className}`} onClick={onClick} title={cardTitle}>
        <CardFrame
          imgUrl={card.imgUrl}
          alt={translatedName}
          cost={baseVariation.cost}
          name={translatedName}
          category={subtitle || t(`category.${card.category}`)}
          description={description}
          statuses={statuses}
        />
      </UiCard>
    );
  };

  const renderCardButton = (card: Card) => {
    return renderCardTile(card, {
      onClick: () => onAddCard(card),
    });
  };

  const renderRemovedTile = (card: Card, count: number) => {
    const translatedName = t(`cards.${card.id}.name`, { defaultValue: card.name });
    return renderCardTile(card, {
      keyPrefix: 'removed',
      onClick: () => onRestoreCard(card),
      title: `${translatedName}をデッキに戻す`,
    });
  };

  const renderConvertedTile = (card: Card) => {
    const translatedName = t(`cards.${card.id}.name`, { defaultValue: card.name });
    return renderCardTile(card, {
      keyPrefix: 'converted',
      className: '',
      title: `${translatedName}（変換済み）`,
      subtitle: '変換済み',
      showFullDescription: true,
    });
  };

  // Accordionアイテムを生成する共通関数
  const renderAccordionCardType = (cardType: CardType, value: string) => {
    const filteredCards = addableCards.filter(c => c.type === cardType);
    if (filteredCards.length === 0) return null;

    return (
      <AccordionItem value={value}>
        <AccordionTrigger className="text-lg font-semibold">
          {getCardTypeLabel(cardType)}
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-3">
            {filteredCards.map(card => renderCardButton(card))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <UiCard>
      <CardContent className="space-y-6">
        {!character && characterHiramekiCards.length === 0 && (
          <div className="text-sm text-muted-foreground text-center p-4">
            {t("character.select")}
          </div>
        )}
        
        {/* Removed Cards */}
        {removedCards && removedCards.size > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">削除したカード</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from(removedCards.entries()).map(([id, count]) => {
                const card = getCardById(id);
                if (!card) return null;
                return renderRemovedTile(card, count);
              })}
            </div>
          </div>
        )}

        {/* Converted Cards */}
        {convertedCards && convertedCards.size > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">変換したカード</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array.from(convertedCards.values()).map((id) => {
                const card = getCardById(id);
                if (!card) return null;
                return renderConvertedTile(card);
              })}
            </div>
          </div>
        )}

        {/* Character Hirameki Cards */}
        {visibleCharacterHiramekiCards.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">ヒラメキカード</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {visibleCharacterHiramekiCards.map(card => renderCardButton(card))}
            </div>
          </div>
        )}

        {/* Accordion for Shared, Monster, and Forbidden Cards */}
        <Accordion type="multiple" className="w-full">
          {renderAccordionCardType(CardType.SHARED, 'shared')}
          {renderAccordionCardType(CardType.MONSTER, 'monster')}
          {renderAccordionCardType(CardType.FORBIDDEN, 'forbidden')}
        </Accordion>
      </CardContent>
    </UiCard>
  );
}
