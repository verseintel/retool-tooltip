# Retool UI Components

A collection of reusable UI components for Retool applications including tooltips, popovers, and badges with accessibility features.

## Components

### 1. RetoolTooltip

A customizable tooltip component that provides hover-based help text.

**Features:**

- Mouse hover activation
- Keyboard accessibility (Tab to focus, Escape to close)
- Configurable positioning (top, bottom, left, right)
- Customizable delay before showing
- ARIA compliance for screen readers

**Parameters:**

- **`tooltipText`** (string, required) - The text to display in the tooltip
- **`componentRef`** (string, optional) - Reference to the Retool component to show tooltip on
- **`position`** (string, optional) - Tooltip position: `top`, `bottom`, `left`, `right` (default: `top`)
- **`delay`** (number, optional) - Delay in milliseconds before showing tooltip (default: `500`)

### 2. RetoolPopover

A more advanced tooltip with click-to-show functionality and click-outside-to-close behavior.

**Features:**

- Click to show/hide
- Click outside to close
- Configurable positioning
- Larger content area
- ARIA compliance

**Parameters:**

- **`content`** (string, required) - The content to display in the popover
- **`triggerText`** (string, optional) - The text for the trigger button (default: "Click me")
- **`position`** (string, optional) - Popover position: `top`, `bottom`, `left`, `right` (default: `bottom`)

### 3. RetoolBadge

A simple status indicator component with multiple variants and sizes.

**Features:**

- Multiple color variants (primary, secondary, success, warning, danger)
- Three sizes (small, medium, large)
- Clean, modern design
- Inline display

**Parameters:**

- **`text`** (string, required) - The text to display in the badge
- **`variant`** (string, optional) - Badge variant: `primary`, `secondary`, `success`, `warning`, `danger` (default: `primary`)
- **`size`** (string, optional) - Badge size: `small`, `medium`, `large` (default: `medium`)

## Usage

1. Drag any of the components onto your Retool canvas
2. Configure the required parameters (marked as required above)
3. Optionally customize the optional parameters
4. The components will render with your specified settings

## Accessibility Features

- **ARIA attributes**: Uses `role="tooltip"` and `aria-describedby`
- **Keyboard support**: Tab to focus, Escape to close
- **Screen reader friendly**: Proper semantic markup and descriptions
- **Focus management**: Tooltip appears on focus, disappears on blur

## Development

This component is built using the [Retool Custom Component Libraries](https://docs.retool.com/apps/guides/custom/custom-component-libraries) framework.

### Prerequisites

- Node.js v20 or later
- Admin permissions in Retool

### Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Log in to Retool:

   ```bash
   npx retool-ccl login
   ```

3. Start development mode:

   ```bash
   npx retool-ccl dev
   ```

4. Deploy when ready:
   ```bash
   npx retool-ccl deploy
   ```

## License

MIT License - see [LICENSE](LICENSE) file for details.
