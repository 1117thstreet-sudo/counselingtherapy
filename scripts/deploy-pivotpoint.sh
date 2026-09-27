#!/bin/bash
# Build and deploy the Pivot Point podcast page
#
# Source repo: ../pivot-point-stories (sibling of this repo)
# Deploy target: ./pivotpoint
#
# The pivotpoint/ directory in this repo contains BUILT OUTPUT ONLY.
# All source code edits must be made in the pivot-point-stories repo,
# then built and copied here.
#
# WARNING (Sep 2026): the pivot-point-stories repo on GitHub is out of date.
# It predates the Google Form questionnaire links, the Substack embed/link and
# the photo path fixes, which were made directly in the built bundle here.
# Rebuilding from it will undo those changes until they are ported to source.

set -e

SOURCE_DIR="$(cd "$(dirname "$0")/../.." && pwd)/pivot-point-stories"
DEPLOY_DIR="$(cd "$(dirname "$0")/.." && pwd)/pivotpoint"

echo "Building pivot-point-stories..."
cd "$SOURCE_DIR"
npm run build

echo "Deploying to $DEPLOY_DIR..."
# Remove old assets but keep lovable-uploads (static images not part of the build)
rm -rf "$DEPLOY_DIR/assets"

# Copy new build output
cp -r "$SOURCE_DIR/dist/"* "$DEPLOY_DIR/"

echo "Done. Files deployed:"
ls -la "$DEPLOY_DIR/assets/"
echo ""
echo "Remember to commit and push the counselingtherapy repo."
