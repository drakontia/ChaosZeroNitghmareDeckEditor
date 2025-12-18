"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Card, CardType, Character } from "@/types";
import { getCharacterHiramekiCards, getAddableCards, getCardById } from "@/lib/data";
import { Card as UiCard, CardContent } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface CardSelectorProps {
  character: Character | null;
  onAddCard: (card: Card) => void;
  onRestoreCard: (card: Card) => void;
  removedCards?: Map<string, number>;
  convertedCards?: Set<string>;
}

export function CardSelector({ character, onAddCard, onRestoreCard, removedCards, convertedCards }: CardSelectorProps) {
  const t = useTranslations();
  const characterHiramekiCards = character ? getCharacterHiramekiCards(character) : [];
  const addableCards = getAddableCards(character?.job);

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
    const cardTitle = title || card.name;

    return (
      <UiCard
        key={key}
        className={`relative overflow-hidden aspect-[2/3] ${className}`}
        onClick={onClick}
        title={cardTitle}
      >
        {card.imgUrl && (
          <Image
            src={card.imgUrl}
            alt={card.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/60" />

        <div className="flex items-start p-3 gap-3 z-index-10 relative">
          <div className="flex flex-col items-start">
            <div 
              className="text-5xl font-extrabold text-white leading-none text-shadow-2xl" 
            >
              {baseVariation.cost}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div 
              className="text-base md:text-2xl font-bold text-white text-shadow-2xl truncate"
            >
              {card.name}
            </div>
            <div 
              className="text-xs md:text-base text-white/90 text-shadow-2xl"
            >
              {subtitle || t(`category.${card.category}`)}
            </div>
          </div>
        </div>

        {showFullDescription && (
          <div 
            className="absolute left-2 right-2 bottom-3 md:bottom-6 text-xs md:text-sm text-center text-white text-shadow-2xl whitespace-pre-wrap"
          >
            {baseVariation.status && (
              <div className="mb-1 text-[11px] font-semibold text-purple-300">[{baseVariation.status}]</div>
            )}
            {baseVariation.description}
          </div>
        )}
      </UiCard>
    );
  };

  const renderCardButton = (card: Card) => {
    return renderCardTile(card, {
      onClick: () => onAddCard(card),
    });
  };

  const renderRemovedTile = (card: Card, count: number) => {
    return renderCardTile(card, {
      keyPrefix: 'removed',
      onClick: () => onRestoreCard(card),
      title: `${card.name}をデッキに戻す`,
    });
  };

  const renderConvertedTile = (card: Card) => {
    return renderCardTile(card, {
      keyPrefix: 'converted',
      className: '',
      title: `${card.name}（変換済み）`,
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
        {characterHiramekiCards.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">ヒラメキカード</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {characterHiramekiCards.map(card => renderCardButton(card))}
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
