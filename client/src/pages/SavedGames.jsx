import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

const SavedGames = () => {
  const [games, setGames] = useState([]); // Initialize with an empty array
  const { loading, data } = useQuery(GET_ME);
  const [removeGame] = useMutation(REMOVE_GAME);

  useEffect(() => {
    if (data && data.getMe) {
      setGames(data.getMe); // Ensure you are accessing the correct property
    }
  }, [data]);


  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeleteGame = async (id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const user = await removeGame({
        variables: { id }
      });
      setGames(user);
      // upon success, remove game's id from localStorage
      removeGameId(id);
      
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container fluid>
          <h1>Viewing saved games!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {games.games && games.games.length
            ? `Viewing ${games.games.length} saved ${games.games.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <Row>
          {games.games.map((game) => {
            return (
              <Col key={game.id} md="4">
                <Card border='dark'>
                  {game.image ? <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <p className='small'>Authors: {game.authors}</p>
                    <Card.Text>{game.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteGame(game.id)}>
                      Delete this Game!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedGames;
