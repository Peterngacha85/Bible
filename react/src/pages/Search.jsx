import React, { useState } from 'react';
import { fetchVerses } from '../services/bibleApi';
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const Search = () => {
  const [queryType, setQueryType] = useState('single');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false); // State for modal
  const [confirmSave, setConfirmSave] = useState(false); // State to confirm saving

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchVerses(queryType, query);
      console.log('Fetched Data:', data); // Debugging line
      setResult(data);
    } catch (err) {
      console.error('Error:', err.message); // Debugging line
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorites = [...storedFavorites, result];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setConfirmSave(true);
    setOpen(false); // Close the modal after saving
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveButtonClick = () => {
    setOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, height: '80vh', overflowY: 'auto' }}>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.paper', // Ensure it matches your background
          zIndex: 1, // Ensures it stays on top of other content
          padding: '16px 0', // Adjust padding as needed
          mb: 4, // Add some margin at the bottom to separate from content
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Bible Verse Finder
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <FormControl sx={{ minWidth: 200, mr: 2 }}>
            <InputLabel>Query Type</InputLabel>
            <Select
              value={queryType}
              onChange={(e) => setQueryType(e.target.value)}
              label="Query Type"
            >
              <MenuItem value="single">Single Verse</MenuItem>
              <MenuItem value="abbreviated">Abbreviated Book Name</MenuItem>
              <MenuItem value="range">Verse Range</MenuItem>
              <MenuItem value="multiple">Multiple Ranges</MenuItem>
              <MenuItem value="translation">Different Translation</MenuItem>
              <MenuItem value="verse_numbers">Verse Numbers</MenuItem>
              <MenuItem value="jsonp">JSONP</MenuItem>
              <MenuItem value="random">Random Verse</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={`Enter ${queryType} query`}
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button variant="contained" onClick={handleSearch} disabled={loading}>
            Search
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          Error: {error}
        </Alert>
      )}

      {result && (
        <Card variant="outlined" sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Result:
            </Typography>
            <Typography variant="body1">{result.text}</Typography>
            <Typography variant="body2">
              <strong>Reference:</strong> {result.reference}
            </Typography>
            {queryType !== 'random' && result.translation_name && (
              <Typography variant="body2">
                <strong>Translation:</strong> {result.translation_name}
              </Typography>
            )}
            <Button
              onClick={handleSaveButtonClick}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Save to Favorites
            </Button>
          </CardContent>
        </Card>
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

export default Search;
