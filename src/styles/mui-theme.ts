import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily:
      '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          marginRight: 0,
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        content: {
          margin: 0,
          flexGrow: 0,
        },
      },
    },
  },
});
