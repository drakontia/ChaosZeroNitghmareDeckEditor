"use client";
import { useTranslations } from 'next-intl';

import { DeckCard, getCardInfo, GodType, GOD_HIRAMEKI_EFFECTS } from "@/types";

interface DeckDisplayProps {
  cards: DeckCard[];
  egoLevel: number;
  hasPotential: boolean;
  onRemoveCard: (deckId: string) => void;
  onUpdateHirameki: (deckId: string, hiramekiLevel: number) => void;
  onSetGodHirameki: (deckId: string, godType: GodType | null) => void;
}

export function DeckDisplay({ cards, egoLevel, hasPotential, onRemoveCard, onUpdateHirameki, onSetGodHirameki }: DeckDisplayProps) {
  const t = useTranslations();
  if (cards.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
        キャラクターを選択すると開始カードが表示されます
      </div>
    );
  }

  // Cycle through god types: null -> KILKEN -> SECLAID -> DIALOS -> NIHILUM -> VITOL -> null
  const cycleGodHirameki = (currentType: GodType | null) => {
    const godTypes = [null, GodType.KILKEN, GodType.SECLAID, GodType.DIALOS, GodType.NIHILUM, GodType.VITOL];
    const currentIndex = godTypes.indexOf(currentType);
    const nextIndex = (currentIndex + 1) % godTypes.length;
    return godTypes[nextIndex];
  };

  const getHiramekiButtonClass = (current: number, target: number, maxLevel: number) => {
    const baseClass = "px-2 py-1 text-xs rounded transition-all";
    if (current === target) {
      return `${baseClass} bg-blue-500 text-white font-bold`;
    }
    if (target > maxLevel) {
      return `${baseClass} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }
    return `${baseClass} bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const cardInfo = getCardInfo(card, egoLevel, hasPotential);
        const maxHiramekiLevel = card.hiramekiVariations.length - 1;
        const isBasicCard = card.isBasicCard === true;

        return (
          <div
            key={card.deckId}
            className="border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 overflow-hidden flex flex-col"
          >
            {/* Card Header */}
            <div className="p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600">
              <div className="font-semibold text-sm mb-1 truncate" title={card.name}>
                {card.name}
              </div>
              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded">
                    コスト: {cardInfo.cost}
                  </span>
                  {/* Mark below cost: Hirameki mark or God mark */}
                  {!isBasicCard && card.selectedHiramekiLevel > 0 && !card.godHiramekiType && (
                    <span className="text-[10px] mt-1 px-1.5 py-0.5 bg-purple-500 text-white rounded font-bold">
                      ★ {t("card.hirameki")} {t("card.level")}{card.selectedHiramekiLevel}
                    </span>
                  )}
                  {!isBasicCard && card.godHiramekiType && (
                    <span className="text-[10px] mt-1 px-1.5 py-0.5 bg-yellow-500 text-black rounded font-bold">
                      ✦ {GOD_HIRAMEKI_EFFECTS[card.godHiramekiType].name}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => onRemoveCard(card.deckId)}
                  className="text-xs px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-all"
                >
                  削除
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3 flex-1 flex flex-col">
              <div className="flex-1 mb-3">
                {cardInfo.status && (
                  <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
                    [{cardInfo.status}]
                  </div>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {cardInfo.description}
                </p>
              </div>

              {/* Hirameki Level Selector - only show for non-basic cards */}
              {!isBasicCard && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-600 dark:text-gray-400">{t("card.hirameki")}{t("card.level")}:</div>
                  <div className="grid grid-cols-3 gap-1">
                    {[0, 1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => onUpdateHirameki(card.deckId, level)}
                        className={getHiramekiButtonClass(card.selectedHiramekiLevel, level, maxHiramekiLevel)}
                        disabled={level > maxHiramekiLevel}
                        title={level === 0 ? "基本" : `Lv${level}`}
                      >
                        {level === 0 ? "基" : level}
                      </button>
                    ))}
                  </div>

                  {/* God Hirameki Selector - cycles through all 5 gods */}
                  <button
                    onClick={() => onSetGodHirameki(card.deckId, cycleGodHirameki(card.godHiramekiType))}
                    className={`w-full text-xs px-2 py-1 rounded transition-all ${
                      card.godHiramekiType
                        ? "bg-yellow-500 text-black font-bold"
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }`}
                  >
                    {card.godHiramekiType 
                      ? `✦ 神: ${GOD_HIRAMEKI_EFFECTS[card.godHiramekiType].name}`
                      : t("card.godSelect")}
                  </button>
                </div>
              )}

              {isBasicCard && (
                <div className="text-xs text-center text-gray-500 dark:text-gray-400">
                  {t("card.basicCard")}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
