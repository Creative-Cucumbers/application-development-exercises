# serial_shooter

ブラウザ側:

- `index.html`
  - micro:bit を Web Serial で受け取り、簡単なシューティングゲームを動かすデモ

micro:bit 側:

- `microbit_controller.js`
  - 加速度の X 値と、ボタン A の押下状態をシリアルで送る

## AI に作らせるときのプロンプト例

```text
micro:bit から Web Serial で {"x": 数値, "fire": 0 or 1} の JSON を受け取り、
傾きで左右移動し、fire で弾を撃つ簡単なシューティングゲームを
index.html 1ファイルで作って。
Canvas を使って、接続ボタンとスコア表示も入れて。
```

## 編集環境

`index.html` や `microbit_controller.js` を編集するには、VS Code などのテキストエディタが必要。

- Visual Studio Code:
  https://code.visualstudio.com/download

## 送信フォーマット

```json
{"x":-320,"fire":0}
```

例:

```json
{"x":-320,"fire":0}
{"x":140,"fire":1}
```

## 想定している対応

- `x`
  - 機体の左右移動
- `fire`
  - 0 or 1
  - ボタン A を押したら弾を撃つ
