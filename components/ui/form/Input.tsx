'use client'

import { useState, ChangeEvent } from 'react'
import { FormLabel } from '@/components/ui'

interface InputFormProps {
  isRequired?: boolean
  isDisabled?: boolean
  name: string
  placeholder?: string
  title: string
  type?: string
  value?: string | number | null

  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const FormInput: React.FC<InputFormProps> = ({
  isRequired = false,
  isDisabled = false,
  name,
  placeholder = '',
  title,
  type = 'text',
  value,

  onChange,
}) => {
  const [model, setModel] = useState<string | number>(value ?? '')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setModel(e.target.value)
    onChange(e)
  }

  return (
    <div>
      <FormLabel
        title={title}
        isRequired={isRequired}
      />

      <input
        id={title}
        disabled={isDisabled}
        name={name}
        type={type}
        placeholder={placeholder}
        value={model}
        onChange={handleChange}
        className='mt-1 py-3 px-4 block w-full rounded-md border border-primary-700 shadow-sm sm:text-sm'
      />
    </div>
  )
}
