import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Dashboard from '../../AppDashboard';
import Page from '../../../Page';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditPost() {

    //state
    const [post, setPost] = useState({});
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    //history
    const history = useHistory();

    //token
    const token = localStorage.getItem('token');

    //get ID from parameter URL
    const { id } = useParams();

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
    // Category
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const handleCategoryChange = (event) => { 
        const categoryId = parseInt(event.target.value); 
        if (event.target.checked) { 
            setCategory([...category, categoryId]); 
        } else { 
            setCategory(category.filter((id) => id !== categoryId)); 
        } 
    };


    //hook useEffect
    useEffect(() => {

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
        getPostById()

        const getTags = async () => {
            const response = await axios.get('http://localhost:8000/api/tagpost');
            const data = await response.data.data;
            setTags(data);
        }
        getTags()
        const getCategories = async () => {
            const response = await axios.get('http://localhost:8000/api/categorypost');
            const data = await response.data.data;
            setCategories(data);
        }
        getCategories()
        
    }, [id]);


    //function "updatePost"
    const updatePost = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
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
            setIsSubmitting(false);
            toast.success('Post Updated Successfully!')
            //redirect
            history.push('/dashboard/posts');
        })
        .catch((error) => {
            setIsSubmitting(false);
            toast.error('Silahkan Periksa Kembali!');
        })
    };


    return (
        <>
            <Dashboard />
            <Page pageTitle="Edit Post" hideTitle={true} />
            <Container>
                <ToastContainer />
                <Row>
                    <Col md={12}>
                        <Card className="border-0 rounded shadow-sm">
                            {post.title ? (
                                <Card.Body>

                                    <Form onSubmit={ updatePost }>
                                        <Form.Group className="mb-3" controlId="formBasicTitle">
                                            <Form.Label>TITLE</Form.Label>
                                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicBody">
                                            <Form.Label>CONTENT</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Masukkan Content" />
                                        </Form.Group>

                                        <div className="mb-3">
                                            <Form.Label className="d-flex">CATEGORIES</Form.Label>
                                            {categories.map((category) => (
                                                <div key={category.id} className="form-check-inline me-2 mb-2">
                                                    <input type="checkbox" class="btn-check" id={category.id} value={category.id} onChange={handleCategoryChange} />
                                                    <label class="btn btn-outline-success" for={category.id}>{category.name}</label><br />
                                                </div>
                                            ))}
                                        </div>

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

export default EditPost;