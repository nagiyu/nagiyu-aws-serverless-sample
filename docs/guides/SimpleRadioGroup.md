# SimpleRadioGroup コンポーネント追加とサンプル実装計画

## 概要
Material UI の Radio Group をラップした SimpleRadioGroup コンポーネントを新規作成し、再利用可能な形で外部利用を可能にする計画を立案します。また、利用例となるサンプルページとメニューへの追加までを計画します。

## 詳細
- `client/common/components/Inputs/RadioGroups/SimpleRadioGroup.tsx` を新規作成し、Material UI の Radio Group API をラップしたコンポーネントとする。
  - 外部からラジオボタンの内容・個数・状態を管理できるようにする。
  - Material UI のパッケージを直接 import せず、`SimpleRadioGroup.tsx` のみ import すれば使用できるようにする。
- `client/nextjs-sample/app/sample-radio-group` に `page.tsx` を追加し、SimpleRadioGroup の使い方サンプルを作成。
- `client/nextjs-sample/app/layout.tsx` の `menuItems` にサンプルページへのリンクを追加し、ナビゲーションから遷移できるようにする。

## 参考
- [Material UI Radio Button](https://mui.com/material-ui/react-radio-button/)

## 完了条件
- `docs/guides/SimpleRadioGroup.md` が日本語で作成されていること

---

本計画は、SimpleRadioGroup コンポーネントの実装とサンプル作成のための具体的な作業指針を示すものです。実装は本計画に基づいて別途行います。
