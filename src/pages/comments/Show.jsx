import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import CommentCreate from './Create';
import CommentEdit from './Edit';


export default function CommentShow() {

    const [comments, setComments] = useState([]);
    var { id } = useParams();


    // useEffect Comment
    useEffect(() => {
        const fetchComments = async () => {
            const response = await axios.get(`http://localhost:8000/api/posts/${id}/comments`);
            const data = response.data.data;
            setComments(data);
        };
        fetchComments();
    }, [id]);


    return (
        <>
            <h1 className="mb-0 fw-bold">Comments <small>( {comments.length} )</small></h1>
            <hr></hr>

            <CommentCreate id={id} />

            <div className="ms-3">
                {comments.length > 0 ? (

                    comments.map((comment) => (
                        <Card key={comment.id} className="my-3">
                            <Card.Body>

                                <img src="https://picsum.photos/40/40" alt="User Avatar" className="rounded rounded-circle p-1 mb-2" width="40" height="40" style={{border: "1px rgb(155, 155, 155) solid"}} />
                                
                                <span className="card-title fw-bold ms-2">{comment.name}</span>

                                <Card.Text className="card-text">{comment.content}</Card.Text>

                                <small className="text-muted fw-bold float-end">{comment.created_at}</small>

                                <div className="mt-3">
                                    <CommentEdit comment={comment} />
                                </div>

                            </Card.Body>
                        </Card>
                    ))
                    
                ) : (
                    <div className="alert alert-warning alert-dismissible fade show my-3">No comments yet.</div>
                )}
            </div>
        </>
    );

}