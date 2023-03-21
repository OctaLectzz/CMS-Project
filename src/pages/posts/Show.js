import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function SinglePost() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  // useEffect Post
  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
      const data = await response.data.data;
      setPost(data);
    };
    fetchPost();
  }, [id]);

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
    <Container className="mt-3">
      <Row className="justify-content-center bg-white py-5 shadow">
        {post ? (
          <>

            <Col md="8" className="mb-5">
              <div>
                <small className="float-end ms-2 badge bg-warning p-2">{post.saves} Saves</small>
                <small className="float-end badge bg-danger p-2">{post.likes} Likes</small>
                <small className="text-muted d-flex me-5">{post.views} Views</small>
              </div>

              <div className="text-center mt-4 mb-4">
                <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                <p>
                  <small>By : <span className="text-primary">{post.created_by}</span></small>
                </p>
              </div>

              <p className="mb-5 fs-4">{post.body}</p>

              <Button as={Link} to="/posts" variant="primary">Back</Button>

              <small className="text-muted float-end fs-6">{post.created_at}</small>
            </Col>

            <Col md="8">
              <p className="mb-0 fs-3 fw-bold">Comments : </p>
              <div className="ms-3">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Card key={comment.id} className="my-3">
                      <Card.Body>
                        <img src={comment.images} alt="User Avatar" className="rounded rounded-circle p-1 mb-2" width="70" height="70" style={{border: "1px rgb(155, 155, 155) solid"}} />
                        <Card.Title className="card-title fw-bold">{comment.user && comment.user.name}</Card.Title>
                        <Card.Text className="card-text">{comment.content}</Card.Text>
                        <small className="text-muted fw-bold float-end">{comment.created_at}</small>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}
              </div>
            </Col>

          </>
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <Spinner animation="border" className="me-2" />
            <span className="fs-5">Loading...</span>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default SinglePost;