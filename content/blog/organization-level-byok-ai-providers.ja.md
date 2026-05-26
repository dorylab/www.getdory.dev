---
title: "Dory が組織単位の AI BYOK に対応しました"
description: "Dory は組織単位の AI BYOK に対応し、チームが独自の Provider、モデル、エンドポイントを選びながら、System Provider を fallback として残せるようになりました。"
category: "AI Providers"
ogVariant: "ai-providers"
---

# Dory が組織単位の AI BYOK に対応しました

Dory は組織単位の AI BYOK に対応しました。

チームは特定の組織に AI Provider を設定し、使いたいモデルを選び、Dory の AI ワークフローを自分たちの Provider 認証情報で実行できます。System Provider は fallback として残るため、管理者は組織ごとの制御を与えながら、サーバー管理の既定設定も維持できます。

これは、Dory を複数の環境、顧客、部門、コンプライアンス境界で使うチームにとって重要です。ある組織は OpenAI を使い、別の組織は Anthropic を使い、別の組織は OpenRouter 経由でルーティングし、さらに別の組織は OpenAI Compatible のローカルエンドポイントを使うかもしれません。Dory はこれを組織単位で扱えるようになりました。

## 組織単位の BYOK が重要な理由

AI は通常のデータベース作業の一部になりつつあります。SQL の作成、失敗したクエリの修正、schema の説明、結果の要約、質問から実行可能なクエリへの変換に AI を使う場面が増えています。

しかし、AI 設定がすべてのチームに同じ形で合うことはあまりありません。

すでに承認済みの Provider アカウントを持つチームもあります。地域要件があるチームもあります。社内 gateway を経由するチームもあります。OpenAI-compatible API の背後にあるローカルまたは self-hosted モデルを使いたいチームもあります。同じ Dory workspace 内の組織ごとに、まったく異なる Provider が必要になることもあります。

これまでは、AI 設定は主にサーバー管理でした。単純な既定値としては便利ですが、組織ごとの制御が必要なチームには粒度が粗すぎました。

Dory はより明確なモデルに対応しました。

- **System Provider** はサーバー管理者がグローバルに設定できます。
- **Organization Provider** は特定の組織でその既定値を上書きできます。
- 組織 Provider が有効な場合も、**Fallback** が表示されます。

これにより、必要な場所に制御を渡しつつ、安定したシステムレベルの基準を保てます。

## 設定できること

組織管理者は AI settings ページから AI Provider を追加できます。

各 Organization Provider では、Dory は次をサポートします。

- Provider の選択
- 既定モデル
- Base URL
- API key
- 保存前の Provider テスト
- 既定 Provider の選択
- 有効化、無効化、編集、削除

Organization Provider は、有効で、設定がそろっており、現在の plan または license で許可されている場合にのみ active になります。Organization Provider が無効、不完全、または現在の entitlement で利用できない場合、Dory は System Provider に fallback します。

## 対応 Provider

Dory の組織単位 BYOK フローは、チームからよく求められる Provider に対応しています。

- OpenAI
- Anthropic
- Azure OpenAI
- OpenRouter
- Google Gemini
- Qwen
- xAI
- Meta
- OpenAI Compatible

OpenAI Compatible は、ローカルモデル、社内 gateway、または OpenAI 形式の API を公開するホスト型推論サービスを使うチームにとって重要です。この Provider では Base URL が必須で、API key はエンドポイントによって任意にできます。

## 実際のチーム境界に合わせた設計

組織単位の BYOK は、複数組織の workspace を前提に設計されています。

AI を 1 つのグローバルスイッチとして扱うのではなく、Dory はチームの実際の運用を表現できます。

- 顧客向けの組織は承認済み Provider を使えます。
- データチームはすべての組織を変更せずに別のモデルを試せます。
- self-hosted デプロイでは System Provider を保ちつつ、選択した組織だけが上書きできます。
- ローカルまたはプライベートモデルを OpenAI-compatible endpoint 経由で接続できます。

これは、予算、データポリシー、レイテンシ要件、Provider の好みが異なるチームが Dory を共有する場合に特に有用です。

## より安全な既定値と明確な Fallback

Organization Provider は override であり、System Provider を破壊的に置き換えるものではありません。

Organization Provider が有効な場合でも、Dory は System Provider を fallback として表示します。あとで Organization Provider が無効化されたり、正しく設定されていない状態になったりした場合、AI 実行はグローバル Provider に戻れます。

保存済みの Organization Provider レコードも、あとで再利用できるように残せます。System Provider に戻すことは、管理者が再利用したい Provider 詳細を消すことを意味しません。

## Provider への直接実行

Organization Provider が有効な場合、Dory はその Provider とモデルを使って AI 実行をルーティングします。System-managed cloud AI で使われる cloud proxy 経路ではありません。

そのため、組織単位 BYOK は、自分たちの Provider 設定に AI の挙動を合わせたいチームに向いています。自分たちの endpoint、自分たちのモデル、自分たちの Provider アカウントを使えます。

## 利用条件

組織単位 BYOK は、Organization AI Provider 管理が有効な環境で利用できます。

- cloud plan ベースの環境では Dory Pro
- self-hosted license ベースの環境では Dory Enterprise

アクセス権のない組織でも現在の System Provider の状態は確認できますが、Organization Provider の編集には対応する plan または license が必要です。

## はじめ方

組織単位 BYOK を設定する手順は次のとおりです。

1. Dory を開きます。
2. 対象組織の Settings に移動します。
3. AI を開きます。
4. Organization Provider を追加します。
5. Provider とモデルを選びます。
6. 必要に応じて Base URL と API key を入力します。
7. Provider をテストします。
8. 保存し、その組織の既定 Provider に設定します。

有効になると、Dory の AI 機能はその組織で Organization Provider を使います。グローバルな System Provider は fallback として残ります。

## 次に向けて

組織単位 BYOK は、Dory のより大きな方向性の一部です。実際のデータワークフローで AI を役立てながら、すべてのチームに同じ Provider 設定を強制しないことを目指しています。

データベースチームには、schema、SQL 方言、クエリエラー、結果コンテキストを理解する AI が必要です。同時に、組織の実際の運用に合った Provider 制御も必要です。

組織単位 BYOK により、Dory はその両方を支えられます。
