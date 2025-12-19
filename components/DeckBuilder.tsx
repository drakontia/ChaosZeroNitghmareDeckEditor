"use client";

import { useTranslations, useLocale } from 'next-intl';
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
import { Brain, CardSim, Clock12 } from 'lucide-react';
import { useState } from 'react';

export function DeckBuilder() {
  const t = useTranslations();
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");

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
                  hasPotential={deck.hasPotential}
                  onTogglePotential={togglePotential}
                />

                {/* Points/Stats Section */}
                <FieldGroup className='gap-2'>
                  <Field orientation={'horizontal'} className='border-b'>
                    <FieldLabel className='text-2xl align-middle'><Clock12 className='align-middle'/>{t('deck.createdDate')}</FieldLabel>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-2xl font-bold text-foreground">
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
                    <FieldLabel className='text-2xl'><CardSim />{t('deck.totalCards')}</FieldLabel>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-2xl font-bold text-primary">{deck.cards.length}</span>
                    </div>
                  </Field>
                  <Field orientation={'horizontal'}>
                    <FieldLabel className='text-2xl'><Brain />{t('character.faintMemory')}</FieldLabel>
                    <div className="flex justify-between items-center p-2">
                      <span className="text-2xl font-bold text-primary">{faintMemoryPoints} pt</span>
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
