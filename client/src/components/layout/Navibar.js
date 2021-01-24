import React from 'react'
// import boostrap react
import { Navbar, Nav } from 'react-bootstrap'

const Navibar = () => {
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>Chocolate</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/register'>Register</Nav.Link>
            <Nav.Link href='/login'>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>

  )
}

export default Navibar
