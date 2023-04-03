import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


function Dashboard() {
    return (
        <Container>
            <Row>
            <Col>
                <Card>
                <Card.Body>
                    <Card.Title>Welcome to Dashboard</Card.Title>
                    <Card.Text>
                    This is your dashboard, where you can see your latest activity and manage your account.
                    </Card.Text>
                    <Button variant="primary">Learn more</Button>
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    );
}
  

export default Dashboard;