import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Pagination, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import Dashboard from '../../AppDashboard';
import Page from '../../../Page';


function PostIndex() {

    // Define State
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [validate, setValidate] = useState(true);

    // Paginate
    const [currentPage, setCurrentPage] = useState(1); //menambah state currentPage
    const [totalPages, setTotalPages] = useState(1); //menambah state totalPages

    // Token
    const token = localStorage.getItem('token');

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

    // useEffect hook
    useEffect(() => {

        fectData();

    }, [currentPage]);  // fetch data every time the current page changes


    //function "deletePost"
    const deletePost = (id) => {

        //sending
        axios.delete(`http://localhost:8000/api/posts/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            fectData();
            setValidate(response.data)
        });

        //panggil function "fetchData"
        
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
        <>
            <Dashboard />
            <Page pageTitle="Dashboard Posts" hideTitle={true} />
            <Container>
                <Row>
                    <Col md={12}>

                        {validate.message && <Alert variant="success">{ validate.message }</Alert>}

                        <Card className="border-0 rounded shadow-lg">
                            <Card.Body>
                                <Button as={Link} to="/dashboard/posts/create" variant="dark" className="mb-3">TAMBAH POST</Button>
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
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PostIndex;