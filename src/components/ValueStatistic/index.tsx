import React, { useState, useRef, useEffect } from 'react'
import { type FC } from 'react'

import { Retool } from '@tryretool/custom-component-support'
import { valueStatisticStyles as styles } from './styles'

// Import Retool theme CSS for proper theme compatibility
const themeStyle = document.createElement('style')
themeStyle.textContent = `
  @import url('https://retool-edge.com/assets_vjs/AppContainer-CSySwDeb.css');
`
document.head.appendChild(themeStyle)

export const ValueStatistic: FC = () => {
  // Component parameters
  const [label] = Retool.useStateString({
    name: 'Label',
    description: 'The label text to display above the value',
    initialValue: 'Gross volume'
  })

  const [value] = Retool.useStateNumber({
    name: 'Value',
    description: 'The numeric value to display',
    initialValue: 7552.8
  }) 

  const [caption] = Retool.useStateString({
    name: 'Caption',
    description: 'The caption text to display below the value. If empty, will auto-generate from Value Ranges'
  })

  const [format] = Retool.useStateEnumeration({
    name: 'Format',
    description: 'Value format options',
    enumDefinition: ['Standard', 'Numeric', 'Percent', 'Currency (BRL)', 'Currency (USD)'],
    initialValue: 'Standard',
    inspector: 'select'
  })

  const [tooltip] = Retool.useStateString({
    name: 'Tooltip',
    description: 'Tooltip text to show when hovering over the info icon. Supports basic markdown: **bold**, *italic*, and line breaks'
  })

  const [minimumFractionDigits] = Retool.useStateNumber({
    name: 'Minimum Fraction Digits',
    description: 'Minimum number of digits after the decimal point',
    initialValue: 2
  })

  const [maximumFractionDigits] = Retool.useStateNumber({
    name: 'Maximum Fraction Digits',
    description: 'Maximum number of digits after the decimal point',
    initialValue: 2
  })

  const [valueRanges] = Retool.useStateArray({
    name: 'Value Ranges',
    description: 'Array of value ranges with min_value, max_value, and name for automatic categorization'
  })

  // Tooltip state
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Type definition for value range objects
  interface ValueRange {
    id: number
    scale: number
    name: string
    min_value: number
    max_value: number
  }

  // Find category name based on value and ranges
  const findCategoryForValue = (val: number, ranges: ValueRange[]): string | null => {
    if (!ranges || !Array.isArray(ranges) || ranges.length === 0) {
      return null
    }

    // Find the range that contains the value
    const matchingRange = ranges.find(range => 
      val >= range.min_value && val <= range.max_value
    )

    return matchingRange ? matchingRange.name : null
  }

  // Get the effective caption (use auto-generated if caption is empty)
  const getEffectiveCaption = (): string => {
    if (caption && caption.trim() !== '') {
      return caption
    }

    // Auto-generate caption based on value ranges
    const ranges = (valueRanges || []) as unknown as ValueRange[]
    const category = findCategoryForValue(value || 0, ranges)
    return category || ''
  }

  // Calculate color based on value position within ranges
  const getValueColor = (val: number, ranges: ValueRange[]): string => {
    if (!ranges || ranges.length === 0) {
      return '#000' // Default black if no ranges
    }

    // Find min and max values across all ranges
    const allMinValues = ranges.map(range => range.min_value)
    const allMaxValues = ranges.map(range => range.max_value)
    const globalMin = Math.min(...allMinValues)
    const globalMax = Math.max(...allMaxValues)

    // Clamp value within the global range
    const clampedValue = Math.max(globalMin, Math.min(globalMax, val))
    
    // Calculate position (0 = min, 1 = max)
    const position = (clampedValue - globalMin) / (globalMax - globalMin)

    // Interpolate between red (#4A151B) and green (#5CBC15)
    const red = Math.round(74 + (92 - 74) * position) // 74 to 92
    const green = Math.round(21 + (188 - 21) * position) // 21 to 188
    const blue = Math.round(27 + (21 - 27) * position) // 27 to 21

    return `rgb(${red}, ${green}, ${blue})`
  }

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
        <div key={lineIndex} style={styles.tooltipContent}>
          {parsedLine}
        </div>
      )
    })
  }


  return (
    <div style={styles.container}>
      {/* Label with optional tooltip icon */}
      {label && (
        <div style={styles.labelContainer}>
          <span style={{...styles.label, ...(!tooltip ? styles.labelWithoutTooltip : {})}}>
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
              style={styles.tooltipIcon}
            >
              ⓘ
            </span>
          )}
        </div>
      )}

      {/* Value */}
      <div style={{
        ...styles.value, 
        ...(!getEffectiveCaption() ? styles.valueWithoutCaption : {}),
        color: format === 'Numeric' ? getValueColor(value || 0, (valueRanges || []) as unknown as ValueRange[]) : undefined
      }}>
        {formatValue(value || 0, format)}
      </div>

      {/* Caption */}
      {getEffectiveCaption() && (
        <div style={styles.caption}>
          {getEffectiveCaption()}
        </div>
      )}

      {/* Tooltip */}
      {isTooltipVisible && tooltip && (
        <div
          ref={tooltipRef}
          id="statistic-tooltip"
          role="tooltip"
          style={{
            ...styles.tooltip,
            top: tooltipPosition.top,
            left: tooltipPosition.left
          }}
        >
          {parseMarkdown(tooltip)}
          
          {/* Arrow pointing to icon */}
          <div
            style={{
              ...styles.tooltipArrow,
              ...(tooltipPosition.top < 0 ? styles.tooltipArrowDown : styles.tooltipArrowUp)
            }}
          />
        </div>
      )}
    </div>
  )
}
