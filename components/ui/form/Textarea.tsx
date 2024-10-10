'use client'

import { useState, ChangeEvent } from 'react'
import { FormLabel } from '@/components/ui'

interface TextareaFormProps {
  isRequired?: boolean
  isDisabled?: boolean
  name: string
  placeholder?: string
  rows?: number
  title: string
  value?: string | number

  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const FormTextarea: React.FC<TextareaFormProps> = ({
  isRequired = false,
  isDisabled = false,
  name,
  placeholder = '',
  rows = 3,
  title,
  value,

  onChange,
}) => {
  const [model, setModel] = useState<string | number | undefined>(value)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setModel(e.target.value)
    onChange(e)
  }

  return (
    <div>
      <FormLabel
        title={title}
        isRequired={isRequired}
      />

      <textarea
        id={title}
        disabled={isDisabled}
        name={name}
        placeholder={placeholder}
        rows={rows}
        value={model}
        onChange={handleChange}
        className='mt-1 py-3 px-4 block w-full rounded-md border border-primary-700 shadow-sm sm:text-sm'
      />
    </div>
  )
}
