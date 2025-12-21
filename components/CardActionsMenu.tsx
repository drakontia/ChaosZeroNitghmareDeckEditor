"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CircleX, Undo2, Copy, ArrowRightLeft, Menu } from "lucide-react";
import { DeckCard, Card, JobType } from "@/types";
import { ConversionModal } from "./ConversionModal";
import { Button } from "./ui/button";

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
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={t("actions.menu", { defaultValue: "メニュー" })}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full"
        title={t("actions.menu", { defaultValue: "メニュー" })}
      >
        <Menu className="h-5 w-5" />
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-1 z-20">
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="rounded-full"
            onClick={() => { onRemoveCard(card.deckId); setIsOpen(false); }}
            aria-label={t("common.delete", { defaultValue: "削除" })}
            title={t("common.delete", { defaultValue: "削除" })}
          >
            <CircleX className="h-5 w-5" />
          </Button>
          {!card.isBasicCard && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => { onCopyCard(card.deckId); setIsOpen(false); }}
              aria-label={t("common.copy", { defaultValue: "コピー" })}
              title={t("common.copy", { defaultValue: "コピー" })}
            >
              <Copy className="h-5 w-5" />
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleConvertClick}
            aria-label={t("common.convert", { defaultValue: "変換" })}
            title={t("common.convert", { defaultValue: "変換" })}
          >
            <ArrowRightLeft className="h-5 w-5" />
          </Button>
          {!card.isStartingCard && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => { onUndoCard(card.deckId); setIsOpen(false); }}
              aria-label={t("actions.undo", { defaultValue: "戻す" })}
              title={t("actions.undo", { defaultValue: "戻す" })}
            >
              <Undo2 className="h-5 w-5" />
            </Button>
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
