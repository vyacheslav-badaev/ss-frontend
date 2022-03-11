import galite from 'ga-lite'
export const initGA = () => {
  galite('create', 'UA-134985933-1', 'auto')
}
export const logPageView = () => {
  galite('send', 'pageview')
}
