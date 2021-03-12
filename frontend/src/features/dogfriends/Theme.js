import { createMuiTheme } from '@material-ui/core/styles';
import {brown, yellow} from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    common: {
      brown: brown[400],
      brownDark: brown[600],
      brownLight: brown[300],
      yellow: yellow[500],
      yellowDark: yellow[600],
      yellowLight: yellow[100],
      yellowMid: yellow[200],
    },
    primary: {
      main: brown[300],
    },
    secondary: {
      main: yellow[700],
      contrastText: brown[400]
    }
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
      color: 'white',      
    },
    h1: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '3.5rem',
      color: 'secondary',
      lineHeight: 1.5,
    },
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '3.3rem',
      color: brown[900],
      lineHeight: 1.1,
    },
    h3: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: brown[900],
      lineHeight: 1.1,
    },
    subtitle1: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      fontStyle: 'italic',
      fontSize: '0.9rem',
      color: brown[900],
      lineHeight: 1.1,
    },
    subtitle2: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      fontSize: '0.9rem',
      color: brown[900],
      lineHeight: 1.5,
    }
  },
  props: {
    MuiButton: {
      disableElevation: true,      
    },    
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: 'Pacifico',
        fontSize: '1rem',
        textTransform: 'none',
        color: 'white',
        borderRadius: 30,
        height: 45,
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: yellow[700],
          color: yellow[100]
        }
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: yellow[500],
          color: brown[500]
        },
        fontWeight: 500
      },
      outlinedPrimary: {
        '&:hover': {
          backgroundColor: yellow[700],
          color: brown[500]
        }
      }
    },
  }
})

export { theme };