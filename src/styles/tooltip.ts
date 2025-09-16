// Tooltip styles - reusable across components
export const tooltip = {
  // Tooltip icon
  icon: {
    cursor: 'pointer' as const,
    fontSize: '12px',
    color: '#666',
    fontWeight: 'normal' as const,
    outline: 'none',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    transition: 'color 0.2s ease'
  },
  
  // Tooltip container
  container: {
    position: 'absolute' as const,
    zIndex: 1000,
    padding: '8px 12px',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '4px',
    fontSize: '12px',
    lineHeight: '1.4',
    maxWidth: '200px',
    wordWrap: 'break-word' as const,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    opacity: 1,
    transition: 'opacity 0.2s ease-in-out',
    pointerEvents: 'none' as const
  },
  
  // Tooltip arrow base
  arrow: {
    position: 'absolute' as const,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0
  },
  
  // Arrow pointing down (tooltip above)
  arrowDown: {
    top: '100%',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid #333'
  },
  
  // Arrow pointing up (tooltip below)
  arrowUp: {
    bottom: '100%',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: '6px solid #333'
  },
  
  // Tooltip content spacing
  content: {
    marginBottom: '4px'
  }
}
