import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Dashboard from '../../AppDashboard';


function EditTag() {

    //state
    const [tag, setTag] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //token
    const token = localStorage.getItem('token');

    //get ID from parameter URL
    const { id } = useParams();


    //hook useEffect
    useEffect(() => {

        //function "getTagById"
        const getTagById = async() => {

            //get data from server
            const response = await axios.get(`http://localhost:8000/api/tags/${id}`);
            //get response data
            const data = await response.data.data

            //assign data to state
            setTag(data)
            setName(data.name);
            setDescription(data.description);

        };
        getTagById()
        
    }, [id]);


    //function "updateTag"
    const updateTag = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        //send data to server
        await axios.put(`http://localhost:8000/api/tags/edit/${id}`, {
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
            <Container>
                <Row>
                    <Col md={12}>
                        <Card className="border-0 rounded shadow-sm">
                            {tag ? (
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

                                    <Form onSubmit={ updateTag }>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>NAME</Form.Label>
                                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Name" />
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
                                                'UPDATE'
                                            )}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center p-2">
                                    <Spinner animation="border" className="me-2" />
                                    <span className="fs-5">Loading...</span>
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EditTag;