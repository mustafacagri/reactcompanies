'use client'

import { isEmpty } from 'lodash'
import { FormLabel } from '@/components/ui'
import { useState, ChangeEvent } from 'react'
import { $t } from '@/utils/translationHelper'

interface SelectFormProps {
  isDisabled?: boolean
  isRequired?: boolean
  name: string
  options: { label: string; value: string | number | undefined }[]
  placeholder?: string
  title: string
  value?: string | number

  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const FormSelect: React.FC<SelectFormProps> = ({
  isDisabled = false,
  isRequired = false,
  name,
  options,
  placeholder = '',
  title,
  value,
  onChange,
}) => {
  const [model, setModel] = useState<string | number | undefined>(value?.toString())

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value)
    onChange(e)
  }

  let newOptions = options

  if (!value) {
    const label = placeholder || $t('generic.N/A')
    newOptions = [{ label, value: '' }, ...options]
  }

  return (
    !isEmpty(newOptions) && (
      <div>
        <FormLabel
          title={title}
          isRequired={isRequired}
        />
        <select
          id={title}
          disabled={isDisabled}
          name={name}
          value={model} // Ensure model is a string or number
          onChange={handleChange}
          className='mt-1 py-3 px-4 block w-full rounded-md border border-primary-700 shadow-sm sm:text-sm'
        >
          {newOptions.map(({ label, value }) => (
            <option
              key={label}
              value={value?.toString()}
            >
              {label}
            </option>
          ))}
        </select>
      </div>
    )
  )
}
