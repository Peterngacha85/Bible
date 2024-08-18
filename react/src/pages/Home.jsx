import React, { useState, useEffect } from 'react';
import { fetchVerses } from '../services/bibleApi';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const Home = () => {
  const [verse, setVerse] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State for modal visibility
  const [confirmSave, setConfirmSave] = useState(false); // State for confirming save

  useEffect(() => {
    const getVerse = async () => {
      try {
        const data = await fetchVerses('random'); // Fetch a random verse
        setVerse(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getVerse();
  }, []);

  const handleSave = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorites = [...storedFavorites, verse];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setConfirmSave(true);
    setOpen(false); // Close the modal after saving
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.paper', // Match the background color
          zIndex: 1100, // Ensure it is above other content
          mb: 2, // Add some margin below the sticky header
          borderBottom: '1px solid', // Optional: add a border to separate the header
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Bible Verse of the Day
        </Typography>
      </Box>

      {error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          Error: {error}
        </Alert>
      ) : verse ? (
        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {verse.reference}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {verse.text}
            </Typography>
            <Button
              onClick={handleOpen}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save to Favorites
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Modal for confirmation */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save to Favorites</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to save this verse to your favorites?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation message */}
      {confirmSave && (
        <Alert severity="success" sx={{ mt: 4 }}>
          Verse saved to favorites!
        </Alert>
      )}
    </Container>
  );
};

export default Home;
