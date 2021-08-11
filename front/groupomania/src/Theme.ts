import { createTheme } from "@material-ui/core/styles";
import { grey, lightBlue, red } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      light: red[200],
      main: red[600],
      dark: red[800],
    },
    secondary: {
      light: lightBlue[300],
      main: lightBlue[500],
      dark: lightBlue[600],
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
    },
    divider: "#C6282833",
  },

  typography: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: 700,
    },
  },
});
