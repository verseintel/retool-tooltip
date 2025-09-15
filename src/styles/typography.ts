// Typography styles - reusable across components
// Let Retool's imported CSS handle font-family and color inheritance
export const typography = {
  // Label styles
  label: {
    fontWeight: '600' as const,
    fontSize: '14px'
  },
  
  // Caption styles
  caption: {
    fontSize: '12px',
    fontWeight: '400' as const
  },
  
  // Large value styles
  largeValue: {
    fontSize: '32px',
    fontWeight: '700' as const,
    lineHeight: 1
  },
  
  // Medium value styles
  mediumValue: {
    fontSize: '24px',
    fontWeight: '600' as const,
    lineHeight: 1.2
  },
  
  // Small value styles
  smallValue: {
    fontSize: '18px',
    fontWeight: '500' as const,
    lineHeight: 1.2
  }
}
