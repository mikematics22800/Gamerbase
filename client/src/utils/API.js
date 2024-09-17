export const searchGames = ({query, platforms}) => {
  return fetch(`https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_API_KEY}&search=${query}&parent_platforms=${platforms}`);
};
