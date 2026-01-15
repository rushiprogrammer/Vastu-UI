<!-- Guide: Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Vedic UI Kit - Development Guide

## Overview
This workspace contains **@vedic/ui-kit**, a comprehensive React component library built with TypeScript and Vite. The library exports 13 production-ready components with full type safety and a beautiful Vedic-inspired design system.

## Project Structure

```
vitelib/
├── src/
│   ├── components/           # React component source files
│   │   ├── AppBar.tsx        # Navigation bar component
│   │   ├── Button.tsx        # Button component (primary/secondary)
│   │   ├── Card.tsx          # Card container component
│   │   ├── Checkbox.tsx      # Checkbox input component
│   │   ├── CommandBar.tsx    # Command toolbar component
│   │   ├── FileUpload.tsx    # File upload with drag & drop
│   │   ├── MandalaMandala.tsx # 8x8/9x9 grid system + cells
│   │   ├── Radio.tsx         # Radio button component
│   │   ├── Slider.tsx        # Range slider component
│   │   ├── SplitView.tsx     # Sidebar layout component
│   │   ├── TextInput.tsx     # Text input field component
│   │   └── ThemeToggle.tsx   # Light/dark mode toggle
│   ├── styles/
│   │   └── vedic-design-system.css  # Complete style library
│   └── index.ts              # Library entry point & exports
├── dist/                     # Build output (compiled library)
├── package.json             # Project configuration
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Documentation

```

## Components Overview

### Core UI Components
These are foundational components for building user interfaces:

#### Button
```tsx
import { Button } from '@vedic/ui-kit';

<Button variant="primary">Click me</Button>
<Button variant="secondary">Secondary</Button>
<Button size="sm" variant="primary">Small</Button>
<Button size="lg" variant="primary">Large</Button>
```

#### TextInput
```tsx
import { TextInput } from '@vedic/ui-kit';

<TextInput 
  label="Name"
  placeholder="Enter your name"
  type="text"
/>

<TextInput
  label="Email"
  error="Invalid email address"
  type="email"
/>
```

#### Checkbox & Radio
```tsx
import { Checkbox, Radio } from '@vedic/ui-kit';

<Checkbox 
  checked={isChecked}
  onChange={setIsChecked}
  label="I agree"
/>

<Radio
  checked={selected === 'option1'}
  onChange={() => setSelected('option1')}
  label="Option 1"
  name="options"
  value="option1"
/>
```

#### Slider
```tsx
import { Slider } from '@vedic/ui-kit';

<Slider
  label="Volume"
  min={0}
  max={100}
  value={volume}
  onChange={(e) => setVolume(e.target.value)}
/>
```

#### Card
```tsx
import { Card } from '@vedic/ui-kit';

<Card title="Profile">
  <p>User information goes here</p>
</Card>
```

#### ThemeToggle
```tsx
import { ThemeToggle } from '@vedic/ui-kit';

<ThemeToggle onChange={(isDark) => console.log(isDark)} />
```

### Layout Components

#### AppBar
Navigation bar with customizable sections:
```tsx
import { AppBar } from '@vedic/ui-kit';

<AppBar 
  currentView="overview"
  onNavigate={(view) => console.log(view)}
/>
```

#### SplitView
Sidebar + main content layout:
```tsx
import { SplitView } from '@vedic/ui-kit';

const items = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '👤', label: 'Profile' },
];

<SplitView
  displayMode="compact"
  panePosition="left"
  items={items}
>
  <h1>Main Content</h1>
  <p>Your content here</p>
</SplitView>
```

#### MandalaMandala (Grid System)
8x8 or 9x9 grid-based layout system:
```tsx
import { MandalaMandala, MandalaCell } from '@vedic/ui-kit';

<MandalaMandala size={8}>
  <MandalaCell row={1} col={1} span={2}>
    Header
  </MandalaCell>
  <MandalaCell row={1} col={3} span={6}>
    Main Content
  </MandalaCell>
  <MandalaCell row={2} col={1} span={8}>
    Footer
  </MandalaCell>
</MandalaMandala>
```

### Advanced Components

#### CommandBar
Toolbar for displaying commands:
```tsx
import { CommandBar } from '@vedic/ui-kit';

const commands = [
  { icon: '💾', label: 'Save', onClick: save },
  { icon: '🔄', label: 'Refresh', onClick: refresh },
  { icon: '❌', label: 'Delete', onClick: delete, disabled: true },
];

<CommandBar commands={commands} />
```

#### FileUpload
Drag-and-drop file upload with transformations:
```tsx
import { FileUpload } from '@vedic/ui-kit';

<FileUpload
  multiple={true}
  accept=".pdf,.docx,.xlsx"
  maxSize={10485760}
  onUpload={(files) => console.log('Files:', files)}
  onTransform={async (files) => {
    // Process files asynchronously
    console.log('Processing...');
  }}
/>
```

## Design Tokens

The library uses CSS custom properties for theming:

```css
:root {
  /* Spacing (8px base unit) */
  --angula: 8px;
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 32px;
  --space-lg: 48px;

  /* Colors */
  --bg: #f8fafc;
  --surface: #ffffff;
  --text: #1e293b;
  --muted: #64748b;
  --accent: #f97316;     /* Saffron */
  --border: #e2e8f0;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;

  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

## Theming

### Light/Dark Mode
The library supports light and dark themes via the `data-theme` attribute:

```html
<!-- Light theme (default) -->
<html data-theme="light">

<!-- Dark theme -->
<html data-theme="dark">
```

### Programmatic Theme Switching
```tsx
// Switch theme
document.documentElement.setAttribute('data-theme', 'dark');

// Save preference
localStorage.setItem('theme', 'dark');

// Load preference on app startup
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server on http://localhost:5173
npm run dev

# Build library for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm lint
```

## Build Output

The library is compiled into two formats:

- **ES Module**: `dist/vedic-ui-kit.es.js` (tree-shakeable)
- **UMD Module**: `dist/vedic-ui-kit.umd.js` (browser compatible)
- **Styles**: `dist/ui-kit.css`

## Installation & Publishing

### Local Installation
```bash
npm link
# Then in another project:
npm link @vedic/ui-kit
```

### Publishing to NPM
```bash
# Update version in package.json
npm version patch

# Build
npm run build

# Publish
npm publish --access public
```

### Installing from NPM
```bash
npm install @vedic/ui-kit
```

## Usage Example

Complete application example:

```tsx
import React, { useState } from 'react';
import {
  AppBar,
  Button,
  TextInput,
  Checkbox,
  Card,
  ThemeToggle,
  SplitView,
} from '@vedic/ui-kit';
import '@vedic/ui-kit/css';

function App() {
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);

  const navItems = [
    { icon: '🏠', label: 'Home' },
    { icon: '📚', label: 'Docs' },
  ];

  return (
    <div>
      <AppBar currentView="home" />
      <ThemeToggle />
      
      <SplitView items={navItems}>
        <Card title="Sign Up">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          
          <Checkbox
            checked={agreed}
            onChange={setAgreed}
            label="I agree to terms"
          />
          
          <Button
            variant="primary"
            onClick={() => console.log('Submitted:', { name, agreed })}
            disabled={!agreed}
          >
            Submit
          </Button>
        </Card>
      </SplitView>
    </div>
  );
}

export default App;
```

## Type Safety

All components are fully typed with TypeScript:

```tsx
import type { ReactNode } from 'react';
import { Card } from '@vedic/ui-kit';

interface Props {
  children: ReactNode;
}

export function MyComponent({ children }: Props) {
  return <Card>{children}</Card>;
}
```

## Accessibility

Components include:
- Semantic HTML elements
- ARIA labels where appropriate
- Keyboard navigation support
- Focus management
- Reduced motion support for animations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

Customize the library by overriding CSS variables in your app:

```css
:root {
  /* Override accent color */
  --accent: #3b82f6; /* Blue instead of saffron */

  /* Override text color */
  --text: #111827;

  /* Override border radius */
  --radius-md: 12px;
}
```

## Contributing

When adding new components:

1. Create component file in `src/components/`
2. Export component from `src/index.ts`
3. Add styles to `src/styles/vedic-design-system.css`
4. Run `npm run build` to verify
5. Test with `npm run dev`

## Support & Questions

For issues or questions:
- Check the component examples in this guide
- Review component source in `src/components/`
- Check `src/styles/vedic-design-system.css` for styling

---

**Library Version**: 0.1.0
**Last Updated**: January 15, 2026
**Built with**: React 19.2, TypeScript 5.9, Vite 7
