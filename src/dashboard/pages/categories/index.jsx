import { Card, Container, Row, Col } from 'react-bootstrap'
import Dashboard from '../../AppDashboard';


function CategoryIndex() {
    return (
        <>
            <Dashboard />
            <Container className="mt-3">
                <Row>
                    <Col md="{12}">
                        <Card className="border-0 rounded shadow-sm">
                            <Card.Body>
                                HALAMAN INDEX CATEGORIES
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default CategoryIndex;