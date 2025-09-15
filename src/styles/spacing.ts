// Spacing utilities - reusable across components
export const spacing = {
  // Container spacing
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start' as const,
    lineHeight: 1.2,
    height: 'fit-content',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
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
