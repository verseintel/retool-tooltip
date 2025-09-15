// Spacing utilities - reusable across components
export const spacing = {
  // Container spacing
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    fontFamily: 'system-ui, -apple-system, sans-serif',
    lineHeight: 1.2
  },
  
  // Row container (horizontal layout)
  rowContainer: {
    display: 'flex',
    alignItems: 'center' as const,
    position: 'relative' as const
  },
  
  // Standard margins
  marginBottom: {
    marginBottom: '8px'
  },
  
  marginTop: {
    marginTop: '8px'
  },
  
  marginRight: {
    marginRight: '4px'
  },
  
  marginLeft: {
    marginLeft: '4px'
  },
  
  // No margin utilities
  noMarginBottom: {
    marginBottom: '0'
  },
  
  noMarginTop: {
    marginTop: '0'
  },
  
  noMarginRight: {
    marginRight: '0'
  },
  
  noMarginLeft: {
    marginLeft: '0'
  }
}
