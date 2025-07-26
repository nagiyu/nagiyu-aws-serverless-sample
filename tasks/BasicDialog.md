# BasicDialog 追加計画

## 概要
MaterialUIを用いた共通ダイアログ（BasicDialog）コンポーネントを新規追加し、他機能からの利用を容易にする設計を行う。

## 目的
- 共通のダイアログUIコンポーネントを提供し、UIの一貫性を保つ。
- MaterialUIのDialogコンポーネントをベースにしつつ、依存関係をpeerDependencies化やfallback実装で軽減し、柔軟に利用可能にする。
- サンプル実装を通じて利用例を示し、開発者の理解を促進する。

## 詳細設計

### 1. BasicDialogコンポーネントの実装
- MaterialUIのDialogをベースにした共通ダイアログコンポーネントを `client/common/components/feedback/dialog/BasicDialog.tsx` に新規作成。
- 依存関係はpeerDependencies化を検討し、MaterialUIが無い場合のfallback実装も検討。
- Dialogの基本的な機能（開閉制御、タイトル、内容表示、アクションボタンなど）を実装。

### 2. サンプルページの作成
- `client/nextjs-sample/app/sample/dialogs/page.tsx` にBasicDialogの多様な利用例を示すサンプルページを新規作成。
- サンプルでは、開閉制御や複数のダイアログパターンを示す。
- 既存のサンプル部品を必要に応じて再利用。

### 3. メニューへのリンク追加
- `client/nextjs-sample/app/layout.tsx` のmenuItemsにサンプルページへのリンクを追加。

## 参考情報
- MaterialUI Dialog: https://mui.com/material-ui/react-dialog/

## 禁止事項
- 本計画では `tasks/BasicDialog.md` 以外のファイルは変更しない。

## 完了条件
- 本ドキュメントが日本語で作成されていること
