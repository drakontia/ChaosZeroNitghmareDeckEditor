import ClientDeckBuilderPage from '@/components/ClientDeckBuilderPage';
import { decodeDeckShare } from '@/lib/deck-share';
import { calculateFaintMemory } from '@/lib/deck-utils';
import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shareId: string }>;
}): Promise<Metadata> {
  const { shareId } = await params;
  const deck = decodeDeckShare(shareId);
  const locale = await getLocale();
  const t = await getTranslations();

  if (!deck) {
    return {
      title: t('app.title'),
      description: t('app.description'),
    };
  }

  const deckName = deck.name || t('deck.noDeck');
  const characterName = deck.character?.name 
    ? t(deck.character.name as any, { defaultValue: deck.character.name })
    : t('character.select');
  const cardCount = deck.cards.length;
  const faintMemoryPoints = calculateFaintMemory(deck);
  const createdDate = new Date(deck.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const description = `${characterName}${t('deck.shareDescriptionSuffix', {
    defaultValue: 'のデッキ',
  })} (${cardCount}${t('deck.shareCardUnit', { defaultValue: '枚' })}) | ${t('character.faintMemory')}: ${faintMemoryPoints}pt | ${t('deck.createdDate')}: ${createdDate}`;

  const title = `${deckName} - ${t('app.title')}`;

  return {
    title,
    description,
  };
}

export default async function SharedDeckPage({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  return <ClientDeckBuilderPage shareId={shareId} />;
}
