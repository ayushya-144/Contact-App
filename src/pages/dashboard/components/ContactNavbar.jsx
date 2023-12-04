import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UseAuth } from "../../../context/Auth";
import { useState } from "react";
import DialogueBox from "../../dialogue-box/DialogueBox";

export default function ContactNavbar({
  setShowContactForm,
  setIsEdit,
  setQuery,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = UseAuth();

  const handleUserLogout = () => {
    auth.logOut();
    handleClose;
  };
  return (
    <>
      <DialogueBox
        show={show}
        handleClose={handleClose}
        closeBtnTxt={"Close"}
        showConfirmBtn={true}
        handleConfirmMethod={handleUserLogout}
      >
        Are you sure you want to Log Out?
      </DialogueBox>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            Welcome{" "}
            <span style={{ userSelect: "none", color: "#408ec6" }}>
              {sessionStorage
                .getItem("userSession")
                .toUpperCase()
                .split("@GMAIL.COM")}
            </span>
          </Navbar.Brand>
          <Nav className="me-right">
            <Row>
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="&#128270; Search"
                  className=" mr-sm-2"
                  name="searchContacts"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </Col>
              <Col xs="auto">
                <Button
                  type="button"
                  onClick={() => {
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
                    handleShow();
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
