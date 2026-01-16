#!/bin/bash

# Vedic UI Kit - NPM Publish Script
# Automates the publishing process to NPM

set -e

echo "🚀 Vedic UI Kit - NPM Publishing Script"
echo "======================================"
echo ""

# Check if logged in to NPM
if ! npm whoami > /dev/null 2>&1; then
  echo "❌ Not logged in to NPM"
  echo "Please run: npm login"
  exit 1
fi

echo "✅ Logged in as: $(npm whoami)"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
  echo "⚠️  dist/ folder not found"
  echo "Building package..."
  npm run build
fi

echo "📦 Building package..."
npm run build
echo "✅ Build complete"
echo ""

# Get current version
version=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
echo "📦 Publishing @vedic/ui-kit@$version"
echo ""

# Show what will be published
echo "Files to be published:"
npm pack --dry-run | grep -E '\.(js|css|d\.ts)$' | sed 's/^/  ✓ /'
echo ""

# Confirm before publishing
read -p "Continue with publishing? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🔄 Publishing to NPM..."
  npm publish --access public
  
  if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully published @vedic/ui-kit@$version"
    echo ""
    echo "📚 Package URL: https://www.npmjs.com/package/@vedic/ui-kit"
    echo "💾 Install: npm install @vedic/ui-kit"
    echo "🔗 GitHub: https://github.com/rushiprogrammer/Vastu-UI"
    echo ""
    
    # Ask to create git tag
    read -p "Create git tag for this release? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git tag -a "v$version" -m "Release v$version"
      git push origin "v$version"
      echo "✅ Git tag created and pushed"
    fi
  else
    echo "❌ Publishing failed"
    exit 1
  fi
else
  echo "Publishing cancelled"
  exit 0
fi
