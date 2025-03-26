#!/usr/bin/env bash

set -e

NPM_ROOT=$(npm root -g)
SRC="$NPM_ROOT/@junobuild/cli/templates/eject"

DEST="./boilerplate"
DEST_FUNCTIONS="$DEST/functions"

if [ -d "$DEST" ]; then
  rm -rf "$DEST"
fi

mkdir -p "$DEST_FUNCTIONS"

cp -r "$SRC/"* "$DEST_FUNCTIONS/"

echo "✅ Boilerplate copied to $DEST"