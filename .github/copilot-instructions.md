# ChaosZeroNightmare Deck Editor — Copilot Coding Agent Instructions

この文書は GitHub Copilot Coding Agent が本リポジトリで安全かつ正確に開発タスクを実施するための実務ガイドです。仕様は `SPECIFICATION.md` を出典としつつ、現行コードベース（Next.js 16 / TypeScript / Tailwind v4 / next-intl）に沿った運用ルールを補足しています。

## 目的 / スコープ
- ゲーム「カオスゼロナイトメア」のデッキ編集 Web アプリの機能追加・改善・バグ修正。
- ゲーム内のセーブデータの様式を模して、ユーザーが馴染んでいるUI/UXを提供する。
- 仕様への準拠、型安全、UI/UX一貫性、多言語対応の維持。
- 変更は最小限で、既存挙動・公開 API を壊さない。

## 技術スタックと前提
- Framework: Next.js 16.x（App Router, Turbopack）
- Language: TypeScript 5.9.x
- Styling: Tailwind CSS 4.1.x
- i18n: next-intl（ja/en/zh/ko）
- Tests: Vitest（ユニット）、Playwright（E2E）
- Package manager: pnpm

## 主要ドメイン仕様（要点）
- カード種別: `CHARACTER` / `SHARED` / `MONSTER` / `FORBIDDEN`
- カテゴリ: `ATTACK` / `UPGRADE` / `SKILL`
- ヒラメキ（カード別のバリエーション）
  - キャラカード: 基本 + Lv1〜Lv5（計6段階）
  - その他: 基本 + Lv1〜Lv3（計4段階）
  - レベルに応じてコスト/説明/ステータスが変化
- 神ヒラメキ（5神: `kilken/seclaid/dialos/nihilum/vitol`）
  - ヒラメキ対応カードに追加効果を付与（基本カードは対象外）
  - 効果ごとにコスト修正を持つ場合あり
  - 効果は統一構造で定義され、gods配列で適用可能な神を指定
  - 今後、神が追加される可能性もあり
- 曖昧な記憶（Faint Memory）ポイント算出
  - 種別: Shared(+20pt), Monster(+80pt), Forbidden(+20pt)
  - ヒラメキ: Shared/Monster のみ Lv1以上で +10pt（キャラは0pt）
  - 神ヒラメキ: 全カード +20pt（基本カード除く）
  - 削除: 回数に応じて 0→10→30→50→70pt（キャラカードは+20pt）
  - コピー: 回数に応じて 0→10→30→50→70pt
  - 変換: 基本 +10pt、元カードの属性ポイントは保持
  - スナップショット方式で削除/コピー/変換時の属性を記録

## データ構造（実装の基準）
型は `types/index.ts` に準拠します。特に以下に注意：
- `DeckCard`: `deckId`, `selectedHiramekiLevel`, `godHiramekiType`, `godHiramekiEffectId` 等を保持
- `Deck`: `removedCards: Map<string, number | RemovedCardEntry>`, `copiedCards: Map<string, number | CopiedCardEntry>`, `convertedCards: Map<string, string | ConvertedCardEntry>`
- 変換管理: `convertedCards` は Map で originalId → (convertedId | ConvertedCardEntry) を保存
- スナップショット型: `RemovedCardEntry`, `CopiedCardEntry`, `ConvertedCardEntry` で削除/コピー/変換時の属性を記録
- 神ヒラメキ: `GodHiramekiDefinition` は統一構造で、`gods` 配列で適用可能な神を指定

## ファイル構成（主要）
- `app/` … Next.js App Router
- `components/` … UI/ロジックコンポーネント（`DeckBuilder.tsx`, `DeckDisplay.tsx`, `CardSelector.tsx` 等）
- `hooks/` … 状態管理（`useDeckBuilder.ts`）
- `lib/` … ドメインデータ/ユーティリティ
- `messages/` … 多言語 JSON（ja/en/zh/ko）
- `tests/` … Playwright/Vitest テスト

## 開発・テスト手順
- 依存関係の導入・開発起動
  ```bash
  pnpm install
  pnpm dev
  ```
- ユニットテスト（必須）
  ```bash
  pnpm test            # Vitest 実行
  pnpm test:ui         # Vitest UI（必要時）
  ```
- E2E（必要に応じて変更影響が UI に及ぶ場合に）
  ```bash
  pnpm test:playwright # Playwright 実行
  ```
- ビルド/起動確認（PR前の最終確認）
  ```bash
  pnpm build
  pnpm start
  ```

## 実装ルール
- 型安全: すべて TypeScript で厳密に型定義を尊重（`types/index.ts` を参照）。
- i18n: 表示文言は next-intl のキーを用い、`messages/*` にキー追加。既存キー構造に従い、フォールバックを適切に設定。
- UI: Tailwind v4 記法に準拠。Shadcn UI コンポーネントのスタイル/アクセシビリティを維持。
- 最小変更: 既存 API/挙動を壊さず、差分を限定的に。
- 仕様準拠: `SPECIFICATION.md` に沿い、現行コードとの差異はコード側を優先（例: `convertedCards` は Map）。
- ドメイン整合性: ヒラメキ/神ヒラメキのルール、ポイント算出のルールを守る。

## 変更の作法（PR作成の指針）
- ブランチ: `feature/<短く要点>` / `fix/<短く要点>` など意味のある名前。
- コミット: 1つの目的に絞った小さなコミット。メッセージは動詞先行で簡潔に。
- PR説明: 目的/背景、仕様への整合性、UI変更のスクリーンショット（必要時）、テスト実行結果の要約。
- テスト: 変更に関係するユニットテストを追加/更新。UIに影響がある場合は E2E 更新も検討。
- i18n: 新規文言は全言語にキー追加。未翻訳は一時的にフォールバック（英語 or 日本語）。

## よくある実装ポイント
- カード検索: 翻訳済み名称/説明/カテゴリに対して大小文字無視の部分一致でフィルタ。
- 変換モーダル: 共用/禁忌カードのみ選択可能。変換はデッキ内で1枚置換し、`convertedCards` に original→converted を記録。復元時は変換先をデッキから除外。
- ヒラメキ UI: レベル選択（キャラ最大6段階、その他最大4段階）。説明・コスト・ステータスを連動更新。
- 神ヒラメキ: 2段階選択（神→効果）。効果に応じたコスト修正を反映。
- 曖昧な記憶: `lib/deck-utils.ts` のルールに従い、行動ごとの加点を正しく計算。

## 破壊的変更の禁止例
- 型定義の互換性を壊す変更（引数/戻り値の型を勝手に変更）
- i18nキー構造の破壊（既存キーの削除・意味変更）
- 既存コンポーネントの公開プロップの後方互換性を損なう変更

## セキュリティ / 品質
- XSS/CSRF 等は Next.js/React 標準挙動に準拠しつつ、危険な HTML を挿入しない。
- コード整形は既存のスタイルに合わせる。不要なリファクタリングは避ける。
- 大規模改修は要分割・段階的 PR。

## 失敗時の対応
- ビルド/テスト失敗時は差分を見直し、最小修正で復旧。
- i18nエラー（キー欠落等）はフォールバックを暫定使用し、キーを追って追加。

## 参考
- 仕様: `SPECIFICATION.md`
- 型/ロジック: `types/index.ts`, `hooks/useDeckBuilder.ts`, `lib/*`
- UI: `components/*`
- テスト: `tests/*`

本ガイドに従い、変更は必ずテスト・ビルドで裏付けてから PR を作成してください。
