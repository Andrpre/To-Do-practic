import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    important: {
      main: "#970000",
    },
  },
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
          color: "var(--disabled-color)",
          border: "none",
          "&.Mui-selected": {
            backgroundColor: "transparent",
          },
          "&:hover, &.Mui-selected:hover": {
            backgroundColor: "var(--main-bg)",
            filter: "brightness(95%)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
        deleteIcon: {
          color: "inherit",
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        disableInteractive: true,
      },
    },
  },
  shape: {
    borderRadius: 5,
  },
});
