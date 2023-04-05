import React from "react";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Form, Button, Spinner, Alert } from "react-bootstrap";
import axios from 'axios';
import Page from '../../Page';


function EditProfile() {

    const [user, setUser] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tanggal_lahir, setTanggalLahir] = useState("");
    const [jenis_kelamin, setJenisKelamin] = useState("");
    const [alamat, setAlamat] = useState("");
    const [biodata, setBiodata] = useState("");
    const token = localStorage.getItem('token');
    const history = useHistory();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    // useEffect User
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`http://localhost:8000/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.data;
            setUser(data);
            setName(data.name);
            setEmail(data.email);
            setTanggalLahir(data.tanggal_lahir);
            setJenisKelamin(data.jenis_kelamin);
            setAlamat(data.alamat);
            setBiodata(data.biodata)
        };
        getUser();
    }, []);

    const editHandler = async (e) => {
        e.preventDefault();
    
        setIsSubmitting(true);
        await axios
          .put(
            "http://localhost:8000/api/profile/edit",
            {
                name: name,
                email: email,
                tanggal_lahir: tanggal_lahir,
                jenis_kelamin: jenis_kelamin,
                alamat: alamat,
                biodata: biodata,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then((response) => {
            console.log(response.data);
            history.push('/profile');
        })
        .catch((error) => {
            setError(error.response.data.message);
        });
        setIsSubmitting(false);
    };

    return (
        <Container>

            {error && 
                <Alert variant="danger" className="mt-3">{error}</Alert>
            }

            <Row className="mt-3 bg-white p-5 shadow-lg">
                {user.name ? (
                    <>
                        <Page pageTitle="Edit Profile" hideTitle={true} />
                        <Col sm={12} md={6} lg={4} className="d-flex justify-content-center align-items-center">
                            <div>
                                <Image
                                src="https://i.pinimg.com/170x/c2/b9/eb/c2b9eb9c6906da66183cf6bdf89ecce8.jpg"
                                roundedCircle
                                width={300}
                                className="mb-3"
                                />
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={8}>
                            <Form onSubmit={editHandler}>

                                <div className="text-center mt-5">
                                    <span className="fw-bold">Name : </span>
                                    <Form.Group className="d-inline-block w-50">
                                        <Form.Control type="name" value={name} placeholder="Name" className="mb-1" onChange={(event) => setName(event.target.value)} />
                                    </Form.Group>

                                    <br />

                                    <span className="fw-bold">Email : </span>
                                    <Form.Group  className="d-inline-block w-50">
                                        <Form.Control type="email" value={email} placeholder="Email" className="mb-1" onChange={(event) => setEmail(event.target.value)} />
                                    </Form.Group>
                                </div>
                                
                                <div className="mt-5 fs-5">
                                    <p className="mb-2">
                                        <span className="fw-bold">Tanggal Lahir : </span>
                                        <Form.Group className="d-inline-block">
                                            <Form.Control type="date" value={tanggal_lahir} placeholder="Tanggal Lahir" className="mb-1" onChange={(event) => setTanggalLahir(event.target.value)} />
                                        </Form.Group>
                                    </p>

                                    <p className="mb-2">
                                        <span className="fw-bold">Jenis Kelamin : </span>
                                        <Form.Group className="d-inline-block">
                                            <Form.Select value={jenis_kelamin} onChange={(event) => setJenisKelamin(event.target.value)}>
                                                <option selected>Pilih Salah Satu</option>
                                                <option value="Laki-Laki">Laki-Laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </p>

                                    <p className="mb-2">
                                        <span className="fw-bold">Role : </span>
                                        {user.role}
                                    </p>

                                    <p className="mb-2">
                                        <span className="fw-bold">Alamat : </span>
                                        <Form.Group className="d-inline-block w-75">
                                            <Form.Control type="text" value={alamat} placeholder="Alamat" className="mb-1" onChange={(event) => setAlamat(event.target.value)} />
                                        </Form.Group>
                                    </p>
                                </div>
                                
                                <hr />
                                <Form.Group>
                                    <Form.Control as="textarea" value={biodata} rows={5} placeholder="Masukkan Biodata" className="mb-1" onChange={(event) => setBiodata(event.target.value)} />
                                </Form.Group>

                                <Button type="submit" variant="dark" className="mt-3 w-100" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <div>
                                            <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                            <span>Loading</span>
                                        </div>
                                    ) : (
                                        'Update'
                                    )}
                                </Button>

                            </Form>
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

};

export default EditProfile;