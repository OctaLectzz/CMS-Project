import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
import Page from '../../Page';


function Profile() {

    const [user, setUser] = useState({});
    const token = localStorage.getItem('token');

    // useEffect User
    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`http://localhost:8000/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = response.data.data;
            setUser(data);
        };
        fetchUser();
    });

    return (
        <Container>
            
            <Row className="mt-5 bg-white p-5 shadow-lg">
                {user.name ? (
                    <>
                        <Page pageTitle={user.name} hideTitle={true} />
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
                            <Button variant="warning" className="float-end" as={Link} to="/profile/edit">
                                Edit
                            </Button>

                            <div className="text-center mt-5">
                                <h5 className="display-6 fw-bold mb-0">{user.name}</h5>
                                <p className="lead mb-3">{user.email}</p>
                            </div>
                            
                            <div className="mt-5 fs-5">
                                <p className="mb-2">
                                    <span className="fw-bold">Tanggal Lahir : </span>
                                    {user.tanggal_lahir === null ? <span className="text-danger">Tidak didefinisikan</span> : user.tanggal_lahir}
                                </p>
                                <p className="mb-2">
                                    <span className="fw-bold">Jenis Kelamin : </span>
                                    {user.jenis_kelamin === null ? <span className="text-danger">Tidak didefinisikan</span> : user.jenis_kelamin}
                                </p>
                                <p className="mb-2">
                                    <span className="fw-bold">Role : </span>
                                    {user.role === null ? <span className="text-danger">Tidak didefinisikan</span> : user.role}
                                </p>
                                <p className="mb-2">
                                    <span className="fw-bold">Alamat : </span>
                                    {user.alamat === null ? <span className="text-danger">Tidak didefinisikan</span> : user.alamat}
                                </p>
                            </div>

                            <hr />
                            <p>{user.biodata}</p>
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

export default Profile;
