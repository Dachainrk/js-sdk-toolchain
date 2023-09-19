import React from 'react'

export type Props = React.InputHTMLAttributes<HTMLElement> & {
  label?: string
  rightLabel?: string
  error?: boolean
}
