import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function AhenkNavbar() {
  return (
    <>
      <Navbar
        className='w-75 mx-auto border-0'
        bg='dark'
        expand='md'
        variant='dark'
      >
        <Container fluid>
          <Navbar.Brand className='border-0 fs-2' href='/'>
            MakamNetz
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/' className='border-0'>
                Çesni Space
              </Nav.Link>
              <Nav.Link href='/makam' className='border-0'>
                Makams
              </Nav.Link>
              <Nav.Link href='/makam_network' className='border-0'>
                Makam Network
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default AhenkNavbar
