import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';

const CommentCreate = ({ id }) => {

    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`http://localhost:8000/api/posts/${id}/comments/create`, {
                content: comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data);
            // Reset form after successful submission
            setComment('');
        } catch (error) {
            console.log(error);
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
                    onChange={e => setComment(e.target.value)}
                    required
                ></textarea>

                <Button type="submit" variant="dark" className="mt-3">Submit</Button>
            </Form>
        ) : (
            <div className="alert alert-danger alert-dismissible fade show">Please <Button as={Link} to="/Login" variant="transparant" className="p-0 mb-1 text-primary">Login</Button> to leave a Comment</div>
        )}
    </Card>
  );
}

export default CommentCreate;