import { useMemo } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const theme = useMemo(() =>
    createTheme(themeSettings), [])
  return (
    <div className='app'>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* //padding starts from top and moves in clockwise order */}
        <Box width="100%" height="100%" padding="1rem 2rem 4rem">
          <Routes>
            <Route path="/" element={<div> Dashboard </div>}/>
          </Routes>
        </Box>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
