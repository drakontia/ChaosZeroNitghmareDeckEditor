"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDeckBuilder } from "@/hooks/useDeckBuilder";
import { CardType } from "@/types";
import { CharacterSelector } from "./CharacterSelector";
import { EquipmentSelector } from "./EquipmentSelector";
import { CardSelector } from "./CardSelector";
import { DeckDisplay } from "./DeckDisplay";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CHARACTERS, EQUIPMENT } from "@/lib/data";
import { calculateFaintMemory } from "@/lib/deck-utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldGroup, FieldSet } from "./ui/field";
import { Input } from './ui/input';
import { Brain, CardSim, Clock12, Share2, Save as SaveIcon, FolderOpen } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { decodeDeckShare } from "@/lib/deck-share";
import { Deck } from "@/types";
import { useShareDeck } from "@/hooks/useShareDeck";
import { useExportDeckImage } from "@/hooks/useExportDeckImage";
import { useDeckSaveLoad } from "@/hooks/useDeckSaveLoad";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export type DeckBuilderProps = {
  shareId?: string;
};

export function DeckBuilder({ shareId }: DeckBuilderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sharedDeck, setSharedDeck] = useState<Deck | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);
  const hasLoadedShare = useRef(false);
  const deckCaptureRef = useRef<HTMLDivElement | null>(null);

  const {
    deck,
    selectCharacter,
    selectEquipment,
    addCard,
    removeCard,
    restoreCard,
    undoCard,
    copyCard,
    convertCard,
    updateCardHirameki,
    setCardGodHirameki,
    setCardGodHiramekiEffect,
    clearDeck,
    setName,
    togglePotential
  } = useDeckBuilder(sharedDeck ?? undefined);

  const { isSharing, handleShareDeck: shareHandler } = useShareDeck();
  const { isExporting, handleExportDeckImage: exportHandler } = useExportDeckImage();
  const {
    savedList,
    loadOpen,
    setLoadOpen,
    handleSaveDeck,
    openLoadDialog,
    handleLoadDeck,
    handleDeleteSaved,
  } = useDeckSaveLoad({ deck, setName, setSharedDeck, setShareError, t });

  useEffect(() => {
    if (!shareId || hasLoadedShare.current) return;
    const decoded = decodeDeckShare(shareId);
    if (decoded) {
      setSharedDeck(decoded);
    } else {
      setShareError(t('deck.shareInvalid', { defaultValue: '共有リンクが無効です。' }));
    }
    hasLoadedShare.current = true;
  }, [shareId, t]);

  const handleShareDeck = useCallback(() => {
    shareHandler(deck);
  }, [deck, shareHandler]);

  const handleClearDeck = useCallback(() => {
    clearDeck();
    router.push('/');
  }, [clearDeck, router]);

  const faintMemoryPoints = calculateFaintMemory(deck);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-400 mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <Link href="/" className="hover:underline">
                  {t('app.title')}
                </Link>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('app.description')}
              </p>
            </div>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </header>

        {shareError && (
          <div className="mb-4 text-sm text-destructive">
            {shareError}
          </div>
        )}

        <div ref={deckCaptureRef}>
          <FieldSet className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 p-6 rounded-xl border bg-card">
          {/* Top side - Deck name, Deck control */}
          <FieldGroup className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Field orientation={'horizontal'} className="lg:col-span-4">
              <Input
                id="deck-name"
                type="text"
                value={deck.name ?? ""}
                onChange={(e) => setName(e.target.value)}
                className="text-4xl h-12 font-bold"
                placeholder={t('deck.namePlaceholder')}
              />
            </Field>
            <div className="lg:col-span-8 flex justify-end gap-2">
              <Button
                onClick={handleSaveDeck}
                variant="secondary"
                disabled={!deck.character}
                title={t('deck.save', { defaultValue: 'デッキを保存' })}
                aria-label={t('deck.save', { defaultValue: 'デッキを保存' })}
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                {t('deck.save', { defaultValue: 'デッキを保存' })}
              </Button>
              <Button
                onClick={openLoadDialog}
                variant="secondary"
                title={t('deck.load', { defaultValue: 'デッキを読み込み' })}
                aria-label={t('deck.load', { defaultValue: 'デッキを読み込み' })}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                {t('deck.load', { defaultValue: 'デッキを読み込み' })}
              </Button>
              <Button
                onClick={handleShareDeck}
                variant="secondary"
                disabled={isSharing || !deck.character}
                title={t('deck.share')}
                aria-label={t('deck.share')}
              >
                <Share2 className="mr-2 h-4 w-4" />
                {t('deck.share')}
              </Button>
              <Button
                onClick={() => exportHandler(deckCaptureRef, deck.name || 'deck')}
                variant="secondary"
                disabled={isExporting}
                title={t('deck.exportImage')}
                aria-label={t('deck.exportImage')}
              >
                <Camera className="mr-2 h-4 w-4" />
                {t('deck.exportImage')}
              </Button>
              <Button
                onClick={handleClearDeck}
                variant="destructive"
              >
                {t('deck.clear')}
              </Button>
            </div>
          </FieldGroup>

          {/* Left side - Character, Points, Equipment */}
          <div className="lg:col-span-4 space-y-6">
            {/* Character Selection */}
            <Card>
              <CardContent className="p-6">
                <CharacterSelector
                  characters={CHARACTERS}
                  selectedCharacter={deck.character}
                  onSelect={selectCharacter}
                  hasPotential={deck.hasPotential}
                  onTogglePotential={togglePotential}
                />

                {/* Points/Stats Section */}
                <FieldGroup className='gap-2'>
                  <Field orientation={'horizontal'} className='border-b'>
                    <FieldLabel className='text-2xl text-gray-500 align-middle'><Clock12 className='align-middle'/>{t('deck.createdDate')}</FieldLabel>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-2xl font-bold text-gray-500">
                        {(() => {
                          const d = new Date(deck.createdAt);
                          const yy = String(d.getFullYear()).slice(-2);
                          const mm = String(d.getMonth() + 1).padStart(2, '0');
                          const dd = String(d.getDate()).padStart(2, '0');
                          return `${yy}.${mm}.${dd}`;
                        })()}
                      </span>
                    </div>
                  </Field>
                  <Field orientation={'horizontal'} className='border-b'>
                    <FieldLabel className='text-2xl text-gray-500'><CardSim />{t('deck.totalCards')}</FieldLabel>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-2xl font-bold text-gray-500">{deck.cards.length}</span>
                    </div>
                  </Field>
                  <Field orientation={'horizontal'}>
                    <FieldLabel className='text-2xl text-gray-500'><Brain />{t('character.faintMemory')}</FieldLabel>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-2xl font-bold text-gray-500">{faintMemoryPoints} pt</span>
                    </div>
                  </Field>
                </FieldGroup>
                <EquipmentSelector
                  equipment={EQUIPMENT}
                  selectedEquipment={deck.equipment}
                  onSelect={selectEquipment}
                />
              </CardContent>

            </Card>


            {/* Equipment Section */}
          </div>

          {/* Right side - Cards in 4-column grid */}
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardContent className="p-6">
                <DeckDisplay
                  cards={deck.cards}
                  egoLevel={deck.egoLevel}
                  hasPotential={deck.hasPotential}
                  allowedJob={deck.character?.job}
                  onRemoveCard={removeCard}
                  onUndoCard={undoCard}
                  onCopyCard={copyCard}
                  onConvertCard={convertCard}
                  onUpdateHirameki={updateCardHirameki}
                  onSetGodHirameki={setCardGodHirameki}
                  onSetGodHiramekiEffect={setCardGodHiramekiEffect}
                />

              </CardContent>
            </Card>
          </div>
          </FieldSet>
        </div>

        {/* Load dialog */}
        <Dialog open={loadOpen} onOpenChange={setLoadOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('deck.loadTitle', { defaultValue: '保存されたデッキを読み込み' })}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 max-h-80 overflow-auto">
              {savedList.length === 0 ? (
                <div className="text-sm text-muted-foreground">
                  {t('deck.noSavedDecks', { defaultValue: '保存されたデッキはありません' })}
                </div>
              ) : (
                savedList.map(({ name, savedAt }) => (
                  <div key={name} className="flex items-center justify-between rounded border p-2 gap-2">
                    <div className="min-w-0">
                      <div className="font-medium truncate">{name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(savedAt).toLocaleString()}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => handleLoadDeck(name)}>
                        {t('deck.load', { defaultValue: '呼び出し' })}
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteSaved(name)}>
                        {t('common.delete', { defaultValue: '削除' })}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t('card.add')}</CardTitle>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                  placeholder={t('card.search')}
                />
              </CardHeader>
              <CardContent className="p-6">
                {/* Card Selection for adding cards */}
                <CardSelector
                  character={deck.character}
                  onAddCard={addCard}
                  onRestoreCard={restoreCard}
                  removedCards={deck.removedCards}
                  convertedCards={deck.convertedCards}
                  presentHiramekiIds={new Set(
                    deck.cards
                      .filter(c => c.type === CardType.CHARACTER)
                      .map(c => c.id)
                  )}
                  searchQuery={searchQuery}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
