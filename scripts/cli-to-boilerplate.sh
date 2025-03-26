#!/usr/bin/env bash

set -e

NPM_ROOT=$(npm root -g)
SRC="$NPM_ROOT/@junobuild/cli/templates/eject"

DEST="./boilerplate/functions"

if [ -d "$DEST" ]; then
  rm -rf "$DEST"
fi

mkdir -p "$DEST"

cp -r "$SRC/"* "$DEST/"

echo "✅ Boilerplate copied to $DEST"