"use client";
import { useEffect, useState } from "react";
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
  onUpdateHirameki: (deckId: string, hiramekiLevel: number) => void;
  onSetGodHirameki: (deckId: string, godType: GodType | null) => void;
  onSetGodHiramekiEffect: (deckId: string, effectId: string | null) => void;
}

export function HiramekiControls({ 
  card, 
  egoLevel, 
  hasPotential, 
  onUpdateHirameki, 
  onSetGodHirameki,
  onSetGodHiramekiEffect,
}: HiramekiControlsProps) {
  const t = useTranslations();
  const [openHirameki, setOpenHirameki] = useState(false);
  const [openGod, setOpenGod] = useState(false);
  const [selectedGod, setSelectedGod] = useState<GodType | null>(null);
  
  useEffect(() => {
    if (openGod) {
      setSelectedGod(card.godHiramekiType ?? null);
    }
  }, [openGod, card.godHiramekiType]);
  
  const isHiramekiActive = card.selectedHiramekiLevel > 0;
  const isGodActive = Boolean(card.godHiramekiType);
  const maxHiramekiLevel = card.hiramekiVariations.length - 1;

  return (
    <>
      <Button
        type="button"
        size="icon"
        aria-label={t("card.hirameki")}
        title={t("card.hirameki")}
        onClick={() => setOpenHirameki(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition",
          isHiramekiActive
            ? "bg-yellow-400 text-black hover:bg-yellow-400/90"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
        )}
      >
        {isHiramekiActive ? (
          <Lightbulb className="h-6 w-6" />
        ) : (
          <LightbulbOff className="h-6 w-6" />
        )}
      </Button>
      <Button
        type="button"
        size="icon"
        aria-label={t("card.godSelect")}
        title={t("card.godSelect")}
        onClick={() => setOpenGod(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition",
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
      </Button>

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
                    alt={card.name}
                    cost={info.cost}
                    nameId={`cards.${card.id}.name`}
                    nameFallback={card.name}
                    category={t(`category.${info.category ?? card.category}`)}
                    descriptionId={`cards.${card.id}.descriptions.${level}`}
                    descriptionFallback={info.description}
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

      {/* 神ヒラメキ選択モーダル（横並びボタングループ + 効果プレビュー） */}
      <Dialog open={openGod} onOpenChange={setOpenGod}>
        <DialogContent className="max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{t("card.godSelect")}</DialogTitle>
            <button
              type="button"
              onClick={() => { onSetGodHirameki(card.deckId, null); onSetGodHiramekiEffect(card.deckId, null); setOpenGod(false); }}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            >
              <span className="text-sm font-medium">{t('common.remove', { defaultValue: '外す' })}</span>
              <span className="sr-only">{t('common.remove', { defaultValue: '外す' })}</span>
            </button>
          </DialogHeader>

          {/* 神ボタングループ（横スクロール可） */}
          <div className="px-6 pt-0 pb-4">
            <div className="flex gap-2 overflow-x-auto">
              {GOD_TYPES.map((g) => (
                <Button
                  key={g}
                  variant={selectedGod === g ? "secondary" : "outline"}
                  className="shrink-0"
                  onClick={() => setSelectedGod(g)}
                >
                  {t(`god.${g}`)}
                </Button>
              ))}
            </div>
          </div>

          {/* 効果適用済みカードのプレビュー選択 */}
          <div className="p-6 pt-0 overflow-y-auto max-h-[60vh]">
            {!selectedGod ? (
              <div className="text-sm text-muted-foreground">{t('card.god')}</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {GOD_HIRAMEKI_EFFECTS.filter(e => e.gods === "all" || e.gods.includes(selectedGod)).map((effect) => {
                  const baseInfo = getCardInfo(card, egoLevel, hasPotential);
                  const costWithGod = baseInfo.cost + (effect.costModifier ?? 0);
                  const isSelected = card.godHiramekiType === selectedGod && card.godHiramekiEffectId === effect.id;
                  return (
                    <button
                      key={effect.id}
                      className={cn("rounded-md", isSelected ? "ring-2 ring-primary" : "")}
                      onClick={() => { onSetGodHirameki(card.deckId, selectedGod); onSetGodHiramekiEffect(card.deckId, effect.id); setOpenGod(false); }}
                      title={t(`godEffects.${effect.id}`, { defaultValue: effect.id })}
                    >
                      <CardFrame
                        imgUrl={card.imgUrl}
                        alt={card.name}
                        cost={costWithGod}
                        nameId={`cards.${card.id}.name`}
                        nameFallback={card.name}
                        category={t(`category.${baseInfo.category ?? card.category}`)}
                        descriptionId={`cards.${card.id}.descriptions.${card.selectedHiramekiLevel}`}
                        descriptionFallback={card.hiramekiVariations[card.selectedHiramekiLevel]?.description}
                        godEffectId={effect.id}
                        godEffectFallback={effect.additionalEffect}
                        statuses={baseInfo.statuses?.map(s => t(`status.${s}`))}
                        className="border"
                        variant="default"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
