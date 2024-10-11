import ReactGA from 'react-ga4'

export const initGA = () => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? '')
}

export const logPageView = (url: string) => {
  ReactGA.send({ hitType: 'pageview', page: url })
}
