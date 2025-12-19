"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CircleX, Undo2, Copy, ArrowRightLeft, Menu } from "lucide-react";
import { DeckCard, Card, JobType } from "@/types";
import { ConversionModal } from "./ConversionModal";

const ACTION_BUTTON_CLASS = "flex items-center justify-center px-1 py-2 hover:bg-black/10";

interface CardActionsMenuProps {
  card: DeckCard;
  allowedJob?: JobType;
  onRemoveCard: (deckId: string) => void;
  onCopyCard: (deckId: string) => void;
  onConvertCard: (deckId: string, targetCard: Card) => void;
  onUndoCard: (deckId: string) => void;
}

export function CardActionsMenu({ 
  card,
  allowedJob,
  onRemoveCard, 
  onCopyCard, 
  onConvertCard, 
  onUndoCard 
}: CardActionsMenuProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [isConversionModalOpen, setIsConversionModalOpen] = useState(false);

  const handleConvertClick = () => {
    setIsOpen(false);
    setIsConversionModalOpen(true);
  };

  const handleConversionSelect = (targetCard: Card) => {
    onConvertCard(card.deckId, targetCard);
    setIsConversionModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label={t("actions.menu", { defaultValue: "メニュー" })}
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-full bg-white text-black hover:bg-gray-100 transition h-7 w-7 ring-1 ring-black/50 shadow-md"
        title={t("actions.menu", { defaultValue: "メニュー" })}
      >
        <Menu className="h-5 w-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-7 rounded-md border bg-white text-black shadow-lg z-20">
          <button
            type="button"
            className={ACTION_BUTTON_CLASS}
            onClick={() => { onRemoveCard(card.deckId); setIsOpen(false); }}
            aria-label={t("common.delete", { defaultValue: "削除" })}
            title={t("common.delete", { defaultValue: "削除" })}
          >
            <CircleX className="h-5 w-5" />
          </button>
          {!card.isBasicCard && (
            <button
              type="button"
              className={ACTION_BUTTON_CLASS}
              onClick={() => { onCopyCard(card.deckId); setIsOpen(false); }}
              aria-label={t("common.copy", { defaultValue: "コピー" })}
              title={t("common.copy", { defaultValue: "コピー" })}
            >
              <Copy className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            className={ACTION_BUTTON_CLASS}
            onClick={handleConvertClick}
            aria-label={t("common.convert", { defaultValue: "変換" })}
            title={t("common.convert", { defaultValue: "変換" })}
          >
            <ArrowRightLeft className="h-5 w-5" />
          </button>
          {!card.isStartingCard && (
            <button
              type="button"
              className={ACTION_BUTTON_CLASS}
              onClick={() => { onUndoCard(card.deckId); setIsOpen(false); }}
              aria-label={t("actions.undo", { defaultValue: "戻す" })}
              title={t("actions.undo", { defaultValue: "戻す" })}
            >
              <Undo2 className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
      <ConversionModal
        isOpen={isConversionModalOpen}
        onClose={() => setIsConversionModalOpen(false)}
        onSelectCard={handleConversionSelect}
        allowedJob={allowedJob}
      />
    </>
  );
}
