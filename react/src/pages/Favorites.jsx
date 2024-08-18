import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Card, CardContent, Box, Button } from '@mui/material';

const Favorites = () => {
  console.log("Favorites component rendered");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleDelete = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleClearAll = () => {
    localStorage.removeItem('favorites');
    setFavorites([]);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, height: '80vh', overflowY: 'auto' }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.paper', // Ensure it matches your background
          zIndex: 2, // Ensures it stays on top of other content
          padding: '16px 0', // Adjust padding as needed
        }}
      >
        Favorite Verses
      </Typography>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" color="textSecondary">
            You haven't added any favorite verses yet.
          </Typography>
        </Box>
      ) : (
        <Box>
          <List>
            {favorites.map((verse, index) => (
              <ListItem key={index} sx={{ mb: 2, position: 'relative' }}>
                <Card variant="outlined" sx={{ width: '100%' }}>
                  <CardContent>
                    <ListItemText
                      primary={<Typography variant="h6">{verse.reference}</Typography>}
                      secondary={
                        <>
                          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                            {verse.text}
                          </Typography>
                          {verse.translation_name && (
                            <Typography variant="body2" color="textSecondary">
                              {verse.translation_name}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </CardContent>
                </Card>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(index)}
                  sx={{
                    position: 'absolute',
                    top: 7,
                    right: 17,
                    zIndex: 1, // Ensure button is on top of other elements
                  }}
                >
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClearAll}
            >
              CLEAR ALL
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Favorites;
