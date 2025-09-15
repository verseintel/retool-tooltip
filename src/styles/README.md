# Shared Styles System

This directory contains reusable style definitions for the Value Components library.

## Structure

```
src/styles/
├── index.ts          # Central export for all styles
├── typography.ts     # Text and font styles
├── spacing.ts        # Layout and spacing utilities
├── tooltip.ts        # Tooltip-related styles
└── README.md         # This documentation
```

## Usage

### Importing Styles

```tsx
// Import specific style categories
import { typography, spacing, tooltip } from '../../styles'

// Or import everything
import * as sharedStyles from '../../styles'
```

### Component-Specific Styles

Each component should have its own `styles.ts` file that composes shared styles:

```tsx
// src/components/ValueChart/styles.ts
import { typography, spacing } from '../../styles'

export const valueChartStyles = {
  container: spacing.container,
  title: typography.label,
  value: typography.largeValue
  // ... component-specific styles
}
```

## Style Categories

### Typography (`typography.ts`)

- `label` - Standard label text
- `caption` - Small descriptive text
- `largeValue` - Main display values (32px)
- `mediumValue` - Secondary values (24px)
- `smallValue` - Small values (18px)

### Spacing (`spacing.ts`)

- `container` - Main flex container
- `rowContainer` - Horizontal layout container
- `marginBottom/Top/Right/Left` - Standard margins
- `noMargin*` - Zero margin utilities

### Tooltip (`tooltip.ts`)

- `icon` - Tooltip trigger icon
- `container` - Tooltip popup
- `arrow` - Tooltip arrow base
- `arrowDown/Up` - Arrow directions
- `content` - Tooltip content spacing

## Best Practices

1. **Compose, Don't Duplicate**: Use object spread to combine shared styles
2. **Component-Specific**: Keep component-unique styles in component files
3. **Consistent Naming**: Use descriptive names for style objects
4. **Type Safety**: Leverage TypeScript for style property validation

## Example: Creating a New Component

```tsx
// 1. Create component styles
// src/components/ValueCard/styles.ts
import { typography, spacing } from '../../styles'

export const valueCardStyles = {
  container: {
    ...spacing.container,
    padding: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px'
  },
  title: typography.label,
  value: typography.largeValue,
  subtitle: typography.caption
}

// 2. Use in component
// src/components/ValueCard/index.tsx
import { valueCardStyles as styles } from './styles'

export const ValueCard: FC = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Title</h3>
      <div style={styles.value}>1,234</div>
      <p style={styles.subtitle}>Subtitle</p>
    </div>
  )
}
```

## Benefits

- ✅ **Consistency**: Shared styles ensure visual consistency
- ✅ **Maintainability**: Update styles in one place
- ✅ **Reusability**: Easy to create new components
- ✅ **Type Safety**: TypeScript support for all styles
- ✅ **Performance**: No runtime CSS processing needed
