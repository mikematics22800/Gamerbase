import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';

const SavedGames = () => {
  const [userData, setUserData] = useState({ savedGames: [] }); // Initialize with an empty array
  const { loading, data } = useQuery(GET_ME);
  const [removeGame] = useMutation(REMOVE_GAME);

  useEffect(() => {
    if (data && data.getMe) {
      setUserData(data.getMe); // Ensure you are accessing the correct property
    }
  }, [data]);

  const handleDeleteGame = async (gameId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeGame({
        variables: { gameId },
      });

      setUserData((prevState) => ({
        ...prevState,
        savedGames: prevState.savedGames.filter((game) => game.gameId !== gameId),
      }));

      removeGameId(gameId);
    } catch (err) {
      console.error('Error deleting game:', err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved games!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedGames && userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${userData.savedGames.length === 1 ? 'game' : 'games'}:`
            : 'You have no saved games!'}
        </h2>
        <Row>
          {userData.savedGames.map((game) => (
            <Col md="4" key={game.gameId}>
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
                      
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteGame(game.gameId)}>
                     Delete this Game!
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedGames;
