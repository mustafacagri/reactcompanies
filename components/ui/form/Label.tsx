'use client'

import React from 'react'
import { $t } from '@/utils/translationHelper' // Assuming $t is your translation helper

interface LabelProps {
  isRequired?: boolean
  title: string
}

export const FormLabel: React.FC<LabelProps> = ({ isRequired = false, title }) => {
  // Use $t helper to get the translation or fallback to the title itself
  const label = $t(title) || title

  return (
    <label
      htmlFor={title}
      className='block text-sm font-medium text-primary-700'
    >
      {label}
      {isRequired && <span className='text-red-500'> *</span>}
    </label>
  )
}
