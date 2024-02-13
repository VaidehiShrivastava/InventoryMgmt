import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InventoryStats from "./pages/InventoryStats";
import "./App.css"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:
    {
      main:"#eafc86"
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <InventoryStats />
    </ThemeProvider>
  );
}

export default App;
