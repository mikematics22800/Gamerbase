const key = import.meta.env.VITE_RAWG_API_KEY;

export const searchGames = ({search, platforms, genres}) => {
  let genre=''
  if (genres.length > 0) {
    genre = `&genres=${genres}`;
  }
  return fetch(`https://api.rawg.io/api/games?key=${key}&search=${search}&platforms=${platforms}${genre}`)
};


