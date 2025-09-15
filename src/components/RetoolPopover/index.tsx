import React, { useState, useRef, useEffect } from 'react'
import { type FC } from 'react'

import { Retool } from '@tryretool/custom-component-support'

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
