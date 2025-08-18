# Docs/guides 充実計画

## 目的

- docs/guides 配下に projectbrief.md, productContext.md, systemPatterns.md, techContext.md の4つのドキュメントを追加し、プロジェクトの理解を深めるためのガイドを充実させる。

## 調査

- docs/guides/index.md を確認したところ、追加すべき4つのファイルの役割と内容例が記載されている。
- 既存の docs/guides 配下には index.md のみ存在し、追加対象のファイルはまだ存在しない。

## 計画

1. docs/guides 配下に以下の4つのファイルを新規作成する。
   - projectbrief.md
   - productContext.md
   - systemPatterns.md
   - techContext.md

2. 各ファイルには、index.md に記載されている内容例をもとに、以下のような構成で記述する。

### projectbrief.md
- プロジェクトの基盤となる文書
- コア要件と目標の定義
- プロジェクト範囲の真実の情報源

### productContext.md
- プロジェクトの存在理由
- 解決する問題
- どのように機能すべきか
- ユーザー体験の目標

### systemPatterns.md
- システムアーキテクチャ
- 主要な技術的決定
- 使用されているデザインパターン
- コンポーネントの関係性
- 重要な実装パス

### techContext.md
- 使用技術
- 開発環境のセットアップ
- 技術的制約
- 依存関係
- ツールの使用パターン

3. それぞれのファイルは Markdown 形式で作成し、見出しや箇条書きを用いて読みやすく整理する。

4. 可能であれば、各セクションに簡単な説明や例を付け加える。

## 実装例

### projectbrief.md
```
# Project Brief

## Core Requirements and Goals

- Define the main objectives of the project.
- Outline the scope and boundaries.

## Project Scope

- Describe what is included and excluded.
- Provide the source of truth for the project.
```

### productContext.md
```
# Product Context

## Why This Project Exists

- Explain the problem the project aims to solve.
- Describe the target users and their needs.

## User Experience Goals

- Outline the desired user experience.
```

### systemPatterns.md
```
# System Patterns

## Architecture

- Describe the overall system architecture.

## Key Technical Decisions

- List important technical choices made.

## Design Patterns

- Explain design patterns used in the system.
```

### techContext.md
```
# Technical Context

## Technologies Used

- List the main technologies and tools.

## Development Setup

- Describe how to set up the development environment.

## Technical Constraints

- Note any limitations or constraints.
```

## 完了条件

- UpdateDocs.md に計画が日本語で詳細に記載されていること
- docs/guides 配下のファイルはまだ作成しないこと（本 issue は計画のみ）
