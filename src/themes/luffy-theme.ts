import { extendTheme } from '@mui/joy/styles'
import { themeComponents } from './default-theme-components'

import luffyBoatBackground from '@/assets/images/luffy-boat-bg.png'

declare module '@mui/joy/styles' {
  interface Palette {
    background: {
      app: string
      'app-image': string
    }
  }
}

export default extendTheme({
  fontFamily: {
    display: 'Ubuntu, Arial,  Sans-serif',
    body: 'Ubuntu, Arial, Sans-serif'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#CFEAF7',
          100: '#9FD4EF',
          200: '#3FA9DE',
          300: '#196B94',
          400: '#092635',
          500: '#07202C',
          600: '#061923',
          700: '#04131A',
          800: '#030D11',
          900: '#010609'
        },
        warning: {
          '50': '#FFF1EB',
          '100': '#FFE3D6',
          '200': '#FFC7AE',
          '300': '#FEAC85',
          '400': '#FE905D',
          '500': '#FE7332',
          '600': '#F44E01',
          '700': '#B73A01',
          '800': '#7A2701',
          '900': '#3D1300'
        },
        neutral: {
          50: '#F2F2F2',
          100: '#E8E8E8',
          200: '#CFCFCF',
          300: '#B8B8B8',
          400: '#9E9E9E',
          500: '#878787',
          600: '#6F6F6F',
          700: '#545454',
          800: '#383838',
          900: '#1C1C1C'
        },
        background: {
          app: '#092635',
          'app-image': `url('${luffyBoatBackground}')`
        }
      }
    }
  },
  ...themeComponents
})
