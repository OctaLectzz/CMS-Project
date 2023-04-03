import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Card, Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios';
import Page from '../../Page';


function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
            setTimeout(() => {
                history.push('/ResetPassword');
            }, 10000);          
        } catch (error) {
            setMessage(error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Container className="mt-3">
            <Row className="justify-content-center">

                {message && (
                    <Alert variant="info" className="text-center">
                        {message && <p>{message}</p>}
                    </Alert>
                )}

                <Col md='4'>
                    <Card className="p-4 shadow">

                        <Page pageTitle="Forgot Password" hideTitle={true} />
                        
                        <div className="text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{width: '185px'}} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                        </div>

                        <p className="text-center">Enter your Email for Reset Password</p>
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Floating>
                                <Form.Control type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label for="email">Email address</label>
                            </Form.Floating>

                            <Button variant="dark" type="submit" className="mt-3 w-100" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div>
                                        <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                        <span>Loading</span>
                                    </div>
                                ) : (
                                    'Send Token'
                                )}
                            </Button>
                        </Form>

                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default ForgotPassword;
