import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import Dashboard from '../../AppDashboard';
import Page from '../../../Page';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditCategory() {

    //state
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //token
    const token = localStorage.getItem('token');

    //get ID from parameter URL
    const { id } = useParams();


    //hook useEffect
    useEffect(() => {

        //function "getCategoryById"
        const getCategoryById = async() => {

            //get data from server
            const response = await axios.get(`http://localhost:8000/api/categories/${id}`);
            //get response data
            const data = await response.data.data

            //assign data to state
            setCategory(data)
            setName(data.name);
            setDescription(data.description);

        };
        getCategoryById()
        
    }, [id]);


    //function "updateCategory"
    const updateCategory = async (e) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        //send data to server
        await axios.put(`http://localhost:8000/api/categories/edit/${id}`, {
            name: name,
            description: description
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setIsSubmitting(false);
            //redirect
            history.push('/dashboard/categories');
            toast.success('Category Updated Successfully!')
        })
        .catch((error) => {
            setIsSubmitting(false);
            toast.error('Silahkan Periksa Kembali!');
        })
    };


    return (
        <>
            <Dashboard />
            <Page pageTitle="Edit Category" hideTitle={true} />
            <Container>
                <ToastContainer />
                <Row>
                    <Col md={12}>
                        <Card className="border-0 rounded shadow-sm">
                            {category.name ? (
                                <Card.Body>

                                    {
                                        validation.errors &&
                                            <Alert variant="danger">
                                                <ul class="mt-0 mb-0">
                                                    { validation.errors.map((error, index) => (
                                                        <li key={index}>{ `${error.param} : ${error.msg}` }</li>
                                                    )) }
                                                </ul>
                                            </Alert>
                                    }

                                    <Form onSubmit={ updateCategory }>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Label>NAME</Form.Label>
                                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan Name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicDescription">
                                            <Form.Label>DESCRIPTION</Form.Label>
                                            <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Masukkan Description" />
                                        </Form.Group>

                                        <Button type="submit" variant="dark" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <div>
                                                    <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                                    <span>Loading</span>
                                                </div>
                                            ) : (
                                                'UPDATE'
                                            )}
                                        </Button>
                                    </Form>
                                </Card.Body>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center p-2">
                                    <Spinner animation="border" className="me-2" />
                                    <span className="fs-5">Loading...</span>
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default EditCategory;