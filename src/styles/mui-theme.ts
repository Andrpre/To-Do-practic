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
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          border: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: "auto",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "var(--text-color)",
          width: "0.9em",
          height: "0.9em",
          top: "calc(50% - .4em)",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
        //   width: "0.9em",
        //   height: "0.9em",
        backgroundColor: "var(--main-bg)",
        border: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "var(--main-radius)",
          fontSize: "1rem",
          height: "25px",
        },
        icon: {
          color: "inherit",
        },
      },
    },
  },
});
