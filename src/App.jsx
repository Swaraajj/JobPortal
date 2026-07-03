import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './App.css';
import AllPosts from './components/AllPosts';
import Create from './components/Create';
import Edit from './components/Edit';
import Navbar from './components/Navbar';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box
          sx={{
            minHeight: '100vh',
            background:
              'radial-gradient(circle at top left, rgba(79, 70, 229, 0.12), transparent 28%), radial-gradient(circle at top right, rgba(14, 165, 233, 0.12), transparent 24%), #f4f6fb',
          }}
        >
          <Navbar />
          <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
            <Routes>
              <Route path="/" element={<AllPosts />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
          </Container>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
