//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Container, Row, Col, Card, Button, Table, Pagination, Spinner } from 'react-bootstrap';

//import axios
import axios from 'axios';

//sidebar
import Dashboard from '../../AppDashboard';

function PostIndex() {

    //define state
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Paginate
    const [currentPage, setCurrentPage] = useState(1); //menambah state currentPage
    const [totalPages, setTotalPages] = useState(1); //menambah state totalPages

    //token
    const token = localStorage.getItem('token');

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, [currentPage]);  // fetch data every time the current page changes

    //function "fetchData"
    const fectData = async () => {

        //fetching
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

    //function "deletePost"
    const deletePost = (id) => {

        //sending
        axios.delete(`http://localhost:8000/api/posts/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            fectData();
            console.log(response.data)
        });

        //panggil function "fetchData"
        
    }

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <>
            <Dashboard />
            <Container>
                <Row>
                    <Col md={12}>
                        <Card className="border-0 rounded shadow-sm">
                            <Card.Body>
                                <Button as={Link} to="/dashboard/posts/create" variant="success" className="mb-3">TAMBAH POST</Button>
                                {loading ? (
                                    <div className="d-flex align-items-center justify-content-center">
                                        <Spinner animation="border" className="me-2" />
                                        <span className="fs-5">Loading...</span>
                                    </div>
                                ) : (
                                    <>
                                    <div className="table-responsive">
                                        <Table striped bordered hover className="mb-1">
                                            <thead>
                                                <tr>
                                                    <th>NO.</th>
                                                    <th className="text-center">TITLE</th>
                                                    <th className="text-center">CONTENT</th>
                                                    <th className="col-2 text-center">CREATED BY</th>
                                                    <th className="text-center col-2">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { posts.map((post, index) => (
                                                    <tr key={ post.id }>
                                                        <td>{ index + 1 }</td>
                                                        <td>{ post.title }</td>
                                                        <td dangerouslySetInnerHTML={{__html: post.body.length > 200 ? post.body.substring(0, 200) + '...' : post.body}} />
                                                        <td>{ post.created_by }</td>
                                                        <td className="text-center">
                                                            <Button as={Link} to={`/post/${post.id}`} variant="primary" size="sm" className="me-1 mb-1">Show</Button>
                                                            <Button as={Link} to={`/dashboard/posts/edit/${post.id}`} variant="warning" size="sm" className="me-1 mb-1">Edit</Button>
                                                            <Button onClick={() => deletePost(post.id)} variant="danger" size="sm" className="me-1 mb-1">Delete</Button>
                                                        </td>
                                                    </tr>
                                                )) }
                                            </tbody>
                                        </Table>
                                    </div>
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PostIndex;