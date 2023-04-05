//import hook useState from react
import { useState } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

//sidebar
import Dashboard from '../../AppDashboard';

function CreatePost() {

    //state
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //token
    const token = localStorage.getItem('token');

    //method "storePost"
    const storePost = async (e) => {
        e.preventDefault();
        
        //send data to server
        await axios.post('http://localhost:8000/api/posts/create', {
            title: title,
            body: body
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {

            //redirect
            history.push('/dashboard/posts');

        })
        .catch((error) => {

            //assign validation on state
            setValidation(error.response.data);
        })
        
    };

    return (
        <>
            <Dashboard />
            <Container className="mt-3">
                <Row>
                    <Col md="{12}">
                        <Card className="border-0 rounded shadow-sm">
                            <Card.Body>
                            
                                {
                                    validation.errors &&
                                        <Alert variant="danger">
                                            <ul class="mt-0 mb-0">
                                                { validation.errors.map((error, index) => (
                                                    <li key={index}>{ `${error.param} : ${error.msg}` }</li>
                                                )) }
                                            </ul>
                                        </Alert>
                                }
                                
                                <Form onSubmit={ storePost }>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>TITLE</Form.Label>
                                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>CONTENT</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Masukkan Content" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        SIMPAN
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CreatePost;