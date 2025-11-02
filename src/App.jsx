import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./config/theme";
import Routes from "./routes";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
