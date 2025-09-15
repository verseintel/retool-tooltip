// Typography styles - reusable across components
// Uses Retool's CSS custom properties for proper theme integration
export const typography = {
  // Label styles
  label: {
    fontFamily: 'var(--sans-serif, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontWeight: '600' as const,
    fontSize: '14px',
    color: 'var(--gray-900, #000000)'
  },
  
  // Caption styles
  caption: {
    fontFamily: 'var(--sans-serif, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontSize: '12px',
    color: 'var(--gray-600, #666666)',
    fontWeight: '400' as const
  },
  
  // Large value styles
  largeValue: {
    fontFamily: 'var(--sans-serif, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontSize: '32px',
    fontWeight: '700' as const,
    color: 'var(--gray-900, #000000)',
    lineHeight: 1
  },
  
  // Medium value styles
  mediumValue: {
    fontFamily: 'var(--sans-serif, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontSize: '24px',
    fontWeight: '600' as const,
    color: 'var(--gray-900, #000000)',
    lineHeight: 1.2
  },
  
  // Small value styles
  smallValue: {
    fontFamily: 'var(--sans-serif, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontSize: '18px',
    fontWeight: '500' as const,
    color: 'var(--gray-900, #000000)',
    lineHeight: 1.2
  }
}
