# NPM Publishing Guide - Vedic UI Kit

## Package Information

**Package Name**: `@vedic/ui-kit`
**Scope**: @vedic (scoped package)
**Current Version**: 0.1.0
**Build Output**: ~15KB gzipped (ES module) + ~13KB gzipped (UMD)

## Pre-Publishing Checklist

- ✅ Package built successfully
- ✅ All components exported correctly
- ✅ TypeScript definitions generated
- ✅ CSS stylesheet included
- ✅ package.json configured
- ✅ README created
- ✅ LICENSE added (MIT)
- ✅ CHANGELOG documented
- ✅ .npmignore configured
- ✅ Git repository linked

## Build Output Structure

```
dist/
├── vedic-ui-kit.es.js      (ES Module - 84.75 KB)
├── vedic-ui-kit.umd.js     (UMD Module - 56.91 KB)
├── ui-kit.css              (Stylesheet - 13.40 KB)
├── index.d.ts              (Type definitions)
└── [component types]        (Individual .d.ts files)
```

## Steps to Publish to NPM

### 1. Setup NPM Account
```bash
# If you don't have an NPM account, create one at https://www.npmjs.com
# Then login in terminal
npm login
# Enter your username, password, and email when prompted
```

### 2. Verify Package Configuration
```bash
# Check package.json for errors
npm list
# Verify build is ready
ls dist/
```

### 3. Publish to NPM

**First time publishing (new package):**
```bash
npm publish --access public
```

**Note**: The package is scoped (@vedic/), so you need to specify `--access public` to make it publicly available.

### 4. Verify Publication
```bash
# Check NPM package page
npm view @vedic/ui-kit

# Or visit: https://www.npmjs.com/package/@vedic/ui-kit
```

## Version Management

When publishing updates, follow semantic versioning:

```bash
# Patch version (bug fixes): 0.1.0 → 0.1.1
npm version patch
npm publish

# Minor version (new features): 0.1.0 → 0.2.0
npm version minor
npm publish

# Major version (breaking changes): 0.1.0 → 1.0.0
npm version major
npm publish
```

## Installation for Users

After publishing, users can install with:

```bash
npm install @vedic/ui-kit
yarn add @vedic/ui-kit
pnpm add @vedic/ui-kit
```

## Usage Example for Users

```tsx
// Import components
import { Button, TextInput, Card } from '@vedic/ui-kit';
import '@vedic/ui-kit/css';

// Use in application
function App() {
  return (
    <Card title="Example">
      <TextInput label="Name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Package Exports

The package supports multiple import methods:

```tsx
// Direct import (CommonJS/ES Module auto-detection)
import { Button } from '@vedic/ui-kit';

// ES Module specific
import { Button } from '@vedic/ui-kit/dist/vedic-ui-kit.es.js';

// CSS import
import '@vedic/ui-kit/css';

// UMD in browser
<script src="https://unpkg.com/@vedic/ui-kit@0.1.0/dist/vedic-ui-kit.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@vedic/ui-kit@0.1.0/dist/ui-kit.css">
```

## NPM Page Features

The NPM package page will display:
- **Title**: Vedic Design System - Complete React Components Library
- **Description**: Full component library with TypeScript support
- **Repository**: Link to GitHub
- **Homepage**: GitHub project page
- **Issues**: Bug tracker
- **Keywords**: react, components, ui-kit, design-system, vedic, typescript
- **License**: MIT
- **Author**: Rushi Programmer

## Troubleshooting

### Issue: "Package already registered"
**Solution**: The package name might already exist. Try a different scope or name.

### Issue: "403 Forbidden"
**Solution**: 
- Ensure you're logged in: `npm login`
- Check if you have permission to publish to the scope
- For scoped packages, you need to publish with `--access public`

### Issue: "Missing files in dist/"
**Solution**: Run `npm run build` before publishing

### Issue: "Package file includes unwanted files"
**Solution**: Update `.npmignore` to exclude files and rebuild

## Maintenance

### After Publishing:

1. **Monitor**: Check NPM downloads and feedback
2. **Update**: Use semantic versioning for updates
3. **Documentation**: Keep README and examples up-to-date
4. **Changelog**: Document all changes
5. **Testing**: Test package installation locally before each release

### Local Installation Testing

```bash
# Create a test project
npx create-react-app test-vedic

# Test local package
cd test-vedic
npm install ../../test/vitelib/dist

# Or from npm after publishing
npm install @vedic/ui-kit@latest
```

## CDN Distribution

After publishing, the package will be available via unpkg:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@vedic/ui-kit/dist/ui-kit.css">

<!-- UMD Bundle -->
<script src="https://unpkg.com/@vedic/ui-kit/dist/vedic-ui-kit.umd.js"></script>

<!-- Specific Version -->
<script src="https://unpkg.com/@vedic/ui-kit@0.1.0/dist/vedic-ui-kit.umd.js"></script>
```

## Next Steps

1. Run: `npm publish --access public`
2. Wait for package to be available on NPM (~1 minute)
3. Share package link with users
4. Monitor downloads and feedback
5. Plan next releases based on feedback

## Resources

- [NPM Documentation](https://docs.npmjs.com/)
- [Scoped Packages](https://docs.npmjs.com/cli/v8/using-npm/scope)
- [Publishing Guidelines](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Package.json Reference](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

---

**Ready to publish?** Run: `npm publish --access public`
