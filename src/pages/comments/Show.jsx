import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Col } from 'react-bootstrap';
import axios from 'axios';


export default function CommentShow() {

    const [comments, setComments] = useState([]);
    const { id } = useParams();


    // useEffect Comment
    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`http://localhost:8000/api/posts/${id}/comments`);
            const data = await response.data.data;
            setComments(data);
        };
        fetchComments();
    }, [id]);


    return (
        <>
            <h1 className="mb-0 fw-bold">Comments <small>( {comments.length} )</small></h1>
            <hr></hr>
            <div className="ms-3">
            {comments.length > 0 ? (

                comments.map((comment) => (
                    <Card key={comment.id} className="my-3">
                        <Card.Body>

                            <img src="https://picsum.photos/40/40" alt="User Avatar" className="rounded rounded-circle p-1 mb-2" width="40" height="40" style={{border: "1px rgb(155, 155, 155) solid"}} />
                            
                            <span className="card-title fw-bold ms-2">{comment.name}</span>

                            <Card.Text className="card-text">{comment.content}</Card.Text>

                            <small className="text-muted fw-bold float-end">{comment.created_at}</small>

                        </Card.Body>
                    </Card>
                ))
                
            ) : (
                <p>No comments yet.</p>
            )}
            </div>
        </>
    );

}