// Typography styles - reusable across components
export const typography = {
  // Label styles
  label: {
    fontWeight: '600' as const,
    fontSize: '14px',
    color: '#333'
  },
  
  // Caption styles
  caption: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '400' as const
  },
  
  // Large value styles
  largeValue: {
    fontSize: '32px',
    fontWeight: '700' as const,
    color: '#000',
    lineHeight: 1
  },
  
  // Medium value styles
  mediumValue: {
    fontSize: '24px',
    fontWeight: '600' as const,
    color: '#000',
    lineHeight: 1.2
  },
  
  // Small value styles
  smallValue: {
    fontSize: '18px',
    fontWeight: '500' as const,
    color: '#000',
    lineHeight: 1.2
  }
}
