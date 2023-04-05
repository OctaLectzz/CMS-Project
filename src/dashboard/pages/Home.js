//import component Bootstrap React
import { Card, Container, Row, Col } from 'react-bootstrap'
import Dashboard from '../AppDashboard';

function DashboardHome() {
    return (
        <>
            <Dashboard />
            <Container>
                <Row>
                    <Col md={12}>
                        <Card className="border-0 rounded shadow-sm">
                            <Card.Body>
                                HALAMAN DASHBOARD HOME
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DashboardHome;