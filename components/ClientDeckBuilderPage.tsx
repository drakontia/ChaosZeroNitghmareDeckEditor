"use client";

import dynamic from 'next/dynamic';

const DeckBuilder = dynamic(
  () => import('./DeckBuilder').then((mod) => ({ default: mod.DeckBuilder })),
  { ssr: false }
);

export default function ClientDeckBuilderPage() {
  return <DeckBuilder />;
}
