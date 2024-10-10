'use client'

import { isEmpty } from 'lodash'
import translations from '@/locales/messages.json' // Load the single JSON file

// Dynamically infer the type from the imported translations JSON
type TranslationsType = typeof translations

// Extract the keys (locales) dynamically from the JSON
export type Locale = keyof TranslationsType

// Default locale fallback to 'en' if localStorage is empty or invalid
let currentLocale: Locale = (() => {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('currentLocale') as Locale) || 'en' // Use 'en' as the default locale
  }

  return 'en' // Default to 'en' during SSR
})()

// Helper function to resolve nested translation keys
const resolveNestedKey = (obj: Record<string, any>, key: string): any => {
  return key.split('.').reduce((result, k) => result?.[k], obj) // Use reduce for cleaner key resolution
}

// Function to handle string interpolation with placeholders like {0}, {1}, {2}
const replacePlaceholders = (text: string, values: string[]): string =>
  text.replace(/{(\d+)}/g, (match, index) => values[Number(index)] || match)

// Updated translation function to support placeholders
const translate = (key: string, values: string[] = []): string => {
  const localeTranslations = translations[currentLocale] || translations['en'] // Fallback to English
  const translation = resolveNestedKey(localeTranslations, key)

  // Return translated text with placeholders replaced or the key if not found
  return values.length > 0 ? replacePlaceholders(translation || key, values) : translation || key
}

// Check if the translation exists and is not the same as the key
const isTranslated = (key: string): boolean => {
  const translation = resolveNestedKey(translations[currentLocale], key)
  return !isEmpty(translation) && key !== translation
}

// Function to change the locale
export const setLocale = (locale: Locale): void => {
  currentLocale = locale
  if (typeof window !== 'undefined') {
    // Ensure this runs in the browser
    localStorage.setItem('currentLocale', JSON.stringify(locale)) // Store the current locale
  }
}

// Export the translation function for use in other components/modules
export { translate as $t, isTranslated as $te }
