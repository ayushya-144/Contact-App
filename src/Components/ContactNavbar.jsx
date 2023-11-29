import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function ContactNavbar({
  reset,
  setShowContactForm,
  setIsEdit,
  setQuery,
  handleUserLogout,
}) {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            Welcome {sessionStorage.getItem("userSession")}
          </Navbar.Brand>
          <Nav className="me-right">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="&#128270; Search"
                  className=" mr-sm-2"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </Col>
              <Col xs="auto">
                <Button
                  type="button"
                  onClick={() => {
                    reset();
                    setShowContactForm(true);
                    setIsEdit(false);
                  }}
                >
                  New
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  className="mx-1"
                  onClick={() => {
                    handleUserLogout();
                  }}
                  title="Logout"
                >
                  <i className="fa fa-power-off"></i>
                </Button>
              </Col>
            </Row>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
