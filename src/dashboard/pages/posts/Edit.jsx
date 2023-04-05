//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dan params dari react router dom
import { useHistory, useParams } from "react-router-dom";

//sidebar
import Dashboard from '../../AppDashboard';

function EditPost() {

    //state
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

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

        //panggil function "getPOstById"
        getPostById();
        
    }, []);

    //function "getPostById"
    const getPostById = async() => {

        //get data from server
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
        //get response data
        const data = await response.data.data

        //assign data to state
        setPost(data)
        setTitle(data.title);
        setBody(data.body);

    };

    //function "updatePost"
    const updatePost = async (e) => {
        e.preventDefault();
        
        //send data to server
        await axios.put(`http://localhost:8000/api/posts/edit/${id}`, {
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
            <Container>
                <Row>
                    <Col md={12}>
                        <Card className="border-0 rounded shadow-sm">
                            {post.title ? (
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

                                    <Form onSubmit={ updatePost }>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>TITLE</Form.Label>
                                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>CONTENT</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Masukkan body" />
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            UPDATE
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

export default EditPost;