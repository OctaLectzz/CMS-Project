//import hook useState dan useEffect from react
import React, { useState, useEffect } from "react";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Pagination, Spinner } from 'react-bootstrap';

//import react router dom
import { Link } from "react-router-dom";

//import axios
import axios from 'axios';

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

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)


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
                    {posts.map((post) => (
                    <Col key={post.id} md={4}>
                        <Card className="my-3 shadow-sm">
                            <Card.Body>
                                <a className="text-decoration-none text-dark" href={`/post/${post.id}`}>

                                    <small className="position-absolute p-1 px-2 text-light text-opacity-75 bg-dark bg-opacity-50">{post.views} Views</small>

                                    <img src="https://picsum.photos/500/300" alt="Random" className="img-fluid mb-2" />

                                    <h5 className="card-title mb-1">{post.title.length > 30 ? post.title.substring(0, 30) + '...' : post.title}</h5>

                                    <small className="small text-muted ms-1">
                                        By. <span className="text-info me-2">{post.created_by}</span> 
                                        ◉ <small>{post.created_at}</small>
                                    </small>

                                    <Card.Text className="mt-3">{post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body}</Card.Text>

                                    <Button variant="dark" href={`/post/${post.id}`}>
                                        Read More
                                    </Button>

                                    <small className="float-end text-danger fw-bold mt-2">{post.likes} Likes</small>
                                    
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>

                <Pagination className="float-end mt-2">
                    <Pagination.Prev />
                    {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                    ))}
                    <Pagination.Next />
                </Pagination>
                </>
            )}
        </Container>
    );
}

export default PostIndex;