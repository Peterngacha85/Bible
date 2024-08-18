import { Button } from '@mui/material';

const VerseDisplay = ({ verse }) => {
  console.log("verse display component rendered");
  const handleBookmark = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(verse);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Verse bookmarked!');
  };

  return (
    <div>
      <h2>{verse.reference}</h2>
      <p>{verse.text}</p>
      <small>{verse.translation_name}</small>
      <Button variant="outlined" onClick={handleBookmark}>
        Bookmark
      </Button>
    </div>
  );
};

export default VerseDisplay;
