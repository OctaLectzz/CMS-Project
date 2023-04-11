//import hook useState from react
import { useState } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button, Alert, Spinner } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

//sidebar
import Dashboard from '../../AppDashboard';

function CreateTag() {

    //state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //token
    const token = localStorage.getItem('token');

    //method "storeTag"
    const storeTag = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        //send data to server
        await axios.post('http://localhost:8000/api/tags/create', {
            name: name,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {

            setIsSubmitting(false);
            //redirect
            history.push('/dashboard/tags');

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
                                
                                <Form onSubmit={ storeTag }>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>NAME</Form.Label>
                                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>DESCRIPTION</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Masukkan Description" />
                                    </Form.Group>

                                    <Button type="submit" variant="dark" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <div>
                                                <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                <span>Loading</span>
                                            </div>
                                        ) : (
                                            'SAVE'
                                        )}
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

export default CreateTag;