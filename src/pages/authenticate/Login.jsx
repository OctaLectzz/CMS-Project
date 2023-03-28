import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Card, Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios';
import Page from './../Page';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.data.token);
            // Redirect
            history.push('/posts');
        } catch (error) {
            setError(error.response.data.message);
        }
    };


    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <Col md='4'>

                    {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>}

                    <Card className="p-4 shadow">

                        <Page pageTitle="Login" hideTitle={true} />
                        
                        <div className="text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style={{width: '185px'}} alt="logo" />
                            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                        </div>

                        <p className="text-center">Please login to your account</p>

                        <Form onSubmit={handleSubmit}>
                            <Form.Floating className="mb-3">
                                <Form.Control type="email" placeholder="name@example.com" id="email" value={email} onChange={event => setEmail(event.target.value)} />
                                <label for="email">Email address</label>
                            </Form.Floating>

                            <Form.Floating>
                                <Form.Control type="password" placeholder="Password" id="password" value={password} onChange={event => setPassword(event.target.value)} />
                                <label for="password">Password</label>
                            </Form.Floating>

                            <Button variant="dark" type="submit" className="mt-3 w-100">
                                Login
                            </Button>
                        </Form>

                        <div className="text-center pt-1 mb-5 pb-1">
                            <a className="text-muted" href="">Forgot password?</a>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Don't have an account?</p>
                            <Button as={Link} to="/register" outline className='btn-sm mx-2' variant='danger'>
                                Register
                            </Button>
                        </div>

                    </Card>
                </Col>
            </Row>
        </Container>
    );
    
}


export default Login;