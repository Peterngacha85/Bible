import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Switch, Button, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Book, Search, Favorite } from '@mui/icons-material';
import Home from './pages/Home.jsx';
import SearchPage from './pages/Search.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeComponent, setActiveComponent] = useState('home');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    typography: {
      fontFamily: 'serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
      },
    },
  });

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Bible App</Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={() => handleComponentChange('home')}>
              <Book />
            </IconButton>
            <IconButton color="inherit" onClick={() => handleComponentChange('search')}>
              <Search />
            </IconButton>
            <IconButton color="inherit" onClick={() => handleComponentChange('favorites')}>
              <Favorite />
            </IconButton>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
        </Toolbar>
      </AppBar>

      <div style={{ padding: '20px' }}>
        {activeComponent === 'home' && <Home />}
        {activeComponent === 'search' && <SearchPage />}
        {activeComponent === 'favorites' && <Favorites />}
      </div>
    </ThemeProvider>
  );
}

export default App;
