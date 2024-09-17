export const getSavedGameIds = () => {
  const savedBookIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : [];

  return savedBookIds;
};

export const saveGameIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_games', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_games');
  }
};

export const removeGameId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedGameIds = savedBookIds?.filter((savedGameId) => savedGameId !== GameId);
  localStorage.setItem('saved_games', JSON.stringify(updatedSavedGameIds));

  return true;
};
