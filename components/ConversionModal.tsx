"use client";
import { useTranslations } from 'next-intl';
import { Card as UiCard, CardContent } from "./ui/card";
import { CardFrame } from "./CardFrame";
import { Card, CardType, JobType } from "@/types";
import { getAddableCards } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface ConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: Card) => void;
  allowedJob?: JobType;
}

export function ConversionModal({ isOpen, onClose, onSelectCard, allowedJob }: ConversionModalProps) {
  const t = useTranslations();
  
  // Get all addable cards and filter to shared and forbidden only
  const allAddableCards = getAddableCards(allowedJob);
  const conversionCards = allAddableCards.filter(
    card => card.type === CardType.SHARED || card.type === CardType.FORBIDDEN
  );

  const sharedCards = conversionCards.filter(c => c.type === CardType.SHARED);
  const forbiddenCards = conversionCards.filter(c => c.type === CardType.FORBIDDEN);

  const renderCardTile = (card: Card) => {
    const baseVariation = card.hiramekiVariations[0];
    const translatedName = t(`cards.${card.id}.name`, { defaultValue: card.name });
    const description = t(`cards.${card.id}.descriptions.0`, { defaultValue: baseVariation.description });
    const statuses = baseVariation.statuses?.map(s => t(`status.${s}`));

    return (
      <UiCard 
        key={card.id} 
        className="cursor-pointer hover:ring-2 hover:ring-primary" 
        onClick={() => {
          onSelectCard(card);
          onClose();
        }}
        title={translatedName}
      >
        <CardFrame
          imgUrl={card.imgUrl}
          alt={translatedName}
          cost={baseVariation.cost}
          name={translatedName}
          category={t(`category.${card.category}`)}
          description={description}
          statuses={statuses}
        />
      </UiCard>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("common.convert", { defaultValue: "変換" })}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            変換先のカードを選択してください
          </p>
          
          <Accordion type="multiple" className="w-full" defaultValue={["shared", "forbidden"]}>
            {/* Shared Cards */}
            {sharedCards.length > 0 && (
              <AccordionItem value="shared">
                <AccordionTrigger className="text-lg font-semibold">
                  {t("card.sharedCards")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-3">
                    {sharedCards.map(card => renderCardTile(card))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Forbidden Cards */}
            {forbiddenCards.length > 0 && (
              <AccordionItem value="forbidden">
                <AccordionTrigger className="text-lg font-semibold">
                  {t("card.forbiddenCards")}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-3">
                    {forbiddenCards.map(card => renderCardTile(card))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
