import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentReply = ({postId, commentId}) => {

    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = localStorage.getItem('token');

    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => {
        setShowModal(true);
    };


    const handleReply = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        const response = await axios.post(`http://localhost:8000/api/posts/${postId}/comments/${commentId}/reply`, {
            content
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            toast.success('Berhasil Membalas Komentar')
            handleClose();
        })
        .catch((error) => {
            console.log(error);
            toast.error('Gagal Membalas Komentar')
            handleClose();
        })
        setIsSubmitting(false);
    }


    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        }
        return false;
    }


    return (
        <>
            {isLoggedIn() ? (
                <>
                    <Button variant="dark" className="badge" onClick={handleShow}>
                        Reply
                    </Button>

                    <Modal show={showModal} onHide={handleClose}>

                            <Modal.Header closeButton>
                                <Modal.Title>Reply Comment</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form onSubmit={handleReply}>
                                    <Form.Control
                                        placeholder="Content"
                                        as="textarea"
                                        value={content}
                                        onChange={(event) => {
                                            setContent(event.target.value);
                                        }}
                                        rows={3}
                                    ></Form.Control>
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type="submit" variant="dark" onClick={handleReply} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <div>
                                            <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                            <span>Loading</span>
                                        </div>
                                    ) : (
                                        'Submit'
                                    )}
                                </Button>
                            </Modal.Footer>

                    </Modal>
                </>
            ) : (
                <Button variant="dark" className="badge" disabled={true}>
                    Reply
                </Button>
            )}
        </>
    );
  
}

export default CommentReply;