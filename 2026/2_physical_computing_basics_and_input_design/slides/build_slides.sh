#!/bin/zsh
set -euo pipefail
cd "$(dirname "$0")"
if command -v marp >/dev/null 2>&1; then
  marp day2.md --html --allow-local-files -o day2.html
elif command -v npx >/dev/null 2>&1; then
  npx -y @marp-team/marp-cli day2.md --html --allow-local-files -o day2.html
else
  echo "Marp CLI が見つかりません。'marp' または 'npx @marp-team/marp-cli' を使えるようにしてください。" >&2
  exit 1
fi
