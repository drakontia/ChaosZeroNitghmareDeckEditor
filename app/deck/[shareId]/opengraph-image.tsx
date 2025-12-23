import { ImageResponse } from 'next/og';
import { decodeDeckShare } from '@/lib/deck-share';
import { cookies } from 'next/headers';
import { getCardInfo } from '@/lib/deck-utils';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

async function getLocaleMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch {
    return (await import(`@/messages/ja.json`)).default;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ shareId: string }>;
}) {
  const { shareId } = await params;
  const deck = decodeDeckShare(shareId);

  if (!deck) {
    return new Response('Deck not found', { status: 404 });
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'ja';
  const messages = await getLocaleMessages(locale);

  const t = (key: string, fallback: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
      if (!value) return fallback;
    }
    return value || fallback;
  };

  const deckName = deck.name || t('deck.noDeck', 'Unnamed Deck');
  const characterName = deck.character?.name
    ? (messages as any).character?.[deck.character.id] || deck.character.name
    : t('character.select', 'No Character');
  const cardCount = deck.cards.length;
  const createdDate = new Date(deck.createdAt).toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Calculate faint memory points
  let faintMemoryPoints = 0;
  for (const card of deck.cards) {
    if (card.type === 'shared') faintMemoryPoints += 20;
    if (card.type === 'monster') faintMemoryPoints += 80;
    if (card.type === 'forbidden') faintMemoryPoints += 20;
    if (
      (card.type === 'shared' || card.type === 'monster') &&
      card.selectedHiramekiLevel > 0
    ) {
      faintMemoryPoints += 10;
    }
    if (card.godHiramekiType) faintMemoryPoints += 20;
  }

  const labels = {
    title: t('app.title', 'カオスゼロナイトメア デッキエディター'),
    character: t('character.title', 'キャラクター'),
    totalCards: t('deck.totalCards', 'カード枚数'),
    faintMemory: t('character.faintMemory', '曖昧な記憶'),
    category: t('category', 'カテゴリ'),
  };

  // Get ego level and potential from character
  const egoLevel = deck.character?.egoLevel ?? 0;
  const hasPotential = deck.character?.hasPotential ?? false;

  // Get translated card info with correct costs
  const cardsWithTranslation = deck.cards.slice(0, 12).map((card) => {
    const cardInfo = getCardInfo(card, egoLevel, hasPotential);
    const nameKey = `cards.${card.id}.name`;
    const translatedName = t(nameKey, card.name);
    const categoryKey = `category.${card.category}`;
    const translatedCategory = t(categoryKey, card.category);
    
    return {
      ...card,
      cost: cardInfo.cost,
      translatedName,
      translatedCategory,
    };
  });

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#f9fafb',
          padding: '40px',
          fontFamily: 'system-ui',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '8px',
            }}
          >
            {deckName}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              color: '#6b7280',
              gap: '20px',
            }}
          >
            <span>{characterName}</span>
            <span>•</span>
            <span>{cardCount}枚</span>
            <span>•</span>
            <span>{faintMemoryPoints}pt</span>
          </div>
        </div>

        {/* Card Grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            flex: 1,
          }}
        >
          {cardsWithTranslation.map((card, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '165px',
                height: '240px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Card Image Background */}
              {card.imgUrl && (
                <img
                  src={card.imgUrl}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              )}
              
              {/* Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.6))',
                }}
              />

              {/* Card Info Overlay */}
              <div
                style={{
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  padding: '12px',
                }}
              >
                {/* Top: Cost + Name */}
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {card.cost}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {card.translatedName}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                      }}
                    >
                      {card.translatedCategory}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            marginTop: '20px',
            fontSize: 16,
            color: '#9ca3af',
            justifyContent: 'space-between',
          }}
        >
          <span>{labels.title}</span>
          <span>{createdDate}</span>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
