import { createMuiTheme } from '@material-ui/core/styles';

const dfBrownDark = '#99710a';
const dfBrown = '#b66b35'//'#d2691e';
const dfBrownLight = '#e1782d';

const dfYellowDark = '#c99e03';
const dfYellow = '#bdb76b';
const dfYellowLight = '#c5c187';

export default createMuiTheme({
  palette: {
    common: {
      brown: dfBrown,
      brownDark: dfBrownDark,
      brownLight: dfBrownLight,
      yellow: dfYellow,
      yellowDark: dfYellowDark,
      yellowLight: dfYellowLight,
    },
    primary: {
      main: dfBrown,
    },
    secondary: {
      main: dfYellow
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
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white',
    },
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: `${dfBrown}`,
      lineHeight: 1.5,
    }
  }
})