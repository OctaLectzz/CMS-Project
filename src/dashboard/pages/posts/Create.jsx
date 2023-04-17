//import hook useState from react
import { useState, useEffect } from 'react';
//import component Bootstrap React
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
//import axios
import axios from 'axios';
//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreatePost() {

    //state
    const [postImages, setPostImages] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    //token
    const token = localStorage.getItem('token');
    //modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {setShowModal(false);};
    const handleShow = () => {setShowModal(true);};

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

    useEffect(() => {

        getTags();
        getCategories();

    },[]);

    // method "storePost"
    const storePost = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        // send data to server
        await axios.post('http://localhost:8000/api/posts/create', {
            postImages: postImages,
            title: title,
            body: body,
            tags: tag,
            categories: category
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setIsSubmitting(false);
            toast.success('Post Created Successfully!')
            //redirect
            handleClose()
        })
        .catch((error) => {
            setIsSubmitting(false);
            toast.error('Silahkan Periksa Kembali!');
        })
    };

    const getTags = async () => {
        const response = await axios.get('http://localhost:8000/api/tagpost');
        const data = await response.data.data;
        setTags(data);
    }
    const getCategories = async () => {
        const response = await axios.get('http://localhost:8000/api/categorypost');
        const data = await response.data.data;
        setCategories(data);
    }

    return (
        <>
            <Button variant="dark" className="mb-3" onClick={handleShow}>
                TAMBAH POST
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Form onSubmit={ storePost } enctype="multipart/form-data">

                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>IMAGE</Form.Label>
                            <Form.Control type="file" value={postImages} onChange={(e) => setPostImages(e.target.value)} placeholder="Choose your Image" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicTitle">
                            <Form.Label>TITLE</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicContent">
                            <Form.Label>CONTENT</Form.Label>
                            <Form.Control as="textarea" rows={3} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Masukkan Content" />
                        </Form.Group>

                        <div className="mb-3">
                            <Form.Label className="d-flex">CATEGORIES</Form.Label>
                            {categories.map((category) => (
                                <div key={category.id} className="form-check-inline me-2 mb-2">
                                    <input type="checkbox" class="btn-check" id={`Category ${category.id}`} value={category.id} onChange={handleCategoryChange} />
                                    <label class="btn btn-outline-success" for={`Category ${category.id}`}>{category.name}</label><br />
                                </div>
                            ))}
                        </div>

                        <div className="mb-3">
                            <Form.Label className="d-flex">TAGS</Form.Label>
                            {tags.map((tag) => (
                                <div key={tag.id} className="form-check-inline me-2 mb-2">
                                    <input type="checkbox" class="btn-check" id={`Tag ${tag.id}`} value={tag.id} onChange={handleTagChange} />
                                    <label class="btn btn-outline-primary" for={`Tag ${tag.id}`}>{tag.name}</label><br />
                                </div>
                            ))}
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="dark" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <div>
                                    <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                    <span>Loading</span>
                                </div>
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>
    );
}

export default CreatePost;