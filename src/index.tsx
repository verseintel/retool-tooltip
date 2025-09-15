import React, { useState, useRef, useEffect } from 'react'
import { type FC } from 'react'

import { Retool } from '@tryretool/custom-component-support'

export const RetoolTooltip: FC = () => {
  // Component reference - the Retool component this tooltip will wrap
  const [componentRef, _setComponentRef] = Retool.useStateString({
    name: 'componentRef',
    description: 'The reference to the Retool component to show tooltip on'
  })

  // Tooltip text to display
  const [tooltipText, _setTooltipText] = Retool.useStateString({
    name: 'tooltipText',
    description: 'The text to display in the tooltip'
  })

  // Tooltip position (optional)
  const [position, _setPosition] = Retool.useStateString({
    name: 'position',
    description: 'Tooltip position: top, bottom, left, right',
    initialValue: 'top'
  })

  // Tooltip delay (optional)
  const [delay, _setDelay] = Retool.useStateNumber({
    name: 'delay',
    description: 'Delay in milliseconds before showing tooltip',
    initialValue: 500
  })

  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Calculate tooltip position based on trigger element
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - tooltipRect.height - 8
        left = triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 8
        left = triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left + scrollLeft - tooltipRect.width - 8
        break
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + scrollLeft + 8
        break
      default:
        top = triggerRect.top + scrollTop - tooltipRect.height - 8
        left = triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2
    }

    setTooltipPosition({ top, left })
  }

  // Show tooltip with delay
  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      calculatePosition()
    }, delay)
  }

  // Hide tooltip immediately
  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  // Recalculate position when tooltip becomes visible
  useEffect(() => {
    if (isVisible) {
      calculatePosition()
    }
  }, [isVisible, position])

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

  if (!tooltipText) {
    return (
      <div style={{ padding: '8px', color: '#666', fontStyle: 'italic' }}>
        Please provide tooltip text
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Trigger element - this will contain the referenced Retool component */}
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-describedby={isVisible ? "tooltip" : undefined}
        style={{
          display: 'inline-block',
          outline: 'none'
        }}
      >
        {/* This is where the referenced Retool component would be rendered */}
        {/* For now, we'll show a placeholder */}
        <div style={{
          padding: '8px 12px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
          minWidth: '100px',
          textAlign: 'center'
        }}>
          {componentRef ? `Component: ${componentRef}` : 'Hoover for tooltip'}
        </div>
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip"
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
            fontSize: '14px',
            lineHeight: '1.4',
            maxWidth: '250px',
            wordWrap: 'break-word',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out'
          }}
        >
          {tooltipText}
          
          {/* Arrow pointing to trigger element */}
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              ...(position === 'top' && {
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #333'
              }),
              ...(position === 'bottom' && {
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '6px solid #333'
              }),
              ...(position === 'left' && {
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: '6px solid #333'
              }),
              ...(position === 'right' && {
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: '6px solid #333'
              })
            }}
          />
        </div>
      )}
    </div>
  )
}

// Popover Component - A more advanced tooltip with click-to-show functionality
export const RetoolPopover: FC = () => {
  const [content, _setContent] = Retool.useStateString({
    name: 'content',
    description: 'The content to display in the popover'
  })

  const [triggerText, _setTriggerText] = Retool.useStateString({
    name: 'triggerText',
    description: 'The text for the trigger button',
    initialValue: 'Click me'
  })

  const [position, _setPosition] = Retool.useStateString({
    name: 'position',
    description: 'Popover position: top, bottom, left, right',
    initialValue: 'bottom'
  })

  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const togglePopover = () => {
    setIsOpen(!isOpen)
  }

  const calculatePosition = () => {
    if (!triggerRef.current || !popoverRef.current) return { top: 0, left: 0 }

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const popoverRect = popoverRef.current.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

    let top = 0
    let left = 0

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollTop - popoverRect.height - 8
        left = triggerRect.left + scrollLeft + (triggerRect.width - popoverRect.width) / 2
        break
      case 'bottom':
        top = triggerRect.bottom + scrollTop + 8
        left = triggerRect.left + scrollLeft + (triggerRect.width - popoverRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + scrollTop + (triggerRect.height - popoverRect.height) / 2
        left = triggerRect.left + scrollLeft - popoverRect.width - 8
        break
      case 'right':
        top = triggerRect.top + scrollTop + (triggerRect.height - popoverRect.height) / 2
        left = triggerRect.right + scrollLeft + 8
        break
      default:
        top = triggerRect.bottom + scrollTop + 8
        left = triggerRect.left + scrollLeft + (triggerRect.width - popoverRect.width) / 2
    }

    return { top, left }
  }

  if (!content) {
    return (
      <div style={{ padding: '8px', color: '#666', fontStyle: 'italic' }}>
        Please provide popover content
      </div>
    )
  }

  const popoverPosition = isOpen ? calculatePosition() : { top: 0, left: 0 }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={triggerRef}
        onClick={togglePopover}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {triggerText}
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-modal="false"
          style={{
            position: 'absolute',
            top: popoverPosition.top,
            left: popoverPosition.left,
            zIndex: 1000,
            padding: '16px',
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '300px',
            minWidth: '200px'
          }}
        >
          <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#333' }}>
            {content}
          </div>
          
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              ...(position === 'top' && {
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid white'
              }),
              ...(position === 'bottom' && {
                bottom: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid white'
              }),
              ...(position === 'left' && {
                left: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: '8px solid white'
              }),
              ...(position === 'right' && {
                right: '100%',
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: '8px solid white'
              })
            }}
          />
        </div>
      )}
    </div>
  )
}

// Badge Component - A simple status indicator
export const RetoolBadge: FC = () => {
  const [text, _setText] = Retool.useStateString({
    name: 'text',
    description: 'The text to display in the badge'
  })

  const [variant, _setVariant] = Retool.useStateString({
    name: 'variant',
    description: 'Badge variant: primary, secondary, success, warning, danger',
    initialValue: 'primary'
  })

  const [size, _setSize] = Retool.useStateString({
    name: 'size',
    description: 'Badge size: small, medium, large',
    initialValue: 'medium'
  })

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return { backgroundColor: '#007bff', color: 'white' }
      case 'secondary':
        return { backgroundColor: '#6c757d', color: 'white' }
      case 'success':
        return { backgroundColor: '#28a745', color: 'white' }
      case 'warning':
        return { backgroundColor: '#ffc107', color: '#212529' }
      case 'danger':
        return { backgroundColor: '#dc3545', color: 'white' }
      default:
        return { backgroundColor: '#007bff', color: 'white' }
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { padding: '2px 6px', fontSize: '11px' }
      case 'medium':
        return { padding: '4px 8px', fontSize: '12px' }
      case 'large':
        return { padding: '6px 12px', fontSize: '14px' }
      default:
        return { padding: '4px 8px', fontSize: '12px' }
    }
  }

  if (!text) {
    return (
      <div style={{ padding: '8px', color: '#666', fontStyle: 'italic' }}>
        Please provide badge text
      </div>
    )
  }

  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: '12px',
        fontWeight: '500',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        ...getVariantStyles(),
        ...getSizeStyles()
      }}
    >
      {text}
    </span>
  )
}
