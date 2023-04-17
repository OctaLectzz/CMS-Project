//import component Bootstrap React
import { Container, Row, Col , Button, Carousel } from 'react-bootstrap'

//import react router dom
import { Link } from "react-router-dom";

//import Title Page
import Page from '../Page';


function Home() {
    return (
        <>
            <Container className="my-4 p-5 shadow-sm mb-5">
                <Row>

                    <Page pageTitle="" hideTitle={true} />

                    <Col md={6}>
                        <h1 className="mb-3">Welcome to Lotus Website</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget enim euismod, consequat mauris quis, blandit ipsum. Ut quis risus dignissim, placerat velit nec, convallis sem. Nulla quis faucibus felis. Donec dictum convallis mi, eu bibendum sem. Ut rutrum vitae risus at efficitur. Pellentesque sit amet justo in sapien placerat malesuada nec eu massa.</p>
                        <Button as={Link} to={`/register`} variant="dark" size="lg" className="mt-3 mb-3">Get Started</Button>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" className="float-end" width="100" alt="logo" />
                    </Col>

                    <Col md={6}>
                        {/* <img src="https://picsum.photos/500/300" alt="Random" className="img-fluid" /> */}
                        <Carousel>
                            <Carousel.Item>
                                <Link as={Link} to="post/1" variant="transparant" className="p-0">
                                    <img className="d-block w-100" src="https://picsum.photos/id/1/800/500" alt="First slide" />
                                    <Carousel.Caption>
                                        <h3>How to make a Brownies</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link as={Link} to="post/2" variant="transparant" className="p-0">
                                    <img className="d-block w-100" src="https://picsum.photos/id/2/800/500" alt="Second slide" />
                                    <Carousel.Caption>
                                        <h3>Tutorial Bernafas</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Link as={Link} to="post/3" variant="transparant" className="p-0">
                                    <img className="d-block w-100" src="https://picsum.photos/id/3/800/500" alt="Third slide" />
                                    <Carousel.Caption>
                                        <h3>Tutorial jadi Kerenn</h3>
                                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        </Carousel>
                    </Col>

                </Row>
            </Container>

            <footer className="bg-secondary text-light py-3 mt-5 fixed-bottom">
                <p className="text-center">&copy; Lotus Team 2023   |   OctaLectzz</p>
            </footer>
        </>
    );
}

export default Home;