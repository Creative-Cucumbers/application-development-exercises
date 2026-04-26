# Day5 アプリ開発：バックエンドとデータベース / 認証とデバッグ

[TOC]

## この日の位置づけ

Day4 で作った投票アプリ（フロントエンド）と SQLite（データベース）を、今日 Node.js + Express を使って実際につなぐ。

1コマ目では「バックエンドとは何か・なぜ必要か」を整理したうえで、Gemini CLI を使って API サーバーを構築する。2コマ目ではフロントエンドとバックエンドを接続して実際にデータが流れる状態を作り、時間があれば micro:bit のセンサーデータをバックエンド経由でデータベースに保存するところまで進む。

Day4 の「消えた」問題が今日で解決される。フロントエンド・バックエンド・データベースが一本の線でつながることで、Web アプリの全体像が体感できる日。

授業はハイブリッド形式で実施。フィジカル接続（セクション 6）は時間があれば進める。時間内に到達しない場合は Day6 で扱う。

## 到達目標

- バックエンドの役割と、フロントエンドとの違いを説明できる
- Node.js + Express でシンプルな API サーバーを構築できる
- GET / POST エンドポイントを作り、SQLite と連携できる
- フロントエンドから fetch API を使ってバックエンドにデータを送受信できる
- 「フロントエンド → バックエンド → データベース」の流れを動く状態で説明できる
- （時間があれば）micro:bit のセンサーデータをバックエンド経由でデータベースに保存できる

---

## アジェンダ案

### 0. アイスブレイク・Day4 の振り返り・今日の概要【全体参加】

アイスブレイクのテーマ：「Day4 でいちばん詰まったところはどこ？」

- 現地・リモートともに Slack に投稿する
- 講師がいくつかピックアップし、よくあるエラーを短く解説する
- 狙い：Day4 の詰まりを共有して解消し、今日の実習への不安を下げる

Day4 の振り返り：

- 投票アプリ（フロントエンド）を Gemini CLI で作った
- リロードするとデータが消えた → 永続化が必要
- JSON 形式でデータを表現した
- SQLite でテーブルを作り、INSERT・SELECT を実行した

今日の概要：

```
Day4 で作ったもの
  index.html ── まだ繋がっていない ── votes.db

今日作るもの
  index.html ──fetch──→ server.js（Node.js）──→ votes.db
```

---

### 1. バックエンドとは何か・なぜ必要か【講義＋問いかけ】

#### フロントエンドだけでできないこと

Day4 で体験した問題から整理する：

| 問題 | 原因 | バックエンドで解決 |
| --- | --- | --- |
| リロードするとデータが消える | JS の変数はメモリ上にしかない | DB にデータを保存・取得する |
| 別のブラウザで結果が共有されない | 各ブラウザが独立して動いている | サーバーが全員の窓口になる |
| SQLite を直接フロントエンドから操作できない | ブラウザはファイルを直接読み書きできない | サーバー経由で DB を操作する |

#### バックエンドの役割

```
ブラウザ（フロントエンド）
    ↕ HTTP リクエスト（GET / POST）
サーバー（バックエンド）← 今日ここを作る
    ↕ SQL クエリ
データベース（SQLite）
```

- フロントエンドは「見た目」と「ユーザーの操作」を担う
- バックエンドは「データの処理」と「DB との橋渡し」を担う
- 両者は HTTP（GET / POST）でやりとりする

#### API とは何か

- Application Programming Interface の略
- 「こう頼んだら、こういう形式で返す」という取り決め
- 例：`GET /votes` → 集計結果を JSON で返す
- 例：`POST /votes` → 投票データを受け取って DB に保存する

---

### 2. プロジェクト構成とセットアップ【実習】

#### フォルダ構成

Day4 で作った `index.html` を `public` フォルダに移動し、プロジェクトを整理する。

```
voting-app/
├── server.js           ← 今日作る
├── votes.db            ← 自動生成される
├── package.json        ← npm init で作る
└── public/
    └── index.html      ← Day4 で作ったもの
```

#### セットアップ手順

```bash
# package.json を作成
npm init -y

# 必要なパッケージをインストール
npm install express better-sqlite3
```

確認ポイント：

- `node_modules` フォルダが生成されていること
- `package.json` に express と better-sqlite3 が追記されていること

`.gitignore` に追加する：

```
node_modules/
votes.db
```

---

### 3. SQLite API サーバーの構築【講義＋実習】

Gemini CLI に指示して `server.js` を作る。

#### Gemini CLI へのプロンプト例

```
Node.js と Express を使って、SQLite データベースと連携するシンプルな投票 API サーバーを作って。

要件：
- GET /votes：投票結果の集計を返す（option と count）
- POST /votes：投票を受け付ける（body に { "option": "ラーメン" } を受け取る）
- SQLite のデータベースファイルは votes.db
- public フォルダの静的ファイルを配信する（index.html を返す）
- ポートは 3000
- テーブルが存在しない場合は自動作成する

使用するパッケージ：express、better-sqlite3
```

#### 生成される server.js のイメージ

```javascript
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('votes.db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

db.exec(`
  CREATE TABLE IF NOT EXISTS votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    option TEXT NOT NULL,
    voted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.get('/votes', (req, res) => {
  const rows = db.prepare(`
    SELECT option, COUNT(*) as count
    FROM votes
    GROUP BY option
    ORDER BY count DESC
  `).all();
  res.json(rows);
});

app.post('/votes', (req, res) => {
  const { option } = req.body;
  db.prepare('INSERT INTO votes (option) VALUES (?)').run(option);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
```

#### サーバーを起動して API を確認する

```bash
node server.js
```

ブラウザで `http://localhost:3000/votes` を開いて JSON が返ることを確認する。

Gemini CLI をデバッグの相手として使う：

- エラーが出たらエラーメッセージをそのまま Gemini CLI に貼る
- 「どこが間違っていると思う？」「どう修正すればいい？」と聞く

---

### 4. フロントエンドとバックエンドを接続する【講義＋実習】

Day4 で作った `index.html` を修正して、サーバーとデータをやりとりできるようにする。

#### 変更する内容

**投票する（POST）**：ボタンをクリックしたときに fetch で `/votes` にデータを送る。

```javascript
async function vote(option) {
  await fetch('/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ option })
  });
  loadResults();
}
```

**集計を表示する（GET）**：ページ読み込み時に `/votes` から集計データを取得して表示する。

```javascript
async function loadResults() {
  const res = await fetch('/votes');
  const data = await res.json();
  // data は [{ option: "ラーメン", count: 5 }, ...] の配列
  // これを HTML に表示する
}

window.onload = loadResults;
```

#### Gemini CLI への依頼例

```
今の index.html の投票ボタンを、クリックしたときに
POST /votes にデータを送るよう修正して。
また、ページ読み込み時に GET /votes から集計を取得して表示するようにして。
fetch を使って非同期で処理すること。
```

生成されたコードで確認すること：

- `fetch` はブラウザとサーバーをつなぐ HTTP 通信
- `async / await` は「通信が終わるまで待つ」仕組み
- `JSON.stringify` と `res.json()` はデータ形式の変換

---

### 5. 動作確認・デバッグ【実習】

全員で投票して、結果がリアルタイムに更新されることを確認する。

#### 確認する流れ

1. `node server.js` でサーバーを起動する
2. ブラウザで `http://localhost:3000` を開く
3. 投票ボタンをクリック → 集計が更新される
4. ページをリロード → 集計が保持されている（「消えた」問題が解決）
5. 別のタブで開いて投票 → 同じ DB に蓄積される

#### よくあるエラーと対処

| エラー | 原因 | 対処 |
| --- | --- | --- |
| `Cannot find module 'express'` | npm install が未完了 | `npm install express better-sqlite3` を再実行 |
| `EADDRINUSE: address already in use` | ポート 3000 が使用中 | 前回の `node server.js` を Ctrl + C で終了する |
| fetch が失敗する | サーバーが起動していない / URL が違う | ターミナルでサーバーが起動しているか確認 |
| 集計が表示されない | `loadResults()` が呼ばれていない | `window.onload` の設定を確認 |

#### デバッグのやり方

- ブラウザの開発者ツール（F12）→ Console タブでエラーを確認
- ブラウザの開発者ツール → Network タブで fetch の通信を確認
- エラーメッセージを Gemini CLI に貼って「原因と修正方法を教えて」と聞く

提出課題：

- `http://localhost:3000` の画面キャプチャ（投票結果が表示されている状態）
- リロード後に集計が保持されていることを確認したキャプチャ
- 「フロントエンド・バックエンド・データベースがどうつながっているか」を 2〜3 文で書く

---

### 6. フィジカルと接続する【実習】※時間があれば

時間内に到達しない場合は Day6 の冒頭で扱う。

micro:bit のセンサーデータをブラウザから読み取り、バックエンド経由で SQLite に保存する。

#### 仕組み

```
micro:bit（USB）
    ↓ Web Serial API（Chrome のブラウザ機能）
index.html（フロントエンド）
    ↓ fetch POST /sensor
server.js（バックエンド）
    ↓ INSERT
sensor_readings テーブル（SQLite）
    ↑ fetch GET /sensor
index.html（フロントエンド）← 最新センサー値を表示
```

Day2 のシリアル通信デモ（micro:bit → ブラウザゲーム）の発展版。今回はデータをサーバーに送って保存する。

#### バックエンドに sensor_readings テーブルと API を追加する

```javascript
db.exec(`
  CREATE TABLE IF NOT EXISTS sensor_readings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sensor TEXT NOT NULL,
    value REAL NOT NULL,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

app.post('/sensor', (req, res) => {
  const { sensor, value } = req.body;
  db.prepare('INSERT INTO sensor_readings (sensor, value) VALUES (?, ?)').run(sensor, value);
  res.json({ success: true });
});

app.get('/sensor', (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM sensor_readings ORDER BY recorded_at DESC LIMIT 20
  `).all();
  res.json(rows);
});
```

#### micro:bit 側のコード（MakeCode JavaScript）

Day2・Day3 で学んだ温度センサーの値をシリアルで送る。

```javascript
basic.forever(function () {
  serial.writeLine("temperature:" + input.temperature())
  basic.pause(2000)
})
```

#### フロントエンドで Web Serial API を使う

```javascript
async function connectSerial() {
  const port = await navigator.serial.requestPort();
  await port.open({ baudRate: 115200 });
  const reader = port.readable.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const text = new TextDecoder().decode(value);
    const [sensor, val] = text.trim().split(':');
    if (sensor && val) {
      await fetch('/sensor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sensor, value: parseFloat(val) })
      });
      loadSensorData();
    }
  }
}
```

#### 接続手順

1. micro:bit を USB で接続する
2. MakeCode でセンサーデータ送信コードを書き込む
3. ブラウザで「シリアル接続」ボタンをクリック → ポートを選択する
4. `GET /sensor` でセンサーデータが DB に蓄積されているか確認する

---

### 7. まとめ・Day6 予告【講義】

今日の振り返り：

- バックエンドがなぜ必要かを体感した
- Node.js + Express で API サーバーを構築した
- フロントエンドから fetch で GET / POST できた
- 「消えた」問題が完全に解決した

完成したシステムの構造：

```
ユーザー操作
    ↓
index.html（フロントエンド：表示・操作）
    ↓ fetch
server.js（バックエンド：処理・橋渡し）
    ↓ SQL
votes.db（データベース：永続保存）
```

Day6・Day7 の予告：

- 今日作ったシステムをベースに、自分でテーマを設定して制作する総合演習
- フィジカルとの接続が Day5 で未完了の場合は Day6 の冒頭で実施する
- Day6 では「誰のどんな課題を解決するか」をテーマとして設計し、実装を進める

---

## 授業内の進行例

| 時間 | 内容 | 種別 | リモート対応 |
| --- | --- | --- | --- |
| 1コマ目 0〜10分 | アイスブレイク・Day4 振り返り・今日の概要 | 全体参加 | Slack 参加 |
| 1コマ目 10〜30分 | バックエンドとは何か・API とは何か | 講義＋問いかけ | 視聴・チャット |
| 1コマ目 30〜50分 | プロジェクト構成・npm セットアップ | 実習 | 同様に実施 |
| 1コマ目 50〜95分 | Gemini CLI で server.js を作る・API を確認する | 講義＋実習 | 同様に実施 |
| 1コマ目 95〜100分 | 振り返り | 講義 | 参加可 |
| 休憩 | 10〜20分 | 休憩 | 休憩 |
| 2コマ目 0〜45分 | フロントエンドとバックエンドを接続（fetch の実装） | 講義＋実習 | 同様に実施 |
| 2コマ目 45〜70分 | 動作確認・デバッグ（全員で投票・リロード確認） | 実習 | 同様に実施 |
| 2コマ目 70〜95分 | フィジカルと接続（Web Serial API）※時間があれば | 実習 | 視聴（実機なし） |
| 2コマ目 95〜100分 | まとめ・Day6 予告 | 講義 | 参加可 |

## 事前学習

Day4 で作った投票アプリのコードを見直す。（1時間程度）

- `index.html` の中でカウントをどう管理しているかを確認する
- Gemini CLI に「fetch を使って GET リクエストを送るコードを書いて」と聞いて動きを理解する

バックエンドの基礎を調べる。（1時間程度）

- 「Node.js とは何か」「Express とは何か」を調べてメモする
- Gemini CLI への質問例：「Node.js と Express を使ってシンプルな API を作るとはどういうことか、初心者向けに説明して」

## 事後学習

今日作ったシステムの構造を図で整理する。（1時間程度）

- フロントエンド・バックエンド・データベースの役割と通信の流れを自分の言葉でまとめる
- 「この仕組みで、どんなアプリが作れるか」を 3 つ以上考える

Day6 の総合演習に向けて、自分が作りたいアプリのテーマを考えておく。（1時間程度）

- Day1 のワークショップで出たアイデアを見直す
- 「誰のどんな問題を解決するか」「必要な入力・出力・データは何か」を整理する
- Gemini CLI への質問例：「フロントエンド・バックエンド・SQLite を使ったシンプルなアプリのアイデアを 5 つ出して。学生生活に関係するものにして」

## 成果物の例

- 動作する投票アプリ（フロントエンド + バックエンド + SQLite が接続された状態）
- `server.js` と修正した `index.html`
- `http://localhost:3000` の画面キャプチャ（投票・集計が動いている状態）
- リロード後に集計が保持されていることを確認したキャプチャ
- フロントエンド・バックエンド・DB の関係を説明した記述（2〜3 文）
- Gemini CLI に投げたプロンプトとデバッグの記録
- （フィジカル接続まで到達した場合）センサーデータが DB に蓄積されているキャプチャ

## 備考

- 授業はハイブリッド形式（現地＋リモート）で実施
- フィジカル接続（セクション 6）は時間があれば進める。到達しない場合は Day6 の冒頭で扱う
- `better-sqlite3` は Windows 環境でビルドエラーが出る場合がある。エラーが出た場合は講師に連絡すること
- Web Serial API は Chrome / Edge で動作する。Firefox は未対応
- micro:bit は大学で用意する（現地参加者のみ実機を使用）。リモート参加者はセクション 6 は視聴で参加
- サーバーは `Ctrl + C` で停止できる。起動したまま放置しないよう注意
