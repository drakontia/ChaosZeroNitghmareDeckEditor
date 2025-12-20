"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Equipment, EquipmentType } from "@/types";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Swords } from "lucide-react";

interface EquipmentSelectorProps {
  equipment: Equipment[];
  selectedEquipment: {
    weapon: Equipment | null;
    armor: Equipment | null;
    pendant: Equipment | null;
  };
  onSelect: (equipment: Equipment | null, type?: EquipmentType) => void;
}

export function EquipmentSelector({ equipment, selectedEquipment, onSelect }: EquipmentSelectorProps) {
  const t = useTranslations();
  const [openType, setOpenType] = useState<EquipmentType | null>(null);

  const getEquipmentByType = (type: EquipmentType) => {
    return equipment.filter(eq => eq.type === type);
  };

  const renderEquipmentSection = (type: EquipmentType, titleKey: string) => {
    const items = getEquipmentByType(type);
    const selected = selectedEquipment[type];
    const isOpen = openType === type;

    return (
      <Field>
        <Dialog open={isOpen} onOpenChange={(open) => setOpenType(open ? type : null)}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full h-32 border-dashed relative overflow-hidden"
            >
              {selected ? (
                <>
                  {selected.imgUrl && (
                    <div className="absolute inset-0 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={selected.imgUrl}
                        alt={t(selected.name)}
                        fill
                        className="object-cover"
                        sizes="100%"
                      />
                    </div>
                  )}
                  <div
                    className="relative z-10 flex flex-col text-center pr-2 pl-2"
                  >
                    <span className="text-sm font-semibold text-white">{t(selected.name)}</span>
                    <span className="text-sm text-white">{t(`${selected.rarity}`)}</span>
                  </div>
                </>
              ) : (
                <span className="text-muted-foreground font-semibold">{t(titleKey)}</span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{t(titleKey)}</DialogTitle>
            </DialogHeader>
            <div className="p-6 pt-0 space-y-3 overflow-y-auto max-h-[60vh]">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  onSelect(null, type);
                  setOpenType(null);
                }}
              >
                {t('common.remove', { defaultValue: '外す' })}
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {items.map((item) => (
                  <Button
                    key={item.id}
                    variant={selected?.id === item.id ? "secondary" : "outline"}
                    className="h-auto flex-col justify-start p-4 text-center"
                    onClick={() => {
                      onSelect(item, type);
                      setOpenType(null);
                    }}
                  >
                    {item.imgUrl && (
                      <div className="relative w-full aspect-square rounded-md overflow-hidden bg-muted mb-3">
                        <Image
                          src={item.imgUrl}
                          alt={t(item.name)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-col w-full">
                      <span className="text-base font-semibold">{t(item.name)}</span>
                      <span className="text-xs text-muted-foreground">{t(item.rarity)}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground/80 mt-1">{t(item.description)}</span>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Field>
    );
  };

  return (
    <FieldGroup className="pt-6 gap-2">
      <FieldLabel className="text-2xl text-gray-500"><Swords />{t('equipment.title')}</FieldLabel>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderEquipmentSection(EquipmentType.WEAPON, "equipment.weapon.title")}
        {renderEquipmentSection(EquipmentType.ARMOR, "equipment.armor.title")}
        {renderEquipmentSection(EquipmentType.PENDANT, "equipment.pendant.title")}
      </div>
    </FieldGroup>
  );
}
