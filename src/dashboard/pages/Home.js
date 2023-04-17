//import component Bootstrap React
import { Card, Container, Row, Col } from 'react-bootstrap'
import Dashboard from '../AppDashboard';
import Page from '../../Page';
import { Link } from 'react-router-dom';
import './../AppDashboard.css'

function DashboardHome() {
    return (
        <>
            <Dashboard />
            <Page pageTitle="Dashboard Home" hideTitle={true} />
            <Container>
                <Row className="d-flex align-items-center">
                    
                    <Link to="dashboard/posts" className="text-decoration-none home">
                        <Col md={12} className="my-2">
                            <Card className="rounded shadow-sm text-center p-5 bg-success">
                                <Card.Body className="text-light fs-1 fw-bold bg-opacity-25">
                                    <i class="bi bi-postcard-fill mx-3"></i> DASHBOARD POSTS <i class="bi bi-postcard-fill mx-3"></i>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>

                    <Link to="dashboard/tags" className="text-decoration-none home">
                        <Col md={12} className="my-2">
                            <Card className="rounded shadow-sm text-center p-5 bg-info">
                                <Card.Body className="text-light fs-1 fw-bold bg-opacity-25">
                                    <i class="bi bi-tags-fill mx-3"></i> DASHBOARD TAGS <i class="bi bi-tags-fill mx-3"></i>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>

                    <Link to="dashboard/categories" className="text-decoration-none home">
                        <Col md={12} className="my-2">
                            <Card className="rounded shadow-sm text-center p-5 bg-warning">
                                <Card.Body className="text-light fs-1 fw-bold bg-opacity-25">
                                    <i class="bi bi-list-columns-reverse mx-3"></i> DASHBOARD CATEGORIES <i class="bi bi-list-columns-reverse mx-3"></i>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Link>

                </Row>
            </Container>
        </>
    );
}

export default DashboardHome;