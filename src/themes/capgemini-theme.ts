import { extendTheme } from '@mui/joy/styles'
import { themeComponents } from './default-theme-components'

declare module '@mui/joy/styles' {
  interface Palette {
    background: {
      app: string
    }
  }
}

export default extendTheme({
  fontFamily: {
    display: 'Ubuntu, Arial, Sans-serif',
    body: 'Ubuntu, Arial, Sans-serif'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#DBF3FF',
          100: '#BDE8FF',
          200: '#7AD1FF',
          300: '#33B8FF',
          400: '#009CF0',
          500: '#0070AD',
          600: '#005A8A',
          700: '#004266',
          800: '#002E47',
          900: '#001724'
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
          app: 'rgba(13, 71, 161, 0.75)'
        }
      }
    }
  },
  ...themeComponents
})
