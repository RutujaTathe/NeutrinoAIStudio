import { createTheme } from "@mui/material/styles";

export const getAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "dark" ? "#FF8C5A" : "#F96F3A",
        light: "#FFB08F",
        dark: "#E6642E",
        contrastText: mode === "dark" ? "#181a1b" : "#fff",
      },
      secondary: {
        main: mode === "dark" ? "#ff6b6b" : "#f44336",
        contrastText: mode === "dark" ? "#fff" : "#fff",
      },
      background: {
        default: mode === "dark" ? "#181a1b" : "#f5f6fa",
        paper: mode === "dark" ? "#23272f" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#181a1b",
        secondary: mode === "dark" ? "#b0b0b0" : "#333",
      },
      button: {
        main: mode === "dark" ? "#1976d2" : "#1976d2",
        contrastText: mode === "dark" ? "#fff" : "#fff",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            backgroundColor: mode === "dark" ? "#F96F3A" : "#F96F3A",
            color: mode === "dark" ? "#fff" : "#fff",
            "&:hover": {
              backgroundColor: mode === "dark" ? "#E6642E" : "#E6642E",
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: mode === "dark" ? "#23272f" : undefined,
            backgroundImage: mode === "dark"
              ? undefined
              : "linear-gradient(135deg, #ffe5c2 0%, #ffd1a6 40%, #ffb37b 100%)",
            color: mode === "dark" ? "#fff" : "#fff",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "dark" ? "#23272f" : "#fff",
            color: mode === "dark" ? "#fff" : "#181a1b",
            border: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#23272f" : "#fff",
            color: mode === "dark" ? "#fff" : "#181a1b",
          },
        },
      },
    },
  });
