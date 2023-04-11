//import hook useState dan useEffect from react
import React, { useState, useEffect } from "react";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Pagination, Spinner } from 'react-bootstrap';

//import react router dom
import { Link, useParams } from "react-router-dom";

//import axios
import axios from 'axios';

//import Title Page
import Page from '../../Page';

function PostTag() {

    //define state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { tag } = useParams("");


    //useEffect hook
    useEffect(() => {
        fectData();
    }, []);  // fetch data every time the current page changes

    
    //function "fetchData"
    const fectData = async () => {

        ///fetching
        let api = `http://localhost:8000/api/posts`;
        if(tag) {
            api += `?tag=${tag}`
        }

        //get response data
        const response = await axios.get(api);
        const data = await response.data.data;

        //assign response data to state "posts"
        setPosts(data);

        // set state "loading" menjadi false setelah data diambil
        setLoading(false);
    }


    return (
        <Container>
            {loading ? (
                <div className="d-flex align-items-center justify-content-center mt-5">
                    <Spinner animation="border" className="me-2" />
                    <span className="fs-5">Loading...</span>
                </div>
            ) : (
                <Row>
                    {posts.map((post) => (
                        <Col key={post.id} md={4}>
                            <Card className="my-3 shadow" style={{border: "1px rgb(155, 155, 155) solid"}}>
                                <Button variant="transparant text-start p-0 border-0" className="text-decoration-none text-dark" as={Link} to={`/post/${post.id}`}>

                                    <Page pageTitle="Posts" hideTitle={true} />
                                
                                    <small className="position-absolute p-1 px-2 text-light text-opacity-75 bg-dark bg-opacity-50">{post.views} Views</small>

                                    <img src="https://picsum.photos/500/300" alt="Random" className="img-fluid mb-2" />

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
            )}
        </Container>
    );
}

export default PostTag;