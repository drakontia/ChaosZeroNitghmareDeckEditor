"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Character, JobType } from "@/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field } from "./ui/field";
import { getJobIcon } from "@/lib/jobIcons";
import { getElementIcon } from "@/lib/elementIcons";
import { Eye, EyeOff } from "lucide-react";

const formatEgoLevel = (level?: number) => String(level ?? 0).padStart(2, "0");

interface CharacterSelectorProps {
  characters: Character[];
  selectedCharacter: Character | null;
  onSelect: (character: Character) => void;
  hasPotential: boolean;
  onTogglePotential: () => void;
}

export function CharacterSelector({ characters, selectedCharacter, onSelect, hasPotential, onTogglePotential }: CharacterSelectorProps) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [egoLevels, setEgoLevels] = useState<Record<string, number>>({});

  const getEgoLevel = (character: Character) => egoLevels[character.id] ?? character.egoLevel ?? 0;

  const handleEgoIncrement = (character: Character, syncSelect = false) => {
    const current = getEgoLevel(character);
    const next = current >= 6 ? 0 : current + 1;
    setEgoLevels((prev) => ({ ...prev, [character.id]: next }));
    if (syncSelect || selectedCharacter?.id === character.id) {
      onSelect({ ...character, egoLevel: next });
    }
  };

  const handleSelect = (character: Character) => {
    onSelect(character);
    setIsOpen(false);
  };

  return (
    <Field className="mb-6">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full aspect-2/1 h-auto border-dashed relative overflow-hidden"
          >
            {selectedCharacter ? (
              <>
                {selectedCharacter.imgUrl && (
                  <div className="absolute inset-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={selectedCharacter.imgUrl}
                      alt={t(selectedCharacter.name)}
                      fill
                      className="object-cover"
                      sizes="100%"
                    />
                    {/* Rarity gradient band */}
                    <div className={`absolute inset-y-0 left-0 w-8 ${selectedCharacter.rarity === '★5'
                        ? 'bg-linear-to-b from-purple-600 to-transparent'
                        : selectedCharacter.rarity === '★4'
                          ? 'bg-linear-to-b from-yellow-600 to-transparent'
                          : ''
                      }`} />
                    {/* Job, element icons and ego level */}
                    <div className="absolute top-1 left-10 z-20 flex flex-col items-center gap-1">
                      {getJobIcon(selectedCharacter.job) && (
                        <Image
                          src={getJobIcon(selectedCharacter.job)}
                          alt={selectedCharacter.job}
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      )}
                      {getElementIcon(selectedCharacter.element) && (
                        <Image
                          src={getElementIcon(selectedCharacter.element)}
                          alt={selectedCharacter.element ?? "element"}
                          width={32}
                          height={32}
                          className="w-8 h-8"
                        />
                      )}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleEgoIncrement(selectedCharacter, true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            e.preventDefault();
                            handleEgoIncrement(selectedCharacter, true);
                          }
                        }}
                        className="px-2 py-0.5 rounded border-3 border-white bg-black/80 w-8 h-8 cursor-pointer"
                      >
                        <span className="text-base font-bold leading-none text-white">
                          {formatEgoLevel(getEgoLevel(selectedCharacter))}
                        </span>
                      </div>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          onTogglePotential();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            e.preventDefault();
                            onTogglePotential();
                          }
                        }}
                        aria-label="toggle potential"
                        className="p-1 rounded border border-white bg-black/80 text-white w-8 h-8 cursor-pointer"
                      >
                        {hasPotential ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </div>
                    </div>
                  </div>
                )}
                <div
                  className="absolute z-10 bottom-0 right-0 pb-4 pr-4 text-right"
                >
                  <span className="text-4xl font-semibold text-gray-100 text-shadow-lg/20">{t(selectedCharacter.name)}</span>
                </div>
              </>
            ) : (
              <span className="text-muted-foreground font-semibold">{t('character.select')}</span>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-6xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{t('character.select')}</DialogTitle>
          </DialogHeader>
          <div className="p-6 pt-0 overflow-y-auto max-h-[65vh]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {characters.map((character) => (
                <Button
                  key={character.id}
                  variant={selectedCharacter?.id === character.id ? "secondary" : "outline"}
                  className="h-auto w-full flex-col justify-start p-2 text-center"
                  onClick={() => handleSelect(character)}
                >
                  {character.imgUrl && (
                    <div className="relative w-full aspect-2/1 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={character.imgUrl}
                        alt={t(character.name)}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      {/* Rarity gradient band */}
                       <div className={`absolute inset-y-0 left-0 w-5 ${character.rarity === '★5'
                          ? 'bg-linear-to-b from-purple-600 to-transparent'
                          : character.rarity === '★4'
                            ? 'bg-linear-to-b from-yellow-600 to-transparent'
                            : ''
                        }`} />
                      {/* Job, element icons and ego level */}
                      <div className="absolute top-1 left-5 z-20 flex flex-col items-center gap-1">
                        {getJobIcon(character.job) && (
                          <Image
                            src={getJobIcon(character.job)}
                            alt={character.job}
                              width={24}
                              height={24}
                              className="w-5 h-5"
                          />
                        )}
                        {getElementIcon(character.element) && (
                          <Image
                            src={getElementIcon(character.element)}
                            alt={character.element ?? "element"}
                              width={18}
                              height={18}
                              className="w-5 h-5"
                          />
                        )}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleEgoIncrement(character, selectedCharacter?.id === character.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.stopPropagation();
                              e.preventDefault();
                              handleEgoIncrement(character, selectedCharacter?.id === character.id);
                            }
                          }}
                            className="px-1.5 py-0.5 rounded border-2 border-white bg-black/80 cursor-pointer pointer-events-auto"
                        >
                            <span className="text-xs font-semibold leading-none text-white w-5 h-5">
                            {formatEgoLevel(getEgoLevel(character))}
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute bottom-2 right-2 text-right text-gray-100 text-sm font-semibold text-shadow-lg/20">
                          {t(character.name)}
                        </div>
                      </div>

                    </div>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Field>
  );
}
