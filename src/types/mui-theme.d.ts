import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    important: Palette["primary"];
  }
  interface PaletteOptions {
    important?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/ToggleButton" {
  interface ToggleButtonPropsColorOverrides {
    important: true;
  }
}
