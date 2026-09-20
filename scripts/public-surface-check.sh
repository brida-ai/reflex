#!/usr/bin/env bash
set -euo pipefail

bad=0
files=()
while IFS= read -r -d '' path; do
  files+=("$path")
done < <(git ls-files --cached -z)

for path in "${files[@]}"; do
  if [[ -L "$path" ]]; then
    echo "forbidden public symlink: $path"
    bad=1
    continue
  fi
  case "$path" in
    .env|.env.*|*.pem|*.key|*.p12|*.pfx|*.jks|*.keystore)
      echo "forbidden public path: $path"
      bad=1
      ;;
  esac
done

patterns=(
  'BEGIN [A-Z ]*PRIVATE KEY'
  'gh[pousr]_[A-Za-z0-9_]{20,}'
  'sk-[A-Za-z0-9_-]{20,}'
  'AKIA[0-9A-Z]{16}'
)

for pattern in "${patterns[@]}"; do
  for path in "${files[@]}"; do
    [[ -f "$path" && ! -L "$path" ]] || continue
    if grep -I -nE "$pattern" -- "$path" >/tmp/brida-public-match 2>/dev/null; then
      echo "possible secret pattern in $path: $pattern"
      cat /tmp/brida-public-match
      bad=1
    fi
  done
done

context_pattern='(/home/|/Users/|private repo|internal-only|non-public hostname|internal account ID)'
for path in "${files[@]}"; do
  [[ -f "$path" && ! -L "$path" ]] || continue
  case "$path" in
    AGENTS.md|GUIDELINES.md|SECURITY.md|scripts/public-surface-check.sh)
      continue
      ;;
  esac
  if grep -I -nE "$context_pattern" -- "$path" >/tmp/brida-public-context 2>/dev/null; then
    echo "possible private-context leak in $path:"
    cat /tmp/brida-public-context
    bad=1
  fi
done

rm -f /tmp/brida-public-match /tmp/brida-public-context
exit "$bad"
