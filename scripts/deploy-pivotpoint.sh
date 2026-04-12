#!/bin/bash
# Build and deploy the Pivot Point podcast page
#
# Source repo: /Users/nickmichael/Documents/GitHub/pivot-point-stories
# Deploy target: /Users/nickmichael/Documents/GitHub/counselingtherapy/pivotpoint
#
# The pivotpoint/ directory in this repo contains BUILT OUTPUT ONLY.
# All source code edits must be made in the pivot-point-stories repo,
# then built and copied here.

set -e

SOURCE_DIR="/Users/nickmichael/Documents/GitHub/pivot-point-stories"
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
