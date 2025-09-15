import React, { useState, useRef, useEffect } from 'react'
import { type FC } from 'react'

import { Retool } from '@tryretool/custom-component-support'

export const ValueStatistic: FC = () => {
  // Component parameters
  const [label, _setLabel] = Retool.useStateString({
    name: 'Label',
    description: 'The label text to display above the value',
    initialValue: 'Gross volume'
  })

  const [value, _setValue] = Retool.useStateNumber({
    name: 'Value',
    description: 'The numeric value to display',
    initialValue: 7552.8
  })

  const [caption, _setCaption] = Retool.useStateString({
    name: 'Caption',
    description: 'The caption text to display below the value',
    initialValue: 'Since last month'
  })

  const [format, _setFormat] = Retool.useStateEnumeration({
    name: 'Format',
    description: 'Value format options',
    enumDefinition: ['Standard', 'Numeric', 'Percent', 'Currency (BRL)', 'Currency (USD)'],
    initialValue: 'Standard',
    inspector: 'select'
  })

  const [tooltip, _setTooltip] = Retool.useStateString({
    name: 'Tooltip',
    description: 'Tooltip text to show when hovering over the info icon. Supports basic markdown: **bold**, *italic*, and line breaks'
  })

  const [minimumFractionDigits, _setMinimumFractionDigits] = Retool.useStateNumber({
    name: 'Minimum Fraction Digits',
    description: 'Minimum number of digits after the decimal point',
    initialValue: 2
  })

  const [maximumFractionDigits, _setMaximumFractionDigits] = Retool.useStateNumber({
    name: 'Maximum Fraction Digits',
    description: 'Maximum number of digits after the decimal point',
    initialValue: 2
  })

  // Tooltip state
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Format the value based on the format type
  const formatValue = (val: number, formatType: string): string => {
    if (isNaN(val)) return '0'

    const fractionDigits = {
      minimumFractionDigits: minimumFractionDigits || 2,
      maximumFractionDigits: maximumFractionDigits || 2
    }

    switch (formatType) {
      case 'Numeric':
        return new Intl.NumberFormat('en-US', fractionDigits).format(val)
      
      case 'Percent':
        return new Intl.NumberFormat('en-US', {
          style: 'percent',
          ...fractionDigits
        }).format(val)
      
      case 'Currency (USD)':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          ...fractionDigits
        }).format(val)
      
      case 'Currency (BRL)':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          ...fractionDigits
        }).format(val)
      
      case 'Standard':
      default:
        return new Intl.NumberFormat('en-US', fractionDigits).format(val)
    }
  }

  // Calculate tooltip position
  const calculateTooltipPosition = () => {
    if (!iconRef.current || !tooltipRef.current) {
      return
    }

    const iconRect = iconRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    
    // Position relative to the icon, not the viewport
    let top = -tooltipRect.height - 8  // Above the icon
    let left = (iconRect.width - tooltipRect.width) / 2  // Centered on icon

    // Ensure tooltip doesn't go off-screen to the left
    if (left < 0) {
      left = 0
    }

    // If tooltip would go above the viewport, position it below the icon instead
    if (top < 0) {
      top = iconRect.height + 8  // Below the icon
    }

    setTooltipPosition({ top, left })
  }

  // Show tooltip with delay
  const showTooltip = () => {
    if (!tooltip) {
      return
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(true)
      calculateTooltipPosition()
    }, 300)
  }

  // Hide tooltip immediately
  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsTooltipVisible(false)
  }

  // Recalculate position when tooltip becomes visible
  useEffect(() => {
    if (isTooltipVisible) {
      calculateTooltipPosition()
    }
  }, [isTooltipVisible])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      hideTooltip()
    }
  }

  // Simple markdown parser for tooltip content
  const parseMarkdown = (text: string): React.ReactNode => {
    if (!text) return text

    // Split by line breaks first
    const lines = text.split('\n')
    
    return lines.map((line, lineIndex) => {
      // Parse each line for markdown
      const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g)
      
      const parsedLine = parts.map((part, partIndex) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          // Bold text
          return <strong key={`${lineIndex}-${partIndex}`}>{part.slice(2, -2)}</strong>
        } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          // Italic text
          return <em key={`${lineIndex}-${partIndex}`}>{part.slice(1, -1)}</em>
        } else {
          // Regular text
          return part
        }
      })

      return (
        <div key={lineIndex} style={{ marginBottom: lineIndex < lines.length - 1 ? '4px' : '0' }}>
          {parsedLine}
        </div>
      )
    })
  }


  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: 1.2
    }}>
      {/* Label with optional tooltip icon */}
      {label && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '8px',
          position: 'relative'
        }}>
          <span style={{ 
            fontWeight: '600', 
            fontSize: '14px', 
            color: '#333',
            marginRight: tooltip ? '4px' : '0'
          }}>
            {label}
          </span>
          
          {/* Tooltip icon */}
          {tooltip && (
            <span
              ref={iconRef}
              onMouseEnter={showTooltip}
              onMouseLeave={hideTooltip}
              onFocus={showTooltip}
              onBlur={hideTooltip}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-describedby={isTooltipVisible ? "statistic-tooltip" : undefined}
              style={{
                cursor: 'pointer',
                fontSize: '12px',
                color: '#666',
                fontWeight: 'normal',
                outline: 'none',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#333'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#666'
              }}
            >
              ⓘ
            </span>
          )}
        </div>
      )}

      {/* Value */}
      <div style={{ 
        fontSize: '32px', 
        fontWeight: '700', 
        color: '#000',
        marginBottom: caption ? '8px' : '0',
        lineHeight: 1
      }}>
        {formatValue(value || 0, format)}
      </div>

      {/* Caption */}
      {caption && (
        <div style={{ 
          fontSize: '12px', 
          color: '#666',
          fontWeight: '400'
        }}>
          {caption}
        </div>
      )}

      {/* Tooltip */}
      {isTooltipVisible && tooltip && (
        <div
          ref={tooltipRef}
          id="statistic-tooltip"
          role="tooltip"
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            zIndex: 1000,
            padding: '8px 12px',
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '4px',
            fontSize: '12px',
            lineHeight: '1.4',
            maxWidth: '200px',
            wordWrap: 'break-word',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            opacity: 1,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: 'none'
          }}
        >
          {parseMarkdown(tooltip)}
          
          {/* Arrow pointing to icon */}
          <div
            style={{
              position: 'absolute',
              ...(tooltipPosition.top < 0 ? {
                // Tooltip is above icon, arrow points down
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #333'
              } : {
                // Tooltip is below icon, arrow points up
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '6px solid #333'
              })
            }}
          />
        </div>
      )}
    </div>
  )
}
