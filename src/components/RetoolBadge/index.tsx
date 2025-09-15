import React from 'react'
import { type FC } from 'react'

import { Retool } from '@tryretool/custom-component-support'

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
