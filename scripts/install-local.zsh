#!/bin/zsh

set -euo pipefail

if (( $# != 1 )); then
  print -u2 "Usage: $0 /path/to/obsidian/vault"
  exit 2
fi

vault_path="${1:A}"
repo_path="${0:A:h:h}"
themes_path="$vault_path/.obsidian/themes"
target_path="$themes_path/Firelight"
manifest_link="$target_path/manifest.json"
theme_link="$target_path/theme.css"

if [[ ! -d "$vault_path/.obsidian" ]]; then
  print -u2 "Not an Obsidian vault: $vault_path"
  exit 1
fi

if [[ -L "$target_path" && "${target_path:A}" == "$repo_path" ]]; then
  print "Firelight is already linked at $target_path"
  exit 0
fi

if [[ "$vault_path" == "$repo_path"/* && -d "$target_path" && \
  -L "$manifest_link" && "${manifest_link:A}" == "$repo_path/manifest.json" && \
  -L "$theme_link" && "${theme_link:A}" == "$repo_path/theme.css" ]]; then
  print "Firelight files are already linked at $target_path"
  exit 0
fi

if [[ -e "$target_path" || -L "$target_path" ]]; then
  print -u2 "Refusing to replace existing path: $target_path"
  exit 1
fi

mkdir -p "$themes_path"

# Linking the entire repository from a vault nested inside it creates a
# recursive directory tree. Link the two files Obsidian needs in that case.
if [[ "$vault_path" == "$repo_path"/* ]]; then
  mkdir "$target_path"
  ln -s "$repo_path/manifest.json" "$manifest_link"
  ln -s "$repo_path/theme.css" "$theme_link"
  print "Linked Firelight files at $target_path"
else
  ln -s "$repo_path" "$target_path"
  print "Linked Firelight at $target_path"
fi
