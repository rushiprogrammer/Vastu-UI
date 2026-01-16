#!/bin/bash

# Vedic UI Kit - Package Verification Script
# Verifies the build output is ready for NPM publishing

echo "🔍 Vedic UI Kit - Package Verification"
echo "========================================"
echo ""

# Check if dist folder exists
if [ ! -d "dist" ]; then
  echo "❌ dist/ folder not found. Run 'npm run build' first."
  exit 1
fi

echo "✓ dist/ folder found"
echo ""

# Check required files in dist/
required_files=(
  "vedic-ui-kit.es.js"
  "vedic-ui-kit.umd.js"
  "ui-kit.css"
  "index.d.ts"
)

echo "📦 Checking build output files:"
for file in "${required_files[@]}"; do
  if [ -f "dist/$file" ]; then
    size=$(ls -lh "dist/$file" | awk '{print $5}')
    echo "  ✓ $file ($size)"
  else
    echo "  ❌ $file (missing)"
    exit 1
  fi
done

echo ""

# Check package.json
echo "📄 Checking package.json:"
if [ -f "package.json" ]; then
  echo "  ✓ package.json exists"
  
  # Check for required fields
  if grep -q '"name"' package.json; then
    name=$(grep '"name"' package.json | head -1 | sed 's/.*"name": "\(.*\)".*/\1/')
    echo "    - Package name: $name"
  fi
  
  if grep -q '"version"' package.json; then
    version=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
    echo "    - Version: $version"
  fi
  
  if grep -q '"main"' package.json; then
    echo "    ✓ Main entry point configured"
  fi
  
  if grep -q '"module"' package.json; then
    echo "    ✓ ES module entry point configured"
  fi
  
  if grep -q '"types"' package.json; then
    echo "    ✓ TypeScript definitions configured"
  fi
else
  echo "  ❌ package.json not found"
  exit 1
fi

echo ""

# Check documentation files
echo "📚 Checking documentation:"
doc_files=("README.md" "LICENSE" "CHANGELOG.md")
for file in "${doc_files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ⚠️  $file (optional)"
  fi
done

echo ""

# Check git configuration
echo "🔗 Checking git configuration:"
if [ -d ".git" ]; then
  echo "  ✓ Git repository found"
  
  if grep -q "repository" package.json; then
    echo "  ✓ Repository URL configured"
  fi
else
  echo "  ⚠️  Not a git repository"
fi

echo ""

# Summary
echo "========================================"
echo "✅ Package is ready for NPM publishing!"
echo ""
echo "Next steps:"
echo "  1. npm login"
echo "  2. npm publish --access public"
echo ""
echo "Or use: npm publish"
echo "========================================"
