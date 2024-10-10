require('dotenv/config')
const LocoClient = require('loco-api-js')

const apiKey = process.env.NEXT_LOCO_API_KEY

if (!apiKey) {
  throw new Error(
    'The Loco API key has not been defined yet. Please check your .env file and make sure that there is a NUXT_LOCO_API_KEY in it.'
  )
}

const loco = new LocoClient(apiKey, {
  fileName: './locales/messages',
  debug: true,
})

const fetchTranslations = async () => {
  try {
    await loco.exportToFile()
    console.log('Translation files have been successfully fetched.')
  } catch (error) {
    console.error('Fetching translation error: ', error)
  }
}

fetchTranslations()
