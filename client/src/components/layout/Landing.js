import React from 'react'

// import bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

const Landing = () => {
  return (
    <Container>
      <Row>
        Choose One to do
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
// exporting component
export default Landing
