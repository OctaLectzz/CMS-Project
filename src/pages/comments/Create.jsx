import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Card, Spinner } from 'react-bootstrap';
//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentCreate = ({ id }) => {

    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            setIsSubmitting(true);
            const response = await axios.post(`http://localhost:8000/api/posts/${id}/comments/create`, {
                content: comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            toast.success('Berhasil Menambahkan Komentar')
            setComment("");
        } catch (error) {
            toast.error('Gagal Menambahkan Komentar')
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        }
        return false;
    }


    return (
        <Card className="p-3">
            {isLoggedIn() ? (
                <Form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Comment"
                        className="form-control"
                        id="comment"
                        value={comment}
                        maxLength="255"
                        rows={3}
                        onChange={(event) => setComment(event.target.value)}
                        required
                    ></textarea>

                    <Button type="submit" variant="dark" className="mt-3" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <div>
                                <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                <span>Loading</span>
                            </div>
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </Form>
            ) : (
                <div className="alert alert-danger alert-dismissible fade show">Please <Button as={Link} to="/Login" variant="transparant" className="p-0 mb-1 text-primary">Login</Button> to leave a Comment</div>
            )}
        </Card>
    );
  
}

export default CommentCreate;