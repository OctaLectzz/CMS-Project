import React from "react";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import axios from 'axios';
//toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    //modal
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {setShowModal(false);};
    const handleShow = () => {setShowModal(true);};

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
            toast.success('Profile Updated Successfully')
            history.push('/profile');
        })
        .catch((error) => {
            toast.error('Failed Updated Profile')
            setError(error.response.data.message);
        });
        setIsSubmitting(false);
        handleClose()
    };

    return (
        <>
            <Button variant="warning" className="float-end rounded rounded-circle" onClick={handleShow}>
                <i class="bi bi-pencil"></i>
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                    <Form onSubmit={editHandler}>

                        <Modal.Header closeButton>
                            <Modal.Title>Edit your Profile</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {user.name ?
                                <>
                                    <Form.Group className="mb-2">
                                        <span className="fw-bold">Nama : </span>
                                        <Form.Control type="name" value={name} placeholder="Name" onChange={(event) => setName(event.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <span className="fw-bold">Email : </span>
                                        <Form.Control type="email" value={email} placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-2">
                                        <span className="fw-bold">Tanggal Lahir : </span>
                                        <Form.Control type="date" value={tanggal_lahir} placeholder="Tanggal Lahir" onChange={(event) => setTanggalLahir(event.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <span className="fw-bold">Jenis Kelamin : </span>
                                        <Form.Select value={jenis_kelamin} onChange={(event) => setJenisKelamin(event.target.value)}>
                                            <option selected>Pilih Salah Satu</option>
                                            <option value="Laki-Laki">Laki-Laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <span className="fw-bold">Alamat : </span>
                                        <Form.Control as="textarea" value={alamat} placeholder="Alamat" onChange={(event) => setAlamat(event.target.value)} />
                                    </Form.Group>            

                                    <Form.Group className="mb-2">
                                        <span className="fw-bold">Biodata : </span>
                                        <Form.Control as="textarea" value={biodata} rows={5} placeholder="Masukkan Biodata" onChange={(event) => setBiodata(event.target.value)} />
                                    </Form.Group>
                                </>
                            :
                                <div className="d-flex align-items-center justify-content-center">
                                    <Spinner animation="border" className="me-2" />
                                    <span className="fs-5">Loading...</span>
                                </div>
                            }
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="dark" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div>
                                        <Spinner animation="border" className="me-2 spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                        <span>Loading</span>
                                    </div>
                                ) : (
                                    'Update'
                                )}
                            </Button>
                        </Modal.Footer>

                    </Form>
            </Modal>
        </>
    );

};

export default EditProfile;