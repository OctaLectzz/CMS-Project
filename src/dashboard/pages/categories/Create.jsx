//import hook useState from react
import { useState } from 'react';
//import component Bootstrap React
import { Modal, Form, Button, Spinner } from 'react-bootstrap';
//import axios
import axios from 'axios';
//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateCategory() {

    //state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    //state validation
    const [validation, setValidation] = useState({});
    //token
    const token = localStorage.getItem('token');
    //modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {setShowModal(false);};
    const handleShow = () => {setShowModal(true);};

    //method "storeCategory"
    const storeCategory = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        //send data to server
        await axios.post('http://localhost:8000/api/categories/create', {
            name: name,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setIsSubmitting(false);
            toast.success('Category Created Successfully!')
            handleClose()

        })
        .catch((error) => {
            setIsSubmitting(false);
            toast.error('Silahkan Periksa Kembali!');
        })
        
    };

    return (
        <>
            <Button variant="dark" className="mb-3" onClick={handleShow}>
                TAMBAH CATEGORY
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Form onSubmit={ storeCategory }>

                    <Modal.Header closeButton>
                        <Modal.Title>Create Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>NAME</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>DESCRIPTION</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Masukkan Description" />
                        </Form.Group>
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
                                'SAVE'
                            )}
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal>
        </>
    );
}

export default CreateCategory;