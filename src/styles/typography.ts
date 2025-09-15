// Typography styles - reusable across components
// Note: Retool custom components run in iframe, so we need to explicitly set font-family and colors
export const typography = {
  // Label styles
  label: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: '600' as const,
    fontSize: '14px',
    color: '#333333'
  },
  
  // Caption styles
  caption: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '12px',
    color: '#666666',
    fontWeight: '400' as const
  },
  
  // Large value styles
  largeValue: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '32px',
    fontWeight: '700' as const,
    color: '#000000',
    lineHeight: 1
  },
  
  // Medium value styles
  mediumValue: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '24px',
    fontWeight: '600' as const,
    color: '#000000',
    lineHeight: 1.2
  },
  
  // Small value styles
  smallValue: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '18px',
    fontWeight: '500' as const,
    color: '#000000',
    lineHeight: 1.2
  }
}
