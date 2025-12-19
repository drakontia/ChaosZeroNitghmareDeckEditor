"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Lightbulb, LightbulbOff, Zap, ZapOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { DeckCard, GodType } from "@/types";
import { GOD_HIRAMEKI_EFFECTS } from "@/lib/god-hirameki";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { CardFrame } from "./CardFrame";
import { getCardInfo } from "@/lib/deck-utils";

const GOD_TYPES = [GodType.KILKEN, GodType.SECLAID, GodType.DIALOS, GodType.NIHILUM, GodType.VITOL] as const;

interface HiramekiControlsProps {
  card: DeckCard;
  egoLevel: number;
  hasPotential: boolean;
  translatedName: string;
  onUpdateHirameki: (deckId: string, hiramekiLevel: number) => void;
  onSetGodHirameki: (deckId: string, godType: GodType | null) => void;
}

export function HiramekiControls({ 
  card, 
  egoLevel, 
  hasPotential, 
  translatedName,
  onUpdateHirameki, 
  onSetGodHirameki 
}: HiramekiControlsProps) {
  const t = useTranslations();
  const [openHirameki, setOpenHirameki] = useState(false);
  const [openGod, setOpenGod] = useState(false);
  
  const isHiramekiActive = card.selectedHiramekiLevel > 0;
  const isGodActive = Boolean(card.godHiramekiType);
  const maxHiramekiLevel = card.hiramekiVariations.length - 1;

  return (
    <>
      <button
        type="button"
        aria-label={t("card.hirameki")}
        title={t("card.hirameki")}
        onClick={() => setOpenHirameki(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition h-8 w-8",
          isHiramekiActive
            ? "bg-yellow-400 text-black hover:bg-yellow-400/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
        )}
      >
        {isHiramekiActive ? (
          <Lightbulb className="h-5 w-5" />
        ) : (
          <LightbulbOff className="h-5 w-5" />
        )}
      </button>
      <button
        type="button"
        aria-label={t("card.godSelect")}
        title={t("card.godSelect")}
        onClick={() => setOpenGod(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition h-8 w-8",
          isGodActive
            ? "bg-yellow-400 text-black hover:bg-yellow-400/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
        )}
      >
        {isGodActive ? (
          <Zap className="h-5 w-5" />
        ) : (
          <ZapOff className="h-5 w-5" />
        )}
      </button>

      {/* ヒラメキ選択モーダル（画像付きカード形プレビュー） */}
      <Dialog open={openHirameki} onOpenChange={setOpenHirameki}>
        <DialogContent className="max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{t("card.hirameki")}</DialogTitle>
            <button
              type="button"
              onClick={() => { onUpdateHirameki(card.deckId, 0); setOpenHirameki(false); }}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <span className="text-sm font-medium">{t('common.remove', { defaultValue: '外す' })}</span>
              <span className="sr-only">{t('common.remove', { defaultValue: '外す' })}</span>
            </button>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-y-auto max-h-[65vh] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: maxHiramekiLevel }, (_, i) => i + 1).map((level) => {
              const preview: DeckCard = { ...card, selectedHiramekiLevel: level } as DeckCard;
              const info = getCardInfo(preview, egoLevel, hasPotential);
              return (
                <button
                  key={level}
                  className={cn("rounded-md", card.selectedHiramekiLevel === level ? "ring-2 ring-primary" : "")}
                  onClick={() => { onUpdateHirameki(card.deckId, level); setOpenHirameki(false); }}
                  title={`Lv${level}`}
                >
                  <CardFrame
                    imgUrl={card.imgUrl}
                    alt={translatedName}
                    cost={info.cost}
                    name={translatedName}
                    category={t(`category.${card.category}`)}
                    description={t(`cards.${card.id}.descriptions.${level}`, { defaultValue: info.description })}
                    statuses={info.statuses?.map(s => t(`status.${s}`))}
                    className="border"
                    variant="default"
                  />
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* 神ヒラメキ選択モーダル（リスト表示） */}
      <Dialog open={openGod} onOpenChange={setOpenGod}>
        <DialogContent className="max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{t("card.godSelect")}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-y-auto max-h-[60vh] space-y-2">
            <Button variant="ghost" className="w-full justify-start" onClick={() => { onSetGodHirameki(card.deckId, null); setOpenGod(false); }}>
              {t('common.remove', { defaultValue: '外す' })}
            </Button>
            {GOD_TYPES.map((g) => (
              <Button key={g} variant={card.godHiramekiType === g ? "secondary" : "outline"} className="w-full justify-between" onClick={() => { onSetGodHirameki(card.deckId, g); setOpenGod(false); }}>
                <span>✦ {GOD_HIRAMEKI_EFFECTS[g].name}</span>
                <span className="text-xs text-muted-foreground">{t('actions.select')}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
