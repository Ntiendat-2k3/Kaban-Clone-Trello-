import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f6f7fb", paper: "#fff" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { borderRadius: 14 } } },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 12 } },
    },
  },
});
export default theme;
