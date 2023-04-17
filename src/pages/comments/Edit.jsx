import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button, Modal, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CommentEdit(props) {
    const { comment, onClose } = props;
    const [content, setContent] = useState(comment.content);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const token = localStorage.getItem('token');

    const handleEdit = async () => {
        try {
            setIsSubmitting(true);
            const response = await axios.put(`http://localhost:8000/api/comments/edit/${comment.id}`, {
                content: content
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            toast.success('Berhasil Mengedit Komentar')
            handleClose();
        } catch (error) {
            toast.error('Gagal Menghapus Komentar')
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        
        try {
            const response = await axios.delete(`http://localhost:8000/api/comments/delete/${comment.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            window.location.reload()
            toast.success('Berhasil Menghapus Komentar')
        } catch (error) {
            console.error(error);
            toast.error('Gagal Menghapus Komentar')
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => {
        setShowModal(true);
    };


    return (
        <>
            <Dropdown className="float-end">
                <Dropdown.Toggle variant="default" className="dropdown-toggle dropdown-toggle-no-arrow" id="dropdownMenuButton2">
                    <i class="bi bi-three-dots-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark">
                    <Dropdown.Item>
                        <Button variant="transparant" className="badge p-0 fs-6" onClick={handleShow}>
                            Edit
                        </Button>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        <Button variant="transparant" className="badge p-0 fs-6" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Comment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId="formContent">
                        <Form.Control as="textarea" rows={3} value={content} onChange={handleContentChange} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="dark" onClick={handleEdit} disabled={isSubmitting}>
                        {isSubmitting ? (
                            <div>
                                <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                <span>Loading</span>
                            </div>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
