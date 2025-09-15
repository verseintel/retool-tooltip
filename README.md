# Value Components

A collection of reusable UI components for Retool applications, built with a focus on data visualization and value display. This library provides a consistent design system with shared styles and components optimized for business dashboards and analytics.

## Components

### ValueStatistic

A comprehensive statistic display component that shows key metrics with customizable formatting and tooltips.

**Features:**

- **Flexible Formatting**: Support for Standard, Numeric, Percent, and Currency (USD/BRL) formats
- **Customizable Precision**: Configurable minimum and maximum decimal places
- **Interactive Tooltips**: Hover-based help text with markdown support
- **Accessibility**: Full keyboard navigation and screen reader support
- **Responsive Design**: Clean, modern layout that works across devices

**Parameters:**

- **`Label`** (string, default: "Gross volume") - The label text displayed above the value
- **`Value`** (number, default: 7552.8) - The numeric value to display
- **`Caption`** (string, default: "Since last month") - Descriptive text below the value
- **`Format`** (dropdown) - Value format: Standard, Numeric, Percent, Currency (BRL), Currency (USD)
- **`Tooltip`** (string) - Help text with markdown support (**bold**, _italic_, line breaks)
- **`Minimum Fraction Digits`** (number, default: 2) - Minimum decimal places
- **`Maximum Fraction Digits`** (number, default: 2) - Maximum decimal places

**Example Usage:**

```
Label: "Revenue"
Value: 125000
Caption: "Q4 2024"
Format: "Currency (USD)"
Tooltip: "**Total revenue** for Q4 2024\nIncluding all product lines"
```

## Design System

This library includes a comprehensive shared styles system that ensures consistency across all components:

### Shared Styles Architecture

```
src/styles/
├── typography.ts     # Text and font styles
├── spacing.ts        # Layout and spacing utilities
├── tooltip.ts        # Tooltip-related styles
└── index.ts          # Central export
```

### Style Categories

- **Typography**: Consistent text styles (labels, captions, values)
- **Spacing**: Layout utilities and margin/padding helpers
- **Tooltip**: Reusable tooltip components and interactions

### Component Structure

Each component follows a consistent pattern:

```
src/components/ComponentName/
├── index.tsx         # Component logic
└── styles.ts         # Component-specific styles
```

## Usage

1. **Drag Components**: Add components to your Retool canvas
2. **Configure Parameters**: Set values, labels, and formatting options
3. **Customize Styling**: Use the shared design system for consistency
4. **Add Interactivity**: Configure tooltips and interactions

## Accessibility Features

- **ARIA Compliance**: Proper semantic markup and screen reader support
- **Keyboard Navigation**: Full keyboard accessibility with Tab and Escape
- **Focus Management**: Clear focus indicators and logical tab order
- **Screen Reader Support**: Descriptive labels and tooltip content

## Development

This library is built using the [Retool Custom Component Libraries](https://docs.retool.com/apps/guides/custom/custom-component-libraries) framework with a focus on maintainability and scalability.

### Prerequisites

- Node.js v20 or later
- Admin permissions in Retool
- TypeScript knowledge (for extending components)

### Getting Started

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Initialize Retool Connection:**

   ```bash
   npx retool-ccl init
   ```

3. **Start Development Mode:**

   ```bash
   npm run dev
   ```

4. **Deploy to Production:**
   ```bash
   npm run deploy
   ```

### Creating New Components

Follow the established pattern for consistency:

1. **Create Component Directory:**

   ```
   src/components/ValueChart/
   ├── index.tsx
   └── styles.ts
   ```

2. **Use Shared Styles:**

   ```tsx
   import { typography, spacing } from '../../styles'

   export const valueChartStyles = {
     container: spacing.container,
     title: typography.label,
     value: typography.largeValue
   }
   ```

3. **Export from Main Index:**
   ```tsx
   // src/index.tsx
   export { ValueChart } from './components/ValueChart'
   ```

### Style System Guidelines

- **Compose Shared Styles**: Use object spread to combine shared styles
- **Component-Specific**: Keep unique styles in component files
- **Consistent Naming**: Use descriptive names for style objects
- **Type Safety**: Leverage TypeScript for style validation

See [src/styles/README.md](src/styles/README.md) for detailed documentation.

## License

MIT License - see [LICENSE](LICENSE) file for details.
