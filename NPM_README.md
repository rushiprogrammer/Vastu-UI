# Vedic UI Kit 🌸

A comprehensive React component library built with TypeScript and Vite. Featuring 50+ production-ready components with a beautiful Vedic-inspired design system.

[![npm version](https://badge.fury.io/js/%40vedic%2Fui-kit.svg)](https://badge.fury.io/js/%40vedic%2Fui-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?logo=github)](https://github.com/rushiprogrammer/Vastu-UI)

## Features

✨ **50+ Components** - Buttons, inputs, layouts, navigation, and more
🎨 **Beautiful Design** - Vedic-inspired color palette and typography
🌓 **Light/Dark Mode** - Built-in theme switching support
📱 **Responsive** - Mobile-first design with full responsiveness
♿ **Accessible** - WCAG compliant with keyboard navigation
📦 **Tree-Shakeable** - ES modules for optimal bundle size
🧩 **Composable** - Built with React hooks and composition patterns
⚡ **Performance** - Lightweight with minimal dependencies
💪 **TypeScript** - Full type safety and IntelliSense support

## Installation

```bash
npm install @vedic/ui-kit
# or
yarn add @vedic/ui-kit
# or
pnpm add @vedic/ui-kit
```

## Quick Start

```tsx
import { Button, TextInput, Card } from '@vedic/ui-kit';
import '@vedic/ui-kit/css';

function App() {
  return (
    <Card title="Welcome">
      <TextInput label="Name" placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}

export default App;
```

## Components

### Core Components
- **Button** - Primary, secondary, and variant buttons
- **TextInput** - Text field with validation
- **Checkbox** - Checkboxes with labels
- **Radio** - Radio button groups
- **Slider** - Range slider control
- **ToggleSwitch** - On/off switch
- **Select/ComboBox** - Dropdown selection

### Advanced Components
- **IconButton** - Icon-only buttons
- **SplitButton** - Button with dropdown options
- **ToggleButtonFlyout** - Toggle with flyout panel
- **FileUpload** - Drag-and-drop file upload
- **DatePicker** - Date selection
- **TimePicker** - Time selection

### Layout Components
- **Card** - Card container
- **SplitView** - Sidebar layout
- **Grid** - Flexible grid system
- **StackPanel** - Vertical/horizontal stacking
- **MandalaMandala** - 8x8/9x9 grid layout
- **AppBar** - Top navigation bar
- **Footer** - Page footer

### Progress & Information
- **ProgressBar** - Linear progress indicator
- **ProgressRing** - Circular progress indicator
- **InfoBar** - Information banner
- **InfoBadge** - Status badge
- **ToolTip** - Hover tooltip

## Usage Examples

### Button Variants
```tsx
import { Button } from '@vedic/ui-kit';

<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button disabled>Disabled</Button>
```

### Input Controls
```tsx
import { TextInput, PasswordBox, NumberBox } from '@vedic/ui-kit';

<TextInput label="Name" placeholder="Enter name" />
<PasswordBox label="Password" />
<NumberBox label="Age" min={0} max={120} />
```

### Theme Toggle
```tsx
import { ThemeToggle } from '@vedic/ui-kit';

<ThemeToggle onChange={(isDark) => {
  document.documentElement.setAttribute(
    'data-theme', 
    isDark ? 'dark' : 'light'
  );
}} />
```

### Layout
```tsx
import { SplitView, Card } from '@vedic/ui-kit';

const items = [
  { icon: 'dashboard', label: 'Dashboard' },
  { icon: 'settings', label: 'Settings' },
];

<SplitView items={items}>
  <Card title="Content">Your content here</Card>
</SplitView>
```

## Theming

Customize the library using CSS variables:

```css
:root {
  /* Accent Color */
  --accent: #f97316;
  
  /* Base Colors */
  --bg: #f8fafc;
  --surface: #ffffff;
  --text: #1e293b;
  --border: #e2e8f0;
  
  /* Radius */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  
  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 32px;
  --space-lg: 48px;
}

/* Dark Theme */
[data-theme="dark"] {
  --bg: #020617;
  --surface: #0f172a;
  --text: #f1f5f9;
  --border: #1e293b;
}
```

## API Documentation

### Button Props
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### TextInput Props
```tsx
interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
```

### Card Props
```tsx
interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}
```

## Styling

Import the stylesheet in your application:

```tsx
// CommonJS
const styles = require('@vedic/ui-kit/css');

// ES Module
import '@vedic/ui-kit/css';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Bundle Size**: ~45KB (minified + gzipped)
- **Minimal Dependencies**: Only React and React DOM
- **Tree-Shakeable**: ES modules support
- **CSS-in-JS**: Lightweight inline styles
- **Fast Rendering**: Optimized component updates

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our [GitHub repository](https://github.com/rushiprogrammer/Vastu-UI).

## License

MIT © [Rushi Programmer](https://github.com/rushiprogrammer)

## Support

- 📖 [Documentation](https://github.com/rushiprogrammer/Vastu-UI)
- 🐛 [Issue Tracker](https://github.com/rushiprogrammer/Vastu-UI/issues)
- 💬 [Discussions](https://github.com/rushiprogrammer/Vastu-UI/discussions)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

## Roadmap

- [ ] Storybook documentation
- [ ] More component examples
- [ ] Figma design kit
- [ ] Animation library
- [ ] Advanced form components
- [ ] Data table component
- [ ] Modal dialogs
- [ ] Toast notifications

---

Made with ❤️ by Rushi Programmer
