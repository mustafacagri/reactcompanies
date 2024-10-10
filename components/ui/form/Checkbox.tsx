'use client'

import { isEmpty } from 'lodash'
import { FormLabel } from '@/components/ui'
import { useState, ChangeEvent } from 'react'
import { $t } from '@/utils/translationHelper'

interface SelectFormProps {
  isDisabled?: boolean
  isRequired?: boolean
  name: string
  options: { label: string; value: string | number | boolean | null }[]
  placeholder?: string
  title: string
  value: string | number | boolean | undefined | string[]

  onChange: (name: string, value: string[] | number[] | boolean[]) => void // Modified to pass both name and value
}

export const FormCheckbox: React.FC<SelectFormProps> = ({
  isDisabled = false,
  isRequired = false,
  name,
  options,
  placeholder = '',
  title,
  value,
  onChange,
}) => {
  const [model, setModel] = useState<string[] | string>(Array.isArray(value) ? value : [])

  // Handle multiple checkbox change
  const handleMultipleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: selectedValue, checked } = e.target
    let newValues = Array.isArray(model) ? [...model] : []

    if (checked) {
      newValues.push(selectedValue)
    } else {
      newValues = newValues.filter(val => val !== selectedValue)
    }

    setModel(newValues)
    onChange(name, newValues)
  }

  // Add placeholder to single select options
  let newOptions = options
  if (!value) {
    const label = placeholder || $t('generic.N/A')
    newOptions = [{ label, value: null }, ...options]
  }

  return (
    !isEmpty(options) && (
      <div>
        <FormLabel
          title={title}
          isRequired={isRequired}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
          {newOptions.map(({ label, value }) => (
            <label
              key={label}
              className='flex items-center space-x-2'
            >
              {value !== null && (
                <input
                  type='checkbox'
                  name={name}
                  value={String(value)} // Convert value to a string
                  checked={Array.isArray(model) && model.includes(String(value))}
                  onChange={handleMultipleChange}
                  disabled={isDisabled}
                  className='form-checkbox h-4 w-4 text-blue-600'
                />
              )}
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    )
  )
}
