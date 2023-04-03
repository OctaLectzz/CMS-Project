import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Card, Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios';
import Page from '../../Page';

function ResetPassword() {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const history = useHistory();
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:8000/api/auth/reset-password', { 
                token,
                email,
                password, 
                password_confirmation: passwordConfirmation 
            });
            setMessage(response.data.message);
            setTimeout(() => {
                history.push('/Login');
            }, 3000); 
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

                        <Page pageTitle="Reset Password" hideTitle={true} />
                        
                        <div className="text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{width: '185px'}} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                        </div>

                        <span className="text-center">Enter New Data and Token Valid</span>
                        <p className="text-center text-danger fw-bold">NOTE : Get Token in your Email</p>

                        <Form onSubmit={handleSubmit}>
                            <Form.Floating className="mb-2">
                                <Form.Control type="token" placeholder="Token" id="token" value={token} onChange={(e) => setToken(e.target.value)} />
                                <label for="token">Token</label>
                            </Form.Floating>

                            <Form.Floating className="mb-2">
                                <Form.Control type="email" placeholder="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label for="email">Email address</label>
                            </Form.Floating>

                            <Form.Floating className="mb-2">
                                <Form.Control type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <label for="password">Password</label>
                            </Form.Floating>

                            <Form.Floating>
                                <Form.Control type="password" placeholder="Confirm Password" id="passwordConfirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                <label for="passwordConfirmation">Confirm Password</label>
                            </Form.Floating>

                            <Button variant="dark" type="submit" className="mt-3 w-100" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div>
                                        <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                        <span>Loading</span>
                                    </div>
                                ) : (
                                    'Change Password'
                                )}
                            </Button>
                        </Form>

                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default ResetPassword;