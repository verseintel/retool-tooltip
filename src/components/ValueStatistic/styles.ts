// ValueStatistic component-specific styles
import { typography, spacing, tooltip } from '../../styles'

export const valueStatisticStyles = {
  // Main container
  container: spacing.container,
  
  // Label container with tooltip
  labelContainer: {
    ...spacing.rowContainer,
    ...spacing.marginBottom
  },
  
  // Label text
  label: {
    ...typography.label,
    ...spacing.marginRight
  },
  
  // Label without tooltip (no right margin)
  labelWithoutTooltip: {
    ...typography.label,
    ...spacing.noMarginRight
  },
  
  // Tooltip icon
  tooltipIcon: tooltip.icon,
  
  // Main value display
  value: {
    ...typography.largeValue,
    ...spacing.marginBottom
  },
  
  // Value without caption (no bottom margin)
  valueWithoutCaption: {
    ...typography.largeValue,
    ...spacing.noMarginBottom
  },
  
  // Caption text
  caption: typography.caption,
  
  // Tooltip container
  tooltip: tooltip.container,
  
  // Tooltip arrow
  tooltipArrow: tooltip.arrow,
  tooltipArrowDown: tooltip.arrowDown,
  tooltipArrowUp: tooltip.arrowUp,
  
  // Tooltip content
  tooltipContent: tooltip.content
}
