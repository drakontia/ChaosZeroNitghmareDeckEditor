"use client";
import Image from "next/image";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";

interface CardFrameProps {
  imgUrl?: string;
  alt?: string;
  cost: number | string;
  name?: string;
  nameId?: string;
  nameFallback?: string;
  category: string;
  description?: string;
  descriptionId?: string;
  descriptionFallback?: string;
  godEffectId?: string;
  godEffectFallback?: string;
  statuses?: string[];
  className?: string;
  leftControls?: ReactNode;
  rightControls?: ReactNode;
  variant?: "default" | "compact";
}

export function CardFrame({
  imgUrl,
  alt,
  cost,
  name,
  nameId,
  nameFallback,
  category,
  description,
  descriptionId,
  descriptionFallback,
  godEffectId,
  godEffectFallback,
  statuses,
  className,
  leftControls,
  rightControls,
  variant = "default",
}: CardFrameProps) {
  const t = useTranslations();
    const displayName = nameId ? t(nameId, { defaultValue: nameFallback ?? name ?? "" }) : (name ?? "");
    const displayAlt = displayName || alt || "";
  const isCompact = variant === "compact";
  const costClass = isCompact
    ? "text-2xl"
    : "text-5xl";
  const nameClass = isCompact
    ? "text-sm"
    : "text-base md:text-2xl";
  const categoryClass = isCompact
    ? "text-[11px]"
    : "text-xs md:text-base";
  const bottomOffsetClass = isCompact ? "bottom-2" : "bottom-12";
  const descTextClass = isCompact ? "text-[11px]" : "text-xs md:text-lg";

  return (
    <div className={cn("relative overflow-hidden aspect-2/3 rounded-md", className)}>
      {imgUrl && (
        <Image
          src={imgUrl}
          alt={displayAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/60" />

      {/* Top overlay: cost + name/category */}
      <div className="flex items-start pt-3 pl-4 gap-2 z-10 relative bg-gray-600">
        <div className="flex flex-col items-start">
          <div className={cn(costClass, "font-extrabold text-white underline decoration-1 text-shadow-2xl leading-none")}>{cost}</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className={cn(nameClass, "font-bold text-white text-shadow-2xl truncate")} title={displayName}>{displayName}</div>
          <div className={cn(categoryClass, "text-white/90 text-shadow-4xl")}>{category}</div>
        </div>
      </div>

      {/* Controls row: left and right */}
      {(leftControls || rightControls) && (
        <div className="flex items-start pt-1 pl-3 gap-2 z-10 relative">
          {leftControls && (
            <div className="flex flex-col gap-2">
              {leftControls}
            </div>
          )}
          <div className="relative ml-auto mr-2">
            {rightControls}
          </div>
        </div>
      )}

      {/* Bottom overlay: statuses + description */}
      {((descriptionId || description) || (statuses && statuses.length > 0)) && (
        <div className={cn("absolute left-2 right-2 bg-gray-600", bottomOffsetClass, "text-center text-white", descTextClass, "text-shadow-4xl whitespace-pre-wrap")}> 
          {statuses && statuses.length > 0 && (
            <div className="mb-1 font-semibold text-yellow-300">
              [{statuses.join(" / ")}]
            </div>
          )}
          {descriptionId
            ? t(descriptionId, { defaultValue: descriptionFallback ?? "" })
            : description}
          {godEffectId && (
            <div className="mt-2 font-semibold">
              {t(`godEffects.${godEffectId}`, { defaultValue: godEffectFallback ?? "" })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
