import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';

const AppFooter = () => {
  
  return (
    <>
      <Navbar className='bg-success text-white' variant='blue' expand='lg'>
        <Container fluid>
        
    
         
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex justify-content-around'>
          <h3 className='text-white'>Developed  by Group 7<h6><br/>Website created for educational purposes and uses API data from RAWG Video Game Database https://rawg.io/</h6></h3>
          <h3 > </h3> 
          <h3>Contributors : 🧡Dave 🧡Michael 🧡Daved 🧡Jean 🧡Rashawn</h3>
         
         
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
      
    </>
  );
};

export default AppFooter;
