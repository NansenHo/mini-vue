[English](./README.md) / [日本語](./README_JP.md) / [中文](./README_CN.md)

# Mini Vue

このリポジトリは Vue3 の学習を深めるために、Vue3 の簡略版を実装しています。

> [ここ](https://til-nansenho.netlify.app/docs/vue/mini-vue/effect_reactive_dependenciesCollection_dependenciesTriggering/dependenciesCollection_dependenciesTriggering)でノートを見ることができます。
>
> ノートには、このリポジトリの実装過程での考えや重要な知識点が記録されています。

## 🧐 ぜこのプロジェクトを作成したのか

Vue3 を深く学ぶためには、Vue3 のソースコードを読む必要があります。

しかし、Vue3 のソースコードには、エッジケースや互換性のためのロジックが多く含まれており、読むのが難しくなっています。

私たちはコアロジックに集中すべきで、このリポジトリの目的は Vue3 のソースコードからコアロジックだけを抽出し、核心部分のみを残すことです。

## 🛠️ クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/NansenHo/mini-vue.git
cd mini-vue

# パッケージをインストール
pnpm install

# テストを実行
pnpm run test

# ビルド
pnpm run build
```

## 🧩 Example の開き方

Server を使用して `example/*` ディレクトリ内の `index.html` ファイルを開くだけです。

[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) の使用を推奨します。

## 💻 テックスタック

- TypeScript
- Vitest
- Rollup

## 📌 タスク

**runtime-core モジュール：**

- [x] コンポーネント型をサポート
- [x] エレメント型をサポート
- [x] `proxy` をサポート
- [x] `render` 関数内で `setup` から返されたオブジェクトを取得可能
- [x] `$el` API をサポート
- [x] `props` の初期化（`event` を含む）
- [x] 基本的な `slots` をサポート
- [x] コンポーネントの `emit` をサポート
- [x] `setup` 関数が `props` と `context` にアクセス可能
- [x] `provide` / `inject` をサポート
- [x] `getCurrentInstance` をサポート
- [x] テキスト型ノードをサポート
- [x] `props` の更新を実装
- [x] `nextTick` を実装
- [x] `watchEffect` をサポート

**reactivity モジュール：**

- [x] `reactive` を実装
- [x] `ref` を実装
- [x] `track` で依存関係を収集
- [x] `trigger` で依存関係をトリガー
- [x] `effect` が `runner` 関数を返す
- [x] `effect.scheduler` をサポート
- [x] `effect.stop` をサポート
- [x] `isReadonly` をサポート
- [x] `isReactive` をサポート
- [x] ネストされた `reactive` をサポート
- [x] ネストされた `readonly` をサポート
- [x] `isRef` をサポート
- [x] `unRef` をサポート
- [x] `proxyRefs` をサポート
- [x] `computed` を実装

**compiler-core モジュール：**

- [x] インターポレーションを解析
- [x] エレメントを解析
- [x] テキストを解析
