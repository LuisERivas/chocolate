import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// import bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

const Landing = (isAuthenticated) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <Container>
      <Row>
        Pick your poison
      </Row>
      <Row>
        <Col />
        <Col>
          <Button href='/register' variant='secondary'> Register </Button>
          <Button href='/login' variant='success'> Login </Button>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}
// assign proptypes
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

// map state
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
// exporting component
export default connect(mapStateToProps)(Landing)
