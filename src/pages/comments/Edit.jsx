import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function CommentEdit(props) {
    const { comment, onClose } = props;
    const [content, setContent] = useState(comment.content);
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const { id } = useParams();

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const token = localStorage.getItem('token');

    const handleEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/api/comments/edit/${comment.id}`, {
                content: content
                }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response);
            onClose();
        } catch (error) {
            console.error(error);
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
            onClose();
            history.go(0);
        } catch (error) {
            console.error(error);
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
            <Button variant="dark" className="mx-1 badge" onClick={handleShow}>
                Edit
            </Button>
            <Button variant="dark" className="mx-1 badge" onClick={handleDelete}>
                Delete
            </Button>
            
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
                    <Button variant="dark" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}
