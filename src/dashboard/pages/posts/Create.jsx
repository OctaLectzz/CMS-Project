//import hook useState from react
import { useState, useEffect } from 'react';
//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button, Alert, Spinner } from 'react-bootstrap';
//import axios
import axios from 'axios';
//import hook history dari react router dom
import { useHistory } from "react-router-dom";
//sidebar
import Dashboard from '../../AppDashboard';
//page
import Page from '../../../Page';


function CreatePost() {

    //state
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // state validation
    const [validation, setValidation] = useState({});
    //history
    const history = useHistory();
    //token
    const token = localStorage.getItem('token');

    // Tag
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState([]);
    const handleTagChange = (event) => { 
        const tagId = parseInt(event.target.value); 
        if (event.target.checked) { 
            setTag([...tag, tagId]); 
        } else { 
            setTag(tag.filter((id) => id !== tagId)); 
        } 
    };

    useEffect(() => {

        getTags();

    },[]);

    // method "storePost"
    const storePost = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        // send data to server
        await axios.post('http://localhost:8000/api/posts/create', {
            title: title,
            body: body,
            tags: tag
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setIsSubmitting(false);
            //redirect
            history.push('/dashboard/posts');
        })
        .catch((error) => {
            //assign validation on state
            setValidation(error.response.data);
        })
    };

    const getTags = async () => {
        const response = await axios.get('http://localhost:8000/api/tagpost');
        const data = await response.data.data;
        setTags(data);
    }

    return (
        <>
            <Dashboard />
            <Page pageTitle="Create Post" hideTitle={true} />
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

                                    <div className="mb-3">
                                        <Form.Label className="d-flex">TAGS</Form.Label>
                                        {tags.map((tag) => (
                                            <div key={tag.id} className="form-check-inline me-2 mb-2">
                                                <input type="checkbox" class="btn-check" id={tag.id} value={tag.id} onChange={handleTagChange} />
                                                <label class="btn btn-outline-primary" for={tag.id}>{tag.name}</label><br />
                                            </div>
                                        ))}
                                    </div>

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

export default CreatePost;