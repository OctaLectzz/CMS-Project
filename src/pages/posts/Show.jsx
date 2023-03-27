import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import CommentShow from './../comments/Show';


function SinglePost() {

  const [post, setPost] = useState(null);
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
                <img src="https://picsum.photos/800/450" alt="Random" className="img-fluid mb-2" />
              </div>

              <p className="mb-3 fs-4">
                {post.body}
              </p>

              <Button as={Link} to="/posts" variant="dark">Back</Button>

              <small className="text-muted float-end fs-6">{post.created_at}</small>
            </Col>

            <Col md="10" className="mt-5">
              <CommentShow />
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