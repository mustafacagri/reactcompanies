import { marked } from 'marked'

export const markData = (val?: string): string | Promise<string> => {
  if (!val) return ''

  val = val.replaceAll('\n', '<br />')

  return marked.parse(val)
}

export const shortWebsite = (website: string = ''): string => {
  if (!website) return ''
  const url = new URL(website)

  return url?.hostname?.replace(/^www\./, '') || ''
}
