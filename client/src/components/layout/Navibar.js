import React, { Fragment } from 'react'
// import boostrap react
import { Navbar, Nav } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navibar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link onClick={logout} href='#!'>logout</Nav.Link>
        <Nav.Link href='/dashboard'>Dashboard</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  )
  const guestLinks = (
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='mr-auto'>
        <Nav.Link href='/register'>Register</Nav.Link>
        <Nav.Link href='/login'>Login</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  )
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>Chocolate</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        { !loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks }</Fragment>)}
      </Navbar>
    </div>

  )
}
Navibar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navibar)
