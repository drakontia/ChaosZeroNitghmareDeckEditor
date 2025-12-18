"use client";

import { useTranslations, useLocale } from 'next-intl';
import { useDeckBuilder } from "@/hooks/useDeckBuilder";
import { CharacterSelector } from "./CharacterSelector";
import { EquipmentSelector } from "./EquipmentSelector";
import { CardSelector } from "./CardSelector";
import { DeckDisplay } from "./DeckDisplay";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CHARACTERS, EQUIPMENT } from "@/lib/data";
import { calculateFaintMemory } from "@/lib/deck-utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldGroup, FieldSet, FieldSeparator } from "./ui/field";
import { Input } from './ui/input';

export function DeckBuilder() {
  const t = useTranslations();
  const locale = useLocale();

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
    clearDeck,
    setName,
    setEgoLevel,
    togglePotential
  } = useDeckBuilder();

  const faintMemoryPoints = calculateFaintMemory(deck);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-400 mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {t('app.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('app.description')}
              </p>
            </div>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </header>

        <FieldSet className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 p-6 rounded-xl border bg-card">
          {/* Top side - Deck name, Deck control */}
          <FieldGroup className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
            <Field orientation={'horizontal'} className="lg:col-span-4">
              <Input
                type="text"
                value={deck.name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
                placeholder={t('deck.namePlaceholder')}
              />
            </Field>
            <div className="lg:col-span-8 flex justify-end">
              <Button
                onClick={clearDeck}
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
                />

                {/* Character Info Section */}
                {deck.character && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    <div className="text-sm text-muted-foreground">
                      {t('character.job')}: <span className="font-semibold text-foreground">{t(`job.${deck.character.job}`)}</span>
                    </div>

                    <Field>
                      <FieldLabel>{t('character.egoManifest')} ({t('card.level')} {deck.egoLevel})</FieldLabel>
                      <input
                        type="range"
                        min="0"
                        max="6"
                        value={deck.egoLevel}
                        onChange={(e) => setEgoLevel(Number(e.target.value))}
                        className="w-full"
                      />
                    </Field>

                    <Field>
                      <FieldLabel>{t('character.potential')}</FieldLabel>
                      <label className="inline-flex items-center gap-2">
                        <Input
                          type="checkbox"
                          checked={deck.hasPotential}
                          onChange={togglePotential}
                          className="h-4 w-4"
                        />
                        <span className="text-sm text-foreground">{t('character.potential')}</span>
                      </label>
                    </Field>
                  </div>
                )}
              </CardContent>
              {/* Points/Stats Section */}
              <CardContent className="space-y-4">
                <Field orientation={'horizontal'}>
                  <FieldLabel>{t('deck.createdDate')}</FieldLabel>
                  <div className="flex justify-between items-center p-3">
                    <span className="text-base font-bold text-foreground">
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
                <Field orientation={'horizontal'}>
                  <FieldLabel>{t('character.faintMemory')}</FieldLabel>
                  <div className="flex justify-between items-center p-3">
                    <span className="text-base font-bold text-primary">{faintMemoryPoints} pt</span>
                  </div>
                </Field>
                <Field orientation={'horizontal'}>
                  <FieldLabel>{t('deck.totalCards')}</FieldLabel>
                  <div className="flex justify-between items-center p-3">
                    <span className="text-base font-bold text-primary">{deck.cards.length}</span>
                  </div>
                </Field>
              </CardContent>
              <EquipmentSelector
                equipment={EQUIPMENT}
                selectedEquipment={deck.equipment}
                onSelect={selectEquipment}
              />

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
                  onRemoveCard={removeCard}
                  onUndoCard={undoCard}
                  onCopyCard={copyCard}
                  onConvertCard={convertCard}
                  onUpdateHirameki={updateCardHirameki}
                  onSetGodHirameki={setCardGodHirameki}
                />

              </CardContent>
            </Card>
          </div>
        </FieldSet>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <Card>
              <CardHeader>
                <CardTitle>{t('card.add')}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Card Selection for adding cards */}
                <CardSelector
                  character={deck.character}
                  onAddCard={addCard}
                  onRestoreCard={restoreCard}
                  removedCards={deck.removedCards}
                  convertedCards={deck.convertedCards}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
