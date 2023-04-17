import React, { useState } from 'react';
import { Form, Card, Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios';
import Page from '../../Page';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            const response = await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
            console.log(response.data.message);
            toast.success('Link to Change Password has send in your Mail')
        } catch (error) {
            console.log(error.response.data.message);
            toast.error('Failed to Change Password!')
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Container className="mt-3">
            <ToastContainer />
            <Row className="justify-content-center">

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
                                    'Send Email'
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
