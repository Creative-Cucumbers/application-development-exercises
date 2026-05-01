# セットアップトラブルシューティング

Day4 のセットアップ（VSCode / Git / Node.js / Gemini CLI）で詰まったときの対処法をまとめる。

---

## 動作確認コマンド

ターミナル（Mac）またはコマンドプロンプト / PowerShell（Windows）で以下を実行する。

```
git --version
node --version
gemini --version
```

3つとも `x.x.x` のようなバージョン番号が表示されれば OK。

---

## Windows 固有の問題

### git / node / gemini が「見つからない」と言われる

**症状**：`git --version` を実行すると「'git' は内部コマンドまたは外部コマンド...」と表示される。

**対処**：

1. 一度ターミナルを閉じて再起動する（インストール直後はパスが反映されていないことがある）
2. それでも解決しない場合、「環境変数」を確認する：
   - スタートメニューで「環境変数」と検索 → 「システム環境変数の編集」
   - 「Path」に Git / Node.js のインストールパスが含まれているか確認する

### npm install -g で `permission denied` / `EACCES` エラーが出る

**対処**：PowerShell を**管理者として実行**してからコマンドを再実行する。

---

## Mac 固有の問題

### git --version で「Developer Tools が必要」というダイアログが出る

**対処**：ダイアログの「インストール」をクリックして Xcode Command Line Tools をインストールする。完了後に再度 `git --version` を実行する。

### npm install -g で `permission denied` / `EACCES` エラーが出る

**対処**：以下のいずれかを試す。

1. コマンドの先頭に `sudo` を付けて実行する（パスワードを求められたらログインパスワードを入力）：
   ```
   sudo npm install -g @google/gemini-cli
   ```

2. 上記でも解決しない場合は Homebrew 経由で Node.js を入れ直すと解消することが多い：
   - Homebrew のインストール：https://brew.sh/
   - `brew install node` で Node.js をインストール後、`npm install -g @google/gemini-cli` を再実行

---

## Gemini CLI 固有の問題

### `gemini: command not found`

**原因**：`npm install -g` は完了しているが、インストール先のパスが通っていない。

**対処**：

1. ターミナルを閉じて再起動する
2. 再起動後も出る場合、npm のグローバルインストール先を確認する：
   ```
   npm prefix -g
   ```
   表示されたパスの `bin/` フォルダが PATH に含まれているかを確認する。

### Google アカウント認証が完了しない / 認証画面が開かない

**対処**：

1. `gemini` を実行してブラウザで認証画面が開くのを待つ
2. ブラウザが自動で開かない場合、ターミナルに表示される URL をコピーしてブラウザで開く
3. 認証後、ターミナルに戻って Enter を押す

### 認証済みなのにエラーが出る（再ログインが必要なとき）

**対処**：以下のコマンドでキャッシュを削除してから再起動する。

- Mac：`rm -rf ~/.gemini`
- Windows：`%APPDATA%\gemini` フォルダを削除

---

## Node.js 関連

### `node --version` でエラーが出る

**対処**：https://nodejs.org/ から **LTS 版**（推奨版）を改めてダウンロードしてインストールする。Current 版（最新版）ではなく LTS 版を選ぶこと。

---

## それでも解決しない場合

Slack で質問するときに以下の情報を添付すると解決が早い：

1. **OS の種類とバージョン**（例：Windows 11、macOS 15.3）
2. **実行したコマンド**（コピペ）
3. **表示されたエラーメッセージ全文**（スクリーンショット or テキスト）
