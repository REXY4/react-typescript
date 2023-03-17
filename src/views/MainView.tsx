import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import FormInput from '../components/FormInput'

class MainView extends React.Component {
  render() {
    return (
      <Container>
        <Row className="mt-3 mb-5">
          <Col className="d-flex justify-content-center">
            <FormInput />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default MainView
