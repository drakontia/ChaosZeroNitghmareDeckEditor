# カオスゼロナイトメア デッキエディター 仕様書

## 概要

ゲーム「カオスゼロナイトメア」（参考サイト：https://chaoszeronightmare.onstove.com/ja）のデッキを自由に編集できるWebアプリケーション。

### 参考資料
- ゲーム公式サイト: https://chaoszeronightmare.onstove.com/ja
- 攻略情報: https://gamerch.com/chaoszeronightmare/
- デッキ参考画像: http://bit.ly/4oZ77Hx
- 構造参考リポジトリ: https://github.com/danij91/resonanceDeckBuilder

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 16.x (最新版)
- **言語**: TypeScript 5.9.x
- **スタイリング**: Tailwind CSS 4.1.x
- **国際化**: next-intl (日本語、英語、中国語、韓国語対応)

### テスト
- **E2Eテスト**: Playwright 1.57.x

### ビルドツール
- Turbopack (Next.js内蔵)

## UI/UXデザイン

### レイアウト構造

```
┌─────────────────────────────────────────────────────┐
│ ヘッダー                           [言語切替]       │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  左サイド    │         右側: カード表示              │
│  バー        │         (4列グリッド)                │
│              │                                      │
│ - キャラ選択 │  [カード1] [カード2] [カード3] [カード4] │
│ - 職業表示   │  [カード5] [カード6] [カード7] [カード8] │
│ - 曖昧な記憶 │  [カード9] ...                       │
│ - エゴ発現   │                                      │
│ - 潜在力     │  --- カード追加セクション ---         │
│ - ポイント   │  [キャラヒラメキ] [共用] [モンスター] │
│ - 装備選択   │  [禁忌]                              │
│              │                                      │
└──────────────┴──────────────────────────────────────┘
```

### 多言語対応

4つの言語をサポート:
- 🇯🇵 日本語 (ja) - デフォルト
- 🇺🇸 英語 (en)
- 🇨🇳 中国語 (zh)
- 🇰🇷 韓国語 (ko)

言語切替ボタンはヘッダー右上に配置し、選択した言語はCookieに保存される。

## キャラクターシステム

### 職業（Job）

6種類の職業が存在:

| 職業 | 日本語 | 英語 | 中国語 | 韓国語 |
|------|--------|------|--------|--------|
| striker | ストライカー | Striker | 前锋 | 스트라이커 |
| vanguard | ヴァンガード | Vanguard | 先锋 | 뱅가드 |
| ranger | レンジャー | Ranger | 游侠 | 레인저 |
| hunter | ハンター | Hunter | 猎人 | 헌터 |
| controller | コントローラー | Controller | 控制者 | 컨트롤러 |
| psionic | サイオニック | Psionic | 灵能者 | 사이오닉 |

### キャラクターカード

各キャラクターは8枚のカードを持つ:

#### 開始カード（4枚）
- キャラクター選択時に自動的にデッキに追加される
- 内訳:
  - **基本カード（3枚）**: ヒラメキが起こらないカード
  - **ヒラメキ対応カード（1枚）**: ヒラメキが起こるカード

#### ヒラメキカード（4枚）
- 手動で追加可能
- 全てヒラメキが起こるカード

### エゴ発現（Ego Manifestation）

- **レベル範囲**: Lv 0 ～ Lv 6 (7段階)
- **UI**: スライダー制御
- **効果**: 特定のカードの効果や説明文、コストが変化する可能性がある

### 潜在力（Potential）

- **状態**: 有効/無効（チェックボックス）
- **効果**: 有効時に特定のカードの効果が変化する可能性がある

## 装備システム

3種類の装備スロット:

1. **武器（Weapon）**
2. **防具（Armor）**
3. **ペンダント（Pendant）**

各装備にはレアリティが設定されている（SSR、SR、R、N）。

## カードシステム

### カード種別（Type）

| 種別 | 説明 | 職業制限 |
|------|------|----------|
| 通常（Normal） | キャラクター固有のカード | なし（キャラクター専用） |
| 共用（Shared） | 複数キャラで使用可能 | 2職業 or 全職業 |
| モンスター（Monster） | モンスターカード | 2職業 or 全職業 |
| 禁忌（Forbidden） | 禁忌カード | 2職業 or 全職業 |

### カードカテゴリ（Category）

3種類のカテゴリ:
- **攻撃（Attack）**
- **強化（Enhancement）**
- **スキル（Skill）**

### カードステータス（Status）

カードには複数のステータスが付与される可能性がある:

| ステータス | 日本語 | 英語 |
|------------|--------|------|
| opening | 開戦 | Opening |
| extinction | 消滅 | Extinction |
| preservation | 保存 | Preservation |
| recovery | 回収 | Recovery |
| celestial | 天上 | Celestial |
| coordination | 連携 | Coordination |
| ultimate | 終極 | Ultimate |
| initiative | 主導 | Initiative |

### ヒラメキシステム

#### ヒラメキレベル

カードの種類によってヒラメキレベル数が異なる:

| カード種別 | ヒラメキレベル数 | レベル表記 |
|------------|------------------|------------|
| キャラクターカード | 6段階 | 基本, Lv1, Lv2, Lv3, Lv4, Lv5 |
| 共用/モンスター/禁忌 | 4段階 | 基本, Lv1, Lv2, Lv3 |
| 基本カード | 0段階 | ヒラメキなし |

#### ヒラメキレベルによる変化

各ヒラメキレベルで以下が変化する:
- **コスト**: カードを使用するためのコスト値
- **説明文**: カードの効果説明
- **ステータス**: 付与されるステータス効果（例: [火傷・防御低下]）

#### UI表示

- **レベル選択**: 6ボタン（3×2グリッド）で選択
  ```
  [基] [1] [2]
  [3] [4] [5]
  ```
- **ヒラメキマーク**: コストの下に紫色で表示
  ```
  ★ ヒラメキ Lv2
  ```

### 神ヒラメキシステム

#### 概要

神ヒラメキは、ヒラメキが起こるカードに対して追加の効果を付与するシステム。

#### 特徴

- **共通システム**: カード個別ではなく、全ヒラメキ対応カードに適用可能
- **独立性**: 通常のヒラメキレベルとは独立して機能
- **基本カード除外**: 基本カード（ヒラメキなし）には適用不可

#### 5種類の神

| 神 | 日本語 | 英語 | 中国語 | 韓国語 |
|----|--------|------|--------|--------|
| kilken | キルケン | Kilken | 基尔肯 | 킬켄 |
| seclaid | セクレド | Seclaid | 塞克雷德 | 세크레드 |
| dialos | ディアロス | Dialos | 迪亚洛斯 | 디알로스 |
| nihilum | ニヒルム | Nihilum | 尼希鲁姆 | 니힐룸 |
| vitol | ヴィトル | Vitol | 维托尔 | 비톨 |

#### 神毎の効果（各神は複数の効果を持つ）

**キルケン（Kilken）** - 攻撃系
1. 追加ダメージ: 攻撃時、追加ダメージを与える（コスト-1）
2. クリティカル: クリティカル率が上昇する（コスト変化なし）
3. 連続攻撃: 攻撃が2回連続で発動する（コスト+1）

**セクレド（Seclaid）** - 防御系
1. 防御強化: 防御力を大幅に上昇させる（コスト変化なし）
2. ダメージ軽減: 受けるダメージを50%軽減する（コスト変化なし）
3. バリア: 次の攻撃を完全に無効化する（コスト+1）

**ディアロス（Dialos）** - 範囲系
1. 全体効果: 全体効果に変化する（コスト変化なし）
2. 範囲拡大: 効果範囲が2倍になる（コスト+1）
3. 味方強化: 味方全体に効果を付与する（コスト-1）

**ニヒルム（Nihilum）** - 妨害系
1. 効果無効化: 敵の強化効果を無効化する（コスト変化なし）
2. デバフ解除: 味方のデバフを全て解除する（コスト変化なし）
3. 沈黙: 敵をスキル使用不可にする（コスト+1）

**ヴィトル（Vitol）** - 回復系
1. HP回復: HPを回復する（コスト変化なし）
2. 継続回復: 3ターンの間、継続的にHPを回復する（コスト+1）
3. 蘇生: 倒れた味方を復活させる（コスト+2）

#### 神ヒラメキ選択UI（2段階選択）

1. **第1段階**: 神の選択
   - ボタンをクリックして5種類の神から選択
   - 選択中: `✦ 神: {神名}`（黄色ハイライト）
   - 未選択: `神ヒラメキ選択`

2. **第2段階**: 効果の選択
   - 選択した神の複数の効果から1つを選択
   - ドロップダウンまたはボタンで選択
   - 効果名とコスト変化を表示

#### 視覚表現

- **神マーク**: コストの下に黄色で表示
  ```
  ✦ キルケン: 追加ダメージ
  ```
- **ヒラメキマークとの関係**: 神ヒラメキが有効な場合、ヒラメキマークは非表示になり神マークのみ表示

#### 効果の適用

- **説明文への追加**: カードの説明文に神ヒラメキの効果が追記される
- **コスト変更**: 効果によってはコストが増減する

## 曖昧な記憶システム

デッキ編集に基づいてポイントが計算されるシステム。

### ポイント計算ルール

| 行動 | ポイント | 備考 |
|------|----------|------|
| 共用カードの獲得 | +20pt | - |
| モンスターカードの獲得 | +80pt | - |
| 共用・モンスターカードのヒラメキ | +10pt | 固有カードのヒラメキは0pt |
| 神ヒラメキ（全カード） | +20pt | 共用・モンスターの場合は上記ヒラメキ+10ptも加算 |
| 禁忌カード | +20pt | 100%セーブデータに保存される |
| カードの排除（1回目） | 0pt | 開始・ヒラメキカードは+20pt<br>【排除】ステータス持ちカードは計算に含まれない |
| カードの排除（2回目） | +10pt | - |
| カードの排除（3回目） | +30pt | - |
| カードの排除（4回目） | +50pt | - |
| カードの排除（5回目以降） | +70pt | - |
| カードのコピー（1回目） | 0pt | コピー元の神ヒラメキなどのpt加算要素も継承 |
| カードのコピー（2回目） | +10pt | - |
| カードのコピー（3回目） | +30pt | - |
| カードのコピー（4回目） | +50pt | - |
| カードのコピー（5回目以降） | +70pt | - |
| カードの変換 | +10pt | 変換後のカードがpt加算要素を持つ場合は追加で加算<br>変換後のカードを排除しても変換のptは残る |

### UI表示

- **位置**: キャラクター情報の下、紫色のボックス
- **表示形式**: `{ポイント数} pt`
- **リアルタイム更新**: デッキ編集時に自動計算・更新

## デッキ管理

### デッキ制限

- **最大枚数**: 40枚

### 統計情報

リアルタイムで表示される情報:
- **カード枚数**: 現在のデッキ内のカード数
- **合計コスト**: 全カードのコスト合計（ヒラメキ、神ヒラメキのコスト変更を反映）

### デッキ操作

- **クリア**: デッキを空にする
- **カード追加**: カード選択エリアから追加
- **カード削除**: デッキ表示エリアの各カードから削除
- **ヒラメキ変更**: デッキ内カードのヒラメキレベルを変更
- **神ヒラメキ設定**: デッキ内カードに神ヒラメキを設定（2段階選択）

## データ構造

### TypeScript型定義（主要部分）

```typescript
// 職業
enum JobType {
  STRIKER = "striker",
  VANGUARD = "vanguard",
  RANGER = "ranger",
  HUNTER = "hunter",
  CONTROLLER = "controller",
  PSIONIC = "psionic"
}

// キャラクター
interface Character {
  id: string;
  name: string;
  rarity: string;
  job: JobType;
  startingCards: string[]; // 開始カード4枚のID
  hiramekiCards: string[]; // ヒラメキカード4枚のID
}

// カード種別
enum CardType {
  CHARACTER = "character",
  SHARED = "shared",
  MONSTER = "monster",
  FORBIDDEN = "forbidden"
}

// カードカテゴリ
enum CardCategory {
  ATTACK = "attack",
  ENHANCEMENT = "enhancement",
  SKILL = "skill"
}

// ヒラメキバリエーション
interface HiramekiVariation {
  level: number;
  cost: number;
  description: string;
  status?: string;
  egoVariations?: {
    [egoLevel: number]: {
      description: string;
      cost?: number;
    };
  };
  potentialVariation?: {
    description: string;
    cost?: number;
  };
}

// 神タイプ
enum GodType {
  KILKEN = "kilken",
  SECLAID = "seclaid",
  DIALOS = "dialos",
  NIHILUM = "nihilum",
  VITOL = "vitol"
}

// 神ヒラメキ効果オプション
interface GodHiramekiEffectOption {
  id: string;
  name: string;
  additionalEffect: string;
  costModifier?: number;
}

// 神ヒラメキ定義
interface GodHiramekiDefinition {
  god: GodType;
  name: string;
  effects: GodHiramekiEffectOption[];
}

// カード
interface Card {
  id: string;
  name: string;
  type: CardType;
  category: CardCategory;
  statuses: CardStatus[];
  isBasicCard?: boolean;
  allowedJobs?: JobType[] | "all";
  hiramekiVariations: HiramekiVariation[];
}

// デッキ内カード
interface DeckCard extends Card {
  deckId: string;
  selectedHiramekiLevel: number;
  godHiramekiType: GodType | null;
  godHiramekiEffectId: string | null; // 選択された神の効果ID
}

// デッキ
interface Deck {
  character: Character | null;
  equipment: {
    weapon: Equipment | null;
    armor: Equipment | null;
    pendant: Equipment | null;
  };
  cards: DeckCard[];
  egoLevel: number; // 0-6
  hasPotential: boolean;
  removedCards: Map<string, number>;
  copiedCards: Map<string, number>;
  convertedCards: Set<string>;
}
```

## テスト仕様

### E2Eテスト（Playwright）

実装されているテスト:

1. **ページロードテスト**: ページが正しく読み込まれるか
2. **キャラクター選択テスト**: キャラクターが選択できるか
3. **装備選択テスト**: 装備が選択できるか
4. **カード追加テスト**: カードがデッキに追加できるか
5. **ヒラメキ状態変更テスト**: ヒラメキレベルが変更できるか
6. **神ヒラメキ状態変更テスト**: 神ヒラメキが適用できるか（2段階選択）
7. **カード削除テスト**: カードが削除できるか
8. **デッキクリアテスト**: デッキがクリアできるか
9. **複数カードタイプテスト**: 異なる種類のカードが追加できるか
10. **言語切替テスト**: 言語が切り替わるか

### テストカバレッジ

- 主要な機能フロー
- ヒラメキシステム（通常・神）
- デッキ操作
- 多言語対応

## ビルド・デプロイ

### 開発環境

```bash
pnpm install   # 依存関係のインストール
pnpm dev       # 開発サーバー起動（localhost:3000）
```

### テスト

```bash
pnpm test      # E2Eテスト実行
pnpm test:ui   # テストUIモード
```

### プロダクションビルド

```bash
pnpm build     # プロダクションビルド
pnpm start     # プロダクションサーバー起動
```

## 拡張性

### 今後の拡張可能性

1. **デッキ保存機能**: ローカルストレージまたはバックエンド連携
2. **デッキ共有機能**: URLまたはコードでデッキを共有
3. **デッキ画像エクスポート**: デッキを画像として出力
4. **統計・分析機能**: デッキのコスト分布、カテゴリ比率など
5. **推奨デッキ機能**: AIまたは人気デッキの提案
6. **カードデータ更新**: 新カード・新キャラの追加対応

### データ管理

現在はハードコードされたダミーデータを使用しているが、以下の移行が可能:
- JSON/YAML形式の外部ファイル
- CMS（Contentful、Strapiなど）
- データベース（Firebase、Supabaseなど）
- API連携（ゲーム公式APIなど）

## セキュリティ

### 実装済み

- TypeScript型安全性
- Next.js組み込みのセキュリティ機能
- CodeQL静的解析

### 考慮事項

- XSS対策（Reactの自動エスケープ）
- CSRF対策（必要に応じてトークン実装）
- データバリデーション

## パフォーマンス

### 最適化

- Next.js 16のTurbopackによる高速ビルド
- クライアントサイドレンダリング
- 画像最適化（unoptimized設定）
- コード分割

## アクセシビリティ

### 対応

- セマンティックHTML
- キーボードナビゲーション
- スクリーンリーダー対応（ARIA属性）
- 色覚異常対応（コントラスト比）

## ブラウザ対応

### サポート対象

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

### モバイル対応

- レスポンシブデザイン
- タッチ操作対応
- モバイルブラウザ対応

## ライセンス

MIT License

---

## 更新履歴

- 2025-12-16: 初版作成
  - 基本機能実装
  - 多言語対応（日本語、英語、中国語、韓国語）
  - 神ヒラメキ2段階選択システム実装

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Playwright Documentation](https://playwright.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
