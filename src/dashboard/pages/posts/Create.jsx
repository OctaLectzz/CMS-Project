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
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
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
    const [category, setCategory] = useState('');

    // Image
    function handleImage(event) {
        const file = event.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }

    useEffect(() => {

        getTags();
        getCategories();

    },[]);

    // method "storePost"
    const storePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        tag.forEach((id) => formData.append("tags[]", id));
        formData.append("categories", category)
        formData.append("image", image);
        
        setIsSubmitting(true);
        // send data to server
        await axios.post('http://localhost:8000/api/posts/create',
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setIsSubmitting(false);
            toast.success('Post Created Successfully!')
            //redirect
            handleClose()
            window.location.reload()
        })
        .catch((error) => {
            setIsSubmitting(false);
            toast.error('Silahkan Periksa Kembali!');
        })
    };

    const getTags = async () => {
        const response = await axios.get('http://localhost:8000/api/tagpost');
        const data = response.data.data;
        setTags(data);
    }
    const getCategories = async () => {
        const response = await axios.get('http://localhost:8000/api/categorypost');
        const data = response.data.data;
        setCategories(data);
    }

    return (
        <>
            <Button variant="dark" className="mb-3" onClick={handleShow}>
                TAMBAH POST
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Form onSubmit={ storePost } encType="multipart/form-data">

                    <Modal.Header closeButton>
                        <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="mb-3">
                            <label className="form-label d-block">Image Post</label>
                            {imagePreview && (
                                <img
                                src={imagePreview}
                                alt="selected file"
                                className="mb-3 rounded-2"
                                height={100}
                                />
                            )}

                            <input
                                type="file"
                                className="form-control"
                                onChange={handleImage}
                            />
                        </div>

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
                            <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-3">
                            <Form.Label className="d-flex">TAGS</Form.Label>
                            {tags.map((tag) => (
                                <div key={tag.id} className="form-check-inline me-2 mb-2">
                                    <input type="checkbox" class="btn-check" id={`tag${tag.id}`} value={tag.id} onChange={handleTagChange} />
                                    <label class="btn btn-outline-primary" htmlFor={`tag${tag.id}`}>{tag.name}</label><br />
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