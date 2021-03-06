import { createMuiTheme } from '@material-ui/core/styles';
import {brown, yellow} from '@material-ui/core/colors'
// const dfBrownDark = '#99710a';
// const dfBrown = '#b66b35';
// const dfBrownLight = '#e1782d';

// const dfYellowDark = '#c99e03';
// const dfYellow = '#bdb76b';
// const dfYellowLight = '#c5c187';

const theme = createMuiTheme({
  palette: {
    common: {
      brown: brown[400],
      brownDark: brown[600],
      brownLight: brown[300],
      yellow: yellow[500],
      yellowDark: yellow[600],
      yellowLight: yellow[100],
    },
    primary: {
      main: brown[300],//dfBrown,
      // contrastText: yellow[600]
    },
    secondary: {
      main: yellow[700],//dfYellow
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
    button: {
      // fontFamily: 'Pacifico',
      // fontSize: '1rem',
      // textTransform: 'none',
      // color: 'white',
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
      fontSize: '1.5rem',
      color: 'secondary',
      lineHeight: 1.1,
    },
    subtitle1: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      fontStyle: 'italic',
      fontSize: '0.8rem',
      color: 'secondary',
      lineHeight: 1,
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
    MuiTextField: {

    }
  }
})

export { theme };