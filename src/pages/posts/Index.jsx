//import hook useState dan useEffect from react
import React, { useState, useEffect } from "react";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Pagination, Spinner, Carousel } from 'react-bootstrap';

//import react router dom
import { Link } from "react-router-dom";

//import axios
import axios from 'axios';

//import Title Page
import Page from '../../Page';

function PostIndex() {

    //define state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Paginate
    const [currentPage, setCurrentPage] = useState(1); //menambah state currentPage
    const [totalPages, setTotalPages] = useState(1); //menambah state totalPages


    //useEffect hook
    useEffect(() => {
        fectData();
    }, [currentPage]);  // fetch data every time the current page changes

    
    //function "fetchData"
    const fectData = async () => {

        ///fetching
        const response = await axios.get(`http://localhost:8000/api/posts?page=${currentPage}`);

        //get response data
        const data = await response.data.data;

        //assign response data to state "posts"
        setPosts(data);

        //set state "totalPages"
        setTotalPages(response.data.meta.last_page);

        // set state "loading" menjadi false setelah data diambil
        setLoading(false);
    }


    // Pagination
    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
    };


    return (
        <Container>
            {loading ? (
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <Spinner animation="border" className="me-2" />
                    <span className="fs-5">Loading...</span>
                </div>
            ) : (
                <>

                <Row>
                    <Col md={12} className="mb-3">
                        <div className="d-flex justify-content-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" width="150" alt="logo" />
                        </div>
                        <h1 className="text-center mb-0">
                            WELCOME TO LOTUS POSTS
                        </h1>
                        <p className="text-center mt-0 fs-5">Create Your posts in Lotus now!</p>
                    </Col>

                    <Col md={12} className="mb-3">
                        <Carousel>
                            <Carousel.Item>
                                <Link as={Link} to="post/1" variant="transparant" className="p-0">
                                    <img className="d-block w-100" src="https://picsum.photos/id/1/800/400" alt="First slide" />
                                    <Carousel.Caption>
                                        <h3>How to make a Brownies</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link as={Link} to="post/2" variant="transparant" className="p-0">
                                    <img className="d-block w-100" src="https://picsum.photos/id/2/800/400" alt="Second slide" />
                                    <Carousel.Caption>
                                        <h3>Tutorial Bernafas</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link as={Link} to="post/3" variant="transparant" className="p-0">
                                    <img className="d-block w-100" src="https://picsum.photos/id/3/800/400" alt="Third slide" />
                                    <Carousel.Caption>
                                        <h3>Tutorial jadi Kerenn</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        </Carousel>
                    </Col>

                    {posts.map((post) => (
                        <Col key={post.id} md={4}>
                            <Card className="my-3 shadow" style={{border: "1px rgb(155, 155, 155) solid"}}>
                                <Button variant="transparant text-start p-0 border-0" className="text-decoration-none text-dark" as={Link} to={`/post/${post.id}`}>

                                    <Page pageTitle="Posts" hideTitle={true} />
                                
                                    <small className="position-absolute p-1 px-2 text-light text-opacity-75 bg-dark bg-opacity-50">{post.views} Views</small>

                                    {post.postImages ? post.postImages : <img src="https://picsum.photos/500/300" alt="Random" className="img-fluid mb-2" />}

                                    <Card.Body className="pt-0">

                                        <small className="small text-muted">
                                            By. <span className="text-info me-2">{post.created_by}</span> 
                                            <small className="float-end">{post.created_at}</small>
                                        </small>

                                        <h5 className="card-title mt-3 fw-bold">{post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}</h5>

                                        <Card.Text dangerouslySetInnerHTML={{__html: post.body.length > 120 ? post.body.substring(0, 150) + '...' : post.body}} />

                                        <Button variant="dark" as={Link} to={`/post/${post.id}`} className="mt-2">
                                            Read More
                                        </Button>

                                        <small className="float-end text-danger fw-bold mt-4">{post.likes} Likes</small>
                                            
                                    </Card.Body>

                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Pagination className="float-end mt-2">
                    <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
                </Pagination>
                
                </>
            )}
        </Container>
    );
}

export default PostIndex;