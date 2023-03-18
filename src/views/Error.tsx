import React from 'react'
import { Col, Row, Container } from "react-bootstrap";

const ErrorPage :React.FC = () =>{
    return (
        <Container>
            <Row className="mt-5">
                <Col>
                    <h1>Page not found 404</h1>
                </Col>
            </Row>
        </Container>
    )
}

export default ErrorPage;