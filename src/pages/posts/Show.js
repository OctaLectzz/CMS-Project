import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

function SinglePost() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
      const data = await response.data.data;
      setPost(data);
    };
    fetchPost();
  }, [id]);

  return (
    <Container className="mt-3">
      <Row>
        <Col md="12">
          <Card className="px-5 rounded shadow-sm">
            <Card.Body>
              {post ? (
                <>
                <div>
                    <small className="float-end ms-2 badge bg-warning p-2">{post.saves} Saves</small>
                    <small className="float-end badge bg-danger p-2">{post.likes} Likes</small>
                    <small className="text-muted d-flex me-5">{post.views} Views</small>
                </div>
                <div className="text-center mt-3 mb-5">
                  <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                  <p>
                    <small>By : <span className="text-primary">{post.created_by}</span></small>
                  </p>
                  <p>{post.body}</p>
                </div>
                  <Button as={Link} to="/posts" variant="primary">
                    Back
                  </Button>
                  <small className="text-muted float-end">{post.created_at}</small>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SinglePost;
