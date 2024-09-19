import { useState, useEffect } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import { searchGames, getGameDetail } from '../utils/API';
import { useMutation } from '@apollo/client';
import { SAVE_GAME } from '../utils/mutations';
import { formatDate } from '../utils/formatDate';

const SearchGames = () => {
  // create state for holding returned google api data
  const [searchedGames, setSearchedGames] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // genreIds set to all by default
  const [genreIds, setGenreIds] = useState([]);
  // platforms set to all modern platforms by default
  const [platformIds, setPlatformIds] = useState([1, 4, 7, 14, 18, 187]);


  // create state to hold saved gameId values
  const [savedGameIds, setSavedGameIds] = useState(getSavedGameIds());

  const [saveGame] = useMutation(SAVE_GAME);

  // set up useEffect hook to save `savedGameIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveGameIds(savedGameIds);
  }, [savedGameIds]);

  // create method to search for games and set state on form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchGames({ search: searchInput, platforms: platformIds.toString(), genres: genreIds.toString() });
      const data = await response.json();
      console.log(data);
      setSearchedGames(data.results)
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a game to our database
  const handleSaveGame = async (gameId) => {
    // find the game in `searchedGames` state by the matching id
    const gameToSave = searchedGames.find((game) => game.gameId === gameId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveGame(token, gameToSave);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if game successfully saves to user's account, save game id to state
      setSavedGameIds([...savedGameIds, gameToSave.gameId]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenreChange = (e) => {
    const value = e.target.value;
    if (!genreIds.includes(value)) {
      setGenreIds([...genreIds, value]);
    }
  };

  const handlePlatformChange = (e) => {
    const value = e.target.value;
    if (!platformIds.includes(value)) {
      setPlatformIds([...platformIds, value]);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <p>Search for Games!</p>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control 
                  className='mb-3'
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a game'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
              <Col>
                <label>Platforms</label>
                <Form.Check
                  type='checkbox'
                  label='PC'
                  value='4'
                  onChange={handlePlatformChange}
                />
                <Form.Check
                  type='checkbox'
                  label='PlayStation 5'
                  value='187'
                  onChange={handlePlatformChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Xbox Series X'
                  value='186'
                  onChange={handlePlatformChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Nintendo Switch'
                  value='7'
                  onChange={handlePlatformChange}
                />
                <Form.Check
                  type='checkbox'
                  label='PlayStation 4'
                  value='18'
                  onChange={handlePlatformChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Xbox One'
                  value='1'
                  onChange={handlePlatformChange}
                />
              </Col>
              <Col>
                <label>Genres</label>
                <Form.Check
                  type='checkbox'
                  label='Action'
                  value='4'
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Adventure'
                  value='3'
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type='checkbox'
                  label='RPG'
                  value='5'
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Strategy'
                  value='10'
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Puzzle'
                  value='7'
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Shooter'
                  value='2'
                  onChange={handleGenreChange}
                />
                <Form.Check
                  type='checkbox'
                  label='Racing'
                  value='1'
                  onChange={handleGenreChange}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <Row className='game-cards'>
        {searchedGames?.map((game) => {
          const platformList = game.platforms?.map((platform) => platform.platform.name).join(', ');
          const genreList = game.genres?.map((genre) => genre.name).join(', ');
          return (
            <Col md="4" key={game.id}>
              <Card border='dark' className='game-card'>
                <Card.Img src={game.background_image} alt='box art' variant='top' className="game-card-img"/>
                <Card.Body className="game-card-body">
                  <h4>{game.name}</h4>
                  <p>Released {formatDate(game.released)}</p>
                  <div className='list'>
                    <p>Platforms:&nbsp;</p>
                    {platformList}
                  </div>
                  <div className='list'>
                    <p>Genres:&nbsp;</p>
                    {genreList}
                  </div>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedGameIds?.some((savedGameId) => savedGameId === game.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveGame(game.id)}>
                      {savedGameIds?.some((savedGameId) => savedGameId === game.id)
                        ? 'This game has already been saved!'
                        : 'Save this Game!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default SearchGames;
