import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import axios from 'axios';
import Page from '../../Page';
import CommentShow from './../comments/Show';
//toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SinglePost() {

  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  var { id } = useParams();

  
  // useEffect Post
  useEffect(() => {
    fetchPost();
  }, [id]);


  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
    const data = await response.data.data;
    const tag = response.data.data.tags;
    const category = response.data.data.categories;
    setPost(data);
    setTags(tag);
    setCategories(category);
  };


  return (
    <Container className="mt-3">
      <ToastContainer />
      <Row className="justify-content-center bg-white bg-opacity-75 py-5 shadow">
        {post.title ? (
          <>
            <Page pageTitle={post.title} hideTitle={true} />

            <Col md="8" className="mb-5">
              <div>
                <small className="float-end ms-2 badge bg-warning p-2">{post.saves} Saves</small>
                <small className="float-end badge bg-danger p-2">{post.likes} Likes</small>
                <small className="text-muted d-flex me-5">{post.views} Views</small>
              </div>

              <div className="text-center mt-4">
                <p className="mb-0 fs-3 fw-bold">{post.title}</p>
                <p>
                  <small>By : <span className="text-primary">{post.created_by}</span></small>
                </p>
                {post.postImages ? <img src={`http://localhost:8000/storage/postImages/${post.postImages}`} alt="Random" className="img-fluid mb-2" /> : <img src="https://picsum.photos/500/300" alt="Random" className="img-fluid mb-2" />}
              </div>

              <div className="mb-4 text-center">
                {categories.map((category) => (
                  <Link key={category.id} to={`/posts/${category.name}`} className="m-1 text-decoration-none d-inline-block px-2 text-info" style={{border: "1px solid", borderRadius: "20%"}}>{category.name}</Link>
                ))}
              </div>

              <div className="mb-3 fs-5" dangerouslySetInnerHTML={{__html: post.body}} />

              <Button as={Link} to="/posts" variant="dark" className="mb-5">Back</Button>

              <small className="text-muted float-end fs-6">{post.created_at}</small>

              <div>
                {tags.map((tag) => (
                  <Link key={tag.id} to={`/posts/${tag.name}`} className="mx-1 text-decoration-none d-inline-block">#{tag.name}</Link>
                ))}
              </div>
            </Col>

            <Col md="10" className="mt-5">

              <CommentShow id={id} />

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