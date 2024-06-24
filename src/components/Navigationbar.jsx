import { Link } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Navigationbar = () => {
  const loginUser = useSelector(state => state.loginUser)

  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
    <Container>
        <Navbar.Brand href="#" as={Link} to='/'> Elo App </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link href="#" as={Link} to='/matches'>matches</Nav.Link>
            <Nav.Link href="#" as={Link} to='/players'>players</Nav.Link>
            {loginUser === null
            ? <Nav.Link href='#' as={Link} to='/login'>login</Nav.Link>
            : <>
                <Nav.Link href='#' as={Link} to='/admin'>admin</Nav.Link>
                <Nav.Link href='#' as={Link} to='/logout'>logout</Nav.Link>
              </>}
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Navigationbar