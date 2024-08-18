import { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  console.log("Searchbar component rendered");
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('searchHistory')) || []);

  const handleSearch = () => {
    if (query) {
      onSearch(query);
      const updatedHistory = [query, ...history.slice(0, 4)]; // Limit history to 5 items
      setHistory(updatedHistory);
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    }
  };

  const handleHistoryClick = (item) => {
    setQuery(item);
    onSearch(item);
  };

  return (
    <div>
      <TextField
        label="Enter book, chapter, verse"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      <List>
        {history.map((item, index) => (
          <ListItem button key={index} onClick={() => handleHistoryClick(item)}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default SearchBar;
