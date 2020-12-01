import { createMuiTheme } from '@material-ui/core/styles';

const dfBrownDark = '#99710a';
const dfBrown = '#d2691e';
const dfBrownLight = '#e1782d';

const dfYellowDark = '#c99e03';
const dfYellow = '#bdb76b';
const dfYellowLight = '#c5c187';

export default createMuiTheme({
  palette: {
    common: {
      brownDark: `${dfBrownDark}`,
      brownLight: `${dfBrownLight}`,
      yellowDark: `${dfYellowDark}`,
      yellowLight: `${dfYellowLight}`,
    },
    primary: {
      main: `${dfBrown}`
    },
    secondary: {
      main: `${dfYellow}`
    }
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem',
    },
    button: {
      fontFamily: 'Pacifico',
      fontSize: '1rem',
      textTransform: 'none',
      color: 'white',
    }
  }
})