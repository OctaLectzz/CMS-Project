import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Table, Pagination, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Dashboard from '../../AppDashboard';
import Page from '../../../Page';
import CreateCategory from './Create';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CategoryIndex() {

    // Define State
    const [categories, setCategories] = useState([]);
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
        const response = await axios.get(`http://localhost:8000/api/categories?page=${currentPage}`);
        const data = await response.data.data;

        setCategories(data);
        setTotalPages(response.data.meta.last_page);
        setLoading(false);
        
    }

    // useEffect hook
    useEffect(() => {

        fectData();

    }, [currentPage]);  // fetch data every time the current page changes


    //function "deleteCategory"
    const deleteCategory = (id) => {

        //sending
        axios.delete(`http://localhost:8000/api/categories/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            fectData();
            setValidate(response.data)
            toast.success('Category Deleted Successfully!')
        }).catch(() => {
            toast.error('Failed Deleted Category!')
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
            <Page pageTitle="Dashboard Categories" hideTitle={true} />
            <Container>
                <ToastContainer />

                <Row>
                    <Col md={12}>

                        <Card className="border-0 rounded shadow-lg">
                            <Card.Body>
                                <CreateCategory />
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
                                                    <th className="text-center">NAME</th>
                                                    <th className="text-center">DESCRIPTION</th>
                                                    <th className="col-2 text-center">CREATED BY</th>
                                                    <th className="text-center col-2">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { categories.map((category, index) => (
                                                    <tr key={ category.id }>
                                                        <td>{ index + 1 }</td>
                                                        <td>{ category.name }</td>
                                                        <td>{category.description}</td>
                                                        <td>{ category.created_by }</td>
                                                        <td className="text-center">
                                                            <Button as={Link} to={`/dashboard/categories/edit/${category.id}`} variant="warning" size="sm" className="me-1 mb-1">Edit</Button>
                                                            <Button onClick={() => deleteCategory(category.id)} variant="danger" size="sm" className="me-1 mb-1">Delete</Button>
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

export default CategoryIndex;