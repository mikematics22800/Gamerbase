const key = import.meta.env.VITE_RAWG_API_KEY;

export const searchGames = ({query, platforms, genres}) => {
  return fetch(`https://api.rawg.io/api/games?key=${key}&search=${query}&platforms=${platforms}&genres=${genres}`, {
    mode: 'no-cors'
  });
};

export const getGameDetail = (gameId) => {
  return fetch(`https://api.rawg.io/api/games/${gameId}?key=${key}`, {
    mode: 'no-cors'
  });
};