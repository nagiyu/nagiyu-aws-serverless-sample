# 共通ダイアログ（ComboBoxAutocomplete）追加とサンプル実装計画

## 概要
MaterialUI を用いた共通ダイアログコンポーネント ComboBoxAutocomplete の追加と、それを活用した複数サンプルの実装計画を行います。

## 詳細
- client/common/components/inputs/autocomplete/ComboBoxAutocomplete.tsx を新規追加し、MaterialUI の Autocomplete をベースとした汎用コンポーネントを設計する。
  - 他機能で MaterialUI が未導入でも使えるように設計する。
- client/nextjs-sample/app/sample/select/page.tsx を追加し、ComboBoxAutocomplete のさまざまな利用例サンプルを実装する。
  - 必要があれば client/nextjs-sample/app/sample 配下の既存部品も活用。
- client/nextjs-sample/app/layout.tsx の menuItems に select サンプルへのリンクを追加し、画面遷移できるようにする。
- 計画内容は tasks/ComboBoxAutocomplete.md に日本語で記載する。
- 実装例は MaterialUI 公式ドキュメント（https://mui.com/material-ui/react-autocomplete/）を参考にする。

## 完了条件
- tasks/ComboBoxAutocomplete.md が日本語で作成されていること

## 参考情報
- MaterialUI Autocomplete: https://mui.com/material-ui/react-autocomplete/

## 禁止事項
本 issue は計画するだけなので、tasks/ComboBoxAutocomplete.md 以外のファイルを変更してはいけません。

## AI向けガイド
- 作業を始める前に、プロジェクト全体を一通り確認し、全体構成を把握してください。
  - 特に docs/guides 配下は念入りに確認すること。
- コード追加・修正を行う時は、まずファイル全体構成を見て、適切な位置に対応してください。
- 禁止事項は必ず守ってください。これはいかなる条件よりも優先されます。
- 読みやすいコードを書くことを意識してください。
- 宣言型プログラミングを心掛けてください。
