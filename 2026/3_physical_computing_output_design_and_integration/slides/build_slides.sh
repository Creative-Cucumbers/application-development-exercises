#!/bin/zsh
set -euo pipefail
cd "$(dirname "$0")"
if command -v marp >/dev/null 2>&1; then
  marp day3.md --html --allow-local-files -o day3.html
elif command -v npx >/dev/null 2>&1; then
  npx -y @marp-team/marp-cli day3.md --html --allow-local-files -o day3.html
else
  echo "Marp CLI が見つかりません。'marp' または 'npx @marp-team/marp-cli' を使えるようにしてください。" >&2
  exit 1
fi
