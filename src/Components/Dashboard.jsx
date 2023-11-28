import { useEffect, useState } from "react";
import "../stylesheet/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import * as yup from "yup";
import "yup-phone";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object({
  name: yup.string().required("Enter your name"),
  email: yup.string().email("Enter a valid email").required("Enter an email"),
  phoneNumber: yup
    .string()
    .max(10, "Phone number cannot be greater than 10 digits")
    .min(10, "Phone number cannot be less than 10 digits")
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Enter a password"),
});

export default function Dashboard() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactDetails, setContactDetails] = useState(
    JSON.parse(localStorage.getItem("contactData"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userSession") === "") {
      console.log("user exist ?", false);
      navigate("/");
    }
  }, [navigate]);

  const contactForm = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { register, handleSubmit, formState } = contactForm;
  const { errors } = formState;

  async function onSubmit(data) {
    // console.log("after submission form data ", data);
    // console.log(data.contactImage[0]);
    const image = await getBase64Image(data.contactImage[0]);
    data.contactImage = image;
    const contactData = JSON.parse(localStorage.getItem("contactData"));
    const user = contactData.filter((user) => {
      if (user.email === sessionStorage.getItem("userSession")) {
        return user;
      }
    });
    console.log("after filtering contact list", user);
    if (user[0]["personalContacts"] === undefined) {
      user[0]["personalContacts"] = [];
    }
    user[0]["personalContacts"].push(data);
    console.log(contactData);
    localStorage.setItem("contactData", JSON.stringify(contactData));
    setShowContactForm(false);
    setContactDetails(JSON.parse(localStorage.getItem("contactData")));
  }
  const user = contactDetails.filter((user) => {
    if (user.email === sessionStorage.getItem("userSession")) {
      return user;
    }
  });
  const userDetails = user[0]["personalContacts"];

  const getBase64Image = (image) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = function () {
        resolve(reader.result);
        reader.onerror = reject;
      };
    });

  return (
    <>
      <div className="contact-container">
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
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowContactForm(true);
                    }}
                  >
                    New
                  </Button>
                </Col>
              </Row>
            </Nav>
          </Container>
        </Navbar>
        <Modal
          show={showContactForm}
          onHide={() => {
            setShowContactForm(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    {...register("name")}
                  />
                </FloatingLabel>
                <Form.Text className="text-danger">
                  {errors.name?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                  />
                </FloatingLabel>
                <Form.Text className="text-danger">
                  {errors.email?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Phone Number"
                  className="mb-3"
                >
                  <Form.Control
                    type="tel"
                    placeholder="name@example.com"
                    {...register("phoneNumber")}
                  />
                </FloatingLabel>
                <Form.Text className="text-danger">
                  {errors.phoneNumber?.message}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Image"
                  className="mb-3"
                >
                  <Form.Control
                    type="file"
                    placeholder="name@example.com"
                    {...register("contactImage")}
                  />
                </FloatingLabel>
                <Form.Text className="text-danger">
                  {errors.contactImage?.message}
                </Form.Text>
              </Form.Group>
              <Button variant="primary float-end" type="submit">
                Add Contact
              </Button>
            </Form>
            {/* <DevTool control={control} /> */}
          </Modal.Body>
        </Modal>
        <div className="contact-body">
          <div className="contact-table">
            <h1>Contacts</h1>
            <Table bordered hover size="lg">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Name</th>
                  <th>Email Address</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {userDetails &&
                  userDetails.map((contact, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phoneNumber}</td>
                        <td>
                          <Card className="image-card">
                            <Card.Img
                              className="card-contact-image"
                              src={contact.contactImage}
                            />
                          </Card>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
// https://www.youtube.com/watch?v=zv-TOLKTlR8&list=PLC3y8-rFHvwjmgBr1327BA5bVXoQH-w5s&index=13
