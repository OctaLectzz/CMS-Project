//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'

function Home() {
    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                        <h1>LARAVEL + REACT.JS</h1>
                        <p class="lead">Tutorial FullStack Laravel dan React.js oleh <strong>Octavyan Putra R.</strong></p>
                        <Button href="http://instagram.com/octalectzz" target="_blank" variant="primary" size="lg">SELENGKAPNYA</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;