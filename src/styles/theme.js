import { createTheme } from "@mui/material/styles";

export const colors = {
  ink950: "#0A0A0F",
  ink900: "#10101A",
  ink800: "#16162A",
  ink700: "#1E1E35",
  ink600: "#2A2A45",
  ink500: "#3A3A5C",
  amber400: "#FBBF24",
  amber300: "#FCD34D",
  slate600: "#475569",
  slate500: "#64748B",
  slate400: "#94A3B8",
  slate300: "#CBD5E1",
  slate200: "#E2E8F0",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: colors.ink950,
      paper: colors.ink800,
    },
    primary: {
      main: colors.amber400,
      contrastText: colors.ink950,
    },
    text: {
      primary: colors.slate200,
      secondary: colors.slate400,
    },
    divider: colors.ink600,
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: { fontFamily: "'Syne', sans-serif", fontSize: "2.5rem", "@media (max-width:600px)": { fontSize: "2rem" } },
    h2: { fontFamily: "'Syne', sans-serif", fontSize: "2rem", "@media (max-width:600px)": { fontSize: "1.75rem" } },
    h3: { fontFamily: "'Syne', sans-serif", fontSize: "1.75rem", "@media (max-width:600px)": { fontSize: "1.5rem" } },
    h4: { fontFamily: "'Syne', sans-serif", fontSize: "1.5rem", "@media (max-width:600px)": { fontSize: "1.25rem" } },
    h5: { fontFamily: "'Syne', sans-serif", fontSize: "1.25rem", "@media (max-width:600px)": { fontSize: "1.1rem" } },
    h6: { fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", "@media (max-width:600px)": { fontSize: "1rem" } },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.ink950,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.ink800,
          "& fieldset": {
            borderColor: colors.ink600,
          },
          "&:hover fieldset": {
            borderColor: colors.ink500,
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.amber400,
          },
        },
      },
    },
  },
});

export default theme;
