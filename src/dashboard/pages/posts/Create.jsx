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

    return (
        <>
            <Button variant="dark" className="mb-3" onClick={handleShow}>
                TAMBAH POST
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Form onSubmit={ storePost }>

                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
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