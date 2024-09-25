import { useState } from 'react';
import { Container, Col, Form, Button, Card, Row } from 'react-bootstrap';
import Auth from '../utils/auth';
import { searchGames } from '../utils/API';
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

  const [saveGame] = useMutation(SAVE_GAME);

  const user = localStorage.getItem('user');

  // create method to search for games and set state on form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchGames({ search: searchInput, platforms: platformIds.toString(), genres: genreIds.toString() });
      const data = await response.json();
      console.log(data);
      const games = data.results.map((game) => ({
        id: game.id,
        title: game.name,
        releaseDate: game.released,
        platforms: game.platforms.map((child) => child.platform.name),
        genres: game.genres.map((genre) => genre.name),
        image: game.background_image
      }))
      setSearchedGames(games)
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a game to our database
  const handleSaveGame = async (game) => {
    // get token
    console.log(game)
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }
    
    try {
      console.log('Saving game with data:', game); // Log the game data
      const response = await saveGame({
        variables: { ...game }
      });
    
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error details:', errorDetails);
        throw new Error('something went wrong!');
      }
    } catch (err) {
      console.error('Error:', err);
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
          return (
            <Col md="4" key={game.id}>
              <Card border='dark' className='game-card'>
                <Card.Img src={game.image} alt='box art' variant='top' className="game-card-img"/>
                <Card.Body className="game-card-body">
                  <h4>{game.title}</h4>
                  <p>Released {formatDate(game.releaseDate)}</p>
                  <div className='list'>
                    <p>Platforms:&nbsp;</p>
                    {game.platforms.join(' ')}
                  </div>
                  <div className='list'>
                    <p>Genres:&nbsp;</p>
                    {game.genres.join(' ')}
                  </div>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={user.games?.some((savedGame) => savedGame.id === game.id)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveGame(game)}>
                      {user.games?.some((savedGame) => savedGame.id === game.id)
                        ? 'This game is in your library.'
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