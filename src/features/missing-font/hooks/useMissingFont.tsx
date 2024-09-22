import { isFontInstalled } from '../utils/font.utils'

export const useMissingFont = () => {
  return {
    showAlertMissingFont: !isFontInstalled('BentonSansF')
  }
}
