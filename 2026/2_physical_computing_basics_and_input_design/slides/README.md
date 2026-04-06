# Day2 Slides

Day2 の授業スライド作成用ファイル。

## 含まれるもの

- `day2.md`
  - Day2 スライド原稿
- `assets/`
  - 図、キャプチャ、出典メモ
- `tasklist.md`
  - Day2 用の残タスク整理

## すでにある素材

- MakeCode ホーム画面
- MakeCode エディタ画面
- micro:bit 公式画像キャプチャ
- 入力 → 処理 → 出力 の図
- micro:bit 前面の説明図
- MakeCode レイアウト図

## HTML 化

```bash
./build_slides.sh
```

出力先:

- `day2.html`

Marp CLI が入っていない場合は `npx @marp-team/marp-cli` を使う想定。
