export const searchGames = ({query, platforms, genres}) => {
  return fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${query}&parent_platforms=${platforms}&genres=${genres}`);
};
